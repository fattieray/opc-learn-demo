"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import BottomNav from "@/components/BottomNav";
import Onboarding from "@/components/Onboarding";
import {
  IconTarget, IconClock, IconCoins, IconTrophy, IconTrendingUp,
  IconBookOpen, IconUsers, IconMessage, IconChevronRight, IconZap,
  IconAward, IconFire, IconCheckCircle, IconBriefcase,
} from "@/components/Icons";
import { currentUser } from "@/lib/mock/users";
import { tasks } from "@/lib/mock/tasks";

// 用户学习统计数据
const userStats = {
  totalLearningHours: 12.5,
  completedCourses: 3,
  inProgressCourses: 2,
  certificates: 2,
  scholarships: 3200,
  honorPoints: 850,
  streak: 7,
  rank: "前15%",
};

// 进行中的课程
const currentCourses = [
  {
    id: "r-micro-01",
    title: "小红书种草文案速成",
    progress: 100,
    status: "completed",
    industry: "retail",
    industryColor: "#2DD4A8",
    nextAction: "查看证书",
    nextActionUrl: "/profile/certificate",
  },
  {
    id: "r-micro-02",
    title: "电商详情页卖点提炼",
    progress: 75,
    status: "in-progress",
    industry: "retail",
    industryColor: "#2DD4A8",
    nextAction: "继续学习",
    nextActionUrl: "/courses/r-micro-02",
  },
  {
    id: "r-task-03",
    title: "为美妆品牌私域社群设计一周早安文案",
    progress: 60,
    status: "in-progress",
    industry: "retail",
    industryColor: "#2DD4A8",
    nextAction: "提交作业",
    nextActionUrl: "/courses/r-task-03",
  },
];

// 今日学习任务
const todayTasks = [
  {
    id: "task-1",
    title: "完成种草文案第3模块",
    course: "小红书种草文案速成",
    type: "video",
    duration: "15分钟",
    completed: true,
  },
  {
    id: "task-2",
    title: "点评2份同伴作业",
    course: "电商详情页卖点提炼",
    type: "review",
    duration: "20分钟",
    completed: false,
  },
  {
    id: "task-3",
    title: "阅读AIDA框架资源",
    course: "小红书种草文案速成",
    type: "reading",
    duration: "10分钟",
    completed: false,
  },
];

// 学习圈动态
const recentActivities = [
  {
    id: "act-1",
    user: "小月",
    avatar: "月",
    avatarColor: "bg-violet-50 text-violet-600",
    action: "通过了OPC认证评估",
    time: "2小时前",
    type: "certification",
  },
  {
    id: "act-2",
    user: "阿杰",
    avatar: "杰",
    avatarColor: "bg-blue-50 text-blue-600",
    action: "完成了旅行笔记速写课程",
    time: "5小时前",
    type: "completion",
  },
  {
    id: "act-3",
    user: "林雪",
    avatar: "L",
    avatarColor: "bg-amber-50 text-amber-600",
    action: "认可了你的文案进步",
    time: "昨天",
    type: "praise",
  },
];

// 推荐课程
const recommendedCourses = [
  {
    id: "t-micro-01",
    title: "小红书旅行种草笔记速写",
    industry: "tourism",
    industryName: "文旅行业",
    industryColor: "#8B5CF6",
    duration: "2小时",
    reason: "基于你的学习兴趣和职业发展",
  },
  {
    id: "r-sys-01",
    title: "小红书内容运营全栈能力",
    industry: "retail",
    industryName: "零售电商",
    industryColor: "#2DD4A8",
    duration: "10小时",
    reason: "体系课，助你晋升主管",
  },
];

export default function UserDashboard() {
  const router = useRouter();
  const user = currentUser;
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    // Check if user has completed onboarding
    const hasCompletedOnboarding = localStorage.getItem("onboarding_completed");
    if (!hasCompletedOnboarding) {
      setShowOnboarding(true);
    }
  }, []);

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Onboarding Modal */}
      {showOnboarding && <Onboarding onComplete={handleOnboardingComplete} />}

      {/* Header with User Info */}
      <header className="bg-gradient-to-br from-[#2DD4A8] to-[#14B88C] text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold backdrop-blur-sm">
                {user.name.charAt(0)}
              </div>
              <div>
                <h1 className="text-2xl font-bold mb-1">你好，{user.name} 👋</h1>
                <p className="text-white/80 text-sm">继续今天的学习之旅吧！</p>
              </div>
            </div>
            <Link
              href="/profile"
              className="px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors text-sm font-medium backdrop-blur-sm"
            >
              个人中心
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <IconClock size={18} className="text-white/90" />
                <span className="text-sm text-white/90">学习时长</span>
              </div>
              <div className="text-2xl font-bold">{userStats.totalLearningHours}h</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <IconBookOpen size={18} className="text-white/90" />
                <span className="text-sm text-white/90">完成课程</span>
              </div>
              <div className="text-2xl font-bold">{userStats.completedCourses}</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <IconCoins size={18} className="text-white/90" />
                <span className="text-sm text-white/90">奖学金</span>
              </div>
              <div className="text-2xl font-bold">¥{userStats.scholarships}</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <IconFire size={18} className="text-white/90" />
                <span className="text-sm text-white/90">连续学习</span>
              </div>
              <div className="text-2xl font-bold">{userStats.streak}天</div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 -mt-4">
        {/* Today's Tasks */}
        <section className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <IconTarget size={20} className="text-[#2DD4A8]" />
              <h2 className="text-lg font-bold text-gray-900">今日学习任务</h2>
            </div>
            <span className="text-sm text-gray-500">
              {todayTasks.filter(t => t.completed).length}/{todayTasks.length} 已完成
            </span>
          </div>
          <div className="space-y-3">
            {todayTasks.map((task) => (
              <div
                key={task.id}
                className={`flex items-center gap-4 p-4 rounded-lg border transition-all ${
                  task.completed
                    ? "bg-gray-50 border-gray-100 opacity-60"
                    : "bg-white border-gray-200 hover:border-[#2DD4A8]/30"
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    task.completed
                      ? "bg-[#2DD4A8] border-[#2DD4A8]"
                      : "border-gray-300"
                  }`}
                >
                  {task.completed && <IconCheckCircle size={14} className="text-white" />}
                </div>
                <div className="flex-1">
                  <div className={`text-sm font-medium ${task.completed ? "line-through text-gray-500" : "text-gray-900"}`}>
                    {task.title}
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                    <span>{task.course}</span>
                    <span>·</span>
                    <span>{task.duration}</span>
                  </div>
                </div>
                {!task.completed && (
                  <button className="px-4 py-2 rounded-lg bg-[#2DD4A8] text-white text-sm font-medium hover:bg-[#14B88C] transition-colors">
                    开始
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Continue Learning */}
        <section className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <IconBookOpen size={20} className="text-blue-500" />
              <h2 className="text-lg font-bold text-gray-900">继续学习</h2>
            </div>
            <Link href="/courses" className="text-sm text-[#2DD4A8] font-medium flex items-center gap-1">
              查看全部 <IconChevronRight size={14} />
            </Link>
          </div>
          <div className="space-y-4">
            {currentCourses.filter(c => c.status === "in-progress").map((course) => (
              <Link key={course.id} href={course.nextActionUrl} className="block">
                <div className="p-4 rounded-lg border border-gray-100 hover:border-[#2DD4A8]/30 hover:shadow-md transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-gray-900 mb-1">{course.title}</h3>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span
                          className="px-2 py-0.5 rounded"
                          style={{ backgroundColor: course.industryColor + "20", color: course.industryColor }}
                        >
                          {course.industry === "retail" ? "零售电商" : course.industry === "tourism" ? "文旅行业" : "制造B2B"}
                        </span>
                        <span>进度 {course.progress}%</span>
                      </div>
                    </div>
                    <span className="text-xs font-medium text-[#2DD4A8]">{course.nextAction}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#2DD4A8] to-[#14B88C] rounded-full transition-all"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Two Column Layout */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Honor & Achievements */}
          <section className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <IconTrophy size={20} className="text-amber-500" />
              <h2 className="text-lg font-bold text-gray-900">荣誉与成就</h2>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="p-4 rounded-lg bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100">
                <div className="flex items-center gap-2 mb-2">
                  <IconAward size={18} className="text-amber-600" />
                  <span className="text-xs text-gray-600">荣誉积分</span>
                </div>
                <div className="text-2xl font-bold text-amber-600">{userStats.honorPoints}</div>
              </div>
              <div className="p-4 rounded-lg bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-100">
                <div className="flex items-center gap-2 mb-2">
                  <IconTrophy size={18} className="text-violet-600" />
                  <span className="text-xs text-gray-600">技能证书</span>
                </div>
                <div className="text-2xl font-bold text-violet-600">{userStats.certificates}</div>
              </div>
            </div>
            <Link
              href="/profile"
              className="block w-full py-2.5 rounded-lg bg-gray-50 text-gray-700 text-sm font-medium text-center hover:bg-gray-100 transition-colors"
            >
              查看详细成就
            </Link>
          </section>

          {/* Recent Activities */}
          <section className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <IconUsers size={20} className="text-violet-500" />
                <h2 className="text-lg font-bold text-gray-900">学习圈动态</h2>
              </div>
              <Link href="/circles" className="text-sm text-[#2DD4A8] font-medium">
                更多
              </Link>
            </div>
            <div className="space-y-3">
              {recentActivities.map((activity) => (
                <Link key={activity.id} href={`/users/${activity.id}`} className="block">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${activity.avatarColor}`}>
                      {activity.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-gray-900 mb-1">
                        <span className="font-semibold">{activity.user}</span>{" "}
                        {activity.action}
                      </div>
                      <div className="text-[10px] text-gray-500">{activity.time}</div>
                    </div>
                    <IconChevronRight size={14} className="text-gray-300 shrink-0 mt-1" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>

        {/* Recommended Courses */}
        <section className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <div className="flex items-center gap-2 mb-4">
            <IconZap size={20} className="text-[#2DD4A8]" />
            <h2 className="text-lg font-bold text-gray-900">为你推荐</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {recommendedCourses.map((course) => (
              <Link key={course.id} href={`/courses/${course.id}`} className="block">
                <div className="p-4 rounded-lg border border-gray-100 hover:border-[#2DD4A8]/30 hover:shadow-md transition-all">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-sm font-semibold text-gray-900 flex-1">{course.title}</h3>
                    <span
                      className="text-[10px] px-2 py-0.5 rounded shrink-0 ml-2"
                      style={{ backgroundColor: course.industryColor + "20", color: course.industryColor }}
                    >
                      {course.industryName}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mb-2">{course.reason}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>⏱️ {course.duration}</span>
                    <span className="text-[#2DD4A8] font-medium">开始学习 →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Learning Insights */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <IconTrendingUp size={20} className="text-blue-600" />
            <h2 className="text-lg font-bold text-gray-900">学习洞察</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white/60 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">班级排名</div>
              <div className="text-2xl font-bold text-blue-600">{userStats.rank}</div>
              <div className="text-xs text-gray-500 mt-1">继续保持！</div>
            </div>
            <div className="bg-white/60 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">本周学习</div>
              <div className="text-2xl font-bold text-blue-600">5.5小时</div>
              <div className="text-xs text-green-600 mt-1">↑ 比上周多1.2小时</div>
            </div>
            <div className="bg-white/60 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">预计完成</div>
              <div className="text-2xl font-bold text-blue-600">2周后</div>
              <div className="text-xs text-gray-500 mt-1">保持当前进度</div>
            </div>
          </div>
        </section>
      </main>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
