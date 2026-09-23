import React, { useState, useMemo } from 'react';
import { Search, RotateCcw, Plus, X, Ticket, Award, TrendingUp } from 'lucide-react';
import { AppUser } from '../../types';
import {
  INITIAL_COUPONS,
  INITIAL_POINTS,
  INITIAL_GROWTH,
  CouponItem,
  PointsItem,
  GrowthItem,
} from '../../data/userRecordsData';
import { UserProfileSidebar } from './UserProfileSidebar';

interface AssetInfoTabProps {
  user: AppUser;
  onNotice: (msg: string) => void;
}

export const AssetInfoTab: React.FC<AssetInfoTabProps> = ({ user, onNotice }) => {
  const [subTab, setSubTab] = useState<'coupon' | 'points' | 'growth'>('coupon');

  // 优惠券状态
  const [coupons, setCoupons] = useState<CouponItem[]>(INITIAL_COUPONS);
  const [couponStatusFilter, setCouponStatusFilter] = useState<string>('全部');
  const [couponKeyword, setCouponKeyword] = useState<string>('');

  // 积分状态
  const [points, setPoints] = useState<PointsItem[]>(INITIAL_POINTS);
  const [pointsTypeFilter, setPointsTypeFilter] = useState<string>('全部');
  const [pointsKeyword, setPointsKeyword] = useState<string>('');
  const [isGivePointsOpen, setIsGivePointsOpen] = useState<boolean>(false);
  const [givePointsAmount, setGivePointsAmount] = useState<string>('');
  const [givePointsRemark, setGivePointsRemark] = useState<string>('');

  // 成长值状态
  const [growth, setGrowth] = useState<GrowthItem[]>(INITIAL_GROWTH);
  const [growthTypeFilter, setGrowthTypeFilter] = useState<string>('全部');
  const [growthKeyword, setGrowthKeyword] = useState<string>('');
  const [isGiveGrowthOpen, setIsGiveGrowthOpen] = useState<boolean>(false);
  const [giveGrowthAmount, setGiveGrowthAmount] = useState<string>('');
  const [giveGrowthRemark, setGiveGrowthRemark] = useState<string>('');

  // 筛选优惠券
  const filteredCoupons = useMemo(() => {
    return coupons
      .filter((c) => {
        const matchStatus = couponStatusFilter === '全部' || c.status === couponStatusFilter;
        const matchKeyword =
          !couponKeyword.trim() ||
          c.name.toLowerCase().includes(couponKeyword.toLowerCase()) ||
          c.content.toLowerCase().includes(couponKeyword.toLowerCase()) ||
          c.scope.toLowerCase().includes(couponKeyword.toLowerCase());
        return matchStatus && matchKeyword;
      })
      .sort((a, b) => new Date(b.receiveTime).getTime() - new Date(a.receiveTime).getTime());
  }, [coupons, couponStatusFilter, couponKeyword]);

  // 筛选积分
  const filteredPoints = useMemo(() => {
    return points
      .filter((p) => {
        const matchType = pointsTypeFilter === '全部' || p.type === pointsTypeFilter;
        const matchKeyword =
          !pointsKeyword.trim() ||
          p.reason.toLowerCase().includes(pointsKeyword.toLowerCase()) ||
          p.operator.toLowerCase().includes(pointsKeyword.toLowerCase());
        return matchType && matchKeyword;
      })
      .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
  }, [points, pointsTypeFilter, pointsKeyword]);

  // 筛选成长值
  const filteredGrowth = useMemo(() => {
    return growth
      .filter((g) => {
        const matchType = growthTypeFilter === '全部' || g.type === growthTypeFilter;
        const matchKeyword =
          !growthKeyword.trim() ||
          g.reason.toLowerCase().includes(growthKeyword.toLowerCase()) ||
          g.operator.toLowerCase().includes(growthKeyword.toLowerCase());
        return matchType && matchKeyword;
      })
      .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
  }, [growth, growthTypeFilter, growthKeyword]);

  // 赠送积分提交
  const handleGivePointsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseInt(givePointsAmount, 10);
    if (isNaN(amt) || amt <= 0) {
      onNotice('请输入合法的赠送积分数量');
      return;
    }
    const newPt: PointsItem = {
      id: `pt-${Date.now()}`,
      type: '收入',
      amount: amt,
      reason: '管理员人工赠送关怀积分',
      remark: givePointsRemark || '客服专员李明明人工录入',
      operator: '李明明',
      time: '2026-09-19 16:45:00',
    };
    setPoints((prev) => [newPt, ...prev]);
    setIsGivePointsOpen(false);
    setGivePointsAmount('');
    setGivePointsRemark('');
    onNotice(`已成功为长者赠送 ${amt} 积分`);
  };

  // 赠送成长值提交
  const handleGiveGrowthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseInt(giveGrowthAmount, 10);
    if (isNaN(amt) || amt <= 0) {
      onNotice('请输入合法的赠送成长值数量');
      return;
    }
    const newGw: GrowthItem = {
      id: `gw-${Date.now()}`,
      type: '收入',
      amount: amt,
      reason: '管理员关怀赋能成长奖励',
      remark: giveGrowthRemark || '平台运营关怀',
      operator: '李明明',
      time: '2026-09-19 16:50:00',
    };
    setGrowth((prev) => [newGw, ...prev]);
    setIsGiveGrowthOpen(false);
    setGiveGrowthAmount('');
    setGiveGrowthRemark('');
    onNotice(`已成功为长者发放 ${amt} 成长值`);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* 左侧个人画像侧边栏 */}
      <div className="lg:col-span-4 space-y-5">
        <UserProfileSidebar user={user} />
      </div>

      {/* 右侧资产信息与子Tab */}
      <div className="lg:col-span-8 space-y-4 text-xs">
        {/* 子标签切换：优惠券 / 积分 / 成长值 (Image 8, 9, 11) */}
        <div className="bg-white rounded-xl p-2 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center space-x-2">
          <button
            type="button"
            onClick={() => setSubTab('coupon')}
            className={`px-5 py-2 rounded-lg font-medium transition-all flex items-center space-x-1.5 ${
              subTab === 'coupon'
                ? 'bg-[#10b981] text-white shadow-xs'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Ticket className="w-3.5 h-3.5" />
            <span>优惠券</span>
          </button>
          <button
            type="button"
            onClick={() => setSubTab('points')}
            className={`px-5 py-2 rounded-lg font-medium transition-all flex items-center space-x-1.5 ${
              subTab === 'points'
                ? 'bg-[#10b981] text-white shadow-xs'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>积分</span>
          </button>
          <button
            type="button"
            onClick={() => setSubTab('growth')}
            className={`px-5 py-2 rounded-lg font-medium transition-all flex items-center space-x-1.5 ${
              subTab === 'growth'
                ? 'bg-[#10b981] text-white shadow-xs'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>成长值</span>
          </button>
        </div>

        {/* 1. 优惠券子页 (Image 8) */}
        {subTab === 'coupon' && (
          <div className="space-y-4">
            {/* 搜索与过滤 */}
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-wrap items-center gap-2.5">
              <div className="flex items-center space-x-2">
                <span className="text-gray-500 shrink-0">状态</span>
                <select
                  value={couponStatusFilter}
                  onChange={(e) => setCouponStatusFilter(e.target.value)}
                  className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:border-[#10b981]"
                >
                  <option value="全部">请选择</option>
                  <option value="未使用">未使用</option>
                  <option value="已使用">已使用</option>
                  <option value="已过期">已过期</option>
                </select>
              </div>

              <div className="relative flex-1 min-w-[160px] max-w-xs">
                <input
                  type="text"
                  placeholder="请输入关键字"
                  value={couponKeyword}
                  onChange={(e) => setCouponKeyword(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#10b981]"
                />
                <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2" />
              </div>

              <button
                type="button"
                onClick={() => onNotice(`已检索优惠券：${couponStatusFilter}`)}
                className="p-2 bg-[#10b981] hover:bg-[#059669] text-white rounded-lg transition-colors"
                title="搜索"
              >
                <Search className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => {
                  setCouponStatusFilter('全部');
                  setCouponKeyword('');
                  onNotice('已重置优惠券筛选');
                }}
                className="p-2 border border-gray-200 hover:bg-gray-50 text-gray-600 rounded-lg transition-colors"
                title="重置"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* 优惠券表格 */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-[#f9fafb] text-gray-500 border-b border-gray-100 font-medium">
                    <tr>
                      <th className="py-3 px-4">优惠券名称</th>
                      <th className="py-3 px-3">状态</th>
                      <th className="py-3 px-3">内容</th>
                      <th className="py-3 px-3">适用范围</th>
                      <th className="py-3 px-3">领取时间</th>
                      <th className="py-3 px-4">到期时间</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filteredCoupons.map((cp) => (
                      <tr key={cp.id} className="hover:bg-gray-50/70 transition-colors">
                        <td className="py-3.5 px-4 font-medium text-gray-800">{cp.name}</td>
                        <td className="py-3.5 px-3">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium ${
                              cp.status === '未使用'
                                ? 'bg-emerald-50 text-emerald-600 border border-emerald-200/60'
                                : cp.status === '已使用'
                                ? 'bg-gray-100 text-gray-500'
                                : 'bg-rose-50 text-rose-500 border border-rose-200/60'
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                                cp.status === '未使用'
                                  ? 'bg-emerald-500'
                                  : cp.status === '已使用'
                                  ? 'bg-gray-400'
                                  : 'bg-rose-500'
                              }`}
                            ></span>
                            {cp.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-3 font-semibold text-rose-600">{cp.content}</td>
                        <td className="py-3.5 px-3 text-gray-600">{cp.scope}</td>
                        <td className="py-3.5 px-3 font-mono text-gray-600">{cp.receiveTime}</td>
                        <td className="py-3.5 px-4 font-mono text-gray-600">{cp.expireTime}</td>
                      </tr>
                    ))}
                    {filteredCoupons.length === 0 && (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-gray-400">
                          暂无符合条件的优惠券记录
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 2. 积分子页 (Images 9, 10) */}
        {subTab === 'points' && (
          <div className="space-y-4">
            {/* 搜索与赠送积分按钮 */}
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2.5 flex-1 min-w-[280px]">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-500 shrink-0">类型</span>
                  <select
                    value={pointsTypeFilter}
                    onChange={(e) => setPointsTypeFilter(e.target.value)}
                    className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:border-[#10b981]"
                  >
                    <option value="全部">请选择</option>
                    <option value="收入">收入</option>
                    <option value="支出">支出</option>
                  </select>
                </div>

                <div className="relative flex-1 min-w-[160px] max-w-xs">
                  <input
                    type="text"
                    placeholder="请输入关键字"
                    value={pointsKeyword}
                    onChange={(e) => setPointsKeyword(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#10b981]"
                  />
                  <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2" />
                </div>

                <button
                  type="button"
                  onClick={() => onNotice(`已筛选积分记录：${pointsTypeFilter}`)}
                  className="p-2 bg-[#10b981] hover:bg-[#059669] text-white rounded-lg transition-colors"
                  title="搜索"
                >
                  <Search className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setPointsTypeFilter('全部');
                    setPointsKeyword('');
                    onNotice('已重置积分筛选');
                  }}
                  className="p-2 border border-gray-200 hover:bg-gray-50 text-gray-600 rounded-lg transition-colors"
                  title="重置"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => setIsGivePointsOpen(true)}
                  className="px-4 py-1.5 bg-[#10b981] hover:bg-[#059669] text-white rounded-lg font-medium transition-colors flex items-center space-x-1.5 shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>赠送积分</span>
                </button>
              </div>
            </div>

            {/* 积分表格 */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-[#f9fafb] text-gray-500 border-b border-gray-100 font-medium">
                    <tr>
                      <th className="py-3 px-4">类型</th>
                      <th className="py-3 px-3">积分数量</th>
                      <th className="py-3 px-4">操作原因</th>
                      <th className="py-3 px-4">备注</th>
                      <th className="py-3 px-3">操作人</th>
                      <th className="py-3 px-4">积分时间</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filteredPoints.map((pt) => (
                      <tr key={pt.id} className="hover:bg-gray-50/70 transition-colors">
                        <td className="py-3.5 px-4">
                          <span
                            className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                              pt.type === '收入'
                                ? 'bg-emerald-50 text-emerald-600'
                                : 'bg-amber-50 text-amber-600'
                            }`}
                          >
                            {pt.type}
                          </span>
                        </td>
                        <td className="py-3.5 px-3 font-mono font-bold text-sm">
                          <span className={pt.type === '收入' ? 'text-emerald-600' : 'text-amber-600'}>
                            {pt.type === '收入' ? `+${pt.amount}` : `-${Math.abs(pt.amount)}`}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-gray-800 font-medium">{pt.reason}</td>
                        <td className="py-3.5 px-4 text-gray-500">{pt.remark}</td>
                        <td className="py-3.5 px-3 text-gray-700">{pt.operator}</td>
                        <td className="py-3.5 px-4 font-mono text-gray-600">{pt.time}</td>
                      </tr>
                    ))}
                    {filteredPoints.length === 0 && (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-gray-400">
                          暂无符合条件的积分明细
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 3. 成长值子页 (Images 11, 12) */}
        {subTab === 'growth' && (
          <div className="space-y-4">
            {/* 搜索与赠送成长值按钮 */}
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2.5 flex-1 min-w-[280px]">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-500 shrink-0">类型</span>
                  <select
                    value={growthTypeFilter}
                    onChange={(e) => setGrowthTypeFilter(e.target.value)}
                    className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:border-[#10b981]"
                  >
                    <option value="全部">请选择</option>
                    <option value="收入">收入</option>
                    <option value="支出">支出</option>
                  </select>
                </div>

                <div className="relative flex-1 min-w-[160px] max-w-xs">
                  <input
                    type="text"
                    placeholder="请输入关键字"
                    value={growthKeyword}
                    onChange={(e) => setGrowthKeyword(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#10b981]"
                  />
                  <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2" />
                </div>

                <button
                  type="button"
                  onClick={() => onNotice(`已筛选成长值记录：${growthTypeFilter}`)}
                  className="p-2 bg-[#10b981] hover:bg-[#059669] text-white rounded-lg transition-colors"
                  title="搜索"
                >
                  <Search className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setGrowthTypeFilter('全部');
                    setGrowthKeyword('');
                    onNotice('已重置成长值筛选');
                  }}
                  className="p-2 border border-gray-200 hover:bg-gray-50 text-gray-600 rounded-lg transition-colors"
                  title="重置"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => setIsGiveGrowthOpen(true)}
                  className="px-4 py-1.5 bg-[#10b981] hover:bg-[#059669] text-white rounded-lg font-medium transition-colors flex items-center space-x-1.5 shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>赠送成长值</span>
                </button>
              </div>
            </div>

            {/* 成长值表格 */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-[#f9fafb] text-gray-500 border-b border-gray-100 font-medium">
                    <tr>
                      <th className="py-3 px-4">类型</th>
                      <th className="py-3 px-3">成长值数量</th>
                      <th className="py-3 px-4">操作原因</th>
                      <th className="py-3 px-4">备注</th>
                      <th className="py-3 px-3">操作人</th>
                      <th className="py-3 px-4">操作时间</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filteredGrowth.map((gw) => (
                      <tr key={gw.id} className="hover:bg-gray-50/70 transition-colors">
                        <td className="py-3.5 px-4">
                          <span
                            className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                              gw.type === '收入'
                                ? 'bg-emerald-50 text-emerald-600'
                                : 'bg-amber-50 text-amber-600'
                            }`}
                          >
                            {gw.type}
                          </span>
                        </td>
                        <td className="py-3.5 px-3 font-mono font-bold text-sm text-emerald-600">
                          +{gw.amount}
                        </td>
                        <td className="py-3.5 px-4 text-gray-800 font-medium">{gw.reason}</td>
                        <td className="py-3.5 px-4 text-gray-500">{gw.remark}</td>
                        <td className="py-3.5 px-3 text-gray-700">{gw.operator}</td>
                        <td className="py-3.5 px-4 font-mono text-gray-600">{gw.time}</td>
                      </tr>
                    ))}
                    {filteredGrowth.length === 0 && (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-gray-400">
                          暂无符合条件的成长值明细
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 赠送积分弹窗 (Image 10) */}
      {isGivePointsOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden text-xs">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="text-sm font-semibold text-gray-800">赠送积分</h3>
              <button
                type="button"
                onClick={() => setIsGivePointsOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleGivePointsSubmit} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="block text-gray-600 font-medium">
                  积分数量<span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  placeholder="请输入赠送积分数量"
                  value={givePointsAmount}
                  onChange={(e) => setGivePointsAmount(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#10b981]"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="block text-gray-600 font-medium">备注</label>
                <textarea
                  rows={3}
                  placeholder="请输入备注"
                  value={givePointsRemark}
                  onChange={(e) => setGivePointsRemark(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#10b981] resize-none"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsGivePointsOpen(false)}
                  className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#10b981] hover:bg-[#059669] text-white rounded-lg font-medium shadow-xs"
                >
                  确定
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 赠送成长值弹窗 (Image 12) */}
      {isGiveGrowthOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden text-xs">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="text-sm font-semibold text-gray-800">赠送成长值</h3>
              <button
                type="button"
                onClick={() => setIsGiveGrowthOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleGiveGrowthSubmit} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="block text-gray-600 font-medium">
                  数量<span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  placeholder="请输入赠送成长值数量"
                  value={giveGrowthAmount}
                  onChange={(e) => setGiveGrowthAmount(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#10b981]"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="block text-gray-600 font-medium">备注</label>
                <textarea
                  rows={3}
                  placeholder="请输入备注"
                  value={giveGrowthRemark}
                  onChange={(e) => setGiveGrowthRemark(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#10b981] resize-none"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsGiveGrowthOpen(false)}
                  className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#10b981] hover:bg-[#059669] text-white rounded-lg font-medium shadow-xs"
                >
                  确定
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
