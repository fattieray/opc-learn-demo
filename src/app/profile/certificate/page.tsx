"use client";
import Link from "next/link";
import {
  IconArrowLeft, IconTrophy, IconAward, IconShare2, IconCheck, IconGraduationCap,
} from "@/components/Icons";
import { currentUser } from "@/lib/mock/users";

export default function CertificatePage() {
  const user = currentUser;

  // Demo: show 2 certificates
  const certificates = [
    {
      id: "cert-1",
      courseTitle: "为母婴品牌写3条小红书种草文案",
      industry: "A-零售",
      industryColor: "#2DD4A8",
      skills: ["文案写作", "用户洞察"],
      score: 85,
      level: "优秀",
      issuedAt: "2026年3月15日",
      issuer: "OPC Learn 认证中心",
      certNo: "OPC-2026-RE-01-0085",
    },
    {
      id: "cert-2",
      courseTitle: "为美妆品牌私域社群设计一周早安文案",
      industry: "A-零售",
      industryColor: "#2DD4A8",
      skills: ["私域文案", "人设打造"],
      score: 78,
      level: "良好",
      issuedAt: "2026年3月28日",
      issuer: "OPC Learn 认证中心",
      certNo: "OPC-2026-RE-03-0078",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f9fafb] pb-6">
      {/* Header */}
      <div className="bg-white sticky top-0 z-40 border-b border-gray-100">
        <div className="flex items-center gap-3 px-4 pt-12 pb-3">
          <Link href="/profile" className="text-gray-500">
            <IconArrowLeft size={22} />
          </Link>
          <div className="flex-1">
            <div className="text-base font-bold text-gray-900">技能认证</div>
          </div>
        </div>
      </div>

      {/* Certificates */}
      <div className="px-4 pt-4 space-y-4">
        {certificates.map((cert) => {
          const scoreColor = cert.score >= 80 ? "text-[#2DD4A8]" : cert.score >= 60 ? "text-blue-500" : "text-amber-500";
          return (
            <div key={cert.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              {/* Certificate Header */}
              <div className="relative px-5 pt-5 pb-4" style={{ background: `linear-gradient(135deg, ${cert.industryColor}08, ${cert.industryColor}15)` }}>
                <div className="absolute top-3 right-3">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center opacity-10" style={{ backgroundColor: cert.industryColor }}>
                    <IconGraduationCap size={24} style={{ color: cert.industryColor }} />
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <IconAward size={18} style={{ color: cert.industryColor }} />
                  <span className="text-sm font-bold text-gray-900">技能认证</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ backgroundColor: `${cert.industryColor}15`, color: cert.industryColor }}>
                    {cert.industry}
                  </span>
                </div>
                <div className="text-base font-bold text-gray-900 mb-1">{cert.courseTitle}</div>
                <div className="text-xs text-gray-400">认证编号：{cert.certNo}</div>
              </div>

              {/* Score & Skills */}
              <div className="px-5 py-4 border-t border-gray-50">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="text-[10px] text-gray-400">综合评分</div>
                    <div className={`text-3xl font-bold ${scoreColor}`}>{cert.score}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-gray-400">等级</div>
                    <div className={`text-lg font-bold ${scoreColor}`}>{cert.level}</div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {cert.skills.map((s) => (
                    <span key={s} className="text-[10px] px-2 py-1 rounded-lg bg-[#2DD4A8]/5 text-[#14B88C] flex items-center gap-1">
                      <IconCheck size={10} />{s}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between text-[10px] text-gray-400">
                  <span>颁发方：{cert.issuer}</span>
                  <span>{cert.issuedAt}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="px-5 py-3 border-t border-gray-50 flex items-center gap-3">
                <button className="flex-1 flex items-center justify-center gap-1.5 text-xs font-medium py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50">
                  <IconShare2 size={14} />分享至微信
                </button>
                <button className="flex-1 flex items-center justify-center gap-1.5 text-xs font-medium py-2 rounded-lg bg-[#2DD4A8] text-white hover:bg-[#20c49a]">
                  <IconTrophy size={14} />查看详情
                </button>
              </div>
            </div>
          );
        })}

        {/* Empty state hint */}
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm text-center">
          <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center mx-auto mb-3">
            <IconTrophy size={24} className="text-amber-500" />
          </div>
          <div className="text-sm font-medium text-gray-700 mb-1">继续学习，获得更多认证</div>
          <div className="text-xs text-gray-400 mb-4">完成课程且评分≥60分即可获得技能认证卡</div>
          <Link
            href="/courses"
            className="inline-block text-xs font-medium px-4 py-2 rounded-lg bg-[#2DD4A8] text-white"
          >
            去学习
          </Link>
        </div>
      </div>
    </div>
  );
}
