from pydantic import BaseModel
from typing import Optional


class UserUpdate(BaseModel):
    nickname: Optional[str] = None
    industry_preference: Optional[str] = None
    avatar_url: Optional[str] = None


class UserResponse(BaseModel):
    id: int
    phone: Optional[str]
    nickname: str
    avatar_url: Optional[str]
    industry_preference: Optional[str]
    skill_profile: dict
