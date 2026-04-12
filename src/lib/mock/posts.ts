export interface Post {
  id: string;
  type: "guidance" | "question" | "practice" | "reflection" | "review" | "showcase";
  authorId: string;
  authorName: string;
  authorAvatar: string;
  authorRole: "learner" | "coach";
  taskId: string;
  squadId: string;
  title: string;
  content: string;
  commentCount: number;
  likeCount: number;
  createdAt: string;
  pinned?: boolean;
}

export const posts: Post[] = [
  // Squad 1 posts (种草文案速成班 — 微技能课)
  {
    id: "p1", type: "guidance", authorId: "coach-lin", authorName: "林雪", authorAvatar: "L", authorRole: "coach",
    taskId: "r-micro-01", squadId: "sq-1",
    title: "种草文案的核心：不是夸产品，而是让读者看见自己",
    content: "写种草文案之前，先想清楚三个问题：\n\n1. 你的读者是谁？（新手妈妈？成分党？性价比控？）\n2. 她的痛点是什么？（宝宝皮肤敏感？不知道怎么选？怕踩坑？）\n3. 你要她做什么？（点赞收藏？评论区互动？点击购买？）\n\n很多人一上来就开始写，结果写出来的文案像产品说明书。先想清楚这三个问题，再动笔，效果完全不一样。\n\n记住：种草文案 = 闺蜜分享，不是广告推销。",
    commentCount: 8, likeCount: 15, createdAt: "2天前", pinned: true,
  },
  {
    id: "p2", type: "question", authorId: "user-lin", authorName: "小林", authorAvatar: "林", authorRole: "learner",
    taskId: "r-micro-01", squadId: "sq-1",
    title: "AIDA的Desire和Interest有什么区别？",
    content: "我看了AIDA模型，但Interest和Desire感觉很像啊。比如我说\"这款面霜含有神经酰胺\"，这算让用户感兴趣还是让用户渴望？有没有什么简单的方法区分？",
    commentCount: 5, likeCount: 8, createdAt: "1天前",
  },
  {
    id: "p3", type: "practice", authorId: "user-qi", authorName: "思琪", authorAvatar: "琪", authorRole: "learner",
    taskId: "r-micro-01", squadId: "sq-1",
    title: "我的AIDA拆解练习——拆解某母婴品牌爆款笔记",
    content: "选了小红书上一个10万赞的种草笔记做AIDA拆解：\n\n**Attention**：标题\"宝宝第3个月，我终于不用焦虑了\"——时间锚点+情绪共鸣\n\n**Interest**：\"试过4种都不行\"——制造深度共鸣\n\n**Desire**：\"那天闺蜜塞给我...\"——场景感极强，像朋友推荐\n\n**Action**：\"评论区抽3位送同款\"——互动率爆表\n\n发现一个细节：它的Interest到Desire过渡用的是\"闺蜜推荐\"叙事，比直接说产品好太多！",
    commentCount: 3, likeCount: 12, createdAt: "1天前",
  },
  {
    id: "p4", type: "reflection", authorId: "user-jie", authorName: "阿杰", authorAvatar: "杰", authorRole: "learner",
    taskId: "r-micro-01", squadId: "sq-1",
    title: "2小时学完AIDA，我的感受",
    content: "做了3年行政，觉得内容运营更有意思。今天2小时学完AIDA框架，感觉以前写的都是\"产品说明书\"，没有考虑读者的感受。\n\n最大的收获是Desire环节——以前总想着怎么夸产品好，现在知道要写场景，让读者\"感受到\"而不是\"被告知\"。\n\n学完直接就能上手写文案了，比我想象的快得多！",
    commentCount: 4, likeCount: 6, createdAt: "20小时前",
  },
  // Squad 6 posts (小红书运营主管训练营 — 体系课)
  {
    id: "p5", type: "guidance", authorId: "coach-lin", authorName: "林雪", authorAvatar: "L", authorRole: "coach",
    taskId: "r-sys-01", squadId: "sq-6",
    title: "从写手到主管：关键转变是学会\"看标准\"",
    content: "你们都已经是能写好文案的人了。但这门课要训练的不是写作能力，而是\"审核能力\"。\n\n写手思维：我写得好不好？\n主管思维：这个文案达不达标？差在哪里？怎么改？\n\n两者的区别在于：写手靠感觉，主管靠标准。\n\n接下来的学习中，每看一份文案，先用你的标准给它打分，再想想你会怎么给实习生反馈。",
    commentCount: 6, likeCount: 20, createdAt: "3天前", pinned: true,
  },
  {
    id: "p6", type: "practice", authorId: "user-yue", authorName: "小月", authorAvatar: "月", authorRole: "learner",
    taskId: "r-sys-01", squadId: "sq-6",
    title: "我制定的小红书内容审核标准（初稿）",
    content: "试拟了一份审核标准，分三个维度：\n\n1. **平台合规**（30%）：是否违反小红书社区规范？是否有医疗违禁词？\n2. **品牌一致性**（30%）：人设是否符合品牌调性？卖点是否准确？\n3. **转化效果**（40%）：AIDA结构完整度？互动引导有效性？\n\n每个维度1-5分，总分12分以上为合格。\n\n请各位帮我看看，这个标准有什么问题？",
    commentCount: 8, likeCount: 15, createdAt: "2天前",
  },
  // Squad 3 posts (旅行写手联盟 — 微技能课)
  {
    id: "p7", type: "guidance", authorId: "coach-chen", authorName: "陈野", authorAvatar: "C", authorRole: "coach",
    taskId: "t-micro-01", squadId: "sq-3",
    title: "旅行笔记的秘密：不是写你去哪，而是写你感受到了什么",
    content: "很多人写旅行笔记就是\"去了哪+拍了什么+吃了什么\"，这跟旅游攻略有什么区别？\n\n好的旅行笔记，核心是\"感受\"。读者不是要看你的行程，是要感受\"我也想去\"。\n\n用5感写作法：你看到的晨雾、听到的桨声、闻到的桂花香、尝到的酒酿、摸到的石板路——这些才是让读者心动的元素。\n\n2小时内掌握5感写作法，写出一篇让人想出发的笔记，没那么难！",
    commentCount: 5, likeCount: 18, createdAt: "3天前", pinned: true,
  },
  {
    id: "p8", type: "question", authorId: "user-lu", authorName: "小鹿", authorAvatar: "鹿", authorRole: "learner",
    taskId: "t-micro-01", squadId: "sq-3",
    title: "5感写作法中哪个感官最容易打动读者？",
    content: "我试着用5感写锦溪古镇，但感觉视觉描写太多了。有没有什么建议？",
    commentCount: 3, likeCount: 5, createdAt: "2天前",
  },
];
