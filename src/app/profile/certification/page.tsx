"use client";
import Link from "next/link";
import {
  IconArrowLeft, IconTrophy, IconAward, IconShare2, IconCheck, IconGraduationCap,
  IconZap, IconShield, IconCertification, IconExam, IconChevronRight,
  IconBriefcase, IconTarget, IconLightbulb, IconStar, IconBadgeCheck,
  IconUser,
} from "@/components/Icons";
import { certifications, userCertifications, industries, experts } from "@/lib/mock/data";
import { currentUser } from "@/lib/mock/users";

const tierConfig = {
  course: {
    name: "课程认证",
    label: "学习凭证",
    icon: IconZap,
    color: "#2DD4A8",
    bgColor: "#ECFDF5",
    borderColor: "border-[#2DD4A8]/20",
    cardBg: "bg-[#2DD4A8]/5",
    desc: "完成课程学习自动获得，证明你学过练过",
  },
  opc: {
    name: "OPC认证",
    label: "能力认证",
    icon: IconCertification,
    color: "#3B82F6",
    bgColor: "#EFF6FF",
    borderColor: "border-blue-200/40",
    cardBg: "bg-blue-50/50",
    desc: "作品集+教练审核，证明你能独立完成工作",
  },
  miit: {
    name: "工信部认证",
    label: "国家认证",
    icon: IconGraduationCap,
    color: "#8B5CF6",
    bgColor: "#F5F3FF",
    borderColor: "border-violet-200/40",
    cardBg: "bg-violet-50/50",
    desc: "国家职业资格，人社部联网可查，政策待遇",
  },
};

export default function CertificationHubPage() {
  const user = currentUser;
  const earnedMap = new Map(userCertifications.map((c) => [c.certDefId, c]));
  const userIndustry = user.industry as "retail" | "tourism" | "manufacturing";

  // Group certifications by tier
  const tiers = ["course", "opc", "miit"] as const;

  // Get certs relevant to user's industry
  const relevantCerts = certifications.filter((c) => c.industry === userIndustry);

  return (
    <div className="min-h-screen bg-[#f9fafb] pb-6">
      {/* Header */}
      <div className="bg-white sticky top-0 z-40 border-b border-gray-100">
        <div className="flex items-center gap-3 px-4 pt-12 pb-3">
          <Link href="/profile" className="text-gray-500">
            <IconArrowLeft size={22} />
          </Link>
          <div className="flex-1">
            <div className="text-base font-bold text-gray-900">认证中心</div>
            <div className="text-[10px] text-gray-400">学习 → 认证 → 就业 · 三级认证体系</div>
          </div>
        </div>
      </div>

      {/* Certification Path Overview */}
      <div className="px-4 pt-4">
        <div className="bg-gradient-to-br from-violet-50/80 to-blue-50/50 rounded-xl p-4 border border-violet-200/30">
          <div className="flex items-center gap-2 mb-3">
            <IconTarget size={16} className="text-violet-600" />
            <span className="text-sm font-semibold text-gray-900">认证成长路径</span>
          </div>
          {/* Three-tier path visual */}
          <div className="flex items-center gap-2">
            <div className="flex-1 text-center p-2 rounded-lg bg-[#2DD4A8]/10 border border-[#2DD4A8]/20">
              <IconZap size={16} className="text-[#2DD4A8] mx-auto mb-1" />
              <div className="text-[10px] font-semibold text-gray-700">学习练习</div>
              <div className="text-[9px] text-gray-400">课程认证</div>
            </div>
            <IconChevronRight size={14} className="text-gray-300 shrink-0" />
            <div className="flex-1 text-center p-2 rounded-lg bg-blue-50 border border-blue-200/30">
              <IconCertification size={16} className="text-blue-500 mx-auto mb-1" />
              <div className="text-[10px] font-semibold text-gray-700">认证评估</div>
              <div className="text-[9px] text-gray-400">OPC认证</div>
            </div>
            <IconChevronRight size={14} className="text-gray-300 shrink-0" />
            <div className="flex-1 text-center p-2 rounded-lg bg-violet-50 border border-violet-200/30">
              <IconGraduationCap size={16} className="text-violet-500 mx-auto mb-1" />
              <div className="text-[10px] font-semibold text-gray-700">国家考试</div>
              <div className="text-[9px] text-gray-400">工信部认证</div>
            </div>
          </div>
        </div>
      </div>

      {/* My Progress Summary */}
      <div className="px-4 pt-4">
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <IconTrophy size={16} className="text-amber-500" />
            <span className="text-sm font-semibold text-gray-900">我的认证进度</span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {tiers.map((tier) => {
              const cfg = tierConfig[tier];
              const Ic = cfg.icon;
              const certsInTier = relevantCerts.filter((c) => c.tier === tier);
              const earnedInTier = certsInTier.filter((c) => earnedMap.get(c.id)?.status === "earned").length;
              const inProgressInTier = certsInTier.filter((c) => earnedMap.get(c.id)?.status === "in_progress").length;
              return (
                <div key={tier} className="text-center p-3 rounded-lg" style={{ backgroundColor: cfg.bgColor }}>
                  <div className="w-8 h-8 rounded-full mx-auto mb-1.5 flex items-center justify-center" style={{ backgroundColor: `${cfg.color}20` }}>
                    <Ic size={16} style={{ color: cfg.color }} />
                  </div>
                  <div className="text-[11px] font-semibold" style={{ color: cfg.color }}>{cfg.name}</div>
                  <div className="text-[10px] text-gray-500 mt-0.5">
                    {earnedInTier > 0 ? `✓ ${earnedInTier}张` : inProgressInTier > 0 ? "准备中" : "未开始"}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Three-tier certification cards */}
      {tiers.map((tier) => {
        const cfg = tierConfig[tier];
        const Ic = cfg.icon;
        const certsInTier = certifications.filter((c) => c.tier === tier);

        return (
          <div key={tier} className="px-4 pt-5">
            {/* Tier Header */}
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${cfg.color}15` }}>
                <Ic size={14} style={{ color: cfg.color }} />
              </div>
              <span className="text-sm font-semibold text-gray-900">{cfg.name}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ backgroundColor: cfg.bgColor, color: cfg.color }}>{cfg.label}</span>
            </div>
            <p className="text-[10px] text-gray-400 mb-3 -mt-1 ml-8">{cfg.desc}</p>

            {/* Cert cards */}
            <div className="space-y-3">
              {certsInTier.map((cert) => {
                const earned = earnedMap.get(cert.id);
                const isEarned = earned?.status === "earned";
                const isInProgress = earned?.status === "in_progress";
                const isMyIndustry = cert.industry === userIndustry;
                const ind = industries[cert.industry];
                const levelNames: Record<string, string> = { entry: "初级", mid: "中级", senior: "高级" };

                return (
                  <div
                    key={cert.id}
                    className={`bg-white rounded-xl border shadow-sm overflow-hidden ${isMyIndustry ? "border-gray-100" : "border-gray-50 opacity-70"}`}
                  >
                    {/* Cert Card Header */}
                    <div className="p-4">
                      <div className="flex items-start gap-3">
                        {/* Status indicator */}
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                          isEarned ? "bg-[#2DD4A8]/10" : isInProgress ? "bg-blue-50" : "bg-gray-50"
                        }`}>
                          {isEarned ? <IconCheck size={18} className="text-[#2DD4A8]" /> :
                           isInProgress ? <Ic size={18} style={{ color: cfg.color }} /> :
                           <Ic size={18} className="text-gray-300" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ backgroundColor: ind.bgColor, color: ind.color }}>{ind.name}</span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ backgroundColor: `${cfg.color}15`, color: cfg.color }}>{levelNames[cert.level]}</span>
                            {!isMyIndustry && <span className="text-[10px] text-gray-300">其他方向</span>}
                          </div>
                          <div className={`text-sm font-semibold ${isEarned || isInProgress ? "text-gray-900" : "text-gray-500"}`}>{cert.name}</div>
                          <div className="text-[10px] text-gray-400 mt-0.5">{cert.description}</div>
                        </div>
                      </div>

                      {/* Assessment details */}
                      <div className="mt-3 pt-3 border-t border-gray-50">
                        <div className="flex items-center gap-4 text-[10px] text-gray-400">
                          <span className="flex items-center gap-1">
                            {cert.assessmentType === "auto" ? <IconZap size={10} /> :
                             cert.assessmentType === "portfolio" ? <IconCertification size={10} /> :
                             <IconExam size={10} />}
                            {cert.assessmentType === "auto" ? "课程完成后自动获得" :
                             cert.assessmentType === "portfolio" ? "作品集+教练审核" :
                             "闭卷机考+实操"}
                          </span>
                          <span>有效期：{cert.validityPeriod}</span>
                          <span>颁发：{cert.issuerShort}</span>
                        </div>
                        {/* Show assigned coach for OPC certs */}
                        {cert.tier === "opc" && (() => {
                          const coach = experts.find((e) => e.roles.includes("cert_coach") && e.industry === cert.industry);
                          return coach ? (
                            <div className="mt-2.5 p-2.5 rounded-lg bg-blue-50/50 border border-blue-100/50">
                              <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-[10px] font-bold text-blue-600">{coach.userId === "coach-lin" ? "L" : coach.userId === "coach-chen" ? "C" : "Z"}</div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-[11px] font-medium text-gray-800">{coach.userId === "coach-lin" ? "林雪" : coach.userId === "coach-chen" ? "陈野" : "赵工"}</span>
                                    <span className="text-[9px] px-1 py-0.5 rounded bg-blue-100 text-blue-600 flex items-center gap-0.5"><IconBadgeCheck size={8} />认证教练</span>
                                  </div>
                                  <div className="text-[9px] text-gray-400 mt-0.5">已完成 {coach.stats.reviewsCompleted} 次评审 · 评分 {coach.stats.avgRating}</div>
                                </div>
                                <div className="text-[10px] text-blue-500 font-medium">¥50-100/次</div>
                              </div>
                            </div>
                          ) : null;
                        })()}
                      </div>

                      {/* Skills tags */}
                      <div className="flex flex-wrap gap-1.5 mt-2.5">
                        {cert.skills.map((s) => (
                          <span key={s} className="text-[9px] px-1.5 py-0.5 rounded-md" style={{ backgroundColor: `${cfg.color}08`, color: cfg.color }}>{s}</span>
                        ))}
                      </div>

                      {/* Price & Action */}
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold" style={{ color: cfg.color }}>
                            {cert.price === 0 ? "免费" : `¥${cert.price}`}
                          </span>
                          {isEarned && <span className="text-[10px] text-[#2DD4A8]">✓ 已获得 · {earned!.score}分</span>}
                          {isInProgress && <span className="text-[10px] text-blue-500">准备中</span>}
                        </div>
                        {isEarned ? (
                          <Link href="/profile/certificate" className="text-[10px] px-3 py-1.5 rounded-lg bg-[#2DD4A8] text-white font-medium">查看证书</Link>
                        ) : isInProgress ? (
                          <button className="text-[10px] px-3 py-1.5 rounded-lg bg-blue-500 text-white font-medium">继续准备</button>
                        ) : (
                          <button className="text-[10px] px-3 py-1.5 rounded-lg font-medium border" style={{ borderColor: `${cfg.color}40`, color: cfg.color }}>
                            {cert.price === 0 ? "完成课程获得" : "报名认证"}
                          </button>
                        )}
                      </div>

                      {/* Related positions */}
                      {cert.relatedPositions.length > 0 && (isEarned || isInProgress) && (
                        <div className="mt-3 pt-3 border-t border-gray-50">
                          <div className="flex items-center gap-1 mb-2">
                            <IconBriefcase size={12} className="text-gray-400" />
                            <span className="text-[10px] font-medium text-gray-500">认证可衔接岗位</span>
                          </div>
                          <div className="space-y-1.5">
                            {cert.relatedPositions.map((pos, i) => (
                              <a key={i} href={pos.link || "#"} className="flex items-center justify-between p-2 rounded-lg bg-gray-50/80 hover:bg-gray-100 transition-colors">
                                <span className="text-[11px] text-gray-700 font-medium">{pos.title}</span>
                                <div className="flex items-center gap-1.5">
                                  <span className="text-[10px]" style={{ color: cfg.color }}>{pos.salaryRange}</span>
                                  <IconChevronRight size={12} className="text-gray-300" />
                                </div>
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* OPC as prep channel for MIIT */}
      <div className="px-4 pt-5 pb-4">
        <div className="bg-gradient-to-br from-blue-50/60 to-violet-50/40 rounded-xl p-4 border border-blue-200/30">
          <div className="flex items-center gap-2 mb-3">
            <IconLightbulb size={16} className="text-blue-500" />
            <span className="text-sm font-semibold text-gray-900">OPC认证 = 工信部认证备考通道</span>
          </div>
          <div className="space-y-2.5">
            <div className="flex items-start gap-2">
              <IconCheck size={14} className="text-[#2DD4A8] shrink-0 mt-0.5" />
              <span className="text-xs text-gray-700">通过OPC认证评估，说明你已具备工信部认证80%的能力要求</span>
            </div>
            <div className="flex items-start gap-2">
              <IconCheck size={14} className="text-[#2DD4A8] shrink-0 mt-0.5" />
              <span className="text-xs text-gray-700">OPC认证的作品集可直接用于工信部认证的实操考核</span>
            </div>
            <div className="flex items-start gap-2">
              <IconCheck size={14} className="text-[#2DD4A8] shrink-0 mt-0.5" />
              <span className="text-xs text-gray-700">持OPC认证报考工信部，享专属备考辅导和模拟题库</span>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <div className="flex-1 text-center py-2 rounded-lg bg-blue-500/10 border border-blue-200/30">
              <div className="text-[10px] text-blue-600 font-medium">OPC认证</div>
              <div className="text-[9px] text-gray-400">作品集审核</div>
            </div>
            <IconChevronRight size={14} className="text-gray-300" />
            <div className="flex-1 text-center py-2 rounded-lg bg-violet-500/10 border border-violet-200/30">
              <div className="text-[10px] text-violet-600 font-medium">工信部认证</div>
              <div className="text-[9px] text-gray-400">闭卷机考</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
