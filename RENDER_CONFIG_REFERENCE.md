# 📋 Render 部署配置 - 复制粘贴参考

## 服务配置

### 基本信息
- **服务名称**: `opc-learn-backend`
- **环境**: `Python`
- **区域**: `Oregon`
- **分支**: `main`

### Build 配置
- **Build Command**: `pip install -r requirements.txt`
- **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

### Root Directory（重要！）
```
backend
```

---

## 环境变量（逐个添加）

### 1. DATABASE_URL
```
KEY: DATABASE_URL
VALUE: sqlite+aiosqlite:///./data/opc_learn.db
```

### 2. SECRET_KEY
```
KEY: SECRET_KEY
VALUE: hOltBkwhvDNqNOCyYrm864wcpV3JVuc9CBPiyEGca1c
```

### 3. CORS_ORIGINS
```
KEY: CORS_ORIGINS
VALUE: ["https://opc-learn-demo.vercel.app", "http://localhost:3000"]
```

### 4. ACCESS_TOKEN_EXPIRE_MINUTES
```
KEY: ACCESS_TOKEN_EXPIRE_MINUTES
VALUE: 10080
```

---

## 持久化存储（Disk）

点击 **"Add Disk"** 按钮，然后填写：

```
Name: data
Mount Path: /opt/render/project/src/data
Size: 1 GB
```

---

## 部署检查清单

在点击 "Apply" 之前，确认：

- [ ] 服务名称: `opc-learn-backend` ✅
- [ ] Root Directory: `backend` ✅
- [ ] Build Command: `pip install -r requirements.txt` ✅
- [ ] Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT` ✅
- [ ] DATABASE_URL 已添加 ✅
- [ ] SECRET_KEY 已添加 ✅
- [ ] CORS_ORIGINS 已添加 ✅
- [ ] ACCESS_TOKEN_EXPIRE_MINUTES 已添加 ✅
- [ ] Disk 已配置 (data, 1GB) ✅

---

## 部署后

点击 **"Apply"** 按钮开始部署。

部署时间：约 5 分钟

部署成功后，你会看到：
```
https://opc-learn-backend.onrender.com
```

**请把这个 URL 告诉我，我会自动完成剩余配置！**
