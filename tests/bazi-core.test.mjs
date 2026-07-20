import assert from "node:assert/strict";
import {
  buildProfessionalBazi,
  calculateEquationOfTime,
  calculateTrueSolarTime,
} from "../bazi-core.mjs";

const februaryEot = calculateEquationOfTime("2026-02-11");
assert.ok(februaryEot < -14 && februaryEot > -15, "2 月均时差应接近 -14 分钟");

const solarTime = calculateTrueSolarTime({
  birthDate: "2026-02-11",
  birthTime: "12:00",
  longitude: 116.4074,
  timezoneOffset: 8,
});
assert.ok(solarTime.longitudeCorrectionMinutes < -14 && solarTime.longitudeCorrectionMinutes > -15);
assert.ok(solarTime.totalCorrectionMinutes < -28 && solarTime.totalCorrectionMinutes > -30);

const chart = buildProfessionalBazi({
  birthDate: "2005-12-23",
  birthTime: "08:37",
  gender: "male",
  longitude: 120,
  timezoneOffset: 8,
  useTrueSolarTime: false,
  targetYear: 2026,
});
assert.deepEqual(
  Object.values(chart.pillars).map((pillar) => pillar.ganZhi),
  ["乙酉", "戊子", "辛巳", "壬辰"],
  "四柱应与历法库官方黄金样例一致",
);
assert.equal(chart.conventions.yearBoundary, "立春");
assert.equal(chart.conventions.monthBoundary, "节");
assert.equal(chart.luck.daYun.length, 10);
assert.equal(chart.annual.year, 2026);
assert.equal(chart.annual.pillar.length, 2);

const beforeLiChun = buildProfessionalBazi({
  birthDate: "2005-12-23",
  birthTime: "08:37",
  gender: "male",
  longitude: 120,
  timezoneOffset: 8,
  useTrueSolarTime: false,
  targetDate: "2026-01-20",
});
assert.equal(beforeLiChun.annual.pillar, "乙巳", "流年应以立春而不是元旦换年");

const yangMale = buildProfessionalBazi({ birthDate: "2004-06-01", birthTime: "12:00", gender: "male", useTrueSolarTime: false });
const yangFemale = buildProfessionalBazi({ birthDate: "2004-06-01", birthTime: "12:00", gender: "female", useTrueSolarTime: false });
const yinMale = buildProfessionalBazi({ birthDate: "2005-06-01", birthTime: "12:00", gender: "male", useTrueSolarTime: false });
const yinFemale = buildProfessionalBazi({ birthDate: "2005-06-01", birthTime: "12:00", gender: "female", useTrueSolarTime: false });
assert.deepEqual(
  [yangMale.luck.direction, yangFemale.luck.direction, yinMale.luck.direction, yinFemale.luck.direction],
  ["顺排", "逆排", "逆排", "顺排"],
  "大运顺逆应按年干阴阳与性别组合",
);
assert.equal(chart.luck.daYun.filter((item) => item.isCurrent).length <= 1, true);

const ziStartChart = buildProfessionalBazi({
  birthDate: "1988-02-15",
  birthTime: "23:30",
  gender: "male",
  longitude: 120,
  timezoneOffset: 8,
  useTrueSolarTime: false,
});
assert.equal(ziStartChart.pillars.day.ganZhi, "辛丑", "默认采用子初 23:00 换日");
assert.equal(ziStartChart.pillars.hour.ganZhi, "戊子");

assert.throws(
  () => buildProfessionalBazi({ birthDate: "1899-01-01", birthTime: "12:00", gender: "male" }),
  /1900.*2100/,
);

console.log("bazi-core tests passed");
