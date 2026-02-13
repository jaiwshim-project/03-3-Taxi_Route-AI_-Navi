/* ═══════════════════════════════════════════
   택시내비AI — public-data-api.js
   공공데이터 실시간 API 연동 모듈
   (기상청 초단기실황 + 국토교통부 교통소통정보)
   ═══════════════════════════════════════════ */

/* ── (A) 설정 상수 ── */
var PUBLIC_API_CONFIG = {
  serviceKey: 'f04ff78ae341a1b99e6b8c4810be12683ad7062e609e8d91cd4076282e7c715d',

  // CORS 프록시 (순서대로 시도)
  corsProxies: [
    'https://corsproxy.io/?',
    'https://api.allorigins.win/raw?url='
  ],
  currentProxyIndex: 0,

  // 기상청 초단기실황
  weather: {
    baseUrl: 'https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst',
    cacheTTL: 10 * 60 * 1000, // 10분
    // 도시별 기상청 격자좌표 (nx, ny)
    cityGrid: {
      seoul:    { nx: 60,  ny: 127 },
      busan:    { nx: 98,  ny: 76  },
      daegu:    { nx: 89,  ny: 90  },
      incheon:  { nx: 55,  ny: 124 },
      gwangju:  { nx: 58,  ny: 74  },
      daejeon:  { nx: 67,  ny: 100 },
      ulsan:    { nx: 102, ny: 84  },
      sejong:   { nx: 66,  ny: 103 },
      gyeonggi: { nx: 60,  ny: 121 },
      gangwon:  { nx: 73,  ny: 134 },
      chungbuk: { nx: 69,  ny: 107 },
      chungnam: { nx: 68,  ny: 100 },
      jeonbuk:  { nx: 63,  ny: 89  },
      jeonnam:  { nx: 51,  ny: 67  },
      gyeongbuk:{ nx: 89,  ny: 91  },
      gyeongnam:{ nx: 90,  ny: 77  },
      jeju:     { nx: 52,  ny: 38  }
    }
  },

  // 국토교통부 교통소통정보 (ITS)
  traffic: {
    baseUrl: 'https://openapi.its.go.kr:9443/trafficInfo',
    cacheTTL: 5 * 60 * 1000, // 5분
    // 도시별 bounding box
    cityBounds: {
      seoul: { minX: 126.7642, maxX: 127.1835, minY: 37.4134, maxY: 37.7015 },
      busan: { minX: 128.8500, maxX: 129.2500, minY: 35.0500, maxY: 35.2500 },
      daegu: { minX: 128.4500, maxX: 128.7500, minY: 35.8000, maxY: 35.9500 },
      incheon: { minX: 126.5500, maxX: 126.8000, minY: 37.3500, maxY: 37.5500 }
    }
  }
};

/* ── (B) 캐시 관리 ── */
var apiCache = {};

function getCachedData(cacheKey) {
  var entry = apiCache[cacheKey];
  if (!entry) return null;
  if (Date.now() - entry.timestamp > entry.ttl) {
    delete apiCache[cacheKey];
    return null;
  }
  return entry.data;
}

function setCachedData(cacheKey, data, ttl) {
  apiCache[cacheKey] = {
    data: data,
    timestamp: Date.now(),
    ttl: ttl
  };
}

/* ── (C) CORS 프록시 래퍼 ── */
async function fetchWithCorsProxy(targetUrl) {
  var proxies = PUBLIC_API_CONFIG.corsProxies;
  var startIndex = PUBLIC_API_CONFIG.currentProxyIndex;

  for (var i = 0; i < proxies.length; i++) {
    var proxyIndex = (startIndex + i) % proxies.length;
    var proxyUrl = proxies[proxyIndex] + encodeURIComponent(targetUrl);
    try {
      var response = await fetch(proxyUrl, {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
      });
      if (!response.ok) throw new Error('HTTP ' + response.status);
      var text = await response.text();
      // XML 응답 감지 (기상청이 에러를 XML로 반환하는 경우)
      if (text.trim().charAt(0) === '<') {
        throw new Error('XML 응답 (JSON 아님)');
      }
      var data = JSON.parse(text);
      PUBLIC_API_CONFIG.currentProxyIndex = proxyIndex;
      return data;
    } catch (e) {
      console.warn('[API] 프록시 #' + proxyIndex + ' 실패:', e.message);
    }
  }
  throw new Error('모든 CORS 프록시 실패');
}

/* ── (D) 기상청 초단기실황 API ── */

// 강수형태 + 강수량 → 날씨 코드
function classifyWeather(pty, rn1, reh) {
  var ptyVal = String(pty);
  if (ptyVal === '3' || ptyVal === '7') return 'snow';
  if (ptyVal === '1' || ptyVal === '2' || ptyVal === '5' || ptyVal === '6') {
    var rainfall = parseFloat(rn1) || 0;
    return rainfall >= 10 ? 'heavy_rain' : 'rain';
  }
  // PTY=0 (강수 없음)
  var humidity = parseFloat(reh) || 0;
  return humidity >= 80 ? 'cloudy' : 'clear';
}

// base_date, base_time 계산 (매시 40분 이후 제공)
function getWeatherBaseDateTime() {
  var now = new Date();
  if (now.getMinutes() < 40) {
    now.setHours(now.getHours() - 1);
  }
  var yyyy = String(now.getFullYear());
  var mm = String(now.getMonth() + 1).padStart(2, '0');
  var dd = String(now.getDate()).padStart(2, '0');
  var hh = String(now.getHours()).padStart(2, '0');
  return { base_date: yyyy + mm + dd, base_time: hh + '00' };
}

async function fetchCurrentWeather(cityKey) {
  cityKey = cityKey || 'seoul';
  var cacheKey = 'weather_' + cityKey;
  var cached = getCachedData(cacheKey);
  if (cached) {
    console.log('[날씨] 캐시 사용:', cityKey);
    return cached;
  }

  var grid = PUBLIC_API_CONFIG.weather.cityGrid[cityKey];
  if (!grid) {
    console.warn('[날씨] 격자좌표 없음:', cityKey);
    return null;
  }

  var dt = getWeatherBaseDateTime();
  var params = [
    'serviceKey=' + PUBLIC_API_CONFIG.serviceKey,
    'pageNo=1',
    'numOfRows=10',
    'dataType=JSON',
    'base_date=' + dt.base_date,
    'base_time=' + dt.base_time,
    'nx=' + grid.nx,
    'ny=' + grid.ny
  ].join('&');

  var url = PUBLIC_API_CONFIG.weather.baseUrl + '?' + params;

  try {
    var data = await fetchWithCorsProxy(url);

    // 응답 구조 검증
    var body = data && data.response && data.response.body;
    if (!body || !body.items || !body.items.item) {
      var errCode = data && data.response && data.response.header && data.response.header.resultCode;
      throw new Error('응답 형식 오류 (code: ' + (errCode || 'unknown') + ')');
    }

    var items = body.items.item;
    var raw = { pty: '0', t1h: null, rn1: '0', reh: '50' };

    items.forEach(function(item) {
      switch (item.category) {
        case 'PTY': raw.pty = item.obsrValue; break;
        case 'T1H': raw.t1h = item.obsrValue; break;
        case 'RN1': raw.rn1 = item.obsrValue; break;
        case 'REH': raw.reh = item.obsrValue; break;
      }
    });

    var result = {
      weatherCode: classifyWeather(raw.pty, raw.rn1, raw.reh),
      temperature: raw.t1h !== null ? parseFloat(raw.t1h) : null,
      humidity: parseFloat(raw.reh) || null,
      rainfall: parseFloat(raw.rn1) || 0,
      ptyCode: raw.pty,
      cityKey: cityKey,
      baseDate: dt.base_date,
      baseTime: dt.base_time,
      fetchedAt: new Date().toISOString()
    };

    setCachedData(cacheKey, result, PUBLIC_API_CONFIG.weather.cacheTTL);
    console.log('[날씨] API 성공:', cityKey, result.weatherCode,
      '(기온:' + raw.t1h + ', 습도:' + raw.reh + '%, 강수:' + raw.rn1 + 'mm)');
    return result;

  } catch (e) {
    console.error('[날씨] API 실패:', e.message);
    return null;
  }
}

/* ── (E) 국토교통부 교통소통정보 API ── */

async function fetchTrafficInfo(cityKey) {
  cityKey = cityKey || 'seoul';
  var cacheKey = 'traffic_' + cityKey;
  var cached = getCachedData(cacheKey);
  if (cached) {
    console.log('[교통] 캐시 사용:', cityKey);
    return cached;
  }

  var bounds = PUBLIC_API_CONFIG.traffic.cityBounds[cityKey];
  if (!bounds) {
    console.log('[교통] 미지원 도시:', cityKey, '(기본값 사용)');
    return null;
  }

  var params = [
    'apiKey=' + PUBLIC_API_CONFIG.serviceKey,
    'type=all',
    'drcType=all',
    'minX=' + bounds.minX,
    'maxX=' + bounds.maxX,
    'minY=' + bounds.minY,
    'maxY=' + bounds.maxY,
    'getType=json'
  ].join('&');

  var url = PUBLIC_API_CONFIG.traffic.baseUrl + '?' + params;

  try {
    var data = await fetchWithCorsProxy(url);

    // 응답에서 링크별 속도 정보 추출
    var links = [];
    if (data && data.body && data.body.items) {
      links = data.body.items;
    } else if (data && data.body && Array.isArray(data.body)) {
      links = data.body;
    } else if (Array.isArray(data)) {
      links = data;
    }

    var result = {
      avgSpeed: 25,
      congestionLevel: 'normal',
      linkCount: links.length,
      fetchedAt: new Date().toISOString()
    };

    if (links.length > 0) {
      var totalSpeed = 0;
      var validCount = 0;
      links.forEach(function(link) {
        var speed = parseFloat(link.speed || link.SPD || link.avgSpeed || 0);
        if (speed > 0) {
          totalSpeed += speed;
          validCount++;
        }
      });
      if (validCount > 0) {
        result.avgSpeed = Math.round(totalSpeed / validCount);
      }
    }

    // 혼잡도 분류
    if (result.avgSpeed >= 40) result.congestionLevel = 'smooth';
    else if (result.avgSpeed >= 25) result.congestionLevel = 'normal';
    else if (result.avgSpeed >= 15) result.congestionLevel = 'slow';
    else result.congestionLevel = 'congested';

    setCachedData(cacheKey, result, PUBLIC_API_CONFIG.traffic.cacheTTL);
    console.log('[교통] API 성공: 평균', result.avgSpeed + 'km/h,',
      result.congestionLevel, '(' + result.linkCount + '개 링크)');
    return result;

  } catch (e) {
    console.error('[교통] API 실패:', e.message);
    return null;
  }
}

/* ── (F) 실시간 데이터 상태 관리 + UI ── */

var liveDataState = {
  weather: null,
  traffic: null,
  weatherStatus: 'idle',   // idle | loading | success | error
  trafficStatus: 'idle',
  lastUpdate: null
};

// 교통 혼잡도 → 이동 시간 보정 계수
var TRAFFIC_TIME_MULTIPLIER = {
  'smooth': 0.85,
  'normal': 1.0,
  'slow': 1.25,
  'congested': 1.55
};

// 교통 혼잡도 → 수요 보정 계수
var TRAFFIC_DEMAND_BOOST = {
  'smooth': 0.95,
  'normal': 1.0,
  'slow': 1.10,
  'congested': 1.20
};

var WEATHER_NAMES = {
  clear: '맑음', cloudy: '흐림', rain: '비',
  heavy_rain: '폭우', snow: '눈'
};
var WEATHER_EMOJIS = {
  clear: '\u2600\uFE0F', cloudy: '\u26C5', rain: '\uD83C\uDF27\uFE0F',
  heavy_rain: '\u26C8\uFE0F', snow: '\u2744\uFE0F'
};
var CONGESTION_NAMES = {
  smooth: '원활', normal: '보통', slow: '서행', congested: '정체'
};
var CONGESTION_COLORS = {
  smooth: 'text-green-600', normal: 'text-blue-600',
  slow: 'text-orange-600', congested: 'text-red-600'
};

// 실시간 데이터 전체 로딩
async function loadLiveData(cityKey) {
  cityKey = cityKey || (typeof currentCity !== 'undefined' ? currentCity : 'seoul');

  liveDataState.weatherStatus = 'loading';
  liveDataState.trafficStatus = 'loading';
  updateLiveDataUI();

  var results = await Promise.allSettled([
    fetchCurrentWeather(cityKey),
    fetchTrafficInfo(cityKey)
  ]);

  // 날씨 결과
  if (results[0].status === 'fulfilled' && results[0].value) {
    liveDataState.weather = results[0].value;
    liveDataState.weatherStatus = 'success';
  } else {
    liveDataState.weatherStatus = 'error';
  }

  // 교통 결과
  if (results[1].status === 'fulfilled' && results[1].value) {
    liveDataState.traffic = results[1].value;
    liveDataState.trafficStatus = 'success';
  } else {
    liveDataState.trafficStatus = 'error';
  }

  liveDataState.lastUpdate = new Date();
  updateLiveDataUI();
  return liveDataState;
}

// UI 상태 배지 업데이트
function updateLiveDataUI() {
  var badge = document.getElementById('liveDataBadge');
  if (!badge) return;

  var wHtml = buildStatusLine(
    liveDataState.weatherStatus,
    function() {
      var w = liveDataState.weather;
      return (WEATHER_EMOJIS[w.weatherCode] || '') + ' ' +
        (WEATHER_NAMES[w.weatherCode] || w.weatherCode) +
        (w.temperature !== null ? ' ' + w.temperature + '\u00B0C' : '');
    },
    '날씨'
  );

  var tHtml = buildStatusLine(
    liveDataState.trafficStatus,
    function() {
      var t = liveDataState.traffic;
      return '<span class="' + (CONGESTION_COLORS[t.congestionLevel] || '') + '">' +
        (CONGESTION_NAMES[t.congestionLevel] || '보통') + '</span> ' +
        t.avgSpeed + 'km/h';
    },
    '교통'
  );

  badge.innerHTML = wHtml + tHtml;
}

function buildStatusLine(status, successFn, label) {
  var dot, text;
  if (status === 'loading') {
    dot = '<span class="w-2 h-2 rounded-full bg-yellow-400 animate-pulse inline-block"></span>';
    text = label + ' 로딩...';
  } else if (status === 'success') {
    dot = '<span class="w-2 h-2 rounded-full bg-green-500 inline-block"></span>';
    text = successFn();
  } else if (status === 'error') {
    dot = '<span class="w-2 h-2 rounded-full bg-red-400 inline-block"></span>';
    text = label + ' 연결 실패 (기본값 사용)';
  } else {
    dot = '<span class="w-2 h-2 rounded-full bg-gray-300 inline-block"></span>';
    text = label + ' 대기';
  }
  return '<div class="flex items-center gap-1.5">' + dot +
    ' <span class="text-gray-700">' + text + '</span></div>';
}

// 날씨 결과를 weatherSelect/weather-option에 자동 반영
function applyWeatherToSelect() {
  if (!liveDataState.weather || liveDataState.weatherStatus !== 'success') return;
  var code = liveDataState.weather.weatherCode;

  // route-optimizer: select 드롭다운
  var select = document.getElementById('weatherSelect');
  if (select) {
    select.value = code;
    select.dispatchEvent(new Event('change', { bubbles: true }));
  }

  // heatmap: weather-option 카드
  var options = document.querySelectorAll('.weather-option');
  if (options.length > 0) {
    options.forEach(function(opt) {
      opt.classList.remove('active', 'ring-2', 'ring-amber-400', 'bg-amber-50');
      if (opt.dataset.weather === code) {
        opt.classList.add('active', 'ring-2', 'ring-amber-400', 'bg-amber-50');
      }
    });
    // heatmap state 업데이트
    if (typeof state !== 'undefined' && state.weather !== undefined) {
      state.weather = code;
      if (typeof updateAll === 'function') updateAll();
    }
  }
}

/* ── (G) 수요/시간 보정 함수 ── */

// 교통 혼잡도를 반영한 수요 점수 보정
function getTrafficDemandMultiplier() {
  if (!liveDataState.traffic || liveDataState.trafficStatus !== 'success') return 1.0;
  return TRAFFIC_DEMAND_BOOST[liveDataState.traffic.congestionLevel] || 1.0;
}

// 교통 혼잡도를 반영한 이동 시간 보정
function adjustRouteTimeByTraffic(estimatedTime) {
  if (!liveDataState.traffic || liveDataState.trafficStatus !== 'success') return estimatedTime;
  var multiplier = TRAFFIC_TIME_MULTIPLIER[liveDataState.traffic.congestionLevel] || 1.0;
  return Math.round(estimatedTime * multiplier);
}

/* ── (H) 자동 초기화 ── */

var liveDataRefreshTimer = null;

async function initLiveData() {
  var cityKey = (typeof currentCity !== 'undefined') ? currentCity : 'seoul';

  try {
    await loadLiveData(cityKey);

    // 날씨 자동 반영
    if (liveDataState.weatherStatus === 'success') {
      applyWeatherToSelect();
    }
  } catch (e) {
    console.warn('[실시간] 초기 로딩 실패, mock 데이터 사용:', e.message);
  }

  // 5분마다 자동 갱신
  if (liveDataRefreshTimer) clearInterval(liveDataRefreshTimer);
  liveDataRefreshTimer = setInterval(function() {
    var city = (typeof currentCity !== 'undefined') ? currentCity : 'seoul';
    loadLiveData(city).then(function() {
      if (liveDataState.weatherStatus === 'success') {
        applyWeatherToSelect();
      }
    }).catch(function(e) {
      console.warn('[실시간] 자동 갱신 실패:', e.message);
    });
  }, 5 * 60 * 1000);

  console.log('[실시간] 공공데이터 API 초기화 완료 (5분 주기 갱신)');
}
