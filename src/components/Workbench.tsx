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
  // Tooltip date for the user trend chart; default to 2026-09-12 (which shows 1520 in screenshot) or hovered index
  const [hoveredPointIndex, setHoveredPointIndex] = useState<number>(3);

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
    onNotice(`快捷入口：${itemTitle}（已汇总2026年9月数据）`);
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

  const activePoint = points[hoveredPointIndex] || points[3];

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Greeting Header */}
      <div className="flex items-center space-x-2">
        <span className="text-xl">👋</span>
        <h1 className="text-base font-semibold text-gray-800 tracking-tight">
          早上好！admin
        </h1>
      </div>

      {/* 4 KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {KPI_STATS.map((kpi, idx) => (
          <div
            key={idx}
            id={`kpi-card-${idx}`}
            className="bg-white rounded-xl p-5 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center justify-between"
          >
            <div className="flex flex-col space-y-2">
              <span className="text-xs text-gray-400 font-normal">
                {kpi.title}
              </span>
              <span className="text-2xl font-bold text-gray-800 tracking-tight">
                {kpi.value.toLocaleString()}
              </span>
              <div className="flex items-center">
                <span
                  className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${
                    kpi.isPositive
                      ? 'bg-emerald-50 text-emerald-600'
                      : 'bg-red-50 text-red-500'
                  }`}
                >
                  {kpi.changeText}
                </span>
              </div>
            </div>

            {/* Mini Visual Chart */}
            <div className="w-24 h-14 flex items-end justify-end">
              {kpi.type === 'green-line' && (
                <svg className="w-full h-full overflow-visible" viewBox="0 0 100 45">
                  <defs>
                    <linearGradient id="greenGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0 35 Q 25 10, 45 28 T 80 8 T 100 25 L 100 45 L 0 45 Z"
                    fill="url(#greenGrad)"
                  />
                  <path
                    d="M0 35 Q 25 10, 45 28 T 80 8 T 100 25"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              )}

              {kpi.type === 'yellow-bar' && (
                <div className="flex items-end justify-between w-full h-10 space-x-1.5 px-2">
                  <div className="w-2.5 h-6 bg-[#fed7aa] rounded-t-sm"></div>
                  <div className="w-2.5 h-10 bg-[#f59e0b] rounded-t-sm"></div>
                  <div className="w-2.5 h-8 bg-[#fbbf24] rounded-t-sm"></div>
                  <div className="w-2.5 h-5 bg-[#fde68a] rounded-t-sm"></div>
                  <div className="w-2.5 h-4 bg-[#fef3c7] rounded-t-sm"></div>
                </div>
              )}

              {kpi.type === 'red-line' && (
                <svg className="w-full h-full overflow-visible" viewBox="0 0 100 45">
                  <defs>
                    <linearGradient id="redGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ef4444" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#ef4444" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0 38 Q 25 30, 40 10 T 75 32 T 100 30 L 100 45 L 0 45 Z"
                    fill="url(#redGrad)"
                  />
                  <path
                    d="M0 38 Q 25 30, 40 10 T 75 32 T 100 30"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              )}

              {kpi.type === 'purple-bar' && (
                <div className="flex items-end justify-between w-full h-10 space-x-1.5 px-2">
                  <div className="w-2.5 h-3 bg-[#e0e7ff] rounded-t-sm"></div>
                  <div className="w-2.5 h-5 bg-[#c7d2fe] rounded-t-sm"></div>
                  <div className="w-2.5 h-7 bg-[#a5b4fc] rounded-t-sm"></div>
                  <div className="w-2.5 h-10 bg-[#6366f1] rounded-t-sm"></div>
                  <div className="w-2.5 h-9 bg-[#818cf8] rounded-t-sm"></div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Middle Row: 3 Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Card 1: 快捷入口 */}
        <div className="lg:col-span-4 bg-white rounded-xl p-5 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <span className="w-1.5 h-4 bg-[#10b981] rounded-full"></span>
              <h2 className="text-sm font-semibold text-gray-800">快捷入口</h2>
            </div>
            <button
              onClick={() => onNotice('快捷入口配置：当前已展示常用养老管理模块')}
              className="text-gray-300 hover:text-gray-500 transition-colors"
              title="配置入口"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-4 gap-y-4 gap-x-2 my-auto">
            {QUICK_ENTRANCES.map((item) => (
              <button
                key={item.id}
                id={`quick-entrance-${item.id}`}
                onClick={() => handleQuickEntranceClick(item.title)}
                className="flex flex-col items-center group cursor-pointer transition-transform hover:-translate-y-0.5"
              >
                <div
                  className={`w-11 h-11 rounded-full ${item.bgColor} ${item.textColor} flex items-center justify-center mb-1.5 transition-shadow group-hover:shadow-sm`}
                >
                  {getQuickIcon(item.iconName)}
                </div>
                <span className="text-[11px] text-gray-600 group-hover:text-[#10b981] transition-colors whitespace-nowrap">
                  {item.title}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Card 2: 用户标签分布 */}
        <div className="lg:col-span-4 bg-white rounded-xl p-5 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col">
          <div className="flex items-center space-x-2 mb-4">
            <span className="w-1.5 h-4 bg-[#10b981] rounded-full"></span>
            <h2 className="text-sm font-semibold text-gray-800">用户标签分布</h2>
          </div>

          <div className="flex flex-col justify-between flex-1 space-y-3 py-1">
            {USER_TAGS.map((tag, idx) => (
              <div key={idx} className="flex items-center text-xs">
                <span className="w-16 text-gray-500 shrink-0 text-left">
                  {tag.name}
                </span>
                <div className="flex-1 mx-3 bg-gray-100/90 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#10b981] h-full rounded-full transition-all duration-500"
                    style={{ width: `${tag.percentage}%` }}
                  ></div>
                </div>
                <span className="w-8 text-right font-medium text-gray-700">
                  {tag.count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Card 3: 各服务类型商品订单量占比 */}
        <div className="lg:col-span-4 bg-white rounded-xl p-5 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col">
          <div className="flex items-center space-x-2 mb-2">
            <span className="w-1.5 h-4 bg-[#10b981] rounded-full"></span>
            <h2 className="text-sm font-semibold text-gray-800">
              各服务类型商品订单量占比
            </h2>
          </div>

          <div className="flex items-center justify-around flex-1 py-3">
            {/* SVG Donut / Pie Chart */}
            <div className="relative w-36 h-36 shrink-0">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                {/* 康复理疗 55% -> yellow (#fbbf24) */}
                <circle
                  cx="50"
                  cy="50"
                  r="35"
                  fill="transparent"
                  stroke="#fbbf24"
                  strokeWidth="30"
                  strokeDasharray="120.95 219.91"
                  strokeDashoffset="0"
                />
                {/* 家政护理 28% -> teal/mint (#2dd4bf) */}
                <circle
                  cx="50"
                  cy="50"
                  r="35"
                  fill="transparent"
                  stroke="#2dd4bf"
                  strokeWidth="30"
                  strokeDasharray="61.57 219.91"
                  strokeDashoffset="-120.95"
                />
                {/* 上门体检 17% -> coral red (#f87171) */}
                <circle
                  cx="50"
                  cy="50"
                  r="35"
                  fill="transparent"
                  stroke="#f87171"
                  strokeWidth="30"
                  strokeDasharray="37.38 219.91"
                  strokeDashoffset="-182.52"
                />
              </svg>
            </div>

            {/* Legend */}
            <div className="flex flex-col space-y-3 pl-2">
              {SERVICE_RATIOS.map((item, i) => (
                <div key={i} className="flex items-center space-x-2 text-xs">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: item.color }}
                  ></span>
                  <span className="text-gray-600">{item.name}</span>
                  <span className="font-semibold text-gray-800 ml-1">
                    {item.ratio}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* User Trend Statistics (用户趋势统计) */}
      <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-4 bg-[#10b981] rounded-full"></span>
            <h2 className="text-sm font-semibold text-gray-800">用户趋势统计</h2>
          </div>
          <div className="text-xs text-gray-400 font-mono">
            统计周期: 2026-09-01 ~ 2026-09-18
          </div>
        </div>

        {/* Legend Indicator */}
        <div className="flex items-center justify-center space-x-2 mb-1">
          <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]"></span>
          <span className="text-xs text-gray-600 font-medium">新增用户数量</span>
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
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.45" />
                <stop offset="50%" stopColor="#10b981" stopOpacity="0.20" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.03" />
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
                    stroke="#f3f4f6"
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

            {/* Area Fill */}
            <path d={areaPath} fill="url(#trendAreaGrad)" />

            {/* Trend Spline Curve */}
            <path
              d={linePath}
              fill="none"
              stroke="#10b981"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Active Vertical Guideline and Dot */}
            {activePoint && (
              <g>
                <line
                  x1={activePoint.x}
                  y1={paddingTop}
                  x2={activePoint.x}
                  y2={paddingTop + plotHeight}
                  stroke="#10b981"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />
                <circle
                  cx={activePoint.x}
                  cy={activePoint.y}
                  r="6"
                  fill="#ffffff"
                  stroke="#10b981"
                  strokeWidth="3"
                />
              </g>
            )}

            {/* Interactive Data Dots & Hover zones */}
            {points.map((pt, idx) => (
              <g
                key={idx}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredPointIndex(idx)}
              >
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r="4"
                  fill="#10b981"
                  stroke="#ffffff"
                  strokeWidth="2"
                />
                {/* Hit area */}
                <rect
                  x={pt.x - 30}
                  y={paddingTop}
                  width="60"
                  height={plotHeight + 20}
                  fill="transparent"
                />
              </g>
            ))}
          </svg>

          {/* Active Tooltip Pill (matching screenshot style e.g. "1520") */}
          {activePoint && (
            <div
              className="absolute pointer-events-none transform -translate-x-1/2"
              style={{
                left: `${(activePoint.x / chartWidth) * 100}%`,
                top: `${(activePoint.y / chartHeight) * 100 - 16}%`,
              }}
            >
              <div className="bg-white/95 border border-emerald-400 text-emerald-700 font-bold text-xs px-2.5 py-0.5 rounded-full shadow-sm">
                {activePoint.value}
              </div>
            </div>
          )}

          {/* X Axis Date Labels (2026-09-01 ~ 2026-09-18) */}
          <div className="flex justify-between px-14 pt-1 text-[11px] text-gray-400">
            {USER_TREND_DATA.map((d, i) => (
              <span
                key={i}
                className={`transition-colors cursor-pointer ${
                  hoveredPointIndex === i
                    ? 'text-emerald-600 font-semibold'
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

      {/* Lower Row: 2 Ranking Tables (Image 2) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Left: 支付榜TOP5商品排行 */}
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
          <div className="flex items-center space-x-2 mb-4">
            <span className="w-1.5 h-4 bg-[#10b981] rounded-full"></span>
            <h2 className="text-sm font-semibold text-gray-800">
              支付榜TOP5商品排行
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-gray-400 border-b border-gray-50">
                  <th className="py-2.5 px-3 text-left font-normal w-16">序号</th>
                  <th className="py-2.5 px-3 text-left font-normal">商品信息</th>
                  <th className="py-2.5 px-3 text-right font-normal w-28">
                    支付订单数
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {TOP_PRODUCTS.map((prod) => (
                  <tr
                    key={prod.rank}
                    className="hover:bg-gray-50/60 transition-colors"
                  >
                    <td className="py-3 px-3">
                      <span className="font-semibold text-[#f59e0b]">
                        {prod.rank}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center space-x-3">
                        <img
                          src={prod.image}
                          alt={prod.title}
                          className="w-14 h-10 object-cover rounded-md bg-gray-100 shrink-0"
                          loading="lazy"
                        />
                        <span className="text-gray-700 font-medium line-clamp-1">
                          {prod.title}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-right font-medium text-gray-700">
                      {prod.orderCount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: 服务人员业绩TOP5排行 */}
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
          <div className="flex items-center space-x-2 mb-4">
            <span className="w-1.5 h-4 bg-[#10b981] rounded-full"></span>
            <h2 className="text-sm font-semibold text-gray-800">
              服务人员业绩TOP5排行
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-gray-400 border-b border-gray-50">
                  <th className="py-2.5 px-3 text-left font-normal w-16">序号</th>
                  <th className="py-2.5 px-3 text-left font-normal">个人信息</th>
                  <th className="py-2.5 px-3 text-center font-normal">服务类型</th>
                  <th className="py-2.5 px-3 text-right font-normal w-28">
                    服务工单数
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {TOP_STAFF.map((staff) => (
                  <tr
                    key={staff.rank}
                    className="hover:bg-gray-50/60 transition-colors"
                  >
                    <td className="py-3 px-3">
                      <span className="font-semibold text-[#f59e0b]">
                        {staff.rank}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center space-x-3">
                        <img
                          src={staff.avatar}
                          alt={staff.name}
                          className="w-8 h-8 object-cover rounded-full bg-gray-100 shrink-0 ring-1 ring-gray-200"
                          loading="lazy"
                        />
                        <span className="text-gray-700 font-medium">
                          {staff.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-center text-gray-500">
                      {staff.serviceType}
                    </td>
                    <td className="py-3 px-3 text-right font-medium text-gray-700">
                      {staff.workOrderCount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
