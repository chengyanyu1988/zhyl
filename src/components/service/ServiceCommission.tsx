import React, { useState, useMemo } from 'react';
import { Search, RotateCcw, Calendar, CheckCircle2, DollarSign, X } from 'lucide-react';
import { ServiceCommissionItem, INITIAL_SERVICE_COMMISSIONS } from '../../data/serviceData';

interface ServiceCommissionProps {
  onNotice: (msg: string) => void;
}

export const ServiceCommission: React.FC<ServiceCommissionProps> = ({ onNotice }) => {
  const [commissions, setCommissions] = useState<ServiceCommissionItem[]>(INITIAL_SERVICE_COMMISSIONS);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Filters (Screenshot Image 1)
  const [statusFilter, setStatusFilter] = useState('');
  const [serviceTypeFilter, setServiceTypeFilter] = useState('');
  const [applyStartDate, setApplyStartDate] = useState('');
  const [applyEndDate, setApplyEndDate] = useState('');
  const [settleStartDate, setSettleStartDate] = useState('');
  const [settleEndDate, setSettleEndDate] = useState('');
  const [keyword, setKeyword] = useState('');

  // Settlement Dialog
  const [settlingItem, setSettlingItem] = useState<ServiceCommissionItem | null>(null);

  const filteredCommissions = useMemo(() => {
    return commissions
      .filter((item) => {
        if (statusFilter && item.settlementStatus !== statusFilter) return false;
        if (serviceTypeFilter && !item.title.includes(serviceTypeFilter) && !item.serviceItem.includes(serviceTypeFilter)) return false;
        if (applyStartDate && item.applyTime.slice(0, 10) < applyStartDate) return false;
        if (applyEndDate && item.applyTime.slice(0, 10) > applyEndDate) return false;
        if (settleStartDate && item.settledTime && item.settledTime.slice(0, 10) < settleStartDate) return false;
        if (settleEndDate && item.settledTime && item.settledTime.slice(0, 10) > settleEndDate) return false;
        if (keyword) {
          const q = keyword.trim().toLowerCase();
          const matchId = item.id.toLowerCase().includes(q);
          const matchOrderNo = item.orderNo.includes(q);
          const matchTitle = item.title.toLowerCase().includes(q);
          const matchStaff = item.staffName.toLowerCase().includes(q);
          const matchPhone = item.staffPhone.includes(q);
          if (!matchId && !matchOrderNo && !matchTitle && !matchStaff && !matchPhone) return false;
        }
        return true;
      })
      .sort((a, b) => new Date(b.applyTime).getTime() - new Date(a.applyTime).getTime());
  }, [commissions, statusFilter, serviceTypeFilter, applyStartDate, applyEndDate, settleStartDate, settleEndDate, keyword]);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(filteredCommissions.map((c) => c.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleResetFilters = () => {
    setStatusFilter('');
    setServiceTypeFilter('');
    setApplyStartDate('');
    setApplyEndDate('');
    setSettleStartDate('');
    setSettleEndDate('');
    setKeyword('');
    onNotice('已重置佣金记录检索条件');
  };

  const handleConfirmSettlement = () => {
    if (!settlingItem) return;
    const updated = commissions.map((c) =>
      c.id === settlingItem.id
        ? {
            ...c,
            settlementStatus: '已结算' as const,
            settledTime: '2026-09-19 17:00:00',
          }
        : c
    );
    setCommissions(updated);
    onNotice(`已完成工单【${settlingItem.id}】对【${settlingItem.staffName}】的佣金清算发放`);
    setSettlingItem(null);
  };

  return (
    <div className="p-6 max-w-[1600px] mx-auto text-xs space-y-6">
      {/* Filter Card (Screenshot 5) */}
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-5">
        {/* Title */}
        <div className="flex items-center space-x-2.5 pb-2">
          <span className="w-1 h-4 bg-[#10b981] rounded-full"></span>
          <h1 className="text-sm font-semibold text-gray-800">佣金记录</h1>
        </div>

        {/* Filter Rows */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          {/* 结算状态 */}
          <div className="flex items-center space-x-2">
            <span className="text-gray-500 whitespace-nowrap w-16">结算状态</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="flex-1 px-3 py-1.5 border border-gray-200 rounded-md text-gray-700 bg-white focus:outline-none focus:border-[#10b981]"
            >
              <option value="">请选择</option>
              <option value="结算中">结算中</option>
              <option value="已结算">已结算</option>
              <option value="待结算">待结算</option>
            </select>
          </div>

          {/* 服务类型 */}
          <div className="flex items-center space-x-2">
            <span className="text-gray-500 whitespace-nowrap w-16">服务类型</span>
            <select
              value={serviceTypeFilter}
              onChange={(e) => setServiceTypeFilter(e.target.value)}
              className="flex-1 px-3 py-1.5 border border-gray-200 rounded-md text-gray-700 bg-white focus:outline-none focus:border-[#10b981]"
            >
              <option value="">请选择</option>
              <option value="家政护理">家政护理</option>
              <option value="康复理疗">康复理疗</option>
              <option value="上门体检">上门体检</option>
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
                value={applyStartDate}
                onChange={(e) => setApplyStartDate(e.target.value)}
                className="flex-1 px-2.5 py-1.5 border border-gray-200 rounded-md text-gray-700 text-xs focus:outline-none focus:border-[#10b981]"
              />
              <span className="text-gray-400">~</span>
              <input
                type="date"
                min="2026-09-01"
                max="2026-09-19"
                value={applyEndDate}
                onChange={(e) => setApplyEndDate(e.target.value)}
                className="flex-1 px-2.5 py-1.5 border border-gray-200 rounded-md text-gray-700 text-xs focus:outline-none focus:border-[#10b981]"
              />
            </div>
          </div>
        </div>

        {/* Second Row: 结算日期 & 关键字搜索 */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-1">
          {/* 结算日期 */}
          <div className="flex items-center space-x-2 w-full md:w-auto min-w-[320px]">
            <span className="text-gray-500 whitespace-nowrap w-16">结算日期</span>
            <div className="flex items-center space-x-2 flex-1">
              <input
                type="date"
                min="2026-09-01"
                max="2026-09-19"
                value={settleStartDate}
                onChange={(e) => setSettleStartDate(e.target.value)}
                className="flex-1 px-2.5 py-1.5 border border-gray-200 rounded-md text-gray-700 text-xs focus:outline-none focus:border-[#10b981]"
              />
              <span className="text-gray-400">~</span>
              <input
                type="date"
                min="2026-09-01"
                max="2026-09-19"
                value={settleEndDate}
                onChange={(e) => setSettleEndDate(e.target.value)}
                className="flex-1 px-2.5 py-1.5 border border-gray-200 rounded-md text-gray-700 text-xs focus:outline-none focus:border-[#10b981]"
              />
            </div>
          </div>

          {/* Search Input & Action Buttons */}
          <div className="flex items-center space-x-3 w-full md:w-auto flex-1 max-w-md">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="请输入关键字"
              className="flex-1 px-3 py-1.5 border border-gray-200 rounded-md text-gray-700 focus:outline-none focus:border-[#10b981]"
            />
            <button
              onClick={() => onNotice(`已筛选出 ${filteredCommissions.length} 条佣金记录`)}
              className="p-2 bg-[#10b981] hover:bg-[#059669] text-white rounded-md transition-colors shrink-0"
              title="搜索"
            >
              <Search className="w-4 h-4" />
            </button>
            <button
              onClick={handleResetFilters}
              className="p-2 border border-gray-200 hover:bg-gray-50 text-gray-500 rounded-md transition-colors shrink-0"
              title="重置"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Table Card (Screenshot 5) */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-hidden">
        {/* Top Action */}
        <div className="p-4 flex items-center justify-end space-x-3 border-b border-gray-100">
          <button
            onClick={() => {
              if (selectedIds.length === 0) {
                onNotice('请先勾选需要批量打款结算的佣金条目');
              } else {
                onNotice(`已批量发起 ${selectedIds.length} 笔佣金结算代付流程`);
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
                    checked={
                      selectedIds.length > 0 && selectedIds.length === filteredCommissions.length
                    }
                    onChange={handleSelectAll}
                    className="rounded text-[#10b981] accent-[#10b981]"
                  />
                </th>
                <th className="py-3 px-4 font-medium">工单编号</th>
                <th className="py-3 px-4 font-medium">订单信息</th>
                <th className="py-3 px-4 font-medium">服务项目</th>
                <th className="py-3 px-4 font-medium">服务人员</th>
                <th className="py-3 px-4 font-medium">实付款 (元)</th>
                <th className="py-3 px-4 font-medium">佣金金额 (元)</th>
                <th className="py-3 px-4 font-medium">结算状态</th>
                <th className="py-3 px-4 font-medium">申请结算时间</th>
                <th className="py-3 px-4 font-medium text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredCommissions.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-12 text-center text-gray-400">
                    暂无符合条件的佣金记录
                  </td>
                </tr>
              ) : (
                filteredCommissions.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="py-3.5 px-4">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(item.id)}
                        onChange={() => handleSelectOne(item.id)}
                        className="rounded text-[#10b981] accent-[#10b981]"
                      />
                    </td>
                    <td className="py-3.5 px-4 font-mono text-gray-600">{item.id}</td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={item.thumbnail}
                          alt=""
                          className="w-11 h-11 rounded object-cover border border-gray-100 shrink-0"
                        />
                        <div>
                          <div className="font-medium text-gray-800">{item.title}</div>
                          <div className="text-gray-400 font-mono text-[11px]">{item.orderNo}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-gray-700">{item.serviceItem}</td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center space-x-2.5">
                        <img
                          src={item.staffAvatar}
                          alt=""
                          className="w-8 h-8 rounded-full object-cover border border-gray-100 shrink-0"
                        />
                        <div>
                          <div className="font-medium text-gray-800">{item.staffName}</div>
                          <div className="text-gray-400 font-mono text-[11px]">{item.staffPhone}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-gray-700">
                      {item.actualAmount.toFixed(2)}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-medium text-emerald-600">
                      {item.commissionAmount.toFixed(2)}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2.5 py-0.5 rounded text-[11px] font-medium ${
                          item.settlementStatus === '已结算'
                            ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                            : item.settlementStatus === '结算中'
                            ? 'bg-blue-50 text-blue-600 border border-blue-200'
                            : 'bg-amber-50 text-amber-600 border border-amber-200'
                        }`}
                      >
                        {item.settlementStatus}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-gray-500 whitespace-nowrap">
                      {item.applyTime}
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <button
                        onClick={() => setSettlingItem(item)}
                        className="text-[#10b981] hover:underline"
                      >
                        佣金结算
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: 佣金结算确认 */}
      {settlingItem && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full border border-gray-100 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center space-x-2">
                <span className="w-1 h-4 bg-[#10b981] rounded-full"></span>
                <h3 className="font-semibold text-gray-800 text-sm">佣金清算审批</h3>
              </div>
              <button
                onClick={() => setSettlingItem(null)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>工单编号:</span>
                <span className="font-mono text-gray-800">{settlingItem.id}</span>
              </div>
              <div className="flex justify-between">
                <span>服务人员:</span>
                <span className="font-medium text-gray-800">{settlingItem.staffName}</span>
              </div>
              <div className="flex justify-between">
                <span>服务项目:</span>
                <span className="text-gray-800">{settlingItem.title}</span>
              </div>
              <div className="flex justify-between">
                <span>申请时间:</span>
                <span className="font-mono text-gray-800">{settlingItem.applyTime}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-100">
                <span className="font-medium text-gray-800">应付佣金:</span>
                <span className="font-mono font-bold text-emerald-600 text-base">
                  ¥{settlingItem.commissionAmount.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100 flex justify-end space-x-3">
              <button
                onClick={() => setSettlingItem(null)}
                className="px-4 py-1.5 border border-gray-200 text-gray-600 rounded-md hover:bg-gray-50 transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleConfirmSettlement}
                className="px-4 py-1.5 bg-[#10b981] text-white rounded-md hover:bg-[#059669] transition-colors"
              >
                确认放款结算
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
