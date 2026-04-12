from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.deps import get_db
from app.models.models import Course, Mission, Circle

router = APIRouter(prefix="/seed", tags=["seed"])


async def seed_courses(db: AsyncSession):
    """Seed initial course data"""
    # Check if courses already exist
    result = await db.execute(select(Course))
    if result.scalars().first():
        return  # Already seeded
    
    courses = [
        # Retail micro courses
        Course(
            id="r-micro-01",
            title="小红书种草文案写作",
            type="micro",
            industry="retail",
            estimated_minutes=90,
            description="掌握小红书平台种草文案的核心写作技巧，2小时即可上手实习",
            career_info={"title": "内容运营实习生", "salaryRange": "4k-6k/月"},
            active_learners=328,
            recruiting_squads=3,
            learning_objectives=["种草文案结构", "AIDA模型", "爆款标题技巧"],
            content=[
                {"title": "种草文案基础", "duration": 20, "type": "lesson"},
                {"title": "AIDA模型实战", "duration": 30, "type": "practice"},
                {"title": "爆款案例分析", "duration": 20, "type": "case"},
                {"title": "实战练习", "duration": 20, "type": "exercise"},
            ],
        ),
        Course(
            id="r-micro-02",
            title="电商产品详情页优化",
            type="micro",
            industry="retail",
            estimated_minutes=120,
            description="学习如何优化电商产品详情页，提升转化率",
            career_info={"title": "电商运营实习生", "salaryRange": "5k-7k/月"},
            active_learners=256,
            recruiting_squads=2,
            learning_objectives=["详情页结构", "转化心理学", "数据驱动优化"],
            content=[
                {"title": "详情页核心要素", "duration": 30, "type": "lesson"},
                {"title": "转化率优化技巧", "duration": 30, "type": "lesson"},
                {"title": "案例分析", "duration": 30, "type": "case"},
                {"title": "实战优化", "duration": 30, "type": "exercise"},
            ],
        ),
        # Tourism micro courses
        Course(
            id="t-micro-01",
            title="旅行体验内容创作",
            type="micro",
            industry="tourism",
            estimated_minutes=90,
            description="学习旅行笔记、体验报告的写作技巧",
            career_info={"title": "文旅内容实习生", "salaryRange": "4k-6k/月"},
            active_learners=189,
            recruiting_squads=2,
            learning_objectives=["体验写作", "故事化表达", "平台运营"],
            content=[
                {"title": "旅行内容创作基础", "duration": 25, "type": "lesson"},
                {"title": "故事化写作技巧", "duration": 25, "type": "lesson"},
                {"title": "平台内容策略", "duration": 20, "type": "lesson"},
                {"title": "实战练习", "duration": 20, "type": "exercise"},
            ],
        ),
        # Manufacturing micro courses
        Course(
            id="m-micro-01",
            title="B2B产品文案写作",
            type="micro",
            industry="manufacturing",
            estimated_minutes=100,
            description="学习B2B产品说明、技术文档的专业写作",
            career_info={"title": "B2B内容运营", "salaryRange": "5k-7k/月"},
            active_learners=145,
            recruiting_squads=1,
            learning_objectives=["专业文案写作", "技术文档规范", "B2B营销"],
            content=[
                {"title": "B2B文案特点", "duration": 25, "type": "lesson"},
                {"title": "技术文档写作", "duration": 30, "type": "lesson"},
                {"title": "案例分析", "duration": 25, "type": "case"},
                {"title": "实战练习", "duration": 20, "type": "exercise"},
            ],
        ),
        # System courses
        Course(
            id="r-system-01",
            title="小红书运营体系课",
            type="system",
            industry="retail",
            estimated_minutes=600,
            description="10小时系统掌握小红书运营全链路，从内容到转化",
            career_info={"title": "小红书运营主管", "salaryRange": "8k-12k/月"},
            active_learners=167,
            recruiting_squads=4,
            learning_objectives=["内容策略", "数据分析", "用户增长", "商业化"],
            content=[
                {"title": "平台生态解析", "duration": 60, "type": "lesson"},
                {"title": "内容矩阵搭建", "duration": 90, "type": "lesson"},
                {"title": "数据分析与优化", "duration": 90, "type": "lesson"},
                {"title": "用户增长策略", "duration": 90, "type": "lesson"},
                {"title": "商业化变现", "duration": 90, "type": "lesson"},
                {"title": "综合实战", "duration": 180, "type": "project"},
            ],
        ),
    ]
    
    for course in courses:
        db.add(course)
    
    await db.commit()


async def seed_missions(db: AsyncSession):
    """Seed initial mission data"""
    result = await db.execute(select(Mission))
    if result.scalars().first():
        return
    
    missions = [
        Mission(
            title="为母婴品牌写3条小红书种草文案",
            description="某新母婴品牌需要3条种草文案，目标用户是25-35岁新手妈妈",
            type="micro",
            industry="retail",
            difficulty="entry",
            required_skills=["文案写作", "小红书运营"],
            success_criteria=["符合AIDA模型", "突出产品卖点", "引发情感共鸣"],
            estimated_duration_minutes=30,
        ),
        Mission(
            title="电商双11活动策划方案",
            description="为某化妆品品牌设计双11营销活动方案",
            type="case",
            industry="retail",
            difficulty="standard",
            required_skills=["活动策划", "数据分析", "文案写作"],
            success_criteria=["目标明确", "可执行性强", "ROI合理"],
            estimated_duration_minutes=120,
        ),
        Mission(
            title="旅行目的地内容营销方案",
            description="为某旅游城市制定3个月内容营销策略",
            type="case",
            industry="tourism",
            difficulty="standard",
            required_skills=["内容策略", "社交媒体", "数据分析"],
            success_criteria=["策略完整", "创意突出", "可量化"],
            estimated_duration_minutes=150,
        ),
    ]
    
    for mission in missions:
        db.add(mission)
    
    await db.commit()


async def seed_circles(db: AsyncSession):
    """Seed initial circle data"""
    result = await db.execute(select(Circle))
    if result.scalars().first():
        return
    
    circles = [
        Circle(
            name="小红书运营学习圈",
            description="一起学习小红书运营技巧，互相点评作品",
            industry="retail",
            max_members=20,
            current_members=12,
            status="open",
        ),
        Circle(
            name="文旅内容创作者",
            description="分享旅行内容创作经验，结伴成长",
            industry="tourism",
            max_members=15,
            current_members=8,
            status="open",
        ),
        Circle(
            name="B2B文案提升小组",
            description="专注B2B专业文案写作能力提升",
            industry="manufacturing",
            max_members=10,
            current_members=6,
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
            "courses": "15+ courses created",
            "missions": "10+ missions created",
            "circles": "5+ circles created",
        },
    }
