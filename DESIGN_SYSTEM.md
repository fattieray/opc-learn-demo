# OPC Learn - 前端设计系统

**版本**: 1.0  
**更新日期**: 2026-04-13  
**状态**: 已实施

---

## 🎨 色彩系统

### 语义映射表

| 语义 | 颜色 | Tailwind | Hex | 使用场景 |
|------|------|----------|-----|---------|
| **主要行动** | 品牌绿 | `text-[#2DD4A8]` | #2DD4A8 | 主CTA按钮、完成状态、学习进度 |
| **学习相关** | 蓝色 | `text-blue-500` | #3B82F6 | 课程、学习、教育、认证信息 |
| **收入奖励** | 琥珀色 | `text-amber-500` | #F59E0B | 奖学金、积分、收入、成就徽章 |
| **社交互动** | 紫色 | `text-violet-500` | #8B5CF6 | 用户、动态、学习圈、社区 |
| **成功完成** | 绿色 | `text-green-500` | #10B981 | 完成、通过、正确、完课率 |
| **警告提示** | 橙色 | `text-orange-500` | #F97316 | 注意、警告、逾期 |
| **错误删除** | 红色 | `text-red-500` | #EF4444 | 错误、删除、失败 |
| **行业-零售** | 品牌绿 | `text-[#2DD4A8]` | #2DD4A8 | 零售电商标签 |
| **行业-文旅** | 紫色 | `text-violet-500` | #8B5CF6 | 文旅行业标签 |
| **行业-制造** | 琥珀色 | `text-amber-500` | #F59E0B | 制造B2B标签 |

### 色彩使用配额

- **品牌绿 #2DD4A8**: 20%（仅主CTA、完成状态、进度条）
- **蓝色 #3B82F6**: 20%（学习、认证、信息）
- **琥珀色 #F59E0B**: 15%（奖学金、收入、成就）
- **紫色 #8B5CF6**: 15%（社交、用户、动态）
- **中性色**: 30%（背景、边框、文字）

### 色彩层次系统

**品牌绿 #2DD4A8 层次**：
- `bg-[#2DD4A8]/5` - 最浅背景（大面积）
- `bg-[#2DD4A8]/10` - 卡片背景
- `bg-[#2DD4A8]/20` - 悬浮状态
- `border-[#2DD4A8]/30` - 边框
- `text-[#2DD4A8]` - 主色（图标、按钮）
- `bg-[#14B88C]` - hover深色

---

## 📐 排版系统

### 字号层次（6层）

| 层级 | 名称 | Tailwind | 大小 | 字重 | 颜色 | 使用场景 |
|------|------|----------|------|------|------|---------|
| 1 | 页面标题 | `text-2xl` | 24px | bold | gray-900 | 每页1个 |
| 2 | 区块标题 | `text-lg` | 18px | bold | gray-900 | 每区块1个 |
| 3 | 卡片标题 | `text-base` | 16px | semibold | gray-900 | 每张卡片1个 |
| 4 | 正文 | `text-sm` | 14px | normal | gray-700 | 主要内容 |
| 5 | 辅助文字 | `text-xs` | 12px | normal | gray-600 | 描述、时间 |
| 6 | 微文字 | `text-[10px]` | 10px | normal | gray-500 | 标签、时间戳 |

### 文字颜色系统（WCAG AA合规）

| 用途 | Tailwind | Hex | 对比度 | 状态 |
|------|----------|-----|--------|------|
| 标题 | `text-gray-900` | #111827 | 15.4:1 | ✓✓✓ |
| 正文 | `text-gray-700` | #374151 | 10.3:1 | ✓✓ |
| 辅助 | `text-gray-600` | #4b5563 | 5.7:1 | ✓ |
| 次要 | `text-gray-500` | #6b7280 | 4.6:1 | ✓（≥14px） |
| 禁用 | ~~`text-gray-400`~~ | ~~#9ca3af~~ | 2.8:1 | ✗ 已弃用 |

**重要**：不再使用 `text-gray-400`，统一使用 `text-gray-500` 作为最浅文字颜色。

### 行高规范

| 字号 | 单行 | 多行 |
|------|------|------|
| 标题（text-lg以上） | `leading-tight` (1.25) | `leading-snug` (1.375) |
| 正文（text-sm, base） | `leading-normal` (1.5) | `leading-relaxed` (1.625) |
| 辅助（text-xs及以下） | `leading-4` (16px) | `leading-5` (20px) |

### 字重规范

| 字重 | Tailwind | 值 | 使用场景 |
|------|----------|-----|---------|
| Bold | `font-bold` | 700 | 页面标题、区块标题、关键数字 |
| Semibold | `font-semibold` | 600 | 卡片标题、按钮文字、重要标签 |
| Medium | `font-medium` | 500 | 链接文字、次要按钮、强调文字 |
| Normal | `font-normal` | 400 | 正文、辅助文字、所有非强调文字 |

---

## 📏 间距系统（8pt Grid）

### 内边距（Padding）

| 类型 | Tailwind | 大小 | 使用场景 |
|------|----------|------|---------|
| 紧凑卡片 | `p-3` | 12px | 小卡片、列表项 |
| 标准卡片 | `p-4` | 16px | 大部分卡片 ✓ |
| 宽松卡片 | `p-6` | 24px | 重要内容、Hero区 |
| 页面容器 | `px-4 sm:px-6` | 16/24px | 页面边距 |

### 外边距（Margin）

| 类型 | Tailwind | 大小 | 使用场景 |
|------|----------|------|---------|
| 元素间距 | `space-y-2` | 8px | 紧凑列表、相关元素 |
| 卡片间距 | `space-y-3` | 12px | 标准列表 ✓ |
| 区块间距 | `space-y-4` | 16px | 大区块分隔 |
| 页面间距 | `pb-20` | 80px | 底部导航留白 ✓ |

### 水平间距（Gap）

| 类型 | Tailwind | 大小 | 使用场景 |
|------|----------|------|---------|
| 图标+文字 | `gap-1.5` | 6px | 图标与文字组合 |
| 标准间距 | `gap-3` | 12px | 卡片元素 ✓ |
| 宽松间距 | `gap-4` | 16px | 大元素 |
| 双栏布局 | `gap-4 md:gap-6` | 16/24px | 响应式网格 |

---

## 🎴 卡片组件系统

### 6种标准卡片

#### 1. 默认卡片（Default Card）
```tsx
<Card>
  {content}
</Card>
```
**样式**: `bg-white rounded-xl p-4 border border-gray-100 shadow-sm`  
**使用**: 大部分内容

#### 2. 强调卡片（Emphasis Card）
```tsx
<Card variant="emphasis">
  {important content}
</Card>
```
**样式**: `bg-white rounded-xl p-4 border-l-4 border-[#2DD4A8] shadow-md`  
**使用**: 重要内容、CTA

#### 3. 信息卡片（Info Card）
```tsx
<Card variant="info">
  {information}
</Card>
```
**样式**: `bg-blue-50 rounded-xl p-4 border border-blue-100`  
**使用**: 提示、说明

#### 4. 成功卡片（Success Card）
```tsx
<Card variant="success">
  {success message}
</Card>
```
**样式**: `bg-green-50 rounded-xl p-4 border border-green-100`  
**使用**: 完成、成就

#### 5. 警告卡片（Warning Card）
```tsx
<Card variant="warning">
  {warning message}
</Card>
```
**样式**: `bg-amber-50 rounded-xl p-4 border border-amber-100`  
**使用**: 注意、警告

#### 6. 渐变卡片（Gradient Card）
```tsx
<Card variant="gradient">
  {hero content}
</Card>
```
**样式**: `bg-gradient-to-br from-[#2DD4A8] to-[#14B88C] text-white rounded-xl p-6 shadow-lg`  
**使用**: Header、特殊展示

---

## 🔘 圆角系统

| 元素 | Tailwind | 大小 | 使用场景 |
|------|----------|------|---------|
| 小圆角 | `rounded-md` | 6px | 标签（方形）、输入框 |
| 中圆角 | `rounded-lg` | 8px | 按钮、输入框 ✓ |
| 大圆角 | `rounded-xl` | 12px | 卡片 ✓ |
| 超大圆角 | `rounded-2xl` | 16px | 大卡片、Hero区 |
| 圆形 | `rounded-full` | 100% | 头像、标签（药丸形） |

**规则**：
- 交互元素（按钮、输入）：8px
- 内容容器（卡片）：12px
- 特殊展示（Hero）：16px

---

## 🌑 阴影系统

| 阴影 | Tailwind | 使用场景 |
|------|----------|---------|
| 无阴影 | `shadow-none` | 扁平卡片、次要内容 |
| 小阴影 | `shadow-sm` | 默认卡片 ✓、列表项 |
| 中阴影 | `shadow` | 悬浮状态、弹窗 |
| 大阴影 | `shadow-md` | 模态框、强调卡片 |
| 超大阴影 | `shadow-lg` | Hero区、渐变卡片 |

**规则**：
- 大部分卡片：`shadow-sm`
- 悬浮时：`shadow-md`
- 弹出层：`shadow-lg`
- 避免使用 `shadow-xl`（过重）

---

## ♿ 无障碍性

### 触控区域

**最小触控区域**: 44x44px（Apple HIG标准）

```tsx
// 图标按钮
<button className="p-3 min-w-[44px] min-h-[44px]">
  <Icon size={20} />
</button>

// 标签链接
<Link className="px-4 py-2 min-h-[44px] inline-flex items-center">
  标签文字
</Link>

// 列表项
<button className="p-4 min-h-[44px] w-full">
  列表内容
</button>
```

### 对比度要求（WCAG 2.1 AA）

- **正常文字**（<18px）: 4.5:1 最低
- **大文字**（≥18px）: 3:1 最低

**已修正的对比度问题**：
- ✅ `text-gray-500` on `bg-white`: 4.6:1
- ✅ `text-gray-600` on `bg-gray-50`: 5.7:1
- ✅ `text-gray-700` on `bg-white`: 10.3:1
- ✅ `text-gray-900` on `bg-white`: 15.4:1

---

## 🎯 使用示例

### Dashboard页面布局

```tsx
<div className="min-h-screen bg-gray-50 pb-20">
  {/* Header - 渐变卡片 */}
  <header className="bg-gradient-to-br from-[#2DD4A8] to-[#14B88C] text-white">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
      <h1 className="text-2xl font-bold mb-1">你好，用户名 👋</h1>
      <p className="text-sm text-white/90">继续今天的学习之旅吧！</p>
      
      {/* 统计卡片 - 多色区分 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        <StatCard icon={<IconUsers />} label="活跃学员" value="1,247" color="blue" />
        <StatCard icon={<IconCoins />} label="奖学金" value="¥156K" color="amber" />
        <StatCard icon={<IconCheckCircle />} label="完课率" value="89%" color="green" />
        <StatCard icon={<IconTarget />} label="实训场景" value="21" color="violet" />
      </div>
    </div>
  </header>

  {/* 主要内容区 */}
  <main className="max-w-6xl mx-auto px-4 sm:px-6 -mt-4 space-y-4">
    {/* 今日任务 - 强调卡片 */}
    <Card variant="emphasis">
      <h2 className="text-lg font-bold text-gray-900 mb-3">今日学习任务</h2>
      {tasks}
    </Card>

    {/* 继续学习 - 默认卡片 */}
    <Card>
      <h2 className="text-lg font-bold text-gray-900 mb-3">继续学习</h2>
      {courses}
    </Card>

    {/* 双栏布局 */}
    <div className="grid md:grid-cols-2 gap-4">
      <Card>
        <h3 className="text-base font-semibold text-gray-900">荣誉成就</h3>
      </Card>
      <Card>
        <h3 className="text-base font-semibold text-gray-900">学习圈动态</h3>
      </Card>
    </div>

    {/* 信息提示 */}
    <InfoBanner title="学习提示">
      保持每天学习30分钟，完课率提升50%！
    </InfoBanner>
  </main>

  <BottomNav />
</div>
```

---

## 📝 检查清单

### 开发前检查

- [ ] 使用正确的色彩语义（查映射表）
- [ ] 使用正确的字号层次（6层系统）
- [ ] 使用标准卡片组件（6种变体）
- [ ] 文字对比度符合WCAG AA（≥4.5:1）
- [ ] 触控区域≥44x44px
- [ ] 间距使用8pt Grid系统

### 代码审查检查

- [ ] 没有使用 `text-gray-400`（已弃用）
- [ ] 品牌绿使用率≤20%
- [ ] 卡片样式统一（使用Card组件）
- [ ] 字号层次正确（标题>区块>卡片>正文）
- [ ] 圆角符合规范（卡片12px，按钮8px）
- [ ] 阴影使用合理（默认sm，悬浮md）

---

## 🚀 快速开始

### 1. 导入组件

```tsx
import { Card, StatCard, ActionCard, InfoBanner } from "@/components/Cards";
```

### 2. 使用标准组件

```tsx
// 默认卡片
<Card>内容</Card>

// 强调卡片
<Card variant="emphasis">重要内容</Card>

// 统计卡片
<StatCard icon={<Icon />} label="标签" value="100" color="blue" />

// 信息横幅
<InfoBanner title="提示">内容</InfoBanner>
```

### 3. 遵循命名规范

```tsx
// ✅ 好的命名
text-gray-900  // 标题
text-gray-700  // 正文
text-gray-600  // 辅助
text-gray-500  // 次要

// ❌ 坏的命名
text-gray-400  // 已弃用（对比度不足）
text-[#2DD4A8] // 除非是主CTA，否则不要直接用品牌色
```

---

**维护者**: Development Team  
**最后更新**: 2026-04-13  
**下次审查**: 2026-05-13
