import React from "react";

interface CardProps {
  children: React.ReactNode;
  variant?: "default" | "emphasis" | "info" | "success" | "warning" | "gradient";
  className?: string;
  onClick?: () => void;
}

/**
 * Standard Card Component
 * 
 * Variants:
 * - default: White background with subtle border (most common)
 * - emphasis: Left border accent for important content
 * - info: Blue tint for informational content
 * - success: Green tint for completion/success
 * - warning: Amber tint for alerts/warnings
 * - gradient: Gradient background for headers/hero sections
 */
export function Card({ children, variant = "default", className = "", onClick }: CardProps) {
  const baseStyles = "rounded-xl p-4 transition-all";
  
  const variantStyles = {
    default: "bg-white border border-gray-100 shadow-sm",
    emphasis: "bg-white border-l-4 border-[#2DD4A8] shadow-md",
    info: "bg-blue-50 border border-blue-100",
    success: "bg-green-50 border border-green-100",
    warning: "bg-amber-50 border border-amber-100",
    gradient: "bg-gradient-to-br from-[#2DD4A8] to-[#14B88C] text-white shadow-lg",
  };

  const clickableStyles = onClick ? "cursor-pointer hover:shadow-md active:scale-[0.98]" : "";

  return (
    <div
      className={`${baseStyles} ${variantStyles[variant]} ${clickableStyles} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

/**
 * Stat Card Component - For displaying statistics
 */
export function StatCard({
  icon,
  label,
  value,
  color = "blue",
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color?: "blue" | "amber" | "green" | "violet";
}) {
  const colorMap = {
    blue: "text-blue-500",
    amber: "text-amber-500",
    green: "text-green-500",
    violet: "text-violet-500",
  };

  return (
    <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-2">
        <div className={colorMap[color]}>{icon}</div>
        <span className="text-sm text-white/90">{label}</span>
      </div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );
}

/**
 * Action Card Component - For actionable items with progress
 */
export function ActionCard({
  title,
  subtitle,
  progress,
  action,
  onAction,
  tag,
  tagColor,
}: {
  title: string;
  subtitle?: string;
  progress?: number;
  action: string;
  onAction: () => void;
  tag?: string;
  tagColor?: string;
}) {
  return (
    <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:border-[#2DD4A8]/30 hover:shadow-md transition-all cursor-pointer">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-gray-900 mb-1">{title}</h3>
          {subtitle && <p className="text-xs text-gray-600">{subtitle}</p>}
          {tag && (
            <span
              className="inline-block mt-2 text-[10px] px-2 py-0.5 rounded-full"
              style={{ backgroundColor: tagColor + "20", color: tagColor }}
            >
              {tag}
            </span>
          )}
        </div>
        <button
          onClick={onAction}
          className="text-xs font-medium text-[#2DD4A8] hover:text-[#14B88C] transition-colors"
        >
          {action}
        </button>
      </div>
      {progress !== undefined && (
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#2DD4A8] to-[#14B88C] rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}

/**
 * Info Banner Component - For tips and announcements
 */
export function InfoBanner({
  title,
  children,
  variant = "info",
}: {
  title?: string;
  children: React.ReactNode;
  variant?: "info" | "success" | "warning";
}) {
  const variantStyles = {
    info: "bg-gradient-to-r from-blue-50/50 to-[#2DD4A8]/5 border border-blue-100/50",
    success: "bg-gradient-to-r from-green-50/50 to-[#2DD4A8]/5 border border-green-100/50",
    warning: "bg-gradient-to-r from-amber-50/50 to-orange-50/50 border border-amber-100/50",
  };

  const iconMap = {
    info: "💡",
    success: "✅",
    warning: "⚠️",
  };

  return (
    <div className={`rounded-xl p-4 ${variantStyles[variant]}`}>
      {title && (
        <div className="flex items-center gap-2 mb-2">
          <span>{iconMap[variant]}</span>
          <span className="text-xs font-semibold text-gray-900">{title}</span>
        </div>
      )}
      <div className="text-xs text-gray-700">{children}</div>
    </div>
  );
}
