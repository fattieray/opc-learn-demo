from fastapi import APIRouter, Depends, Query
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Optional
from app.core.deps import get_db
from app.models.models import Course
from app.schemas.course import CourseResponse, CourseDetail

router = APIRouter(prefix="/courses", tags=["courses"])


@router.get("/", response_model=list[CourseResponse])
async def list_courses(
    type: Optional[str] = Query(None, description="Filter by type: micro/system/expert"),
    industry: Optional[str] = Query(None, description="Filter by industry"),
    db: AsyncSession = Depends(get_db),
):
    """Get list of courses with optional filters"""
    query = select(Course)
    
    if type:
        query = query.where(Course.type == type)
    if industry and industry != "all":
        query = query.where(Course.industry == industry)
    
    query = query.order_by(Course.created_at.desc())
    result = await db.execute(query)
    courses = result.scalars().all()
    
    # Transform to frontend-expected format
    return [
        CourseResponse(
            id=course.id,
            title=course.title,
            type=course.type,
            industry=course.industry,
            estimatedMinutes=course.estimated_minutes,
            description=course.description,
            career=course.career_info,
            activeLearners=course.active_learners,
            recruitingSquads=course.recruiting_squads,
        )
        for course in courses
    ]


@router.get("/{course_id}", response_model=CourseDetail)
async def get_course(course_id: str, db: AsyncSession = Depends(get_db)):
    """Get course details by ID"""
    course = await db.get(Course, course_id)
    
    if not course:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Course not found")
    
    return CourseDetail(
        id=course.id,
        title=course.title,
        type=course.type,
        industry=course.industry,
        estimatedMinutes=course.estimated_minutes,
        description=course.description,
        career=course.career_info,
        activeLearners=course.active_learners,
        recruitingSquads=course.recruiting_squads,
        content=course.content,
        learning_objectives=course.learning_objectives,
    )
