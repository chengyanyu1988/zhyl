import React from 'react';
import {
  ChevronRight,
  Sparkles,
  FileText,
  Utensils,
  Tag,
  ClipboardList,
  Layers,
  CheckCircle2,
} from 'lucide-react';
import { ActivePage } from '../types';
import { findHierarchyByPage, Level3Item } from './navData';

interface Level3SidebarProps {
  activePage: ActivePage;
  onPageChange: (page: ActivePage) => void;
  onNotice: (msg: string) => void;
}

export const Level3Sidebar: React.FC<Level3SidebarProps> = ({
  activePage,
  onPageChange,
  onNotice,
}) => {
  const hierarchy = findHierarchyByPage(activePage);
  const activeGroup = hierarchy.group;
  const activeModule = hierarchy.module;

  // If this is direct link or on home module (workbench / kanban), give dashboard full screen width
  if (!activeGroup || !activeModule || activeModule.isDirectLink || activeModule.id === 'home') {
    return null;
  }

  const items: Level3Item[] = activeGroup.items || [];

  return (
    <aside className="w-52 shrink-0 h-full bg-[#041c14] border-r border-[#0f4330] flex flex-col justify-between select-none text-slate-100 z-20">
      {/* Top Header of Sidebar */}
      <div>
        <div className="p-4 border-b border-[#0f4330] bg-[#031710]">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-[#00e599] ring-4 ring-[#00e599]/20"></span>
            <span className="text-xs font-bold text-white tracking-wide">
              {activeGroup.label}
            </span>
            {activeGroup.tag && (
              <span className="text-[9px] bg-[#07291e] border border-[#00c07f]/50 text-[#00e599] px-1.5 py-0.2 rounded font-mono">
                {activeGroup.tag}
              </span>
            )}
          </div>
          <p className="text-[10px] text-[#00b074] font-mono mt-1 uppercase tracking-wider">
            LEVEL-3 SUB MENU
          </p>
        </div>

        {/* Level 3 Menu Items List */}
        <div className="p-3 space-y-1.5">
          <div className="px-2 py-1 text-[11px] font-semibold text-[#6ee7b7]/60 uppercase tracking-wider">
            功能页面列表
          </div>

          {items.map((item) => {
            const isItemActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onPageChange(item.id);
                  onNotice(`已切换至「${item.label}」`);
                }}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs transition-all flex items-center justify-between group ${
                  isItemActive
                    ? 'bg-[#00b074] text-white font-bold shadow-lg shadow-[#00b074]/30'
                    : 'text-[#d1fae5]/80 hover:text-white hover:bg-[#0c2f23] border border-transparent hover:border-[#164e3b]'
                }`}
              >
                <div className="flex items-center space-x-2.5 min-w-0">
                  <span
                    className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                      isItemActive ? 'bg-white' : 'bg-[#00b074] opacity-50 group-hover:opacity-100'
                    }`}
                  ></span>
                  <span className="truncate">{item.label}</span>
                </div>
                {isItemActive && (
                  <ChevronRight className="w-3.5 h-3.5 text-white/90 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer Info of Left Sidebar */}
      <div className="p-3.5 border-t border-[#0f4330] bg-[#031710] text-[11px] text-[#00b074]">
        <div className="flex items-center space-x-1.5 opacity-80">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#00e599]" />
          <span>{activeModule.label} / {activeGroup.label}</span>
        </div>
        <p className="text-[10px] text-[#6ee7b7]/40 mt-1 font-mono">
          STATUS: ONLINE (v2.6.9)
        </p>
      </div>
    </aside>
  );
};
