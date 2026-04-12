# 🚀 OPC Learning Hub 后端部署指南 - Render 平台

## 概述

本指南将帮助你把 FastAPI 后端部署到 Render 平台，使其可以被前端访问。

**部署架构：**
```
用户浏览器
    ↓
Vercel (前端) - https://opc-learn-demo.vercel.app
    ↓
Render (后端) - https://opc-learn-backend.onrender.com
    ↓
SQLite 数据库 (持久化存储)
```

---

## 第一步：准备后端代码

### 1.1 检查必要文件

确保 `opc-learn-demo/backend` 目录下有以下文件：

```bash
cd opc-learn-demo/backend
ls -la

# 应该看到：
# ✅ requirements.txt - Python 依赖
# ✅ app/main.py - 主应用文件
# ✅ app/ - 应用代码目录
```

### 1.2 创建 Procfile

Procfile 告诉 Render 如何启动你的应用：

```bash
cd opc-learn-demo/backend
echo "web: uvicorn app.main:app --host 0.0.0.0 --port \$PORT" > Procfile
```

### 1.3 创建 render.yaml 配置文件

```bash
cd opc-learn-demo/backend
cat > render.yaml << 'EOF'
services:
  - type: web
    name: opc-learn-backend
    env: python
    region: oregon  # 选择离用户近的区域
    plan: free
    buildCommand: pip install -r requirements.txt
    startCommand: uvicorn app.main:app --host 0.0.0.0 --port $PORT
    envVars:
      - key: DATABASE_URL
        value: sqlite+aiosqlite:///./data/opc_learn.db
      - key: SECRET_KEY
        generateValue: true
      - key: CORS_ORIGINS
        value: '["https://opc-learn-demo.vercel.app", "http://localhost:3000"]'
      - key: ACCESS_TOKEN_EXPIRE_MINUTES
        value: 10080
    disk:
      name: data
      mountPath: /opt/render/project/src/data
      sizeGB: 1
EOF
```

### 1.4 更新 CORS 配置

确保后端允许前端访问。检查 `backend/app/core/config.py`：

```python
# 确保包含你的 Vercel URL
CORS_ORIGINS: list[str] = [
    "http://localhost:3000",
    "http://localhost:9000",
    "https://opc-learn-demo.vercel.app",  # 你的 Vercel URL
]
```

### 1.5 提交代码到 Git

```bash
cd opc-learn-demo
git add backend/
git commit -m "Add backend deployment files for Render"
git push origin main
```

---

## 第二步：在 Render 上部署

### 2.1 注册 Render 账号

1. 访问 https://render.com
2. 点击 "Get Started"
3. 使用 **GitHub 账号登录**（推荐）

### 2.2 创建新服务

**方法 A：使用 Blueprint（推荐）**

1. 登录 Render Dashboard
2. 点击 **"New +"** → **"Blueprint"**
3. 连接你的 GitHub 仓库
4. Render 会自动读取 `backend/render.yaml`
5. 点击 **"Apply"**

**方法 B：手动创建**

1. 登录 Render Dashboard
2. 点击 **"New +"** → **"Web Service"**
3. 连接 GitHub 仓库
4. 配置服务：
   - **Name**: `opc-learn-backend`
   - **Region**: Oregon
   - **Branch**: main
   - **Root Directory**: `backend`（重要！）
   - **Runtime**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

### 2.3 配置环境变量

在 Render 服务设置中添加环境变量：

| 变量名 | 值 | 说明 |
|--------|-----|------|
| `DATABASE_URL` | `sqlite+aiosqlite:///./data/opc_learn.db` | 数据库路径 |
| `SECRET_KEY` | （点击 Generate） | JWT 加密密钥 |
| `CORS_ORIGINS` | `["https://opc-learn-demo.vercel.app"]` | 允许的域名 |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | `10080` | Token 有效期（7天） |

**操作步骤：**
1. 进入服务页面 → **Environment** 标签
2. 点击 **"Add Environment Variable"**
3. 逐个添加上面的变量

### 2.4 配置持久化存储（重要！）

SQLite 需要持久化存储，否则重启后数据会丢失：

1. 进入服务页面 → **Disks** 标签
2. 点击 **"Add Disk"**
3. 配置：
   - **Name**: `data`
   - **Mount Path**: `/opt/render/project/src/data`
   - **Size**: `1 GB`（免费套餐足够）

### 2.5 开始部署

点击 **"Deploy"** 按钮，Render 会自动：
1. 克隆你的代码
2. 安装依赖
3. 启动应用
4. 分配 URL

部署大约需要 2-5 分钟。

---

## 第三步：验证部署

### 3.1 获取后端 URL

部署成功后，Render 会给你一个 URL：
```
https://opc-learn-backend.onrender.com
```

### 3.2 测试 API 端点

在浏览器或终端测试：

```bash
# 1. 测试 API 文档（应该看到 Swagger UI）
curl https://opc-learn-backend.onrender.com/api/v1/docs

# 2. 测试课程列表 API
curl https://opc-learn-backend.onrender.com/api/v1/courses/

# 应该返回课程列表 JSON
```

### 3.3 初始化数据库

首次部署后，需要运行 seed 脚本填充初始数据：

```bash
# 使用 curl 调用 seed 端点
curl -X POST https://opc-learn-backend.onrender.com/api/v1/seed/

# 应该返回：
# {"status": "success", "message": "Database seeded successfully"}
```

### 3.4 测试用户注册

```bash
curl -X POST https://opc-learn-backend.onrender.com/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"phone": "13800138000", "nickname": "测试用户"}'

# 应该返回：
# {"token": "eyJ...", "user": {...}}
```

---

## 第四步：连接前端

### 4.1 在 Vercel 配置环境变量

```bash
cd opc-learn-demo

# 添加后端 URL 到 Vercel
vercel env add NEXT_PUBLIC_API_URL production

# 输入你的 Render 后端 URL：
# https://opc-learn-backend.onrender.com/api/v1
```

**或者在 Vercel Dashboard 中配置：**

1. 访问 https://vercel.com/fattierays-projects/opc-learn-demo
2. 进入 **Settings** → **Environment Variables**
3. 添加变量：
   - **Name**: `NEXT_PUBLIC_API_URL`
   - **Value**: `https://opc-learn-backend.onrender.com/api/v1`
   - **Environment**: Production ✅
4. 点击 **Save**

### 4.2 重新部署前端

```bash
cd opc-learn-demo
vercel --prod
```

### 4.3 验证连接

访问前端 URL：https://opc-learn-demo.vercel.app

测试以下功能：
1. ✅ 注册新用户
2. ✅ 登录
3. ✅ 查看课程列表（应该从后端加载）
4. ✅ 提交测评
5. ✅ 查看个人档案

---

## 第五步：常见问题排查

### 问题 1: 部署失败 - 依赖安装错误

**症状：** Build 阶段失败

**解决方案：**
```bash
# 检查 requirements.txt 是否完整
cd backend
cat requirements.txt

# 应该包含：
# fastapi==0.104.1
# uvicorn[standard]==0.24.0
# sqlalchemy[asyncio]==2.0.23
# aiosqlite==0.19.0
# pydantic==2.5.2
# pydantic-settings==2.1.0
# python-jose[cryptography]==3.3.0
# passlib[bcrypt]==1.7.4
# greenlet==3.0.1
```

### 问题 2: 应用启动失败

**症状：** 部署成功但无法访问

**解决方案：**
```bash
# 查看 Render 日志
# Dashboard → Your Service → Logs

# 常见错误：
# - PORT 环境变量未设置（Render 会自动提供）
# - 数据库路径错误（确保使用相对路径）
# - CORS 配置错误
```

### 问题 3: CORS 错误

**症状：** 前端调用 API 时浏览器报 CORS 错误

**解决方案：**
1. 检查后端 `CORS_ORIGINS` 环境变量
2. 确保包含前端 URL：`https://opc-learn-demo.vercel.app`
3. 重新部署后端

### 问题 4: 数据丢失

**症状：** 后端重启后数据消失

**原因：** 未配置持久化存储

**解决方案：**
1. 确保已添加 Disk（参见 2.4 节）
2. Mount Path 必须是 `/opt/render/project/src/data`
3. DATABASE_URL 使用 `./data/opc_learn.db`

### 问题 5: 首次访问慢

**症状：** 首次访问 API 响应很慢（10-30秒）

**原因：** Render 免费套餐会自动休眠

**解决方案：**
- 这是正常行为，免费套餐的特点
- 首次访问后会唤醒，后续访问正常
- 或升级到付费套餐（$7/月）

---

## 替代方案：Railway 部署

如果你更喜欢 Railway，步骤类似：

### Railway 部署步骤

1. **访问** https://railway.app
2. **点击** "New Project" → "Deploy from GitHub repo"
3. **选择** 你的仓库
4. **配置** 环境变量：
   - `DATABASE_URL`: `sqlite+aiosqlite:///./data/opc_learn.db`
   - `SECRET_KEY`: (生成随机字符串)
   - `CORS_ORIGINS`: `["https://opc-learn-demo.vercel.app"]`
5. **启用** Persistent Volume（持久化存储）
6. **部署**

Railway 提供 $5 免费额度，足够测试使用。

---

## 部署检查清单

部署前确认：

- [ ] 后端代码在 Git 仓库中
- [ ] `requirements.txt` 包含所有依赖
- [ ] `Procfile` 已创建
- [ ] `render.yaml` 已配置（可选）
- [ ] CORS_ORIGINS 包含前端 URL
- [ ] 持久化存储已配置

部署后验证：

- [ ] 后端 URL 可访问
- [ ] API 文档正常显示 (`/api/v1/docs`)
- [ ] 课程列表 API 返回数据
- [ ] 用户可以注册和登录
- [ ] 前端已配置 `NEXT_PUBLIC_API_URL`
- [ ] 前端可以成功调用后端 API

---

## 快速命令参考

```bash
# 查看后端部署状态
# 访问 Render Dashboard

# 初始化数据库
curl -X POST https://your-backend.onrender.com/api/v1/seed/

# 测试 API
curl https://your-backend.onrender.com/api/v1/courses/

# 更新前端环境变量
vercel env add NEXT_PUBLIC_API_URL production

# 重新部署前端
vercel --prod
```

---

## 性能优化建议

### 1. 数据库升级（生产环境推荐）

从 SQLite 迁移到 PostgreSQL：

```bash
# 安装 PostgreSQL 驱动
pip install asyncpg

# 更新 requirements.txt
echo "asyncpg==0.29.0" >> requirements.txt

# 在 Render 创建 PostgreSQL 数据库
# Dashboard → New → PostgreSQL

# 更新 DATABASE_URL
DATABASE_URL=postgresql+asyncpg://user:password@host:5432/dbname
```

### 2. 启用缓存

在 Render 添加 Redis（可选）：
- Dashboard → New → Redis
- 更新应用配置使用 Redis 缓存

### 3. 监控和日志

- **Render Logs**: 实时查看应用日志
- **Uptime Robot**: 监控服务可用性（免费）
- **Sentry**: 错误追踪（可选）

---

## 成本估算

### Render 免费套餐

- ✅ Web Service: 750 小时/月（足够）
- ✅ 持久化存储: 1 GB
- ✅ 带宽: 100 GB/月
- ⚠️ 自动休眠: 15 分钟无访问

### 升级建议（可选）

- **Web Service**: $7/月（不休眠）
- **PostgreSQL**: $7/月（更可靠）
- **总计**: $14/月（生产环境推荐）

---

## 获取帮助

- **Render 文档**: https://render.com/docs
- **FastAPI 部署**: https://fastapi.tiangolo.com/deployment/
- **项目 Issues**: 查看 GitHub Issues

---

## 部署成功标志

完成后，你应该能够：

✅ 访问后端 API 文档  
✅ 调用课程列表 API  
✅ 注册新用户并获取 Token  
✅ 提交测评并获得推荐  
✅ 前端正常调用后端 API  
✅ 数据持久化保存  

**恭喜！你的完整应用已上线！** 🎉

---

*如有问题，请查看 Render 日志或参考完整文档：[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)*
