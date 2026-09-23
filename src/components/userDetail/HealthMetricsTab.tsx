import React, { useState, useMemo } from 'react';
import {
  Settings,
  Plus,
  Trash2,
  Edit2,
  Calendar,
  X,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Activity,
  Moon,
  Footprints,
  Heart,
  Droplets,
  Scale,
  BarChart2,
} from 'lucide-react';
import { AppUser } from '../../types';
import {
  WeightRecord,
  StepsRecord,
  SleepRecord,
  GlucoseRecord,
  BloodPressureRecord,
  Spo2Record,
  HeartRateRecord,
  INITIAL_WEIGHTS,
  INITIAL_STEPS,
  INITIAL_SLEEP,
  INITIAL_GLUCOSE,
  INITIAL_BP,
  INITIAL_SPO2,
  INITIAL_HEARTRATE,
} from '../../data/healthData';
import { SmoothCurveChart } from './SmoothCurveChart';

interface HealthMetricsTabProps {
  user: AppUser;
  onNotice: (msg: string) => void;
}

type MetricSubTab =
  | '体重'
  | '步数'
  | '睡眠'
  | '血糖'
  | '血压'
  | '血氧饱和度'
  | '心率';

export const HealthMetricsTab: React.FC<HealthMetricsTabProps> = ({
  user,
  onNotice,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<MetricSubTab>('体重');
  const [dateRange, setDateRange] = useState('2026-09-12 ~ 2026-09-19');
  const [chartViewMode, setChartViewMode] = useState<'curve' | 'bar'>('curve');

  // Sub-records state
  const [weights, setWeights] = useState<WeightRecord[]>(INITIAL_WEIGHTS);
  const [steps, setSteps] = useState<StepsRecord[]>(INITIAL_STEPS);
  const [sleeps, setSleeps] = useState<SleepRecord[]>(INITIAL_SLEEP);
  const [glucoses, setGlucoses] = useState<GlucoseRecord[]>(INITIAL_GLUCOSE);
  const [bps, setBps] = useState<BloodPressureRecord[]>(INITIAL_BP);
  const [spo2s, setSpo2s] = useState<Spo2Record[]>(INITIAL_SPO2);
  const [hrs, setHrs] = useState<HeartRateRecord[]>(INITIAL_HEARTRATE);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  // Modal states for editing / adding
  const [showEditModal, setShowEditModal] = useState(false);
  const [editItem, setEditItem] = useState<any | null>(null);

  // Generic form fields
  const [formTime, setFormTime] = useState('2026-09-19 08:00:00');
  const [formWeight, setFormWeight] = useState('70.0');
  const [formSteps, setFormSteps] = useState('7000');
  const [formSleepStart, setFormSleepStart] = useState('2026-09-18 22:30');
  const [formSleepEnd, setFormSleepEnd] = useState('2026-09-19 06:45');
  const [formDeepHours, setFormDeepHours] = useState('2');
  const [formDeepMins, setFormDeepMins] = useState('15');
  const [formLightHours, setFormLightHours] = useState('4');
  const [formLightMins, setFormLightMins] = useState('20');
  const [formRemHours, setFormRemHours] = useState('1');
  const [formRemMins, setFormRemMins] = useState('30');
  const [formGlucosePeriod, setFormGlucosePeriod] = useState<GlucoseRecord['period']>('早餐前');
  const [formGlucoseVal, setFormGlucoseVal] = useState('5.8');
  const [formSys, setFormSys] = useState('130');
  const [formDia, setFormDia] = useState('82');
  const [formSpo2Val, setFormSpo2Val] = useState('98');
  const [formHrVal, setFormHrVal] = useState('72');

  const subTabs: { id: MetricSubTab; label: string; icon: any }[] = [
    { id: '体重', label: '体重', icon: Scale },
    { id: '步数', label: '步数', icon: Footprints },
    { id: '睡眠', label: '睡眠', icon: Moon },
    { id: '血糖', label: '血糖', icon: Droplets },
    { id: '血压', label: '血压', icon: Activity },
    { id: '血氧饱和度', label: '血氧饱和度', icon: Heart },
    { id: '心率', label: '心率', icon: TrendingUp },
  ];

  // Open Add Modal
  const handleOpenAdd = () => {
    setEditItem(null);
    setFormTime('2026-09-19 08:30:00');
    setFormWeight('70.0');
    setFormSteps('7200');
    setFormSleepStart('2026-09-18 22:30');
    setFormSleepEnd('2026-09-19 06:45');
    setFormDeepHours('2');
    setFormDeepMins('15');
    setFormLightHours('4');
    setFormLightMins('20');
    setFormRemHours('1');
    setFormRemMins('30');
    setFormGlucosePeriod('早餐前');
    setFormGlucoseVal('5.9');
    setFormSys('132');
    setFormDia('82');
    setFormSpo2Val('98');
    setFormHrVal('72');
    setShowEditModal(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (item: any) => {
    setEditItem(item);
    setFormTime(item.time || '2026-09-18 08:00:00');
    if (activeSubTab === '体重') {
      setFormWeight(String(item.weight));
    } else if (activeSubTab === '步数') {
      setFormSteps(String(item.steps));
    } else if (activeSubTab === '睡眠') {
      setFormSleepStart(item.sleepTime);
      setFormSleepEnd(item.wakeTime);
      setFormDeepHours(String(Math.floor(item.deepMinutes / 60)));
      setFormDeepMins(String(item.deepMinutes % 60));
      setFormLightHours(String(Math.floor(item.lightMinutes / 60)));
      setFormLightMins(String(item.lightMinutes % 60));
      setFormRemHours(String(Math.floor(item.remMinutes / 60)));
      setFormRemMins(String(item.remMinutes % 60));
    } else if (activeSubTab === '血糖') {
      setFormGlucosePeriod(item.period);
      setFormGlucoseVal(String(item.value));
    } else if (activeSubTab === '血压') {
      setFormSys(String(item.systolic));
      setFormDia(String(item.diastolic));
    } else if (activeSubTab === '血氧饱和度') {
      setFormSpo2Val(String(item.spo2));
    } else if (activeSubTab === '心率') {
      setFormHrVal(String(item.heartRate));
    }
    setShowEditModal(true);
  };

  // Save Modal
  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeSubTab === '体重') {
      const w = parseFloat(formWeight) || 70.0;
      const bmi = parseFloat((w / (1.72 * 1.72)).toFixed(1));
      if (editItem) {
        setWeights((prev) =>
          prev.map((i) =>
            i.id === editItem.id ? { ...i, time: formTime, weight: w, bmi } : i
          )
        );
        onNotice('已修改体重记录');
      } else {
        setWeights((prev) => [
          {
            id: `wt-${Date.now()}`,
            time: formTime,
            weight: w,
            bmi,
            source: '自主录入',
            addedBy: '李明明',
          },
          ...prev,
        ]);
        onNotice('已新增体重记录');
      }
    } else if (activeSubTab === '步数') {
      const s = parseInt(formSteps, 10) || 6000;
      if (editItem) {
        setSteps((prev) =>
          prev.map((i) =>
            i.id === editItem.id ? { ...i, time: formTime, steps: s } : i
          )
        );
        onNotice('已修改步数记录');
      } else {
        setSteps((prev) => [
          {
            id: `stp-${Date.now()}`,
            time: formTime,
            date: formTime.slice(0, 10),
            steps: s,
            source: '自主录入',
            addedBy: '李明明',
          },
          ...prev,
        ]);
        onNotice('已新增步数记录');
      }
    } else if (activeSubTab === '睡眠') {
      const deepMin = (parseInt(formDeepHours, 10) || 0) * 60 + (parseInt(formDeepMins, 10) || 0);
      const lightMin = (parseInt(formLightHours, 10) || 0) * 60 + (parseInt(formLightMins, 10) || 0);
      const remMin = (parseInt(formRemHours, 10) || 0) * 60 + (parseInt(formRemMins, 10) || 0);
      const totMin = deepMin + lightMin + remMin;
      const totH = Math.floor(totMin / 60);
      const totM = totMin % 60;

      const record: SleepRecord = {
        id: editItem ? editItem.id : `slp-${Date.now()}`,
        time: formTime,
        sleepTime: formSleepStart,
        wakeTime: formSleepEnd,
        totalMinutes: totMin,
        totalDurationText: `${totH}小时${totM}分`,
        deepMinutes: deepMin,
        deepText: `${formDeepHours}小时${formDeepMins}分`,
        lightMinutes: lightMin,
        lightText: `${formLightHours}小时${formLightMins}分`,
        remMinutes: remMin,
        remText: `${formRemHours}小时${formRemMins}分`,
        source: editItem ? editItem.source : '自主录入',
        addedBy: editItem ? editItem.addedBy : '李明明',
      };

      if (editItem) {
        setSleeps((prev) => prev.map((i) => (i.id === editItem.id ? record : i)));
        onNotice('已修改睡眠记录');
      } else {
        setSleeps((prev) => [record, ...prev]);
        onNotice('已新增睡眠记录');
      }
    } else if (activeSubTab === '血糖') {
      const v = parseFloat(formGlucoseVal) || 6.0;
      const st = v > 7.0 ? '偏高' : v < 3.9 ? '偏低' : '正常';
      if (editItem) {
        setGlucoses((prev) =>
          prev.map((i) =>
            i.id === editItem.id
              ? { ...i, time: formTime, period: formGlucosePeriod, value: v, status: st }
              : i
          )
        );
        onNotice('已修改血糖记录');
      } else {
        setGlucoses((prev) => [
          {
            id: `glc-${Date.now()}`,
            time: formTime,
            period: formGlucosePeriod,
            value: v,
            status: st,
            source: '自主测量',
            addedBy: '李明明',
          },
          ...prev,
        ]);
        onNotice('已新增血糖记录');
      }
    } else if (activeSubTab === '血压') {
      const sys = parseInt(formSys, 10) || 130;
      const dia = parseInt(formDia, 10) || 82;
      const st = sys >= 140 || dia >= 90 ? '偏高' : '正常';
      if (editItem) {
        setBps((prev) =>
          prev.map((i) =>
            i.id === editItem.id
              ? { ...i, time: formTime, systolic: sys, diastolic: dia, status: st }
              : i
          )
        );
        onNotice('已修改血压记录');
      } else {
        setBps((prev) => [
          {
            id: `bp-${Date.now()}`,
            time: formTime,
            systolic: sys,
            diastolic: dia,
            status: st,
            source: '自主录入',
            addedBy: '李明明',
          },
          ...prev,
        ]);
        onNotice('已新增血压记录');
      }
    } else if (activeSubTab === '血氧饱和度') {
      const spo2 = parseInt(formSpo2Val, 10) || 98;
      const st = spo2 < 95 ? '轻度偏低' : '正常';
      if (editItem) {
        setSpo2s((prev) =>
          prev.map((i) => (i.id === editItem.id ? { ...i, time: formTime, spo2, status: st } : i))
        );
      } else {
        setSpo2s((prev) => [
          { id: `spo-${Date.now()}`, time: formTime, spo2, status: st, source: '自主录入', addedBy: '李明明' },
          ...prev,
        ]);
      }
      onNotice('已保存血氧记录');
    } else if (activeSubTab === '心率') {
      const hr = parseInt(formHrVal, 10) || 72;
      const st = hr > 100 ? '偏快' : hr < 60 ? '偏缓' : '正常';
      if (editItem) {
        setHrs((prev) =>
          prev.map((i) => (i.id === editItem.id ? { ...i, time: formTime, heartRate: hr, status: st } : i))
        );
      } else {
        setHrs((prev) => [
          { id: `hr-${Date.now()}`, time: formTime, heartRate: hr, status: st, source: '自主录入', addedBy: '李明明' },
          ...prev,
        ]);
      }
      onNotice('已保存心率记录');
    }
    setShowEditModal(false);
  };

  const handleConfirmDelete = () => {
    if (!deleteTargetId) return;
    if (activeSubTab === '体重') setWeights((prev) => prev.filter((i) => i.id !== deleteTargetId));
    if (activeSubTab === '步数') setSteps((prev) => prev.filter((i) => i.id !== deleteTargetId));
    if (activeSubTab === '睡眠') setSleeps((prev) => prev.filter((i) => i.id !== deleteTargetId));
    if (activeSubTab === '血糖') setGlucoses((prev) => prev.filter((i) => i.id !== deleteTargetId));
    if (activeSubTab === '血压') setBps((prev) => prev.filter((i) => i.id !== deleteTargetId));
    if (activeSubTab === '血氧饱和度') setSpo2s((prev) => prev.filter((i) => i.id !== deleteTargetId));
    if (activeSubTab === '心率') setHrs((prev) => prev.filter((i) => i.id !== deleteTargetId));
    setDeleteTargetId(null);
    onNotice('已成功删除该条健康测量记录');
  };

  return (
    <div className="space-y-5 text-xs">
      {/* 顶部子标签切换栏 (Image 7) */}
      <div className="bg-white rounded-xl p-3 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center justify-between">
        <div className="flex items-center space-x-2 overflow-x-auto">
          {subTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveSubTab(tab.id);
                  setSelectedIds([]);
                  onNotice(`查看【${tab.label}】监测走势与记录`);
                }}
                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center space-x-1.5 whitespace-nowrap ${
                  isActive
                    ? 'bg-[#10b981] text-white shadow-xs'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => onNotice('健康指标预警阈值与目标值设置')}
          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg shrink-0 ml-2"
          title="指标设置"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>

      {/* 统计图表区 (Charts matching Images 7, 8, 10, 12, 13, 15, 16, 18) */}
      <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-gray-100">
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-3.5 bg-[#10b981] rounded-full"></span>
            <h3 className="text-sm font-semibold text-gray-800">
              {activeSubTab}走势与深度分析
            </h3>
          </div>
          <div className="flex items-center space-x-2">
            {/* 图表展示模式切换：曲线图（默认） / 柱状对比 */}
            <div className="flex items-center bg-gray-100 p-0.5 rounded-lg text-[11px] font-medium">
              <button
                type="button"
                onClick={() => setChartViewMode('curve')}
                className={`px-3 py-1 rounded-md transition-all flex items-center space-x-1.5 ${
                  chartViewMode === 'curve'
                    ? 'bg-white text-[#10b981] shadow-xs font-semibold'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5" />
                <span>曲线图</span>
              </button>
              <button
                type="button"
                onClick={() => setChartViewMode('bar')}
                className={`px-3 py-1 rounded-md transition-all flex items-center space-x-1.5 ${
                  chartViewMode === 'bar'
                    ? 'bg-white text-[#10b981] shadow-xs font-semibold'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <BarChart2 className="w-3.5 h-3.5" />
                <span>柱状对比</span>
              </button>
            </div>

            <div className="flex items-center space-x-1.5 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-600 font-mono text-[11px]">
              <Calendar className="w-3.5 h-3.5 text-gray-400" />
              <span>{dateRange}</span>
            </div>
          </div>
        </div>

        {/* 1. 体重趋势图 */}
        {activeSubTab === '体重' && (
          chartViewMode === 'curve' ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-1">
              <SmoothCurveChart
                title="体重连续走势平滑曲线 (kg)"
                subtitle="标准参考: 60 ~ 75 kg"
                data={[
                  { date: '09-12', weight: 71.2 },
                  { date: '09-13', weight: 71.0 },
                  { date: '09-14', weight: 70.8 },
                  { date: '09-15', weight: 70.5 },
                  { date: '09-16', weight: 70.2 },
                  { date: '09-17', weight: 70.0 },
                  { date: '09-18', weight: 69.8 },
                  { date: '09-19', weight: 69.7 },
                ]}
                series={[
                  {
                    key: 'weight',
                    name: '体重',
                    stroke: '#10b981',
                    fill: '#10b981',
                    gradientId: 'grad-weight-curve',
                    unit: 'kg',
                  },
                ]}
                minY={65}
                maxY={74}
                normalBand={{ min: 60, max: 75, label: '标准区间' }}
                footerInfo={
                  <>
                    <span>平均体重: 70.4 kg</span>
                    <span className="text-emerald-600 font-medium">近7日稳步微降 (轻度减重达标)</span>
                  </>
                }
              />

              <SmoothCurveChart
                title="BMI 指数平滑走势曲线"
                subtitle="中国成人标准: 18.5 ~ 23.9"
                data={[
                  { date: '09-12', bmi: 24.1 },
                  { date: '09-13', bmi: 24.0 },
                  { date: '09-14', bmi: 23.9 },
                  { date: '09-15', bmi: 23.8 },
                  { date: '09-16', bmi: 23.7 },
                  { date: '09-17', bmi: 23.7 },
                  { date: '09-18', bmi: 23.6 },
                  { date: '09-19', bmi: 23.5 },
                ]}
                series={[
                  {
                    key: 'bmi',
                    name: 'BMI 指数',
                    stroke: '#0d9488',
                    fill: '#0d9488',
                    gradientId: 'grad-bmi-curve',
                    unit: '',
                  },
                ]}
                minY={21}
                maxY={26}
                normalBand={{ min: 18.5, max: 23.9, label: '正常区间' }}
                referenceLine={{ value: 24.0, label: '超重警戒 24.0', color: '#f59e0b' }}
                footerInfo={
                  <>
                    <span>当前BMI: 23.5 (正常健康)</span>
                    <span className="text-teal-600 font-medium">体质恢复并稳定在标准区间</span>
                  </>
                }
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
              {/* 体重趋势 (kg) 柱状图 */}
              <div className="bg-gray-50/70 p-4 rounded-xl border border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-gray-700">体重趋势 (kg)</span>
                  <span className="text-[11px] text-gray-400">标准范围: 60 ~ 75 kg</span>
                </div>
                <div className="h-44 flex items-end justify-between space-x-2 pt-6 px-3 border-b border-gray-200 pb-2">
                  {[
                    { d: '09-12', v: 71.2 },
                    { d: '09-13', v: 71.0 },
                    { d: '09-14', v: 70.8 },
                    { d: '09-15', v: 70.5 },
                    { d: '09-16', v: 70.2 },
                    { d: '09-17', v: 70.0 },
                    { d: '09-18', v: 69.8 },
                    { d: '09-19', v: 69.7 },
                  ].map((item, idx) => {
                    const heightPercent = ((item.v - 65) / 10) * 100;
                    return (
                      <div key={idx} className="flex-1 flex flex-col items-center space-y-1">
                        <span className="text-[10px] font-mono text-emerald-700 font-bold">
                          {item.v}
                        </span>
                        <div className="w-3 bg-emerald-500 rounded-t-sm" style={{ height: `${heightPercent}%` }} />
                        <span className="text-[10px] text-gray-500 font-mono">{item.d}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="flex items-center justify-between text-[11px] text-gray-500 mt-3 pt-2">
                  <span>平均体重: 70.4 kg</span>
                  <span className="text-emerald-600 font-medium">近7日稳步微降 (轻度减重达标)</span>
                </div>
              </div>

              {/* BMI趋势 */}
              <div className="bg-gray-50/70 p-4 rounded-xl border border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-gray-700">BMI 指数趋势</span>
                  <span className="text-[11px] text-gray-400">中国成人健康: 18.5 ~ 23.9</span>
                </div>
                <div className="h-44 flex items-end justify-between space-x-2 pt-6 px-3 border-b border-gray-200 pb-2">
                  {[
                    { d: '09-12', v: 24.1 },
                    { d: '09-13', v: 24.0 },
                    { d: '09-14', v: 23.9 },
                    { d: '09-15', v: 23.8 },
                    { d: '09-16', v: 23.7 },
                    { d: '09-17', v: 23.7 },
                    { d: '09-18', v: 23.6 },
                    { d: '09-19', v: 23.5 },
                  ].map((item, idx) => {
                    const heightPercent = ((item.v - 20) / 6) * 100;
                    return (
                      <div key={idx} className="flex-1 flex flex-col items-center space-y-1">
                        <span className="text-[10px] font-mono text-teal-700 font-bold">
                          {item.v}
                        </span>
                        <div className="w-3 bg-teal-500 rounded-t-sm" style={{ height: `${heightPercent}%` }} />
                        <span className="text-[10px] text-gray-500 font-mono">{item.d}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="flex items-center justify-between text-[11px] text-gray-500 mt-3 pt-2">
                  <span>当前BMI: 23.5 (正常)</span>
                  <span className="text-teal-600 font-medium">体质恢复至标准区间</span>
                </div>
              </div>
            </div>
          )
        )}

        {/* 2. 步数趋势图 */}
        {activeSubTab === '步数' && (
          chartViewMode === 'curve' ? (
            <SmoothCurveChart
              title="每日步数平滑曲线走势"
              subtitle="健康活动目标: 6000 步/日"
              data={[
                { date: '09-12', steps: 6540 },
                { date: '09-13', steps: 7800 },
                { date: '09-14', steps: 6180 },
                { date: '09-15', steps: 8360 },
                { date: '09-16', steps: 5930 },
                { date: '09-17', steps: 7420 },
                { date: '09-18', steps: 6850 },
                { date: '09-19', steps: 7210 },
              ]}
              series={[
                {
                  key: 'steps',
                  name: '每日步数',
                  stroke: '#10b981',
                  fill: '#10b981',
                  gradientId: 'grad-steps-curve',
                  unit: '步',
                },
              ]}
              minY={4000}
              maxY={9500}
              referenceLine={{ value: 6000, label: '推荐目标 6000步', color: '#059669' }}
              footerInfo={
                <>
                  <span>平均步数: 7,036 步 · 目标达成率 87.5%</span>
                  <span className="text-emerald-600 font-medium">长者晨晚活动规律稳定良好</span>
                </>
              }
            />
          ) : (
            <div className="bg-gray-50/70 p-4 rounded-xl border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold text-gray-700">每日步数走势 (目标: 6000 步/日)</span>
                <span className="text-[11px] text-gray-400">平均步数: 7,036 步</span>
              </div>
              <div className="h-44 flex items-end justify-between space-x-3 pt-6 px-4 border-b border-gray-200 pb-2">
                {[
                  { d: '09-12', s: 6540 },
                  { d: '09-13', s: 7800 },
                  { d: '09-14', s: 6180 },
                  { d: '09-15', s: 8360 },
                  { d: '09-16', s: 5930 },
                  { d: '09-17', s: 7420 },
                  { d: '09-18', s: 6850 },
                  { d: '09-19', s: 7210 },
                ].map((item, idx) => {
                  const heightPercent = (item.s / 9500) * 100;
                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center space-y-1">
                      <span className="text-[10px] font-mono text-emerald-700 font-bold">
                        {item.s.toLocaleString()}
                      </span>
                      <div
                        className={`w-5 rounded-t-md transition-all ${
                          item.s >= 6000 ? 'bg-[#10b981]' : 'bg-amber-400'
                        }`}
                        style={{ height: `${heightPercent}%` }}
                      />
                      <span className="text-[10px] text-gray-500 font-mono">{item.d}</span>
                    </div>
                  );
                })}
              </div>
              <div className="flex items-center justify-between text-[11px] text-gray-500 mt-3 pt-1">
                <span className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 bg-[#10b981] rounded-xs inline-block"></span>
                  <span>达成目标 (&gt;=6000步)</span>
                  <span className="w-2.5 h-2.5 bg-amber-400 rounded-xs inline-block ml-3"></span>
                  <span>未达标 (&lt;6000步)</span>
                </span>
                <span className="text-emerald-600 font-medium">长者晨晚活动规律稳定</span>
              </div>
            </div>
          )
        )}

        {/* 3. 睡眠趋势图 */}
        {activeSubTab === '睡眠' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-1">
            {chartViewMode === 'curve' ? (
              <SmoothCurveChart
                title="睡眠时长与深睡连续走势曲线 (小时)"
                subtitle="深睡占比约 28%"
                data={[
                  { date: '09-12', tot: 7.8, deep: 2.1 },
                  { date: '09-13', tot: 8.0, deep: 2.3 },
                  { date: '09-14', tot: 8.3, deep: 2.5 },
                  { date: '09-15', tot: 7.7, deep: 1.8 },
                  { date: '09-16', tot: 7.9, deep: 2.3 },
                  { date: '09-17', tot: 7.7, deep: 2.0 },
                  { date: '09-18', tot: 8.0, deep: 2.2 },
                  { date: '09-19', tot: 8.1, deep: 2.3 },
                ]}
                series={[
                  {
                    key: 'tot',
                    name: '总睡眠时长',
                    stroke: '#6366f1',
                    fill: '#6366f1',
                    gradientId: 'grad-sleep-tot-curve',
                    unit: 'h',
                  },
                  {
                    key: 'deep',
                    name: '深睡时长',
                    stroke: '#10b981',
                    fill: '#10b981',
                    gradientId: 'grad-sleep-deep-curve',
                    unit: 'h',
                  },
                ]}
                minY={1.0}
                maxY={9.5}
                referenceLine={{ value: 7.0, label: '成人睡眠基线 7.0h', color: '#6366f1' }}
                footerInfo={
                  <>
                    <span>平均睡眠: 7小时57分 · 深睡占比 27.8%</span>
                    <span className="text-emerald-600 font-medium">睡眠质量良好，节律规整</span>
                  </>
                }
              />
            ) : (
              /* 睡眠结构堆叠柱状图 */
              <div className="bg-gray-50/70 p-4 rounded-xl border border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-gray-700">睡眠时长结构分布 (小时)</span>
                  <div className="flex items-center space-x-2 text-[10px]">
                    <span className="flex items-center space-x-1"><span className="w-2 h-2 bg-indigo-600 rounded-xs inline-block"></span><span>深睡</span></span>
                    <span className="flex items-center space-x-1"><span className="w-2 h-2 bg-sky-400 rounded-xs inline-block"></span><span>浅睡</span></span>
                    <span className="flex items-center space-x-1"><span className="w-2 h-2 bg-emerald-400 rounded-xs inline-block"></span><span>快速眼动</span></span>
                  </div>
                </div>
                <div className="h-44 flex items-end justify-between space-x-2 pt-6 px-3 border-b border-gray-200 pb-2">
                  {[
                    { d: '09-12', deep: 2.1, light: 4.4, rem: 1.3, tot: 7.8 },
                    { d: '09-13', deep: 2.3, light: 4.2, rem: 1.5, tot: 8.0 },
                    { d: '09-14', deep: 2.5, light: 4.3, rem: 1.5, tot: 8.3 },
                    { d: '09-15', deep: 1.8, light: 4.7, rem: 1.2, tot: 7.7 },
                    { d: '09-16', deep: 2.3, light: 4.2, rem: 1.4, tot: 7.9 },
                    { d: '09-17', deep: 2.0, light: 4.5, rem: 1.2, tot: 7.7 },
                    { d: '09-18', deep: 2.2, light: 4.3, rem: 1.5, tot: 8.0 },
                    { d: '09-19', deep: 2.3, light: 4.3, rem: 1.5, tot: 8.1 },
                  ].map((item, idx) => {
                    return (
                      <div key={idx} className="flex-1 flex flex-col items-center space-y-1">
                        <span className="text-[10px] font-mono text-gray-700 font-bold">
                          {item.tot}h
                        </span>
                        <div className="w-4 flex flex-col-reverse rounded-t-sm overflow-hidden" style={{ height: `${(item.tot / 9.5) * 100}%` }}>
                          <div style={{ height: `${(item.deep / item.tot) * 100}%` }} className="bg-indigo-600" />
                          <div style={{ height: `${(item.light / item.tot) * 100}%` }} className="bg-sky-400" />
                          <div style={{ height: `${(item.rem / item.tot) * 100}%` }} className="bg-emerald-400" />
                        </div>
                        <span className="text-[10px] text-gray-500 font-mono">{item.d}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="text-[11px] text-gray-500 mt-3 pt-1">
                  平均睡眠: 7小时57分 · 深睡占比 27.8% (睡眠质量良好)
                </div>
              </div>
            )}

            {/* 入睡与醒来作息统计 */}
            <div className="bg-gray-50/70 p-4 rounded-xl border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold text-gray-700">作息节律统计 (入睡 ~ 醒来)</span>
                <span className="text-[11px] text-gray-400">平均入睡: 22:45 / 醒来: 06:45</span>
              </div>
              <div className="space-y-2.5 pt-2">
                {[
                  { d: '09-19', s: '22:35', w: '06:40', dur: '8小时05分', pct: '83%' },
                  { d: '09-18', s: '22:40', w: '06:45', dur: '8小时05分', pct: '82%' },
                  { d: '09-17', s: '23:05', w: '06:50', dur: '7小时45分', pct: '78%' },
                  { d: '09-16', s: '22:30', w: '06:30', dur: '8小时00分', pct: '80%' },
                  { d: '09-15', s: '23:20', w: '07:00', dur: '7小时40分', pct: '76%' },
                ].map((row, i) => (
                  <div key={i} className="flex items-center justify-between text-[11px]">
                    <span className="w-12 font-mono text-gray-500">{row.d}</span>
                    <div className="flex-1 mx-3 bg-gray-200 h-3 rounded-full overflow-hidden relative">
                      <div
                        className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full rounded-full"
                        style={{ width: row.pct }}
                      />
                    </div>
                    <span className="font-mono text-gray-700 shrink-0">
                      {row.s} ~ {row.w} ({row.dur})
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-2 border-t border-gray-200/60 text-[11px] text-gray-500 flex justify-between">
                <span>夜间起夜次数: 0 ~ 1 次</span>
                <span className="text-emerald-600 font-medium">夜间心率及呼吸率平缓</span>
              </div>
            </div>
          </div>
        )}

        {/* 4. 血糖趋势图 */}
        {activeSubTab === '血糖' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-1">
            {chartViewMode === 'curve' ? (
              <SmoothCurveChart
                title="血糖波动平滑曲线 (空腹 vs 餐后 mmol/L)"
                subtitle="空腹参考 3.9~6.1 / 餐后 <7.8"
                data={[
                  { date: '09-12', f: 5.9, p: 7.6 },
                  { date: '09-13', f: 5.7, p: 7.3 },
                  { date: '09-14', f: 6.0, p: 7.9 },
                  { date: '09-15', f: 6.4, p: 8.4 },
                  { date: '09-16', f: 5.8, p: 7.5 },
                  { date: '09-17', f: 6.2, p: 8.6 },
                  { date: '09-18', f: 5.9, p: 7.4 },
                  { date: '09-19', f: 5.8, p: 7.2 },
                ]}
                series={[
                  {
                    key: 'f',
                    name: '空腹血糖',
                    stroke: '#10b981',
                    fill: '#10b981',
                    gradientId: 'grad-glc-f-curve',
                    unit: 'mmol/L',
                  },
                  {
                    key: 'p',
                    name: '餐后血糖',
                    stroke: '#f59e0b',
                    fill: '#f59e0b',
                    gradientId: 'grad-glc-p-curve',
                    unit: 'mmol/L',
                  },
                ]}
                minY={3.5}
                maxY={10.0}
                referenceLine={{ value: 7.8, label: '餐后达标警戒 7.8', color: '#f59e0b' }}
                normalBand={{ min: 3.9, max: 6.1, label: '空腹正常范围' }}
                footerInfo={
                  <>
                    <span>空腹均值: 5.9 mmol/L · 餐后均值: 7.7 mmol/L</span>
                    <span className="text-emerald-600 font-medium">血糖指标平稳达标</span>
                  </>
                }
              />
            ) : (
              /* 血糖波动趋势 (空腹 vs 餐后) 柱状图 */
              <div className="bg-gray-50/70 p-4 rounded-xl border border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-gray-700">血糖趋势 (mmol/L)</span>
                  <div className="flex items-center space-x-3 text-[10px]">
                    <span className="flex items-center space-x-1"><span className="w-2 h-2 bg-emerald-500 rounded-full inline-block"></span><span>空腹</span></span>
                    <span className="flex items-center space-x-1"><span className="w-2 h-2 bg-amber-500 rounded-full inline-block"></span><span>餐后</span></span>
                  </div>
                </div>
                <div className="h-44 flex items-end justify-between space-x-2 pt-6 px-3 border-b border-gray-200 pb-2">
                  {[
                    { d: '09-12', f: 5.9, p: 7.6 },
                    { d: '09-13', f: 5.7, p: 7.3 },
                    { d: '09-14', f: 6.0, p: 7.9 },
                    { d: '09-15', f: 6.4, p: 8.4 },
                    { d: '09-16', f: 5.8, p: 7.5 },
                    { d: '09-17', f: 6.2, p: 8.6 },
                    { d: '09-18', f: 5.9, p: 7.4 },
                    { d: '09-19', f: 5.8, p: 7.2 },
                  ].map((item, idx) => {
                    return (
                      <div key={idx} className="flex-1 flex flex-col items-center space-y-1">
                        <span className="text-[10px] font-mono text-gray-700 font-bold">
                          {item.f}/{item.p}
                        </span>
                        <div className="flex items-end space-x-1 h-32">
                          <div className="w-2 bg-emerald-500 rounded-t-sm" style={{ height: `${(item.f / 10) * 100}%` }} />
                          <div className="w-2 bg-amber-500 rounded-t-sm" style={{ height: `${(item.p / 10) * 100}%` }} />
                        </div>
                        <span className="text-[10px] text-gray-500 font-mono">{item.d}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="flex items-center justify-between text-[11px] text-gray-500 mt-3 pt-1">
                  <span>空腹参考: 3.9 ~ 6.1 mmol/L</span>
                  <span>餐后两小时: &lt; 7.8 mmol/L</span>
                </div>
              </div>
            )}

            {/* 餐次平均值柱状图 */}
            <div className="bg-gray-50/70 p-4 rounded-xl border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold text-gray-700">各时段平均血糖 (mmol/L)</span>
                <span className="text-[11px] text-gray-400">近期 16 次测量汇总</span>
              </div>
              <div className="h-44 flex items-end justify-between space-x-2 pt-6 px-3 border-b border-gray-200 pb-2">
                {[
                  { p: '早餐前', v: 5.9, st: '正常' },
                  { p: '早餐后', v: 7.5, st: '正常' },
                  { p: '午餐前', v: 5.7, st: '正常' },
                  { p: '午餐后', v: 7.8, st: '正常' },
                  { p: '晚餐前', v: 5.8, st: '正常' },
                  { p: '晚餐后', v: 8.0, st: '偏高' },
                ].map((item, idx) => {
                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center space-y-1">
                      <span className={`text-[10px] font-mono font-bold ${item.st === '偏高' ? 'text-amber-600' : 'text-emerald-700'}`}>
                        {item.v}
                      </span>
                      <div
                        className={`w-4 rounded-t-sm ${item.st === '偏高' ? 'bg-amber-400' : 'bg-emerald-500'}`}
                        style={{ height: `${(item.v / 10) * 100}%` }}
                      />
                      <span className="text-[10px] text-gray-500">{item.p}</span>
                    </div>
                  );
                })}
              </div>
              <div className="text-[11px] text-gray-500 mt-3 pt-1 flex justify-between">
                <span>晚餐后稍有轻度波动偏高</span>
                <span className="text-amber-600 font-medium">建议晚餐减少升糖主食摄入</span>
              </div>
            </div>
          </div>
        )}

        {/* 5. 血压趋势图 */}
        {activeSubTab === '血压' && (
          chartViewMode === 'curve' ? (
            <SmoothCurveChart
              title="血压高低压双平滑曲线走势 (mmHg)"
              subtitle="理想目标: 收缩压 <130 / 舒张压 <80 mmHg"
              data={[
                { date: '09-12', sys: 133, dia: 82 },
                { date: '09-13', sys: 128, dia: 78 },
                { date: '09-14', sys: 133, dia: 82 },
                { date: '09-15', sys: 142, dia: 88 },
                { date: '09-16', sys: 130, dia: 80 },
                { date: '09-17', sys: 138, dia: 86 },
                { date: '09-18', sys: 132, dia: 82 },
                { date: '09-19', sys: 130, dia: 80 },
              ]}
              series={[
                {
                  key: 'sys',
                  name: '收缩压 (高压)',
                  stroke: '#0284c7',
                  fill: '#0284c7',
                  gradientId: 'grad-bp-sys-curve',
                  unit: 'mmHg',
                },
                {
                  key: 'dia',
                  name: '舒张压 (低压)',
                  stroke: '#10b981',
                  fill: '#10b981',
                  gradientId: 'grad-bp-dia-curve',
                  unit: 'mmHg',
                },
              ]}
              minY={60}
              maxY={155}
              referenceLine={{ value: 140, label: '高压警戒线 140', color: '#ef4444' }}
              normalBand={{ min: 60, max: 90, label: '舒张压正常范围 60~90' }}
              footerInfo={
                <>
                  <span>收缩压中位数: 132 mmHg · 舒张压中位数: 81 mmHg</span>
                  <span className="text-emerald-600 font-medium">长效降压药物控制平稳满意</span>
                </>
              }
            />
          ) : (
            <div className="bg-gray-50/70 p-4 rounded-xl border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold text-gray-700">血压波动区间分布 (收缩压 / 舒张压 mmHg)</span>
                <span className="text-[11px] text-gray-400">达标理想标准: &lt;130 / 80 mmHg</span>
              </div>
              <div className="h-44 flex items-end justify-between space-x-3 pt-6 px-4 border-b border-gray-200 pb-2">
                {[
                  { d: '09-12', sys: 133, dia: 82, st: '正常' },
                  { d: '09-13', sys: 128, dia: 78, st: '正常' },
                  { d: '09-14', sys: 133, dia: 82, st: '正常' },
                  { d: '09-15', sys: 142, dia: 88, st: '偏高' },
                  { d: '09-16', sys: 130, dia: 80, st: '正常' },
                  { d: '09-17', sys: 138, dia: 86, st: '偏高' },
                  { d: '09-18', sys: 132, dia: 82, st: '正常' },
                  { d: '09-19', sys: 130, dia: 80, st: '正常' },
                ].map((item, idx) => {
                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center space-y-1">
                      <span className={`text-[10px] font-mono font-bold ${item.st === '偏高' ? 'text-amber-600' : 'text-emerald-700'}`}>
                        {item.sys}/{item.dia}
                      </span>
                      <div className="w-5 bg-gray-200 rounded-md relative flex flex-col justify-end" style={{ height: '80%' }}>
                        <div
                          className={`rounded-md ${item.st === '偏高' ? 'bg-amber-400' : 'bg-emerald-500'}`}
                          style={{
                            height: `${((item.sys - item.dia) / 100) * 120}%`,
                            marginBottom: `${((item.dia - 60) / 100) * 80}%`,
                          }}
                        />
                      </div>
                      <span className="text-[10px] text-gray-500 font-mono">{item.d}</span>
                    </div>
                  );
                })}
              </div>
              <div className="flex items-center justify-between text-[11px] text-gray-500 mt-3 pt-1">
                <span>近8天收缩压中位数: 132 mmHg · 舒张压中位数: 81 mmHg</span>
                <span className="text-emerald-600 font-medium">长效降压药物控制满意</span>
              </div>
            </div>
          )
        )}

        {/* 6. 血氧与心率走势 */}
        {activeSubTab === '血氧饱和度' && (
          chartViewMode === 'curve' ? (
            <SmoothCurveChart
              title="血氧饱和度平滑走势曲线 (SpO2 %)"
              subtitle="安全参考: 95% ~ 100%"
              data={[
                { date: '09-12', v: 98 },
                { date: '09-13', v: 97 },
                { date: '09-14', v: 96 },
                { date: '09-15', v: 98 },
                { date: '09-16', v: 99 },
                { date: '09-17', v: 97 },
                { date: '09-18', v: 98 },
                { date: '09-19', v: 99 },
              ]}
              series={[
                {
                  key: 'v',
                  name: 'SpO2 血氧',
                  stroke: '#10b981',
                  fill: '#10b981',
                  gradientId: 'grad-spo2-curve',
                  unit: '%',
                },
              ]}
              minY={92}
              maxY={101}
              referenceLine={{ value: 95, label: '安全预警下限 95%', color: '#ef4444' }}
              normalBand={{ min: 95, max: 100, label: '正常血氧区间' }}
              footerInfo={
                <>
                  <span>平均血氧饱和度: 97.8%</span>
                  <span className="text-emerald-600 font-medium">血氧充沛稳定，无夜间呼吸暂停低通气征象</span>
                </>
              }
            />
          ) : (
            <div className="bg-gray-50/70 p-4 rounded-xl border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold text-gray-700">血氧饱和度走势 (SpO2 %)</span>
                <span className="text-[11px] text-emerald-600 font-medium">安全正常区间: 95% ~ 100%</span>
              </div>
              <div className="h-44 flex items-end justify-between space-x-3 pt-6 px-4 border-b border-gray-200 pb-2">
                {[
                  { d: '09-12', v: 98 },
                  { d: '09-13', v: 97 },
                  { d: '09-14', v: 96 },
                  { d: '09-15', v: 98 },
                  { d: '09-16', v: 99 },
                  { d: '09-17', v: 97 },
                  { d: '09-18', v: 98 },
                  { d: '09-19', v: 99 },
                ].map((item, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center space-y-1">
                    <span className="text-[10px] font-mono text-emerald-700 font-bold">{item.v}%</span>
                    <div className="w-5 bg-emerald-500 rounded-t-md" style={{ height: `${((item.v - 90) / 10) * 100}%` }} />
                    <span className="text-[10px] text-gray-500 font-mono">{item.d}</span>
                  </div>
                ))}
              </div>
              <div className="text-[11px] text-gray-500 mt-3 pt-1">
                血氧充沛稳定，无夜间呼吸暂停低通气征象。
              </div>
            </div>
          )
        )}

        {activeSubTab === '心率' && (
          chartViewMode === 'curve' ? (
            <SmoothCurveChart
              title="心率动态平滑走势曲线 (bpm)"
              subtitle="静息常态参考: 60 ~ 85 bpm"
              data={[
                { date: '09-12', v: 74 },
                { date: '09-13', v: 76 },
                { date: '09-14', v: 68 },
                { date: '09-15', v: 78 },
                { date: '09-16', v: 70 },
                { date: '09-17', v: 76 },
                { date: '09-18', v: 72 },
                { date: '09-19', v: 74 },
              ]}
              series={[
                {
                  key: 'v',
                  name: '静息心率',
                  stroke: '#0d9488',
                  fill: '#0d9488',
                  gradientId: 'grad-hr-curve',
                  unit: 'bpm',
                },
              ]}
              minY={55}
              maxY={92}
              normalBand={{ min: 60, max: 85, label: '正常心率区间 60~85 bpm' }}
              footerInfo={
                <>
                  <span>平均静息心率: 73.5 bpm</span>
                  <span className="text-teal-600 font-medium">窦性心律规整，无早搏或异常停搏记录</span>
                </>
              }
            />
          ) : (
            <div className="bg-gray-50/70 p-4 rounded-xl border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold text-gray-700">心率变化 (次/分 bpm)</span>
                <span className="text-[11px] text-gray-400">静息常态参考: 60 ~ 85 bpm</span>
              </div>
              <div className="h-44 flex items-end justify-between space-x-3 pt-6 px-4 border-b border-gray-200 pb-2">
                {[
                  { d: '09-12', v: 74 },
                  { d: '09-13', v: 76 },
                  { d: '09-14', v: 68 },
                  { d: '09-15', v: 78 },
                  { d: '09-16', v: 70 },
                  { d: '09-17', v: 76 },
                  { d: '09-18', v: 72 },
                  { d: '09-19', v: 74 },
                ].map((item, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center space-y-1">
                    <span className="text-[10px] font-mono text-emerald-700 font-bold">{item.v}</span>
                    <div className="w-5 bg-teal-500 rounded-t-md" style={{ height: `${((item.v - 50) / 40) * 100}%` }} />
                    <span className="text-[10px] text-gray-500 font-mono">{item.d}</span>
                  </div>
                ))}
              </div>
              <div className="text-[11px] text-gray-500 mt-3 pt-1">
                平均静息心率 73.5 bpm，窦性心律规整。
              </div>
            </div>
          )
        )}
      </div>

      {/* 数据记录表格与操作区 (Matching Images 7, 8, 10, 12, 15, 18) */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-gray-800 text-sm">
              {activeSubTab}历史测量数据明细
            </span>
            <span className="text-gray-400 text-xs">(严格降序归档)</span>
          </div>

          <div className="flex items-center space-x-2.5">
            <button
              type="button"
              onClick={handleOpenAdd}
              className="px-4 py-2 bg-[#10b981] hover:bg-[#059669] text-white rounded-lg font-medium transition-colors shadow-xs flex items-center space-x-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>新增数据</span>
            </button>
            <button
              type="button"
              onClick={() => {
                if (selectedIds.length === 0) {
                  onNotice('请先勾选需要批量操作的数据记录');
                  return;
                }
                onNotice(`已选择 ${selectedIds.length} 条记录进行批量归档导出`);
              }}
              className="px-3.5 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-lg font-medium transition-colors"
            >
              批量操作
            </button>
          </div>
        </div>

        {/* 动态表格渲染 */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#f9fafb] text-gray-500 border-b border-gray-100 font-medium">
              <tr>
                <th className="py-3 px-3 w-10 text-center">
                  <input
                    type="checkbox"
                    className="rounded text-[#10b981] focus:ring-[#10b981]"
                  />
                </th>
                <th className="py-3 px-3">测量时间 (降序)</th>

                {/* Specific Columns */}
                {activeSubTab === '体重' && (
                  <>
                    <th className="py-3 px-3">体重 (kg)</th>
                    <th className="py-3 px-3">BMI 指数</th>
                  </>
                )}
                {activeSubTab === '步数' && (
                  <th className="py-3 px-3">步数</th>
                )}
                {activeSubTab === '睡眠' && (
                  <>
                    <th className="py-3 px-3">入睡时间</th>
                    <th className="py-3 px-3">醒来时间</th>
                    <th className="py-3 px-3">睡眠总时长</th>
                    <th className="py-3 px-3">深睡时长</th>
                    <th className="py-3 px-3">浅睡时长</th>
                    <th className="py-3 px-3">快速眼动</th>
                  </>
                )}
                {activeSubTab === '血糖' && (
                  <>
                    <th className="py-3 px-3">测量时间段</th>
                    <th className="py-3 px-3">血糖 (mmol/L)</th>
                    <th className="py-3 px-3">评估</th>
                  </>
                )}
                {activeSubTab === '血压' && (
                  <>
                    <th className="py-3 px-3">舒张压 (mmHg)</th>
                    <th className="py-3 px-3">收缩压 (mmHg)</th>
                    <th className="py-3 px-3">评估</th>
                  </>
                )}
                {activeSubTab === '血氧饱和度' && (
                  <>
                    <th className="py-3 px-3">血氧饱和度 (%)</th>
                    <th className="py-3 px-3">评估</th>
                  </>
                )}
                {activeSubTab === '心率' && (
                  <>
                    <th className="py-3 px-3">心率 (次/分)</th>
                    <th className="py-3 px-3">评估</th>
                  </>
                )}

                <th className="py-3 px-3">数据来源</th>
                <th className="py-3 px-3">添加人</th>
                <th className="py-3 px-4 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {/* 体重表格 */}
              {activeSubTab === '体重' &&
                weights.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50/70">
                    <td className="py-3.5 px-3 text-center">
                      <input type="checkbox" className="rounded text-[#10b981]" />
                    </td>
                    <td className="py-3.5 px-3 font-mono text-gray-700">{row.time}</td>
                    <td className="py-3.5 px-3 font-mono font-bold text-gray-800">{row.weight}</td>
                    <td className="py-3.5 px-3 font-mono text-gray-600">{row.bmi}</td>
                    <td className="py-3.5 px-3 text-gray-600">{row.source}</td>
                    <td className="py-3.5 px-3 text-gray-700">{row.addedBy}</td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      <button onClick={() => handleOpenEdit(row)} className="text-[#10b981] hover:underline">编辑</button>
                      <button onClick={() => setDeleteTargetId(row.id)} className="text-rose-500 hover:underline">删除</button>
                    </td>
                  </tr>
                ))}

              {/* 步数表格 */}
              {activeSubTab === '步数' &&
                steps.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50/70">
                    <td className="py-3.5 px-3 text-center">
                      <input type="checkbox" className="rounded text-[#10b981]" />
                    </td>
                    <td className="py-3.5 px-3 font-mono text-gray-700">{row.time}</td>
                    <td className="py-3.5 px-3 font-mono font-bold text-gray-800">{row.steps.toLocaleString()} 步</td>
                    <td className="py-3.5 px-3 text-gray-600">{row.source}</td>
                    <td className="py-3.5 px-3 text-gray-700">{row.addedBy}</td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      <button onClick={() => handleOpenEdit(row)} className="text-[#10b981] hover:underline">编辑</button>
                      <button onClick={() => setDeleteTargetId(row.id)} className="text-rose-500 hover:underline">删除</button>
                    </td>
                  </tr>
                ))}

              {/* 睡眠表格 */}
              {activeSubTab === '睡眠' &&
                sleeps.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50/70">
                    <td className="py-3.5 px-3 text-center">
                      <input type="checkbox" className="rounded text-[#10b981]" />
                    </td>
                    <td className="py-3.5 px-3 font-mono text-gray-700">{row.time}</td>
                    <td className="py-3.5 px-3 font-mono text-gray-600">{row.sleepTime}</td>
                    <td className="py-3.5 px-3 font-mono text-gray-600">{row.wakeTime}</td>
                    <td className="py-3.5 px-3 font-semibold text-emerald-700">{row.totalDurationText}</td>
                    <td className="py-3.5 px-3 text-indigo-700 font-mono">{row.deepText}</td>
                    <td className="py-3.5 px-3 text-sky-700 font-mono">{row.lightText}</td>
                    <td className="py-3.5 px-3 text-emerald-600 font-mono">{row.remText}</td>
                    <td className="py-3.5 px-3 text-gray-600">{row.source}</td>
                    <td className="py-3.5 px-3 text-gray-700">{row.addedBy}</td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      <button onClick={() => handleOpenEdit(row)} className="text-[#10b981] hover:underline">编辑</button>
                      <button onClick={() => setDeleteTargetId(row.id)} className="text-rose-500 hover:underline">删除</button>
                    </td>
                  </tr>
                ))}

              {/* 血糖表格 */}
              {activeSubTab === '血糖' &&
                glucoses.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50/70">
                    <td className="py-3.5 px-3 text-center">
                      <input type="checkbox" className="rounded text-[#10b981]" />
                    </td>
                    <td className="py-3.5 px-3 font-mono text-gray-700">{row.time}</td>
                    <td className="py-3.5 px-3">
                      <span className="px-2 py-0.5 bg-gray-100 rounded text-gray-700 text-[11px]">
                        {row.period}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 font-mono font-bold text-gray-800">{row.value}</td>
                    <td className="py-3.5 px-3">
                      <span className={`inline-flex items-center space-x-1 ${row.status === '偏高' ? 'text-amber-600' : 'text-emerald-600'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${row.status === '偏高' ? 'bg-amber-500' : 'bg-emerald-500'}`}></span>
                        <span>{row.status}</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-gray-600">{row.source}</td>
                    <td className="py-3.5 px-3 text-gray-700">{row.addedBy}</td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      <button onClick={() => handleOpenEdit(row)} className="text-[#10b981] hover:underline">编辑</button>
                      <button onClick={() => setDeleteTargetId(row.id)} className="text-rose-500 hover:underline">删除</button>
                    </td>
                  </tr>
                ))}

              {/* 血压表格 */}
              {activeSubTab === '血压' &&
                bps.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50/70">
                    <td className="py-3.5 px-3 text-center">
                      <input type="checkbox" className="rounded text-[#10b981]" />
                    </td>
                    <td className="py-3.5 px-3 font-mono text-gray-700">{row.time}</td>
                    <td className="py-3.5 px-3 font-mono text-gray-700">{row.diastolic}</td>
                    <td className="py-3.5 px-3 font-mono font-bold text-gray-800">{row.systolic}</td>
                    <td className="py-3.5 px-3">
                      <span className={`inline-flex items-center space-x-1 ${row.status === '偏高' ? 'text-amber-600' : 'text-emerald-600'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${row.status === '偏高' ? 'bg-amber-500' : 'bg-emerald-500'}`}></span>
                        <span>{row.status}</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-gray-600">{row.source}</td>
                    <td className="py-3.5 px-3 text-gray-700">{row.addedBy}</td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      <button onClick={() => handleOpenEdit(row)} className="text-[#10b981] hover:underline">编辑</button>
                      <button onClick={() => setDeleteTargetId(row.id)} className="text-rose-500 hover:underline">删除</button>
                    </td>
                  </tr>
                ))}

              {/* 血氧表格 */}
              {activeSubTab === '血氧饱和度' &&
                spo2s.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50/70">
                    <td className="py-3.5 px-3 text-center">
                      <input type="checkbox" className="rounded text-[#10b981]" />
                    </td>
                    <td className="py-3.5 px-3 font-mono text-gray-700">{row.time}</td>
                    <td className="py-3.5 px-3 font-mono font-bold text-emerald-700">{row.spo2} %</td>
                    <td className="py-3.5 px-3">
                      <span className="inline-flex items-center space-x-1 text-emerald-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        <span>{row.status}</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-gray-600">{row.source}</td>
                    <td className="py-3.5 px-3 text-gray-700">{row.addedBy}</td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      <button onClick={() => handleOpenEdit(row)} className="text-[#10b981] hover:underline">编辑</button>
                      <button onClick={() => setDeleteTargetId(row.id)} className="text-rose-500 hover:underline">删除</button>
                    </td>
                  </tr>
                ))}

              {/* 心率表格 */}
              {activeSubTab === '心率' &&
                hrs.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50/70">
                    <td className="py-3.5 px-3 text-center">
                      <input type="checkbox" className="rounded text-[#10b981]" />
                    </td>
                    <td className="py-3.5 px-3 font-mono text-gray-700">{row.time}</td>
                    <td className="py-3.5 px-3 font-mono font-bold text-teal-700">{row.heartRate} 次/分</td>
                    <td className="py-3.5 px-3">
                      <span className="inline-flex items-center space-x-1 text-emerald-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        <span>{row.status}</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-gray-600">{row.source}</td>
                    <td className="py-3.5 px-3 text-gray-700">{row.addedBy}</td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      <button onClick={() => handleOpenEdit(row)} className="text-[#10b981] hover:underline">编辑</button>
                      <button onClick={() => setDeleteTargetId(row.id)} className="text-rose-500 hover:underline">删除</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* 分页栏 */}
        <div className="p-4 border-t border-gray-100 flex items-center justify-between text-gray-500 text-xs">
          <span>
            共{' '}
            {activeSubTab === '体重' && weights.length}
            {activeSubTab === '步数' && steps.length}
            {activeSubTab === '睡眠' && sleeps.length}
            {activeSubTab === '血糖' && glucoses.length}
            {activeSubTab === '血压' && bps.length}
            {activeSubTab === '血氧饱和度' && spo2s.length}
            {activeSubTab === '心率' && hrs.length}{' '}
            条记录
          </span>
          <div className="flex items-center space-x-2">
            <button type="button" disabled className="p-1 rounded border border-gray-200 text-gray-300 cursor-not-allowed">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-2.5 py-1 bg-[#10b981] text-white rounded font-medium">1</span>
            <button type="button" disabled className="p-1 rounded border border-gray-200 text-gray-300 cursor-not-allowed">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 新增/编辑数据弹窗 (Image 9, 11, 14, 17) */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="text-base font-semibold text-gray-800">
                {editItem ? `编辑${activeSubTab}数据` : `新增${activeSubTab}数据`}
              </h3>
              <button
                type="button"
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="p-6 space-y-4 text-xs">
              {/* 测量时间* */}
              <div className="flex items-center space-x-3">
                <span className="w-24 text-gray-600 font-medium shrink-0 text-right">
                  <span className="text-rose-500 mr-0.5">*</span>测量时间
                </span>
                <input
                  type="text"
                  required
                  value={formTime}
                  onChange={(e) => setFormTime(e.target.value)}
                  className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 focus:bg-white focus:outline-none focus:border-[#10b981] font-mono"
                />
              </div>

              {/* 体重专属字段 (Image 9) */}
              {activeSubTab === '体重' && (
                <div className="flex items-center space-x-3">
                  <span className="w-24 text-gray-600 font-medium shrink-0 text-right">
                    <span className="text-rose-500 mr-0.5">*</span>体重(kg)
                  </span>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={formWeight}
                    onChange={(e) => setFormWeight(e.target.value)}
                    className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 focus:bg-white focus:outline-none focus:border-[#10b981] font-mono"
                  />
                </div>
              )}

              {/* 步数专属字段 (Image 11) */}
              {activeSubTab === '步数' && (
                <div className="flex items-center space-x-3">
                  <span className="w-24 text-gray-600 font-medium shrink-0 text-right">
                    <span className="text-rose-500 mr-0.5">*</span>步数(步)
                  </span>
                  <input
                    type="number"
                    required
                    value={formSteps}
                    onChange={(e) => setFormSteps(e.target.value)}
                    className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 focus:bg-white focus:outline-none focus:border-[#10b981] font-mono"
                  />
                </div>
              )}

              {/* 睡眠专属字段 (Image 14) */}
              {activeSubTab === '睡眠' && (
                <>
                  <div className="flex items-center space-x-3">
                    <span className="w-24 text-gray-600 font-medium shrink-0 text-right">
                      <span className="text-rose-500 mr-0.5">*</span>入睡时间
                    </span>
                    <input
                      type="text"
                      required
                      value={formSleepStart}
                      onChange={(e) => setFormSleepStart(e.target.value)}
                      className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 focus:bg-white focus:outline-none focus:border-[#10b981] font-mono"
                    />
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="w-24 text-gray-600 font-medium shrink-0 text-right">
                      <span className="text-rose-500 mr-0.5">*</span>醒来时间
                    </span>
                    <input
                      type="text"
                      required
                      value={formSleepEnd}
                      onChange={(e) => setFormSleepEnd(e.target.value)}
                      className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 focus:bg-white focus:outline-none focus:border-[#10b981] font-mono"
                    />
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="w-24 text-gray-600 font-medium shrink-0 text-right">深睡时长</span>
                    <div className="flex items-center space-x-2 flex-1">
                      <input
                        type="number"
                        value={formDeepHours}
                        onChange={(e) => setFormDeepHours(e.target.value)}
                        className="w-16 px-2 py-2 bg-gray-50 border border-gray-200 rounded-lg text-center"
                      />
                      <span>h</span>
                      <input
                        type="number"
                        value={formDeepMins}
                        onChange={(e) => setFormDeepMins(e.target.value)}
                        className="w-16 px-2 py-2 bg-gray-50 border border-gray-200 rounded-lg text-center"
                      />
                      <span>min</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="w-24 text-gray-600 font-medium shrink-0 text-right">浅睡时长</span>
                    <div className="flex items-center space-x-2 flex-1">
                      <input
                        type="number"
                        value={formLightHours}
                        onChange={(e) => setFormLightHours(e.target.value)}
                        className="w-16 px-2 py-2 bg-gray-50 border border-gray-200 rounded-lg text-center"
                      />
                      <span>h</span>
                      <input
                        type="number"
                        value={formLightMins}
                        onChange={(e) => setFormLightMins(e.target.value)}
                        className="w-16 px-2 py-2 bg-gray-50 border border-gray-200 rounded-lg text-center"
                      />
                      <span>min</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="w-24 text-gray-600 font-medium shrink-0 text-right">快速眼动</span>
                    <div className="flex items-center space-x-2 flex-1">
                      <input
                        type="number"
                        value={formRemHours}
                        onChange={(e) => setFormRemHours(e.target.value)}
                        className="w-16 px-2 py-2 bg-gray-50 border border-gray-200 rounded-lg text-center"
                      />
                      <span>h</span>
                      <input
                        type="number"
                        value={formRemMins}
                        onChange={(e) => setFormRemMins(e.target.value)}
                        className="w-16 px-2 py-2 bg-gray-50 border border-gray-200 rounded-lg text-center"
                      />
                      <span>min</span>
                    </div>
                  </div>
                </>
              )}

              {/* 血糖专属字段 (Image 17) */}
              {activeSubTab === '血糖' && (
                <>
                  <div className="flex items-center space-x-3">
                    <span className="w-24 text-gray-600 font-medium shrink-0 text-right">
                      <span className="text-rose-500 mr-0.5">*</span>测量时间段
                    </span>
                    <select
                      value={formGlucosePeriod}
                      onChange={(e) => setFormGlucosePeriod(e.target.value as any)}
                      className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-800"
                    >
                      <option value="早餐前">早餐前</option>
                      <option value="早餐后">早餐后</option>
                      <option value="午餐前">午餐前</option>
                      <option value="午餐后">午餐后</option>
                      <option value="晚餐前">晚餐前</option>
                      <option value="晚餐后">晚餐后</option>
                      <option value="睡前">睡前</option>
                    </select>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="w-24 text-gray-600 font-medium shrink-0 text-right">
                      <span className="text-rose-500 mr-0.5">*</span>血糖值(mmol/L)
                    </span>
                    <input
                      type="number"
                      step="0.1"
                      required
                      value={formGlucoseVal}
                      onChange={(e) => setFormGlucoseVal(e.target.value)}
                      className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 focus:bg-white focus:outline-none focus:border-[#10b981] font-mono"
                    />
                  </div>
                </>
              )}

              {/* 血压专属字段 */}
              {activeSubTab === '血压' && (
                <>
                  <div className="flex items-center space-x-3">
                    <span className="w-24 text-gray-600 font-medium shrink-0 text-right">
                      <span className="text-rose-500 mr-0.5">*</span>收缩压(mmHg)
                    </span>
                    <input
                      type="number"
                      required
                      value={formSys}
                      onChange={(e) => setFormSys(e.target.value)}
                      className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg font-mono"
                    />
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="w-24 text-gray-600 font-medium shrink-0 text-right">
                      <span className="text-rose-500 mr-0.5">*</span>舒张压(mmHg)
                    </span>
                    <input
                      type="number"
                      required
                      value={formDia}
                      onChange={(e) => setFormDia(e.target.value)}
                      className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg font-mono"
                    />
                  </div>
                </>
              )}

              {/* 血氧专属字段 */}
              {activeSubTab === '血氧饱和度' && (
                <div className="flex items-center space-x-3">
                  <span className="w-24 text-gray-600 font-medium shrink-0 text-right">
                    <span className="text-rose-500 mr-0.5">*</span>血氧(%)
                  </span>
                  <input
                    type="number"
                    required
                    value={formSpo2Val}
                    onChange={(e) => setFormSpo2Val(e.target.value)}
                    className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg font-mono"
                  />
                </div>
              )}

              {/* 心率专属字段 */}
              {activeSubTab === '心率' && (
                <div className="flex items-center space-x-3">
                  <span className="w-24 text-gray-600 font-medium shrink-0 text-right">
                    <span className="text-rose-500 mr-0.5">*</span>心率(次/分)
                  </span>
                  <input
                    type="number"
                    required
                    value={formHrVal}
                    onChange={(e) => setFormHrVal(e.target.value)}
                    className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg font-mono"
                  />
                </div>
              )}

              {/* 底部按钮 */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-5 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 font-medium"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#10b981] hover:bg-[#059669] text-white rounded-lg font-medium shadow-xs"
                >
                  确定
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 删除确认弹窗 */}
      {deleteTargetId && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-6 text-center animate-in fade-in duration-200 space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-gray-800">操作确认</h4>
              <p className="text-gray-500 mt-2 text-xs leading-relaxed">
                信息删除后无法恢复，确定要删除吗？
              </p>
            </div>
            <div className="flex items-center justify-center space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteTargetId(null)}
                className="px-5 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 font-medium text-xs"
              >
                取消
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-5 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-lg font-medium text-xs shadow-xs"
              >
                确定
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
