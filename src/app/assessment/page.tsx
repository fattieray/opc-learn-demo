"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  IconArrowLeft, IconCheck, IconChevronRight, IconTarget, IconLightbulb, IconGraduationCap,
  IconUsers, IconCoins, IconZap,
} from "@/components/Icons";
import { api, authUtils } from "@/lib/api";
import type { AssessmentResponse } from "@/types/api";
import { industries } from "@/lib/mock/data";

interface Question {
  id: number;
  question: string;
  options: { label: string; value: string; scores: Record<string, number> }[];
}

const questions: Question[] = [
  {
    id: 1,
    question: "你有过内容创作经验吗？",
    options: [
      { label: "完全没写过，从零开始", value: "zero", scores: { retail: 0, tourism: 0, manufacturing: 0 } },
      { label: "偶尔写过朋友圈/小红书", value: "casual", scores: { retail: 2, tourism: 2, manufacturing: 0 } },
      { label: "写过工作相关的文案", value: "some", scores: { retail: 4, tourism: 3, manufacturing: 3 } },
      { label: "有1年以上内容运营经验", value: "experienced", scores: { retail: 5, tourism: 4, manufacturing: 5 } },
    ],
  },
  {
    id: 2,
    question: "你更擅长或更感兴趣的是？",
    options: [
      { label: "写种草文案、做短视频脚本", value: "retail", scores: { retail: 5, tourism: 2, manufacturing: 0 } },
      { label: "写旅行游记、做体验内容", value: "tourism", scores: { retail: 1, tourism: 5, manufacturing: 0 } },
      { label: "写产品说明、做专业内容", value: "manufacturing", scores: { retail: 0, tourism: 1, manufacturing: 5 } },
      { label: "都感兴趣，还不确定", value: "undecided", scores: { retail: 2, tourism: 2, manufacturing: 2 } },
    ],
  },
  {
    id: 3,
    question: "你希望进入哪个行业？",
    options: [
      { label: "电商 / 新消费品牌", value: "retail2", scores: { retail: 5, tourism: 0, manufacturing: 0 } },
      { label: "文旅 / 酒店 / OTA", value: "tourism2", scores: { retail: 0, tourism: 5, manufacturing: 0 } },
      { label: "制造业 / B2B / 外贸", value: "manufacturing2", scores: { retail: 0, tourism: 0, manufacturing: 5 } },
      { label: "还在探索阶段", value: "exploring", scores: { retail: 2, tourism: 2, manufacturing: 2 } },
    ],
  },
  {
    id: 4,
    question: "你的数据分析能力如何？",
    options: [
      { label: "不会看数据，凭感觉做事", value: "none", scores: { retail: 0, tourism: 0, manufacturing: 0 } },
      { label: "能看懂基础数据指标", value: "basic", scores: { retail: 2, tourism: 1, manufacturing: 2 } },
      { label: "会用数据指导内容决策", value: "good", scores: { retail: 4, tourism: 3, manufacturing: 4 } },
    ],
  },
  {
    id: 5,
    question: "你希望学习多长时间后开始求职？",
    options: [
      { label: "1个月内快速上手", value: "fast", scores: { retail: 2, tourism: 2, manufacturing: 1 } },
      { label: "2-3个月系统学习", value: "medium", scores: { retail: 4, tourism: 3, manufacturing: 3 } },
      { label: "半年以上深度成长", value: "deep", scores: { retail: 3, tourism: 3, manufacturing: 5 } },
    ],
  },
];

const recommendations: Record<string, { industry: string; courseId: string; level: string; reason: string; skills: string[]; nextSteps: string[] }> = {
  retail: { 
    industry: "retail", 
    courseId: "r-micro-01", 
    level: "微技能课", 
    reason: "零售电商种草文案需求最大，2小时速成即可上岗实习。你的内容创作兴趣与零售行业高度匹配。",
    skills: ["文案写作", "用户洞察", "AIDA模型", "小红书运营"],
    nextSteps: [
      "学习种草文案速成课（2小时）",
      "加入学习小组完成实战作业",
      "获得技能认证后申请实习岗位",
      "继续学习体系课晋升主管"
    ]
  },
  tourism: { 
    industry: "tourism", 
    courseId: "t-micro-01", 
    level: "微技能课", 
    reason: "文旅旅行笔记以体验写作为主，你的兴趣和方向非常匹配。旅行内容创作者市场需求增长迅猛。",
    skills: ["5感写作", "旅行叙事", "体验描写", "情感共鸣"],
    nextSteps: [
      "学习旅行笔记速写课（2小时）",
      "掌握5感写作法核心技巧",
      "完成3篇旅行笔记作品",
      "获得认证后接洽文旅项目"
    ]
  },
  manufacturing: { 
    industry: "manufacturing", 
    courseId: "m-micro-01", 
    level: "微技能课", 
    reason: "B2B产品文案需要专业感，你的理性分析能力是优势。制造业数字化转型带来大量内容需求。",
    skills: ["B2B文案", "产品说明", "专业表达", "技术转化"],
    nextSteps: [
      "学习B2B产品文案课（2小时）",
      "掌握技术语言转化技巧",
      "完成产品详情页文案作业",
      "申请制造业内容运营岗位"
    ]
  },
};

export default function AssessmentPage() {
  const router = useRouter();
  const [step, setStep] = useState(0); // 0=landing, 1-5=questions, 6=result
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnswer = (questionId: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    if (step < questions.length) {
      setTimeout(() => setStep(step + 1), 300);
    } else {
      // Submit to backend on last question
      submitAssessment({ ...answers, [questionId]: value });
    }
  };

  const submitAssessment = async (finalAnswers: Record<number, string>) => {
    setSubmitting(true);
    setError(null);

    try {
      // Check if user is authenticated
      if (!authUtils.isAuthenticated()) {
        // Store answers and redirect to login
        localStorage.setItem("pending_assessment", JSON.stringify(finalAnswers));
        router.push("/login");
        return;
      }

      // Submit to backend
      const result = await api.assessments.submit(finalAnswers);
      setAssessmentResult(result);
      
      // Update user's industry preference
      await api.users.update({ industry_preference: result.industry });
      
      setStep(questions.length + 1);
    } catch (err: any) {
      setError(err.message || "提交失败，请重试");
      setStep(questions.length + 1); // Still show result using local calculation
    } finally {
      setSubmitting(false);
    }
  };

  const getResult = () => {
    const scores = { retail: 0, tourism: 0, manufacturing: 0 };
    questions.forEach((q) => {
      const answer = answers[q.id];
      if (answer) {
        const option = q.options.find((o) => o.value === answer);
        if (option) {
          scores.retail += option.scores.retail;
          scores.tourism += option.scores.tourism;
          scores.manufacturing += option.scores.manufacturing;
        }
      }
    });
    const max = Math.max(scores.retail, scores.tourism, scores.manufacturing);
    if (max === scores.retail) return "retail";
    if (max === scores.tourism) return "tourism";
    return "manufacturing";
  };

  // Landing
  if (step === 0) {
    return (
      <div className="min-h-screen bg-[#f9fafb]">
        <div className="bg-white sticky top-0 z-40 border-b border-gray-100">
          <div className="flex items-center gap-3 px-4 pt-12 pb-3">
            <Link href="/courses" className="text-gray-500">
              <IconArrowLeft size={22} />
            </Link>
            <div className="flex-1">
              <div className="text-base font-bold text-gray-900">技能测评</div>
            </div>
          </div>
        </div>

        <div className="px-6 pt-12 pb-20 flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-[#2DD4A8]/10 flex items-center justify-center mb-6">
            <IconTarget size={36} className="text-[#2DD4A8]" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-3">5道题，找到你的起点</h2>
          <p className="text-sm text-gray-500 leading-relaxed mb-8 max-w-xs">
            告诉我们你的经验和兴趣，AI将为你推荐最合适的微技能课，2小时速成上岗
          </p>
          <div className="w-full space-y-3 mb-8">
            <div className="flex items-center gap-3 bg-white rounded-xl p-4 border border-gray-100">
              <div className="w-8 h-8 rounded-lg bg-[#2DD4A8]/10 flex items-center justify-center shrink-0">
                <IconLightbulb size={16} className="text-[#2DD4A8]" />
              </div>
              <div className="text-left">
                <div className="text-sm font-medium text-gray-900">智能推荐</div>
                <div className="text-xs text-gray-500">基于你的技能画像匹配最优路径</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white rounded-xl p-4 border border-gray-100">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                <IconGraduationCap size={16} className="text-blue-500" />
              </div>
              <div className="text-left">
                <div className="text-sm font-medium text-gray-900">精准定位</div>
                <div className="text-xs text-gray-500">避免从错误起点开始浪费时间</div>
              </div>
            </div>
          </div>
          <button
            onClick={() => setStep(1)}
            className="w-full max-w-xs bg-[#2DD4A8] text-white text-base font-semibold py-3 rounded-xl shadow-lg shadow-[#2DD4A8]/25"
          >
            开始测评
          </button>
          <p className="text-xs text-gray-300 mt-3">只需1分钟</p>
        </div>
      </div>
    );
  }

  // Result
  if (step > questions.length) {
    const resultKey = getResult();
    const rec = recommendations[resultKey];
    const ind = industries[rec.industry as keyof typeof industries];

    return (
      <div className="min-h-screen bg-[#f9fafb]">
        <div className="bg-white sticky top-0 z-40 border-b border-gray-100">
          <div className="flex items-center gap-3 px-4 pt-12 pb-3">
            <div className="flex-1">
              <div className="text-base font-bold text-gray-900">测评结果</div>
            </div>
          </div>
        </div>

        <div className="px-6 pt-8 pb-20">
          {/* Result Card */}
          <div className="bg-gradient-to-br from-[#2DD4A8]/10 to-[#2DD4A8]/5 rounded-2xl p-6 border border-[#2DD4A8]/20 mb-6 text-center">
            <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: ind.bgColor }}>
              <IconGraduationCap size={28} style={{ color: ind.color }} />
            </div>
            <div className="text-xs text-gray-500 mb-1">你的推荐方向</div>
            <div className="text-xl font-bold text-gray-900 mb-1">{ind.fullName}</div>
            <div className="text-sm" style={{ color: ind.color }}>{ind.name}</div>
          </div>

          {/* Reason */}
          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm mb-4">
            <div className="flex items-center gap-2 mb-2">
              <IconLightbulb size={16} className="text-[#2DD4A8]" />
              <span className="text-sm font-semibold text-gray-900">为什么推荐这个方向</span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">{rec.reason}</p>
          </div>

          {/* Recommended Course */}
          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm mb-4">
            <div className="flex items-center gap-2 mb-3">
              <IconTarget size={16} className="text-[#2DD4A8]" />
              <span className="text-sm font-semibold text-gray-900">推荐你的第一门课</span>
            </div>
            <Link href={`/courses/${rec.courseId}`} className="block">
              <div className="bg-gray-50 rounded-lg p-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: ind.bgColor }}>
                  <IconGraduationCap size={20} style={{ color: ind.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900">{rec.level}推荐</div>
                  <div className="text-xs text-gray-500">{ind.name} · 从这里开始</div>
                </div>
                <IconChevronRight size={16} className="text-gray-300 shrink-0" />
              </div>
            </Link>
          </div>

          {/* Skills you'll learn */}
          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm mb-4">
            <div className="text-sm font-semibold text-gray-900 mb-3">你将掌握的技能</div>
            <div className="grid grid-cols-2 gap-2">
              {rec.skills.map((skill, i) => (
                <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-[#2DD4A8]/5">
                  <IconCheck size={12} className="text-[#2DD4A8]" />
                  <span className="text-xs text-gray-700">{skill}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-gradient-to-br from-blue-50/70 to-violet-50/50 rounded-xl p-4 border border-blue-200/30 mb-4">
            <div className="flex items-center gap-2 mb-3">
              <IconLightbulb size={16} className="text-blue-500" />
              <span className="text-sm font-semibold text-gray-900">学习路径建议</span>
            </div>
            <div className="space-y-2">
              {rec.nextSteps.map((step, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-[10px] font-bold text-blue-600">{i + 1}</span>
                  </div>
                  <span className="text-xs text-gray-700">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Preview */}
          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm mb-6">
            <div className="text-sm font-semibold text-gray-900 mb-3">学习后预期技能成长</div>
            <div className="space-y-3">
              {ind.description.split("、").slice(0, 4).map((skill, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-600">{skill.replace("覆盖", "")}</span>
                    <span className="text-[10px] text-[#2DD4A8]">+{(40 + i * 10)}%</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${60 + i * 10}%`, backgroundColor: ind.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* P0-3: Social Proof */}
          <div className="bg-blue-50/70 rounded-xl p-4 border border-blue-100/40 mb-4">
            <div className="flex items-start gap-2 mb-2">
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                <IconUsers size={12} className="text-blue-600" />
              </div>
              <div>
                <div className="text-xs text-blue-800 font-semibold mb-1">📊 数据支持</div>
                <div className="text-[10px] text-blue-700 leading-relaxed">
                  过去30天，<span className="font-bold">156</span>位与你情况相似的学习者选择了这门课
                </div>
                <div className="text-[10px] text-blue-600 mt-1">
                  其中 <span className="font-bold">78%</span> 在2周内完成并获得课程认证
                </div>
              </div>
            </div>
          </div>

          {/* P0-3: Urgency - Newcomer Bonus */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-200/40 mb-6">
            <div className="flex items-start gap-2 mb-2">
              <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center shrink-0 mt-0.5">
                <IconCoins size={12} className="text-amber-600" />
              </div>
              <div className="flex-1">
                <div className="text-xs text-amber-800 font-semibold mb-1">🎁 新手专属福利</div>
                <div className="text-[10px] text-amber-700 leading-relaxed mb-2">
                  现在加入学习小组，额外获得 <span className="font-bold text-amber-800">¥50奖学金</span> 补贴
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-amber-600 font-medium">剩余名额：23/50</span>
                  <IconZap size={12} className="text-amber-500" />
                </div>
              </div>
            </div>
          </div>

          <Link
            href={`/courses/${rec.courseId}`}
            className="block w-full bg-[#2DD4A8] text-white text-center py-3.5 rounded-xl font-semibold text-base shadow-lg shadow-[#2DD4A8]/25 mb-3"
          >
            立即开始学习
          </Link>
          <Link href="/courses" className="block text-center text-sm text-gray-500">
            浏览全部课程
          </Link>
        </div>
      </div>
    );
  }

  // Question
  const currentQ = questions[step - 1];
  return (
    <div className="min-h-screen bg-[#f9fafb]">
      <div className="bg-white sticky top-0 z-40 border-b border-gray-100">
        <div className="flex items-center gap-3 px-4 pt-12 pb-3">
          <button onClick={() => setStep(step - 1)} className="text-gray-500">
            <IconArrowLeft size={22} />
          </button>
          <div className="flex-1">
            <div className="text-base font-bold text-gray-900">技能测评</div>
          </div>
          <span className="text-xs text-gray-500">{step}/{questions.length}</span>
        </div>
        {/* Progress bar */}
        <div className="h-1 bg-gray-100">
          <div className="h-full bg-[#2DD4A8] transition-all duration-300" style={{ width: `${(step / questions.length) * 100}%` }} />
        </div>
      </div>

      <div className="px-6 pt-10 pb-20">
        <h2 className="text-lg font-bold text-gray-900 mb-6">{currentQ.question}</h2>
        <div className="space-y-3">
          {currentQ.options.map((opt) => {
            const isSelected = answers[currentQ.id] === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => handleAnswer(currentQ.id, opt.value)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                  isSelected
                    ? "border-[#2DD4A8] bg-[#2DD4A8]/5"
                    : "border-gray-100 bg-white hover:border-gray-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    isSelected ? "border-[#2DD4A8] bg-[#2DD4A8]" : "border-gray-300"
                  }`}>
                    {isSelected && <IconCheck size={14} className="text-white" />}
                  </div>
                  <span className={`text-sm ${isSelected ? "text-gray-900 font-medium" : "text-gray-700"}`}>
                    {opt.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
