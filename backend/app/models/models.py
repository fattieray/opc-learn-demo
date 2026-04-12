from sqlalchemy import Column, Integer, String, Float, JSON, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from app.core.database import Base


class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    phone = Column(String(20), unique=True, nullable=True)
    email = Column(String(100), unique=True, nullable=True)
    hashed_password = Column(String(255), nullable=True)
    nickname = Column(String(50), default="")
    avatar_url = Column(String(255), default="")
    industry_preference = Column(String(50), default="")
    skill_profile = Column(JSON, default=lambda: {"retail": 0, "tourism": 0, "manufacturing": 0})
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))
    
    # Relationships
    assessment_results = relationship("AssessmentResult", back_populates="user", cascade="all, delete-orphan")
    mission_submissions = relationship("MissionSubmission", back_populates="user", cascade="all, delete-orphan")


class AssessmentResult(Base):
    __tablename__ = "assessment_results"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    answers = Column(JSON, nullable=False)
    scores = Column(JSON, nullable=False)
    recommended_industry = Column(String(50), nullable=False)
    recommended_course_id = Column(String(50), nullable=False)
    completed_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    
    user = relationship("User", back_populates="assessment_results")


class Course(Base):
    __tablename__ = "courses"
    
    id = Column(String(50), primary_key=True)
    title = Column(String(200), nullable=False)
    type = Column(String(20), nullable=False)  # micro/system/expert
    industry = Column(String(50), nullable=False)
    estimated_minutes = Column(Integer, nullable=False)
    description = Column(Text, default="")
    learning_objectives = Column(JSON, default=list)
    career_info = Column(JSON, default=dict)
    active_learners = Column(Integer, default=0)
    recruiting_squads = Column(Integer, default=0)
    content = Column(JSON, default=list)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))


class Mission(Base):
    __tablename__ = "missions"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=False)
    type = Column(String(20), nullable=False)  # micro/case/sandbox
    industry = Column(String(50), nullable=False)
    difficulty = Column(String(20), default="entry")
    required_skills = Column(JSON, default=list)
    success_criteria = Column(JSON, default=list)
    estimated_duration_minutes = Column(Integer, nullable=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))


class MissionSubmission(Base):
    __tablename__ = "mission_submissions"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    mission_id = Column(Integer, ForeignKey("missions.id"), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    content = Column(JSON, nullable=False)
    agent_evaluation = Column(JSON, default=dict)
    status = Column(String(20), default="submitted")
    submitted_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    
    user = relationship("User", back_populates="mission_submissions")


class Circle(Base):
    __tablename__ = "circles"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(100), nullable=False)
    description = Column(Text, default="")
    industry = Column(String(50), nullable=False)
    max_members = Column(Integer, default=10)
    current_members = Column(Integer, default=0)
    status = Column(String(20), default="open")
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
