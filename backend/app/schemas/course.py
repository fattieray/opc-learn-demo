from pydantic import BaseModel
from typing import Optional


class CourseResponse(BaseModel):
    id: str
    title: str
    type: str
    industry: str
    estimatedMinutes: int
    description: str
    career: Optional[dict]
    activeLearners: int
    recruitingSquads: int


class CourseDetail(CourseResponse):
    content: list
    learning_objectives: list
