import React, { useState, useEffect } from 'react';
import {
  Home,
  User,
  Users2,
  HeartHandshake,
  Star,
  Wallet,
  Video,
  CreditCard,
  BarChart2,
  Hexagon,
  Radio,
} from 'lucide-react';
import { ActivePage, MainNavId } from '../types';

interface SidebarProps {
  activePage: ActivePage;
  onPageChange: (page: ActivePage) => void;
  onNotice: (msg: string) => void;
}

interface SubMenuItem {
  id: ActivePage;
  label: string;
}

interface SubMenuGroup {
  groupName?: string;
  items: SubMenuItem[];
}

interface SubMenuConfig {
  title: string;
  groups: SubMenuGroup[];
}

export const Sidebar: React.FC<SidebarProps> = ({
  activePage,
  onPageChange,
  onNotice,
}) => {
  const [activePrimary, setActivePrimary] = useState<MainNavId>('trade');

  // Sync activePrimary whenever activePage changes
  useEffect(() => {
    if (activePage === 'workbench' || activePage === 'appointment') {
      setActivePrimary('home');
    } else if (
      activePage === 'user_list' ||
      activePage === 'user_tags' ||
      activePage === 'user_reports' ||
      activePage === 'user_levels' ||
      activePage === 'msg_broadcast' ||
      activePage === 'msg_chat' ||
      activePage === 'market_coupons' ||
      activePage === 'market_points' ||
      activePage === 'market_growth' ||
      activePage === 'elderly_list' ||
      activePage === 'health_records'
    ) {
      setActivePrimary('users');
    } else if (
      activePage === 'staff_list' ||
      activePage === 'staff_schedule' ||
      activePage === 'service_staff_list' ||
      activePage === 'service_staff_tags' ||
      activePage === 'service_staff_audit' ||
      activePage === 'service_work_orders' ||
      activePage === 'service_commission' ||
      activePage === 'service_tips' ||
      activePage === 'service_order_settings'
    ) {
      setActivePrimary('staff');
    } else if (
      activePage.startsWith('product_')
    ) {
      setActivePrimary('product');
    } else if (activePage.startsWith('trade_')) {
      setActivePrimary('trade');
    } else if (activePage.startsWith('ops_')) {
      setActivePrimary('ops');
    } else if (activePage.startsWith('data_')) {
      setActivePrimary('data');
    } else if (activePage === 'service_orders' || activePage === 'care_plans') {
      setActivePrimary('care');
    } else if (activePage === 'video_monitor' || activePage === 'alarm_events') {
      setActivePrimary('monitoring');
    } else if (activePage === 'order_bills' || activePage === 'insurance_settlement') {
      setActivePrimary('finance');
    } else if (activePage === 'operation_stats' || activePage === 'elderly_portrait') {
      setActivePrimary('analytics');
    } else if (
      activePage.startsWith('sys_') ||
      activePage === 'org_settings' ||
      activePage === 'audit_logs'
    ) {
      setActivePrimary('system');
    }
  }, [activePage]);

  const primaryNavItems: { id: MainNavId; label: string; icon: any; defaultSub: ActivePage }[] = [
    { id: 'home', label: '首页', icon: Home, defaultSub: 'workbench' },
    { id: 'users', label: '用户', icon: User, defaultSub: 'user_list' },
    { id: 'staff', label: '服务', icon: HeartHandshake, defaultSub: 'service_staff_list' },
    { id: 'product', label: '商品', icon: Star, defaultSub: 'product_housekeeping_goods' },
    { id: 'monitoring', label: '视频监测', icon: Video, defaultSub: 'video_monitor' },
    { id: 'trade', label: '交易', icon: Wallet, defaultSub: 'trade_all_orders' },
    { id: 'ops', label: '运营', icon: Radio, defaultSub: 'ops_life_dynamics' },
    { id: 'data', label: '数据', icon: BarChart2, defaultSub: 'data_user_overview' },
    { id: 'system', label: '设置', icon: Hexagon, defaultSub: 'sys_staff' },
  ];

  // Secondary sub-menu configurations matching the user's screenshot
  const subMenuMap: Record<MainNavId, SubMenuConfig> = {
    home: {
      title: '首页',
      groups: [
        {
          items: [
            { id: 'workbench', label: '工作台' },
            { id: 'appointment', label: '预约看板' },
          ],
        },
      ],
    },
    users: {
      title: '用户',
      groups: [
        {
          groupName: '用户管理',
          items: [
            { id: 'user_list', label: '用户列表' },
            { id: 'user_tags', label: '标签管理' },
            { id: 'user_reports', label: '报告管理' },
            { id: 'user_levels', label: '等级管理' },
          ],
        },
        {
          groupName: '消息管理',
          items: [
            { id: 'msg_broadcast', label: '消息群发' },
            { id: 'msg_chat', label: '会话' },
          ],
        },
        {
          groupName: '营销管理',
          items: [
            { id: 'market_coupons', label: '优惠券管理' },
            { id: 'market_points', label: '积分规则' },
            { id: 'market_growth', label: '成长值规则' },
          ],
        },
      ],
    },
    staff: {
      title: '服务',
      groups: [
        {
          groupName: '服务人员管理',
          items: [
            { id: 'service_staff_list', label: '全部服务人员' },
            { id: 'service_staff_tags', label: '标签管理' },
            { id: 'service_staff_audit', label: '审核管理' },
          ],
        },
        {
          groupName: '服务管理',
          items: [
            { id: 'service_work_orders', label: '工单管理' },
            { id: 'service_commission', label: '佣金记录' },
            { id: 'service_tips', label: '打赏记录' },
            { id: 'service_order_settings', label: '工单设置' },
          ],
        },
      ],
    },
    product: {
      title: '商品',
      groups: [
        {
          groupName: '家政护理',
          items: [
            { id: 'product_housekeeping_goods', label: '商品管理' },
            { id: 'product_housekeeping_cats', label: '分类管理' },
          ],
        },
        {
          groupName: '康复理疗',
          items: [
            { id: 'product_rehab_goods', label: '商品管理' },
            { id: 'product_rehab_items', label: '服务项目管理' },
          ],
        },
        {
          groupName: '上门体检',
          items: [
            { id: 'product_checkup_goods', label: '商品管理' },
            { id: 'product_checkup_cats', label: '分类管理' },
          ],
        },
        {
          groupName: '商品设置',
          items: [
            { id: 'product_settings_params', label: '参数管理' },
            { id: 'product_settings_general', label: '通用设置' },
          ],
        },
      ],
    },
    trade: {
      title: '交易',
      groups: [
        {
          groupName: '订单管理',
          items: [
            { id: 'trade_all_orders', label: '全部订单' },
            { id: 'trade_after_sales', label: '售后管理' },
            { id: 'trade_reviews', label: '评价管理' },
          ],
        },
        {
          groupName: '财务管理',
          items: [
            { id: 'trade_withdrawals', label: '提现记录' },
            { id: 'trade_statements', label: '收支明细' },
          ],
        },
        {
          groupName: '交易设置',
          items: [
            { id: 'trade_refund_reasons', label: '退款原因' },
            { id: 'trade_general_settings', label: '通用设置' },
          ],
        },
      ],
    },
    ops: {
      title: '运营',
      groups: [
        {
          groupName: '生活圈管理',
          items: [
            { id: 'ops_life_dynamics', label: '动态管理' },
            { id: 'ops_life_topics', label: '话题管理' },
            { id: 'ops_life_banners', label: '轮播图管理' },
          ],
        },
        {
          groupName: '老年活动',
          items: [
            { id: 'ops_activity_list', label: '活动管理' },
            { id: 'ops_activity_registrations', label: '报名信息管理' },
            { id: 'ops_activity_fields', label: '字段管理' },
          ],
        },
        {
          groupName: '健康膳食',
          items: [
            { id: 'ops_diet_recipes', label: '食谱管理' },
            { id: 'ops_diet_tags', label: '标签管理' },
          ],
        },
        {
          groupName: '健康资讯',
          items: [
            { id: 'ops_news_list', label: '健康资讯管理' },
          ],
        },
        {
          groupName: '疾病宝典',
          items: [
            { id: 'ops_disease_list', label: '疾病管理' },
            { id: 'ops_disease_cats', label: '分类管理' },
          ],
        },
        {
          groupName: '养老机构',
          items: [
            { id: 'ops_institution_list', label: '机构列表' },
            { id: 'ops_institution_tags', label: '标签管理' },
          ],
        },
        {
          groupName: '健康讲堂',
          items: [
            { id: 'ops_lecture_videos', label: '视频列表' },
            { id: 'ops_lecture_tags', label: '标签管理' },
          ],
        },
        {
          groupName: '评论管理',
          items: [
            { id: 'ops_comments_all', label: '全部评论' },
          ],
        },
      ],
    },
    data: {
      title: '数据',
      groups: [
        {
          groupName: '用户分析',
          items: [
            { id: 'data_user_overview', label: '用户概况' },
            { id: 'data_user_age', label: '用户年龄分析' },
            { id: 'data_user_gender', label: '用户性别分析' },
            { id: 'data_user_social', label: '用户社交统计' },
          ],
        },
        {
          groupName: '交易分析',
          items: [
            { id: 'data_trade_overview', label: '交易概况' },
            { id: 'data_product_analysis', label: '商品分析' },
            { id: 'data_repurchase_analysis', label: '复购分析' },
          ],
        },
        {
          groupName: '服务分析',
          items: [
            { id: 'data_workorder_analysis', label: '工单分析' },
            { id: 'data_performance_stats', label: '业绩统计' },
            { id: 'data_review_stats', label: '评价统计' },
          ],
        },
      ],
    },
    care: {
      title: '关怀服务',
      groups: [
        {
          items: [
            { id: 'service_orders', label: '服务工单' },
            { id: 'care_plans', label: '关怀计划' },
          ],
        },
      ],
    },
    monitoring: {
      title: '视频监测',
      groups: [
        {
          items: [
            { id: 'video_monitor', label: '实时监控' },
            { id: 'alarm_events', label: '告警事件' },
          ],
        },
      ],
    },
    finance: {
      title: '消费结算',
      groups: [
        {
          items: [
            { id: 'order_bills', label: '订单流水' },
            { id: 'insurance_settlement', label: '医保对账' },
          ],
        },
      ],
    },
    analytics: {
      title: '报表统计',
      groups: [
        {
          items: [
            { id: 'operation_stats', label: '运营月报' },
            { id: 'elderly_portrait', label: '长者画像' },
          ],
        },
      ],
    },
    system: {
      title: '设置',
      groups: [
        {
          groupName: '系统设置',
          items: [
            { id: 'sys_staff', label: '员工管理' },
            { id: 'sys_roles', label: '角色管理' },
            { id: 'sys_drug_units', label: '药品单位管理' },
            { id: 'sys_protocols', label: '协议管理' },
            { id: 'sys_logs', label: '操作日志' },
            { id: 'sys_profile', label: '个人资料' },
            { id: 'sys_reset_pwd', label: '重置密码' },
          ],
        },
      ],
    },
  };

  const handlePrimaryClick = (item: (typeof primaryNavItems)[0]) => {
    setActivePrimary(item.id);
    onPageChange(item.defaultSub);
  };

  const currentConfig = subMenuMap[activePrimary] || subMenuMap.home;

  return (
    <div className="flex h-full select-none shrink-0">
      {/* Primary dark icon column */}
      <div className="w-16 bg-[#0c1527] flex flex-col items-center justify-between py-5 z-20">
        <div className="flex flex-col items-center w-full space-y-5">
          {/* Logo */}
          <div
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00d294] to-[#059669] flex items-center justify-center text-white shadow-md cursor-pointer mb-2"
            title="智慧养老服务平台"
            onClick={() => {
              setActivePrimary('home');
              onPageChange('workbench');
            }}
          >
            <HeartHandshake className="w-6 h-6" />
          </div>

          {/* Nav Icons */}
          <div className="flex flex-col space-y-3 w-full items-center">
            {primaryNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePrimary === item.id;

              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => handlePrimaryClick(item)}
                  title={item.label}
                  className={`relative w-11 h-11 rounded-lg flex items-center justify-center transition-all duration-150 ${
                    isActive
                      ? 'bg-[#10b981] text-white shadow-sm'
                      : 'text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-5 h-5 stroke-[1.8]" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom subtle indicator */}
        <div className="text-[10px] text-gray-500 font-mono">2026.09</div>
      </div>

      {/* Secondary white sub-menu matching screenshot */}
      <div className="w-48 bg-white border-r border-gray-200/70 flex flex-col py-4 z-10 overflow-y-auto">
        {/* Header matching screenshot */}
        <div className="px-5 pb-3">
          <h2 className="text-base font-bold text-gray-800 tracking-wide">
            {currentConfig.title}
          </h2>
        </div>

        {/* Groups */}
        <div className="flex flex-col space-y-4 px-3">
          {currentConfig.groups.map((group, gIdx) => (
            <div key={gIdx} className="space-y-1.5">
              {group.groupName && (
                <div className="text-xs font-bold text-gray-800 px-3 pt-1 pb-1">
                  {group.groupName}
                </div>
              )}
              <div className="space-y-1">
                {group.items.map((subItem) => {
                  const isSubActive =
                    activePage === subItem.id ||
                    (subItem.id === 'user_list' &&
                      (activePage === 'elderly_list' || activePage === 'health_records'));

                  return (
                    <button
                      key={subItem.id}
                      id={`subnav-${subItem.id}`}
                      onClick={() => {
                        onPageChange(subItem.id);
                        onNotice(`切换菜单: ${subItem.label}`);
                      }}
                      className={`w-full py-2 px-3 rounded-lg text-xs font-medium transition-all text-center flex items-center justify-center ${
                        isSubActive
                          ? 'bg-[#00d294] text-white shadow-xs font-semibold'
                          : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
                      }`}
                    >
                      {subItem.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
