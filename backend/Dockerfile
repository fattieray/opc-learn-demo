# 后端 FastAPI
FROM python:3.11-slim

WORKDIR /app

# 安装依赖
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 复制后端代码
COPY backend/ ./

# 环境变量
ENV DATABASE_URL=sqlite+aiosqlite:///app/opc_learn.db
ENV SECRET_KEY=docker-secret-key-change-in-production
ENV CORS_ORIGINS=["http://localhost","http://localhost:3000","http://124.221.40.35"]
ENV ENVIRONMENT=production

EXPOSE 9000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "9000"]
