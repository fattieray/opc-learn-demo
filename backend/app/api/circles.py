from fastapi import APIRouter, Depends, Query
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Optional
from app.core.deps import get_db
from app.models.models import Circle
from app.schemas.circle import CircleResponse

router = APIRouter(prefix="/circles", tags=["circles"])


@router.get("/", response_model=list[CircleResponse])
async def list_circles(
    industry: Optional[str] = Query(None, description="Filter by industry"),
    db: AsyncSession = Depends(get_db),
):
    """Get list of circles with optional filters"""
    query = select(Circle)
    
    if industry and industry != "all":
        query = query.where(Circle.industry == industry)
    
    query = query.order_by(Circle.created_at.desc())
    result = await db.execute(query)
    circles = result.scalars().all()
    
    return [
        CircleResponse(
            id=str(circle.id),
            name=circle.name,
            industry=circle.industry,
            description=circle.description,
            memberCount=circle.max_members,
            activeMembers=circle.current_members,
            coachName="TBD",
        )
        for circle in circles
    ]


@router.get("/{circle_id}", response_model=CircleResponse)
async def get_circle(circle_id: str, db: AsyncSession = Depends(get_db)):
    """Get circle details by ID"""
    circle = await db.get(Circle, circle_id)
    
    if not circle:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Circle not found")
    
    return CircleResponse(
        id=str(circle.id),
        name=circle.name,
        industry=circle.industry,
        description=circle.description,
        memberCount=circle.max_members,
        activeMembers=circle.current_members,
        coachName="TBD",
    )
