import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import { IconTasks, IconCircles, IconDiscover, IconProfile, IconChevronRight, IconTarget, IconGraduationCap, IconCoins, IconLightbulb } from "@/components/Icons";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2DD4A8]/10 to-white flex flex-col">
      {/* Hero */}
      <div className="px-6 pt-16 pb-8">
        <div className="text-3xl font-bold text-gray-900 leading-tight">
          以实战场景<br />驱动学习
        </div>
        <p className="mt-3 text-gray-500 text-sm leading-relaxed">
          OPC Learn — 实战驱动 x 社交学习<br />
          微技能课2小时速成上岗，体系课10小时晋升主管
        </p>
      </div>

      {/* Three Engines */}
      <div className="px-6 space-y-3 mb-8">
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#2DD4A8]/10 flex items-center justify-center">
              <IconTarget size={20} className="text-[#2DD4A8]" />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-sm text-gray-900">微技能课入行起点</div>
              <div className="text-xs text-gray-400">1-2小时掌握一项技能，拿到实习岗位 (4k-7k/月)</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
              <IconCircles size={20} className="text-blue-500" />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-sm text-gray-900">社交驱动学习</div>
              <div className="text-xs text-gray-400">学习小组 + 同伴互评 + 教练指导</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
              <IconCoins size={20} className="text-amber-500" />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-sm text-gray-900">奖学金经济</div>
              <div className="text-xs text-gray-400">小组集资 + 评分分配 + 荣誉激励</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="px-6 mb-8">
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-xl font-bold text-gray-900">21</div>
              <div className="text-xs text-gray-400 mt-1">实训场景</div>
            </div>
            <div>
              <div className="text-xl font-bold text-gray-900">3</div>
              <div className="text-xs text-gray-400 mt-1">行业赛道</div>
            </div>
            <div>
              <div className="text-xl font-bold text-gray-900">4</div>
              <div className="text-xs text-gray-400 mt-1">学习路径</div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="grid grid-cols-3 gap-4 text-center text-xs">
              <div>
                <div className="text-lg font-bold text-[#2DD4A8]">1,247</div>
                <div className="text-[10px] text-gray-400 mt-0.5">活跃学员</div>
              </div>
              <div>
                <div className="text-lg font-bold text-amber-600">¥156K</div>
                <div className="text-[10px] text-gray-400 mt-0.5">奖学金发放</div>
              </div>
              <div>
                <div className="text-lg font-bold text-blue-600">89%</div>
                <div className="text-[10px] text-gray-400 mt-0.5">完课率</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Success Stories */}
      <div className="px-6 mb-8">
        <div className="text-sm font-semibold text-gray-700 mb-3">学员成功案例</div>
        <div className="space-y-3">
          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-[#2DD4A8]/10 flex items-center justify-center text-sm font-bold text-[#14B88C] shrink-0">琪</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-gray-900">思琪</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#2DD4A8]/10 text-[#14B88C]">已入职</span>
                </div>
                <div className="text-xs text-gray-600 mb-2">学完种草文案速成，2周后拿到小红书运营实习offer，月薪5.5K</div>
                <div className="flex items-center gap-3 text-[10px] text-gray-400">
                  <span>🎯 零售电商</span>
                  <span>⏱️ 2小时学习</span>
                  <span>💰 ¥3,200奖学金</span>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-violet-50 flex items-center justify-center text-sm font-bold text-violet-600 shrink-0">月</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-gray-900">小月</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-violet-50 text-violet-600">晋升中</span>
                </div>
                <div className="text-xs text-gray-600 mb-2">从微技能课到体系课，3个月后晋升内容主管，管理5人实习生团队</div>
                <div className="flex items-center gap-3 text-[10px] text-gray-400">
                  <span>🎯 零售电商</span>
                  <span>⏱️ 12小时学习</span>
                  <span>💼 运营主管</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* User Journey Preview */}
      <div className="px-6 mb-8">
        <div className="text-sm font-semibold text-gray-700 mb-3">用户旅程</div>
        <div className="space-y-2">
          {[
            { step: "1", title: "微技能课速成", desc: "1-2小时掌握一项具体技能，拿到实习岗位" },
            { step: "2", title: "体系课进阶", desc: "10小时掌握技能体系，晋升主管管理实习生" },
            { step: "3", title: "互评与反馈", desc: "同伴互评+教练点评，在反馈中持续进步" },
            { step: "4", title: "加入小组", desc: "与同伴互评、教练点评、讨论中学习" },
            { step: "5", title: "获得奖励", desc: "奖学金池分配、荣誉积分、技能成长" },
          ].map((item) => (
            <div key={item.step} className="flex items-start gap-3 bg-white rounded-lg p-3 border border-gray-100">
              <div className="w-6 h-6 rounded-full bg-[#2DD4A8] flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5">
                {item.step}
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900">{item.title}</div>
                <div className="text-xs text-gray-400">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="px-6 pb-4 mt-auto">
        {/* Assessment guidance */}
        <div className="bg-amber-50/70 rounded-xl p-3 border border-amber-100/40 mb-4">
          <div className="flex items-start gap-2">
            <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center shrink-0 mt-0.5">
              <IconLightbulb size={12} className="text-amber-600" />
            </div>
            <div className="text-xs text-amber-800 leading-relaxed">
              <span className="font-semibold">建议先做测评：</span>
              5道题帮你精准匹配行业和技能起点，避免盲目选课浪费时间
            </div>
          </div>
        </div>

        <Link
          href="/assessment"
          className="block w-full bg-white text-[#2DD4A8] text-center py-3.5 rounded-xl font-semibold text-base border-2 border-[#2DD4A8] mb-3"
        >
          <span className="flex items-center justify-center gap-2">
            <IconTarget size={18} />
            技能测评 · 找到你的起点
          </span>
        </Link>
        <Link
          href="/courses"
          className="block w-full bg-[#2DD4A8] text-white text-center py-3.5 rounded-xl font-semibold text-base shadow-lg shadow-[#2DD4A8]/25"
        >
          开始体验
        </Link>
        <p className="text-center text-xs text-gray-400 mt-3">
          已有 1,200+ 学习者正在练习
        </p>
      </div>

      <BottomNav />
    </div>
  );
}
