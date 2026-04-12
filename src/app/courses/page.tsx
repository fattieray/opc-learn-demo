"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import { api } from "@/lib/api";
import type { CourseResponse } from "@/types/api";
import { IconClock, IconUsers, IconChevronRight, IconTarget, IconZap, IconShield, IconBriefcase, IconGraduationCap, IconBadgeCheck, IconChalkboard, IconMap } from "@/components/Icons";
import { tasks } from "@/lib/mock/tasks";
import { industries, expertCourses, paths } from "@/lib/mock/data";

// Tab types for course categories
type CourseTab = "micro" | "system" | "expert";

export default function CoursesPage() {
  const [activeTab, setActiveTab] = useState<CourseTab>("micro");
  const [selectedIndustry, setSelectedIndustry] = useState("all");
  const [isFiltering, setIsFiltering] = useState(false);
  const [courses, setCourses] = useState<CourseResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch courses from API
  useEffect(() => {
    setLoading(true);
    setError(null);
    
    const type = activeTab === "expert" ? undefined : activeTab;
    const industry = selectedIndustry === "all" ? undefined : selectedIndustry;
    
    api.courses.list({ type, industry })
      .then((data) => {
        setCourses(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [activeTab, selectedIndustry]);

  // Handle filter change with animation
  const handleFilterChange = (industry: string) => {
    setIsFiltering(true);
    setSelectedIndustry(industry);
    setTimeout(() => setIsFiltering(false), 200);
  };

  // Get filtered expert courses (from mock data)
  const filteredExpertCourses = expertCourses.filter(
    (c) => selectedIndustry === "all" || c.industry === selectedIndustry
  );

  // Get user's learning path
  const userPath = paths.find((p) => p.industry === (selectedIndustry === "all" ? "retail" : selectedIndustry)) || paths[0];

  // Get recommended course (from API data or fallback to mock)
  const recommendedCourse = courses.length > 0 ? courses[0] : null;
  const recommendedInd = recommendedCourse ? industries[recommendedCourse.industry as keyof typeof industries] : industries.retail;

  // Combine API courses with expert courses (mock)
  const filteredCourses = activeTab === "expert" 
    ? filteredExpertCourses 
    : [...courses];

  const tabConfig = [
    { id: "micro" as CourseTab, label: "微技能课", icon: IconZap, desc: "1-2小时速成上岗", color: "amber" },
    { id: "system" as CourseTab, label: "体系课", icon: IconShield, desc: "10小时晋升主管", color: "violet" },
    { id: "expert" as CourseTab, label: "专家课", icon: IconBadgeCheck, desc: "实战专家授课", color: "blue" },
  ];

  const industryList = [
    { id: "all", name: "全部行业" },
    { id: "retail", name: "零售电商" },
    { id: "tourism", name: "文旅" },
    { id: "manufacturing", name: "制造" },
  ];

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      {/* Header */}
      <div className="bg-white px-5 pt-12 pb-4 border-b border-gray-100">
        <h1 className="text-xl font-bold text-gray-900">课程中心</h1>
        <p className="text-xs text-gray-400 mt-1">找到你的起点，开始职业成长</p>
      </div>

      {/* Section A: Personalized Recommendation */}
      <div className="px-4 pt-4">
        <div className="bg-gradient-to-br from-[#2DD4A8]/10 to-[#2DD4A8]/5 rounded-xl p-4 border border-[#2DD4A8]/20">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-[#2DD4A8] flex items-center justify-center">
              <IconTarget size={16} className="text-white" />
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-900">推荐你的第一门课</div>
              <div className="text-[10px] text-gray-500">基于你的行业选择</div>
            </div>
          </div>

          {recommendedCourse ? (
            <Link href={`/courses/${recommendedCourse.id}`} className="block">
              <div className="bg-white rounded-lg p-3 border border-[#2DD4A8]/20 hover:border-[#2DD4A8]/40 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 font-medium">
                    微技能
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ backgroundColor: recommendedInd.bgColor, color: recommendedInd.color }}>
                    {recommendedInd.name}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-green-50 text-green-600 ml-auto">推荐</span>
                </div>
                <div className="text-sm font-semibold text-gray-900 mb-2">{recommendedCourse.title}</div>
                <div className="flex items-center gap-3 text-[11px] text-gray-500 mb-2">
                  <span>{recommendedCourse.estimatedMinutes}分钟</span>
                  <span className="text-gray-300">·</span>
                  <span>{recommendedCourse.career?.title}</span>
                  <span className="text-amber-600 font-medium">{recommendedCourse.career?.salaryRange}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[10px] text-gray-400">
                    <IconUsers size={10} />
                    <span>{recommendedCourse.activeLearners}人在学</span>
                  </div>
                  <span className="text-xs text-[#2DD4A8] font-medium flex items-center gap-0.5">
                    开始学习
                    <IconChevronRight size={12} />
                  </span>
                </div>
              </div>
            </Link>
          ) : (
            <div className="bg-white rounded-lg p-3 border border-[#2DD4A8]/20">
              <div className="text-sm text-gray-400 text-center">暂无推荐课程</div>
            </div>
          )}

          {/* Quick assessment link */}
          <Link href="/assessment" className="block mt-2 text-center">
            <span className="text-[10px] text-[#2DD4A8] font-medium">不确定？5道题找到你的起点 →</span>
          </Link>
        </div>
      </div>

      {/* P1-4: Learning Path Overview */}
      <div className="px-4 pt-3">
        <Link href="/discover" className="block">
          <div className="bg-gradient-to-r from-violet-50 to-blue-50 rounded-xl p-4 border border-violet-100/30 hover:border-violet-200/50 transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <IconMap size={16} className="text-violet-600" />
              <span className="text-sm font-semibold text-gray-900">查看完整学习路径</span>
              <IconChevronRight size={14} className="text-gray-400 ml-auto" />
            </div>
            <div className="text-xs text-gray-600 mb-1">
              从 <span className="font-medium text-violet-700">{userPath.taskTitles[0]}</span> 到 <span className="font-medium text-violet-700">{userPath.taskTitles[userPath.taskIds.length - 1]}</span>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-[10px] text-gray-500">预计{userPath.estimatedWeeks}周完成</span>
              <span className="text-[10px] text-violet-600 font-medium">{userPath.taskIds.length}门课程</span>
            </div>
          </div>
        </Link>
      </div>

      {/* Section B: Course Type Tabs + Industry Filter */}
      <div className="px-4 pt-4">
        {/* Course Type Tabs */}
        <div className="bg-white rounded-xl p-1.5 border border-gray-100 shadow-sm mb-3">
          <div className="grid grid-cols-3 gap-1">
            {tabConfig.map((tab) => {
              const Ic = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2.5 px-2 rounded-lg text-center transition-all duration-200 ${
                    isActive 
                      ? "bg-[#2DD4A8] text-white shadow-md" 
                      : "text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-center gap-1 mb-0.5">
                    <Ic size={14} className={isActive ? "text-white" : tab.id === "micro" ? "text-amber-500" : tab.id === "system" ? "text-violet-500" : "text-blue-500"} />
                    <span className="text-xs font-medium">{tab.label}</span>
                  </div>
                  <div className={`text-[9px] ${isActive ? "text-white/80" : "text-gray-400"}`}>{tab.desc}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Industry Filter */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
          {industryList.map((i) => (
            <button
              key={i.id}
              onClick={() => handleFilterChange(i.id)}
              className={`shrink-0 text-xs px-3 py-1.5 rounded-full transition-all duration-200 ${
                selectedIndustry === i.id 
                  ? "bg-gray-800 text-white shadow-md" 
                  : "bg-white text-gray-500 border border-gray-200 hover:border-gray-300"
              }`}
            >
              {i.name}
            </button>
          ))}
        </div>
      </div>

      {/* Section C: Course List */}
      <div className={`px-4 pt-3 pb-4 space-y-3 transition-opacity duration-200 ${isFiltering ? "opacity-50" : "opacity-100"}`}>
        {/* Section Header */}
        <div className="flex items-center justify-between">
          <div className="text-xs font-semibold text-gray-500">
            {activeTab === "micro" && "微技能课"}
            {activeTab === "system" && "体系课"}
            {activeTab === "expert" && "专家课程"}
            <span className="text-gray-400 ml-1 font-normal">({filteredCourses.length})</span>
          </div>
        </div>

        {filteredCourses.length === 0 ? (
          <div className="bg-white rounded-xl p-8 border border-gray-100 text-center">
            <div className="text-sm text-gray-400 mb-2">暂无课程</div>
            <button 
              onClick={() => setSelectedIndustry("all")}
              className="text-xs text-[#2DD4A8] font-medium"
            >
              查看全部行业 →
            </button>
          </div>
        ) : (
          filteredCourses.map((course) => {
            // Handle both platform courses and expert courses
            const isExpert = "providerName" in course;
            const ind = industries[course.industry as keyof typeof industries];
            const isMicro = course.type === "micro";
            const isTask = !isExpert;
            const careerInfo = isTask ? (isMicro ? (course as any).career : (course as any).careerGrowth) : { title: (course as any).careerTarget, salaryRange: (course as any).salaryRange };
            const students = isExpert ? (course as any).students : course.activeLearners;

            return (
              <Link key={course.id} href={`/courses/${course.id}`} className="block group">
                <div className={`bg-white rounded-xl p-4 border shadow-sm transition-all duration-200 hover:shadow-md ${
                  isExpert ? "border-blue-100 hover:border-blue-200" : "border-gray-100 hover:border-[#2DD4A8]/30"
                }`}>
                  {/* Row 1: Type + Title + Tags */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      isExpert ? "bg-blue-50 text-blue-600" :
                      isMicro ? "bg-amber-50 text-amber-700" : "bg-violet-50 text-violet-700"
                    }`}>
                      {isExpert ? "专家课" : isMicro ? "微技能" : "体系课"}
                    </span>
                    <h3 className={`text-sm font-semibold group-hover:text-[#2DD4A8] transition-colors ${
                      isExpert ? "text-gray-800" : "text-gray-900"
                    }`}>
                      {course.title}
                    </h3>
                  </div>
                  
                  {/* Row 2: Core Info - Time · Position · Salary */}
                  <div className="flex items-center gap-2 text-[11px] text-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                      {isExpert ? <IconClock size={11} className="text-blue-500" /> : 
                       isMicro ? <IconZap size={11} className="text-amber-500" /> : 
                       <IconClock size={11} className="text-violet-500" />}
                      {isMicro ? `${course.estimatedMinutes}分钟` : `${Math.round(course.estimatedMinutes / 60)}小时`}
                    </span>
                    {careerInfo && (
                      <>
                        <span className="text-gray-300">·</span>
                        <span>{careerInfo.title}</span>
                        <span className={`font-medium ${isMicro ? "text-amber-600" : "text-violet-600"}`}>{careerInfo.salaryRange}</span>
                      </>
                    )}
                  </div>
                  
                  {/* Row 3: Social Proof + Industry + Price */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 text-[10px] text-gray-400">
                        <IconUsers size={10} />
                        {students}人在学
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ backgroundColor: ind.bgColor, color: ind.color }}>
                        {ind.name}
                      </span>
                      {isExpert && (
                        <>
                          <span className="text-[10px] text-gray-400">·</span>
                          <span className="text-[10px] text-blue-500 flex items-center gap-0.5">
                            <IconBadgeCheck size={8} />
                            {(course as any).providerName}
                          </span>
                        </>
                      )}
                    </div>
                    {isExpert ? (
                      <span className="text-sm font-bold text-[#2DD4A8]">¥{(course as any).price}</span>
                    ) : course.recruitingSquads > 0 ? (
                      <span className="text-[10px] text-[#2DD4A8] font-medium flex items-center gap-0.5">
                        {course.recruitingSquads}个小组招募中
                        <IconChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    ) : (
                      <IconChevronRight size={14} className="text-gray-300 group-hover:text-[#2DD4A8] transition-colors" />
                    )}
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </div>

      {/* Section D: Career Path Footer */}
      <div className="px-4 pb-20">
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <IconTarget size={14} className="text-[#2DD4A8]" />
            <span className="text-xs font-semibold text-gray-500">学习→认证→就业</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 text-center p-2 rounded-lg bg-amber-50/50 border border-amber-100/30">
              <IconZap size={16} className="text-amber-500 mx-auto mb-1" />
              <div className="text-[10px] font-semibold text-gray-700">微技能课</div>
              <div className="text-[9px] text-gray-400">1-2小时速成</div>
            </div>
            <IconChevronRight size={12} className="text-gray-300 shrink-0" />
            <div className="flex-1 text-center p-2 rounded-lg bg-violet-50/50 border border-violet-100/30">
              <IconShield size={16} className="text-violet-500 mx-auto mb-1" />
              <div className="text-[10px] font-semibold text-gray-700">体系课</div>
              <div className="text-[9px] text-gray-400">10小时系统</div>
            </div>
            <IconChevronRight size={12} className="text-gray-300 shrink-0" />
            <div className="flex-1 text-center p-2 rounded-lg bg-blue-50/50 border border-blue-100/30">
              <IconGraduationCap size={16} className="text-blue-500 mx-auto mb-1" />
              <div className="text-[10px] font-semibold text-gray-700">OPC认证</div>
              <div className="text-[9px] text-gray-400">能力证明</div>
            </div>
          </div>
          <Link href="/profile/certification" className="block mt-2 pt-2 border-t border-gray-50 text-center">
            <span className="text-[10px] text-[#2DD4A8] font-medium">查看完整认证体系 →</span>
          </Link>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
