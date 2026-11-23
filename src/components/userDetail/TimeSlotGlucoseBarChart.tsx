import React, { useState } from 'react';

export interface TimeSlotGlucoseItem {
  slot: string;
  timeRange: string;
  value: number;
  count: number;
  status: '正常' | '达标' | '偏高' | '偏低';
  targetRange: string;
  advice: string;
}

export const DEFAULT_TIME_SLOT_DATA: TimeSlotGlucoseItem[] = [
  { slot: '凌晨', timeRange: '02:00~04:00', value: 5.4, count: 6, status: '正常', targetRange: '3.9 ~ 6.1', advice: '夜间代谢平稳，无低血糖风险' },
  { slot: '早餐前', timeRange: '06:30~07:30', value: 5.9, count: 16, status: '正常', targetRange: '3.9 ~ 6.1', advice: '空腹血糖控制优良' },
  { slot: '早餐后', timeRange: '08:30~09:30', value: 7.5, count: 16, status: '正常', targetRange: '4.4 ~ 7.8', advice: '早餐后升糖幅度正常达标' },
  { slot: '午餐前', timeRange: '11:00~12:00', value: 5.7, count: 15, status: '正常', targetRange: '3.9 ~ 6.1', advice: '午餐前指标稳定无明显饥饿感' },
  { slot: '午餐后', timeRange: '13:00~14:00', value: 7.8, count: 15, status: '达标', targetRange: '4.4 ~ 7.8', advice: '处于餐后目标上限边界，建议保持活动' },
  { slot: '晚餐前', timeRange: '17:00~18:00', value: 5.8, count: 14, status: '正常', targetRange: '3.9 ~ 6.1', advice: '晚餐前平稳' },
  { slot: '晚餐后', timeRange: '19:00~20:00', value: 8.0, count: 14, status: '偏高', targetRange: '4.4 ~ 7.8', advice: '轻微偏高0.2 mmol/L，建议晚餐减少精制主食' },
  { slot: '睡前', timeRange: '21:30~22:30', value: 6.2, count: 16, status: '正常', targetRange: '4.4 ~ 7.0', advice: '睡前水平理想，可平稳过夜' },
];

interface TimeSlotGlucoseBarChartProps {
  title?: string;
  subtitle?: string;
  data?: TimeSlotGlucoseItem[];
}

export const TimeSlotGlucoseBarChart: React.FC<TimeSlotGlucoseBarChartProps> = ({
  title = '各时段平均血糖分布 (mmol/L)',
  subtitle = '近期全时段 96 次测量汇总',
  data = DEFAULT_TIME_SLOT_DATA,
}) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  // SVG dimensions matching SmoothCurveChart
  const svgWidth = 600;
  const svgHeight = 210;
  const paddingLeft = 45;
  const paddingRight = 35;
  const paddingTop = 25;
  const paddingBottom = 40;
  const plotWidth = svgWidth - paddingLeft - paddingRight;
  const plotHeight = svgHeight - paddingTop - paddingBottom;

  const minY = 0;
  const maxY = 10;
  const rangeY = maxY - minY;

  const getY = (val: number) => {
    const clamped = Math.max(minY, Math.min(maxY, val));
    return paddingTop + plotHeight - ((clamped - minY) / rangeY) * plotHeight;
  };

  const yTicks = [0, 2, 4, 6, 8, 10];
  const barSlotWidth = plotWidth / data.length;
  const barWidth = 26;

  // Status colors
  const getStatusColor = (status: TimeSlotGlucoseItem['status']) => {
    switch (status) {
      case '偏高':
        return {
          bar: '#f59e0b',
          barHover: '#d97706',
          bg: '#fef3c7',
          text: '#b45309',
          gradientId: 'grad-bar-high',
        };
      case '达标':
        return {
          bar: '#0d9488',
          barHover: '#0f766e',
          bg: '#ccfbf1',
          text: '#0f766e',
          gradientId: 'grad-bar-target',
        };
      case '偏低':
        return {
          bar: '#3b82f6',
          barHover: '#1d4ed8',
          bg: '#dbeafe',
          text: '#1e40af',
          gradientId: 'grad-bar-low',
        };
      default:
        return {
          bar: '#10b981',
          barHover: '#059669',
          bg: '#d1fae5',
          text: '#047857',
          gradientId: 'grad-bar-normal',
        };
    }
  };

  const hoveredItem = hoverIndex !== null ? data[hoverIndex] : null;

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
          <div className="flex items-center space-x-1">
            <span className="w-2.5 h-2.5 rounded-xs bg-[#10b981] inline-block" />
            <span className="text-gray-600">正常</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="w-2.5 h-2.5 rounded-xs bg-[#f59e0b] inline-block" />
            <span className="text-gray-600">偏高</span>
          </div>
          <div className="flex items-center space-x-1 text-gray-400">
            <span className="w-3 border-b border-dashed border-amber-500 inline-block" />
            <span>警戒 7.8</span>
          </div>
        </div>
      </div>

      {/* SVG 柱状图绘制区 */}
      <div className="relative w-full overflow-hidden select-none">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-44 drop-shadow-2xs overflow-visible"
        >
          <defs>
            <linearGradient id="grad-bar-normal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
            <linearGradient id="grad-bar-high" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
            <linearGradient id="grad-bar-target" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2dd4bf" />
              <stop offset="100%" stopColor="#0d9488" />
            </linearGradient>
          </defs>

          {/* 正常达标安全色带 (3.9 ~ 7.8) */}
          <rect
            x={paddingLeft}
            y={getY(7.8)}
            width={plotWidth}
            height={Math.max(4, getY(3.9) - getY(7.8))}
            fill="#10b981"
            fillOpacity="0.06"
            rx="4"
          />

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
                  strokeDasharray={i === 0 ? 'none' : '3 3'}
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

          {/* 餐后目标警戒线 7.8 mmol/L */}
          <g>
            <line
              x1={paddingLeft}
              y1={getY(7.8)}
              x2={svgWidth - paddingRight}
              y2={getY(7.8)}
              stroke="#f59e0b"
              strokeDasharray="4 3"
              strokeWidth="1.5"
            />
            <text
              x={svgWidth - paddingRight + 4}
              y={getY(7.8) + 3}
              fontSize="9"
              fill="#f59e0b"
              fontFamily="ui-monospace, monospace"
              fontWeight="600"
            >
              7.8
            </text>
          </g>

          {/* 各时段柱子与标注 */}
          {data.map((item, idx) => {
            const centerX = paddingLeft + idx * barSlotWidth + barSlotWidth / 2;
            const barX = centerX - barWidth / 2;
            const barY = getY(item.value);
            const barH = paddingTop + plotHeight - barY;
            const isHovered = hoverIndex === idx;
            const colors = getStatusColor(item.status);

            return (
              <g key={idx}>
                {/* 悬停竖向高亮柱背景 */}
                {isHovered && (
                  <rect
                    x={paddingLeft + idx * barSlotWidth + 2}
                    y={paddingTop}
                    width={barSlotWidth - 4}
                    height={plotHeight}
                    fill="#10b981"
                    fillOpacity="0.08"
                    rx="6"
                  />
                )}

                {/* 柱形主体 */}
                <rect
                  x={barX}
                  y={barY}
                  width={barWidth}
                  height={Math.max(2, barH)}
                  rx="4"
                  fill={`url(#${colors.gradientId})`}
                  stroke={isHovered ? colors.barHover : 'transparent'}
                  strokeWidth={isHovered ? 2 : 0}
                  className="transition-all duration-200 cursor-pointer"
                />

                {/* 柱顶数值 */}
                <text
                  x={centerX}
                  y={barY - 6}
                  textAnchor="middle"
                  fontSize="10"
                  fontWeight="700"
                  fill={isHovered ? colors.barHover : colors.text}
                  fontFamily="ui-monospace, monospace"
                >
                  {item.value.toFixed(1)}
                </text>

                {/* X 轴时段文字 */}
                <text
                  x={centerX}
                  y={svgHeight - 22}
                  textAnchor="middle"
                  fontSize="10.5"
                  fill={isHovered ? '#10b981' : '#374151'}
                  fontWeight={isHovered ? '600' : '500'}
                >
                  {item.slot}
                </text>

                {/* 采样样本数量微标 */}
                <text
                  x={centerX}
                  y={svgHeight - 10}
                  textAnchor="middle"
                  fontSize="9"
                  fill="#9ca3af"
                  fontFamily="ui-monospace, monospace"
                >
                  n={item.count}
                </text>

                {/* 鼠标热区感应 */}
                <rect
                  x={paddingLeft + idx * barSlotWidth}
                  y={paddingTop}
                  width={barSlotWidth}
                  height={plotHeight + 25}
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
        {hoveredItem && hoverIndex !== null && (
          <div
            className="absolute z-20 pointer-events-none bg-gray-900/95 backdrop-blur-xs text-white text-[11px] rounded-lg py-2 px-3 shadow-xl space-y-1 transform -translate-x-1/2 transition-all"
            style={{
              left: `${((paddingLeft + hoverIndex * barSlotWidth + barSlotWidth / 2) / svgWidth) * 100}%`,
              top: '16px',
            }}
          >
            <div className="flex items-center justify-between border-b border-gray-700/60 pb-1 font-medium space-x-3">
              <span className="text-emerald-400 font-semibold">{hoveredItem.slot}</span>
              <span className="text-gray-400 font-mono text-[10px]">{hoveredItem.timeRange}</span>
            </div>
            <div className="flex items-center justify-between space-x-3 pt-0.5">
              <span className="text-gray-300">平均血糖:</span>
              <span
                className="font-mono font-bold text-xs"
                style={{
                  color:
                    hoveredItem.status === '偏高'
                      ? '#fbbf24'
                      : hoveredItem.status === '达标'
                      ? '#2dd4bf'
                      : '#34d399',
                }}
              >
                {hoveredItem.value.toFixed(1)} mmol/L
              </span>
            </div>
            <div className="flex items-center justify-between space-x-3 text-[10px]">
              <span className="text-gray-400">参考区间:</span>
              <span className="font-mono text-gray-200">{hoveredItem.targetRange} mmol/L</span>
            </div>
            <div className="flex items-center justify-between space-x-3 text-[10px]">
              <span className="text-gray-400">样本次数:</span>
              <span className="font-mono text-gray-200">{hoveredItem.count} 次有效记录</span>
            </div>
            <div className="text-[10px] text-amber-200/90 pt-1 border-t border-gray-700/50 leading-relaxed">
              {hoveredItem.advice}
            </div>
          </div>
        )}
      </div>

      {/* 底部摘要结论 */}
      <div className="flex items-center justify-between text-[11px] text-gray-500 mt-3 pt-2 border-t border-gray-100">
        <span>全天时段均值: 6.5 mmol/L · 偏高时段: 晚餐后 (8.0)</span>
        <span className="text-amber-600 font-medium">建议晚餐减少升糖主食并配合餐后轻运动</span>
      </div>
    </div>
  );
};
