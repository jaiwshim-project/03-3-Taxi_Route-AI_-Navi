/* ═══════════════════════════════════════════
   택시내비AI — map-engine.js
   Leaflet 지도 유틸리티 모듈
   ═══════════════════════════════════════════ */

function initMap(containerId, center, zoom) {
  center = center || [37.5665, 126.9780];
  zoom = zoom || 12;
  var map = L.map(containerId, { center: center, zoom: zoom, zoomControl: true, scrollWheelZoom: true });
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 19
  }).addTo(map);
  return map;
}

function addHeatLayer(map, points, options) {
  options = options || {};
  var defaults = {
    radius: options.radius || 25,
    blur: options.blur || 15,
    maxZoom: options.maxZoom || 17,
    max: options.max || 1.0,
    gradient: options.gradient || { 0.2: '#22c55e', 0.4: '#eab308', 0.6: '#f97316', 0.8: '#ef4444', 1.0: '#991b1b' }
  };
  return L.heatLayer(points, defaults).addTo(map);
}

function addRoutePolyline(map, latlngs, options) {
  options = options || {};
  return L.polyline(latlngs, {
    color: options.color || '#f59e0b',
    weight: options.weight || 4,
    opacity: options.opacity || 0.8,
    dashArray: options.dashArray || null,
    lineJoin: 'round', lineCap: 'round'
  }).addTo(map);
}

function addNumberedMarker(map, lat, lng, number, color, popupContent) {
  var colorMap = {
    amber: '#f59e0b', red: '#dc2626', green: '#059669', blue: '#2563eb',
    orange: '#ea580c', purple: '#7c3aed'
  };
  var bgColor = colorMap[color] || colorMap.amber;
  var icon = L.divIcon({
    className: 'custom-div-icon',
    html: '<div style="background:' + bgColor + ';color:white;border-radius:50%;width:32px;height:32px;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:14px;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3);font-family:Pretendard Variable,sans-serif;">' + number + '</div>',
    iconSize: [32, 32], iconAnchor: [16, 16], popupAnchor: [0, -18]
  });
  var marker = L.marker([lat, lng], { icon: icon }).addTo(map);
  if (popupContent) marker.bindPopup(popupContent, { maxWidth: 280, className: 'custom-popup' });
  return marker;
}

function addHotspotMarker(map, hotspot, score) {
  var grade = getDemandGrade(score);
  var bgColor = score >= 80 ? '#dc2626' : score >= 65 ? '#ea580c' : score >= 50 ? '#eab308' : '#22c55e';
  var size = score >= 80 ? 30 : score >= 65 ? 26 : 22;
  var icon = L.divIcon({
    className: 'custom-div-icon',
    html: '<div style="background:' + bgColor + ';color:white;border-radius:50%;width:' + size + 'px;height:' + size + 'px;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:' + (size > 26 ? 12 : 10) + 'px;border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3);font-family:Pretendard Variable,sans-serif;">' + score + '</div>',
    iconSize: [size, size], iconAnchor: [size/2, size/2], popupAnchor: [0, -size/2 - 2]
  });
  var popup = '<div><p class="font-bold text-sm">' + hotspot.name + '</p>' +
    '<p class="text-xs text-gray-500 mt-1">' + hotspot.district + ' / ' + hotspot.type + '</p>' +
    '<p class="text-xs mt-1">수요 점수: <b class="' + getScoreColor(score) + '">' + score + '</b> (' + grade.label + ')</p>' +
    '<p class="text-xs">평균 대기: <b>' + hotspot.avgWait + '분</b></p>' +
    '<p class="text-xs">평균 요금: <b>' + fmt(hotspot.avgFare) + '원</b></p>' +
    '<p class="text-xs">피크 시간: <b>' + hotspot.peakHour + '</b></p></div>';
  var marker = L.marker([hotspot.lat, hotspot.lng], { icon: icon }).addTo(map);
  marker.bindPopup(popup, { maxWidth: 280 });
  return marker;
}

function addTaxiMarker(map, lat, lng) {
  var icon = L.divIcon({
    className: 'custom-div-icon',
    html: '<div class="taxi-marker animate-glow">&#x1F695;</div>',
    iconSize: [36, 36], iconAnchor: [18, 18], popupAnchor: [0, -20]
  });
  var marker = L.marker([lat, lng], { icon: icon }).addTo(map);
  marker.bindPopup('<div class="text-center"><p class="font-bold text-sm">현재 위치</p><p class="text-xs text-gray-500">내 택시</p></div>');
  return marker;
}

function addCircleOverlay(map, lat, lng, radius, color) {
  return L.circle([lat, lng], {
    radius: radius || 500, color: color || '#f59e0b',
    fillColor: color || '#f59e0b', fillOpacity: 0.1, weight: 2, opacity: 0.4
  }).addTo(map);
}

function fitMapBounds(map, points) {
  if (!points || points.length === 0) return;
  var latlngs = points.map(function(p) {
    if (Array.isArray(p)) return L.latLng(p[0], p[1]);
    if (p.lat !== undefined) return L.latLng(p.lat, p.lng);
    return null;
  }).filter(function(l) { return l !== null; });
  if (latlngs.length === 0) return;
  map.fitBounds(L.latLngBounds(latlngs), { padding: [40, 40], maxZoom: 15 });
}
