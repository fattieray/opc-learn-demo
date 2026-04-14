# 🎉 腾讯云部署 - 准备完成！

## ✅ 已完成的工作

### 1. 代码改造

- ✅ 创建云函数入口文件 (`backend/index.py`)
- ✅ 更新后端依赖（添加 `mangum`, `pymysql`）
- ✅ 更新 CORS 配置（支持腾讯云域名）
- ✅ 创建云函数配置文件 (`backend/scf_bootstrap`)

### 2. 部署脚本

- ✅ 一键部署脚本 (`deploy-tencent.sh`)
  - 自动安装依赖
  - 自动登录
  - 自动构建
  - 自动部署前端和后端
  - 自动配置数据库

### 3. 配置文件

- ✅ CloudBase 配置 (`cloudbaserc.json` - 部署时自动生成)
- ✅ 环境变量配置 (`.env.production`)
- ✅ 云函数环境变量配置

### 4. 文档

- ✅ [快速开始-腾讯云部署.md](./快速开始-腾讯云部署.md) - 5 分钟快速上手
- ✅ [腾讯云部署指南.md](./腾讯云部署指南.md) - 完整技术文档
- ✅ [腾讯云vs阿里云对比.md](./腾讯云vs阿里云对比.md) - 平台对比
- ✅ [云平台选择决策表.md](./云平台选择决策表.md) - 决策指南
- ✅ [阿里云部署方案.md](./阿里云部署方案.md) - 备用方案

---

## 🚀 现在开始部署

### 步骤 1: 注册腾讯云（2 分钟）

1. 访问: https://cloud.tencent.com/
2. 点击"免费注册"
3. 微信扫码注册
4. 完成实名认证

### 步骤 2: 创建 CloudBase 环境（2 分钟）

1. 访问: https://console.cloud.tencent.com/tcb/env
2. 点击"新建环境"
3. 环境 ID: `opc-learn-prod`（或自定义）
4. 地域: 上海（推荐）
5. 记录环境 ID

### 步骤 3: 运行部署脚本（5 分钟）

```bash
# 进入项目目录
cd opc-learn-demo

# 运行一键部署脚本
./deploy-tencent.sh
```

**脚本会提示你：**
1. 输入 CloudBase 环境 ID
2. 微信扫码登录
3. 自动完成所有部署步骤

### 步骤 4: 测试访问（1 分钟）

部署完成后，访问：
```
https://你的环境ID.service.tcloudbase.net
```

---

## 📋 部署清单

部署时会自动完成：

- [x] 安装 CloudBase CLI
- [x] 微信扫码登录
- [x] 安装前端依赖（npm install）
- [x] 构建前端（npm run build）
- [x] 部署前端到静态托管
- [x] 创建后端云函数
- [x] 部署后端云函数
- [x] 配置数据库集合（courses, users, missions, circles）
- [x] 配置环境变量

---

## 💰 费用说明

### 免费额度（开发期）

| 资源 | 免费额度 | 你的用量 | 费用 |
|------|---------|---------|------|
| 静态托管 | 5GB | ~100MB | **¥0** ✅ |
| CDN 流量 | 10GB/月 | ~2GB/月 | **¥0** ✅ |
| 云函数 | 100万次/月 | ~5万次/月 | **¥0** ✅ |
| 云数据库 | 500MB | ~50MB | **¥0** ✅ |

**开发测试期总费用: ¥0/月** 🎉

### 生产环境（预估）

| 日 UV | 月费用 |
|-------|--------|
| <500 | ¥10-20 |
| 500-2000 | ¥30-50 |
| >2000 | ¥100-200 |

---

## 📊 架构说明

### 部署架构

```
用户访问
   │
   ▼
┌─────────────────────────────┐
│  CloudBase CDN               │
│  (自动 HTTPS + 加速)         │
└─────────────────────────────┘
   │
   ├─ 前端请求 → 静态托管
   │   └─ Next.js 静态文件
   │
   └─ API 请求 → 云函数
       └─ FastAPI 后端
           └─ SQLite 数据库 (/tmp)
```

### 前端

- **框架**: Next.js 14
- **部署**: CloudBase 静态托管
- **CDN**: 自动配置
- **HTTPS**: 自动配置

### 后端

- **框架**: FastAPI (Python 3.8)
- **部署**: CloudBase 云函数
- **运行时**: Python 3.8
- **内存**: 512MB
- **超时**: 30 秒

### 数据库

- **类型**: SQLite（开发期）
- **路径**: `/tmp/opc_learn.db`
- **注意**: 云函数环境 `/tmp` 是临时存储

---

## ⚠️ 重要说明

### 数据库持久化

**当前方案**: SQLite 存储在 `/tmp`
- ✅ 优点: 简单，免费
- ⚠️ 缺点: 云函数重启后数据丢失

**生产环境推荐**: 
1. 使用腾讯云云数据库 MySQL
2. 使用腾讯云文档数据库 MongoDB
3. 使用腾讯云对象存储 COS

### 数据库迁移（未来）

当需要持久化数据时：

```bash
# 1. 创建云数据库 MySQL
# 在腾讯云控制台创建

# 2. 更新环境变量
DATABASE_URL=mysql+pymysql://user:password@host:3306/opc_learn

# 3. 更新依赖
pip install pymysql cryptography

# 4. 重新部署
tcb function:deploy opc-api
```

---

## 🔧 部署后验证

### 1. 测试前端

```bash
# 访问前端
curl https://你的环境ID.service.tcloudbase.net

# 应该返回 HTML 内容
```

### 2. 测试后端

```bash
# 健康检查
curl https://你的环境ID.service.tcloudbase.net/api/v1/health

# 获取课程
curl https://你的环境ID.service.tcloudbase.net/api/v1/courses/

# 应该返回 JSON 数据
```

### 3. 测试登录

```bash
# 注册
curl -X POST https://你的环境ID.service.tcloudbase.net/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"phone":"13800138000","nickname":"测试用户"}'

# 登录
curl -X POST https://你的环境ID.service.tcloudbase.net/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"phone":"13800138000","otp":"123456"}'
```

---

## 📝 常用命令

### 查看部署状态

```bash
# 查看环境列表
tcb env:list

# 查看静态托管
tcb hosting:list

# 查看云函数
tcb function:list
```

### 重新部署

```bash
# 只部署前端
tcb hosting:deploy .next

# 只部署后端
tcb function:deploy opc-api --dir backend

# 全部部署
tcb deploy
```

### 查看日志

```bash
# 查看云函数日志
tcb function:log opc-api

# 查看实时日志
tcb function:log opc-api --tail
```

---

## 🆘 遇到问题？

### 常见问题速查

| 问题 | 解决方案 |
|------|---------|
| 部署失败 | 检查是否登录 (`tcb login`) |
| 前端空白 | 检查 `.next` 目录是否存在 |
| API 502 | 等待 1-2 分钟（云函数初始化） |
| CORS 错误 | 检查 `CORS_ORIGINS` 配置 |
| 数据库错误 | 检查 `/tmp` 权限 |

### 获取帮助

1. 📖 查看 [完整部署指南](./腾讯云部署指南.md)
2. 📖 查看 [CloudBase 官方文档](https://docs.cloudbase.net/)
3. 💬 在 GitHub 提 Issue
4. 📞 联系腾讯云客服

---

## 🎯 下一步

部署成功后：

1. ✅ **测试所有功能**
   - 课程浏览
   - 用户登录/注册
   - 测评功能
   - 课程详情

2. ✅ **导入完整数据**
   - 18 门课程
   - 12 个任务
   - 8 个学习小组

3. ✅ **配置自定义域名**（可选）
   - 购买域名
   - DNS 解析
   - SSL 证书

4. ✅ **设置监控告警**
   - CPU 使用率
   - 内存使用率
   - 错误率

5. ✅ **配置自动备份**
   - 数据库备份
   - 代码备份

---

## 📚 文档索引

| 文档 | 说明 | 适合 |
|------|------|------|
| [快速开始](./快速开始-腾讯云部署.md) | 5 分钟快速部署 | 新手 |
| [完整指南](./腾讯云部署指南.md) | 详细技术文档 | 开发者 |
| [平台对比](./腾讯云vs阿里云对比.md) | 腾讯云 vs 阿里云 | 决策者 |
| [决策表](./云平台选择决策表.md) | 快速决策指南 | 所有人 |

---

## 🎉 开始部署吧！

**预计总耗时: 10-15 分钟**

```bash
# 一条命令开始
./deploy-tencent.sh
```

**祝你部署顺利！** 🚀

如有任何问题，随时问我！
