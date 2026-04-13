from fastapi import APIRouter, Depends, Query
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Optional
from app.core.deps import get_db
from app.models.models import Mission
from app.schemas.mission import MissionResponse

router = APIRouter(prefix="/missions", tags=["missions"])


@router.get("/", response_model=list[MissionResponse])
async def list_missions(
    industry: Optional[str] = Query(None, description="Filter by industry"),
    difficulty: Optional[str] = Query(None, description="Filter by difficulty: beginner/intermediate/advanced"),
    db: AsyncSession = Depends(get_db),
):
    """Get list of missions with optional filters"""
    query = select(Mission)
    
    if industry and industry != "all":
        query = query.where(Mission.industry == industry)
    if difficulty:
        query = query.where(Mission.difficulty == difficulty)
    
    query = query.order_by(Mission.created_at.desc())
    result = await db.execute(query)
    missions = result.scalars().all()
    
    return [
        MissionResponse(
            id=str(mission.id),
            title=mission.title,
            industry=mission.industry,
            difficulty=mission.difficulty,
            estimatedMinutes=mission.estimated_duration_minutes,
            description=mission.description,
            rewards={"type": mission.type, "skills": mission.required_skills or []},
            status="available",
        )
        for mission in missions
    ]


@router.get("/{mission_id}", response_model=MissionResponse)
async def get_mission(mission_id: str, db: AsyncSession = Depends(get_db)):
    """Get mission details by ID"""
    mission = await db.get(Mission, mission_id)
    
    if not mission:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Mission not found")
    
    return MissionResponse(
        id=str(mission.id),
        title=mission.title,
        industry=mission.industry,
        difficulty=mission.difficulty,
        estimatedMinutes=mission.estimated_duration_minutes,
        description=mission.description,
        rewards={"type": mission.type, "skills": mission.required_skills or []},
        status="available",
    )
