import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OPC Learn - 实战驱动 x 社交学习",
  description: "运营人才的实战训练场 | 系统学框架、动手练技能，以讨论驱动知识构建",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#f9fafb]">
        <main className="flex-1 max-w-lg mx-auto w-full pb-16">{children}</main>
      </body>
    </html>
  );
}
