# OPC Learn Demo Backend - 快速启动指南

## ✅ 后端已成功创建并运行！

### 当前状态
- ✅ 后端服务运行在: http://localhost:9000
- ✅ API 文档: http://localhost:9000/docs
- ✅ 数据库: SQLite (自动创建在 backend/opc_learn_demo.db)

## 快速测试步骤

### 1. 初始化测试数据
```bash
curl -X POST http://localhost:9000/api/v1/seed
```

### 2. 注册/登录用户
```bash
# 登录（测试 OTP: 123456）
curl -X POST http://localhost:9000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"phone": "13800138000", "otp": "123456"}'
```

返回示例:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "phone": "13800138000",
    "nickname": "用户8000",
    "avatar_url": "",
    "industry_preference": null,
    "skill_profile": {"retail": 0, "tourism": 0, "manufacturing": 0}
  }
}
```

### 3. 获取课程列表
```bash
# 获取所有微技能课
curl http://localhost:9000/api/v1/courses?type=micro

# 获取零售行业课程
curl http://localhost:9000/api/v1/courses?industry=retail
```

### 4. 提交测评（需要 token）
```bash
curl -X POST http://localhost:9000/api/v1/assessments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "answers": {
      "1": "zero",
      "2": "retail",
      "3": "retail2",
      "4": "none",
      "5": "fast"
    }
  }'
```

## 前端集成

### 1. 创建 .env.local 文件
在 `opc-learn-demo/.env.local` 中添加:
```env
NEXT_PUBLIC_API_URL=http://localhost:9000/api/v1
```

### 2. 使用 API Client
已创建 `src/lib/api.ts`，可以直接使用:

```typescript
import { api } from "@/lib/api";

// 登录
const { token, user } = await api.auth.login("13800138000", "123456");
localStorage.setItem("token", token);

// 获取课程
const courses = await api.courses.list({ type: "micro" });
```

## API 端点总览

| 方法 | 路径 | 说明 | 认证 |
|------|------|------|------|
| POST | /api/v1/auth/register | 注册用户 | ❌ |
| POST | /api/v1/auth/login | 登录 (OTP: 123456) | ❌ |
| GET | /api/v1/courses | 获取课程列表 | ❌ |
| GET | /api/v1/courses/{id} | 获取课程详情 | ❌ |
| POST | /api/v1/assessments | 提交测评 | ✅ |
| GET | /api/v1/users/me | 获取用户信息 | ✅ |
| PUT | /api/v1/users/me | 更新用户信息 | ✅ |
| POST | /api/v1/seed | 初始化数据 | ❌ |
| GET | /health | 健康检查 | ❌ |

## 下一步

1. **测试 API**: 访问 http://localhost:9000/docs 查看完整 API 文档
2. **集成前端**: 更新前端页面使用真实 API
3. **部署**: 参考 backend/README.md 中的部署建议

## 技术特点

- ✨ **轻量级**: 使用 SQLite，零配置数据库
- 🚀 **快速启动**: 只需 `pip install` + `uvicorn`
- 📱 **移动优先**: 手机号 + OTP 登录
- 🔒 **JWT 认证**: 7 天有效期的 token
- 📊 **完整功能**: 认证、课程、测评、用户管理

## 文件结构

```
backend/
├── app/
│   ├── main.py              # FastAPI 应用
│   ├── core/                # 核心配置
│   │   ├── config.py        # 环境变量
│   │   ├── database.py      # 数据库连接
│   │   ├── security.py      # JWT + 加密
│   │   └── deps.py          # 依赖注入
│   ├── models/              # 数据模型
│   ├── schemas/             # 数据验证
│   ├── api/                 # API 路由
│   └── services/            # 业务逻辑
├── requirements.txt
├── .env
└── README.md
```

---

🎉 **后端已准备就绪！可以开始集成前端了！**
