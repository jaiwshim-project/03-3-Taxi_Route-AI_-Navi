/* ═══════════════════════════════════════════
   택시빈차내비AI — demand-engine.js
   수요 예측 및 분석 엔진
   ═══════════════════════════════════════════ */

/* ── 수익 시뮬레이션 ── */
function simulateRevenue(strategy, hours, hotspots, weather) {
  weather = weather || 'clear';
  var dayOfWeek = new Date().getDay();
  var totalFare = 0;
  var totalTrips = 0;
  var totalEmptyKm = 0;
  var totalOccupiedKm = 0;
  var totalFuel = 0;
  var hourlyData = [];

  for (var h = 0; h < hours; h++) {
    var currentHour = (8 + h) % 24; // 8시 시작
    var hourDemand = HOURLY_DEMAND[currentHour] || 0.5;
    var weatherMult = WEATHER_WEIGHTS[weather] || 1.0;
    var dayMult = DAY_WEIGHTS[dayOfWeek] || 1.0;

    var tripsThisHour, emptyKm, avgFare;

    if (strategy === 'ai') {
      // AI 최적화 전략: 수요 높은 곳으로 이동
      var topScores = hotspots.map(function(hs) {
        return calculateDemandScore(hs, currentHour, dayOfWeek, weather);
      }).sort(function(a, b) { return b - a; });
      var avgTopScore = topScores.slice(0, 5).reduce(function(a, b) { return a + b; }, 0) / 5;

      tripsThisHour = Math.round(2.5 * hourDemand * weatherMult * dayMult * (avgTopScore / 75));
      emptyKm = Math.round(4 * (1 - hourDemand * 0.6));
      avgFare = Math.round(9500 * (1 + (avgTopScore - 70) / 200));
    } else if (strategy === 'experienced') {
      // 경험 기반 전략: 보통 수준
      tripsThisHour = Math.round(2.0 * hourDemand * weatherMult * dayMult);
      emptyKm = Math.round(6 * (1 - hourDemand * 0.4));
      avgFare = 8500;
    } else {
      // 무작위 전략: 낮은 효율
      tripsThisHour = Math.round(1.5 * hourDemand * weatherMult * dayMult);
      emptyKm = Math.round(8 * (1 - hourDemand * 0.2));
      avgFare = 7800;
    }

    tripsThisHour = Math.max(0, tripsThisHour);
    var occupiedKm = tripsThisHour * (avgFare / 1200); // 요금/km 약 1200원
    var fuelCost = Math.round((emptyKm + occupiedKm) * 160); // LPG km당 160원

    totalTrips += tripsThisHour;
    totalFare += tripsThisHour * avgFare;
    totalEmptyKm += emptyKm;
    totalOccupiedKm += occupiedKm;
    totalFuel += fuelCost;

    hourlyData.push({
      hour: currentHour,
      trips: tripsThisHour,
      fare: tripsThisHour * avgFare,
      emptyKm: emptyKm,
      occupiedKm: occupiedKm,
      fuelCost: fuelCost
    });
  }

  return {
    totalTrips: totalTrips,
    totalFare: totalFare,
    totalEmptyKm: totalEmptyKm,
    totalOccupiedKm: totalOccupiedKm,
    totalFuel: totalFuel,
    netIncome: totalFare - totalFuel,
    occupancyRate: totalOccupiedKm > 0 ? Math.round((totalOccupiedKm / (totalOccupiedKm + totalEmptyKm)) * 100) : 0,
    avgFarePerTrip: totalTrips > 0 ? Math.round(totalFare / totalTrips) : 0,
    hourlyData: hourlyData
  };
}

/* ── 24시간 수요 패턴 생성 ── */
function generate24HourPattern(hotspot, dayOfWeek, weather) {
  var pattern = [];
  for (var h = 0; h < 24; h++) {
    pattern.push({
      hour: h,
      score: calculateDemandScore(hotspot, h, dayOfWeek, weather),
      label: formatHour(h)
    });
  }
  return pattern;
}

/* ── 구역별 수요 집계 ── */
function aggregateDistrictDemand(hour, dayOfWeek, weather) {
  var districts = {};
  HOTSPOTS.forEach(function(hs) {
    var score = calculateDemandScore(hs, hour, dayOfWeek, weather);
    if (!districts[hs.district]) {
      districts[hs.district] = { name: hs.district, totalScore: 0, count: 0, maxScore: 0, topSpot: null };
    }
    districts[hs.district].totalScore += score;
    districts[hs.district].count++;
    if (score > districts[hs.district].maxScore) {
      districts[hs.district].maxScore = score;
      districts[hs.district].topSpot = hs.name;
    }
  });

  var result = [];
  Object.keys(districts).forEach(function(key) {
    var d = districts[key];
    d.avgScore = Math.round(d.totalScore / d.count);
    result.push(d);
  });
  result.sort(function(a, b) { return b.avgScore - a.avgScore; });
  return result;
}

/* ── 수요 예측 히트맵 데이터 ── */
function generateHeatmapData(hour, dayOfWeek, weather) {
  var points = [];
  HOTSPOTS.forEach(function(hs) {
    var score = calculateDemandScore(hs, hour, dayOfWeek, weather);
    var intensity = score / 100;
    points.push([hs.lat, hs.lng, intensity]);
    // 주변 보조 포인트
    var numSub = Math.floor(score / 20);
    for (var i = 0; i < numSub; i++) {
      var angle = (i / numSub) * 2 * Math.PI + Math.random() * 0.5;
      var dist = 0.002 + Math.random() * 0.004;
      points.push([
        hs.lat + Math.cos(angle) * dist,
        hs.lng + Math.sin(angle) * dist,
        intensity * (0.3 + Math.random() * 0.4)
      ]);
    }
  });
  return points;
}

/* ── 일일 수익 추정 ── */
function estimateDailyIncome(strategy) {
  var result = simulateRevenue(strategy, 10, HOTSPOTS, 'clear');
  return result;
}

/* ── 월간 수익 추정 ── */
function estimateMonthlyIncome(strategy) {
  var daily = estimateDailyIncome(strategy);
  var workDays = 25;
  return {
    monthlyTrips: daily.totalTrips * workDays,
    monthlyFare: daily.totalFare * workDays,
    monthlyFuel: daily.totalFuel * workDays,
    monthlyNet: daily.netIncome * workDays,
    dailyAvg: daily
  };
}
