"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconTasks, IconCircles, IconDiscover, IconProfile } from "./Icons";

const tabs = [
  { href: "/courses", label: "课程", icon: IconTasks },
  { href: "/circles", label: "学习圈", icon: IconCircles },
  { href: "/discover", label: "发现", icon: IconDiscover },
  { href: "/profile", label: "我的", icon: IconProfile },
];

export default function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 safe-area-pb">
      <div className="max-w-lg mx-auto flex justify-around items-center h-14">
        {tabs.map((tab) => {
          const active = pathname.startsWith(tab.href);
          const Ic = tab.icon;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-col items-center justify-center gap-0.5 flex-1 h-full transition-all duration-200 ${
                active 
                  ? "text-[#2DD4A8] -translate-y-0.5" 
                  : "text-gray-500 hover:text-gray-500"
              }`}
            >
              <div className={`relative transition-transform duration-200 ${active ? "scale-110" : ""}`}>
                <Ic size={active ? 24 : 22} />
                {active && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#2DD4A8]" />
                )}
              </div>
              <span className={`text-[10px] font-medium transition-all ${active ? "font-semibold" : ""}`}>
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
