"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  IconShopping, IconPlane, IconFactory, IconTarget,
  IconBriefcase, IconTrendingUp, IconBookOpen, IconCheck,
  IconChevronRight, IconArrowRight, IconX,
} from "@/components/Icons";

interface OnboardingProps {
  onComplete: () => void;
}

const industries = [
  {
    id: "retail",
    name: "零售电商",
    icon: IconShopping,
    color: "from-[#2DD4A8] to-[#14B88C]",
    bgColor: "bg-[#2DD4A8]/10",
    borderColor: "border-[#2DD4A8]/30",
    description: "小红书种草、详情页文案、私域运营",
    jobs: "运营助理、内容策划、社群运营",
  },
  {
    id: "tourism",
    name: "文旅行业",
    icon: IconPlane,
    color: "from-violet-500 to-purple-600",
    bgColor: "bg-violet-50",
    borderColor: "border-violet-300",
    description: "旅行笔记、民宿文案、景区营销",
    jobs: "旅行博主、民宿运营、景区策划",
  },
  {
    id: "manufacturing",
    name: "制造B2B",
    icon: IconFactory,
    color: "from-amber-500 to-orange-600",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-300",
    description: "产品详情页、1688文案、技术文档",
    jobs: "B2B文案、产品策划、技术支持",
  },
];

const goals = [
  {
    id: "job",
    title: "找到实习/工作",
    icon: IconBriefcase,
    description: "2-3个月内掌握入门技能，获得offer",
    recommended: "推荐：微技能课 + 实训任务",
  },
  {
    id: "promotion",
    title: "职场晋升",
    icon: IconTrendingUp,
    description: "6个月内提升全栈能力，晋升主管",
    recommended: "推荐：体系课 + OPC认证",
  },
  {
    id: "career_change",
    title: "转行入门",
    icon: IconTarget,
    description: "3-6个月系统学习，成功转行",
    recommended: "推荐：完整学习路径 + 工信部认证",
  },
];

export default function Onboarding({ onComplete }: OnboardingProps) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

  const handleIndustrySelect = (industryId: string) => {
    setSelectedIndustry(industryId);
  };

  const handleGoalSelect = (goalId: string) => {
    setSelectedGoal(goalId);
  };

  const handleNext = () => {
    if (step === 1 && selectedIndustry) {
      setStep(2);
    } else if (step === 2 && selectedGoal) {
      setStep(3);
    } else if (step === 3) {
      // Save selections to localStorage
      localStorage.setItem("onboarding_completed", "true");
      localStorage.setItem("user_industry", selectedIndustry || "");
      localStorage.setItem("user_goal", selectedGoal || "");
      onComplete();
    }
  };

  const handleSkip = () => {
    localStorage.setItem("onboarding_completed", "true");
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-[#2DD4A8]/5 to-blue-50/30 backdrop-blur-sm overflow-y-auto">
      <div className="min-h-screen flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="relative bg-gradient-to-r from-[#2DD4A8] to-[#14B88C] px-8 py-6 text-white">
            <button
              onClick={handleSkip}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 transition-colors"
            >
              <IconX size={20} />
            </button>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex gap-1.5">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all ${
                      i <= step ? "w-8 bg-white" : "w-4 bg-white/40"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-white/80 ml-2">
                步骤 {step}/3
              </span>
            </div>
            <h1 className="text-2xl font-bold mb-1">欢迎加入 OPC Learn！👋</h1>
            <p className="text-sm text-white/90">
              花2分钟设置你的学习档案，我们为你推荐最适合的课程
            </p>
          </div>

          {/* Step 1: Select Industry */}
          {step === 1 && (
            <div className="px-8 py-6">
              <h2 className="text-lg font-bold text-gray-900 mb-2">
                你感兴趣的行业赛道是？
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                选择一个你最想进入的行业，我们会为你推荐相关课程和路径
              </p>
              <div className="space-y-3">
                {industries.map((industry) => {
                  const Icon = industry.icon;
                  const isSelected = selectedIndustry === industry.id;
                  return (
                    <button
                      key={industry.id}
                      onClick={() => handleIndustrySelect(industry.id)}
                      className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                        isSelected
                          ? `${industry.borderColor} ${industry.bgColor} shadow-md`
                          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`w-12 h-12 rounded-lg bg-gradient-to-br ${industry.color} flex items-center justify-center shrink-0`}
                        >
                          <Icon size={24} className="text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="text-base font-bold text-gray-900">
                              {industry.name}
                            </h3>
                            {isSelected && (
                              <div className="w-6 h-6 rounded-full bg-[#2DD4A8] flex items-center justify-center">
                                <IconCheck size={16} className="text-white" />
                              </div>
                            )}
                          </div>
                          <p className="text-xs text-gray-600 mb-2">
                            {industry.description}
                          </p>
                          <div className="flex items-center gap-2 text-[10px] text-gray-500">
                            <span>就业方向：{industry.jobs}</span>
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleNext}
                  disabled={!selectedIndustry}
                  className={`px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all ${
                    selectedIndustry
                      ? "bg-[#2DD4A8] text-white hover:bg-[#14B88C] shadow-lg"
                      : "bg-gray-200 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  下一步
                  <IconChevronRight size={18} />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Select Goal */}
          {step === 2 && (
            <div className="px-8 py-6">
              <h2 className="text-lg font-bold text-gray-900 mb-2">
                你的学习目标是？
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                告诉我们你的目标，我们会为你规划最适合的学习路径
              </p>
              <div className="space-y-3">
                {goals.map((goal) => {
                  const Icon = goal.icon;
                  const isSelected = selectedGoal === goal.id;
                  return (
                    <button
                      key={goal.id}
                      onClick={() => handleGoalSelect(goal.id)}
                      className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                        isSelected
                          ? "border-[#2DD4A8] bg-[#2DD4A8]/5 shadow-md"
                          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`w-12 h-12 rounded-lg ${
                            isSelected
                              ? "bg-[#2DD4A8]"
                              : "bg-gray-100"
                          } flex items-center justify-center shrink-0 transition-colors`}
                        >
                          <Icon
                            size={24}
                            className={isSelected ? "text-white" : "text-gray-600"}
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="text-base font-bold text-gray-900">
                              {goal.title}
                            </h3>
                            {isSelected && (
                              <div className="w-6 h-6 rounded-full bg-[#2DD4A8] flex items-center justify-center">
                                <IconCheck size={16} className="text-white" />
                              </div>
                            )}
                          </div>
                          <p className="text-xs text-gray-600 mb-2">
                            {goal.description}
                          </p>
                          <div className="text-[10px] text-[#2DD4A8] font-medium">
                            {goal.recommended}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
              <div className="mt-6 flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-3 rounded-xl font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  上一步
                </button>
                <button
                  onClick={handleNext}
                  disabled={!selectedGoal}
                  className={`px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all ${
                    selectedGoal
                      ? "bg-[#2DD4A8] text-white hover:bg-[#14B88C] shadow-lg"
                      : "bg-gray-200 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  下一步
                  <IconChevronRight size={18} />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Recommendation */}
          {step === 3 && selectedIndustry && selectedGoal && (
            <div className="px-8 py-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-full bg-[#2DD4A8]/10 flex items-center justify-center mx-auto mb-3">
                  <IconBookOpen size={32} className="text-[#2DD4A8]" />
                </div>
                <h2 className="text-lg font-bold text-gray-900 mb-2">
                  为你推荐的学习计划 ✨
                </h2>
                <p className="text-sm text-gray-500">
                  基于你的选择，我们为你定制了专属学习路径
                </p>
              </div>

              <div className="bg-gradient-to-br from-[#2DD4A8]/5 to-blue-50/50 rounded-xl p-5 border border-[#2DD4A8]/20 mb-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#2DD4A8] flex items-center justify-center shrink-0">
                      <span className="text-white text-sm font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-900 mb-1">
                        第一步：微技能课（2小时）
                      </h3>
                      <p className="text-xs text-gray-600">
                        快速掌握入门技能，建立信心
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#2DD4A8] flex items-center justify-center shrink-0">
                      <span className="text-white text-sm font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-900 mb-1">
                        第二步：实训任务（5小时）
                      </h3>
                      <p className="text-xs text-gray-600">
                        真实项目练习，获得教练点评
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#2DD4A8] flex items-center justify-center shrink-0">
                      <span className="text-white text-sm font-bold">3</span>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-900 mb-1">
                        第三步：体系课 + 认证（10小时）
                      </h3>
                      <p className="text-xs text-gray-600">
                        系统提升全栈能力，获得权威认证
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-2">
                  <span className="text-lg">🎁</span>
                  <div>
                    <h4 className="text-sm font-bold text-amber-800 mb-1">
                      新手礼包已发放！
                    </h4>
                    <p className="text-xs text-amber-700">
                      +50 荣誉积分 · 免费体验课程1门 · 专属学习群资格
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 px-6 py-3 rounded-xl font-semibold text-gray-600 border-2 border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  返回修改
                </button>
                <button
                  onClick={handleNext}
                  className="flex-[2] px-6 py-3 rounded-xl font-semibold bg-[#2DD4A8] text-white hover:bg-[#14B88C] shadow-lg flex items-center justify-center gap-2 transition-all"
                >
                  开始学习之旅
                  <IconArrowRight size={18} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
