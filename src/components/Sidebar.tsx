import React, { useState, useEffect, useMemo } from 'react';
import {
  ChevronDown,
  ChevronRight,
  Search,
  HeartHandshake,
  LayoutDashboard,
  Users,
  ShoppingBag,
  Receipt,
  Compass,
  BarChart3,
  Settings,
  Calendar,
  PanelLeftClose,
  PanelLeft,
  X,
  Sparkles,
  Layers,
  ArrowUpRight,
} from 'lucide-react';
import { ActivePage } from '../types';

interface SidebarProps {
  activePage: ActivePage;
  onPageChange: (page: ActivePage) => void;
  onNotice: (msg: string) => void;
}

interface Level3Item {
  id: ActivePage;
  label: string;
}

interface Level2Group {
  id: string;
  label: string;
  defaultSub?: ActivePage;
  items?: Level3Item[];
}

interface Level1Module {
  id: string;
  label: string;
  domain: 'core' | 'ops' | 'system';
  domainLabel: string;
  icon: React.ComponentType<{ className?: string }>;
  iconBg: string;
  iconColor: string;
  groups: Level2Group[];
}

export const Sidebar: React.FC<SidebarProps> = ({
  activePage,
  onPageChange,
  onNotice,
}) => {
  // Sidebar collapsed state (true: 68px icon bar, false: 245px modern workspace panel)
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Search keyword for filtering navigation items
  const [searchTerm, setSearchTerm] = useState('');

  // Expanded state for Level 1 modules
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({});

  // Expanded state for Level 2 groups
  const [expandedL2, setExpandedL2] = useState<Record<string, boolean>>({});

  // Full Menu Hierarchy (Categorized into Business Domains, Single-Column Modern Cards)
  const modules: Level1Module[] = useMemo(
    () => [
      // Core Business
      {
        id: 'users',
        label: '用户中心',
        domain: 'core',
        domainLabel: '核心业务',
        icon: Users,
        iconBg: 'bg-emerald-500/15 text-[#00d294]',
        iconColor: 'text-[#00d294]',
        groups: [
          {
            id: 'user_mgmt',
            label: '用户管理',
            items: [
              { id: 'user_list', label: '用户列表' },
              { id: 'user_tags', label: '标签管理' },
              { id: 'user_reports', label: '报告管理' },
              { id: 'user_levels', label: '等级管理' },
            ],
          },
          {
            id: 'msg_mgmt',
            label: '消息管理',
            items: [
              { id: 'msg_broadcast', label: '消息群发' },
              { id: 'msg_chat', label: '会话管理' },
            ],
          },
          {
            id: 'market_mgmt',
            label: '营销管理',
            items: [
              { id: 'market_coupons', label: '优惠券管理' },
              { id: 'market_points', label: '积分规则' },
              { id: 'market_growth', label: '成长值规则' },
            ],
          },
        ],
      },
      {
        id: 'staff',
        label: '服务人员',
        domain: 'core',
        domainLabel: '核心业务',
        icon: HeartHandshake,
        iconBg: 'bg-teal-500/15 text-teal-600 dark:text-teal-400',
        iconColor: 'text-teal-600 dark:text-teal-400',
        groups: [
          {
            id: 'staff_mgmt',
            label: '服务人员管理',
            items: [
              { id: 'service_staff_list', label: '全部服务人员' },
              { id: 'service_staff_tags', label: '标签管理' },
              { id: 'service_staff_audit', label: '审核管理' },
            ],
          },
          {
            id: 'service_order_mgmt',
            label: '服务工单管理',
            items: [
              { id: 'service_work_orders', label: '工单管理' },
              { id: 'service_commission', label: '佣金记录' },
              { id: 'service_tips', label: '打赏记录' },
              { id: 'service_order_settings', label: '工单设置' },
            ],
          },
        ],
      },
      {
        id: 'product',
        label: '商品服务',
        domain: 'core',
        domainLabel: '核心业务',
        icon: ShoppingBag,
        iconBg: 'bg-amber-500/15 text-amber-600 dark:text-amber-400',
        iconColor: 'text-amber-600 dark:text-amber-400',
        groups: [
          {
            id: 'prod_housekeeping',
            label: '家政护理',
            items: [
              { id: 'product_housekeeping_goods', label: '商品管理' },
              { id: 'product_housekeeping_cats', label: '分类管理' },
            ],
          },
          {
            id: 'prod_rehab',
            label: '康复理疗',
            items: [
              { id: 'product_rehab_goods', label: '商品管理' },
              { id: 'product_rehab_items', label: '服务项目管理' },
            ],
          },
          {
            id: 'prod_checkup',
            label: '上门体检',
            items: [
              { id: 'product_checkup_goods', label: '商品管理' },
              { id: 'product_checkup_cats', label: '分类管理' },
            ],
          },
          {
            id: 'prod_settings',
            label: '商品设置',
            items: [
              { id: 'product_settings_params', label: '参数管理' },
              { id: 'product_settings_general', label: '通用设置' },
            ],
          },
        ],
      },
      {
        id: 'trade',
        label: '交易订单',
        domain: 'core',
        domainLabel: '核心业务',
        icon: Receipt,
        iconBg: 'bg-rose-500/15 text-rose-600 dark:text-rose-400',
        iconColor: 'text-rose-600 dark:text-rose-400',
        groups: [
          {
            id: 'trade_orders',
            label: '订单管理',
            items: [
              { id: 'trade_all_orders', label: '全部订单' },
              { id: 'trade_after_sales', label: '售后管理' },
              { id: 'trade_reviews', label: '评价管理' },
            ],
          },
          {
            id: 'trade_finance',
            label: '财务管理',
            items: [
              { id: 'trade_withdrawals', label: '提现记录' },
              { id: 'trade_statements', label: '收支明细' },
            ],
          },
          {
            id: 'trade_settings',
            label: '交易设置',
            items: [
              { id: 'trade_refund_reasons', label: '退款原因' },
              { id: 'trade_general_settings', label: '通用设置' },
            ],
          },
        ],
      },

      // Operations & Intelligence
      {
        id: 'ops',
        label: '运营中心',
        domain: 'ops',
        domainLabel: '运营与智能',
        icon: Compass,
        iconBg: 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400',
        iconColor: 'text-indigo-600 dark:text-indigo-400',
        groups: [
          {
            id: 'ops_life',
            label: '生活圈管理',
            items: [
              { id: 'ops_life_dynamics', label: '动态管理' },
              { id: 'ops_life_topics', label: '话题管理' },
              { id: 'ops_life_banners', label: '轮播图管理' },
            ],
          },
          {
            id: 'ops_activity',
            label: '老年活动',
            items: [
              { id: 'ops_activity_list', label: '活动管理' },
              { id: 'ops_activity_registrations', label: '报名信息管理' },
              { id: 'ops_activity_fields', label: '字段管理' },
            ],
          },
          {
            id: 'ops_diet',
            label: '健康膳食',
            items: [
              { id: 'ops_diet_recipes', label: '食谱管理' },
              { id: 'ops_diet_tags', label: '标签管理' },
            ],
          },
          {
            id: 'ops_news',
            label: '健康资讯',
            items: [{ id: 'ops_news_list', label: '健康资讯管理' }],
          },
          {
            id: 'ops_disease',
            label: '疾病宝典',
            items: [
              { id: 'ops_disease_list', label: '疾病管理' },
              { id: 'ops_disease_cats', label: '分类管理' },
            ],
          },
          {
            id: 'ops_institution',
            label: '养老机构',
            items: [
              { id: 'ops_institution_list', label: '机构列表' },
              { id: 'ops_institution_tags', label: '标签管理' },
            ],
          },
          {
            id: 'ops_lecture',
            label: '健康讲堂',
            items: [
              { id: 'ops_lecture_videos', label: '视频列表' },
              { id: 'ops_lecture_tags', label: '标签管理' },
            ],
          },
          {
            id: 'ops_comments',
            label: '评论管理',
            items: [{ id: 'ops_comments_all', label: '全部评论' }],
          },
          {
            id: 'ops_food',
            label: '食物管理',
            items: [
              { id: 'ops_food_list', label: '食物列表' },
              { id: 'ops_food_cats', label: '分类管理' },
            ],
          },
          {
            id: 'ops_assessment',
            label: '测评管理',
            items: [
              { id: 'ops_assessment_list', label: '测评列表' },
            ],
          },
        ],
      },
      {
        id: 'data',
        label: '数据分析',
        domain: 'ops',
        domainLabel: '运营与智能',
        icon: BarChart3,
        iconBg: 'bg-violet-500/15 text-violet-600 dark:text-violet-400',
        iconColor: 'text-violet-600 dark:text-violet-400',
        groups: [
          {
            id: 'data_user',
            label: '用户分析',
            items: [
              { id: 'data_user_overview', label: '用户概况' },
              { id: 'data_user_age', label: '用户年龄分析' },
              { id: 'data_user_gender', label: '用户性别分析' },
              { id: 'data_user_social', label: '用户社交统计' },
            ],
          },
          {
            id: 'data_trade',
            label: '交易分析',
            items: [
              { id: 'data_trade_overview', label: '交易概况' },
              { id: 'data_product_analysis', label: '商品分析' },
              { id: 'data_repurchase_analysis', label: '复购分析' },
            ],
          },
          {
            id: 'data_service',
            label: '服务分析',
            items: [
              { id: 'data_workorder_analysis', label: '工单分析' },
              { id: 'data_performance_stats', label: '业绩统计' },
              { id: 'data_review_stats', label: '评价统计' },
            ],
          },
        ],
      },

      // System Administration
      {
        id: 'system',
        label: '系统配置',
        domain: 'system',
        domainLabel: '系统管理',
        icon: Settings,
        iconBg: 'bg-slate-500/15 text-slate-600 dark:text-slate-400',
        iconColor: 'text-slate-600 dark:text-slate-400',
        groups: [
          {
            id: 'sys_main',
            label: '系统设置',
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
    ],
    []
  );

  // Auto-expand module containing active page
  useEffect(() => {
    let matchedModuleId: string | null = null;
    let matchedL2Id: string | null = null;

    modules.forEach((mod) => {
      mod.groups.forEach((g) => {
        if (g.defaultSub === activePage) {
          matchedModuleId = mod.id;
          matchedL2Id = g.id;
        }
        if (g.items) {
          g.items.forEach((item) => {
            if (
              item.id === activePage ||
              (item.id === 'user_list' && (activePage === 'elderly_list' || activePage === 'health_records')) ||
              (item.id === 'service_staff_list' && (activePage === 'staff_list' || activePage === 'staff_schedule'))
            ) {
              matchedModuleId = mod.id;
              matchedL2Id = g.id;
            }
          });
        }
      });
    });

    if (matchedModuleId) {
      setExpandedModules((prev) => ({ ...prev, [matchedModuleId!]: true }));
    }
    if (matchedL2Id) {
      setExpandedL2((prev) => ({ ...prev, [matchedL2Id!]: true }));
    }
  }, [activePage, modules]);

  // Check if item is active
  const isItemActive = (itemId: ActivePage) => {
    if (activePage === itemId) return true;
    if (itemId === 'user_list' && (activePage === 'elderly_list' || activePage === 'health_records')) return true;
    if (itemId === 'service_staff_list' && (activePage === 'staff_list' || activePage === 'staff_schedule')) return true;
    return false;
  };

  // Check if module contains active page
  const isModuleActive = (mod: Level1Module) => {
    return mod.groups.some(
      (g) =>
        g.defaultSub === activePage ||
        g.items?.some((item) => isItemActive(item.id))
    );
  };

  const toggleModule = (modId: string) => {
    setExpandedModules((prev) => ({ ...prev, [modId]: !prev[modId] }));
  };

  const toggleL2 = (l2Id: string) => {
    setExpandedL2((prev) => ({ ...prev, [l2Id]: !prev[l2Id] }));
  };

  // Group modules by domain
  const domainGroups = useMemo(() => {
    const map: Record<string, Level1Module[]> = {};
    modules.forEach((mod) => {
      if (!map[mod.domainLabel]) {
        map[mod.domainLabel] = [];
      }
      map[mod.domainLabel].push(mod);
    });
    return map;
  }, [modules]);

  return (
    <aside
      className={`theme-sidebar border-r flex flex-col h-full select-none shrink-0 z-20 transition-all duration-300 ${
        isCollapsed ? 'w-[68px]' : 'w-[242px]'
      }`}
    >
      {/* 1. Brand Header */}
      <div className="px-3.5 py-3 border-b border-slate-200/60 flex items-center justify-between">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#00d294] to-[#059669] flex items-center justify-center text-white shadow-sm shrink-0">
            <HeartHandshake className="w-5 h-5" />
          </div>
          {!isCollapsed && (
            <div className="min-w-0">
              <h1 className="text-xs font-bold tracking-tight text-slate-900 truncate">
                智慧养老服务平台
              </h1>
              <p className="text-[10px] text-slate-400 font-medium truncate">综合运营中台</p>
            </div>
          )}
        </div>

        {/* Collapse / Expand Toggle Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          title={isCollapsed ? '展开导航' : '收起导航'}
          className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 transition-colors shrink-0"
        >
          {isCollapsed ? (
            <PanelLeft className="w-4 h-4 text-[#00d294]" />
          ) : (
            <PanelLeftClose className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* 2. Top Dedicated Dashboards Capsule (工作台 & 预约看板 - 常驻核心功能) */}
      {!isCollapsed ? (
        <div className="p-2.5 pb-1">
          <div className="grid grid-cols-2 p-1 bg-slate-200/60 dark:bg-slate-800/60 rounded-xl gap-1">
            <button
              onClick={() => {
                onPageChange('workbench');
                onNotice('已切换至: 首页工作台');
              }}
              className={`py-1.5 px-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all duration-200 ${
                activePage === 'workbench'
                  ? 'bg-white dark:bg-slate-700 text-[#00d294] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>工作台</span>
            </button>

            <button
              onClick={() => {
                onPageChange('appointment');
                onNotice('已切换至: 预约服务看板');
              }}
              className={`py-1.5 px-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all duration-200 ${
                activePage === 'appointment'
                  ? 'bg-white dark:bg-slate-700 text-sky-600 dark:text-sky-400 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>预约看板</span>
            </button>
          </div>
        </div>
      ) : (
        // Collapsed mode quick icons
        <div className="py-2 px-2 flex flex-col items-center gap-1 border-b border-slate-200/60">
          <button
            onClick={() => onPageChange('workbench')}
            title="工作台"
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
              activePage === 'workbench'
                ? 'bg-emerald-500/15 text-[#00d294] ring-2 ring-[#00d294]/30'
                : 'text-slate-500 hover:bg-slate-200/50'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
          </button>
          <button
            onClick={() => onPageChange('appointment')}
            title="预约看板"
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
              activePage === 'appointment'
                ? 'bg-sky-500/15 text-sky-600 ring-2 ring-sky-500/30'
                : 'text-slate-500 hover:bg-slate-200/50'
            }`}
          >
            <Calendar className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 3. Search Filter */}
      {!isCollapsed && (
        <div className="px-2.5 py-1.5">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="搜索菜单功能..."
              className="w-full pl-8 pr-6 py-1 text-xs theme-input border border-slate-200/80 rounded-lg focus:border-[#00d294] focus:outline-none transition-all placeholder:text-slate-400"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* 4. Navigation Menu List */}
      <div className="flex-1 overflow-y-auto px-2 py-1.5 space-y-3 scrollbar-thin scrollbar-thumb-slate-200">
        {Object.entries(domainGroups).map(([domainName, domainMods]) => {
          // If searching, check if any mod has matches
          const domainHasMatches = domainMods.some((mod) => {
            if (!searchTerm) return true;
            if (mod.label.includes(searchTerm)) return true;
            return mod.groups.some(
              (g) =>
                g.label.includes(searchTerm) ||
                g.items?.some((i) => i.label.includes(searchTerm))
            );
          });

          if (!domainHasMatches) return null;

          return (
            <div key={domainName} className="space-y-1">
              {/* Domain Label */}
              {!isCollapsed && (
                <div className="px-2 py-0.5 text-[10px] font-bold text-slate-400 tracking-wider uppercase flex items-center justify-between">
                  <span>{domainName}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
                </div>
              )}

              {/* Module Cards */}
              <div className="space-y-1">
                {domainMods.map((mod) => {
                  const IconComp = mod.icon;
                  const isExpanded = searchTerm ? true : expandedModules[mod.id] ?? false;
                  const activeInMod = isModuleActive(mod);

                  // Filter groups and items
                  const filteredGroups = mod.groups
                    .map((g) => ({
                      ...g,
                      items: g.items?.filter((item) =>
                        searchTerm ? item.label.includes(searchTerm) : true
                      ),
                    }))
                    .filter((g) =>
                      searchTerm
                        ? (g.items && g.items.length > 0) || g.label.includes(searchTerm)
                        : true
                    );

                  if (searchTerm && filteredGroups.length === 0 && !mod.label.includes(searchTerm)) {
                    return null;
                  }

                  // Collapsed mode item
                  if (isCollapsed) {
                    return (
                      <button
                        key={mod.id}
                        title={mod.label}
                        onClick={() => {
                          setIsCollapsed(false);
                          setExpandedModules((prev) => ({ ...prev, [mod.id]: true }));
                        }}
                        className={`w-full py-2.5 flex items-center justify-center rounded-xl transition-all relative ${
                          activeInMod
                            ? 'bg-emerald-500/15 text-[#00d294]'
                            : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/50'
                        }`}
                      >
                        <IconComp className="w-5 h-5" />
                        {activeInMod && (
                          <span className="absolute right-1 top-2 w-1.5 h-1.5 rounded-full bg-[#00d294]" />
                        )}
                      </button>
                    );
                  }

                  // Expanded Card Mode
                  return (
                    <div
                      key={mod.id}
                      className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                        activeInMod
                          ? 'border-[#00d294]/30 bg-emerald-500/[0.03]'
                          : 'border-slate-200/60 bg-transparent hover:border-slate-300/80'
                      }`}
                    >
                      {/* Module Header Button */}
                      <button
                        onClick={() => toggleModule(mod.id)}
                        className="w-full px-2.5 py-2 flex items-center justify-between text-xs font-bold text-slate-800 rounded-xl transition-colors hover:bg-slate-200/30"
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${mod.iconBg}`}
                          >
                            <IconComp className="w-3.5 h-3.5" />
                          </div>
                          <span className="tracking-tight">{mod.label}</span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          {activeInMod && (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#00d294]" />
                          )}
                          <span className="text-slate-400 transition-transform duration-150">
                            {isExpanded ? (
                              <ChevronDown className="w-3.5 h-3.5" />
                            ) : (
                              <ChevronRight className="w-3.5 h-3.5" />
                            )}
                          </span>
                        </div>
                      </button>

                      {/* Sub-groups and Items Container */}
                      {isExpanded && (
                        <div className="px-2 pt-1 pb-2 space-y-1.5 border-t border-slate-200/50">
                          {filteredGroups.map((g2) => {
                            const isL2Expanded = expandedL2[g2.id] ?? true;
                            const hasItems = g2.items && g2.items.length > 0;
                            const isL2Active =
                              g2.defaultSub === activePage ||
                              g2.items?.some((i) => isItemActive(i.id));

                            return (
                              <div key={g2.id} className="space-y-0.5">
                                {/* Level 2 Header */}
                                {hasItems ? (
                                  <div
                                    onClick={() => toggleL2(g2.id)}
                                    className="px-2 py-1 text-[11px] font-semibold text-slate-500 hover:text-slate-800 flex items-center justify-between cursor-pointer rounded-md hover:bg-slate-200/30"
                                  >
                                    <div className="flex items-center gap-1.5">
                                      <span
                                        className={`w-1 h-2 rounded-full ${
                                          isL2Active ? 'bg-[#00d294]' : 'bg-slate-300'
                                        }`}
                                      />
                                      <span>{g2.label}</span>
                                    </div>
                                    <span className="text-slate-400 text-[10px]">
                                      {isL2Expanded ? (
                                        <ChevronDown className="w-3 h-3" />
                                      ) : (
                                        <ChevronRight className="w-3 h-3" />
                                      )}
                                    </span>
                                  </div>
                                ) : g2.defaultSub ? (
                                  <button
                                    onClick={() => {
                                      onPageChange(g2.defaultSub!);
                                      onNotice(`切换菜单: ${g2.label}`);
                                    }}
                                    className={`w-full px-2 py-1 text-xs font-semibold rounded-lg flex items-center justify-between transition-colors ${
                                      g2.defaultSub === activePage
                                        ? 'bg-emerald-500/15 text-[#00d294]'
                                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/30'
                                    }`}
                                  >
                                    <span>{g2.label}</span>
                                  </button>
                                ) : null}

                                {/* Level 3 Item Pills */}
                                {hasItems && isL2Expanded && (
                                  <div className="space-y-0.5 pl-2.5 border-l-2 border-slate-200/60 ml-2 my-0.5">
                                    {g2.items!.map((item) => {
                                      const active = isItemActive(item.id);

                                      return (
                                        <button
                                          key={item.id}
                                          id={`menu-item-${item.id}`}
                                          onClick={() => {
                                            onPageChange(item.id);
                                            onNotice(`已切换至: ${item.label}`);
                                          }}
                                          className={`w-full px-2.5 py-1 text-xs rounded-lg transition-all flex items-center justify-between group ${
                                            active
                                              ? 'bg-emerald-500/15 text-[#00d294] font-bold shadow-xs'
                                              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/40 font-medium'
                                          }`}
                                        >
                                          <div className="flex items-center gap-1.5 truncate">
                                            <span
                                              className={`w-1.5 h-1.5 rounded-full transition-all shrink-0 ${
                                                active
                                                  ? 'bg-[#00d294] ring-2 ring-emerald-500/30'
                                                  : 'bg-slate-300 group-hover:bg-slate-400'
                                              }`}
                                            />
                                            <span className="truncate">{item.label}</span>
                                          </div>

                                          {active && (
                                            <ArrowUpRight className="w-3 h-3 text-[#00d294] shrink-0" />
                                          )}
                                        </button>
                                      );
                                    })}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* 5. Clean Footer */}
      {!isCollapsed && (
        <div className="px-3.5 py-2.5 border-t border-slate-200/60 flex items-center justify-between text-[10px] text-slate-400">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-[#00d294]" />
            <span>智能服务终端</span>
          </div>
          <span className="font-mono text-slate-400">v3.0 Pro</span>
        </div>
      )}
    </aside>
  );
};
