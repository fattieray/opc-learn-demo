# OPC Learning Hub - Vercel 部署指南

## 📋 部署概览

本指南将帮助您将 OPC Learning Hub 前端部署到 Vercel，使其可以被公开访问。

### 架构说明

```
用户浏览器
    ↓
Vercel (前端 - Next.js)
    ↓
后端 API (需要单独部署)
    ↓
SQLite 数据库
```

**重要：** 由于后端使用 SQLite，需要先将后端部署到支持持久化存储的平台（如 Render、Railway），然后配置前端 API URL。

---

## 🚀 方案一：仅部署前端（使用 Mock 数据）

如果您只想快速展示前端界面，可以先不部署后端，前端会使用 Mock 数据运行。

### 步骤 1: 准备代码

```bash
cd opc-learn-demo

# 确保代码已提交到 Git
git init
git add .
git commit -m "Initial commit - OPC Learning Hub"
```

### 步骤 2: 推送到 GitHub

```bash
# 创建 GitHub 仓库（在 GitHub 网站上）
# 然后推送代码
git remote add origin https://github.com/YOUR_USERNAME/opc-learn-demo.git
git branch -M main
git push -u origin main
```

### 步骤 3: 部署到 Vercel

#### 方法 A: 使用 Vercel CLI（推荐）

```bash
# 1. 安装 Vercel CLI
npm i -g vercel

# 2. 登录 Vercel
vercel login

# 3. 部署
cd opc-learn-demo
vercel

# 4. 首次部署会询问配置，按提示操作
# ? Set up and deploy? Y
# ? Which scope? (选择你的账号)
# ? Link to existing project? N
# ? What's your project's name? opc-learn-demo
# ? In which directory is your code located? ./
# ? Want to override the settings? N
```

#### 方法 B: 使用 Vercel 网站

1. 访问 https://vercel.com
2. 点击 "Add New Project"
3. 导入你的 GitHub 仓库
4. 配置构建设置：
   - **Framework Preset**: Next.js
   - **Build Command**: `next build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`
5. 点击 "Deploy"

### 步骤 4: 访问你的应用

部署完成后，Vercel 会提供一个 URL：
```
https://opc-learn-demo-xxxx.vercel.app
```

**注意：** 此时前端会使用 Mock 数据，因为后端还未部署。

---

## 🚀 方案二：完整部署（前端 + 后端）

### 第一部分：部署后端 API

#### 选项 1: 部署到 Render（推荐）

**步骤 1: 准备后端代码**

```bash
cd opc-learn-demo/backend

# 创建 requirements.txt（如果还没有）
cat > requirements.txt << EOF
fastapi==0.104.1
uvicorn[standard]==0.24.0
sqlalchemy[asyncio]==2.0.23
aiosqlite==0.19.0
pydantic==2.5.2
pydantic-settings==2.1.0
python-jose[cryptography]==3.3.0
passlib[bcrypt]==1.7.4
greenlet==3.0.1
EOF
```

**步骤 2: 创建 Render 部署配置**

```bash
# 创建 render.yaml
cat > render.yaml << EOF
services:
  - type: web
    name: opc-learn-backend
    env: python
    region: oregon
    plan: free
    buildCommand: pip install -r requirements.txt
    startCommand: uvicorn app.main:app --host 0.0.0.0 --port \$PORT
    envVars:
      - key: DATABASE_URL
        value: sqlite+aiosqlite:///./data/opc_learn.db
      - key: SECRET_KEY
        generateValue: true
      - key: CORS_ORIGINS
        value: '["https://your-frontend.vercel.app"]'
    disk:
      name: data
      mountPath: /opt/render/project/src/data
      sizeGB: 1
EOF
```

**步骤 3: 部署到 Render**

1. 访问 https://render.com
2. 注册/登录账号
3. 点击 "New +" → "Blueprint"
4. 连接你的 GitHub 仓库
5. Render 会自动读取 `render.yaml`
6. 点击 "Apply"

部署完成后，你会获得一个 URL：
```
https://opc-learn-backend.onrender.com
```

**步骤 4: 初始化数据库**

```bash
# 访问 seed 端点初始化数据
curl -X POST https://opc-learn-backend.onrender.com/api/v1/seed/
```

---

#### 选项 2: 部署到 Railway

**步骤 1: 创建 Procfile**

```bash
cd opc-learn-demo/backend
echo "web: uvicorn app.main:app --host 0.0.0.0 --port \$PORT" > Procfile
```

**步骤 2: 部署到 Railway**

1. 访问 https://railway.app
2. 点击 "New Project" → "Deploy from GitHub repo"
3. 选择你的仓库
4. Railway 会自动检测 Python 项目
5. 添加环境变量：
   - `DATABASE_URL`: `sqlite+aiosqlite:///./data/opc_learn.db`
   - `SECRET_KEY`: (生成一个随机字符串)
   - `CORS_ORIGINS`: `["https://your-frontend.vercel.app"]`
6. 启用 Persistent Volume 用于数据存储

---

### 第二部分：部署前端并连接后端

**步骤 1: 配置环境变量**

```bash
cd opc-learn-demo

# 创建 .env.local
cat > .env.local << EOF
NEXT_PUBLIC_API_URL=https://opc-learn-backend.onrender.com/api/v1
EOF
```

**步骤 2: 部署到 Vercel**

```bash
# 使用 Vercel CLI
vercel --prod

# 或在 Vercel  dashboard 中添加环境变量
# Settings → Environment Variables
# NEXT_PUBLIC_API_URL = https://opc-learn-backend.onrender.com/api/v1
```

**步骤 3: 重新部署（如果已部署）**

```bash
vercel --prod
```

---

## 🔧 环境变量配置

### 前端环境变量（Vercel）

在 Vercel Dashboard 中配置：

| 变量名 | 值 | 说明 |
|--------|-----|------|
| `NEXT_PUBLIC_API_URL` | `https://your-backend.onrender.com/api/v1` | 后端 API 地址 |

**配置位置：**
Vercel Dashboard → Your Project → Settings → Environment Variables

### 后端环境变量（Render/Railway）

| 变量名 | 值 | 说明 |
|--------|-----|------|
| `DATABASE_URL` | `sqlite+aiosqlite:///./data/opc_learn.db` | 数据库连接 |
| `SECRET_KEY` | `your-secret-key-here` | JWT 加密密钥（生产环境必须修改） |
| `CORS_ORIGINS` | `["https://your-frontend.vercel.app"]` | 允许的跨域来源 |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | `10080` | Token 过期时间（7天） |

---

## ✅ 部署验证清单

### 前端验证

```bash
# 1. 访问前端 URL
open https://your-app.vercel.app

# 2. 检查页面加载
# - 首页正常显示
# - 课程列表加载
# - 无控制台错误

# 3. 测试功能
# - 用户注册
# - 用户登录
# - 浏览课程
# - 提交测评
# - 查看个人档案
```

### 后端验证

```bash
# 1. 检查健康状态
curl https://your-backend.onrender.com/api/v1/docs

# 2. 测试课程 API
curl https://your-backend.onrender.com/api/v1/courses/

# 3. 测试用户注册
curl -X POST https://your-backend.onrender.com/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"phone": "13800138000", "nickname": "测试用户"}'

# 4. 检查 CORS 配置
curl -I https://your-backend.onrender.com/api/v1/courses/ \
  -H "Origin: https://your-frontend.vercel.app"
```

---

## 🐛 常见问题解决

### 问题 1: 前端无法连接后端

**症状：** 前端显示 "加载失败" 或网络错误

**解决方案：**
```bash
# 1. 检查后端 URL 是否正确
cat .env.local

# 2. 测试后端是否可访问
curl https://your-backend.onrender.com/api/v1/courses/

# 3. 检查 CORS 配置
# 后端 .env 中的 CORS_ORIGINS 必须包含前端 URL
```

### 问题 2: 构建失败

**症状：** Vercel 构建报错

**解决方案：**
```bash
# 1. 本地测试构建
npm run build

# 2. 检查 Node.js 版本
node -v  # 应该是 18+

# 3. 清除缓存重新部署
vercel --prod --force
```

### 问题 3: 数据库数据丢失

**症状：** 后端重启后数据消失

**原因：** SQLite 文件存储在临时目录

**解决方案：**
- Render: 确保配置了 Persistent Volume
- Railway: 确保启用了 Persistent Storage
- 或迁移到 PostgreSQL（推荐用于生产环境）

### 问题 4: CORS 错误

**症状：** 浏览器控制台显示 CORS 错误

**解决方案：**
```python
# backend/app/core/config.py
CORS_ORIGINS: list[str] = [
    "http://localhost:3000",
    "https://your-app.vercel.app",  # 添加你的 Vercel URL
]
```

---

## 📊 部署后优化建议

### 1. 自定义域名

**Vercel:**
```bash
# 添加自定义域名
vercel domains add your-domain.com
```

**Render:**
- Dashboard → Your Service → Settings → Custom Domain

### 2. 性能优化

```typescript
// next.config.ts
const nextConfig: NextConfig = {
  // 启用图片优化
  images: {
    domains: ['your-image-domain.com'],
  },
  // 启用压缩
  compress: true,
  // 生产环境优化
  reactStrictMode: true,
};
```

### 3. 监控和日志

- **Vercel Analytics**: 启用页面访问统计
- **Vercel Logs**: 查看运行时日志
- **Sentry**: 错误追踪（可选）

### 4. 数据库升级（生产环境推荐）

从 SQLite 迁移到 PostgreSQL：

```bash
# 安装 PostgreSQL 驱动
pip install asyncpg

# 更新 .env
DATABASE_URL=postgresql+asyncpg://user:password@host:5432/dbname
```

---

## 🎯 快速部署命令总结

### 一键部署前端（使用 Mock 数据）

```bash
# 1. 安装 Vercel CLI
npm i -g vercel

# 2. 登录
vercel login

# 3. 部署
cd opc-learn-demo
vercel --prod
```

### 完整部署（前端 + 后端）

```bash
# 后端部署到 Render
cd opc-learn-demo/backend
# 通过 Render Dashboard 部署

# 前端部署到 Vercel
cd ../
echo "NEXT_PUBLIC_API_URL=https://your-backend.onrender.com/api/v1" > .env.local
vercel --prod
```

---

## 📞 获取帮助

- **Vercel 文档**: https://vercel.com/docs
- **Render 文档**: https://render.com/docs
- **Next.js 部署**: https://nextjs.org/docs/app/building-your-application/deploying

---

## 🎉 部署完成检查

部署成功后，您应该能够：

- ✅ 通过公开 URL 访问应用
- ✅ 注册用户并登录
- ✅ 浏览课程列表
- ✅ 查看课程详情
- ✅ 提交测评并获得推荐
- ✅ 查看个人档案
- ✅ 所有数据持久化保存

**恭喜！您的应用已成功上线！** 🚀
