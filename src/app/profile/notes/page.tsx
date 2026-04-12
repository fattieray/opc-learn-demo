"use client";
import Link from "next/link";
import {
  IconArrowLeft, IconBookmark, IconFileText, IconClock, IconChevronRight,
} from "@/components/Icons";
import { tasks } from "@/lib/mock/tasks";

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

export default function NotesPage() {
  // Demo: show the hero task's resources as "bookmarked"
  const heroTask = tasks[0];
  const bookmarks = heroTask.resources.slice(0, 3);

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

      {/* Bookmarks */}
      <div className="px-4 pt-4 space-y-3">
        {bookmarks.map((res) => (
          <Link key={res.id} href={`/courses/${heroTask.id}`} className="block">
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${resourceTypeColors[res.type]?.split(" ")[0] || "bg-gray-50"}`}>
                  <IconFileText size={16} className={resourceTypeColors[res.type]?.split(" ")[1] || "text-gray-500"} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded ${resourceTypeColors[res.type]}`}>
                      {resourceTypeNames[res.type]}
                    </span>
                    <span className="text-[10px] text-gray-400">{res.readTime}分钟</span>
                  </div>
                  <div className="font-medium text-sm text-gray-900 mb-1">{res.title}</div>
                  <div className="text-xs text-gray-400 line-clamp-2">{res.summary}</div>
                  <div className="flex items-center gap-1 mt-2 text-[10px] text-gray-300">
                    <span>来自：{heroTask.title}</span>
                  </div>
                </div>
                <IconChevronRight size={14} className="text-gray-300 shrink-0 mt-2" />
              </div>
            </div>
          </Link>
        ))}

        {/* Empty hint */}
        <div className="text-center py-8">
          <div className="text-xs text-gray-400">收藏学习资源，方便随时回顾</div>
          <div className="text-[10px] text-gray-300 mt-1">在课程详情页点击收藏图标即可添加</div>
        </div>
      </div>
    </div>
  );
}
