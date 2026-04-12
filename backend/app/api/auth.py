from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.deps import get_db
from app.core.security import create_access_token
from app.models.models import User
from app.schemas.auth import RegisterRequest, LoginRequest, TokenResponse
import logging

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/register", response_model=TokenResponse)
async def register(request: RegisterRequest, db: AsyncSession = Depends(get_db)):
    """Register new user with phone number"""
    # Check if user already exists
    result = await db.execute(select(User).where(User.phone == request.phone))
    existing_user = result.scalar_one_or_none()
    
    if existing_user:
        raise HTTPException(status_code=400, detail="Phone number already registered")
    
    # Create new user
    user = User(
        phone=request.phone,
        nickname=request.nickname,
        skill_profile={"retail": 0, "tourism": 0, "manufacturing": 0},
    )
    db.add(user)
    await db.commit()
    await db.refresh(user)
    
    # Generate OTP (for demo, always 123456)
    otp = "123456"
    logger.info(f"📱 OTP for {request.phone}: {otp}")
    
    # Create token
    token = create_access_token(data={"sub": str(user.id)})
    
    return TokenResponse(
        token=token,
        user={
            "id": user.id,
            "phone": user.phone,
            "nickname": user.nickname,
            "avatar_url": user.avatar_url,
            "industry_preference": user.industry_preference,
            "skill_profile": user.skill_profile,
        },
    )


@router.post("/login", response_model=TokenResponse)
async def login(request: LoginRequest, db: AsyncSession = Depends(get_db)):
    """Login with phone number and OTP"""
    # For demo: OTP is always 123456
    if request.otp != "123456":
        raise HTTPException(status_code=401, detail="Invalid OTP. For demo, use: 123456")
    
    # Find or create user
    result = await db.execute(select(User).where(User.phone == request.phone))
    user = result.scalar_one_or_none()
    
    if not user:
        # Auto-create user on first login
        user = User(
            phone=request.phone,
            nickname=f"用户{request.phone[-4:]}",
            skill_profile={"retail": 0, "tourism": 0, "manufacturing": 0},
        )
        db.add(user)
        await db.commit()
        await db.refresh(user)
    
    # Create token
    token = create_access_token(data={"sub": str(user.id)})
    
    return TokenResponse(
        token=token,
        user={
            "id": user.id,
            "phone": user.phone,
            "nickname": user.nickname,
            "avatar_url": user.avatar_url,
            "industry_preference": user.industry_preference,
            "skill_profile": user.skill_profile,
        },
    )
