import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  Sparkles,
  Bell,
  Headphones,
  Palette,
  ShieldCheck,
  ChevronDown,
  LogOut,
  X,
  ExternalLink,
  Layers,
  FileText,
  Activity,
  Award,
  Utensils,
  ClipboardList,
} from 'lucide-react';
import { ActivePage } from '../types';
import { AppTheme } from './Header';
import { NAV_MODULES, findHierarchyByPage, Level1Module, Level2Group } from './navData';

interface TopNavigationProps {
  activePage: ActivePage;
  onPageChange: (page: ActivePage) => void;
  onNotice: (msg: string) => void;
  currentUser?: { name: string; role: string; email: string } | null;
  onLogout?: () => void;
  currentTheme?: AppTheme;
  onThemeChange?: (theme: AppTheme) => void;
}

export const TopNavigation: React.FC<TopNavigationProps> = ({
  activePage,
  onPageChange,
  onNotice,
  currentUser,
  onLogout,
  currentTheme = 'teal',
  onThemeChange,
}) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showThemePicker, setShowThemePicker] = useState(false);
  const [showModuleSelector, setShowModuleSelector] = useState(false);

  const hierarchy = useMemo(() => findHierarchyByPage(activePage), [activePage]);
  const activeModule = hierarchy.module;
  const activeGroup = hierarchy.group;

  const displayName = currentUser ? currentUser.name : 'admin';
  const displayRole = currentUser ? currentUser.role : '超级管理员';

  // Level 1 Modules
  const modules = NAV_MODULES;

  // Level 2 Groups for current module
  const currentGroups = activeModule?.groups || [];

  // When clicking a Level 1 module
  const handleSelectModule = (mod: Level1Module) => {
    setShowModuleSelector(false);
    if (mod.isDirectLink && mod.directPage) {
      onPageChange(mod.directPage);
      onNotice(`已切换至「${mod.label}」`);
      return;
    }
    if (mod.groups && mod.groups.length > 0) {
      const firstItem = mod.groups[0].items[0];
      if (firstItem) {
        onPageChange(firstItem.id);
        onNotice(`已切换至「${mod.label} · ${mod.groups[0].label}」`);
      }
    }
  };

  // When clicking a Level 2 group in Row 2 (screenshot style)
  const handleSelectGroup = (grp: Level2Group) => {
    if (grp.items && grp.items.length > 0) {
      const targetItem = grp.items[0];
      onPageChange(targetItem.id);
      onNotice(`已切换至「${grp.label}」`);
    }
  };

  return (
    <header className="shrink-0 select-none z-30 shadow-md">
      {/* ========================================================
          ROW 1: 截图 1:1 风格顶部标题栏 (Screenshot Style Top Header)
          深色森林绿背景、绿色返回中枢按钮、亮绿大字与英文副标、操作员徽章
         ======================================================== */}
      <div className="h-[58px] bg-[#041c14] border-b border-[#0f4330] px-4 md:px-6 flex items-center justify-between text-white relative">
        {/* Left Section: Title + Badge + Subtitle */}
        <div className="flex items-center space-x-3.5">
          {/* Main Title + Badge + English Monospace Subtitle */}
          <div className="mr-3">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-bold text-[#00e599] tracking-tight whitespace-nowrap">
                    智慧养老服务管理
                  </span>
                  <div className="flex items-center space-x-1 text-[10px] font-medium text-[#00e599] bg-[#07291e] border border-[#00c07f]/50 px-2 py-0.5 rounded-md whitespace-nowrap">
                    <Sparkles className="w-3 h-3 text-[#00e599]" />
                    <span>颐养通 全生命周期</span>
                  </div>
                </div>
                <p className="font-mono text-[8.5px] text-[#00a86b] tracking-wider uppercase leading-none mt-1 whitespace-nowrap">
                  SMART ELDERLY CARE PLATFORM & MRV OPERATIONS
                </p>
              </div>
            </div>

        {/* Right Section: [当前操作员: admin (超级管理员)] + Tools */}
        <div className="flex items-center space-x-3 shrink-0 ml-4">
          {/* Current Operator Box (1:1 from screenshot) */}
          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-400 hidden sm:inline">当前操作员:</span>
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="text-xs text-[#00e599] font-medium bg-[#07291e] hover:bg-[#0c392b] border border-[#00c07f]/50 px-3 py-1 rounded-md flex items-center space-x-1.5 transition-colors shadow-xs"
              >
                <span>{displayName} ({displayRole})</span>
                <ChevronDown className="w-3 h-3 opacity-70" />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-[#041c14] border border-[#00c07f]/50 rounded-xl shadow-2xl p-1.5 z-50 text-xs">
                  <div className="px-3 py-2 border-b border-[#0f4330] text-[11px] text-[#a7f3d0]">
                    <p className="font-semibold text-white">{displayRole}</p>
                    <p className="opacity-70 mt-0.5">admin@elderlycare.gov.cn</p>
                  </div>
                  {onLogout && (
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        onLogout();
                      }}
                      className="w-full text-left px-3 py-2 text-rose-400 hover:bg-rose-950/40 rounded-lg flex items-center space-x-2 mt-1"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>退出登录</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          MENU AREA (上下结构):
          上层: 一级核心业务菜单栏 (Level 1 Menu Row)
          下层: 二级分类胶囊菜单栏 (Level 2 Pill Buttons Row - 截图1:1风格)
         ======================================================== */}

      {/* 上层: 一级菜单栏 (Level 1 Menu Bar) */}
      <div className="h-[44px] bg-[#041e16] border-b border-[#0f4330]/60 px-4 md:px-6 flex items-center overflow-x-auto no-scrollbar space-x-1.5">
        {modules.map((m) => {
          const isModActive = activeModule?.id === m.id;
          const Icon = m.icon;
          return (
            <button
              key={m.id}
              onClick={() => handleSelectModule(m)}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 ${
                isModActive
                  ? 'bg-[#00c582] text-white font-bold shadow-md shadow-[#00c582]/30 ring-1 ring-[#00e599]/60'
                  : 'bg-[#08261c] border border-[#143e30] text-[#a7f3d0] hover:text-white hover:bg-[#0e3326]'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isModActive ? 'text-white' : 'text-[#00e599]'}`} />
              <span className="whitespace-nowrap">{m.label}</span>
            </button>
          );
        })}
      </div>

      {/* 下层: 二级菜单栏 (Level 2 Pill Tabs Bar - 截图1:1胶囊样式) */}
      {currentGroups.length > 0 && (
        <div className="h-[50px] bg-[#031610] border-b border-[#0f4330] px-4 md:px-6 flex items-center overflow-x-auto no-scrollbar space-x-2">
          {currentGroups.map((grp) => {
            const isGroupActive = activeGroup?.id === grp.id;
            const Icon = grp.icon || FileText;

            return (
              <button
                key={grp.id}
                onClick={() => handleSelectGroup(grp)}
                className={`px-4 py-2 rounded-xl text-xs flex items-center space-x-2 transition-all shrink-0 ${
                  isGroupActive
                    ? 'bg-[#00b074] text-white font-bold shadow-lg shadow-[#00b074]/35 ring-1 ring-[#00e599]/60'
                    : 'bg-[#0b211a] border border-[#173e32] text-[#e2f5ee] hover:bg-[#11352a] hover:border-[#00c07f]/50 font-medium'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isGroupActive ? 'text-white' : 'text-[#00e599]'}`} />
                <span>{grp.label}</span>
                {grp.tag && (
                  <span
                    className={`text-[9px] px-1.5 py-0.2 rounded font-mono ${
                      isGroupActive
                        ? 'bg-white/25 text-white'
                        : 'bg-[#06281d] text-[#00e599] border border-[#00c07f]/40'
                    }`}
                  >
                    {grp.tag}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
