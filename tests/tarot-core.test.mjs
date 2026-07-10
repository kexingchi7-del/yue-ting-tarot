import assert from "node:assert/strict";
import {
  buildDayGuide,
  detectQuestionType,
  drawReading,
  formatReading,
  getSpread,
  getZodiacIdByBirthDate,
  getZodiacProfile,
  normalizeQuestion,
  tarotDeck,
  zodiacSigns,
} from "../tarot-core.mjs";

function createRandomSequence(values) {
  let index = 0;
  return () => {
    const value = values[index % values.length];
    index += 1;
    return value;
  };
}

assert.equal(tarotDeck.length, 78, "完整塔罗牌库应为 78 张");
assert.equal(new Set(tarotDeck.map((card) => card.id)).size, 78, "每张牌都应有唯一 id");
assert.equal(normalizeQuestion("  我   该 怎么办？  "), "我 该 怎么办？");
assert.equal(getSpread("missing").id, "three");
assert.equal(detectQuestionType("这个事业机会值得投入吗？").type, "选择判断");
assert.equal(zodiacSigns.length, 12, "应提供完整十二星座");
assert.equal(getZodiacProfile("aries").name, "白羊座");
assert.equal(getZodiacProfile("unknown"), null, "未知星座不应生成运势资料");
assert.equal(getZodiacIdByBirthDate("1990-03-21"), "aries");
assert.equal(getZodiacIdByBirthDate("1990-01-19"), "capricorn");
assert.equal(getZodiacIdByBirthDate("invalid"), "");
const dayGuide = buildDayGuide({ birthDate: "1990-03-21", date: "2026-07-10", focus: "事业" });
assert.equal(dayGuide.date, "2026-07-10");
assert.ok(dayGuide.score >= 35 && dayGuide.score <= 95);
assert.ok(dayGuide.suitable.length > 0);
assert.ok(dayGuide.caution.length > 0);

const reading = drawReading({
  question: "事业下一步？",
  focus: "事业",
  spreadId: "cross",
  zodiacId: "capricorn",
  birthDate: "1990-01-19",
  date: "2026-07-10",
  random: createRandomSequence([0.02, 0.42, 0.76, 0.11, 0.91, 0.35, 0.64, 0.21, 0.83]),
});

assert.equal(reading.cards.length, 4, "四象十字应抽 4 张牌");
assert.equal(new Set(reading.cards.map((card) => card.id)).size, 4, "一次解读不可重复抽到同一张牌");
assert.ok(reading.summary.includes("事业主题"));
assert.ok(reading.advice.length > 10);
assert.equal(reading.questionType.type, "事业机会");
assert.equal(reading.insights.length, 4, "每张牌都应生成位置解读");
assert.ok(reading.insights.every((insight) => insight.detail.includes("在这里")));
assert.ok(reading.energy.title.length > 0);
assert.ok(reading.energy.detail.includes("牌面"));
assert.equal(reading.actionPlan.length, 3);
assert.ok(reading.actionPlan[0].startsWith("今天："));
assert.ok(reading.actionPlan[1].startsWith("三天内："));
assert.ok(reading.actionPlan[2].startsWith("不要做："));
assert.ok(reading.cards.every((card) => card.keywords.length > 0));
assert.ok(reading.caution.length > 10);
assert.ok(reading.disclaimer.includes("自我觉察"));
assert.equal(reading.zodiac.id, "capricorn");
assert.ok(reading.zodiac.guidance.includes("摩羯座"));
assert.ok(reading.zodiac.todayTheme.length > 0);
assert.equal(reading.dayGuide.date, "2026-07-10");
assert.ok(reading.dayGuide.label.length > 0);
assert.ok(formatReading(reading).includes("牌阵：四象十字"));
assert.ok(formatReading(reading).includes("星座：摩羯座"));
assert.ok(formatReading(reading).includes("宜行指数："));
assert.ok(formatReading(reading).includes("整体判断"));
assert.ok(formatReading(reading).includes("行动方案"));
assert.ok(formatReading(reading).includes("月庭塔罗｜我的本次牌面"));
assert.ok(formatReading(reading).includes("关键词："));
assert.ok(formatReading(reading).includes("不替代医疗、法律、财务"));

console.log("tarot-core tests passed");
