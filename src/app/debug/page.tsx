"use client";
import { useEffect, useState } from "react";

export default function DebugPage() {
  const [info, setInfo] = useState<any>({});

  useEffect(() => {
    setInfo({
      envApiUrl: process.env.NEXT_PUBLIC_API_URL || "not set",
      window: typeof window !== "undefined",
      localStorage: typeof window !== "undefined" ? "available" : "not available",
    });
  }, []);

  const testApi = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:9000/api/v1";
      const response = await fetch(`${apiUrl}/health`);
      setInfo((prev: any) => ({
        ...prev,
        testResult: response.ok ? "SUCCESS" : "FAILED",
        testStatus: response.status,
        apiUrl: apiUrl,
      }));
    } catch (error: any) {
      setInfo((prev: any) => ({
        ...prev,
        testResult: "ERROR",
        errorMessage: error.message,
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">🔍 API 调试</h1>
        
        <div className="bg-white rounded-xl p-6 shadow-sm mb-4">
          <h2 className="text-lg font-semibold mb-4">环境信息</h2>
          <pre className="text-sm bg-gray-100 p-4 rounded-lg overflow-auto">
            {JSON.stringify(info, null, 2)}
          </pre>
        </div>

        <button
          onClick={testApi}
          className="w-full bg-[#2DD4A8] text-white py-3 rounded-xl font-semibold"
        >
          测试 API 连接
        </button>

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
          <h3 className="font-semibold text-blue-900 mb-2">💡 如何修复</h3>
          <ol className="text-sm text-blue-800 space-y-2 list-decimal list-inside">
            <li>确认环境变量 NEXT_PUBLIC_API_URL 已设置</li>
            <li>值应该是: https://opc-learn-backend.onrender.com/api/v1</li>
            <li>重新部署前端应用</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
