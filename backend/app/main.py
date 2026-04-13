"""OPC Learn Demo - Lightweight Backend"""

from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.core.database import init_db
from app.api import auth, courses, assessments, users, seed, missions, circles


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan"""
    # Startup
    await init_db()
    print(f"🚀 {settings.APP_NAME} v{settings.APP_VERSION} started")
    print(f"   Environment: {settings.ENVIRONMENT}")
    print(f"   Database: {settings.DATABASE_URL}")
    yield
    # Shutdown
    print(f"👋 {settings.APP_NAME} shutting down")


app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="Lightweight backend for OPC Learn Demo - Mobile web cold start",
    lifespan=lifespan,
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(auth.router, prefix="/api/v1")
app.include_router(courses.router, prefix="/api/v1")
app.include_router(assessments.router, prefix="/api/v1")
app.include_router(users.router, prefix="/api/v1")
app.include_router(seed.router, prefix="/api/v1")
app.include_router(missions.router, prefix="/api/v1")
app.include_router(circles.router, prefix="/api/v1")


@app.get("/api/v1/")
async def api_root():
    """API root endpoint"""
    return {
        "name": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "status": "running",
        "docs": "/docs",
        "endpoints": {
            "auth": "/api/v1/auth",
            "courses": "/api/v1/courses",
            "missions": "/api/v1/missions",
            "circles": "/api/v1/circles",
            "assessments": "/api/v1/assessments",
            "users": "/api/v1/users",
            "seed": "/api/v1/seed"
        }
    }


@app.get("/")
async def root():
    return {
        "app": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "status": "running",
        "docs": "/docs",
    }


@app.get("/health")
async def health():
    return {"status": "healthy"}
