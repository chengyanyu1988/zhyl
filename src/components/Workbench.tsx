import React, { useState } from 'react';
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
  UserPlus,
  ShoppingBag,
  Activity,
  TrendingUp,
  TrendingDown,
  PieChart as PieIcon,
  BarChart2,
  BarChart3,
  LineChart,
  Layers,
  Compass,
  Tag as TagIcon,
  LayoutGrid,
  Trophy,
  Crown,
  Medal,
  Award,
  Sparkles,
  CheckCircle2,
  Grid,
  List,
  Columns,
  Maximize2,
  ArrowUpRight,
  ChevronRight,
  SlidersHorizontal,
  Palette,
} from 'lucide-react';
import {
  KPI_STATS,
  QUICK_ENTRANCES,
  USER_TAGS,
  SERVICE_RATIOS,
  USER_TREND_DATA,
  TOP_PRODUCTS,
  TOP_STAFF,
} from '../data/mockData';
import {
  UserTrendSection,
  QuickEntranceSection,
  ServiceRatioSection,
  UserTagSection,
  ProductRankSection,
  StaffRankSection,
} from './workbench/WorkbenchSections';

import { ActivePage } from '../types';

interface WorkbenchProps {
  onNotice: (msg: string) => void;
  onNavigateToAppointment?: () => void;
  onNavigateToPage?: (page: ActivePage) => void;
}

export const Workbench: React.FC<WorkbenchProps> = ({
  onNotice,
  onNavigateToAppointment,
  onNavigateToPage,
}) => {
  // Layout arrangement preset: 'balanced' (standard split 8:4 / 6:6 / 6:6) vs 'panorama' (full width focus)
  const [layoutPreset, setLayoutPreset] = useState<'balanced' | 'panorama'>('balanced');
  const [quickEntranceView, setQuickEntranceView] = useState<'grid' | 'list'>('grid');
  // Background tone preset matching the overall deep green header tone
  const [bgTone, setBgTone] = useState<'emerald' | 'sage' | 'cyan' | 'slate'>('emerald');

  const bgToneClasses: Record<string, string> = {
    emerald: 'bg-gradient-to-b from-[#e8f5ee] via-[#f1f7f4] to-[#f5f9f7]',
    sage: 'bg-gradient-to-b from-[#e2efe8] via-[#ecf5f0] to-[#f4f8f6]',
    cyan: 'bg-gradient-to-b from-[#e4f3f2] via-[#eef7f6] to-[#f5faf9]',
    slate: 'bg-gradient-to-b from-[#ecf2ef] via-[#f3f6f5] to-[#f8faf9]',
  };

  // Tooltip date for the user trend chart; default to 2026-10-12 (which shows 1520 in screenshot) or hovered index
  const [hoveredPointIndex, setHoveredPointIndex] = useState<number>(3);
  const [trendChartMode, setTrendChartMode] = useState<'column' | 'area' | 'step'>('column');
  const [hoveredRatioIdx, setHoveredRatioIdx] = useState<number | null>(null);
  const [ratioChartMode, setRatioChartMode] = useState<'ring' | 'bar'>('ring');
  const [userTagChartMode, setUserTagChartMode] = useState<'radar' | 'grid'>('radar');
  const [hoveredTagIdx, setHoveredTagIdx] = useState<number | null>(null);
  const [productRankMode, setProductRankMode] = useState<'leaderboard' | 'card'>('leaderboard');
  const [staffRankMode, setStaffRankMode] = useState<'leaderboard' | 'card'>('leaderboard');

  // Icon map for Quick Entrance items
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
      '全部用户': 'user_list',
      '用户列表': 'user_list',
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
    onNotice(`快捷入口：${itemTitle}（已汇总2026年10月数据）`);
  };

  // Coordinates for the trend chart
  const chartWidth = 960;
  const chartHeight = 220;
  const paddingX = 60;
  const paddingTop = 25;
  const paddingBottom = 40;
  const plotWidth = chartWidth - paddingX * 2;
  const plotHeight = chartHeight - paddingTop - paddingBottom;

  const minY = 1500;
  const maxY = 3500;

  const points = USER_TREND_DATA.map((d, index) => {
    const x = paddingX + (index / (USER_TREND_DATA.length - 1)) * plotWidth;
    const normalizedY = (d.value - minY) / (maxY - minY);
    const y = paddingTop + (1 - normalizedY) * plotHeight;
    return { ...d, x, y };
  });

  // Build SVG path with smooth cubic beziers
  const generateSmoothPath = (pts: { x: number; y: number }[]) => {
    if (pts.length === 0) return '';
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = i > 0 ? pts[i - 1] : pts[i];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = i < pts.length - 2 ? pts[i + 2] : p2;

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }
    return d;
  };

  const linePath = generateSmoothPath(points);
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${
    paddingTop + plotHeight
  } L ${points[0].x} ${paddingTop + plotHeight} Z`;

  // Step path generator for Step Chart mode
  const generateStepPath = (pts: { x: number; y: number }[]) => {
    if (pts.length === 0) return '';
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const nextX = pts[i + 1].x;
      const nextY = pts[i + 1].y;
      d += ` H ${nextX} V ${nextY}`;
    }
    return d;
  };

  const stepLinePath = generateStepPath(points);
  const stepAreaPath = `${stepLinePath} L ${points[points.length - 1].x} ${
    paddingTop + plotHeight
  } L ${points[0].x} ${paddingTop + plotHeight} Z`;

  const activePoint = points[hoveredPointIndex] || points[3];

  return (
    <div className={`min-h-full p-6 space-y-6 max-w-[1600px] mx-auto ${bgToneClasses[bgTone]} transition-colors duration-300 rounded-3xl my-2 shadow-[0_1px_4px_rgba(0,0,0,0.02)]`}>
      {/* Greeting Header & Layout Preset Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-100 shadow-xs">
        <div className="flex items-center space-x-3">
          <span className="text-2xl p-2 bg-emerald-50 rounded-xl">👋</span>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-base font-bold text-gray-800 tracking-tight">
                早上好！admin
              </h1>
              <span className="text-xs text-emerald-700 bg-emerald-50/80 px-2 py-0.5 rounded-full font-medium border border-emerald-100">
                平台运行平稳
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">
              智慧养老服务中枢 · 今日待办与核心运营指标已全面更新（2026年10月）
            </p>
          </div>
        </div>

        {/* Controls: Background Tone & Layout Preset Switcher */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Tone Selector */}
          <div className="flex items-center space-x-1 bg-gray-100/90 p-1 rounded-xl border border-gray-200/60">
            <span className="text-[11px] text-gray-500 font-medium px-1 flex items-center gap-1">
              <Palette className="w-3 h-3 text-emerald-600" />
              <span>底色:</span>
            </span>
            <button
              onClick={() => {
                setBgTone('emerald');
                onNotice('已切换为【温润翡翠色调】：柔和玉色，完美契合顶部墨绿色系');
              }}
              className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-all ${
                bgTone === 'emerald'
                  ? 'bg-white text-emerald-700 shadow-xs font-semibold'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
              title="温润翡翠玉色"
            >
              翡翠玉色
            </button>
            <button
              onClick={() => {
                setBgTone('sage');
                onNotice('已切换为【清雅竹青色调】：自然草木青色，宁静舒缓');
              }}
              className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-all ${
                bgTone === 'sage'
                  ? 'bg-white text-emerald-700 shadow-xs font-semibold'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
              title="清雅竹青绿"
            >
              竹青雅韵
            </button>
            <button
              onClick={() => {
                setBgTone('cyan');
                onNotice('已切换为【天青水碧色调】：清澈灵动天青色');
              }}
              className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-all ${
                bgTone === 'cyan'
                  ? 'bg-white text-emerald-700 shadow-xs font-semibold'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
              title="天青水碧"
            >
              天青水碧
            </button>
            <button
              onClick={() => {
                setBgTone('slate');
                onNotice('已切换为【远山黛灰调】：低饱和灰绿，沉稳内敛');
              }}
              className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-all ${
                bgTone === 'slate'
                  ? 'bg-white text-emerald-700 shadow-xs font-semibold'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
              title="黛峰素灰"
            >
              远山黛青
            </button>
          </div>

          {/* Layout Switcher */}
          <div className="flex items-center space-x-1.5">
            <span className="text-xs text-gray-400 font-medium hidden md:inline">版面:</span>
            <div className="flex items-center bg-gray-100/90 p-1 rounded-xl border border-gray-200/60">
              <button
                onClick={() => {
                  setLayoutPreset('balanced');
                  onNotice('已切换为【黄金分栏模式】：核心趋势与快捷调度并列，画像与双榜均衡分布');
                }}
                className={`flex items-center space-x-1.5 text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
                  layoutPreset === 'balanced'
                    ? 'bg-white text-emerald-700 shadow-xs font-semibold'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
                title="趋势8列+快捷4列，画像与双榜各6列"
              >
                <Columns className="w-3.5 h-3.5" />
                <span>黄金分栏</span>
              </button>
              <button
                onClick={() => {
                  setLayoutPreset('panorama');
                  onNotice('已切换为【全景聚焦模式】：大图表全宽拉伸，双榜平铺展开');
                }}
                className={`flex items-center space-x-1.5 text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
                  layoutPreset === 'panorama'
                    ? 'bg-white text-emerald-700 shadow-xs font-semibold'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
                title="大图全宽展开"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>全景聚焦</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4 KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {KPI_STATS.map((kpi, idx) => {
          const styles = [
            {
              accent: 'bg-gradient-to-r from-emerald-500 to-teal-400',
              border: 'border-emerald-100 hover:border-emerald-300',
              shadow: 'shadow-[0_4px_20px_rgba(16,185,129,0.06)] hover:shadow-[0_8px_25px_rgba(16,185,129,0.15)]',
              iconBg: 'bg-emerald-50 text-emerald-600 border-emerald-100/80',
              icon: <UserPlus className="w-4 h-4" />,
              badgeBg: 'bg-emerald-50/90 text-emerald-700 border-emerald-200/60',
            },
            {
              accent: 'bg-gradient-to-r from-amber-500 to-orange-400',
              border: 'border-amber-100 hover:border-amber-300',
              shadow: 'shadow-[0_4px_20px_rgba(245,158,11,0.06)] hover:shadow-[0_8px_25px_rgba(245,158,11,0.15)]',
              iconBg: 'bg-amber-50 text-amber-600 border-amber-100/80',
              icon: <ClipboardList className="w-4 h-4" />,
              badgeBg: 'bg-amber-50/90 text-amber-700 border-amber-200/60',
            },
            {
              accent: 'bg-gradient-to-r from-rose-500 to-pink-400',
              border: 'border-rose-100 hover:border-rose-300',
              shadow: 'shadow-[0_4px_20px_rgba(244,63,94,0.06)] hover:shadow-[0_8px_25px_rgba(244,63,94,0.15)]',
              iconBg: 'bg-rose-50 text-rose-600 border-rose-100/80',
              icon: <ShoppingBag className="w-4 h-4" />,
              badgeBg: 'bg-rose-50/90 text-rose-700 border-rose-200/60',
            },
            {
              accent: 'bg-gradient-to-r from-indigo-500 to-purple-400',
              border: 'border-indigo-100 hover:border-indigo-300',
              shadow: 'shadow-[0_4px_20px_rgba(99,102,241,0.06)] hover:shadow-[0_8px_25px_rgba(99,102,241,0.15)]',
              iconBg: 'bg-indigo-50 text-indigo-600 border-indigo-100/80',
              icon: <Activity className="w-4 h-4" />,
              badgeBg: 'bg-indigo-50/90 text-indigo-700 border-indigo-200/60',
            },
          ][idx % 4];

          return (
            <div
              key={idx}
              id={`kpi-card-${idx}`}
              className={`theme-card rounded-2xl p-5 border transition-all duration-300 relative overflow-hidden group hover:-translate-y-1 ${styles.border} ${styles.shadow}`}
            >
              {/* Top Gradient Accent Line */}
              <div className={`absolute top-0 left-0 right-0 h-1 ${styles.accent}`} />

              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-slate-500 tracking-wide">
                  {kpi.title}
                </span>
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center border group-hover:scale-110 transition-transform duration-300 ${styles.iconBg}`}
                >
                  {styles.icon}
                </div>
              </div>

              <div className="flex items-end justify-between">
                <div className="space-y-2">
                  <div className="text-3xl font-extrabold text-slate-800 tracking-tight font-mono">
                    {kpi.value.toLocaleString()}
                  </div>
                  <div className="flex items-center">
                    <span
                      className={`inline-flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-full font-semibold border ${
                        kpi.isPositive
                          ? styles.badgeBg
                          : 'bg-rose-50/90 text-rose-600 border-rose-200/60'
                      }`}
                    >
                      {kpi.isPositive ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )}
                      {kpi.changeText}
                    </span>
                  </div>
                </div>

                {/* Mini Visual Chart */}
                <div className="w-20 h-12 flex items-end justify-end">
                  {kpi.type === 'green-line' && (
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 100 45">
                      <defs>
                        <linearGradient id={`greenGrad-${idx}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M0 35 Q 25 10, 45 28 T 80 8 T 100 22 L 100 45 L 0 45 Z"
                        fill={`url(#greenGrad-${idx})`}
                      />
                      <path
                        d="M0 35 Q 25 10, 45 28 T 80 8 T 100 22"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                      <circle cx="100" cy="22" r="3.5" fill="#10b981" className="animate-pulse" />
                    </svg>
                  )}

                  {kpi.type === 'yellow-bar' && (
                    <div className="flex items-end justify-between w-full h-10 space-x-1 px-1">
                      <div className="w-2 h-5 bg-amber-200 rounded-t-md transition-all group-hover:h-6"></div>
                      <div className="w-2 h-9 bg-amber-500 rounded-t-md transition-all group-hover:h-10"></div>
                      <div className="w-2 h-7 bg-amber-400 rounded-t-md transition-all group-hover:h-8"></div>
                      <div className="w-2 h-4 bg-amber-300 rounded-t-md transition-all group-hover:h-5"></div>
                      <div className="w-2 h-3 bg-amber-200 rounded-t-md transition-all group-hover:h-4"></div>
                    </div>
                  )}

                  {kpi.type === 'red-line' && (
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 100 45">
                      <defs>
                        <linearGradient id={`redGrad-${idx}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M0 38 Q 25 30, 40 10 T 75 32 T 100 28 L 100 45 L 0 45 Z"
                        fill={`url(#redGrad-${idx})`}
                      />
                      <path
                        d="M0 38 Q 25 30, 40 10 T 75 32 T 100 28"
                        fill="none"
                        stroke="#f43f5e"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                      <circle cx="100" cy="28" r="3.5" fill="#f43f5e" className="animate-pulse" />
                    </svg>
                  )}

                  {kpi.type === 'purple-bar' && (
                    <div className="flex items-end justify-between w-full h-10 space-x-1 px-1">
                      <div className="w-2 h-3 bg-indigo-200 rounded-t-md transition-all group-hover:h-4"></div>
                      <div className="w-2 h-5 bg-indigo-300 rounded-t-md transition-all group-hover:h-6"></div>
                      <div className="w-2 h-7 bg-indigo-400 rounded-t-md transition-all group-hover:h-8"></div>
                      <div className="w-2 h-10 bg-indigo-600 rounded-t-md transition-all group-hover:h-10"></div>
                      <div className="w-2 h-8 bg-purple-500 rounded-t-md transition-all group-hover:h-9"></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Re-architected 6 Modules Layout with Presets */}
      {layoutPreset === "balanced" ? (
        /* Preset 1: 黄金分栏模式 (Balanced 8:4 + 6:6 + 6:6) */
        <div className="space-y-6">
          {/* Row 1: 核心运营大盘 (Trend 8 + Quick 4) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            <div className="lg:col-span-8 flex flex-col h-full">
              <UserTrendSection
                trendChartMode={trendChartMode}
                setTrendChartMode={setTrendChartMode}
                hoveredPointIndex={hoveredPointIndex}
                setHoveredPointIndex={setHoveredPointIndex}
                points={points}
                activePoint={activePoint}
                chartWidth={chartWidth}
                chartHeight={chartHeight}
                paddingX={paddingX}
                paddingTop={paddingTop}
                plotHeight={plotHeight}
                minY={minY}
                maxY={maxY}
                linePath={linePath}
                areaPath={areaPath}
                stepLinePath={stepLinePath}
                stepAreaPath={stepAreaPath}
                onViewAll={() => onNavigateToPage && onNavigateToPage("user_list")}
              />
            </div>
            <div className="lg:col-span-4 flex flex-col h-full">
              <QuickEntranceSection
                isFullWidth={false}
                quickEntranceView={quickEntranceView}
                setQuickEntranceView={setQuickEntranceView}
                onItemClick={handleQuickEntranceClick}
                onConfig={() => onNotice("快捷入口配置：当前已展示常用养老管理模块")}
                onScheduleKanban={() => {
                  if (onNavigateToAppointment) {
                    onNotice("进入【预约看板】查看业务排班与工单详情");
                    onNavigateToAppointment();
                  }
                }}
              />
            </div>
          </div>

          {/* Row 2: 业务结构与客群画像 (Service 6 + Tag 6) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            <div className="lg:col-span-6 flex flex-col h-full">
              <ServiceRatioSection
                ratioChartMode={ratioChartMode}
                setRatioChartMode={setRatioChartMode}
                hoveredRatioIdx={hoveredRatioIdx}
                setHoveredRatioIdx={setHoveredRatioIdx}
                onViewOrders={() => onNavigateToPage && onNavigateToPage("trade_all_orders")}
              />
            </div>
            <div className="lg:col-span-6 flex flex-col h-full">
              <UserTagSection
                userTagChartMode={userTagChartMode}
                setUserTagChartMode={setUserTagChartMode}
                hoveredTagIdx={hoveredTagIdx}
                setHoveredTagIdx={setHoveredTagIdx}
                onViewTagSystem={() => onNavigateToPage && onNavigateToPage("user_tags")}
              />
            </div>
          </div>

          {/* Row 3: 双榜领航与绩效先锋 (Products 6 + Staff 6) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            <div className="lg:col-span-6 flex flex-col h-full">
              <ProductRankSection
                productRankMode={productRankMode}
                setProductRankMode={setProductRankMode}
                onViewAll={() => onNavigateToPage && onNavigateToPage("trade_all_orders")}
              />
            </div>
            <div className="lg:col-span-6 flex flex-col h-full">
              <StaffRankSection
                staffRankMode={staffRankMode}
                setStaffRankMode={setStaffRankMode}
                onViewAll={() => onNavigateToPage && onNavigateToPage("service_staff_list")}
              />
            </div>
          </div>
        </div>
      ) : (
        /* Preset 2: 全景聚焦模式 (Panorama 12 + 12 + 6:6 + 6:6) */
        <div className="space-y-6">
          {/* Top Full Strip: 快捷入口全局横幅 */}
          <div>
            <QuickEntranceSection
              isFullWidth={true}
              quickEntranceView={quickEntranceView}
              setQuickEntranceView={setQuickEntranceView}
              onItemClick={handleQuickEntranceClick}
              onConfig={() => onNotice("快捷入口配置：当前已展示常用养老管理模块")}
              onScheduleKanban={() => {
                if (onNavigateToAppointment) {
                  onNotice("进入【预约看板】查看业务排班与工单详情");
                  onNavigateToAppointment();
                }
              }}
            />
          </div>

          {/* Core Full Width Chart: 用户趋势大盘 */}
          <div>
            <UserTrendSection
              trendChartMode={trendChartMode}
              setTrendChartMode={setTrendChartMode}
              hoveredPointIndex={hoveredPointIndex}
              setHoveredPointIndex={setHoveredPointIndex}
              points={points}
              activePoint={activePoint}
              chartWidth={chartWidth}
              chartHeight={chartHeight}
              paddingX={paddingX}
              paddingTop={paddingTop}
              plotHeight={plotHeight}
              minY={minY}
              maxY={maxY}
              linePath={linePath}
              areaPath={areaPath}
              stepLinePath={stepLinePath}
              stepAreaPath={stepAreaPath}
              onViewAll={() => onNavigateToPage && onNavigateToPage("user_list")}
            />
          </div>

          {/* Row 3: 业务结构与画像 (6:6) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            <div className="lg:col-span-6 flex flex-col h-full">
              <ServiceRatioSection
                ratioChartMode={ratioChartMode}
                setRatioChartMode={setRatioChartMode}
                hoveredRatioIdx={hoveredRatioIdx}
                setHoveredRatioIdx={setHoveredRatioIdx}
                onViewOrders={() => onNavigateToPage && onNavigateToPage("trade_all_orders")}
              />
            </div>
            <div className="lg:col-span-6 flex flex-col h-full">
              <UserTagSection
                userTagChartMode={userTagChartMode}
                setUserTagChartMode={setUserTagChartMode}
                hoveredTagIdx={hoveredTagIdx}
                setHoveredTagIdx={setHoveredTagIdx}
                onViewTagSystem={() => onNavigateToPage && onNavigateToPage("user_tags")}
              />
            </div>
          </div>

          {/* Row 4: 双榜先锋 (6:6) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            <div className="lg:col-span-6 flex flex-col h-full">
              <ProductRankSection
                productRankMode={productRankMode}
                setProductRankMode={setProductRankMode}
                onViewAll={() => onNavigateToPage && onNavigateToPage("trade_all_orders")}
              />
            </div>
            <div className="lg:col-span-6 flex flex-col h-full">
              <StaffRankSection
                staffRankMode={staffRankMode}
                setStaffRankMode={setStaffRankMode}
                onViewAll={() => onNavigateToPage && onNavigateToPage("service_staff_list")}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
