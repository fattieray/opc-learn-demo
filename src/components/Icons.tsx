import React from "react";

interface IconProps {
  className?: string;
  size?: number;
  style?: React.CSSProperties;
}

function svg(content: React.ReactNode, { size = 20, className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      {content}
    </svg>
  );
}

// Navigation
export function IconTasks(props: IconProps) {
  return svg(<><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="m9 14 2 2 4-4"/></>, props);
}

export function IconCircles(props: IconProps) {
  return svg(<><circle cx="12" cy="12" r="10"/><path d="M8 12a4 4 0 0 1 8 0"/><path d="M8 12h8"/></>, props);
}

export function IconDiscover(props: IconProps) {
  return svg(<><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></>, props);
}

export function IconProfile(props: IconProps) {
  return svg(<><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></>, props);
}

// Task types
export function IconMicro(props: IconProps) {
  return svg(<><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></>, props);
}

export function IconCase(props: IconProps) {
  return svg(<><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6Z"/></>, props);
}

export function IconSandbox(props: IconProps) {
  return svg(<><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></>, props);
}

// Industries
export function IconRetail(props: IconProps) {
  return svg(<><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/><path d="M2 7h20"/></>, props);
}

export function IconTourism(props: IconProps) {
  return svg(<><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></>, props);
}

export function IconManufacturing(props: IconProps) {
  return svg(<><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></>, props);
}

// Common actions
export function IconArrowLeft(props: IconProps) {
  return svg(<><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></>, props);
}

export function IconChevronRight(props: IconProps) {
  return svg(<><path d="m9 18 6-6-6-6"/></>, props);
}

export function IconChevronDown(props: IconProps) {
  return svg(<><path d="m6 9 6 6 6-6"/></>, props);
}

export function IconSearch(props: IconProps) {
  return svg(<><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></>, props);
}

export function IconPlus(props: IconProps) {
  return svg(<><path d="M5 12h14"/><path d="M12 5v14"/></>, props);
}

export function IconCheck(props: IconProps) {
  return svg(<polyline points="20 6 9 17 4 12"/>, props);
}

export function IconX(props: IconProps) {
  return svg(<><path d="M18 6 6 18"/><path d="m6 6 12 12"/></>, props);
}

export function IconStar(props: IconProps) {
  return svg(<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>, props);
}

export function IconHeart(props: IconProps) {
  return svg(<><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></>, props);
}

export function IconThumbsUp(props: IconProps) {
  return svg(<><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"/></>, props);
}

export function IconBookmark(props: IconProps) {
  return svg(<><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></>, props);
}

// Status / Badge
export function IconClock(props: IconProps) {
  return svg(<><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>, props);
}

export function IconAward(props: IconProps) {
  return svg(<><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></>, props);
}

export function IconShield(props: IconProps) {
  return svg(<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>, props);
}

export function IconTarget(props: IconProps) {
  return svg(<><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></>, props);
}

// Content / Learning
export function IconEdit(props: IconProps) {
  return svg(<><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></>, props);
}

export function IconMessage(props: IconProps) {
  return svg(<><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></>, props);
}

export function IconBookOpen(props: IconProps) {
  return svg(<><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></>, props);
}

export function IconGlobe(props: IconProps) {
  return svg(<><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></>, props);
}

export function IconChart(props: IconProps) {
  return svg(<><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></>, props);
}

export function IconUsers(props: IconProps) {
  return svg(<><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>, props);
}

export function IconUser(props: IconProps) {
  return svg(<><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></>, props);
}

export function IconTrendingUp(props: IconProps) {
  return svg(<><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></>, props);
}

export function IconLightbulb(props: IconProps) {
  return svg(<><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></>, props);
}

export function IconSend(props: IconProps) {
  return svg(<><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></>, props);
}

export function IconDollarSign(props: IconProps) {
  return svg(<><line x1="12" y1="2" x2="12" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></>, props);
}

export function IconFire(props: IconProps) {
  return svg(<><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></>, props);
}

export function IconCoins(props: IconProps) {
  return svg(<><circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18"/><path d="M7 6h1v4"/><path d="m16.71 13.88.7.71-2.82 2.82"/></>, props);
}

export function IconPool(props: IconProps) {
  return svg(<><path d="M2 16c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1s1.2 1 2.5 1c2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 20c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1s1.2 1 2.5 1c2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M7 12V4h4v8"/><path d="M11 8H7"/></>, props);
}

export function IconFileText(props: IconProps) {
  return svg(<><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></>, props);
}

export function IconClipboardCheck(props: IconProps) {
  return svg(<><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/></>, props);
}

export function IconEye(props: IconProps) {
  return svg(<><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></>, props);
}

export function IconBarChart(props: IconProps) {
  return svg(<><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></>, props);
}

export function IconTrophy(props: IconProps) {
  return svg(<><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></>, props);
}

export function IconGraduationCap(props: IconProps) {
  return svg(<><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></>, props);
}

export function IconMap(props: IconProps) {
  return svg(<><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></>, props);
}

export function IconNote(props: IconProps) {
  return svg(<><path d="M16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8Z"/><polyline points="14,3 14,8 21,8"/><line x1="12" y1="11" x2="12" y2="17"/><line x1="9" y1="14" x2="15" y2="14"/></>, props);
}

export function IconShare2(props: IconProps) {
  return svg(<><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></>, props);
}

export function IconBriefcase(props: IconProps) {
  return svg(<><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></>, props);
}

export function IconArrowRight(props: IconProps) {
  return svg(<><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>, props);
}

export function IconZap(props: IconProps) {
  return svg(<><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></>, props);
}

export function IconHelpCircle(props: IconProps) {
  return svg(<><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></>, props);
}

export function IconFlag(props: IconProps) {
  return svg(<><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></>, props);
}

export function IconActivity(props: IconProps) {
  return svg(<><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></>, props);
}

export function IconCertification(props: IconProps) {
  return svg(<><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 12h6"/><path d="M9 8h6"/><path d="M9 16h2"/><circle cx="17" cy="15" r="3"/><path d="m21 19-1.5-1.5"/></>, props);
}

export function IconExam(props: IconProps) {
  return svg(<><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14,2 14,8 20,8"/><path d="m9 15 2 2 4-4"/></>, props);
}

export function IconChalkboard(props: IconProps) {
  return svg(<><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M12 17v4"/><path d="M8 21h8"/></>, props);
}

export function IconBadgeCheck(props: IconProps) {
  return svg(<><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m9 12 2 2 4-4"/></>, props);
}

export function IconWallet(props: IconProps) {
  return svg(<><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></>, props);
}

// Additional icons for landing page
export function IconShopping(props: IconProps) {
  return svg(<><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/><path d="M2 7h20"/><path d="M6 12h.01"/><path d="M10 12h.01"/><path d="M14 12h.01"/><path d="M18 12h.01"/></>, props);
}

export function IconPlane(props: IconProps) {
  return svg(<><path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></>, props);
}

export function IconFactory(props: IconProps) {
  return svg(<><path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-6 4V8l-6 4V4H4v16Z"/><path d="M12 10V4"/><path d="M8 10v6"/><path d="M16 10v6"/></>, props);
}

export function IconCheckCircle(props: IconProps) {
  return svg(<><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></>, props);
}
