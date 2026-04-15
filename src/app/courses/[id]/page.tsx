"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { use } from "react";
import { useRouter } from "next/navigation";
import {
  IconArrowLeft, IconClock, IconUsers, IconFileText, IconChevronRight,
  IconBookOpen, IconClipboardCheck, IconMessage, IconPool, IconUser,
  IconCheck, IconStar, IconThumbsUp, IconSend, IconEdit,
  IconBookmark, IconEye, IconCoins, IconTarget, IconLightbulb,
  IconShield, IconTrophy, IconBriefcase, IconTrendingUp, IconZap,
} from "@/components/Icons";
import { api } from "@/lib/api";
import type { CourseDetail } from "@/types/api";
import { tasks, type Task } from "@/lib/mock/tasks";
import { squads } from "@/lib/mock/squads";
import { posts } from "@/lib/mock/posts";
import { currentUser } from "@/lib/mock/users";
import { industries } from "@/lib/mock/data";

const difficultyColors: Record<string, string> = {
  entry: "bg-green-50 text-green-700",
  standard: "bg-blue-50 text-blue-700",
  advanced: "bg-purple-50 text-purple-700",
};
const difficultyNames: Record<string, string> = {
  entry: "入门",
  standard: "标准",
  advanced: "进阶",
};
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
const assignmentTypeNames: Record<string, string> = {
  analysis: "分析型",
  creation: "创作型",
  review: "点评型",
  reflection: "反思型",
};
const assignmentTypeIcons: Record<string, typeof IconEye> = {
  analysis: IconEye,
  creation: IconEdit,
  review: IconMessage,
  reflection: IconLightbulb,
};

export default function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("content");
  const [expandedResource, setExpandedResource] = useState<string | null>(null);
  const [bookmarked, setBookmarked] = useState<Set<string>>(new Set());
  const [expandedModule, setExpandedModule] = useState<string | null>(null);

  // Fetch course from API
  useEffect(() => {
    setLoading(true);
    setError(null);
    
    api.courses.get(id)
      .then((data) => {
        // Only set course if data is not null
        if (data) {
          setCourse(data);
          // Set first module as expanded by default
          if (data.content && data.content.length > 0) {
            setExpandedModule(data.content[0].title);
          }
        } else {
          // If API returns null, try to find mock data
          const mockTask = tasks.find((t) => t.id === id);
          if (mockTask) {
            // Convert mock task to course format
            setCourse({
              id: mockTask.id,
              title: mockTask.title,
              type: mockTask.type,
              industry: mockTask.industry,
              estimatedMinutes: mockTask.estimatedMinutes,
              description: mockTask.scenario,
              career: mockTask.career ? {
                title: mockTask.career.title,
                salaryRange: mockTask.career.salaryRange,
              } : undefined,
              activeLearners: mockTask.activeLearners,
              recruitingSquads: mockTask.recruitingSquads,
              content: mockTask.syllabus?.modules.flatMap(m => 
                m.items.map(item => ({
                  title: item.title,
                  duration: item.minutes || 30,
                  type: item.type === "learn" ? "lesson" : "practice",
                }))
              ) || [],
              learning_objectives: mockTask.skills || [],
            });
            if (mockTask.syllabus?.modules[0]) {
              setExpandedModule(mockTask.syllabus.modules[0].title);
            }
          }
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  // Fallback to mock data if API fails
  const mockTask = tasks.find((t) => t.id === id);
  const displayCourse = course || (mockTask ? {
    id: mockTask.id,
    title: mockTask.title,
    type: mockTask.type,
    industry: mockTask.industry,
    estimatedMinutes: mockTask.estimatedMinutes,
    description: mockTask.scenario,
    career: mockTask.career ? {
      title: mockTask.career.title,
      salaryRange: mockTask.career.salaryRange,
    } : undefined,
    activeLearners: mockTask.activeLearners,
    recruitingSquads: mockTask.recruitingSquads,
    content: mockTask.syllabus?.modules.flatMap(m => 
      m.items.map(item => ({
        title: item.title,
        duration: item.minutes || 30,
        type: item.type === "learn" ? "lesson" : "practice",
      }))
    ) || [],
    learning_objectives: mockTask.skills || [],
  } : null);
  const isUsingMock = !course && mockTask;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f9fafb] flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-500 mb-2">加载中...</div>
        </div>
      </div>
    );
  }

  if (error && !mockTask) {
    return (
      <div className="min-h-screen bg-[#f9fafb] flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-2">课程加载失败: {error}</div>
          <Link href="/courses" className="text-[#2DD4A8] text-sm">返回课程中心</Link>
        </div>
      </div>
    );
  }

  if (!displayCourse && !mockTask) {
    return (
      <div className="min-h-screen bg-[#f9fafb] flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-500 mb-2">课程不存在</div>
          <Link href="/courses" className="text-[#2DD4A8] text-sm">返回课程中心</Link>
        </div>
      </div>
    );
  }

  // At this point, we have either API data or mock data
  // Use mockTask as fallback when API data is not available
  const task: Task = mockTask || (displayCourse ? {
    ...displayCourse,
    // Add missing fields with defaults for API courses
    subtitle: displayCourse.description,
    scenario: displayCourse.description,
    careerContext: displayCourse.career?.title || '',
    difficulty: 'entry' as const,
    resources: [],
    assignments: [],
    bonusPool: { baseAmount: 5000, perMemberStake: 100, sponsorAmount: 2000, sponsorName: 'OPC Learn' },
    squadSize: { min: 3, max: 5 },
    activeSquads: displayCourse.recruitingSquads,
    skills: displayCourse.learning_objectives || [],
    syllabus: {
      objective: displayCourse.learning_objectives?.join('、') || '',
      knowledgePoints: displayCourse.learning_objectives || [],
      modules: displayCourse.content?.map((c: any, i: number) => ({
        id: `module-${i}`,
        title: c.title,
        duration: c.duration,
        type: c.type,
      })) || []
    }
  } as any : mockTask) as Task;

  const ind = industries[task.industry as keyof typeof industries];
  const taskSquads = squads.filter((s) => s.taskId === task.id);
  const taskPosts = posts.filter((p) => p.taskId === task.id);
  const mySquad = taskSquads.find((s) => s.members.some((m) => m.userId === currentUser.id));

  const tabs = [
    { key: "content", label: "课程内容", icon: IconBookOpen },
    { key: "discussion", label: "讨论", icon: IconMessage, count: taskPosts.length },
    { key: "pool", label: "奖学金", icon: IconPool },
    { key: "squad", label: "小组", icon: IconUsers, count: taskSquads.length },
  ];

  return (
    <div className="min-h-screen bg-[#f9fafb] pb-6">
      {/* Header */}
      <div className="bg-white sticky top-0 z-40 border-b border-gray-100">
        <div className="flex items-center gap-3 px-4 pt-12 pb-3">
          <Link href="/courses" className="text-gray-500 hover:text-gray-700">
            <IconArrowLeft size={22} />
          </Link>
          <div className="flex-1 min-w-0">
            <div className="text-base font-bold text-gray-900 truncate">{task.title}</div>
          </div>
          <button className="text-gray-500 hover:text-[#2DD4A8] transition-colors">
            <IconBookmark size={20} />
          </button>
        </div>
      </div>

      {/* Course Info Card */}
      <div className="px-4 pt-4">
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <span className={`text-[10px] px-1.5 py-0.5 rounded ${difficultyColors[task.difficulty]}`}>
              {difficultyNames[task.difficulty]}
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ backgroundColor: ind.bgColor, color: ind.color }}>
              {ind.name}
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-50 text-gray-500">
              {task.careerContext}
            </span>
          </div>
          <div className="text-sm text-gray-700 leading-relaxed mb-3">{task.scenario}</div>
          <div className="flex flex-wrap gap-1 mb-3">
            {task.skills.map((s) => (
              <span key={s} className="text-[10px] px-1.5 py-0.5 rounded bg-gray-50 text-gray-500">{s}</span>
            ))}
          </div>
          <div className="flex items-center gap-4 text-[10px] text-gray-500">
            <span className="flex items-center gap-1"><IconClock size={12} />{task.estimatedMinutes}分钟</span>
            <span className="flex items-center gap-1"><IconFileText size={12} />{task.resources.length}篇文档</span>
            <span className="flex items-center gap-1"><IconUsers size={12} />{task.activeLearners}人在学</span>
            <span className="flex items-center gap-1"><IconCoins size={12} />奖金池¥{task.bonusPool.baseAmount + task.bonusPool.perMemberStake * (task.squadSize.min + task.squadSize.max) / 2 + task.bonusPool.sponsorAmount}+</span>
          </div>
        </div>
      </div>

      {/* P0-2: Prominent CTA - First Screen Action */}
      <div className="px-4 pt-3">
        <button className="w-full bg-[#2DD4A8] text-white py-3.5 rounded-xl font-semibold text-base shadow-lg shadow-[#2DD4A8]/25 flex items-center justify-center gap-2 hover:bg-[#26B89A] transition-colors active:scale-[0.98]">
          <IconZap size={18} />
          立即开始学习
        </button>
        <div className="text-center text-[10px] text-gray-500 mt-2">
          加入学习小组 · 完成作业获得奖学金 · {task.estimatedMinutes}分钟速成上岗
        </div>
      </div>

      {/* Course Overview */}
      {task.syllabus && (
        <div className="px-4 pt-3">
          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <IconBookOpen size={16} className="text-[#2DD4A8]" />
              <span className="text-sm font-semibold text-gray-900">课程概览</span>
            </div>
            <div className="text-xs text-gray-700 leading-relaxed mb-2">{task.syllabus.objective}</div>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {task.syllabus.knowledgePoints.map((kp, i) => (
                <span key={i} className="text-[10px] px-2 py-1 rounded-lg bg-[#2DD4A8]/5 text-[#14B88C]">{kp}</span>
              ))}
            </div>
            <div className="flex items-center gap-3 text-[10px] text-gray-500">
              <span>{task.syllabus.modules.length}个学习模块</span>
              <span>{task.syllabus.modules.reduce((s, m) => s + m.items.length, 0)}个学习环节</span>
              <span>预期技能提升{task.syllabus.skillGrowth.length}项</span>
            </div>
          </div>
        </div>
      )}

      {/* Career Path Card */}
      {(() => {
        const careerInfo = task.type === "micro" ? task.career : task.careerGrowth;
        if (!careerInfo) return null;
        return (
          <div className="px-4 pt-3">
            <div className={`rounded-xl p-4 border shadow-sm ${task.type === "micro" ? "bg-gradient-to-br from-amber-50/60 to-orange-50/30 border-amber-200/40" : "bg-gradient-to-br from-violet-50/60 to-blue-50/30 border-violet-200/40"}`}>
              {/* Header */}
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${task.type === "micro" ? "bg-amber-100" : "bg-violet-100"}`}>
                  <IconBriefcase size={14} className={task.type === "micro" ? "text-amber-600" : "text-violet-600"} />
                </div>
                <span className="text-sm font-semibold text-gray-900">
                  {task.type === "micro" ? "入行起点" : "职业进阶"}
                </span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${careerInfo.level === "entry" ? "bg-green-50 text-green-700" : "bg-blue-50 text-blue-700"}`}>
                  {careerInfo.level === "entry" ? "入门级" : "主管级"}
                </span>
              </div>

              {/* Position Title + Salary */}
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-base font-bold text-gray-900">{careerInfo.title}</span>
                <span className={`text-xs font-medium ${task.type === "micro" ? "text-amber-600" : "text-violet-600"}`}>
                  {careerInfo.salaryRange}
                </span>
              </div>

              {/* Daily Work */}
              <div className="text-xs text-gray-500 leading-relaxed mb-3">{careerInfo.dailyWork}</div>

              {/* Company Types */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {careerInfo.companyTypes.map((ct) => (
                  <span key={ct} className={`text-[10px] px-2 py-1 rounded-lg ${task.type === "micro" ? "bg-amber-50/80 text-amber-700" : "bg-violet-50/80 text-violet-700"}`}>
                    {ct}
                  </span>
                ))}
              </div>

              {/* Growth Path */}
              {careerInfo.growthNext && (
                <div className="flex items-center gap-2 pt-2 border-t border-gray-100/60">
                  <IconTrendingUp size={12} className="text-[#2DD4A8] shrink-0" />
                  <span className="text-[11px] text-gray-500">成长路径</span>
                  <span className="text-[11px] text-gray-500 font-medium">{careerInfo.growthNext}</span>
                </div>
              )}

              {/* For system courses: show managed micro courses */}
              {task.type === "system" && task.canManageMicroIds && task.canManageMicroIds.length > 0 && (
                <div className="flex items-center gap-2 pt-2 border-t border-gray-100/60 mt-2">
                  <IconShield size={12} className="text-violet-500 shrink-0" />
                  <span className="text-[11px] text-gray-500">可管理</span>
                  <span className="text-[11px] text-gray-500 font-medium">{task.canManageMicroIds.length}门微技能课的实习生交付</span>
                </div>
              )}
            </div>
          </div>
        );
      })()}

      {/* Tab Bar */}
      <div className="sticky top-[52px] z-30 bg-white mt-3 border-b border-gray-100">
        <div className="flex">
          {tabs.map((tab) => {
            const Ic = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 flex items-center justify-center gap-1 py-2.5 text-xs font-medium border-b-2 transition-colors ${
                  activeTab === tab.key
                    ? "text-[#2DD4A8] border-[#2DD4A8]"
                    : "text-gray-500 border-transparent"
                }`}
              >
                <Ic size={14} />
                {tab.label}
                {tab.count !== undefined && (
                  <span className={`text-[10px] ${activeTab === tab.key ? "text-[#2DD4A8]" : "text-gray-300"}`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="px-4 pt-4">
        {/* Content Tab — Module-based integrated learning */}
        {activeTab === "content" && (
          <div className="space-y-3">
            {/* Module-based syllabus */}
            {task.syllabus ? (
              <>
                {task.syllabus.modules.map((mod, modIdx) => {
                  const isExpanded = expandedModule === mod.id;
                  const learnCount = mod.items.filter((it) => it.type === "learn").length;
                  const practiceCount = mod.items.filter((it) => it.type === "practice").length;
                  const totalMin = mod.items.reduce((s, it) => s + it.minutes, 0);
                  const doneCount = mod.items.filter((it) => it.done).length;
                  const allDone = doneCount === mod.items.length;
                  return (
                    <div key={mod.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                      {/* Module header */}
                      <button
                        onClick={() => setExpandedModule(isExpanded ? null : mod.id)}
                        className="w-full text-left p-4"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${allDone ? "bg-[#2DD4A8]" : "bg-[#2DD4A8]/10"}`}>
                            {allDone ? <IconCheck size={16} className="text-white" /> : <span className="text-sm font-bold text-[#2DD4A8]">{modIdx + 1}</span>}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-sm text-gray-900 mb-0.5">{mod.title}</div>
                            <div className="flex items-center gap-2 text-[10px] text-gray-500">
                              <span className="text-violet-500">{learnCount}项知识</span>
                              <span className="text-amber-500">{practiceCount}项实训</span>
                              <span>{totalMin}分钟</span>
                              {!allDone && doneCount > 0 && <span className="text-[#2DD4A8]">{doneCount}/{mod.items.length}完成</span>}
                            </div>
                          </div>
                          <IconChevronRight size={16} className={`text-gray-300 shrink-0 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                        </div>
                      </button>

                      {/* Expanded module content */}
                      {isExpanded && (
                        <div className="px-4 pb-4 border-t border-gray-50">
                          {/* Module objective */}
                          <div className="py-3 text-xs text-gray-500 leading-relaxed">{mod.objective}</div>
                          {/* Learning items */}
                          <div className="space-y-2">
                            {mod.items.map((item, itemIdx) => {
                              const isLearn = item.type === "learn";
                              const isPractice = item.type === "practice";
                              const isDone = item.done;
                              return (
                                <div key={itemIdx} className={`flex items-center gap-3 p-3 rounded-lg ${isLearn ? "bg-violet-50/50" : "bg-amber-50/50"}`}>
                                  <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${isDone ? "bg-[#2DD4A8]" : isLearn ? "bg-violet-100" : "bg-amber-100"}`}>
                                    {isDone ? <IconCheck size={12} className="text-white" /> : isLearn ? <IconBookOpen size={12} className="text-violet-600" /> : <IconEdit size={12} className="text-amber-600" />}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className={`text-xs ${isDone ? "text-gray-500 line-through" : "text-gray-800"}`}>{item.title}</div>
                                  </div>
                                  <span className="text-[10px] text-gray-500 shrink-0">{item.minutes}分钟</span>
                                  {isPractice && !isDone && (
                                    <button className="text-[10px] px-2.5 py-1 rounded-lg bg-[#2DD4A8] text-white font-medium shrink-0">
                                      {itemIdx === 0 && modIdx === 0 ? "开始" : "继续"}
                                    </button>
                                  )}
                                  {isLearn && !isDone && (
                                    <button className="text-[10px] px-2.5 py-1 rounded-lg bg-violet-100 text-violet-600 font-medium shrink-0">
                                      学习
                                    </button>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Skill Growth */}
                <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <IconTarget size={16} className="text-[#2DD4A8]" />
                    <span className="text-sm font-semibold text-gray-900">预期技能成长</span>
                  </div>
                  <div className="space-y-3">
                    {task.syllabus.skillGrowth.map((sg, i) => (
                      <div key={i}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-gray-600">{sg.skill}</span>
                          <span className="text-[10px]">
                            <span className="text-gray-500">{sg.from}</span>
                            <span className="text-gray-300 mx-1">→</span>
                            <span className="text-[#2DD4A8] font-medium">{sg.to}</span>
                          </span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-[#2DD4A8]/40 to-[#2DD4A8] rounded-full" style={{ width: `${sg.to}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Learning method explanation */}
                <div className="bg-gradient-to-br from-[#2DD4A8]/5 to-violet-50/30 rounded-xl p-4 border border-[#2DD4A8]/15">
                  <div className="flex items-center gap-2 mb-2">
                    <IconLightbulb size={16} className="text-[#2DD4A8]" />
                    <span className="text-sm font-semibold text-gray-900">学习方式说明</span>
                  </div>
                  <div className="space-y-1.5 text-xs text-gray-500 leading-relaxed">
                    <div className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded bg-violet-100 flex items-center justify-center shrink-0">
                        <IconBookOpen size={12} className="text-violet-600" />
                      </span>
                      <span><span className="font-medium text-gray-700">知识学习</span> — 系统学习框架、方法、案例，构建理论基础</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded bg-amber-100 flex items-center justify-center shrink-0">
                        <IconEdit size={12} className="text-amber-600" />
                      </span>
                      <span><span className="font-medium text-gray-700">实训作业</span> — 在真实场景中应用所学，获得同伴和教练反馈</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded bg-blue-100 flex items-center justify-center shrink-0">
                        <IconMessage size={12} className="text-blue-600" />
                      </span>
                      <span><span className="font-medium text-gray-700">讨论互评</span> — 与小组成员交流讨论，深化理解</span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              /* Fallback for courses without syllabus: show original resources + assignments */
              <>
                {/* Resources */}
                {task.resources.map((res) => {
                  const isExpanded = expandedResource === res.id;
                  const isBookmarked = bookmarked.has(res.id);
                  return (
                    <div key={res.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                      <button onClick={() => setExpandedResource(isExpanded ? null : res.id)} className="w-full text-left p-4">
                        <div className="flex items-start gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${resourceTypeColors[res.type]?.split(" ")[0] || "bg-gray-50"}`}>
                            <IconFileText size={16} className={resourceTypeColors[res.type]?.split(" ")[1] || "text-gray-500"} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`text-[10px] px-1.5 py-0.5 rounded ${resourceTypeColors[res.type]}`}>{resourceTypeNames[res.type]}</span>
                              <span className="text-[10px] text-gray-500">{res.readTime}分钟</span>
                            </div>
                            <div className="font-medium text-sm text-gray-900 mb-1">{res.title}</div>
                            <div className="text-xs text-gray-500 line-clamp-2">{res.summary}</div>
                          </div>
                          <IconChevronRight size={16} className={`text-gray-300 shrink-0 mt-2 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                        </div>
                      </button>
                      {isExpanded && res.content && (
                        <div className="px-4 pb-4 border-t border-gray-50">
                          <div className="pt-3 prose prose-sm max-w-none text-gray-700 text-[13px] leading-relaxed whitespace-pre-wrap">
                            {res.content.split("\n").map((line, i) => {
                              if (line.startsWith("## ")) return <h2 key={i} className="text-base font-bold text-gray-900 mt-4 mb-2">{line.replace("## ", "")}</h2>;
                              if (line.startsWith("### ")) return <h3 key={i} className="text-sm font-semibold text-gray-800 mt-3 mb-1">{line.replace("### ", "")}</h3>;
                              if (line.startsWith("**") && line.endsWith("**")) return <p key={i} className="font-semibold text-gray-800 mt-2">{line.replace(/\*\*/g, "")}</p>;
                              if (line.startsWith("- ")) return <div key={i} className="flex gap-2 ml-2"><span className="text-[#2DD4A8] shrink-0">•</span><span>{line.replace("- ", "")}</span></div>;
                              if (line === "") return <div key={i} className="h-2" />;
                              return <p key={i}>{line}</p>;
                            })}
                          </div>
                          <div className="flex items-center gap-3 mt-4 pt-3 border-t border-gray-50">
                            <button onClick={(e) => { e.stopPropagation(); setBookmarked(prev => { const n = new Set(prev); n.has(res.id) ? n.delete(res.id) : n.add(res.id); return n; }); }} className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg transition-colors ${isBookmarked ? "bg-amber-50 text-amber-600" : "bg-gray-50 text-gray-500"}`}>
                              <IconBookmark size={12} />{isBookmarked ? "已收藏" : "收藏"}
                            </button>
                            <button className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-gray-50 text-gray-500">
                              <IconEye size={12} />标记已读
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
                {/* Assignments */}
                {task.assignments.map((asgn) => (
                  <div key={asgn.id} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#2DD4A8]/10 flex items-center justify-center shrink-0">
                        <IconClipboardCheck size={16} className="text-[#2DD4A8]" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#2DD4A8]/10 text-[#14B88C]">{assignmentTypeNames[asgn.type]}</span>
                          <span className="text-[10px] text-gray-300 ml-auto">权重 {Math.round(asgn.weight * 100)}%</span>
                        </div>
                        <div className="font-medium text-sm text-gray-900 mb-1">{asgn.title}</div>
                        <p className="text-xs text-gray-500 leading-relaxed">{asgn.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        )}

        {/* Discussion Tab */}
        {activeTab === "discussion" && (
          <div className="space-y-3">
            {/* P1-5: Cold-start Guide */}
            {taskPosts.length < 3 && (
              <div className="bg-blue-50/70 rounded-xl p-4 border border-blue-100/40">
                <div className="text-xs text-blue-800 font-semibold mb-2">
                  💬 成为第一个发起讨论的人！
                </div>
                <div className="text-[10px] text-blue-600 mb-2">
                  好的问题能帮助更多人，也能获得积分奖励
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] text-gray-500">热门讨论话题：</div>
                  <button className="block w-full text-left text-[10px] text-blue-600 hover:underline py-0.5">
                    • 这个框架在实际工作中怎么用？
                  </button>
                  <button className="block w-full text-left text-[10px] text-blue-600 hover:underline py-0.5">
                    • 有没有其他案例可以参考？
                  </button>
                  <button className="block w-full text-left text-[10px] text-blue-600 hover:underline py-0.5">
                    • 初学者最容易犯的错误是什么？
                  </button>
                </div>
              </div>
            )}

            {/* Post Input */}
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#2DD4A8] flex items-center justify-center text-white text-xs font-bold">林</div>
                <div className="flex-1 bg-gray-50 rounded-lg px-3 py-2 text-xs text-gray-500">
                  分享你的想法或问题...
                </div>
              </div>
            </div>
            {/* Post List */}
            {taskPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                {post.pinned && (
                  <div className="flex items-center gap-1 text-[10px] text-amber-600 mb-2">
                    <IconStar size={10} className="fill-amber-500" />置顶
                  </div>
                )}
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                    post.authorRole === "coach" ? "bg-amber-100 text-amber-700" : "bg-[#2DD4A8]/10 text-[#14B88C]"
                  }`}>
                    {post.authorAvatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-sm font-medium text-gray-900">{post.authorName}</span>
                      {post.authorRole === "coach" && (
                        <span className="text-[10px] px-1 py-0.5 rounded bg-amber-50 text-amber-600">教练</span>
                      )}
                      <span className="text-[10px] text-gray-300 ml-auto">{post.createdAt}</span>
                    </div>
                    <div className="font-medium text-sm text-gray-800 mb-1">{post.title}</div>
                    <div className="text-xs text-gray-500 leading-relaxed line-clamp-3 whitespace-pre-wrap">
                      {post.content}
                    </div>
                    <div className="flex items-center gap-4 mt-3">
                      <button className="flex items-center gap-1 text-[10px] text-gray-500 hover:text-[#2DD4A8]">
                        <IconThumbsUp size={12} />{post.likeCount}
                      </button>
                      <button className="flex items-center gap-1 text-[10px] text-gray-500 hover:text-[#2DD4A8]">
                        <IconMessage size={12} />{post.commentCount}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {taskPosts.length === 0 && (
              <div className="text-center py-12 text-gray-500 text-sm">暂无讨论</div>
            )}
          </div>
        )}

        {/* Pool Tab */}
        {activeTab === "pool" && (
          <div className="space-y-3">
            {/* Pool Total */}
            <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-xl p-5 border border-amber-200/50">
              <div className="flex items-center gap-2 mb-1">
                <IconCoins size={18} className="text-amber-600" />
                <span className="text-sm font-semibold text-amber-800">奖学金池</span>
              </div>
              {mySquad ? (
                <>
                  <div className="text-3xl font-bold text-amber-700">¥{mySquad.pool.total}</div>
                  <div className="text-xs text-amber-600/70 mt-1">按评分高低分配给小组成员</div>
                </>
              ) : (
                <>
                  <div className="text-3xl font-bold text-amber-700">¥{task.bonusPool.baseAmount + task.bonusPool.perMemberStake * task.squadSize.min + task.bonusPool.sponsorAmount}+</div>
                  <div className="text-xs text-amber-600/70 mt-1">加入小组后形成奖金池</div>
                </>
              )}
            </div>

            {/* Pool Breakdown */}
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <div className="text-sm font-semibold text-gray-900 mb-3">资金构成</div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm bg-[#2DD4A8]" />
                    <span className="text-xs text-gray-600">平台基础奖金</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">¥{mySquad ? mySquad.pool.platform : task.bonusPool.baseAmount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm bg-blue-500" />
                    <span className="text-xs text-gray-600">成员集资{mySquad ? `（${mySquad.members.filter(m => m.role === "learner").length}人 × ¥${task.bonusPool.perMemberStake}）` : `（每人¥${task.bonusPool.perMemberStake}）`}</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">¥{mySquad ? mySquad.pool.stakes : task.bonusPool.perMemberStake * task.squadSize.min}</span>
                </div>
                {(mySquad ? mySquad.pool.sponsor > 0 : task.bonusPool.sponsorAmount > 0) && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-sm bg-amber-500" />
                      <span className="text-xs text-gray-600">{mySquad ? mySquad.pool.sponsorName : task.bonusPool.sponsorName}</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">¥{mySquad ? mySquad.pool.sponsor : task.bonusPool.sponsorAmount}</span>
                  </div>
                )}
                {mySquad && mySquad.pool.coachBonus > 0 && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-sm bg-rose-400" />
                      <span className="text-xs text-gray-600">教练追加</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">¥{mySquad.pool.coachBonus}</span>
                  </div>
                )}
                <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                  <span className="text-xs font-medium text-gray-500">合计</span>
                  <span className="text-base font-bold text-gray-900">¥{mySquad ? mySquad.pool.total : task.bonusPool.baseAmount + task.bonusPool.perMemberStake * task.squadSize.min + task.bonusPool.sponsorAmount}</span>
                </div>
              </div>
              {mySquad && (
                <div className="mt-3 pt-2 border-t border-gray-50 text-[10px] text-gray-500">
                  我的投入：¥{task.bonusPool.perMemberStake} · {mySquad.status === "reviewing" || mySquad.status === "completed" ? "已冻结" : "积累中"}
                </div>
              )}
            </div>

            {/* Distribution Preview */}
            {mySquad && mySquad.status === "completed" && mySquad.pool.distribution ? (
              <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <IconTrophy size={16} className="text-amber-500" />
                  <span className="text-sm font-semibold text-gray-900">最终分配</span>
                </div>
                {mySquad.pool.distribution.map((d, i) => (
                  <div key={d.userId} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                    <div className="text-xs text-gray-500 w-4">{i + 1}</div>
                    <div className="w-7 h-7 rounded-full bg-[#2DD4A8]/10 flex items-center justify-center text-[10px] font-bold text-[#14B88C]">
                      {d.name[0]}
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-medium text-gray-900">{d.name}</div>
                      <div className="text-[10px] text-gray-500">评分 {d.score}</div>
                    </div>
                    <div className="text-sm font-bold text-amber-600">¥{d.amount}</div>
                    {d.userId === currentUser.id && <span className="text-[10px] text-[#2DD4A8] font-medium">我</span>}
                  </div>
                ))}
              </div>
            ) : mySquad && mySquad.members.some((m) => m.role === "learner" && m.score !== undefined) ? (
              <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <IconTarget size={16} className="text-[#2DD4A8]" />
                  <span className="text-sm font-semibold text-gray-900">我的小组 — 预计分配</span>
                </div>
                <div className="text-[10px] text-gray-500 mb-3">基于当前评分的预计分配（实际以最终评分为准）</div>
                {mySquad.members
                  .filter((m) => m.role === "learner")
                  .sort((a, b) => (b.score || 0) - (a.score || 0))
                  .map((m, i) => {
                    const allScores = mySquad.members.filter((mm) => mm.role === "learner").reduce((s, mm) => s + (mm.score || 0), 0);
                    const projected = allScores > 0 ? Math.round(mySquad.pool.total * ((m.score || 0) / allScores)) : 0;
                    const isMe = m.userId === currentUser.id;
                    const stakeReturn = m.score !== undefined && m.score >= 80 ? "全额返还+利润" : m.score !== undefined && m.score >= 60 ? "全额返还+小额" : m.score !== undefined && m.score >= 40 ? "80%返还" : "投入没收";
                    return (
                      <div key={m.userId} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                        <div className="text-xs text-gray-500 w-4">{i + 1}</div>
                        <div className="w-7 h-7 rounded-full bg-[#2DD4A8]/10 flex items-center justify-center text-[10px] font-bold text-[#14B88C]">
                          {m.avatar}
                        </div>
                        <div className="flex-1">
                          <div className="text-xs font-medium text-gray-900">{m.name}{isMe && <span className="text-[#2DD4A8] ml-1">我</span>}</div>
                          <div className="text-[10px] text-gray-500">评分 {m.score} · {stakeReturn}</div>
                        </div>
                        <div className="text-sm font-bold text-amber-600">~¥{projected}</div>
                      </div>
                    );
                  })}
              </div>
            ) : null}

            {/* How it works */}
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <div className="text-sm font-semibold text-gray-900 mb-3">分配规则</div>
              <div className="space-y-2 text-xs text-gray-500 leading-relaxed">
                <div className="flex items-start gap-2">
                  <span className="text-[#2DD4A8] shrink-0">1</span>
                  <span>小组成员共同出资，平台追加基础奖金</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#2DD4A8] shrink-0">2</span>
                  <span>作业评分 = 同伴评分×40% + 教练评分×60%</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#2DD4A8] shrink-0">3</span>
                  <span>奖金按评分高低加权分配，分数越高奖金越多</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#2DD4A8] shrink-0">4</span>
                  <span>完成所有作业即可获得荣誉积分</span>
                </div>
              </div>
            </div>

            {/* Stake Return Rules */}
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <div className="text-sm font-semibold text-gray-900 mb-3">投入回报规则</div>
              <div className="space-y-2">
                {[{ range: "≥80分", rule: "全额返还 + 利润按比例分配", color: "text-green-600" }, { range: "60-79分", rule: "全额返还 + 较小份额利润", color: "text-blue-600" }, { range: "40-59分", rule: "80%投入返还，无利润", color: "text-amber-600" }, { range: "<40分", rule: "投入没收，分配给其他成员", color: "text-red-600" }].map((r) => (
                  <div key={r.range} className="flex items-start gap-2 text-xs">
                    <span className={`font-mono font-medium shrink-0 ${r.color}`}>{r.range}</span>
                    <span className="text-gray-500">{r.rule}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Anti-gaming */}
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <IconShield size={16} className="text-[#2DD4A8]" />
                <span className="text-sm font-semibold text-gray-900">反作弊机制</span>
              </div>
              <div className="space-y-2 text-xs text-gray-500">
                <div className="flex items-start gap-2"><span className="text-[#2DD4A8] shrink-0">•</span><span>同伴评分与教练评分偏差&gt;30%时，教练评分覆盖</span></div>
                <div className="flex items-start gap-2"><span className="text-[#2DD4A8] shrink-0">•</span><span>反馈少于50字的互评被拒绝</span></div>
                <div className="flex items-start gap-2"><span className="text-[#2DD4A8] shrink-0">•</span><span>低于40分不参与奖金分配，投入没收</span></div>
                <div className="flex items-start gap-2"><span className="text-[#2DD4A8] shrink-0">•</span><span>教练有一票否决权，可标记低质量互评</span></div>
              </div>
            </div>

            {/* Honor Conversion */}
            <div className="bg-gradient-to-br from-[#2DD4A8]/5 to-[#2DD4A8]/10 rounded-xl p-4 border border-[#2DD4A8]/20">
              <div className="flex items-center gap-2 mb-2">
                <IconTrophy size={16} className="text-amber-500" />
                <span className="text-sm font-semibold text-gray-900">荣誉积分可转化为奖金</span>
              </div>
              <div className="text-xs text-gray-500">100荣誉积分 = 5元加入当前小组的奖金池</div>
              <div className="text-[10px] text-gray-500 mt-1">你当前拥有 {currentUser.honorPoints} 荣誉积分</div>
            </div>
          </div>
        )}

        {/* Squad Tab */}
        {activeTab === "squad" && (
          <div className="space-y-3">
            {taskSquads.map((squad) => {
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
              return (
                <Link key={squad.id} href={`/circles/${squad.id}`} className="block">
                  <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium text-sm text-gray-900">{squad.name}</div>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded ${statusColors[squad.status]}`}>
                        {statusNames[squad.status]}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      {squad.members.slice(0, 5).map((m) => (
                        <div
                          key={m.userId}
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                            m.role === "coach" ? "bg-amber-100 text-amber-700" : "bg-[#2DD4A8]/10 text-[#14B88C]"
                          }`}
                        >
                          {m.avatar}
                        </div>
                      ))}
                      {squad.members.length > 5 && (
                        <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-[10px] text-gray-500">
                          +{squad.members.length - 5}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-gray-500">
                      <span>{squad.members.filter((m) => m.role === "learner").length}名学员 · 1名教练</span>
                      <span className="flex items-center gap-1"><IconCoins size={10} />奖金池¥{squad.pool.total}</span>
                    </div>
                    {squad.status === "completed" && squad.pool.distribution && (
                      <div className="mt-2 pt-2 border-t border-gray-50">
                        <div className="text-[10px] text-gray-500 mb-1">最终分配</div>
                        {squad.pool.distribution.map((d) => (
                          <div key={d.userId} className="flex items-center justify-between text-[10px]">
                            <span className="text-gray-600">{d.name}（{d.score}分）</span>
                            <span className="text-amber-600 font-medium">¥{d.amount}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
            {taskSquads.length === 0 && (
              <div className="text-center py-12 text-gray-500 text-sm">暂无小组</div>
            )}

            {/* Create Squad */}
            <button className="w-full bg-white rounded-xl p-4 border-2 border-dashed border-gray-200 text-center text-sm text-gray-500 hover:border-[#2DD4A8] hover:text-[#2DD4A8] transition-colors">
              + 发起学习小组
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
