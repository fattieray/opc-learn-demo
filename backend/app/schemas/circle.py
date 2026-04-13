from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class CircleResponse(BaseModel):
    id: str
    name: str
    industry: str
    description: str
    memberCount: int
    activeMembers: int
    coachName: str

    class Config:
        from_attributes = True
