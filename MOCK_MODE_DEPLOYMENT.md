# Mock 数据模式 - 演示部署

## ✅ 已完成的修复

### 1. 问题诊断
- **问题 1**: 登录显示 "failed to fetch" - 后端 API 连接失败
- **问题 2**: 前端页面数据为空 - 依赖后端返回数据

### 2. 解决方案
将前端切换为 **纯 Mock 数据模式**，完全不依赖后端 API。

### 3. 核心修改

#### 文件: `src/lib/api.ts`
- 添加 `USE_MOCK = true` 开关
- 实现 `getMockData()` 函数，拦截所有 API 调用
- 将 Mock 数据（Task 格式）转换为前端期望的格式（CourseResponse/CourseDetail）
- 支持所有 API 端点：
  - ✅ `/courses` - 课程列表（支持 type 和 industry 过滤）
  - ✅ `/courses/:id` - 课程详情
  - ✅ `/auth/login` - 登录
  - ✅ `/auth/register` - 注册
  - ✅ `/users/me` - 用户信息
  - ✅ `/assessments` - 技能评估
  - ✅ `/missions` - 任务列表
  - ✅ `/circles` - 学习圈

#### 数据转换逻辑
```typescript
// Task (Mock 格式) → CourseResponse (API 格式)
{
  id: task.id,
  title: task.title,
  type: task.type,
  industry: task.industry,
  estimatedMinutes: task.estimatedMinutes,
  description: task.scenario,
  career: task.career ? { title, salaryRange } : undefined,
  activeLearners: task.activeLearners,
  recruitingSquads: task.recruitingSquads,
}
```

### 4. Mock 数据来源
- **课程/任务**: `src/lib/mock/tasks.ts` (62.9KB, 包含完整课程内容)
- **用户**: `src/lib/mock/users.ts` (6.5KB, 包含教练和学员)
- **帖子**: `src/lib/mock/posts.ts` (6.0KB)
- **小组**: `src/lib/mock/squads.ts` (5.5KB)
- **通用数据**: `src/lib/mock/data.ts` (19.2KB, 包含行业、专家、认证等)

### 5. 页面数据状态

| 页面 | Mock 数据来源 | 状态 |
|------|--------------|------|
| 首页 `/` | 静态内容 | ✅ 完整 |
| 登录 `/login` | Mock API | ✅ 完整 |
| 课程列表 `/courses` | tasks.ts (21+ 课程) | ✅ 完整 |
| 课程详情 `/courses/[id]` | tasks.ts (完整 syllabus) | ✅ 完整 |
| 学习圈 `/circles` | 本地 feedItems + posts.ts | ✅ 完整 |
| 学习圈详情 `/circles/[id]` | posts.ts + squads.ts | ✅ 完整 |
| 技能评估 `/assessment` | Mock API | ✅ 完整 |
| 发现 `/discover` | Mock API (用户 + 课程) | ✅ 完整 |
| 个人中心 `/profile` | users.ts + tasks.ts | ✅ 完整 |

## 🚀 部署信息

### 生产环境
- **URL**: https://opc-learn-demo.vercel.app
- **部署时间**: 2026-04-14
- **模式**: 纯 Mock 数据（USE_MOCK = true）

### 如何切换回后端 API
如需切换回真实后端 API：
1. 打开 `src/lib/api.ts`
2. 将 `const USE_MOCK = true` 改为 `const USE_MOCK = false`
3. 重新部署到 Vercel

## 📊 Mock 数据清单

### 课程数据
- **微技能课**: 9 门（零售 3 + 文旅 3 + 制造 3）
- **体系课**: 3 门（零售 1 + 文旅 1 + 制造 1）
- **专家课**: 3 门（来自 mock/data.ts）

### 用户数据
- **教练**: 3 人（林雪-零售、陈野-文旅、周工-制造）
- **学员**: 9 人（覆盖三个行业）
- **当前用户**: 小林（零售电商行业）

### 学习圈数据
- **动态**: 10 条（提交作业、点赞、点评、完成、帮助、认证）
- **求助**: 5 条（来自不同课程的问题）
- **小组**: 4 个（不同状态：招募中、学习中、互评中、已完成）

## ✨ 演示功能完整性

所有页面和功能现在都可以完整演示：
- ✅ 用户登录/注册（使用 mock token）
- ✅ 浏览 21+ 实训场景
- ✅ 查看课程详情（完整 syllabus、奖金池、职业路径）
- ✅ 技能评估（5 题测试，推荐行业）
- ✅ 学习圈动态流（6 种活动类型）
- ✅ 求助墙（问题列表）
- ✅ 个人中心（技能档案、荣誉等级、成长里程碑）
- ✅ 成长指南（行业趋势、同伴动态）

## 🎯 优势

1. **零依赖**: 不需要后端服务即可演示
2. **快速加载**: 无网络延迟，数据即时显示
3. **稳定可靠**: 不受后端服务状态影响
4. **完整数据**: 包含所有 21 个实训场景和完整课程内容
5. **随时切换**: 保留 `USE_MOCK` 开关，可随时切换回后端 API

## 📝 注意事项

- 登录使用任何手机号 + 验证码 `123456` 即可
- 所有数据为演示用途的静态数据
- 用户操作（如提交作业、点赞）不会持久化
- 刷新页面后数据会重置为初始状态
