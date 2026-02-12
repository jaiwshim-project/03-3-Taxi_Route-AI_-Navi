/* ═══════════════════════════════════════════
   택시내비AI — mock-data.js (서울 택시 수요 목업 데이터)
   ═══════════════════════════════════════════ */

/* ── 서울시 구 데이터 ── */
var SEOUL_DISTRICTS = [
  { id: 'jongno',    name: '종로구',   lat: 37.5735, lng: 126.9790, population: 148000, floating: 280000, taxiDemand: 85, avgFare: 8500 },
  { id: 'jung',      name: '중구',     lat: 37.5641, lng: 126.9979, population: 125000, floating: 350000, taxiDemand: 92, avgFare: 9200 },
  { id: 'yongsan',   name: '용산구',   lat: 37.5326, lng: 126.9909, population: 228000, floating: 180000, taxiDemand: 72, avgFare: 8800 },
  { id: 'seongdong', name: '성동구',   lat: 37.5633, lng: 127.0371, population: 303000, floating: 160000, taxiDemand: 68, avgFare: 7500 },
  { id: 'gwangjin',  name: '광진구',   lat: 37.5385, lng: 127.0824, population: 357000, floating: 170000, taxiDemand: 70, avgFare: 7800 },
  { id: 'dongdaemun',name: '동대문구', lat: 37.5744, lng: 127.0398, population: 346000, floating: 200000, taxiDemand: 74, avgFare: 7200 },
  { id: 'jungnang',  name: '중랑구',   lat: 37.6065, lng: 127.0928, population: 398000, floating: 120000, taxiDemand: 55, avgFare: 6800 },
  { id: 'seongbuk',  name: '성북구',   lat: 37.5894, lng: 127.0167, population: 436000, floating: 140000, taxiDemand: 58, avgFare: 7000 },
  { id: 'gangbuk',   name: '강북구',   lat: 37.6397, lng: 127.0255, population: 313000, floating: 100000, taxiDemand: 48, avgFare: 6500 },
  { id: 'dobong',    name: '도봉구',   lat: 37.6688, lng: 127.0472, population: 326000, floating: 90000,  taxiDemand: 45, avgFare: 6200 },
  { id: 'nowon',     name: '노원구',   lat: 37.6542, lng: 127.0568, population: 520000, floating: 150000, taxiDemand: 52, avgFare: 6500 },
  { id: 'eunpyeong', name: '은평구',   lat: 37.6027, lng: 126.9291, population: 479000, floating: 130000, taxiDemand: 50, avgFare: 6800 },
  { id: 'seodaemun', name: '서대문구', lat: 37.5791, lng: 126.9368, population: 312000, floating: 170000, taxiDemand: 62, avgFare: 7200 },
  { id: 'mapo',      name: '마포구',   lat: 37.5663, lng: 126.9014, population: 370000, floating: 310000, taxiDemand: 82, avgFare: 8200 },
  { id: 'yangcheon', name: '양천구',   lat: 37.5170, lng: 126.8666, population: 454000, floating: 140000, taxiDemand: 55, avgFare: 7000 },
  { id: 'gangseo',   name: '강서구',   lat: 37.5510, lng: 126.8495, population: 580000, floating: 250000, taxiDemand: 65, avgFare: 7500 },
  { id: 'guro',      name: '구로구',   lat: 37.4954, lng: 126.8876, population: 415000, floating: 220000, taxiDemand: 62, avgFare: 7200 },
  { id: 'geumcheon', name: '금천구',   lat: 37.4569, lng: 126.8957, population: 234000, floating: 180000, taxiDemand: 55, avgFare: 6800 },
  { id: 'yeongdeungpo', name: '영등포구', lat: 37.5264, lng: 126.8963, population: 395000, floating: 380000, taxiDemand: 88, avgFare: 8800 },
  { id: 'dongjak',   name: '동작구',   lat: 37.5124, lng: 126.9396, population: 397000, floating: 150000, taxiDemand: 60, avgFare: 7200 },
  { id: 'gwanak',    name: '관악구',   lat: 37.4784, lng: 126.9516, population: 500000, floating: 210000, taxiDemand: 62, avgFare: 7000 },
  { id: 'seocho',    name: '서초구',   lat: 37.4837, lng: 127.0324, population: 430000, floating: 350000, taxiDemand: 90, avgFare: 9500 },
  { id: 'gangnam',   name: '강남구',   lat: 37.5172, lng: 127.0473, population: 530000, floating: 450000, taxiDemand: 95, avgFare: 10200 },
  { id: 'songpa',    name: '송파구',   lat: 37.5145, lng: 127.1050, population: 660000, floating: 320000, taxiDemand: 80, avgFare: 8500 },
  { id: 'gangdong',  name: '강동구',   lat: 37.5301, lng: 127.1238, population: 453000, floating: 160000, taxiDemand: 58, avgFare: 7200 }
];

/* ── 핫스팟 (승객 밀집 지점) ── */
var HOTSPOTS = [
  // 강남권
  { id: 1,  name: '강남역',       district: '강남구',   type: '교통',   lat: 37.4979, lng: 127.0276, peakHour: '18:00-22:00', baseScore: 98, avgWait: 2, avgFare: 11500, dailyPassengers: 4200 },
  { id: 2,  name: '역삼역',       district: '강남구',   type: '업무',   lat: 37.5008, lng: 127.0363, peakHour: '18:00-20:00', baseScore: 88, avgWait: 3, avgFare: 10800, dailyPassengers: 2800 },
  { id: 3,  name: '선릉역',       district: '강남구',   type: '업무',   lat: 37.5046, lng: 127.0489, peakHour: '18:00-20:00', baseScore: 85, avgWait: 3, avgFare: 10200, dailyPassengers: 2400 },
  { id: 4,  name: '삼성역(코엑스)', district: '강남구', type: '상업',   lat: 37.5089, lng: 127.0609, peakHour: '19:00-23:00', baseScore: 90, avgWait: 3, avgFare: 12000, dailyPassengers: 3100 },
  { id: 5,  name: '압구정로데오',  district: '강남구',   type: '유흥',   lat: 37.5270, lng: 127.0400, peakHour: '21:00-02:00', baseScore: 82, avgWait: 4, avgFare: 9800,  dailyPassengers: 1800 },
  { id: 6,  name: '신논현역',     district: '강남구',   type: '교통',   lat: 37.5045, lng: 127.0252, peakHour: '18:00-21:00', baseScore: 86, avgWait: 3, avgFare: 10500, dailyPassengers: 2600 },
  // 서초권
  { id: 7,  name: '교대역',       district: '서초구',   type: '교통',   lat: 37.4935, lng: 127.0145, peakHour: '17:00-20:00', baseScore: 80, avgWait: 4, avgFare: 9200,  dailyPassengers: 2200 },
  { id: 8,  name: '서초역',       district: '서초구',   type: '업무',   lat: 37.4920, lng: 127.0076, peakHour: '18:00-20:00', baseScore: 78, avgWait: 4, avgFare: 9500,  dailyPassengers: 1900 },
  { id: 9,  name: '고속터미널',    district: '서초구',   type: '교통',   lat: 37.5048, lng: 127.0040, peakHour: '16:00-21:00', baseScore: 92, avgWait: 2, avgFare: 13500, dailyPassengers: 3500 },
  // 송파권
  { id: 10, name: '잠실역(롯데월드)', district: '송파구', type: '상업', lat: 37.5133, lng: 127.1000, peakHour: '18:00-22:00', baseScore: 88, avgWait: 3, avgFare: 9800,  dailyPassengers: 3200 },
  { id: 11, name: '석촌호수',     district: '송파구',   type: '관광',   lat: 37.5084, lng: 127.1020, peakHour: '17:00-21:00', baseScore: 65, avgWait: 5, avgFare: 8500,  dailyPassengers: 1200 },
  { id: 12, name: '가락시장역',   district: '송파구',   type: '시장',   lat: 37.4926, lng: 127.1185, peakHour: '05:00-08:00', baseScore: 72, avgWait: 4, avgFare: 7800,  dailyPassengers: 1600 },
  // 중구/종로
  { id: 13, name: '서울역',       district: '중구',     type: '교통',   lat: 37.5547, lng: 126.9707, peakHour: '07:00-10:00', baseScore: 95, avgWait: 2, avgFare: 14200, dailyPassengers: 4500 },
  { id: 14, name: '명동',         district: '중구',     type: '상업',   lat: 37.5636, lng: 126.9850, peakHour: '14:00-22:00', baseScore: 88, avgWait: 3, avgFare: 8500,  dailyPassengers: 3000 },
  { id: 15, name: '동대문(DDP)',  district: '중구',     type: '상업',   lat: 37.5672, lng: 127.0094, peakHour: '19:00-01:00', baseScore: 80, avgWait: 4, avgFare: 8200,  dailyPassengers: 2200 },
  { id: 16, name: '광화문',       district: '종로구',   type: '업무',   lat: 37.5759, lng: 126.9769, peakHour: '17:00-20:00', baseScore: 85, avgWait: 3, avgFare: 9800,  dailyPassengers: 2800 },
  { id: 17, name: '종각역',       district: '종로구',   type: '유흥',   lat: 37.5700, lng: 126.9833, peakHour: '21:00-02:00', baseScore: 82, avgWait: 4, avgFare: 8800,  dailyPassengers: 2000 },
  { id: 18, name: '을지로입구역', district: '중구',     type: '업무',   lat: 37.5660, lng: 126.9826, peakHour: '17:00-20:00', baseScore: 80, avgWait: 4, avgFare: 9200,  dailyPassengers: 2100 },
  // 마포/영등포
  { id: 19, name: '홍대입구역',   district: '마포구',   type: '유흥',   lat: 37.5571, lng: 126.9246, peakHour: '21:00-03:00', baseScore: 94, avgWait: 2, avgFare: 9500,  dailyPassengers: 4000 },
  { id: 20, name: '합정역',       district: '마포구',   type: '상업',   lat: 37.5496, lng: 126.9139, peakHour: '18:00-23:00', baseScore: 78, avgWait: 4, avgFare: 8200,  dailyPassengers: 1800 },
  { id: 21, name: '여의도(IFC)',  district: '영등포구', type: '업무',   lat: 37.5252, lng: 126.9256, peakHour: '17:00-20:00', baseScore: 88, avgWait: 3, avgFare: 11200, dailyPassengers: 2900 },
  { id: 22, name: '영등포역',     district: '영등포구', type: '교통',   lat: 37.5159, lng: 126.9073, peakHour: '07:00-10:00', baseScore: 82, avgWait: 3, avgFare: 9800,  dailyPassengers: 2500 },
  { id: 23, name: '여의나루역',   district: '영등포구', type: '관광',   lat: 37.5273, lng: 126.9328, peakHour: '17:00-21:00', baseScore: 60, avgWait: 6, avgFare: 8500,  dailyPassengers: 1000 },
  // 용산
  { id: 24, name: '이태원역',     district: '용산구',   type: '유흥',   lat: 37.5346, lng: 126.9946, peakHour: '21:00-03:00', baseScore: 80, avgWait: 4, avgFare: 9200,  dailyPassengers: 1900 },
  { id: 25, name: '용산역',       district: '용산구',   type: '교통',   lat: 37.5299, lng: 126.9647, peakHour: '07:00-10:00', baseScore: 85, avgWait: 3, avgFare: 12500, dailyPassengers: 2700 },
  // 기타 주요 지점
  { id: 26, name: '건대입구역',   district: '광진구',   type: '유흥',   lat: 37.5402, lng: 127.0699, peakHour: '20:00-02:00', baseScore: 82, avgWait: 4, avgFare: 8500,  dailyPassengers: 2200 },
  { id: 27, name: '왕십리역',     district: '성동구',   type: '교통',   lat: 37.5614, lng: 127.0380, peakHour: '17:00-20:00', baseScore: 72, avgWait: 5, avgFare: 7800,  dailyPassengers: 1500 },
  { id: 28, name: '신촌역',       district: '서대문구', type: '유흥',   lat: 37.5551, lng: 126.9366, peakHour: '20:00-02:00', baseScore: 78, avgWait: 4, avgFare: 7500,  dailyPassengers: 1800 },
  { id: 29, name: '노량진역',     district: '동작구',   type: '교통',   lat: 37.5133, lng: 126.9420, peakHour: '07:00-10:00', baseScore: 65, avgWait: 5, avgFare: 7200,  dailyPassengers: 1200 },
  { id: 30, name: '구로디지털단지', district: '구로구', type: '업무',   lat: 37.4853, lng: 126.9016, peakHour: '17:00-20:00', baseScore: 75, avgWait: 4, avgFare: 8200,  dailyPassengers: 2000 },
  { id: 31, name: '김포공항',     district: '강서구',   type: '교통',   lat: 37.5616, lng: 126.8016, peakHour: '06:00-22:00', baseScore: 90, avgWait: 3, avgFare: 18500, dailyPassengers: 3800 },
  { id: 32, name: '목동 행복한세상', district: '양천구', type: '주거', lat: 37.5283, lng: 126.8742, peakHour: '07:00-09:00', baseScore: 55, avgWait: 6, avgFare: 7500,  dailyPassengers: 900 },
  { id: 33, name: '천호역',       district: '강동구',   type: '상업',   lat: 37.5386, lng: 127.1233, peakHour: '18:00-22:00', baseScore: 70, avgWait: 5, avgFare: 7800,  dailyPassengers: 1400 },
  { id: 34, name: '수유역',       district: '강북구',   type: '상업',   lat: 37.6383, lng: 127.0250, peakHour: '18:00-21:00', baseScore: 58, avgWait: 6, avgFare: 6800,  dailyPassengers: 1000 },
  { id: 35, name: '대학로(혜화역)', district: '종로구', type: '문화',   lat: 37.5822, lng: 127.0019, peakHour: '19:00-23:00', baseScore: 72, avgWait: 5, avgFare: 8000,  dailyPassengers: 1500 },
  { id: 36, name: '신림역',       district: '관악구',   type: '교통',   lat: 37.4842, lng: 126.9293, peakHour: '21:00-01:00', baseScore: 68, avgWait: 5, avgFare: 7200,  dailyPassengers: 1300 },
  { id: 37, name: '사당역',       district: '동작구',   type: '교통',   lat: 37.4764, lng: 126.9816, peakHour: '07:00-10:00', baseScore: 75, avgWait: 4, avgFare: 8200,  dailyPassengers: 1800 },
  { id: 38, name: '논현역',       district: '강남구',   type: '유흥',   lat: 37.5104, lng: 127.0218, peakHour: '21:00-03:00', baseScore: 80, avgWait: 4, avgFare: 9500,  dailyPassengers: 1700 },
  { id: 39, name: '신도림역',     district: '구로구',   type: '교통',   lat: 37.5088, lng: 126.8912, peakHour: '07:00-10:00', baseScore: 78, avgWait: 4, avgFare: 8500,  dailyPassengers: 2000 },
  { id: 40, name: '디지털미디어시티', district: '마포구', type: '업무', lat: 37.5768, lng: 126.8997, peakHour: '17:00-20:00', baseScore: 70, avgWait: 5, avgFare: 8800,  dailyPassengers: 1400 }
];

/* ── 시간대별 수요 가중치 ── */
var HOURLY_DEMAND = {
  0: 0.35, 1: 0.25, 2: 0.20, 3: 0.15, 4: 0.12, 5: 0.20,
  6: 0.45, 7: 0.75, 8: 0.95, 9: 0.80, 10: 0.60, 11: 0.65,
  12: 0.70, 13: 0.65, 14: 0.60, 15: 0.65, 16: 0.70, 17: 0.85,
  18: 1.00, 19: 0.95, 20: 0.85, 21: 0.80, 22: 0.75, 23: 0.55
};

/* ── 핫스팟 유형별 시간대 가중치 ── */
var TYPE_HOUR_WEIGHTS = {
  '교통': { 6: 1.2, 7: 1.5, 8: 1.4, 9: 1.1, 16: 1.1, 17: 1.3, 18: 1.5, 19: 1.3, 20: 1.0 },
  '업무': { 7: 0.8, 8: 0.9, 17: 1.5, 18: 1.8, 19: 1.5, 20: 1.2 },
  '상업': { 11: 1.1, 12: 1.2, 13: 1.1, 14: 1.2, 18: 1.3, 19: 1.5, 20: 1.4, 21: 1.3, 22: 1.1 },
  '유흥': { 20: 1.2, 21: 1.5, 22: 1.8, 23: 2.0, 0: 2.2, 1: 2.0, 2: 1.5, 3: 1.0 },
  '관광': { 10: 1.1, 11: 1.2, 14: 1.3, 15: 1.4, 16: 1.3, 17: 1.5, 18: 1.3 },
  '시장': { 4: 1.3, 5: 1.8, 6: 2.0, 7: 1.8, 8: 1.2, 14: 0.8, 15: 0.7 },
  '주거': { 6: 1.3, 7: 1.5, 8: 1.4, 17: 0.8, 22: 1.2, 23: 1.3 },
  '문화': { 18: 1.2, 19: 1.4, 20: 1.5, 21: 1.6, 22: 1.5, 23: 1.2 }
};

/* ── 요일별 수요 가중치 ── */
var DAY_WEIGHTS = {
  0: 0.80,  // 일
  1: 0.90,  // 월
  2: 0.95,  // 화
  3: 1.00,  // 수
  4: 1.05,  // 목
  5: 1.15,  // 금
  6: 1.10   // 토
};

/* ── 날씨별 수요 가중치 ── */
var WEATHER_WEIGHTS = {
  'clear': 1.0,
  'cloudy': 1.05,
  'rain': 1.35,
  'heavy_rain': 1.55,
  'snow': 1.45
};

/* ── 수요 예측 지점 (추가 세부) ── */
function generateDemandPoints() {
  var points = [];
  HOTSPOTS.forEach(function(hs) {
    // 핫스팟 중심점
    points.push({
      lat: hs.lat, lng: hs.lng,
      intensity: hs.baseScore / 100,
      name: hs.name, type: hs.type, district: hs.district
    });
    // 주변 보조 포인트 (반경 300~800m에 3~5개)
    var numSub = 3 + Math.floor(hs.baseScore / 30);
    for (var i = 0; i < numSub; i++) {
      var angle = (i / numSub) * 2 * Math.PI;
      var dist = 0.003 + Math.random() * 0.005;
      points.push({
        lat: hs.lat + Math.cos(angle) * dist,
        lng: hs.lng + Math.sin(angle) * dist,
        intensity: (hs.baseScore * (0.3 + Math.random() * 0.4)) / 100
      });
    }
  });
  return points;
}

/* ── 시·도 목록 ── */
function getSidoList() {
  return ['서울특별시'];
}

/* ── 구별 핫스팟 가져오기 ── */
function getHotspotsByDistrict(districtName) {
  if (districtName === 'all') return HOTSPOTS;
  return HOTSPOTS.filter(function(h) { return h.district === districtName; });
}

/* ── 실시간 수요 점수 계산 ── */
function calculateDemandScore(hotspot, hour, dayOfWeek, weather) {
  hour = hour !== undefined ? hour : new Date().getHours();
  dayOfWeek = dayOfWeek !== undefined ? dayOfWeek : new Date().getDay();
  weather = weather || 'clear';

  var base = hotspot.baseScore;
  var hourWeight = HOURLY_DEMAND[hour] || 0.5;
  var typeWeights = TYPE_HOUR_WEIGHTS[hotspot.type] || {};
  var typeHourWeight = typeWeights[hour] || 1.0;
  var dayWeight = DAY_WEIGHTS[dayOfWeek] || 1.0;
  var weatherWeight = WEATHER_WEIGHTS[weather] || 1.0;

  var score = base * hourWeight * typeHourWeight * dayWeight * weatherWeight;
  return Math.min(100, Math.round(score));
}

/* ── 수요 등급 ── */
function getDemandGrade(score) {
  if (score >= 85) return { grade: 'S', color: 'text-red-600 bg-red-50', label: '최상' };
  if (score >= 70) return { grade: 'A', color: 'text-orange-600 bg-orange-50', label: '상' };
  if (score >= 55) return { grade: 'B', color: 'text-yellow-600 bg-yellow-50', label: '중' };
  if (score >= 40) return { grade: 'C', color: 'text-green-600 bg-green-50', label: '하' };
  return { grade: 'D', color: 'text-gray-600 bg-gray-50', label: '최하' };
}

/* ── 한강 남북 구분 (다리 건너기 방지) ── */
var NORTH_DISTRICTS = ['종로구', '중구', '용산구', '성동구', '광진구', '동대문구', '중랑구', '성북구', '강북구', '도봉구', '노원구', '은평구', '서대문구', '마포구'];
var SOUTH_DISTRICTS = ['양천구', '강서구', '구로구', '금천구', '영등포구', '동작구', '관악구', '서초구', '강남구', '송파구', '강동구'];

/* 구 이름으로 한강 남/북 판별 */
function getDistrictRiverSide(districtName) {
  if (NORTH_DISTRICTS.indexOf(districtName) !== -1) return 'north';
  if (SOUTH_DISTRICTS.indexOf(districtName) !== -1) return 'south';
  return 'unknown';
}

/* 좌표로 한강 남/북 판별 (한강 근사선 기준) */
function getRiverSideByCoords(lat, lng) {
  // 한강은 서쪽(마포)~동쪽(강동) 약간 남쪽으로 흐름
  // 근사: lat ≈ 37.527 (서쪽) ~ 37.520 (동쪽)
  var riverLat = 37.5355 - 0.05 * (lng - 126.90);
  return lat > riverLat ? 'north' : 'south';
}

/* 핫스팟의 한강 남/북 판별 (구 이름 우선, 없으면 좌표) */
function getHotspotRiverSide(hs) {
  if (hs.district) {
    var side = getDistrictRiverSide(hs.district);
    if (side !== 'unknown') return side;
  }
  return getRiverSideByCoords(hs.lat, hs.lng);
}

/* 출발지와 같은 한강 쪽 핫스팟만 필터링 */
function filterHotspotsBySameRiverSide(hotspots, startLat, startLng) {
  var startSide = getRiverSideByCoords(startLat, startLng);
  return hotspots.filter(function(hs) {
    var hsSide = getHotspotRiverSide(hs);
    return hsSide === startSide || hsSide === 'unknown';
  });
}
