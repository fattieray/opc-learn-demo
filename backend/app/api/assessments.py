from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.deps import get_db, get_current_user
from app.models.models import User, AssessmentResult
from app.schemas.assessment import AssessmentRequest, AssessmentResponse
from app.services.assessment_service import calculate_recommendation

router = APIRouter(prefix="/assessments", tags=["assessments"])


# Mock assessment questions
ASSESSMENT_QUESTIONS = [
    {
        "id": "q1",
        "question": "你更喜欢哪种工作内容？",
        "options": [
            {"value": "retail", "label": "电商运营、直播带货"},
            {"value": "tourism", "label": "旅游策划、内容创作"},
            {"value": "manufacturing", "label": "产品文案、品牌推广"}
        ]
    },
    {
        "id": "q2",
        "question": "你的文案写作经验如何？",
        "options": [
            {"value": "beginner", "label": "零基础，想学习"},
            {"value": "intermediate", "label": "有一些经验"},
            {"value": "advanced", "label": "经验丰富，想提升"}
        ]
    },
    {
        "id": "q3",
        "question": "你期望的薪资范围？",
        "options": [
            {"value": "entry", "label": "4k-7k（实习/初级）"},
            {"value": "mid", "label": "7k-12k（中级）"},
            {"value": "senior", "label": "12k+（高级/管理）"}
        ]
    },
    {
        "id": "q4",
        "question": "你每周能投入多少时间学习？",
        "options": [
            {"value": "part_time", "label": "5-10小时（业余）"},
            {"value": "full_time", "label": "20-30小时（全职）"},
            {"value": "intensive", "label": "40+小时（集训）"}
        ]
    },
    {
        "id": "q5",
        "question": "你的职业目标是什么？",
        "options": [
            {"value": "freelance", "label": "自由职业/接单"},
            {"value": "employment", "label": "企业就业"},
            {"value": "entrepreneur", "label": "创业/做自己的品牌"}
        ]
    }
]


@router.get("/questions")
async def get_assessment_questions():
    """Get assessment questions"""
    return {
        "questions": ASSESSMENT_QUESTIONS,
        "total": len(ASSESSMENT_QUESTIONS)
    }


@router.post("/", response_model=AssessmentResponse)
async def submit_assessment(
    request: AssessmentRequest,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    """Submit assessment and get recommendation"""
    # Calculate recommendation
    result = calculate_recommendation(request.answers)
    
    # Save assessment result
    assessment_result = AssessmentResult(
        user_id=user.id,
        answers=request.answers,
        scores=result["scores"],
        recommended_industry=result["industry"],
        recommended_course_id=result["course_id"],
    )
    db.add(assessment_result)
    
    # Update user's industry preference and skill profile
    user.industry_preference = result["industry"]
    user.skill_profile = result["scores"]
    
    await db.commit()
    
    return AssessmentResponse(
        industry=result["industry"],
        course_id=result["course_id"],
        scores=result["scores"],
        reason=result["reason"],
    )
