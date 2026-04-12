export interface Resource {
  id: string;
  type: "framework" | "method" | "template" | "case" | "checklist" | "pitfall";
  title: string;
  readTime: number;
  summary: string;
  content: string;
}

export interface Assignment {
  id: string;
  title: string;
  type: "analysis" | "creation" | "review" | "reflection";
  description: string;
  reviewCriteria: { name: string; weight: number }[];
  maxScore: number;
  weight: number;
}

export interface SyllabusModuleItem {
  type: "learn" | "practice";
  title: string;
  minutes: number;
  done?: boolean;
}

export interface SyllabusModule {
  id: string;
  title: string;
  objective: string;
  items: SyllabusModuleItem[];
}

export interface Syllabus {
  objective: string;
  knowledgePoints: string[];
  modules: SyllabusModule[];
  skillGrowth: { skill: string; from: number; to: number }[];
}

export interface CareerPosition {
  title: string;
  level: "entry" | "mid";
  salaryRange: string;
  companyTypes: string[];
  dailyWork: string;
  growthNext?: string;
}

export interface Task {
  id: string;
  type: "micro" | "system";
  title: string;
  subtitle: string;
  scenario: string;
  careerContext: string;
  difficulty: "entry" | "standard" | "advanced";
  industry: "retail" | "tourism" | "manufacturing";
  skills: string[];
  resources: Resource[];
  assignments: Assignment[];
  bonusPool: { baseAmount: number; perMemberStake: number; sponsorAmount: number; sponsorName: string };
  estimatedMinutes: number;
  squadSize: { min: number; max: number };
  activeLearners: number;
  activeSquads: number;
  recruitingSquads: number;
  syllabus?: Syllabus;
  // Micro-skill specific
  jobTarget?: string;
  career?: CareerPosition;
  // System-skill specific
  canManageMicroIds?: string[];
  careerGrowth?: CareerPosition;
}

// ────────────────────────────────────────────────────────
// 微技能课：1-2小时掌握一项具体技能，通过即可上岗
// 风格：得到App的精炼感 + 生财有术的实战感
// ────────────────────────────────────────────────────────

const aidaContent = `## AIDA模型详解：从注意到达成

### 一句话摘要
AIDA是文案创作的经典框架，帮助你的内容从"被看到"到"被行动"。

### AIDA四要素

**A -- Attention（注意）**
目标：让读者停下来看你的内容。

小红书上，用户划过一条笔记只需0.5秒。你必须在标题和首句抓住她。

手法：
- 数字冲击："3个月，宝宝红屁屁终于好了"
- 反常识："贵的一定好？这瓶50块的完胜300的"
- 痛点直击："又红了一片...当妈的谁不心疼"
- 好奇心："闺蜜塞给我的这瓶，我后悔没早用"

**I -- Interest（兴趣）**
目标：让读者愿意继续往下看。

手法：
- 制造共鸣："我也试过5种都不管用"
- 提出问题："为什么别人的宝宝皮肤那么好？"
- 数据佐证："成分党看过来：0添加、7项检测全过"

**D -- Desire（渴望）**
目标：让读者觉得"我也要"。

手法：
- 场景描绘："每次洗澡时，宝宝咯咯笑，再也不怕泡沫溅到嘴里"
- 情感共鸣："当妈后最幸福的事，就是看到宝宝安心的睡颜"
- 社交证明："宝妈群里300+妈妈亲测好评"

**A -- Action（行动）**
目标：让读者做出你想要的动作。

手法：
- 互动引导："同款红屁屁宝宝？评论区举手"
- 收藏暗示："建议收藏，宝宝下一个阶段也用得上"
- 限时福利："新手妈妈专属试用装，评论区领取"

### AIDA实例拆解

原文："宝宝红屁屁3个月，我用1个方法解决了

我家宝宝从第3个月开始，红屁屁反复发作。试了5种护臀膏，不是含激素就是不管用...（Interest：共鸣）

直到闺蜜推荐了贝贝乐天然洗护套装。0添加、7项检测全过，"安全到可以吃"——当妈的看到这句话真的太安心了。（Desire：场景+情感）

每次洗澡，泡沫不小心溅到嘴里也不怕。宝宝现在皮肤嫩嫩的，再也没有红过！（Desire：场景描绘）

有同款红屁屁宝宝的妈妈吗？评论区交流心得，还有专属试用装福利！（Action）"

### 要点回顾
- AIDA不是模板，是思维框架
- Attention靠标题，Interest靠共鸣，Desire靠场景，Action靠引导
- 四个环节缺一不可，最常见的错误是跳过Interest直接Desire`;

const templateContent = `## 小红书种草文案AIDA模板

### 标题模板（3选1）

**模板1：数字+结果型**
[数字][时间]，[问题]终于[结果]
例：3个月，宝宝红屁屁终于好了

**模板2：反问+悬念型**
[疑问]？[意外结论]
例：贵的一定好？这瓶50块完胜300的

**模板3：场景+共鸣型**
[场景描述]，[情感共鸣]
例：又红了一片...当妈的谁不心疼

### 正文AIDA四段模板

**【Attention -- 抓注意】**
用1句话描绘痛点场景或抛出惊人数据。

**【Interest -- 制造兴趣】**
2-3句话，制造"我也是"的共鸣感。描述试过什么、为什么不行。

**【Desire -- 激发渴望】**
3-5句话，用场景描绘+产品卖点融入+情感共鸣。

**【Action -- 推动行动】**
1-2句话，给出明确的行动指引。

### 要点回顾
- 标题决定80%的点击率，花50%时间打磨标题
- 正文控制在300-600字，超过600字完播率骤降`;

const checklistContent = `## 种草文案发布前自检10条

1. 标题是否包含目标用户关键词？
2. 首句是否3秒内抓住注意力？
3. 是否制造了痛点共鸣？
4. 产品卖点是否自然融入而非硬广？
5. 是否有情感共鸣的"啊哈"时刻？
6. 行动号召是否清晰具体？
7. 话题标签是否覆盖核心词（3-5个）？
8. 全文字数是否在300-600字？
9. 是否有至少1个互动引导？
10. 整体语气是否像"闺蜜分享"？

### 优先级
- **必须达标**：1、3、5、6、10（缺失任何一条效果减半）
- **强烈建议**：2、4、8
- **锦上添花**：7、9`;

const fabContent = `## FAB法则详解：从特征到利益

### 核心公式
Feature（特征）→ Advantage（优势）→ Benefit（利益）

消费者不关心你的产品有什么功能，只关心"这对我有什么好处"。

### 三层转化示例

**Feature**：自动感光调节，环境光变暗时自动增加亮度
**Advantage**：不需要手动调节，光线始终舒适
**Benefit**：孩子写作业时眼睛不累，家长不用操心

### FAB转化的3个技巧
- 技巧1：从"我们能做什么"到"你能获得什么"
- 技巧2：用场景替代参数——"399流明"不如"晚上看书像白天"
- 技巧3：用对比制造感知——"比普通台灯亮50%"不如"同样的灯，你的眼睛少累1小时"`;

const shortVideoContent = `## 短视频3秒法则与完播率公式

### 黄金3秒
抖音用户的注意力窗口只有3秒。前3秒决定了80%的完播率。

3秒内必须做到：
- 视觉冲击：动作/文字/对比画面
- 悬念设置："你绝对不知道..."、"最后那个太绝了"
- 痛点切入：直接呈现问题画面

### 完播率公式
完播率 = 开头吸引力 × 内容节奏 × 结尾留存

- 开头吸引力：3秒法则
- 内容节奏：每5-7秒一个信息点或情绪转折
- 结尾留存：倒数/彩蛋/引导互动`;

const travel5SenseContent = `## 旅行叙事5感写作法

### 核心原理
好的旅行笔记不是写"去了哪"，而是写"感受到了什么"。读者要的不是行程单，是"我也想去"的冲动。

### 5感拆解

**视觉**：你看到了什么？
不只是"古镇很美"，而是"清晨6点的锦溪，雾气从水面升起来，石桥若隐若现"

**听觉**：你听到了什么？
"桨声划过水面，老街深处的茶馆飘来评弹声"

**嗅觉**：你闻到了什么？
"巷子口的桂花香，混着阿婆刚出锅的酒酿味道"

**味觉**：你尝到了什么？
"一碗奥灶面，汤头浓郁到眉毛要掉"

**触觉**：你摸到了什么？
"千年石板路被脚底磨得光滑，指尖触碰古宅木门上的铜环"

### 要点
- 视觉最容易写，但最容易同质化
- 嗅觉和味觉最能唤起"我也想去"
- 每篇笔记至少覆盖3感`;

const b2bFabContent = `## FAB法则B2B版：采购决策者视角

### B2C vs B2B的区别
B2C的Benefit是"感觉好"，B2B的Benefit是"算得清"。

采购决策者关心三件事：降本、增效、避风险。

### B2B场景FAB转化

**Feature**：扳手采用CR-V铬钒钢，硬度HRC45
**Advantage**：比普通碳钢扳手寿命长3倍，不易滑牙
**Benefit**：减少工具更换频率，年节省采购成本30%，降低因工具故障导致的停工风险

### B2B文案的4个铁律
1. 用数据说话——"3倍寿命"比"更耐用"有说服力
2. 算ROI——采购者要能算出投资回报
3. 降低风险——B2B最怕选错，要给安全感
4. 比对标品——和行业标杆对比才有感知`;

const privateDomain3CContent = `## 私域文案3C模型

### Connection -- 建立连接
不是发广告，而是建立关系。早安文案要像朋友发的朋友圈。

- 问句开头："今天你用什么面膜？"
- 共鸣切入："加班到9点回家，只想3步搞定护肤"
- 日常分享："周末用花间集泡澡，感觉自己活过来了"

### Content -- 价值内容
不是推产品，而是给价值。

- 护肤知识：早C晚A、成分科普
- 生活技巧：收纳、穿搭、养生
- 情绪价值：治愈文案、励志金句

### Conversion -- 自然转化
不是硬卖，而是顺水推舟。

- 限时福利暗示："今晚8点群里有个好价"
- 使用感受带入："用了一周，毛孔真的细了"
- 圈层认同："成分党姐妹都懂"`;

// ────────────────────────────────────────────────────────
// 课程数据
// ────────────────────────────────────────────────────────

export const tasks: Task[] = [
  // ═══════════════════════════════════════════════════════
  // 微技能课 — B-互联网大厂（AI应用方向）
  // ═══════════════════════════════════════════════════════
  {
    id: "ai-micro-01",
    type: "micro",
    title: "AI提示词工程速成",
    subtitle: "2小时掌握Prompt设计框架，让大模型输出高质量工作成果",
    scenario: "你是一家互联网公司的运营专员，需要使用AI工具完成日常工作报告、数据分析、内容创作等任务。但发现AI输出的质量不稳定，需要系统学习Prompt设计方法。",
    careerContext: "互联网大厂AI应用专员的必备技能",
    difficulty: "entry",
    industry: "retail",
    skills: ["提示词工程", "AI工具应用"],
    jobTarget: "AI应用运营专员",
    career: {
      title: "AI应用运营专员",
      level: "entry",
      salaryRange: "8k-15k/月",
      companyTypes: ["阿里巴巴", "腾讯", "字节跳动", "百度", "大型国企数字化部门"],
      dailyWork: "使用AI工具提升工作效率、设计Prompt模板、培训团队AI应用技能",
      growthNext: "AI应用专家 → AI产品经理",
    },
    resources: [
      { id: "ai-micro-01-r1", type: "framework", title: "Prompt设计CRISPE框架", readTime: 8, summary: "Capacity-Role-Insight-Statement-Personality-Experiment", content: "" },
      { id: "ai-micro-01-r2", type: "template", title: "10个高频工作场景Prompt模板", readTime: 6, summary: "报告撰写、数据分析、内容创作等", content: "" },
      { id: "ai-micro-01-r3", type: "checklist", title: "Prompt质量自检清单", readTime: 4, summary: "明确性、上下文、约束条件、输出格式", content: "" },
    ],
    assignments: [
      { id: "ai-micro-01-a1", title: "用CRISPE框架设计3个工作场景Prompt", type: "creation", description: "分别为工作报告、数据分析、内容创作设计Prompt模板", reviewCriteria: [{ name: "CRISPE要素完整", weight: 0.35 }, { name: "输出质量稳定", weight: 0.35 }, { name: "可复用性强", weight: 0.3 }], maxScore: 100, weight: 0.7 },
      { id: "ai-micro-01-a2", title: "点评同学的Prompt并优化", type: "review", description: "选择同学的Prompt，测试输出质量并给出优化建议", reviewCriteria: [{ name: "问题识别准确", weight: 0.4 }, { name: "优化建议有效", weight: 0.35 }, { name: "态度建设性", weight: 0.25 }], maxScore: 100, weight: 0.3 },
    ],
    bonusPool: { baseAmount: 50, perMemberStake: 10, sponsorAmount: 0, sponsorName: "" },
    estimatedMinutes: 120,
    squadSize: { min: 3, max: 5 },
    activeLearners: 456,
    activeSquads: 92,
    recruitingSquads: 24,
  },
  {
    id: "ai-micro-02",
    type: "micro",
    title: "AI数据分析助手实战",
    subtitle: "2小时掌握用AI做数据清洗、分析和可视化报告",
    scenario: "你是电商运营团队的数据分析专员，每周需要处理销售数据、用户行为数据并输出分析报告。学习用AI工具自动化数据分析流程，将4小时的工作压缩到30分钟。",
    careerContext: "互联网大厂数据运营的核心技能",
    difficulty: "entry",
    industry: "retail",
    skills: ["AI数据分析", "自动化报告"],
    jobTarget: "数据运营专员",
    career: {
      title: "数据运营专员",
      level: "entry",
      salaryRange: "10k-18k/月",
      companyTypes: ["阿里巴巴", "京东", "美团", "拼多多", "国有银行数字化部"],
      dailyWork: "使用AI工具进行数据清洗、分析、可视化，输出业务洞察报告",
      growthNext: "数据分析师 → 数据产品经理",
    },
    resources: [
      { id: "ai-micro-02-r1", type: "framework", title: "AI数据分析工作流", readTime: 8, summary: "数据清洗→分析→可视化→洞察", content: "" },
      { id: "ai-micro-02-r2", type: "method", title: "用AI写SQL查询的5个技巧", readTime: 6, summary: "自然语言转SQL的Prompt设计", content: "" },
      { id: "ai-micro-02-r3", type: "template", title: "数据分析报告AI模板库", readTime: 5, summary: "销售分析、用户分析、竞品分析", content: "" },
    ],
    assignments: [
      { id: "ai-micro-02-a1", title: "用AI完成一份电商销售数据分析报告", type: "creation", description: "使用AI工具对提供的销售数据进行清洗、分析并生成可视化报告", reviewCriteria: [{ name: "分析逻辑清晰", weight: 0.35 }, { name: "洞察有价值", weight: 0.35 }, { name: "报告结构专业", weight: 0.3 }], maxScore: 100, weight: 0.7 },
      { id: "ai-micro-02-a2", title: "反思AI在数据分析中的局限性", type: "reflection", description: "完成报告后，反思AI在哪些环节表现好、哪些环节需要人工干预", reviewCriteria: [{ name: "反思有深度", weight: 0.4 }, { name: "能识别AI边界", weight: 0.35 }, { name: "表达清晰", weight: 0.25 }], maxScore: 100, weight: 0.3 },
    ],
    bonusPool: { baseAmount: 50, perMemberStake: 10, sponsorAmount: 0, sponsorName: "" },
    estimatedMinutes: 120,
    squadSize: { min: 3, max: 5 },
    activeLearners: 378,
    activeSquads: 76,
    recruitingSquads: 18,
  },
  {
    id: "ai-micro-03",
    type: "micro",
    title: "AI办公自动化实战",
    subtitle: "1.5小时掌握用AI自动化处理Excel、PPT、邮件等日常办公任务",
    scenario: "你是一家大型国企的行政专员，每天需要处理大量重复性办公任务：整理Excel表格、制作PPT汇报、撰写会议纪要。学习用AI工具将日常工作效率提升5倍。",
    careerContext: "大型国企数字化转型的热门技能",
    difficulty: "entry",
    industry: "manufacturing",
    skills: ["AI办公自动化", "效率提升"],
    jobTarget: "数字化运营专员",
    career: {
      title: "数字化运营专员",
      level: "entry",
      salaryRange: "8k-14k/月",
      companyTypes: ["国家电网", "中石油", "工商银行", "中国移动", "大型制造企业"],
      dailyWork: "使用AI工具优化办公流程、自动化重复任务、培训团队数字技能",
      growthNext: "数字化项目经理 → 数字化部门负责人",
    },
    resources: [
      { id: "ai-micro-03-r1", type: "framework", title: "AI办公自动化场景图谱", readTime: 7, summary: "Excel/PPT/邮件/会议纪要自动化", content: "" },
      { id: "ai-micro-03-r2", type: "method", title: "Excel公式AI生成法", readTime: 6, summary: "用自然语言描述需求，AI生成复杂公式", content: "" },
      { id: "ai-micro-03-r3", type: "template", title: "PPT汇报AI生成模板", readTime: 5, summary: "从大纲到成稿的完整流程", content: "" },
    ],
    assignments: [
      { id: "ai-micro-03-a1", title: "用AI自动化完成3个办公任务", type: "creation", description: "分别用AI完成Excel数据处理、PPT制作、会议纪要整理", reviewCriteria: [{ name: "任务完成质量", weight: 0.4 }, { name: "效率提升明显", weight: 0.35 }, { name: "可推广性强", weight: 0.25 }], maxScore: 100, weight: 0.7 },
      { id: "ai-micro-03-a2", title: "分享你的AI办公自动化心得", type: "reflection", description: "总结哪些任务适合AI自动化、哪些不适合，给出判断标准", reviewCriteria: [{ name: "总结有洞察", weight: 0.4 }, { name: "判断标准清晰", weight: 0.35 }, { name: "表达有条理", weight: 0.25 }], maxScore: 100, weight: 0.3 },
    ],
    bonusPool: { baseAmount: 50, perMemberStake: 10, sponsorAmount: 0, sponsorName: "" },
    estimatedMinutes: 90,
    squadSize: { min: 3, max: 5 },
    activeLearners: 523,
    activeSquads: 105,
    recruitingSquads: 28,
  },

  // ═══════════════════════════════════════════════════════
  // 微技能课 — A-零售（传统技能型小企业）
  // ═══════════════════════════════════════════════════════
  {
    id: "r-micro-01",
    type: "micro",
    title: "小红书种草文案速成",
    subtitle: "2小时掌握AIDA模型，写出品牌愿意买单的种草文案",
    scenario: "贝贝乐是一家新上市的国货母婴品牌，主打天然婴儿洗护系列。品牌定位\"安全到可以吃的婴儿护肤\"，目标用户是25-35岁的新手妈妈。你需要为品牌撰写小红书种草文案。",
    careerContext: "电商内容运营实习生的第一天任务",
    difficulty: "entry",
    industry: "retail",
    skills: ["文案写作", "用户洞察"],
    jobTarget: "电商内容运营实习生",
    career: {
      title: "电商内容运营实习生",
      level: "entry",
      salaryRange: "4k-6k/月",
      companyTypes: ["新消费品牌", "MCN机构", "电商代运营公司"],
      dailyWork: "撰写种草文案、管理品牌账号内容、监控互动数据",
      growthNext: "内容运营专员 → 内容运营主管",
    },
    resources: [
      { id: "r-micro-01-r1", type: "framework", title: "AIDA模型详解：从注意到达成", readTime: 8, summary: "文案创作经典框架，从Attention到Action的完整路径", content: aidaContent },
      { id: "r-micro-01-r2", type: "template", title: "小红书种草文案AIDA模板", readTime: 5, summary: "填空式模板，直接套用即可开始创作", content: templateContent },
      { id: "r-micro-01-r3", type: "checklist", title: "种草文案发布前自检10条", readTime: 3, summary: "10条必检项，确保文案质量", content: checklistContent },
    ],
    assignments: [
      {
        id: "r-micro-01-a1",
        title: "用AIDA框架为贝贝乐撰写1条种草文案",
        type: "creation",
        description: "基于AIDA模型，为贝贝乐天然婴儿洗护撰写1条小红书种草文案，标注你的AIDA四段结构",
        reviewCriteria: [
          { name: "AIDA结构完整", weight: 0.25 },
          { name: "情感共鸣到位", weight: 0.25 },
          { name: "产品卖点自然融入", weight: 0.25 },
          { name: "行动号召有效", weight: 0.25 },
        ],
        maxScore: 100,
        weight: 0.6,
      },
      {
        id: "r-micro-01-a2",
        title: "点评同学的文案并给出改进建议",
        type: "review",
        description: "选择一位同学的种草文案，从AIDA四个维度给出具体点评和改进建议",
        reviewCriteria: [
          { name: "点评专业有依据", weight: 0.35 },
          { name: "改进建议具体可执行", weight: 0.35 },
          { name: "态度建设性", weight: 0.30 },
        ],
        maxScore: 100,
        weight: 0.4,
      },
    ],
    bonusPool: { baseAmount: 50, perMemberStake: 10, sponsorAmount: 30, sponsorName: "贝贝乐品牌赞助" },
    estimatedMinutes: 120,
    squadSize: { min: 3, max: 5 },
    activeLearners: 234,
    activeSquads: 48,
    recruitingSquads: 12,
    syllabus: {
      objective: "掌握AIDA模型并运用它撰写符合品牌调性的小红书种草文案",
      knowledgePoints: ["AIDA四要素", "小红书种草文案结构", "母婴品牌闺蜜感文案调性", "种草文案质量自检"],
      modules: [
        {
          id: "r-micro-01-m1",
          title: "认识AIDA模型",
          objective: "理解AIDA模型四要素，学会用它拆解种草文案",
          items: [
            { type: "learn", title: "📖 AIDA模型详解：从注意到达成", minutes: 8, done: true },
            { type: "learn", title: "📖 小红书种草文案AIDA模板", minutes: 5, done: true },
            { type: "learn", title: "📖 种草文案发布前自检10条", minutes: 3, done: true },
            { type: "practice", title: "✍️ 用AIDA拆解一篇种草文案（热身练习）", minutes: 15, done: true },
          ],
        },
        {
          id: "r-micro-01-m2",
          title: "撰写种草文案",
          objective: "独立创作符合品牌调性的种草文案",
          items: [
            { type: "practice", title: "✍️ 为贝贝乐撰写1条种草文案（核心作业）", minutes: 30 },
          ],
        },
        {
          id: "r-micro-01-m3",
          title: "同伴互评",
          objective: "通过互评深化理解，学会专业点评",
          items: [
            { type: "practice", title: "✍️ 点评同学的文案并给出改进建议", minutes: 15 },
          ],
        },
      ],
      skillGrowth: [
        { skill: "文案写作", from: 20, to: 50 },
        { skill: "用户洞察", from: 15, to: 40 },
      ],
    },
  },
  {
    id: "r-micro-02",
    type: "micro",
    title: "电商详情页卖点提炼",
    subtitle: "2小时掌握FAB法则，把产品参数变成消费者能感知的利益",
    scenario: "光伴科技推出了一款智能护眼台灯，核心功能：自动感光调节、坐姿提醒、番茄钟模式。产品定价399元，目标用户是关注孩子用眼健康的家长。详情页需要将技术参数转化为消费者能感知的利益点。",
    careerContext: "电商产品运营实习生的核心交付",
    difficulty: "entry",
    industry: "retail",
    skills: ["卖点提炼", "FAB法则"],
    jobTarget: "电商产品运营实习生",
    career: {
      title: "电商产品运营实习生",
      level: "entry",
      salaryRange: "4k-6k/月",
      companyTypes: ["智能硬件品牌", "消费电子品牌", "3C电商平台"],
      dailyWork: "撰写详情页卖点文案、优化产品页面、跟踪转化数据",
      growthNext: "产品运营专员 → 产品运营主管",
    },
    resources: [
      { id: "r-micro-02-r1", type: "framework", title: "FAB法则详解：从特征到利益", readTime: 8, summary: "Feature→Advantage→Benefit，让消费者听懂你的卖点", content: fabContent },
      { id: "r-micro-02-r2", type: "method", title: "详情页卖点提炼5步法", readTime: 6, summary: "从产品参数到消费者利益的转化方法", content: "" },
      { id: "r-micro-02-r3", type: "pitfall", title: "详情页文案的5个常见错误", readTime: 5, summary: "自嗨式文案、参数堆砌、卖点无序...", content: "" },
    ],
    assignments: [
      { id: "r-micro-02-a1", title: "用FAB法则拆解一款产品的详情页", type: "analysis", description: "选择任意一款电商产品的详情页，用FAB法则拆解其卖点表达", reviewCriteria: [{ name: "FAB三要素识别准确", weight: 0.4 }, { name: "利益点提炼到位", weight: 0.35 }, { name: "分析结构清晰", weight: 0.25 }], maxScore: 100, weight: 0.3 },
      { id: "r-micro-02-a2", title: "为光伴智能台灯撰写详情页核心卖点文案", type: "creation", description: "基于FAB法则，为光伴智能护眼台灯撰写详情页前3屏的卖点文案", reviewCriteria: [{ name: "FAB结构完整", weight: 0.3 }, { name: "技术参数转译为利益", weight: 0.4 }, { name: "文案有感染力", weight: 0.3 }], maxScore: 100, weight: 0.7 },
    ],
    bonusPool: { baseAmount: 50, perMemberStake: 10, sponsorAmount: 0, sponsorName: "" },
    estimatedMinutes: 120,
    squadSize: { min: 3, max: 5 },
    activeLearners: 156,
    activeSquads: 32,
    recruitingSquads: 8,
    syllabus: {
      objective: "掌握FAB法则，能独立将产品参数转化为消费者可感知的利益点",
      knowledgePoints: ["FAB三层转化", "参数→利益转译技巧", "详情页文案结构", "消费者视角写作"],
      modules: [
        {
          id: "r-micro-02-m1",
          title: "认识FAB法则",
          objective: "理解FAB三层转化逻辑，学会用消费者视角重新表达卖点",
          items: [
            { type: "learn", title: "📖 FAB法则详解：从特征到利益", minutes: 8 },
            { type: "learn", title: "📖 详情页卖点提炼5步法", minutes: 6 },
            { type: "learn", title: "📖 详情页文案的5个常见错误", minutes: 5 },
            { type: "practice", title: "✍️ 用FAB拆解一款产品详情页（热身练习）", minutes: 15 },
          ],
        },
        {
          id: "r-micro-02-m2",
          title: "撰写详情页文案",
          objective: "独立完成FAB转化的详情页文案",
          items: [
            { type: "practice", title: "✍️ 为光伴台灯撰写详情页核心卖点文案（核心作业）", minutes: 35 },
          ],
        },
      ],
      skillGrowth: [
        { skill: "卖点提炼", from: 10, to: 45 },
        { skill: "文案写作", from: 20, to: 50 },
      ],
    },
  },
  {
    id: "r-micro-03",
    type: "micro",
    title: "抖音短视频脚本入门",
    subtitle: "2小时掌握3秒法则，写出完播率过关的30秒脚本",
    scenario: "咔滋脆是一个新锐零食品牌，主打\"办公室解压零食\"定位。品牌需要在抖音上做内容获客，需要写1个情景剧型短视频脚本。",
    careerContext: "短视频内容运营实习生的日常交付",
    difficulty: "entry",
    industry: "retail",
    skills: ["短视频脚本", "节奏把控"],
    jobTarget: "短视频运营实习生",
    career: {
      title: "短视频运营实习生",
      level: "entry",
      salaryRange: "4k-7k/月",
      companyTypes: ["食品品牌", "电商公司", "内容营销机构"],
      dailyWork: "撰写短视频脚本、跟踪完播率数据、优化内容节奏",
      growthNext: "短视频运营专员 → 短视频运营主管",
    },
    resources: [
      { id: "r-micro-03-r1", type: "framework", title: "短视频3秒法则与完播率公式", readTime: 7, summary: "前3秒决定完播率", content: shortVideoContent },
      { id: "r-micro-03-r2", type: "template", title: "30秒情景剧型脚本模板", readTime: 5, summary: "画面+文案+时长的结构模板", content: "" },
      { id: "r-micro-03-r3", type: "pitfall", title: "新手写短视频脚本的6个坑", readTime: 5, summary: "自嗨、太长、没节奏...", content: "" },
    ],
    assignments: [
      { id: "r-micro-03-a1", title: "拆解一个爆款零食短视频的节奏结构", type: "analysis", description: "选择一个零食品牌爆款短视频，拆解其节奏结构", reviewCriteria: [{ name: "节奏拆解准确", weight: 0.4 }, { name: "关键帧识别到位", weight: 0.35 }, { name: "分析有洞察", weight: 0.25 }], maxScore: 100, weight: 0.3 },
      { id: "r-micro-03-a2", title: "为咔滋脆写1个30秒情景剧型脚本", type: "creation", description: "基于3秒法则，为咔滋脆写1个30秒情景剧型脚本", reviewCriteria: [{ name: "开头3秒吸引力", weight: 0.3 }, { name: "节奏紧凑", weight: 0.3 }, { name: "产品植入自然", weight: 0.2 }, { name: "互动引导有效", weight: 0.2 }], maxScore: 100, weight: 0.7 },
    ],
    bonusPool: { baseAmount: 50, perMemberStake: 10, sponsorAmount: 20, sponsorName: "咔滋脆品牌赞助" },
    estimatedMinutes: 120,
    squadSize: { min: 3, max: 5 },
    activeLearners: 198,
    activeSquads: 40,
    recruitingSquads: 10,
  },
  {
    id: "r-micro-04",
    type: "micro",
    title: "私域社群早安文案速写",
    subtitle: "1.5小时掌握3C模型，写出有温度又有转化的社群文案",
    scenario: "花间集是一个中端美妆品牌，建立了2000人的微信私域社群。社群运营者需要每天发送早安文案，既要有温度感又要有转化，还要维持\"闺蜜级\"的品牌人设。",
    careerContext: "私域运营实习生的每日必做",
    difficulty: "entry",
    industry: "retail",
    skills: ["私域文案", "人设打造"],
    jobTarget: "私域运营实习生",
    career: {
      title: "私域运营实习生",
      level: "entry",
      salaryRange: "4k-6k/月",
      companyTypes: ["美妆品牌", "母婴品牌", "新零售企业"],
      dailyWork: "撰写社群早安文案、维护用户关系、跟踪社群活跃度",
      growthNext: "私域运营专员 → 私域运营主管",
    },
    resources: [
      { id: "r-micro-04-r1", type: "framework", title: "私域文案3C模型", readTime: 7, summary: "Connection-Content-Conversion", content: privateDomain3CContent },
      { id: "r-micro-04-r2", type: "template", title: "早安文案7天节奏法", readTime: 5, summary: "周一激励→周五种草→周日活动", content: "" },
      { id: "r-micro-04-r3", type: "case", title: "5个美妆品牌私域文案风格对比", readTime: 8, summary: "不同人设的文案风格差异", content: "" },
    ],
    assignments: [
      { id: "r-micro-04-a1", title: "为花间集设计一周7天早安文案", type: "creation", description: "基于3C模型和7天节奏法，为花间集设计一周早安文案", reviewCriteria: [{ name: "节奏感合理", weight: 0.3 }, { name: "人设一致", weight: 0.35 }, { name: "互动引导自然", weight: 0.35 }], maxScore: 100, weight: 0.6 },
      { id: "r-micro-04-a2", title: "点评同学的文案节奏安排", type: "review", description: "点评同学的7天文案节奏，给出优化建议", reviewCriteria: [{ name: "点评专业有依据", weight: 0.4 }, { name: "建议具体可执行", weight: 0.35 }, { name: "态度建设性", weight: 0.25 }], maxScore: 100, weight: 0.4 },
    ],
    bonusPool: { baseAmount: 50, perMemberStake: 10, sponsorAmount: 0, sponsorName: "" },
    estimatedMinutes: 90,
    squadSize: { min: 3, max: 5 },
    activeLearners: 142,
    activeSquads: 28,
    recruitingSquads: 6,
  },
  {
    id: "r-micro-05",
    type: "micro",
    title: "电商活动文案速写",
    subtitle: "1.5小时掌握紧迫感公式，快速写出不同渠道的活动推广文案",
    scenario: "某家居品牌参加618大促，活动方案已定（满300减50+前100名赠品），需要快速撰写推广文案：朋友圈预热、社群爆发、详情页头图。",
    careerContext: "电商运营实习生的促销季必杀技",
    difficulty: "entry",
    industry: "retail",
    skills: ["活动文案", "紧迫感营造"],
    jobTarget: "电商运营实习生",
    career: {
      title: "电商运营实习生",
      level: "entry",
      salaryRange: "4k-6k/月",
      companyTypes: ["家居品牌", "电商平台", "品牌代运营"],
      dailyWork: "撰写活动文案、策划促销节奏、跟踪活动数据",
      growthNext: "电商运营专员 → 电商运营主管",
    },
    resources: [
      { id: "r-micro-05-r1", type: "framework", title: "活动文案紧迫感公式", readTime: 6, summary: "限时x限量x专属", content: "" },
      { id: "r-micro-05-r2", type: "method", title: "大促文案3阶段法", readTime: 5, summary: "预热→爆发→返场", content: "" },
      { id: "r-micro-05-r3", type: "template", title: "618/双11文案模板库", readTime: 5, summary: "各渠道文案模板", content: "" },
    ],
    assignments: [
      { id: "r-micro-05-a1", title: "为618大促撰写3条不同渠道的活动文案", type: "creation", description: "撰写朋友圈预热+社群爆发+详情页头图3条文案", reviewCriteria: [{ name: "紧迫感营造到位", weight: 0.35 }, { name: "渠道适配合理", weight: 0.35 }, { name: "利益点传达清晰", weight: 0.3 }], maxScore: 100, weight: 0.7 },
      { id: "r-micro-05-a2", title: "反思文案中紧迫感营造的效果", type: "reflection", description: "写完3条文案后，反思你的紧迫感营造手法是否有效", reviewCriteria: [{ name: "反思有深度", weight: 0.4 }, { name: "能识别自己的不足", weight: 0.35 }, { name: "表达清晰", weight: 0.25 }], maxScore: 100, weight: 0.3 },
    ],
    bonusPool: { baseAmount: 50, perMemberStake: 10, sponsorAmount: 0, sponsorName: "" },
    estimatedMinutes: 90,
    squadSize: { min: 3, max: 5 },
    activeLearners: 178,
    activeSquads: 36,
    recruitingSquads: 9,
  },

  // ═══════════════════════════════════════════════════════
  // 微技能课 — A-文旅
  // ═══════════════════════════════════════════════════════
  {
    id: "t-micro-01",
    type: "micro",
    title: "小红书旅行种草笔记速写",
    subtitle: "2小时掌握5感写作法，写出让人想出发的旅行笔记",
    scenario: "锦溪古镇是一个鲜为人知的江南水乡，距离上海2小时车程。古镇保留了原住民的生活状态，没有过度商业化。需要撰写小红书种草笔记吸引城市年轻人周末出游。",
    careerContext: "文旅内容运营实习生的入门交付",
    difficulty: "entry",
    industry: "tourism",
    skills: ["旅行叙事", "体验式写作"],
    jobTarget: "文旅内容运营实习生",
    career: {
      title: "文旅内容运营实习生",
      level: "entry",
      salaryRange: "4k-6k/月",
      companyTypes: ["文旅局", "OTA平台", "旅游MCN"],
      dailyWork: "撰写旅行种草笔记、运营目的地账号、跟踪内容数据",
      growthNext: "文旅内容专员 → 目的地营销主管",
    },
    resources: [
      { id: "t-micro-01-r1", type: "framework", title: "旅行叙事的5感写作法", readTime: 8, summary: "视觉+听觉+嗅觉+味觉+触觉", content: travel5SenseContent },
      { id: "t-micro-01-r2", type: "template", title: "小红书旅行种草笔记模板", readTime: 5, summary: "标题+路线+体验+攻略结构", content: "" },
      { id: "t-micro-01-r3", type: "checklist", title: "旅行笔记发布前自检清单", readTime: 3, summary: "实用信息+情感共鸣双检", content: "" },
    ],
    assignments: [
      { id: "t-micro-01-a1", title: "用5感写作法为锦溪古镇撰写种草笔记", type: "creation", description: "用5感写作法，为锦溪古镇撰写一篇小红书种草笔记", reviewCriteria: [{ name: "5感描写丰富", weight: 0.3 }, { name: "场景感强", weight: 0.3 }, { name: "实用信息充分", weight: 0.2 }, { name: "互动引导有效", weight: 0.2 }], maxScore: 100, weight: 0.7 },
      { id: "t-micro-01-a2", title: "点评同学的旅行笔记", type: "review", description: "点评同学的旅行笔记，重点评价5感运用和场景营造", reviewCriteria: [{ name: "5感运用评价专业", weight: 0.4 }, { name: "建议具体可执行", weight: 0.35 }, { name: "态度建设性", weight: 0.25 }], maxScore: 100, weight: 0.3 },
    ],
    bonusPool: { baseAmount: 50, perMemberStake: 10, sponsorAmount: 20, sponsorName: "锦溪古镇文旅局赞助" },
    estimatedMinutes: 120,
    squadSize: { min: 3, max: 5 },
    activeLearners: 98,
    activeSquads: 20,
    recruitingSquads: 5,
  },
  {
    id: "t-micro-02",
    type: "micro",
    title: "民宿体验文速写",
    subtitle: "1.5小时掌握体验式写作框架，写出让人想预订的民宿笔记",
    scenario: "莫干山一家新开的精品民宿\"云端小院\"，主打\"山谷里的慢生活\"。需要撰写小红书体验文吸引城市白领周末入住。",
    careerContext: "文旅内容运营实习生的常见交付",
    difficulty: "entry",
    industry: "tourism",
    skills: ["体验式写作", "场景营造"],
    jobTarget: "文旅内容运营实习生",
    career: {
      title: "文旅内容运营实习生",
      level: "entry",
      salaryRange: "4k-6k/月",
      companyTypes: ["精品民宿", "文旅集团", "酒店品牌"],
      dailyWork: "撰写民宿体验文、运营小红书账号、维护用户评价",
      growthNext: "文旅内容专员 → 目的地营销主管",
    },
    resources: [
      { id: "t-micro-02-r1", type: "framework", title: "民宿体验文的STAR结构", readTime: 7, summary: "场景-触发-行动-收获", content: "" },
      { id: "t-micro-02-r2", type: "template", title: "民宿体验文模板", readTime: 5, summary: "到达-入住-体验-推荐", content: "" },
    ],
    assignments: [
      { id: "t-micro-02-a1", title: "为云端小院撰写1篇民宿体验文", type: "creation", description: "用STAR结构，为云端小院撰写一篇小红书民宿体验文", reviewCriteria: [{ name: "场景营造到位", weight: 0.35 }, { name: "体验细节丰富", weight: 0.35 }, { name: "推荐引导自然", weight: 0.3 }], maxScore: 100, weight: 0.7 },
      { id: "t-micro-02-a2", title: "点评同学的民宿体验文", type: "review", description: "点评同学的民宿体验文，重点评价场景营造和推荐引导", reviewCriteria: [{ name: "点评专业", weight: 0.4 }, { name: "建议具体", weight: 0.35 }, { name: "态度建设性", weight: 0.25 }], maxScore: 100, weight: 0.3 },
    ],
    bonusPool: { baseAmount: 50, perMemberStake: 10, sponsorAmount: 0, sponsorName: "" },
    estimatedMinutes: 90,
    squadSize: { min: 3, max: 5 },
    activeLearners: 76,
    activeSquads: 15,
    recruitingSquads: 4,
  },

  // ═══════════════════════════════════════════════════════
  // 微技能课 — A-制造
  // ═══════════════════════════════════════════════════════
  {
    id: "m-micro-01",
    type: "micro",
    title: "1688产品详情页文案速写",
    subtitle: "2小时掌握B2B版FAB法则，把技术参数变成采购决策者看得懂的利益",
    scenario: "恒力工具是一家中小五金工具厂，产品品质不错但详情页文案粗糙，主要是技术参数堆砌。需要用FAB法则重写详情页，将专业参数转化为B2B采购者能感知的利益点。",
    careerContext: "B2B内容运营实习生的核心交付",
    difficulty: "entry",
    industry: "manufacturing",
    skills: ["产品文案", "FAB法则"],
    jobTarget: "B2B内容运营实习生",
    career: {
      title: "B2B内容运营实习生",
      level: "entry",
      salaryRange: "4k-7k/月",
      companyTypes: ["五金工具厂", "工业品电商", "外贸企业"],
      dailyWork: "撰写1688详情页文案、优化产品页面、管理产品信息",
      growthNext: "B2B内容专员 → B2B市场部主管",
    },
    resources: [
      { id: "m-micro-01-r1", type: "framework", title: "FAB法则B2B版：采购决策者视角", readTime: 8, summary: "B2B场景下Feature-Advantage-Benefit的适配", content: b2bFabContent },
      { id: "m-micro-01-r2", type: "method", title: "1688详情页文案规范与优化指南", readTime: 6, summary: "平台规则+文案结构+关键词策略", content: "" },
      { id: "m-micro-01-r3", type: "pitfall", title: "B2B详情页文案的4个致命错误", readTime: 5, summary: "参数堆砌、无场景、无对比...", content: "" },
    ],
    assignments: [
      { id: "m-micro-01-a1", title: "用FAB法则拆解一个B2B产品详情页", type: "analysis", description: "选择1688上一个产品的详情页，用FAB拆解其卖点表达", reviewCriteria: [{ name: "FAB识别准确", weight: 0.4 }, { name: "采购者视角分析到位", weight: 0.35 }, { name: "结构清晰", weight: 0.25 }], maxScore: 100, weight: 0.3 },
      { id: "m-micro-01-a2", title: "为恒力工具重写详情页核心卖点文案", type: "creation", description: "基于FAB法则，为恒力的扳手产品重写详情页前3屏文案", reviewCriteria: [{ name: "参数转译为利益", weight: 0.35 }, { name: "采购者视角", weight: 0.35 }, { name: "文案简洁有力", weight: 0.3 }], maxScore: 100, weight: 0.7 },
    ],
    bonusPool: { baseAmount: 50, perMemberStake: 10, sponsorAmount: 0, sponsorName: "" },
    estimatedMinutes: 120,
    squadSize: { min: 3, max: 5 },
    activeLearners: 64,
    activeSquads: 13,
    recruitingSquads: 3,
  },

  // ═══════════════════════════════════════════════════════
  // 技能体系课 — B-互联网大厂（AI应用方向）
  // ═══════════════════════════════════════════════════════
  {
    id: "ai-sys-01",
    type: "system",
    title: "AI应用专家全栈能力",
    subtitle: "10小时系统掌握AI工具选型、工作流设计、团队培训，能够推动企业AI化转型",
    scenario: "你是一家互联网公司的AI应用负责人。团队有5个业务线需要使用AI提升效率，你需要：评估AI工具、设计工作流、制定使用规范、培训团队、衡量ROI。",
    careerContext: "互联网大厂AI应用专家 / 数字化项目经理",
    difficulty: "standard",
    industry: "retail",
    skills: ["AI工具选型", "工作流设计", "团队培训", "ROI评估"],
    canManageMicroIds: ["ai-micro-01", "ai-micro-02", "ai-micro-03"],
    careerGrowth: {
      title: "AI应用专家",
      level: "mid",
      salaryRange: "18k-30k/月",
      companyTypes: ["阿里巴巴", "腾讯", "字节跳动", "华为", "国有银行总行"],
      dailyWork: "评估引入AI工具、设计业务工作流、制定AI使用规范、培训团队、衡量ROI",
      growthNext: "AI产品经理 → 数字化部门负责人",
    },
    resources: [
      { id: "ai-sys-01-r1", type: "framework", title: "企业AI工具评估框架", readTime: 12, summary: "从需求到选型到落地的完整流程", content: "" },
      { id: "ai-sys-01-r2", type: "method", title: "AI工作流设计方法论", readTime: 10, summary: "识别自动化机会→设计流程→测试迭代", content: "" },
      { id: "ai-sys-01-r3", type: "method", title: "团队AI技能培训体系搭建", readTime: 8, summary: "从入门到进阶的培训路径设计", content: "" },
      { id: "ai-sys-01-r4", type: "framework", title: "AI应用ROI评估模型", readTime: 10, summary: "时间节省、质量提升、成本降低的量化方法", content: "" },
      { id: "ai-sys-01-r5", type: "case", title: "3家企业AI化转型案例复盘", readTime: 12, summary: "成功因素、踩坑经验、关键决策点", content: "" },
    ],
    assignments: [
      {
        id: "ai-sys-01-a1",
        title: "为一家企业设计AI应用落地方案",
        type: "creation",
        description: "选择一家企业（互联网/国企/制造），设计AI应用落地方案，包含工具选型、工作流设计、培训计划、ROI预估",
        reviewCriteria: [
          { name: "方案系统完整", weight: 0.3 },
          { name: "工具选型合理", weight: 0.25 },
          { name: "可执行性强", weight: 0.25 },
          { name: "ROI可衡量", weight: 0.2 },
        ],
        maxScore: 100,
        weight: 0.4,
      },
      {
        id: "ai-sys-01-a2",
        title: "设计一套团队AI技能培训大纲",
        type: "creation",
        description: "为10人团队设计一套4周的AI技能培训大纲，包含课程内容、练习、考核方式",
        reviewCriteria: [
          { name: "培训体系完整", weight: 0.3 },
          { name: "难度递进合理", weight: 0.3 },
          { name: "实操性强", weight: 0.25 },
          { name: "考核方式科学", weight: 0.15 },
        ],
        maxScore: 100,
        weight: 0.35,
      },
      {
        id: "ai-sys-01-a3",
        title: "审核同学的AI应用方案并给出反馈",
        type: "review",
        description: "审核同学的AI应用落地方案，从可行性、ROI、风险三个维度给出专业反馈",
        reviewCriteria: [
          { name: "审核维度全面", weight: 0.3 },
          { name: "反馈具体可执行", weight: 0.3 },
          { name: "体现专业深度", weight: 0.2 },
          { name: "态度建设性", weight: 0.2 },
        ],
        maxScore: 100,
        weight: 0.25,
      },
    ],
    bonusPool: { baseAmount: 100, perMemberStake: 20, sponsorAmount: 100, sponsorName: "互联网企业联合赞助" },
    estimatedMinutes: 600,
    squadSize: { min: 3, max: 6 },
    activeLearners: 234,
    activeSquads: 42,
    recruitingSquads: 12,
    syllabus: {
      objective: "系统掌握AI应用全栈能力，能够独立推动企业AI化转型",
      knowledgePoints: ["AI工具评估框架", "工作流设计方法", "团队培训体系", "ROI评估模型", "变革管理"],
      modules: [
        {
          id: "ai-sys-01-m1",
          title: "模块一：AI工具评估与选型",
          objective: "掌握企业级AI工具评估方法，能够根据业务需求选型",
          items: [
            { type: "learn", title: "📖 企业AI工具评估框架", minutes: 12 },
            { type: "learn", title: "📖 3家企业AI化转型案例复盘", minutes: 12 },
            { type: "practice", title: "✍️ 评估3款AI工具并输出对比报告", minutes: 40 },
          ],
        },
        {
          id: "ai-sys-01-m2",
          title: "模块二：AI工作流设计",
          objective: "学会识别自动化机会，设计高效的AI工作流",
          items: [
            { type: "learn", title: "📖 AI工作流设计方法论", minutes: 10 },
            { type: "practice", title: "✍️ 为一家企业设计AI应用落地方案", minutes: 60 },
          ],
        },
        {
          id: "ai-sys-01-m3",
          title: "模块三：团队培训与推广",
          objective: "掌握团队AI技能培训方法，推动组织变革",
          items: [
            { type: "learn", title: "📖 团队AI技能培训体系搭建", minutes: 8 },
            { type: "practice", title: "✍️ 设计一套团队AI技能培训大纲", minutes: 50 },
          ],
        },
        {
          id: "ai-sys-01-m4",
          title: "模块四：ROI评估与迭代",
          objective: "学会量化AI应用效果，持续优化工作流",
          items: [
            { type: "learn", title: "📖 AI应用ROI评估模型", minutes: 10 },
            { type: "practice", title: "✍️ 审核同学的AI应用方案并给出反馈", minutes: 40 },
          ],
        },
      ],
      skillGrowth: [
        { skill: "AI工具选型", from: 10, to: 70 },
        { skill: "工作流设计", from: 5, to: 65 },
        { skill: "团队培训", from: 5, to: 60 },
        { skill: "ROI评估", from: 10, to: 55 },
      ],
    },
  },

  // ═══════════════════════════════════════════════════════
  // 技能体系课 — A-零售（传统技能型小企业）
  // ═══════════════════════════════════════════════════════
  {
    id: "r-sys-01",
    type: "system",
    title: "小红书内容运营全栈能力",
    subtitle: "10小时系统掌握小红书流量规律、内容制作方法论，能够管理实习生的交付质量",
    scenario: "你是一家MCN机构的小红书运营主管。团队里有3个实习生负责日常种草文案撰写，你需要理解平台流量机制、建立内容标准、审核实习生交付物、提供专业指导。",
    careerContext: "小红书运营主管 / 内容经理的核心能力",
    difficulty: "standard",
    industry: "retail",
    skills: ["平台流量机制", "内容质量标准", "团队审核能力", "内容策略制定"],
    canManageMicroIds: ["r-micro-01", "r-micro-02", "r-micro-03", "r-micro-04", "r-micro-05"],
    careerGrowth: {
      title: "小红书运营主管",
      level: "mid",
      salaryRange: "12k-20k/月",
      companyTypes: ["MCN机构", "新消费品牌", "电商公司"],
      dailyWork: "管理3-5人内容团队、制定内容策略、审核交付物、优化内容ROI",
      growthNext: "内容总监 → 品牌营销总监",
    },
    resources: [
      { id: "r-sys-01-r1", type: "framework", title: "小红书流量分发机制与算法逻辑", readTime: 12, summary: "CES评分、流量池递进、长尾效应", content: "" },
      { id: "r-sys-01-r2", type: "method", title: "内容质量评估框架：从数据指标到内容要素", readTime: 10, summary: "建立可量化的内容质量标准", content: "" },
      { id: "r-sys-01-r3", type: "framework", title: "小红书账号人设体系搭建方法", readTime: 8, summary: "从定位到内容矩阵的人设系统", content: "" },
      { id: "r-sys-01-r4", type: "method", title: "实习生交付物审核清单与反馈模板", readTime: 6, summary: "标准化审核流程和反馈话术", content: "" },
      { id: "r-sys-01-r5", type: "case", title: "3个品牌从0到10万粉的内容策略复盘", readTime: 12, summary: "完整策略路径和关键决策点", content: "" },
      { id: "r-sys-01-r6", type: "method", title: "A/B测试设计与数据分析方法论", readTime: 10, summary: "用数据驱动内容优化", content: "" },
    ],
    assignments: [
      {
        id: "r-sys-01-a1",
        title: "制定一份小红书账号内容标准手册",
        type: "creation",
        description: "为你的MCN团队制定一份小红书内容标准手册，包括：文案质量评分标准、审核流程、常见问题清单",
        reviewCriteria: [
          { name: "标准可量化可执行", weight: 0.3 },
          { name: "覆盖完整内容类型", weight: 0.25 },
          { name: "审核流程清晰", weight: 0.25 },
          { name: "实用性强", weight: 0.2 },
        ],
        maxScore: 100,
        weight: 0.35,
      },
      {
        id: "r-sys-01-a2",
        title: "审核3份实习生的种草文案并给出专业反馈",
        type: "review",
        description: "审核3份实习生的种草文案交付物，从平台规则、人设一致性、转化效果三个维度给出专业反馈",
        reviewCriteria: [
          { name: "审核维度全面", weight: 0.3 },
          { name: "反馈具体可执行", weight: 0.3 },
          { name: "体现平台理解深度", weight: 0.2 },
          { name: "反馈态度专业建设性", weight: 0.2 },
        ],
        maxScore: 100,
        weight: 0.35,
      },
      {
        id: "r-sys-01-a3",
        title: "设计一个种草文案A/B测试方案",
        type: "creation",
        description: "为品牌种草文案设计一个A/B测试方案，包含假设、变量、指标、预期结果",
        reviewCriteria: [
          { name: "假设清晰", weight: 0.25 },
          { name: "变量控制合理", weight: 0.3 },
          { name: "指标选取科学", weight: 0.25 },
          { name: "方案可执行", weight: 0.2 },
        ],
        maxScore: 100,
        weight: 0.3,
      },
    ],
    bonusPool: { baseAmount: 100, perMemberStake: 20, sponsorAmount: 100, sponsorName: "MCN机构联合赞助" },
    estimatedMinutes: 600,
    squadSize: { min: 3, max: 6 },
    activeLearners: 87,
    activeSquads: 15,
    recruitingSquads: 4,
    syllabus: {
      objective: "系统掌握小红书内容运营全栈能力，能够独立管理实习生团队的内容交付质量",
      knowledgePoints: ["小红书流量分发机制", "内容质量评估框架", "账号人设体系", "A/B测试方法论", "实习生管理与审核"],
      modules: [
        {
          id: "r-sys-01-m1",
          title: "模块一：理解平台流量机制",
          objective: "掌握小红书流量分发逻辑，理解内容如何获得推荐",
          items: [
            { type: "learn", title: "📖 小红书流量分发机制与算法逻辑", minutes: 12 },
            { type: "learn", title: "📖 3个品牌从0到10万粉的内容策略复盘", minutes: 12 },
            { type: "practice", title: "✍️ 分析一个品牌账号的流量增长路径", minutes: 30 },
          ],
        },
        {
          id: "r-sys-01-m2",
          title: "模块二：建立内容质量标准",
          objective: "学会建立可量化的内容质量评估体系",
          items: [
            { type: "learn", title: "📖 内容质量评估框架：从数据指标到内容要素", minutes: 10 },
            { type: "learn", title: "📖 实习生交付物审核清单与反馈模板", minutes: 6 },
            { type: "practice", title: "✍️ 制定一份小红书内容标准手册", minutes: 60 },
          ],
        },
        {
          id: "r-sys-01-m3",
          title: "模块三：审核与指导实习生的交付",
          objective: "学会专业审核实习生内容，提供建设性反馈",
          items: [
            { type: "practice", title: "✍️ 审核3份实习生种草文案并给出专业反馈", minutes: 45 },
          ],
        },
        {
          id: "r-sys-01-m4",
          title: "模块四：数据驱动的内容优化",
          objective: "掌握A/B测试方法，用数据指导内容迭代",
          items: [
            { type: "learn", title: "📖 A/B测试设计与数据分析方法论", minutes: 10 },
            { type: "learn", title: "📖 小红书账号人设体系搭建方法", minutes: 8 },
            { type: "practice", title: "✍️ 设计一个种草文案A/B测试方案", minutes: 40 },
          ],
        },
      ],
      skillGrowth: [
        { skill: "平台流量机制", from: 10, to: 70 },
        { skill: "内容质量标准", from: 5, to: 65 },
        { skill: "团队审核能力", from: 5, to: 60 },
        { skill: "内容策略制定", from: 10, to: 55 },
      ],
    },
  },

  // ═══════════════════════════════════════════════════════
  // 技能体系课 — A-文旅
  // ═══════════════════════════════════════════════════════
  {
    id: "t-sys-01",
    type: "system",
    title: "文旅内容运营全栈能力",
    subtitle: "10小时系统掌握目的地内容营销方法，能够管理实习生并策划完整内容方案",
    scenario: "你是一家文旅公司的内容运营主管。团队有2个实习生负责日常旅行笔记撰写，你需要理解OTA平台规则、建立目的地内容标准、策划季节性内容方案、审核实习生交付物。",
    careerContext: "文旅内容运营主管 / 目的地营销经理",
    difficulty: "standard",
    industry: "tourism",
    skills: ["目的地营销体系", "内容质量标准", "季节性策划", "KOL合作管理"],
    canManageMicroIds: ["t-micro-01", "t-micro-02"],
    careerGrowth: {
      title: "目的地营销主管",
      level: "mid",
      salaryRange: "10k-18k/月",
      companyTypes: ["文旅局", "旅游集团", "目的地营销公司"],
      dailyWork: "管理内容团队、策划季节性营销方案、审核内容质量、对接KOL合作",
      growthNext: "文旅营销总监 → 目的地品牌总监",
    },
    resources: [
      { id: "t-sys-01-r1", type: "framework", title: "目的地内容营销体系：从种草到转化", readTime: 12, summary: "完整的文旅内容营销框架", content: "" },
      { id: "t-sys-01-r2", type: "method", title: "文旅内容季节性策划方法", readTime: 8, summary: "春夏秋冬内容节奏", content: "" },
      { id: "t-sys-01-r3", type: "method", title: "KOL合作内容方案设计", readTime: 10, summary: "从选人到到brief到验收", content: "" },
      { id: "t-sys-01-r4", type: "framework", title: "旅行内容质量评估框架", readTime: 8, summary: "可量化的旅行内容标准", content: "" },
    ],
    assignments: [
      {
        id: "t-sys-01-a1",
        title: "为锦溪古镇策划一份夏季内容营销方案",
        type: "creation",
        description: "策划一份3个月的夏季内容营销方案，包含内容节奏、KOL合作计划、实习生任务分配",
        reviewCriteria: [
          { name: "方案系统完整", weight: 0.3 },
          { name: "季节性特色鲜明", weight: 0.25 },
          { name: "可执行性强", weight: 0.25 },
          { name: "预算分配合理", weight: 0.2 },
        ],
        maxScore: 100,
        weight: 0.4,
      },
      {
        id: "t-sys-01-a2",
        title: "审核2份实习生的旅行笔记并给出专业反馈",
        type: "review",
        description: "审核2份实习生的旅行种草笔记，从5感运用、实用信息、平台适配三个维度给出反馈",
        reviewCriteria: [
          { name: "审核维度全面", weight: 0.3 },
          { name: "反馈具体可执行", weight: 0.3 },
          { name: "体现专业深度", weight: 0.2 },
          { name: "反馈态度建设性", weight: 0.2 },
        ],
        maxScore: 100,
        weight: 0.3,
      },
      {
        id: "t-sys-01-a3",
        title: "撰写一份KOL合作brief",
        type: "creation",
        description: "为一个旅游目的地撰写一份KOL合作brief，包含人设要求、内容要求、交付标准",
        reviewCriteria: [
          { name: "brief要素完整", weight: 0.3 },
          { name: "要求清晰可执行", weight: 0.3 },
          { name: "交付标准明确", weight: 0.2 },
          { name: "专业度", weight: 0.2 },
        ],
        maxScore: 100,
        weight: 0.3,
      },
    ],
    bonusPool: { baseAmount: 100, perMemberStake: 20, sponsorAmount: 50, sponsorName: "文旅局联合赞助" },
    estimatedMinutes: 600,
    squadSize: { min: 3, max: 6 },
    activeLearners: 45,
    activeSquads: 8,
    recruitingSquads: 2,
  },

  // ═══════════════════════════════════════════════════════
  // 技能体系课 — A-制造
  // ═══════════════════════════════════════════════════════
  {
    id: "m-sys-01",
    type: "system",
    title: "B2B内容营销全栈能力",
    subtitle: "10小时系统掌握B2B内容体系搭建方法，能够管理实习生并建设年度内容体系",
    scenario: "你是一家工业企业的市场部主管。团队有2个实习生负责产品详情页和客户案例撰写，你需要建立B2B内容标准、搭建年度内容体系、审核实习生交付物、策划客户案例。",
    careerContext: "B2B市场部主管 / 内容营销经理",
    difficulty: "standard",
    industry: "manufacturing",
    skills: ["B2B内容体系", "客户案例策划", "年度内容规划", "实习生审核管理"],
    canManageMicroIds: ["m-micro-01"],
    careerGrowth: {
      title: "B2B市场部主管",
      level: "mid",
      salaryRange: "12k-22k/月",
      companyTypes: ["制造业企业", "工业品集团", "B2B营销机构"],
      dailyWork: "搭建年度内容体系、管理内容团队、策划客户案例、制定内容标准",
      growthNext: "市场总监 → 商业化负责人",
    },
    resources: [
      { id: "m-sys-01-r1", type: "framework", title: "B2B内容营销体系：从线索到成单", readTime: 12, summary: "完整的B2B内容营销框架", content: "" },
      { id: "m-sys-01-r2", type: "method", title: "客户案例包装方法论", readTime: 10, summary: "从访谈到成稿的完整方法", content: "" },
      { id: "m-sys-01-r3", type: "framework", title: "B2B年度内容日历与预算规划", readTime: 8, summary: "按季度规划内容节奏", content: "" },
      { id: "m-sys-01-r4", type: "method", title: "B2B内容质量审核清单", readTime: 6, summary: "技术准确性+采购者视角双检", content: "" },
    ],
    assignments: [
      {
        id: "m-sys-01-a1",
        title: "为恒力工具策划一份年度B2B内容方案",
        type: "creation",
        description: "策划一份12个月的B2B内容方案，包含内容类型、发布节奏、实习生任务、效果指标",
        reviewCriteria: [
          { name: "方案系统完整", weight: 0.3 },
          { name: "B2B特性鲜明", weight: 0.25 },
          { name: "可执行性强", weight: 0.25 },
          { name: "ROI可衡量", weight: 0.2 },
        ],
        maxScore: 100,
        weight: 0.4,
      },
      {
        id: "m-sys-01-a2",
        title: "审核2份实习生的B2B产品文案并给出专业反馈",
        type: "review",
        description: "审核2份实习生的1688产品文案，从FAB转化、采购者视角、技术准确性三个维度给出反馈",
        reviewCriteria: [
          { name: "审核维度全面", weight: 0.3 },
          { name: "反馈具体可执行", weight: 0.3 },
          { name: "技术准确", weight: 0.2 },
          { name: "态度建设性", weight: 0.2 },
        ],
        maxScore: 100,
        weight: 0.3 },
      {
        id: "m-sys-01-a3",
        title: "撰写一份客户案例包装方案",
        type: "creation",
        description: "为一个B2B客户撰写一份案例包装方案，包含访谈提纲、故事线、呈现形式",
        reviewCriteria: [
          { name: "方案要素完整", weight: 0.3 },
          { name: "故事线有吸引力", weight: 0.25 },
          { name: "数据支撑充分", weight: 0.25 },
          { name: "专业度", weight: 0.2 },
        ],
        maxScore: 100,
        weight: 0.3,
      },
    ],
    bonusPool: { baseAmount: 100, perMemberStake: 20, sponsorAmount: 0, sponsorName: "" },
    estimatedMinutes: 600,
    squadSize: { min: 3, max: 6 },
    activeLearners: 32,
    activeSquads: 6,
    recruitingSquads: 2,
  },
];
