import React, { useState } from 'react';
import {
  BarChart2,
  PieChart,
  Calendar,
  ArrowUpDown,
  Download,
  TrendingUp,
  Users,
  Heart,
  Shield,
} from 'lucide-react';

interface AnalyticsReportsProps {
  onNotice: (msg: string) => void;
  subPage: 'operation_stats' | 'elderly_portrait';
}

export const AnalyticsReports: React.FC<AnalyticsReportsProps> = ({
  onNotice,
  subPage,
}) => {
  // Daily operational summary for 2026年9月: 2026-09-18 down to 2026-09-01
  const dailyReports = [
    {
      date: '2026-09-18',
      isYesterday: true,
      newOrders: 148,
      completedOrders: 142,
      activeStaff: 32,
      alarmCount: 2,
      healthAssessments: 16,
      satisfactionRate: '99.5%',
    },
    {
      date: '2026-09-17',
      isYesterday: false,
      newOrders: 152,
      completedOrders: 149,
      activeStaff: 32,
      alarmCount: 1,
      healthAssessments: 18,
      satisfactionRate: '99.2%',
    },
    {
      date: '2026-09-16',
      isYesterday: false,
      newOrders: 139,
      completedOrders: 136,
      activeStaff: 30,
      alarmCount: 1,
      healthAssessments: 14,
      satisfactionRate: '99.4%',
    },
    {
      date: '2026-09-15',
      isYesterday: false,
      newOrders: 160,
      completedOrders: 155,
      activeStaff: 33,
      alarmCount: 0,
      healthAssessments: 20,
      satisfactionRate: '99.6%',
    },
    {
      date: '2026-09-14',
      isYesterday: false,
      newOrders: 145,
      completedOrders: 141,
      activeStaff: 31,
      alarmCount: 1,
      healthAssessments: 15,
      satisfactionRate: '98.9%',
    },
    {
      date: '2026-09-12',
      isYesterday: false,
      newOrders: 158,
      completedOrders: 153,
      activeStaff: 32,
      alarmCount: 0,
      healthAssessments: 19,
      satisfactionRate: '99.1%',
    },
    {
      date: '2026-09-10',
      isYesterday: false,
      newOrders: 142,
      completedOrders: 139,
      activeStaff: 29,
      alarmCount: 1,
      healthAssessments: 12,
      satisfactionRate: '99.0%',
    },
    {
      date: '2026-09-08',
      isYesterday: false,
      newOrders: 135,
      completedOrders: 131,
      activeStaff: 28,
      alarmCount: 0,
      healthAssessments: 11,
      satisfactionRate: '99.3%',
    },
    {
      date: '2026-09-05',
      isYesterday: false,
      newOrders: 128,
      completedOrders: 125,
      activeStaff: 28,
      alarmCount: 1,
      healthAssessments: 10,
      satisfactionRate: '98.8%',
    },
    {
      date: '2026-09-01',
      isYesterday: false,
      newOrders: 120,
      completedOrders: 118,
      activeStaff: 27,
      alarmCount: 0,
      healthAssessments: 22,
      satisfactionRate: '99.2%',
    },
  ];

  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-5">
      {/* Top 4 KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
          <div className="text-xs text-gray-400 mb-1">9月服务工单累计完成</div>
          <div className="text-2xl font-bold text-gray-800 font-mono">2,488 单</div>
          <div className="text-[11px] text-emerald-600 mt-1 flex items-center space-x-1">
            <TrendingUp className="w-3 h-3" />
            <span>较上月环比增长 +14.2%</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
          <div className="text-xs text-gray-400 mb-1">长者健康建档综合覆盖率</div>
          <div className="text-2xl font-bold text-emerald-600 font-mono">96.8%</div>
          <div className="text-[11px] text-gray-400 mt-1">辖区60岁以上老人全量建档</div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
          <div className="text-xs text-gray-400 mb-1">AI安防告警及时处置率</div>
          <div className="text-2xl font-bold text-gray-800 font-mono">100%</div>
          <div className="text-[11px] text-emerald-600 mt-1">平均响应时长 &lt; 3.2分钟</div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
          <div className="text-xs text-gray-400 mb-1">长者及家属综合满意率</div>
          <div className="text-2xl font-bold text-amber-500 font-mono">99.3%</div>
          <div className="text-[11px] text-gray-400 mt-1">基于9月18日为止全部有效回访</div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] min-h-[580px]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-gray-100 gap-4">
          <div className="flex items-center space-x-3">
            <span className="w-1.5 h-4 bg-[#10b981] rounded-full"></span>
            <h1 className="text-base font-semibold text-gray-800 tracking-tight">
              {subPage === 'elderly_portrait' ? '长者健康画像与慢病分布分析' : '报表统计 - 2026年9月运营日报表'}
            </h1>
            <span className="text-xs text-gray-400">统计周期：2026-09-01 至 2026-09-18</span>
          </div>

          <div className="flex items-center space-x-3">
            <div className="hidden md:flex items-center space-x-1.5 text-xs text-emerald-700 bg-emerald-50/80 px-2.5 py-1 rounded-md border border-emerald-200">
              <ArrowUpDown className="w-3 h-3" />
              <span>按统计日期降序 (2026-09-18 至 2026-09-01)</span>
            </div>
            <button
              onClick={() => onNotice('已导出2026年9月运营统计分析报表')}
              className="px-3.5 py-1.5 text-xs bg-[#10b981] hover:bg-[#059669] text-white rounded-lg flex items-center space-x-1.5 font-medium transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>导出统计报表</span>
            </button>
          </div>
        </div>

        {/* Daily Summary Table */}
        <div className="mt-4 overflow-x-auto border border-gray-100 rounded-xl">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-gray-50/80 text-gray-500 border-b border-gray-100">
                <th className="py-3 px-3.5 text-left font-semibold w-36">
                  <div className="flex items-center space-x-1">
                    <span>报表日期</span>
                    <ArrowUpDown className="w-3 h-3 text-emerald-600" />
                  </div>
                </th>
                <th className="py-3 px-3.5 text-center font-semibold w-28">新增服务工单</th>
                <th className="py-3 px-3.5 text-center font-semibold w-28">履约完成数</th>
                <th className="py-3 px-3.5 text-center font-semibold w-28">在岗服务护工</th>
                <th className="py-3 px-3.5 text-center font-semibold w-28">安防告警触发</th>
                <th className="py-3 px-3.5 text-center font-semibold w-28">健康体征随访</th>
                <th className="py-3 px-3.5 text-center font-semibold w-28">当日服务好评率</th>
                <th className="py-3 px-3.5 text-right font-semibold">运营评价与复核</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {dailyReports.map((row) => (
                <tr key={row.date} className="hover:bg-gray-50/70 transition-colors">
                  <td className="py-3 px-3.5">
                    <div className="flex items-center space-x-1.5 font-semibold text-gray-800">
                      <span>{row.date}</span>
                    </div>
                  </td>

                  <td className="py-3 px-3.5 text-center font-bold text-gray-800">
                    {row.newOrders}
                  </td>

                  <td className="py-3 px-3.5 text-center font-medium text-emerald-600">
                    {row.completedOrders}
                  </td>

                  <td className="py-3 px-3.5 text-center text-gray-700">
                    {row.activeStaff} 人
                  </td>

                  <td className="py-3 px-3.5 text-center">
                    <span className={row.alarmCount > 0 ? 'text-rose-600 font-bold' : 'text-gray-400'}>
                      {row.alarmCount} 次
                    </span>
                  </td>

                  <td className="py-3 px-3.5 text-center text-gray-700">
                    {row.healthAssessments} 人次
                  </td>

                  <td className="py-3 px-3.5 text-center font-semibold text-emerald-700">
                    {row.satisfactionRate}
                  </td>

                  <td className="py-3 px-3.5 text-right text-gray-500">
                    正常平稳运行 · 已归档
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
