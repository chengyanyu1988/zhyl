import React, { useState, useMemo } from 'react';
import {
  Search,
  RotateCcw,
  Calendar,
  X,
  CheckCircle2,
  Clock,
  User,
  Phone,
  FileText,
  AlertTriangle,
  ArrowLeft,
  ChevronRight,
  Plus,
  Edit,
} from 'lucide-react';
import {
  ServiceWorkOrderItem,
  INITIAL_SERVICE_WORK_ORDERS,
  INITIAL_SERVICE_STAFF,
} from '../../data/serviceData';

interface ServiceWorkOrdersProps {
  onNotice: (msg: string) => void;
}

export const ServiceWorkOrders: React.FC<ServiceWorkOrdersProps> = ({ onNotice }) => {
  const [orders, setOrders] = useState<ServiceWorkOrderItem[]>(INITIAL_SERVICE_WORK_ORDERS);
  const [activeTab, setActiveTab] = useState<'待服务' | '服务中' | '已完成' | '已取消'>('待服务');

  // Filters (Screenshot 4)
  const [filterType, setFilterType] = useState('');
  const [dispatchStartDate, setDispatchStartDate] = useState('');
  const [dispatchEndDate, setDispatchEndDate] = useState('');
  const [appointStartDate, setAppointStartDate] = useState('');
  const [appointEndDate, setAppointEndDate] = useState('');
  const [keyword, setKeyword] = useState('');

  // Page / Modal Views
  const [detailOrder, setDetailOrder] = useState<ServiceWorkOrderItem | null>(null);
  const [modifyingOrder, setModifyingOrder] = useState<ServiceWorkOrderItem | null>(null);
  const [modifyDate, setModifyDate] = useState('');
  const [modifyTimeSlot, setModifyTimeSlot] = useState('12:00');
  const [modifyDuration, setModifyDuration] = useState('2');
  const [selectedStaffIds, setSelectedStaffIds] = useState<string[]>([]);

  const [remarkingOrder, setRemarkingOrder] = useState<ServiceWorkOrderItem | null>(null);
  const [remarkText, setRemarkText] = useState('');

  // Filtered orders
  const filteredOrders = useMemo(() => {
    return orders
      .filter((item) => {
        if (item.status !== activeTab) return false;
        if (filterType && !item.title.includes(filterType) && !item.serviceItem.includes(filterType)) {
          return false;
        }
        if (dispatchStartDate && item.dispatchTime.slice(0, 10) < dispatchStartDate) return false;
        if (dispatchEndDate && item.dispatchTime.slice(0, 10) > dispatchEndDate) return false;
        if (appointStartDate && item.appointmentTime.slice(0, 10) < appointStartDate) return false;
        if (appointEndDate && item.appointmentTime.slice(0, 10) > appointEndDate) return false;

        if (keyword) {
          const q = keyword.trim().toLowerCase();
          const matchId = item.id.toLowerCase().includes(q);
          const matchOrderNo = item.orderNo.includes(q);
          const matchTitle = item.title.toLowerCase().includes(q);
          const matchStaff = item.staffNames.toLowerCase().includes(q);
          const matchCustomer = item.customerName.toLowerCase().includes(q);
          if (!matchId && !matchOrderNo && !matchTitle && !matchStaff && !matchCustomer) return false;
        }

        return true;
      })
      .sort((a, b) => new Date(b.dispatchTime).getTime() - new Date(a.dispatchTime).getTime());
  }, [
    orders,
    activeTab,
    filterType,
    dispatchStartDate,
    dispatchEndDate,
    appointStartDate,
    appointEndDate,
    keyword,
  ]);

  const handleResetFilters = () => {
    setFilterType('');
    setDispatchStartDate('');
    setDispatchEndDate('');
    setAppointStartDate('');
    setAppointEndDate('');
    setKeyword('');
    onNotice('已重置工单筛选过滤条件');
  };

  const handleCancelAppointment = (order: ServiceWorkOrderItem) => {
    if (confirm(`确认取消预约工单【${order.id}】？此操作将触发定点长者退费申请。`)) {
      const updated = orders.map((o) => (o.id === order.id ? { ...o, status: '已取消' as const } : o));
      setOrders(updated);
      if (detailOrder?.id === order.id) {
        setDetailOrder({ ...detailOrder, status: '已取消' });
      }
      onNotice(`已取消工单【${order.id}】的预约服务`);
    }
  };

  const openModifyModal = (order: ServiceWorkOrderItem) => {
    setModifyingOrder(order);
    const datePart = order.appointmentTime.split(' ')[0] || '2026-09-19';
    const timePart = order.appointmentTime.split(' ')[1] || '12:00';
    setModifyDate(datePart);
    setModifyTimeSlot(timePart);
    setModifyDuration('2');
    setSelectedStaffIds([INITIAL_SERVICE_STAFF[0].id]);
  };

  const handleSaveModify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modifyingOrder) return;
    const selectedStaffNames = INITIAL_SERVICE_STAFF.filter((s) =>
      selectedStaffIds.includes(s.id)
    )
      .map((s) => s.name)
      .join('; ');

    const newAppointTime = `${modifyDate} ${modifyTimeSlot}`;
    const updated = orders.map((o) =>
      o.id === modifyingOrder.id
        ? {
            ...o,
            staffNames: selectedStaffNames || o.staffNames,
            appointmentTime: newAppointTime,
          }
        : o
    );
    setOrders(updated);
    if (detailOrder?.id === modifyingOrder.id) {
      setDetailOrder({
        ...detailOrder,
        staffNames: selectedStaffNames || detailOrder.staffNames,
        appointmentTime: newAppointTime,
      });
    }
    onNotice(`已成功改派工单【${modifyingOrder.id}】的服务人员与预约时段`);
    setModifyingOrder(null);
  };

  const handleSaveRemark = (e: React.FormEvent) => {
    e.preventDefault();
    if (!remarkingOrder) return;
    const updated = orders.map((o) =>
      o.id === remarkingOrder.id ? { ...o, remark: remarkText } : o
    );
    setOrders(updated);
    if (detailOrder?.id === remarkingOrder.id) {
      setDetailOrder({ ...detailOrder, remark: remarkText });
    }
    onNotice(`已为工单【${remarkingOrder.id}】更新备注说明`);
    setRemarkingOrder(null);
  };

  // Modals Renderer
  const renderModals = () => (
    <>
      {/* Modal: 改单 (Screenshots 2 & 6) */}
      {modifyingOrder && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4 overflow-y-auto">
          <form
            onSubmit={handleSaveModify}
            className="bg-white rounded-xl p-6 max-w-2xl w-full border border-gray-100 shadow-2xl space-y-5 my-8 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="font-bold text-gray-800 text-base">改单 - 重新指派服务人员与预约时段</h3>
              <button
                type="button"
                onClick={() => setModifyingOrder(null)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* 订单信息 Block */}
            <div className="bg-gray-50/70 p-4 rounded-xl border border-gray-100 space-y-2 text-xs">
              <h4 className="font-semibold text-gray-700 pb-1.5 border-b border-gray-200/50">工单基础信息</h4>
              <div className="grid grid-cols-2 gap-2 text-gray-600 pt-1">
                <div><span className="text-gray-400">服务项目:</span> {modifyingOrder.title}</div>
                <div><span className="text-gray-400">实付款:</span> <span className="font-mono text-emerald-600 font-semibold">{modifyingOrder.actualAmount.toFixed(2)}元</span></div>
                <div><span className="text-gray-400">服务人数:</span> {modifyingOrder.servicePeopleCount || 1}人</div>
                <div><span className="text-gray-400">客户:</span> {modifyingOrder.customerName} ({modifyingOrder.customerPhone})</div>
                <div className="col-span-2"><span className="text-gray-400">服务区域:</span> {modifyingOrder.serviceRegion || '上海市徐汇区'}</div>
                <div className="col-span-2"><span className="text-gray-400">上门地址:</span> {modifyingOrder.address || '上海市徐汇区黎梅花园88栋3单元101'}</div>
              </div>
            </div>

            {/* 预约信息 Block */}
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-700 text-xs">预约信息</h4>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="text-gray-600 mb-1 block">
                    <span className="text-rose-500 mr-0.5">*</span>预约上门时间
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="date"
                      value={modifyDate}
                      onChange={(e) => setModifyDate(e.target.value)}
                      className="flex-1 px-3 py-1.5 border border-gray-200 rounded-md text-gray-800 font-mono focus:outline-none focus:border-[#10b981]"
                    />
                    <select
                      value={modifyTimeSlot}
                      onChange={(e) => setModifyTimeSlot(e.target.value)}
                      className="px-2.5 py-1.5 border border-gray-200 rounded-md text-gray-800 font-mono bg-white focus:outline-none focus:border-[#10b981]"
                    >
                      <option value="09:00">09:00</option>
                      <option value="10:30">10:30</option>
                      <option value="12:00">12:00</option>
                      <option value="14:30">14:30</option>
                      <option value="16:00">16:00</option>
                      <option value="18:30">18:30</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-gray-600 mb-1 block">
                    <span className="text-rose-500 mr-0.5">*</span>预计服务时长 (小时)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="8"
                    value={modifyDuration}
                    onChange={(e) => setModifyDuration(e.target.value)}
                    className="w-full px-3 py-1.5 border border-gray-200 rounded-md text-gray-800 font-mono focus:outline-none focus:border-[#10b981]"
                  />
                </div>
              </div>
            </div>

            {/* 服务人员 Block */}
            <div className="space-y-3 pt-2 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-700 text-xs">
                  服务人员 <span className="text-emerald-600 font-mono font-normal">已选择 {selectedStaffIds.length}人</span>
                </span>
                <span className="text-gray-400 text-[11px]">点击选择/取消选择派单人员</span>
              </div>

              <div className="grid grid-cols-2 gap-3 max-h-48 overflow-y-auto pr-1">
                {INITIAL_SERVICE_STAFF.map((staff) => {
                  const isSelected = selectedStaffIds.includes(staff.id);
                  return (
                    <div
                      key={staff.id}
                      onClick={() => {
                        if (isSelected) {
                          setSelectedStaffIds(selectedStaffIds.filter((id) => id !== staff.id));
                        } else {
                          setSelectedStaffIds([...selectedStaffIds, staff.id]);
                        }
                      }}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center space-x-3 relative ${
                        isSelected
                          ? 'border-[#10b981] bg-emerald-50/30 shadow-xs'
                          : 'border-gray-100 hover:border-gray-200 bg-white'
                      }`}
                    >
                      <img
                        src={staff.avatar}
                        alt=""
                        className="w-10 h-10 rounded-full object-cover border border-gray-100 shrink-0"
                      />
                      <div className="flex-1 min-w-0 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-gray-800 truncate">{staff.name}</span>
                          <span className="px-1.5 py-0.5 bg-emerald-100 text-[#10b981] text-[10px] rounded font-medium">
                            空闲
                          </span>
                        </div>
                        <div className="text-gray-400 font-mono text-[10px] mt-0.5">
                          ID:{staff.staffNo}
                        </div>
                        <div className="text-gray-500 text-[11px] truncate mt-0.5">
                          {staff.region} · {staff.phone}
                        </div>
                      </div>
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-4 h-4 bg-[#10b981] rounded-full flex items-center justify-center text-white">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="pt-4 border-t border-gray-100 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setModifyingOrder(null)}
                className="px-5 py-1.5 border border-gray-200 text-gray-600 rounded-md hover:bg-gray-50 transition-colors"
              >
                取消
              </button>
              <button
                type="submit"
                className="px-5 py-1.5 bg-[#10b981] text-white rounded-md hover:bg-[#059669] transition-colors font-medium shadow-xs"
              >
                确定改单
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Modal: 备注 */}
      {remarkingOrder && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <form
            onSubmit={handleSaveRemark}
            className="bg-white rounded-xl p-6 max-w-md w-full border border-gray-100 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center space-x-2">
                <span className="w-1 h-4 bg-[#10b981] rounded-full"></span>
                <h3 className="font-semibold text-gray-800 text-sm">工单备注 - {remarkingOrder.id}</h3>
              </div>
              <button
                type="button"
                onClick={() => setRemarkingOrder(null)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <textarea
                rows={4}
                value={remarkText}
                onChange={(e) => setRemarkText(e.target.value)}
                placeholder="请输入服务随访注意事项、特殊医疗医嘱或长者身体偏好"
                className="w-full px-3 py-2 border border-gray-200 rounded-md text-gray-800 focus:outline-none focus:border-[#10b981]"
              />
            </div>

            <div className="pt-3 border-t border-gray-100 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setRemarkingOrder(null)}
                className="px-4 py-1.5 border border-gray-200 text-gray-600 rounded-md hover:bg-gray-50 transition-colors"
              >
                取消
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-[#10b981] text-white rounded-md hover:bg-[#059669] transition-colors"
              >
                保存备注
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );

  // Full Detail View (Screenshots 3, 4, 7, 8, 10, 11, 13, 14)
  if (detailOrder) {
    const isPending = detailOrder.status === '待服务';
    const isInProgress = detailOrder.status === '服务中';
    const isCompleted = detailOrder.status === '已完成';
    const isCancelled = detailOrder.status === '已取消';

    return (
      <div className="p-6 max-w-[1600px] mx-auto text-xs space-y-5 bg-gray-50/50 min-h-screen pb-20">
        {/* Breadcrumb & Header */}
        <div className="flex items-center justify-between bg-white px-6 py-4 rounded-xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setDetailOrder(null)}
              className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <span className="text-gray-400">工单管理</span>
            <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
            <h1 className="text-sm font-semibold text-gray-800">服务工单详情</h1>
          </div>
          <button
            onClick={() => setDetailOrder(null)}
            className="px-4 py-1.5 border border-gray-200 text-gray-600 rounded-md hover:bg-gray-50 transition-colors"
          >
            返回列表
          </button>
        </div>

        {/* Status Card Banner */}
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex items-center justify-between">
          <div>
            <div className="text-gray-400 text-xs mb-1">工单状态</div>
            <div className="flex items-center space-x-3">
              <span className="text-lg font-bold text-gray-800">{detailOrder.status}</span>
              <span className="text-gray-500 text-xs">
                {isPending && '已接单，等待服务人员上门服务'}
                {isInProgress && '服务人员服务中.....'}
                {isCompleted && '服务已完成。'}
                {isCancelled && '工单已取消，如有需要请重新派单。'}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {(isPending || isInProgress) && (
              <button
                onClick={() => openModifyModal(detailOrder)}
                className="px-4 py-1.5 bg-[#10b981] text-white rounded-md hover:bg-[#059669] transition-colors"
              >
                改单
              </button>
            )}
            {isPending && (
              <button
                onClick={() => handleCancelAppointment(detailOrder)}
                className="px-4 py-1.5 border border-rose-200 text-rose-600 rounded-md hover:bg-rose-50 transition-colors"
              >
                取消预约
              </button>
            )}
          </div>
        </div>

        {/* 工单备注 Banner */}
        <div className="bg-white rounded-xl px-6 py-3.5 border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-gray-500 font-medium">工单备注:</span>
            <span className="text-gray-800">
              {detailOrder.remark || '暂无特别备注事项'}
            </span>
          </div>
          <button
            onClick={() => {
              setRemarkingOrder(detailOrder);
              setRemarkText(detailOrder.remark || '');
            }}
            className="text-[#10b981] hover:underline flex items-center space-x-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{detailOrder.remark ? '修改备注' : '添加备注'}</span>
          </button>
        </div>

        {/* 用户信息 Block */}
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <img
                src={detailOrder.customerAvatar}
                alt=""
                className="w-10 h-10 rounded-full object-cover border border-gray-100"
              />
              <div>
                <div className="font-semibold text-gray-800 text-sm">{detailOrder.customerName || '王强'}</div>
                <div className="text-gray-400 font-mono text-[11px]">
                  ID: {detailOrder.customerId || '202609000001'}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => onNotice(`已调出客户【${detailOrder.customerName}】的全量档案`)}
                className="text-[#10b981] hover:underline"
              >
                查看详情
              </button>
              <button
                onClick={() => onNotice(`正在呼叫客户【${detailOrder.customerName}】: ${detailOrder.customerPhone}`)}
                className="text-[#10b981] hover:underline"
              >
                联系用户
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-3 gap-x-6 text-xs">
            <div>
              <span className="text-gray-400 block mb-0.5">手机号码</span>
              <span className="text-gray-800 font-mono">{detailOrder.customerPhone || '192****4486'}</span>
            </div>
            <div>
              <span className="text-gray-400 block mb-0.5">注册时间</span>
              <span className="text-gray-800 font-mono">
                {detailOrder.customerRegisterTime || '2026-08-30 10:09:09'}
              </span>
            </div>
            <div>
              <span className="text-gray-400 block mb-0.5">注册方式</span>
              <span className="text-gray-800">注册</span>
            </div>
            <div>
              <span className="text-gray-400 block mb-0.5">最近登录时间</span>
              <span className="text-gray-800 font-mono">
                {detailOrder.customerLastLogin || '2026-09-18 10:09:09'}
              </span>
            </div>
            <div>
              <span className="text-gray-400 block mb-0.5">最近购买时间</span>
              <span className="text-gray-800 font-mono">
                {detailOrder.customerLastPurchase || '2026-09-18 11:09:09'}
              </span>
            </div>
            <div>
              <span className="text-gray-400 block mb-0.5">用户备注</span>
              <span className="text-gray-800">-</span>
            </div>
          </div>
        </div>

        {/* 订单信息 Block */}
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-4">
          <div className="flex items-center space-x-2 pb-2 border-b border-gray-100">
            <span className="w-1 h-4 bg-[#10b981] rounded-full"></span>
            <h2 className="font-semibold text-gray-800 text-sm">订单信息</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 text-gray-500 bg-gray-50/50">
                  <th className="py-2.5 px-4 font-medium">订单信息</th>
                  <th className="py-2.5 px-4 font-medium">商品价格</th>
                  <th className="py-2.5 px-4 font-medium">优惠金额</th>
                  <th className="py-2.5 px-4 font-medium">实付款</th>
                  <th className="py-2.5 px-4 font-medium">支付方式</th>
                  <th className="py-2.5 px-4 font-medium">下单时间</th>
                  <th className="py-2.5 px-4 font-medium text-right">操作</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={detailOrder.thumbnail}
                        alt=""
                        className="w-12 h-12 rounded object-cover border border-gray-100 shrink-0"
                      />
                      <div>
                        <div className="font-medium text-gray-800">{detailOrder.title}</div>
                        <div className="text-gray-400 font-mono text-[11px]">{detailOrder.orderNo}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-mono text-gray-700">
                    ¥{(detailOrder.originalPrice || 399).toFixed(2)}
                  </td>
                  <td className="py-3 px-4 font-mono text-gray-700">
                    ¥{(detailOrder.discountAmount || 99).toFixed(2)}
                  </td>
                  <td className="py-3 px-4 font-mono text-emerald-600 font-semibold">
                    ¥{detailOrder.actualAmount.toFixed(2)}
                  </td>
                  <td className="py-3 px-4 text-gray-700">
                    {detailOrder.paymentMethod || '支付宝'}
                  </td>
                  <td className="py-3 px-4 font-mono text-gray-600 whitespace-nowrap">
                    {detailOrder.orderCreateTime || detailOrder.dispatchTime}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => onNotice(`已穿透打开平台对应交易订单号: ${detailOrder.orderNo}`)}
                      className="text-[#10b981] hover:underline"
                    >
                      订单详情
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 工单信息 Block */}
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-5">
          <div className="flex items-center space-x-2 pb-2 border-b border-gray-100">
            <span className="w-1 h-4 bg-[#10b981] rounded-full"></span>
            <h2 className="font-semibold text-gray-800 text-sm">工单信息</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs">
            {/* 基础信息 */}
            <div className="space-y-3 bg-gray-50/60 p-4 rounded-xl border border-gray-100">
              <h3 className="font-semibold text-gray-700 pb-2 border-b border-gray-200/60">基础信息</h3>
              <div className="grid grid-cols-3 gap-2">
                <span className="text-gray-400">工单编号:</span>
                <span className="col-span-2 font-mono text-gray-800">{detailOrder.id}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <span className="text-gray-400">服务项目:</span>
                <span className="col-span-2 text-gray-800">{detailOrder.serviceItem}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <span className="text-gray-400">实付款:</span>
                <span className="col-span-2 font-mono text-emerald-600 font-semibold">
                  {detailOrder.actualAmount.toFixed(2)}元
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <span className="text-gray-400">服务人数:</span>
                <span className="col-span-2 text-gray-800">
                  {detailOrder.servicePeopleCount || 1}人
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <span className="text-gray-400">客户:</span>
                <span className="col-span-2 text-gray-800">
                  {detailOrder.customerName} {detailOrder.customerPhone}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <span className="text-gray-400">服务区域:</span>
                <span className="col-span-2 text-gray-800">
                  {detailOrder.serviceRegion || '上海市徐汇区'}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <span className="text-gray-400">上门地址:</span>
                <span className="col-span-2 text-gray-800">
                  {detailOrder.address || '上海市徐汇区黎梅花园88栋3单元101'}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <span className="text-gray-400">工单来源:</span>
                <span className="col-span-2 text-gray-800">
                  {detailOrder.dispatchSource || '后台派单'}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <span className="text-gray-400">派单人:</span>
                <span className="col-span-2 text-gray-800">
                  {detailOrder.dispatcherName || '李明明'}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <span className="text-gray-400">派单时间:</span>
                <span className="col-span-2 font-mono text-gray-800">{detailOrder.dispatchTime}</span>
              </div>
              {isCancelled && (
                <>
                  <div className="grid grid-cols-3 gap-2">
                    <span className="text-gray-400">取消时间:</span>
                    <span className="col-span-2 font-mono text-rose-600">
                      {detailOrder.cancelTime || '2026-09-19 14:12:07'}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <span className="text-gray-400">操作人:</span>
                    <span className="col-span-2 text-gray-800">
                      {detailOrder.cancelOperator || '系统/用户发起'}
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* 服务信息 */}
            <div className="space-y-3 bg-gray-50/60 p-4 rounded-xl border border-gray-100">
              <h3 className="font-semibold text-gray-700 pb-2 border-b border-gray-200/60">服务信息</h3>
              <div className="grid grid-cols-3 gap-2">
                <span className="text-gray-400">预约上门时间:</span>
                <span className="col-span-2 font-mono text-gray-800">
                  {detailOrder.appointmentTime}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <span className="text-gray-400">预计服务时长:</span>
                <span className="col-span-2 font-mono text-gray-800">
                  {detailOrder.estimatedDuration || '2h'}
                </span>
              </div>
              {(isInProgress || isCompleted) && (
                <>
                  <div className="grid grid-cols-3 gap-2">
                    <span className="text-gray-400">实际上门时间:</span>
                    <span className="col-span-2 font-mono text-gray-800">
                      {detailOrder.actualStartTime || detailOrder.appointmentTime}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <span className="text-gray-400">服务时长:</span>
                    <span className="col-span-2 font-mono text-gray-800">
                      {detailOrder.actualDuration || '2小时05分'}
                    </span>
                  </div>
                </>
              )}
              <div className="grid grid-cols-3 gap-2">
                <span className="text-gray-400">服务人员:</span>
                <span className="col-span-2 text-gray-800 font-medium">
                  {detailOrder.staffNames} {detailOrder.staffPhone ? `(${detailOrder.staffPhone})` : ''}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <span className="text-gray-400">预估佣金:</span>
                <span className="col-span-2 font-mono text-emerald-600 font-semibold">
                  {(detailOrder.estimatedCommission || detailOrder.actualAmount * 0.4).toFixed(2)}元
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Floating Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-3 px-8 shadow-lg flex items-center justify-end space-x-3 z-40">
          {(isPending || isInProgress) && (
            <button
              onClick={() => openModifyModal(detailOrder)}
              className="px-5 py-2 bg-[#10b981] text-white rounded-md font-medium hover:bg-[#059669] transition-colors"
            >
              改单
            </button>
          )}
          {isPending && (
            <button
              onClick={() => handleCancelAppointment(detailOrder)}
              className="px-5 py-2 border border-rose-200 text-rose-600 rounded-md font-medium hover:bg-rose-50 transition-colors"
            >
              取消预约
            </button>
          )}
          <button
            onClick={() => setDetailOrder(null)}
            className="px-5 py-2 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 transition-colors"
          >
            返回
          </button>
        </div>

        {renderModals()}
      </div>
    );
  }

  return (
    <div className="p-6 max-w-[1600px] mx-auto text-xs space-y-6">
      {/* Filter Card (Screenshot 4) */}
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-5">
        {/* Title */}
        <div className="flex items-center space-x-2.5 pb-2">
          <span className="w-1 h-4 bg-[#10b981] rounded-full"></span>
          <h1 className="text-sm font-semibold text-gray-800">售后管理</h1>
        </div>

        {/* Filter Rows */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          {/* 服务类型 */}
          <div className="flex items-center space-x-2">
            <span className="text-gray-500 whitespace-nowrap w-16">服务类型</span>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="flex-1 px-3 py-1.5 border border-gray-200 rounded-md text-gray-700 bg-white focus:outline-none focus:border-[#10b981]"
            >
              <option value="">请选择</option>
              <option value="康复理疗">康复理疗</option>
              <option value="卧床助浴">卧床助浴</option>
              <option value="适老改造">适老改造</option>
              <option value="陪诊">医院陪诊</option>
              <option value="慢病随访">慢病随访</option>
              <option value="认知症">认知症益智照护</option>
              <option value="保洁">适老保洁</option>
            </select>
          </div>

          {/* 派单日期 */}
          <div className="flex items-center space-x-2 md:col-span-2">
            <span className="text-gray-500 whitespace-nowrap w-16">派单日期</span>
            <div className="flex items-center space-x-2 flex-1">
              <input
                type="date"
                min="2026-09-01"
                max="2026-09-19"
                value={dispatchStartDate}
                onChange={(e) => setDispatchStartDate(e.target.value)}
                className="flex-1 px-2.5 py-1.5 border border-gray-200 rounded-md text-gray-700 text-xs focus:outline-none focus:border-[#10b981]"
              />
              <span className="text-gray-400">~</span>
              <input
                type="date"
                min="2026-09-01"
                max="2026-09-19"
                value={dispatchEndDate}
                onChange={(e) => setDispatchEndDate(e.target.value)}
                className="flex-1 px-2.5 py-1.5 border border-gray-200 rounded-md text-gray-700 text-xs focus:outline-none focus:border-[#10b981]"
              />
            </div>
          </div>
        </div>

        {/* Row 2: 预约日期 & 关键字 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          <div className="flex items-center space-x-2 md:col-span-2">
            <span className="text-gray-500 whitespace-nowrap w-16">预约日期</span>
            <div className="flex items-center space-x-2 flex-1">
              <input
                type="date"
                min="2026-09-01"
                max="2026-09-19"
                value={appointStartDate}
                onChange={(e) => setAppointStartDate(e.target.value)}
                className="flex-1 px-2.5 py-1.5 border border-gray-200 rounded-md text-gray-700 text-xs focus:outline-none focus:border-[#10b981]"
              />
              <span className="text-gray-400">~</span>
              <input
                type="date"
                min="2026-09-01"
                max="2026-09-19"
                value={appointEndDate}
                onChange={(e) => setAppointEndDate(e.target.value)}
                className="flex-1 px-2.5 py-1.5 border border-gray-200 rounded-md text-gray-700 text-xs focus:outline-none focus:border-[#10b981]"
              />
            </div>
          </div>

          <div className="flex items-center space-x-3 md:col-span-2">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="请输入工单号 / 订单号 / 客户姓名"
              className="flex-1 px-3 py-1.5 border border-gray-200 rounded-md text-gray-700 focus:outline-none focus:border-[#10b981]"
            />
            <button
              onClick={() => onNotice(`已检索到 ${filteredOrders.length} 条符合条件的工单记录`)}
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
      </div>

      {/* Main Work Orders Card (Screenshot 4) */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-hidden">
        {/* Status Tabs Header */}
        <div className="flex items-center justify-between px-6 pt-4 border-b border-gray-100">
          <div className="flex items-center space-x-8">
            {(['待服务', '服务中', '已完成', '已取消'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 font-medium transition-colors relative ${
                  activeTab === tab ? 'text-[#10b981]' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <span>{tab}</span>
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#10b981] rounded-full"></span>
                )}
              </button>
            ))}
          </div>

          <div className="pb-3">
            <button
              onClick={() => onNotice('支持批量打印派工单、批量改派服务人员及导出电子台账')}
              className="px-4 py-1.5 border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-md font-medium transition-colors"
            >
              批量操作
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-gray-600 bg-gray-50/50">
                <th className="py-3 px-4 font-medium">工单编号</th>
                <th className="py-3 px-4 font-medium">订单信息</th>
                <th className="py-3 px-4 font-medium">服务项目</th>
                <th className="py-3 px-4 font-medium">实付款 (元)</th>
                <th className="py-3 px-4 font-medium">服务人员</th>
                <th className="py-3 px-4 font-medium">服务客户</th>
                <th className="py-3 px-4 font-medium">派单时间</th>
                <th className="py-3 px-4 font-medium text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-gray-400">
                    当前【{activeTab}】分类下暂无工单
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="py-3.5 px-4 font-mono text-gray-600">{order.id}</td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={order.thumbnail}
                          alt=""
                          className="w-11 h-11 rounded object-cover border border-gray-100 shrink-0"
                        />
                        <div>
                          <div className="font-medium text-gray-800">{order.title}</div>
                          <div className="text-gray-400 font-mono text-[11px]">{order.orderNo}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-gray-700">{order.serviceItem}</td>
                    <td className="py-3.5 px-4 font-mono text-gray-800">
                      {order.actualAmount.toFixed(2)}
                    </td>
                    <td className="py-3.5 px-4 text-gray-700">{order.staffNames}</td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center space-x-2.5">
                        <img
                          src={order.customerAvatar}
                          alt=""
                          className="w-8 h-8 rounded-full object-cover border border-gray-100 shrink-0"
                        />
                        <div>
                          <div className="font-medium text-gray-800">{order.customerName}</div>
                          <div className="text-gray-400 font-mono text-[11px]">{order.customerPhone}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-gray-500 whitespace-nowrap">
                      {order.dispatchTime}
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end space-x-2.5">
                        {(order.status === '待服务' || order.status === '服务中') && (
                          <button
                            onClick={() => openModifyModal(order)}
                            className="text-[#10b981] hover:underline"
                          >
                            改单
                          </button>
                        )}
                        {order.status === '待服务' && (
                          <button
                            onClick={() => handleCancelAppointment(order)}
                            className="text-rose-500 hover:underline"
                          >
                            取消预约
                          </button>
                        )}
                        <button
                          onClick={() => setDetailOrder(order)}
                          className="text-[#10b981] hover:underline"
                        >
                          工单详情
                        </button>
                        <button
                          onClick={() => {
                            setRemarkingOrder(order);
                            setRemarkText(order.remark || '');
                          }}
                          className="text-[#10b981] hover:underline"
                        >
                          备注
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {renderModals()}
    </div>
  );
};
