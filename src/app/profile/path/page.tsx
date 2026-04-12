"use client";
import Link from "next/link";
import {
  IconArrowLeft, IconTarget, IconTrendingUp, IconCheck, IconClock,
  IconGraduationCap, IconChevronRight,
} from "@/components/Icons";
import { currentUser } from "@/lib/mock/users";
import { paths, industries } from "@/lib/mock/data";
import { tasks } from "@/lib/mock/tasks";

const honorLevelNames: Record<string, string> = {
  rookie: "新手",
  apprentice: "学徒",
  artisan: "匠人",
  master: "大师",
};

export default function PathPage() {
  const user = currentUser;
  const path = paths.find((p) => p.industry === user.industry) || paths[0];
  const ind = industries[path.industry];

  return (
    <div className="min-h-screen bg-[#f9fafb] pb-6">
      {/* Header */}
      <div className="bg-white sticky top-0 z-40 border-b border-gray-100">
        <div className="flex items-center gap-3 px-4 pt-12 pb-3">
          <Link href="/profile" className="text-gray-500">
            <IconArrowLeft size={22} />
          </Link>
          <div className="flex-1">
            <div className="text-base font-bold text-gray-900">学习路径</div>
          </div>
        </div>
      </div>

      {/* Path Header */}
      <div className="px-4 pt-4">
        <div className="bg-gradient-to-br from-[#2DD4A8]/10 to-[#2DD4A8]/5 rounded-xl p-5 border border-[#2DD4A8]/20">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ backgroundColor: ind.bgColor, color: ind.color }}>
              {ind.name}
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/60 text-gray-500">{path.estimatedWeeks}周</span>
          </div>
          <div className="text-lg font-bold text-gray-900 mb-1">{path.title}</div>
          <p className="text-xs text-gray-500 leading-relaxed">{path.goal}</p>
        </div>
      </div>

      {/* Skill Growth */}
      <div className="px-4 pt-4">
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <IconTrendingUp size={16} className="text-[#2DD4A8]" />
            <span className="text-sm font-semibold text-gray-900">技能成长预期</span>
          </div>
          <div className="space-y-3">
            {path.skillGrowth.map((sg) => {
              // Find current user skill score if exists
              const currentSkill = user.skills.find((s) => s.name === sg.skill);
              const current = currentSkill ? currentSkill.score : sg.from;
              const progress = ((current - sg.from) / (sg.to - sg.from)) * 100;
              return (
                <div key={sg.skill}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-700">{sg.skill}</span>
                    <span className="text-[10px]">
                      <span className="text-gray-400">{sg.from}</span>
                      <span className="text-gray-300 mx-1">→</span>
                      <span className="text-[#2DD4A8] font-medium">{sg.to}</span>
                    </span>
                  </div>
                  <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#2DD4A8]/40 to-[#2DD4A8] rounded-full" style={{ width: `${Math.min(progress, 100)}%` }} />
                  </div>
                  <div className="flex justify-between text-[10px] text-gray-400 mt-0.5">
                    <span>当前 {current}</span>
                    <span>目标 {sg.to}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Task Sequence */}
      <div className="px-4 pt-4">
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <IconTarget size={16} className="text-[#2DD4A8]" />
            <span className="text-sm font-semibold text-gray-900">课程序列</span>
          </div>
          <div className="space-y-0">
            {path.taskTitles.map((title, i) => {
              const taskId = path.taskIds[i];
              const task = tasks.find((t) => t.id === taskId);
              const completed = i < user.tasksCompleted;
              const current = i === user.tasksCompleted;
              return (
                <Link key={i} href={task ? `/courses/${taskId}` : "#"} className="block">
                  <div className="flex items-start gap-3 py-3 border-b border-gray-50 last:border-0">
                    <div className="flex flex-col items-center shrink-0">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center ${
                        completed ? "bg-[#2DD4A8] text-white" : current ? "bg-[#2DD4A8]/20 text-[#2DD4A8]" : "bg-gray-100 text-gray-400"
                      }`}>
                        {completed ? <IconCheck size={14} /> : <span className="text-xs font-medium">{i + 1}</span>}
                      </div>
                      {i < path.taskTitles.length - 1 && (
                        <div className={`w-0.5 h-4 ${completed ? "bg-[#2DD4A8]" : "bg-gray-100"}`} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`text-sm ${completed ? "text-gray-400 line-through" : current ? "text-gray-900 font-medium" : "text-gray-500"}`}>
                        {title}
                      </div>
                      {task && (
                        <div className="flex items-center gap-2 mt-1 text-[10px] text-gray-400">
                          <span className="flex items-center gap-0.5"><IconClock size={9} />{task.estimatedMinutes}分钟</span>
                          <span>{task.resources.length}篇文档</span>
                          <span>{task.assignments.length}个作业</span>
                        </div>
                      )}
                    </div>
                    {task && <IconChevronRight size={14} className="text-gray-300 shrink-0 mt-1" />}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Honor Level Progression */}
      <div className="px-4 pt-4 pb-4">
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <IconGraduationCap size={16} className="text-amber-500" />
            <span className="text-sm font-semibold text-gray-900">荣誉等级路线</span>
          </div>
          <div className="flex items-center justify-between">
            {(["rookie", "apprentice", "artisan", "master"] as const).map((level, i) => {
              const isActive = user.honorLevel === level;
              const isPast = ["rookie", "apprentice", "artisan", "master"].indexOf(user.honorLevel) > i;
              return (
                <div key={level} className="flex flex-col items-center gap-1 flex-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    isPast ? "bg-[#2DD4A8] text-white" : isActive ? "bg-amber-100 text-amber-700 ring-2 ring-amber-300" : "bg-gray-100 text-gray-400"
                  }`}>
                    {i + 1}
                  </div>
                  <div className={`text-[10px] ${isActive ? "font-bold text-amber-700" : isPast ? "text-[#2DD4A8]" : "text-gray-400"}`}>
                    {honorLevelNames[level]}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
