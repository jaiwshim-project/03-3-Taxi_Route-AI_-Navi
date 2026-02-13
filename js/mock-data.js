/* ═══════════════════════════════════════════
   택시내비AI — mock-data.js (전국 택시 수요 목업 데이터)
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

/* ══════════════════════════════════════════════
   전국 도시 데이터 (CITY_DATA)
   ══════════════════════════════════════════════ */
var CITY_DATA = {

  /* ── 서울특별시 ── */
  seoul: {
    name: '서울특별시',
    center: [37.5665, 126.9780],
    zoom: 12,
    hasRiverFilter: true,
    startLocations: [
      { key: 'gangnam',         lat: 37.4979, lng: 127.0276, name: '강남역',         side: 'south' },
      { key: 'seoul_station',   lat: 37.5547, lng: 126.9707, name: '서울역',         side: 'north' },
      { key: 'hongdae',         lat: 37.5571, lng: 126.9246, name: '홍대입구역',     side: 'north' },
      { key: 'jamsil',          lat: 37.5133, lng: 127.1000, name: '잠실역',         side: 'south' },
      { key: 'yeouido',         lat: 37.5252, lng: 126.9256, name: '여의도 IFC',     side: 'south' },
      { key: 'gwanghwamun',     lat: 37.5759, lng: 126.9769, name: '광화문',         side: 'north' },
      { key: 'gangnam_express', lat: 37.5048, lng: 127.0040, name: '고속터미널',     side: 'south' },
      { key: 'gimpo',           lat: 37.5616, lng: 126.8016, name: '김포공항',       side: 'south' },
      { key: 'itaewon',         lat: 37.5346, lng: 126.9946, name: '이태원역',       side: 'north' },
      { key: 'myeongdong',      lat: 37.5636, lng: 126.9850, name: '명동',           side: 'north' },
      { key: 'sindorim',        lat: 37.5088, lng: 126.8912, name: '신도림역',       side: 'south' },
      { key: 'guro_digital',    lat: 37.4853, lng: 126.9016, name: '구로디지털단지', side: 'south' }
    ],
    hotspots: [
      { id: 1,  name: '강남역',       district: '강남구',   type: '교통',   lat: 37.4979, lng: 127.0276, peakHour: '18:00-22:00', baseScore: 98, avgWait: 2, avgFare: 11500, dailyPassengers: 4200 },
      { id: 2,  name: '역삼역',       district: '강남구',   type: '업무',   lat: 37.5008, lng: 127.0363, peakHour: '18:00-20:00', baseScore: 88, avgWait: 3, avgFare: 10800, dailyPassengers: 2800 },
      { id: 3,  name: '선릉역',       district: '강남구',   type: '업무',   lat: 37.5046, lng: 127.0489, peakHour: '18:00-20:00', baseScore: 85, avgWait: 3, avgFare: 10200, dailyPassengers: 2400 },
      { id: 4,  name: '삼성역(코엑스)', district: '강남구', type: '상업',   lat: 37.5089, lng: 127.0609, peakHour: '19:00-23:00', baseScore: 90, avgWait: 3, avgFare: 12000, dailyPassengers: 3100 },
      { id: 5,  name: '압구정로데오',  district: '강남구',   type: '유흥',   lat: 37.5270, lng: 127.0400, peakHour: '21:00-02:00', baseScore: 82, avgWait: 4, avgFare: 9800,  dailyPassengers: 1800 },
      { id: 6,  name: '신논현역',     district: '강남구',   type: '교통',   lat: 37.5045, lng: 127.0252, peakHour: '18:00-21:00', baseScore: 86, avgWait: 3, avgFare: 10500, dailyPassengers: 2600 },
      { id: 7,  name: '교대역',       district: '서초구',   type: '교통',   lat: 37.4935, lng: 127.0145, peakHour: '17:00-20:00', baseScore: 80, avgWait: 4, avgFare: 9200,  dailyPassengers: 2200 },
      { id: 8,  name: '서초역',       district: '서초구',   type: '업무',   lat: 37.4920, lng: 127.0076, peakHour: '18:00-20:00', baseScore: 78, avgWait: 4, avgFare: 9500,  dailyPassengers: 1900 },
      { id: 9,  name: '고속터미널',    district: '서초구',   type: '교통',   lat: 37.5048, lng: 127.0040, peakHour: '16:00-21:00', baseScore: 92, avgWait: 2, avgFare: 13500, dailyPassengers: 3500 },
      { id: 10, name: '잠실역(롯데월드)', district: '송파구', type: '상업', lat: 37.5133, lng: 127.1000, peakHour: '18:00-22:00', baseScore: 88, avgWait: 3, avgFare: 9800,  dailyPassengers: 3200 },
      { id: 11, name: '석촌호수',     district: '송파구',   type: '관광',   lat: 37.5084, lng: 127.1020, peakHour: '17:00-21:00', baseScore: 65, avgWait: 5, avgFare: 8500,  dailyPassengers: 1200 },
      { id: 12, name: '가락시장역',   district: '송파구',   type: '시장',   lat: 37.4926, lng: 127.1185, peakHour: '05:00-08:00', baseScore: 72, avgWait: 4, avgFare: 7800,  dailyPassengers: 1600 },
      { id: 13, name: '서울역',       district: '중구',     type: '교통',   lat: 37.5547, lng: 126.9707, peakHour: '07:00-10:00', baseScore: 95, avgWait: 2, avgFare: 14200, dailyPassengers: 4500 },
      { id: 14, name: '명동',         district: '중구',     type: '상업',   lat: 37.5636, lng: 126.9850, peakHour: '14:00-22:00', baseScore: 88, avgWait: 3, avgFare: 8500,  dailyPassengers: 3000 },
      { id: 15, name: '동대문(DDP)',  district: '중구',     type: '상업',   lat: 37.5672, lng: 127.0094, peakHour: '19:00-01:00', baseScore: 80, avgWait: 4, avgFare: 8200,  dailyPassengers: 2200 },
      { id: 16, name: '광화문',       district: '종로구',   type: '업무',   lat: 37.5759, lng: 126.9769, peakHour: '17:00-20:00', baseScore: 85, avgWait: 3, avgFare: 9800,  dailyPassengers: 2800 },
      { id: 17, name: '종각역',       district: '종로구',   type: '유흥',   lat: 37.5700, lng: 126.9833, peakHour: '21:00-02:00', baseScore: 82, avgWait: 4, avgFare: 8800,  dailyPassengers: 2000 },
      { id: 18, name: '을지로입구역', district: '중구',     type: '업무',   lat: 37.5660, lng: 126.9826, peakHour: '17:00-20:00', baseScore: 80, avgWait: 4, avgFare: 9200,  dailyPassengers: 2100 },
      { id: 19, name: '홍대입구역',   district: '마포구',   type: '유흥',   lat: 37.5571, lng: 126.9246, peakHour: '21:00-03:00', baseScore: 94, avgWait: 2, avgFare: 9500,  dailyPassengers: 4000 },
      { id: 20, name: '합정역',       district: '마포구',   type: '상업',   lat: 37.5496, lng: 126.9139, peakHour: '18:00-23:00', baseScore: 78, avgWait: 4, avgFare: 8200,  dailyPassengers: 1800 },
      { id: 21, name: '여의도(IFC)',  district: '영등포구', type: '업무',   lat: 37.5252, lng: 126.9256, peakHour: '17:00-20:00', baseScore: 88, avgWait: 3, avgFare: 11200, dailyPassengers: 2900 },
      { id: 22, name: '영등포역',     district: '영등포구', type: '교통',   lat: 37.5159, lng: 126.9073, peakHour: '07:00-10:00', baseScore: 82, avgWait: 3, avgFare: 9800,  dailyPassengers: 2500 },
      { id: 23, name: '여의나루역',   district: '영등포구', type: '관광',   lat: 37.5273, lng: 126.9328, peakHour: '17:00-21:00', baseScore: 60, avgWait: 6, avgFare: 8500,  dailyPassengers: 1000 },
      { id: 24, name: '이태원역',     district: '용산구',   type: '유흥',   lat: 37.5346, lng: 126.9946, peakHour: '21:00-03:00', baseScore: 80, avgWait: 4, avgFare: 9200,  dailyPassengers: 1900 },
      { id: 25, name: '용산역',       district: '용산구',   type: '교통',   lat: 37.5299, lng: 126.9647, peakHour: '07:00-10:00', baseScore: 85, avgWait: 3, avgFare: 12500, dailyPassengers: 2700 },
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
    ]
  },

  /* ── 부산광역시 ── */
  busan: {
    name: '부산광역시',
    center: [35.1796, 129.0756],
    zoom: 12,
    startLocations: [
      { key: 'busan_st',   lat: 35.1152, lng: 129.0414, name: '부산역' },
      { key: 'seomyeon',   lat: 35.1576, lng: 129.0596, name: '서면' },
      { key: 'haeundae',   lat: 35.1632, lng: 129.1636, name: '해운대역' },
      { key: 'centum',     lat: 35.1695, lng: 129.1323, name: '센텀시티' },
      { key: 'gimhae_ap',  lat: 35.1795, lng: 128.9382, name: '김해공항' }
    ],
    hotspots: [
      { id: 1,  name: '부산역',       district: '동구',     type: '교통',   lat: 35.1152, lng: 129.0414, peakHour: '07:00-10:00', baseScore: 95, avgWait: 2, avgFare: 13000, dailyPassengers: 4000 },
      { id: 2,  name: '서면역',       district: '부산진구', type: '상업',   lat: 35.1576, lng: 129.0596, peakHour: '18:00-22:00', baseScore: 92, avgWait: 2, avgFare: 9800,  dailyPassengers: 3800 },
      { id: 3,  name: '해운대해변',   district: '해운대구', type: '관광',   lat: 35.1589, lng: 129.1603, peakHour: '14:00-22:00', baseScore: 88, avgWait: 3, avgFare: 10500, dailyPassengers: 3200 },
      { id: 4,  name: '남포동(BIFF)',  district: '중구',     type: '상업',   lat: 35.0985, lng: 129.0270, peakHour: '14:00-22:00', baseScore: 85, avgWait: 3, avgFare: 8500,  dailyPassengers: 2600 },
      { id: 5,  name: '센텀시티',     district: '해운대구', type: '업무',   lat: 35.1695, lng: 129.1323, peakHour: '17:00-20:00', baseScore: 82, avgWait: 3, avgFare: 10200, dailyPassengers: 2400 },
      { id: 6,  name: '광안리',       district: '수영구',   type: '유흥',   lat: 35.1531, lng: 129.1188, peakHour: '20:00-02:00', baseScore: 80, avgWait: 4, avgFare: 9200,  dailyPassengers: 2000 },
      { id: 7,  name: '김해공항',     district: '강서구',   type: '교통',   lat: 35.1795, lng: 128.9382, peakHour: '06:00-22:00', baseScore: 90, avgWait: 2, avgFare: 18000, dailyPassengers: 3500 },
      { id: 8,  name: '부산대',       district: '금정구',   type: '유흥',   lat: 35.2309, lng: 129.0856, peakHour: '20:00-02:00', baseScore: 78, avgWait: 4, avgFare: 7800,  dailyPassengers: 1800 },
      { id: 9,  name: '동래역',       district: '동래구',   type: '상업',   lat: 35.2053, lng: 129.0797, peakHour: '18:00-21:00', baseScore: 72, avgWait: 5, avgFare: 8000,  dailyPassengers: 1500 },
      { id: 10, name: '사상역',       district: '사상구',   type: '교통',   lat: 35.1527, lng: 129.0183, peakHour: '07:00-10:00', baseScore: 75, avgWait: 4, avgFare: 8500,  dailyPassengers: 1700 },
      { id: 11, name: '자갈치시장',   district: '중구',     type: '시장',   lat: 35.0968, lng: 129.0306, peakHour: '05:00-09:00', baseScore: 70, avgWait: 5, avgFare: 7500,  dailyPassengers: 1400 },
      { id: 12, name: 'BEXCO',        district: '해운대구', type: '상업',   lat: 35.1692, lng: 129.1368, peakHour: '18:00-22:00', baseScore: 78, avgWait: 4, avgFare: 10000, dailyPassengers: 1800 },
      { id: 13, name: '연산동',       district: '연제구',   type: '상업',   lat: 35.1830, lng: 129.0786, peakHour: '18:00-21:00', baseScore: 68, avgWait: 5, avgFare: 7500,  dailyPassengers: 1200 },
      { id: 14, name: '부전시장',     district: '부산진구', type: '시장',   lat: 35.1608, lng: 129.0536, peakHour: '06:00-10:00', baseScore: 65, avgWait: 5, avgFare: 7000,  dailyPassengers: 1100 },
      { id: 15, name: '해운대역',     district: '해운대구', type: '교통',   lat: 35.1632, lng: 129.1636, peakHour: '17:00-21:00', baseScore: 82, avgWait: 3, avgFare: 9500,  dailyPassengers: 2200 }
    ]
  },

  /* ── 대구광역시 ── */
  daegu: {
    name: '대구광역시',
    center: [35.8714, 128.6014],
    zoom: 12,
    startLocations: [
      { key: 'dongdaegu',  lat: 35.8792, lng: 128.6285, name: '동대구역' },
      { key: 'banwoldang', lat: 35.8663, lng: 128.5942, name: '반월당역' },
      { key: 'daegu_st',   lat: 35.8799, lng: 128.6257, name: '대구역' },
      { key: 'daegu_ap',   lat: 35.8941, lng: 128.6586, name: '대구공항' }
    ],
    hotspots: [
      { id: 1,  name: '동대구역',     district: '동구',     type: '교통',   lat: 35.8792, lng: 128.6285, peakHour: '07:00-10:00', baseScore: 95, avgWait: 2, avgFare: 12500, dailyPassengers: 3800 },
      { id: 2,  name: '동성로',       district: '중구',     type: '상업',   lat: 35.8690, lng: 128.5958, peakHour: '18:00-23:00', baseScore: 90, avgWait: 3, avgFare: 8500,  dailyPassengers: 3000 },
      { id: 3,  name: '반월당역',     district: '중구',     type: '교통',   lat: 35.8663, lng: 128.5942, peakHour: '17:00-20:00', baseScore: 85, avgWait: 3, avgFare: 8200,  dailyPassengers: 2600 },
      { id: 4,  name: '대구역',       district: '북구',     type: '교통',   lat: 35.8799, lng: 128.6257, peakHour: '07:00-10:00', baseScore: 82, avgWait: 3, avgFare: 9500,  dailyPassengers: 2200 },
      { id: 5,  name: '서문시장',     district: '중구',     type: '시장',   lat: 35.8689, lng: 128.5795, peakHour: '05:00-10:00', baseScore: 78, avgWait: 4, avgFare: 7500,  dailyPassengers: 1800 },
      { id: 6,  name: '대구공항',     district: '동구',     type: '교통',   lat: 35.8941, lng: 128.6586, peakHour: '06:00-22:00', baseScore: 80, avgWait: 3, avgFare: 15000, dailyPassengers: 2000 },
      { id: 7,  name: '수성못',       district: '수성구',   type: '관광',   lat: 35.8283, lng: 128.6116, peakHour: '17:00-21:00', baseScore: 72, avgWait: 5, avgFare: 8000,  dailyPassengers: 1400 },
      { id: 8,  name: '경북대',       district: '북구',     type: '문화',   lat: 35.8906, lng: 128.6125, peakHour: '17:00-21:00', baseScore: 75, avgWait: 4, avgFare: 7500,  dailyPassengers: 1600 },
      { id: 9,  name: '대구시청',     district: '중구',     type: '업무',   lat: 35.8714, lng: 128.6014, peakHour: '17:00-20:00', baseScore: 78, avgWait: 4, avgFare: 8500,  dailyPassengers: 1800 },
      { id: 10, name: '칠성시장',     district: '북구',     type: '시장',   lat: 35.8774, lng: 128.5998, peakHour: '06:00-10:00', baseScore: 68, avgWait: 5, avgFare: 6800,  dailyPassengers: 1200 },
      { id: 11, name: '두류공원',     district: '달서구',   type: '관광',   lat: 35.8535, lng: 128.5700, peakHour: '16:00-20:00', baseScore: 62, avgWait: 5, avgFare: 7200,  dailyPassengers: 1000 },
      { id: 12, name: '범어역',       district: '수성구',   type: '업무',   lat: 35.8590, lng: 128.6254, peakHour: '17:00-20:00', baseScore: 75, avgWait: 4, avgFare: 8800,  dailyPassengers: 1500 }
    ]
  },

  /* ── 인천광역시 ── */
  incheon: {
    name: '인천광역시',
    center: [37.4563, 126.7052],
    zoom: 11,
    startLocations: [
      { key: 'icn_t1',    lat: 37.4492, lng: 126.4505, name: '인천공항 T1' },
      { key: 'bupyeong',  lat: 37.5074, lng: 126.7222, name: '부평역' },
      { key: 'songdo',    lat: 37.3805, lng: 126.6567, name: '송도' },
      { key: 'guwol',     lat: 37.4486, lng: 126.7030, name: '구월동' }
    ],
    hotspots: [
      { id: 1,  name: '인천공항 T1',  district: '중구',     type: '교통',   lat: 37.4492, lng: 126.4505, peakHour: '06:00-22:00', baseScore: 95, avgWait: 2, avgFare: 25000, dailyPassengers: 5000 },
      { id: 2,  name: '인천공항 T2',  district: '중구',     type: '교통',   lat: 37.4604, lng: 126.4407, peakHour: '06:00-22:00', baseScore: 92, avgWait: 2, avgFare: 25000, dailyPassengers: 4000 },
      { id: 3,  name: '부평역',       district: '부평구',   type: '상업',   lat: 37.5074, lng: 126.7222, peakHour: '18:00-22:00', baseScore: 85, avgWait: 3, avgFare: 8200,  dailyPassengers: 2800 },
      { id: 4,  name: '송도 센트럴파크', district: '연수구', type: '업무',  lat: 37.3805, lng: 126.6567, peakHour: '17:00-20:00', baseScore: 82, avgWait: 4, avgFare: 10500, dailyPassengers: 2200 },
      { id: 5,  name: '주안역',       district: '미추홀구', type: '상업',   lat: 37.4650, lng: 126.6805, peakHour: '18:00-21:00', baseScore: 78, avgWait: 4, avgFare: 7800,  dailyPassengers: 2000 },
      { id: 6,  name: '구월동',       district: '남동구',   type: '상업',   lat: 37.4486, lng: 126.7030, peakHour: '18:00-22:00', baseScore: 80, avgWait: 4, avgFare: 8500,  dailyPassengers: 2100 },
      { id: 7,  name: '인천터미널',   district: '미추홀구', type: '교통',   lat: 37.4416, lng: 126.7011, peakHour: '07:00-10:00', baseScore: 82, avgWait: 3, avgFare: 10500, dailyPassengers: 2400 },
      { id: 8,  name: '인천역(차이나타운)', district: '중구', type: '관광', lat: 37.4739, lng: 126.6174, peakHour: '14:00-20:00', baseScore: 72, avgWait: 5, avgFare: 8000,  dailyPassengers: 1500 },
      { id: 9,  name: '월미도',       district: '중구',     type: '관광',   lat: 37.4745, lng: 126.5980, peakHour: '14:00-20:00', baseScore: 62, avgWait: 5, avgFare: 8000,  dailyPassengers: 1000 },
      { id: 10, name: '청라',         district: '서구',     type: '주거',   lat: 37.5230, lng: 126.6390, peakHour: '07:00-09:00', baseScore: 60, avgWait: 6, avgFare: 8500,  dailyPassengers: 900 },
      { id: 11, name: '부개역',       district: '부평구',   type: '주거',   lat: 37.5067, lng: 126.7400, peakHour: '07:00-09:00', baseScore: 65, avgWait: 5, avgFare: 7200,  dailyPassengers: 1200 },
      { id: 12, name: '연수역',       district: '연수구',   type: '주거',   lat: 37.4149, lng: 126.6777, peakHour: '07:00-09:00', baseScore: 68, avgWait: 5, avgFare: 7500,  dailyPassengers: 1300 }
    ]
  },

  /* ── 광주광역시 ── */
  gwangju: {
    name: '광주광역시',
    center: [35.1595, 126.8526],
    zoom: 12,
    startLocations: [
      { key: 'gwangju_st',  lat: 35.1702, lng: 126.8904, name: '광주역' },
      { key: 'usquare',     lat: 35.1601, lng: 126.8795, name: '유스퀘어' },
      { key: 'chungjang',   lat: 35.1494, lng: 126.9169, name: '충장로' },
      { key: 'songjeong',   lat: 35.1374, lng: 126.7917, name: '송정역(KTX)' }
    ],
    hotspots: [
      { id: 1,  name: '충장로',       district: '동구',     type: '상업',   lat: 35.1494, lng: 126.9169, peakHour: '18:00-23:00', baseScore: 90, avgWait: 3, avgFare: 8000,  dailyPassengers: 2500 },
      { id: 2,  name: '유스퀘어',     district: '서구',     type: '교통',   lat: 35.1601, lng: 126.8795, peakHour: '07:00-10:00', baseScore: 88, avgWait: 2, avgFare: 11000, dailyPassengers: 2800 },
      { id: 3,  name: '상무지구',     district: '서구',     type: '업무',   lat: 35.1525, lng: 126.8503, peakHour: '17:00-20:00', baseScore: 85, avgWait: 3, avgFare: 8500,  dailyPassengers: 2200 },
      { id: 4,  name: '광주역',       district: '북구',     type: '교통',   lat: 35.1702, lng: 126.8904, peakHour: '07:00-10:00', baseScore: 82, avgWait: 3, avgFare: 9500,  dailyPassengers: 2000 },
      { id: 5,  name: '송정역(KTX)',  district: '광산구',   type: '교통',   lat: 35.1374, lng: 126.7917, peakHour: '06:00-22:00', baseScore: 88, avgWait: 2, avgFare: 13000, dailyPassengers: 2600 },
      { id: 6,  name: '양동시장',     district: '서구',     type: '시장',   lat: 35.1540, lng: 126.9010, peakHour: '06:00-10:00', baseScore: 70, avgWait: 5, avgFare: 6800,  dailyPassengers: 1200 },
      { id: 7,  name: '전남대',       district: '북구',     type: '문화',   lat: 35.1763, lng: 126.9093, peakHour: '17:00-21:00', baseScore: 72, avgWait: 5, avgFare: 7200,  dailyPassengers: 1400 },
      { id: 8,  name: '수완지구',     district: '광산구',   type: '주거',   lat: 35.1891, lng: 126.8236, peakHour: '07:00-09:00', baseScore: 62, avgWait: 5, avgFare: 7500,  dailyPassengers: 1000 },
      { id: 9,  name: '첨단지구',     district: '광산구',   type: '업무',   lat: 35.2220, lng: 126.8480, peakHour: '17:00-20:00', baseScore: 75, avgWait: 4, avgFare: 8000,  dailyPassengers: 1600 },
      { id: 10, name: '광주종합버스터미널', district: '서구', type: '교통', lat: 35.1590, lng: 126.8810, peakHour: '07:00-20:00', baseScore: 78, avgWait: 4, avgFare: 9000,  dailyPassengers: 1700 }
    ]
  },

  /* ── 대전광역시 ── */
  daejeon: {
    name: '대전광역시',
    center: [36.3504, 127.3845],
    zoom: 12,
    startLocations: [
      { key: 'daejeon_st',  lat: 36.3327, lng: 127.4344, name: '대전역' },
      { key: 'dunsan',      lat: 36.3534, lng: 127.3778, name: '둔산동' },
      { key: 'yuseong',     lat: 36.3548, lng: 127.3380, name: '유성온천역' }
    ],
    hotspots: [
      { id: 1,  name: '대전역',       district: '동구',     type: '교통',   lat: 36.3327, lng: 127.4344, peakHour: '07:00-10:00', baseScore: 92, avgWait: 2, avgFare: 12000, dailyPassengers: 3200 },
      { id: 2,  name: '둔산동',       district: '서구',     type: '상업',   lat: 36.3534, lng: 127.3778, peakHour: '18:00-22:00', baseScore: 88, avgWait: 3, avgFare: 8500,  dailyPassengers: 2600 },
      { id: 3,  name: '유성온천역',   district: '유성구',   type: '관광',   lat: 36.3548, lng: 127.3380, peakHour: '17:00-22:00', baseScore: 82, avgWait: 3, avgFare: 9000,  dailyPassengers: 2000 },
      { id: 4,  name: '은행동',       district: '중구',     type: '상업',   lat: 36.3271, lng: 127.4270, peakHour: '18:00-22:00', baseScore: 80, avgWait: 4, avgFare: 7800,  dailyPassengers: 1800 },
      { id: 5,  name: '서대전역',     district: '중구',     type: '교통',   lat: 36.3225, lng: 127.3784, peakHour: '07:00-10:00', baseScore: 75, avgWait: 4, avgFare: 9500,  dailyPassengers: 1600 },
      { id: 6,  name: '카이스트',     district: '유성구',   type: '문화',   lat: 36.3742, lng: 127.3563, peakHour: '17:00-21:00', baseScore: 72, avgWait: 5, avgFare: 7500,  dailyPassengers: 1400 },
      { id: 7,  name: '대전시청',     district: '서구',     type: '업무',   lat: 36.3505, lng: 127.3848, peakHour: '17:00-20:00', baseScore: 78, avgWait: 4, avgFare: 8200,  dailyPassengers: 1700 },
      { id: 8,  name: '충남대',       district: '유성구',   type: '문화',   lat: 36.3689, lng: 127.3435, peakHour: '17:00-21:00', baseScore: 68, avgWait: 5, avgFare: 7000,  dailyPassengers: 1200 },
      { id: 9,  name: '복합터미널',   district: '동구',     type: '교통',   lat: 36.3517, lng: 127.4374, peakHour: '07:00-20:00', baseScore: 82, avgWait: 3, avgFare: 10000, dailyPassengers: 2100 },
      { id: 10, name: '한밭수목원',   district: '서구',     type: '관광',   lat: 36.3686, lng: 127.3892, peakHour: '15:00-19:00', baseScore: 58, avgWait: 6, avgFare: 7200,  dailyPassengers: 800 }
    ]
  },

  /* ── 울산광역시 ── */
  ulsan: {
    name: '울산광역시',
    center: [35.5384, 129.3114],
    zoom: 12,
    startLocations: [
      { key: 'ulsan_ktx',  lat: 35.5584, lng: 129.1605, name: '울산역(KTX)' },
      { key: 'seongnam',   lat: 35.5455, lng: 129.3108, name: '성남동' },
      { key: 'samsan',     lat: 35.5431, lng: 129.3329, name: '삼산동' }
    ],
    hotspots: [
      { id: 1,  name: '울산역(KTX)',  district: '울주군',   type: '교통',   lat: 35.5584, lng: 129.1605, peakHour: '06:00-22:00', baseScore: 90, avgWait: 2, avgFare: 15000, dailyPassengers: 2800 },
      { id: 2,  name: '성남동',       district: '중구',     type: '상업',   lat: 35.5455, lng: 129.3108, peakHour: '18:00-22:00', baseScore: 85, avgWait: 3, avgFare: 8500,  dailyPassengers: 2200 },
      { id: 3,  name: '삼산동',       district: '남구',     type: '업무',   lat: 35.5431, lng: 129.3329, peakHour: '17:00-20:00', baseScore: 82, avgWait: 3, avgFare: 8200,  dailyPassengers: 2000 },
      { id: 4,  name: '태화강역',     district: '중구',     type: '교통',   lat: 35.5302, lng: 129.3089, peakHour: '07:00-10:00', baseScore: 78, avgWait: 4, avgFare: 8800,  dailyPassengers: 1600 },
      { id: 5,  name: '현대자동차',   district: '북구',     type: '업무',   lat: 35.5320, lng: 129.3680, peakHour: '06:00-08:00', baseScore: 80, avgWait: 3, avgFare: 9000,  dailyPassengers: 1800 },
      { id: 6,  name: '달동(롯데)',   district: '남구',     type: '상업',   lat: 35.5350, lng: 129.3266, peakHour: '18:00-22:00', baseScore: 75, avgWait: 4, avgFare: 7800,  dailyPassengers: 1500 },
      { id: 7,  name: '울산공항',     district: '북구',     type: '교통',   lat: 35.5935, lng: 129.3518, peakHour: '06:00-22:00', baseScore: 78, avgWait: 3, avgFare: 14000, dailyPassengers: 1400 },
      { id: 8,  name: '언양',         district: '울주군',   type: '상업',   lat: 35.5625, lng: 129.1193, peakHour: '11:00-14:00', baseScore: 58, avgWait: 6, avgFare: 7000,  dailyPassengers: 800 }
    ]
  },

  /* ── 세종특별자치시 ── */
  sejong: {
    name: '세종특별자치시',
    center: [36.4800, 127.0000],
    zoom: 13,
    startLocations: [
      { key: 'gov_complex', lat: 36.5040, lng: 127.0049, name: '정부세종청사' },
      { key: 'sejong_city', lat: 36.4977, lng: 127.0000, name: '세종시청' }
    ],
    hotspots: [
      { id: 1,  name: '정부세종청사', district: '어진동',   type: '업무',   lat: 36.5040, lng: 127.0049, peakHour: '07:00-09:00', baseScore: 88, avgWait: 3, avgFare: 10000, dailyPassengers: 2000 },
      { id: 2,  name: '세종시청',     district: '보람동',   type: '업무',   lat: 36.4977, lng: 127.0000, peakHour: '17:00-20:00', baseScore: 78, avgWait: 4, avgFare: 8000,  dailyPassengers: 1400 },
      { id: 3,  name: '고운동',       district: '고운동',   type: '상업',   lat: 36.5034, lng: 127.0126, peakHour: '18:00-22:00', baseScore: 75, avgWait: 4, avgFare: 7500,  dailyPassengers: 1200 },
      { id: 4,  name: '도담동',       district: '도담동',   type: '주거',   lat: 36.5100, lng: 127.0186, peakHour: '07:00-09:00', baseScore: 65, avgWait: 5, avgFare: 7000,  dailyPassengers: 900 },
      { id: 5,  name: '세종터미널',   district: '어진동',   type: '교통',   lat: 36.5110, lng: 127.0097, peakHour: '07:00-20:00', baseScore: 80, avgWait: 3, avgFare: 9500,  dailyPassengers: 1600 },
      { id: 6,  name: '보람동',       district: '보람동',   type: '주거',   lat: 36.4872, lng: 126.9890, peakHour: '07:00-09:00', baseScore: 58, avgWait: 6, avgFare: 6500,  dailyPassengers: 700 }
    ]
  },

  /* ── 경기도 ── */
  gyeonggi: {
    name: '경기도',
    center: [37.4138, 127.0183],
    zoom: 10,
    startLocations: [
      { key: 'suwon_st',    lat: 37.2664, lng: 127.0003, name: '수원역' },
      { key: 'pangyo',      lat: 37.3947, lng: 127.1113, name: '판교역' },
      { key: 'bundang',     lat: 37.3828, lng: 127.1188, name: '서현역(분당)' },
      { key: 'ilsan',       lat: 37.6704, lng: 126.7450, name: '킨텍스(일산)' },
      { key: 'gwangmyeong', lat: 37.4153, lng: 126.8847, name: '광명역(KTX)' }
    ],
    hotspots: [
      { id: 1,  name: '수원역',       district: '수원시',   type: '교통',   lat: 37.2664, lng: 127.0003, peakHour: '07:00-10:00', baseScore: 90, avgWait: 3, avgFare: 10000, dailyPassengers: 3500 },
      { id: 2,  name: '판교역',       district: '성남시',   type: '업무',   lat: 37.3947, lng: 127.1113, peakHour: '17:00-20:00', baseScore: 88, avgWait: 3, avgFare: 11000, dailyPassengers: 3000 },
      { id: 3,  name: '서현역(분당)', district: '성남시',   type: '상업',   lat: 37.3828, lng: 127.1188, peakHour: '18:00-22:00', baseScore: 85, avgWait: 3, avgFare: 9500,  dailyPassengers: 2600 },
      { id: 4,  name: '킨텍스(일산)', district: '고양시',   type: '상업',   lat: 37.6704, lng: 126.7450, peakHour: '10:00-20:00', baseScore: 78, avgWait: 4, avgFare: 10000, dailyPassengers: 2000 },
      { id: 5,  name: '광명역(KTX)',  district: '광명시',   type: '교통',   lat: 37.4153, lng: 126.8847, peakHour: '06:00-22:00', baseScore: 85, avgWait: 3, avgFare: 13000, dailyPassengers: 2800 },
      { id: 6,  name: '안양역',       district: '안양시',   type: '교통',   lat: 37.4011, lng: 126.9223, peakHour: '07:00-10:00', baseScore: 78, avgWait: 4, avgFare: 8500,  dailyPassengers: 2000 },
      { id: 7,  name: '부천역',       district: '부천시',   type: '교통',   lat: 37.4862, lng: 126.7838, peakHour: '07:00-10:00', baseScore: 75, avgWait: 4, avgFare: 8000,  dailyPassengers: 1800 },
      { id: 8,  name: '동탄',         district: '화성시',   type: '주거',   lat: 37.2018, lng: 127.0737, peakHour: '07:00-09:00', baseScore: 72, avgWait: 5, avgFare: 9000,  dailyPassengers: 1500 },
      { id: 9,  name: '의정부역',     district: '의정부시', type: '교통',   lat: 37.7381, lng: 127.0456, peakHour: '07:00-10:00', baseScore: 75, avgWait: 4, avgFare: 8200,  dailyPassengers: 1800 },
      { id: 10, name: '평택역',       district: '평택시',   type: '교통',   lat: 36.9926, lng: 127.0860, peakHour: '07:00-10:00', baseScore: 72, avgWait: 5, avgFare: 8500,  dailyPassengers: 1400 },
      { id: 11, name: '산본역',       district: '군포시',   type: '상업',   lat: 37.3598, lng: 126.9315, peakHour: '18:00-22:00', baseScore: 70, avgWait: 5, avgFare: 7800,  dailyPassengers: 1300 },
      { id: 12, name: '용인 처인구',  district: '용인시',   type: '주거',   lat: 37.2340, lng: 127.2090, peakHour: '07:00-09:00', baseScore: 62, avgWait: 6, avgFare: 8000,  dailyPassengers: 1000 },
      { id: 13, name: '인계동(수원)',  district: '수원시',  type: '유흥',   lat: 37.2630, lng: 127.0340, peakHour: '20:00-02:00', baseScore: 80, avgWait: 4, avgFare: 8500,  dailyPassengers: 2000 },
      { id: 14, name: '파주 운정',    district: '파주시',   type: '주거',   lat: 37.7149, lng: 126.7380, peakHour: '07:00-09:00', baseScore: 60, avgWait: 6, avgFare: 8500,  dailyPassengers: 900 },
      { id: 15, name: '고양 삼송',    district: '고양시',   type: '주거',   lat: 37.6484, lng: 126.8967, peakHour: '07:00-09:00', baseScore: 62, avgWait: 6, avgFare: 8000,  dailyPassengers: 1000 }
    ]
  },

  /* ── 강원특별자치도 ── */
  gangwon: {
    name: '강원특별자치도',
    center: [37.8228, 128.1555],
    zoom: 9,
    startLocations: [
      { key: 'chuncheon',  lat: 37.8853, lng: 127.7172, name: '춘천역' },
      { key: 'gangneung',  lat: 37.7713, lng: 128.8961, name: '강릉역(KTX)' },
      { key: 'wonju',      lat: 37.3521, lng: 127.9495, name: '원주역' },
      { key: 'sokcho',     lat: 38.2070, lng: 128.5918, name: '속초시외버스터미널' }
    ],
    hotspots: [
      { id: 1,  name: '춘천역',       district: '춘천시',   type: '교통',   lat: 37.8853, lng: 127.7172, peakHour: '07:00-10:00', baseScore: 82, avgWait: 4, avgFare: 9000,  dailyPassengers: 1800 },
      { id: 2,  name: '춘천 명동',    district: '춘천시',   type: '상업',   lat: 37.8793, lng: 127.7270, peakHour: '18:00-22:00', baseScore: 78, avgWait: 4, avgFare: 7500,  dailyPassengers: 1500 },
      { id: 3,  name: '강릉역(KTX)',  district: '강릉시',   type: '교통',   lat: 37.7713, lng: 128.8961, peakHour: '06:00-22:00', baseScore: 85, avgWait: 3, avgFare: 11000, dailyPassengers: 2200 },
      { id: 4,  name: '강릉 중앙시장', district: '강릉시',  type: '시장',   lat: 37.7518, lng: 128.8966, peakHour: '10:00-18:00', baseScore: 70, avgWait: 5, avgFare: 7000,  dailyPassengers: 1200 },
      { id: 5,  name: '원주역',       district: '원주시',   type: '교통',   lat: 37.3521, lng: 127.9495, peakHour: '07:00-10:00', baseScore: 78, avgWait: 4, avgFare: 8500,  dailyPassengers: 1600 },
      { id: 6,  name: '원주 단구동',  district: '원주시',   type: '상업',   lat: 37.3500, lng: 127.9545, peakHour: '18:00-22:00', baseScore: 72, avgWait: 5, avgFare: 7200,  dailyPassengers: 1200 },
      { id: 7,  name: '속초 해변',    district: '속초시',   type: '관광',   lat: 38.1900, lng: 128.6030, peakHour: '10:00-20:00', baseScore: 80, avgWait: 4, avgFare: 8000,  dailyPassengers: 1800 },
      { id: 8,  name: '속초시외터미널', district: '속초시',  type: '교통',   lat: 38.2070, lng: 128.5918, peakHour: '07:00-18:00', baseScore: 75, avgWait: 5, avgFare: 8500,  dailyPassengers: 1300 },
      { id: 9,  name: '양양공항',     district: '양양군',   type: '교통',   lat: 38.0612, lng: 128.6690, peakHour: '06:00-22:00', baseScore: 72, avgWait: 5, avgFare: 12000, dailyPassengers: 1000 },
      { id: 10, name: '정동진',       district: '강릉시',   type: '관광',   lat: 37.6917, lng: 129.0333, peakHour: '05:00-10:00', baseScore: 55, avgWait: 7, avgFare: 9000,  dailyPassengers: 600 }
    ]
  },

  /* ── 충청북도 ── */
  chungbuk: {
    name: '충청북도',
    center: [36.6357, 127.4917],
    zoom: 10,
    startLocations: [
      { key: 'cheongju_st', lat: 36.6400, lng: 127.4900, name: '청주역' },
      { key: 'osong',       lat: 36.6212, lng: 127.1095, name: '오송역(KTX)' },
      { key: 'chungju',     lat: 36.9910, lng: 127.9261, name: '충주' }
    ],
    hotspots: [
      { id: 1,  name: '청주 성안길',  district: '청주시',   type: '상업',   lat: 36.6357, lng: 127.4895, peakHour: '18:00-22:00', baseScore: 85, avgWait: 3, avgFare: 7800,  dailyPassengers: 2000 },
      { id: 2,  name: '오송역(KTX)',  district: '청주시',   type: '교통',   lat: 36.6212, lng: 127.1095, peakHour: '06:00-22:00', baseScore: 82, avgWait: 3, avgFare: 12000, dailyPassengers: 1800 },
      { id: 3,  name: '청주공항',     district: '청주시',   type: '교통',   lat: 36.7200, lng: 127.4990, peakHour: '06:00-22:00', baseScore: 78, avgWait: 4, avgFare: 13000, dailyPassengers: 1400 },
      { id: 4,  name: '청주터미널',   district: '청주시',   type: '교통',   lat: 36.6288, lng: 127.4282, peakHour: '07:00-20:00', baseScore: 80, avgWait: 4, avgFare: 9000,  dailyPassengers: 1600 },
      { id: 5,  name: '충북대',       district: '청주시',   type: '문화',   lat: 36.6290, lng: 127.4570, peakHour: '17:00-21:00', baseScore: 68, avgWait: 5, avgFare: 7000,  dailyPassengers: 1100 },
      { id: 6,  name: '충주역',       district: '충주시',   type: '교통',   lat: 36.9910, lng: 127.9261, peakHour: '07:00-10:00', baseScore: 70, avgWait: 5, avgFare: 8000,  dailyPassengers: 1000 },
      { id: 7,  name: '제천역',       district: '제천시',   type: '교통',   lat: 37.1324, lng: 128.1907, peakHour: '07:00-10:00', baseScore: 68, avgWait: 5, avgFare: 8000,  dailyPassengers: 900 },
      { id: 8,  name: '청주시청',     district: '청주시',   type: '업무',   lat: 36.6424, lng: 127.4890, peakHour: '17:00-20:00', baseScore: 72, avgWait: 5, avgFare: 7500,  dailyPassengers: 1200 }
    ]
  },

  /* ── 충청남도 ── */
  chungnam: {
    name: '충청남도',
    center: [36.5184, 126.8000],
    zoom: 10,
    startLocations: [
      { key: 'cheonan_st',  lat: 36.8096, lng: 127.1481, name: '천안역' },
      { key: 'cheonan_ktx', lat: 36.7945, lng: 127.1044, name: '천안아산역(KTX)' },
      { key: 'seosan',      lat: 36.7849, lng: 126.4506, name: '서산' }
    ],
    hotspots: [
      { id: 1,  name: '천안역',       district: '천안시',   type: '교통',   lat: 36.8096, lng: 127.1481, peakHour: '07:00-10:00', baseScore: 85, avgWait: 3, avgFare: 9000,  dailyPassengers: 2200 },
      { id: 2,  name: '천안아산역(KTX)', district: '아산시', type: '교통',  lat: 36.7945, lng: 127.1044, peakHour: '06:00-22:00', baseScore: 88, avgWait: 3, avgFare: 13000, dailyPassengers: 2600 },
      { id: 3,  name: '불당동',       district: '천안시',   type: '상업',   lat: 36.8152, lng: 127.1063, peakHour: '18:00-22:00', baseScore: 80, avgWait: 4, avgFare: 8000,  dailyPassengers: 1800 },
      { id: 4,  name: '온양온천',     district: '아산시',   type: '관광',   lat: 36.7830, lng: 127.0050, peakHour: '14:00-20:00', baseScore: 72, avgWait: 5, avgFare: 7800,  dailyPassengers: 1200 },
      { id: 5,  name: '서산',         district: '서산시',   type: '상업',   lat: 36.7849, lng: 126.4506, peakHour: '18:00-21:00', baseScore: 68, avgWait: 5, avgFare: 7200,  dailyPassengers: 1000 },
      { id: 6,  name: '당진',         district: '당진시',   type: '상업',   lat: 36.8932, lng: 126.6278, peakHour: '18:00-21:00', baseScore: 62, avgWait: 6, avgFare: 7000,  dailyPassengers: 800 },
      { id: 7,  name: '논산',         district: '논산시',   type: '교통',   lat: 36.1868, lng: 127.0988, peakHour: '07:00-10:00', baseScore: 65, avgWait: 5, avgFare: 7500,  dailyPassengers: 900 },
      { id: 8,  name: '공주',         district: '공주시',   type: '관광',   lat: 36.4569, lng: 127.1185, peakHour: '10:00-18:00', baseScore: 62, avgWait: 6, avgFare: 7500,  dailyPassengers: 800 }
    ]
  },

  /* ── 전북특별자치도 ── */
  jeonbuk: {
    name: '전북특별자치도',
    center: [35.8203, 127.1088],
    zoom: 10,
    startLocations: [
      { key: 'jeonju_st',  lat: 35.8121, lng: 127.1461, name: '전주역' },
      { key: 'iksan_st',   lat: 35.9493, lng: 126.9517, name: '익산역' },
      { key: 'gunsan',     lat: 35.9676, lng: 126.7369, name: '군산' }
    ],
    hotspots: [
      { id: 1,  name: '전주 한옥마을', district: '전주시',  type: '관광',   lat: 35.8151, lng: 127.1538, peakHour: '10:00-20:00', baseScore: 90, avgWait: 3, avgFare: 8500,  dailyPassengers: 2800 },
      { id: 2,  name: '전주역',       district: '전주시',   type: '교통',   lat: 35.8121, lng: 127.1461, peakHour: '07:00-10:00', baseScore: 85, avgWait: 3, avgFare: 9500,  dailyPassengers: 2200 },
      { id: 3,  name: '전주 객사',    district: '전주시',   type: '상업',   lat: 35.8178, lng: 127.1475, peakHour: '18:00-22:00', baseScore: 82, avgWait: 4, avgFare: 7800,  dailyPassengers: 2000 },
      { id: 4,  name: '익산역',       district: '익산시',   type: '교통',   lat: 35.9493, lng: 126.9517, peakHour: '07:00-10:00', baseScore: 80, avgWait: 4, avgFare: 9000,  dailyPassengers: 1800 },
      { id: 5,  name: '군산역',       district: '군산시',   type: '교통',   lat: 35.9676, lng: 126.7369, peakHour: '07:00-10:00', baseScore: 72, avgWait: 5, avgFare: 8000,  dailyPassengers: 1200 },
      { id: 6,  name: '전주터미널',   district: '전주시',   type: '교통',   lat: 35.8270, lng: 127.1090, peakHour: '07:00-20:00', baseScore: 82, avgWait: 3, avgFare: 9500,  dailyPassengers: 1900 },
      { id: 7,  name: '정읍역',       district: '정읍시',   type: '교통',   lat: 35.5694, lng: 126.8560, peakHour: '07:00-10:00', baseScore: 62, avgWait: 6, avgFare: 7500,  dailyPassengers: 700 },
      { id: 8,  name: '남원',         district: '남원시',   type: '관광',   lat: 35.4164, lng: 127.3908, peakHour: '10:00-18:00', baseScore: 60, avgWait: 6, avgFare: 7000,  dailyPassengers: 600 }
    ]
  },

  /* ── 전라남도 ── */
  jeonnam: {
    name: '전라남도',
    center: [34.8161, 126.4629],
    zoom: 9,
    startLocations: [
      { key: 'mokpo_st',  lat: 34.7907, lng: 126.3872, name: '목포역' },
      { key: 'suncheon',  lat: 34.9504, lng: 127.4873, name: '순천역' },
      { key: 'yeosu',     lat: 34.7445, lng: 127.7370, name: '여수엑스포역' }
    ],
    hotspots: [
      { id: 1,  name: '목포역',       district: '목포시',   type: '교통',   lat: 34.7907, lng: 126.3872, peakHour: '07:00-10:00', baseScore: 85, avgWait: 3, avgFare: 9500,  dailyPassengers: 2000 },
      { id: 2,  name: '목포 하당',    district: '목포시',   type: '상업',   lat: 34.8118, lng: 126.4322, peakHour: '18:00-22:00', baseScore: 78, avgWait: 4, avgFare: 7500,  dailyPassengers: 1500 },
      { id: 3,  name: '순천역',       district: '순천시',   type: '교통',   lat: 34.9504, lng: 127.4873, peakHour: '07:00-10:00', baseScore: 82, avgWait: 3, avgFare: 9000,  dailyPassengers: 1800 },
      { id: 4,  name: '순천만',       district: '순천시',   type: '관광',   lat: 34.8879, lng: 127.5097, peakHour: '10:00-17:00', baseScore: 75, avgWait: 5, avgFare: 8000,  dailyPassengers: 1300 },
      { id: 5,  name: '여수엑스포역', district: '여수시',   type: '교통',   lat: 34.7445, lng: 127.7370, peakHour: '06:00-22:00', baseScore: 85, avgWait: 3, avgFare: 10000, dailyPassengers: 2000 },
      { id: 6,  name: '여수 교동',    district: '여수시',   type: '관광',   lat: 34.7604, lng: 127.6622, peakHour: '14:00-22:00', baseScore: 78, avgWait: 4, avgFare: 8500,  dailyPassengers: 1500 },
      { id: 7,  name: '무안공항',     district: '무안군',   type: '교통',   lat: 34.9914, lng: 126.3828, peakHour: '06:00-22:00', baseScore: 72, avgWait: 5, avgFare: 14000, dailyPassengers: 1000 },
      { id: 8,  name: '광양',         district: '광양시',   type: '업무',   lat: 34.9407, lng: 127.5958, peakHour: '17:00-20:00', baseScore: 68, avgWait: 5, avgFare: 7500,  dailyPassengers: 1000 },
      { id: 9,  name: '나주역',       district: '나주시',   type: '교통',   lat: 35.0159, lng: 126.7108, peakHour: '07:00-10:00', baseScore: 65, avgWait: 6, avgFare: 8000,  dailyPassengers: 800 },
      { id: 10, name: '해남',         district: '해남군',   type: '관광',   lat: 34.5735, lng: 126.5987, peakHour: '10:00-18:00', baseScore: 55, avgWait: 7, avgFare: 7500,  dailyPassengers: 500 }
    ]
  },

  /* ── 경상북도 ── */
  gyeongbuk: {
    name: '경상북도',
    center: [36.4919, 128.8889],
    zoom: 9,
    startLocations: [
      { key: 'pohang',    lat: 36.0072, lng: 129.3437, name: '포항역' },
      { key: 'gyeongju',  lat: 35.8535, lng: 129.2245, name: '경주역' },
      { key: 'gumi_st',   lat: 36.1281, lng: 128.3354, name: '구미역' },
      { key: 'andong',    lat: 36.5684, lng: 128.7280, name: '안동역' }
    ],
    hotspots: [
      { id: 1,  name: '포항역',       district: '포항시',   type: '교통',   lat: 36.0072, lng: 129.3437, peakHour: '07:00-10:00', baseScore: 82, avgWait: 3, avgFare: 9000,  dailyPassengers: 1800 },
      { id: 2,  name: '포항 시내',    district: '포항시',   type: '상업',   lat: 35.9991, lng: 129.3569, peakHour: '18:00-22:00', baseScore: 78, avgWait: 4, avgFare: 7800,  dailyPassengers: 1500 },
      { id: 3,  name: '경주역',       district: '경주시',   type: '교통',   lat: 35.8535, lng: 129.2245, peakHour: '07:00-10:00', baseScore: 80, avgWait: 4, avgFare: 9000,  dailyPassengers: 1600 },
      { id: 4,  name: '불국사',       district: '경주시',   type: '관광',   lat: 35.7898, lng: 129.3315, peakHour: '10:00-17:00', baseScore: 82, avgWait: 4, avgFare: 10000, dailyPassengers: 1800 },
      { id: 5,  name: '구미역',       district: '구미시',   type: '교통',   lat: 36.1281, lng: 128.3354, peakHour: '07:00-10:00', baseScore: 78, avgWait: 4, avgFare: 8500,  dailyPassengers: 1500 },
      { id: 6,  name: '구미 공단',    district: '구미시',   type: '업무',   lat: 36.1198, lng: 128.3440, peakHour: '06:00-08:00', baseScore: 75, avgWait: 4, avgFare: 8000,  dailyPassengers: 1400 },
      { id: 7,  name: '안동역',       district: '안동시',   type: '교통',   lat: 36.5684, lng: 128.7280, peakHour: '07:00-10:00', baseScore: 72, avgWait: 5, avgFare: 8500,  dailyPassengers: 1100 },
      { id: 8,  name: '안동 하회마을', district: '안동시',  type: '관광',   lat: 36.5393, lng: 128.5189, peakHour: '10:00-17:00', baseScore: 68, avgWait: 6, avgFare: 9000,  dailyPassengers: 900 },
      { id: 9,  name: '김천구미역(KTX)', district: '김천시', type: '교통', lat: 36.1204, lng: 128.1135, peakHour: '06:00-22:00', baseScore: 78, avgWait: 4, avgFare: 12000, dailyPassengers: 1400 },
      { id: 10, name: '영주',         district: '영주시',   type: '교통',   lat: 36.8054, lng: 128.6241, peakHour: '07:00-10:00', baseScore: 62, avgWait: 6, avgFare: 7500,  dailyPassengers: 700 }
    ]
  },

  /* ── 경상남도 ── */
  gyeongnam: {
    name: '경상남도',
    center: [35.4606, 128.2132],
    zoom: 10,
    startLocations: [
      { key: 'changwon',  lat: 35.2264, lng: 128.6847, name: '창원중앙역' },
      { key: 'jinju_st',  lat: 35.1582, lng: 128.0741, name: '진주역' },
      { key: 'geoje',     lat: 34.8804, lng: 128.6211, name: '거제' },
      { key: 'gimhae',    lat: 35.2287, lng: 128.8898, name: '김해' }
    ],
    hotspots: [
      { id: 1,  name: '창원중앙역',   district: '창원시',   type: '교통',   lat: 35.2264, lng: 128.6847, peakHour: '07:00-10:00', baseScore: 85, avgWait: 3, avgFare: 9000,  dailyPassengers: 2200 },
      { id: 2,  name: '창원 상남동',  district: '창원시',   type: '상업',   lat: 35.2282, lng: 128.6905, peakHour: '18:00-22:00', baseScore: 82, avgWait: 3, avgFare: 8000,  dailyPassengers: 2000 },
      { id: 3,  name: '마산역',       district: '창원시',   type: '교통',   lat: 35.1859, lng: 128.5668, peakHour: '07:00-10:00', baseScore: 78, avgWait: 4, avgFare: 8500,  dailyPassengers: 1700 },
      { id: 4,  name: '진주역',       district: '진주시',   type: '교통',   lat: 35.1582, lng: 128.0741, peakHour: '07:00-10:00', baseScore: 78, avgWait: 4, avgFare: 8500,  dailyPassengers: 1500 },
      { id: 5,  name: '진주 시내',    district: '진주시',   type: '상업',   lat: 35.1799, lng: 128.1076, peakHour: '18:00-22:00', baseScore: 75, avgWait: 4, avgFare: 7500,  dailyPassengers: 1400 },
      { id: 6,  name: '통영',         district: '통영시',   type: '관광',   lat: 34.8544, lng: 128.4334, peakHour: '10:00-20:00', baseScore: 78, avgWait: 4, avgFare: 8500,  dailyPassengers: 1500 },
      { id: 7,  name: '거제',         district: '거제시',   type: '관광',   lat: 34.8804, lng: 128.6211, peakHour: '10:00-20:00', baseScore: 72, avgWait: 5, avgFare: 8000,  dailyPassengers: 1200 },
      { id: 8,  name: '김해',         district: '김해시',   type: '상업',   lat: 35.2287, lng: 128.8898, peakHour: '18:00-22:00', baseScore: 72, avgWait: 5, avgFare: 7500,  dailyPassengers: 1200 },
      { id: 9,  name: '진해',         district: '창원시',   type: '관광',   lat: 35.1457, lng: 128.6978, peakHour: '10:00-18:00', baseScore: 65, avgWait: 5, avgFare: 7200,  dailyPassengers: 1000 },
      { id: 10, name: '밀양역',       district: '밀양시',   type: '교통',   lat: 35.4917, lng: 128.7458, peakHour: '07:00-10:00', baseScore: 70, avgWait: 5, avgFare: 8000,  dailyPassengers: 1100 },
      { id: 11, name: '사천공항',     district: '사천시',   type: '교통',   lat: 35.0888, lng: 128.0713, peakHour: '06:00-22:00', baseScore: 68, avgWait: 5, avgFare: 12000, dailyPassengers: 800 },
      { id: 12, name: '양산',         district: '양산시',   type: '주거',   lat: 35.3350, lng: 129.0334, peakHour: '07:00-09:00', baseScore: 62, avgWait: 6, avgFare: 7500,  dailyPassengers: 900 }
    ]
  },

  /* ── 제주특별자치도 ── */
  jeju: {
    name: '제주특별자치도',
    center: [33.4996, 126.5312],
    zoom: 11,
    startLocations: [
      { key: 'jeju_ap',    lat: 33.5066, lng: 126.4927, name: '제주공항' },
      { key: 'jeju_city',  lat: 33.4996, lng: 126.5312, name: '제주시청' },
      { key: 'seogwipo',   lat: 33.2541, lng: 126.5600, name: '서귀포시' }
    ],
    hotspots: [
      { id: 1,  name: '제주공항',     district: '제주시',   type: '교통',   lat: 33.5066, lng: 126.4927, peakHour: '06:00-22:00', baseScore: 95, avgWait: 2, avgFare: 15000, dailyPassengers: 5000 },
      { id: 2,  name: '제주시청',     district: '제주시',   type: '업무',   lat: 33.4996, lng: 126.5312, peakHour: '17:00-20:00', baseScore: 80, avgWait: 3, avgFare: 8500,  dailyPassengers: 1800 },
      { id: 3,  name: '이도동(중앙로)', district: '제주시', type: '상업',   lat: 33.4976, lng: 126.5326, peakHour: '18:00-23:00', baseScore: 85, avgWait: 3, avgFare: 8000,  dailyPassengers: 2200 },
      { id: 4,  name: '서귀포시',     district: '서귀포시', type: '관광',   lat: 33.2541, lng: 126.5600, peakHour: '10:00-20:00', baseScore: 82, avgWait: 4, avgFare: 9500,  dailyPassengers: 2000 },
      { id: 5,  name: '중문관광단지', district: '서귀포시', type: '관광',   lat: 33.2477, lng: 126.4118, peakHour: '10:00-20:00', baseScore: 88, avgWait: 3, avgFare: 12000, dailyPassengers: 2600 },
      { id: 6,  name: '제주항',       district: '제주시',   type: '교통',   lat: 33.5190, lng: 126.5302, peakHour: '06:00-20:00', baseScore: 78, avgWait: 4, avgFare: 10000, dailyPassengers: 1500 },
      { id: 7,  name: '탑동',         district: '제주시',   type: '유흥',   lat: 33.5173, lng: 126.5256, peakHour: '20:00-02:00', baseScore: 75, avgWait: 4, avgFare: 7500,  dailyPassengers: 1400 },
      { id: 8,  name: '노형동',       district: '제주시',   type: '상업',   lat: 33.4859, lng: 126.4820, peakHour: '18:00-22:00', baseScore: 72, avgWait: 5, avgFare: 7800,  dailyPassengers: 1200 },
      { id: 9,  name: '연동',         district: '제주시',   type: '유흥',   lat: 33.4892, lng: 126.5110, peakHour: '20:00-02:00', baseScore: 80, avgWait: 4, avgFare: 8000,  dailyPassengers: 1600 },
      { id: 10, name: '함덕해수욕장', district: '제주시',   type: '관광',   lat: 33.5431, lng: 126.6696, peakHour: '10:00-18:00', baseScore: 72, avgWait: 5, avgFare: 9000,  dailyPassengers: 1100 }
    ]
  }
};

/* ── 현재 활성 핫스팟 (도시 변경 시 교체됨) ── */
var HOTSPOTS = CITY_DATA.seoul.hotspots;

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
    points.push({
      lat: hs.lat, lng: hs.lng,
      intensity: hs.baseScore / 100,
      name: hs.name, type: hs.type, district: hs.district
    });
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
  return Object.keys(CITY_DATA).map(function(key) { return CITY_DATA[key].name; });
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

/* ── 한강 남북 구분 (서울 전용 — 다리 건너기 방지) ── */
var NORTH_DISTRICTS = ['종로구', '중구', '용산구', '성동구', '광진구', '동대문구', '중랑구', '성북구', '강북구', '도봉구', '노원구', '은평구', '서대문구', '마포구'];
var SOUTH_DISTRICTS = ['양천구', '강서구', '구로구', '금천구', '영등포구', '동작구', '관악구', '서초구', '강남구', '송파구', '강동구'];

function getDistrictRiverSide(districtName) {
  if (NORTH_DISTRICTS.indexOf(districtName) !== -1) return 'north';
  if (SOUTH_DISTRICTS.indexOf(districtName) !== -1) return 'south';
  return 'unknown';
}

function getRiverSideByCoords(lat, lng) {
  var riverLat = 37.5355 - 0.05 * (lng - 126.90);
  return lat > riverLat ? 'north' : 'south';
}

function getHotspotRiverSide(hs) {
  if (hs.district) {
    var side = getDistrictRiverSide(hs.district);
    if (side !== 'unknown') return side;
  }
  return getRiverSideByCoords(hs.lat, hs.lng);
}

/* 출발지와 같은 한강 쪽 핫스팟만 필터링 (서울 전용) */
function filterHotspotsBySameRiverSide(hotspots, startLat, startLng) {
  // 서울이 아닌 도시에서는 필터링 하지 않음
  if (typeof currentCity !== 'undefined' && currentCity !== 'seoul') {
    return hotspots;
  }
  var startSide = getRiverSideByCoords(startLat, startLng);
  return hotspots.filter(function(hs) {
    var hsSide = getHotspotRiverSide(hs);
    return hsSide === startSide || hsSide === 'unknown';
  });
}
