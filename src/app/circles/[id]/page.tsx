"use client";
import { useState } from "react";
import { use } from "react";
import Link from "next/link";
import {
  IconArrowLeft, IconMessage, IconThumbsUp, IconSend, IconUsers,
  IconCoins, IconStar, IconClipboardCheck, IconCheck, IconTarget,
  IconBookOpen, IconTrophy,
} from "@/components/Icons";
import { squads } from "@/lib/mock/squads";
import { posts } from "@/lib/mock/posts";
import { tasks } from "@/lib/mock/tasks";

const postTypeNames: Record<string, string> = {
  guidance: "教练指导",
  question: "提问",
  practice: "练习分享",
  reflection: "学习反思",
  review: "点评",
  showcase: "作品展示",
};
const postTypeColors: Record<string, string> = {
  guidance: "bg-amber-50 text-amber-700",
  question: "bg-blue-50 text-blue-700",
  practice: "bg-green-50 text-green-700",
  reflection: "bg-purple-50 text-purple-700",
  review: "bg-rose-50 text-rose-700",
  showcase: "bg-emerald-50 text-emerald-700",
};

export default function CircleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const squad = squads.find((s) => s.id === id);
  const [activeTab, setActiveTab] = useState("discussion");

  if (!squad) {
    return (
      <div className="min-h-screen bg-[#f9fafb] flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 mb-2">小组不存在</div>
          <Link href="/circles" className="text-[#2DD4A8] text-sm">返回学习圈</Link>
        </div>
      </div>
    );
  }

  const task = tasks.find((t) => t.id === squad.taskId);
  const squadPosts = posts.filter((p) => p.squadId === squad.id);

  const statusColors: Record<string, string> = {
    recruiting: "bg-green-50 text-green-700",
    learning: "bg-blue-50 text-blue-700",
    reviewing: "bg-amber-50 text-amber-700",
    completed: "bg-gray-50 text-gray-500",
  };
  const statusNames: Record<string, string> = {
    recruiting: "招募中",
    learning: "学习中",
    reviewing: "互评中",
    completed: "已完成",
  };

  const tabs = [
    { key: "discussion", label: "讨论", icon: IconMessage, count: squadPosts.length },
    { key: "assignments", label: "作业", icon: IconClipboardCheck, count: task?.assignments.length || 0 },
    { key: "members", label: "成员", icon: IconUsers, count: squad.members.length },
    { key: "pool", label: "奖金池", icon: IconCoins },
  ];

  return (
    <div className="min-h-screen bg-[#f9fafb] pb-6">
      {/* Header */}
      <div className="bg-white sticky top-0 z-40 border-b border-gray-100">
        <div className="flex items-center gap-3 px-4 pt-12 pb-3">
          <Link href="/circles" className="text-gray-500">
            <IconArrowLeft size={22} />
          </Link>
          <div className="flex-1 min-w-0">
            <div className="text-base font-bold text-gray-900 truncate">{squad.name}</div>
            <div className="text-[10px] text-gray-400 truncate">{squad.taskTitle}</div>
          </div>
          <span className={`text-[10px] px-1.5 py-0.5 rounded shrink-0 ${statusColors[squad.status]}`}>
            {statusNames[squad.status]}
          </span>
        </div>
      </div>

      {/* Tab Bar */}
      <div className="sticky top-[56px] z-30 bg-white border-b border-gray-100">
        <div className="flex">
          {tabs.map((tab) => {
            const Ic = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 flex items-center justify-center gap-1 py-2.5 text-xs font-medium border-b-2 transition-colors ${
                  activeTab === tab.key
                    ? "text-[#2DD4A8] border-[#2DD4A8]"
                    : "text-gray-400 border-transparent"
                }`}
              >
                <Ic size={14} />
                {tab.label}
                {tab.count !== undefined && (
                  <span className={`text-[10px] ${activeTab === tab.key ? "text-[#2DD4A8]" : "text-gray-300"}`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="px-4 pt-4">
        {/* Discussion Tab */}
        {activeTab === "discussion" && (
          <div className="space-y-3">
            {/* Post Input */}
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#2DD4A8] flex items-center justify-center text-white text-xs font-bold">林</div>
                <div className="flex-1 bg-gray-50 rounded-lg px-3 py-2 text-xs text-gray-400 flex items-center justify-between">
                  <span>分享你的想法或问题...</span>
                  <IconSend size={14} className="text-gray-300" />
                </div>
              </div>
              {/* Quick Actions */}
              <div className="flex gap-2 mt-3">
                <button className="text-[10px] px-2.5 py-1 rounded-lg bg-blue-50 text-blue-600">提问</button>
                <button className="text-[10px] px-2.5 py-1 rounded-lg bg-green-50 text-green-600">分享练习</button>
                <button className="text-[10px] px-2.5 py-1 rounded-lg bg-purple-50 text-purple-600">学习反思</button>
                <button className="text-[10px] px-2.5 py-1 rounded-lg bg-rose-50 text-rose-600">点评</button>
              </div>
            </div>

            {/* Post List */}
            {squadPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                {post.pinned && (
                  <div className="flex items-center gap-1 text-[10px] text-amber-600 mb-2">
                    <IconStar size={10} className="fill-amber-500" />置顶
                  </div>
                )}
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                    post.authorRole === "coach" ? "bg-amber-100 text-amber-700" : "bg-[#2DD4A8]/10 text-[#14B88C]"
                  }`}>
                    {post.authorAvatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-sm font-medium text-gray-900">{post.authorName}</span>
                      {post.authorRole === "coach" && (
                        <span className="text-[10px] px-1 py-0.5 rounded bg-amber-50 text-amber-600">教练</span>
                      )}
                      <span className={`text-[10px] px-1 py-0.5 rounded ${postTypeColors[post.type]}`}>
                        {postTypeNames[post.type]}
                      </span>
                      <span className="text-[10px] text-gray-300 ml-auto">{post.createdAt}</span>
                    </div>
                    <div className="font-medium text-sm text-gray-800 mb-1">{post.title}</div>
                    <div className="text-xs text-gray-500 leading-relaxed whitespace-pre-wrap">
                      {post.content}
                    </div>
                    <div className="flex items-center gap-4 mt-3">
                      <button className="flex items-center gap-1 text-[10px] text-gray-400 hover:text-[#2DD4A8] transition-colors">
                        <IconThumbsUp size={12} />{post.likeCount} 赞
                      </button>
                      <button className="flex items-center gap-1 text-[10px] text-gray-400 hover:text-[#2DD4A8] transition-colors">
                        <IconMessage size={12} />{post.commentCount} 回复
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Members Tab */}
        {activeTab === "members" && (
          <div className="space-y-3">
            {/* Coach */}
            {squad.members.filter((m) => m.role === "coach").map((m) => (
              <div key={m.userId} className="bg-white rounded-xl p-4 border border-amber-200/50 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-sm font-bold text-amber-700">
                    {m.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm text-gray-900">{m.name}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-50 text-amber-600">教练</span>
                    </div>
                    <div className="text-xs text-gray-400">指导小组学习，点评作业</div>
                  </div>
                </div>
              </div>
            ))}
            {/* Learners */}
            <div className="text-xs font-semibold text-gray-500 mb-1">学员</div>
            {squad.members.filter((m) => m.role === "learner").map((m) => (
              <div key={m.userId} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#2DD4A8]/10 flex items-center justify-center text-xs font-bold text-[#14B88C]">
                    {m.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm text-gray-900">{m.name}</div>
                    <div className="text-[10px] text-gray-400">
                      {m.score !== undefined ? `当前评分：${m.score}分` : "暂无评分"}
                    </div>
                  </div>
                  {m.score !== undefined && squad.status === "reviewing" && (
                    <div className="text-right">
                      <div className="text-sm font-bold text-[#2DD4A8]">{m.score}</div>
                      <div className="text-[10px] text-gray-400">当前评分</div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Assignments Tab */}
        {activeTab === "assignments" && (
          <div className="space-y-3">
            {/* Progress Steps */}
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <IconTarget size={16} className="text-[#2DD4A8]" />
                <span className="text-sm font-semibold text-gray-900">小组学习进度</span>
              </div>
              <div className="space-y-3">
                {[
                  { label: "组建小组", done: true },
                  { label: "学习资源", done: true },
                  { label: "提交作业", done: squad.status === "reviewing" || squad.status === "completed" },
                  { label: "同伴互评", done: squad.status === "completed", current: squad.status === "reviewing" },
                  { label: "教练点评", done: squad.status === "completed" },
                  { label: "奖金分配", done: squad.status === "completed" },
                ].map((step, i) => {
                  const stepCls = step.done ? "bg-[#2DD4A8] text-white" : step.current ? "bg-amber-100 text-amber-600" : "bg-gray-100 text-gray-400";
                  const labelCls = step.done ? "text-gray-700" : step.current ? "text-amber-600 font-medium" : "text-gray-400";
                  return (
                  <div key={step.label} className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${stepCls}`}>
                      {step.done ? <IconCheck size={14} /> : <span className="text-xs">{i + 1}</span>}
                    </div>
                    <span className={`text-sm ${labelCls}`}>
                      {step.label}
                    </span>
                    {step.current && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-50 text-amber-600">进行中</span>
                    )}
                  </div>
                  );
                })}
              </div>
            </div>

            {/* Member Score Matrix */}
            {task && task.assignments.length > 0 && (
              <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                <div className="text-sm font-semibold text-gray-900 mb-3">成员作业评分</div>
                <div className="text-[10px] text-gray-400 mb-2">作业得分 = 同伴评分×40% + 教练评分×60%</div>
                {/* Header row */}
                <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                  <div className="w-16 text-[10px] text-gray-500 font-medium">成员</div>
                  {task.assignments.map((asgn) => (
                    <div key={asgn.id} className="flex-1 text-[10px] text-gray-400 text-center truncate">{asgn.title.slice(0, 4)}</div>
                  ))}
                  <div className="w-12 text-[10px] text-gray-500 font-medium text-center">综合</div>
                </div>
                {/* Member rows */}
                {squad.members.filter((m) => m.role === "learner").map((m) => {
                  // Demo scores: generate from member score with variance per assignment
                  const baseScore = m.score || 0;
                  const asgnScores = task.assignments.map((asgn, i) => {
                    const variance = [0.95, 1.05, 0.9][i] || 1;
                    return Math.round(baseScore * variance);
                  });
                  const composite = task.assignments.reduce((sum, asgn, i) => sum + asgnScores[i] * asgn.weight, 0);
                  return (
                    <div key={m.userId} className="flex items-center gap-2 py-2 border-b border-gray-50 last:border-0">
                      <div className="w-16 flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-full bg-[#2DD4A8]/10 flex items-center justify-center text-[9px] font-bold text-[#14B88C]">{m.avatar}</div>
                        <span className="text-[10px] text-gray-700 truncate">{m.name}</span>
                      </div>
                      {asgnScores.map((sc, i) => (
                        <div key={i} className={`flex-1 text-xs text-center font-medium ${
                          sc >= 80 ? "text-[#2DD4A8]" : sc >= 60 ? "text-blue-500" : sc >= 40 ? "text-amber-500" : "text-red-500"
                        }`}>
                          {squad.status === "completed" || squad.status === "reviewing" ? sc : "--"}
                        </div>
                      ))}
                      <div className="w-12 text-xs text-center font-bold text-gray-900">
                        {squad.status === "completed" || squad.status === "reviewing" ? Math.round(composite) : "--"}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Peer Review Queue */}
            {squad.status === "reviewing" && (
              <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <IconClipboardCheck size={16} className="text-amber-500" />
                  <span className="text-sm font-semibold text-gray-900">待点评作业</span>
                </div>
                <div className="text-[10px] text-gray-400 mb-2">互评是强制性的——给出优质点评也能获得积分</div>
                {squad.members
                  .filter((m) => m.role === "learner" && m.userId !== "user-lin")
                  .map((m) => (
                    <div key={m.userId} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-[#2DD4A8]/10 flex items-center justify-center text-[10px] font-bold text-[#14B88C]">{m.avatar}</div>
                        <span className="text-xs text-gray-700">{m.name}的作业</span>
                      </div>
                      <button className="text-[10px] px-2.5 py-1 rounded-lg bg-amber-50 text-amber-600 font-medium">点评</button>
                    </div>
                  ))}
              </div>
            )}

            {/* Coach Progress Management View */}
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <IconUsers size={16} className="text-[#2DD4A8]" />
                <span className="text-sm font-semibold text-gray-900">学员进度管理</span>
                <span className="text-[10px] text-gray-400 ml-auto">教练视角</span>
              </div>
              <div className="space-y-2">
                {squad.members.filter((m) => m.role === "learner").map((m) => {
                  const submittedCount = m.score !== undefined ? 3 : Math.floor(Math.random() * 3);
                  const totalAssignments = task?.assignments.length || 3;
                  const progressPct = totalAssignments > 0 ? Math.round((submittedCount / totalAssignments) * 100) : 0;
                  const statusLabel = submittedCount === totalAssignments ? "已全部提交" : submittedCount > 0 ? "进行中" : "未开始";
                  const statusColor = submittedCount === totalAssignments ? "text-green-600 bg-green-50" : submittedCount > 0 ? "text-amber-600 bg-amber-50" : "text-gray-400 bg-gray-50";
                  return (
                    <div key={m.userId} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                      <div className="w-7 h-7 rounded-full bg-[#2DD4A8]/10 flex items-center justify-center text-[10px] font-bold text-[#14B88C] shrink-0">{m.avatar}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-medium text-gray-900">{m.name}</span>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded ${statusColor}`}>{statusLabel}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-[#2DD4A8] rounded-full transition-all" style={{ width: `${progressPct}%` }} />
                          </div>
                          <span className="text-[10px] text-gray-400 shrink-0">{submittedCount}/{totalAssignments}</span>
                        </div>
                      </div>
                      {submittedCount < totalAssignments && submittedCount > 0 && (
                        <button className="text-[10px] px-2 py-1 rounded bg-blue-50 text-blue-600 shrink-0">催促</button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {(!task || task.assignments.length === 0) && (
              <div className="text-center py-12 text-gray-400 text-sm">暂无作业</div>
            )}
          </div>
        )}

        {/* Pool Tab */}
        {activeTab === "pool" && (
          <div className="space-y-3">
            {/* Total */}
            <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-xl p-5 border border-amber-200/50">
              <div className="flex items-center gap-2 mb-1">
                <IconCoins size={18} className="text-amber-600" />
                <span className="text-sm font-semibold text-amber-800">奖学金池</span>
              </div>
              <div className="text-3xl font-bold text-amber-700">¥{squad.pool.total}</div>
            </div>

            {/* Breakdown */}
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <div className="text-sm font-semibold text-gray-900 mb-3">资金构成</div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm bg-[#2DD4A8]" />
                    <span className="text-xs text-gray-600">平台基础奖金</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">¥{squad.pool.platform}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm bg-blue-500" />
                    <span className="text-xs text-gray-600">成员集资</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">¥{squad.pool.stakes}</span>
                </div>
                {squad.pool.sponsor > 0 && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-sm bg-amber-500" />
                      <span className="text-xs text-gray-600">{squad.pool.sponsorName}</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">¥{squad.pool.sponsor}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Distribution */}
            {squad.status === "completed" && squad.pool.distribution ? (
              <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <IconTrophy size={16} className="text-amber-500" />
                  <span className="text-sm font-semibold text-gray-900">最终分配</span>
                </div>
                {squad.pool.distribution.map((d, i) => (
                  <div key={d.userId} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                    <div className="text-xs text-gray-400 w-4">{i + 1}</div>
                    <div className="w-7 h-7 rounded-full bg-[#2DD4A8]/10 flex items-center justify-center text-[10px] font-bold text-[#14B88C]">
                      {d.name[0]}
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-medium text-gray-900">{d.name}</div>
                      <div className="text-[10px] text-gray-400">评分 {d.score}</div>
                    </div>
                    <div className="text-sm font-bold text-amber-600">¥{d.amount}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <IconTarget size={16} className="text-[#2DD4A8]" />
                  <span className="text-sm font-semibold text-gray-900">预计分配</span>
                </div>
                <div className="text-[10px] text-gray-400 mb-3">基于当前评分（最终以互评+教练评分为准）</div>
                {squad.members
                  .filter((m) => m.role === "learner" && m.score !== undefined)
                  .sort((a, b) => (b.score || 0) - (a.score || 0))
                  .map((m, i) => {
                    const allScores = squad.members.filter((mm) => mm.role === "learner" && mm.score !== undefined).reduce((s, mm) => s + (mm.score || 0), 0);
                    const projected = Math.round(squad.pool.total * ((m.score || 0) / allScores));
                    return (
                      <div key={m.userId} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                        <div className="text-xs text-gray-400 w-4">{i + 1}</div>
                        <div className="w-7 h-7 rounded-full bg-[#2DD4A8]/10 flex items-center justify-center text-[10px] font-bold text-[#14B88C]">
                          {m.avatar}
                        </div>
                        <div className="flex-1">
                          <div className="text-xs font-medium text-gray-900">{m.name}</div>
                          <div className="text-[10px] text-gray-400">评分 {m.score}</div>
                        </div>
                        <div className="text-sm font-bold text-amber-600">~¥{projected}</div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
