"use client";
import { useState, useEffect } from "react";

export default function TestConnectionPage() {
  const [result, setResult] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    setLoading(true);
    const results: any = {};
    
    try {
      // Test 1: Check environment variable
      results.apiUrl = process.env.NEXT_PUBLIC_API_URL || "NOT SET";
      console.log("API URL:", results.apiUrl);

      // Test 2: Direct fetch to backend
      try {
        const response = await fetch(`${results.apiUrl}/courses/`);
        results.backendStatus = response.status;
        results.backendOk = response.ok;
        if (response.ok) {
          const data = await response.json();
          results.courseCount = data.length;
          results.courses = data.slice(0, 2).map((c: any) => c.title);
        }
      } catch (err: any) {
        results.backendError = err.message;
        results.backendType = err.name;
      }

      // Test 3: Try login
      try {
        const response = await fetch(`${results.apiUrl}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone: "13800138000", otp: "123456" }),
        });
        results.loginStatus = response.status;
        results.loginOk = response.ok;
        if (response.ok) {
          const data = await response.json();
          results.loginSuccess = true;
          results.token = data.token?.substring(0, 20) + "...";
        } else {
          const error = await response.json();
          results.loginError = error.detail;
        }
      } catch (err: any) {
        results.loginError = err.message;
        results.loginType = err.name;
      }

    } catch (err: any) {
      results.error = err.message;
    }

    setResult(results);
    setLoading(false);
  };

  useEffect(() => {
    testConnection();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">🔌 连接测试</h1>
        
        <button
          onClick={testConnection}
          disabled={loading}
          className="w-full bg-[#2DD4A8] text-white py-3 rounded-xl font-semibold mb-6 disabled:opacity-50"
        >
          {loading ? "测试中..." : "重新测试"}
        </button>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">测试结果</h2>
          <pre className="text-sm bg-gray-100 p-4 rounded-lg overflow-auto whitespace-pre-wrap">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>

        {result.backendError && (
          <div className="mt-4 bg-red-50 border border-red-200 rounded-xl p-4">
            <h3 className="font-semibold text-red-700 mb-2">❌ 后端连接失败</h3>
            <p className="text-sm text-red-600">错误: {result.backendError}</p>
            <p className="text-sm text-red-600">类型: {result.backendType}</p>
            <div className="mt-3 text-sm text-red-700">
              <p className="font-medium">可能原因:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>后端服务未启动</li>
                <li>CORS 配置问题</li>
                <li>API URL 配置错误</li>
                <li>浏览器网络限制</li>
              </ul>
            </div>
          </div>
        )}

        {result.loginOk && (
          <div className="mt-4 bg-green-50 border border-green-200 rounded-xl p-4">
            <h3 className="font-semibold text-green-700 mb-2">✅ 登录成功</h3>
            <p className="text-sm text-green-600">Token: {result.token}</p>
          </div>
        )}
      </div>
    </div>
  );
}
