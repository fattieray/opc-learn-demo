from pydantic import BaseModel
from typing import Optional


class RegisterRequest(BaseModel):
    phone: str
    nickname: str


class LoginRequest(BaseModel):
    phone: str
    otp: str


class TokenResponse(BaseModel):
    token: str
    user: dict


class UserResponse(BaseModel):
    id: int
    phone: Optional[str]
    nickname: str
    avatar_url: Optional[str]
    industry_preference: Optional[str]
    skill_profile: dict
