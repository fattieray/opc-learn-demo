"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import {
  IconChevronRight, IconMessage, IconUsers, IconCoins,
  IconThumbsUp, IconStar, IconCheck, IconSend, IconEye,
  IconLightbulb, IconZap, IconShield, IconTrophy, IconTarget,
  IconHelpCircle, IconFlag, IconBriefcase, IconBadgeCheck,
  IconX, IconArrowRight, IconBookOpen, IconEdit,
} from "@/components/Icons";
import { squads } from "@/lib/mock/squads";
import { posts } from "@/lib/mock/posts";
import { tasks } from "@/lib/mock/tasks";
import { currentUser } from "@/lib/mock/users";
import { paths, industries, experts } from "@/lib/mock/data";

const statusColors: Record<string, string> = {
  recruiting: "bg-green-50 text-green-700",
  learning: "bg-blue-50 text-blue-700",
  reviewing: "bg-amber-50 text-amber-700",
  completed: "bg-gray-50 text-gray-500",
};
const statusNames: Record<string, string> = {
  recruiting: "招募中",
  learning: "学习中",
  reviewing: "互评中",
  completed: "已完成",
};

// Mock feed data
const feedItems = [
  { id: "f1", type: "submit", user: "思琪", avatar: "琪", action: "提交了种草文案作业", course: "小红书种草文案速成", courseId: "r-micro-01", time: "10分钟前", likes: 3 },
  { id: "f2", type: "praise", user: "林雪", avatar: "L", role: "coach", action: "认可了小林的文案进步", target: "小林", time: "30分钟前" },
  { id: "f3", type: "review", user: "小月", avatar: "月", action: "点评了阿杰的详情页文案", course: "电商详情页卖点提炼", courseId: "r-micro-02", time: "1小时前", likes: 2 },
  { id: "f4", type: "complete", user: "小韩", avatar: "韩", action: "完成了旅行笔记速写课程", course: "小红书旅行种草笔记速写", courseId: "t-micro-01", time: "2小时前" },
  { id: "f5", type: "help", user: "林雪", avatar: "L", role: "coach", action: "回答了阿杰关于AIDA的问题", course: "小红书种草文案速成", courseId: "r-micro-01", time: "3小时前", likes: 5, isExpertAnswer: true },
  { id: "f6", type: "certificate", user: "小月", avatar: "月", action: "获得了「种草文案」技能认证", time: "5小时前" },
  { id: "f7", type: "submit", user: "阿明", avatar: "明", action: "提交了B2B产品文案作业", course: "1688产品详情页文案速写", courseId: "m-micro-01", time: "6小时前", likes: 1 },
  { id: "f8", type: "help", user: "小程", avatar: "程", action: "帮助小鹿理解5感写作法", course: "小红书旅行种草笔记速写", courseId: "t-micro-01", time: "8小时前", likes: 4 },
  { id: "f9", type: "praise", user: "陈野", avatar: "C", role: "coach", action: "认可了小韩的旅行叙事能力", target: "小韩", time: "昨天" },
  { id: "f10", type: "complete", user: "小林", avatar: "林", action: "完成了体系课第3模块", course: "小红书内容运营全栈能力", courseId: "r-sys-01", time: "昨天" },
];

const feedTypeIcons: Record<string, typeof IconCheck> = {
  submit: IconSend,
  praise: IconThumbsUp,
  review: IconEye,
  complete: IconCheck,
  help: IconLightbulb,
  certificate: IconTrophy,
};
const feedTypeColors: Record<string, string> = {
  submit: "bg-blue-50 text-blue-500",
  praise: "bg-amber-50 text-amber-500",
  review: "bg-violet-50 text-violet-500",
  complete: "bg-green-50 text-green-500",
  help: "bg-[#2DD4A8]/10 text-[#2DD4A8]",
  certificate: "bg-amber-50 text-amber-600",
};

// Help board items
const helpRequests = [
  { id: "h1", user: "阿杰", avatar: "杰", question: "种草文案的开头怎么写才能抓住注意力？", course: "小红书种草文案速成", courseId: "r-micro-01", answers: 1, time: "20分钟前", expertAnswered: true },
  { id: "h2", user: "小鹿", avatar: "鹿", question: "5感写作法的「触感」怎么融入旅行笔记？", course: "小红书旅行种草笔记速写", courseId: "t-micro-01", answers: 0, time: "1小时前", expertAnswered: false },
  { id: "h3", user: "小程", avatar: "程", question: "B2B产品文案怎么避免太技术化？", course: "1688产品详情页文案速写", courseId: "m-micro-01", answers: 0, time: "2小时前", expertAnswered: false },
  { id: "h4", user: "小林", avatar: "林", question: "体系课的作业评分标准是什么？", course: "小红书内容运营全栈能力", courseId: "r-sys-01", answers: 2, time: "3小时前", expertAnswered: true },
  { id: "h5", user: "阿明", avatar: "明", question: "如何平衡文案的商业性和真实性？", course: "电商详情页卖点提炼", courseId: "r-micro-02", answers: 1, time: "5小时前", expertAnswered: false },
];

// Onboarding steps for new users
const onboardingSteps = [
  {
    id: 1,
    title: "加入学习小组",
    desc: "选择感兴趣的课程，和同伴一起学习",
    icon: IconUsers,
    action: "去选课",
    href: "/courses",
  },
  {
    id: 2,
    title: "提交作业",
    desc: "完成课程任务，获得教练点评",
    icon: IconSend,
    action: "查看任务",
    href: "#",
  },
  {
    id: 3,
    title: "互评互助",
    desc: "点评同学作业，回答问题赚取积分",
    icon: IconThumbsUp,
    action: "去互评",
    href: "#",
  },
  {
    id: 4,
    title: "获得认可",
    desc: "优质互评和帮助他人可获得教练认可",
    icon: IconStar,
    action: "了解更多",
    href: "#",
  },
];

export default function CirclesPage() {
  const [tab, setTab] = useState<"feed" | "squads">("feed");
  const [squadFilter, setSquadFilter] = useState("all");
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(0);

  const user = currentUser;

  // Show onboarding for new users (first visit simulation)
  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem("circles-onboarding-seen");
    if (!hasSeenOnboarding) {
      setShowOnboarding(true);
    }
  }, []);

  const dismissOnboarding = () => {
    setShowOnboarding(false);
    localStorage.setItem("circles-onboarding-seen", "true");
  };

  const completeOnboarding = () => {
    setShowOnboarding(false);
    localStorage.setItem("circles-onboarding-seen", "true");
  };
  const filteredSquads = squadFilter === "all" ? squads : squads.filter((s) => s.status === squadFilter);

  // My current learning data
  const mySquads = squads.filter((s) => s.members.some((m) => m.userId === user.id));
  const activeSquad = mySquads.find((s) => s.status === "reviewing" || s.status === "learning");
  const currentTask = activeSquad ? tasks.find((t) => t.id === activeSquad.taskId) : null;
  const myPath = paths.find((p) => p.industry === user.industry) || paths[0];
  const completedInPath = Math.min(user.tasksCompleted, myPath.taskIds.length);

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      {/* Header */}
      <div className="bg-white px-5 pt-12 pb-0 border-b border-gray-100">
        <h1 className="text-xl font-bold text-gray-900">学习圈</h1>
        <p className="text-xs text-gray-400 mt-1 mb-3">一起学、互相帮、共同成长</p>
        {/* Sub-tabs */}
        <div className="flex">
          <button
            onClick={() => setTab("feed")}
            className={`flex-1 pb-3 text-sm font-medium border-b-2 transition-colors ${tab === "feed" ? "text-[#2DD4A8] border-[#2DD4A8]" : "text-gray-400 border-transparent"}`}
          >
            学习动态
          </button>
          <button
            onClick={() => setTab("squads")}
            className={`flex-1 pb-3 text-sm font-medium border-b-2 transition-colors ${tab === "squads" ? "text-[#2DD4A8] border-[#2DD4A8]" : "text-gray-400 border-transparent"}`}
          >
            学习小组
          </button>
        </div>
      </div>

      {/* === Onboarding Guide for New Users === */}
      {showOnboarding && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center">
          <div className="bg-white w-full max-w-sm mx-4 mb-4 sm:mb-0 rounded-2xl overflow-hidden shadow-2xl animate-in slide-in-from-bottom-4">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#2DD4A8] to-[#14B88C] px-5 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white font-semibold">欢迎来到学习圈</div>
                  <div className="text-white/80 text-xs">4步快速上手</div>
                </div>
                <button onClick={dismissOnboarding} className="text-white/80 hover:text-white">
                  <IconX size={20} />
                </button>
              </div>
              {/* Progress dots */}
              <div className="flex gap-1.5 mt-3">
                {onboardingSteps.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 rounded-full transition-all ${
                      i <= onboardingStep ? "w-6 bg-white" : "w-1.5 bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="p-5">
              {onboardingStep < onboardingSteps.length ? (
                <>
                  <div className="flex items-start gap-4 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#2DD4A8]/10 flex items-center justify-center shrink-0">
                      {(() => {
                        const Ic = onboardingSteps[onboardingStep].icon;
                        return <Ic size={24} className="text-[#2DD4A8]" />;
                      })()}
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-gray-900 mb-1">
                        Step {onboardingStep + 1}: {onboardingSteps[onboardingStep].title}
                      </div>
                      <div className="text-sm text-gray-500">
                        {onboardingSteps[onboardingStep].desc}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    {onboardingStep > 0 && (
                      <button
                        onClick={() => setOnboardingStep(onboardingStep - 1)}
                        className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-600 font-medium"
                      >
                        上一步
                      </button>
                    )}
                    <Link
                      href={onboardingSteps[onboardingStep].href}
                      onClick={completeOnboarding}
                      className="flex-1 py-2.5 rounded-xl bg-[#2DD4A8] text-white text-sm font-medium text-center flex items-center justify-center gap-1"
                    >
                      {onboardingSteps[onboardingStep].action}
                      <IconArrowRight size={14} />
                    </Link>
                  </div>
                  <button
                    onClick={() => setOnboardingStep(onboardingStep + 1)}
                    className="w-full mt-2 text-xs text-gray-400 hover:text-gray-600"
                  >
                    跳过，下一步 →
                  </button>
                </>
              ) : (
                <>
                  <div className="text-center py-4">
                    <div className="w-16 h-16 rounded-full bg-[#2DD4A8]/10 flex items-center justify-center mx-auto mb-3">
                      <IconCheck size={32} className="text-[#2DD4A8]" />
                    </div>
                    <div className="text-lg font-semibold text-gray-900 mb-1">准备就绪</div>
                    <div className="text-sm text-gray-500">开始学习之旅吧</div>
                  </div>
                  <button
                    onClick={completeOnboarding}
                    className="w-full py-3 rounded-xl bg-[#2DD4A8] text-white font-medium"
                  >
                    开始学习
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* === FEED TAB === */}
      {tab === "feed" && (
        <div className="pb-20">
          {/* P1-6: Value Proposition */}
          <div className="px-4 pt-4">
            <div className="bg-gradient-to-r from-[#2DD4A8]/5 to-blue-50/30 rounded-xl p-3 border border-[#2DD4A8]/15 mb-3">
              <div className="flex items-center gap-2 mb-2">
                <IconLightbulb size={14} className="text-[#2DD4A8]" />
                <span className="text-xs font-semibold text-gray-900">在学习圈，你可以：</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-[10px] text-gray-600">
                <div className="text-center p-2 rounded-lg bg-white/60">
                  <div className="font-semibold text-[#2DD4A8] mb-0.5">解答问题</div>
                  <div>获得积分</div>
                </div>
                <div className="text-center p-2 rounded-lg bg-white/60">
                  <div className="font-semibold text-amber-600 mb-0.5">提交作业</div>
                  <div>获得反馈</div>
                </div>
                <div className="text-center p-2 rounded-lg bg-white/60">
                  <div className="font-semibold text-blue-600 mb-0.5">参与讨论</div>
                  <div>深化理解</div>
                </div>
              </div>
            </div>
          </div>

          {/* A. 我的行动区 — 优先级最高：我现在该做什么？ */}
          <div className="px-4 pt-4 space-y-3">
            {/* 当前学习状态 + 下一步 */}
            <div className="bg-gradient-to-br from-[#2DD4A8]/10 to-[#2DD4A8]/5 rounded-xl p-4 border border-[#2DD4A8]/20">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-[#2DD4A8] flex items-center justify-center">
                  <IconFlag size={14} className="text-white" />
                </div>
                <span className="text-sm font-semibold text-gray-900">我的学习</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#2DD4A8]/10 text-[#14B88C] ml-auto">{myPath.title}</span>
              </div>

              {activeSquad && currentTask ? (
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${currentTask.type === "micro" ? "bg-amber-100" : "bg-violet-100"}`}>
                      {currentTask.type === "micro" ? <IconZap size={18} className="text-amber-600" /> : <IconShield size={18} className="text-violet-600" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900 truncate">{currentTask.title}</div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className={`text-[10px] px-1.5 py-0.5 rounded ${currentTask.type === "micro" ? "bg-amber-50 text-amber-700" : "bg-violet-50 text-violet-700"}`}>
                          {currentTask.type === "micro" ? "微技能课" : "体系课"}
                        </span>
                        <span className="text-[10px] text-gray-400">{activeSquad.name}</span>
                      </div>
                    </div>
                    <Link href={`/circles/${activeSquad.id}`} className="shrink-0 text-xs px-3 py-1.5 rounded-lg bg-[#2DD4A8] text-white font-medium">
                      {activeSquad.status === "reviewing" ? "去互评" : activeSquad.status === "learning" ? "继续学习" : "查看"}
                    </Link>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-white/60 rounded-full overflow-hidden">
                      <div className="h-full bg-[#2DD4A8] rounded-full" style={{ width: `${(completedInPath / myPath.taskIds.length) * 100}%` }} />
                    </div>
                    <span className="text-[10px] text-gray-500">{completedInPath}/{myPath.taskIds.length}</span>
                  </div>
                  <div className="mt-2 text-[10px] text-gray-500 flex items-center gap-1.5">
                    {activeSquad.status === "reviewing" ? (
                      <>
                        <IconEdit size={12} className="text-amber-500" />
                        <span>互评进行中 — 点评同学作业可获得积分</span>
                      </>
                    ) : activeSquad.status === "learning" ? (
                      <>
                        <IconBookOpen size={12} className="text-violet-500" />
                        <span>正在学习 — 完成资源阅读后提交作业</span>
                      </>
                    ) : (
                      <>
                        <IconCheck size={12} className="text-green-500" />
                        <span>课程完成中</span>
                      </>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500">还没有加入学习小组</div>
                  <Link href="/courses" className="text-xs px-3 py-1.5 rounded-lg bg-[#2DD4A8] text-white font-medium">
                    选择课程
                  </Link>
                </div>
              )}
            </div>

            {/* 待答互助 — 紧急且重要 */}
            {helpRequests.filter(h => !h.expertAnswered).length > 0 && (
              <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <IconHelpCircle size={16} className="text-blue-500" />
                  <span className="text-sm font-semibold text-gray-900">待答互助</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-50 text-blue-600 ml-auto">{helpRequests.filter(h => !h.expertAnswered).length}个待答</span>
                </div>
                <div className="space-y-2">
                  {helpRequests.filter(h => !h.expertAnswered).slice(0, 2).map((h) => (
                    <div key={h.id} className="p-3 rounded-lg bg-gray-50/80 border border-gray-100/50">
                      <div className="text-xs text-gray-800 leading-relaxed mb-1.5">{h.question}</div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <div className="w-5 h-5 rounded-full bg-[#2DD4A8]/10 flex items-center justify-center text-[8px] font-bold text-[#14B88C]">{h.avatar}</div>
                          <span className="text-[10px] text-gray-500">{h.user} · {h.time}</span>
                        </div>
                        <button className="text-[10px] px-2 py-1 rounded-md bg-blue-50 text-blue-600 font-medium">我来答</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* B. 学习动态流 — 社交证明 + 动力 */}
          <div className="px-4 pt-4">
            <div className="text-xs font-semibold text-gray-500 mb-3">最近动态</div>
            <div className="space-y-2">
              {feedItems.slice(0, 5).map((item) => {
                const Ic = feedTypeIcons[item.type] || IconMessage;
                const colorClass = feedTypeColors[item.type] || "bg-gray-50 text-gray-500";
                return (
                  <div key={item.id} className="bg-white rounded-xl p-3.5 border border-gray-100 shadow-sm">
                    <div className="flex items-start gap-3">
                      <div className="relative shrink-0">
                        <div className="w-8 h-8 rounded-full bg-[#2DD4A8]/10 flex items-center justify-center text-xs font-bold text-[#14B88C]">{item.avatar}</div>
                        <div className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full flex items-center justify-center ${colorClass}`}>
                          <Ic size={7} />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className="text-xs font-medium text-gray-900">{item.user}</span>
                          {item.role === "coach" && <span className="text-[8px] px-1 py-0.5 rounded bg-amber-50 text-amber-600 flex items-center gap-0.5"><IconBadgeCheck size={6} />教练</span>}
                          <span className="text-[10px] text-gray-300 ml-auto shrink-0">{item.time}</span>
                        </div>
                        <div className="text-xs text-gray-600">{item.action}</div>
                        {item.course && (
                          <Link href={`/courses/${item.courseId}`} className="text-[10px] text-[#2DD4A8] mt-0.5 inline-block">课程：{item.course}</Link>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* === SQUADS TAB === */}
      {tab === "squads" && (
        <div className="pb-20">
          {/* 筛选 */}
          <div className="px-4 pt-4">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
              {[
                { id: "all", name: "全部" },
                { id: "recruiting", name: "招募中" },
                { id: "learning", name: "学习中" },
                { id: "reviewing", name: "互评中" },
                { id: "completed", name: "已完成" },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setSquadFilter(f.id)}
                  className={`shrink-0 text-xs px-3 py-1.5 rounded-full transition-colors ${
                    squadFilter === f.id ? "bg-[#2DD4A8] text-white" : "bg-white text-gray-500 border border-gray-200"
                  }`}
                >
                  {f.name}
                </button>
              ))}
            </div>
          </div>

          {/* 学习小组列表 */}
          <div className="px-4 pt-3 space-y-3">
            {filteredSquads.map((squad) => {
              const squadPosts = posts.filter((p) => p.squadId === squad.id);
              const isMySquad = squad.members.some((m) => m.userId === user.id);
              return (
                <Link key={squad.id} href={`/circles/${squad.id}`} className="block">
                  <div className={`bg-white rounded-xl p-4 border shadow-sm ${isMySquad ? "border-[#2DD4A8]/30" : "border-gray-100"}`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="font-medium text-sm text-gray-900">{squad.name}</div>
                        {isMySquad && <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#2DD4A8]/10 text-[#14B88C]">我的</span>}
                      </div>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded ${statusColors[squad.status]}`}>
                        {statusNames[squad.status]}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 mb-3 line-clamp-1">课程：{squad.taskTitle}</div>
                    
                    {/* 成员头像 */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {squad.members.slice(0, 5).map((m) => (
                          <div
                            key={m.userId}
                            className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold ${
                              m.role === "coach" ? "bg-amber-100 text-amber-700" : "bg-[#2DD4A8]/10 text-[#14B88C]"
                            }`}
                          >
                            {m.avatar}
                          </div>
                        ))}
                        {squad.members.length > 5 && (
                          <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-[10px] text-gray-400">
                            +{squad.members.length - 5}
                          </div>
                        )}
                        <span className="text-[10px] text-gray-400 ml-1">{squad.members.filter((m) => m.role === "learner").length}人</span>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-gray-400">
                        <span className="flex items-center gap-1"><IconMessage size={10} />{squadPosts.length}</span>
                        <IconChevronRight size={14} className="text-gray-300" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
