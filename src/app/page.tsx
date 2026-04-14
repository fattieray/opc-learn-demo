"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import BottomNav from "@/components/BottomNav";
import { IconTasks, IconCircles, IconDiscover, IconProfile, IconChevronRight, IconTarget, IconGraduationCap, IconCoins, IconLightbulb, IconZap, IconUsers, IconTrophy, IconCheck, IconArrowRight, IconShopping, IconPlane, IconFactory, IconBookOpen, IconMessage, IconBriefcase, IconClock, IconCheckCircle } from "@/components/Icons";
import { authUtils } from "@/lib/api";

// 成功案例数据
const successStories = [
  {
    id: 1,
    name: "思琪",
    avatar: "琪",
    avatarColor: "bg-[#2DD4A8]/10 text-[#14B88C]",
    badge: "已入职",
    badgeColor: "bg-[#2DD4A8]/10 text-[#14B88C]",
    story: "学完种草文案速成，2周后拿到小红书运营实习offer，月薪5.5K",
    industry: "零售电商",
    industryIcon: IconTarget,
    time: "2小时学习",
    timeIcon: IconClock,
    scholarship: "¥3,200奖学金",
    scholarshipIcon: IconCoins,
  },
  {
    id: 2,
    name: "小月",
    avatar: "月",
    avatarColor: "bg-violet-50 text-violet-600",
    badge: "晋升中",
    badgeColor: "bg-violet-50 text-violet-600",
    story: "从微技能课到体系课，3个月后晋升内容主管，管理5人实习生团队",
    industry: "零售电商",
    industryIcon: IconTarget,
    time: "12小时学习",
    timeIcon: IconClock,
    scholarship: "运营主管",
    scholarshipIcon: IconBriefcase,
  },
  {
    id: 3,
    name: "阿杰",
    avatar: "杰",
    avatarColor: "bg-blue-50 text-blue-600",
    badge: "转行成功",
    badgeColor: "bg-blue-50 text-blue-600",
    story: "从机械专业转行文旅内容运营，现在负责旅行社小红书账号",
    industry: "文旅行业",
    industryIcon: IconTarget,
    time: "8小时学习",
    timeIcon: IconClock,
    scholarship: "¥2,800奖学金",
    scholarshipIcon: IconCoins,
  },
];

// 行业赛道
const industries = [
  {
    name: "零售电商",
    icon: IconShopping,
    iconColor: "text-[#2DD4A8]",
    color: "from-[#2DD4A8] to-[#14B88C]",
    description: "小红书种草、详情页文案、私域运营",
    jobs: "运营助理、内容策划、社群运营",
    salary: "4k-12k/月",
    courses: 8,
  },
  {
    name: "文旅行业",
    icon: IconPlane,
    iconColor: "text-violet-500",
    color: "from-violet-500 to-purple-600",
    description: "旅行笔记、民宿文案、景区营销",
    jobs: "旅行博主、民宿运营、景区策划",
    salary: "5k-15k/月",
    courses: 6,
  },
  {
    name: "制造B2B",
    icon: IconFactory,
    iconColor: "text-amber-500",
    color: "from-amber-500 to-orange-600",
    description: "产品详情页、1688文案、技术文档",
    jobs: "B2B文案、产品策划、技术支持",
    salary: "6k-18k/月",
    courses: 7,
  },
];

// 核心数据
const stats = [
  { value: "1,247", label: "活跃学员", icon: IconUsers, iconColor: "text-blue-500" },
  { value: "¥156K", label: "奖学金发放", icon: IconCoins, iconColor: "text-amber-500" },
  { value: "89%", label: "完课率", icon: IconCheckCircle, iconColor: "text-[#2DD4A8]" },
  { value: "21", label: "实训场景", icon: IconTarget, iconColor: "text-violet-500" },
];

export default function LandingPage() {
  const router = useRouter();
  const isLoggedIn = authUtils.isAuthenticated();

  const handleStartLearning = () => {
    if (isLoggedIn) {
      router.push("/courses");
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2DD4A8] to-[#14B88C] flex items-center justify-center">
                <IconTarget size={18} className="text-white" />
              </div>
              <span className="text-lg font-bold text-gray-900">OPC Learn</span>
            </div>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-sm text-gray-600 hover:text-[#2DD4A8] transition-colors">核心特性</a>
              <a href="#industries" className="text-sm text-gray-600 hover:text-[#2DD4A8] transition-colors">行业赛道</a>
              <a href="#success" className="text-sm text-gray-600 hover:text-[#2DD4A8] transition-colors">成功案例</a>
            </nav>

            {/* Auth Buttons */}
            <div className="flex items-center gap-3">
              {isLoggedIn ? (
                <button
                  onClick={() => router.push("/courses")}
                  className="px-4 py-2 rounded-lg bg-[#2DD4A8] text-white text-sm font-medium hover:bg-[#14B88C] transition-colors"
                >
                  进入学习
                </button>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="px-4 py-2 rounded-lg text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
                  >
                    登录
                  </Link>
                  <Link
                    href="/login"
                    className="px-4 py-2 rounded-lg bg-[#2DD4A8] text-white text-sm font-medium hover:bg-[#14B88C] transition-colors"
                  >
                    免费注册
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 md:py-32">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2DD4A8]/10 text-[#14B88C] text-sm font-medium mb-6">
              <IconZap size={16} />
              <span>实战驱动 · 社交学习 · 奖学金激励</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              以实战场景<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2DD4A8] to-[#14B88C]">
                驱动学习成长
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8">
              OPC Learn — 微技能课2小时速成上岗，体系课10小时晋升主管<br />
              <span className="text-sm text-gray-500">学习小组 + 同伴互评 + 教练指导，让学习更高效</span>
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={handleStartLearning}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#2DD4A8] to-[#14B88C] text-white font-semibold text-lg shadow-lg shadow-[#2DD4A8]/25 hover:shadow-xl hover:shadow-[#2DD4A8]/30 transition-all"
              >
                {isLoggedIn ? '继续学习' : '免费开始学习'}
              </button>
              <Link
                href="/assessment"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-[#2DD4A8] font-semibold text-lg border-2 border-[#2DD4A8] hover:bg-[#2DD4A8]/5 transition-all flex items-center justify-center gap-2"
              >
                <IconTarget size={20} />
                技能测评
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="mt-8 flex items-center justify-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <IconCheck size={16} className="text-[#2DD4A8]" />
                <span>无需信用卡</span>
              </div>
              <div className="flex items-center gap-1">
                <IconCheck size={16} className="text-[#2DD4A8]" />
                <span>2小时速成</span>
              </div>
              <div className="flex items-center gap-1">
                <IconCheck size={16} className="text-[#2DD4A8]" />
                <span>奖学金激励</span>
              </div>
            </div>
          </div>
        </div>

        {/* Background Decoration */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#2DD4A8]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-2">
                    <IconComponent size={32} className={stat.iconColor} />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">三大核心引擎</h2>
            <p className="text-lg text-gray-600">微技能课入行 · 社交驱动学习 · 奖学金经济</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 rounded-xl bg-[#2DD4A8]/10 flex items-center justify-center mb-6">
                <IconTarget size={28} className="text-[#2DD4A8]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">微技能课入行起点</h3>
              <p className="text-gray-600 mb-4">1-2小时掌握一项具体技能，快速拿到实习岗位</p>
              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <IconCheck size={14} className="text-[#2DD4A8]" />
                  <span>实战场景驱动</span>
                </div>
                <div className="flex items-center gap-2">
                  <IconCheck size={14} className="text-[#2DD4A8]" />
                  <span>2小时速成上岗</span>
                </div>
                <div className="flex items-center gap-2">
                  <IconCheck size={14} className="text-[#2DD4A8]" />
                  <span>实习薪资 4k-7k/月</span>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center mb-6">
                <IconUsers size={28} className="text-blue-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">社交驱动学习</h3>
              <p className="text-gray-600 mb-4">学习小组 + 同伴互评 + 教练指导，高效成长</p>
              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <IconCheck size={14} className="text-blue-500" />
                  <span>学习小组互助</span>
                </div>
                <div className="flex items-center gap-2">
                  <IconCheck size={14} className="text-blue-500" />
                  <span>同伴互评反馈</span>
                </div>
                <div className="flex items-center gap-2">
                  <IconCheck size={14} className="text-blue-500" />
                  <span>专业教练指导</span>
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 rounded-xl bg-amber-50 flex items-center justify-center mb-6">
                <IconCoins size={28} className="text-amber-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">奖学金经济</h3>
              <p className="text-gray-600 mb-4">小组集资 + 评分分配 + 荣誉激励，学以致用</p>
              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <IconCheck size={14} className="text-amber-500" />
                  <span>小组集资学习</span>
                </div>
                <div className="flex items-center gap-2">
                  <IconCheck size={14} className="text-amber-500" />
                  <span>评分分配奖金</span>
                </div>
                <div className="flex items-center gap-2">
                  <IconCheck size={14} className="text-amber-500" />
                  <span>荣誉积分激励</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section id="industries" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">三大行业赛道</h2>
            <p className="text-lg text-gray-600">选择你的行业方向，开启职业成长之旅</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {industries.map((industry, index) => {
              const IconComponent = industry.icon;
              return (
                <div key={index} className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1">
                  <div className="flex justify-center mb-4">
                    <IconComponent size={48} className={industry.iconColor} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{industry.name}</h3>
                  <p className="text-gray-600 mb-4">{industry.description}</p>
                
                <div className="space-y-3 mb-6">
                  <div>
                    <div className="text-xs text-gray-400 mb-1">就业方向</div>
                    <div className="text-sm text-gray-700">{industry.jobs}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 mb-1">薪资范围</div>
                    <div className="text-sm font-semibold text-[#2DD4A8]">{industry.salary}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 mb-1">课程数量</div>
                    <div className="text-sm text-gray-700">{industry.courses}门实战课程</div>
                  </div>
                </div>

                <button
                  onClick={handleStartLearning}
                  className="w-full py-3 rounded-lg bg-gradient-to-r from-[#2DD4A8] to-[#14B88C] text-white font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  开始学习
                  <IconArrowRight size={16} />
                </button>
              </div>
            );
            })}
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section id="success" className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">学员成功案例</h2>
            <p className="text-lg text-gray-600">真实学员故事，见证成长与蜕变</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {successStories.map((story) => (
              <div key={story.id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold shrink-0 ${story.avatarColor}`}>
                    {story.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-base font-bold text-gray-900">{story.name}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${story.badgeColor}`}>
                        {story.badge}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-4 leading-relaxed">{story.story}</p>

                <div className="space-y-2 text-xs text-gray-500 mb-4">
                  <div className="flex items-center gap-1.5">
                    <IconTarget size={12} className="text-gray-400" />
                    <span>{story.industry}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <IconClock size={12} className="text-gray-400" />
                    <span>{story.time}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {story.scholarship.includes('¥') ? (
                      <><IconCoins size={12} className="text-gray-400" /><span>{story.scholarship}</span></>
                    ) : (
                      <><IconBriefcase size={12} className="text-gray-400" /><span>{story.scholarship}</span></>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <button
                    onClick={handleStartLearning}
                    className="w-full py-2.5 rounded-lg bg-gray-50 text-gray-700 font-medium hover:bg-[#2DD4A8]/5 hover:text-[#2DD4A8] transition-colors text-sm"
                  >
                    查看学习路径
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Path Preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">用户成长旅程</h2>
            <p className="text-lg text-gray-600">从新手到专家，清晰的成长路径</p>
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            {[
              { step: "1", title: "微技能课速成", desc: "1-2小时掌握技能", icon: IconTarget, iconColor: "text-[#2DD4A8]" },
              { step: "2", title: "体系课进阶", desc: "10小时晋升主管", icon: IconBookOpen, iconColor: "text-blue-500" },
              { step: "3", title: "互评与反馈", desc: "持续进步成长", icon: IconMessage, iconColor: "text-violet-500" },
              { step: "4", title: "加入小组", desc: "社交学习互助", icon: IconUsers, iconColor: "text-amber-500" },
              { step: "5", title: "获得奖励", desc: "奖学金+荣誉", icon: IconTrophy, iconColor: "text-rose-500" },
            ].map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm text-center">
                  <div className="flex justify-center mb-3">
                    <IconComponent size={40} className={item.iconColor} />
                  </div>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-[#2DD4A8] flex items-center justify-center text-white text-xs font-bold">
                      {item.step}
                    </div>
                    <h3 className="text-sm font-bold text-gray-900">{item.title}</h3>
                  </div>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-gradient-to-br from-[#2DD4A8] to-[#14B88C] rounded-3xl p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">准备好开始学习了吗？</h2>
            <p className="text-lg opacity-90 mb-8">加入1,200+学习者，开启你的职业成长之旅</p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={handleStartLearning}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-[#2DD4A8] font-semibold text-lg hover:bg-gray-50 transition-colors shadow-lg"
              >
                {isLoggedIn ? '进入学习中心' : '免费开始学习'}
              </button>
              <Link
                href="/assessment"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/20 text-white font-semibold text-lg hover:bg-white/30 transition-colors backdrop-blur-sm flex items-center justify-center gap-2"
              >
                <IconTarget size={20} />
                先做技能测评
              </Link>
            </div>

            <div className="mt-8 flex items-center justify-center gap-6 text-sm opacity-80">
              <div className="flex items-center gap-1">
                <IconCheck size={16} />
                <span>免费试用</span>
              </div>
              <div className="flex items-center gap-1">
                <IconCheck size={16} />
                <span>无需信用卡</span>
              </div>
              <div className="flex items-center gap-1">
                <IconCheck size={16} />
                <span>随时取消</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2DD4A8] to-[#14B88C] flex items-center justify-center">
                  <IconTarget size={18} className="text-white" />
                </div>
                <span className="text-lg font-bold">OPC Learn</span>
              </div>
              <p className="text-sm text-gray-400">实战驱动的内容运营学习平台</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">产品</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/courses" className="hover:text-white transition-colors">课程中心</Link></li>
                <li><Link href="/assessment" className="hover:text-white transition-colors">技能测评</Link></li>
                <li><Link href="/circles" className="hover:text-white transition-colors">学习圈</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">资源</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">帮助中心</a></li>
                <li><a href="#" className="hover:text-white transition-colors">学习指南</a></li>
                <li><a href="#" className="hover:text-white transition-colors">联系我们</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">法律</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">隐私政策</a></li>
                <li><a href="#" className="hover:text-white transition-colors">服务条款</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookie政策</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
            <p>© 2026 OPC Learn. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {isLoggedIn && <BottomNav />}
    </div>
  );
}
