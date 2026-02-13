/* ═══════════════════════════════════════════
   택시빈차내비AI — shared.js (공통 유틸·헤더·푸터)
   ═══════════════════════════════════════════ */

/* ── 유틸리티 ── */
function fmt(n) { return new Intl.NumberFormat('ko-KR').format(n); }
function fmtWon(n) { return n >= 100000000 ? (n / 100000000).toFixed(1) + '억원' : n >= 10000 ? Math.round(n / 10000) + '만원' : fmt(n) + '원'; }

function getScoreColor(s) { return s >= 80 ? 'text-red-600' : s >= 65 ? 'text-orange-500' : s >= 50 ? 'text-yellow-600' : 'text-green-600'; }
function getScoreBg(s) { return s >= 80 ? 'bg-red-50' : s >= 65 ? 'bg-orange-50' : s >= 50 ? 'bg-yellow-50' : 'bg-green-50'; }
function getScoreBarColor(s) { return s >= 80 ? 'bg-red-500' : s >= 65 ? 'bg-orange-500' : s >= 50 ? 'bg-yellow-500' : 'bg-green-500'; }

/* ── 헤더 렌더링 ── */
function renderHeader(active) {
  var nav = [
    { href: 'heatmap.html', label: '수요 히트맵', key: 'heatmap' },
    { href: 'route-optimizer.html', label: '경로 최적화', key: 'route' },
    { href: 'simulation.html', label: '시뮬레이션', key: 'simulation' },
    { href: 'statistics.html', label: '수익 통계', key: 'statistics' },
    { href: 'ai-report.html', label: 'AI 리포트', key: 'report' },
    { href: 'pricing.html', label: '요금제', key: 'pricing' }
  ];
  var navLinks = nav.map(function(n) {
    var isActive = active === n.key;
    return '<a href="' + n.href + '" class="px-3 py-2 rounded-lg text-sm font-medium transition" ' +
      'style="border:2px solid ' + (isActive ? '#f59e0b' : '#4b5563') + '"' +
      ' onmouseover="this.style.borderColor=\'#f59e0b\';this.style.background=\'#fffbeb\';this.style.color=\'#d97706\'"' +
      ' onmouseout="this.style.borderColor=\'' + (isActive ? '#f59e0b' : '#4b5563') + '\';this.style.background=\'\';this.style.color=\'\'">' +
      n.label + '</a>';
  }).join('');

  var mobileLinks = nav.map(function(n) {
    var isActive = active === n.key;
    return '<a href="' + n.href + '" class="block px-3 py-2.5 rounded-lg text-sm ' + (isActive ? 'text-amber-600 bg-amber-50 font-semibold' : 'text-gray-700 hover:bg-gray-50') + '">' + n.label + '</a>';
  }).join('');

  return '<header class="sticky top-0 z-50 backdrop-blur border-b border-sky-300" style="background:rgba(135,206,235,0.92);">' +
    '<div class="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">' +
    '<a href="index.html" class="flex items-center gap-2 shrink-0">' +
    '<div class="w-9 h-9 bg-amber-500 rounded-lg flex items-center justify-center text-lg">&#x1F695;</div>' +
    '<span class="font-bold text-lg text-gray-900">택시빈차내비<span class="text-amber-600">AI</span></span>' +
    '<span class="text-gray-600 hidden sm:inline" style="font-size:0.7em; margin-left:8px;">빈차 운행경로 최적화 AI 맵</span></a>' +
    '<nav class="hidden xl:flex items-center gap-1">' + navLinks + '</nav>' +
    '<button id="mobile-toggle" class="xl:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg" onclick="toggleMobileMenu()">' +
    '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg></button>' +
    '</div>' +
    '<div id="mobile-menu" class="hidden xl:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-1 shadow-lg">' +
    mobileLinks + '</div></header>';
}

function toggleMobileMenu() {
  document.getElementById('mobile-menu').classList.toggle('hidden');
}

/* ── 푸터 렌더링 ── */
function renderFooter() {
  return '<footer class="bg-gray-900 text-gray-400 py-16">' +
    '<div class="max-w-7xl mx-auto px-6">' +
    '<div class="grid md:grid-cols-4 gap-10">' +
    '<div><div class="flex items-center gap-2 mb-4"><div class="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center text-lg">&#x1F695;</div><span class="text-white font-bold">택시빈차내비AI</span></div>' +
    '<p class="text-sm leading-relaxed">데이터 기반 AI 택시 빈차운행 최적화 플랫폼.<br>빈차 시간을 줄이고 수익을 극대화합니다.</p></div>' +
    '<div><h4 class="text-white font-semibold mb-4">솔루션</h4>' +
    '<ul class="space-y-2 text-sm"><li><a href="heatmap.html" class="hover:text-white transition">수요 히트맵</a></li><li><a href="route-optimizer.html" class="hover:text-white transition">경로 최적화</a></li><li><a href="simulation.html" class="hover:text-white transition">시뮬레이션</a></li><li><a href="statistics.html" class="hover:text-white transition">수익 통계</a></li></ul></div>' +
    '<div><h4 class="text-white font-semibold mb-4">정보</h4>' +
    '<ul class="space-y-2 text-sm"><li><a href="ai-report.html" class="hover:text-white transition">AI 리포트</a></li><li><a href="pricing.html" class="hover:text-white transition">요금제</a></li></ul></div>' +
    '<div><h4 class="text-white font-semibold mb-4">고객지원</h4>' +
    '<ul class="space-y-2 text-sm"><li>전화: 010-2397-5734</li><li>이메일: jaiwshim@gmail.com</li><li>운영: 평일 09:00~18:00</li></ul></div>' +
    '</div>' +
    '<div class="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">' +
    '<p>&copy; 2026 택시빈차내비AI. Jaiwoo Shim &nbsp; All rights reserved.</p>' +
    '<p>빈차 시간을 0에 가깝게</p></div></div></footer>';
}

/* ── 페이지 초기화 ── */
function initPage(activeKey) {
  var header = document.getElementById('app-header');
  var footer = document.getElementById('app-footer');
  if (header) {
    header.innerHTML = renderHeader(activeKey);
    header.style.position = 'sticky';
    header.style.top = '0';
    header.style.zIndex = '50';
  }
  if (footer) footer.innerHTML = renderFooter();
}

/* ── 점수 바 HTML ── */
function scoreBarHTML(label, score, maxScore) {
  maxScore = maxScore || 100;
  var pct = Math.round((score / maxScore) * 100);
  return '<div class="flex items-center gap-3">' +
    '<span class="text-sm text-gray-600 w-20 shrink-0">' + label + '</span>' +
    '<div class="flex-1 score-bar"><div class="score-bar-fill ' + getScoreBarColor(score) + '" style="width:' + pct + '%"></div></div>' +
    '<span class="text-sm font-bold ' + getScoreColor(score) + ' w-10 text-right">' + score + '</span></div>';
}

/* ── 시간 포맷 ── */
function formatHour(h) {
  return (h < 10 ? '0' : '') + h + ':00';
}

/* ── 도시 선택 드롭다운 HTML 생성 ── */
function buildCitySelectHTML(selectId, onchangeFn) {
  selectId = selectId || 'citySelect';
  onchangeFn = onchangeFn || 'onCityChange(this.value)';
  var options = Object.keys(CITY_DATA).map(function(key) {
    return '<option value="' + key + '"' + (key === 'seoul' ? ' selected' : '') + '>' +
      CITY_DATA[key].name + '</option>';
  }).join('');
  return '<select id="' + selectId + '" onchange="' + onchangeFn + '"' +
    ' class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none bg-white">' +
    options + '</select>';
}

/* ── 도시 변경 시 HOTSPOTS 업데이트 (공통) ── */
function switchCity(cityKey) {
  var city = CITY_DATA[cityKey];
  if (!city) return null;
  HOTSPOTS = city.hotspots;
  return city;
}

function minutesToTimeStr(minutes) {
  var h = Math.floor(minutes / 60) % 24;
  var m = Math.floor(minutes % 60);
  return (h < 10 ? '0' : '') + h + ':' + (m < 10 ? '0' : '') + m;
}
