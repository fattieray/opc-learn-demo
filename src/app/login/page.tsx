"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api, authUtils } from "@/lib/api";
import { IconArrowLeft, IconUser, IconShield } from "@/components/Icons";

type AuthMode = "login" | "register";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>("login");
  const [phone, setPhone] = useState("");
  const [nickname, setNickname] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
              <IconUser size={18} className="text-gray-400" />
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
            <p className="text-xs text-gray-400 mt-2">
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
                <IconShield size={18} className="text-gray-400" />
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
        <p className="text-xs text-gray-400 text-center mt-6">
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
