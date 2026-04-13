# 🚀 Railway CLI 后端部署 - 分步指南

## 准备工作 ✅

已完成：
- ✅ Railway CLI 已安装
- ✅ 已登录 Railway (416769918@qq.com)
- ✅ 部署配置文件已创建 (railway.json)
- ✅ 后端代码已就绪

---

## 📝 部署步骤（3 个命令完成）

### 步骤 1: 初始化 Railway 项目

```bash
cd "/Users/xangwei/Documents/10-工作文件夹/OpenCode/OPC Learning Hub/opc-learn-demo"

# 链接或创建 Railway 项目
railway init
```

**操作提示：**
- 选择 workspace: `fattieray's Projects`
- 输入项目名称: `opc-learn-backend`
- 按回车确认

---

### 步骤 2: 设置环境变量

```bash
# 生成安全的 SECRET_KEY
SECRET_KEY=$(python3 -c "import secrets; print(secrets.token_urlsafe(32))")

# 一次性设置所有环境变量
railway variables set \
  DATABASE_URL="sqlite+aiosqlite:///./data/opc_learn.db" \
  SECRET_KEY="$SECRET_KEY" \
  CORS_ORIGINS='["https://opc-learn-demo.vercel.app", "http://localhost:3000"]' \
  ACCESS_TOKEN_EXPIRE_MINUTES="10080"
```

**验证环境变量：**
```bash
railway variables
```

应该看到：
```
DATABASE_URL=sqlite+aiosqlite:///./data/opc_learn.db
SECRET_KEY=(随机字符串)
CORS_ORIGINS=["https://opc-learn-demo.vercel.app", "http://localhost:3000"]
ACCESS_TOKEN_EXPIRE_MINUTES=10080
```

---

### 步骤 3: 部署到 Railway

```bash
# 部署后端（--detach 表示后台部署）
railway up --detach
```

**部署过程：**
1. Railway 会检测 Python 项目
2. 自动安装 requirements.txt 中的依赖
3. 启动 FastAPI 应用
4. 分配域名

**预计时间：** 3-5 分钟

---

## ✅ 验证部署

### 查看部署状态

```bash
# 查看实时日志
railway logs

# 或查看项目状态
railway status
```

### 获取后端域名

```bash
railway domain
```

会返回类似：
```
https://opc-learn-backend-production-xxxx.up.railway.app
```

### 测试 API

```bash
# 替换为你的实际域名
BACKEND_URL="https://你的域名.up.railway.app"

# 1. 测试 API 文档
curl $BACKEND_URL/api/v1/docs

# 2. 初始化数据库
curl -X POST $BACKEND_URL/api/v1/seed/

# 3. 测试课程列表
curl $BACKEND_URL/api/v1/courses/

# 4. 测试用户注册
curl -X POST $BACKEND_URL/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"phone": "13800138000", "nickname": "测试用户"}'
```

---

## 🔗 连接前端

### 配置 Vercel 环境变量

```bash
# 获取后端 URL
BACKEND_URL=$(railway domain)

# 添加到 Vercel
vercel env add NEXT_PUBLIC_API_URL production

# 输入：${BACKEND_URL}/api/v1
# 例如：https://opc-learn-backend-production-xxxx.up.railway.app/api/v1
```

### 重新部署前端

```bash
vercel --prod
```

---

## 🎯 一键部署脚本（可选）

我已经创建了自动化脚本，可以一键完成所有步骤：

```bash
cd opc-learn-demo
./deploy-backend.sh
```

脚本会自动：
- ✅ 检查 Railway CLI 和登录状态
- ✅ 链接/创建项目
- ✅ 生成 SECRET_KEY
- ✅ 设置所有环境变量
- ✅ 启动部署
- ✅ 提供后续步骤提示

---

## 📊 部署架构

```
用户浏览器
    ↓
https://opc-learn-demo.vercel.app (Vercel)
    ↓ (API 调用)
https://opc-learn-backend-production-xxxx.up.railway.app (Railway)
    ↓
SQLite 数据库 (Railway 持久化存储)
```

---

## 🔧 常用命令

```bash
# 查看项目信息
railway status

# 查看日志
railway logs

# 查看域名
railway domain

# 添加域名
railway domain add your-domain.com

# 重新部署
railway up

# 打开 Dashboard
railway open

# 查看环境变量
railway variables

# 更新环境变量
railway variables set KEY=value
```

---

## ⚠️ 重要提示

### Railway 免费套餐

- **额度**: $5 免费信用
- **用途**: 足够测试使用（约 1-2 个月）
- **存储**: 包含 5GB 持久化存储
- **带宽**: 足够测试流量

### 数据库持久化

Railway 会自动持久化数据，无需额外配置。SQLite 文件会保存在项目目录中。

### 自动部署

如果连接了 GitHub，每次 push 到 main 分支会自动触发部署。

---

## 🆘 故障排查

### 问题 1: 部署失败

```bash
# 查看详细日志
railway logs

# 常见错误：
# - 依赖安装失败 → 检查 requirements.txt
# - 启动命令错误 → 检查 railway.json
# - 端口配置错误 → 确保使用 $PORT 环境变量
```

### 问题 2: 环境变量未生效

```bash
# 检查环境变量
railway variables

# 重新设置
railway variables set KEY=value

# 重新部署
railway up
```

### 问题 3: CORS 错误

确保 `CORS_ORIGINS` 包含前端 URL：

```bash
railway variables set CORS_ORIGINS='["https://opc-learn-demo.vercel.app", "http://localhost:3000"]'
railway up
```

### 问题 4: 数据库丢失

Railway 会自动持久化数据。如果数据丢失：

```bash
# 检查存储
railway volumes

# 重新初始化数据库
curl -X POST https://你的域名/api/v1/seed/
```

---

## 📈 监控和维护

### 查看性能指标

```bash
# 打开 Railway Dashboard
railway open

# 在 Dashboard 中可以看到：
# - CPU 使用率
# - 内存使用
# - 网络流量
# - 部署历史
```

### 设置告警（可选）

在 Railway Dashboard 中：
1. 进入项目设置
2. 配置 email 告警
3. 设置资源使用阈值

---

## 🎉 部署成功检查清单

完成后确认：

- [ ] Railway 项目已创建
- [ ] 环境变量已配置
- [ ] 部署成功（日志无错误）
- [ ] 后端域名可访问
- [ ] API 文档正常显示
- [ ] 数据库已初始化 (seed)
- [ ] 前端已配置 NEXT_PUBLIC_API_URL
- [ ] 前端可以调用后端 API
- [ ] 用户注册/登录正常
- [ ] 数据持久化正常

---

## 💰 成本管理

### 当前成本：免费

- Railway: $5 免费额度
- Vercel: 免费套餐
- 预计可用时间：1-2 个月

### 如需长期使用

**方案 1: Railway 付费**
- 按需付费
- 约 $5-10/月

**方案 2: 迁移到 Render**
- 免费套餐永久可用
- 付费 $7/月（不休眠）

**方案 3: 使用多个免费平台**
- Railway ($5) + Render (免费)
- 交替使用

---

## 📚 相关文档

- **Railway 文档**: https://docs.railway.app
- **快速部署指南**: [BACKEND_DEPLOY_QUICK.md](./BACKEND_DEPLOY_QUICK.md)
- **完整部署指南**: [BACKEND_DEPLOYMENT_RENDER.md](./BACKEND_DEPLOYMENT_RENDER.md)
- **前端部署**: [QUICK_DEPLOY.md](./QUICK_DEPLOY.md)

---

**开始部署吧！** 🚀

按照上面的 3 个步骤操作，10 分钟内即可完成部署。
