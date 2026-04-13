# 🎯 后端部署 - 快速指南

## 已完成的准备工作 ✅

我已经为你准备好了所有必要的文件：

- ✅ `backend/Procfile` - Render 启动配置
- ✅ `render.yaml` - Render 部署蓝图
- ✅ `backend/app/core/config.py` - 已更新 CORS 配置
- ✅ `backend/requirements.txt` - Python 依赖

---

## 📝 部署步骤（3 步完成）

### 步骤 1: 推送代码到 GitHub

```bash
cd "/Users/xangwei/Documents/10-工作文件夹/OpenCode/OPC Learning Hub/opc-learn-demo"
git push origin main
```

### 步骤 2: 在 Render 部署后端

#### 2.1 注册/登录 Render

1. 访问 https://render.com
2. 点击 **"Get Started"**
3. 使用 **GitHub 账号登录**

#### 2.2 创建 Web Service

1. 点击 Dashboard 的 **"New +"** → **"Web Service"**
2. 连接你的 GitHub 仓库
3. 配置服务：

| 配置项 | 值 |
|--------|-----|
| **Name** | `opc-learn-backend` |
| **Region** | Oregon |
| **Branch** | `main` |
| **Root Directory** | `backend` ⚠️ 重要！ |
| **Runtime** | Python 3 |
| **Build Command** | `pip install -r requirements.txt` |
| **Start Command** | `uvicorn app.main:app --host 0.0.0.0 --port $PORT` |

#### 2.3 添加环境变量

进入服务页面 → **Environment** → 添加以下变量：

| 变量名 | 值 |
|--------|-----|
| `DATABASE_URL` | `sqlite+aiosqlite:///./data/opc_learn.db` |
| `SECRET_KEY` | 点击 **Generate** 按钮 |
| `CORS_ORIGINS` | `["https://opc-learn-demo.vercel.app", "http://localhost:3000"]` |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | `10080` |

#### 2.4 配置持久化存储

进入服务页面 → **Disks** → **Add Disk**：

| 配置项 | 值 |
|--------|-----|
| **Name** | `data` |
| **Mount Path** | `/opt/render/project/src/data` |
| **Size** | `1 GB` |

#### 2.5 开始部署

点击 **"Deploy"** 按钮，等待 2-5 分钟。

---

### 步骤 3: 连接前端

#### 3.1 获取后端 URL

部署成功后，Render 会给你一个 URL，类似：
```
https://opc-learn-backend.onrender.com
```

#### 3.2 初始化数据库

```bash
# 在终端运行
curl -X POST https://你的后端URL.onrender.com/api/v1/seed/
```

#### 3.3 配置前端环境变量

**方法 A: 使用 Vercel CLI（推荐）**

```bash
cd opc-learn-demo
vercel env add NEXT_PUBLIC_API_URL production

# 输入：https://你的后端URL.onrender.com/api/v1
```

**方法 B: 在 Vercel Dashboard 配置**

1. 访问 https://vercel.com/fattierays-projects/opc-learn-demo
2. **Settings** → **Environment Variables**
3. 添加：
   - Name: `NEXT_PUBLIC_API_URL`
   - Value: `https://你的后端URL.onrender.com/api/v1`
   - Environment: ✅ Production
4. 点击 **Save**

#### 3.4 重新部署前端

```bash
vercel --prod
```

---

## ✅ 验证部署

### 测试后端

```bash
# 1. 访问 API 文档
open https://你的后端URL.onrender.com/api/v1/docs

# 2. 测试课程 API
curl https://你的后端URL.onrender.com/api/v1/courses/

# 3. 测试用户注册
curl -X POST https://你的后端URL.onrender.com/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"phone": "13800138000", "nickname": "测试用户"}'
```

### 测试前端

访问 https://opc-learn-demo.vercel.app 并测试：

1. ✅ 注册新用户
2. ✅ 登录
3. ✅ 查看课程列表（从后端加载）
4. ✅ 提交测评
5. ✅ 查看个人档案

---

## 📊 部署架构图

```
用户浏览器
    ↓
https://opc-learn-demo.vercel.app (Vercel)
    ↓ (API 调用)
https://opc-learn-backend.onrender.com (Render)
    ↓
SQLite 数据库 (持久化存储 1GB)
```

---

## 🎯 快速检查清单

### 部署前
- [ ] 代码已推送到 GitHub
- [ ] Render 账号已注册

### 部署中
- [ ] Root Directory 设置为 `backend`
- [ ] 环境变量已添加
- [ ] 持久化存储已配置

### 部署后
- [ ] 后端 URL 可访问
- [ ] 数据库已初始化 (seed)
- [ ] 前端环境变量已配置
- [ ] 前端已重新部署

---

## 💡 重要提示

### ⚠️ Render 免费套餐特点

- **自动休眠**: 15 分钟无访问后会休眠
- **首次访问慢**: 唤醒需要 10-30 秒
- **后续访问**: 正常速度
- **存储限制**: 1 GB（足够测试）

### 🔒 安全建议

1. **SECRET_KEY**: 使用 Render 自动生成的值，不要使用默认值
2. **CORS_ORIGINS**: 只添加必要的域名
3. **生产环境**: 建议升级到付费套餐（$7/月）

---

## 🆘 常见问题

### Q1: 部署失败怎么办？

查看 Render 日志：
- Dashboard → Your Service → **Logs**
- 查看错误信息并修复

### Q2: 前端调用后端报 CORS 错误？

确保 `CORS_ORIGINS` 包含前端 URL：
```
["https://opc-learn-demo.vercel.app"]
```

### Q3: 数据重启后丢失？

检查是否配置了持久化存储（Disks）。

### Q4: 首次访问特别慢？

这是正常的，Render 免费套餐会自动休眠。访问后会唤醒。

---

## 📚 详细文档

- **完整部署指南**: [BACKEND_DEPLOYMENT_RENDER.md](./BACKEND_DEPLOYMENT_RENDER.md)
- **Vercel 前端部署**: [QUICK_DEPLOY.md](./QUICK_DEPLOY.md)
- **Render 官方文档**: https://render.com/docs

---

## 🎉 部署成功后

你将拥有：

✅ 公开访问的前端 UI  
✅ 完整的后端 API  
✅ 用户注册/登录系统  
✅ 课程浏览和筛选  
✅ 测评推荐系统  
✅ 数据持久化存储  

**可以开始小规模用户测试了！** 🚀

---

**需要帮助？查看详细文档或检查 Render 日志。**
