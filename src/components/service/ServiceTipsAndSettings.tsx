import React, { useState } from 'react';
import { Search, RotateCcw } from 'lucide-react';

interface ServiceTipsAndSettingsProps {
  type: 'tips' | 'settings';
  onNotice: (msg: string) => void;
}

interface TipItem {
  id: string;
  tipTime: string;
  staffName: string;
  staffAvatar: string;
  staffId: string;
  tipAmount: number;
  settlementStatus: '已结算' | '待结算';
  userName: string;
  userAvatar: string;
  applyTime: string;
  settledTime: string;
}

const INITIAL_TIPS: TipItem[] = [
  {
    id: 'TIP2026091901',
    tipTime: '2026-09-19 10:09:09',
    staffName: '王小倩',
    staffAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
    staffId: '2024340089',
    tipAmount: 50.00,
    settlementStatus: '已结算',
    userName: '王强',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    applyTime: '2026-09-19 10:30:09',
    settledTime: '2026-09-19 11:15:00',
  },
  {
    id: 'TIP2026091802',
    tipTime: '2026-09-18 16:45:00',
    staffName: '钱立峰',
    staffAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80',
    staffId: '2024340088',
    tipAmount: 66.00,
    settlementStatus: '已结算',
    userName: '孙阿姨',
    userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
    applyTime: '2026-09-18 17:00:00',
    settledTime: '2026-09-18 18:30:00',
  },
  {
    id: 'TIP2026091703',
    tipTime: '2026-09-17 11:30:00',
    staffName: '陈志远',
    staffAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    staffId: '2024340085',
    tipAmount: 88.00,
    settlementStatus: '已结算',
    userName: '周伯伯',
    userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    applyTime: '2026-09-17 12:00:00',
    settledTime: '2026-09-17 14:00:00',
  },
  {
    id: 'TIP2026091501',
    tipTime: '2026-09-15 11:20:00',
    staffName: '张素珍',
    staffAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
    staffId: '2024340081',
    tipAmount: 100.00,
    settlementStatus: '已结算',
    userName: '郭老爷子家属',
    userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80',
    applyTime: '2026-09-15 11:45:00',
    settledTime: '2026-09-15 15:20:00',
  },
  {
    id: 'TIP2026091202',
    tipTime: '2026-09-12 15:50:00',
    staffName: '黄桂芬',
    staffAvatar: 'https://images.unsplash.com/photo-1548142813-c348350df52b?w=120&auto=format&fit=crop&q=80',
    staffId: '2024340078',
    tipAmount: 30.00,
    settlementStatus: '已结算',
    userName: '郑老伯',
    userAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80',
    applyTime: '2026-09-12 16:15:00',
    settledTime: '2026-09-12 17:30:00',
  },
  {
    id: 'TIP2026090801',
    tipTime: '2026-09-08 11:45:00',
    staffName: '周德明',
    staffAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    staffId: '2024340072',
    tipAmount: 50.00,
    settlementStatus: '已结算',
    userName: '马阿姨',
    userAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
    applyTime: '2026-09-08 12:10:00',
    settledTime: '2026-09-08 14:00:00',
  },
  {
    id: 'TIP2026090203',
    tipTime: '2026-09-02 10:40:00',
    staffName: '李建国',
    staffAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80',
    staffId: '2024340064',
    tipAmount: 60.00,
    settlementStatus: '已结算',
    userName: '谢老太太家属',
    userAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80',
    applyTime: '2026-09-02 11:00:00',
    settledTime: '2026-09-02 15:30:00',
  },
];

export const ServiceTipsAndSettings: React.FC<ServiceTipsAndSettingsProps> = ({ type, onNotice }) => {
  // Tips state
  const [tips] = useState<TipItem[]>(INITIAL_TIPS);
  const [selectedTipIds, setSelectedTipIds] = useState<string[]>([]);
  const [tipStatusFilter, setTipStatusFilter] = useState('');
  const [tipApplyStartDate, setTipApplyStartDate] = useState('');
  const [tipApplyEndDate, setTipApplyEndDate] = useState('');
  const [tipSettleStartDate, setTipSettleStartDate] = useState('');
  const [tipSettleEndDate, setTipSettleEndDate] = useState('');
  const [tipKeyword, setTipKeyword] = useState('');

  // Settings states (Matching Screenshot Image 3)
  const [grabScope, setGrabScope] = useState<'all' | 'part'>('all');
  const [grabFilter, setGrabFilter] = useState<'all' | 'region'>('all');
  const [dispatchFilter, setDispatchFilter] = useState<'all' | 'region'>('all');
  const [manualDispatchHours, setManualDispatchHours] = useState('2');
  const [allowRefuse, setAllowRefuse] = useState(false);

  if (type === 'settings') {
    const handleSaveSettings = (e: React.FormEvent) => {
      e.preventDefault();
      onNotice('工单设置已保存生效');
    };

    return (
      <div className="p-6 max-w-[1600px] mx-auto text-xs space-y-6">
        <div className="bg-white rounded-xl p-8 border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-8">
          {/* Title Header with green bar */}
          <div className="flex items-center space-x-2.5 pb-4 border-b border-gray-100">
            <span className="w-1 h-4 bg-[#10b981] rounded-full"></span>
            <h1 className="text-sm font-semibold text-gray-800">工单设置</h1>
          </div>

          <form onSubmit={handleSaveSettings} className="space-y-6 max-w-2xl text-gray-700">
            {/* 抢单人员范围 */}
            <div className="flex items-start space-x-6">
              <span className="w-28 pt-1 text-gray-600 font-medium whitespace-nowrap">抢单人员范围</span>
              <div className="flex items-center space-x-6">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="grabScope"
                    checked={grabScope === 'all'}
                    onChange={() => setGrabScope('all')}
                    className="accent-[#10b981] text-[#10b981]"
                  />
                  <span>全部服务人员可抢单</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="grabScope"
                    checked={grabScope === 'part'}
                    onChange={() => setGrabScope('part')}
                    className="accent-[#10b981] text-[#10b981]"
                  />
                  <span>部分服务人员可抢单</span>
                </label>
                {grabScope === 'part' && (
                  <button
                    type="button"
                    onClick={() => onNotice('打开选择服务人员窗口')}
                    className="text-[#10b981] hover:underline text-xs"
                  >
                    +选择人员
                  </button>
                )}
              </div>
            </div>

            {/* 抢单筛选 */}
            <div className="flex items-start space-x-6">
              <span className="w-28 pt-1 text-gray-600 font-medium whitespace-nowrap">抢单筛选</span>
              <div className="flex flex-col space-y-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="grabFilter"
                    checked={grabFilter === 'all'}
                    onChange={() => setGrabFilter('all')}
                    className="accent-[#10b981] text-[#10b981]"
                  />
                  <span>显示全部工单</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="grabFilter"
                    checked={grabFilter === 'region'}
                    onChange={() => setGrabFilter('region')}
                    className="accent-[#10b981] text-[#10b981]"
                  />
                  <span>仅显示服务人员负责区域内的工单</span>
                </label>
              </div>
            </div>

            {/* 派单筛选 */}
            <div className="flex items-start space-x-6">
              <span className="w-28 pt-1 text-gray-600 font-medium whitespace-nowrap">派单筛选</span>
              <div className="flex flex-col space-y-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="dispatchFilter"
                    checked={dispatchFilter === 'all'}
                    onChange={() => setDispatchFilter('all')}
                    className="accent-[#10b981] text-[#10b981]"
                  />
                  <span>显示全部服务人员</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="dispatchFilter"
                    checked={dispatchFilter === 'region'}
                    onChange={() => setDispatchFilter('region')}
                    className="accent-[#10b981] text-[#10b981]"
                  />
                  <span>仅显示负责该工单区域内的服务人员</span>
                </label>
              </div>
            </div>

            {/* 手动派单设置 */}
            <div className="flex items-center space-x-6">
              <span className="w-28 text-gray-600 font-medium whitespace-nowrap">手动派单设置</span>
              <div className="flex items-center space-x-2">
                <div className="flex border border-gray-200 rounded-md overflow-hidden focus-within:border-[#10b981]">
                  <input
                    type="text"
                    value={manualDispatchHours}
                    onChange={(e) => setManualDispatchHours(e.target.value)}
                    className="w-16 px-3 py-1.5 text-center text-gray-800 focus:outline-none text-xs"
                  />
                  <span className="bg-gray-50 text-gray-500 px-3 py-1.5 border-l border-gray-200 flex items-center">
                    小时
                  </span>
                </div>
                <span className="text-gray-500">无人抢单，提醒管理员手动派单</span>
              </div>
            </div>

            {/* 退单设置 */}
            <div className="flex items-center space-x-6">
              <span className="w-28 text-gray-600 font-medium whitespace-nowrap">退单设置</span>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={allowRefuse}
                  onChange={(e) => setAllowRefuse(e.target.checked)}
                  className="rounded accent-[#10b981] text-[#10b981]"
                />
                <span>允许服务人员拒绝派单</span>
              </label>
            </div>

            {/* Save Button */}
            <div className="pt-6">
              <button
                type="submit"
                className="px-6 py-2 bg-[#10b981] hover:bg-[#059669] text-white rounded-md font-medium transition-colors text-xs"
              >
                保存
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Otherwise, tips view (Matching Screenshot Image 2)
  const filteredTips = tips
    .filter((t) => {
      if (tipStatusFilter && t.settlementStatus !== tipStatusFilter) return false;
      if (tipApplyStartDate && t.applyTime.slice(0, 10) < tipApplyStartDate) return false;
      if (tipApplyEndDate && t.applyTime.slice(0, 10) > tipApplyEndDate) return false;
      if (tipSettleStartDate && t.settledTime.slice(0, 10) < tipSettleStartDate) return false;
      if (tipSettleEndDate && t.settledTime.slice(0, 10) > tipSettleEndDate) return false;
      if (tipKeyword) {
        const q = tipKeyword.trim().toLowerCase();
        return (
          t.id.toLowerCase().includes(q) ||
          t.staffName.toLowerCase().includes(q) ||
          t.staffId.includes(q) ||
          t.userName.toLowerCase().includes(q)
        );
      }
      return true;
    })
    .sort((a, b) => new Date(b.tipTime).getTime() - new Date(a.tipTime).getTime());

  const handleSelectAllTips = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedTipIds(filteredTips.map((t) => t.id));
    } else {
      setSelectedTipIds([]);
    }
  };

  const handleSelectOneTip = (id: string) => {
    if (selectedTipIds.includes(id)) {
      setSelectedTipIds(selectedTipIds.filter((item) => item !== id));
    } else {
      setSelectedTipIds([...selectedTipIds, id]);
    }
  };

  const handleResetTipFilters = () => {
    setTipStatusFilter('');
    setTipApplyStartDate('');
    setTipApplyEndDate('');
    setTipSettleStartDate('');
    setTipSettleEndDate('');
    setTipKeyword('');
    onNotice('已重置打赏记录检索条件');
  };

  return (
    <div className="p-6 max-w-[1600px] mx-auto text-xs space-y-6">
      {/* Filter Header (Screenshot Image 2) */}
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-5">
        <div className="flex items-center space-x-2.5 pb-2">
          <span className="w-1 h-4 bg-[#10b981] rounded-full"></span>
          <h1 className="text-sm font-semibold text-gray-800">打赏记录</h1>
        </div>

        {/* Row 1 Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          {/* 结算状态 */}
          <div className="flex items-center space-x-2">
            <span className="text-gray-500 whitespace-nowrap w-16">结算状态</span>
            <select
              value={tipStatusFilter}
              onChange={(e) => setTipStatusFilter(e.target.value)}
              className="flex-1 px-3 py-1.5 border border-gray-200 rounded-md text-gray-700 bg-white focus:outline-none focus:border-[#10b981]"
            >
              <option value="">请选择</option>
              <option value="已结算">已结算</option>
              <option value="待结算">待结算</option>
            </select>
          </div>

          {/* 申请结算日期 */}
          <div className="flex items-center space-x-2 md:col-span-2">
            <span className="text-gray-500 whitespace-nowrap w-20">申请结算日期</span>
            <div className="flex items-center space-x-2 flex-1">
              <input
                type="date"
                min="2026-09-01"
                max="2026-09-19"
                value={tipApplyStartDate}
                onChange={(e) => setTipApplyStartDate(e.target.value)}
                className="flex-1 px-2.5 py-1.5 border border-gray-200 rounded-md text-gray-700 text-xs focus:outline-none focus:border-[#10b981]"
              />
              <span className="text-gray-400">~</span>
              <input
                type="date"
                min="2026-09-01"
                max="2026-09-19"
                value={tipApplyEndDate}
                onChange={(e) => setTipApplyEndDate(e.target.value)}
                className="flex-1 px-2.5 py-1.5 border border-gray-200 rounded-md text-gray-700 text-xs focus:outline-none focus:border-[#10b981]"
              />
            </div>
          </div>
        </div>

        {/* Row 2 Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-1">
          {/* 结算日期 */}
          <div className="flex items-center space-x-2 w-full md:w-auto min-w-[320px]">
            <span className="text-gray-500 whitespace-nowrap w-16">结算日期</span>
            <div className="flex items-center space-x-2 flex-1">
              <input
                type="date"
                min="2026-09-01"
                max="2026-09-19"
                value={tipSettleStartDate}
                onChange={(e) => setTipSettleStartDate(e.target.value)}
                className="flex-1 px-2.5 py-1.5 border border-gray-200 rounded-md text-gray-700 text-xs focus:outline-none focus:border-[#10b981]"
              />
              <span className="text-gray-400">~</span>
              <input
                type="date"
                min="2026-09-01"
                max="2026-09-19"
                value={tipSettleEndDate}
                onChange={(e) => setTipSettleEndDate(e.target.value)}
                className="flex-1 px-2.5 py-1.5 border border-gray-200 rounded-md text-gray-700 text-xs focus:outline-none focus:border-[#10b981]"
              />
            </div>
          </div>

          {/* Search Input & Buttons */}
          <div className="flex items-center space-x-3 w-full md:w-auto flex-1 max-w-md">
            <input
              type="text"
              value={tipKeyword}
              onChange={(e) => setTipKeyword(e.target.value)}
              placeholder="请输入关键字"
              className="flex-1 px-3 py-1.5 border border-gray-200 rounded-md text-gray-700 focus:outline-none focus:border-[#10b981]"
            />
            <button
              onClick={() => onNotice(`已检索到 ${filteredTips.length} 条打赏明细`)}
              className="p-2 bg-[#10b981] hover:bg-[#059669] text-white rounded-md transition-colors shrink-0"
              title="搜索"
            >
              <Search className="w-4 h-4" />
            </button>
            <button
              onClick={handleResetTipFilters}
              className="p-2 border border-gray-200 hover:bg-gray-50 text-gray-500 rounded-md transition-colors shrink-0"
              title="重置"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Tips Table Card (Screenshot Image 2) */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-hidden">
        {/* Top Action */}
        <div className="p-4 flex items-center justify-end border-b border-gray-100">
          <button
            onClick={() => {
              if (selectedTipIds.length === 0) {
                onNotice('请先选择要进行批量操作的打赏记录');
              } else {
                onNotice(`已批量处理 ${selectedTipIds.length} 条打赏记录`);
              }
            }}
            className="px-4 py-1.5 border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-md font-medium transition-colors"
          >
            批量操作
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-gray-600 bg-gray-50/50">
                <th className="py-3 px-4 w-10">
                  <input
                    type="checkbox"
                    checked={selectedTipIds.length > 0 && selectedTipIds.length === filteredTips.length}
                    onChange={handleSelectAllTips}
                    className="rounded text-[#10b981] accent-[#10b981]"
                  />
                </th>
                <th className="py-3 px-4 font-medium">打赏时间</th>
                <th className="py-3 px-4 font-medium">服务人员</th>
                <th className="py-3 px-4 font-medium">服务人员ID</th>
                <th className="py-3 px-4 font-medium">打赏金额 (元)</th>
                <th className="py-3 px-4 font-medium">结算状态</th>
                <th className="py-3 px-4 font-medium">用户</th>
                <th className="py-3 px-4 font-medium">申请结算时间</th>
                <th className="py-3 px-4 font-medium">结算时间</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredTips.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-gray-400">
                    暂无符合条件的打赏记录
                  </td>
                </tr>
              ) : (
                filteredTips.map((tip) => (
                  <tr key={tip.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="py-3.5 px-4">
                      <input
                        type="checkbox"
                        checked={selectedTipIds.includes(tip.id)}
                        onChange={() => handleSelectOneTip(tip.id)}
                        className="rounded text-[#10b981] accent-[#10b981]"
                      />
                    </td>
                    <td className="py-3.5 px-4 font-mono text-gray-600 whitespace-nowrap">
                      {tip.tipTime}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center space-x-2.5">
                        <img
                          src={tip.staffAvatar}
                          alt=""
                          className="w-7 h-7 rounded-full object-cover border border-gray-100 shrink-0"
                        />
                        <span className="font-medium text-gray-800">{tip.staffName}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-gray-600">{tip.staffId}</td>
                    <td className="py-3.5 px-4 font-mono text-gray-800">
                      {tip.tipAmount.toFixed(2)}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center space-x-1.5 text-blue-600 text-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                        <span>{tip.settlementStatus}</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center space-x-2.5">
                        <img
                          src={tip.userAvatar}
                          alt=""
                          className="w-7 h-7 rounded-full object-cover border border-gray-100 shrink-0"
                        />
                        <span className="font-medium text-gray-800">{tip.userName}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-gray-500 whitespace-nowrap">
                      {tip.applyTime}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-gray-500 whitespace-nowrap">
                      {tip.settledTime}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
