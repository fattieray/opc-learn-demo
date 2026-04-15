"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import BottomNav from "@/components/BottomNav";
import {
  IconSearch, IconChevronDown, IconChevronRight, IconArrowLeft,
  IconBookOpen, IconMessage, IconMail, IconUsers, IconCoins,
  IconAward, IconShield, IconHelpCircle, IconZap, IconCheck,
  IconGraduationCap, IconBriefcase, IconStar,
} from "@/components/Icons";
import { Card, InfoBanner } from "@/components/Cards";

// FAQ数据
const faqCategories = [
  {
    id: "getting-started",
    name: "开始使用",
    icon: IconZap,
    color: "text-[#2DD4A8]",
    bgColor: "bg-[#2DD4A8]/10",
    questions: [
      {
        q: "OPC Learn是什么？",
        a: "OPC Learn是一个面向运营人才的模拟实战训练平台。我们通过真实行业场景的模拟任务驱动学习，通过社交信任网络加速成长，通过能力认证验证人才价值，最终帮助你拿到理想的offer。",
      },
      {
        q: "如何注册和开始学习？",
        a: "点击首页的免费开始按钮，填写手机号和验证码即可完成注册。注册后系统会引导你选择感兴趣的行业赛道和学习目标，然后为你推荐最适合的课程。",
      },
      {
        q: "平台收费吗？",
        a: "微技能课完全免费，体系课需要付费（¥299-599）。OPC认证费用为¥680，MIIT认证费用为¥600。我们提供奖学金制度，优秀学员可以获得学费返还。",
      },
      {
        q: "学习需要多长时间？",
        a: "微技能课约2小时/门，体系课约10小时。建议每天学习30-60分钟，一般2-3个月可以完成一个完整的学习路径并获得认证。",
      },
    ],
  },
  {
    id: "courses",
    name: "课程学习",
    icon: IconBookOpen,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    questions: [
      {
        q: "课程有哪些类型？",
        a: "我们提供两种课程：\n\n1. **微技能课**（2小时）：快速掌握单一技能，如"小红书种草文案速成"\n2. **体系课**（10小时）：系统化学习全栈能力，如"小红书内容运营全栈能力"\n\n建议先完成微技能课建立基础，再学习体系课系统提升。",
      },
      {
        q: "如何上课？",
        a: "进入课程页面后，你会看到课程模块列表。每个模块包含：\n\n• 视频/文档学习材料\n• 实战任务（作业）\n• 同伴互评\n• 教练点评\n\n按顺序完成即可，系统会自动记录你的进度。",
      },
      {
        q: "作业如何提交和评分？",
        a: "作业提交后，会经过两层评审：\n\n1. **同伴互评**（40%）：2-3位同学根据你的作业评分\n2. **教练点评**（60%）：专业教练给出详细反馈\n\n评分标准会在作业页面明确展示，包括各个维度的评分量规。",
      },
      {
        q: "可以退课吗？",
        a: "课程购买后7天内，如果学习进度不超过20%，可以申请全额退款。超过7天或进度超过20%，可以申请转课（换其他课程）。",
      },
    ],
  },
  {
    id: "certification",
    name: "认证体系",
    icon: IconAward,
    color: "text-amber-500",
    bgColor: "bg-amber-50",
    questions: [
      {
        q: "有哪些认证？",
        a: "我们提供三级认证：\n\n1. **课程认证**（免费）：完成课程自动获得，证明你学习并练习了该技能\n2. **OPC认证**（¥680）：提交作品集+教练审核，证明你可以独立完成工作\n3. **MIIT认证**（¥600）：工信部认证，国家职业资格，全国联网可查\n\n建议路径：课程认证 → OPC认证 → MIIT认证",
      },
      {
        q: "OPC认证如何进行？",
        a: "OPC认证流程：\n\n1. 完成至少2门微技能课和1门体系课\n2. 在学习过程中自动积累作品集（所有作业）\n3. 达到要求后，一键申请OPC认证\n4. 教练审核你的作品集（约3-5个工作日）\n5. 通过后获得OPC认证证书\n\n认证有效期3年，到期后可申请复审。",
      },
      {
        q: "认证的含金量如何？",
        a: "我们的认证受到越来越多企业的认可：\n\n• **课程认证**：平台内学习凭证，展示你的学习经历\n• **OPC认证**：50+合作企业优先面试持证者\n• **MIIT认证**：国家职业资格，全国联网可查，享受数字经济人才政策\n\n我们持续扩大企业合作网络，提升认证价值。",
      },
      {
        q: "认证不通过怎么办？",
        a: "如果认证未通过，你会收到详细的反馈意见。你可以：\n\n1. 根据反馈改进作品集\n2. 30天后重新申请（无需额外费用）\n3. 如需帮助，可以预约教练辅导（¥100/次）\n\n我们的目标是帮助你真正掌握能力，而不仅仅是发证。",
      },
    ],
  },
  {
    id: "scholarship",
    name: 奖学金,
    icon: IconCoins,
    color: "text-violet-500",
    bgColor: "bg-violet-50",
    questions: [
      {
        q: "奖学金如何获得？",
        a: "奖学金通过以下方式获得：\n\n1. **优秀作业**：作业评分达到85分以上，获得¥100-300\n2. **优质互评**：你的点评被教练认可，获得¥10-20/次\n3. **帮助他人**：回答问题被采纳，获得¥20/次\n4. **连续学习**：连续学习7天/30天，获得额外奖励\n5. **邀请好友**：邀请1人双方各得¥50\n\n奖学金可直接提现或抵扣学费。",
      },
      {
        q: "奖学金如何提现？",
        a: "奖学金满100元即可提现：\n\n1. 进入个人中心 → 奖学金\n2. 点击提现按钮\n3. 填写支付宝/微信收款码\n4. 1-3个工作日到账\n\n提现无手续费，平台全额发放。",
      },
      {
        q: "奖学金池是什么？",
        a: "奖学金池是平台设立的奖励基金，来源包括：\n\n• 企业赞助（招聘需求）\n• 平台营销预算\n• 政府补贴（人才培养）\n\n我们采用**绝对评分**机制：达到标准即可获得奖学金，多人可同得，不是零和博弈。这鼓励协作而非恶性竞争。",
      },
    ],
  },
  {
    id: "social",
    name: "社交学习",
    icon: IconUsers,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    questions: [
      {
        q: "学习圈是什么？",
        a: "学习圈是我们的社交学习社区，你可以：\n\n• 查看同学的学习动态\n• 提出问题并获得帮助\n• 点评同学作业\n• 分享学习心得\n• 建立学习伙伴关系\n\n学习圈让学习不再孤独，通过社交互动加速成长。",
      },
      {
        q: "如何找到学习伙伴？",
        a: "系统会自动推荐学习伙伴，基于：\n\n• 同学同课程\n• 同赛道/行业\n• 技能互补\n• 学习目标相似\n\n你也可以在学习圈主动互动，自然形成学习小组。",
      },
      {
        q: "什么是信任分？",
        a: "信任分是你的社交资本，构成包括：\n\n• 被认可次数 × 认可者权重（教练认可=10分，优秀学员=5分）\n• 帮助他人解决问题的成功率\n• 互评质量（评语长度、深度、被采纳次数）\n• 连续学习天数\n• 作业平均分\n\n高信任分可成为同伴导师，获得额外收益。",
      },
    ],
  },
  {
    id: "career",
    name: "就业服务",
    icon: IconBriefcase,
    color: "text-amber-500",
    bgColor: "bg-amber-50",
    questions: [
      {
        q: "平台提供就业帮助吗？",
        a: "是的！我们提供全方位就业服务：\n\n1. **能力档案**：自动聚合你的作业、证书、认可，生成可分享链接\n2. **企业对接**：50+合作企业，直接投递通道\n3. **内推机制**：优秀学员获得企业内推\n4. **求职指导**：简历优化、面试准备\n5. **就业保障**：完成学习+通过认证，90天内拿到offer，否则免费重学",
      },
      {
        q: "如何提高就业成功率？",
        a: "建议路径：\n\n1. 完成完整学习路径（微技能课+体系课）\n2. 获得OPC认证（雇主认可度高）\n3. 建立丰富的能力档案（多完成高质量作业）\n4. 积极参与学习圈（建立人脉）\n5. 使用平台的求职指导服务\n\n数据显示，完成以上步骤的学员，就业成功率达85%。",
      },
      {
        q: "合作企业有哪些？",
        a: "我们已与50+企业建立合作，包括：\n\n• 电商公司（小红书、淘宝运营团队）\n• 文旅企业（旅行社、民宿集团）\n• 制造企业（B2B营销部门）\n• 互联网大厂（内容运营岗位）\n\n合作企业持续增加中，我们会优先推荐持证学员。",
      },
    ],
  },
  {
    id: "technical",
    name: "技术问题",
    icon: IconShield,
    color: "text-green-500",
    bgColor: "bg-green-50",
    questions: [
      {
        q: "忘记密码怎么办？",
        a: "在登录页面点击忘记密码，输入注册手机号，获取验证码后即可重置密码。如果手机号已更换，请联系客服处理。",
      },
      {
        q: "视频无法播放怎么办？",
        a: "尝试以下步骤：\n\n1. 检查网络连接\n2. 清除浏览器缓存\n3. 更换浏览器（推荐Chrome/Safari）\n4. 使用APP学习（体验更好）\n\n如仍无法解决，请截图联系客服。",
      },
      {
        q: "如何修改个人资料？",
        a: "进入个人中心 → "编辑资料"，可以修改：\n\n• 昵称\n• 头像\n• 个人简介\n• 行业偏好\n• 学习目标\n\n注意：行业偏好修改后，推荐课程会相应调整。",
      },
      {
        q: "APP在哪里下载？",
        a: "我们目前优先优化Web端体验，APP正在开发中。预计2026年Q3上线iOS和Android版本。\n\n你可以将网页添加到手机主屏幕，获得类似APP的体验：\n• Safari：点击分享 → 添加到主屏幕\n• Chrome：点击菜单 → 添加到主屏幕",
      },
    ],
  },
];

// 快速链接
const quickLinks = [
  { icon: IconBookOpen, label: "浏览课程", href: "/courses", color: "text-blue-500" },
  { icon: IconAward, label: "认证中心", href: "/profile/certification", color: "text-amber-500" },
  { icon: IconCoins, label: 奖学金, href: "/profile", color: "text-violet-500" },
  { icon: IconUsers, label: "学习圈", href: "/circles", color: "text-blue-500" },
  { icon: IconGraduationCap, label: "学习路径", href: "/discover", color: "text-[#2DD4A8]" },
  { icon: IconStar, label: "成为教练", href: "/profile/expert", color: "text-amber-500" },
];

// 联系方式
const contactMethods = [
  {
    icon: IconMessage,
    title: "在线客服",
    description: "工作日 9:00-18:00",
    action: "开始对话",
    href: "#",
    color: "text-[#2DD4A8]",
    bgColor: "bg-[#2DD4A8]/10",
  },
  {
    icon: IconMail,
    title: "邮件支持",
    description: "24小时内回复",
    action: "发送邮件",
    href: "mailto:support@opc-learn.com",
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    icon: IconUsers,
    title: "学习社区",
    description: "在圈子中提问",
    action: "进入社区",
    href: "/circles",
    color: "text-violet-500",
    bgColor: "bg-violet-50",
  },
];

export default function HelpCenterPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCategory, setExpandedCategory] = useState<string | null>("getting-started");

  // 搜索FAQ
  const filteredCategories = faqCategories
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.a.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((category) => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white sticky top-0 z-40 border-b border-gray-100">
        <div className="flex items-center gap-3 px-4 pt-12 pb-3">
          <button onClick={() => router.back()} className="text-gray-500">
            <IconArrowLeft size={22} />
          </button>
          <div className="flex-1">
            <div className="text-base font-bold text-gray-900">帮助中心</div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-gradient-to-br from-[#2DD4A8] to-[#14B88C] px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold text-white mb-2">有什么可以帮你的？</h1>
          <p className="text-sm text-white/90 mb-4">搜索问题或浏览分类</p>
          <div className="relative">
            <IconSearch size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索问题，如"如何获得奖学金"..."
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Quick Links */}
        {!searchQuery && (
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">快速链接</h2>
            <div className="grid grid-cols-3 gap-3">
              {quickLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link key={link.href} href={link.href} className="block">
                    <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all text-center">
                      <div className="flex justify-center mb-2">
                        <Icon size={24} className={link.color} />
                      </div>
                      <div className="text-xs text-gray-700 font-medium">{link.label}</div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Contact Methods */}
        {!searchQuery && (
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">联系我们</h2>
            <div className="grid md:grid-cols-3 gap-3">
              {contactMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <Link key={method.href} href={method.href} className="block">
                    <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all">
                      <div className={`w-10 h-10 rounded-lg ${method.bgColor} flex items-center justify-center mb-3`}>
                        <Icon size={20} className={method.color} />
                      </div>
                      <div className="text-sm font-semibold text-gray-900 mb-1">{method.title}</div>
                      <div className="text-[10px] text-gray-500 mb-2">{method.description}</div>
                      <div className="text-xs text-[#2DD4A8] font-medium">{method.action} →</div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* FAQ Categories */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">
            {searchQuery ? `搜索结果 (${filteredCategories.length}个分类)` : "常见问题"}
          </h2>

          {filteredCategories.length === 0 ? (
            <Card>
              <div className="text-center py-8">
                <IconHelpCircle size={48} className="text-gray-300 mx-auto mb-3" />
                <div className="text-sm text-gray-600 mb-2">未找到相关问题</div>
                <div className="text-xs text-gray-500">试试其他关键词，或联系在线客服</div>
              </div>
            </Card>
          ) : (
            <div className="space-y-3">
              {filteredCategories.map((category) => {
                const Icon = category.icon;
                const isExpanded = expandedCategory === category.id;

                return (
                  <div key={category.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                    <button
                      onClick={() => setExpandedCategory(isExpanded ? null : category.id)}
                      className="w-full p-4 flex items-center gap-3 hover:bg-gray-50 transition-colors"
                    >
                      <div className={`w-10 h-10 rounded-lg ${category.bgColor} flex items-center justify-center`}>
                        <Icon size={20} className={category.color} />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="text-sm font-semibold text-gray-900">{category.name}</div>
                        <div className="text-[10px] text-gray-500">{category.questions.length}个问题</div>
                      </div>
                      {isExpanded ? (
                        <IconChevronDown size={18} className="text-gray-400" />
                      ) : (
                        <IconChevronRight size={18} className="text-gray-400" />
                      )}
                    </button>

                    {isExpanded && (
                      <div className="border-t border-gray-100">
                        {category.questions.map((faq, index) => (
                          <details key={index} className="group">
                            <summary className="px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors list-none">
                              <div className="flex items-start gap-2">
                                <IconChevronRight
                                  size={16}
                                  className="text-gray-400 mt-0.5 group-open:rotate-90 transition-transform"
                                />
                                <span className="text-sm font-medium text-gray-900 flex-1">{faq.q}</span>
                              </div>
                            </summary>
                            <div className="px-4 pb-4 pl-10">
                              <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                                {faq.a}
                              </div>
                            </div>
                          </details>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Feedback */}
        <InfoBanner title="需要更多帮助？" variant="info">
          <div className="space-y-2">
            <p>如果以上内容没有解决你的问题，我们提供多种联系方式：</p>
            <div className="flex flex-wrap gap-2 pt-2">
              <Link
                href="/circles"
                className="px-3 py-1.5 rounded-lg bg-white/60 text-xs font-medium text-gray-700 hover:bg-white transition-colors"
              >
                在学习圈提问
              </Link>
              <Link
                href="mailto:support@opc-learn.com"
                className="px-3 py-1.5 rounded-lg bg-white/60 text-xs font-medium text-gray-700 hover:bg-white transition-colors"
              >
                发送邮件
              </Link>
              <button className="px-3 py-1.5 rounded-lg bg-[#2DD4A8] text-white text-xs font-medium hover:bg-[#14B88C] transition-colors">
                在线客服
              </button>
            </div>
          </div>
        </InfoBanner>

        {/* Still Need Help */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-3">
              <IconMessage size={32} className="text-blue-600" />
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-2">需要人工帮助？</h3>
            <p className="text-sm text-gray-600 mb-4">
              我们的客服团队工作日 9:00-18:00 在线，平均响应时间 &lt; 5分钟
            </p>
            <button className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors">
              开始对话
            </button>
          </div>
        </section>
      </div>

      <BottomNav />
    </div>
  );
}
