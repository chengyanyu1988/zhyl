import React, { useState } from 'react';
import {
  BarChart3,
  LineChart,
  Activity,
} from 'lucide-react';
import { USER_TREND_DATA } from '../../data/mockData';

export const UserTrendCard: React.FC = () => {
  const [hoveredPointIndex, setHoveredPointIndex] = useState<number>(3);
  const [trendChartMode, setTrendChartMode] = useState<'column' | 'area' | 'step'>('column');

  const chartWidth = 960;
  const chartHeight = 220;
  const paddingX = 40;
  const paddingTop = 25;
  const paddingBottom = 35;
  const plotWidth = chartWidth - paddingX * 2;
  const plotHeight = chartHeight - paddingTop - paddingBottom;

  const minY = 1000;
  const maxY = 3800;

  const points = USER_TREND_DATA.map((item, idx) => {
    const x = paddingX + (idx / (USER_TREND_DATA.length - 1)) * plotWidth;
    const normalizedY = (item.value - minY) / (maxY - minY);
    const y = paddingTop + (1 - normalizedY) * plotHeight;
    return { x, y, value: item.value, date: item.date };
  });

  const activePoint = points[hoveredPointIndex] || points[0];

  const buildSmoothPath = (pts: { x: number; y: number }[]) => {
    if (pts.length === 0) return '';
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[Math.max(i - 1, 0)];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[Math.min(i + 2, pts.length - 1)];

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
    }
    return d;
  };

  const smoothLinePath = buildSmoothPath(points);
  const smoothAreaPath = `${smoothLinePath} L ${points[points.length - 1].x} ${
    paddingTop + plotHeight
  } L ${points[0].x} ${paddingTop + plotHeight} Z`;

  const buildStepPath = (pts: { x: number; y: number }[]) => {
    if (pts.length === 0) return '';
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const curr = pts[i];
      const next = pts[i + 1];
      const midX = (curr.x + next.x) / 2;
      d += ` L ${midX.toFixed(1)} ${curr.y.toFixed(1)} L ${midX.toFixed(1)} ${next.y.toFixed(1)} L ${next.x.toFixed(1)} ${next.y.toFixed(1)}`;
    }
    return d;
  };

  const stepLinePath = buildStepPath(points);
  const stepAreaPath = `${stepLinePath} L ${points[points.length - 1].x} ${
    paddingTop + plotHeight
  } L ${points[0].x} ${paddingTop + plotHeight} Z`;

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between h-full">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <span className="w-1.5 h-4 bg-emerald-500 rounded-full"></span>
          <h2 className="text-sm font-bold text-slate-800">用户趋势统计</h2>
          <span className="text-[11px] text-emerald-700 bg-emerald-50 border border-emerald-200/80 font-medium px-2 py-0.5 rounded-full">
            日均: 2,963 人
          </span>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200/60">
            <button
              onClick={() => setTrendChartMode('column')}
              className={`flex items-center space-x-1 text-[11px] px-2.5 py-0.5 rounded-md font-medium transition-all ${
                trendChartMode === 'column'
                  ? 'bg-white text-emerald-600 shadow-xs font-semibold'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
              title="立体柱状图"
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>柱状图</span>
            </button>
            <button
              onClick={() => setTrendChartMode('area')}
              className={`flex items-center space-x-1 text-[11px] px-2.5 py-0.5 rounded-md font-medium transition-all ${
                trendChartMode === 'area'
                  ? 'bg-white text-emerald-600 shadow-xs font-semibold'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
              title="平滑曲线图"
            >
              <LineChart className="w-3.5 h-3.5" />
              <span>曲线图</span>
            </button>
            <button
              onClick={() => setTrendChartMode('step')}
              className={`flex items-center space-x-1 text-[11px] px-2.5 py-0.5 rounded-md font-medium transition-all ${
                trendChartMode === 'step'
                  ? 'bg-white text-emerald-600 shadow-xs font-semibold'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
              title="阶梯波动图"
            >
              <Activity className="w-3.5 h-3.5" />
              <span>阶梯图</span>
            </button>
          </div>

          <div className="text-xs text-slate-400 font-mono hidden sm:block">
            2026-10-01 ~ 2026-10-20
          </div>
        </div>
      </div>

      {/* Legend Indicator & Summary stats */}
      <div className="flex items-center justify-between mb-2 px-1 text-xs">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
          <span className="text-slate-600 font-medium">新增用户数量 (人/日)</span>
        </div>
        <div className="flex items-center space-x-3 text-[11px]">
          <span className="text-emerald-700 font-medium">
            峰值: <strong className="font-mono">3,480</strong> (10-20)
          </span>
          <span className="text-amber-700 font-medium">
            谷值: <strong className="font-mono">1,520</strong> (10-12)
          </span>
        </div>
      </div>

      {/* Chart SVG */}
      <div className="relative w-full overflow-hidden flex-1">
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

          {/* Column Mode */}
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
                      opacity="0.5"
                    />
                    <rect
                      x={barX}
                      y={pt.y}
                      width={barWidth}
                      height={barHeight}
                      fill={isHovered ? 'url(#trendBarHoverGrad)' : 'url(#trendBarGrad)'}
                      rx="6"
                      className="transition-all duration-300"
                      filter={isHovered ? 'drop-shadow(0 4px 6px rgba(16, 185, 129, 0.3))' : 'none'}
                    />
                    <text
                      x={pt.x}
                      y={pt.y - 8}
                      textAnchor="middle"
                      fill={isHovered ? '#059669' : '#64748b'}
                      fontSize={isHovered ? '12' : '10'}
                      fontWeight={isHovered ? '700' : '500'}
                      fontFamily="monospace"
                    >
                      {pt.value}
                    </text>
                  </g>
                );
              })}
            </g>
          )}

          {/* Area Mode */}
          {trendChartMode === 'area' && (
            <g>
              <path d={smoothAreaPath} fill="url(#trendAreaGrad)" />
              <path
                d={smoothLinePath}
                fill="none"
                stroke="#10b981"
                strokeWidth="3.5"
                strokeLinecap="round"
                className="transition-all duration-500"
              />
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
              {points.map((pt, idx) => (
                <g
                  key={idx}
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredPointIndex(idx)}
                >
                  <circle cx={pt.x} cy={pt.y} r="4.5" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
                  <rect x={pt.x - 30} y={paddingTop} width="60" height={plotHeight + 20} fill="transparent" />
                </g>
              ))}
            </g>
          )}

          {/* Step Mode */}
          {trendChartMode === 'step' && (
            <g>
              <path d={stepAreaPath} fill="url(#trendAreaGrad)" />
              <path
                d={stepLinePath}
                fill="none"
                stroke="#10b981"
                strokeWidth="3"
                strokeLinecap="square"
              />
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
              {points.map((pt, idx) => (
                <g
                  key={idx}
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredPointIndex(idx)}
                >
                  <circle cx={pt.x} cy={pt.y} r="4.5" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
                  <rect x={pt.x - 30} y={paddingTop} width="60" height={plotHeight + 20} fill="transparent" />
                </g>
              ))}
            </g>
          )}
        </svg>

        {/* X Axis Date Labels */}
        <div className="flex justify-between px-10 pt-1 text-[11px] text-slate-400">
          {USER_TREND_DATA.map((d, i) => (
            <span
              key={i}
              className={`transition-colors cursor-pointer ${
                hoveredPointIndex === i ? 'text-emerald-600 font-bold' : 'hover:text-slate-600'
              }`}
              onClick={() => setHoveredPointIndex(i)}
            >
              {d.date.slice(5)}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
