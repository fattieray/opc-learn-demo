"use client";
import { useState } from "react";
import Link from "next/link";
import {
  IconArrowLeft, IconBookmark, IconFileText, IconClock, IconChevronRight,
  IconSearch,
} from "@/components/Icons";
import { tasks } from "@/lib/mock/tasks";
import { industries } from "@/lib/mock/data";

const resourceTypeNames: Record<string, string> = {
  framework: "框架",
  method: "方法",
  template: "模板",
  case: "案例",
  checklist: "清单",
  pitfall: "避坑",
};
const resourceTypeColors: Record<string, string> = {
  framework: "bg-violet-50 text-violet-700",
  method: "bg-blue-50 text-blue-700",
  template: "bg-emerald-50 text-emerald-700",
  case: "bg-amber-50 text-amber-700",
  checklist: "bg-rose-50 text-rose-700",
  pitfall: "bg-red-50 text-red-700",
};

// Extended bookmark data from multiple courses
const allBookmarks = [
  {
    id: "bm-1",
    resourceId: "res-1",
    resourceTitle: "AIDA文案框架",
    resourceType: "framework",
    courseTitle: "小红书种草文案速成",
    courseId: "r-micro-01",
    courseIndustry: "retail",
    savedAt: "2026-04-12",
    readTime: 5,
    summary: "Attention-Interest-Desire-Action经典框架，适用于所有种草文案开头"
  },
  {
    id: "bm-2",
    resourceId: "res-5",
    resourceTitle: "5感写作法实操指南",
    resourceType: "method",
    courseTitle: "小红书旅行种草笔记速写",
    courseId: "t-micro-01",
    courseIndustry: "tourism",
    savedAt: "2026-04-10",
    readTime: 8,
    summary: "视觉、听觉、嗅觉、味觉、触觉五感描写技巧，让旅行笔记更生动"
  },
  {
    id: "bm-3",
    resourceId: "res-8",
    resourceTitle: "B2B产品详情页模板",
    resourceType: "template",
    courseTitle: "1688产品详情页文案速写",
    courseId: "m-micro-01",
    courseIndustry: "manufacturing",
    savedAt: "2026-04-08",
    readTime: 6,
    summary: "标准B2B产品详情页结构：痛点-方案-优势-案例-行动"
  },
  {
    id: "bm-4",
    resourceId: "res-12",
    resourceTitle: "母婴品牌种草案例拆解",
    resourceType: "case",
    courseTitle: "为母婴品牌写3条小红书种草文案",
    courseId: "r-task-01",
    courseIndustry: "retail",
    savedAt: "2026-04-05",
    readTime: 10,
    summary: "某知名母婴品牌如何通过情感共鸣和场景化描述实现爆款"
  },
  {
    id: "bm-5",
    resourceId: "res-15",
    resourceTitle: "文案发布前检查清单",
    resourceType: "checklist",
    courseTitle: "电商详情页卖点提炼",
    courseId: "r-micro-02",
    courseIndustry: "retail",
    savedAt: "2026-04-03",
    readTime: 3,
    summary: "10项必检项目：标题、关键词、行动号召、排版等"
  },
  {
    id: "bm-6",
    resourceId: "res-18",
    resourceTitle: "旅行叙事常见误区",
    resourceType: "pitfall",
    courseTitle: "为旅游公司写1篇云南旅行笔记",
    courseId: "t-task-01",
    courseIndustry: "tourism",
    savedAt: "2026-04-01",
    readTime: 7,
    summary: "避免流水账、过度修饰、缺乏个人体验等常见问题"
  },
  {
    id: "bm-7",
    resourceId: "res-20",
    resourceTitle: "私域社群文案节奏设计",
    resourceType: "method",
    courseTitle: "为美妆品牌私域社群设计一周早安文案",
    courseId: "r-task-03",
    courseIndustry: "retail",
    savedAt: "2026-03-28",
    readTime: 9,
    summary: "7天文案节奏：周一至周日的不同主题和情绪设计"
  },
  {
    id: "bm-8",
    resourceId: "res-22",
    resourceTitle: "工业设备文案转化技巧",
    resourceType: "case",
    courseTitle: "为B2B机械设备写产品详情页",
    courseId: "m-task-01",
    courseIndustry: "manufacturing",
    savedAt: "2026-03-25",
    readTime: 11,
    summary: "如何将技术参数转化为客户价值主张的实战案例"
  },
  {
    id: "bm-9",
    resourceId: "res-25",
    resourceTitle: "小红书爆款标题公式",
    resourceType: "template",
    courseTitle: "小红书内容运营全栈能力",
    courseId: "r-sys-01",
    courseIndustry: "retail",
    savedAt: "2026-03-20",
    readTime: 4,
    summary: "5种高点击率标题结构：数字型、疑问型、对比型等"
  },
  {
    id: "bm-10",
    resourceId: "res-28",
    resourceTitle: "用户洞察调研框架",
    resourceType: "framework",
    courseTitle: "体系课-市场调研模块",
    courseId: "r-sys-01",
    courseIndustry: "retail",
    savedAt: "2026-03-15",
    readTime: 12,
    summary: "从用户画像到需求分析的系统化调研方法"
  }
];

// Filter categories
const filterCategories = [
  { type: "all", label: "全部", icon: "📚" },
  { type: "framework", label: "框架", icon: "🏗️" },
  { type: "method", label: "方法", icon: "💡" },
  { type: "template", label: "模板", icon: "📝" },
  { type: "case", label: "案例", icon: "📖" },
  { type: "checklist", label: "清单", icon: "✅" },
  { type: "pitfall", label: "避坑", icon: "⚠️" },
];

export default function NotesPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter bookmarks
  const filteredBookmarks = allBookmarks.filter(bm => {
    const matchType = activeFilter === "all" || bm.resourceType === activeFilter;
    const matchSearch = searchQuery === "" || 
      bm.resourceTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bm.courseTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bm.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchType && matchSearch;
  });

  // Bookmark statistics
  const stats = {
    total: allBookmarks.length,
    byType: {
      framework: allBookmarks.filter(b => b.resourceType === "framework").length,
      method: allBookmarks.filter(b => b.resourceType === "method").length,
      template: allBookmarks.filter(b => b.resourceType === "template").length,
      case: allBookmarks.filter(b => b.resourceType === "case").length,
      checklist: allBookmarks.filter(b => b.resourceType === "checklist").length,
      pitfall: allBookmarks.filter(b => b.resourceType === "pitfall").length,
    }
  };

  return (
    <div className="min-h-screen bg-[#f9fafb] pb-6">
      {/* Header */}
      <div className="bg-white sticky top-0 z-40 border-b border-gray-100">
        <div className="flex items-center gap-3 px-4 pt-12 pb-3">
          <Link href="/profile" className="text-gray-500">
            <IconArrowLeft size={22} />
          </Link>
          <div className="flex-1">
            <div className="text-base font-bold text-gray-900">我的收藏</div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="px-4 pt-4">
        <div className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm">
          {/* Search bar */}
          <div className="flex items-center gap-2 mb-3 px-2">
            <IconSearch size={16} className="text-gray-400" />
            <input
              type="text"
              placeholder="搜索收藏..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 text-sm bg-transparent outline-none placeholder-gray-300"
            />
          </div>
          
          {/* Filter tabs */}
          <div className="flex gap-2 overflow-x-auto pb-1">
            {filterCategories.map((cat) => {
              const count = cat.type === "all" ? stats.total : stats.byType[cat.type as keyof typeof stats.byType] || 0;
              return (
                <button
                  key={cat.type}
                  onClick={() => setActiveFilter(cat.type)}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    activeFilter === cat.type
                      ? "bg-[#2DD4A8] text-white"
                      : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {cat.icon} {cat.label} ({count})
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bookmark Statistics */}
      <div className="px-4 pt-3">
        <div className="bg-gradient-to-r from-[#2DD4A8]/5 to-blue-50/50 rounded-xl p-3 border border-[#2DD4A8]/10">
          <div className="flex items-center justify-between text-xs text-gray-600">
            <span>📚 总收藏: <span className="font-bold text-[#2DD4A8]">{stats.total}</span> 个</span>
            <span>📅 最近: <span className="font-medium">{allBookmarks[0].savedAt}</span></span>
          </div>
        </div>
      </div>

      {/* Bookmarks */}
      <div className="px-4 pt-3 space-y-3">
        {filteredBookmarks.length > 0 ? (
          filteredBookmarks.map((bm) => {
            const ind = industries[bm.courseIndustry as keyof typeof industries];
            return (
              <Link key={bm.id} href={`/courses/${bm.courseId}`} className="block">
                <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${resourceTypeColors[bm.resourceType]?.split(" ")[0] || "bg-gray-50"}`}>
                      <IconFileText size={18} className={resourceTypeColors[bm.resourceType]?.split(" ")[1] || "text-gray-500"} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[10px] px-1.5 py-0.5 rounded ${resourceTypeColors[bm.resourceType]}`}>
                          {resourceTypeNames[bm.resourceType]}
                        </span>
                        <span className="text-[10px] text-gray-400">{bm.readTime}分钟</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ backgroundColor: ind?.bgColor, color: ind?.color }}>
                          {ind?.name}
                        </span>
                      </div>
                      <div className="font-medium text-sm text-gray-900 mb-1">{bm.resourceTitle}</div>
                      <div className="text-xs text-gray-400 line-clamp-2 mb-2">{bm.summary}</div>
                      <div className="flex items-center justify-between text-[10px] text-gray-300">
                        <span>来自：{bm.courseTitle}</span>
                        <span>{bm.savedAt}</span>
                      </div>
                    </div>
                    <IconChevronRight size={14} className="text-gray-300 shrink-0 mt-2" />
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <div className="text-center py-12">
            <div className="text-4xl mb-3">🔍</div>
            <div className="text-sm text-gray-600 mb-1">没有找到匹配的收藏</div>
            <div className="text-xs text-gray-400">尝试调整筛选条件或搜索关键词</div>
          </div>
        )}

        {/* Empty hint */}
        <div className="text-center py-8">
          <div className="text-xs text-gray-400">收藏学习资源，方便随时回顾</div>
          <div className="text-[10px] text-gray-300 mt-1">在课程详情页点击收藏图标即可添加</div>
        </div>
      </div>
    </div>
  );
}
