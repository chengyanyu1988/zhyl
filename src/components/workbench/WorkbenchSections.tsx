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
  PieChart as PieIcon,
  BarChart2,
  BarChart3,
  LineChart,
  Activity,
  Compass,
  LayoutGrid,
  Trophy,
  Crown,
  Award,
  Grid,
  List,
  ArrowUpRight,
  CheckCircle2,
} from 'lucide-react';
import {
  QUICK_ENTRANCES,
  USER_TAGS,
  SERVICE_RATIOS,
  USER_TREND_DATA,
  TOP_PRODUCTS,
  TOP_STAFF,
} from '../../data/mockData';

export const quickSubHints: Record<string, string> = {
  '全部用户': '8,920人',
  '用户列表': '8,920人',
  '报告管理': '128份',
  '会话': '5条未读',
  '全部订单': '236单',
  '工单管理': '14待派',
  '审核管理': '3待审',
  '售后管理': '0延误',
  '动态管理': '7,955条',
};

export const getQuickIcon = (iconName: string) => {
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

/* -------------------------------------------------------------
 * 1. 用户趋势统计 (User Trend Section)
 * ------------------------------------------------------------- */
interface UserTrendSectionProps {
  trendChartMode: 'column' | 'area' | 'step';
  setTrendChartMode: (mode: 'column' | 'area' | 'step') => void;
  hoveredPointIndex: number;
  setHoveredPointIndex: (index: number) => void;
  points: { date: string; value: number; x: number; y: number }[];
  activePoint?: { date: string; value: number; x: number; y: number };
  chartWidth: number;
  chartHeight: number;
  paddingX: number;
  paddingTop: number;
  plotHeight: number;
  minY: number;
  maxY: number;
  linePath: string;
  areaPath: string;
  stepLinePath: string;
  stepAreaPath: string;
  onViewAll?: () => void;
}

export const UserTrendSection: React.FC<UserTrendSectionProps> = ({
  trendChartMode,
  setTrendChartMode,
  hoveredPointIndex,
  setHoveredPointIndex,
  points,
  activePoint,
  chartWidth,
  chartHeight,
  paddingX,
  paddingTop,
  plotHeight,
  minY,
  maxY,
  linePath,
  areaPath,
  stepLinePath,
  stepAreaPath,
  onViewAll,
}) => {
  return (
    <div className="theme-card rounded-2xl p-5 border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-4 bg-[#10b981] rounded-full"></span>
            <h2 className="text-sm font-bold text-gray-800">用户趋势统计</h2>
            <span className="text-[11px] text-emerald-700 bg-emerald-50 border border-emerald-200/80 font-medium px-2 py-0.5 rounded-full">
              日均: 2,963 人
            </span>
            <span className="hidden sm:inline-block text-[11px] text-emerald-600 bg-emerald-50/60 px-2 py-0.5 rounded-md font-medium">
              较上周期 +18.4%
            </span>
          </div>

          {/* View Mode Toggle Pill Buttons */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center bg-gray-100/80 p-0.5 rounded-lg border border-gray-200/60">
              <button
                type="button"
                onClick={() => setTrendChartMode('column')}
                className={`flex items-center space-x-1 text-[11px] px-2.5 py-1 rounded-md font-medium transition-all ${
                  trendChartMode === 'column'
                    ? 'bg-white text-emerald-600 shadow-xs font-semibold'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                title="立体柱状图"
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>柱状图</span>
              </button>
              <button
                type="button"
                onClick={() => setTrendChartMode('area')}
                className={`flex items-center space-x-1 text-[11px] px-2.5 py-1 rounded-md font-medium transition-all ${
                  trendChartMode === 'area'
                    ? 'bg-white text-emerald-600 shadow-xs font-semibold'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                title="平滑曲线图"
              >
                <LineChart className="w-3.5 h-3.5" />
                <span>曲线图</span>
              </button>
              <button
                type="button"
                onClick={() => setTrendChartMode('step')}
                className={`flex items-center space-x-1 text-[11px] px-2.5 py-1 rounded-md font-medium transition-all ${
                  trendChartMode === 'step'
                    ? 'bg-white text-emerald-600 shadow-xs font-semibold'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                title="阶梯波动图"
              >
                <Activity className="w-3.5 h-3.5" />
                <span>阶梯图</span>
              </button>
            </div>
            <span className="text-[11px] text-gray-400 font-mono hidden md:inline">
              10-01 ~ 10-20
            </span>
          </div>
        </div>

        {/* Legend Indicator & Summary stats */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2 px-1 text-xs">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]"></span>
            <span className="text-gray-600 font-medium">每日长者用户新增及活跃走势</span>
          </div>
          <div className="flex items-center space-x-3 text-[11px]">
            <span className="text-emerald-700 font-medium">
              峰值: <strong className="font-mono text-emerald-800">3,480</strong> (10-20)
            </span>
            <span className="text-amber-700 font-medium">
              谷值: <strong className="font-mono text-amber-800">1,520</strong> (10-12)
            </span>
            {activePoint && (
              <span className="text-gray-700 font-medium bg-emerald-50/80 px-2 py-0.5 rounded border border-emerald-100">
                选中: <strong className="font-mono text-emerald-700">{activePoint.date.slice(5)}</strong> (
                <strong className="font-mono text-emerald-800">{activePoint.value}人</strong>)
              </span>
            )}
          </div>
        </div>

        {/* Chart SVG */}
        <div className="relative w-full overflow-hidden">
          <svg
            className="w-full h-56 select-none"
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="trendAreaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#10b981" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.02" />
              </linearGradient>

              <linearGradient id="trendBarGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#34d399" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>

              <linearGradient id="trendBarHoverGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6ee7b7" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
            </defs>

            {/* Horizontal Grid lines & Y Axis Labels */}
            {[3500, 3000, 2500, 2000, 1500].map((val) => {
              const normalizedY = (val - minY) / (maxY - minY);
              const y = paddingTop + (1 - normalizedY) * plotHeight;
              return (
                <g key={val}>
                  <line
                    x1={paddingX}
                    y1={y}
                    x2={chartWidth - paddingX}
                    y2={y}
                    stroke="#f1f5f9"
                    strokeWidth="1"
                  />
                  <text
                    x={paddingX - 14}
                    y={y + 4}
                    textAnchor="end"
                    fill="#9ca3af"
                    fontSize="11"
                    fontFamily="sans-serif"
                  >
                    {val}
                  </text>
                </g>
              );
            })}

            {/* Average Reference Line (2963) */}
            {(() => {
              const avgY = paddingTop + (1 - (2963 - minY) / (maxY - minY)) * plotHeight;
              return (
                <g>
                  <line
                    x1={paddingX}
                    y1={avgY}
                    x2={chartWidth - paddingX}
                    y2={avgY}
                    stroke="#10b981"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    opacity="0.4"
                  />
                  <text
                    x={chartWidth - paddingX + 6}
                    y={avgY + 3}
                    fill="#10b981"
                    fontSize="10"
                    fontWeight="600"
                  >
                    均值 2,963
                  </text>
                </g>
              );
            })()}

            {/* Render chart based on selected mode */}
            {trendChartMode === 'column' && (
              <g>
                {points.map((pt, idx) => {
                  const barWidth = 36;
                  const barX = pt.x - barWidth / 2;
                  const barHeight = paddingTop + plotHeight - pt.y;
                  const isHovered = hoveredPointIndex === idx;

                  return (
                    <g
                      key={idx}
                      className="cursor-pointer transition-all"
                      onMouseEnter={() => setHoveredPointIndex(idx)}
                    >
                      <rect
                        x={barX}
                        y={paddingTop}
                        width={barWidth}
                        height={plotHeight}
                        fill="#f8fafc"
                        rx="6"
                        ry="6"
                      />

                      <rect
                        x={barX}
                        y={pt.y}
                        width={barWidth}
                        height={barHeight}
                        fill={isHovered ? 'url(#trendBarHoverGrad)' : 'url(#trendBarGrad)'}
                        rx="6"
                        ry="6"
                        className="transition-all duration-300"
                        style={{
                          filter: isHovered
                            ? 'drop-shadow(0 4px 10px rgba(16, 185, 129, 0.45))'
                            : 'drop-shadow(0 2px 4px rgba(0,0,0,0.04))',
                        }}
                      />

                      <rect
                        x={barX + 3}
                        y={pt.y + 1}
                        width={barWidth - 6}
                        height="3"
                        rx="1.5"
                        fill="#ffffff"
                        opacity="0.5"
                      />

                      <text
                        x={pt.x}
                        y={pt.y - 8}
                        textAnchor="middle"
                        fill={isHovered ? '#047857' : '#4b5563'}
                        fontSize="11"
                        fontWeight={isHovered ? '700' : '600'}
                        fontFamily="monospace"
                        className="transition-colors"
                      >
                        {pt.value}
                      </text>

                      <rect
                        x={barX - 10}
                        y={paddingTop}
                        width={barWidth + 20}
                        height={plotHeight}
                        fill="transparent"
                      />
                    </g>
                  );
                })}
              </g>
            )}

            {trendChartMode === 'area' && (
              <g>
                <path d={areaPath} fill="url(#trendAreaGrad)" />
                <path
                  d={linePath}
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {points.map((pt, idx) => {
                  const isHovered = hoveredPointIndex === idx;
                  return (
                    <g
                      key={idx}
                      className="cursor-pointer"
                      onMouseEnter={() => setHoveredPointIndex(idx)}
                    >
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r={isHovered ? 6 : 3.5}
                        fill={isHovered ? '#059669' : '#10b981'}
                        stroke="#ffffff"
                        strokeWidth={isHovered ? 3 : 2}
                        className="transition-all duration-200"
                      />
                      {isHovered && (
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r={12}
                          fill="#10b981"
                          opacity="0.25"
                          className="animate-ping"
                        />
                      )}
                    </g>
                  );
                })}
              </g>
            )}

            {trendChartMode === 'step' && (
              <g>
                <path d={stepAreaPath} fill="url(#trendAreaGrad)" />
                <path
                  d={stepLinePath}
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {points.map((pt, idx) => {
                  const isHovered = hoveredPointIndex === idx;
                  return (
                    <g
                      key={idx}
                      className="cursor-pointer"
                      onMouseEnter={() => setHoveredPointIndex(idx)}
                    >
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r={isHovered ? 6 : 3.5}
                        fill={isHovered ? '#059669' : '#10b981'}
                        stroke="#ffffff"
                        strokeWidth={isHovered ? 3 : 2}
                        className="transition-all duration-200"
                      />
                    </g>
                  );
                })}
              </g>
            )}
          </svg>

          {/* X Axis Date Labels */}
          <div className="flex justify-between px-14 pt-1 text-[11px] text-gray-400">
            {USER_TREND_DATA.map((d, i) => (
              <span
                key={i}
                className={`transition-colors cursor-pointer ${
                  hoveredPointIndex === i
                    ? 'text-emerald-600 font-bold'
                    : 'hover:text-gray-600'
                }`}
                onClick={() => setHoveredPointIndex(i)}
              >
                {d.date.slice(5)}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-gray-400">
        <span className="flex items-center space-x-1">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
          <span>实时算法校准 · 数据每15分钟自动沉淀入仓</span>
        </span>
        <span
          onClick={onViewAll}
          className="text-emerald-600 font-medium hover:underline cursor-pointer"
        >
          查看全量用户增长分析 &rarr;
        </span>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------
 * 2. 快捷入口 (Quick Entrance Section)
 * ------------------------------------------------------------- */
interface QuickEntranceSectionProps {
  isFullWidth?: boolean;
  quickEntranceView: 'grid' | 'list';
  setQuickEntranceView: (view: 'grid' | 'list') => void;
  onItemClick: (title: string) => void;
  onConfig: () => void;
  onScheduleKanban: () => void;
}

export const QuickEntranceSection: React.FC<QuickEntranceSectionProps> = ({
  isFullWidth = false,
  quickEntranceView,
  setQuickEntranceView,
  onItemClick,
  onConfig,
  onScheduleKanban,
}) => {
  return (
    <div className="theme-card rounded-2xl p-5 border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-4 bg-[#10b981] rounded-full"></span>
            <h2 className="text-sm font-bold text-gray-800">快捷入口</h2>
            <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full font-medium">
              8项核心功能
            </span>
          </div>
          <div className="flex items-center space-x-1.5">
            {!isFullWidth && (
              <div className="flex items-center bg-gray-100/80 p-0.5 rounded-lg text-xs">
                <button
                  type="button"
                  onClick={() => setQuickEntranceView('grid')}
                  className={`p-1 rounded-md transition-all ${
                    quickEntranceView === 'grid'
                      ? 'bg-white text-emerald-600 shadow-xs'
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                  title="网格视图"
                >
                  <Grid className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setQuickEntranceView('list')}
                  className={`p-1 rounded-md transition-all ${
                    quickEntranceView === 'list'
                      ? 'bg-white text-emerald-600 shadow-xs'
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                  title="清单视图"
                >
                  <List className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
            <button
              onClick={onConfig}
              className="p-1 text-gray-300 hover:text-gray-500 rounded-lg hover:bg-gray-100 transition-colors"
              title="配置入口"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        {isFullWidth ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {QUICK_ENTRANCES.map((item) => (
              <button
                key={item.id}
                onClick={() => onItemClick(item.title)}
                className="group p-3 rounded-xl bg-gray-50/70 hover:bg-white border border-gray-100 hover:border-emerald-200 hover:shadow-sm transition-all flex flex-col items-center cursor-pointer text-center"
              >
                <div
                  className={`w-11 h-11 rounded-2xl ${item.bgColor} ${item.textColor} flex items-center justify-center mb-2 transition-transform group-hover:scale-110 shadow-xs`}
                >
                  {getQuickIcon(item.iconName)}
                </div>
                <span className="text-xs font-semibold text-gray-800 group-hover:text-[#10b981] transition-colors whitespace-nowrap">
                  {item.title}
                </span>
                <span className="text-[10px] text-gray-400 mt-0.5">
                  {quickSubHints[item.title] || '即时直达'}
                </span>
              </button>
            ))}
          </div>
        ) : quickEntranceView === 'grid' ? (
          <div className="grid grid-cols-4 gap-y-3.5 gap-x-2 my-auto py-1">
            {QUICK_ENTRANCES.map((item) => (
              <button
                key={item.id}
                id={`quick-entrance-${item.id}`}
                onClick={() => onItemClick(item.title)}
                className="flex flex-col items-center group cursor-pointer transition-all hover:-translate-y-0.5 p-1.5 rounded-xl hover:bg-emerald-50/40"
              >
                <div
                  className={`w-11 h-11 rounded-2xl ${item.bgColor} ${item.textColor} flex items-center justify-center mb-1.5 transition-all group-hover:shadow-md group-hover:scale-105`}
                >
                  {getQuickIcon(item.iconName)}
                </div>
                <span className="text-[11px] font-semibold text-gray-700 group-hover:text-[#10b981] transition-colors whitespace-nowrap">
                  {item.title}
                </span>
                <span className="text-[10px] text-gray-400 font-mono scale-90 -mt-0.5">
                  {quickSubHints[item.title] || '操作'}
                </span>
              </button>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2 my-auto py-1">
            {QUICK_ENTRANCES.map((item) => (
              <button
                key={item.id}
                onClick={() => onItemClick(item.title)}
                className="group flex items-center justify-between p-2 rounded-xl bg-gray-50/70 hover:bg-white border border-gray-100 hover:border-emerald-200 hover:shadow-xs transition-all text-left"
              >
                <div className="flex items-center space-x-2 min-w-0">
                  <div
                    className={`w-8 h-8 rounded-lg ${item.bgColor} ${item.textColor} flex items-center justify-center shrink-0`}
                  >
                    {getQuickIcon(item.iconName)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-gray-800 truncate group-hover:text-emerald-600">
                      {item.title}
                    </p>
                    <p className="text-[10px] text-gray-400">
                      {quickSubHints[item.title] || '常用'}
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-emerald-500 transition-colors" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-gray-400">
        <span className="truncate">快捷调度 · 点击直达对应功能操作</span>
        <span
          onClick={onScheduleKanban}
          className="text-emerald-600 hover:underline cursor-pointer shrink-0 ml-2"
        >
          调度看板 &rarr;
        </span>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------
 * 3. 各服务类型商品订单量占比 (Service Ratios Section)
 * ------------------------------------------------------------- */
interface ServiceRatioSectionProps {
  ratioChartMode: 'ring' | 'bar';
  setRatioChartMode: (mode: 'ring' | 'bar') => void;
  hoveredRatioIdx: number | null;
  setHoveredRatioIdx: (idx: number | null) => void;
  onViewOrders?: () => void;
}

export const ServiceRatioSection: React.FC<ServiceRatioSectionProps> = ({
  ratioChartMode,
  setRatioChartMode,
  hoveredRatioIdx,
  setHoveredRatioIdx,
  onViewOrders,
}) => {
  return (
    <div className="theme-card rounded-2xl p-5 border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-between h-full">
      <div>
        {/* Header & Mode Switcher */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-4 bg-[#10b981] rounded-full"></span>
            <h2 className="text-sm font-bold text-gray-800">各服务类型商品订单量占比</h2>
            <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full font-medium">
              2,635 单总量
            </span>
          </div>
          <div className="flex items-center bg-gray-100/80 p-0.5 rounded-lg border border-gray-200/60">
            <button
              type="button"
              onClick={() => setRatioChartMode('ring')}
              className={`flex items-center space-x-1 text-[11px] px-2.5 py-1 rounded-md font-medium transition-all ${
                ratioChartMode === 'ring'
                  ? 'bg-white text-emerald-600 shadow-xs font-semibold'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              title="同心环轨图"
            >
              <PieIcon className="w-3 h-3" />
              <span>环轨</span>
            </button>
            <button
              type="button"
              onClick={() => setRatioChartMode('bar')}
              className={`flex items-center space-x-1 text-[11px] px-2.5 py-1 rounded-md font-medium transition-all ${
                ratioChartMode === 'bar'
                  ? 'bg-white text-emerald-600 shadow-xs font-semibold'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              title="对比条形图"
            >
              <BarChart2 className="w-3 h-3" />
              <span>条形</span>
            </button>
          </div>
        </div>

        {ratioChartMode === 'ring' ? (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-2">
            {/* Concentric Gauge SVG */}
            <div className="relative w-40 h-40 shrink-0 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90 drop-shadow-sm">
                <defs>
                  <linearGradient id="ring-grad-0" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2dd4bf" />
                    <stop offset="100%" stopColor="#0d9488" />
                  </linearGradient>
                  <linearGradient id="ring-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fcd34d" />
                    <stop offset="100%" stopColor="#f59e0b" />
                  </linearGradient>
                  <linearGradient id="ring-grad-2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fb7185" />
                    <stop offset="100%" stopColor="#e11d48" />
                  </linearGradient>
                </defs>

                {/* Track 0: 康复理疗 55% */}
                <circle cx="50" cy="50" r="38" fill="none" stroke="#f1f5f9" strokeWidth="5" />
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="none"
                  stroke="url(#ring-grad-1)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray="131.32 238.76"
                  strokeDashoffset="0"
                  className="transition-all duration-300 cursor-pointer"
                  style={{
                    opacity: hoveredRatioIdx === null || hoveredRatioIdx === 1 ? 1 : 0.35,
                    filter: hoveredRatioIdx === 1 ? 'drop-shadow(0 0 5px rgba(245, 158, 11, 0.6))' : 'none',
                  }}
                  onMouseEnter={() => setHoveredRatioIdx(1)}
                  onMouseLeave={() => setHoveredRatioIdx(null)}
                />

                {/* Track 1: 家政护理 28% */}
                <circle cx="50" cy="50" r="28" fill="none" stroke="#f1f5f9" strokeWidth="5" />
                <circle
                  cx="50"
                  cy="50"
                  r="28"
                  fill="none"
                  stroke="url(#ring-grad-0)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray="49.26 175.93"
                  strokeDashoffset="0"
                  className="transition-all duration-300 cursor-pointer"
                  style={{
                    opacity: hoveredRatioIdx === null || hoveredRatioIdx === 0 ? 1 : 0.35,
                    filter: hoveredRatioIdx === 0 ? 'drop-shadow(0 0 5px rgba(13, 148, 136, 0.6))' : 'none',
                  }}
                  onMouseEnter={() => setHoveredRatioIdx(0)}
                  onMouseLeave={() => setHoveredRatioIdx(null)}
                />

                {/* Track 2: 上门体检 17% */}
                <circle cx="50" cy="50" r="18" fill="none" stroke="#f1f5f9" strokeWidth="5" />
                <circle
                  cx="50"
                  cy="50"
                  r="18"
                  fill="none"
                  stroke="url(#ring-grad-2)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray="19.23 113.10"
                  strokeDashoffset="0"
                  className="transition-all duration-300 cursor-pointer"
                  style={{
                    opacity: hoveredRatioIdx === null || hoveredRatioIdx === 2 ? 1 : 0.35,
                    filter: hoveredRatioIdx === 2 ? 'drop-shadow(0 0 5px rgba(225, 29, 72, 0.6))' : 'none',
                  }}
                  onMouseEnter={() => setHoveredRatioIdx(2)}
                  onMouseLeave={() => setHoveredRatioIdx(null)}
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center p-1">
                {hoveredRatioIdx !== null ? (
                  <>
                    <span className="text-lg font-extrabold text-gray-800 leading-none">
                      {SERVICE_RATIOS[hoveredRatioIdx]?.ratio}%
                    </span>
                    <span className="text-[10px] text-gray-500 font-medium mt-1 truncate max-w-[85px]">
                      {SERVICE_RATIOS[hoveredRatioIdx]?.name}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
                      总订单
                    </span>
                    <span className="text-base font-extrabold text-emerald-600 leading-tight">
                      2,635
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Legend with interactive gradient bars */}
            <div className="flex-1 w-full space-y-2">
              {SERVICE_RATIOS.map((item, i) => {
                const estOrders = [738, 1449, 448][i];
                const growth = ['+11.2%', '+18.5%', '+6.4%'][i];
                const isHovered = hoveredRatioIdx === i;

                return (
                  <div
                    key={i}
                    onMouseEnter={() => setHoveredRatioIdx(i)}
                    onMouseLeave={() => setHoveredRatioIdx(null)}
                    className={`p-2 rounded-xl transition-all cursor-pointer ${
                      isHovered
                        ? 'bg-emerald-50/70 border border-emerald-200/60 shadow-xs translate-x-1'
                        : 'hover:bg-gray-50 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs mb-1">
                      <div className="flex items-center space-x-2">
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0 shadow-xs"
                          style={{ backgroundColor: item.color }}
                        ></span>
                        <span className="text-gray-800 font-semibold text-xs">
                          {item.name}
                        </span>
                        <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-100 font-medium">
                          {growth}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <span className="font-extrabold text-gray-800 text-xs">
                          {item.ratio}%
                        </span>
                        <span className="text-[10px] text-gray-400 font-mono">
                          ({estOrders}单)
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${item.ratio}%`,
                          backgroundColor: item.color,
                        }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-center py-2 space-y-3">
            <div>
              <div className="flex justify-between text-[11px] text-gray-500 mb-1 font-medium">
                <span>服务品类整体分布</span>
                <span className="text-emerald-600 font-bold">2,635 单总量</span>
              </div>
              <div className="w-full h-4 bg-gray-100 rounded-full flex overflow-hidden p-0.5 border border-gray-200/50 shadow-inner">
                {SERVICE_RATIOS.map((item, i) => (
                  <div
                    key={i}
                    className="h-full first:rounded-l-full last:rounded-r-full transition-all duration-300 relative group cursor-pointer"
                    style={{
                      width: `${item.ratio}%`,
                      backgroundColor: item.color,
                    }}
                    title={`${item.name}: ${item.ratio}%`}
                  ></div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              {SERVICE_RATIOS.map((item, i) => {
                const estOrders = [738, 1449, 448][i];
                const growth = ['+11.2%', '+18.5%', '+6.4%'][i];

                return (
                  <div
                    key={i}
                    className="flex items-center justify-between bg-gray-50/80 rounded-xl px-3 py-2 border border-gray-100 text-xs hover:border-emerald-200 transition-colors"
                  >
                    <div className="flex items-center space-x-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: item.color }}
                      ></span>
                      <span className="text-gray-800 font-semibold">{item.name}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-emerald-600 font-semibold text-[10px] bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
                        {growth}
                      </span>
                      <span className="font-bold text-gray-800 font-mono">
                        {item.ratio}%
                      </span>
                      <span className="text-gray-400 text-[10px] font-mono">
                        {estOrders}单
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-gray-400">
        <span>核心驱动力：康复理疗类占比最高（55%），保持高速复合增长</span>
        <span
          onClick={onViewOrders}
          className="text-emerald-600 hover:underline cursor-pointer ml-2 shrink-0"
        >
          订单明细 &rarr;
        </span>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------
 * 4. 用户标签分布 (User Tags Section)
 * ------------------------------------------------------------- */
interface UserTagSectionProps {
  userTagChartMode: 'radar' | 'grid';
  setUserTagChartMode: (mode: 'radar' | 'grid') => void;
  hoveredTagIdx: number | null;
  setHoveredTagIdx: (idx: number | null) => void;
  onViewTagSystem?: () => void;
}

export const UserTagSection: React.FC<UserTagSectionProps> = ({
  userTagChartMode,
  setUserTagChartMode,
  hoveredTagIdx,
  setHoveredTagIdx,
  onViewTagSystem,
}) => {
  return (
    <div className="theme-card rounded-2xl p-5 border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-4 bg-[#10b981] rounded-full"></span>
            <h2 className="text-sm font-bold text-gray-800">用户标签分布</h2>
            <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full font-medium">
              6大健康画像
            </span>
          </div>
          <div className="flex items-center bg-gray-100/80 p-0.5 rounded-lg border border-gray-200/60">
            <button
              type="button"
              onClick={() => setUserTagChartMode('radar')}
              className={`flex items-center space-x-1 text-[11px] px-2.5 py-1 rounded-md font-medium transition-all ${
                userTagChartMode === 'radar'
                  ? 'bg-white text-emerald-600 shadow-xs font-semibold'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              title="六轴雷达图"
            >
              <Compass className="w-3 h-3" />
              <span>雷达</span>
            </button>
            <button
              type="button"
              onClick={() => setUserTagChartMode('grid')}
              className={`flex items-center space-x-1 text-[11px] px-2.5 py-1 rounded-md font-medium transition-all ${
                userTagChartMode === 'grid'
                  ? 'bg-white text-emerald-600 shadow-xs font-semibold'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              title="热力标签网格"
            >
              <LayoutGrid className="w-3 h-3" />
              <span>卡阵</span>
            </button>
          </div>
        </div>

        {userTagChartMode === 'radar' ? (
          <div className="flex flex-col items-center justify-between py-1">
            <div className="relative w-full max-w-[260px] h-[160px] flex items-center justify-center">
              <svg viewBox="0 0 240 170" className="w-full h-full overflow-visible">
                <defs>
                  <linearGradient id="radarFillGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#059669" stopOpacity="0.15" />
                  </linearGradient>
                </defs>

                {[0.25, 0.5, 0.75, 1.0].map((scale, gIdx) => {
                  const gridPts = USER_TAGS.map((_, i) => {
                    const angle = -Math.PI / 2 + (i * Math.PI) / 3;
                    const x = 120 + 55 * scale * Math.cos(angle);
                    const y = 85 + 55 * scale * Math.sin(angle);
                    return `${x.toFixed(1)},${y.toFixed(1)}`;
                  }).join(' ');

                  return (
                    <polygon
                      key={gIdx}
                      points={gridPts}
                      fill="none"
                      stroke={gIdx === 3 ? '#cbd5e1' : '#f1f5f9'}
                      strokeWidth={gIdx === 3 ? '1.2' : '1'}
                      strokeDasharray={gIdx === 3 ? 'none' : '2 2'}
                    />
                  );
                })}

                {USER_TAGS.map((_, i) => {
                  const angle = -Math.PI / 2 + (i * Math.PI) / 3;
                  const x2 = 120 + 55 * Math.cos(angle);
                  const y2 = 85 + 55 * Math.sin(angle);
                  return (
                    <line
                      key={i}
                      x1="120"
                      y1="85"
                      x2={x2.toFixed(1)}
                      y2={y2.toFixed(1)}
                      stroke="#e2e8f0"
                      strokeWidth="1"
                    />
                  );
                })}

                {(() => {
                  const polygonPts = USER_TAGS.map((tag, i) => {
                    const scale = tag.percentage / 100;
                    const angle = -Math.PI / 2 + (i * Math.PI) / 3;
                    const x = 120 + 55 * scale * Math.cos(angle);
                    const y = 85 + 55 * scale * Math.sin(angle);
                    return `${x.toFixed(1)},${y.toFixed(1)}`;
                  }).join(' ');

                  return (
                    <polygon
                      points={polygonPts}
                      fill="url(#radarFillGrad)"
                      stroke="#10b981"
                      strokeWidth="2.2"
                      className="transition-all duration-300 drop-shadow-xs"
                    />
                  );
                })()}

                {USER_TAGS.map((tag, i) => {
                  const scale = tag.percentage / 100;
                  const angle = -Math.PI / 2 + (i * Math.PI) / 3;
                  const x = 120 + 55 * scale * Math.cos(angle);
                  const y = 85 + 55 * scale * Math.sin(angle);

                  const lblScale = 1.32;
                  const lx = 120 + 55 * lblScale * Math.cos(angle);
                  const ly = 85 + 55 * lblScale * Math.sin(angle);

                  let anchor: 'middle' | 'start' | 'end' = 'middle';
                  if (Math.abs(Math.cos(angle)) > 0.3) {
                    anchor = Math.cos(angle) > 0 ? 'start' : 'end';
                  }

                  const isHovered = hoveredTagIdx === i;

                  return (
                    <g
                      key={i}
                      className="cursor-pointer"
                      onMouseEnter={() => setHoveredTagIdx(i)}
                      onMouseLeave={() => setHoveredTagIdx(null)}
                    >
                      <circle
                        cx={x.toFixed(1)}
                        cy={y.toFixed(1)}
                        r={isHovered ? '5' : '3.5'}
                        fill={isHovered ? '#059669' : '#10b981'}
                        stroke="#ffffff"
                        strokeWidth="2"
                        className="transition-all duration-200"
                      />
                      {isHovered && (
                        <circle
                          cx={x.toFixed(1)}
                          cy={y.toFixed(1)}
                          r="8"
                          fill="#10b981"
                          opacity="0.25"
                          className="animate-ping"
                        />
                      )}
                      <text
                        x={lx.toFixed(1)}
                        y={ly.toFixed(1)}
                        textAnchor={anchor}
                        dominantBaseline="central"
                        className={`text-[10px] transition-colors ${
                          isHovered
                            ? 'fill-emerald-600 font-bold'
                            : 'fill-gray-600 font-medium'
                        }`}
                      >
                        {tag.name}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            <div className="w-full bg-emerald-50/80 border border-emerald-100 rounded-xl py-1.5 px-3 flex items-center justify-between text-xs mt-2">
              {hoveredTagIdx !== null ? (
                <>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="font-semibold text-gray-800">
                      {USER_TAGS[hoveredTagIdx].name}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-500 font-mono text-[11px]">
                      {USER_TAGS[hoveredTagIdx].count}人
                    </span>
                    <span className="font-bold text-emerald-700">
                      {USER_TAGS[hoveredTagIdx].percentage}% 覆盖率
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <span className="text-gray-500 text-[11px]">
                    受众核心分布 (6大健康慢病标签)
                  </span>
                  <span className="text-emerald-700 font-bold text-[11px]">
                    最高频: 冠心病 (95%)
                  </span>
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 py-1">
            {USER_TAGS.map((tag, idx) => {
              const colors = [
                { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', pill: 'bg-emerald-500' },
                { bg: 'bg-rose-50', border: 'border-rose-200', text: 'text-rose-700', pill: 'bg-rose-500' },
                { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', pill: 'bg-amber-500' },
                { bg: 'bg-teal-50', border: 'border-teal-200', text: 'text-teal-700', pill: 'bg-teal-500' },
                { bg: 'bg-indigo-50', border: 'border-indigo-200', text: 'text-indigo-700', pill: 'bg-indigo-500' },
                { bg: 'bg-violet-50', border: 'border-violet-200', text: 'text-violet-700', pill: 'bg-violet-500' },
              ][idx % 6];

              return (
                <div
                  key={idx}
                  className={`${colors.bg} rounded-xl p-2.5 border ${colors.border} flex flex-col justify-between transition-transform hover:-translate-y-0.5 cursor-pointer`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center space-x-1.5">
                      <span className={`w-2 h-2 rounded-full ${colors.pill}`}></span>
                      <span className={`font-bold text-xs ${colors.text}`}>
                        {tag.name}
                      </span>
                    </div>
                    <span className="text-[10px] text-gray-500 font-mono font-medium">
                      {tag.count}人
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-[10px] text-gray-500">
                      <span>覆盖率</span>
                      <span className="font-bold text-gray-800">{tag.percentage}%</span>
                    </div>
                    <div className="w-full bg-white/80 h-1.5 rounded-full overflow-hidden border border-black/5">
                      <div
                        className={`h-full rounded-full ${colors.pill}`}
                        style={{ width: `${tag.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-gray-400">
        <span>重点关照：冠心病标签覆盖度达95%（8,474人），需加强定期巡诊安排</span>
        <span
          onClick={onViewTagSystem}
          className="text-emerald-600 hover:underline cursor-pointer ml-2 shrink-0"
        >
          标签体系 &rarr;
        </span>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------
 * 5. 支付榜TOP5商品排行 (Product Leaderboard Section)
 * ------------------------------------------------------------- */
interface ProductRankSectionProps {
  productRankMode: 'leaderboard' | 'card';
  setProductRankMode: (mode: 'leaderboard' | 'card') => void;
  onViewAll?: () => void;
}

export const ProductRankSection: React.FC<ProductRankSectionProps> = ({
  productRankMode,
  setProductRankMode,
  onViewAll,
}) => {
  return (
    <div className="theme-card rounded-2xl p-5 border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-4 bg-amber-500 rounded-full"></span>
            <Trophy className="w-4 h-4 text-amber-500" />
            <h2 className="text-sm font-bold text-gray-800">支付榜TOP5商品排行</h2>
            <span className="text-[10px] bg-amber-50 text-amber-600 border border-amber-200/60 px-2 py-0.5 rounded-full font-medium">
              本月热销
            </span>
          </div>

          <div className="flex items-center bg-gray-100/80 p-0.5 rounded-lg text-xs">
            <button
              type="button"
              onClick={() => setProductRankMode('leaderboard')}
              className={`flex items-center space-x-1 px-2.5 py-1 rounded-md transition-all ${
                productRankMode === 'leaderboard'
                  ? 'bg-white text-amber-600 font-semibold shadow-xs'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>榜单</span>
            </button>
            <button
              type="button"
              onClick={() => setProductRankMode('card')}
              className={`flex items-center space-x-1 px-2.5 py-1 rounded-md transition-all ${
                productRankMode === 'card'
                  ? 'bg-white text-amber-600 font-semibold shadow-xs'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>海报</span>
            </button>
          </div>
        </div>

        {productRankMode === 'leaderboard' && (
          <div className="space-y-2.5">
            {TOP_PRODUCTS.map((prod) => {
              const maxOrders = TOP_PRODUCTS[0]?.orderCount || 1;
              const percent = Math.round((prod.orderCount / maxOrders) * 100);

              let rankBadgeStyle = 'bg-gray-100 text-gray-500';
              let rankIcon = null;
              if (prod.rank === 1) {
                rankBadgeStyle =
                  'bg-gradient-to-r from-amber-400 to-yellow-500 text-white shadow-xs font-bold';
                rankIcon = <Crown className="w-3 h-3 text-white fill-white inline-block mr-0.5" />;
              } else if (prod.rank === 2) {
                rankBadgeStyle =
                  'bg-gradient-to-r from-slate-400 to-slate-500 text-white font-bold';
              } else if (prod.rank === 3) {
                rankBadgeStyle =
                  'bg-gradient-to-r from-amber-600 to-amber-700 text-white font-bold';
              }

              return (
                <div
                  key={prod.rank}
                  className="group relative bg-gray-50/50 hover:bg-white rounded-xl p-2.5 border border-gray-100 hover:border-amber-200 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-7 h-7 shrink-0 rounded-lg flex items-center justify-center text-xs ${rankBadgeStyle}`}
                    >
                      {rankIcon}
                      <span>{prod.rank}</span>
                    </div>

                    <div className="relative shrink-0">
                      <img
                        src={prod.image}
                        alt={prod.title}
                        className="w-12 h-11 object-cover rounded-lg bg-gray-100 group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-xs font-semibold text-gray-800 truncate group-hover:text-amber-600 transition-colors">
                          {prod.title}
                        </h3>
                        <span className="text-xs font-bold text-gray-900 ml-2 shrink-0">
                          {prod.orderCount.toLocaleString()}{' '}
                          <span className="text-[10px] font-normal text-gray-400">单</span>
                        </span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-gray-200/70 h-2 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-amber-400 to-emerald-500 rounded-full transition-all duration-500"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                        <span className="text-[10px] text-gray-400 font-mono w-8 text-right">
                          {percent}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {productRankMode === 'card' && (
          <div className="grid grid-cols-2 gap-2.5">
            {TOP_PRODUCTS.map((prod) => (
              <div
                key={prod.rank}
                className={`relative rounded-xl border p-3 flex flex-col justify-between transition-all duration-300 ${
                  prod.rank === 1
                    ? 'col-span-2 bg-gradient-to-r from-amber-50/80 via-white to-amber-50/30 border-amber-200 shadow-xs'
                    : 'bg-white border-gray-100 hover:border-amber-200 hover:shadow-xs'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      prod.rank === 1
                        ? 'bg-amber-500 text-white shadow-xs'
                        : prod.rank === 2
                        ? 'bg-slate-500 text-white'
                        : prod.rank === 3
                        ? 'bg-amber-700 text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    TOP {prod.rank}
                  </span>
                  <span className="text-xs font-bold text-amber-600">
                    {prod.orderCount} 笔订单
                  </span>
                </div>

                <div className="flex items-center space-x-2.5">
                  <img
                    src={prod.image}
                    alt={prod.title}
                    className="w-12 h-12 object-cover rounded-lg bg-gray-100 shrink-0"
                    loading="lazy"
                  />
                  <p className="text-xs font-medium text-gray-800 line-clamp-2">
                    {prod.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-gray-50 flex items-center justify-between text-[11px] text-gray-400">
        <span>数据更新时间：今天 18:30</span>
        <span
          onClick={onViewAll}
          className="text-amber-600 hover:underline cursor-pointer"
        >
          查看完整商品榜单 &rarr;
        </span>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------
 * 6. 服务人员业绩TOP5排行 (Staff Leaderboard Section)
 * ------------------------------------------------------------- */
interface StaffRankSectionProps {
  staffRankMode: 'leaderboard' | 'card';
  setStaffRankMode: (mode: 'leaderboard' | 'card') => void;
  onViewAll?: () => void;
}

export const StaffRankSection: React.FC<StaffRankSectionProps> = ({
  staffRankMode,
  setStaffRankMode,
  onViewAll,
}) => {
  return (
    <div className="theme-card rounded-2xl p-5 border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-4 bg-emerald-500 rounded-full"></span>
            <Award className="w-4 h-4 text-emerald-500" />
            <h2 className="text-sm font-bold text-gray-800">服务人员业绩TOP5排行</h2>
            <span className="text-[10px] bg-emerald-50 text-emerald-600 border border-emerald-200/60 px-2 py-0.5 rounded-full font-medium">
              五星先锋
            </span>
          </div>

          <div className="flex items-center bg-gray-100/80 p-0.5 rounded-lg text-xs">
            <button
              type="button"
              onClick={() => setStaffRankMode('leaderboard')}
              className={`flex items-center space-x-1 px-2.5 py-1 rounded-md transition-all ${
                staffRankMode === 'leaderboard'
                  ? 'bg-white text-emerald-600 font-semibold shadow-xs'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>榜单</span>
            </button>
            <button
              type="button"
              onClick={() => setStaffRankMode('card')}
              className={`flex items-center space-x-1 px-2.5 py-1 rounded-md transition-all ${
                staffRankMode === 'card'
                  ? 'bg-white text-emerald-600 font-semibold shadow-xs'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>名师</span>
            </button>
          </div>
        </div>

        {staffRankMode === 'leaderboard' && (
          <div className="space-y-2.5">
            {TOP_STAFF.map((staff) => {
              const maxStaffOrders = TOP_STAFF[0]?.workOrderCount || 1;
              const percent = Math.round((staff.workOrderCount / maxStaffOrders) * 100);

              let ringStyle = 'ring-1 ring-gray-200';
              let rankPill = 'bg-gray-100 text-gray-600';
              if (staff.rank === 1) {
                ringStyle = 'ring-2 ring-amber-400 shadow-xs shadow-amber-200';
                rankPill = 'bg-gradient-to-r from-amber-400 to-yellow-500 text-white font-bold';
              } else if (staff.rank === 2) {
                ringStyle = 'ring-2 ring-slate-300';
                rankPill = 'bg-gradient-to-r from-slate-400 to-slate-500 text-white font-bold';
              } else if (staff.rank === 3) {
                ringStyle = 'ring-2 ring-amber-600/40';
                rankPill = 'bg-gradient-to-r from-amber-600 to-amber-700 text-white font-bold';
              }

              return (
                <div
                  key={staff.rank}
                  className="group bg-gray-50/50 hover:bg-white rounded-xl p-2.5 border border-gray-100 hover:border-emerald-200 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-6 h-6 shrink-0 rounded-full flex items-center justify-center text-xs ${rankPill}`}
                    >
                      {staff.rank}
                    </div>

                    <div className="relative shrink-0">
                      <img
                        src={staff.avatar}
                        alt={staff.name}
                        className={`w-10 h-10 object-cover rounded-full bg-gray-100 ${ringStyle}`}
                        loading="lazy"
                      />
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 ring-2 ring-white rounded-full"></span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center space-x-2 truncate">
                          <span className="text-xs font-bold text-gray-800 group-hover:text-emerald-600 transition-colors">
                            {staff.name}
                          </span>
                          <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-100 px-1.5 py-0.2 rounded truncate">
                            {staff.serviceType}
                          </span>
                        </div>
                        <span className="text-xs font-bold text-gray-900 ml-2 shrink-0">
                          {staff.workOrderCount.toLocaleString()}{' '}
                          <span className="text-[10px] font-normal text-gray-400">工单</span>
                        </span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-gray-200/70 h-2 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-emerald-400 to-teal-600 rounded-full transition-all duration-500"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                        <span className="text-[10px] text-emerald-600 font-semibold flex items-center shrink-0">
                          <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400 mr-0.5" />
                          99.8%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {staffRankMode === 'card' && (
          <div className="grid grid-cols-2 gap-2.5">
            {TOP_STAFF.map((staff) => (
              <div
                key={staff.rank}
                className={`relative rounded-xl border p-3 flex items-center space-x-3 transition-all duration-300 ${
                  staff.rank === 1
                    ? 'col-span-2 bg-gradient-to-r from-emerald-50/80 via-white to-teal-50/30 border-emerald-200 shadow-xs'
                    : 'bg-white border-gray-100 hover:border-emerald-200 hover:shadow-xs'
                }`}
              >
                <div className="relative shrink-0">
                  <img
                    src={staff.avatar}
                    alt={staff.name}
                    className="w-11 h-11 object-cover rounded-full ring-2 ring-emerald-400/40"
                    loading="lazy"
                  />
                  <span className="absolute -top-1 -left-1 w-5 h-5 bg-amber-400 text-white rounded-full text-[10px] font-bold flex items-center justify-center shadow-xs">
                    {staff.rank}
                  </span>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-800 truncate">
                      {staff.name}
                    </span>
                    <span className="text-[11px] font-bold text-emerald-600">
                      {staff.workOrderCount} 单
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-500 truncate mt-0.5">
                    {staff.serviceType}
                  </p>
                  <div className="flex items-center text-[10px] text-amber-500 font-medium mt-1">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400 mr-0.5" />
                    <span>5.0 满分好评</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-gray-50 flex items-center justify-between text-[11px] text-gray-400">
        <span>考核周期：2026年10月度</span>
        <span
          onClick={onViewAll}
          className="text-emerald-600 hover:underline cursor-pointer"
        >
          服务团队风采 &rarr;
        </span>
      </div>
    </div>
  );
};
