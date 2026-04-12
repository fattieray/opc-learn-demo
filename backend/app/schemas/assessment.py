from pydantic import BaseModel


class AssessmentRequest(BaseModel):
    answers: dict


class AssessmentResponse(BaseModel):
    industry: str
    course_id: str
    scores: dict
    reason: str
