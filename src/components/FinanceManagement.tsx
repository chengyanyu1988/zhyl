import React, { useState, useMemo } from 'react';
import {
  CreditCard,
  Search,
  ArrowUpDown,
  Filter,
  DollarSign,
  Download,
  ShieldCheck,
  CheckCircle,
} from 'lucide-react';
import { FinanceBill } from '../types';
import { MOCK_FINANCE_BILLS } from '../data/extendedData';

interface FinanceManagementProps {
  onNotice: (msg: string) => void;
  subPage: 'order_bills' | 'insurance_settlement';
}

export const FinanceManagement: React.FC<FinanceManagementProps> = ({
  onNotice,
  subPage,
}) => {
  const [bills, setBills] = useState<FinanceBill[]>(MOCK_FINANCE_BILLS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChannel, setSelectedChannel] = useState<string>('all');

  const filteredBills = useMemo(() => {
    return bills
      .filter((b) => {
        const matchesChannel = selectedChannel === 'all' || b.payChannel === selectedChannel;
        const q = searchQuery.trim().toLowerCase();
        const matchesSearch =
          !q ||
          b.billNo.toLowerCase().includes(q) ||
          b.title.toLowerCase().includes(q) ||
          b.elderlyName.toLowerCase().includes(q) ||
          b.payerName.toLowerCase().includes(q);

        return matchesChannel && matchesSearch;
      })
      .sort((a, b) => new Date(b.payTime).getTime() - new Date(a.payTime).getTime());
  }, [bills, searchQuery, selectedChannel]);

  const totalRevenue = filteredBills.reduce((acc, curr) => acc + curr.totalAmount, 0);
  const totalInsurance = filteredBills.reduce((acc, curr) => acc + curr.insuranceCover, 0);
  const totalSelfPaid = filteredBills.reduce((acc, curr) => acc + curr.selfPaid, 0);

  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-5">
      {/* Top 3 Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
          <div className="text-xs text-gray-400 mb-1">2026年9月累计消费流水总额</div>
          <div className="text-2xl font-bold text-gray-800 font-mono">¥{totalRevenue.toLocaleString()} 元</div>
          <div className="text-[11px] text-emerald-600 mt-1">9月1日 至 9月18日 全量归集</div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
          <div className="text-xs text-gray-400 mb-1">长护险及财政补贴统筹基金</div>
          <div className="text-2xl font-bold text-emerald-600 font-mono">¥{totalInsurance.toLocaleString()} 元</div>
          <div className="text-[11px] text-gray-400 mt-1">政府普惠养老补助占比 65.8%</div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
          <div className="text-xs text-gray-400 mb-1">长者个人自付合计数</div>
          <div className="text-2xl font-bold text-gray-800 font-mono">¥{totalSelfPaid.toLocaleString()} 元</div>
          <div className="text-[11px] text-gray-400 mt-1">支持微信、医保卡及长者补贴代扣</div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] min-h-[600px]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-gray-100 gap-4">
          <div className="flex items-center space-x-3">
            <span className="w-1.5 h-4 bg-[#10b981] rounded-full"></span>
            <h1 className="text-base font-semibold text-gray-800 tracking-tight">
              {subPage === 'insurance_settlement' ? '长护险与社区助老补贴对账结算' : '消费结算 - 订单流水与收费明细'}
            </h1>
          </div>

          <div className="flex items-center space-x-3">
            <div className="hidden md:flex items-center space-x-1.5 text-xs text-emerald-700 bg-emerald-50/80 px-2.5 py-1 rounded-md border border-emerald-200">
              <ArrowUpDown className="w-3 h-3" />
              <span>按交易时间降序 (2026-09-18 至 2026-09-01)</span>
            </div>
            <button
              onClick={() => onNotice('已导出2026年9月消费结算对账表(Excel)')}
              className="px-3.5 py-1.5 text-xs bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg flex items-center space-x-1.5 font-medium transition-colors border border-emerald-200"
            >
              <Download className="w-3.5 h-3.5" />
              <span>导出对账明细</span>
            </button>
          </div>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap items-center gap-4 pt-4 pb-4 text-xs text-gray-600 border-b border-gray-50">
          <div className="flex items-center space-x-2">
            <span className="text-gray-500 font-medium">结算渠道</span>
            <select
              value={selectedChannel}
              onChange={(e) => setSelectedChannel(e.target.value)}
              className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:border-[#10b981]"
            >
              <option value="all">全部支付渠道</option>
              <option value="长护险基金">长护险基金</option>
              <option value="社区助老补贴">社区助老补贴</option>
              <option value="医保卡">医保卡</option>
              <option value="微信支付">微信支付</option>
            </select>
          </div>

          <div className="flex-1 min-w-[220px] flex justify-end">
            <div className="relative w-full max-w-xs">
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索单号/服务项/长者/付款人..."
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
                <th className="py-3 px-3.5 text-left font-semibold w-32">支付流水号</th>
                <th className="py-3 px-3.5 text-left font-semibold w-40">
                  <div className="flex items-center space-x-1">
                    <span>支付交易时间</span>
                    <ArrowUpDown className="w-3 h-3 text-emerald-600" />
                  </div>
                </th>
                <th className="py-3 px-3.5 text-left font-semibold">消费服务 / 商品信息</th>
                <th className="py-3 px-3.5 text-left font-semibold w-32">受益长者</th>
                <th className="py-3 px-3.5 text-left font-semibold w-36">付款代扣人</th>
                <th className="py-3 px-3.5 text-right font-semibold w-24">订单总额</th>
                <th className="py-3 px-3.5 text-right font-semibold w-28">医保/补贴统筹</th>
                <th className="py-3 px-3.5 text-right font-semibold w-24">个人自付</th>
                <th className="py-3 px-3.5 text-center font-semibold w-28">结算渠道</th>
                <th className="py-3 px-3.5 text-center font-semibold w-24">状态</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredBills.map((b) => {
                const isYesterday = b.payTime.startsWith('2026-09-18');

                return (
                  <tr key={b.id} className="hover:bg-gray-50/70 transition-colors">
                    <td className="py-3 px-3.5 font-mono text-gray-500 text-[11px]">
                      {b.billNo}
                    </td>

                    <td className="py-3 px-3.5">
                      <div className="flex items-center space-x-1 font-semibold text-gray-800">
                        <span>{b.payTime}</span>
                      </div>
                    </td>

                    <td className="py-3 px-3.5 font-medium text-gray-800">
                      {b.title}
                    </td>

                    <td className="py-3 px-3.5 font-semibold text-gray-700">
                      {b.elderlyName}
                    </td>

                    <td className="py-3 px-3.5 text-gray-600">
                      {b.payerName}
                    </td>

                    <td className="py-3 px-3.5 text-right font-bold text-gray-800">
                      ¥{b.totalAmount}
                    </td>

                    <td className="py-3 px-3.5 text-right font-medium text-emerald-600">
                      -¥{b.insuranceCover}
                    </td>

                    <td className="py-3 px-3.5 text-right font-medium text-gray-700">
                      ¥{b.selfPaid}
                    </td>

                    <td className="py-3 px-3.5 text-center">
                      <span className="inline-block text-[11px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                        {b.payChannel}
                      </span>
                    </td>

                    <td className="py-3 px-3.5 text-center">
                      <span className="inline-block text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium">
                        {b.status}
                      </span>
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
