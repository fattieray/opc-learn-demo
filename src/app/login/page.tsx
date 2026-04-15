"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api, authUtils } from "@/lib/api";
import { IconArrowLeft, IconUser, IconShield, IconZap, IconChevronRight } from "@/components/Icons";

type AuthMode = "login" | "register";

// Demo accounts for quick experience
const demoAccounts = [
  { phone: "13800138000", name: "思琪", role: "学员", industry: "零售电商", avatar: "琪", color: "bg-[#2DD4A8]/10 text-[#14B88C]" },
  { phone: "13800138001", name: "阿杰", role: "学员", industry: "文旅行业", avatar: "杰", color: "bg-violet-50 text-violet-600" },
  { phone: "13800138002", name: "小程", role: "学员", industry: "制造B2B", avatar: "程", color: "bg-amber-50 text-amber-600" },
];

// Social login options (placeholder)
const socialLoginOptions = [
  { provider: "wechat", label: "微信登录", icon: "💬", available: false, desc: "即将上线" },
  { provider: "phone", label: "手机号登录", icon: "📱", available: true, desc: "当前可用" },
];

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>("login");
  const [phone, setPhone] = useState("");
  const [nickname, setNickname] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDemoLogin = async (demoPhone: string) => {
    setPhone(demoPhone);
    setError(null);
    setLoading(true);
    
    try {
      // Simulate login with demo account
      const response = await api.auth.login(demoPhone, "123456");
      authUtils.setToken(response.token);
      router.push("/courses");
    } catch (err: any) {
      setError(err.message || "体验账号登录失败，请重试");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (mode === "register") {
        // Register new user
        const response = await api.auth.register(phone, nickname);
        authUtils.setToken(response.token);
        router.push("/courses");
      } else {
        // Login with OTP
        const response = await api.auth.login(phone, otp);
        authUtils.setToken(response.token);
        router.push("/courses");
      }
    } catch (err: any) {
      setError(err.message || "操作失败，请重试");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      {/* Header */}
      <div className="bg-white sticky top-0 z-40 border-b border-gray-100">
        <div className="flex items-center gap-3 px-4 pt-12 pb-3">
          <Link href="/" className="text-gray-500">
            <IconArrowLeft size={22} />
          </Link>
          <div className="flex-1">
            <div className="text-base font-bold text-gray-900">
              {mode === "login" ? "登录" : "注册"}
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 pt-12 pb-20">
        {/* Quick Experience - Demo Accounts */}
        <div className="bg-gradient-to-r from-[#2DD4A8]/10 to-blue-50/50 rounded-xl p-4 border border-[#2DD4A8]/20 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <IconZap size={16} className="text-[#2DD4A8]" />
            <span className="text-sm font-semibold text-gray-900">快速体验</span>
            <span className="text-[10px] text-gray-500 ml-auto">无需注册，一键体验</span>
          </div>
          <div className="space-y-2">
            {demoAccounts.map((demo) => (
              <button
                key={demo.phone}
                onClick={() => handleDemoLogin(demo.phone)}
                disabled={loading}
                className="w-full flex items-center gap-3 p-3 rounded-lg bg-white/80 hover:bg-white border border-white/50 hover:border-[#2DD4A8]/30 transition-all disabled:opacity-50"
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${demo.color}`}>
                  {demo.avatar}
                </div>
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-900">{demo.name}</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-500">{demo.role}</span>
                  </div>
                  <div className="text-[10px] text-gray-500">{demo.industry} · {demo.phone}</div>
                </div>
                <IconChevronRight size={16} className="text-gray-300" />
              </button>
            ))}
          </div>
        </div>

        {/* Why Login - Value Proposition */}
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm mb-6">
          <div className="flex items-center gap-2 mb-3">
            <IconShield size={16} className="text-[#2DD4A8]" />
            <span className="text-sm font-semibold text-gray-900">为什么要登录？</span>
          </div>
          <div className="space-y-2 text-xs text-gray-600">
            <div className="flex items-start gap-2">
              <span className="text-[#2DD4A8] font-bold">✓</span>
              <span>保存学习进度，随时继续</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[#2DD4A8] font-bold">✓</span>
              <span>加入学习小组，参与同伴互评</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[#2DD4A8] font-bold">✓</span>
              <span>获得技能认证和奖学金奖励</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[#2DD4A8] font-bold">✓</span>
              <span>个性化推荐，匹配你的职业目标</span>
            </div>
          </div>
        </div>
        {/* Mode Toggle */}
        <div className="bg-white rounded-xl p-1.5 border border-gray-100 shadow-sm mb-6">
          <div className="grid grid-cols-2 gap-1">
            <button
              onClick={() => setMode("login")}
              className={`py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
                mode === "login"
                  ? "bg-[#2DD4A8] text-white shadow-md"
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              登录
            </button>
            <button
              onClick={() => setMode("register")}
              className={`py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
                mode === "register"
                  ? "bg-[#2DD4A8] text-white shadow-md"
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              注册
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Phone Input */}
          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              手机号
            </label>
            <div className="flex items-center gap-2">
              <IconUser size={18} className="text-gray-500" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 11))}
                placeholder="请输入11位手机号"
                className="flex-1 text-sm outline-none"
                required
                pattern="^1[3-9]\d{9}$"
                title="请输入有效的11位手机号，以1开头，第二位是3-9"
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              示例：13800138000
            </p>
          </div>

          {/* Nickname (Register only) */}
          {mode === "register" && (
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                昵称
              </label>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="请输入昵称"
                className="flex-1 text-sm outline-none"
                required
                minLength={2}
                maxLength={20}
              />
            </div>
          )}

          {/* OTP (Login only) */}
          {mode === "login" && (
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                验证码
              </label>
              <div className="flex items-center gap-2">
                <IconShield size={18} className="text-gray-500" />
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="6位数字验证码"
                  className="flex-1 text-sm outline-none"
                  required
                  pattern="^\d{6}$"
                  maxLength={6}
                  title="请输入6位数字验证码"
                />
              </div>
              <p className="text-xs text-[#2DD4A8] mt-2 font-medium">
                💡 测试环境请使用固定验证码：123456
              </p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-600">
              <div className="font-medium mb-1">❌ 操作失败</div>
              <div>{error}</div>
              {error.includes("phone") && (
                <div className="mt-2 text-xs text-red-500">
                  💡 提示：手机号格式应为 11 位数字，例如：13800138000
                </div>
              )}
              {error.includes("OTP") || error.includes("otp") ? (
                <div className="mt-2 text-xs text-red-500">
                  💡 提示：测试环境请使用固定验证码 123456
                </div>
              ) : null}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#2DD4A8] text-white text-base font-semibold py-3.5 rounded-xl shadow-lg shadow-[#2DD4A8]/25 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "处理中..." : mode === "login" ? "登录" : "注册"}
          </button>
        </form>

        {/* Help Text */}
        <p className="text-xs text-gray-500 text-center mt-6">
          {mode === "login"
            ? "首次使用？请先注册账号"
            : "已有账号？直接登录"}
          <button
            onClick={() => setMode(mode === "login" ? "register" : "login")}
            className="text-[#2DD4A8] font-medium ml-1"
          >
            {mode === "login" ? "注册" : "登录"}
          </button>
        </p>
      </div>
    </div>
  );
}
