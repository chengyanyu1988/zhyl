import React, { useState } from 'react';
import { Bell, ChevronDown, CheckCircle2, ShieldCheck, LogOut } from 'lucide-react';

export type AppTheme = 'blue' | 'slate' | 'dark' | 'sand' | 'teal' | 'mint';

interface HeaderProps {
  onSearch?: (query: string) => void;
  onNotice: (msg: string) => void;
  currentUser?: { name: string; role: string; email: string } | null;
  onLogout?: () => void;
  currentTheme?: AppTheme;
  onThemeChange?: (theme: AppTheme) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onSearch,
  onNotice,
  currentUser,
  onLogout,
  currentTheme = 'slate',
  onThemeChange,
}) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const displayRole = currentUser ? currentUser.role : '系统超级管理员';
  const displayEmail = currentUser ? currentUser.email : 'admin@elderlycare.gov.cn';

  return (
    <header className="h-14 theme-header backdrop-blur-md border-b flex items-center justify-between px-6 shrink-0 relative z-30 shadow-xs">
      {/* Empty space on left since search was removed */}
      <div className="flex items-center"></div>

      {/* Right User Actions */}
      <div className="flex items-center space-x-3.5">

        {/* Notifications */}
        <div className="relative">
          <button
            id="header-bell-btn"
            onClick={() => setShowNotifications(!showNotifications)}
            className="text-slate-500 hover:text-emerald-600 transition-colors p-2 rounded-lg hover:bg-slate-200/50 relative"
            title="通知中心"
          >
            <Bell className="w-4 h-4 stroke-[1.8]" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full ring-2 ring-white"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 theme-card rounded-xl shadow-xl border p-3.5 z-50 text-xs animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-200/60 font-semibold">
                <span>消息提醒</span>
                <span className="text-[11px] text-emerald-600 font-medium cursor-pointer hover:underline">全部标为已读</span>
              </div>
              <div className="space-y-2">
                <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                  <p className="font-semibold text-emerald-800">工单巡查完成提醒</p>
                  <p className="text-[11px] opacity-75 mt-0.5">2026-10-18 20:00 护工王小倩完成日常清洁工单</p>
                </div>
                <div className="p-2.5 bg-slate-500/10 border border-slate-500/20 rounded-lg">
                  <p className="font-semibold">体检异常预警指标</p>
                  <p className="text-[11px] opacity-75 mt-0.5">用户王强常规血脂检测报告已生成并归档</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="h-4 w-px bg-slate-300/70"></div>

        {/* User Profile */}
        <div className="relative">
          <button
            id="header-user-menu-btn"
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center space-x-2.5 p-1 px-2 rounded-lg hover:bg-slate-200/50 transition-colors"
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white text-xs font-semibold shadow-xs">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <ChevronDown className="w-3.5 h-3.5 opacity-60" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 theme-card rounded-xl shadow-xl border py-1.5 z-50 text-xs animate-in fade-in zoom-in-95 duration-150">
              <div className="px-4 py-2.5 border-b border-slate-200/60 opacity-90">
                <p className="font-semibold truncate">{displayRole}</p>
                <p className="text-[10px] opacity-60 mt-0.5 truncate">{displayEmail}</p>
              </div>
              <button
                onClick={() => {
                  setShowUserMenu(false);
                  onNotice('当前权限状态正常：拥有机构调度与审批权限');
                }}
                className="w-full text-left px-4 py-2 hover:bg-slate-200/40 flex items-center space-x-2 border-b border-slate-200/40"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>运行环境正常 (v2.6.9)</span>
              </button>
              {onLogout && (
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    onLogout();
                  }}
                  className="w-full text-left px-4 py-2 text-rose-600 hover:bg-rose-50 flex items-center space-x-2 font-medium transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>退出系统登录</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};


