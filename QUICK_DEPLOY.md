# 🚀 OPC Learning Hub - 快速部署到 Vercel

## 一键部署（推荐）

### 步骤 1: 运行部署脚本

```bash
cd opc-learn-demo
./deploy.sh
```

脚本会自动：
- ✅ 检查 Vercel CLI 是否安装
- ✅ 验证登录状态
- ✅ 部署到 Vercel
- ✅ 提供访问 URL

### 步骤 2: 首次登录 Vercel

如果是首次使用，会要求登录：
```bash
vercel login
# 选择 GitHub 账号登录
```

### 步骤 3: 完成部署

按照提示操作：
```
? Set up and deploy? Y
? Which scope? (选择你的账号)
? Link to existing project? N
? What's your project's name? opc-learn-demo
? In which directory is your code located? ./
? Want to override the settings? N
```

部署成功后，你会看到：
```
🔍  Inspect: https://vercel.com/xxx/xxx
✅  Production: https://opc-learn-demo-xxx.vercel.app
```

**恭喜！你的应用已上线！** 🎉

---

## 手动部署

### 方法 1: 使用 Vercel CLI

```bash
# 1. 安装 Vercel CLI
npm i -g vercel

# 2. 登录
vercel login

# 3. 部署
cd opc-learn-demo
vercel --prod
```

### 方法 2: 使用 Vercel 网站

1. **准备 GitHub 仓库**
   ```bash
   cd opc-learn-demo
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **在 Vercel 网站部署**
   - 访问 https://vercel.com
   - 点击 "Add New Project"
   - 导入 GitHub 仓库
   - 配置（自动检测 Next.js）
   - 点击 "Deploy"

---

## 部署后配置

### 选项 1: 仅前端（使用 Mock 数据）

部署完成后即可访问，所有数据来自 Mock 文件。

**适合：** 快速演示、UI 测试

**访问：** `https://your-app.vercel.app`

### 选项 2: 前端 + 后端（完整功能）

#### 步骤 1: 部署后端

参考 [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) 部署后端到 Render 或 Railway。

#### 步骤 2: 配置前端环境变量

在 Vercel Dashboard 中：
1. 进入项目 → Settings → Environment Variables
2. 添加变量：
   ```
   Name: NEXT_PUBLIC_API_URL
   Value: https://your-backend.onrender.com/api/v1
   ```
3. 重新部署：
   ```bash
   vercel --prod
   ```

---

## 验证部署

### 访问测试

打开浏览器访问你的 Vercel URL，测试以下功能：

- ✅ 首页加载
- ✅ 课程列表显示
- ✅ 课程详情查看
- ✅ 用户注册/登录（如已连接后端）
- ✅ 测评提交（如已连接后端）

### API 测试（如已连接后端）

```bash
# 测试后端连接
curl https://your-backend.onrender.com/api/v1/courses/

# 应该返回课程列表 JSON
```

---

## 自定义域名（可选）

### 在 Vercel 添加自定义域名

```bash
# 添加域名
vercel domains add your-domain.com

# 按照提示配置 DNS
```

或在 Vercel Dashboard 中：
1. Project Settings → Domains
2. 添加你的域名
3. 按照提示配置 DNS 记录

---

## 常见问题

### Q1: 部署后显示 404

**原因：** 构建失败或路由配置错误

**解决：**
```bash
# 本地测试构建
npm run build

# 如果有错误，修复后重新部署
vercel --prod --force
```

### Q2: 页面加载但没有数据

**原因：** 前端使用 Mock 数据，后端未连接

**解决：** 这是预期行为。如需连接后端，参考"选项 2"配置环境变量。

### Q3: 构建失败

**常见错误：** Node.js 版本不兼容

**解决：**
```bash
# 检查 Node 版本（需要 18+）
node -v

# 升级 Node.js
nvm install 18
nvm use 18
```

### Q4: 环境变量不生效

**原因：** 部署后添加的环境变量需要重新部署

**解决：**
```bash
# 添加环境变量后重新部署
vercel --prod
```

---

## 更新部署

每次代码更新后：

```bash
# 1. 提交代码
git add .
git commit -m "Update description"
git push

# 2. 部署到 Vercel
vercel --prod
```

或在 Vercel Dashboard 中点击 "Redeploy"。

---

## 性能优化

### 启用 Vercel Analytics

```bash
vercel analytics enable
```

### 配置缓存

已自动配置，无需额外设置。

---

## 监控和日志

### 查看部署日志

```bash
# 查看最近部署
vercel ls

# 查看特定部署日志
vercel logs <deployment-url>
```

### 实时监控

访问 Vercel Dashboard → Your Project → 查看实时数据。

---

## 部署检查清单

部署前确认：

- [ ] 代码已提交到 Git
- [ ] 本地构建成功 (`npm run build`)
- [ ] 已登录 Vercel (`vercel login`)
- [ ] `.env.local` 未提交到 Git（已在 .gitignore 中）
- [ ] `vercel.json` 已配置

部署后验证：

- [ ] 访问 URL 正常加载
- [ ] 所有页面可访问
- [ ] 无控制台错误
- [ ] 响应式设计正常（移动端测试）
- [ ] （如连接后端）API 调用正常

---

## 技术支持

- **Vercel 文档**: https://vercel.com/docs
- **Next.js 部署**: https://nextjs.org/docs/deployment
- **问题反馈**: 查看项目 Issues

---

## 快速命令参考

```bash
# 首次部署
./deploy.sh

# 重新部署
vercel --prod

# 查看部署状态
vercel ls

# 查看日志
vercel logs

# 添加环境变量
vercel env add NEXT_PUBLIC_API_URL

# 自定义域名
vercel domains add your-domain.com
```

---

**祝你部署顺利！** 🚀

如有问题，请查看 [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) 获取详细指南。
