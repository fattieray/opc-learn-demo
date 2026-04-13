from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    APP_NAME: str = "OPC Learn Demo"
    APP_VERSION: str = "0.1.0"
    ENVIRONMENT: str = "development"
    
    # Database - SQLite for lightweight demo
    DATABASE_URL: str = "sqlite+aiosqlite:///./opc_learn_demo.db"
    
    # JWT
    SECRET_KEY: str = "dev-secret-key-change-in-production"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days
    
    # CORS
    CORS_ORIGINS: List[str] = [
        "http://localhost:3000", 
        "http://localhost:3001",
        "http://localhost:3004",  # Local dev (dynamic port)
        "http://localhost:3005",  # Local dev (alternate port)
        "https://opc-learn-demo.vercel.app",  # Vercel production
        "https://opc-learn-demo-*.vercel.app",  # Vercel preview deployments
        "https://*.service.tcloudbase.net",  # Tencent CloudBase
        "https://opc-learn.cn",  # Custom domain (optional)
    ]
    
    model_config = {"env_file": ".env"}


settings = Settings()
