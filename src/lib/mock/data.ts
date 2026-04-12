export interface LearningPath {
  id: string;
  title: string;
  goal: string;
  industry: "retail" | "tourism" | "manufacturing";
  taskIds: string[];
  taskTitles: string[];
  estimatedWeeks: number;
  skillGrowth: { skill: string; from: number; to: number }[];
}

export const paths: LearningPath[] = [
  {
    id: "path-ai",
    title: "AI应用运营专员",
    goal: "从Prompt入门到AI应用专家，进入互联网大厂或大型国企数字化部门",
    industry: "retail",
    taskIds: ["ai-micro-01", "ai-micro-02", "ai-micro-03", "ai-sys-01"],
    taskTitles: [
      "AI提示词工程速成",
      "AI数据分析助手实战",
      "AI办公自动化实战",
      "AI应用专家全栈能力",
    ],
    estimatedWeeks: 8,
    skillGrowth: [
      { skill: "提示词工程", from: 10, to: 70 },
      { skill: "AI数据分析", from: 5, to: 65 },
      { skill: "AI工具选型", from: 5, to: 60 },
      { skill: "工作流设计", from: 10, to: 55 },
    ],
  },
  {
    id: "path-1",
    title: "小红书内容运营专员",
    goal: "从0掌握种草文案→全栈运营，先做实习生再做主管",
    industry: "retail",
    taskIds: ["r-micro-01", "r-micro-02", "r-micro-03", "r-micro-04", "r-micro-05", "r-sys-01"],
    taskTitles: [
      "小红书种草文案速成",
      "电商详情页卖点提炼",
      "抖音短视频脚本入门",
      "私域社群早安文案速写",
      "电商活动文案速写",
      "小红书内容运营全栈能力",
    ],
    estimatedWeeks: 8,
    skillGrowth: [
      { skill: "文案写作", from: 20, to: 70 },
      { skill: "内容策略", from: 10, to: 55 },
      { skill: "团队审核", from: 5, to: 60 },
      { skill: "用户洞察", from: 15, to: 65 },
    ],
  },
  {
    id: "path-2",
    title: "文旅内容运营专员",
    goal: "从旅行笔记入门到目的地营销主管",
    industry: "tourism",
    taskIds: ["t-micro-01", "t-micro-02", "t-sys-01"],
    taskTitles: [
      "小红书旅行种草笔记速写",
      "民宿体验文速写",
      "文旅内容运营全栈能力",
    ],
    estimatedWeeks: 6,
    skillGrowth: [
      { skill: "旅行叙事", from: 15, to: 70 },
      { skill: "目的地营销", from: 5, to: 55 },
      { skill: "活动策划", from: 5, to: 50 },
    ],
  },
  {
    id: "path-3",
    title: "B2B内容运营专员",
    goal: "从产品文案入门到B2B内容体系搭建",
    industry: "manufacturing",
    taskIds: ["m-micro-01", "m-sys-01"],
    taskTitles: [
      "1688产品详情页文案速写",
      "B2B内容营销全栈能力",
    ],
    estimatedWeeks: 5,
    skillGrowth: [
      { skill: "产品文案", from: 20, to: 70 },
      { skill: "B2B内容体系", from: 5, to: 55 },
      { skill: "客户案例策划", from: 5, to: 50 },
    ],
  },
];

export const discoverData = {
  insights: [
    { id: "d1", title: "互联网大厂AI应用岗位需求暴涨300%", industry: "retail", readTime: 4 },
    { id: "d2", title: "大型国企数字化转型：AI技能成必备要求", industry: "manufacturing", readTime: 5 },
    { id: "d3", title: "小红书运营实习生岗位需求：会写种草文案就能上岗", industry: "retail", readTime: 4 },
    { id: "d4", title: "抖音电商内容运营岗位需求墜涨200%", industry: "retail", readTime: 4 },
    { id: "d5", title: "B2B企业为什么开始招内容运营实习生？", industry: "manufacturing", readTime: 5 },
    { id: "d6", title: "微技能课：2小时学会一项技能，直接上岗实习", industry: "retail", readTime: 3 },
  ],
  hotSkills: [
    { name: "AI提示词工程", heat: 5, growth: "+300%" },
    { name: "AI数据分析", heat: 5, growth: "+250%" },
    { name: "种草文案", heat: 4, growth: "+200%" },
    { name: "AI办公自动化", heat: 4, growth: "+180%" },
    { name: "短视频脚本", heat: 4, growth: "+120%" },
    { name: "FAB卖点提炼", heat: 3, growth: "+80%" },
  ],
  agentInsights: [
    "先学微技能课，掌握具体技能后就能找到实习岗位",
    "AI提示词技能需求同比增长300%，互联网大厂和国企都在招",
    "完成微技能课后再学体系课，可以晋升为运营主管或AI应用专家",
  ],
};

export const industries = {
  retail: {
    id: "retail",
    name: "A-零售",
    fullName: "电商内容运营 + AI应用运营",
    color: "#2DD4A8",
    bgColor: "#ECFDF5",
    description: "两条路径：①种草文案/短视频（小企业）②AI提示词/数据分析（大厂/国企）",
    gdp: "47万亿",
    entities: "数千万",
    jobsAvailable: "25-60万人",
  },
  tourism: {
    id: "tourism",
    name: "A-文旅",
    fullName: "目的地内容营销",
    color: "#3B82F6",
    bgColor: "#EFF6FF",
    description: "旅行笔记、民宿体验、目的地营销——2门微技能课+1门体系课",
    gdp: "8万亿",
    entities: "百万级",
    jobsAvailable: "20-40万人",
  },
  manufacturing: {
    id: "manufacturing",
    name: "A-制造",
    fullName: "B2B产品内容营销",
    color: "#8B5CF6",
    bgColor: "#F5F3FF",
    description: "产品详情页、客户案例、内容体系——1门微技能课+1门体系课",
    gdp: "33万亿",
    entities: "500万+",
    jobsAvailable: "15-30万人",
  },
};

// ====== THREE-TIER CERTIFICATION SYSTEM ======

export type CertTier = "course" | "opc" | "miit";
export type CertLevel = "entry" | "mid" | "senior";

export interface CertificationDef {
  id: string;
  name: string;
  tier: CertTier;
  industry: "retail" | "tourism" | "manufacturing";
  level: CertLevel;
  description: string;
  assessmentType: "auto" | "portfolio" | "exam";
  price: number;
  validityPeriod: string;
  issuer: string;
  issuerShort: string;
  certNoPrefix: string;
  relatedPositions: { title: string; salaryRange: string; link?: string }[];
  prepCourseIds?: string[]; // recommended courses to prepare
  skills: string[];
}

export const certifications: CertificationDef[] = [
  // === TIER 1: Course Certifications (free, auto-issued on course completion) ===
  {
    id: "cert-course-retail-entry",
    name: "零售智能体内容运营（初级）",
    tier: "course",
    industry: "retail",
    level: "entry",
    description: "完成微技能课学习，掌握种草文案等核心技能",
    assessmentType: "auto",
    price: 0,
    validityPeriod: "永久",
    issuer: "OPC Learn",
    issuerShort: "OPC",
    certNoPrefix: "OPC-RE",
    relatedPositions: [
      { title: "电商内容运营实习生", salaryRange: "4k-6k/月", link: "https://www.zhaopin.com" },
      { title: "小红书运营助理", salaryRange: "4k-7k/月", link: "https://www.liepin.com" },
    ],
    prepCourseIds: ["r-micro-01", "r-micro-02"],
    skills: ["种草文案", "FAB卖点提炼"],
  },
  {
    id: "cert-course-tourism-entry",
    name: "文旅智能体内容运营（初级）",
    tier: "course",
    industry: "tourism",
    level: "entry",
    description: "完成旅行笔记微技能课，掌握体验式写作技能",
    assessmentType: "auto",
    price: 0,
    validityPeriod: "永久",
    issuer: "OPC Learn",
    issuerShort: "OPC",
    certNoPrefix: "OPC-TO",
    relatedPositions: [
      { title: "文旅内容运营实习生", salaryRange: "4k-6k/月", link: "https://www.zhaopin.com" },
    ],
    prepCourseIds: ["t-micro-01"],
    skills: ["旅行叙事", "体验式写作"],
  },
  {
    id: "cert-course-mfg-entry",
    name: "制造智能体内容运营（初级）",
    tier: "course",
    industry: "manufacturing",
    level: "entry",
    description: "完成产品详情页微技能课，掌握B2B文案技能",
    assessmentType: "auto",
    price: 0,
    validityPeriod: "永久",
    issuer: "OPC Learn",
    issuerShort: "OPC",
    certNoPrefix: "OPC-MF",
    relatedPositions: [
      { title: "B2B内容运营实习生", salaryRange: "4k-7k/月", link: "https://www.zhaopin.com" },
    ],
    prepCourseIds: ["m-micro-01"],
    skills: ["产品文案", "B2B内容策划"],
  },
  // === TIER 2: OPC Certification (paid, portfolio + coach review) ===
  {
    id: "cert-opc-retail-mid",
    name: "行业智能体应用工程师（中级）- 零售方向",
    tier: "opc",
    industry: "retail",
    level: "mid",
    description: "独立完成零售行业内容运营全流程，能指导初级工程师",
    assessmentType: "portfolio",
    price: 680,
    validityPeriod: "3年",
    issuer: "OPC Learn 认证中心",
    issuerShort: "OPC认证",
    certNoPrefix: "OPC-PRO-RE",
    relatedPositions: [
      { title: "小红书运营主管", salaryRange: "12k-20k/月", link: "https://www.zhaopin.com" },
      { title: "内容运营经理", salaryRange: "15k-25k/月", link: "https://www.liepin.com" },
      { title: "MCN内容总监", salaryRange: "18k-30k/月", link: "https://www.zhaopin.com" },
    ],
    prepCourseIds: ["r-sys-01"],
    skills: ["内容策略", "团队审核", "数据分析", "用户洞察"],
  },
  {
    id: "cert-opc-tourism-mid",
    name: "行业智能体应用工程师（中级）- 文旅方向",
    tier: "opc",
    industry: "tourism",
    level: "mid",
    description: "独立完成文旅行业内容运营全流程，能策划目的地营销方案",
    assessmentType: "portfolio",
    price: 680,
    validityPeriod: "3年",
    issuer: "OPC Learn 认证中心",
    issuerShort: "OPC认证",
    certNoPrefix: "OPC-PRO-TO",
    relatedPositions: [
      { title: "目的地营销主管", salaryRange: "10k-18k/月", link: "https://www.zhaopin.com" },
      { title: "文旅内容经理", salaryRange: "12k-22k/月", link: "https://www.zhaopin.com" },
    ],
    prepCourseIds: ["t-sys-01"],
    skills: ["目的地营销", "活动策划", "KOL合作", "内容审核"],
  },
  {
    id: "cert-opc-mfg-mid",
    name: "行业智能体应用工程师（中级）- 制造方向",
    tier: "opc",
    industry: "manufacturing",
    level: "mid",
    description: "独立完成B2B内容体系搭建，能指导初级工程师",
    assessmentType: "portfolio",
    price: 680,
    validityPeriod: "3年",
    issuer: "OPC Learn 认证中心",
    issuerShort: "OPC认证",
    certNoPrefix: "OPC-PRO-MF",
    relatedPositions: [
      { title: "B2B内容营销经理", salaryRange: "12k-20k/月", link: "https://www.zhaopin.com" },
      { title: "工业品牌内容总监", salaryRange: "15k-25k/月", link: "https://www.liepin.com" },
    ],
    prepCourseIds: ["m-sys-01"],
    skills: ["B2B内容体系", "客户案例策划", "数字营销", "内容审核"],
  },
  // === TIER 3: MIIT National Certification (paid, exam) ===
  {
    id: "cert-miit-retail-entry",
    name: "行业智能体应用工程师（初级）",
    tier: "miit",
    industry: "retail",
    level: "entry",
    description: "国家职业资格认证，人社部技能人才评价全国联网可查",
    assessmentType: "exam",
    price: 600,
    validityPeriod: "永久",
    issuer: "工业和信息化部教育与考试中心",
    issuerShort: "工信部",
    certNoPrefix: "MIIT-AIAE",
    relatedPositions: [
      { title: "电商内容运营专员", salaryRange: "6k-10k/月", link: "https://www.zhaopin.com" },
      { title: "AI应用运营专员", salaryRange: "8k-12k/月", link: "https://www.zhaopin.com" },
    ],
    prepCourseIds: ["r-micro-01", "r-micro-02", "r-micro-03"],
    skills: ["智能体应用", "零售场景运营", "AIGC内容创作", "合规安全"],
  },
  {
    id: "cert-miit-tourism-entry",
    name: "行业智能体应用工程师（初级）",
    tier: "miit",
    industry: "tourism",
    level: "entry",
    description: "国家职业资格认证，人社部技能人才评价全国联网可查",
    assessmentType: "exam",
    price: 600,
    validityPeriod: "永久",
    issuer: "工业和信息化部教育与考试中心",
    issuerShort: "工信部",
    certNoPrefix: "MIIT-AIAE",
    relatedPositions: [
      { title: "文旅智能体运营专员", salaryRange: "6k-10k/月", link: "https://www.zhaopin.com" },
    ],
    prepCourseIds: ["t-micro-01", "t-micro-02"],
    skills: ["智能体应用", "文旅场景运营", "体验式内容创作", "合规安全"],
  },
  {
    id: "cert-miit-mfg-entry",
    name: "行业智能体应用工程师（初级）",
    tier: "miit",
    industry: "manufacturing",
    level: "entry",
    description: "国家职业资格认证，人社部技能人才评价全国联网可查",
    assessmentType: "exam",
    price: 600,
    validityPeriod: "永久",
    issuer: "工业和信息化部教育与考试中心",
    issuerShort: "工信部",
    certNoPrefix: "MIIT-AIAE",
    relatedPositions: [
      { title: "B2B智能体运营专员", salaryRange: "6k-10k/月", link: "https://www.zhaopin.com" },
    ],
    prepCourseIds: ["m-micro-01"],
    skills: ["智能体应用", "制造场景运营", "B2B内容创作", "合规安全"],
  },
];

// User's earned certifications (demo data)
export interface EarnedCertification {
  certDefId: string;
  earnedAt: string;
  score: number;
  certNo: string;
  status: "earned" | "in_progress" | "available";
}

export const userCertifications: EarnedCertification[] = [
  {
    certDefId: "cert-course-retail-entry",
    earnedAt: "2026年3月15日",
    score: 85,
    certNo: "OPC-RE-2026-0085",
    status: "earned",
  },
  {
    certDefId: "cert-opc-retail-mid",
    earnedAt: "",
    score: 0,
    certNo: "",
    status: "in_progress",
  },
];

// ====== EXPERT SUPPLY SIDE ======

export type ExpertRole = "cert_coach" | "course_provider";
export type ExpertStatus = "active" | "pending" | "invited";

export interface ExpertProfile {
  userId: string;
  roles: ExpertRole[];
  status: ExpertStatus;
  certNo: string; // OPC certification number that qualifies them
  industry: "retail" | "tourism" | "manufacturing";
  specialties: string[];
  bio: string;
  stats: {
    reviewsCompleted: number; // for cert_coach
    coursesCreated: number; // for course_provider
    totalStudents: number;
    avgRating: number;
    totalEarnings: number;
  };
  joinedAt: string;
  onboardingType: "invited" | "applied";
}

export const experts: ExpertProfile[] = [
  {
    userId: "coach-wang",
    roles: ["cert_coach", "course_provider"],
    status: "active",
    certNo: "OPC-PRO-AI-2025-0001",
    industry: "retail",
    specialties: ["提示词工程", "AI工作流设计", "企业数字化转型"],
    bio: "前阿里巴巴AI应用专家，10年数字化转型经验。帮助50+企业落地AI工具。",
    stats: { reviewsCompleted: 62, coursesCreated: 3, totalStudents: 485, avgRating: 4.9, totalEarnings: 15680 },
    joinedAt: "2025年8月",
    onboardingType: "invited",
  },
  {
    userId: "coach-lin",
    roles: ["cert_coach", "course_provider"],
    status: "active",
    certNo: "OPC-PRO-RE-2025-0012",
    industry: "retail",
    specialties: ["种草文案", "内容策略", "私域运营"],
    bio: "8年电商运营经验，前某品牌内容总监。擅长种草文案与私域运营。",
    stats: { reviewsCompleted: 47, coursesCreated: 2, totalStudents: 312, avgRating: 4.8, totalEarnings: 8560 },
    joinedAt: "2025年9月",
    onboardingType: "invited",
  },
  {
    userId: "coach-chen",
    roles: ["cert_coach"],
    status: "active",
    certNo: "OPC-PRO-TO-2025-0008",
    industry: "tourism",
    specialties: ["旅行叙事", "目的地营销", "KOL合作"],
    bio: "独立旅行内容策划人，足迹遍布50+目的地。小红书旅行垂类TOP创作者。",
    stats: { reviewsCompleted: 35, coursesCreated: 0, totalStudents: 0, avgRating: 4.9, totalEarnings: 3500 },
    joinedAt: "2025年10月",
    onboardingType: "invited",
  },
  {
    userId: "coach-zhao",
    roles: ["cert_coach", "course_provider"],
    status: "active",
    certNo: "OPC-PRO-MF-2025-0005",
    industry: "manufacturing",
    specialties: ["产品文案", "B2B内容体系", "客户案例策划"],
    bio: "B2B内容营销顾问，10年工业领域经验。帮助200+企业建立内容体系。",
    stats: { reviewsCompleted: 28, coursesCreated: 1, totalStudents: 156, avgRating: 4.7, totalEarnings: 5280 },
    joinedAt: "2025年11月",
    onboardingType: "applied",
  },
];

export interface ExpertCourse {
  id: string;
  providerId: string;
  providerName: string;
  providerAvatar: string;
  providerCertNo: string;
  title: string;
  subtitle: string;
  type: "micro" | "system";
  industry: "retail" | "tourism" | "manufacturing";
  skills: string[];
  estimatedMinutes: number;
  price: number;
  students: number;
  rating: number;
  reviewCount: number;
  reviewStatus: "light" | "full"; // light for micro, full for system
  careerTarget?: string;
  salaryRange?: string;
}

export const expertCourses: ExpertCourse[] = [
  {
    id: "ec-wang-01",
    providerId: "coach-wang",
    providerName: "王工",
    providerAvatar: "W",
    providerCertNo: "OPC-PRO-AI-2025-0001",
    title: "企业AI工具选型指南",
    subtitle: "从需求评估到落地实施，互联网大厂的AI工具选型方法论",
    type: "micro",
    industry: "retail",
    skills: ["AI工具评估", "需求分析", "ROI计算"],
    estimatedMinutes: 120,
    price: 69,
    students: 342,
    rating: 4.9,
    reviewCount: 68,
    reviewStatus: "light",
    careerTarget: "AI应用专员",
    salaryRange: "10k-18k",
  },
  {
    id: "ec-wang-02",
    providerId: "coach-wang",
    providerName: "王工",
    providerAvatar: "W",
    providerCertNo: "OPC-PRO-AI-2025-0001",
    title: "AI工作流设计实战",
    subtitle: "让团队效率提升5倍的AI工作流设计方法",
    type: "system",
    industry: "retail",
    skills: ["工作流设计", "自动化", "团队培训", "变革管理"],
    estimatedMinutes: 600,
    price: 399,
    students: 186,
    rating: 4.8,
    reviewCount: 45,
    reviewStatus: "full",
    careerTarget: "AI应用专家",
    salaryRange: "18k-30k",
  },
  {
    id: "ec-lin-01",
    providerId: "coach-lin",
    providerName: "林雪",
    providerAvatar: "L",
    providerCertNo: "OPC-PRO-RE-2025-0012",
    title: "私域社群运营实战",
    subtitle: "从0搭建高活跃社群，掌握7天转化公式",
    type: "micro",
    industry: "retail",
    skills: ["私域运营", "社群搭建", "转化策略"],
    estimatedMinutes: 120,
    price: 49,
    students: 186,
    rating: 4.8,
    reviewCount: 42,
    reviewStatus: "light",
    careerTarget: "私域运营专员",
    salaryRange: "6k-10k",
  },
  {
    id: "ec-lin-02",
    providerId: "coach-lin",
    providerName: "林雪",
    providerAvatar: "L",
    providerCertNo: "OPC-PRO-RE-2025-0012",
    title: "品牌内容体系搭建全流程",
    subtitle: "从内容规划到团队管理，品牌内容总监的实战方法论",
    type: "system",
    industry: "retail",
    skills: ["内容策略", "团队管理", "数据分析", "品牌建设"],
    estimatedMinutes: 600,
    price: 299,
    students: 126,
    rating: 4.7,
    reviewCount: 31,
    reviewStatus: "full",
    careerTarget: "内容总监",
    salaryRange: "18k-30k",
  },
  {
    id: "ec-zhao-01",
    providerId: "coach-zhao",
    providerName: "赵工",
    providerAvatar: "Z",
    providerCertNo: "OPC-PRO-MF-2025-0005",
    title: "工业品短视频内容策划",
    subtitle: "让B2B产品也能拍出高转化短视频",
    type: "micro",
    industry: "manufacturing",
    skills: ["B2B短视频", "产品展示", "客户案例"],
    estimatedMinutes: 90,
    price: 39,
    students: 156,
    rating: 4.7,
    reviewCount: 28,
    reviewStatus: "light",
    careerTarget: "B2B内容运营",
    salaryRange: "8k-15k",
  },
];
