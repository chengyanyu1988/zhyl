import React, { useState } from 'react';

export interface CurveDataPoint {
  date: string;
  [key: string]: number | string;
}

export interface CurveSeries {
  key: string;
  name: string;
  stroke: string;
  fill?: string;
  gradientId: string;
  unit: string;
  target?: number;
}

export interface SmoothCurveChartProps {
  title: string;
  subtitle?: string;
  data: CurveDataPoint[];
  series: CurveSeries[];
  minY?: number;
  maxY?: number;
  referenceLine?: {
    value: number;
    label: string;
    color?: string;
  };
  normalBand?: {
    min: number;
    max: number;
    label?: string;
  };
  footerInfo?: React.ReactNode;
}

export const SmoothCurveChart: React.FC<SmoothCurveChartProps> = ({
  title,
  subtitle,
  data,
  series,
  minY: customMinY,
  maxY: customMaxY,
  referenceLine,
  normalBand,
  footerInfo,
}) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  // SVG canvas dimensions
  const svgWidth = 600;
  const svgHeight = 210;
  const paddingLeft = 45;
  const paddingRight = 25;
  const paddingTop = 25;
  const paddingBottom = 35;

  const plotWidth = svgWidth - paddingLeft - paddingRight;
  const plotHeight = svgHeight - paddingTop - paddingBottom;

  // Calculate dynamic min and max Y if not provided
  let allValues: number[] = [];
  data.forEach((d) => {
    series.forEach((s) => {
      const val = Number(d[s.key]);
      if (!isNaN(val)) allValues.push(val);
    });
  });
  if (referenceLine) allValues.push(referenceLine.value);
  if (normalBand) {
    allValues.push(normalBand.min);
    allValues.push(normalBand.max);
  }

  const rawMin = allValues.length > 0 ? Math.min(...allValues) : 0;
  const rawMax = allValues.length > 0 ? Math.max(...allValues) : 100;
  const buffer = (rawMax - rawMin) * 0.15 || 5;

  const effectiveMinY = customMinY !== undefined ? customMinY : Math.floor(rawMin - buffer);
  const effectiveMaxY = customMaxY !== undefined ? customMaxY : Math.ceil(rawMax + buffer);
  const rangeY = effectiveMaxY - effectiveMinY || 1;

  const getX = (index: number) => {
    if (data.length <= 1) return paddingLeft + plotWidth / 2;
    return paddingLeft + (index / (data.length - 1)) * plotWidth;
  };

  const getY = (val: number) => {
    const clamped = Math.max(effectiveMinY, Math.min(effectiveMaxY, val));
    return paddingTop + plotHeight - ((clamped - effectiveMinY) / rangeY) * plotHeight;
  };

  // Generate cubic bezier smooth curve path
  const generateSmoothPath = (points: { x: number; y: number }[]) => {
    if (points.length === 0) return '';
    if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;

    let path = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i === 0 ? 0 : i - 1];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[i + 2] || p2;

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      path += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
    }
    return path;
  };

  // Generate grid ticks (4 ticks)
  const yTicks = [
    effectiveMinY,
    Math.round(effectiveMinY + rangeY * 0.33),
    Math.round(effectiveMinY + rangeY * 0.66),
    effectiveMaxY,
  ];

  return (
    <div className="bg-gray-50/70 p-4 rounded-xl border border-gray-100 flex flex-col justify-between">
      {/* 头部标题与图例 */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div>
          <span className="font-semibold text-gray-700 text-xs">{title}</span>
          {subtitle && (
            <span className="text-[11px] text-gray-400 ml-2">{subtitle}</span>
          )}
        </div>
        <div className="flex items-center space-x-3 text-[11px]">
          {series.map((s) => (
            <div key={s.key} className="flex items-center space-x-1.5">
              <span
                className="w-2.5 h-2.5 rounded-full inline-block shrink-0 shadow-2xs"
                style={{ backgroundColor: s.stroke }}
              />
              <span className="text-gray-600 font-medium">{s.name}</span>
            </div>
          ))}
          {referenceLine && (
            <div className="flex items-center space-x-1 text-gray-400">
              <span className="w-3 border-b border-dashed border-gray-400 inline-block" />
              <span>{referenceLine.label}</span>
            </div>
          )}
        </div>
      </div>

      {/* SVG 曲线图核心绘制区 */}
      <div className="relative w-full overflow-hidden select-none">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-44 drop-shadow-2xs overflow-visible"
        >
          <defs>
            {series.map((s) => (
              <linearGradient
                key={s.gradientId}
                id={s.gradientId}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor={s.fill || s.stroke} stopOpacity="0.32" />
                <stop offset="80%" stopColor={s.fill || s.stroke} stopOpacity="0.04" />
                <stop offset="100%" stopColor={s.fill || s.stroke} stopOpacity="0" />
              </linearGradient>
            ))}
          </defs>

          {/* 正常安全范围色带 */}
          {normalBand && (
            <rect
              x={paddingLeft}
              y={getY(normalBand.max)}
              width={plotWidth}
              height={Math.max(4, getY(normalBand.min) - getY(normalBand.max))}
              fill="#10b981"
              fillOpacity="0.08"
              rx="4"
            />
          )}

          {/* 背景横向参考虚线与刻度值 */}
          {yTicks.map((tick, i) => {
            const yPos = getY(tick);
            return (
              <g key={i}>
                <line
                  x1={paddingLeft}
                  y1={yPos}
                  x2={svgWidth - paddingRight}
                  y2={yPos}
                  stroke="#e5e7eb"
                  strokeDasharray={i === 0 || i === yTicks.length - 1 ? 'none' : '3 3'}
                  strokeWidth="1"
                />
                <text
                  x={paddingLeft - 8}
                  y={yPos + 3.5}
                  textAnchor="end"
                  fontSize="10"
                  fill="#9ca3af"
                  fontFamily="ui-monospace, monospace"
                >
                  {tick}
                </text>
              </g>
            );
          })}

          {/* 目标参考线 */}
          {referenceLine && (
            <g>
              <line
                x1={paddingLeft}
                y1={getY(referenceLine.value)}
                x2={svgWidth - paddingRight}
                y2={getY(referenceLine.value)}
                stroke={referenceLine.color || '#ef4444'}
                strokeDasharray="4 3"
                strokeWidth="1.5"
              />
              <text
                x={svgWidth - paddingRight + 4}
                y={getY(referenceLine.value) + 3}
                fontSize="9"
                fill={referenceLine.color || '#ef4444'}
                fontFamily="ui-monospace, monospace"
                fontWeight="600"
              >
                {referenceLine.value}
              </text>
            </g>
          )}

          {/* 曲线与渐变区域渲染 */}
          {series.map((s) => {
            const points = data.map((d, idx) => ({
              x: getX(idx),
              y: getY(Number(d[s.key]) || 0),
            }));

            const curvePath = generateSmoothPath(points);
            const areaPath = `${curvePath} L ${points[points.length - 1].x.toFixed(1)} ${(paddingTop + plotHeight).toFixed(1)} L ${points[0].x.toFixed(1)} ${(paddingTop + plotHeight).toFixed(1)} Z`;

            return (
              <g key={s.key}>
                {/* 渐变填充背景 */}
                <path d={areaPath} fill={`url(#${s.gradientId})`} />

                {/* 曲线高光主描边 */}
                <path
                  d={curvePath}
                  fill="none"
                  stroke={s.stroke}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* 数据节点圆点 */}
                {points.map((p, pIdx) => {
                  const val = data[pIdx][s.key];
                  const isHovered = hoverIndex === pIdx;
                  return (
                    <g key={pIdx}>
                      <circle
                        cx={p.x}
                        cy={p.y}
                        r={isHovered ? 5.5 : 3.5}
                        fill="#ffffff"
                        stroke={s.stroke}
                        strokeWidth={isHovered ? 2.5 : 2}
                        className="transition-all duration-150 cursor-pointer"
                      />
                      {/* 数值标签微标 */}
                      <text
                        x={p.x}
                        y={p.y - 8}
                        textAnchor="middle"
                        fontSize="9.5"
                        fontWeight="600"
                        fill={isHovered ? s.stroke : '#4b5563'}
                        fontFamily="ui-monospace, monospace"
                      >
                        {val}
                      </text>
                    </g>
                  );
                })}
              </g>
            );
          })}

          {/* X 轴日期刻度与感应竖线 */}
          {data.map((d, idx) => {
            const xPos = getX(idx);
            const isHovered = hoverIndex === idx;
            return (
              <g key={idx}>
                {isHovered && (
                  <line
                    x1={xPos}
                    y1={paddingTop}
                    x2={xPos}
                    y2={paddingTop + plotHeight}
                    stroke="#10b981"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                    opacity="0.6"
                  />
                )}
                <text
                  x={xPos}
                  y={svgHeight - 12}
                  textAnchor="middle"
                  fontSize="10"
                  fill={isHovered ? '#10b981' : '#6b7280'}
                  fontWeight={isHovered ? '600' : 'normal'}
                  fontFamily="ui-monospace, monospace"
                >
                  {d.date}
                </text>

                {/* 触发悬停的透明宽柱 */}
                <rect
                  x={xPos - plotWidth / (data.length * 2)}
                  y={paddingTop}
                  width={plotWidth / data.length}
                  height={plotHeight}
                  fill="transparent"
                  className="cursor-pointer"
                  onMouseEnter={() => setHoverIndex(idx)}
                  onMouseLeave={() => setHoverIndex(null)}
                />
              </g>
            );
          })}
        </svg>

        {/* 悬停浮层 Tooltip */}
        {hoverIndex !== null && data[hoverIndex] && (
          <div
            className="absolute z-20 pointer-events-none bg-gray-900/90 backdrop-blur-xs text-white text-[11px] rounded-lg py-1.5 px-2.5 shadow-lg space-y-1 transform -translate-x-1/2 -translate-y-full transition-all"
            style={{
              left: `${(getX(hoverIndex) / svgWidth) * 100}%`,
              top: '28px',
            }}
          >
            <div className="font-mono text-[10px] text-gray-300 border-b border-gray-700/60 pb-1">
              日期: 2026-{data[hoverIndex].date}
            </div>
            {series.map((s) => (
              <div key={s.key} className="flex items-center justify-between space-x-3">
                <span className="text-gray-300">{s.name}:</span>
                <span className="font-mono font-bold" style={{ color: s.stroke }}>
                  {data[hoverIndex][s.key]} {s.unit}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 底部摘要结论 */}
      {footerInfo && (
        <div className="flex items-center justify-between text-[11px] text-gray-500 mt-3 pt-2 border-t border-gray-100">
          {footerInfo}
        </div>
      )}
    </div>
  );
};
