from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.deps import get_db, get_current_user
from app.models.models import User
from app.schemas.user import UserResponse, UserUpdate

router = APIRouter(prefix="/users", tags=["users"])


@router.get("/me", response_model=UserResponse)
async def get_current_user_profile(
    user: User = Depends(get_current_user),
):
    """Get current user profile"""
    return UserResponse(
        id=user.id,
        phone=user.phone,
        nickname=user.nickname,
        avatar_url=user.avatar_url,
        industry_preference=user.industry_preference,
        skill_profile=user.skill_profile,
    )


@router.put("/me", response_model=UserResponse)
async def update_current_user_profile(
    update: UserUpdate,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    """Update current user profile"""
    if update.nickname is not None:
        user.nickname = update.nickname
    if update.industry_preference is not None:
        user.industry_preference = update.industry_preference
    if update.avatar_url is not None:
        user.avatar_url = update.avatar_url
    
    await db.commit()
    await db.refresh(user)
    
    return UserResponse(
        id=user.id,
        phone=user.phone,
        nickname=user.nickname,
        avatar_url=user.avatar_url,
        industry_preference=user.industry_preference,
        skill_profile=user.skill_profile,
    )
