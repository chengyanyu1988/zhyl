import React from 'react';
import {
  Users,
  FileText,
  Mail,
  Disc,
  ClipboardList,
  RefreshCw,
  Star,
  Send,
  Settings,
} from 'lucide-react';
import { QUICK_ENTRANCES } from '../../data/mockData';
import { ActivePage } from '../../types';

interface QuickEntrancesProps {
  onNotice: (msg: string) => void;
  onNavigateToAppointment?: () => void;
  onNavigateToPage?: (page: ActivePage) => void;
}

export const QuickEntrances: React.FC<QuickEntrancesProps> = ({
  onNotice,
  onNavigateToAppointment,
  onNavigateToPage,
}) => {
  const getQuickIcon = (iconName: string) => {
    switch (iconName) {
      case 'Users':
        return <Users className="w-5 h-5" />;
      case 'FileText':
        return <FileText className="w-5 h-5" />;
      case 'Mail':
        return <Mail className="w-5 h-5" />;
      case 'Disc':
        return <Disc className="w-5 h-5" />;
      case 'ClipboardList':
        return <ClipboardList className="w-5 h-5" />;
      case 'RefreshCw':
        return <RefreshCw className="w-5 h-5" />;
      case 'Star':
        return <Star className="w-5 h-5" />;
      case 'Send':
        return <Send className="w-5 h-5" />;
      default:
        return <Disc className="w-5 h-5" />;
    }
  };

  const handleQuickEntranceClick = (itemTitle: string) => {
    const routeMap: Record<string, ActivePage> = {
      '用户列表': 'user_list',
      '全部用户': 'user_list',
      '报告管理': 'user_reports',
      '会话': 'msg_chat',
      '全部订单': 'trade_all_orders',
      '工单管理': 'service_work_orders',
      '审核管理': 'service_staff_audit',
      '售后管理': 'trade_after_sales',
      '动态管理': 'ops_life_dynamics',
    };

    if (routeMap[itemTitle] && onNavigateToPage) {
      onNotice(`正在跳转至【${itemTitle}】页面...`);
      onNavigateToPage(routeMap[itemTitle]);
      return;
    }

    if (itemTitle === '全部订单' || itemTitle === '工单管理') {
      if (onNavigateToAppointment) {
        onNotice(`进入【预约看板】查看${itemTitle}及详细排班`);
        onNavigateToAppointment();
        return;
      }
    }
    onNotice(`快捷入口：${itemTitle}（已汇总当前运营数据）`);
  };

  return (
    <div className="bg-white rounded-2xl p-4.5 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex items-center space-x-2 shrink-0">
        <span className="w-1.5 h-4 bg-emerald-500 rounded-full"></span>
        <h2 className="text-sm font-bold text-slate-800">快捷入口</h2>
        <span className="text-[10px] text-slate-400 font-normal">高频业务直达</span>
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-8 gap-2.5 flex-1 max-w-4xl">
        {QUICK_ENTRANCES.map((item) => (
          <button
            key={item.id}
            id={`quick-entrance-${item.id}`}
            onClick={() => handleQuickEntranceClick(item.title)}
            className="flex flex-col items-center group cursor-pointer p-1.5 rounded-xl hover:bg-slate-50 transition-all hover:-translate-y-0.5"
          >
            <div
              className={`w-10 h-10 rounded-xl ${item.bgColor} ${item.textColor} flex items-center justify-center mb-1.5 transition-shadow group-hover:shadow-xs`}
            >
              {getQuickIcon(item.iconName)}
            </div>
            <span className="text-xs text-slate-600 group-hover:text-emerald-600 transition-colors whitespace-nowrap font-medium">
              {item.title}
            </span>
          </button>
        ))}
      </div>

      <button
        onClick={() => onNotice('快捷入口配置：当前已展示常用养老管理模块')}
        className="text-slate-400 hover:text-slate-600 transition-colors shrink-0 p-1.5 rounded-lg hover:bg-slate-100 hidden lg:block"
        title="配置入口"
      >
        <Settings className="w-4 h-4" />
      </button>
    </div>
  );
};
