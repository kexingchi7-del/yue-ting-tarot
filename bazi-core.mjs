let SolarEngine = globalThis.Solar;

if (!SolarEngine && typeof process !== "undefined" && process.versions?.node) {
  const lunarModule = await import("lunar-javascript");
  SolarEngine = lunarModule.default?.Solar || lunarModule.Solar;
}

const MIN_YEAR = 1900;
const MAX_YEAR = 2100;
const GAN = "甲乙丙丁戊己庚辛壬癸";
const ZHI = "子丑寅卯辰巳午未申酉戌亥";
const GAN_ELEMENTS = ["木", "木", "火", "火", "土", "土", "金", "金", "水", "水"];
const ZHI_ELEMENTS = ["水", "土", "木", "木", "土", "火", "火", "土", "金", "金", "土", "水"];

function requireEngine() {
  if (!SolarEngine) throw new Error("专业历法引擎未加载，请刷新页面后重试。");
  return SolarEngine;
}

function parseDate(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(value || ""));
  if (!match) return null;
  const [, year, month, day] = match.map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) return null;
  return { year, month, day };
}

function parseTime(value) {
  const match = /^(\d{2}):(\d{2})(?::(\d{2}))?$/.exec(String(value || ""));
  if (!match) return null;
  const hour = Number(match[1]);
  const minute = Number(match[2]);
  const second = Number(match[3] || 0);
  if (hour > 23 || minute > 59 || second > 59) return null;
  return { hour, minute, second };
}

export function calculateEquationOfTime(dateValue) {
  const date = parseDate(dateValue);
  if (!date) throw new Error("出生日期格式无效。");
  const start = Date.UTC(date.year, 0, 0);
  const current = Date.UTC(date.year, date.month - 1, date.day);
  const dayOfYear = Math.floor((current - start) / 86_400_000);
  const gamma = (2 * Math.PI / 365) * (dayOfYear - 1);
  return 229.18 * (
    0.000075
    + 0.001868 * Math.cos(gamma)
    - 0.032077 * Math.sin(gamma)
    - 0.014615 * Math.cos(2 * gamma)
    - 0.040849 * Math.sin(2 * gamma)
  );
}

export function calculateTrueSolarTime({
  birthDate,
  birthTime,
  longitude = 120,
  timezoneOffset = 8,
  daylightSavingMinutes = 0,
} = {}) {
  const date = parseDate(birthDate);
  const time = parseTime(birthTime);
  if (!date || !time) throw new Error("请填写有效的出生日期和时间。");
  if (date.year < MIN_YEAR || date.year > MAX_YEAR) throw new Error(`专业排盘目前支持 ${MIN_YEAR}–${MAX_YEAR} 年。`);
  if (!Number.isFinite(longitude) || longitude < -180 || longitude > 180) throw new Error("出生地经度必须在 -180 到 180 之间。");
  if (timezoneOffset !== 8) throw new Error("当前专业排盘仅支持中国标准时间 UTC+8。");
  if (![0, 60].includes(daylightSavingMinutes)) throw new Error("夏令时修正仅支持 0 或 60 分钟。");

  const standardMeridian = timezoneOffset * 15;
  const longitudeCorrectionMinutes = (longitude - standardMeridian) * 4;
  const equationOfTimeMinutes = calculateEquationOfTime(birthDate);
  const totalCorrectionMinutes = longitudeCorrectionMinutes + equationOfTimeMinutes - daylightSavingMinutes;
  const wallClockUtc = Date.UTC(date.year, date.month - 1, date.day, time.hour, time.minute, time.second);
  const corrected = new Date(wallClockUtc + totalCorrectionMinutes * 60_000);
  const dayShift = Math.round((Date.UTC(corrected.getUTCFullYear(), corrected.getUTCMonth(), corrected.getUTCDate())
    - Date.UTC(date.year, date.month - 1, date.day)) / 86_400_000);

  return Object.freeze({
    date: `${corrected.getUTCFullYear()}-${String(corrected.getUTCMonth() + 1).padStart(2, "0")}-${String(corrected.getUTCDate()).padStart(2, "0")}`,
    time: `${String(corrected.getUTCHours()).padStart(2, "0")}:${String(corrected.getUTCMinutes()).padStart(2, "0")}:${String(corrected.getUTCSeconds()).padStart(2, "0")}`,
    formatted: `${String(corrected.getUTCHours()).padStart(2, "0")}:${String(corrected.getUTCMinutes()).padStart(2, "0")}`,
    longitudeCorrectionMinutes,
    equationOfTimeMinutes,
    daylightSavingMinutes,
    totalCorrectionMinutes,
    standardMeridian,
    dayShift,
  });
}

function pillar(gan, zhi, naYin, wuXing, tenGod, hiddenStems) {
  return Object.freeze({
    gan,
    zhi,
    ganZhi: `${gan}${zhi}`,
    element: `${GAN_ELEMENTS[GAN.indexOf(gan)]}${ZHI_ELEMENTS[ZHI.indexOf(zhi)]}`,
    wuXing,
    naYin,
    tenGod,
    hiddenStems: [...hiddenStems],
  });
}

function solarTerm(term) {
  if (!term) return null;
  return Object.freeze({ name: term.getName(), dateTime: term.getSolar().toYmdHms() });
}

function freezeDeep(value) {
  if (!value || typeof value !== "object" || Object.isFrozen(value)) return value;
  Object.values(value).forEach(freezeDeep);
  return Object.freeze(value);
}

function addYears(dateTime, years) {
  const [datePart, timePart = "00:00:00"] = dateTime.split(" ");
  const { year, month, day } = parseDate(datePart);
  const targetYear = year + years;
  const lastDay = new Date(Date.UTC(targetYear, month, 0)).getUTCDate();
  return `${targetYear}-${String(month).padStart(2, "0")}-${String(Math.min(day, lastDay)).padStart(2, "0")} ${timePart}`;
}

export function buildProfessionalBazi({
  birthDate,
  birthTime,
  gender,
  longitude = 120,
  timezoneOffset = 8,
  daylightSavingMinutes = 0,
  useTrueSolarTime = true,
  targetYear = new Date().getFullYear(),
  targetDate,
} = {}) {
  const date = parseDate(birthDate);
  const time = parseTime(birthTime);
  if (!date || !time) throw new Error("请填写有效的出生日期和出生时刻。");
  if (date.year < MIN_YEAR || date.year > MAX_YEAR) throw new Error(`专业排盘目前支持 ${MIN_YEAR}–${MAX_YEAR} 年。`);
  if (!["male", "female"].includes(gender)) throw new Error("专业排盘需要选择性别以计算大运顺逆。");
  const resolvedTargetDate = parseDate(targetDate || `${targetYear}-07-01`);
  if (!resolvedTargetDate || resolvedTargetDate.year < MIN_YEAR || resolvedTargetDate.year > MAX_YEAR) throw new Error(`流年目前支持 ${MIN_YEAR}–${MAX_YEAR} 年。`);

  const correction = calculateTrueSolarTime({ birthDate, birthTime, longitude, timezoneOffset, daylightSavingMinutes });
  const effectiveDate = useTrueSolarTime ? parseDate(correction.date) : date;
  const effectiveTime = useTrueSolarTime ? parseTime(correction.time) : time;
  const solar = requireEngine().fromYmdHms(
    effectiveDate.year,
    effectiveDate.month,
    effectiveDate.day,
    effectiveTime.hour,
    effectiveTime.minute,
    effectiveTime.second,
  );
  const lunar = solar.getLunar();
  const eightChar = lunar.getEightChar();
  eightChar.setSect(1);

  const pillars = {
    year: pillar(eightChar.getYearGan(), eightChar.getYearZhi(), eightChar.getYearNaYin(), eightChar.getYearWuXing(), eightChar.getYearShiShenGan(), eightChar.getYearHideGan()),
    month: pillar(eightChar.getMonthGan(), eightChar.getMonthZhi(), eightChar.getMonthNaYin(), eightChar.getMonthWuXing(), eightChar.getMonthShiShenGan(), eightChar.getMonthHideGan()),
    day: pillar(eightChar.getDayGan(), eightChar.getDayZhi(), eightChar.getDayNaYin(), eightChar.getDayWuXing(), "日主", eightChar.getDayHideGan()),
    hour: pillar(eightChar.getTimeGan(), eightChar.getTimeZhi(), eightChar.getTimeNaYin(), eightChar.getTimeWuXing(), eightChar.getTimeShiShenGan(), eightChar.getTimeHideGan()),
  };

  const yun = eightChar.getYun(gender === "male" ? 1 : 0);
  const luckStartDate = yun.getStartSolar().toYmdHms();
  const daYun = yun.getDaYun(11).slice(1).map((item, index) => ({
    index: item.getIndex(),
    pillar: item.getGanZhi(),
    startYear: item.getStartYear(),
    endYear: item.getEndYear(),
    startDate: addYears(luckStartDate, index * 10),
    nextStartDate: addYears(luckStartDate, (index + 1) * 10),
    startAge: item.getStartAge(),
    endAge: item.getEndAge(),
    annual: item.getLiuNian().map((year) => ({ year: year.getYear(), age: year.getAge(), pillar: year.getGanZhi() })),
  }));
  const targetSolar = requireEngine().fromYmd(resolvedTargetDate.year, resolvedTargetDate.month, resolvedTargetDate.day);
  const annualPillar = targetSolar.getLunar().getYearInGanZhiByLiChun();
  const targetDateTime = `${targetDate || `${targetYear}-07-01`} 12:00:00`;
  const activeDaYun = daYun.find((item) => targetDateTime >= item.startDate && targetDateTime < item.nextStartDate) || null;

  return freezeDeep({
    schemaVersion: 2,
    input: { birthDate, birthTime, gender, longitude, timezoneOffset, daylightSavingMinutes, useTrueSolarTime },
    conventions: {
      yearBoundary: "立春",
      monthBoundary: "节",
      dayBoundary: "子初 23:00 换日",
      timeBasis: useTrueSolarTime ? "地方真太阳时" : "标准钟表时",
      luckRule: "阳男阴女顺排，阴男阳女逆排；三日折一年",
    },
    time: { civil: `${birthDate} ${birthTime}`, apparentSolar: `${correction.date} ${correction.time}`, ...correction },
    solarTerms: { previousJie: solarTerm(lunar.getPrevJie(false)), nextJie: solarTerm(lunar.getNextJie(false)) },
    pillars,
    luck: {
      direction: yun.isForward() ? "顺排" : "逆排",
      startAge: { years: yun.getStartYear(), months: yun.getStartMonth(), days: yun.getStartDay(), hours: yun.getStartHour() },
      startDate: luckStartDate,
      daYun: daYun.map((item) => ({ ...item, isCurrent: item === activeDaYun })),
    },
    annual: { date: targetDate || `${targetYear}-07-01`, year: resolvedTargetDate.year, pillar: annualPillar, activeDaYun: activeDaYun?.pillar || null },
    provenance: { engine: "lunar-javascript", version: "1.7.7", equationOfTime: "NOAA fractional-year approximation" },
    warnings: [
      daylightSavingMinutes === 0 && date.year >= 1986 && date.year <= 1991 ? "中国部分地区当年曾实行夏令时，请确认出生钟表时间是否需要减去 60 分钟。" : null,
      "传统命理存在流派差异；本结果按页面显示口径计算，不构成科学预测或重大决策建议。",
    ].filter(Boolean),
  });
}
