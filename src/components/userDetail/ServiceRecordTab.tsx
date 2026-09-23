import React, { useState, useMemo } from 'react';
import { Search, RotateCcw, Copy, Check, ArrowLeft, Calendar, Clock, UserCheck, X } from 'lucide-react';
import { AppUser } from '../../types';
import {
  INITIAL_SERVICES,
  AVAILABLE_STAFF,
  ServiceRecordItem,
  ServiceStaff,
} from '../../data/userRecordsData';
import { UserProfileSidebar } from './UserProfileSidebar';

interface ServiceRecordTabProps {
  user: AppUser;
  onNotice: (msg: string) => void;
}

export const ServiceRecordTab: React.FC<ServiceRecordTabProps> = ({ user, onNotice }) => {
  const [services, setServices] = useState<ServiceRecordItem[]>(INITIAL_SERVICES);
  const [serviceTypeFilter, setServiceTypeFilter] = useState<string>('全部');
  const [keyword, setKeyword] = useState<string>('');
  const [viewingDetail, setViewingDetail] = useState<ServiceRecordItem | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // 改单弹窗状态 (Image 19)
  const [isChangeOrderModalOpen, setIsChangeOrderModalOpen] = useState<boolean>(false);
  const [changeDate, setChangeDate] = useState<string>('2026-09-19');
  const [changeTime, setChangeTime] = useState<string>('15:00');
  const [changeDuration, setChangeDuration] = useState<string>('2');
  const [selectedStaffId, setSelectedStaffId] = useState<string>('st-01');

  const filteredServices = useMemo(() => {
    return services
      .filter((srv) => {
        const matchType =
          serviceTypeFilter === '全部' ||
          srv.orderInfo.title.includes(serviceTypeFilter) ||
          srv.serviceItem.includes(serviceTypeFilter);
        const matchKeyword =
          !keyword.trim() ||
          srv.workOrderNo.toLowerCase().includes(keyword.toLowerCase()) ||
          srv.orderNo.toLowerCase().includes(keyword.toLowerCase()) ||
          srv.orderInfo.title.toLowerCase().includes(keyword.toLowerCase()) ||
          srv.staff.toLowerCase().includes(keyword.toLowerCase());
        return matchType && matchKeyword;
      })
      .sort((a, b) => new Date(b.dispatchTime).getTime() - new Date(a.dispatchTime).getTime());
  }, [services, serviceTypeFilter, keyword]);

  const handleCopy = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    onNotice(`已复制：${code}`);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleOpenChangeOrder = () => {
    if (!viewingDetail) return;
    setChangeDate(viewingDetail.appointmentTime.split(' ')[0] || '2026-09-19');
    setChangeTime(viewingDetail.appointmentTime.split(' ')[1] || '14:30');
    setChangeDuration(viewingDetail.duration.replace('h', '') || '2');
    setIsChangeOrderModalOpen(true);
  };

  const handleSaveChangeOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!viewingDetail) return;
    const staff = AVAILABLE_STAFF.find((s) => s.id === selectedStaffId) || AVAILABLE_STAFF[0];

    const updatedDetail: ServiceRecordItem = {
      ...viewingDetail,
      appointmentTime: `${changeDate} ${changeTime}`,
      duration: `${changeDuration}h`,
      actualServiceTime: `${changeDate} ${changeTime}`,
      staff: `${staff.name}; 服务协同人员`,
      staffDetail: {
        name: staff.name,
        phone: staff.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2'),
      },
    };

    setViewingDetail(updatedDetail);
    setServices((prev) =>
      prev.map((s) => (s.id === updatedDetail.id ? updatedDetail : s))
    );
    setIsChangeOrderModalOpen(false);
    onNotice(`工单【${viewingDetail.workOrderNo}】已成功改单，已重新指派服务人员【${staff.name}】`);
  };

  // 如果处于“工单详情”模式 (Images 17, 18)
  if (viewingDetail) {
    const srv = viewingDetail;
    return (
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-6 text-xs">
        {/* 标题 */}
        <div className="flex items-center space-x-2 pb-3 border-b border-gray-100">
          <span className="w-1.5 h-4 bg-[#10b981] rounded-full"></span>
          <h2 className="text-base font-semibold text-gray-800">服务工单详情</h2>
        </div>

        {/* 状态大条 (Image 17) */}
        <div className="space-y-1 py-1">
          <div className="text-lg font-bold text-gray-800 tracking-tight">
            {srv.status === '服务中' ? '服务中' : srv.status === '已完成' ? '已完成' : '待派单'}
          </div>
          <div className="text-gray-500">
            {srv.status === '服务中'
              ? '服务人员正在服务中，照护服务全流程实时同步与质量监控保障中...'
              : '本次长者照护与康复理疗工单已顺利结案'}
          </div>
        </div>

        {/* 1. 用户信息横排 (Image 17) */}
        <div className="border-t border-gray-100 pt-4 space-y-3">
          <h3 className="text-sm font-semibold text-gray-800">用户信息</h3>
          <div className="bg-gray-50/60 p-4 rounded-xl border border-gray-100 space-y-3">
            <div className="flex items-center space-x-3">
              <img
                src={srv.customer.avatar}
                alt={srv.customer.name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100 shadow-xs"
              />
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-bold text-gray-800">{srv.customer.name}</span>
                  <button
                    type="button"
                    onClick={() => onNotice(`查看长者【${srv.customer.name}】完整档案`)}
                    className="text-[#10b981] hover:underline"
                  >
                    查看详情
                  </button>
                  <button
                    type="button"
                    onClick={() => onNotice(`联系长者：${srv.customer.phone}`)}
                    className="text-[#10b981] hover:underline"
                  >
                    联系用户
                  </button>
                </div>
                <div className="text-[11px] text-gray-400 font-mono">
                  ID: {srv.customer.userNo}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-[11px] text-gray-600 pt-1">
              <div><span className="text-gray-400">手机号码：</span><span className="font-mono text-gray-800">{srv.customer.phone}</span></div>
              <div><span className="text-gray-400">注册时间：</span><span className="font-mono text-gray-800">{srv.customer.registerTime}</span></div>
              <div><span className="text-gray-400">注册方式：</span><span className="text-gray-800">{srv.customer.registerType}</span></div>
              <div><span className="text-gray-400">最近登录时间：</span><span className="font-mono text-gray-800">{srv.customer.lastLoginTime}</span></div>
              <div><span className="text-gray-400">最近购买时间：</span><span className="font-mono text-gray-800">{srv.customer.lastBuyTime}</span></div>
              <div className="col-span-2 md:col-span-3">
                <span className="text-gray-400">备注：</span><span className="text-gray-800">{srv.customer.remarks}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. 订单信息 (Image 17, 18) */}
        <div className="border-t border-gray-100 pt-4 space-y-3">
          <h3 className="text-sm font-semibold text-gray-800">订单信息</h3>
          <div className="bg-gray-50/60 p-4 rounded-xl border border-gray-100 grid grid-cols-2 md:grid-cols-3 gap-y-2.5 gap-x-4 text-[11px] text-gray-600">
            <div className="flex items-center space-x-1.5">
              <span className="text-gray-400">订单编号：</span>
              <span className="font-mono font-medium text-gray-800">{srv.orderNo}</span>
              <button
                type="button"
                onClick={() => handleCopy(srv.orderNo)}
                className="text-[#10b981] hover:underline"
              >
                {copiedCode === srv.orderNo ? (
                  <span className="text-emerald-600 flex items-center text-[10px]"><Check className="w-3 h-3 mr-0.5" />已复制</span>
                ) : (
                  <span>复制</span>
                )}
              </button>
            </div>
            <div>
              <span className="text-gray-400">商品价格：</span>
              <span className="font-mono text-gray-800">¥{srv.orderInfo.price.toFixed(2)}</span>
            </div>
            <div>
              <span className="text-gray-400">优惠金额：</span>
              <span className="font-mono text-rose-600">-¥{srv.orderInfo.discount.toFixed(2)}</span>
            </div>
            <div>
              <span className="text-gray-400">实付款：</span>
              <span className="font-mono font-bold text-gray-900">¥{srv.orderInfo.actualAmount.toFixed(2)}</span>
            </div>
            <div>
              <span className="text-gray-400">支付方式：</span>
              <span className="text-gray-800">{srv.orderInfo.payMethod}</span>
            </div>
            <div>
              <span className="text-gray-400">下单时间：</span>
              <span className="font-mono text-gray-800">{srv.orderInfo.orderTime}</span>
            </div>
          </div>
        </div>

        {/* 3. 工单信息 (Image 18) */}
        <div className="border-t border-gray-100 pt-4 space-y-4">
          <h3 className="text-sm font-semibold text-gray-800">工单信息</h3>

          {/* 基础信息 */}
          <div className="space-y-2">
            <div className="font-medium text-gray-700">基础信息</div>
            <div className="bg-gray-50/60 p-4 rounded-xl border border-gray-100 grid grid-cols-2 md:grid-cols-3 gap-y-2.5 gap-x-4 text-[11px] text-gray-600">
              <div className="flex items-center space-x-1.5">
                <span className="text-gray-400">工单编号：</span>
                <span className="font-mono font-medium text-gray-800">{srv.workOrderNo}</span>
                <button
                  type="button"
                  onClick={() => handleCopy(srv.workOrderNo)}
                  className="text-[#10b981] hover:underline"
                >
                  {copiedCode === srv.workOrderNo ? (
                    <span className="text-emerald-600 flex items-center text-[10px]"><Check className="w-3 h-3 mr-0.5" />已复制</span>
                  ) : (
                    <span>复制</span>
                  )}
                </button>
              </div>
              <div><span className="text-gray-400">服务项目：</span><span className="text-gray-800 font-medium">{srv.orderInfo.title}</span></div>
              <div><span className="text-gray-400">实付款：</span><span className="font-mono font-semibold text-gray-900">¥{srv.actualAmount.toFixed(2)}</span></div>
              <div><span className="text-gray-400">服务人数：</span><span className="text-gray-800">1人</span></div>
              <div><span className="text-gray-400">客户：</span><span className="text-gray-800">{srv.customer.name} {srv.customer.phone}</span></div>
              <div><span className="text-gray-400">服务区域：</span><span className="text-gray-800">{srv.serviceArea}</span></div>
              <div className="col-span-2"><span className="text-gray-400">上门地址：</span><span className="text-gray-800">{srv.address}</span></div>
              <div><span className="text-gray-400">工单来源：</span><span className="text-gray-800">{srv.source}</span></div>
              <div><span className="text-gray-400">派单人：</span><span className="text-gray-800">{srv.dispatcher}</span></div>
              <div><span className="text-gray-400">派单时间：</span><span className="font-mono text-gray-800">{srv.dispatchTime}</span></div>
            </div>
          </div>

          {/* 服务信息 */}
          <div className="space-y-2">
            <div className="font-medium text-gray-700">服务信息</div>
            <div className="bg-gray-50/60 p-4 rounded-xl border border-gray-100 grid grid-cols-2 md:grid-cols-3 gap-y-2.5 gap-x-4 text-[11px] text-gray-600">
              <div><span className="text-gray-400">预约上门时间：</span><span className="font-mono text-gray-800">{srv.appointmentTime}</span></div>
              <div><span className="text-gray-400">预计服务时长：</span><span className="text-gray-800">{srv.duration}</span></div>
              <div><span className="text-gray-400">实际上门时间：</span><span className="font-mono text-gray-800">{srv.actualServiceTime}</span></div>
              <div><span className="text-gray-400">服务人员：</span><span className="text-gray-800 font-medium">{srv.staffDetail.name} {srv.staffDetail.phone}</span></div>
              <div><span className="text-gray-400">预估佣金：</span><span className="font-mono font-semibold text-emerald-600">¥{srv.estimatedCommission.toFixed(2)}</span></div>
            </div>
          </div>
        </div>

        {/* 底部操作按钮：改单 / 返回 (Image 18) */}
        <div className="flex items-center space-x-3 pt-5 border-t border-gray-100">
          <button
            type="button"
            onClick={handleOpenChangeOrder}
            className="px-5 py-2 bg-[#10b981] hover:bg-[#059669] text-white rounded-lg font-medium shadow-xs transition-colors"
          >
            改单
          </button>
          <button
            type="button"
            onClick={() => setViewingDetail(null)}
            className="px-5 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 font-medium transition-colors"
          >
            返回
          </button>
        </div>

        {/* 改单弹窗 (Image 19) */}
        {isChangeOrderModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4 backdrop-blur-xs">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto text-xs">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
                <h3 className="text-sm font-semibold text-gray-800">改单</h3>
                <button
                  type="button"
                  onClick={() => setIsChangeOrderModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveChangeOrder} className="p-6 space-y-5">
                {/* 订单信息只读区块 */}
                <div className="space-y-2">
                  <div className="text-gray-700 font-semibold text-xs">订单信息</div>
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 grid grid-cols-2 md:grid-cols-3 gap-2.5 text-[11px] text-gray-600">
                    <div><span className="text-gray-400">服务项目：</span><span className="text-gray-800 font-medium">{srv.orderInfo.title}</span></div>
                    <div><span className="text-gray-400">实付款：</span><span className="font-mono text-gray-800 font-medium">¥{srv.actualAmount.toFixed(2)}</span></div>
                    <div><span className="text-gray-400">服务人数：</span><span className="text-gray-800">1人</span></div>
                    <div><span className="text-gray-400">客户：</span><span className="text-gray-800">{srv.customer.name} {srv.customer.phone}</span></div>
                    <div><span className="text-gray-400">服务区域：</span><span className="text-gray-800">{srv.serviceArea}</span></div>
                    <div className="col-span-2"><span className="text-gray-400">上门地址：</span><span className="text-gray-800">{srv.address}</span></div>
                  </div>
                </div>

                {/* 预约信息表单输入 */}
                <div className="space-y-3">
                  <div className="text-gray-700 font-semibold text-xs">预约信息</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-gray-600 font-medium">
                        预约上门时间<span className="text-rose-500">*</span>
                      </label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="date"
                          value={changeDate}
                          max="2026-09-19"
                          onChange={(e) => setChangeDate(e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#10b981]"
                          required
                        />
                        <input
                          type="time"
                          value={changeTime}
                          onChange={(e) => setChangeTime(e.target.value)}
                          className="w-28 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#10b981]"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-gray-600 font-medium">
                        预计服务时长<span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          step="0.5"
                          min="0.5"
                          max="8"
                          value={changeDuration}
                          onChange={(e) => setChangeDuration(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#10b981] pr-8"
                          required
                        />
                        <span className="absolute right-3 top-2 text-gray-400 font-medium">h</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 服务人员选择网格 (Image 19) */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 font-semibold text-xs">
                      选择服务人员<span className="text-rose-500">*</span>
                    </span>
                    <span className="text-gray-400 text-[11px]">点击卡片切换派单人员</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {AVAILABLE_STAFF.map((staff) => {
                      const isSelected = selectedStaffId === staff.id;
                      return (
                        <div
                          key={staff.id}
                          onClick={() => setSelectedStaffId(staff.id)}
                          className={`cursor-pointer rounded-xl p-3 border transition-all relative ${
                            isSelected
                              ? 'border-[#10b981] bg-emerald-50/30 ring-1 ring-[#10b981]'
                              : 'border-gray-200 hover:border-gray-300 bg-white'
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            <img
                              src={staff.avatar}
                              alt={staff.name}
                              className="w-10 h-10 rounded-full object-cover shrink-0"
                            />
                            <div className="min-w-0 flex-1 text-[11px] space-y-0.5">
                              <div className="flex items-center space-x-2">
                                <span className="font-bold text-gray-800 text-xs">{staff.name}</span>
                                <span className="px-1.5 py-0.2 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded text-[10px]">
                                  {staff.status}
                                </span>
                              </div>
                              <div className="text-gray-400 font-mono">工号：{staff.code}</div>
                              <div className="text-gray-500">区域：{staff.area}</div>
                              <div className="text-gray-500 font-mono">电话：{staff.phone}</div>
                            </div>
                          </div>
                          {isSelected && (
                            <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-[#10b981] text-white flex items-center justify-center">
                              <Check className="w-3 h-3 stroke-[3]" />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 弹窗底部操作 */}
                <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setIsChangeOrderModalOpen(false)}
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
  }

  // 服务记录列表主页 (Images 15, 16)
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* 左侧个人画像侧边栏 */}
      <div className="lg:col-span-4 space-y-5">
        <UserProfileSidebar user={user} />
      </div>

      {/* 右侧工单列表 */}
      <div className="lg:col-span-8 space-y-4 text-xs">
        {/* 顶部搜索操作栏 */}
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2.5 flex-1 min-w-[280px]">
            <div className="flex items-center space-x-2">
              <span className="text-gray-500 shrink-0">服务类型</span>
              <select
                value={serviceTypeFilter}
                onChange={(e) => setServiceTypeFilter(e.target.value)}
                className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:border-[#10b981]"
              >
                <option value="全部">请选择</option>
                <option value="康复理疗">康复理疗</option>
                <option value="日常清洁">日常清洁</option>
                <option value="上门助浴">上门助浴</option>
                <option value="安全改造">适老改造</option>
                <option value="采血">慢病护理</option>
                <option value="陪同就医">就医陪诊</option>
              </select>
            </div>

            <div className="relative flex-1 min-w-[160px] max-w-xs">
              <input
                type="text"
                placeholder="请输入关键字"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#10b981]"
              />
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2" />
            </div>

            <button
              type="button"
              onClick={() => onNotice(`已检索服务工单：${serviceTypeFilter}`)}
              className="p-2 bg-[#10b981] hover:bg-[#059669] text-white rounded-lg transition-colors"
              title="搜索"
            >
              <Search className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={() => {
                setServiceTypeFilter('全部');
                setKeyword('');
                onNotice('已重置工单筛选');
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
              onClick={() => onNotice('已开启服务工单批量管理模式')}
              className="px-3 py-1.5 border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-lg font-medium transition-colors"
            >
              批量操作
            </button>
          </div>
        </div>

        {/* 工单表格 */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-[#f9fafb] text-gray-500 border-b border-gray-100 font-medium">
                <tr>
                  <th className="py-3 px-3 min-w-[130px]">工单编号</th>
                  <th className="py-3 px-3 min-w-[200px]">订单信息</th>
                  <th className="py-3 px-3 min-w-[140px]">服务项目</th>
                  <th className="py-3 px-3 min-w-[80px] text-center">状态</th>
                  <th className="py-3 px-3 min-w-[90px] text-center">实付款 (元)</th>
                  <th className="py-3 px-3 min-w-[110px]">服务人员</th>
                  <th className="py-3 px-3 min-w-[125px]">派单时间</th>
                  <th className="py-3 px-4 min-w-[100px] text-right">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredServices.map((srv) => (
                  <tr key={srv.id} className="hover:bg-gray-50/70 transition-colors">
                    <td className="py-3.5 px-3 font-mono text-gray-600 font-medium">
                      {srv.workOrderNo}
                    </td>
                    <td className="py-3.5 px-3">
                      <div className="flex items-center space-x-2.5">
                        <img
                          src={srv.orderInfo.image}
                          alt={srv.orderInfo.title}
                          className="w-12 h-10 rounded-lg object-cover border border-gray-100 shrink-0 shadow-xs"
                        />
                        <div className="min-w-0">
                          <div className="font-medium text-gray-800 line-clamp-1">
                            {srv.orderInfo.title}
                          </div>
                          <div className="text-gray-400 font-mono text-[10px]">
                            ¥{srv.orderInfo.price.toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-3 font-medium text-gray-800">{srv.serviceItem}</td>
                    <td className="py-3.5 px-3 text-center">
                      <span
                        className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                          srv.status === '已完成'
                            ? 'bg-emerald-50 text-emerald-600'
                            : srv.status === '服务中'
                            ? 'bg-blue-50 text-blue-600'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {srv.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-center font-mono font-medium text-gray-800">
                      ¥{srv.actualAmount.toFixed(2)}
                    </td>
                    <td className="py-3.5 px-3 text-gray-700">{srv.staff}</td>
                    <td className="py-3.5 px-3 font-mono text-gray-600">{srv.dispatchTime}</td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end space-x-2.5 font-medium">
                        <button
                          type="button"
                          onClick={() => setViewingDetail(srv)}
                          className="text-[#10b981] hover:underline"
                        >
                          工单详情
                        </button>
                        <button
                          type="button"
                          onClick={() => onNotice(`为工单【${srv.workOrderNo}】添加照护执行备注`)}
                          className="text-gray-400 hover:text-gray-700 hover:underline"
                        >
                          备注
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredServices.length === 0 && (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-gray-400">
                      暂无符合条件的服务记录
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
