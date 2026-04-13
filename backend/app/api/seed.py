from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.deps import get_db
from app.models.models import Course, Mission, Circle

router = APIRouter(prefix="/seed", tags=["seed"])


async def seed_courses(db: AsyncSession):
    """Seed initial course data - 18 courses across 3 industries"""
    # Check if courses already exist
    result = await db.execute(select(Course))
    if result.scalars().first():
        return  # Already seeded
    
    courses = [
        # ========================================
        # 零售电商行业 (Retail) - 6 courses
        # ========================================
        
        # 微技能课 (Micro Courses)
        Course(
            id="r-micro-01",
            title="小红书种草文案写作",
            type="micro",
            industry="retail",
            estimated_minutes=90,
            description="掌握小红书平台种草文案的核心写作技巧，从标题到正文，2小时即可上手实习。学习AIDA模型、情感共鸣技巧和爆款公式。",
            career_info={"title": "内容运营实习生", "salaryRange": "4k-6k/月", "demandLevel": "高"},
            active_learners=328,
            recruiting_squads=3,
            learning_objectives=["种草文案结构与公式", "AIDA模型实战应用", "爆款标题创作技巧", "用户心理洞察"],
            content=[
                {"title": "种草文案基础与平台特性", "duration": 20, "type": "lesson"},
                {"title": "AIDA模型拆解与实战", "duration": 30, "type": "practice"},
                {"title": "10个爆款案例深度分析", "duration": 20, "type": "case"},
                {"title": "实战：为指定产品写种草文案", "duration": 20, "type": "exercise"},
            ],
        ),
        Course(
            id="r-micro-02",
            title="电商产品详情页优化",
            type="micro",
            industry="retail",
            estimated_minutes=120,
            description="学习如何优化电商产品详情页，提升转化率。掌握视觉呈现、文案优化和数据驱动的方法论。",
            career_info={"title": "电商运营实习生", "salaryRange": "5k-7k/月", "demandLevel": "高"},
            active_learners=256,
            recruiting_squads=2,
            learning_objectives=["详情页核心要素", "转化心理学应用", "数据驱动优化方法", "A/B测试技巧"],
            content=[
                {"title": "高转化详情页的5个核心要素", "duration": 30, "type": "lesson"},
                {"title": "转化心理学与用户决策路径", "duration": 30, "type": "lesson"},
                {"title": "优秀 vs 平庸案例对比分析", "duration": 30, "type": "case"},
                {"title": "实战：优化一个真实产品详情页", "duration": 30, "type": "exercise"},
            ],
        ),
        Course(
            id="r-micro-03",
            title="抖音直播带货话术设计",
            type="micro",
            industry="retail",
            estimated_minutes=100,
            description="掌握直播带货的核心话术技巧，从开场留人到逼单转化，快速提升直播间成交率。",
            career_info={"title": "直播运营助理", "salaryRange": "5k-8k/月", "demandLevel": "极高"},
            active_learners=412,
            recruiting_squads=5,
            learning_objectives=["直播话术结构", "留人技巧", "逼单转化策略", "互动控场能力"],
            content=[
                {"title": "直播带货话术框架", "duration": 25, "type": "lesson"},
                {"title": "开场3秒留人技巧", "duration": 20, "type": "lesson"},
                {"title": "优秀主播话术拆解", "duration": 25, "type": "case"},
                {"title": "实战：设计你的直播话术脚本", "duration": 30, "type": "exercise"},
            ],
        ),
        
        # 体系课 (System Course)
        Course(
            id="r-system-01",
            title="小红书运营体系课",
            type="system",
            industry="retail",
            estimated_minutes=600,
            description="10小时系统掌握小红书运营全链路，从账号定位、内容策略到商业化变现，培养能独立操盘的小红书运营主管。",
            career_info={"title": "小红书运营主管", "salaryRange": "8k-12k/月", "demandLevel": "高"},
            active_learners=167,
            recruiting_squads=4,
            learning_objectives=["账号定位与人设打造", "内容矩阵搭建方法", "数据分析与优化", "用户增长策略", "商业化变现路径"],
            content=[
                {"title": "小红书平台生态与算法解析", "duration": 60, "type": "lesson"},
                {"title": "账号定位与人设打造", "duration": 60, "type": "lesson"},
                {"title": "内容矩阵搭建与选题策略", "duration": 90, "type": "lesson"},
                {"title": "数据分析与内容优化", "duration": 90, "type": "lesson"},
                {"title": "用户增长与社群运营", "duration": 90, "type": "lesson"},
                {"title": "商业化变现与品牌合作", "duration": 90, "type": "lesson"},
                {"title": "综合实战：从0到1运营一个账号", "duration": 120, "type": "project"},
            ],
        ),
        Course(
            id="r-system-02",
            title="电商运营全链路体系课",
            type="system",
            industry="retail",
            estimated_minutes=720,
            description="12小时掌握电商运营全链路，从选品、上架、推广到客服，培养能独立管理店铺的电商运营人才。",
            career_info={"title": "电商运营专员", "salaryRange": "6k-10k/月", "demandLevel": "高"},
            active_learners=198,
            recruiting_squads=3,
            learning_objectives=["选品策略", "店铺装修与优化", "付费推广技巧", "客服与售后管理", "数据分析能力"],
            content=[
                {"title": "电商平台生态与规则", "duration": 60, "type": "lesson"},
                {"title": "选品策略与供应链基础", "duration": 90, "type": "lesson"},
                {"title": "店铺装修与详情页优化", "duration": 90, "type": "lesson"},
                {"title": "直通车与钻展推广实战", "duration": 120, "type": "lesson"},
                {"title": "客服体系与售后管理", "duration": 90, "type": "lesson"},
                {"title": "数据复盘与优化", "duration": 90, "type": "lesson"},
                {"title": "综合实战：运营一个真实店铺", "duration": 180, "type": "project"},
            ],
        ),
        Course(
            id="r-system-03",
            title="直播带货运营体系课",
            type="system",
            industry="retail",
            estimated_minutes=660,
            description="11小时系统掌握直播带货运营，从人货场搭建到数据分析，培养专业直播运营人才。",
            career_info={"title": "直播运营主管", "salaryRange": "10k-15k/月", "demandLevel": "极高"},
            active_learners=234,
            recruiting_squads=6,
            learning_objectives=["直播间人货场搭建", "主播培训与管理", "流量获取与转化", "数据复盘能力"],
            content=[
                {"title": "直播电商生态与趋势", "duration": 60, "type": "lesson"},
                {"title": "直播间人货场搭建", "duration": 90, "type": "lesson"},
                {"title": "主播话术培训与控场技巧", "duration": 90, "type": "lesson"},
                {"title": "流量获取：付费与自然流", "duration": 90, "type": "lesson"},
                {"title": "直播数据复盘与优化", "duration": 90, "type": "lesson"},
                {"title": "团队管理与SOP制定", "duration": 60, "type": "lesson"},
                {"title": "综合实战：策划并执行一场直播", "duration": 180, "type": "project"},
            ],
        ),
        
        # ========================================
        # 文旅行业 (Tourism) - 6 courses
        # ========================================
        
        # 微技能课
        Course(
            id="t-micro-01",
            title="旅行体验内容创作",
            type="micro",
            industry="tourism",
            estimated_minutes=90,
            description="学习旅行笔记、体验报告的写作技巧，掌握故事化表达和平台运营方法，快速成为文旅内容创作者。",
            career_info={"title": "文旅内容实习生", "salaryRange": "4k-6k/月", "demandLevel": "中"},
            active_learners=189,
            recruiting_squads=2,
            learning_objectives=["体验式写作技巧", "故事化表达方法", "多平台内容适配", "摄影与文案配合"],
            content=[
                {"title": "旅行内容创作基础", "duration": 25, "type": "lesson"},
                {"title": "故事化写作技巧与框架", "duration": 25, "type": "lesson"},
                {"title": "主流平台内容策略对比", "duration": 20, "type": "lesson"},
                {"title": "实战：写一篇爆款旅行笔记", "duration": 20, "type": "exercise"},
            ],
        ),
        Course(
            id="t-micro-02",
            title="酒店民宿点评写作",
            type="micro",
            industry="tourism",
            estimated_minutes=80,
            description="掌握酒店民宿点评的专业写作方法，从入住体验到设施服务，写出有参考价值的优质点评。",
            career_info={"title": "OTA内容运营", "salaryRange": "4k-6k/月", "demandLevel": "中"},
            active_learners=145,
            recruiting_squads=1,
            learning_objectives=["点评结构框架", "客观描述技巧", "图文搭配方法", "用户视角转换"],
            content=[
                {"title": "优质点评的要素", "duration": 20, "type": "lesson"},
                {"title": "如何客观描述体验", "duration": 20, "type": "lesson"},
                {"title": "优秀点评案例分析", "duration": 20, "type": "case"},
                {"title": "实战：撰写一篇酒店点评", "duration": 20, "type": "exercise"},
            ],
        ),
        Course(
            id="t-micro-03",
            title="旅游攻略策划与撰写",
            type="micro",
            industry="tourism",
            estimated_minutes=110,
            description="学习如何策划和撰写实用旅游攻略，从路线规划到预算控制，打造高收藏价值的攻略内容。",
            career_info={"title": "旅游内容策划", "salaryRange": "5k-7k/月", "demandLevel": "中"},
            active_learners=203,
            recruiting_squads=2,
            learning_objectives=["攻略结构规划", "实用信息整理", "预算编制方法", "视觉呈现技巧"],
            content=[
                {"title": "爆款攻略的共同特征", "duration": 25, "type": "lesson"},
                {"title": "路线规划与时间安排", "duration": 30, "type": "lesson"},
                {"title": "优秀攻略案例拆解", "duration": 25, "type": "case"},
                {"title": "实战：策划一份3日游攻略", "duration": 30, "type": "exercise"},
            ],
        ),
        
        # 体系课
        Course(
            id="t-system-01",
            title="文旅新媒体运营体系课",
            type="system",
            industry="tourism",
            estimated_minutes=600,
            description="10小时系统掌握文旅行业新媒体运营，从内容创作到用户增长，培养文旅新媒体运营人才。",
            career_info={"title": "文旅新媒体运营", "salaryRange": "6k-10k/月", "demandLevel": "中"},
            active_learners=134,
            recruiting_squads=3,
            learning_objectives=["文旅内容创作", "目的地营销", "用户社群运营", "跨界合作策划"],
            content=[
                {"title": "文旅行业新媒体生态", "duration": 60, "type": "lesson"},
                {"title": "目的地内容营销策略", "duration": 90, "type": "lesson"},
                {"title": "文旅IP打造与人设运营", "duration": 90, "type": "lesson"},
                {"title": "用户增长与社群运营", "duration": 90, "type": "lesson"},
                {"title": "跨界合作与活动策划", "duration": 90, "type": "lesson"},
                {"title": "综合实战：为一个目的地做推广", "duration": 180, "type": "project"},
            ],
        ),
        Course(
            id="t-system-02",
            title="OTA平台运营体系课",
            type="system",
            industry="tourism",
            estimated_minutes=540,
            description="9小时掌握携程、飞猪等OTA平台运营方法，从产品上架到评价管理，培养专业OTA运营人才。",
            career_info={"title": "OTA运营专员", "salaryRange": "6k-9k/月", "demandLevel": "中"},
            active_learners=112,
            recruiting_squads=2,
            learning_objectives=["OTA平台规则", "产品优化技巧", "评价管理方法", "数据运营能力"],
            content=[
                {"title": "主流OTA平台生态对比", "duration": 60, "type": "lesson"},
                {"title": "产品上架与优化", "duration": 90, "type": "lesson"},
                {"title": "评价管理与口碑营销", "duration": 90, "type": "lesson"},
                {"title": "数据分析与转化优化", "duration": 90, "type": "lesson"},
                {"title": "综合实战：优化一个旅游产品", "duration": 210, "type": "project"},
            ],
        ),
        Course(
            id="t-system-03",
            title="旅游目的地营销体系课",
            type="system",
            industry="tourism",
            estimated_minutes=660,
            description="11小时系统学习旅游目的地营销，从品牌定位到整合营销，培养文旅营销策划人才。",
            career_info={"title": "文旅营销策划", "salaryRange": "8k-12k/月", "demandLevel": "中"},
            active_learners=98,
            recruiting_squads=2,
            learning_objectives=["目的地品牌定位", "整合营销策略", "KOL合作管理", "效果评估方法"],
            content=[
                {"title": "旅游目的地营销趋势", "duration": 60, "type": "lesson"},
                {"title": "品牌定位与差异化", "duration": 90, "type": "lesson"},
                {"title": "内容营销与社交媒体", "duration": 90, "type": "lesson"},
                {"title": "KOL合作与 influencer 营销", "duration": 90, "type": "lesson"},
                {"title": "线下活动与事件营销", "duration": 90, "type": "lesson"},
                {"title": "效果评估与ROI分析", "duration": 60, "type": "lesson"},
                {"title": "综合实战：制定目的地营销方案", "duration": 180, "type": "project"},
            ],
        ),
        
        # ========================================
        # 制造业 (Manufacturing) - 6 courses
        # ========================================
        
        # 微技能课
        Course(
            id="m-micro-01",
            title="B2B产品文案写作",
            type="micro",
            industry="manufacturing",
            estimated_minutes=100,
            description="学习B2B产品说明、技术文档的专业写作，掌握将复杂技术转化为易懂文案的能力。",
            career_info={"title": "B2B内容运营", "salaryRange": "5k-7k/月", "demandLevel": "中"},
            active_learners=145,
            recruiting_squads=1,
            learning_objectives=["B2B文案特点", "技术文档规范", "复杂信息简化", "专业术语运用"],
            content=[
                {"title": "B2B文案与B2C的区别", "duration": 25, "type": "lesson"},
                {"title": "技术文档写作规范", "duration": 30, "type": "lesson"},
                {"title": "优秀B2B文案案例分析", "duration": 25, "type": "case"},
                {"title": "实战：写一份产品说明", "duration": 20, "type": "exercise"},
            ],
        ),
        Course(
            id="m-micro-02",
            title="工业品短视频脚本策划",
            type="micro",
            industry="manufacturing",
            estimated_minutes=90,
            description="学习工业品短视频的脚本策划方法，用生动方式展示产品特点和生产工艺。",
            career_info={"title": "工业品内容策划", "salaryRange": "5k-8k/月", "demandLevel": "中"},
            active_learners=167,
            recruiting_squads=2,
            learning_objectives=["工业品视频特点", "脚本结构框架", "可视化表达", "B2B传播策略"],
            content=[
                {"title": "工业品短视频趋势", "duration": 20, "type": "lesson"},
                {"title": "脚本结构与创作流程", "duration": 30, "type": "lesson"},
                {"title": "优秀案例拆解", "duration": 20, "type": "case"},
                {"title": "实战：策划一个产品展示视频", "duration": 20, "type": "exercise"},
            ],
        ),
        Course(
            id="m-micro-03",
            title="企业公众号运营基础",
            type="micro",
            industry="manufacturing",
            estimated_minutes=80,
            description="掌握制造企业公众号运营基础，从内容规划到粉丝增长，建立企业品牌影响力。",
            career_info={"title": "企业新媒体运营", "salaryRange": "5k-7k/月", "demandLevel": "中"},
            active_learners=178,
            recruiting_squads=2,
            learning_objectives=["公众号定位", "内容规划方法", "排版设计技巧", "粉丝增长策略"],
            content=[
                {"title": "企业公众号定位与规划", "duration": 20, "type": "lesson"},
                {"title": "内容选题与策划", "duration": 20, "type": "lesson"},
                {"title": "优秀企业号案例", "duration": 20, "type": "case"},
                {"title": "实战：规划一周内容", "duration": 20, "type": "exercise"},
            ],
        ),
        
        # 体系课
        Course(
            id="m-system-01",
            title="工业品数字营销体系课",
            type="system",
            industry="manufacturing",
            estimated_minutes=600,
            description="10小时系统掌握工业品数字营销，从内容策略到获客转化，培养工业品营销专业人才。",
            career_info={"title": "工业品营销专员", "salaryRange": "7k-11k/月", "demandLevel": "中"},
            active_learners=89,
            recruiting_squads=2,
            learning_objectives=["工业品营销特点", "内容营销策略", "SEO与SEM", "获客与转化"],
            content=[
                {"title": "工业品数字营销趋势", "duration": 60, "type": "lesson"},
                {"title": "内容营销策略与规划", "duration": 90, "type": "lesson"},
                {"title": "搜索引擎优化与营销", "duration": 90, "type": "lesson"},
                {"title": "社交媒体与行业平台", "duration": 90, "type": "lesson"},
                {"title": "线索获取与转化", "duration": 90, "type": "lesson"},
                {"title": "综合实战：制定数字营销方案", "duration": 180, "type": "project"},
            ],
        ),
        Course(
            id="m-system-02",
            title="制造业品牌传播体系课",
            type="system",
            industry="manufacturing",
            estimated_minutes=540,
            description="9小时掌握制造业品牌传播方法，从品牌定位到公关传播，培养品牌传播专业人才。",
            career_info={"title": "品牌传播专员", "salaryRange": "7k-10k/月", "demandLevel": "中"},
            active_learners=76,
            recruiting_squads=1,
            learning_objectives=["品牌定位方法", "公关传播策略", "媒体关系管理", "危机公关处理"],
            content=[
                {"title": "制造业品牌建设", "duration": 60, "type": "lesson"},
                {"title": "品牌定位与价值主张", "duration": 90, "type": "lesson"},
                {"title": "公关传播与媒体关系", "duration": 90, "type": "lesson"},
                {"title": "危机公关与舆情管理", "duration": 90, "type": "lesson"},
                {"title": "综合实战：品牌传播方案", "duration": 210, "type": "project"},
            ],
        ),
        Course(
            id="m-system-03",
            title="B2B电商运营体系课",
            type="system",
            industry="manufacturing",
            estimated_minutes=660,
            description="11小时系统掌握B2B电商平台运营，从1688到阿里国际站，培养B2B电商运营人才。",
            career_info={"title": "B2B电商运营", "salaryRange": "8k-12k/月", "demandLevel": "高"},
            active_learners=123,
            recruiting_squads=3,
            learning_objectives=["B2B平台运营", "产品优化技巧", "询盘转化方法", "客户关系管理"],
            content=[
                {"title": "B2B电商生态与趋势", "duration": 60, "type": "lesson"},
                {"title": "1688平台运营实战", "duration": 120, "type": "lesson"},
                {"title": "阿里国际站运营", "duration": 120, "type": "lesson"},
                {"title": "产品优化与搜索排名", "duration": 90, "type": "lesson"},
                {"title": "询盘转化与客户管理", "duration": 90, "type": "lesson"},
                {"title": "综合实战：运营一个B2B店铺", "duration": 180, "type": "project"},
            ],
        ),
    ]
    
    for course in courses:
        db.add(course)
    
    await db.commit()


async def seed_missions(db: AsyncSession):
    """Seed initial mission data - 12 missions"""
    result = await db.execute(select(Mission))
    if result.scalars().first():
        return
    
    missions = [
        # Retail missions
        Mission(
            title="为母婴品牌写3条小红书种草文案",
            description="某新母婴品牌需要3条种草文案，目标用户是25-35岁新手妈妈，产品是婴儿辅食机",
            type="micro",
            industry="retail",
            difficulty="entry",
            required_skills=["文案写作", "小红书运营"],
            success_criteria=["符合AIDA模型", "突出产品卖点", "引发情感共鸣"],
            estimated_duration_minutes=30,
        ),
        Mission(
            title="电商双11活动策划方案",
            description="为某化妆品品牌设计双11营销活动方案，预算10万，目标GMV 100万",
            type="case",
            industry="retail",
            difficulty="standard",
            required_skills=["活动策划", "数据分析", "文案写作"],
            success_criteria=["目标明确", "可执行性强", "ROI合理"],
            estimated_duration_minutes=120,
        ),
        Mission(
            title="抖音直播间话术脚本设计",
            description="为某服装品牌设计2小时直播的话术脚本，包括开场、产品介绍、逼单等环节",
            type="micro",
            industry="retail",
            difficulty="entry",
            required_skills=["直播运营", "话术设计"],
            success_criteria=["结构完整", "留人技巧", "转化逻辑清晰"],
            estimated_duration_minutes=45,
        ),
        
        # Tourism missions
        Mission(
            title="旅行目的地内容营销方案",
            description="为某旅游城市制定3个月内容营销策略，目标是提升年轻游客占比",
            type="case",
            industry="tourism",
            difficulty="standard",
            required_skills=["内容策略", "社交媒体", "数据分析"],
            success_criteria=["策略完整", "创意突出", "可量化"],
            estimated_duration_minutes=150,
        ),
        Mission(
            title="撰写一篇爆款旅行攻略",
            description="为某热门旅游城市撰写一篇3000字的详细攻略，要求高收藏价值",
            type="micro",
            industry="tourism",
            difficulty="entry",
            required_skills=["攻略写作", "信息整理"],
            success_criteria=["信息准确", "结构清晰", "实用性强"],
            estimated_duration_minutes=60,
        ),
        Mission(
            title="酒店民宿点评优化方案",
            description="分析某连锁酒店的差评，提出服务改进建议和回复策略",
            type="case",
            industry="tourism",
            difficulty="standard",
            required_skills=["问题分析", "客户服务", "文案写作"],
            success_criteria=["问题定位准确", "建议可执行", "回复话术专业"],
            estimated_duration_minutes=90,
        ),
        
        # Manufacturing missions
        Mission(
            title="B2B产品说明书撰写",
            description="为某工业设备撰写产品说明书，要求专业准确且易于理解",
            type="micro",
            industry="manufacturing",
            difficulty="standard",
            required_skills=["技术文档", "B2B文案"],
            success_criteria=["信息完整", "专业准确", "表达清晰"],
            estimated_duration_minutes=90,
        ),
        Mission(
            title="工业品短视频脚本策划",
            description="为某机械制造企业策划3个产品展示短视频脚本",
            type="micro",
            industry="manufacturing",
            difficulty="entry",
            required_skills=["视频策划", "工业品营销"],
            success_criteria=["创意突出", "展示清晰", "符合B2B调性"],
            estimated_duration_minutes=60,
        ),
        Mission(
            title="企业公众号内容规划",
            description="为某制造企业制定1个月公众号内容规划，包含12篇文章选题",
            type="case",
            industry="manufacturing",
            difficulty="standard",
            required_skills=["内容策划", "公众号运营"],
            success_criteria=["选题合理", "内容多样", "符合品牌定位"],
            estimated_duration_minutes=100,
        ),
        
        # Cross-industry missions
        Mission(
            title="竞品分析报告",
            description="选择你感兴趣的行业，分析3个竞品的内容策略和运营方法",
            type="case",
            industry="retail",
            difficulty="standard",
            required_skills=["竞品分析", "数据收集", "报告撰写"],
            success_criteria=["分析全面", "洞察深刻", "建议可行"],
            estimated_duration_minutes=120,
        ),
        Mission(
            title="个人IP定位与人设设计",
            description="为自己或客户设计一个社交媒体个人IP，包含定位、人设和内容方向",
            type="case",
            industry="retail",
            difficulty="entry",
            required_skills=["IP定位", "人设打造"],
            success_criteria=["定位清晰", "人设鲜明", "内容方向明确"],
            estimated_duration_minutes=60,
        ),
        Mission(
            title="社交媒体运营SOP制定",
            description="为某品牌制定社交媒体运营SOP，包含日更、周更、月度复盘流程",
            type="case",
            industry="manufacturing",
            difficulty="advanced",
            required_skills=["SOP制定", "社交媒体运营"],
            success_criteria=["流程清晰", "可执行", "包含数据指标"],
            estimated_duration_minutes=150,
        ),
    ]
    
    for mission in missions:
        db.add(mission)
    
    await db.commit()


async def seed_circles(db: AsyncSession):
    """Seed initial circle data - 8 circles"""
    result = await db.execute(select(Circle))
    if result.scalars().first():
        return
    
    circles = [
        Circle(
            name="小红书运营学习圈",
            description="一起学习小红书运营技巧，互相点评作品，分享最新平台动态和爆款案例",
            industry="retail",
            max_members=20,
            current_members=12,
            status="open",
        ),
        Circle(
            name="电商操盘手训练营",
            description="聚焦电商运营实战，从选品到推广，每周复盘讨论",
            industry="retail",
            max_members=15,
            current_members=9,
            status="open",
        ),
        Circle(
            name="直播带货实战圈",
            description="专注直播带货技能提升，话术练习、数据复盘、经验分享",
            industry="retail",
            max_members=25,
            current_members=18,
            status="open",
        ),
        Circle(
            name="文旅内容创作者",
            description="分享旅行内容创作经验，结伴成长，互相点评旅行笔记和攻略",
            industry="tourism",
            max_members=15,
            current_members=8,
            status="open",
        ),
        Circle(
            name="目的地营销策划师",
            description="探讨文旅目的地的内容营销策略，分享成功案例",
            industry="tourism",
            max_members=12,
            current_members=6,
            status="open",
        ),
        Circle(
            name="B2B文案提升小组",
            description="专注B2B专业文案写作能力提升，技术文档、产品说明实战练习",
            industry="manufacturing",
            max_members=10,
            current_members=6,
            status="open",
        ),
        Circle(
            name="工业品数字营销圈",
            description="探讨工业品如何做数字营销，从内容到获客的全链路学习",
            industry="manufacturing",
            max_members=15,
            current_members=7,
            status="open",
        ),
        Circle(
            name="跨行业运营交流圈",
            description="三个行业赛道的学习者都在这里交流，跨界学习，碰撞灵感",
            industry="retail",
            max_members=30,
            current_members=22,
            status="open",
        ),
    ]
    
    for circle in circles:
        db.add(circle)
    
    await db.commit()


@router.post("/")
async def seed_database(db: AsyncSession = Depends(get_db)):
    """Seed database with initial data"""
    await seed_courses(db)
    await seed_missions(db)
    await seed_circles(db)
    
    return {
        "status": "success",
        "message": "Database seeded successfully",
        "data": {
            "courses": "18 courses created (6 per industry)",
            "missions": "12 missions created",
            "circles": "8 circles created",
        },
    }


@router.post("/reset")
async def reset_and_seed(db: AsyncSession = Depends(get_db)):
    """Clear all data and re-seed"""
    # Delete all existing data
    await db.execute(Circle.__table__.delete())
    await db.execute(Mission.__table__.delete())
    await db.execute(Course.__table__.delete())
    await db.commit()
    
    # Re-seed
    await seed_courses(db)
    await seed_missions(db)
    await seed_circles(db)
    
    return {
        "status": "success",
        "message": "Database reset and re-seeded",
        "data": {
            "courses": "18 courses created (6 per industry)",
            "missions": "12 missions created", 
            "circles": "8 circles created",
        },
    }
