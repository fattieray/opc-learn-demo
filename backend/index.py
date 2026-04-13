"""
腾讯云 CloudBase 云函数入口
将 FastAPI 应用包装为云函数格式
"""
from mangum import Mangum
from app.main import app

# Mangum 将 ASGI 应用转换为云函数处理器
# lifespan="off" 因为云函数环境中不需要生命周期管理
handler = Mangum(app, lifespan="off")
