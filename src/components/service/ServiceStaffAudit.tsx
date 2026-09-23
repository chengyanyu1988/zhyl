import React, { useState, useMemo } from 'react';
import {
  Search,
  RotateCcw,
  Calendar,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowLeft,
  User,
  Check,
  X,
  Eye,
} from 'lucide-react';
import { ServiceAuditItem, INITIAL_SERVICE_AUDITS } from '../../data/serviceData';

interface ServiceStaffAuditProps {
  onNotice: (msg: string) => void;
}

export const ServiceStaffAudit: React.FC<ServiceStaffAuditProps> = ({ onNotice }) => {
  const [audits, setAudits] = useState<ServiceAuditItem[]>(INITIAL_SERVICE_AUDITS);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentView, setCurrentView] = useState<'list' | 'detail'>('list');
  const [activeAudit, setActiveAudit] = useState<ServiceAuditItem | null>(null);

  // Filters (Screenshot 8)
  const [statusFilter, setStatusFilter] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [keyword, setKeyword] = useState('');

  // Reject Modal
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  const filteredAudits = useMemo(() => {
    return audits
      .filter((item) => {
        if (statusFilter && item.auditStatus !== statusFilter) return false;
        if (startDate && item.applyTime.slice(0, 10) < startDate) return false;
        if (endDate && item.applyTime.slice(0, 10) > endDate) return false;
        if (keyword) {
          const q = keyword.trim().toLowerCase();
          const matchId = item.id.toLowerCase().includes(q);
          const matchName = item.name.toLowerCase().includes(q);
          const matchPhone = item.phone.includes(q);
          const matchAuditor = item.auditor.toLowerCase().includes(q);
          if (!matchId && !matchName && !matchPhone && !matchAuditor) return false;
        }
        return true;
      })
      .sort((a, b) => new Date(b.applyTime).getTime() - new Date(a.applyTime).getTime());
  }, [audits, statusFilter, startDate, endDate, keyword]);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(filteredAudits.map((a) => a.id));
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
    setStartDate('');
    setEndDate('');
    setKeyword('');
    onNotice('已重置审核检索过滤条件');
  };

  const handleOpenDetail = (audit: ServiceAuditItem) => {
    setActiveAudit(audit);
    setCurrentView('detail');
  };

  const handlePass = (item: ServiceAuditItem) => {
    const updated = audits.map((a) =>
      a.id === item.id
        ? {
            ...a,
            auditStatus: '审核通过' as const,
            auditor: '当前管理员',
            auditTime: '2026-09-19 16:45:00',
          }
        : a
    );
    setAudits(updated);
    setActiveAudit({
      ...item,
      auditStatus: '审核通过',
      auditor: '当前管理员',
      auditTime: '2026-09-19 16:45:00',
    });
    onNotice(`已通过【${item.name}】的服务人员资质审核`);
  };

  const handleOpenRejectModal = () => {
    setRejectReason('');
    setRejectModalOpen(true);
  };

  const handleConfirmReject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeAudit) return;
    const reason = rejectReason.trim() || '资质材料不全或证件清晰度不合格';
    const updated = audits.map((a) =>
      a.id === activeAudit.id
        ? {
            ...a,
            auditStatus: '已驳回' as const,
            auditor: '当前管理员',
            auditTime: '2026-09-19 16:45:00',
            intro: `${a.intro} [驳回原因: ${reason}]`,
          }
        : a
    );
    setAudits(updated);
    setActiveAudit({
      ...activeAudit,
      auditStatus: '已驳回',
      auditor: '当前管理员',
      auditTime: '2026-09-19 16:45:00',
    });
    setRejectModalOpen(false);
    onNotice(`已驳回【${activeAudit.name}】的审核申请: ${reason}`);
  };

  // Render Detail View (Screenshots 9 & 10)
  if (currentView === 'detail' && activeAudit) {
    return (
      <div className="p-6 max-w-[1600px] mx-auto text-xs space-y-6">
        <div className="bg-white rounded-xl p-8 border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <div className="flex items-center space-x-2.5">
              <span className="w-1 h-4 bg-[#10b981] rounded-full"></span>
              <h1 className="text-sm font-semibold text-gray-800">审核详情</h1>
              <span
                className={`ml-3 px-2.5 py-0.5 rounded text-[11px] font-medium ${
                  activeAudit.auditStatus === '待审核'
                    ? 'bg-amber-50 text-amber-600 border border-amber-200'
                    : activeAudit.auditStatus === '审核通过'
                    ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                    : 'bg-rose-50 text-rose-600 border border-rose-200'
                }`}
              >
                {activeAudit.auditStatus}
              </span>
            </div>
            <button
              onClick={() => setCurrentView('list')}
              className="px-3 py-1 border border-gray-200 text-gray-600 rounded-md hover:bg-gray-50 flex items-center space-x-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>返回列表</span>
            </button>
          </div>

          {/* Section 1: 基础信息 (Screenshot 9) */}
          <div className="space-y-4">
            <h2 className="text-xs font-semibold text-gray-800 pb-2 border-b border-gray-50">基础信息</h2>

            {/* 头像 */}
            <div className="flex items-start space-x-4">
              <span className="w-20 text-gray-400">头像:</span>
              <img
                src={activeAudit.avatar}
                alt=""
                className="w-16 h-16 rounded-lg object-cover border border-gray-100 shadow-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-y-3 gap-x-8">
              <div className="flex items-center space-x-3">
                <span className="w-20 text-gray-400">姓名:</span>
                <span className="font-medium text-gray-800">{activeAudit.name}</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="w-20 text-gray-400">ID:</span>
                <span className="font-mono text-gray-700">{activeAudit.id}</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="w-20 text-gray-400">服务类型:</span>
                <span className="text-gray-800">{activeAudit.serviceType}</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="w-20 text-gray-400">手机号码:</span>
                <span className="font-mono text-gray-700">{activeAudit.phone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="w-20 text-gray-400">标签:</span>
                <span className="px-2.5 py-0.5 rounded text-[11px] font-medium border border-blue-200 text-blue-600 bg-blue-50/40">
                  {activeAudit.tag}
                </span>
              </div>
            </div>

            <div className="flex items-start space-x-3 pt-1">
              <span className="w-20 text-gray-400">简介:</span>
              <span className="text-gray-700 leading-relaxed max-w-2xl">{activeAudit.intro}</span>
            </div>
          </div>

          {/* Section 2: 实名信息 (Screenshot 9) */}
          <div className="space-y-4 pt-2">
            <h2 className="text-xs font-semibold text-gray-800 pb-2 border-b border-gray-50">实名信息</h2>

            <div className="flex items-center space-x-3">
              <span className="w-20 text-gray-400">身份证号:</span>
              <span className="font-mono text-gray-800 font-medium">{activeAudit.idCardNo}</span>
            </div>

            {/* 身份证照片 */}
            <div className="flex items-start space-x-3">
              <span className="w-20 text-gray-400 pt-1">身份证:</span>
              <div className="flex items-center space-x-4">
                <div className="w-44 h-28 rounded-lg overflow-hidden border border-gray-200 relative group">
                  <img
                    src="https://images.unsplash.com/photo-1544717305-2782549b5136?w=320&auto=format&fit=crop&q=80"
                    alt="身份证正面"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-[11px] transition-opacity">
                    正面照预览
                  </div>
                </div>
                <div className="w-44 h-28 rounded-lg overflow-hidden border border-gray-200 relative group">
                  <img
                    src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=320&auto=format&fit=crop&q=80"
                    alt="身份证反面"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-[11px] transition-opacity">
                    反面照预览
                  </div>
                </div>
              </div>
            </div>

            {/* 职业证书 */}
            <div className="flex items-start space-x-3 pt-1">
              <span className="w-20 text-gray-400 pt-1">职业证书:</span>
              <div className="w-44 h-28 rounded-lg overflow-hidden border border-gray-200 relative group">
                <img
                  src="https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=320&auto=format&fit=crop&q=80"
                  alt="职业证书"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-[11px] transition-opacity">
                  资格证书核验
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-y-3 gap-x-8 pt-1">
              <div className="flex items-center space-x-3">
                <span className="w-20 text-gray-400">银行卡号:</span>
                <span className="font-mono text-gray-800">{activeAudit.bankCardNo}</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="w-20 text-gray-400">开户行:</span>
                <span className="text-gray-800">{activeAudit.bankName}</span>
              </div>
            </div>
          </div>

          {/* Section 3: 其它信息 (Screenshot 10) */}
          <div className="space-y-4 pt-2">
            <h2 className="text-xs font-semibold text-gray-800 pb-2 border-b border-gray-50">其它信息</h2>

            <div className="grid grid-cols-2 gap-y-3 gap-x-8">
              <div className="flex items-center space-x-3">
                <span className="w-20 text-gray-400">登录密码:</span>
                <span className="font-mono text-gray-800">{activeAudit.loginPassword || 'ha138900'}</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="w-20 text-gray-400">用户打赏:</span>
                <span className="px-2 py-0.5 rounded-full text-[11px] bg-emerald-50 text-emerald-600 font-medium">
                  {activeAudit.allowTips ? '启用' : '禁用'}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="w-20 text-gray-400">添加途径:</span>
                <span className="text-gray-800">{activeAudit.addChannel}</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="w-20 text-gray-400">注册时间:</span>
                <span className="font-mono text-gray-600">{activeAudit.registerTime}</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="w-20 text-gray-400">最后登录时间:</span>
                <span className="font-mono text-gray-600">{activeAudit.lastLoginTime}</span>
              </div>
            </div>
          </div>

          {/* Bottom Actions (Screenshot 10) */}
          <div className="pt-6 border-t border-gray-100 flex items-center space-x-3">
            {activeAudit.auditStatus !== '审核通过' && (
              <button
                onClick={() => handlePass(activeAudit)}
                className="px-6 py-2 bg-[#10b981] hover:bg-[#059669] text-white rounded-md font-medium transition-colors"
              >
                审核通过
              </button>
            )}
            {activeAudit.auditStatus !== '已驳回' && (
              <button
                onClick={handleOpenRejectModal}
                className="px-6 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-md font-medium transition-colors"
              >
                驳回
              </button>
            )}
            <button
              onClick={() => setCurrentView('list')}
              className="px-6 py-2 border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-md font-medium transition-colors"
            >
              返回
            </button>
          </div>
        </div>

        {/* Modal: 驳回原因 */}
        {rejectModalOpen && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <form
              onSubmit={handleConfirmReject}
              className="bg-white rounded-xl p-6 max-w-md w-full border border-gray-100 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <h3 className="font-semibold text-gray-800 text-sm">驳回审核申请</h3>
                <button
                  type="button"
                  onClick={() => setRejectModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div>
                <label className="text-gray-600 mb-1.5 block">请输入驳回原因或补件说明</label>
                <textarea
                  rows={4}
                  required
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="例如: 职业健康体检证明未加盖公章，或资格证书编号核验有误"
                  className="w-full px-3 py-2 border border-gray-200 rounded-md text-gray-800 focus:outline-none focus:border-[#10b981]"
                />
              </div>

              <div className="pt-3 border-t border-gray-100 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setRejectModalOpen(false)}
                  className="px-4 py-1.5 border border-gray-200 text-gray-600 rounded-md hover:bg-gray-50 transition-colors"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-rose-500 hover:bg-rose-600 text-white rounded-md transition-colors"
                >
                  确认驳回
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    );
  }

  // Otherwise, render list view (Screenshot 8)
  return (
    <div className="p-6 max-w-[1600px] mx-auto text-xs space-y-6">
      {/* Search & Filter Card (Screenshot 8) */}
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-5">
        {/* Title */}
        <div className="flex items-center space-x-2.5 pb-2">
          <span className="w-1 h-4 bg-[#10b981] rounded-full"></span>
          <h1 className="text-sm font-semibold text-gray-800">审核管理</h1>
        </div>

        {/* Filter Rows */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          {/* 审核状态 */}
          <div className="flex items-center space-x-2">
            <span className="text-gray-500 whitespace-nowrap w-16">审核状态</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="flex-1 px-3 py-1.5 border border-gray-200 rounded-md text-gray-700 bg-white focus:outline-none focus:border-[#10b981]"
            >
              <option value="">请选择</option>
              <option value="待审核">待审核</option>
              <option value="审核通过">审核通过</option>
              <option value="已驳回">已驳回</option>
            </select>
          </div>

          {/* 申请日期 */}
          <div className="flex items-center space-x-2 md:col-span-2">
            <span className="text-gray-500 whitespace-nowrap w-16">申请日期</span>
            <div className="flex items-center space-x-2 flex-1">
              <input
                type="date"
                min="2026-09-01"
                max="2026-09-19"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="flex-1 px-2.5 py-1.5 border border-gray-200 rounded-md text-gray-700 text-xs focus:outline-none focus:border-[#10b981]"
              />
              <span className="text-gray-400">~</span>
              <input
                type="date"
                min="2026-09-01"
                max="2026-09-19"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="flex-1 px-2.5 py-1.5 border border-gray-200 rounded-md text-gray-700 text-xs focus:outline-none focus:border-[#10b981]"
              />
            </div>
          </div>
        </div>

        {/* Search Input & Action Buttons */}
        <div className="flex items-center space-x-3 max-w-md">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="请输入服务人员姓名 / 手机 / 审核人"
            className="flex-1 px-3 py-1.5 border border-gray-200 rounded-md text-gray-700 focus:outline-none focus:border-[#10b981]"
          />
          <button
            onClick={() => onNotice(`已检索出 ${filteredAudits.length} 条审核申请记录`)}
            className="p-2 bg-[#10b981] hover:bg-[#059669] text-white rounded-md transition-colors"
            title="搜索"
          >
            <Search className="w-4 h-4" />
          </button>
          <button
            onClick={handleResetFilters}
            className="p-2 border border-gray-200 hover:bg-gray-50 text-gray-500 rounded-md transition-colors"
            title="重置"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Table Card (Screenshot 8) */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-hidden">
        {/* Top Action */}
        <div className="p-4 flex items-center justify-end space-x-3 border-b border-gray-100">
          <button
            onClick={() => {
              if (selectedIds.length === 0) {
                onNotice('请先勾选需要批量操作的审核项');
              } else {
                onNotice(`已批量审批 ${selectedIds.length} 个服务人员申请`);
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
                    checked={selectedIds.length > 0 && selectedIds.length === filteredAudits.length}
                    onChange={handleSelectAll}
                    className="rounded text-[#10b981] accent-[#10b981]"
                  />
                </th>
                <th className="py-3 px-4 font-medium">服务人员信息</th>
                <th className="py-3 px-4 font-medium">服务人员ID</th>
                <th className="py-3 px-4 font-medium">服务类型</th>
                <th className="py-3 px-4 font-medium">审核状态</th>
                <th className="py-3 px-4 font-medium">审核人</th>
                <th className="py-3 px-4 font-medium">申请时间</th>
                <th className="py-3 px-4 font-medium">审核时间</th>
                <th className="py-3 px-4 font-medium text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredAudits.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-gray-400">
                    暂无符合条件的审核记录
                  </td>
                </tr>
              ) : (
                filteredAudits.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="py-3.5 px-4">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(item.id)}
                        onChange={() => handleSelectOne(item.id)}
                        className="rounded text-[#10b981] accent-[#10b981]"
                      />
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={item.avatar}
                          alt=""
                          className="w-9 h-9 rounded-full object-cover border border-gray-100 shadow-sm shrink-0"
                        />
                        <div>
                          <div className="font-medium text-gray-800">{item.name}</div>
                          <div className="text-gray-400 font-mono text-[11px]">{item.phone}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-gray-600">{item.id}</td>
                    <td className="py-3.5 px-4 text-gray-700">{item.serviceType}</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2.5 py-0.5 rounded text-[11px] font-medium ${
                          item.auditStatus === '待审核'
                            ? 'bg-amber-50 text-amber-600 border border-amber-200'
                            : item.auditStatus === '审核通过'
                            ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                            : 'bg-rose-50 text-rose-600 border border-rose-200'
                        }`}
                      >
                        {item.auditStatus}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-gray-600">{item.auditor}</td>
                    <td className="py-3.5 px-4 font-mono text-gray-500 whitespace-nowrap">
                      {item.applyTime}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-gray-500 whitespace-nowrap">
                      {item.auditTime}
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <button
                        onClick={() => handleOpenDetail(item)}
                        className="text-[#10b981] hover:underline font-medium"
                      >
                        审核
                      </button>
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
