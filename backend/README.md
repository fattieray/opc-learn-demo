# OPC Learn Demo - Lightweight Backend

轻量级后端服务，用于小范围测试和冷启动。使用 SQLite 数据库，无需额外依赖。

## 快速启动

### 1. 安装依赖

```bash
cd backend
pip install -r requirements.txt
```

### 2. 配置环境变量

```bash
cp .env.example .env
# 编辑 .env 文件（默认配置已可用）
```

### 3. 启动服务

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 9000
```

服务将在 http://localhost:9000 启动

### 4. 初始化数据

首次启动后，调用 seed API 填充初始数据：

```bash
curl -X POST http://localhost:9000/api/v1/seed
```

### 5. 访问 API 文档

- Swagger UI: http://localhost:9000/docs
- ReDoc: http://localhost:9000/redoc

## API 端点

### 认证
- `POST /api/v1/auth/register` - 注册用户（手机号 + 昵称）
- `POST /api/v1/auth/login` - 登录（手机号 + OTP）
  - 测试 OTP: `123456`

### 课程
- `GET /api/v1/courses` - 获取课程列表
  - 参数: `type` (micro/system/expert), `industry` (retail/tourism/manufacturing)
- `GET /api/v1/courses/{id}` - 获取课程详情

### 测评
- `POST /api/v1/assessments` - 提交测评（需要认证）
  - 返回推荐行业和课程

### 用户
- `GET /api/v1/users/me` - 获取当前用户信息（需要认证）
- `PUT /api/v1/users/me` - 更新用户信息（需要认证）

### 系统
- `POST /api/v1/seed` - 初始化测试数据
- `GET /health` - 健康检查

## 前端集成

### 1. 配置环境变量

在 `opc-learn-demo/.env.local` 中添加：

```env
NEXT_PUBLIC_API_URL=http://localhost:9000/api/v1
```

### 2. 使用 API Client

```typescript
import { api } from "@/lib/api";

// 登录
const { token, user } = await api.auth.login("13800138000", "123456");
localStorage.setItem("token", token);

// 获取课程
const courses = await api.courses.list({ type: "micro", industry: "retail" });

// 提交测评
const result = await api.assessments.submit({
  1: "zero",
  2: "retail",
  3: "retail2",
  4: "none",
  5: "fast"
});
```

## 技术栈

- **FastAPI** - 高性能 Python Web 框架
- **SQLAlchemy (Async)** - 异步 ORM
- **SQLite** - 轻量级数据库（零配置）
- **JWT** - 无状态认证
- **Pydantic V2** - 数据验证

## 数据库

使用 SQLite，数据库文件自动创建在 `backend/opc_learn_demo.db`

### 数据模型

- **User** - 用户
- **Course** - 课程
- **AssessmentResult** - 测评结果
- **Mission** - 任务
- **MissionSubmission** - 任务提交
- **Circle** - 学习圈子

## 部署建议

### 小范围测试（当前）
- 单机运行
- SQLite 数据库
- 直接运行 uvicorn

### 生产环境升级
1. 数据库: SQLite → PostgreSQL
2. 部署: 直接运行 → Docker + Nginx
3. 认证: 固定 OTP → 真实短信服务
4. 添加: Redis 缓存、监控、日志

## 开发说明

### 目录结构

```
backend/
├── app/
│   ├── main.py              # FastAPI 应用入口
│   ├── core/                # 核心配置
│   │   ├── config.py        # 环境变量配置
│   │   ├── database.py      # 数据库连接
│   │   ├── security.py      # JWT 和密码加密
│   │   └── deps.py          # 依赖注入
│   ├── models/              # 数据模型
│   ├── schemas/             # Pydantic 数据验证
│   ├── api/                 # API 路由
│   └── services/            # 业务逻辑
├── requirements.txt
├── .env
└── .env.example
```

### 添加新功能

1. 在 `models/models.py` 添加数据模型
2. 在 `schemas/` 添加验证 schema
3. 在 `api/` 添加路由
4. 在 `main.py` 注册路由

## 测试示例

```bash
# 1. 注册用户
curl -X POST http://localhost:9000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"phone": "13800138000", "nickname": "测试用户"}'

# 2. 登录
curl -X POST http://localhost:9000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"phone": "13800138000", "otp": "123456"}'

# 3. 获取课程（假设已 seed）
curl http://localhost:9000/api/v1/courses?type=micro

# 4. 提交测评（使用登录返回的 token）
curl -X POST http://localhost:9000/api/v1/assessments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"answers": {"1": "zero", "2": "retail", "3": "retail2", "4": "none", "5": "fast"}}'
```

## 许可证

MIT
