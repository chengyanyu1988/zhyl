import React from 'react';
import {
  Home,
  LayoutDashboard,
  Calendar,
  Users,
  HeartHandshake,
  ShoppingBag,
  Receipt,
  Compass,
  BarChart3,
  Settings,
  Utensils,
  ClipboardList,
  MessageSquare,
  Sparkles,
  Layers,
  Heart,
  Activity,
  FileText,
  Tag,
  ShieldCheck,
  Award,
  Video,
  Building,
} from 'lucide-react';
import { ActivePage } from '../types';

export interface Level3Item {
  id: ActivePage;
  label: string;
  icon?: string;
}

export interface Level2Group {
  id: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  tag?: string;
  items: Level3Item[];
}

export interface Level1Module {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  isDirectLink?: boolean;
  directPage?: ActivePage;
  groups?: Level2Group[];
}

export const NAV_MODULES: Level1Module[] = [
  {
    id: 'home',
    label: '首页',
    icon: Home,
    groups: [
      {
        id: 'home_workbench',
        label: '工作台',
        icon: LayoutDashboard,
        items: [{ id: 'workbench', label: '工作台概览' }],
      },
      {
        id: 'home_appointment',
        label: '预约看板',
        icon: Calendar,
        items: [{ id: 'appointment', label: '预约排期看板' }],
      },
    ],
  },
  {
    id: 'users',
    label: '用户中心',
    icon: Users,
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
    icon: HeartHandshake,
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
        label: '工单管理',
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
    icon: ShoppingBag,
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
    icon: Receipt,
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
  {
    id: 'ops',
    label: '运营中心',
    icon: Compass,
    groups: [
      {
        id: 'ops_life',
        label: '生活圈',
        icon: Activity,
        items: [
          { id: 'ops_life_dynamics', label: '动态管理' },
          { id: 'ops_life_topics', label: '话题管理' },
          { id: 'ops_life_banners', label: '轮播图管理' },
        ],
      },
      {
        id: 'ops_activity',
        label: '老年活动',
        icon: Sparkles,
        items: [
          { id: 'ops_activity_list', label: '活动管理' },
          { id: 'ops_activity_registrations', label: '报名信息管理' },
          { id: 'ops_activity_fields', label: '字段管理' },
        ],
      },
      {
        id: 'ops_diet',
        label: '健康膳食',
        icon: Utensils,
        items: [
          { id: 'ops_diet_recipes', label: '食谱管理' },
          { id: 'ops_diet_tags', label: '标签管理' },
        ],
      },
      {
        id: 'ops_news',
        label: '健康资讯',
        icon: FileText,
        items: [{ id: 'ops_news_list', label: '资讯管理' }],
      },
      {
        id: 'ops_disease',
        label: '疾病宝典',
        icon: Heart,
        items: [
          { id: 'ops_disease_list', label: '疾病管理' },
          { id: 'ops_disease_cats', label: '分类管理' },
        ],
      },
      {
        id: 'ops_institution',
        label: '养老机构',
        icon: Building,
        items: [
          { id: 'ops_institution_list', label: '机构列表' },
          { id: 'ops_institution_tags', label: '标签管理' },
        ],
      },
      {
        id: 'ops_lecture',
        label: '健康讲堂',
        icon: Video,
        items: [
          { id: 'ops_lecture_videos', label: '视频列表' },
          { id: 'ops_lecture_tags', label: '标签管理' },
        ],
      },
      {
        id: 'ops_comments',
        label: '评论管理',
        icon: MessageSquare,
        items: [{ id: 'ops_comments_all', label: '全部评论' }],
      },
      {
        id: 'ops_food',
        label: '食物管理',
        icon: Utensils,
        tag: 'HOT',
        items: [
          { id: 'ops_food_list', label: '食物列表' },
          { id: 'ops_food_cats', label: '分类管理' },
        ],
      },
      {
        id: 'ops_assessment',
        label: '测评管理',
        icon: ClipboardList,
        tag: 'NEW',
        items: [{ id: 'ops_assessment_list', label: '测评列表' }],
      },
    ],
  },
  {
    id: 'data',
    label: '数据分析',
    icon: BarChart3,
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
  {
    id: 'system',
    label: '系统配置',
    icon: Settings,
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
];

export function findHierarchyByPage(page: ActivePage) {
  const pageAliases: Partial<Record<string, ActivePage>> = {
    sys_staff_form: 'sys_staff',
    sys_role_form: 'sys_roles',
    trade_order_detail: 'trade_all_orders',
    staff_list: 'service_staff_list',
    staff_schedule: 'service_staff_list',
    elderly_list: 'user_list',
    health_records: 'user_list',
  };

  const lookupPage = pageAliases[page] || page;

  for (const mod of NAV_MODULES) {
    if (mod.isDirectLink && mod.directPage === lookupPage) {
      return { module: mod, group: null, item: null };
    }
    if (mod.groups) {
      for (const grp of mod.groups) {
        const item = grp.items.find((i) => i.id === lookupPage);
        if (item) {
          return { module: mod, group: grp, item };
        }
      }
    }
  }

  // Safe fallback to first module that has groups and items
  for (const mod of NAV_MODULES) {
    if (mod.groups && mod.groups.length > 0 && mod.groups[0].items.length > 0) {
      return { module: mod, group: mod.groups[0], item: mod.groups[0].items[0] };
    }
  }

  return { module: NAV_MODULES[0], group: null, item: null };
}
