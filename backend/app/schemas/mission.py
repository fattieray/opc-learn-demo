from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class MissionResponse(BaseModel):
    id: str
    title: str
    industry: str
    difficulty: str
    estimatedMinutes: int
    description: str
    rewards: dict
    status: str

    class Config:
        from_attributes = True
