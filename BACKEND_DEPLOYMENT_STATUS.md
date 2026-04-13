# 🚀 OPC Learning Hub 后端部署 - 自动化部署报告

## 📊 自动化部署尝试结果

### ✅ 已完成的步骤

1. ✅ **Railway CLI 检查** - 已安装并登录
2. ✅ **项目链接** - 成功链接到 "OPC-hub" 项目
3. ✅ **代码上传** - 成功上传到 Railway
4. ✅ **部署启动** - 部署已开始执行
5. ✅ **SECRET_KEY 生成** - 已生成安全密钥

### ❌ 遇到的问题

**问题：部署失败 (FAILED)**

**可能原因：**
1. Railway 在根目录未找到 Python 项目（代码在 `backend/` 子目录）
2. 环境变量还未设置
3. railway.json 配置可能未被正确识别

---

## 🔧 解决方案 - 通过 Railway Dashboard 部署（推荐）

由于 CLI 自动化遇到目录结构问题，**通过 Railway Dashboard 部署会更简单可靠**。

### 步骤 1: 打开 Railway Dashboard

```bash
# 在浏览器打开
open https://railway.com/project/3ca43840-831a-43e3-9310-3a7f2d17b917
```

或直接访问：https://railway.com 并找到 "OPC-hub" 项目

---

### 步骤 2: 创建新服务

1. 在项目中点击 **"New"**
2. 选择 **"GitHub Repo"**
3. 连接你的 GitHub 仓库（如果还没连接）
4. 选择仓库

---

### 步骤 3: 配置服务

在 Railway Dashboard 中配置：

#### 3.1 设置 Root Directory

在 Service Settings 中：
- **Root Directory**: `backend` ⚠️ **这很重要！**

#### 3.2 配置环境变量

点击 **Variables** 标签，添加：

| 变量名 | 值 |
|--------|-----|
| `DATABASE_URL` | `sqlite+aiosqlite:///./data/opc_learn.db` |
| `SECRET_KEY` | `ZHCDSTaT-zq1C4Nc0_FDDW8HGpZlMtnyuoRVpMDK4fk` |
| `CORS_ORIGINS` | `["https://opc-learn-demo.vercel.app", "http://localhost:3000"]` |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | `10080` |

#### 3.3 检查构建配置

Railway 会自动检测 Python 项目，应该看到：
- **Builder**: Nixpacks
- **Build Command**: `pip install -r requirements.txt`
- **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

如果没自动检测到，手动设置：
- **Build Command**: `pip install -r requirements.txt`
- **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

---

### 步骤 4: 部署

点击 **"Deploy"** 按钮，等待 3-5 分钟。

---

### 步骤 5: 生成域名

部署成功后：
1. 进入服务页面
2. 点击 **"Settings"**
3. 找到 **"Domains"** 或 **"Networking"**
4. 点击 **"Generate Domain"**

你会获得类似这样的 URL：
```
https://opc-hub-production-xxxx.up.railway.app
```

---

### 步骤 6: 初始化数据库

```bash
# 替换为你的实际域名
BACKEND_URL="https://你的域名.up.railway.app"

# 初始化数据库
curl -X POST $BACKEND_URL/api/v1/seed/

# 测试课程 API
curl $BACKEND_URL/api/v1/courses/
```

---

### 步骤 7: 连接前端

```bash
# 配置 Vercel 环境变量
vercel env add NEXT_PUBLIC_API_URL production

# 输入：https://你的域名.up.railway.app/api/v1

# 重新部署前端
vercel --prod
```

---

## 📝 为什么 CLI 自动化失败了？

### 问题根源

Railway CLI 的 `railway up` 命令会上传**当前目录**的所有文件，但你的项目结构是：

```
opc-learn-demo/
├── backend/          ← Python 代码在这里
│   ├── app/
│   └── requirements.txt
├── src/              ← Next.js 前端代码
└── railway.json
```

Railway 在根目录没有找到 `requirements.txt`，所以部署失败。

### 解决方案选择

**方案 A: Railway Dashboard（推荐）**
- ✅ 可以指定 Root Directory
- ✅ 可视化配置
- ✅ 更容易调试

**方案 B: 分离仓库**
- 将 `backend/` 放到独立的 Git 仓库
- 然后使用 CLI 部署

**方案 C: 使用 Render**
- Render 的 `render.yaml` 支持 `rootDir` 配置
- 更适合 monorepo 结构

---

## 🎯 快速操作清单

### 立即执行（5 分钟）

- [ ] 打开 Railway Dashboard
- [ ] 创建新服务（从 GitHub）
- [ ] 设置 Root Directory 为 `backend`
- [ ] 添加 4 个环境变量
- [ ] 点击 Deploy

### 部署后（5 分钟）

- [ ] 生成域名
- [ ] 测试 API (`/api/v1/seed/`)
- [ ] 配置前端环境变量
- [ ] 重新部署前端

### 验证（5 分钟）

- [ ] 访问前端 URL
- [ ] 测试用户注册
- [ ] 测试登录
- [ ] 查看课程列表
- [ ] 提交测评

---

## 💡 提示和技巧

### Railway 免费额度

- **$5 免费信用** - 足够测试 1-2 个月
- **5GB 存储** - 包含持久化存储
- **自动休眠** - ❌ Railway **不会**自动休眠

### 环境变量管理

可以在 Dashboard 中随时修改环境变量，修改后会自动重新部署。

### 日志查看

在 Dashboard 中点击 **"Deployments"** → 选择最新部署 → 查看实时日志

---

## 🆘 故障排查

### 如果部署仍然失败

1. **检查日志**
   - Dashboard → Deployments → 查看错误信息

2. **常见错误**
   - `requirements.txt not found` → Root Directory 设置错误
   - `ModuleNotFoundError` → 依赖缺失
   - `Port not available` → 确保使用 `$PORT` 环境变量

3. **重新部署**
   - Dashboard → Deployments → Redeploy

### 如果 API 无法访问

1. **检查域名**
   ```bash
   # 确保已生成域名
   # Dashboard → Settings → Domains
   ```

2. **检查 CORS**
   ```bash
   # 确保 CORS_ORIGINS 包含前端 URL
   ["https://opc-learn-demo.vercel.app"]
   ```

3. **测试后端**
   ```bash
   curl https://你的域名/api/v1/docs
   ```

---

## 📊 部署架构（最终）

```
用户浏览器
    ↓
https://opc-learn-demo.vercel.app (Vercel - 前端)
    ↓ (API 调用)
https://opc-hub-production-xxxx.up.railway.app (Railway - 后端)
    ↓
SQLite 数据库 (Railway 持久化存储)
```

---

## 🎉 成功标志

完成后，你应该能够：

✅ 访问后端 API 文档  
✅ 调用课程列表 API  
✅ 注册新用户  
✅ 提交测评  
✅ 前端正常调用后端  
✅ 数据持久化保存  

---

## 📞 需要帮助？

- **Railway 文档**: https://docs.railway.app
- **项目 Dashboard**: https://railway.com/project/3ca43840-831a-43e3-9310-3a7f2d17b917
- **查看日志**: Dashboard → Deployments → Logs

---

**下一步：打开 Railway Dashboard 并按照上面的步骤操作！** 🚀

预计完成时间：**15 分钟**
