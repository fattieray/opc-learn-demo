"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import BottomNav from "@/components/BottomNav";
import {
  IconArrowLeft, IconUsers, IconTrophy, IconCoins, IconAward,
  IconBookOpen, IconClock, IconMessage, IconThumbsUp, IconEye,
  IconSend, IconCheckCircle, IconTarget, IconTrendingUp,
  IconChevronRight, IconStar,
} from "@/components/Icons";
import { learners, coaches, User } from "@/lib/mock/users";
import { industries } from "@/lib/mock/data";

// 用户动态数据
const userActivities = [
  {
    id: "act-1",
    type: "complete",
    content: "完成了「小红书种草文案速成」课程",
    time: "2小时前",
    likes: 12,
    comments: 3,
  },
  {
    id: "act-2",
    type: "submit",
    content: "提交了作业：为母婴品牌写3条种草文案",
    time: "昨天",
    likes: 8,
    comments: 5,
  },
  {
    id: "act-3",
    type: "help",
    content: "帮助小林理解了AIDA文案框架",
    time: "3天前",
    likes: 15,
    comments: 2,
  },
  {
    id: "act-4",
    type: "certificate",
    content: "获得了「种草文案」技能认证",
    time: "1周前",
    likes: 25,
    comments: 8,
  },
];

// 用户作业展示
const userAssignments = [
  {
    id: "assign-1",
    title: "为母婴品牌写3条小红书种草文案",
    course: "小红书种草文案速成",
    score: 85,
    level: "优秀",
    submittedAt: "2026-04-10",
    coachComment: "文案情感共鸣做得很好，场景化描述生动",
  },
  {
    id: "assign-2",
    title: "电商详情页卖点提炼练习",
    course: "电商详情页卖点提炼",
    score: 78,
    level: "良好",
    submittedAt: "2026-04-08",
    coachComment: "卖点提炼准确，建议加强行动号召部分",
  },
];

// 获得的技能认证
const userCertificates = [
  {
    id: "cert-1",
    title: "种草文案技能认证",
    course: "小红书种草文案速成",
    issuedAt: "2026-04-12",
    score: 85,
  },
  {
    id: "cert-2",
    title: "详情页文案技能认证",
    course: "电商详情页卖点提炼",
    issuedAt: "2026-04-09",
    score: 78,
  },
];

// 学习伙伴
const studyPartners = [
  { id: "user-jie", name: "阿杰", avatar: "杰", avatarColor: "bg-blue-50 text-blue-600", level: "rookie" },
  { id: "user-lin", name: "小林", avatar: "林", avatarColor: "bg-green-50 text-green-600", level: "rookie" },
  { id: "user-qi", name: "思琪", avatar: "琪", avatarColor: "bg-[#2DD4A8]/10 text-[#14B88C]", level: "apprentice" },
];

const honorLevelNames: Record<string, string> = {
  rookie: "新手",
  apprentice: "学徒",
  artisan: "匠人",
  master: "大师",
};

const honorLevelColors: Record<string, string> = {
  rookie: "bg-gray-100 text-gray-600",
  apprentice: "bg-blue-50 text-blue-600",
  artisan: "bg-violet-50 text-violet-600",
  master: "bg-amber-50 text-amber-600",
};

export default function UserProfilePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"activities" | "assignments" | "certificates">("activities");

  // 查找用户
  const user = learners.find(u => u.id === params.id) || coaches.find(c => c.id === params.id);
  
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">用户不存在</h2>
          <Link href="/circles" className="text-[#2DD4A8] font-medium">
            返回学习圈
          </Link>
        </div>
      </div>
    );
  }

  const ind = industries[user.industry as keyof typeof industries];
  const isCoach = user.role === "coach";

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white sticky top-0 z-40 border-b border-gray-100">
        <div className="flex items-center gap-3 px-4 pt-12 pb-3">
          <button onClick={() => router.back()} className="text-gray-500">
            <IconArrowLeft size={22} />
          </button>
          <div className="flex-1">
            <div className="text-base font-bold text-gray-900">学员主页</div>
          </div>
        </div>
      </div>

      {/* User Profile Card */}
      <div className="bg-gradient-to-br from-[#2DD4A8]/10 to-blue-50/50 pb-6">
        <div className="px-4 pt-6">
          <div className="flex items-start gap-4 mb-4">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold ${
              isCoach ? "bg-amber-100 text-amber-700" : "bg-white text-[#2DD4A8]"
            } shadow-lg`}>
              {user.avatar}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                {isCoach && (
                  <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-xs font-medium">
                    教练
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="text-[10px] px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: ind?.bgColor, color: ind?.color }}
                >
                  {ind?.name}
                </span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${honorLevelColors[user.honorLevel]}`}>
                  {honorLevelNames[user.honorLevel]}
                </span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">{user.bio}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white/80 rounded-xl p-3 text-center backdrop-blur-sm">
              <div className="flex justify-center mb-1">
                <IconBookOpen size={20} className="text-[#2DD4A8]" />
              </div>
              <div className="text-xl font-bold text-gray-900">{user.tasksCompleted}</div>
              <div className="text-[10px] text-gray-500">完成课程</div>
            </div>
            <div className="bg-white/80 rounded-xl p-3 text-center backdrop-blur-sm">
              <div className="flex justify-center mb-1">
                <IconCoins size={20} className="text-amber-500" />
              </div>
              <div className="text-xl font-bold text-gray-900">¥{user.scholarshipsEarned * 100}</div>
              <div className="text-[10px] text-gray-500">奖学金</div>
            </div>
            <div className="bg-white/80 rounded-xl p-3 text-center backdrop-blur-sm">
              <div className="flex justify-center mb-1">
                <IconAward size={20} className="text-violet-500" />
              </div>
              <div className="text-xl font-bold text-gray-900">{user.honorPoints}</div>
              <div className="text-[10px] text-gray-500">荣誉积分</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 pt-4 space-y-4">
        {/* Skills */}
        <section className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <IconTarget size={18} className="text-[#2DD4A8]" />
            <h2 className="text-sm font-bold text-gray-900">技能成长</h2>
          </div>
          <div className="space-y-3">
            {user.skills.map((skill) => (
              <div key={skill.name}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-700">{skill.name}</span>
                  <span className="text-xs font-medium text-[#2DD4A8]">{skill.score}分</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#2DD4A8]/60 to-[#2DD4A8] rounded-full transition-all"
                    style={{ width: `${skill.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Study Partners */}
        <section className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <IconUsers size={18} className="text-blue-500" />
              <h2 className="text-sm font-bold text-gray-900">学习伙伴</h2>
            </div>
            <span className="text-xs text-gray-500">{studyPartners.length}人</span>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {studyPartners.map((partner) => (
              <Link key={partner.id} href={`/users/${partner.id}`} className="block">
                <div className="text-center min-w-[60px]">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-1 ${partner.avatarColor}`}>
                    {partner.avatar}
                  </div>
                  <div className="text-[10px] text-gray-600">{partner.name}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Certificates */}
        {!isCoach && userCertificates.length > 0 && (
          <section className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <IconTrophy size={18} className="text-amber-500" />
                <h2 className="text-sm font-bold text-gray-900">技能认证</h2>
              </div>
              <span className="text-xs text-gray-500">{userCertificates.length}个</span>
            </div>
            <div className="space-y-2">
              {userCertificates.map((cert) => (
                <div key={cert.id} className="p-3 rounded-lg bg-gradient-to-r from-amber-50/50 to-orange-50/50 border border-amber-100/30">
                  <div className="flex items-start justify-between mb-1">
                    <div className="flex-1">
                      <div className="text-xs font-semibold text-gray-900 mb-0.5">{cert.title}</div>
                      <div className="text-[10px] text-gray-500">{cert.course}</div>
                    </div>
                    <div className="text-right ml-3">
                      <div className="text-sm font-bold text-amber-600">{cert.score}分</div>
                      <div className="text-[9px] text-gray-500">{cert.issuedAt}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Tabs: Activities / Assignments */}
        <section className="bg-white rounded-xl shadow-sm">
          {/* Tab Header */}
          <div className="flex border-b border-gray-100">
            <button
              onClick={() => setActiveTab("activities")}
              className={`flex-1 py-3 text-sm font-medium transition-colors ${
                activeTab === "activities"
                  ? "text-[#2DD4A8] border-b-2 border-[#2DD4A8]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              动态
            </button>
            {!isCoach && (
              <button
                onClick={() => setActiveTab("assignments")}
                className={`flex-1 py-3 text-sm font-medium transition-colors ${
                  activeTab === "assignments"
                    ? "text-[#2DD4A8] border-b-2 border-[#2DD4A8]"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                作业
              </button>
            )}
          </div>

          {/* Tab Content */}
          <div className="p-4">
            {activeTab === "activities" && (
              <div className="space-y-4">
                {userActivities.map((activity) => (
                  <div key={activity.id} className="pb-4 border-b border-gray-50 last:border-0">
                    <div className="flex items-start gap-3 mb-2">
                      <div className="flex-1">
                        <div className="text-xs text-gray-900 mb-1">{activity.content}</div>
                        <div className="text-[10px] text-gray-500">{activity.time}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <button className="flex items-center gap-1 hover:text-[#2DD4A8] transition-colors">
                        <IconThumbsUp size={12} />
                        <span>{activity.likes}</span>
                      </button>
                      <button className="flex items-center gap-1 hover:text-blue-500 transition-colors">
                        <IconMessage size={12} />
                        <span>{activity.comments}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "assignments" && (
              <div className="space-y-3">
                {userAssignments.map((assignment) => (
                  <div key={assignment.id} className="p-3 rounded-lg bg-gray-50">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="text-xs font-semibold text-gray-900 mb-0.5">{assignment.title}</div>
                        <div className="text-[10px] text-gray-500">{assignment.course}</div>
                      </div>
                      <div className="text-right ml-3">
                        <div className="text-sm font-bold text-[#2DD4A8]">{assignment.score}分</div>
                        <div className="text-[9px] text-gray-500">{assignment.level}</div>
                      </div>
                    </div>
                    {assignment.coachComment && (
                      <div className="text-[10px] text-gray-600 bg-white/60 p-2 rounded border border-gray-100/50">
                        💬 {assignment.coachComment}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Action Buttons */}
        <div className="space-y-3 pb-6">
          <button className="w-full py-3 rounded-xl bg-[#2DD4A8] text-white font-semibold hover:bg-[#14B88C] transition-colors flex items-center justify-center gap-2">
            <IconMessage size={18} />
            发送消息
          </button>
          <button className="w-full py-3 rounded-xl bg-white text-gray-700 font-semibold border border-gray-200 hover:border-[#2DD4A8]/30 transition-colors flex items-center justify-center gap-2">
            <IconUsers size={18} />
            邀请加入学习小组
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
