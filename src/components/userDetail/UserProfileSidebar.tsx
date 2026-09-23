import React from 'react';
import { AppUser } from '../../types';

interface UserProfileSidebarProps {
  user: AppUser;
}

export const UserProfileSidebar: React.FC<UserProfileSidebarProps> = ({ user }) => {
  // Tag styling helper matching the provided screenshot
  const getTagStyle = (tag: string, idx: number) => {
    if (tag.includes('血压') || idx === 0) {
      return 'border-emerald-300 bg-emerald-50/60 text-emerald-600';
    }
    if (tag.includes('糖') || idx === 1) {
      return 'border-rose-300 bg-rose-50/60 text-rose-500';
    }
    return 'border-blue-300 bg-blue-50/60 text-blue-500';
  };

  const defaultLogs = [
    {
      id: 'op-01',
      action: '修改 民族 汉族 为 回族',
      operator: '李明明',
      time: '2026-09-19 11:09:09',
    },
    {
      id: 'op-02',
      action: '新增用户信息',
      operator: '李明明',
      time: '2026-09-17 10:09:09',
    },
  ];

  const logs = user.operationLogs && user.operationLogs.length > 0 ? user.operationLogs : defaultLogs;

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-5 text-xs">
      {/* 顶部头像与长者姓名、性别、ID */}
      <div className="flex items-center space-x-4">
        <img
          src={user.avatar}
          alt={user.realName || user.name}
          className="w-16 h-16 rounded-full object-cover ring-2 ring-gray-100 shrink-0 shadow-xs"
        />
        <div className="min-w-0">
          <div className="flex items-center space-x-2">
            <h2 className="text-base font-bold text-gray-800 tracking-tight">
              {user.realName || user.name}
            </h2>
            <span
              className={`text-sm font-bold ${
                user.gender === '男' ? 'text-[#06b6d4]' : 'text-rose-500'
              }`}
              title={user.gender}
            >
              {user.gender === '男' ? '♂' : '♀'}
            </span>
          </div>
          <div className="text-[11px] text-gray-400 font-mono mt-1">
            ID: {user.userNo}
          </div>
        </div>
      </div>

      {/* 慢病与服务标签 (高血压、糖尿病、多次购买等) */}
      <div className="flex flex-wrap gap-2 pt-1">
        {user.tags && user.tags.length > 0 ? (
          user.tags.map((tag, idx) => (
            <span
              key={tag}
              className={`px-2.5 py-1 rounded text-[11px] font-medium border ${getTagStyle(
                tag,
                idx
              )}`}
            >
              {tag}
            </span>
          ))
        ) : (
          <>
            <span className="px-2.5 py-1 rounded text-[11px] font-medium border border-emerald-300 bg-emerald-50/60 text-emerald-600">
              高血压
            </span>
            <span className="px-2.5 py-1 rounded text-[11px] font-medium border border-rose-300 bg-rose-50/60 text-rose-500">
              糖尿病
            </span>
            <span className="px-2.5 py-1 rounded text-[11px] font-medium border border-blue-300 bg-blue-50/60 text-blue-500">
              多次购买
            </span>
          </>
        )}
      </div>

      {/* 关键信息键值列表 */}
      <div className="space-y-2.5 pt-4 border-t border-gray-100 text-gray-600">
        <div className="flex">
          <span className="text-gray-400 w-24 shrink-0">真实姓名：</span>
          <span className="text-gray-800 font-medium">
            {user.realName || user.name}
          </span>
        </div>
        <div className="flex">
          <span className="text-gray-400 w-24 shrink-0">手机号码：</span>
          <span className="text-gray-800 font-mono font-medium">
            {user.phone}
          </span>
        </div>
        <div className="flex">
          <span className="text-gray-400 w-24 shrink-0">注册时间：</span>
          <span className="text-gray-800 font-mono">
            {user.registerTime}
          </span>
        </div>
        <div className="flex">
          <span className="text-gray-400 w-24 shrink-0">注册方式：</span>
          <span className="text-gray-800 font-medium">
            {user.registerType || 'PC端注册'}
          </span>
        </div>
        <div className="flex">
          <span className="text-gray-400 w-24 shrink-0">最近登录时间：</span>
          <span className="text-gray-800 font-mono">
            {user.lastLoginTime}
          </span>
        </div>
        <div className="flex">
          <span className="text-gray-400 w-24 shrink-0">最近购买时间：</span>
          <span className="text-gray-800 font-mono">
            {user.lastBuyTime || user.lastLoginTime}
          </span>
        </div>
        <div className="flex flex-col pt-1">
          <span className="text-gray-400 mb-1.5">备注：</span>
          <p className="text-gray-700 bg-gray-50/90 p-3 rounded-lg leading-relaxed text-[11px] border border-gray-100">
            {user.remarks || '该用户有多种慢性疾病，尤其需要注意控制血糖和血压。'}
          </p>
        </div>
      </div>

      {/* 社交信息 */}
      <div className="pt-4 border-t border-gray-100">
        <h3 className="text-xs font-bold text-gray-800 mb-3 tracking-wide">
          社交信息
        </h3>
        <div className="grid grid-cols-2 gap-y-2.5 text-xs text-gray-600">
          <div>
            <span className="text-gray-400">动态: </span>
            <span className="font-bold text-gray-800 font-mono">
              {user.social?.posts ?? 60}
            </span>
          </div>
          <div>
            <span className="text-gray-400">阅读量: </span>
            <span className="font-bold text-gray-800 font-mono">
              {user.social?.reads ?? 800}
            </span>
          </div>
          <div>
            <span className="text-gray-400">关注: </span>
            <span className="font-bold text-gray-800 font-mono">
              {user.social?.following ?? 80}
            </span>
          </div>
          <div>
            <span className="text-gray-400">粉丝: </span>
            <span className="font-bold text-gray-800 font-mono">
              {user.social?.followers ?? 100}
            </span>
          </div>
          <div>
            <span className="text-gray-400">点赞: </span>
            <span className="font-bold text-gray-800 font-mono">
              {user.social?.likes ?? 6000}
            </span>
          </div>
          <div>
            <span className="text-gray-400">收藏: </span>
            <span className="font-bold text-gray-800 font-mono">
              {user.social?.favorites ?? 823}
            </span>
          </div>
          <div>
            <span className="text-gray-400">评论: </span>
            <span className="font-bold text-gray-800 font-mono">
              {user.social?.comments ?? 810}
            </span>
          </div>
          <div>
            <span className="text-gray-400">转发: </span>
            <span className="font-bold text-gray-800 font-mono">
              {user.social?.shares ?? 1000}
            </span>
          </div>
        </div>
      </div>

      {/* 操作记录 */}
      <div className="pt-4 border-t border-gray-100">
        <h3 className="text-xs font-bold text-gray-800 mb-3 tracking-wide">
          操作记录
        </h3>
        <div className="space-y-4 relative pl-4 before:content-[''] before:absolute before:left-1.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-emerald-100">
          {logs.map((log) => (
            <div key={log.id} className="relative">
              <span className="absolute -left-4 top-1 w-2.5 h-2.5 rounded-full bg-[#10b981] ring-4 ring-white"></span>
              <div className="text-xs font-semibold text-gray-800">
                {log.action}
              </div>
              <div className="text-[10px] text-gray-400 mt-0.5 space-x-2">
                <span>操作人: {log.operator}</span>
                <span>操作时间: {log.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
