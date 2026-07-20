import { baziCities, drawReading, drawReadingFromCardIds, formatReading, getZodiacIdByBirthDate, shuffleDeck, spreads, tarotDeck, zodiacSigns } from "./tarot-core.mjs";

const state = {
  activeSpread: "three",
  lastReading: null,
  isDrawing: false,
  revealTimers: [],
  drawMode: "auto",
  selectionDeck: [],
  selectedCardIds: [],
  selectionFilter: "all",
  shuffleSeed: 0,
};

const elements = {
  form: document.querySelector("[data-reading-form]"),
  question: document.querySelector("[data-question]"),
  focus: document.querySelector("[data-focus]"),
  zodiac: document.querySelector("[data-zodiac]"),
  birthDate: document.querySelector("[data-birth-date]"),
  targetDate: document.querySelector("[data-target-date]"),
  birthTime: document.querySelector("[data-birth-time]"),
  birthCity: document.querySelector("[data-birth-city]"),
  gender: document.querySelector("[data-gender]"),
  longitude: document.querySelector("[data-longitude]"),
  timezoneOffset: document.querySelector("[data-timezone-offset]"),
  daylightSaving: document.querySelector("[data-daylight-saving]"),
  trueSolarTime: document.querySelector("[data-true-solar-time]"),
  spreadButtons: [...document.querySelectorAll("[data-spread]")],
  drawModeButtons: [...document.querySelectorAll("[data-draw-mode]")],
  manualPicker: document.querySelector("[data-manual-picker]"),
  selectionStatus: document.querySelector("[data-selection-status]"),
  selectionDeck: document.querySelector("[data-selection-deck]"),
  selectionFilter: document.querySelector("[data-selection-filter]"),
  reshuffle: document.querySelector("[data-reshuffle]"),
  drawButton: document.querySelector("[data-draw]"),
  reading: document.querySelector("[data-reading]"),
  cards: document.querySelector("[data-cards]"),
  summary: document.querySelector("[data-summary]"),
  history: document.querySelector("[data-history]"),
  share: document.querySelector("[data-share]"),
  clear: document.querySelector("[data-clear]"),
  toggleHistory: document.querySelector("[data-toggle-history]"),
  redraw: document.querySelector("[data-redraw]"),
  daily: document.querySelector("[data-daily]"),
  saveImage: document.querySelector("[data-save-image]"),
  ritual: document.querySelector("[data-ritual]"),
  toast: document.querySelector("[data-toast]"),
};

const historyKey = "tarot-readings-v1";

function init() {
  renderZodiacOptions();
  renderBirthCityOptions();
  elements.targetDate.value = getTodayInputValue();
  renderSpreadButtons();
  renderHistory(loadHistory());
  elements.form.addEventListener("submit", handleSubmit);
  elements.spreadButtons.forEach((button) => button.addEventListener("click", handleSpreadClick));
  elements.drawModeButtons.forEach((button) => button.addEventListener("click", handleDrawModeClick));
  elements.reshuffle.addEventListener("click", prepareManualSelection);
  elements.selectionFilter.addEventListener("click", handleFilterClick);
  elements.share.addEventListener("click", handleShare);
  elements.clear.addEventListener("click", handleClear);
  elements.toggleHistory.addEventListener("click", handleToggleHistory);
  elements.redraw.addEventListener("click", handleRedraw);
  elements.daily.addEventListener("click", handleDaily);
  elements.saveImage.addEventListener("click", handleSaveImage);
  elements.birthDate.addEventListener("change", handleBirthDateChange);
  elements.birthCity.addEventListener("change", handleBirthCityChange);
  handleBirthCityChange();
}

function renderZodiacOptions() {
  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = "暂不选择";
  elements.zodiac.append(placeholder, ...zodiacSigns.map(createZodiacOption));
}

function createZodiacOption(sign) {
  const option = document.createElement("option");
  option.value = sign.id;
  option.textContent = `${sign.emoji} ${sign.name} · ${sign.element}象`;
  return option;
}

function renderBirthCityOptions() {
  elements.birthCity.append(...baziCities.map((city) => {
    const option = document.createElement("option");
    option.value = city.id;
    option.textContent = `${city.name} · 东经 ${city.longitude}`;
    return option;
  }));
}

function handleBirthDateChange() {
  const zodiacId = getZodiacIdByBirthDate(elements.birthDate.value);
  if (zodiacId) elements.zodiac.value = zodiacId;
}

function handleBirthCityChange() {
  const city = baziCities.find((item) => item.id === elements.birthCity.value) || baziCities[0];
  elements.longitude.value = String(city.longitude);
}

function getBaziInput() {
  return {
    gender: elements.gender.value,
    longitude: elements.longitude.value.trim() === "" ? Number.NaN : Number(elements.longitude.value),
    timezoneOffset: Number(elements.timezoneOffset.value),
    daylightSavingMinutes: Number(elements.daylightSaving.value),
    useTrueSolarTime: elements.trueSolarTime.checked,
  };
}

function handleSpreadClick(event) {
  state.activeSpread = event.currentTarget.dataset.spread;
  renderSpreadButtons();
}

function handleDrawModeClick(event) {
  state.drawMode = event.currentTarget.dataset.drawMode;
  elements.drawModeButtons.forEach((button) => {
    const selected = button.dataset.drawMode === state.drawMode;
    button.classList.toggle("is-active", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
  if (state.drawMode === "auto") elements.manualPicker.hidden = true;
}

function handleSubmit(event) {
  event.preventDefault();
  if (state.drawMode === "manual") {
    prepareManualSelection();
    return;
  }
  startReading();
}

function computeCardScatter(shuffleSeed, cardId) {
  const key = `${shuffleSeed}-${cardId}`;
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = ((hash << 5) - hash + key.charCodeAt(i)) | 0;
  }
  const rotate = ((Math.abs(hash) % 600) / 100) - 3;
  const offsetY = ((Math.abs(hash * 7) % 800) / 100) - 4;
  return { rotate: Number(rotate.toFixed(1)), offsetY: Number(offsetY.toFixed(1)) };
}

function prepareManualSelection() {
  if (state.isDrawing) return;
  state.selectionDeck = shuffleDeck(tarotDeck, secureRandom);
  state.selectedCardIds = [];
  state.selectionFilter = "all";
  state.shuffleSeed = Date.now();
  elements.manualPicker.hidden = false;
  showToast("正在发牌...");
  renderFilterButtons();
  renderSelectionDeck({ animate: true });
  elements.manualPicker.scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderSelectionDeck({ animate = false } = {}) {
  const count = spreads[state.activeSpread].count;
  const filteredDeck = state.selectionFilter === "all"
    ? state.selectionDeck
    : state.selectionDeck.filter((card) => card.suit === state.selectionFilter);
  const total = filteredDeck.length;

  elements.selectionStatus.textContent = `请凭直觉从 ${total} 张牌中选择 ${count} 张（已选 ${state.selectedCardIds.length}/${count}）`;

  elements.selectionDeck.replaceChildren(...filteredDeck.map((card, index) => {
    const scatter = computeCardScatter(state.shuffleSeed, card.id);
    const button = document.createElement("button");
    button.type = "button";
    button.className = "selection-card";
    button.style.setProperty("--rotate", `${scatter.rotate}deg`);
    button.style.setProperty("--offset-y", `${scatter.offsetY}px`);
    if (animate) {
      button.classList.add("selection-card--dealing");
      button.style.setProperty("--deal-index", String(index));
    }
    button.textContent = getCardGlyph(card);
    button.setAttribute("aria-label", `选择第 ${index + 1} 张牌：${card.name}`);
    button.disabled = state.selectedCardIds.includes(card.id) || state.selectedCardIds.length >= count;
    button.addEventListener("click", () => selectManualCard(card.id));
    return button;
  }));
}

function renderFilterButtons() {
  const filters = [
    { value: "all", label: "全部" },
    { value: "大阿尔卡那", label: "大阿尔卡那" },
    { value: "权杖", label: "权杖" },
    { value: "圣杯", label: "圣杯" },
    { value: "宝剑", label: "宝剑" },
    { value: "星币", label: "星币" },
  ];
  elements.selectionFilter.replaceChildren(...filters.map((f) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "filter-chip";
    if (f.value === state.selectionFilter) btn.classList.add("is-active");
    btn.dataset.filter = f.value;
    btn.textContent = f.label;
    return btn;
  }));
}

function handleFilterClick(event) {
  const chip = event.target.closest(".filter-chip");
  if (!chip) return;
  state.selectionFilter = chip.dataset.filter;
  renderFilterButtons();
  renderSelectionDeck({ animate: true });
}

function selectManualCard(cardId) {
  const count = spreads[state.activeSpread].count;
  state.selectedCardIds = [...state.selectedCardIds, cardId];
  renderSelectionDeck();
  if (state.selectedCardIds.length === count) startManualReading();
}

function handleShare() {
  if (!state.lastReading) {
    showToast("先抽一次牌。");
    return;
  }

  const text = formatReading(state.lastReading);
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(text).then(
      () => showToast("解读已复制。"),
      () => showToast("复制失败，可手动选中文本。"),
    );
    return;
  }

  showToast("当前浏览器不支持一键复制。");
}

function handleToggleHistory() {
  const panel = document.querySelector(".history-panel");
  const collapsed = panel.classList.toggle("history-panel--collapsed");
  elements.toggleHistory.textContent = collapsed ? "展开" : "收起";
  elements.toggleHistory.setAttribute("aria-expanded", String(!collapsed));
}

function handleClear() {
  if (!window.confirm("确定要清空所有占卜记录吗？")) return;
  localStorage.removeItem(historyKey);
  renderHistory([]);
  showToast("记录已清空。");
}

function handleRedraw() {
  startReading({ scrollToTop: true });
}

function handleDaily() {
  elements.question.value = "今天我最需要看见什么？";
  elements.focus.value = "自我成长";
  state.activeSpread = "single";
  renderSpreadButtons();
  startReading();
}

function handleSaveImage() {
  if (!state.lastReading) {
    showToast("先抽一次牌。");
    return;
  }

  try {
    const dataUrl = createShareImage(state.lastReading);
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `月庭塔罗-${state.lastReading.id}.png`;
    link.click();
    showToast("分享图片已生成。");
  } catch (error) {
    console.error("Unable to create share image", error);
    showToast("图片生成失败，请重新尝试。");
  }
}

function startReading({ scrollToTop = false } = {}) {
  if (state.isDrawing) return;
  setBusy(true);
  showRitual();

  window.setTimeout(() => {
    let reading;
    try {
      reading = drawReading({
        question: elements.question.value,
        focus: elements.focus.value,
        zodiacId: elements.zodiac.value,
        birthDate: elements.birthDate.value,
        birthTime: elements.birthTime.value,
        cityId: elements.birthCity.value,
        ...getBaziInput(),
        date: elements.targetDate.value,
        spreadId: state.activeSpread,
        random: secureRandom,
      });
    } catch (error) {
      hideRitual();
      setBusy(false);
      showToast(error instanceof Error ? error.message : "排盘失败，请检查出生资料。");
      return;
    }

    state.lastReading = reading;
    hideRitual();
    renderReading(reading, { animate: true });
    saveReading(reading);
    setBusy(false);
    if (scrollToTop) window.scrollTo({ top: 0, behavior: "smooth" });
  }, 2200);
}

function startManualReading() {
  if (state.isDrawing) return;
  setBusy(true);
  showRitual();
  window.setTimeout(() => {
    let reading;
    try {
      reading = drawReadingFromCardIds({
        cardIds: state.selectedCardIds,
        question: elements.question.value,
        focus: elements.focus.value,
        zodiacId: elements.zodiac.value,
        birthDate: elements.birthDate.value,
        birthTime: elements.birthTime.value,
        cityId: elements.birthCity.value,
        ...getBaziInput(),
        date: elements.targetDate.value,
        spreadId: state.activeSpread,
        random: secureRandom,
      });
    } catch (error) {
      hideRitual();
      setBusy(false);
      showToast(error instanceof Error ? error.message : "排盘失败，请检查出生资料。");
      return;
    }
    state.lastReading = reading;
    hideRitual();
    elements.manualPicker.hidden = true;
    renderReading(reading, { animate: true });
    saveReading(reading);
    setBusy(false);
  }, 1300);
}

function showRitual() {
  elements.ritual.hidden = false;
  const container = document.querySelector("[data-ritual-cards]");
  const particleContainer = document.querySelector("[data-ritual-particles]");
  const strongEl = elements.ritual.querySelector("strong");
  const innerEl = document.querySelector(".ritual__inner");
  const spanEl = innerEl.querySelector("span");
  container.replaceChildren();

  const zodiacId = elements.zodiac.value;
  const sign = zodiacSigns.find((s) => s.id === zodiacId);
  if (sign) {
    strongEl.textContent = `正在为${sign.emoji} ${sign.name}连接能量...`;
  } else {
    strongEl.textContent = "正在连接你的能量...";
  }

  spanEl.textContent = "请在心里默念问题";

  for (let i = 0; i < 15; i++) {
    const card = document.createElement("div");
    card.className = "ritual-card";
    card.style.setProperty("--ritual-index", String(i));
    card.style.setProperty("--ritual-drift", `${(i - 7) * 18}px`);
    card.style.setProperty("--ritual-drift-y", `${Math.abs(i - 7) * -5}px`);
    card.style.setProperty("--ritual-rotate", `${(i - 7) * 3}deg`);
    container.append(card);
  }

  for (let i = 0; i < 24; i++) {
    const particle = document.createElement("div");
    particle.className = "ritual-particle";
    if (i % 3 === 0) particle.classList.add("ritual-particle--red");
    if (i % 4 === 0) particle.classList.add("ritual-particle--light");
    particle.style.left = `${8 + Math.random() * 84}%`;
    particle.style.bottom = "0";
    particle.style.animationDelay = `${Math.random() * 2.2}s`;
    particle.style.width = `${2 + Math.random() * 4}px`;
    particle.style.height = particle.style.width;
    particleContainer.append(particle);
  }
}

function hideRitual() {
  elements.ritual.hidden = true;
  const particleContainer = document.querySelector("[data-ritual-particles]");
  if (particleContainer) particleContainer.replaceChildren();
}

function renderSpreadButtons() {
  elements.spreadButtons.forEach((button) => {
    const selected = button.dataset.spread === state.activeSpread;
    button.classList.toggle("is-active", selected);
    button.setAttribute("aria-pressed", String(selected));
    button.querySelector("span").textContent = spreads[button.dataset.spread].name;
    button.querySelector("small").textContent = `${spreads[button.dataset.spread].count} 张`;
  });
}

function renderReading(reading, { animate = true } = {}) {
  clearRevealTimers();
  elements.reading.hidden = false;
  elements.cards.replaceChildren(...reading.cards.map((card, index) => createCard(card, index)));
  elements.summary.replaceChildren(
    createZodiacSection(reading.zodiac),
    createDayGuideSection(reading.dayGuide),
    createBaziSection(reading.bazi),
    createReadingSection("整体判断", [reading.summary, reading.energy?.detail].filter(Boolean)),
    createInsightList(reading.insights || []),
    createActionList(reading.actionPlan || []),
    createReadingSection("提醒", [reading.caution, reading.advice]),
    createDisclaimer(reading),
    createReadingMeta(reading),
  );

  reading.cards.forEach((_, index) => {
    if (!animate) {
      const cardEl = elements.cards.children[index];
      if (cardEl) cardEl.classList.add("tarot-card--revealed");
      return;
    }

    const timer = window.setTimeout(() => {
      const cardEl = elements.cards.children[index];
      if (cardEl) cardEl.classList.add("tarot-card--revealed");
    }, 500 + index * 420);
    state.revealTimers = [...state.revealTimers, timer];
  });
}

function createBaziSection(bazi) {
  if (!bazi) return document.createDocumentFragment();

  if (!bazi.chart) return createLegacyBaziSection(bazi);

  const section = document.createElement("section");
  section.className = "bazi-reading";
  const chart = bazi.chart;
  const header = document.createElement("div");
  const heading = document.createElement("h3");
  heading.textContent = "专业八字排盘";
  const badge = document.createElement("strong");
  badge.textContent = `${chart.luck.direction} · ${chart.annual.year} ${chart.annual.pillar}流年`;
  header.append(heading, badge);

  const solar = document.createElement("span");
  const longitudeCorrection = chart.time.longitudeCorrectionMinutes.toFixed(1);
  const eot = chart.time.equationOfTimeMinutes.toFixed(1);
  const total = chart.time.totalCorrectionMinutes.toFixed(1);
  solar.textContent = chart.conventions.timeBasis === "地方真太阳时"
    ? `钟表时 ${chart.time.civil} → 真太阳时 ${chart.time.apparentSolar}｜经度 ${longitudeCorrection} 分｜均时差 ${eot} 分｜总修正 ${total} 分`
    : `本次按标准钟表时 ${chart.time.civil} 排盘｜真太阳时参考 ${chart.time.apparentSolar}（未用于定柱）`;

  const convention = document.createElement("p");
  convention.className = "bazi-convention";
  convention.textContent = `${chart.conventions.yearBoundary}换年 · ${chart.conventions.monthBoundary}令换月 · ${chart.conventions.dayBoundary} · ${chart.conventions.luckRule}`;

  const pillarTable = createPillarTable(chart.pillars);
  const terms = document.createElement("p");
  terms.className = "bazi-terms";
  terms.textContent = `前一节：${chart.solarTerms.previousJie.name} ${chart.solarTerms.previousJie.dateTime}｜后一节：${chart.solarTerms.nextJie.name} ${chart.solarTerms.nextJie.dateTime}`;

  const luckHeading = document.createElement("h4");
  const startAge = chart.luck.startAge;
  luckHeading.textContent = `大运｜${startAge.years} 年 ${startAge.months} 月 ${startAge.days} 天起运（${chart.luck.startDate}）`;
  const luckTable = createLuckTable(chart.luck.daYun);

  const bridge = paragraph(bazi.tarotBridge);
  bridge.className = "bazi-bridge";
  const note = document.createElement("small");
  note.textContent = bazi.note;
  section.append(header, solar, convention, pillarTable, terms, luckHeading, luckTable, bridge, note);
  return section;
}

function createLegacyBaziSection(bazi) {
  const section = document.createElement("section");
  section.className = "bazi-reading";
  const header = document.createElement("div");
  const heading = document.createElement("h3");
  heading.textContent = "历史时辰档案";
  const badge = document.createElement("strong");
  badge.textContent = `${bazi.branch?.name || "旧记录"}${bazi.branch?.element ? ` · ${bazi.branch.element}` : ""}`;
  header.append(heading, badge);
  const note = document.createElement("small");
  note.textContent = "这是升级前保存的简化记录；重新占卜后可生成完整四柱与大运流年。";
  section.append(header, paragraph(bazi.summary || "旧版时辰记录"), note);
  return section;
}

function createPillarTable(pillars) {
  const labels = { year: "年柱", month: "月柱", day: "日柱", hour: "时柱" };
  const table = document.createElement("div");
  table.className = "bazi-pillars";
  Object.entries(pillars).forEach(([key, item]) => {
    const column = document.createElement("div");
    const label = document.createElement("span");
    label.textContent = labels[key];
    const gan = document.createElement("strong");
    gan.textContent = item.gan;
    const zhi = document.createElement("b");
    zhi.textContent = item.zhi;
    const meta = document.createElement("small");
    meta.textContent = `${item.tenGod} · ${item.naYin}`;
    const hidden = document.createElement("em");
    hidden.textContent = `藏干 ${item.hiddenStems.join("、")}`;
    column.append(label, gan, zhi, meta, hidden);
    table.append(column);
  });
  return table;
}

function createLuckTable(daYun) {
  const table = document.createElement("div");
  table.className = "bazi-luck";
  daYun.forEach((item) => {
    const cell = document.createElement("div");
    if (item.isCurrent) cell.classList.add("is-current");
    const pillar = document.createElement("strong");
    pillar.textContent = item.pillar;
    const years = document.createElement("span");
    years.textContent = `${item.startYear}–${item.endYear}`;
    const ages = document.createElement("small");
    ages.textContent = `${item.startAge}–${item.endAge} 岁`;
    cell.append(pillar, years, ages);
    table.append(cell);
  });
  return table;
}

function createDayGuideSection(dayGuide) {
  if (!dayGuide) return document.createDocumentFragment();

  const section = document.createElement("section");
  section.className = "day-guide";
  const header = document.createElement("div");
  const heading = document.createElement("h3");
  heading.textContent = "本日宜行参考";
  const score = document.createElement("strong");
  score.textContent = `${dayGuide.score} / 95`;
  header.append(heading, score);

  const label = document.createElement("span");
  label.textContent = `${dayGuide.date} · ${dayGuide.label} · ${dayGuide.rhythm}`;
  const suitable = document.createElement("p");
  const suitableLabel = document.createElement("b");
  suitableLabel.textContent = "适合：";
  suitable.append(suitableLabel, dayGuide.suitable.join("、"));
  const caution = document.createElement("p");
  const cautionLabel = document.createElement("b");
  cautionLabel.textContent = "慎做：";
  caution.append(cautionLabel, dayGuide.caution);
  const note = document.createElement("small");
  note.textContent = dayGuide.note;
  section.append(header, label, suitable, caution, note);
  return section;
}

function createZodiacSection(zodiac) {
  if (!zodiac) return document.createDocumentFragment();

  const section = document.createElement("section");
  section.className = "zodiac-reading";
  const eyebrow = document.createElement("span");
  eyebrow.textContent = `${zodiac.emoji || ""} ${zodiac.name} · ${zodiac.element}象 · ${zodiac.quality}`;
  const heading = document.createElement("h3");
  heading.textContent = "星座与牌面共鸣";
  section.append(eyebrow, heading, paragraph(zodiac.guidance));
  return section;
}

function createCard(card, index) {
  const article = document.createElement("article");
  article.className = "tarot-card";
  article.style.setProperty("--delay", `${index * 90}ms`);

  const inner = document.createElement("div");
  inner.className = "tarot-card__inner";

  /* 牌背 */
  const back = document.createElement("div");
  back.className = "tarot-card__back";
  const backMark = document.createElement("div");
  backMark.className = "tarot-card__back-mark";
  backMark.textContent = getCardGlyph(card);
  const backInner = document.createElement("div");
  backInner.className = "tarot-card__back-inner";
  const backPattern = document.createElement("div");
  backPattern.className = "tarot-card__back-pattern";
  back.append(backMark, backInner, backPattern);

  /* 正面 */
  const front = document.createElement("div");
  front.className = "tarot-card__front";

  const top = document.createElement("div");
  top.className = "tarot-card__top";
  const position = document.createElement("span");
  position.textContent = card.position;
  const orientation = document.createElement("span");
  orientation.className = card.orientation === "逆位" ? "badge badge--reversed" : "badge";
  orientation.textContent = card.orientation;
  top.append(position, orientation);

  const mark = document.createElement("div");
  mark.className = "tarot-card__mark";
  mark.textContent = getCardGlyph(card);

  const title = document.createElement("h3");
  title.textContent = card.name;

  const archetype = document.createElement("p");
  archetype.className = "tarot-card__archetype";
  archetype.textContent = card.archetype;

  const tags = document.createElement("div");
  tags.className = "keyword-row";
  tags.append(...(card.keywords || [card.archetype, card.element].filter(Boolean)).map(createKeyword));

  const meaning = document.createElement("p");
  meaning.textContent = card.meaning;

  front.append(top, mark, title, archetype, tags, meaning);
  inner.append(back, front);
  article.append(inner);
  return article;
}

function createReadingMeta(reading) {
  const meta = document.createElement("p");
  meta.className = "reading-meta";
  const date = new Intl.DateTimeFormat("zh-CN", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(reading.createdAt));
  meta.textContent = `${reading.spread.name} · ${reading.focus}${reading.zodiac ? ` · ${reading.zodiac.name}` : ""} · ${date}`;
  return meta;
}

function createReadingSection(title, texts) {
  const section = document.createElement("section");
  section.className = "reading-section";
  const heading = document.createElement("h3");
  heading.textContent = title;
  section.append(heading, ...texts.map(paragraph));
  return section;
}

function createInsightList(insights) {
  const section = document.createElement("section");
  section.className = "reading-section";
  const heading = document.createElement("h3");
  heading.textContent = "逐牌解读";
  const list = document.createElement("div");
  list.className = "insight-list";
  list.append(
    ...insights.map((insight) => {
      const item = document.createElement("article");
      const title = document.createElement("strong");
      const detail = paragraph(insight.detail);
      title.textContent = insight.title;
      item.append(title, detail);
      return item;
    }),
  );
  section.append(heading, list);
  return section;
}

function createActionList(actions) {
  const section = document.createElement("section");
  section.className = "reading-section";
  const heading = document.createElement("h3");
  heading.textContent = "行动方案";
  const list = document.createElement("ol");
  list.append(
    ...actions.map((action) => {
      const item = document.createElement("li");
      item.textContent = action;
      return item;
    }),
  );
  section.append(heading, list);
  return section;
}

function createDisclaimer(reading) {
  const note = document.createElement("p");
  note.className = "disclaimer";
  note.textContent = reading.disclaimer || "塔罗解读仅作自我觉察与娱乐参考，不替代医疗、法律、财务或其他专业建议。";
  return note;
}

function createKeyword(keyword) {
  const tag = document.createElement("span");
  tag.textContent = keyword;
  return tag;
}

function renderHistory(history) {
  if (history.length === 0) {
    elements.history.replaceChildren(emptyHistory());
    return;
  }

  elements.history.replaceChildren(...history.map(createHistoryItem));
}

function createHistoryItem(reading) {
  const button = document.createElement("button");
  button.className = "history-item";
  button.type = "button";
  button.addEventListener("click", () => {
    state.lastReading = reading;
    renderReading(reading, { animate: false });
    const panel = document.querySelector(".history-panel");
    panel.classList.add("history-panel--collapsed");
    elements.toggleHistory.textContent = "展开";
    elements.toggleHistory.setAttribute("aria-expanded", "false");
    const readingHeading = elements.reading.querySelector("h1");
    readingHeading?.setAttribute("tabindex", "-1");
    readingHeading?.focus({ preventScroll: true });
    elements.reading.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  const title = document.createElement("strong");
  title.textContent = reading.question;

  const detail = document.createElement("span");
  detail.textContent = `${reading.spread.name}${reading.zodiac ? ` · ${reading.zodiac.name}` : ""} · ${reading.cards.map((card) => card.name).join("、")}`;

  button.append(title, detail);
  return button;
}

function emptyHistory() {
  const item = document.createElement("p");
  item.className = "empty-history";
  item.textContent = "暂无占卜记录";
  return item;
}

function paragraph(text) {
  const p = document.createElement("p");
  p.textContent = text;
  return p;
}

function saveReading(reading) {
  const history = [reading, ...loadHistory().filter((item) => item.id !== reading.id)].slice(0, 8);
  localStorage.setItem(historyKey, JSON.stringify(history));
  renderHistory(history);
}

function loadHistory() {
  try {
    const parsed = JSON.parse(localStorage.getItem(historyKey) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function setBusy(isBusy) {
  state.isDrawing = isBusy;
  elements.drawButton.disabled = isBusy;
  elements.redraw.disabled = isBusy;
  elements.daily.disabled = isBusy;
  elements.drawButton.textContent = isBusy ? "洗牌中..." : "开始占卜";
  elements.redraw.textContent = isBusy ? "重新洗牌中..." : "再抽一次";
}

function secureRandom() {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return array[0] / 2 ** 32;
}

function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.hidden = false;
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    elements.toast.hidden = true;
  }, 1800);
}

function getCardGlyph(card) {
  if (card.suit === "大阿尔卡那") return "玄";
  if (card.suit === "权杖") return "炎";
  if (card.suit === "圣杯") return "月";
  if (card.suit === "宝剑") return "刃";
  return "灵";
}

function getTodayInputValue() {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60_000;
  return new Date(now.getTime() - offset).toISOString().slice(0, 10);
}

function clearRevealTimers() {
  state.revealTimers.forEach((timer) => window.clearTimeout(timer));
  state.revealTimers = [];
}

function createShareImage(reading) {
  const canvas = document.createElement("canvas");
  const width = 1080;
  const height = 1600;
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  drawShareBackground(ctx, width, height);
  drawWrappedText(ctx, "月庭塔罗", 72, 100, 56, 760, "#faf3e6", 1.15, "800");
  drawWrappedText(ctx, "TAROT ORACLE", 74, 164, 20, 760, "#c43a3a", 1.2, "700");
  const question = reading.question || "此刻我最需要看见什么？";
  const spreadName = reading.spread?.name || "塔罗牌阵";
  const focus = reading.focus || "综合指引";
  const zodiac = reading.zodiac ? ` · ${reading.zodiac.emoji || ""} ${reading.zodiac.name}` : "";
  const summary = reading.summary || "本次牌面提醒你，先安静看见当下真正重要的讯息。";
  const actionPlan = reading.actionPlan?.length ? reading.actionPlan : [reading.advice].filter(Boolean);

  drawWrappedText(ctx, `问题：${question}`, 72, 240, 30, 880, "#f5efe0", 1.45, "700");
  drawWrappedText(ctx, `${spreadName} · ${focus}${zodiac} · ${reading.questionType?.type || "自我状态"}`, 72, 320, 24, 880, "#bfb4a0", 1.45, "500");

  reading.cards.forEach((card, index) => {
    drawShareCard(ctx, card, 72 + index * 245, 405);
  });

  const summaryY = reading.cards.length > 1 ? 770 : 720;
  const zodiacGuidance = reading.zodiac?.guidance;
  const contentY = zodiacGuidance
    ? drawWrappedText(ctx, `星座共鸣：${zodiacGuidance}`, 72, summaryY, 25, 880, "#c9a96e", 1.5, "500") + 32
    : summaryY;
  drawWrappedText(ctx, "核心解读", 72, contentY, 30, 880, "#c9a96e", 1.35, "700");
  const afterSummary = drawWrappedText(ctx, summary, 72, contentY + 58, 30, 880, "#f5efe0", 1.65, "500");
  drawWrappedText(ctx, "行动方案", 72, afterSummary + 34, 30, 880, "#c9a96e", 1.35, "700");
  const actionText = actionPlan.map((item, index) => `${index + 1}. ${item}`).join("\n") || "给自己一点空间，先观察，再决定下一步。";
  const afterActions = drawWrappedText(ctx, actionText, 72, afterSummary + 92, 28, 880, "#f5efe0", 1.6, "500");
  drawWrappedText(ctx, reading.disclaimer || "塔罗解读仅作自我觉察与娱乐参考。", 72, Math.min(afterActions + 64, 1480), 22, 880, "#bfb4a0", 1.45, "500");

  return canvas.toDataURL("image/png");
}

function drawShareBackground(ctx, width, height) {
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "#120e0a");
  gradient.addColorStop(0.55, "#1c1210");
  gradient.addColorStop(1, "#180e0c");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = "rgba(201, 169, 110, 0.06)";
  for (let index = 0; index < 120; index += 1) {
    const x = secureRandom() * width;
    const y = secureRandom() * height;
    ctx.beginPath();
    ctx.arc(x, y, secureRandom() * 2 + 0.7, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.fillStyle = "rgba(196, 58, 58, 0.04)";
  for (let index = 0; index < 40; index += 1) {
    const x = secureRandom() * width;
    const y = secureRandom() * height;
    ctx.beginPath();
    ctx.arc(x, y, secureRandom() * 1.5 + 0.5, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawShareCard(ctx, card, x, y) {
  const cardWidth = 210;
  const cardHeight = 300;
  ctx.fillStyle = "rgba(22, 14, 12, 0.85)";
  ctx.strokeStyle = "rgba(201, 169, 110, 0.5)";
  roundRect(ctx, x, y, cardWidth, cardHeight, 18);
  ctx.fill();
  ctx.stroke();

  drawWrappedText(ctx, card.position, x + 22, y + 34, 20, cardWidth - 44, "#bfb4a0", 1.2, "500");
  drawWrappedText(ctx, getCardGlyph(card), x + 78, y + 112, 56, cardWidth - 44, "#c9a96e", 1.2, "700");
  drawWrappedText(ctx, card.name, x + 22, y + 204, 28, cardWidth - 44, "#f5efe0", 1.2, "800");
  drawWrappedText(ctx, card.orientation, x + 22, y + 250, 20, cardWidth - 44, card.orientation === "逆位" ? "#c43a3a" : "#6b9080", 1.2, "700");
}

function drawWrappedText(ctx, text, x, y, size, maxWidth, color, lineHeight = 1.4, weight = "500") {
  ctx.font = `${weight} ${size}px "PingFang SC", "Microsoft YaHei", sans-serif`;
  ctx.fillStyle = color;
  const lines = String(text).split("\n").flatMap((line) => wrapLine(ctx, line, maxWidth));
  lines.forEach((line, index) => {
    ctx.fillText(line, x, y + index * size * lineHeight);
  });
  return y + lines.length * size * lineHeight;
}

function wrapLine(ctx, text, maxWidth) {
  const chars = [...String(text)];
  return chars.reduce(
    (lines, char) => {
      const current = lines[lines.length - 1];
      const next = `${current}${char}`;
      if (ctx.measureText(next).width > maxWidth && current) return [...lines.slice(0, -1), current, char];
      return [...lines.slice(0, -1), next];
    },
    [""],
  );
}

function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();
}

init();
