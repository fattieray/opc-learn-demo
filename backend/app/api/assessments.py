from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.deps import get_db, get_current_user
from app.models.models import User, AssessmentResult
from app.schemas.assessment import AssessmentRequest, AssessmentResponse
from app.services.assessment_service import calculate_recommendation

router = APIRouter(prefix="/assessments", tags=["assessments"])


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
