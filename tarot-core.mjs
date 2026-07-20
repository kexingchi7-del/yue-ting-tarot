export const spreads = {
  single: {
    id: "single",
    name: "一张启示",
    count: 1,
    positions: ["核心讯息"],
  },
  three: {
    id: "three",
    name: "三张流向",
    count: 3,
    positions: ["过去根源", "现在状态", "下一步"],
  },
  cross: {
    id: "cross",
    name: "四象十字",
    count: 4,
    positions: ["真实处境", "隐藏阻力", "可用资源", "行动建议"],
  },
};

export const zodiacSigns = [
  { id: "aries", name: "白羊座", emoji: "♈", symbol: "Aries", element: "火", quality: "开创", todayTheme: "把第一步变得足够小，然后立刻开始。", strength: "勇气与行动感", reminder: "别让速度替代判断。" },
  { id: "taurus", name: "金牛座", emoji: "♉", symbol: "Taurus", element: "土", quality: "固定", todayTheme: "把注意力放回身体、资源和可持续的节奏。", strength: "稳定与耐心", reminder: "别因为习惯而错过调整。" },
  { id: "gemini", name: "双子座", emoji: "♊", symbol: "Gemini", element: "风", quality: "变动", todayTheme: "先厘清信息，再决定该把话说给谁听。", strength: "好奇与沟通力", reminder: "别让太多选项带走你的专注。" },
  { id: "cancer", name: "巨蟹座", emoji: "♋", symbol: "Cancer", element: "水", quality: "开创", todayTheme: "先照顾真实感受，再处理外界期待。", strength: "感受力与照料", reminder: "别把所有人的情绪都背在自己身上。" },
  { id: "leo", name: "狮子座", emoji: "♌", symbol: "Leo", element: "火", quality: "固定", todayTheme: "用坦诚表达你想被看见的部分。", strength: "创造力与自信", reminder: "别为了证明自己而耗尽能量。" },
  { id: "virgo", name: "处女座", emoji: "♍", symbol: "Virgo", element: "土", quality: "变动", todayTheme: "整理一件具体小事，让混乱重新变得可控。", strength: "洞察与执行力", reminder: "别把完美当作开始的门槛。" },
  { id: "libra", name: "天秤座", emoji: "♎", symbol: "Libra", element: "风", quality: "开创", todayTheme: "把关系里的需要说清楚，而不是只维持表面的平衡。", strength: "协调与审美", reminder: "别用迟疑回避真正的选择。" },
  { id: "scorpio", name: "天蝎座", emoji: "♏", symbol: "Scorpio", element: "水", quality: "固定", todayTheme: "允许一个旧模式结束，为更诚实的关系留出位置。", strength: "专注与转化力", reminder: "别把防备误认为力量。" },
  { id: "sagittarius", name: "射手座", emoji: "♐", symbol: "Sagittarius", element: "火", quality: "变动", todayTheme: "为想去的方向留出一点真实行动。", strength: "视野与信念", reminder: "别用远方逃开眼前的责任。" },
  { id: "capricorn", name: "摩羯座", emoji: "♑", symbol: "Capricorn", element: "土", quality: "开创", todayTheme: "把目标拆成可交付的一步，并给自己一个完成节点。", strength: "责任感与长期主义", reminder: "别把休息当作不够努力。" },
  { id: "aquarius", name: "水瓶座", emoji: "♒", symbol: "Aquarius", element: "风", quality: "固定", todayTheme: "相信新想法，但先找到能和现实连接的支点。", strength: "独立思考与创新", reminder: "别因保持距离而错过支持。" },
  { id: "pisces", name: "双鱼座", emoji: "♓", symbol: "Pisces", element: "水", quality: "变动", todayTheme: "把直觉记下来，再用一个现实动作验证它。", strength: "共情与想象力", reminder: "别把模糊的期待当作承诺。" },
];

export function getZodiacProfile(zodiacId) {
  return zodiacSigns.find((sign) => sign.id === zodiacId) || null;
}

const zodiacBoundaries = [
  [120, "capricorn"],
  [219, "aquarius"],
  [321, "pisces"],
  [420, "aries"],
  [521, "taurus"],
  [622, "gemini"],
  [723, "cancer"],
  [823, "leo"],
  [923, "virgo"],
  [1024, "libra"],
  [1123, "scorpio"],
  [1222, "sagittarius"],
  [1232, "capricorn"],
];

const weekdayGuides = [
  "留一点空白给休息和关系修复。",
  "适合开一个清晰的头，先把第一步做出来。",
  "适合沟通、确认信息和推进协作。",
  "适合整理、学习和校准方法。",
  "适合做决定，但先把边界与代价说清。",
  "适合收尾、复盘和安排轻松的连接。",
  "适合放慢节奏，为下周预留空间。",
];

const focusDayActions = {
  综合: ["整理优先级", "推进一件小事", "确认一个真实需求"],
  感情: ["坦诚沟通", "安排有质量的相处", "确认彼此边界"],
  事业: ["启动关键任务", "确认合作节点", "提交阶段成果"],
  金钱: ["盘点支出", "处理必要账目", "比较长期成本"],
  自我成长: ["书写复盘", "练习一项技能", "为自己留出独处时间"],
};

const dayCautions = ["冲动承诺", "把焦虑当作事实", "在信息不完整时做大额决定", "为了取悦他人而压缩自己的边界", "一次安排过多目标", "反复拖延已经能开始的小事"];

export const baziCities = [
  { id: "beijing", name: "北京", longitude: 116.4074 },
  { id: "shanghai", name: "上海", longitude: 121.4737 },
  { id: "guangzhou", name: "广州", longitude: 113.2644 },
  { id: "shenzhen", name: "深圳", longitude: 114.0579 },
  { id: "hangzhou", name: "杭州", longitude: 120.1551 },
  { id: "wuhan", name: "武汉", longitude: 114.3054 },
  { id: "chengdu", name: "成都", longitude: 104.0665 },
  { id: "xian", name: "西安", longitude: 108.9398 },
  { id: "urumqi", name: "乌鲁木齐", longitude: 87.6168 },
  { id: "harbin", name: "哈尔滨", longitude: 126.535 },
];

const earthlyBranches = [
  { name: "子时", element: "水", quality: "静中生机" }, { name: "丑时", element: "土", quality: "沉稳蓄力" },
  { name: "寅时", element: "木", quality: "破晓行动" }, { name: "卯时", element: "木", quality: "舒展生发" },
  { name: "辰时", element: "土", quality: "收束成形" }, { name: "巳时", element: "火", quality: "灵感显现" },
  { name: "午时", element: "火", quality: "明朗推进" }, { name: "未时", element: "土", quality: "安放整合" },
  { name: "申时", element: "金", quality: "理性收获" }, { name: "酉时", element: "金", quality: "精炼判断" },
  { name: "戌时", element: "土", quality: "守成归纳" }, { name: "亥时", element: "水", quality: "回望滋养" },
];
const ZHI_INDEX = Object.freeze(Object.fromEntries("子丑寅卯辰巳午未申酉戌亥".split("").map((zhi, index) => [zhi, index])));

export function getZodiacIdByBirthDate(birthDate) {
  const parsed = parseIsoDate(birthDate);
  if (!parsed) return "";

  const monthDay = parsed.month * 100 + parsed.day;
  return zodiacBoundaries.find(([boundary]) => monthDay < boundary)?.[1] || "capricorn";
}

export function buildDayGuide({ birthDate, zodiacId = "", date = getLocalDateString(), focus = "综合" } = {}) {
  const birth = parseIsoDate(birthDate);
  const target = parseIsoDate(date);
  if (!target) return null;

  const targetDays = Math.floor(Date.UTC(target.year, target.month - 1, target.day) / 86_400_000);
  let birthSeed;
  let resolvedZodiac;

  if (birth) {
    birthSeed = birth.year * 17 + birth.month * 31 + birth.day;
    resolvedZodiac = getZodiacProfile(getZodiacIdByBirthDate(birthDate));
  } else if (zodiacId) {
    const idx = zodiacSigns.findIndex((s) => s.id === zodiacId);
    birthSeed = (idx + 1) * 31 + target.month * 7;
    resolvedZodiac = getZodiacProfile(zodiacId);
  } else {
    birthSeed = target.month * 11 + target.day * 3;
  }

  const personalCycle = (targetDays + birthSeed) % 60;
  const score = 35 + ((personalCycle * 7 + target.month * 11 + target.day * 3) % 61);
  const label = score >= 76 ? "顺势日" : score >= 56 ? "稳步日" : "静观日";
  const suitable = focusDayActions[focus] || focusDayActions.综合;
  const caution = dayCautions[(personalCycle + target.day) % dayCautions.length];

  return {
    date: formatIsoDate(target),
    score,
    label,
    zodiacName: resolvedZodiac?.name || "你的星座",
    suitable: suitable.slice(0, score >= 76 ? 3 : 2),
    caution,
    rhythm: weekdayGuides[new Date(Date.UTC(target.year, target.month - 1, target.day)).getUTCDay()],
    note: "这是结合生日星座、日期节律与主题生成的择日参考，适合用来安排节奏，不替代传统黄历或专业决策。",
  };
}

export function getEarthlyBranch(time) {
  const parsed = parseTime(time);
  if (!parsed) return null;
  const totalMinutes = parsed.hour * 60 + parsed.minute;
  return earthlyBranches[Math.floor(((totalMinutes + 60) % 1_440) / 120)];
}

export function buildBaziProfile({ birthDate, birthTime, cityId = "beijing", gender = "male", longitude, timezoneOffset = 8, daylightSavingMinutes = 0, useTrueSolarTime = true, targetYear, targetDate } = {}) {
  const birth = parseIsoDate(birthDate);
  const time = parseTime(birthTime);
  const city = baziCities.find((item) => item.id === cityId) || baziCities[0];
  if (!birth || !time) return null;
  if (longitude !== undefined && !Number.isFinite(Number(longitude))) throw new Error("请填写有效的出生地经度。");
  const chart = buildProfessionalBazi({
    birthDate,
    birthTime,
    gender,
    longitude: longitude === undefined ? city.longitude : Number(longitude),
    timezoneOffset: Number(timezoneOffset),
    daylightSavingMinutes: Number(daylightSavingMinutes),
    useTrueSolarTime,
    targetYear: targetYear || new Date().getFullYear(),
    targetDate,
  });
  const branch = earthlyBranches[ZHI_INDEX[chart.pillars.hour.zhi]];
  const correction = chart.time.totalCorrectionMinutes;

  return {
    city,
    branch,
    solarTime: { formatted: chart.time.formatted, offsetMinutes: correction, dayShift: chart.time.dayShift },
    chart,
    summary: `${city.name}排盘：${chart.pillars.year.ganZhi}年、${chart.pillars.month.ganZhi}月、${chart.pillars.day.ganZhi}日、${chart.pillars.hour.ganZhi}时；${chart.conventions.timeBasis} ${chart.conventions.timeBasis === "地方真太阳时" ? chart.time.formatted : birthTime}，当前按${chart.luck.direction}起运。`,
    note: chart.warnings.join(" "),
  };
}

const majors = [
  ["愚者", "新的开始", "冒险、自由、信任直觉", "鲁莽、逃避、准备不足"],
  ["魔术师", "显化能力", "行动力、资源整合、专注", "分心、操控、能量散乱"],
  ["女祭司", "内在智慧", "直觉、潜意识、静观", "压抑感受、秘密、迟疑"],
  ["皇后", "丰盛滋养", "创造、关系滋养、感官稳定", "过度照顾、依赖、停滞"],
  ["皇帝", "秩序边界", "结构、责任、掌控", "僵硬、控制欲、权威冲突"],
  ["教皇", "传统信念", "学习、规则、精神指引", "盲从、教条、价值冲突"],
  ["恋人", "选择与联结", "关系、价值一致、承诺", "犹豫、失衡、诱惑"],
  ["战车", "意志推进", "胜利、纪律、方向感", "失控、急躁、拉扯"],
  ["力量", "温柔勇气", "耐心、自信、情绪驯服", "自我怀疑、压抑、失去耐性"],
  ["隐士", "独处求真", "反思、内在答案、沉淀", "孤立、逃离现实、闭塞"],
  ["命运之轮", "周期转动", "转机、变化、顺势", "抗拒变化、反复、失序"],
  ["正义", "因果平衡", "判断、公平、清晰边界", "偏见、逃责、失衡"],
  ["倒吊人", "换位等待", "暂停、牺牲、视角转换", "拖延、无谓消耗、卡住"],
  ["死神", "结束重生", "转化、告别、更新", "抗拒结束、旧模式缠绕"],
  ["节制", "调和流动", "平衡、疗愈、节奏", "过度、焦躁、能量不均"],
  ["恶魔", "欲望束缚", "执念、诱惑、看见阴影", "松绑、觉醒、脱离依附"],
  ["高塔", "结构崩解", "突变、真相、重建契机", "害怕改变、延迟爆发"],
  ["星星", "希望复苏", "愿景、疗愈、信任未来", "失望、信念低落、空想"],
  ["月亮", "迷雾潜流", "梦境、敏感、未知", "误判、焦虑、幻象散去"],
  ["太阳", "明亮成功", "喜悦、坦诚、生命力", "过度乐观、延迟的快乐"],
  ["审判", "召唤觉醒", "复盘、召唤、重要决定", "自责、回避、迟迟不决"],
  ["世界", "完整抵达", "完成、整合、阶段圆满", "未竟之事、缺口、收尾困难"],
];

const suits = [
  {
    name: "权杖",
    element: "火",
    theme: "行动、野心、创造力",
    cards: [
      ["王牌", "灵感点火", "新计划、热情、开始行动", "热情不足、机会未抓住"],
      ["二", "远景规划", "选择方向、扩张视野", "犹豫、计划停留纸面"],
      ["三", "等待回响", "远方机会、合作扩展", "延迟、期待落空"],
      ["四", "阶段庆祝", "稳定、归属、里程碑", "表面和谐、根基不稳"],
      ["五", "竞争摩擦", "较量、试炼、意见冲突", "内耗、无谓争执"],
      ["六", "公开胜利", "认可、进展、好消息", "虚荣、认可不足"],
      ["七", "守住立场", "防守、坚持、优势", "疲惫、立场动摇"],
      ["八", "快速推进", "消息、速度、突破", "拖延、沟通卡顿"],
      ["九", "最后防线", "警觉、韧性、保护成果", "过度防备、力竭"],
      ["十", "责任重担", "压力、承担、快到终点", "卸责困难、被压垮"],
      ["侍从", "热情信使", "探索、创意、初生勇气", "三分钟热度、躁动"],
      ["骑士", "冲锋冒险", "大胆、旅行、快速行动", "冲动、鲁莽、易变"],
      ["王后", "自信魅力", "吸引力、独立、热情领导", "嫉妒、控制、情绪化"],
      ["国王", "远见领导", "决断、事业格局、号召力", "专断、好大喜功"],
    ],
  },
  {
    name: "圣杯",
    element: "水",
    theme: "情感、关系、疗愈",
    cards: [
      ["王牌", "情感涌泉", "新感情、疗愈、心门打开", "封闭、情绪枯竭"],
      ["二", "双向靠近", "互相吸引、和解、合作", "不对等、误会"],
      ["三", "友谊欢聚", "庆祝、支持、社群", "小圈子、过度社交"],
      ["四", "心绪停摆", "厌倦、冷静、重新审视", "错过机会、重新打开"],
      ["五", "失落回望", "悲伤、遗憾、情绪整理", "走出失落、看见剩余"],
      ["六", "旧日温柔", "回忆、童真、旧人旧事", "沉溺过去、幼稚"],
      ["七", "迷人选项", "幻想、多选择、想象力", "看清现实、选择落地"],
      ["八", "转身离开", "放下、寻找更深意义", "舍不得、逃避告别"],
      ["九", "愿望满足", "享受、满足、心愿达成", "空虚、表面满足"],
      ["十", "情感圆满", "家庭、幸福、关系和谐", "期待过高、关系裂缝"],
      ["侍从", "柔软讯息", "表白、创意、敏感直觉", "情绪幼稚、幻想"],
      ["骑士", "浪漫追寻", "邀请、理想主义、温柔行动", "暧昧、承诺不足"],
      ["王后", "共情滋养", "温柔、洞察、照顾", "情绪淹没、边界薄"],
      ["国王", "成熟情感", "稳定、包容、情绪管理", "压抑、逃避表达"],
    ],
  },
  {
    name: "宝剑",
    element: "风",
    theme: "思考、沟通、判断",
    cards: [
      ["王牌", "清晰之刃", "真相、决断、突破迷雾", "混乱、误判、话语伤人"],
      ["二", "悬而未决", "僵持、权衡、暂不表态", "逃避选择、信息不足"],
      ["三", "刺痛真相", "心碎、失望、必要疼痛", "疗愈开始、旧伤反复"],
      ["四", "休整复原", "暂停、睡眠、恢复", "过劳、无法真正休息"],
      ["五", "胜负代价", "争胜、消耗、冲突后果", "放下输赢、修复"],
      ["六", "离岸过渡", "搬迁、缓慢好转、脱离困境", "旧问题未解决"],
      ["七", "策略隐身", "谋略、保留、绕路", "欺瞒暴露、计划漏洞"],
      ["八", "自我束缚", "受限、恐惧、看不见出口", "松绑、发现选择"],
      ["九", "夜半焦虑", "担忧、失眠、心理压力", "求助、压力释放"],
      ["十", "触底结束", "结束、背叛感、最低点", "复苏、痛苦退潮"],
      ["侍从", "敏锐观察", "消息、学习、警觉", "嘴快、疑心、刺探"],
      ["骑士", "直线突进", "快速沟通、辩论、执行", "鲁莽攻击、缺乏同理"],
      ["王后", "清醒边界", "独立、洞察、直言", "冷酷、过度防御"],
      ["国王", "理性裁决", "逻辑、权威、专业判断", "苛刻、专制、抽离"],
    ],
  },
  {
    name: "星币",
    element: "土",
    theme: "现实、金钱、身体、稳定",
    cards: [
      ["王牌", "现实种子", "机会、收入、可落地开端", "资源浪费、机会延迟"],
      ["二", "动态平衡", "多任务、现金流、灵活调整", "失衡、顾此失彼"],
      ["三", "协作工艺", "团队、技能、认可专业", "配合不佳、标准不一"],
      ["四", "守成控制", "储蓄、安全感、占有", "吝啬、害怕失去"],
      ["五", "匮乏时刻", "困难、孤立、财务压力", "得到帮助、转机出现"],
      ["六", "资源流动", "给予、帮助、公平交换", "不平等、亏欠感"],
      ["七", "耐心耕耘", "等待成果、长期投资", "急躁、回报不及预期"],
      ["八", "专注打磨", "练习、技能、稳定进步", "乏味、敷衍、停滞"],
      ["九", "自给丰盛", "独立、品味、成果享受", "依赖、外在包装"],
      ["十", "长期基业", "家庭资产、传承、稳定系统", "家族压力、结构老化"],
      ["侍从", "踏实学习", "新技能、计划、务实开始", "懒散、眼高手低"],
      ["骑士", "稳步执行", "可靠、责任、长期坚持", "固执、进展慢"],
      ["王后", "生活滋养", "照料、财务智慧、身体舒适", "过度操心、物质焦虑"],
      ["国王", "现实掌舵", "资源管理、成熟事业、稳定成果", "保守、贪控、僵化"],
    ],
  },
];

export const tarotDeck = [
  ...majors.map(([name, archetype, upright, reversed], index) => ({
    id: `major-${index}`,
    name,
    suit: "大阿尔卡那",
    element: "灵魂",
    number: index,
    archetype,
    upright,
    reversed,
  })),
  ...suits.flatMap((suit) =>
    suit.cards.map(([rank, archetype, upright, reversed], index) => ({
      id: `${suit.name}-${index + 1}`,
      name: `${suit.name}${rank}`,
      suit: suit.name,
      element: suit.element,
      number: index + 1,
      archetype,
      theme: suit.theme,
      upright,
      reversed,
    })),
  ),
];

const focusLenses = {
  综合: "把它看成当前生活重心的提醒，不必急着给所有事下结论，先找最明显的那一步。",
  感情: "把牌意放到关系里的互动、需求、边界与真实感受上，不只看对方，也要看自己的位置。",
  事业: "把牌意落到机会质量、执行节奏、协作关系与可验证成果上，少靠情绪判断。",
  金钱: "把牌意对应到现金流、风险承受、资源交换与长期稳定，不用一时涨跌定义全局。",
  自我成长: "把牌意当成内在模式的镜子，重点看你正在重复什么，以及哪里可以换一种回应。",
};

const positionLenses = {
  核心讯息: "它是这次问题的主轴，直接指出你此刻最需要承认或使用的力量。",
  过去根源: "它说明事情为什么会走到现在，常常对应旧经验、旧选择或之前累积的情绪。",
  现在状态: "它反映当下最活跃的能量，也是你马上能感受到的压力、机会或卡点。",
  下一步: "它不是绝对结果，而是牌面建议你优先尝试的方向。",
  真实处境: "它描述表面事件背后真正正在发生的结构。",
  隐藏阻力: "它提醒容易被忽略、被压下去，或不愿面对的干扰。",
  可用资源: "它显示你已经拥有、可以调用，或可以向外寻求的支持。",
  行动建议: "它把牌面收束成接下来最值得执行的一步。",
};

const elementMeanings = {
  火: "行动力和欲望很强，适合推进，但要避免只凭一股劲。",
  水: "情绪和关系是关键，适合倾听感受，也要留意投射和依赖。",
  风: "信息、沟通与判断占上风，适合澄清事实，避免过度脑补。",
  土: "现实条件和资源配置最重要，适合慢慢落实，不宜只停在想象。",
  灵魂: "大阿尔卡那较多，说明这件事不只是日常选择，也牵涉更深层的阶段变化。",
};

const focusActions = {
  综合: {
    today: "写下你最担心的一件事和最能掌控的一件事。",
    observe: "三天内观察现实反馈，而不是只观察情绪起伏。",
    avoid: "不要把所有问题一次性解决，先完成最小的一步。",
  },
  感情: {
    today: "先确认自己的真实需求，再决定要不要表达给对方。",
    observe: "三天内观察对方是否有稳定行动，而不只是当下情绪。",
    avoid: "不要用猜测替代沟通，也不要为了被回应而降低边界。",
  },
  事业: {
    today: "列出机会的收益、成本和不可控风险，先做一个低成本验证。",
    observe: "三天内观察资源、协作和反馈是否真的支持你推进。",
    avoid: "不要只被热情或焦虑推动，先把承诺、边界和交付标准写清楚。",
  },
  金钱: {
    today: "先确认现金流安全线，再决定投入、消费或等待。",
    observe: "三天内观察风险是否可控，以及是否存在被情绪放大的判断。",
    avoid: "不要冲动加码，也不要因为短期波动否定长期节奏。",
  },
  自我成长: {
    today: "记录触发你情绪的具体场景，并选择一个旧反应暂停三秒。",
    observe: "三天内观察自己是否又回到熟悉的内耗路径。",
    avoid: "不要急着证明自己已经改变，先用一个新行动替代旧反应。",
  },
};

const questionPatterns = [
  {
    type: "关系走向",
    words: ["感情", "关系", "复合", "喜欢", "爱", "对方", "他", "她", "恋"],
    lens: "你的问题更偏关系互动，关键不是单方面猜测对方，而是看双方是否都愿意让关系变得更清楚。",
  },
  {
    type: "选择判断",
    words: ["要不要", "是否", "该不该", "选择", "值得", "投入", "离开", "继续"],
    lens: "你的问题带有明显选择感，牌面会更适合用来判断当下条件是否成熟，而不是预言唯一结局。",
  },
  {
    type: "事业机会",
    words: ["事业", "工作", "跳槽", "机会", "项目", "合作", "offer", "创业"],
    lens: "你的问题偏事业与机会，重点要看执行成本、协作质量和可验证的回报，不只看愿景是否漂亮。",
  },
  {
    type: "金钱资源",
    words: ["钱", "金钱", "投资", "收入", "消费", "买", "卖", "亏", "赚"],
    lens: "你的问题涉及资源与风险，牌面更适合提醒你哪里需要稳住，而不是替代具体财务判断。",
  },
  {
    type: "自我状态",
    words: ["我", "状态", "焦虑", "成长", "方向", "内耗", "今天", "最近"],
    lens: "你的问题更像一次自我校准，答案会落在你此刻能调整的心态、节奏和行动上。",
  },
];

const disclaimer = "塔罗解读仅作自我觉察与娱乐参考，不替代医疗、法律、财务或其他专业建议。";

export function normalizeQuestion(question) {
  return String(question || "").trim().replace(/\s+/g, " ").slice(0, 80);
}

export function getSpread(spreadId) {
  return spreads[spreadId] || spreads.three;
}

export function shuffleDeck(deck, random = Math.random) {
  return deck
    .map((card) => ({ card, sort: random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ card }) => ({ ...card }));
}

export function drawReading({ question = "", focus = "综合", spreadId = "three", zodiacId = "", birthDate = "", birthTime = "", cityId = "beijing", gender = "male", longitude, timezoneOffset = 8, daylightSavingMinutes = 0, useTrueSolarTime = true, date = getLocalDateString(), random = Math.random } = {}) {
  const spread = getSpread(spreadId);
  const normalizedQuestion = normalizeQuestion(question);
  const questionType = detectQuestionType(normalizedQuestion, focus);
  const resolvedZodiacId = zodiacId || getZodiacIdByBirthDate(birthDate);
  const shuffled = shuffleDeck(tarotDeck, random);
  const cards = shuffled.slice(0, spread.count).map((card, index) => {
    const orientation = random() > 0.28 ? "正位" : "逆位";
    const meaning = orientation === "正位" ? card.upright : card.reversed;

    return {
      ...card,
      position: spread.positions[index],
      orientation,
      meaning,
      keywords: buildCardKeywords(card, orientation),
    };
  });

  const energy = buildEnergy(cards);
  const zodiac = buildZodiacReading({ zodiacId: resolvedZodiacId, cards, energy });
  const dayGuide = buildDayGuide({ birthDate, zodiacId: resolvedZodiacId, date, focus });
  const baziProfile = buildBaziProfile({ birthDate, birthTime, cityId, gender, longitude, timezoneOffset, daylightSavingMinutes, useTrueSolarTime, targetYear: Number(date?.slice(0, 4)), targetDate: date });
  const bazi = baziProfile
    ? { ...baziProfile, tarotBridge: buildBaziTarotBridge({ profile: baziProfile, cards }) }
    : null;

  return {
    id: createReadingId(random),
    createdAt: new Date().toISOString(),
    question: normalizedQuestion || "此刻最需要看见的讯息",
    focus,
    birthDate,
    drawMode: "自动抽牌",
    questionType,
    spread,
    cards,
    summary: buildSummary({ focus, cards, questionType }),
    advice: buildAdvice(cards),
    insights: buildInsights({ focus, cards, questionType }),
    energy,
    zodiac,
    dayGuide,
    bazi,
    actionPlan: buildActionPlan({ focus, cards, questionType }),
    caution: buildCaution(cards),
    disclaimer,
  };
}

export function drawReadingFromCardIds({ cardIds = [], question = "", focus = "综合", spreadId = "three", zodiacId = "", birthDate = "", birthTime = "", cityId = "beijing", gender = "male", longitude, timezoneOffset = 8, daylightSavingMinutes = 0, useTrueSolarTime = true, date = getLocalDateString(), random = Math.random } = {}) {
  const spread = getSpread(spreadId);
  const normalizedQuestion = normalizeQuestion(question);
  const questionType = detectQuestionType(normalizedQuestion, focus);
  const resolvedZodiacId = zodiacId || getZodiacIdByBirthDate(birthDate);
  const selectedIds = [...new Set(cardIds)].slice(0, spread.count);
  const selectedCards = selectedIds.map((id) => tarotDeck.find((card) => card.id === id)).filter(Boolean);
  if (selectedCards.length !== spread.count) throw new Error("请选择与牌阵张数一致的不同牌面。");

  const cards = selectedCards.map((card, index) => {
    const orientation = random() > 0.28 ? "正位" : "逆位";
    return { ...card, position: spread.positions[index], orientation, meaning: orientation === "正位" ? card.upright : card.reversed, keywords: buildCardKeywords(card, orientation) };
  });
  const energy = buildEnergy(cards);
  const zodiac = buildZodiacReading({ zodiacId: resolvedZodiacId, cards, energy });
  const dayGuide = buildDayGuide({ birthDate, zodiacId: resolvedZodiacId, date, focus });
  const baziProfile = buildBaziProfile({ birthDate, birthTime, cityId, gender, longitude, timezoneOffset, daylightSavingMinutes, useTrueSolarTime, targetYear: Number(date?.slice(0, 4)), targetDate: date });
  const bazi = baziProfile ? { ...baziProfile, tarotBridge: buildBaziTarotBridge({ profile: baziProfile, cards }) } : null;

  return {
    id: createReadingId(random), createdAt: new Date().toISOString(), question: normalizedQuestion || "此刻最需要看见的讯息", focus, birthDate, questionType, spread, cards,
    summary: buildSummary({ focus, cards, questionType }), advice: buildAdvice(cards), insights: buildInsights({ focus, cards, questionType }), energy, zodiac, dayGuide, bazi,
    actionPlan: buildActionPlan({ focus, cards, questionType }), caution: buildCaution(cards), disclaimer, drawMode: "自选牌",
  };
}

export function buildZodiacReading({ zodiacId, cards, energy }) {
  const profile = getZodiacProfile(zodiacId);
  if (!profile) return null;

  const dominantElement = energy?.title?.replace("能量倾向：", "") || "灵魂";
  const matchingCards = cards.filter((card) => card.element === profile.element);
  const terminalCard = cards[cards.length - 1];
  const resonance = matchingCards.length
    ? `你的${profile.element}象气质与这组牌里 ${matchingCards.length} 张${profile.element}元素牌形成呼应，适合优先使用${profile.strength}。`
    : `这组牌的主能量偏向${dominantElement}，与你的${profile.element}象气质形成互补；先接住${terminalCard.archetype}带来的提示，再决定如何行动。`;

  return {
    ...profile,
    dominantElement,
    guidance: `${profile.name}的今日主题是：${profile.todayTheme} ${resonance} ${profile.reminder}`,
  };
}

function buildBaziTarotBridge({ profile, cards }) {
  const matchingCard = cards.find((card) => card.element === profile.branch.element);
  if (matchingCard) {
    return `你的${profile.branch.element}元素时辰与「${matchingCard.name}」形成呼应，今天可把重点放在${matchingCard.archetype}上，并用实际行动验证感受。`;
  }

  const terminalCard = cards[cards.length - 1];
  return `时辰气质偏${profile.branch.element}，而牌面引导你关注${terminalCard.element}元素；把「${terminalCard.archetype}」当作平衡当前节奏的一种练习。`;
}

function parseIsoDate(value) {
  const match = String(value || "").match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return null;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(Date.UTC(year, month - 1, day));
  if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) return null;
  return { year, month, day };
}

function parseTime(value) {
  const match = String(value || "").match(/^(\d{2}):(\d{2})$/);
  if (!match) return null;
  const hour = Number(match[1]);
  const minute = Number(match[2]);
  if (hour > 23 || minute > 59) return null;
  return { hour, minute };
}

function formatIsoDate({ year, month, day }) {
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function getLocalDateString() {
  const now = new Date();
  return formatIsoDate({ year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() });
}

export function detectQuestionType(question, focus = "综合") {
  const matched = questionPatterns.find((pattern) => pattern.words.some((word) => question.includes(word)));
  if (matched) return { type: matched.type, lens: matched.lens };

  const fallback = questionPatterns.find((pattern) => pattern.type.includes(focus) || pattern.lens.includes(focus));
  return fallback || questionPatterns[4];
}

export function buildSummary({ focus, cards, questionType = questionPatterns[4] }) {
  const first = cards[0];
  const last = cards[cards.length - 1];
  const pressure = cards.filter((card) => card.orientation === "逆位").length;
  const tone = pressure >= Math.ceil(cards.length / 2) ? "这次牌面更像是在指出需要松动的结" : "这次牌面整体偏向可行动的推进";

  return `${focus}主题下，这更像一个「${questionType.type}」问题。${questionType.lens} ${first.name}提示你先看见「${first.archetype}」，${last.name}把答案落到「${last.archetype}」。${tone}。`;
}

export function buildAdvice(cards) {
  const verbs = cards.map((card) => {
    if (card.orientation === "逆位") return `先处理「${card.reversed.split("、")[0]}」`;
    return `主动运用「${card.upright.split("、")[0]}」`;
  });

  return `${verbs.join("，")}。把答案缩小到今天能完成的一步，牌意会更容易落地。`;
}

export function buildInsights({ focus, cards, questionType = questionPatterns[4] }) {
  const lens = focusLenses[focus] || focusLenses.综合;

  return cards.map((card) => ({
    position: card.position,
    title: `${card.position}：${card.name}（${card.orientation}）`,
    detail: `${positionLenses[card.position] || "这张牌补充了问题中的一个关键侧面"} 在这里，${card.name}把重点放在「${card.archetype}」。${card.orientation === "正位" ? `它鼓励你顺势使用${card.meaning}。` : `它提醒你先看见${card.meaning}，不要急着硬推。`} ${lens} 针对「${questionType.type}」，这张牌更像是在提示：先分清现实行动和内心期待。`,
  }));
}

export function buildEnergy(cards) {
  const counts = cards.reduce(
    (result, card) => ({
      ...result,
      [card.element]: (result[card.element] || 0) + 1,
    }),
    {},
  );
  const dominant = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || "灵魂";
  const reversedCount = cards.filter((card) => card.orientation === "逆位").length;
  const majorCount = cards.filter((card) => card.suit === "大阿尔卡那").length;
  const pressure =
    reversedCount === 0
      ? "阻滞感较少，适合把想法推进到现实动作。"
      : reversedCount >= Math.ceil(cards.length / 2)
        ? "逆位比例偏高，说明问题不是不能做，而是需要先整理卡住的地方。"
        : "有少量逆位提醒，整体仍可推进，但节奏要更谨慎。";
  const majorHint =
    majorCount > 0
      ? `其中 ${majorCount} 张大阿尔卡那让这次解读带有更强的阶段意味。`
      : "牌面以小阿尔卡那为主，重点更偏向日常选择和具体执行。";

  return {
    title: `能量倾向：${dominant}`,
    detail: `这组牌面里「${dominant}」元素最突出，${elementMeanings[dominant]} ${pressure} ${majorHint}`,
  };
}

export function buildActionPlan({ focus, cards, questionType = questionPatterns[4] }) {
  const base = focusActions[focus] || focusActions.综合;
  const nextCard = cards[cards.length - 1];
  const blocker = cards.find((card) => card.orientation === "逆位");
  const cardAction =
    nextCard.orientation === "正位"
      ? `今天：围绕「${nextCard.archetype}」主动做一个可观察的推进。${base.today}`
      : `今天：先把「${nextCard.reversed.split("、")[0]}」这个阻力降到可控范围。${base.today}`;
  const observation = blocker
    ? `三天内：特别留意「${blocker.name}」指出的${blocker.reversed.split("、")[0]}，它可能是当前最先要松开的结。${base.observe}`
    : `三天内：保持现在的清晰度，观察「${questionType.type}」相关的人、事、资源是否给出真实反馈。${base.observe}`;

  return [cardAction, observation, `不要做：${base.avoid}`];
}

export function buildCaution(cards) {
  const reversed = cards.filter((card) => card.orientation === "逆位");
  const swordCount = cards.filter((card) => card.suit === "宝剑").length;
  const cupCount = cards.filter((card) => card.suit === "圣杯").length;

  if (reversed.length >= Math.ceil(cards.length / 2)) {
    return `提醒：这次牌面不是在催你立刻冲刺，而是在要求你先修正节奏。尤其不要把「${reversed[0].reversed.split("、")[0]}」当成事实本身，它更像一个需要被处理的状态。`;
  }

  if (swordCount > cupCount && swordCount > 0) {
    return "提醒：宝剑能量偏明显时，容易用分析代替感受。做决定前，除了逻辑，也要确认身体和情绪是否真的同意。";
  }

  if (cupCount > swordCount && cupCount > 0) {
    return "提醒：圣杯能量偏明显时，容易被期待、回忆或关系氛围牵动。请把对方的实际行动和你的真实需求分开看。";
  }

  return "提醒：塔罗更适合帮你看清倾向与盲点，不适合替你交出人生选择权。真正有效的答案，需要回到你的行动里验证。";
}

export function formatReading(reading) {
  const chart = reading.bazi?.chart;
  const baziLines = chart ? [
    `四柱：${chart.pillars.year.ganZhi} ${chart.pillars.month.ganZhi} ${chart.pillars.day.ganZhi} ${chart.pillars.hour.ganZhi}`,
    `${chart.conventions.timeBasis}：${chart.conventions.timeBasis === "地方真太阳时" ? chart.time.apparentSolar : chart.time.civil}（真太阳时参考 ${chart.time.apparentSolar}）`,
    `起运：${chart.luck.direction}，${chart.luck.startAge.years} 年 ${chart.luck.startAge.months} 月 ${chart.luck.startAge.days} 天起运`,
    `大运：${chart.luck.daYun.map((item) => `${item.pillar} ${item.startYear}–${item.endYear}`).join("｜")}`,
    `流年：${chart.annual.year} ${chart.annual.pillar}${chart.annual.activeDaYun ? `，行${chart.annual.activeDaYun}大运` : ""}`,
  ] : [];
  const lines = [
    "月庭塔罗｜我的本次牌面",
    "",
    `问题：${reading.question}`,
    `主题：${reading.focus}`,
    ...(reading.zodiac ? [`星座：${reading.zodiac.name}（${reading.zodiac.element}象）`, `星座提示：${reading.zodiac.guidance}`] : []),
    ...(reading.dayGuide ? [`宜行指数：${reading.dayGuide.score} / 95 · ${reading.dayGuide.label}`, `适合：${reading.dayGuide.suitable.join("、")}`, `慎做：${reading.dayGuide.caution}`, reading.dayGuide.note] : []),
    ...(reading.bazi ? [`八字档案：${reading.bazi.summary}`, ...baziLines, `八字与牌面：${reading.bazi.tarotBridge}`, reading.bazi.note] : []),
    `问题类型：${reading.questionType?.type || "自我状态"}`,
    `牌阵：${reading.spread.name}`,
    "",
    ...reading.cards.map((card) => `${card.position}｜${card.name}（${card.orientation}）：${card.meaning}｜关键词：${card.keywords.join("、")}`),
    "",
    "整体判断：",
    reading.summary,
    reading.energy?.detail,
    "",
    "逐牌解读：",
    ...(reading.insights || []).map((insight) => `${insight.title}\n${insight.detail}`),
    "",
    "行动方案：",
    ...(reading.actionPlan || []).map((item, index) => `${index + 1}. ${item}`),
    "",
    "提醒：",
    reading.caution,
    "",
    reading.advice,
    "",
    reading.disclaimer || disclaimer,
  ].filter(Boolean);

  return lines.join("\n");
}

function buildCardKeywords(card, orientation) {
  const base = [card.archetype, card.element, card.suit === "大阿尔卡那" ? "阶段变化" : card.theme?.split("、")[0]];
  const orientationWord = orientation === "正位" ? card.upright.split("、")[0] : card.reversed.split("、")[0];
  return [...new Set([...base, orientationWord].filter(Boolean))].slice(0, 4);
}

function createReadingId(random) {
  return `tarot-${Date.now().toString(36)}-${Math.floor(random() * 1_000_000).toString(36)}`;
}
import { buildProfessionalBazi } from "./bazi-core.mjs";
