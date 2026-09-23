import React, { useState } from 'react';
import {
  Tag,
  FileText,
  Award,
  Send,
  MessageSquare,
  Ticket,
  Coins,
  TrendingUp,
  Search,
  Plus,
  ArrowUpDown,
  CheckCircle2,
  AlertCircle,
  Calendar,
} from 'lucide-react';
import { SubPageId, AppUser } from '../types';
import { UserListView } from './UserListView';
import { UserDetailView } from './UserDetailView';
import { TagManagement } from './TagManagement';
import { ReportManagement } from './ReportManagement';
import { LevelManagement } from './LevelManagement';
import { MessageBroadcast } from './MessageBroadcast';
import { MessageChat } from './MessageChat';
import { CouponManagement } from './CouponManagement';
import { PointsRuleManagement } from './PointsRuleManagement';
import { GrowthRuleManagement } from './GrowthRuleManagement';
import { MOCK_APP_USERS } from '../data/userData';

interface UserManagementProps {
  onNotice: (msg: string) => void;
  subPage: SubPageId;
}

export const UserManagement: React.FC<UserManagementProps> = ({
  onNotice,
  subPage,
}) => {
  const [selectedDetailUser, setSelectedDetailUser] = useState<AppUser | null>(null);

  // If user is viewing user_list or elderly_list, show UserListView or UserDetailView
  if (subPage === 'user_list' || subPage === 'elderly_list' || !subPage) {
    if (selectedDetailUser) {
      return (
        <UserDetailView
          user={selectedDetailUser}
          onBack={() => setSelectedDetailUser(null)}
          onUpdateUser={(updated) => {
            setSelectedDetailUser(updated);
            onNotice(`已更新【${updated.name}】健康档案数据`);
          }}
          onNotice={onNotice}
        />
      );
    }

    return (
      <UserListView
        onSelectUser={(user) => {
          setSelectedDetailUser(user);
          onNotice(`查看【${user.name}】用户详情档案`);
        }}
        onNotice={onNotice}
      />
    );
  }

  // 标签管理 (Tag Management - Matches Screenshots 1 & 2)
  if (subPage === 'user_tags') {
    return <TagManagement onNotice={onNotice} />;
  }

  // 报告管理 (Report Management - Matches Screenshots 3 & 4)
  if (subPage === 'user_reports' || subPage === 'health_records') {
    return <ReportManagement onNotice={onNotice} />;
  }

  // 等级管理 (Level Management - Matches Screenshots 5 & 6)
  if (subPage === 'user_levels') {
    return <LevelManagement onNotice={onNotice} />;
  }

  // 消息群发 (Message Broadcast - Matches Screenshots 1 & 2)
  if (subPage === 'msg_broadcast') {
    return <MessageBroadcast onNotice={onNotice} />;
  }

  // 会话 (Message Chat - Matches Screenshots 3 & 4)
  if (subPage === 'msg_chat') {
    return <MessageChat onNotice={onNotice} />;
  }

  // 营销管理: 优惠券管理 (Matches Screenshots 1, 2, 3, 4)
  if (subPage === 'market_coupons') {
    return <CouponManagement onNotice={onNotice} />;
  }

  // 营销管理: 积分规则 (Matches Screenshot 5)
  if (subPage === 'market_points') {
    return <PointsRuleManagement onNotice={onNotice} />;
  }

  // 营销管理: 成长值规则 (Matches Screenshot 6)
  if (subPage === 'market_growth') {
    return <GrowthRuleManagement onNotice={onNotice} />;
  }

  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-5 text-xs">
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] min-h-[500px]">
        <div className="flex items-center space-x-3 pb-5 border-b border-gray-100">
          <span className="w-1.5 h-4 bg-[#10b981] rounded-full"></span>
          <h1 className="text-base font-semibold text-gray-800">用户与营销管理</h1>
        </div>

        <div className="py-10 text-center text-gray-500 space-y-3">
          <CheckCircle2 className="w-10 h-10 mx-auto text-emerald-500" />
          <div className="text-sm font-semibold text-gray-800">
            功能模块已就绪并载入2026年9月运营规则
          </div>
          <p className="max-w-md mx-auto text-gray-400 leading-relaxed text-xs">
            当前系统已接入长护险定点补贴清算、健康随访打卡增值及适老化智能推送，所有记录严格遵照2026年9月的时间降序归档。
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNotice('已成功触发当前模块配置更新')}
              className="px-5 py-2 bg-[#10b981] hover:bg-[#059669] text-white rounded-lg font-medium transition-colors"
            >
              配置生效
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
