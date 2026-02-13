/* ═══════════════════════════════════════════
   택시내비AI — route-algorithm.js
   빈차 운행 경로 최적화 알고리즘
   3가지 전략: 수요 우선 / 균형 / 거리 우선
   ═══════════════════════════════════════════ */

function haversineDistance(lat1, lng1, lat2, lng2) {
  var R = 6371;
  var dLat = (lat2 - lat1) * Math.PI / 180;
  var dLng = (lng2 - lng1) * Math.PI / 180;
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
          Math.sin(dLng / 2) * Math.sin(dLng / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function buildDistanceMatrix(spots) {
  var n = spots.length;
  var matrix = [];
  for (var i = 0; i < n; i++) {
    matrix[i] = [];
    for (var j = 0; j < n; j++) {
      if (i === j) matrix[i][j] = 0;
      else if (j < i && matrix[j]) matrix[i][j] = matrix[j][i];
      else matrix[i][j] = haversineDistance(spots[i].lat, spots[i].lng, spots[j].lat, spots[j].lng);
    }
  }
  return matrix;
}

/* ══════════════════════════════════════
   전략 1: 수요 우선 (Demand-First)
   — 수요 점수 높은 곳을 우선 방문
   — 거리가 멀어도 수요 높으면 선택
   ══════════════════════════════════════ */

/* 수요 가중 최근접 이웃: value = score^2 / distance */
function demandFirstNearestNeighbor(distMatrix, scores, startIndex) {
  var n = distMatrix.length;
  var visited = new Array(n).fill(false);
  var route = [startIndex];
  visited[startIndex] = true;
  var current = startIndex;

  for (var step = 1; step < n; step++) {
    var bestValue = -Infinity;
    var bestNext = -1;

    for (var j = 0; j < n; j++) {
      if (visited[j]) continue;
      var dist = distMatrix[current][j];
      if (dist < 0.001) dist = 0.001;
      var score = scores[j] || 1;
      // 수요 우선: score^2 / distance (수요에 훨씬 높은 가중치)
      var value = (score * score) / dist;
      if (value > bestValue) {
        bestValue = value;
        bestNext = j;
      }
    }

    if (bestNext === -1) break;
    route.push(bestNext);
    visited[bestNext] = true;
    current = bestNext;
  }
  return route;
}

/* 수요 가중 2-opt: cost = distance / (score/100)^2 */
function twoOptDemandFirst(route, distMatrix, scores, maxIterations) {
  maxIterations = maxIterations || 80;
  var bestRoute = route.slice();
  var improved = true;
  var iteration = 0;

  function routeCost(r) {
    var cost = 0;
    for (var i = 0; i < r.length - 1; i++) {
      var dist = distMatrix[r[i]][r[i + 1]];
      var nextScore = scores[r[i + 1]] || 1;
      cost += dist / Math.pow(nextScore / 100, 2);
    }
    return cost;
  }

  var bestCost = routeCost(bestRoute);
  while (improved && iteration < maxIterations) {
    improved = false;
    iteration++;
    for (var i = 1; i < bestRoute.length - 1; i++) {
      for (var j = i + 1; j < bestRoute.length; j++) {
        var newRoute = bestRoute.slice();
        var reversed = newRoute.slice(i, j + 1).reverse();
        for (var k = 0; k < reversed.length; k++) newRoute[i + k] = reversed[k];
        var newCost = routeCost(newRoute);
        if (newCost < bestCost) {
          bestRoute = newRoute;
          bestCost = newCost;
          improved = true;
        }
      }
    }
  }
  return bestRoute;
}

/* ══════════════════════════════════════
   전략 2: 균형 (Balanced)
   — 수요와 거리를 5:5 비율로 균형
   — 적절한 수요 + 적절한 거리
   ══════════════════════════════════════ */

/* 균형 최근접 이웃: value = score / sqrt(distance) */
function balancedNearestNeighbor(distMatrix, scores, startIndex) {
  var n = distMatrix.length;
  var visited = new Array(n).fill(false);
  var route = [startIndex];
  visited[startIndex] = true;
  var current = startIndex;

  for (var step = 1; step < n; step++) {
    var bestValue = -Infinity;
    var bestNext = -1;

    for (var j = 0; j < n; j++) {
      if (visited[j]) continue;
      var dist = distMatrix[current][j];
      if (dist < 0.001) dist = 0.001;
      var score = scores[j] || 1;
      // 균형: score / sqrt(distance) (수요와 거리를 균형 있게)
      var value = score / Math.sqrt(dist);
      if (value > bestValue) {
        bestValue = value;
        bestNext = j;
      }
    }

    if (bestNext === -1) break;
    route.push(bestNext);
    visited[bestNext] = true;
    current = bestNext;
  }
  return route;
}

/* 균형 2-opt: cost = distance * (1 + 1/(score/100)) */
function twoOptBalanced(route, distMatrix, scores, maxIterations) {
  maxIterations = maxIterations || 80;
  var bestRoute = route.slice();
  var improved = true;
  var iteration = 0;

  function routeCost(r) {
    var cost = 0;
    for (var i = 0; i < r.length - 1; i++) {
      var dist = distMatrix[r[i]][r[i + 1]];
      var nextScore = scores[r[i + 1]] || 1;
      // 균형: 거리 × (1 + 1/정규화점수) → 수요 높으면 비용 약간 낮아짐
      cost += dist * (1 + 1 / (nextScore / 100 + 0.5));
    }
    return cost;
  }

  var bestCost = routeCost(bestRoute);
  while (improved && iteration < maxIterations) {
    improved = false;
    iteration++;
    for (var i = 1; i < bestRoute.length - 1; i++) {
      for (var j = i + 1; j < bestRoute.length; j++) {
        var newRoute = bestRoute.slice();
        var reversed = newRoute.slice(i, j + 1).reverse();
        for (var k = 0; k < reversed.length; k++) newRoute[i + k] = reversed[k];
        var newCost = routeCost(newRoute);
        if (newCost < bestCost) {
          bestRoute = newRoute;
          bestCost = newCost;
          improved = true;
        }
      }
    }
  }
  return bestRoute;
}

/* ══════════════════════════════════════
   전략 3: 거리 우선 (Distance-First)
   — 순수하게 가까운 곳부터 방문
   — 총 이동 거리를 최소화
   ══════════════════════════════════════ */

/* 순수 최근접 이웃: 거리만 고려 */
function distanceFirstNearestNeighbor(distMatrix, startIndex) {
  var n = distMatrix.length;
  var visited = new Array(n).fill(false);
  var route = [startIndex];
  visited[startIndex] = true;
  var current = startIndex;

  for (var step = 1; step < n; step++) {
    var bestDist = Infinity;
    var bestNext = -1;

    for (var j = 0; j < n; j++) {
      if (visited[j]) continue;
      var dist = distMatrix[current][j];
      if (dist < bestDist) {
        bestDist = dist;
        bestNext = j;
      }
    }

    if (bestNext === -1) break;
    route.push(bestNext);
    visited[bestNext] = true;
    current = bestNext;
  }
  return route;
}

/* 순수 거리 2-opt: cost = 총 거리 */
function twoOptDistanceFirst(route, distMatrix, maxIterations) {
  maxIterations = maxIterations || 100;
  var bestRoute = route.slice();
  var improved = true;
  var iteration = 0;

  function routeCost(r) {
    var cost = 0;
    for (var i = 0; i < r.length - 1; i++) {
      cost += distMatrix[r[i]][r[i + 1]];
    }
    return cost;
  }

  var bestCost = routeCost(bestRoute);
  while (improved && iteration < maxIterations) {
    improved = false;
    iteration++;
    for (var i = 1; i < bestRoute.length - 1; i++) {
      for (var j = i + 1; j < bestRoute.length; j++) {
        var d1 = distMatrix[bestRoute[i - 1]][bestRoute[i]] +
                 (j + 1 < bestRoute.length ? distMatrix[bestRoute[j]][bestRoute[j + 1]] : 0);
        var d2 = distMatrix[bestRoute[i - 1]][bestRoute[j]] +
                 (j + 1 < bestRoute.length ? distMatrix[bestRoute[i]][bestRoute[j + 1]] : 0);
        if (d2 < d1) {
          var reversed = bestRoute.slice(i, j + 1).reverse();
          for (var k = 0; k < reversed.length; k++) bestRoute[i + k] = reversed[k];
          bestCost = routeCost(bestRoute);
          improved = true;
        }
      }
    }
  }
  return bestRoute;
}

/* ══════════════════════════════════════
   통합 빈차 경로 계획 함수
   priority: 'demand' | 'balanced' | 'distance'
   ══════════════════════════════════════ */
function planEmptyCarRoute(currentPos, hotspots, hour, dayOfWeek, weather, maxStops, priority) {
  maxStops = maxStops || 8;
  priority = priority || 'balanced';
  hour = hour !== undefined ? hour : new Date().getHours();

  // 0. 한강 다리 건너기 방지: 출발지와 같은 쪽 핫스팟만 사용
  if (typeof filterHotspotsBySameRiverSide === 'function') {
    hotspots = filterHotspotsBySameRiverSide(hotspots, currentPos.lat, currentPos.lng);
  }

  // 1. 각 핫스팟의 수요 점수 + 출발지 거리 계산
  var scored = hotspots.map(function(hs) {
    var score = calculateDemandScore(hs, hour, dayOfWeek, weather);
    var distFromStart = haversineDistance(currentPos.lat, currentPos.lng, hs.lat, hs.lng);
    return { hotspot: hs, score: score, distFromStart: distFromStart };
  });

  // 1.5. 빈차 운행 반경 제한 — 출발지에서 너무 먼 핫스팟 제외
  // 빈차 택시가 승객을 찾으며 이동할 합리적 반경 (직선 15km ≈ 도로 ~20km)
  // 제주도처럼 한라산 넘어가거나, 비현실적인 장거리 공차 운행 방지
  var MAX_SEARCH_RADIUS = 15; // km (직선거리)
  var nearbyScored = scored.filter(function(s) {
    return s.distFromStart <= MAX_SEARCH_RADIUS;
  });
  if (nearbyScored.length >= 2) {
    scored = nearbyScored;
  } else {
    // 반경 내 핫스팟이 1개 이하면 가까운 순으로 최소 2개 확보
    scored.sort(function(a, b) { return a.distFromStart - b.distFromStart; });
    scored = scored.slice(0, 2);
  }

  // 2. 전략별 핫스팟 선택 (후보 풀 구성)
  // 핫스팟이 적은 도시(지방)에서도 경로가 차별화되도록:
  //  (a) 방문 수를 자동 축소 — 전체의 50%만 방문하여 전략 간 차이 극대화
  //  (b) 후보 풀을 전략별로 다르게 구성 — 수요/거리/균형 각각 다른 부분집합
  var isSmallPool = scored.length <= maxStops * 2;

  if (isSmallPool && scored.length > 3) {
    // 핫스팟 10개 + maxStops 8 → maxStops 5로 축소 (50%만 방문)
    maxStops = Math.min(maxStops, Math.max(3, Math.ceil(scored.length * 0.5)));
  }

  var topSpots;

  if (priority === 'demand') {
    // 수요 우선: 수요 점수 상위 65%만 후보로 사용 (저수요 제외)
    scored.sort(function(a, b) { return b.score - a.score; });
    if (isSmallPool) {
      var demandCut = Math.max(maxStops, Math.ceil(scored.length * 0.65));
      topSpots = scored.slice(0, demandCut);
    } else {
      topSpots = scored.slice(0, Math.min(maxStops * 2, scored.length));
    }

  } else if (priority === 'distance') {
    // 거리 우선: 가까운 순 65%만 후보로 사용 (원거리 제외)
    var filtered = scored.filter(function(s) { return s.score >= 30; });
    if (filtered.length < maxStops) filtered = scored.slice();
    filtered.sort(function(a, b) { return a.distFromStart - b.distFromStart; });
    if (isSmallPool) {
      var distCut = Math.max(maxStops, Math.ceil(filtered.length * 0.65));
      topSpots = filtered.slice(0, distCut);
    } else {
      topSpots = filtered.slice(0, Math.min(maxStops * 2, filtered.length));
    }

  } else {
    // 균형: 종합 가치 기준, 전체 후보 사용 (알고리즘이 차별화)
    scored.forEach(function(s) {
      s.combinedValue = s.score / Math.sqrt(s.distFromStart + 0.5);
    });
    scored.sort(function(a, b) { return b.combinedValue - a.combinedValue; });
    if (isSmallPool) {
      topSpots = scored.slice(0, scored.length);
    } else {
      topSpots = scored.slice(0, Math.min(maxStops * 2, scored.length));
    }
  }

  // 3. 경로 포인트 구성 (출발지 = index 0)
  var allPoints = [{ lat: currentPos.lat, lng: currentPos.lng }];
  var spotScores = [0];
  topSpots.forEach(function(s) {
    allPoints.push({ lat: s.hotspot.lat, lng: s.hotspot.lng });
    spotScores.push(s.score);
  });

  var distMatrix = buildDistanceMatrix(allPoints);

  // 4. 전략별 경로 탐색 알고리즘
  var route;

  if (priority === 'demand') {
    route = demandFirstNearestNeighbor(distMatrix, spotScores, 0);
    if (route.length > maxStops + 1) route = route.slice(0, maxStops + 1);
    route = twoOptDemandFirst(route, distMatrix, spotScores, 80);

  } else if (priority === 'distance') {
    route = distanceFirstNearestNeighbor(distMatrix, 0);
    if (route.length > maxStops + 1) route = route.slice(0, maxStops + 1);
    route = twoOptDistanceFirst(route, distMatrix, 100);

  } else {
    route = balancedNearestNeighbor(distMatrix, spotScores, 0);
    if (route.length > maxStops + 1) route = route.slice(0, maxStops + 1);
    route = twoOptBalanced(route, distMatrix, spotScores, 80);
  }

  // 5. 결과 구성 — 수요 점수 기반 수익 예측
  var routeSpots = [];
  var totalDist = 0;
  var totalScore = 0;
  var totalPickupProb = 0;       // 탑승 확률 합산
  var totalExpectedRevenue = 0;  // 기대 수입 합산
  var totalWaitTime = 0;         // 총 대기 시간(분)

  for (var i = 0; i < route.length; i++) {
    var idx = route[i];
    if (idx === 0) {
      routeSpots.push({ type: 'start', lat: currentPos.lat, lng: currentPos.lng, name: '현재 위치', score: 0, pickupProb: 0 });
    } else {
      var ts = topSpots[idx - 1];
      // 수요 점수 기반 탑승 확률: score 90→85%, 70→55%, 50→30%, 30→12%
      var pickupProb = Math.min(0.95, Math.max(0.05, (ts.score - 20) / 80 * 0.85 + 0.05));
      // 대기 시간: 수요 높으면 짧게 (score 90→2분, score 50→8분)
      var waitMin = Math.max(1, Math.round(ts.hotspot.avgWait * (1 - (ts.score - 50) / 150)));

      routeSpots.push({
        type: 'hotspot',
        lat: ts.hotspot.lat, lng: ts.hotspot.lng,
        name: ts.hotspot.name, district: ts.hotspot.district,
        hotspotType: ts.hotspot.type,
        score: ts.score,
        avgFare: ts.hotspot.avgFare,
        avgWait: waitMin,
        peakHour: ts.hotspot.peakHour,
        dailyPassengers: ts.hotspot.dailyPassengers,
        pickupProb: Math.round(pickupProb * 100) / 100
      });
      totalScore += ts.score;
      totalPickupProb += pickupProb;
      totalExpectedRevenue += pickupProb * (ts.hotspot.avgFare || 8000);
      totalWaitTime += waitMin;
    }
    if (i > 0) totalDist += distMatrix[route[i - 1]][route[i]];
  }

  var hotspotCount = routeSpots.filter(function(r) { return r.type === 'hotspot'; }).length;
  var roadDist = totalDist * 1.4;
  var estimatedTime = Math.round((roadDist / 25) * 60) + totalWaitTime;
  var fuelCost = Math.round(roadDist * 160);

  return {
    route: routeSpots,
    totalDistance: Math.round(roadDist * 100) / 100,
    estimatedTime: estimatedTime,
    fuelCost: fuelCost,
    avgDemandScore: hotspotCount > 0 ? Math.round(totalScore / hotspotCount) : 0,
    expectedPickups: Math.round(totalPickupProb * 10) / 10,
    expectedRevenue: Math.round(totalExpectedRevenue),
    totalWaitTime: totalWaitTime,
    distMatrix: distMatrix,
    routeIndices: route
  };
}

/* ── OSRM 실제 도로 경로 (자동차 전용도로 제외) ── */
async function getOSRMRoute(waypoints) {
  if (!waypoints || waypoints.length < 2) return { distance: 0, duration: 0, geometry: [] };
  var coords = waypoints.map(function(wp) { return wp.lng + ',' + wp.lat; }).join(';');
  var baseUrl = 'https://router.project-osrm.org/route/v1/driving/' + coords;
  var params = '?overview=full&geometries=polyline&steps=false';

  // 1차 시도: exclude=motorway (자동차 전용도로 제외)
  try {
    var response = await fetch(baseUrl + params + '&exclude=motorway');
    if (!response.ok) throw new Error('OSRM HTTP ' + response.status);
    var data = await response.json();
    if (data.code === 'Ok' && data.routes && data.routes.length > 0) {
      var route = data.routes[0];
      return {
        distance: Math.round(route.distance / 10) / 100,
        duration: Math.round(route.duration / 60),
        geometry: decodePolyline(route.geometry)
      };
    }
  } catch (e) {
    console.warn('[OSRM] exclude=motorway 실패, 재시도:', e.message);
  }

  // 2차 시도: exclude 없이 기본 라우팅
  try {
    var response2 = await fetch(baseUrl + params);
    if (!response2.ok) throw new Error('OSRM HTTP ' + response2.status);
    var data2 = await response2.json();
    if (data2.code !== 'Ok' || !data2.routes || data2.routes.length === 0) throw new Error('OSRM no route');
    var route2 = data2.routes[0];
    return {
      distance: Math.round(route2.distance / 10) / 100,
      duration: Math.round(route2.duration / 60),
      geometry: decodePolyline(route2.geometry)
    };
  } catch (err) {
    console.warn('[OSRM] 라우팅 실패:', err.message);
    var fallbackDist = 0, fallbackGeom = [];
    for (var i = 0; i < waypoints.length; i++) {
      fallbackGeom.push([waypoints[i].lat, waypoints[i].lng]);
      if (i < waypoints.length - 1) fallbackDist += haversineDistance(waypoints[i].lat, waypoints[i].lng, waypoints[i+1].lat, waypoints[i+1].lng);
    }
    return { distance: Math.round(fallbackDist * 1.4 * 100) / 100, duration: Math.round((fallbackDist * 1.4 / 25) * 60), geometry: fallbackGeom };
  }
}

function decodePolyline(encoded) {
  if (!encoded) return [];
  var points = [], index = 0, lat = 0, lng = 0;
  while (index < encoded.length) {
    var shift = 0, result = 0, byte;
    do { byte = encoded.charCodeAt(index++) - 63; result |= (byte & 0x1f) << shift; shift += 5; } while (byte >= 0x20);
    lat += (result & 1) ? ~(result >> 1) : (result >> 1);
    shift = 0; result = 0;
    do { byte = encoded.charCodeAt(index++) - 63; result |= (byte & 0x1f) << shift; shift += 5; } while (byte >= 0x20);
    lng += (result & 1) ? ~(result >> 1) : (result >> 1);
    points.push([lat / 1e5, lng / 1e5]);
  }
  return points;
}

/* ── 경로 일정 추정 ── */
function estimateRouteSchedule(routeResult, startTime) {
  startTime = startTime || '08:00';
  var parts = startTime.split(':');
  var currentMinutes = parseInt(parts[0]) * 60 + parseInt(parts[1]);
  var schedule = [];
  var route = routeResult.route;
  var distMatrix = routeResult.distMatrix;
  var routeIndices = routeResult.routeIndices;

  for (var i = 0; i < route.length; i++) {
    var arrivalTime = minutesToTimeStr(currentMinutes);
    var stayMinutes = (i === 0) ? 0 : 5;
    var departureTime = minutesToTimeStr(currentMinutes + stayMinutes);

    var distanceToNext = 0;
    var travelTimeToNext = 0;
    if (i < route.length - 1 && distMatrix && routeIndices) {
      var rawDist = distMatrix[routeIndices[i]][routeIndices[i + 1]];
      distanceToNext = Math.round(rawDist * 1.4 * 100) / 100;
      travelTimeToNext = Math.max(1, Math.round((distanceToNext / 25) * 60));
    }

    schedule.push({
      spot: route[i], order: i,
      arrivalTime: arrivalTime, departureTime: departureTime,
      stayMinutes: stayMinutes,
      distanceToNext: distanceToNext, travelTimeToNext: travelTimeToNext
    });

    currentMinutes += stayMinutes + travelTimeToNext;
  }
  return schedule;
}
