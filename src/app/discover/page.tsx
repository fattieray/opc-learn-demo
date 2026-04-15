"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import { api, authUtils } from "@/lib/api";
import type { UserResponse, CourseResponse } from "@/types/api";
import {
  IconTrendingUp, IconZap, IconLightbulb, IconChevronRight,
  IconFire, IconBarChart, IconBookOpen, IconTarget, IconGraduationCap, IconMap,
  IconBriefcase, IconShield, IconCheck, IconArrowRight, IconFlag, IconActivity,
  IconCertification, IconExam, IconBadgeCheck, IconStar, IconChalkboard,
} from "@/components/Icons";
import { discoverData, industries, paths, certifications, userCertifications, experts, expertCourses } from "@/lib/mock/data";
import { tasks } from "@/lib/mock/tasks";
import { currentUser, learners } from "@/lib/mock/users";

// Mock peer activity data
const peerActivities = [
  { user: "思琪", avatar: "琪", action: "完成了第2门微技能课", course: "电商详情页卖点提炼", time: "2小时前", skill: "文案写作", level: "apprentice" },
  { user: "阿明", avatar: "明", action: "开始学习体系课", course: "小红书内容运营全栈能力", time: "5小时前", skill: "内容策划", level: "apprentice" },
  { user: "小韩", avatar: "韩", action: "获得了旅行笔记技能认证", course: "小红书旅行种草笔记速写", time: "昨天", skill: "旅行叙事", level: "apprentice" },
  { user: "小月", avatar: "月", action: "通过了OPC认证评估", course: "OPC内容运营认证", time: "昨天", skill: "全栈运营", level: "artisan" },
  { user: "阿杰", avatar: "杰", action: "完成了第1门微技能课", course: "小红书种草文案速成", time: "2天前", skill: "文案写作", level: "rookie" },
];

export default function DiscoverPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserResponse | null>(null);
  const [userCourses, setUserCourses] = useState<CourseResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authUtils.isAuthenticated()) {
      router.push("/login");
      return;
    }

    api.users.me()
      .then((userData) => {
        setUser(userData);
        // Fetch courses for user's industry
        if (userData.industry_preference) {
          return api.courses.list({ industry: userData.industry_preference });
        }
        return [];
      })
      .then((courses) => {
        setUserCourses(courses);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load discover page:", err);
        setLoading(false);
      });
  }, [router]);

  // Fallback to mock data
  const displayUser = user || {
    ...currentUser,
    industry_preference: currentUser.industry,
  };
  const displayCourses = userCourses.length > 0 ? userCourses : tasks.filter((t) => t.type === "micro" && t.industry === displayUser.industry_preference);
  
  const userPath = paths.find((p) => p.industry === displayUser.industry_preference) || paths[0];
  const microCourses = displayCourses.filter((t) => t.type === "micro");
  const systemCourses = displayCourses.filter((t) => t.type === "system");
  const completedMicro = 1; // Demo: completed 1 micro course
  const totalMicro = microCourses.length || 1;
  const ind = industries[displayUser.industry_preference as keyof typeof industries];

  // Growth speed calculation
  const avgWeeksPerCourse = 1.5;
  const myPace = "正常"; // Mock pace indicator

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      {/* Header */}
      <div className="bg-white px-5 pt-12 pb-4 border-b border-gray-100">
        <h1 className="text-xl font-bold text-gray-900">成长罗盘</h1>
        <p className="text-xs text-gray-500 mt-1">你在哪里、能去哪里、下一步做什么</p>
      </div>

      {/* A. 我的成长导航 — 个性化 + 高优先级 */}
      <div className="px-4 pt-4 space-y-3">
        {/* 紧凑版成长之旅 */}
        <div className="bg-gradient-to-br from-[#2DD4A8]/10 to-[#2DD4A8]/5 rounded-xl p-4 border border-[#2DD4A8]/20">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-[#2DD4A8] flex items-center justify-center">
              <IconFlag size={16} className="text-white" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold text-gray-900">职业成长之旅</div>
              <div className="text-[10px] text-gray-500">{userPath.title} · {ind.name}</div>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#2DD4A8]/10 text-[#14B88C] font-medium">{completedMicro}/{totalMicro}完成</span>
          </div>

          {/* 当前阶段 + 下一阶段 */}
          <div className="space-y-3">
            {/* 微技能阶段 — 当前 */}
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-[#2DD4A8] flex items-center justify-center shrink-0">
                <IconZap size={12} className="text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-gray-900">微技能课阶段</span>
                  <span className="text-[10px] text-[#2DD4A8]">{completedMicro}/{totalMicro}</span>
                </div>
                <div className="h-1.5 bg-white/60 rounded-full overflow-hidden">
                  <div className="h-full bg-[#2DD4A8] rounded-full" style={{ width: `${(completedMicro / totalMicro) * 100}%` }} />
                </div>
                <div className="text-[10px] text-amber-600 mt-1">入行：{microCourses[0]?.career?.title || "运营实习生"} · {microCourses[0]?.career?.salaryRange || "4k-7k"}</div>
              </div>
            </div>
            {/* 体系课阶段 — 待解锁 */}
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                <IconShield size={12} className="text-gray-500" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-gray-500">体系课阶段</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">完成{totalMicro - completedMicro}门解锁</span>
                </div>
                <div className="h-1.5 bg-white/40 rounded-full overflow-hidden">
                  <div className="h-full bg-gray-200 rounded-full" style={{ width: "0%" }} />
                </div>
                <div className="text-[10px] text-gray-500 mt-1">进阶：{(systemCourses[0] as any)?.careerGrowth?.title || "运营主管"} · {(systemCourses[0] as any)?.careerGrowth?.salaryRange || "10k+"}</div>
              </div>
            </div>
          </div>
        </div>

        {/* 下一步推荐 */}
        {microCourses.slice(completedMicro, completedMicro + 1).map((course) => (
          <Link key={course.id} href={`/courses/${course.id}`} className="block">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-white border border-amber-200/30 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
                <IconZap size={18} className="text-amber-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-gray-900 mb-0.5">下一步推荐</div>
                <div className="text-xs text-gray-700 truncate">{course.title}</div>
                {course.career && (
                  <div className="text-[10px] text-amber-600 mt-0.5">{course.career.title} · {course.career.salaryRange}</div>
                )}
              </div>
              <IconChevronRight size={16} className="text-gray-300 shrink-0" />
            </div>
          </Link>
        ))}

        {/* 成长速度 */}
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <IconActivity size={16} className="text-[#2DD4A8]" />
              <span className="text-sm font-semibold text-gray-900">我的成长速度</span>
            </div>
            <span className="text-[10px] text-[#2DD4A8] font-medium">学习节奏：{myPace}</span>
          </div>
          <div className="flex gap-2 text-[10px]">
            <div className="flex-1 p-2 rounded-lg bg-gray-50 text-center">
              <div className="text-gray-500 mb-0.5">已投入</div>
              <div className="font-medium text-gray-700">2小时</div>
            </div>
            <div className="flex-1 p-2 rounded-lg bg-gray-50 text-center">
              <div className="text-gray-500 mb-0.5">本周目标</div>
              <div className="font-medium text-[#2DD4A8]">3小时</div>
            </div>
            <div className="flex-1 p-2 rounded-lg bg-gray-50 text-center">
              <div className="text-gray-500 mb-0.5">连续学习</div>
              <div className="font-medium text-amber-600">5天</div>
            </div>
          </div>
          <div className="mt-2 pt-2 border-t border-gray-50 text-[10px] text-gray-500 text-center">
            预计 <span className="text-[#2DD4A8] font-medium">6周</span> 完成微技能课阶段
          </div>
        </div>
      </div>

      {/* B. AI成长建议 — 智能推荐，提前展示 */}
      <div className="px-4 pt-4">
        <div className="bg-gradient-to-br from-[#2DD4A8]/10 to-[#2DD4A8]/5 rounded-xl p-4 border border-[#2DD4A8]/20">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-[#2DD4A8] flex items-center justify-center">
              <IconLightbulb size={16} className="text-white" />
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-900">AI 成长顾问</div>
              <div className="text-[10px] text-gray-500">基于你的进度，为你规划</div>
            </div>
          </div>
          <div className="space-y-2">
            {[
              { text: "建议接下来学详情页卖点提炼，覆盖「写」和「卖」两个核心能力", action: "去学习", href: "/courses/r-micro-02" },
              { text: "完成3门微技能课后，入行岗位选择将增加到3个方向", action: null, href: null },
              { text: "种草文案技能需求同比+200%，你的选择很明智", action: null, href: null },
            ].map((insight, i) => (
              <div key={i} className="flex items-start gap-2 bg-white/60 rounded-lg p-2.5">
                <IconLightbulb size={14} className="text-[#2DD4A8] shrink-0 mt-0.5" />
                <div className="flex-1">
                  <span className="text-xs text-gray-700">{insight.text}</span>
                  {insight.action && insight.href && (
                    <Link href={insight.href} className="ml-2 text-[10px] text-[#2DD4A8] font-medium hover:underline">{insight.action} →</Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* C. 同伴动态 + 推荐导师 */}
      <div className="px-4 pt-4 space-y-3">
        {/* 同伴在做什么 */}
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <IconGraduationCap size={16} className="text-violet-500" />
            <span className="text-sm font-semibold text-gray-900">同伴在做什么</span>
            <span className="text-[10px] text-gray-500 ml-auto">同方向学员</span>
          </div>
          <div className="space-y-3">
            {peerActivities.map((peer, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-violet-50 flex items-center justify-center text-xs font-bold text-violet-600 shrink-0">{peer.avatar}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-medium text-gray-900">{peer.user}</span>
                    <span className="text-[9px] px-1 py-0.5 rounded bg-violet-50 text-violet-500">学徒</span>
                  </div>
                  <div className="text-xs text-gray-600 mt-0.5">{peer.action}</div>
                  <div className="text-[10px] text-gray-500 mt-0.5">{peer.course} · {peer.time}</div>
                </div>
                <div className="shrink-0 text-center">
                  <div className="text-[9px] text-gray-500">技能</div>
                  <div className="text-[10px] font-medium text-[#2DD4A8]">{peer.skill}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-gray-50 text-center">
            <span className="text-[10px] text-gray-500">你有 <span className="text-[#2DD4A8] font-medium">3位</span> 同伴正在同方向学习</span>
          </div>
        </div>

        {/* 推荐导师 */}
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <IconBadgeCheck size={16} className="text-amber-500" />
            <span className="text-sm font-semibold text-gray-900">推荐导师</span>
            <span className="text-[10px] text-gray-500 ml-auto">认证教练+课程提供方</span>
          </div>
          <div className="space-y-3">
            {experts.filter((e) => e.industry === displayUser.industry_preference || e.industry === "retail").slice(0, 2).map((expert) => {
              const expertName = expert.userId === "coach-lin" ? "林雪" : expert.userId === "coach-chen" ? "陈野" : "赵工";
              const expertAvatar = expert.userId === "coach-lin" ? "L" : expert.userId === "coach-chen" ? "C" : "Z";
              const ind = industries[expert.industry];
              return (
                <div key={expert.userId} className="p-3 rounded-lg bg-gray-50/80 border border-gray-100/50">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-sm font-bold text-amber-700 shrink-0">{expertAvatar}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-xs font-semibold text-gray-900">{expertName}</span>
                        {expert.roles.includes("cert_coach") && (
                          <span className="text-[8px] px-1 py-0.5 rounded bg-blue-50 text-blue-500 flex items-center gap-0.5"><IconBadgeCheck size={7} />认证教练</span>
                        )}
                        <span className="text-[9px] text-amber-500 flex items-center gap-0.5 ml-auto"><IconStar size={8} className="text-amber-400" />{expert.stats.avgRating}</span>
                      </div>
                      <div className="text-[10px] text-gray-500 mb-1.5">{expert.bio}</div>
                      <div className="flex items-center gap-2 text-[10px] text-gray-500">
                        <span>{ind.name}</span>
                        <span>·</span>
                        <span>{expert.specialties.slice(0, 3).join("、")}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-2 pt-2 border-t border-gray-100/50">
                    <div className="text-[10px] text-gray-500">已完成 {expert.stats.reviewsCompleted} 次评审</div>
                    <div className="text-[10px] text-gray-500">{expert.stats.totalStudents} 位学员</div>
                    <div className="text-[10px] text-[#2DD4A8] font-medium ml-auto">查看详情 →</div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-3 pt-3 border-t border-gray-50 text-center">
            <Link href="/profile/expert" className="text-[10px] text-amber-500 font-medium">你也可以成为认证导师 →</Link>
          </div>
        </div>
      </div>

      {/* D. 探索更多 — 通用内容，低优先级 */}
      <div className="px-4 pt-4 pb-20 space-y-4">
        {/* 职业方向 */}
        <div>
          <div className="text-xs font-semibold text-gray-500 mb-3 flex items-center gap-2">
            <IconMap size={14} />
            职业方向
          </div>
          <div className="space-y-3">
            {paths.map((path) => {
              const pInd = industries[path.industry];
              const isActive = path.industry === displayUser.industry_preference;
              const microList = tasks.filter((t) => t.type === "micro" && t.industry === path.industry);
              const sysCourse = tasks.find((t) => t.type === "system" && t.industry === path.industry);
              return (
                <Link key={path.id} href="/profile/path" className="block">
                  <div className={`bg-white rounded-xl p-4 border shadow-sm ${isActive ? "border-[#2DD4A8]/30" : "border-gray-100"}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ backgroundColor: pInd.bgColor, color: pInd.color }}>
                        {pInd.name}
                      </span>
                      {isActive && <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#2DD4A8]/10 text-[#14B88C]">当前方向</span>}
                    </div>
                    <div className="font-medium text-sm text-gray-900 mb-2">{path.title}</div>
                    <div className="flex items-center gap-4 bg-gray-50 rounded-lg p-2.5">
                      <div className="flex-1">
                        <div className="text-[10px] text-gray-500 mb-0.5">入行起点</div>
                        <div className="text-xs font-medium text-amber-600">
                          {microList[0]?.career?.title || "运营实习生"} · {microList[0]?.career?.salaryRange || "4k-7k"}
                        </div>
                      </div>
                      <IconArrowRight size={12} className="text-gray-300" />
                      <div className="flex-1">
                        <div className="text-[10px] text-gray-500 mb-0.5">职业进阶</div>
                        <div className="text-xs font-medium text-violet-600">
                          {sysCourse?.careerGrowth?.title || "运营主管"} · {sysCourse?.careerGrowth?.salaryRange || "10k+"}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* 市场急需技能 */}
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <IconFire size={16} className="text-amber-500" />
            <span className="text-sm font-semibold text-gray-900">市场急需技能</span>
          </div>
          <div className="space-y-2.5">
            {discoverData.hotSkills.map((skill) => (
              <div key={skill.name} className="flex items-center gap-3">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-gray-700">{skill.name}</span>
                    <span className="text-[10px] text-[#2DD4A8] font-medium">{skill.growth}</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#2DD4A8] to-[#2DD4A8]/60 rounded-full" style={{ width: `${skill.heat * 20}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 行业洞察 */}
        <div>
          <div className="text-xs font-semibold text-gray-500 mb-3 flex items-center gap-2">
            <IconBarChart size={14} />
            行业洞察
          </div>
          <div className="space-y-2">
            {discoverData.insights.map((insight) => {
              const iInd = industries[insight.industry as keyof typeof industries];
              return (
                <div key={insight.id} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: iInd.bgColor }}>
                      <IconBookOpen size={16} style={{ color: iInd.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] mb-1">
                        <span className="px-1.5 py-0.5 rounded" style={{ backgroundColor: iInd.bgColor, color: iInd.color }}>{iInd.name}</span>
                        <span className="text-gray-300 ml-2">{insight.readTime}分钟阅读</span>
                      </div>
                      <div className="text-sm text-gray-800">{insight.title}</div>
                    </div>
                    <IconChevronRight size={14} className="text-gray-300 shrink-0 mt-2" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
