export interface Squad {
  id: string;
  name: string;
  taskId: string;
  taskTitle: string;
  taskType: "micro" | "system";
  members: { userId: string; name: string; avatar: string; role: "learner" | "coach"; score?: number }[];
  status: "recruiting" | "learning" | "reviewing" | "completed";
  pool: {
    total: number;
    platform: number;
    stakes: number;
    sponsor: number;
    sponsorName: string;
    coachBonus: number;
    distribution?: { userId: string; name: string; amount: number; score: number }[];
  };
}

export const squads: Squad[] = [
  {
    id: "sq-1",
    name: "种草文案速成班",
    taskId: "r-micro-01",
    taskTitle: "小红书种草文案速成",
    taskType: "micro",
    members: [
      { userId: "user-lin", name: "小林", avatar: "林", role: "learner", score: 73.2 },
      { userId: "user-jie", name: "阿杰", avatar: "杰", role: "learner", score: 68.5 },
      { userId: "user-qi", name: "思琪", avatar: "琪", role: "learner", score: 82.2 },
      { userId: "user-ming", name: "阿明", avatar: "明", role: "learner", score: 75.0 },
      { userId: "coach-lin", name: "林雪", avatar: "L", role: "coach" },
    ],
    status: "reviewing",
    pool: {
      total: 120,
      platform: 50,
      stakes: 30,
      sponsor: 30,
      sponsorName: "贝贝乐品牌赞助",
      coachBonus: 10,
    },
  },
  {
    id: "sq-2",
    name: "FAB转化攻坚组",
    taskId: "r-micro-02",
    taskTitle: "电商详情页卖点提炼",
    taskType: "micro",
    members: [
      { userId: "user-yue", name: "小月", avatar: "月", role: "learner", score: 85.5 },
      { userId: "user-wei", name: "大伟", avatar: "伟", role: "learner", score: 78.0 },
      { userId: "coach-lin", name: "林雪", avatar: "L", role: "coach" },
    ],
    status: "reviewing",
    pool: { total: 70, platform: 50, stakes: 20, sponsor: 0, sponsorName: "", coachBonus: 0 },
  },
  {
    id: "sq-3",
    name: "旅行写手联盟",
    taskId: "t-micro-01",
    taskTitle: "小红书旅行种草笔记速写",
    taskType: "micro",
    members: [
      { userId: "user-lu", name: "小鹿", avatar: "鹿", role: "learner" },
      { userId: "user-zhang", name: "老张", avatar: "张", role: "learner" },
      { userId: "coach-chen", name: "陈野", avatar: "C", role: "coach" },
    ],
    status: "learning",
    pool: { total: 80, platform: 50, stakes: 20, sponsor: 0, sponsorName: "", coachBonus: 10 },
  },
  {
    id: "sq-4",
    name: "古镇探路者",
    taskId: "t-micro-01",
    taskTitle: "小红书旅行种草笔记速写",
    taskType: "micro",
    members: [
      { userId: "user-han", name: "小韩", avatar: "韩", role: "learner", score: 88.0 },
      { userId: "user-lu", name: "小鹿", avatar: "鹿", role: "learner", score: 72.0 },
      { userId: "coach-chen", name: "陈野", avatar: "C", role: "coach" },
    ],
    status: "completed",
    pool: {
      total: 80,
      platform: 50,
      stakes: 20,
      sponsor: 0,
      sponsorName: "",
      coachBonus: 10,
      distribution: [
        { userId: "user-han", name: "小韩", amount: 42, score: 88.0 },
        { userId: "user-lu", name: "小鹿", amount: 38, score: 72.0 },
      ],
    },
  },
  {
    id: "sq-5",
    name: "1688实战组",
    taskId: "m-micro-01",
    taskTitle: "1688产品详情页文案速写",
    taskType: "micro",
    members: [
      { userId: "user-cheng", name: "小程", avatar: "程", role: "learner" },
      { userId: "user-liu", name: "大刘", avatar: "刘", role: "learner" },
      { userId: "coach-zhao", name: "赵工", avatar: "Z", role: "coach" },
    ],
    status: "learning",
    pool: { total: 80, platform: 50, stakes: 20, sponsor: 0, sponsorName: "", coachBonus: 10 },
  },
  {
    id: "sq-6",
    name: "小红书运营主管训练营",
    taskId: "r-sys-01",
    taskTitle: "小红书内容运营全栈能力",
    taskType: "system",
    members: [
      { userId: "user-qi", name: "思琪", avatar: "琪", role: "learner" },
      { userId: "user-yue", name: "小月", avatar: "月", role: "learner" },
      { userId: "user-ming", name: "阿明", avatar: "明", role: "learner" },
      { userId: "user-fang", name: "小方", avatar: "方", role: "learner" },
      { userId: "coach-lin", name: "林雪", avatar: "L", role: "coach" },
    ],
    status: "learning",
    pool: { total: 240, platform: 100, stakes: 40, sponsor: 100, sponsorName: "MCN机构联合赞助", coachBonus: 20 },
  },
  {
    id: "sq-7",
    name: "文旅营销主管进阶组",
    taskId: "t-sys-01",
    taskTitle: "文旅内容运营全栈能力",
    taskType: "system",
    members: [
      { userId: "user-zhang", name: "老张", avatar: "张", role: "learner" },
      { userId: "user-han", name: "小韩", avatar: "韩", role: "learner" },
      { userId: "coach-chen", name: "陈野", avatar: "C", role: "coach" },
    ],
    status: "recruiting",
    pool: { total: 170, platform: 100, stakes: 20, sponsor: 50, sponsorName: "文旅局联合赞助", coachBonus: 10 },
  },
  {
    id: "sq-8",
    name: "短视频脚本小组",
    taskId: "r-micro-03",
    taskTitle: "抖音短视频脚本入门",
    taskType: "micro",
    members: [
      { userId: "user-lin", name: "小林", avatar: "林", role: "learner" },
      { userId: "user-jie", name: "阿杰", avatar: "杰", role: "learner" },
      { userId: "user-wei", name: "大伟", avatar: "伟", role: "learner" },
      { userId: "coach-lin", name: "林雪", avatar: "L", role: "coach" },
    ],
    status: "recruiting",
    pool: { total: 90, platform: 50, stakes: 20, sponsor: 20, sponsorName: "咔滋脆品牌赞助", coachBonus: 5 },
  },
];
