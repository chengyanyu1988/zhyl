import React, { useState, useMemo } from 'react';
import {
  HeartHandshake,
  Search,
  ArrowUpDown,
  Filter,
  CheckCircle2,
  Clock,
  User,
  Star,
  X,
  FileText,
} from 'lucide-react';
import { CareOrder } from '../types';
import { MOCK_CARE_ORDERS } from '../data/extendedData';

interface CareOrdersManagementProps {
  onNotice: (msg: string) => void;
  subPage: 'service_orders' | 'care_plans';
}

export const CareOrdersManagement: React.FC<CareOrdersManagementProps> = ({
  onNotice,
  subPage,
}) => {
  const [orders, setOrders] = useState<CareOrder[]>(MOCK_CARE_ORDERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [activeOrder, setActiveOrder] = useState<CareOrder | null>(null);

  const filteredOrders = useMemo(() => {
    return orders
      .filter((ord) => {
        const matchesCategory = selectedCategory === 'all' || ord.category === selectedCategory;
        const matchesStatus = selectedStatus === 'all' || ord.status === selectedStatus;
        const q = searchQuery.trim().toLowerCase();
        const matchesSearch =
          !q ||
          ord.orderNo.toLowerCase().includes(q) ||
          ord.serviceName.toLowerCase().includes(q) ||
          ord.elderlyName.toLowerCase().includes(q) ||
          ord.staffName.toLowerCase().includes(q) ||
          ord.address.toLowerCase().includes(q);

        return matchesCategory && matchesStatus && matchesSearch;
      })
      .sort((a, b) => new Date(b.orderTime).getTime() - new Date(a.orderTime).getTime());
  }, [orders, searchQuery, selectedCategory, selectedStatus]);

  const handleStatusChange = (ord: CareOrder) => {
    const nextStatus =
      ord.status === '待响应'
        ? '服务中'
        : ord.status === '服务中'
        ? '已完成'
        : '待响应';

    const updated = orders.map((o) =>
      o.id === ord.id ? { ...o, status: nextStatus as '已完成' | '服务中' | '待响应' } : o
    );
    setOrders(updated);
    if (activeOrder && activeOrder.id === ord.id) {
      setActiveOrder({ ...activeOrder, status: nextStatus as any });
    }
    onNotice(`工单【${ord.orderNo}】状态已变更为: ${nextStatus}`);
  };

  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-5">
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] min-h-[820px]">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-gray-100 gap-4">
          <div className="flex items-center space-x-3">
            <span className="w-1.5 h-4 bg-[#10b981] rounded-full"></span>
            <h1 className="text-base font-semibold text-gray-800 tracking-tight">
              {subPage === 'care_plans' ? '长者个性化关怀照护计划' : '关怀服务 - 居家养老服务工单'}
            </h1>
            <span className="text-xs text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 font-medium">
              共 {filteredOrders.length} 笔工单记录
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <div className="hidden md:flex items-center space-x-1.5 text-xs text-emerald-700 bg-emerald-50/80 px-2.5 py-1 rounded-md border border-emerald-200">
              <ArrowUpDown className="w-3 h-3" />
              <span>按服务派单时间降序 (2026-09-18 至 2026-09-01)</span>
            </div>
          </div>
        </div>

        {/* Filter Row */}
        <div className="flex flex-wrap items-center gap-4 pt-5 pb-5 text-xs text-gray-600 border-b border-gray-50">
          <div className="flex items-center space-x-2">
            <span className="text-gray-500 font-medium">服务类别</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:border-[#10b981]"
            >
              <option value="all">全部类别</option>
              <option value="康复理疗">康复理疗</option>
              <option value="家政护理">家政护理</option>
              <option value="上门体检">上门体检</option>
              <option value="应急关怀">应急关怀</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-gray-500 font-medium">工单状态</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:border-[#10b981]"
            >
              <option value="all">全部状态</option>
              <option value="已完成">已完成</option>
              <option value="服务中">服务中</option>
              <option value="待响应">待响应</option>
            </select>
          </div>

          <div className="flex-1 min-w-[220px] flex justify-end">
            <div className="relative w-full max-w-xs">
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索单号/服务项/长者/护工/地址..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:border-[#10b981]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="mt-4 overflow-x-auto border border-gray-100 rounded-xl">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-gray-50/80 text-gray-500 border-b border-gray-100">
                <th className="py-3 px-3.5 text-left font-semibold w-32">工单流水号</th>
                <th className="py-3 px-3.5 text-left font-semibold w-40">
                  <div className="flex items-center space-x-1">
                    <span>服务派单时间</span>
                    <ArrowUpDown className="w-3 h-3 text-emerald-600" />
                  </div>
                </th>
                <th className="py-3 px-3.5 text-left font-semibold">服务项目与内容</th>
                <th className="py-3 px-3.5 text-center font-semibold w-24">类别</th>
                <th className="py-3 px-3.5 text-left font-semibold w-32">服务长者</th>
                <th className="py-3 px-3.5 text-left font-semibold w-28">指定护工</th>
                <th className="py-3 px-3.5 text-right font-semibold w-28">单价/长护补贴</th>
                <th className="py-3 px-3.5 text-center font-semibold w-24">工单状态</th>
                <th className="py-3 px-3.5 text-right font-semibold w-24">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredOrders.map((ord) => {
                const isYesterday = ord.orderTime.startsWith('2026-09-18');

                return (
                  <tr key={ord.id} className="hover:bg-gray-50/70 transition-colors">
                    <td className="py-3 px-3.5 font-mono text-gray-500 text-[11px]">
                      {ord.orderNo}
                    </td>

                    <td className="py-3 px-3.5">
                      <div className="flex items-center space-x-1 font-semibold text-gray-800">
                        <span>{ord.orderTime}</span>
                      </div>
                    </td>

                    <td className="py-3 px-3.5 font-medium text-gray-800">
                      <div className="line-clamp-1">{ord.serviceName}</div>
                      {ord.feedback && (
                        <div className="text-[10px] text-gray-400 line-clamp-1 flex items-center space-x-1 mt-0.5">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400 inline" />
                          <span>评价：{ord.feedback}</span>
                        </div>
                      )}
                    </td>

                    <td className="py-3 px-3.5 text-center">
                      <span className="inline-block text-[11px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {ord.category}
                      </span>
                    </td>

                    <td className="py-3 px-3.5">
                      <div className="font-semibold text-gray-800">
                        {ord.elderlyName} ({ord.elderlyAge}岁)
                      </div>
                      <div className="text-[10px] text-gray-400 truncate max-w-[140px]">
                        {ord.address}
                      </div>
                    </td>

                    <td className="py-3 px-3.5 font-medium text-gray-700">
                      {ord.staffName}
                    </td>

                    <td className="py-3 px-3.5 text-right">
                      <div className="font-bold text-gray-800">¥{ord.price}</div>
                      <div className="text-[10px] text-emerald-600">
                        补贴抵扣: -¥{ord.subsidyAmount}
                      </div>
                    </td>

                    <td className="py-3 px-3.5 text-center">
                      <span
                        className={`inline-block text-[11px] px-2.5 py-0.5 rounded-full border font-medium ${
                          ord.status === '已完成'
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : ord.status === '服务中'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-rose-50 text-rose-700 border-rose-200'
                        }`}
                      >
                        {ord.status}
                      </span>
                    </td>

                    <td className="py-3 px-3.5 text-right">
                      <button
                        onClick={() => setActiveOrder(ord)}
                        className="text-emerald-700 hover:text-emerald-900 font-medium hover:underline mr-2"
                      >
                        详情
                      </button>
                      <button
                        onClick={() => handleStatusChange(ord)}
                        className="text-gray-500 hover:text-gray-800 hover:underline"
                      >
                        流转
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {activeOrder && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-[1px] flex items-center justify-center z-50 p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-gray-100 overflow-hidden text-xs">
            <div className="px-6 py-4 bg-gray-50/80 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-4 bg-[#10b981] rounded-full"></span>
                <span className="text-sm font-bold text-gray-800">工单履约明细</span>
                <span className="font-mono text-gray-400">{activeOrder.orderNo}</span>
              </div>
              <button
                onClick={() => setActiveOrder(null)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <h3 className="text-base font-bold text-gray-800">{activeOrder.serviceName}</h3>
                <div className="text-gray-400 text-[11px] mt-1">
                  服务下单时间：{activeOrder.orderTime} ({activeOrder.category})
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-gray-600">
                <div className="p-2.5 bg-gray-50 rounded-lg">
                  <div className="text-[10px] text-gray-400">服务长者对象</div>
                  <div className="font-semibold text-gray-800">
                    {activeOrder.elderlyName} ({activeOrder.elderlyAge}岁)
                  </div>
                </div>
                <div className="p-2.5 bg-gray-50 rounded-lg">
                  <div className="text-[10px] text-gray-400">执行护工 / 医生</div>
                  <div className="font-semibold text-gray-800">{activeOrder.staffName}</div>
                </div>
                <div className="p-2.5 bg-gray-50 rounded-lg">
                  <div className="text-[10px] text-gray-400">工单标准金额</div>
                  <div className="font-bold text-gray-800">¥{activeOrder.price} 元</div>
                </div>
                <div className="p-2.5 bg-gray-50 rounded-lg">
                  <div className="text-[10px] text-gray-400">长护险/财政公益补贴</div>
                  <div className="font-bold text-emerald-600">¥{activeOrder.subsidyAmount} 元</div>
                </div>
              </div>

              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-[10px] text-gray-400 mb-0.5">详细服务上门地址</div>
                <div className="text-gray-700 font-medium">{activeOrder.address}</div>
              </div>

              {activeOrder.feedback && (
                <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100">
                  <div className="flex items-center space-x-1 text-emerald-800 font-semibold mb-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>长者及家属满意度评价 (5星好评)</span>
                  </div>
                  <div className="text-gray-600">{activeOrder.feedback}</div>
                </div>
              )}
            </div>

            <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
              <button
                onClick={() => handleStatusChange(activeOrder)}
                className="px-3.5 py-1.5 bg-[#10b981] hover:bg-[#059669] text-white rounded-lg font-medium transition-colors"
              >
                流转工单状态至: {activeOrder.status === '待响应' ? '服务中' : activeOrder.status === '服务中' ? '已完成' : '待响应'}
              </button>
              <button
                onClick={() => setActiveOrder(null)}
                className="px-4 py-1.5 text-gray-600 hover:bg-gray-200/60 rounded-lg"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
