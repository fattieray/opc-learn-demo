"use client";
import { useState } from "react";
import Link from "next/link";
import {
  IconArrowLeft, IconBadgeCheck, IconCertification, IconChalkboard,
  IconCheck, IconChevronRight, IconDollarSign, IconShield,
  IconStar, IconBriefcase, IconWallet, IconLightbulb, IconFlag,
  IconZap, IconUsers, IconTrophy, IconClock, IconTrendingUp, IconFileText,
} from "@/components/Icons";
import { experts, expertCourses, industries, userCertifications } from "@/lib/mock/data";
import { currentUser } from "@/lib/mock/users";

const roleConfig = {
  cert_coach: {
    name: "认证教练",
    desc: "评审OPC认证学员的作品集，给出专业反馈和评分",
    icon: IconCertification,
    color: "#3B82F6",
    bgColor: "#EFF6FF",
    income: "¥50-100/次评审",
    requirements: [
      "持有OPC认证（中级及以上）",
      "通过教学能力测试",
      "平台审核通过",
    ],
    stats: [
      { label: "评审收费", value: "¥50-100/次" },
      { label: "平均耗时", value: "30-60分钟/次" },
      { label: "月均评审", value: "8-15次" },
    ],
  },
  course_provider: {
    name: "课程提供方",
    desc: "创建并销售付费课程，将你的经验变现",
    icon: IconChalkboard,
    color: "#F59E0B",
    bgColor: "#FFFBEB",
    income: "课程售价90%归你",
    requirements: [
      "持有OPC认证",
      "课程大纲通过审核",
      "体系课需试讲通过",
    ],
    stats: [
      { label: "收入分成", value: "90%归你" },
      { label: "微技能课", value: "弱审核" },
      { label: "体系课", value: "强审核" },
    ],
  },
};

// 即将到来的辅导会话
const upcomingSessions = [
  {
    id: "session-1",
    coachId: "coach-lin",
    coachName: "林雪",
    coachAvatar: "L",
    topic: "种草文案作业点评 - 思琪的作业",
    time: "明天 15:00-15:45",
    type: "一对一辅导",
    status: "已预约" as const,
    industry: "retail"
  },
  {
    id: "session-2",
    coachId: "coach-chen",
    coachName: "陈野",
    coachAvatar: "C",
    topic: "旅行笔记写作技巧分享",
    time: "后天 10:00-10:45",
    type: "小组辅导（3人）",
    status: "已预约" as const,
    industry: "tourism"
  },
  {
    id: "session-3",
    coachId: "coach-zhao",
    coachName: "赵工",
    coachAvatar: "Z",
    topic: "B2B产品文案优化建议",
    time: "本周五 14:00-14:45",
    type: "一对一辅导",
    status: "可申请" as const,
    industry: "manufacturing"
  }
];

// 辅导统计数据
const coachingStats = {
  totalSessions: 23,
  completedSessions: 18,
  upcomingSessions: 3,
  canceledSessions: 2,
  totalFeedback: 15,
  avgRating: 4.7,
  totalHours: 17.5,
  skillImprovement: "+35%" // 技能提升百分比
};

// 历史辅导记录
const sessionHistory = [
  {
    id: "history-1",
    coachName: "林雪",
    topic: "详情页文案AIDA框架应用",
    date: "2026-04-08",
    rating: 5,
    feedback: "讲解清晰，案例实用，作业批改详细",
    type: "一对一"
  },
  {
    id: "history-2",
    coachName: "陈野",
    topic: "旅行叙事的5感写作法",
    date: "2026-04-05",
    rating: 5,
    feedback: "很有启发性，学会了如何融入感官描写",
    type: "小组"
  },
  {
    id: "history-3",
    coachName: "林雪",
    topic: "种草文案开头技巧",
    date: "2026-03-28",
    rating: 4,
    feedback: "内容很好，希望更多实战案例",
    type: "一对一"
  }
];

export default function ExpertPage() {
  const [selectedRole, setSelectedRole] = useState<"cert_coach" | "course_provider">("cert_coach");
  const [showHistory, setShowHistory] = useState(false);
  const user = currentUser;

  const hasOPCCert = userCertifications.some((c) => c.status === "earned" && c.certDefId.startsWith("cert-opc"));
  const hasOPCInProgress = userCertifications.some((c) => c.status === "in_progress" && c.certDefId.startsWith("cert-opc"));
  const existingExpert = experts.find((e) => e.userId === user.id);

  const cfg = roleConfig[selectedRole];
  const Ic = cfg.icon;

  return (
    <div className="min-h-screen bg-[#f9fafb] pb-6">
      {/* Header */}
      <div className="bg-white sticky top-0 z-40 border-b border-gray-100">
        <div className="flex items-center gap-3 px-4 pt-12 pb-3">
          <Link href="/profile" className="text-gray-500">
            <IconArrowLeft size={22} />
          </Link>
          <div className="flex-1">
            <div className="text-base font-bold text-gray-900">专家中心</div>
            <div className="text-[10px] text-gray-500">认证教练 · 课程提供方 · 知识变现</div>
          </div>
          {existingExpert && (
            <span className="text-[10px] px-2 py-1 rounded-full bg-[#2DD4A8]/10 text-[#14B88C] font-medium">已认证</span>
          )}
        </div>
      </div>

      {/* Prerequisite Check */}
      <div className="px-4 pt-4">
        <div className={`rounded-xl p-4 border ${hasOPCCert ? "bg-[#2DD4A8]/5 border-[#2DD4A8]/20" : hasOPCInProgress ? "bg-amber-50/50 border-amber-200/30" : "bg-gray-50 border-gray-200/50"}`}>
          <div className="flex items-center gap-2 mb-2">
            <IconShield size={16} className={hasOPCCert ? "text-[#2DD4A8]" : hasOPCInProgress ? "text-amber-500" : "text-gray-500"} />
            <span className="text-sm font-semibold text-gray-900">入驻前提：OPC认证</span>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed mb-2">
            所有专家角色都需要持有OPC认证作为资格锚点。OPC认证证明你具备独立工作能力，是学员信任的基础。
          </p>
          <div className="flex items-center gap-2">
            {hasOPCCert ? (
              <div className="flex items-center gap-1.5 text-xs text-[#2DD4A8] font-medium">
                <IconCheck size={14} className="text-[#2DD4A8]" />
                你已获得OPC认证，可以申请专家身份
              </div>
            ) : hasOPCInProgress ? (
              <div className="flex items-center gap-1.5 text-xs text-amber-600">
                <IconZap size={14} className="text-amber-500" />
                你正在准备OPC认证，通过后即可申请
              </div>
            ) : (
              <Link href="/profile/certification" className="text-xs text-blue-500 font-medium flex items-center gap-1">
                前往认证中心 <IconChevronRight size={12} />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Revenue Model Explanation */}
      <div className="px-4 pt-4">
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <IconWallet size={16} className="text-[#2DD4A8]" />
            <span className="text-sm font-semibold text-gray-900">收入模式</span>
          </div>
          <div className="space-y-2.5">
            <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-gray-50">
              <div className="w-6 h-6 rounded-full bg-[#2DD4A8]/10 flex items-center justify-center shrink-0 mt-0.5">
                <IconDollarSign size={12} className="text-[#2DD4A8]" />
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-800">年费 ¥199</div>
                <div className="text-[10px] text-gray-500">平台工具使用费，涵盖课程管理、评审工具、数据分析</div>
              </div>
            </div>
            <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-gray-50">
              <div className="w-6 h-6 rounded-full bg-amber-50 flex items-center justify-center shrink-0 mt-0.5">
                <IconTrophy size={12} className="text-amber-500" />
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-800">收入分成 10%</div>
                <div className="text-[10px] text-gray-500">平台抽成10%，你保留90%收入。评审费、课程费均适用</div>
              </div>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-50 text-[10px] text-gray-500">
            平台担保：学员不满意可退款，确保教学质量
          </div>
        </div>
      </div>

      {/* Role Selection */}
      <div className="px-4 pt-4">
        <div className="flex items-center gap-2 mb-3">
          <IconBadgeCheck size={16} className="text-amber-500" />
          <span className="text-sm font-semibold text-gray-900">选择角色</span>
        </div>
        <div className="flex gap-3">
          {(["cert_coach", "course_provider"] as const).map((role) => {
            const rc = roleConfig[role];
            const Ri = rc.icon;
            const isActive = selectedRole === role;
            return (
              <button
                key={role}
                onClick={() => setSelectedRole(role)}
                className={`flex-1 p-4 rounded-xl border-2 text-left transition-all ${
                  isActive ? "border-current bg-white shadow-sm" : "border-gray-100 bg-white"
                }`}
                style={{ borderColor: isActive ? rc.color : undefined }}
              >
                <div className="w-10 h-10 rounded-lg mx-auto mb-2 flex items-center justify-center" style={{ backgroundColor: rc.bgColor }}>
                  <Ri size={20} style={{ color: rc.color }} />
                </div>
                <div className="text-sm font-semibold text-gray-900 text-center">{rc.name}</div>
                <div className="text-[10px] text-gray-500 text-center mt-1">{rc.income}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Role Details */}
      <div className="px-4 pt-4">
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Ic size={16} style={{ color: cfg.color }} />
            <span className="text-sm font-semibold text-gray-900">{cfg.name}</span>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed mb-3">{cfg.desc}</p>

          {/* Requirements */}
          <div className="mb-3">
            <div className="text-[11px] font-semibold text-gray-700 mb-2">入驻要求</div>
            <div className="space-y-1.5">
              {cfg.requirements.map((req, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-gray-600">
                  <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                    <span className="text-[10px] text-gray-500">{i + 1}</span>
                  </div>
                  {req}
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 mb-3">
            {cfg.stats.map((stat) => (
              <div key={stat.label} className="p-2 rounded-lg bg-gray-50 text-center">
                <div className="text-xs font-bold text-gray-900">{stat.value}</div>
                <div className="text-[9px] text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Course Review Policy */}
      {selectedRole === "course_provider" && (
        <div className="px-4 pt-4">
          <div className="bg-gradient-to-br from-amber-50/80 to-orange-50/50 rounded-xl p-4 border border-amber-200/30">
            <div className="flex items-center gap-2 mb-3">
              <IconLightbulb size={16} className="text-amber-500" />
              <span className="text-sm font-semibold text-gray-900">课程审核分级</span>
            </div>
            <div className="space-y-2">
              <div className="p-2.5 rounded-lg bg-white/60 border border-amber-100/40">
                <div className="flex items-center gap-1.5 mb-1">
                  <IconZap size={12} className="text-amber-500" />
                  <span className="text-xs font-semibold text-gray-800">微技能课 — 弱审核</span>
                </div>
                <div className="text-[10px] text-gray-500">提交基本信息即可上架，靠学员评价和完课率淘汰低质量课程</div>
              </div>
              <div className="p-2.5 rounded-lg bg-white/60 border border-amber-100/40">
                <div className="flex items-center gap-1.5 mb-1">
                  <IconShield size={12} className="text-violet-500" />
                  <span className="text-xs font-semibold text-gray-800">体系课 — 强审核</span>
                </div>
                <div className="text-[10px] text-gray-500">需提交课程大纲 → 试讲 → 评审团审核 → 上架</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Existing Expert Showcase */}
      <div className="px-4 pt-4">
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <IconStar size={16} className="text-amber-500" />
            <span className="text-sm font-semibold text-gray-900">平台专家</span>
            <span className="text-[10px] text-gray-500 ml-auto">{experts.length}位已入驻</span>
          </div>
          <div className="space-y-2.5">
            {experts.map((expert) => {
              const expertName = expert.userId === "coach-lin" ? "林雪" : expert.userId === "coach-chen" ? "陈野" : "赵工";
              const expertAvatar = expert.userId === "coach-lin" ? "L" : expert.userId === "coach-chen" ? "C" : "Z";
              const ind = industries[expert.industry];
              return (
                <div key={expert.userId} className="p-3 rounded-lg bg-gray-50/80">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center text-xs font-bold text-amber-700">{expertAvatar}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="text-xs font-semibold text-gray-900">{expertName}</span>
                        {expert.roles.includes("cert_coach") && <span className="text-[8px] px-1 py-0.5 rounded bg-blue-50 text-blue-500">认证教练</span>}
                        {expert.roles.includes("course_provider") && <span className="text-[8px] px-1 py-0.5 rounded bg-amber-50 text-amber-500">课程提供方</span>}
                        <span className="text-[9px] px-1 py-0.5 rounded" style={{ backgroundColor: ind.bgColor, color: ind.color }}>{ind.name}</span>
                      </div>
                      <div className="text-[10px] text-gray-500">{expert.specialties.join("、")}</div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-xs font-bold text-[#2DD4A8]">¥{expert.stats.totalEarnings.toLocaleString()}</div>
                      <div className="text-[9px] text-gray-500">累计收入</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-2 pt-2 border-t border-gray-100/50 text-[10px] text-gray-500">
                    <span>{expert.onboardingType === "invited" ? "平台邀请入驻" : "申请审核入驻"}</span>
                    <span>·</span>
                    <span>评分 {expert.stats.avgRating}</span>
                    <span>·</span>
                    <span>{expert.stats.totalStudents} 位学员</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Upcoming Coaching Sessions */}
      <div className="px-4 pt-4">
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <IconClock size={16} className="text-blue-500" />
              <span className="text-sm font-semibold text-gray-900">即将到来的辅导</span>
            </div>
            <span className="text-[10px] text-gray-500">{upcomingSessions.filter(s => s.status === "已预约").length}个已预约</span>
          </div>
          <div className="space-y-2.5">
            {upcomingSessions.map((session) => {
              const ind = industries[session.industry as keyof typeof industries];
              return (
                <div key={session.id} className="p-3 rounded-lg bg-gradient-to-r from-blue-50/50 to-indigo-50/30 border border-blue-100/30">
                  <div className="flex items-start gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-600 shrink-0">
                      {session.coachAvatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold text-gray-900">{session.coachName}</span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-100 text-blue-600">{session.type}</span>
                      </div>
                      <div className="text-xs text-gray-700 mb-1.5">{session.topic}</div>
                      <div className="flex items-center gap-2 text-[10px] text-gray-500">
                        <span>🕒 {session.time}</span>
                        <span className={`px-1.5 py-0.5 rounded ${session.status === "已预约" ? "bg-green-100 text-green-600" : "bg-amber-100 text-amber-600"}`}>
                          {session.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  {session.status === "可申请" && (
                    <button className="mt-2 w-full py-1.5 rounded-lg bg-blue-500 text-white text-xs font-medium hover:bg-blue-600 transition-colors">
                      申请辅导
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Coaching Statistics */}
      <div className="px-4 pt-4">
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <IconTrendingUp size={16} className="text-[#2DD4A8]" />
            <span className="text-sm font-semibold text-gray-900">辅导统计</span>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="p-3 rounded-lg bg-gradient-to-br from-[#2DD4A8]/5 to-[#2DD4A8]/10 border border-[#2DD4A8]/20">
              <div className="text-2xl font-bold text-[#2DD4A8]">{coachingStats.completedSessions}</div>
              <div className="text-[10px] text-gray-500 mt-0.5">已完成辅导</div>
            </div>
            <div className="p-3 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200/30">
              <div className="text-2xl font-bold text-blue-600">{coachingStats.upcomingSessions}</div>
              <div className="text-[10px] text-gray-500 mt-0.5">即将到来</div>
            </div>
            <div className="p-3 rounded-lg bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200/30">
              <div className="text-2xl font-bold text-amber-600">{coachingStats.avgRating}</div>
              <div className="text-[10px] text-gray-500 mt-0.5">平均评分</div>
            </div>
            <div className="p-3 rounded-lg bg-gradient-to-br from-violet-50 to-violet-100/50 border border-violet-200/30">
              <div className="text-2xl font-bold text-violet-600">{coachingStats.skillImprovement}</div>
              <div className="text-[10px] text-gray-500 mt-0.5">技能提升</div>
            </div>
          </div>
          <div className="flex items-center justify-between text-[10px] text-gray-500 pt-2 border-t border-gray-50">
            <span>总辅导时长: {coachingStats.totalHours}小时</span>
            <span>获得反馈: {coachingStats.totalFeedback}次</span>
          </div>
        </div>
      </div>

      {/* Session History */}
      <div className="px-4 pt-4">
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <button 
            onClick={() => setShowHistory(!showHistory)}
            className="w-full flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <IconFileText size={16} className="text-gray-600" />
              <span className="text-sm font-semibold text-gray-900">辅导历史</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-gray-500">{sessionHistory.length}条记录</span>
              <IconChevronRight size={16} className={`text-gray-500 transition-transform ${showHistory ? "rotate-90" : ""}`} />
            </div>
          </button>
          
          {showHistory && (
            <div className="mt-3 space-y-2.5 pt-3 border-t border-gray-100">
              {sessionHistory.map((session) => (
                <div key={session.id} className="p-3 rounded-lg bg-gray-50/80">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="text-xs font-semibold text-gray-900 mb-0.5">{session.topic}</div>
                      <div className="text-[10px] text-gray-500">教练: {session.coachName} · {session.type} · {session.date}</div>
                    </div>
                    <div className="flex items-center gap-0.5">
                      {[...Array(session.rating)].map((_, i) => (
                        <IconStar key={i} size={10} className="text-amber-500 fill-amber-500" />
                      ))}
                    </div>
                  </div>
                  <div className="text-[10px] text-gray-600 bg-white/60 p-2 rounded border border-gray-100/50">
                    💬 {session.feedback}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Apply CTA */}
      <div className="px-4 pt-4 pb-6">
        {existingExpert ? (
          <div className="bg-gradient-to-r from-[#2DD4A8] to-[#14B88C] rounded-xl p-5 text-white text-center">
            <IconBadgeCheck size={28} className="mx-auto mb-2 opacity-90" />
            <div className="text-sm font-bold mb-1">你已是平台认证专家</div>
            <div className="text-[10px] opacity-80">角色：{existingExpert.roles.map((r) => roleConfig[r].name).join(" + ")}</div>
          </div>
        ) : hasOPCCert ? (
          <button className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#2DD4A8] to-[#14B88C] text-white font-semibold text-sm">
            申请成为{cfg.name}
          </button>
        ) : (
          <div className="text-center">
            <button className="w-full py-3.5 rounded-xl bg-gray-200 text-gray-500 font-semibold text-sm cursor-not-allowed">
              {hasOPCInProgress ? "通过OPC认证后可申请" : "需要先获得OPC认证"}
            </button>
            <Link href="/profile/certification" className="text-xs text-[#2DD4A8] font-medium mt-2 inline-block">
              前往认证中心 →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
