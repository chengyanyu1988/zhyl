import React, { useState } from 'react';
import { Search, Headphones, Bell, ChevronDown, CheckCircle2, ShieldCheck, LogOut } from 'lucide-react';

interface HeaderProps {
  onSearch?: (query: string) => void;
  onNotice: (msg: string) => void;
  currentUser?: { name: string; role: string; email: string } | null;
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearch, onNotice, currentUser, onLogout }) => {
  const [searchValue, setSearchValue] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const displayName = currentUser ? currentUser.name : 'admin';
  const displayRole = currentUser ? currentUser.role : '系统超级管理员';
  const displayEmail = currentUser ? currentUser.email : 'admin@elderlycare.gov.cn';

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (onSearch) onSearch(searchValue);
      onNotice(`正在全局检索: "${searchValue || '无关键字'}"`);
    }
  };

  return (
    <header className="h-14 bg-white border-b border-gray-100 flex items-center justify-between px-6 shrink-0 relative z-30">
      {/* Search Input */}
      <div className="flex items-center w-72">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-[#10b981] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            id="global-search-input"
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="请输入关键字"
            className="w-full pl-9 pr-4 py-1.5 text-xs text-gray-700 bg-gray-50/70 border border-transparent rounded-full focus:bg-white focus:border-[#10b981]/50 focus:outline-none focus:ring-1 focus:ring-[#10b981]/30 transition-all placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Right User Actions */}
      <div className="flex items-center space-y-0 space-x-5">
        {/* Customer Support */}
        <button
          id="header-support-btn"
          onClick={() => onNotice('正在连接智慧养老客服专线与调度中心 (400-800-9888)')}
          className="text-gray-500 hover:text-[#10b981] transition-colors p-1.5 rounded-full hover:bg-gray-100"
          title="客服与调度中心"
        >
          <Headphones className="w-4 h-4 stroke-[2]" />
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            id="header-bell-btn"
            onClick={() => setShowNotifications(!showNotifications)}
            className="text-gray-500 hover:text-[#10b981] transition-colors p-1.5 rounded-full hover:bg-gray-100 relative"
            title="通知中心"
          >
            <Bell className="w-4 h-4 stroke-[2]" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-lg border border-gray-100 p-3 z-50 text-xs">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-gray-100 font-semibold text-gray-800">
                <span>消息提醒 (2026年9月)</span>
                <span className="text-[10px] text-[#10b981] cursor-pointer">全部已读</span>
              </div>
              <div className="space-y-2">
                <div className="p-2 bg-emerald-50/60 rounded-lg text-gray-700">
                  <p className="font-medium text-emerald-800">工单巡查完成提醒</p>
                  <p className="text-[11px] text-gray-500 mt-0.5">2026-09-18 20:00 护工王小倩完成日常清洁工单</p>
                </div>
                <div className="p-2 bg-gray-50 rounded-lg text-gray-700">
                  <p className="font-medium text-gray-800">体检异常预警指标</p>
                  <p className="text-[11px] text-gray-500 mt-0.5">用户王强常规血脂检测报告已生成并归档</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="relative">
          <button
            id="header-user-menu-btn"
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-50 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#10b981] to-[#059669] flex items-center justify-center text-white text-xs font-semibold shadow-sm">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <span className="text-xs font-medium text-gray-700">{displayName}</span>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-gray-100 py-1.5 z-50 text-xs">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="font-semibold text-gray-800 truncate">{displayRole}</p>
                <p className="text-[10px] text-gray-400 mt-0.5 truncate">{displayEmail}</p>
              </div>
              <button
                onClick={() => {
                  setShowUserMenu(false);
                  onNotice('当前权限状态正常：拥有机构调度与审批权限');
                }}
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 flex items-center space-x-2 border-b border-gray-50"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>运行环境正常 (2026-09)</span>
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
                  <span>退出登录</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
