import React, { useState, useMemo } from 'react';
import {
  Video,
  AlertTriangle,
  ShieldCheck,
  Radio,
  Search,
  ArrowUpDown,
  Filter,
  Eye,
  CheckCircle,
  X,
  MapPin,
  Clock,
  Activity,
} from 'lucide-react';
import { AlarmEvent } from '../types';
import { MOCK_ALARM_EVENTS } from '../data/extendedData';

interface VideoMonitoringProps {
  onNotice: (msg: string) => void;
  subPage: 'video_monitor' | 'alarm_events';
}

export const VideoMonitoring: React.FC<VideoMonitoringProps> = ({
  onNotice,
  subPage,
}) => {
  const [alarms, setAlarms] = useState<AlarmEvent[]>(MOCK_ALARM_EVENTS);
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCamera, setActiveCamera] = useState<string>('CAM-01');
  const [selectedAlarm, setSelectedAlarm] = useState<AlarmEvent | null>(null);

  const cameras = [
    {
      id: 'CAM-01',
      name: '康乐家园3栋502 - 客厅起居区',
      status: '实时监测中',
      aiStatus: '正常',
      elder: '高素琴 (82岁)',
      bgGradient: 'from-slate-800 to-slate-900',
    },
    {
      id: 'CAM-02',
      name: '金色家园2栋301 - 卧室床边区域',
      status: '实时监测中',
      aiStatus: '毫米波跌倒检测中',
      elder: '钱宏业 (79岁)',
      bgGradient: 'from-slate-800 to-slate-900',
    },
    {
      id: 'CAM-03',
      name: '颐和雅苑5栋603 - 洗手间门口通道',
      status: '实时监测中',
      aiStatus: '防滑滞留监控中',
      elder: '周金凤 (85岁)',
      bgGradient: 'from-slate-800 to-slate-900',
    },
    {
      id: 'CAM-04',
      name: '文景华庭6栋801 - 阳台活动监测点',
      status: '实时监测中',
      aiStatus: '安全围栏守护中',
      elder: '许桂兰 (83岁)',
      bgGradient: 'from-slate-800 to-slate-900',
    },
  ];

  const filteredAlarms = useMemo(() => {
    return alarms
      .filter((alm) => {
        const matchesSeverity = selectedSeverity === 'all' || alm.severity === selectedSeverity;
        const q = searchQuery.trim().toLowerCase();
        const matchesSearch =
          !q ||
          alm.alarmNo.toLowerCase().includes(q) ||
          alm.alarmType.toLowerCase().includes(q) ||
          alm.elderlyName.toLowerCase().includes(q) ||
          alm.roomLocation.toLowerCase().includes(q);

        return matchesSeverity && matchesSearch;
      })
      .sort((a, b) => new Date(b.triggerTime).getTime() - new Date(a.triggerTime).getTime());
  }, [alarms, searchQuery, selectedSeverity]);

  const handleResolveAlarm = (alm: AlarmEvent) => {
    const updated = alarms.map((a) =>
      a.id === alm.id ? { ...a, handleStatus: '已处置核实' as const } : a
    );
    setAlarms(updated);
    onNotice(`已完成处置告警【${alm.alarmNo}】(${alm.alarmType})`);
    if (selectedAlarm && selectedAlarm.id === alm.id) {
      setSelectedAlarm({ ...selectedAlarm, handleStatus: '已处置核实' });
    }
  };

  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-5">
      {/* Realtime Video Grid (Displayed in monitor subpage or top section) */}
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <span className="w-1.5 h-4 bg-[#10b981] rounded-full"></span>
            <h2 className="text-base font-semibold text-gray-800 tracking-tight">
              AI 智能安防视频分屏实时监测
            </h2>
            <span className="flex items-center space-x-1.5 text-xs text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              <Radio className="w-3 h-3 animate-pulse text-emerald-600" />
              <span>4路视频流在线守护</span>
            </span>
          </div>
          <div className="text-xs text-gray-400">
            保护长者隐私：室内视频流已启用AI骨骼姿态脱敏脱密处理
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {cameras.map((cam) => {
            const isSelected = activeCamera === cam.id;

            return (
              <div
                key={cam.id}
                onClick={() => {
                  setActiveCamera(cam.id);
                  onNotice(`切换视角至: ${cam.name}`);
                }}
                className={`rounded-xl overflow-hidden border cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? 'border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {/* Simulated Screen */}
                <div className={`h-44 bg-gradient-to-br ${cam.bgGradient} relative flex flex-col justify-between p-3 text-white`}>
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="bg-black/60 px-2 py-0.5 rounded font-mono flex items-center space-x-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                      <span>{cam.id} LIVE</span>
                    </span>
                    <span className="bg-emerald-600/80 px-2 py-0.5 rounded">
                      {cam.aiStatus}
                    </span>
                  </div>

                  {/* Center Skeleton Silhouette Effect */}
                  <div className="flex items-center justify-center my-auto opacity-70">
                    <div className="text-center space-y-1">
                      <Activity className="w-8 h-8 mx-auto text-emerald-400 animate-pulse" />
                      <div className="text-[10px] text-gray-300 font-mono">
                        姿态监测算法运行中 · 0 跌倒风险
                      </div>
                    </div>
                  </div>

                  {/* Bottom Camera Info */}
                  <div className="bg-black/50 backdrop-blur-xs -mx-3 -mb-3 p-2 text-[11px] flex items-center justify-between">
                    <span className="truncate font-medium">{cam.elder}</span>
                    <span className="text-[10px] text-emerald-400 font-mono">1080P/25fps</span>
                  </div>
                </div>

                <div className="p-2.5 bg-gray-50 text-[11px] text-gray-600 truncate font-medium">
                  {cam.name}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Alarms Table (Descending from 2026-09-18 down to 2026-09-01) */}
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] min-h-[500px]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-gray-100 gap-4">
          <div className="flex items-center space-x-3">
            <span className="w-1.5 h-4 bg-[#10b981] rounded-full"></span>
            <h2 className="text-base font-semibold text-gray-800 tracking-tight">
              安防与健康告警事件处置记录
            </h2>
            <span className="text-xs text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200 font-medium">
              共 {filteredAlarms.length} 项告警流水 (2026年9月)
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <div className="hidden md:flex items-center space-x-1.5 text-xs text-emerald-700 bg-emerald-50/80 px-2.5 py-1 rounded-md border border-emerald-200">
              <ArrowUpDown className="w-3 h-3" />
              <span>按告警触发时间降序 (2026-09-18 至 2026-09-01)</span>
            </div>
          </div>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap items-center gap-4 pt-4 pb-4 text-xs text-gray-600 border-b border-gray-50">
          <div className="flex items-center space-x-2">
            <span className="text-gray-500 font-medium">严重程度</span>
            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:border-[#10b981]"
            >
              <option value="all">全部级别</option>
              <option value="高危">高危预警</option>
              <option value="中度">中度异常</option>
              <option value="一般提醒">一般提醒</option>
            </select>
          </div>

          <div className="flex-1 min-w-[220px] flex justify-end">
            <div className="relative w-full max-w-xs">
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索单号/长者/位置/类型..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:border-[#10b981]"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="mt-4 overflow-x-auto border border-gray-100 rounded-xl">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-gray-50/80 text-gray-500 border-b border-gray-100">
                <th className="py-3 px-3.5 text-left font-semibold w-32">告警事件编号</th>
                <th className="py-3 px-3.5 text-left font-semibold w-40">
                  <div className="flex items-center space-x-1">
                    <span>告警触发时间</span>
                    <ArrowUpDown className="w-3 h-3 text-emerald-600" />
                  </div>
                </th>
                <th className="py-3 px-3.5 text-left font-semibold w-32">告警预警类型</th>
                <th className="py-3 px-3.5 text-center font-semibold w-24">等级</th>
                <th className="py-3 px-3.5 text-left font-semibold w-36">长者对象</th>
                <th className="py-3 px-3.5 text-left font-semibold">触发点位与感知设备</th>
                <th className="py-3 px-3.5 text-left font-semibold">处置结果与责任人员</th>
                <th className="py-3 px-3.5 text-center font-semibold w-24">处置状态</th>
                <th className="py-3 px-3.5 text-right font-semibold w-24">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredAlarms.map((alm) => {
                const isYesterday = alm.triggerTime.startsWith('2026-09-18');

                return (
                  <tr key={alm.id} className="hover:bg-gray-50/70 transition-colors">
                    <td className="py-3 px-3.5 font-mono text-gray-500 text-[11px]">
                      {alm.alarmNo}
                    </td>

                    <td className="py-3 px-3.5">
                      <div className="flex items-center space-x-1 font-semibold text-gray-800">
                        <span>{alm.triggerTime}</span>
                      </div>
                    </td>

                    <td className="py-3 px-3.5 font-semibold text-rose-600 flex items-center space-x-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                      <span>{alm.alarmType}</span>
                    </td>

                    <td className="py-3 px-3.5 text-center">
                      <span
                        className={`inline-block text-[11px] px-2 py-0.5 rounded border font-medium ${
                          alm.severity === '高危'
                            ? 'bg-rose-50 text-rose-700 border-rose-200'
                            : alm.severity === '中度'
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : 'bg-blue-50 text-blue-700 border-blue-200'
                        }`}
                      >
                        {alm.severity}
                      </span>
                    </td>

                    <td className="py-3 px-3.5 font-medium text-gray-800">
                      {alm.elderlyName}
                    </td>

                    <td className="py-3 px-3.5 text-gray-600">
                      <div>{alm.roomLocation}</div>
                      <div className="text-[10px] text-gray-400">{alm.deviceSource}</div>
                    </td>

                    <td className="py-3 px-3.5 text-gray-700">
                      <div className="line-clamp-1">{alm.handlerStaff}</div>
                    </td>

                    <td className="py-3 px-3.5 text-center">
                      <span className="inline-block text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium">
                        {alm.handleStatus}
                      </span>
                    </td>

                    <td className="py-3 px-3.5 text-right">
                      <button
                        onClick={() => handleResolveAlarm(alm)}
                        className="text-emerald-700 hover:text-emerald-900 font-medium hover:underline"
                      >
                        复核
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
