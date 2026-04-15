"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import BottomNav from "@/components/BottomNav";
import { api, authUtils } from "@/lib/api";
import type { UserResponse } from "@/types/api";
import {
  IconChevronRight, IconMap, IconNote, IconTrophy, IconAward,
  IconTarget, IconCoins, IconTrendingUp, IconGraduationCap, IconBookmark,
  IconCheck, IconMessage, IconLightbulb, IconThumbsUp, IconClock, IconBarChart,
  IconBriefcase, IconShield, IconZap, IconStar, IconFlag, IconActivity,
  IconCertification, IconExam, IconChalkboard, IconBadgeCheck,
} from "@/components/Icons";
import { currentUser } from "@/lib/mock/users";
import { squads } from "@/lib/mock/squads";
import { paths, industries, certifications, userCertifications, experts } from "@/lib/mock/data";
import { tasks } from "@/lib/mock/tasks";

const honorLevelNames: Record<string, string> = {
  rookie: "新手",
  apprentice: "学徒",
  artisan: "匠人",
  master: "大师",
};
const honorLevelColors: Record<string, string> = {
  rookie: "bg-gray-100 text-gray-600",
  apprentice: "bg-blue-50 text-blue-700",
  artisan: "bg-amber-50 text-amber-700",
  master: "bg-purple-50 text-purple-700",
};

// Growth milestones tied to two-tier system
const milestones = [
  { label: "注册OPC Learn", desc: "开启职业成长之旅", done: true, date: "3周前", icon: "flag" },
  { label: "完成第一门微技能课", desc: "种草文案速成 · 获得入行技能", done: true, date: "1周前", icon: "zap" },
  { label: "获得课程认证", desc: "自动获得课程完成认证卡", done: true, date: "1周前", icon: "award" },
  { label: "准备OPC认证", desc: "作品集+教练审核，独立工作能力证明", done: false, date: "", icon: "certification" },
  { label: "完成体系课学习", desc: "掌握全栈运营能力", done: false, date: "", icon: "shield" },
  { label: "通过OPC认证", desc: "获得行业能力认证证书", done: false, date: "", icon: "exam" },
  { label: "报考工信部认证", desc: "国家职业资格，全国联网可查", done: false, date: "", icon: "graduation" },
  { label: "获得工信部认证", desc: "享受数字经济人才政策待遇", done: false, date: "", icon: "briefcase" },
];

// Recent growth log
const growthLog = [
  { date: "今天", events: ["连续学习5天", "文案写作 15→20 (+5)"] },
  { date: "昨天", events: ["完成种草文案模块三", "获得教练认可"] },
  { date: "3天前", events: ["帮助思琪理解AIDA模型", "互评2份作业"] },
  { date: "1周前", events: ["完成第一门微技能课", "获得技能认证"] },
];

// Scholarship history
const scholarshipHistory = [
  { date: "2026-04-10", amount: 320, type: "奖学金分配", source: "种草文案速成班", status: "已到账" },
  { date: "2026-04-05", amount: 150, type: "互评奖励", source: "点评3份作业", status: "已到账" },
  { date: "2026-03-28", amount: 200, type: "帮助他人", source: "解答5个问题", status: "已到账" },
  { date: "2026-03-20", amount: 100, type: "新手奖励", source: "完成首次学习", status: "已到账" },
];

// Honor records
const honorRecords = [
  { date: "2026-04-12", title: "互助达人", desc: "累计帮助10位同学", points: 50 },
  { date: "2026-04-08", title: "优质互评", desc: "获得5次教练认可", points: 30 },
  { date: "2026-04-01", title: "连续学习", desc: "连续学习7天", points: 20 },
  { date: "2026-03-25", title: "首次认证", desc: "获得第一张技能认证", points: 100 },
];

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authUtils.isAuthenticated()) {
      router.push("/login");
      return;
    }

    api.users.me()
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [router]);

  // Fallback to mock user if API fails or during loading
  const displayUser = user || {
    id: currentUser.id,
    nickname: currentUser.name,
    avatar_url: "",
    industry_preference: currentUser.industry,
    skill_profile: {},
  };

  const mySquads = squads.filter((s) => s.members.some((m) => m.userId === displayUser.id));
  const myPath = paths.find((p) => p.industry === displayUser.industry_preference) || paths[0];
  const ind = industries[displayUser.industry_preference as keyof typeof industries];
  const microCourses = tasks.filter((t) => t.type === "micro" && t.industry === displayUser.industry_preference);
  const sysCourse = tasks.find((t) => t.type === "system" && t.industry === displayUser.industry_preference);
  const completedInPath = Math.min(currentUser.tasksCompleted, myPath.taskIds.length);
  const earnedCerts = userCertifications.filter((c) => c.status === "earned").length;
  const inProgressCerts = userCertifications.filter((c) => c.status === "in_progress").length;

  // Check if user could become an expert (has OPC cert or in-progress)
  const hasOPCCertInProgress = userCertifications.some((c) => c.status === "in_progress" && c.certDefId.startsWith("cert-opc"));

  const milestoneIconMap: Record<string, React.FC<{size?: number; className?: string}>> = {
    flag: IconFlag, zap: IconZap, award: IconAward, certification: IconCertification,
    shield: IconShield, exam: IconExam, graduation: IconGraduationCap, briefcase: IconBriefcase,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f9fafb] flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-500 mb-2">加载中...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#f9fafb] flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-2">加载失败: {error}</div>
          <button onClick={() => router.push("/login")} className="text-[#2DD4A8] text-sm">
            返回登录
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      {/* A. 身份卡片 — 合并头部 + 进度 + 关键数据 */}
      <div className="bg-gradient-to-b from-[#2DD4A8]/10 to-white px-5 pt-12 pb-6">
        {/* 头像 + 基本信息 */}
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-[#2DD4A8] flex items-center justify-center text-2xl font-bold text-white">
            {displayUser.nickname.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-gray-900">{displayUser.nickname}</h1>
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${honorLevelColors[currentUser.honorLevel]}`}>
                {honorLevelNames[currentUser.honorLevel]}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">{currentUser.bio}</p>
          </div>
        </div>

        {/* 紧凑版职业成长轨迹 */}
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm mb-4">
          <div className="flex items-center gap-2 mb-3">
            <IconBriefcase size={16} className="text-[#2DD4A8]" />
            <span className="text-sm font-semibold text-gray-900">职业成长轨迹</span>
          </div>
          <div className="flex items-center gap-0">
            {/* 当前阶段 */}
            <div className="flex-1 text-center p-2.5 rounded-lg bg-amber-50/70 border border-amber-200/40">
              <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-1">
                <IconZap size={14} className="text-amber-600" />
              </div>
              <div className="text-[10px] text-gray-500">当前</div>
              <div className="text-[11px] font-semibold text-amber-700">微技能课</div>
              <div className="text-[9px] text-amber-500">{completedInPath}/{myPath.taskIds.length}</div>
            </div>
            {/* 箭头 */}
            <div className="px-1.5 flex flex-col items-center">
              <IconChevronRight size={16} className="text-gray-300" />
            </div>
            {/* 下一阶段 */}
            <div className="flex-1 text-center p-2.5 rounded-lg bg-violet-50/30 border border-violet-200/30">
              <div className="w-8 h-8 rounded-full bg-violet-50 flex items-center justify-center mx-auto mb-1">
                <IconShield size={14} className="text-violet-300" />
              </div>
              <div className="text-[10px] text-gray-500">进阶</div>
              <div className="text-[11px] font-medium text-gray-500">体系课</div>
              <div className="text-[9px] text-gray-300">待解锁</div>
            </div>
            {/* 箭头 */}
            <div className="px-1.5 flex flex-col items-center">
              <IconChevronRight size={16} className="text-gray-300" />
            </div>
            {/* 职业目标 */}
            <div className="flex-1 text-center p-2.5 rounded-lg bg-gray-50 border border-gray-100">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-1">
                <IconBriefcase size={14} className="text-gray-500" />
              </div>
              <div className="text-[10px] text-gray-500">目标</div>
              <div className="text-[11px] font-medium text-gray-600">{sysCourse?.careerGrowth?.title || "运营主管"}</div>
              <div className="text-[9px] text-gray-500">{sysCourse?.careerGrowth?.salaryRange || "10k+"}</div>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-50 flex items-center justify-between text-[10px]">
            <span className="text-gray-500">入行：<span className="text-amber-600 font-medium">{microCourses[0]?.career?.salaryRange || "4k-7k"}</span></span>
            <span className="text-gray-500">进阶：<span className="text-violet-600 font-medium">{sysCourse?.careerGrowth?.salaryRange || "12k-20k"}</span></span>
          </div>
        </div>

        {/* 关键数据一览 */}
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="grid grid-cols-4 gap-2 text-center">
            <div>
              <div className="text-lg font-bold text-gray-900">{currentUser.tasksCompleted}</div>
              <div className="text-[9px] text-gray-500">完成课程</div>
            </div>
            <div>
              <div className="text-lg font-bold text-amber-600">¥{currentUser.scholarshipsEarned}</div>
              <div className="text-[9px] text-gray-500">奖学金</div>
            </div>
            <div>
              <div className="text-lg font-bold text-[#2DD4A8]">{currentUser.honorPoints}</div>
              <div className="text-[9px] text-gray-500">荣誉积分</div>
            </div>
            <div>
              <div className="text-lg font-bold text-blue-600">{mySquads.length}</div>
              <div className="text-[9px] text-gray-500">学习小组</div>
            </div>
          </div>
        </div>
      </div>

      {/* B. 能力成长 — 核心价值 */}
      <div className="px-4 pt-4 space-y-3">
        {/* 能力成长 */}
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <IconTarget size={16} className="text-[#2DD4A8]" />
            <span className="text-sm font-semibold text-gray-900">能力成长</span>
            <span className="text-[10px] text-gray-500 ml-auto">实习门槛 40分 · 主管门槛 70分</span>
          </div>
          <div className="space-y-3">
            {currentUser.skills.map((skill) => {
              const pathSkill = myPath.skillGrowth.find((s) => s.skill === skill.name);
              const targetScore = pathSkill?.to || 70;
              const isInternReady = skill.score >= 40;
              const isManagerReady = skill.score >= 70;
              return (
                <div key={skill.name}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-gray-700">{skill.name}</span>
                      {isInternReady && !isManagerReady && <span className="text-[8px] px-1 py-0.5 rounded bg-amber-50 text-amber-600">达实习线</span>}
                      {isManagerReady && <span className="text-[8px] px-1 py-0.5 rounded bg-violet-50 text-violet-600">达主管线</span>}
                    </div>
                    <span className="text-[10px]">
                      <span className={`font-medium ${isInternReady ? "text-[#2DD4A8]" : "text-gray-500"}`}>{skill.score}</span>
                      <span className="text-gray-200">/100</span>
                    </span>
                  </div>
                  <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="absolute left-[40%] top-0 bottom-0 w-px bg-amber-300/50 z-10" />
                    <div className="absolute left-[70%] top-0 bottom-0 w-px bg-violet-300/50 z-10" />
                    <div className="h-full bg-gradient-to-r from-[#2DD4A8]/60 to-[#2DD4A8] rounded-full" style={{ width: `${skill.score}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 我的影响力 */}
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <IconThumbsUp size={16} className="text-[#2DD4A8]" />
            <span className="text-sm font-semibold text-gray-900">我的影响力</span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center p-3 rounded-lg bg-[#2DD4A8]/5">
              <div className="text-lg font-bold text-[#2DD4A8]">2</div>
              <div className="text-[10px] text-gray-500">帮助同学</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-blue-50/50">
              <div className="text-lg font-bold text-blue-600">4</div>
              <div className="text-[10px] text-gray-500">给出互评</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-amber-50/50">
              <div className="text-lg font-bold text-amber-600">85%</div>
              <div className="text-[10px] text-gray-500">好评率</div>
            </div>
          </div>
        </div>

        {/* 荣誉进阶 */}
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <IconTrophy size={16} className="text-amber-500" />
              <span className="text-sm font-semibold text-gray-900">荣誉进阶</span>
            </div>
            <span className="text-sm font-bold text-amber-600">{user.honorPoints}分</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-2">
            {currentUser.honorLevel === "rookie" && (
              <div className="h-full bg-gradient-to-r from-gray-300 to-gray-400 rounded-full" style={{ width: `${(currentUser.honorPoints / 99) * 100}%` }} />
            )}
            {currentUser.honorLevel === "apprentice" && (
              <div className="h-full bg-gradient-to-r from-blue-300 to-blue-500 rounded-full" style={{ width: `${((currentUser.honorPoints - 100) / 399) * 100}%` }} />
            )}
          </div>
          <div className="flex justify-between text-[10px] text-gray-500">
            <span>{honorLevelNames[currentUser.honorLevel]}</span>
            {currentUser.honorLevel === "rookie" && <span>距学徒还需 {100 - currentUser.honorPoints} 分</span>}
            {currentUser.honorLevel === "apprentice" && <span>距匠人还需 {500 - currentUser.honorPoints} 分</span>}
          </div>
        </div>
      </div>

      {/* C. 成长轨迹 — 进度追踪 */}
      <div className="px-4 pt-4 space-y-3">
        {/* 成长里程碑 — 简化版：3个已完成 + 下2个 */}
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <IconFlag size={16} className="text-amber-500" />
            <span className="text-sm font-semibold text-gray-900">成长里程碑</span>
          </div>
          <div className="space-y-0">
            {/* P1-7: Milestone rewards header */}
            <div className="text-[10px] text-gray-500 mb-2 flex items-center gap-1 px-9">
              <IconCoins size={10} className="text-amber-500" />
              <span>完成里程碑可获得积分和荣誉奖励</span>
            </div>
          
            {milestones.slice(0, 5).map((m, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="flex flex-col items-center shrink-0">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${m.done ? "bg-[#2DD4A8]" : "bg-gray-100"}`}>
                    {m.done ? <IconCheck size={12} className="text-white" /> : (() => { const Mc = milestoneIconMap[m.icon]; return Mc ? <Mc size={12} className="text-gray-500" /> : <span className="text-[8px] text-gray-500">{i + 1}</span>; })()}
                  </div>
                  {i < 4 && <div className={`w-0.5 h-5 ${m.done ? "bg-[#2DD4A8]/30" : "bg-gray-100"}`} />}
                </div>
                <div className="pb-3">
                  <div className={`text-xs ${m.done ? "text-gray-900 font-medium" : "text-gray-500"}`}>{m.label}</div>
                  <div className="text-[10px] text-gray-500">{m.desc}</div>
                  {m.done && <div className="text-[10px] text-[#2DD4A8] mt-0.5">✓ {m.date}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 最近成长 */}
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <IconActivity size={16} className="text-[#2DD4A8]" />
            <span className="text-sm font-semibold text-gray-900">最近成长</span>
          </div>
          <div className="space-y-3">
            {growthLog.map((day) => (
              <div key={day.date}>
                <div className="text-[10px] font-medium text-gray-500 mb-1.5">{day.date}</div>
                <div className="space-y-1">
                  {day.events.map((evt, i) => (
                    <div key={i} className="text-xs text-gray-600 pl-3 border-l-2 border-[#2DD4A8]/20">{evt}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* D. 快捷入口 — 分组导航 */}
      <div className="px-4 pt-4 pb-20 space-y-4">
        {/* 学习相关 */}
        <div>
          <div className="text-xs font-semibold text-gray-500 mb-2">学习相关</div>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <Link href="/profile/path" className="flex items-center gap-3 px-4 py-3.5 border-b border-gray-50 hover:bg-gray-50">
              <IconMap size={16} className="text-gray-500" />
              <span className="text-sm text-gray-700 flex-1">学习路径</span>
              <span className="text-[10px] text-gray-500 mr-1">{myPath.title}</span>
              <IconChevronRight size={16} className="text-gray-300" />
            </Link>
            <Link href="/profile/notes" className="flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50">
              <IconBookmark size={16} className="text-gray-500" />
              <span className="text-sm text-gray-700 flex-1">我的收藏</span>
              <IconChevronRight size={16} className="text-gray-300" />
            </Link>
          </div>
        </div>

        {/* 认证相关 */}
        <div>
          <div className="text-xs font-semibold text-gray-500 mb-2">认证相关</div>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <Link href="/profile/certification" className="flex items-center gap-3 px-4 py-3.5 border-b border-gray-50 hover:bg-gray-50">
              <IconCertification size={16} className="text-gray-500" />
              <span className="text-sm text-gray-700 flex-1">认证中心</span>
              <span className="text-[10px] text-[#2DD4A8] mr-1">{earnedCerts}张已获</span>
              {inProgressCerts > 0 && <span className="text-[10px] text-blue-500 mr-1">{inProgressCerts}项准备中</span>}
              <IconChevronRight size={16} className="text-gray-300" />
            </Link>
            <Link href="/profile/certificate" className="flex items-center gap-3 px-4 py-3.5 border-b border-gray-50 hover:bg-gray-50">
              <IconTrophy size={16} className="text-gray-500" />
              <span className="text-sm text-gray-700 flex-1">我的证书</span>
              <span className="text-[10px] text-gray-500 mr-1">{userCertifications.filter(c => c.status === "earned").length}张</span>
              <IconChevronRight size={16} className="text-gray-300" />
            </Link>
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-gray-50 hover:bg-gray-50">
              <IconCoins size={16} className="text-gray-500" />
              <span className="text-sm text-gray-700 flex-1">奖学金记录</span>
              <span className="text-[10px] text-amber-600 mr-1">¥{scholarshipHistory.reduce((sum, s) => sum + s.amount, 0)}</span>
              <IconChevronRight size={16} className="text-gray-300" />
            </div>
          </div>
        </div>

        {/* 成为认证教练 CTA */}
        <Link href="/profile/expert" className="block">
          <div className="bg-gradient-to-br from-amber-50/80 to-orange-50/50 rounded-xl p-4 border border-amber-200/30">
            <div className="flex items-center gap-2 mb-2">
              <IconBadgeCheck size={16} className="text-amber-600" />
              <span className="text-sm font-semibold text-gray-900">成为认证教练 / 课程提供方</span>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed mb-3">
              {hasOPCCertInProgress
                ? "你正在准备OPC认证，通过后即可申请成为认证教练或课程提供方，用你的经验赚取收入。"
                : "持有OPC认证的专家可以：做认证评审教练（单次¥50-100）、创建付费课程（收入90%归你）、帮助更多人成长。"
              }
            </p>
            <div className="flex items-center gap-3">
              <div className="flex-1 flex items-center gap-1.5 text-[10px] text-gray-500">
                <IconChalkboard size={12} className="text-amber-500" />
                <span>认证教练 · 评审收费</span>
              </div>
              <div className="flex-1 flex items-center gap-1.5 text-[10px] text-gray-500">
                <IconChalkboard size={12} className="text-blue-500" />
                <span>课程提供方 · 卖课收入</span>
              </div>
            </div>
          </div>
        </Link>
      </div>

      <BottomNav />
    </div>
  );
}
