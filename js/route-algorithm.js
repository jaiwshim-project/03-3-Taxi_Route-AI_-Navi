/* ═══════════════════════════════════════════
   택시내비AI — route-algorithm.js
   빈차 운행 경로 최적화 알고리즘
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

/* ── 수요 가중 최근접 이웃 (Demand-Weighted Nearest Neighbor) ── */
function demandWeightedNearestNeighbor(distMatrix, scores, startIndex) {
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
      // 수요 점수를 거리로 나눈 가치 함수: score / distance
      var value = (scores[j] || 50) / dist;
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

/* ── 2-opt 개선 (수요 가중) ── */
function twoOptImproveWeighted(route, distMatrix, scores, maxIterations) {
  maxIterations = maxIterations || 100;
  var bestRoute = route.slice();
  var improved = true;
  var iteration = 0;

  function routeCost(r) {
    var cost = 0;
    for (var i = 0; i < r.length - 1; i++) {
      var dist = distMatrix[r[i]][r[i + 1]];
      var nextScore = scores[r[i + 1]] || 50;
      // 비용 = 거리 / 수요점수 (높은 수요로 갈수록 낮은 비용)
      cost += dist / (nextScore / 100 + 0.1);
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

/* ── 빈차 최적 경로 계획 ── */
function planEmptyCarRoute(currentPos, hotspots, hour, dayOfWeek, weather, maxStops) {
  maxStops = maxStops || 8;
  hour = hour !== undefined ? hour : new Date().getHours();

  // 1. 각 핫스팟의 실시간 수요 점수 계산
  var scored = hotspots.map(function(hs) {
    var score = calculateDemandScore(hs, hour, dayOfWeek, weather);
    return { hotspot: hs, score: score };
  });

  // 2. 점수 기준 정렬 후 상위 N개 선택
  scored.sort(function(a, b) { return b.score - a.score; });
  var topSpots = scored.slice(0, Math.min(maxStops * 2, scored.length));

  // 3. 거리와 점수를 종합하여 최종 핫스팟 선택
  var allPoints = [{ lat: currentPos.lat, lng: currentPos.lng }];
  var spotScores = [0];
  topSpots.forEach(function(s) {
    allPoints.push({ lat: s.hotspot.lat, lng: s.hotspot.lng });
    spotScores.push(s.score);
  });

  var distMatrix = buildDistanceMatrix(allPoints);

  // 4. 수요 가중 최근접 이웃으로 초기 경로 생성
  var route = demandWeightedNearestNeighbor(distMatrix, spotScores, 0);

  // maxStops+1까지만 (현재위치 포함)
  if (route.length > maxStops + 1) route = route.slice(0, maxStops + 1);

  // 5. 2-opt 개선
  route = twoOptImproveWeighted(route, distMatrix, spotScores, 80);

  // 6. 결과 구성
  var routeSpots = [];
  var totalDist = 0;
  var totalScore = 0;
  for (var i = 0; i < route.length; i++) {
    var idx = route[i];
    if (idx === 0) {
      routeSpots.push({ type: 'start', lat: currentPos.lat, lng: currentPos.lng, name: '현재 위치', score: 0 });
    } else {
      var ts = topSpots[idx - 1];
      routeSpots.push({
        type: 'hotspot',
        lat: ts.hotspot.lat, lng: ts.hotspot.lng,
        name: ts.hotspot.name, district: ts.hotspot.district,
        hotspotType: ts.hotspot.type,
        score: ts.score,
        avgFare: ts.hotspot.avgFare,
        avgWait: ts.hotspot.avgWait,
        peakHour: ts.hotspot.peakHour,
        dailyPassengers: ts.hotspot.dailyPassengers
      });
      totalScore += ts.score;
    }
    if (i > 0) totalDist += distMatrix[route[i - 1]][route[i]];
  }

  var roadDist = totalDist * 1.4;
  var estimatedTime = Math.round((roadDist / 25) * 60); // 시내 25km/h
  var fuelCost = Math.round(roadDist * 160); // LPG 기준 km당 160원

  return {
    route: routeSpots,
    totalDistance: Math.round(roadDist * 100) / 100,
    estimatedTime: estimatedTime,
    fuelCost: fuelCost,
    avgDemandScore: routeSpots.length > 1 ? Math.round(totalScore / (routeSpots.length - 1)) : 0,
    expectedPickups: Math.round(routeSpots.filter(function(r) { return r.type === 'hotspot'; }).length * 0.65),
    distMatrix: distMatrix,
    routeIndices: route
  };
}

/* ── OSRM 실제 도로 경로 ── */
async function getOSRMRoute(waypoints) {
  if (!waypoints || waypoints.length < 2) return { distance: 0, duration: 0, geometry: [] };
  var coords = waypoints.map(function(wp) { return wp.lng + ',' + wp.lat; }).join(';');
  var url = 'https://router.project-osrm.org/route/v1/driving/' + coords + '?overview=full&geometries=polyline&steps=false';
  try {
    var response = await fetch(url);
    if (!response.ok) throw new Error('OSRM HTTP ' + response.status);
    var data = await response.json();
    if (data.code !== 'Ok' || !data.routes || data.routes.length === 0) throw new Error('OSRM no route');
    var route = data.routes[0];
    return {
      distance: Math.round(route.distance / 10) / 100,
      duration: Math.round(route.duration / 60),
      geometry: decodePolyline(route.geometry)
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
    var stayMinutes = (i === 0) ? 0 : 5; // 핫스팟 도착 후 대기/탐색 5분
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
