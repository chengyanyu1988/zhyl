import React, { useState, useMemo } from 'react';
import { ServiceWorkOrders } from '../service/ServiceWorkOrders';
import {
  Search,
  RefreshCw,
  ShoppingBag,
  Clock,
  User,
  Phone,
  Calendar,
  MapPin,
  Tag,
  DollarSign,
  Send,
  MessageSquare,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Edit3,
  X,
  FileText,
  UserCheck,
  Star,
  Settings,
  ArrowDownRight,
  ArrowUpRight,
  Plus,
  Sliders,
  ChevronRight,
  ShieldAlert,
  RotateCcw,
  SlidersHorizontal,
  ChevronLeft,
  ChevronsLeft,
  ChevronsRight,
  Trash2,
  Eye,
} from 'lucide-react';
import {
  SubPageId,
  TradeOrder,
  TradeOrderStatus,
  AfterSalesRecord,
  OrderReview,
  WithdrawalRecord,
  FinancialStatement,
  RefundReasonSetting,
  TradeGeneralSettings,
} from '../../types';
import {
  MOCK_TRADE_ORDERS,
  MOCK_AFTER_SALES,
  MOCK_ORDER_REVIEWS,
  MOCK_WITHDRAWALS,
  MOCK_FINANCIAL_STATEMENTS,
  MOCK_REFUND_REASONS,
  MOCK_TRADE_GENERAL_SETTINGS,
} from '../../data/tradeData';

interface TradeManagementProps {
  subPageId: SubPageId;
  onNotice: (msg: string) => void;
  onConfirmDelete?: (title: string, message: string, onConfirm: () => void) => void;
}

export const TradeManagement: React.FC<TradeManagementProps> = ({
  subPageId,
  onNotice,
}) => {
  // State for Orders
  const [orders, setOrders] = useState<TradeOrder[]>(MOCK_TRADE_ORDERS);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPayMethod, setSelectedPayMethod] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('全部');

  // Detail view state
  const [activeOrderDetailId, setActiveOrderDetailId] = useState<string | null>(null);

  // Modals state
  const [priceModalOrder, setPriceModalOrder] = useState<TradeOrder | null>(null);
  const [priceAdjustment, setPriceAdjustment] = useState<string>('20');

  const [closeModalOrder, setCloseModalOrder] = useState<TradeOrder | null>(null);

  const [dispatchModalOrder, setDispatchModalOrder] = useState<TradeOrder | null>(null);
  const [selectedStaff, setSelectedStaff] = useState<string>('王小倩');

  const [remarkModalOrder, setRemarkModalOrder] = useState<TradeOrder | null>(null);
  const [remarkText, setRemarkText] = useState<string>('');

  const [refundModalOrder, setRefundModalOrder] = useState<TradeOrder | null>(null);
  const [refundReasonSelect, setRefundReasonSelect] = useState<string>('未按时上门');
  const [refundAmountInput, setRefundAmountInput] = useState<string>('');
  const [refundExpInput, setRefundExpInput] = useState<string>('');

  // Contact / Chat IM state
  const [chatModalOrder, setChatModalOrder] = useState<TradeOrder | null>(null);
  const [chatMessages, setChatMessages] = useState<
    { id: string; sender: 'user' | 'service'; text: string; time: string }[]
  >([
    { id: '1', sender: 'user', text: '您好！请问康复理疗项目适合多大年龄的老人？', time: '09:08' },
    { id: '2', sender: 'service', text: '您好！我们的康复项目主要针对60-80岁中老年人，理疗师会上门做针对性评估。', time: '09:09' },
    { id: '3', sender: 'user', text: '好的，我已经下单了，请安排有经验的师傅。', time: '09:09' },
  ]);
  const [inputChatText, setInputChatText] = useState<string>('');

  // Sub-pages state
  const [afterSalesList, setAfterSalesList] = useState<AfterSalesRecord[]>(MOCK_AFTER_SALES);
  const [afterSalesTab, setAfterSalesTab] = useState<string>('全部');
  const [afterSalesSearchKey, setAfterSalesSearchKey] = useState<string>('');
  const [afterSalesMinPrice, setAfterSalesMinPrice] = useState<string>('');
  const [afterSalesMaxPrice, setAfterSalesMaxPrice] = useState<string>('');
  const [afterSalesStartDate, setAfterSalesStartDate] = useState<string>('');
  const [afterSalesEndDate, setAfterSalesEndDate] = useState<string>('');
  const [selectedAfterSalesDetail, setSelectedAfterSalesDetail] = useState<AfterSalesRecord | null>(null);

  const [agreeModalRecord, setAgreeModalRecord] = useState<AfterSalesRecord | null>(null);
  const [agreeAmountInput, setAgreeAmountInput] = useState<string>('');
  const [agreeExpInput, setAgreeExpInput] = useState<string>('');

  // 改单 Modal 状态
  const [changeOrderModalOrder, setChangeOrderModalOrder] = useState<TradeOrder | null>(null);
  const [changeOrderStaff, setChangeOrderStaff] = useState<string>('王小倩');
  const [changeOrderDate, setChangeOrderDate] = useState<string>('2026-09-20');
  const [changeOrderTime, setChangeOrderTime] = useState<string>('14:00');
  const [changeOrderRemark, setChangeOrderRemark] = useState<string>('');

  const [rejectModalRecord, setRejectModalRecord] = useState<AfterSalesRecord | null>(null);
  const [rejectExpInput, setRejectExpInput] = useState<string>('');

  const [reviewsList, setReviewsList] = useState<OrderReview[]>(MOCK_ORDER_REVIEWS);
  const [reviewReplyModal, setReviewReplyModal] = useState<OrderReview | null>(null);
  const [reviewReplyText, setReviewReplyText] = useState<string>('');

  const [withdrawalsList] = useState<WithdrawalRecord[]>(MOCK_WITHDRAWALS);
  const [withdrawalDetailModal, setWithdrawalDetailModal] = useState<WithdrawalRecord | null>(null);
  const [withdrawalStatusFilter, setWithdrawalStatusFilter] = useState<string>('all');
  const [withdrawalSearchKey, setWithdrawalSearchKey] = useState<string>('');

  const [statementsList] = useState<FinancialStatement[]>(MOCK_FINANCIAL_STATEMENTS);
  const [statementTypeFilter, setStatementTypeFilter] = useState<string>('all');
  const [statementSearchKey, setStatementSearchKey] = useState<string>('');

  const [refundReasons, setRefundReasons] = useState<RefundReasonSetting[]>(MOCK_REFUND_REASONS);
  const [reasonSearchKey, setReasonSearchKey] = useState<string>('');
  const [isAddReasonOpen, setIsAddReasonOpen] = useState<boolean>(false);
  const [editingReason, setEditingReason] = useState<RefundReasonSetting | null>(null);
  const [newReasonText, setNewReasonText] = useState<string>('');
  const [newReasonSortOrder, setNewReasonSortOrder] = useState<number>(5);
  const [newReasonStatus, setNewReasonStatus] = useState<'启用' | '禁用'>('启用');

  const [generalSettings, setGeneralSettings] = useState<TradeGeneralSettings>(
    MOCK_TRADE_GENERAL_SETTINGS
  );

  // Filtered orders with strict descending order by time
  const filteredOrders = useMemo(() => {
    return orders
      .filter((ord) => {
        // Tab filter
        if (activeTab === '待付款' && ord.status !== '待付款') return false;
        if (activeTab === '待接单' && ord.status !== '待接单') return false;
        if (activeTab === '待服务' && ord.status !== '待服务') return false;
        if (activeTab === '已完成' && ord.status !== '已完成') return false;
        if (activeTab === '退款售后' && ord.status !== '退款完成，订单关闭') return false;
        if (activeTab === '已关闭' && ord.status !== '支付超时，订单关闭' && ord.status !== '退款完成，订单关闭') return false;

        // Category filter
        if (selectedCategory !== 'all' && ord.productCategory !== selectedCategory) return false;

        // Payment method filter
        if (selectedPayMethod !== 'all' && ord.paymentMethod !== selectedPayMethod) return false;

        // Price range filter
        if (minPrice && ord.payableAmount < parseFloat(minPrice)) return false;
        if (maxPrice && ord.payableAmount > parseFloat(maxPrice)) return false;

        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.trim().toLowerCase();
          const matchNo = ord.orderNo.toLowerCase().includes(q);
          const matchBuyer = ord.buyerName.toLowerCase().includes(q) || ord.buyerPhone.includes(q);
          const matchTitle = ord.productTitle.toLowerCase().includes(q);
          if (!matchNo && !matchBuyer && !matchTitle) return false;
        }

        return true;
      })
      .sort((a, b) => new Date(b.orderTime).getTime() - new Date(a.orderTime).getTime());
  }, [orders, activeTab, selectedCategory, selectedPayMethod, minPrice, maxPrice, searchQuery]);

  // Tab counts calculation
  const counts = useMemo(() => {
    return {
      all: orders.length,
      unpaid: orders.filter((o) => o.status === '待付款').length,
      pendingDispatch: orders.filter((o) => o.status === '待接单').length,
      pendingService: orders.filter((o) => o.status === '待服务').length,
      completed: orders.filter((o) => o.status === '已完成').length,
      refund: orders.filter((o) => o.status === '退款完成，订单关闭').length,
      closed: orders.filter((o) => o.status === '支付超时，订单关闭' || o.status === '退款完成，订单关闭').length,
    };
  }, [orders]);

  // Filtered after sales list with strict descending order by time
  const filteredAfterSalesList = useMemo(() => {
    return afterSalesList
      .filter((item) => {
        if (afterSalesTab !== '全部' && item.status !== afterSalesTab) return false;
        if (afterSalesMinPrice && item.refundAmount < parseFloat(afterSalesMinPrice)) return false;
        if (afterSalesMaxPrice && item.refundAmount > parseFloat(afterSalesMaxPrice)) return false;
        if (afterSalesSearchKey) {
          const key = afterSalesSearchKey.trim().toLowerCase();
          const match =
            item.orderNo.toLowerCase().includes(key) ||
            item.afterSalesNo.toLowerCase().includes(key) ||
            item.buyerName.toLowerCase().includes(key) ||
            item.buyerPhone.includes(key) ||
            item.productTitle.toLowerCase().includes(key);
          if (!match) return false;
        }
        return true;
      })
      .sort((a, b) => new Date(b.applyTime).getTime() - new Date(a.applyTime).getTime());
  }, [
    afterSalesList,
    afterSalesTab,
    afterSalesMinPrice,
    afterSalesMaxPrice,
    afterSalesSearchKey,
  ]);

  // Current order being viewed in detail
  const currentOrderDetail = useMemo(() => {
    return orders.find((o) => o.id === activeOrderDetailId) || null;
  }, [orders, activeOrderDetailId]);

  // Reset filters
  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedPayMethod('all');
    setSearchQuery('');
    setMinPrice('');
    setMaxPrice('');
    onNotice('已重置搜索筛选条件');
  };

  // Actions
  const handleConfirmAdjustPrice = () => {
    if (!priceModalOrder) return;
    const adj = parseFloat(priceAdjustment) || 0;
    const newPayable = Math.max(0, priceModalOrder.payableAmount - adj);
    setOrders((prev) =>
      prev.map((o) =>
        o.id === priceModalOrder.id
          ? {
              ...o,
              discountAmount: o.discountAmount + adj,
              payableAmount: newPayable,
            }
          : o
      )
    );
    onNotice(`订单【${priceModalOrder.orderNo}】价格已修改，现应付款: ¥${newPayable}`);
    setPriceModalOrder(null);
  };

  const handleConfirmCloseOrder = () => {
    if (!closeModalOrder) return;
    setOrders((prev) =>
      prev.map((o) =>
        o.id === closeModalOrder.id
          ? { ...o, status: '支付超时，订单关闭', closeTime: '2026-09-19 18:40:00' }
          : o
      )
    );
    onNotice(`订单【${closeModalOrder.orderNo}】已关闭`);
    setCloseModalOrder(null);
  };

  const handleConfirmDispatch = () => {
    if (!dispatchModalOrder) return;
    setOrders((prev) =>
      prev.map((o) =>
        o.id === dispatchModalOrder.id
          ? {
              ...o,
              status: '待服务',
              assignedStaff: selectedStaff,
              dispatchTime: '2026-09-19 18:45:00',
            }
          : o
      )
    );
    onNotice(`订单【${dispatchModalOrder.orderNo}】已成功派单给服务人员: ${selectedStaff}`);
    setDispatchModalOrder(null);
  };

  const handleSaveRemark = () => {
    if (!remarkModalOrder) return;
    setOrders((prev) =>
      prev.map((o) => (o.id === remarkModalOrder.id ? { ...o, remark: remarkText } : o))
    );
    onNotice(`订单【${remarkModalOrder.orderNo}】备注更新成功`);
    setRemarkModalOrder(null);
  };

  const handleConfirmRefund = () => {
    if (!refundModalOrder) return;
    const refAmt = parseFloat(refundAmountInput) || refundModalOrder.payableAmount;
    setOrders((prev) =>
      prev.map((o) =>
        o.id === refundModalOrder.id
          ? {
              ...o,
              status: '退款完成，订单关闭',
              closeTime: '2026-09-19 18:50:00',
              afterSalesNo: `24001${Math.floor(100000 + Math.random() * 900000)}`,
              refundAmount: refAmt,
              refundReason: refundReasonSelect,
              refundExplanation: refundExpInput || '用户申请退款成功',
              refundApplyTime: '2026-09-19 18:48:00',
              refundStatus: '退款成功',
              refundChannel: '原支付退回',
              refundOperatorTime: '2026-09-19 18:50:00',
              refundOperator: '平台管理员',
            }
          : o
      )
    );
    onNotice(`订单【${refundModalOrder.orderNo}】退款成功，退款金额: ¥${refAmt}`);
    setRefundModalOrder(null);
  };

  const handleSendChatMessage = () => {
    if (!inputChatText.trim()) return;
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    setChatMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), sender: 'service', text: inputChatText, time: timeStr },
    ]);
    setInputChatText('');
  };

  // Review reply
  const handleSaveReviewReply = () => {
    if (!reviewReplyModal) return;
    setReviewsList((prev) =>
      prev.map((r) =>
        r.id === reviewReplyModal.id
          ? {
              ...r,
              replyContent: reviewReplyText,
              replyTime: '2026-09-19 18:55:00',
            }
          : r
      )
    );
    onNotice(`评价回复已提交`);
    setReviewReplyModal(null);
  };

  // Refund reason add / edit / delete
  const handleAddRefundReason = () => {
    if (!newReasonText.trim()) return;
    const newReason: RefundReasonSetting = {
      id: `rr-${Date.now()}`,
      sortOrder: newReasonSortOrder || refundReasons.length + 1,
      reasonText: newReasonText.trim(),
      relatedOrderCount: 0,
      updater: '李明明',
      lastUpdateTime: '2026-09-19 19:00:00',
      status: newReasonStatus,
    };
    setRefundReasons((prev) => [newReason, ...prev]);
    onNotice(`新增退款原因: ${newReasonText}`);
    setNewReasonText('');
    setNewReasonSortOrder(5);
    setNewReasonStatus('启用');
    setIsAddReasonOpen(false);
  };

  const handleSaveEditingReason = () => {
    if (!editingReason || !editingReason.reasonText.trim()) return;
    setRefundReasons((prev) =>
      prev.map((r) =>
        r.id === editingReason.id
          ? {
              ...editingReason,
              lastUpdateTime: '2026-09-19 19:05:00',
              updater: '李明明',
            }
          : r
      )
    );
    onNotice(`已更新退款原因: ${editingReason.reasonText}`);
    setEditingReason(null);
  };

  const handleDeleteReason = (id: string, name: string) => {
    setRefundReasons((prev) => prev.filter((r) => r.id !== id));
    onNotice(`已删除退款原因: ${name}`);
  };

  // Shared Order Modals Renderer
  const renderOrderModals = () => (
    <>
      {/* Modal 1: 修改价格 Modal */}
      {priceModalOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-xl w-full max-w-lg p-5 border border-gray-100 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-sm font-bold text-gray-800">修改订单价格</h3>
              <button onClick={() => setPriceModalOrder(null)} className="text-gray-400 hover:text-gray-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-100 space-y-1">
                <div className="font-semibold text-gray-800">{priceModalOrder.productTitle}</div>
                <div className="text-gray-500">原单价: ¥{priceModalOrder.originalPrice}</div>
              </div>

              <div className="space-y-1.5">
                <label className="font-medium text-gray-700">追加折扣/减免金额 (元) *</label>
                <input
                  type="number"
                  value={priceAdjustment}
                  onChange={(e) => setPriceAdjustment(e.target.value)}
                  placeholder="例如输入 20 表示再优惠 20 元"
                  className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#10b981]"
                />
              </div>

              <div className="p-3 bg-emerald-50 rounded-lg text-emerald-900 flex justify-between font-bold">
                <span>调整后最终应付款:</span>
                <span className="font-mono text-emerald-700 text-sm">
                  ¥
                  {Math.max(
                    0,
                    priceModalOrder.payableAmount - (parseFloat(priceAdjustment) || 0)
                  ).toFixed(2)}
                </span>
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-2 border-t border-gray-100">
              <button
                onClick={() => setPriceModalOrder(null)}
                className="px-3.5 py-1.5 border border-gray-200 text-gray-600 rounded-md text-xs hover:bg-gray-50"
              >
                取消
              </button>
              <button
                onClick={handleConfirmAdjustPrice}
                className="px-4 py-1.5 bg-[#10b981] hover:bg-[#059669] text-white rounded-md text-xs font-medium"
              >
                确定改价
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 2: 关闭订单 Modal */}
      {closeModalOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-xl w-full max-w-sm p-5 border border-gray-100 shadow-2xl space-y-4">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-red-50 text-red-500 rounded-lg shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-800">确认关闭订单</h3>
                <p className="text-xs text-gray-500 mt-1">
                  确定要关闭订单【{closeModalOrder.orderNo}】吗？关闭后买家将无法继续支付。
                </p>
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-2 border-t border-gray-100">
              <button
                onClick={() => setCloseModalOrder(null)}
                className="px-3.5 py-1.5 border border-gray-200 text-gray-600 rounded-md text-xs hover:bg-gray-50"
              >
                取消
              </button>
              <button
                onClick={handleConfirmCloseOrder}
                className="px-4 py-1.5 bg-red-500 text-white rounded-md text-xs font-medium hover:bg-red-600"
              >
                确定关闭
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 3: 手动派单 Modal */}
      {dispatchModalOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-xl w-full max-w-lg p-5 border border-gray-100 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-sm font-bold text-gray-800">手动派发服务人员</h3>
              <button onClick={() => setDispatchModalOrder(null)} className="text-gray-400 hover:text-gray-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-100 space-y-1">
                <div className="font-semibold text-gray-800">{dispatchModalOrder.productTitle}</div>
                <div className="text-gray-500">预约时间: {dispatchModalOrder.reservationTime}</div>
                <div className="text-gray-500">服务地址: {dispatchModalOrder.address}</div>
              </div>

              <div className="space-y-2">
                <label className="font-semibold text-gray-700 block">选择服务人员 (当前区域空闲)</label>
                <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                  {[
                    { name: '王小倩', status: '空闲', phone: '138****9900', rating: '5.0' },
                    { name: '刘小华', status: '空闲', phone: '159****8822', rating: '4.9' },
                    { name: '周强', status: '轮休', phone: '137****1102', rating: '4.8' },
                    { name: '李水宝', status: '服务中', phone: '186****3322', rating: '4.9' },
                  ].map((st) => (
                    <div
                      key={st.name}
                      onClick={() => setSelectedStaff(st.name)}
                      className={`p-3 rounded-lg border cursor-pointer flex items-center justify-between transition-all ${
                        selectedStaff === st.name
                          ? 'border-[#10b981] bg-emerald-50/50 shadow-2xs'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <div>
                        <div className="font-bold text-gray-800">{st.name}</div>
                        <div className="text-[11px] text-gray-400 font-mono">{st.phone}</div>
                      </div>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full ${
                          st.status === '空闲'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-gray-100 text-gray-500'
                        }`}
                      >
                        {st.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-2 border-t border-gray-100">
              <button
                onClick={() => setDispatchModalOrder(null)}
                className="px-3.5 py-1.5 border border-gray-200 text-gray-600 rounded-md text-xs hover:bg-gray-50"
              >
                取消
              </button>
              <button
                onClick={handleConfirmDispatch}
                className="px-4 py-1.5 bg-[#10b981] hover:bg-[#059669] text-white rounded-md text-xs font-medium"
              >
                确认派单
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 4: 联系用户 / 客服 IM Dialogue Drawer */}
      {chatModalOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-xl w-full max-w-4xl h-[600px] border border-gray-100 shadow-2xl flex overflow-hidden">
            <div className="w-64 bg-gray-50 border-r border-gray-200 flex flex-col">
              <div className="p-3 border-b border-gray-200 text-xs font-bold text-gray-800">
                会话消息
              </div>
              <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
                {[
                  { name: chatModalOrder.buyerName, time: '09:09', badge: 1, avatar: chatModalOrder.buyerAvatar, active: true },
                  { name: '刘小华', time: '08:45', badge: 0, avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80', active: false },
                  { name: '赵丽珍', time: '08:30', badge: 0, avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80', active: false },
                ].map((s, idx) => (
                  <div
                    key={idx}
                    className={`p-3 flex items-center space-x-3 cursor-pointer ${
                      s.active ? 'bg-white font-semibold' : 'hover:bg-gray-100/70'
                    }`}
                  >
                    <img src={s.avatar} alt={s.name} className="w-9 h-9 rounded-full object-cover" />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between text-xs text-gray-800">
                        <span className="truncate">{s.name}</span>
                        <span className="text-[10px] text-gray-400 font-mono">{s.time}</span>
                      </div>
                      <div className="text-[11px] text-gray-400 truncate">最近联系订单需求...</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-1 flex flex-col bg-white">
              <div className="p-3 border-b border-gray-200 flex items-center justify-between">
                <div className="text-xs font-bold text-gray-800 flex items-center space-x-2">
                  <span>对话中: {chatModalOrder.buyerName}</span>
                  <span className="text-[11px] text-emerald-600 font-mono">({chatModalOrder.buyerPhone})</span>
                </div>
                <button onClick={() => setChatModalOrder(null)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50/30">
                {chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${
                      msg.sender === 'service' ? 'items-end' : 'items-start'
                    }`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-xl text-xs ${
                        msg.sender === 'service'
                          ? 'bg-[#10b981] text-white rounded-br-none shadow-2xs'
                          : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-2xs'
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[10px] text-gray-400 font-mono mt-1 px-1">
                      {msg.time}
                    </span>
                  </div>
                ))}
              </div>

              <div className="p-3 border-t border-gray-200 flex items-center space-x-2">
                <input
                  type="text"
                  value={inputChatText}
                  onChange={(e) => setInputChatText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendChatMessage()}
                  placeholder="输入消息，按 Enter 发送..."
                  className="flex-1 p-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-[#10b981]"
                />
                <button
                  onClick={handleSendChatMessage}
                  className="px-4 py-2 bg-[#10b981] hover:bg-[#059669] text-white rounded-lg text-xs font-medium flex items-center space-x-1"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>发送</span>
                </button>
              </div>
            </div>

            <div className="w-64 bg-gray-50/70 border-l border-gray-200 p-4 space-y-4 overflow-y-auto text-xs">
              <div className="text-center space-y-1.5 pb-3 border-b border-gray-200">
                <img
                  src={chatModalOrder.buyerAvatar}
                  alt={chatModalOrder.buyerName}
                  className="w-12 h-12 rounded-full mx-auto object-cover border border-gray-200"
                />
                <div className="font-bold text-gray-800">{chatModalOrder.buyerName}</div>
                <div className="flex flex-wrap justify-center gap-1 pt-1">
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] px-2 py-0.5 rounded-full">高血压</span>
                  <span className="bg-blue-100 text-blue-800 text-[10px] px-2 py-0.5 rounded-full">糖尿病</span>
                  <span className="bg-amber-100 text-amber-800 text-[10px] px-2 py-0.5 rounded-full">多次购买</span>
                </div>
              </div>

              <div className="space-y-2 text-gray-600">
                <div className="flex justify-between">
                  <span>累计订单数:</span>
                  <span className="font-bold text-gray-800">2 笔</span>
                </div>
                <div className="flex justify-between">
                  <span>累计消费金额:</span>
                  <span className="font-bold text-emerald-700 font-mono">¥1004.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal 5: 备注 Modal */}
      {remarkModalOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-xl w-full max-w-sm p-5 border border-gray-100 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-sm font-bold text-gray-800">添加订单备注</h3>
              <button onClick={() => setRemarkModalOrder(null)} className="text-gray-400 hover:text-gray-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-700">备注内容 *</label>
              <textarea
                rows={4}
                value={remarkText}
                onChange={(e) => setRemarkText(e.target.value)}
                placeholder="请输入关于此订单的注意事项或客服提醒..."
                className="w-full text-xs p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#10b981]"
              />
            </div>

            <div className="flex justify-end space-x-2 pt-2 border-t border-gray-100">
              <button
                onClick={() => setRemarkModalOrder(null)}
                className="px-3.5 py-1.5 border border-gray-200 text-gray-600 rounded-md text-xs hover:bg-gray-50"
              >
                取消
              </button>
              <button
                onClick={handleSaveRemark}
                className="px-4 py-1.5 bg-[#10b981] hover:bg-[#059669] text-white rounded-md text-xs font-medium"
              >
                保存备注
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 6: 退款 / 发起售后 Modal */}
      {refundModalOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-xl w-full max-w-md p-5 border border-gray-100 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-sm font-bold text-gray-800">发起订单退款售后</h3>
              <button onClick={() => setRefundModalOrder(null)} className="text-gray-400 hover:text-gray-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="space-y-1.5">
                <label className="font-semibold text-gray-700">退款原因 *</label>
                <select
                  value={refundReasonSelect}
                  onChange={(e) => setRefundReasonSelect(e.target.value)}
                  className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#10b981]"
                >
                  <option value="未按时上门">未按时上门</option>
                  <option value="未完成约定工作">未完成约定工作</option>
                  <option value="服务质量不佳">服务质量不佳</option>
                  <option value="超出规定的服务时间">超出规定的服务时间</option>
                  <option value="未经同意的额外收费">未经同意的额外收费</option>
                  <option value="服务欺诈">服务欺诈</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-gray-700">退款金额 (元) *</label>
                <input
                  type="number"
                  value={refundAmountInput}
                  onChange={(e) => setRefundAmountInput(e.target.value)}
                  className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#10b981]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-gray-700">退款说明/备注</label>
                <textarea
                  rows={3}
                  value={refundExpInput}
                  onChange={(e) => setRefundExpInput(e.target.value)}
                  placeholder="详细记录退款核实情况..."
                  className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#10b981]"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-2 border-t border-gray-100">
              <button
                onClick={() => setRefundModalOrder(null)}
                className="px-3.5 py-1.5 border border-gray-200 text-gray-600 rounded-md text-xs hover:bg-gray-50"
              >
                取消
              </button>
              <button
                onClick={handleConfirmRefund}
                className="px-4 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-md text-xs font-medium"
              >
                确认退款
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 7: 改单 Modal */}
      {changeOrderModalOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-xl w-full max-w-lg p-6 border border-gray-100 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3 border-gray-100">
              <h3 className="text-sm font-bold text-gray-800 flex items-center space-x-2">
                <span className="w-1.5 h-4 bg-[#10b981] rounded-full"></span>
                <span>改单 - 修改派单与服务时段</span>
              </h3>
              <button onClick={() => setChangeOrderModalOrder(null)} className="text-gray-400 hover:text-gray-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-3.5 bg-gray-50/80 rounded-lg border border-gray-100 space-y-1">
                <div className="font-semibold text-gray-800">{changeOrderModalOrder.productTitle}</div>
                <div className="text-gray-500 font-mono">订单号: {changeOrderModalOrder.orderNo}</div>
                <div className="text-gray-500">客户姓名: {changeOrderModalOrder.buyerName} ({changeOrderModalOrder.buyerPhone})</div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="font-semibold text-gray-700 block mb-1">重选服务人员</label>
                  <select
                    value={changeOrderStaff}
                    onChange={(e) => setChangeOrderStaff(e.target.value)}
                    className="w-full p-2 bg-white border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:border-[#10b981]"
                  >
                    <option value="王小倩">王小倩 (特护护理师 / 评分 5.0)</option>
                    <option value="李强">李强 (康复指导师 / 评分 4.9)</option>
                    <option value="张华">张华 (高级护理员 / 评分 4.8)</option>
                    <option value="刘建国">刘建国 (全能助洁服务员 / 评分 4.9)</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-gray-700 block mb-1">更改预约日期</label>
                    <input
                      type="date"
                      value={changeOrderDate}
                      onChange={(e) => setChangeOrderDate(e.target.value)}
                      className="w-full p-2 bg-white border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:border-[#10b981]"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-gray-700 block mb-1">更改预约时段</label>
                    <select
                      value={changeOrderTime}
                      onChange={(e) => setChangeOrderTime(e.target.value)}
                      className="w-full p-2 bg-white border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:border-[#10b981]"
                    >
                      <option value="09:00">09:00 - 11:00</option>
                      <option value="11:00">11:00 - 13:00</option>
                      <option value="14:00">14:00 - 16:00</option>
                      <option value="16:00">16:00 - 18:00</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-gray-700 block mb-1">改单原因 / 备注说明</label>
                  <textarea
                    rows={3}
                    value={changeOrderRemark}
                    onChange={(e) => setChangeOrderRemark(e.target.value)}
                    placeholder="请输入本次改单原因或改派安排备注..."
                    className="w-full p-2 bg-white border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:border-[#10b981]"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-3 border-t border-gray-100">
              <button
                onClick={() => setChangeOrderModalOrder(null)}
                className="px-4 py-1.5 border border-gray-200 text-gray-600 rounded-md text-xs hover:bg-gray-50"
              >
                取消
              </button>
              <button
                onClick={() => {
                  if (!changeOrderModalOrder) return;
                  const newTime = `${changeOrderDate} ${changeOrderTime}`;
                  setOrders((prev) =>
                    prev.map((o) =>
                      o.id === changeOrderModalOrder.id
                        ? {
                            ...o,
                            reservationTime: newTime,
                            status: '待服务',
                            remark: changeOrderRemark ? `[改单备注] ${changeOrderRemark}` : o.remark,
                          }
                        : o
                    )
                  );
                  onNotice(`订单【${changeOrderModalOrder.orderNo}】改单成功！已改指派服务人员【${changeOrderStaff}】，预约时段已更新为 ${newTime}`);
                  setChangeOrderModalOrder(null);
                }}
                className="px-4 py-1.5 bg-[#10b981] hover:bg-[#059669] text-white rounded-md text-xs font-medium shadow-xs"
              >
                确认改单
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );

  // Switch Sub-pages Rendering
  if (subPageId === 'trade_after_sales') {
    return (
      <div className="p-6 max-w-[1600px] mx-auto space-y-5 animate-in fade-in duration-200">
        {selectedAfterSalesDetail ? (
          /* Detail View */
          <div className="bg-white rounded-xl p-6 border border-gray-200/80 shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center space-x-2.5">
                <span className="w-1.5 h-4 bg-[#10b981] rounded-full"></span>
                <h1 className="text-base font-bold text-gray-800">订单详情</h1>
              </div>
              <button
                onClick={() => setSelectedAfterSalesDetail(null)}
                className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-50 flex items-center space-x-1"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>返回列表</span>
              </button>
            </div>

            {/* Top Status Banner */}
            {selectedAfterSalesDetail.status === '处理中' ? (
              <div className="p-5 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="space-y-1">
                    <div className="text-sm font-bold text-emerald-900 flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-emerald-600" />
                      <span>买家已申请退款，等待卖家处理中</span>
                    </div>
                    <div className="text-xs text-emerald-800">
                      如卖家未在 <span className="text-red-500 font-bold font-mono">1天1小时13分04秒</span> 内付款，将自动退款给买家。
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {
                        setAgreeModalRecord(selectedAfterSalesDetail);
                        setAgreeAmountInput(selectedAfterSalesDetail.refundAmount.toString());
                        setAgreeExpInput('');
                      }}
                      className="px-4 py-2 bg-[#10b981] hover:bg-[#059669] text-white rounded-lg text-xs font-medium shadow-xs"
                    >
                      同意退款
                    </button>
                    <button
                      onClick={() => {
                        setRejectModalRecord(selectedAfterSalesDetail);
                        setRejectExpInput('');
                      }}
                      className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-xs font-medium shadow-xs"
                    >
                      拒绝退款
                    </button>
                    <button
                      onClick={() => setSelectedAfterSalesDetail(null)}
                      className="px-4 py-2 border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-lg text-xs font-medium"
                    >
                      返回
                    </button>
                  </div>
                </div>
              </div>
            ) : selectedAfterSalesDetail.status === '售后完成' ? (
              <div className="p-5 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-2">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <div className="text-sm font-bold text-emerald-900 flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>商家同意退款，售后完成</span>
                    </div>
                    <div className="text-xs text-emerald-700 mt-1">
                      退款至{selectedAfterSalesDetail.payMethod || '微信零钱'}，退款金额：<span className="font-bold font-mono">¥{selectedAfterSalesDetail.refundAmount.toFixed(2)}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedAfterSalesDetail(null)}
                    className="px-4 py-2 border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-lg text-xs font-medium"
                  >
                    返回
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-5 bg-gray-50 border border-gray-200 rounded-xl space-y-2">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="text-sm font-bold text-gray-800 flex items-center space-x-2">
                    <XCircle className="w-4 h-4 text-gray-500" />
                    <span>买家取消售后申请，售后关闭</span>
                  </div>
                  <button
                    onClick={() => setSelectedAfterSalesDetail(null)}
                    className="px-4 py-2 border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-lg text-xs font-medium"
                  >
                    返回
                  </button>
                </div>
              </div>
            )}

            {/* 3-Column Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Card 1: 用户信息 */}
              <div className="p-4 border border-gray-200/80 rounded-xl bg-gray-50/30 space-y-3 text-xs">
                <div className="font-bold text-gray-800 pb-2 border-b border-gray-100 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-[#10b981]" />
                    <span>用户信息</span>
                  </div>
                </div>
                <div className="flex items-center space-x-3 pt-1">
                  <img
                    src={selectedAfterSalesDetail.buyerAvatar}
                    alt={selectedAfterSalesDetail.buyerName}
                    className="w-10 h-10 rounded-full object-cover border border-gray-200"
                  />
                  <div>
                    <div className="font-bold text-gray-800 flex items-center space-x-2">
                      <span>{selectedAfterSalesDetail.buyerName}</span>
                    </div>
                    <div className="flex items-center space-x-2 pt-1 text-[11px]">
                      <button
                        onClick={() => onNotice(`正在查看 ${selectedAfterSalesDetail.buyerName} 的客户档案`)}
                        className="text-[#10b981] hover:underline"
                      >
                        查看详情
                      </button>
                      <span className="text-gray-300">|</span>
                      <button
                        onClick={() => {
                          setChatModalOrder({
                            id: 'chat-temp',
                            orderNo: selectedAfterSalesDetail.orderNo,
                            orderTime: selectedAfterSalesDetail.applyTime,
                            buyerName: selectedAfterSalesDetail.buyerName,
                            buyerPhone: selectedAfterSalesDetail.buyerPhone,
                            buyerPhoneFull: selectedAfterSalesDetail.buyerPhone,
                            buyerAvatar: selectedAfterSalesDetail.buyerAvatar || '',
                            buyerId: selectedAfterSalesDetail.buyerId || '',
                            buyerRegisterTime: selectedAfterSalesDetail.buyerRegisterTime || '',
                            buyerRegisterType: selectedAfterSalesDetail.buyerRegisterType || '',
                            buyerLastLogin: selectedAfterSalesDetail.buyerLastLogin || '',
                            buyerLastBuy: selectedAfterSalesDetail.buyerLastBuy || '',
                            productImage: selectedAfterSalesDetail.productImage,
                            productTitle: selectedAfterSalesDetail.productTitle,
                            productCategory: '家政护工',
                            originalPrice: selectedAfterSalesDetail.actualPaidAmount,
                            discountAmount: 0,
                            price: selectedAfterSalesDetail.actualPaidAmount,
                            payableAmount: selectedAfterSalesDetail.actualPaidAmount,
                            actualPaidAmount: selectedAfterSalesDetail.actualPaidAmount,
                            status: '待服务',
                            paymentMethod: '支付宝',
                            orderSource: '平台系统',
                            address: '上海市杨浦区',
                            reservationTime: '2026-09-20 08:30 - 10:00',
                            estimatedDuration: '1.5小时',
                            contactPhone: selectedAfterSalesDetail.buyerPhone,
                          });
                        }}
                        className="text-[#10b981] hover:underline"
                      >
                        联系用户
                      </button>
                    </div>
                  </div>
                </div>
                <div className="space-y-1.5 pt-2 text-gray-600 border-t border-gray-100">
                  <div className="flex justify-between"><span className="text-gray-400">用户ID:</span> <span className="font-mono text-gray-700">{selectedAfterSalesDetail.buyerId || '202409000001'}</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">手机号码:</span> <span className="font-mono text-gray-700">{selectedAfterSalesDetail.buyerPhone}</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">注册时间:</span> <span className="font-mono text-gray-700">{selectedAfterSalesDetail.buyerRegisterTime || '2025-12-16 10:33:24'}</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">注册方式:</span> <span className="text-gray-700">{selectedAfterSalesDetail.buyerRegisterType || '平台系统注册'}</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">最近登录时间:</span> <span className="font-mono text-gray-700">{selectedAfterSalesDetail.buyerLastLogin || '2026-09-18 10:33:24'}</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">最近购买时间:</span> <span className="font-mono text-gray-700">{selectedAfterSalesDetail.buyerLastBuy || '2026-09-17 11:33:24'}</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">备注:</span> <span className="text-gray-700">{selectedAfterSalesDetail.remark || '-'}</span></div>
                </div>
              </div>

              {/* Card 2: 退款申请信息 */}
              <div className="p-4 border border-gray-200/80 rounded-xl bg-gray-50/30 space-y-3 text-xs">
                <div className="font-bold text-gray-800 pb-2 border-b border-gray-100 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <RotateCcw className="w-4 h-4 text-[#10b981]" />
                    <span>退款申请信息</span>
                  </div>
                </div>
                <div className="space-y-1.5 text-gray-600">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">售后单号:</span>
                    <div className="flex items-center space-x-1 font-mono text-gray-700">
                      <span>{selectedAfterSalesDetail.afterSalesNo}</span>
                      <button
                        onClick={() => {
                          navigator.clipboard?.writeText(selectedAfterSalesDetail.afterSalesNo);
                          onNotice('已复制售后单号');
                        }}
                        className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200"
                      >
                        复制
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">申请退款金额:</span>
                    <span className="font-bold text-red-600 font-mono">
                      ¥{selectedAfterSalesDetail.refundAmount.toFixed(2)}{' '}
                      <span className="text-gray-400 font-normal">(实付款: ¥{selectedAfterSalesDetail.actualPaidAmount.toFixed(2)})</span>
                    </span>
                  </div>
                  <div className="flex justify-between"><span className="text-gray-400">退款原因:</span> <span className="font-semibold text-gray-800">{selectedAfterSalesDetail.reason}</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">退款说明:</span> <span className="text-gray-700">{selectedAfterSalesDetail.refundExplanation || '-'}</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">申请时间:</span> <span className="font-mono text-gray-700">{selectedAfterSalesDetail.applyTime}</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">退款方式:</span> <span className="text-gray-700">{selectedAfterSalesDetail.refundChannel || '原支付退回'}</span></div>
                  {selectedAfterSalesDetail.status === '售后完成' && (
                    <div className="flex justify-between"><span className="text-gray-400">退款时间:</span> <span className="font-mono text-emerald-700">{selectedAfterSalesDetail.finishTime || selectedAfterSalesDetail.applyTime}</span></div>
                  )}
                  {selectedAfterSalesDetail.status === '售后关闭' && (
                    <div className="flex justify-between"><span className="text-gray-400">取消时间:</span> <span className="font-mono text-gray-500">{selectedAfterSalesDetail.cancelTime || selectedAfterSalesDetail.applyTime}</span></div>
                  )}
                </div>
              </div>

              {/* Card 3: 订单信息 */}
              <div className="p-4 border border-gray-200/80 rounded-xl bg-gray-50/30 space-y-3 text-xs">
                <div className="font-bold text-gray-800 pb-2 border-b border-gray-100 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-[#10b981]" />
                    <span>订单信息</span>
                  </div>
                </div>
                <div className="space-y-1.5 text-gray-600">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">订单编号:</span>
                    <div className="flex items-center space-x-1 font-mono text-gray-700">
                      <span>{selectedAfterSalesDetail.orderNo}</span>
                      <button
                        onClick={() => {
                          navigator.clipboard?.writeText(selectedAfterSalesDetail.orderNo);
                          onNotice('已复制订单编号');
                        }}
                        className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200"
                      >
                        复制
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between"><span className="text-gray-400">下单时间:</span> <span className="font-mono text-gray-700">{selectedAfterSalesDetail.orderTime || '2026-09-17 14:12:07'}</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">付款时间:</span> <span className="font-mono text-gray-700">{selectedAfterSalesDetail.payTime || '2026-09-17 15:12:07'}</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">接单时间:</span> <span className="font-mono text-gray-700">{selectedAfterSalesDetail.acceptTime || '2026-09-17 16:12:07'}</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">成交时间:</span> <span className="font-mono text-gray-700">{selectedAfterSalesDetail.dealTime || '2026-09-17 16:12:07'}</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">订单状态:</span> <span className="text-gray-800 font-semibold">{selectedAfterSalesDetail.orderStatus || '订单完成'}</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">核销人员:</span> <span className="text-gray-800">{selectedAfterSalesDetail.assignedStaff || '王小倩'}</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">支付方式:</span> <span className="text-gray-800">{selectedAfterSalesDetail.payMethod || '支付宝'}</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">订单来源:</span> <span className="text-gray-800">{selectedAfterSalesDetail.orderSource || '平台系统'}</span></div>
                </div>
              </div>
            </div>

            {/* 商品信息 Table */}
            <div className="border border-gray-200/80 rounded-xl overflow-hidden bg-white shadow-xs space-y-0">
              <div className="p-4 bg-gray-50/70 border-b border-gray-200/80 font-bold text-xs text-gray-800">
                商品信息
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-gray-50/50 text-gray-500 border-b border-gray-200/80 font-medium">
                    <tr>
                      <th className="p-3.5 pl-5">商品信息</th>
                      <th className="p-3.5">价格</th>
                      <th className="p-3.5">实付款</th>
                      <th className="p-3.5">支付方式</th>
                      <th className="p-3.5">退款金额</th>
                      <th className="p-3.5 pr-5 text-right">退款状态</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-gray-700">
                    <tr>
                      <td className="p-3.5 pl-5">
                        <div className="flex items-center space-x-3">
                          <img
                            src={selectedAfterSalesDetail.productImage}
                            alt={selectedAfterSalesDetail.productTitle}
                            className="w-12 h-12 rounded-lg object-cover border border-gray-200"
                          />
                          <div className="font-semibold text-gray-800 max-w-xs">
                            {selectedAfterSalesDetail.productTitle}
                          </div>
                        </div>
                      </td>
                      <td className="p-3.5 font-mono">¥{(selectedAfterSalesDetail.price || selectedAfterSalesDetail.actualPaidAmount * 1.25).toFixed(2)}</td>
                      <td className="p-3.5 font-mono font-semibold">¥{selectedAfterSalesDetail.actualPaidAmount.toFixed(2)}</td>
                      <td className="p-3.5">{selectedAfterSalesDetail.payMethod || '支付宝'}</td>
                      <td className="p-3.5 font-mono text-red-600 font-bold">¥{selectedAfterSalesDetail.refundAmount.toFixed(2)}</td>
                      <td className="p-3.5 pr-5 text-right">
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium ${
                          selectedAfterSalesDetail.status === '处理中'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : selectedAfterSalesDetail.status === '售后完成'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-gray-100 text-gray-600 border border-gray-200'
                        }`}>
                          {selectedAfterSalesDetail.status === '处理中' ? '处理中' : selectedAfterSalesDetail.status === '售后完成' ? '已退款' : '已取消'}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          /* List View matching screenshot 1, 2, 5, 6 */
          <div className="bg-white rounded-xl p-6 border border-gray-200/80 shadow-xs space-y-5">
            {/* Page Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center space-x-2.5">
                <span className="w-1.5 h-4 bg-[#10b981] rounded-full"></span>
                <h1 className="text-base font-bold text-gray-800">售后管理</h1>
              </div>
              <div className="text-xs text-gray-500 font-mono">
                2026-09-01 至 2026-09-19
              </div>
            </div>

            {/* Filter Form bar */}
            <div className="bg-gray-50/60 p-4 rounded-xl border border-gray-200/80 space-y-3 text-xs">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-600 font-medium">退款金额:</span>
                  <input
                    type="number"
                    placeholder="最低价格"
                    value={afterSalesMinPrice}
                    onChange={(e) => setAfterSalesMinPrice(e.target.value)}
                    className="w-28 p-2 border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-[#10b981]"
                  />
                  <span className="text-gray-400">-</span>
                  <input
                    type="number"
                    placeholder="最高价格"
                    value={afterSalesMaxPrice}
                    onChange={(e) => setAfterSalesMaxPrice(e.target.value)}
                    className="w-28 p-2 border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-[#10b981]"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-gray-600 font-medium">申请日期:</span>
                  <div className="flex items-center space-x-1.5 bg-white border border-gray-200 rounded-lg p-2">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    <input
                      type="date"
                      value={afterSalesStartDate}
                      onChange={(e) => setAfterSalesStartDate(e.target.value)}
                      className="bg-transparent focus:outline-none text-xs text-gray-700"
                    />
                  </div>
                  <span className="text-gray-400">~</span>
                  <div className="flex items-center space-x-1.5 bg-white border border-gray-200 rounded-lg p-2">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    <input
                      type="date"
                      value={afterSalesEndDate}
                      onChange={(e) => setAfterSalesEndDate(e.target.value)}
                      className="bg-transparent focus:outline-none text-xs text-gray-700"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2 flex-1 min-w-[240px]">
                  <span className="text-gray-600 font-medium">关键字搜索:</span>
                  <input
                    type="text"
                    placeholder="请输入关键字"
                    value={afterSalesSearchKey}
                    onChange={(e) => setAfterSalesSearchKey(e.target.value)}
                    className="flex-1 p-2 border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-[#10b981]"
                  />
                  <button
                    onClick={() => {}}
                    className="p-2 bg-[#10b981] hover:bg-[#059669] text-white rounded-lg font-medium transition-colors"
                  >
                    <Search className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      setAfterSalesMinPrice('');
                      setAfterSalesMaxPrice('');
                      setAfterSalesStartDate('');
                      setAfterSalesEndDate('');
                      setAfterSalesSearchKey('');
                    }}
                    className="p-2 border border-gray-200 hover:bg-gray-100 text-gray-600 rounded-lg transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Status Tabs */}
            <div className="flex space-x-2 border-b border-gray-200/80 pb-2">
              {['全部', '处理中', '售后完成', '售后关闭'].map((tab) => {
                const count = afterSalesList.filter((item) =>
                  tab === '全部' ? true : item.status === tab
                ).length;
                return (
                  <button
                    key={tab}
                    onClick={() => setAfterSalesTab(tab)}
                    className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center space-x-1.5 ${
                      afterSalesTab === tab
                        ? 'bg-[#10b981] text-white shadow-xs'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <span>{tab}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                        afterSalesTab === tab ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Table / Card List */}
            <div className="space-y-4">
              {filteredAfterSalesList.length === 0 ? (
                <div className="py-12 text-center text-gray-400 text-xs">
                  暂无相关售后记录
                </div>
              ) : (
                filteredAfterSalesList.map((item) => (
                  <div
                    key={item.id}
                    className="border border-gray-200/80 rounded-xl overflow-hidden hover:border-emerald-300 transition-all bg-white shadow-2xs"
                  >
                    {/* Header Strip */}
                    <div className="bg-gray-50/70 px-4 py-2.5 border-b border-gray-200/80 flex items-center justify-between text-xs text-gray-600 font-mono">
                      <div className="flex items-center space-x-6">
                        <span>订单编号: {item.orderNo}</span>
                        <span>售后编号: {item.afterSalesNo}</span>
                      </div>
                      <span className="text-gray-400 font-normal">申请时间: {item.applyTime}</span>
                    </div>

                    {/* Table Columns */}
                    <div className="grid grid-cols-1 md:grid-cols-6 p-4 gap-4 items-center text-xs text-gray-700">
                      {/* Column 1: 商品信息 (span 2) */}
                      <div className="md:col-span-2 flex items-center space-x-3">
                        <img
                          src={item.productImage}
                          alt={item.productTitle}
                          className="w-12 h-12 rounded-lg object-cover border border-gray-200 flex-shrink-0"
                        />
                        <div>
                          <div className="font-semibold text-gray-800 line-clamp-2">
                            {item.productTitle}
                          </div>
                          <div className="text-[11px] text-gray-400 mt-0.5">
                            客户: {item.buyerName} ({item.buyerPhone})
                          </div>
                        </div>
                      </div>

                      {/* Column 2: 实付款 (元) */}
                      <div>
                        <div className="text-gray-400 text-[11px] mb-1">实付款 (元)</div>
                        <div className="font-bold text-gray-800 font-mono">
                          ¥{item.actualPaidAmount.toFixed(2)}
                        </div>
                      </div>

                      {/* Column 3: 申请退款金额 (元) */}
                      <div>
                        <div className="text-gray-400 text-[11px] mb-1">申请退款金额 (元)</div>
                        <div className="font-bold text-red-600 font-mono">
                          ¥{item.refundAmount.toFixed(2)}
                        </div>
                      </div>

                      {/* Column 4: 售后状态 */}
                      <div>
                        <div className="text-gray-400 text-[11px] mb-1">售后状态</div>
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                            item.status === '处理中'
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : item.status === '售后完成'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-gray-100 text-gray-600 border border-gray-200'
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>

                      {/* Column 5: 操作 */}
                      <div className="flex items-center space-x-3 justify-end">
                        <button
                          onClick={() => setSelectedAfterSalesDetail(item)}
                          className="text-[#10b981] hover:underline font-medium text-xs"
                        >
                          售后详情
                        </button>
                        <button
                          onClick={() => setActiveOrderDetailId(item.orderNo)}
                          className="text-[#10b981] hover:underline font-medium text-xs"
                        >
                          订单详情
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Pagination Footer */}
            <div className="flex flex-wrap items-center justify-between pt-3 text-xs text-gray-500 border-t border-gray-100">
              <div>共 {filteredAfterSalesList.length} 条 每页10条</div>
              <div className="flex items-center space-x-1.5">
                <button className="p-1.5 border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-40" disabled>
                  &lt;&lt;
                </button>
                <button className="p-1.5 border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-40" disabled>
                  &lt;
                </button>
                <button className="px-3 py-1 bg-[#10b981] text-white font-bold rounded">1</button>
                <button className="p-1.5 border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-40" disabled>
                  &gt;
                </button>
                <button className="p-1.5 border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-40" disabled>
                  &gt;&gt;
                </button>
                <span className="ml-2">前往第 <input type="text" defaultValue="1" className="w-8 p-1 text-center border border-gray-200 rounded" /> 页</span>
              </div>
            </div>
          </div>
        )}

        {/* Modal: 同意退款 */}
        {agreeModalRecord && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
            <div className="bg-white rounded-xl w-full max-w-md p-5 border border-gray-100 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <h3 className="text-sm font-bold text-gray-800">同意退款</h3>
                <button onClick={() => setAgreeModalRecord(null)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-red-50 border border-red-100 rounded-lg text-red-700">
                  申请退款金额: <span className="font-bold font-mono text-sm">{agreeModalRecord.refundAmount.toFixed(2)}元</span>
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-gray-700">退款金额 *</label>
                  <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden focus-within:border-[#10b981]">
                    <input
                      type="number"
                      value={agreeAmountInput}
                      onChange={(e) => setAgreeAmountInput(e.target.value)}
                      className="flex-1 p-2.5 focus:outline-none"
                    />
                    <span className="px-3 text-gray-500 bg-gray-50 border-l border-gray-200">元</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-gray-700">退款说明 *</label>
                  <textarea
                    rows={3}
                    value={agreeExpInput}
                    onChange={(e) => setAgreeExpInput(e.target.value)}
                    placeholder="请输入退款同意备注或说明..."
                    className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#10b981]"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-2 border-t border-gray-100">
                <button
                  onClick={() => setAgreeModalRecord(null)}
                  className="px-3.5 py-1.5 border border-gray-200 text-gray-600 rounded-md text-xs hover:bg-gray-50"
                >
                  取消
                </button>
                <button
                  onClick={() => {
                    const now = new Date();
                    const nowStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
                    setAfterSalesList((prev) =>
                      prev.map((rec) =>
                        rec.id === agreeModalRecord.id
                          ? {
                              ...rec,
                              status: '售后完成',
                              operator: '商家同意退款',
                              finishTime: nowStr,
                            }
                          : rec
                      )
                    );
                    if (selectedAfterSalesDetail?.id === agreeModalRecord.id) {
                      setSelectedAfterSalesDetail({
                        ...selectedAfterSalesDetail,
                        status: '售后完成',
                        operator: '商家同意退款',
                        finishTime: nowStr,
                      });
                    }
                    onNotice('已同意退款，订单售后完成');
                    setAgreeModalRecord(null);
                  }}
                  className="px-4 py-1.5 bg-[#10b981] hover:bg-[#059669] text-white rounded-md text-xs font-medium"
                >
                  确定
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal: 拒绝退款 */}
        {rejectModalRecord && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
            <div className="bg-white rounded-xl w-full max-w-md p-5 border border-gray-100 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <h3 className="text-sm font-bold text-gray-800">拒绝退款</h3>
                <button onClick={() => setRejectModalRecord(null)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="space-y-1.5">
                  <label className="font-semibold text-gray-700">退款说明 *</label>
                  <textarea
                    rows={4}
                    value={rejectExpInput}
                    onChange={(e) => setRejectExpInput(e.target.value)}
                    placeholder="请输入拒绝退款的原因说明..."
                    className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#10b981]"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-2 border-t border-gray-100">
                <button
                  onClick={() => setRejectModalRecord(null)}
                  className="px-3.5 py-1.5 border border-gray-200 text-gray-600 rounded-md text-xs hover:bg-gray-50"
                >
                  取消
                </button>
                <button
                  onClick={() => {
                    const now = new Date();
                    const nowStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
                    setAfterSalesList((prev) =>
                      prev.map((rec) =>
                        rec.id === rejectModalRecord.id
                          ? {
                              ...rec,
                              status: '售后关闭',
                              operator: '商家拒绝退款',
                              cancelTime: nowStr,
                            }
                          : rec
                      )
                    );
                    if (selectedAfterSalesDetail?.id === rejectModalRecord.id) {
                      setSelectedAfterSalesDetail({
                        ...selectedAfterSalesDetail,
                        status: '售后关闭',
                        operator: '商家拒绝退款',
                        cancelTime: nowStr,
                      });
                    }
                    onNotice('已拒绝退款申请');
                    setRejectModalRecord(null);
                  }}
                  className="px-4 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-md text-xs font-medium"
                >
                  确定
                </button>
              </div>
            </div>
          </div>
        )}
        {renderOrderModals()}
      </div>
    );
  }

  if (subPageId === 'trade_reviews') {
    return (
      <div className="p-6 max-w-[1600px] mx-auto space-y-5 animate-in fade-in duration-200">
        <div className="bg-white rounded-xl p-6 border border-gray-200/80 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <div className="flex items-center space-x-2.5">
              <span className="w-1.5 h-4 bg-[#10b981] rounded-full"></span>
              <h1 className="text-base font-bold text-gray-800">评价管理</h1>
              <span className="text-xs text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                共 {reviewsList.length} 条客户评价
              </span>
            </div>
            <div className="text-xs text-gray-500 font-mono">2026-09-01 至 2026-09-19</div>
          </div>

          <div className="mt-5 space-y-4">
            {reviewsList.map((rev) => (
              <div
                key={rev.id}
                className="p-4 border border-gray-100 rounded-xl bg-gray-50/40 hover:border-emerald-200 transition-all space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={rev.buyerAvatar}
                      alt={rev.buyerName}
                      className="w-9 h-9 rounded-full object-cover border border-gray-200"
                    />
                    <div>
                      <div className="text-xs font-semibold text-gray-800 flex items-center space-x-2">
                        <span>{rev.buyerName}</span>
                        <span className="text-[11px] font-mono text-gray-400">订单号: {rev.orderNo}</span>
                      </div>
                      <div className="flex items-center space-x-1 mt-0.5">
                        {[...Array(5)].map((_, idx) => (
                          <Star
                            key={idx}
                            className={`w-3.5 h-3.5 ${
                              idx < rev.rating
                                ? 'text-amber-400 fill-amber-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono text-gray-400">{rev.reviewTime}</span>
                    <div className="text-[11px] text-emerald-700 font-medium">服务人员: {rev.staffName}</div>
                  </div>
                </div>

                <div className="text-xs text-gray-700 bg-white p-3 rounded-lg border border-gray-100 leading-relaxed">
                  <span className="font-semibold text-gray-500 mr-2">【{rev.productTitle}】</span>
                  {rev.content}
                </div>

                {rev.replyContent ? (
                  <div className="p-3 bg-emerald-50/60 rounded-lg border border-emerald-100/80 text-xs text-emerald-900 space-y-1">
                    <div className="flex items-center justify-between font-semibold text-emerald-700">
                      <span>平台商家回复:</span>
                      <span className="text-[10px] font-mono text-emerald-600">{rev.replyTime}</span>
                    </div>
                    <p className="leading-relaxed">{rev.replyContent}</p>
                  </div>
                ) : (
                  <div className="flex justify-end pt-1">
                    <button
                      onClick={() => {
                        setReviewReplyModal(rev);
                        setReviewReplyText('');
                      }}
                      className="px-3 py-1 bg-[#10b981] hover:bg-[#059669] text-white rounded-md text-xs font-medium transition-colors"
                    >
                      回复评价
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Reply Modal */}
        {reviewReplyModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs">
            <div className="bg-white rounded-xl w-full max-w-md p-5 border border-gray-100 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <h3 className="text-sm font-bold text-gray-800">回复评价</h3>
                <button
                  onClick={() => setReviewReplyModal(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="text-xs text-gray-600 bg-gray-50 p-2.5 rounded-lg border">
                <strong>{reviewReplyModal.buyerName}：</strong>
                {reviewReplyModal.content}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-700">回复内容 *</label>
                <textarea
                  rows={4}
                  value={reviewReplyText}
                  onChange={(e) => setReviewReplyText(e.target.value)}
                  placeholder="请输入对客户评价的回复内容..."
                  className="w-full text-xs p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#10b981]"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2 border-t">
                <button
                  onClick={() => setReviewReplyModal(null)}
                  className="px-3.5 py-1.5 border border-gray-200 text-gray-600 rounded-md text-xs"
                >
                  取消
                </button>
                <button
                  onClick={handleSaveReviewReply}
                  className="px-4 py-1.5 bg-[#10b981] hover:bg-[#059669] text-white rounded-md text-xs font-medium"
                >
                  提交回复
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (subPageId === 'trade_withdrawals') {
    const filteredWithdrawals = withdrawalsList.filter((wd) => {
      if (
        withdrawalStatusFilter !== 'all' &&
        wd.status !== withdrawalStatusFilter
      )
        return false;
      if (
        withdrawalSearchKey.trim() &&
        !wd.staffName.includes(withdrawalSearchKey) &&
        !wd.withdrawalNo.includes(withdrawalSearchKey) &&
        !wd.bankCardMasked.includes(withdrawalSearchKey) &&
        !wd.accountNo?.includes(withdrawalSearchKey)
      )
        return false;
      return true;
    });

    return (
      <div className="p-6 max-w-[1600px] mx-auto space-y-4 animate-in fade-in duration-200">
        <div className="bg-white rounded-xl p-5 border border-gray-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h1 className="text-base font-bold text-gray-800 flex items-center space-x-2">
              <span className="w-1.5 h-4 bg-[#10b981] rounded-full"></span>
              <span>提现记录</span>
            </h1>
            <button
              onClick={() => onNotice('支持导出一周内提现记录')}
              className="px-3.5 py-1.5 border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-lg text-xs font-medium flex items-center space-x-1 transition-colors"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-gray-500" />
              <span>批量操作</span>
            </button>
          </div>

          {/* Filter Bar matching Image 1 */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-gray-50/60 p-3 rounded-lg border border-gray-100 text-xs">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center space-x-2">
                <span className="text-gray-600 font-medium whitespace-nowrap">提现状态</span>
                <select
                  value={withdrawalStatusFilter}
                  onChange={(e) => setWithdrawalStatusFilter(e.target.value)}
                  className="p-2 bg-white border border-gray-200 rounded-lg text-xs text-gray-700 focus:outline-none focus:border-[#10b981] min-w-[110px]"
                >
                  <option value="all">请选择</option>
                  <option value="提现成功">提现成功</option>
                  <option value="审核中">审核中</option>
                  <option value="处理中">处理中</option>
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-gray-600 font-medium whitespace-nowrap">交易日期</span>
                <input
                  type="date"
                  className="p-2 bg-white border border-gray-200 rounded-lg text-xs text-gray-500 focus:outline-none focus:border-[#10b981]"
                />
                <span className="text-gray-400">~</span>
                <input
                  type="date"
                  className="p-2 bg-white border border-gray-200 rounded-lg text-xs text-gray-500 focus:outline-none focus:border-[#10b981]"
                />
              </div>

              <div className="flex items-center space-x-1">
                <input
                  type="text"
                  value={withdrawalSearchKey}
                  onChange={(e) => setWithdrawalSearchKey(e.target.value)}
                  placeholder="请输入关键字"
                  className="p-2 bg-white border border-gray-200 rounded-lg text-xs w-48 focus:outline-none focus:border-[#10b981]"
                />
                <button
                  onClick={() => onNotice(`已检索到 ${filteredWithdrawals.length} 条记录`)}
                  className="p-2 bg-[#10b981] hover:bg-[#059669] text-white rounded-lg transition-colors"
                  title="搜索"
                >
                  <Search className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    setWithdrawalSearchKey('');
                    setWithdrawalStatusFilter('all');
                    onNotice('已重置搜索条件');
                  }}
                  className="p-2 border border-gray-200 bg-white hover:bg-gray-50 text-gray-500 rounded-lg transition-colors"
                  title="重置"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Table matching Image 1 */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-200/80 text-gray-600 font-semibold">
                  <th className="p-3">交易时间</th>
                  <th className="p-3">提现账号</th>
                  <th className="p-3">提现账号</th>
                  <th className="p-3">提现金额 (元)</th>
                  <th className="p-3">收款账号</th>
                  <th className="p-3">提现状态</th>
                  <th className="p-3 text-right">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                {filteredWithdrawals.map((wd) => (
                  <tr key={wd.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="p-3 font-mono text-gray-500 whitespace-nowrap">{wd.applyTime}</td>
                    <td className="p-3">
                      <div className="flex items-center space-x-2">
                        <img
                          src={wd.staffAvatar}
                          alt={wd.staffName}
                          className="w-7 h-7 rounded-full object-cover border border-gray-200 shrink-0"
                        />
                        <span className="font-semibold text-gray-800">{wd.staffName}</span>
                      </div>
                    </td>
                    <td className="p-3 font-mono text-gray-600">{wd.accountNo || wd.withdrawalNo}</td>
                    <td className="p-3 font-bold text-gray-900 font-mono">¥{wd.amount.toFixed(2)}</td>
                    <td className="p-3 text-gray-800">{wd.bankCardMasked}</td>
                    <td className="p-3">
                      <span className="inline-block text-emerald-600 font-semibold">
                        {wd.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => setWithdrawalDetailModal(wd)}
                        className="text-emerald-600 hover:text-emerald-700 font-medium hover:underline"
                      >
                        查看明细
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Withdrawal Detail matching Image 2 */}
        {withdrawalDetailModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs animate-in fade-in">
            <div className="bg-white rounded-xl w-full max-w-lg p-6 border border-gray-100 shadow-2xl space-y-5">
              <div className="flex items-center justify-between border-b pb-3">
                <h3 className="text-base font-bold text-gray-800">提现明细</h3>
                <button
                  onClick={() => setWithdrawalDetailModal(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-xs text-gray-700">
                <div className="space-y-1">
                  <span className="text-gray-400">姓名</span>
                  <div className="font-semibold text-gray-800">{withdrawalDetailModal.staffName}</div>
                </div>
                <div className="space-y-1">
                  <span className="text-gray-400">银行卡号</span>
                  <div className="font-mono text-gray-800">
                    621 234 0089 9909 3456
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-gray-400">手机号码</span>
                  <div className="font-mono text-gray-800">{withdrawalDetailModal.staffPhone}</div>
                </div>
                <div className="space-y-1">
                  <span className="text-gray-400">银行</span>
                  <div className="text-gray-800">{withdrawalDetailModal.bankName}</div>
                </div>

                <div className="space-y-1">
                  <span className="text-gray-400">身份证号</span>
                  <div className="font-mono text-gray-800">{withdrawalDetailModal.staffIdCard || '36909919870909289X'}</div>
                </div>
                <div className="space-y-1">
                  <span className="text-gray-400">开户行</span>
                  <div className="text-gray-800">{withdrawalDetailModal.bankBranch || '中国工商银行朝阳分行'}</div>
                </div>

                <div className="space-y-1">
                  <span className="text-gray-400">交易单号</span>
                  <div className="font-mono text-gray-800">{withdrawalDetailModal.withdrawalNo}</div>
                </div>
                <div className="space-y-1">
                  <span className="text-gray-400">申请时间</span>
                  <div className="font-mono text-gray-800">{withdrawalDetailModal.applyTime}</div>
                </div>

                <div className="space-y-1">
                  <span className="text-gray-400">金额</span>
                  <div className="font-bold text-gray-900 font-mono text-sm">
                    {withdrawalDetailModal.amount.toFixed(2)}
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="text-gray-400">完成时间</span>
                  <div className="font-mono text-gray-800">{withdrawalDetailModal.finishTime || '2026-09-19 10:35:10'}</div>
                </div>

                <div className="space-y-1 col-span-2">
                  <span className="text-gray-400">提现状态</span>
                  <div className="text-emerald-600 font-semibold">{withdrawalDetailModal.status}</div>
                </div>
              </div>

              <div className="flex justify-center pt-3 border-t">
                <button
                  onClick={() => setWithdrawalDetailModal(null)}
                  className="px-8 py-2 bg-[#10b981] hover:bg-[#059669] text-white rounded-lg text-xs font-medium transition-colors"
                >
                  关闭
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (subPageId === 'trade_statements') {
    const filteredStatements = statementsList.filter((st) => {
      if (
        statementTypeFilter !== 'all' &&
        st.type !== statementTypeFilter
      )
        return false;
      if (
        statementSearchKey.trim() &&
        !st.remark.includes(statementSearchKey) &&
        !st.statementNo.includes(statementSearchKey) &&
        !(st.orderNo && st.orderNo.includes(statementSearchKey))
      )
        return false;
      return true;
    });

    return (
      <div className="p-6 max-w-[1600px] mx-auto space-y-4 animate-in fade-in duration-200">
        <div className="bg-white rounded-xl p-5 border border-gray-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h1 className="text-base font-bold text-gray-800 flex items-center space-x-2">
              <span className="w-1.5 h-4 bg-[#10b981] rounded-full"></span>
              <span>收支明细</span>
            </h1>
            <button
              onClick={() => onNotice('支持导出资金流水记录')}
              className="px-3.5 py-1.5 border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-lg text-xs font-medium flex items-center space-x-1 transition-colors"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-gray-500" />
              <span>批量操作</span>
            </button>
          </div>

          {/* Filter Bar matching Image 3 */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-gray-50/60 p-3 rounded-lg border border-gray-100 text-xs">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center space-x-2">
                <span className="text-gray-600 font-medium whitespace-nowrap">收支类型</span>
                <select
                  value={statementTypeFilter}
                  onChange={(e) => setStatementTypeFilter(e.target.value)}
                  className="p-2 bg-white border border-gray-200 rounded-lg text-xs text-gray-700 focus:outline-none focus:border-[#10b981] min-w-[110px]"
                >
                  <option value="all">请选择</option>
                  <option value="收入">收入</option>
                  <option value="支出">支出</option>
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-gray-600 font-medium whitespace-nowrap">交易日期</span>
                <input
                  type="date"
                  className="p-2 bg-white border border-gray-200 rounded-lg text-xs text-gray-500 focus:outline-none focus:border-[#10b981]"
                />
                <span className="text-gray-400">~</span>
                <input
                  type="date"
                  className="p-2 bg-white border border-gray-200 rounded-lg text-xs text-gray-500 focus:outline-none focus:border-[#10b981]"
                />
              </div>

              <div className="flex items-center space-x-1">
                <input
                  type="text"
                  value={statementSearchKey}
                  onChange={(e) => setStatementSearchKey(e.target.value)}
                  placeholder="请输入关键字"
                  className="p-2 bg-white border border-gray-200 rounded-lg text-xs w-48 focus:outline-none focus:border-[#10b981]"
                />
                <button
                  onClick={() => onNotice(`检索到 ${filteredStatements.length} 条记录`)}
                  className="p-2 bg-[#10b981] hover:bg-[#059669] text-white rounded-lg transition-colors"
                  title="搜索"
                >
                  <Search className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    setStatementSearchKey('');
                    setStatementTypeFilter('all');
                    onNotice('已重置搜索条件');
                  }}
                  className="p-2 border border-gray-200 bg-white hover:bg-gray-50 text-gray-500 rounded-lg transition-colors"
                  title="重置"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Table matching Image 3 */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-200/80 text-gray-600 font-semibold">
                  <th className="p-3">交易时间</th>
                  <th className="p-3">交易单号</th>
                  <th className="p-3">收支类型</th>
                  <th className="p-3">账单类型</th>
                  <th className="p-3">金额 (元)</th>
                  <th className="p-3">交易摘要</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                {filteredStatements.map((st) => (
                  <tr key={st.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="p-3 font-mono text-gray-500 whitespace-nowrap">{st.time}</td>
                    <td className="p-3 font-mono text-gray-700 font-medium">{st.statementNo}</td>
                    <td className="p-3">
                      <span
                        className={`font-semibold ${
                          st.type === '收入' ? 'text-emerald-600' : 'text-red-500'
                        }`}
                      >
                        {st.type}
                      </span>
                    </td>
                    <td className="p-3 text-gray-700">{st.billType || st.type}</td>
                    <td
                      className={`p-3 font-bold font-mono ${
                        st.amount > 0 ? 'text-emerald-600' : 'text-red-500'
                      }`}
                    >
                      {st.amount > 0 ? `${st.amount.toFixed(2)}` : `${st.amount.toFixed(2)}`}
                    </td>
                    <td className="p-3 text-gray-800 max-w-md truncate">{st.remark}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  if (subPageId === 'trade_refund_reasons') {
    const filteredReasons = refundReasons.filter((rr) => {
      if (
        reasonSearchKey.trim() &&
        !rr.reasonText.includes(reasonSearchKey) &&
        !rr.updater.includes(reasonSearchKey)
      )
        return false;
      return true;
    });

    return (
      <div className="p-6 max-w-[1600px] mx-auto space-y-4 animate-in fade-in duration-200">
        <div className="bg-white rounded-xl p-5 border border-gray-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h1 className="text-base font-bold text-gray-800 flex items-center space-x-2">
              <span className="w-1.5 h-4 bg-[#10b981] rounded-full"></span>
              <span>退款原因</span>
            </h1>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  setNewReasonText('');
                  setNewReasonSortOrder(5);
                  setNewReasonStatus('启用');
                  setIsAddReasonOpen(true);
                }}
                className="px-3.5 py-1.5 bg-[#10b981] hover:bg-[#059669] text-white rounded-lg text-xs font-medium flex items-center space-x-1 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>新增</span>
              </button>
              <button
                onClick={() => onNotice('批量删除或更新排序')}
                className="px-3.5 py-1.5 border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-lg text-xs font-medium flex items-center space-x-1 transition-colors"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-gray-500" />
                <span>批量操作</span>
              </button>
            </div>
          </div>

          {/* Search Filter Bar matching Image 4 */}
          <div className="flex items-center space-x-2 bg-gray-50/60 p-3 rounded-lg border border-gray-100 text-xs">
            <input
              type="text"
              value={reasonSearchKey}
              onChange={(e) => setReasonSearchKey(e.target.value)}
              placeholder="请输入关键字"
              className="p-2 bg-white border border-gray-200 rounded-lg text-xs w-56 focus:outline-none focus:border-[#10b981]"
            />
            <button
              onClick={() => onNotice(`过滤出 ${filteredReasons.length} 条退款原因`)}
              className="p-2 bg-[#10b981] hover:bg-[#059669] text-white rounded-lg transition-colors"
              title="搜索"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setReasonSearchKey('')}
              className="p-2 border border-gray-200 bg-white hover:bg-gray-50 text-gray-500 rounded-lg transition-colors"
              title="重置"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Table matching Image 4 */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-200/80 text-gray-600 font-semibold">
                  <th className="p-3 w-16 text-center">序号</th>
                  <th className="p-3">原因</th>
                  <th className="p-3">最后更新人</th>
                  <th className="p-3">最后更新时间</th>
                  <th className="p-3">状态</th>
                  <th className="p-3 text-right">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                {filteredReasons.map((rr) => (
                  <tr key={rr.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="p-3 text-center font-mono text-gray-600 font-medium">
                      {rr.sortOrder}
                    </td>
                    <td className="p-3 font-medium text-gray-800">{rr.reasonText}</td>
                    <td className="p-3 text-gray-600">{rr.updater}</td>
                    <td className="p-3 font-mono text-gray-500 whitespace-nowrap">
                      {rr.lastUpdateTime}
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => {
                          setRefundReasons((prev) =>
                            prev.map((r) =>
                              r.id === rr.id
                                ? { ...r, status: r.status === '启用' ? '禁用' : '启用' }
                                : r
                            )
                          );
                          onNotice(`状态变更为: ${rr.status === '启用' ? '禁用' : '启用'}`);
                        }}
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium cursor-pointer transition-colors ${
                          rr.status === '启用'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-gray-100 text-gray-500 border border-gray-200'
                        }`}
                      >
                        {rr.status}
                      </button>
                    </td>
                    <td className="p-3 text-right space-x-3">
                      <button
                        onClick={() => setEditingReason(rr)}
                        className="text-emerald-600 hover:text-emerald-700 font-medium hover:underline"
                      >
                        编辑
                      </button>
                      <button
                        onClick={() => handleDeleteReason(rr.id, rr.reasonText)}
                        className="text-red-500 hover:text-red-600 font-medium hover:underline"
                      >
                        删除
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Bar matching Image 4 */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-xs text-gray-500">
            <div>
              共 <span className="font-semibold text-gray-700">{filteredReasons.length}</span> 条
              &nbsp;&nbsp;每页 10 条
            </div>
            <div className="flex items-center space-x-1.5">
              <button className="p-1 border rounded hover:bg-gray-50 disabled:opacity-40">
                <ChevronsLeft className="w-3.5 h-3.5" />
              </button>
              <button className="p-1 border rounded hover:bg-gray-50 disabled:opacity-40">
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <span className="px-2.5 py-1 bg-[#10b981] text-white rounded font-medium text-xs">
                1
              </span>
              <button className="p-1 border rounded hover:bg-gray-50 disabled:opacity-40">
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
              <button className="p-1 border rounded hover:bg-gray-50 disabled:opacity-40">
                <ChevronsRight className="w-3.5 h-3.5" />
              </button>
              <span className="ml-2">前往第</span>
              <input
                type="text"
                defaultValue="1"
                className="w-10 p-1 border rounded text-center text-xs focus:outline-none focus:border-[#10b981]"
              />
              <span>页</span>
            </div>
          </div>
        </div>

        {/* Modal Add Refund Reason matching Image 5 */}
        {isAddReasonOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs animate-in fade-in">
            <div className="bg-white rounded-xl w-full max-w-sm p-5 border border-gray-100 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <h3 className="text-sm font-bold text-gray-800">新增退款原因</h3>
                <button
                  onClick={() => setIsAddReasonOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="space-y-1">
                  <label className="text-gray-700 font-medium">原因*</label>
                  <input
                    type="text"
                    value={newReasonText}
                    onChange={(e) => setNewReasonText(e.target.value)}
                    placeholder="请输入"
                    className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#10b981]"
                  />
                </div>

                <div className="flex items-center justify-between py-1">
                  <label className="text-gray-700 font-medium">状态</label>
                  <button
                    type="button"
                    onClick={() =>
                      setNewReasonStatus((prev) => (prev === '启用' ? '禁用' : '启用'))
                    }
                    className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      newReasonStatus === '启用' ? 'bg-[#10b981]' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        newReasonStatus === '启用' ? 'translate-x-4' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                <div className="space-y-1">
                  <label className="text-gray-700 font-medium">序号*</label>
                  <input
                    type="number"
                    value={newReasonSortOrder}
                    onChange={(e) => setNewReasonSortOrder(parseInt(e.target.value) || 1)}
                    className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#10b981]"
                  />
                  <div className="text-[11px] text-gray-400">数字越大，排序越靠前</div>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t">
                <button
                  onClick={() => setIsAddReasonOpen(false)}
                  className="px-4 py-1.5 border border-gray-200 text-gray-600 rounded-lg text-xs hover:bg-gray-50 transition-colors"
                >
                  取消
                </button>
                <button
                  onClick={handleAddRefundReason}
                  className="px-4 py-1.5 bg-[#10b981] hover:bg-[#059669] text-white rounded-lg text-xs font-medium transition-colors"
                >
                  确定
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal Edit Refund Reason */}
        {editingReason && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs animate-in fade-in">
            <div className="bg-white rounded-xl w-full max-w-sm p-5 border border-gray-100 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <h3 className="text-sm font-bold text-gray-800">编辑退款原因</h3>
                <button
                  onClick={() => setEditingReason(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="space-y-1">
                  <label className="text-gray-700 font-medium">原因*</label>
                  <input
                    type="text"
                    value={editingReason.reasonText}
                    onChange={(e) =>
                      setEditingReason({ ...editingReason, reasonText: e.target.value })
                    }
                    className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#10b981]"
                  />
                </div>

                <div className="flex items-center justify-between py-1">
                  <label className="text-gray-700 font-medium">状态</label>
                  <button
                    type="button"
                    onClick={() =>
                      setEditingReason({
                        ...editingReason,
                        status: editingReason.status === '启用' ? '禁用' : '启用',
                      })
                    }
                    className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      editingReason.status === '启用' ? 'bg-[#10b981]' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        editingReason.status === '启用' ? 'translate-x-4' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                <div className="space-y-1">
                  <label className="text-gray-700 font-medium">序号*</label>
                  <input
                    type="number"
                    value={editingReason.sortOrder}
                    onChange={(e) =>
                      setEditingReason({
                        ...editingReason,
                        sortOrder: parseInt(e.target.value) || 1,
                      })
                    }
                    className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#10b981]"
                  />
                  <div className="text-[11px] text-gray-400">数字越大，排序越靠前</div>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t">
                <button
                  onClick={() => setEditingReason(null)}
                  className="px-4 py-1.5 border border-gray-200 text-gray-600 rounded-lg text-xs hover:bg-gray-50 transition-colors"
                >
                  取消
                </button>
                <button
                  onClick={handleSaveEditingReason}
                  className="px-4 py-1.5 bg-[#10b981] hover:bg-[#059669] text-white rounded-lg text-xs font-medium transition-colors"
                >
                  保存
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (subPageId === 'trade_general_settings') {
    return (
      <div className="p-6 max-w-[1200px] mx-auto space-y-5 animate-in fade-in duration-200">
        <div className="bg-white rounded-xl p-6 border border-gray-200/80 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <h1 className="text-base font-bold text-gray-800 flex items-center space-x-2">
              <span className="w-1.5 h-4 bg-[#10b981] rounded-full"></span>
              <span>通用设置</span>
            </h1>
          </div>

          <div className="space-y-6 text-xs text-gray-700 max-w-2xl">
            {/* Setting 1: 订单取消时间 */}
            <div className="space-y-1.5">
              <label className="font-semibold text-gray-800 text-xs">订单取消时间</label>
              <div className="flex items-center space-x-2 text-gray-600">
                <span>拍下订单</span>
                <input
                  type="number"
                  value={generalSettings.unpaidAutoCancelMinutes}
                  onChange={(e) =>
                    setGeneralSettings({
                      ...generalSettings,
                      unpaidAutoCancelMinutes: parseInt(e.target.value) || 15,
                    })
                  }
                  className="w-16 p-1.5 bg-white border border-gray-200 rounded-md text-center text-xs focus:outline-none focus:border-[#10b981]"
                />
                <span>分钟内未付款，自动取消订单</span>
              </div>
            </div>

            {/* Setting 2: 允许用户申请退款 */}
            <div className="space-y-1.5">
              <label className="font-semibold text-gray-800 text-xs">允许用户申请退款</label>
              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={() =>
                    setGeneralSettings({
                      ...generalSettings,
                      allowRefundAfterOrder: !generalSettings.allowRefundAfterOrder,
                    })
                  }
                  className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    generalSettings.allowRefundAfterOrder ? 'bg-[#10b981]' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      generalSettings.allowRefundAfterOrder ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
              <div className="text-[11px] text-gray-400">启用后，用户可在订单完成后申请退款</div>
            </div>

            {/* Setting 3: 售后关闭时间 */}
            <div className="space-y-1.5">
              <label className="font-semibold text-gray-800 text-xs">售后关闭时间</label>
              <div className="flex items-center space-x-2 text-gray-600">
                <span>买家确认收货</span>
                <input
                  type="number"
                  value={generalSettings.afterSalesDeadlineDays}
                  onChange={(e) =>
                    setGeneralSettings({
                      ...generalSettings,
                      afterSalesDeadlineDays: parseInt(e.target.value) || 15,
                    })
                  }
                  className="w-16 p-1.5 bg-white border border-gray-200 rounded-md text-center text-xs focus:outline-none focus:border-[#10b981]"
                />
                <span>天后，不支持买家申请退款</span>
              </div>
            </div>

            {/* Setting 4: 自动退款时间 */}
            <div className="space-y-1.5">
              <label className="font-semibold text-gray-800 text-xs">自动退款时间</label>
              <div className="flex items-center space-x-2 text-gray-600">
                <span>买家申请退款，买家在</span>
                <input
                  type="number"
                  value={generalSettings.autoRefundTimeoutHours}
                  onChange={(e) =>
                    setGeneralSettings({
                      ...generalSettings,
                      autoRefundTimeoutHours: parseInt(e.target.value) || 48,
                    })
                  }
                  className="w-16 p-1.5 bg-white border border-gray-200 rounded-md text-center text-xs focus:outline-none focus:border-[#10b981]"
                />
                <span>小时内未处理，自动退款给买家</span>
              </div>
            </div>

            {/* Setting 5: 自动同意退款申请 */}
            <div className="space-y-1.5">
              <label className="font-semibold text-gray-800 text-xs">自动同意退款申请</label>
              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={() =>
                    setGeneralSettings({
                      ...generalSettings,
                      autoApproveRefund: !generalSettings.autoApproveRefund,
                    })
                  }
                  className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    generalSettings.autoApproveRefund ? 'bg-[#10b981]' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      generalSettings.autoApproveRefund ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
              <div className="text-[11px] text-gray-400">
                启用后，用户申请退款无需卖家后台同意即可退款
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <button
                onClick={() => onNotice('通用设置更新成功')}
                className="px-6 py-2 bg-[#10b981] hover:bg-[#059669] text-white rounded-lg text-xs font-medium transition-colors"
              >
                保存
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Primary Order Detail View
  if (activeOrderDetailId && currentOrderDetail) {
    const ord = currentOrderDetail;

    return (
      <>
        <div className="p-6 max-w-[1600px] mx-auto space-y-5 animate-in fade-in duration-200">
        <div className="bg-white rounded-xl p-6 border border-gray-200/80 shadow-xs space-y-6 min-h-[820px]">
          {/* Header Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setActiveOrderDetailId(null)}
                className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors"
              >
                ← 返回列表
              </button>
              <span className="w-1.5 h-4 bg-[#10b981] rounded-full"></span>
              <h1 className="text-base font-bold text-gray-800">
                订单详情 - 【{ord.orderNo}】
              </h1>
            </div>
            <div className="flex items-center space-x-2 text-xs">
              <span className="text-gray-400">下单时间:</span>
              <span className="font-mono text-gray-700">{ord.orderTime}</span>
            </div>
          </div>

          {/* Top Status Banner matching screenshot 8 & 14 */}
          <div
            className={`p-4 rounded-xl border flex items-center justify-between ${
              ord.status === '待付款'
                ? 'bg-amber-50/80 border-amber-200/90 text-amber-900'
                : ord.status === '待接单'
                ? 'bg-blue-50/80 border-blue-200/90 text-blue-900'
                : ord.status === '待服务'
                ? 'bg-emerald-50/80 border-emerald-200/90 text-emerald-900'
                : ord.status === '已完成'
                ? 'bg-gray-50 border-gray-200 text-gray-800'
                : 'bg-red-50/80 border-red-200/90 text-red-900'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-white/80 shadow-xs">
                {ord.status === '待付款' && <Clock className="w-5 h-5 text-amber-600" />}
                {ord.status === '待接单' && <RefreshCw className="w-5 h-5 text-blue-600 animate-spin" />}
                {ord.status === '待服务' && <UserCheck className="w-5 h-5 text-emerald-600" />}
                {ord.status === '已完成' && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                {ord.status?.includes('关闭') && <XCircle className="w-5 h-5 text-red-600" />}
              </div>
              <div>
                <div className="text-sm font-bold">
                  {ord.status === '待付款' && '商品已拍下，等待买家付款'}
                  {ord.status === '待接单' && '待接单 - 买家已付款，服务人员抢单中，也可选择手动派单'}
                  {ord.status === '待服务' && '待服务 - 已接单，等待上门服务'}
                  {ord.status === '已完成' && '订单完成 - 服务结束，订单已完成'}
                  {ord.status === '退款完成，订单关闭' && '退款完成，订单关闭 - 买家申请退款，退款成功'}
                  {ord.status === '支付超时，订单关闭' && '订单关闭 - 支付超时，订单关闭'}
                </div>
                {ord.status === '待付款' && (
                  <div className="text-xs text-amber-700/80 mt-0.5">
                    (如买家未在13分04秒内付款，订单将自动关闭)
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {ord.status === '待付款' && (
                <>
                  <button
                    onClick={() => {
                      setPriceModalOrder(ord);
                      setPriceAdjustment('20');
                    }}
                    className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-medium transition-colors"
                  >
                    修改价格
                  </button>
                  <button
                    onClick={() => setCloseModalOrder(ord)}
                    className="px-3 py-1.5 border border-amber-300 text-amber-800 hover:bg-amber-100 rounded-lg text-xs font-medium transition-colors"
                  >
                    关闭订单
                  </button>
                </>
              )}
              {ord.status === '待接单' && (
                <>
                  <button
                    onClick={() => {
                      setDispatchModalOrder(ord);
                      setSelectedStaff('王小倩');
                    }}
                    className="px-3.5 py-1.5 bg-[#10b981] hover:bg-[#059669] text-white rounded-lg text-xs font-medium transition-colors"
                  >
                    手动派单
                  </button>
                  <button
                    onClick={() => {
                      setRefundModalOrder(ord);
                      setRefundAmountInput(ord.payableAmount.toString());
                    }}
                    className="px-3.5 py-1.5 border border-gray-300 text-gray-700 hover:bg-gray-100 rounded-lg text-xs transition-colors"
                  >
                    退款
                  </button>
                </>
              )}
              {(ord.status === '待服务' || ord.status === '待接单' || ord.status === '服务中') && (
                <button
                  onClick={() => {
                    setChangeOrderModalOrder(ord);
                    setChangeOrderStaff('王小倩');
                    setChangeOrderDate(ord.reservationTime ? ord.reservationTime.split(' ')[0] : '2026-09-20');
                    setChangeOrderTime(ord.reservationTime ? ord.reservationTime.split(' ')[1] || '14:00' : '14:00');
                    setChangeOrderRemark('');
                  }}
                  className="px-3.5 py-1.5 bg-[#10b981] hover:bg-[#059669] text-white rounded-lg text-xs font-medium transition-colors shadow-xs"
                >
                  改单
                </button>
              )}
            </div>
          </div>

          {/* Section: 订单备注 */}
          <div className="p-4 bg-gray-50/70 rounded-xl border border-gray-100 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-800 flex items-center space-x-1.5">
                <FileText className="w-3.5 h-3.5 text-emerald-600" />
                <span>订单备注</span>
              </span>
              <button
                onClick={() => {
                  setRemarkModalOrder(ord);
                  setRemarkText(ord.remark || '');
                }}
                className="text-xs text-emerald-600 hover:underline flex items-center space-x-1"
              >
                <Edit3 className="w-3 h-3" />
                <span>添加/修改备注</span>
              </button>
            </div>
            <p className="text-xs text-gray-600">
              {ord.remark || '暂无额外备注信息'}
            </p>
          </div>

          {/* Section: 订单信息 Grid */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold text-gray-800 uppercase tracking-wider text-gray-500">
              订单核心要素
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Card 1: 用户信息 */}
              <div className="p-4 bg-white rounded-xl border border-gray-200/80 space-y-3">
                <div className="text-xs font-bold text-gray-800 pb-2 border-b border-gray-100 flex items-center justify-between">
                  <span>用户信息</span>
                  <button
                    onClick={() => setChatModalOrder(ord)}
                    className="text-[11px] text-emerald-600 hover:underline flex items-center space-x-1"
                  >
                    <MessageSquare className="w-3 h-3" />
                    <span>联系用户</span>
                  </button>
                </div>
                <div className="flex items-center space-x-3">
                  <img
                    src={ord.buyerAvatar}
                    alt={ord.buyerName}
                    className="w-11 h-11 rounded-full object-cover border border-gray-200 shrink-0"
                  />
                  <div>
                    <div className="text-xs font-bold text-gray-800">{ord.buyerName}</div>
                    <div className="text-[11px] text-gray-400 font-mono">ID: {ord.buyerId}</div>
                    <div className="text-[11px] text-gray-500 font-mono mt-0.5">{ord.buyerPhoneFull}</div>
                  </div>
                </div>
                <div className="space-y-1 text-[11px] text-gray-500 pt-2 border-t border-gray-50">
                  <div className="flex justify-between">
                    <span>注册时间:</span>
                    <span className="font-mono text-gray-700">{ord.buyerRegisterTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>注册方式:</span>
                    <span className="text-gray-700">{ord.buyerRegisterType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>最近登录:</span>
                    <span className="font-mono text-gray-700">{ord.buyerLastLogin}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>最近购买:</span>
                    <span className="font-mono text-gray-700">{ord.buyerLastBuy}</span>
                  </div>
                </div>
              </div>

              {/* Card 2: 订单信息 */}
              <div className="p-4 bg-white rounded-xl border border-gray-200/80 space-y-2.5 text-xs text-gray-600">
                <div className="text-xs font-bold text-gray-800 pb-2 border-b border-gray-100">
                  订单状态信息
                </div>
                <div className="flex justify-between">
                  <span>订单编号:</span>
                  <span className="font-mono font-medium text-gray-800">{ord.orderNo}</span>
                </div>
                <div className="flex justify-between">
                  <span>下单时间:</span>
                  <span className="font-mono text-gray-700">{ord.orderTime}</span>
                </div>
                <div className="flex justify-between">
                  <span>付款时间:</span>
                  <span className="font-mono text-gray-700">{ord.payTime || '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span>订单状态:</span>
                  <span className="font-bold text-emerald-700">{ord.status}</span>
                </div>
                <div className="flex justify-between">
                  <span>订单来源:</span>
                  <span className="text-gray-700">{ord.orderSource}</span>
                </div>
              </div>

              {/* Card 3: 预约信息 */}
              <div className="p-4 bg-white rounded-xl border border-gray-200/80 space-y-2.5 text-xs text-gray-600">
                <div className="text-xs font-bold text-gray-800 pb-2 border-b border-gray-100">
                  预约服务与配送信息
                </div>
                <div className="flex justify-between">
                  <span>上门地址:</span>
                  <span className="text-gray-800 max-w-[180px] truncate" title={ord.address}>
                    {ord.address}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>预约时间:</span>
                  <span className="font-mono text-gray-800">{ord.reservationTime}</span>
                </div>
                <div className="flex justify-between">
                  <span>预计时长:</span>
                  <span className="text-gray-800">{ord.estimatedDuration}</span>
                </div>
                <div className="flex justify-between">
                  <span>联系电话:</span>
                  <span className="font-mono text-gray-800">{ord.contactPhone}</span>
                </div>
                <div className="flex justify-between">
                  <span>指派人员:</span>
                  <span className="font-bold text-emerald-700">{ord.assignedStaff || '暂未派单'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section: 售后信息 (If refund/after sales) */}
          {ord.afterSalesNo && (
            <div className="p-4 bg-red-50/50 rounded-xl border border-red-200/80 space-y-2 text-xs text-red-900">
              <div className="font-bold text-red-800 border-b border-red-200/60 pb-2">
                售后服务处置明细
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div>
                  <span className="text-red-600/80">售后单号:</span>
                  <div className="font-mono font-bold mt-0.5">{ord.afterSalesNo}</div>
                </div>
                <div>
                  <span className="text-red-600/80">退款金额:</span>
                  <div className="font-bold text-red-600 mt-0.5">¥{ord.refundAmount?.toFixed(2)}</div>
                </div>
                <div>
                  <span className="text-red-600/80">退款原因:</span>
                  <div className="mt-0.5">{ord.refundReason}</div>
                </div>
                <div>
                  <span className="text-red-600/80">退款渠道:</span>
                  <div className="mt-0.5">{ord.refundChannel}</div>
                </div>
              </div>
              <div className="pt-2 border-t border-red-200/60 text-[11px] text-red-700">
                <strong>退款说明:</strong> {ord.refundExplanation}
              </div>
            </div>
          )}

          {/* Section: 商品信息 Table */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold text-gray-800 uppercase tracking-wider text-gray-500">
              商品清单
            </h2>
            <div className="border border-gray-200/80 rounded-xl overflow-hidden">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200/80 text-gray-600 font-semibold">
                    <th className="p-3">商品信息</th>
                    <th className="p-3">单价</th>
                    <th className="p-3">小计</th>
                    <th className="p-3">支付方式</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-700">
                  <tr>
                    <td className="p-3 flex items-center space-x-3">
                      <img
                        src={ord.productImage}
                        alt={ord.productTitle}
                        className="w-12 h-12 rounded-lg object-cover border border-gray-200 shrink-0"
                      />
                      <div>
                        <div className="font-semibold text-gray-800">{ord.productTitle}</div>
                        <div className="text-[11px] text-gray-400 mt-0.5">
                          分类: {ord.productCategory}
                        </div>
                      </div>
                    </td>
                    <td className="p-3 font-mono font-medium text-gray-800">
                      ¥{ord.price.toFixed(2)}
                    </td>
                    <td className="p-3 font-mono font-bold text-gray-900">
                      ¥{ord.price.toFixed(2)}
                    </td>
                    <td className="p-3 text-gray-600">{ord.paymentMethod}</td>
                  </tr>
                </tbody>
              </table>

              {/* Price summary bottom */}
              <div className="p-4 bg-gray-50/80 border-t border-gray-200/80 flex flex-col items-end space-y-1.5 text-xs">
                <div className="text-gray-500 flex justify-between w-48">
                  <span>商品总价:</span>
                  <span className="font-mono text-gray-800">¥{ord.originalPrice.toFixed(2)}</span>
                </div>
                <div className="text-gray-500 flex justify-between w-48">
                  <span>优惠金额:</span>
                  <span className="font-mono text-red-500">-¥{ord.discountAmount.toFixed(2)}</span>
                </div>
                <div className="text-sm font-bold text-gray-900 flex justify-between w-48 pt-2 border-t border-gray-200">
                  <span>应付/实付款:</span>
                  <span className="font-mono text-[#10b981]">¥{ord.payableAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {renderOrderModals()}
    </>
    );
  }

  // Primary Order List Table Layout (Matching Screenshot 1-7)
  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-5 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl p-6 border border-gray-200/80 shadow-xs space-y-5 min-h-[820px]">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-100 gap-3">
          <div className="flex items-center space-x-2.5">
            <span className="w-1.5 h-4 bg-[#10b981] rounded-full"></span>
            <h1 className="text-base font-bold text-gray-800 tracking-tight">全部订单</h1>
            <span className="text-xs text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 font-medium">
              共 {filteredOrders.length} 笔订单
            </span>
          </div>

          <div className="flex items-center space-x-2 text-xs text-gray-500 font-mono">
            <span>数据更新: 2026-09-19 18:30 (降序排列)</span>
          </div>
        </div>

        {/* Filter Controls Row matching Image 1 */}
        <div className="p-4 bg-gray-50/70 rounded-xl border border-gray-100 space-y-3 text-xs text-gray-700">
          <div className="flex flex-wrap items-center gap-6">
            {/* Radio: 服务类型 */}
            <div className="flex items-center space-x-3">
              <span className="font-semibold text-gray-700">服务类型:</span>
              <div className="flex items-center space-x-4">
                {[
                  { id: 'all', label: '全部' },
                  { id: '家政护工', label: '家政护工' },
                  { id: '康复理疗', label: '康复理疗' },
                  { id: '上门体检', label: '上门体检' },
                ].map((cat) => (
                  <label key={cat.id} className="flex items-center space-x-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="serviceType"
                      checked={selectedCategory === cat.id}
                      onChange={() => setSelectedCategory(cat.id)}
                      className="accent-[#10b981]"
                    />
                    <span>{cat.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Select: 支付方式 */}
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-gray-700">支付方式:</span>
              <select
                value={selectedPayMethod}
                onChange={(e) => setSelectedPayMethod(e.target.value)}
                className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#10b981]"
              >
                <option value="all">全部方式</option>
                <option value="微信支付">微信支付</option>
                <option value="支付宝">支付宝</option>
                <option value="银联支付">银联支付</option>
              </select>
            </div>

            {/* Price range */}
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-gray-700">实付金额:</span>
              <input
                type="number"
                placeholder="最低"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-20 px-2.5 py-1.5 bg-white border border-gray-200 rounded-lg text-xs"
              />
              <span className="text-gray-400">-</span>
              <input
                type="number"
                placeholder="最高"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-20 px-2.5 py-1.5 bg-white border border-gray-200 rounded-lg text-xs"
              />
            </div>

            {/* Keyword Search */}
            <div className="flex-1 min-w-[240px]">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="请输入订单编号 / 买家姓名 / 手机号 / 商品名称"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-[#10b981]"
                />
              </div>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center space-x-2">
              <button
                onClick={handleResetFilters}
                className="px-3.5 py-1.5 border border-gray-200 bg-white hover:bg-gray-100 text-gray-700 rounded-lg text-xs font-medium transition-colors"
              >
                重置
              </button>
              <button
                onClick={() => onNotice(`已检索到 ${filteredOrders.length} 笔订单`)}
                className="px-4 py-1.5 bg-[#10b981] hover:bg-[#059669] text-white rounded-lg text-xs font-medium transition-colors"
              >
                搜索
              </button>
            </div>
          </div>
        </div>

        {/* Order Status Tabs matching screenshot */}
        <div className="flex items-center justify-between border-b border-gray-200 text-xs">
          <div className="flex items-center space-x-1">
            {[
              { id: '全部', label: '全部', count: counts.all },
              { id: '待付款', label: '待付款', count: counts.unpaid },
              { id: '待接单', label: '待接单', count: counts.pendingDispatch },
              { id: '待服务', label: '待服务', count: counts.pendingService },
              { id: '已完成', label: '已完成', count: counts.completed },
              { id: '退款售后', label: '退款售后', count: counts.refund },
              { id: '已关闭', label: '已关闭', count: counts.closed },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 px-4 font-semibold border-b-2 transition-all flex items-center space-x-1.5 ${
                  activeTab === tab.id
                    ? 'border-[#10b981] text-[#10b981]'
                    : 'border-transparent text-gray-500 hover:text-gray-800'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                    activeTab === tab.id
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          <button
            onClick={() => onNotice('支持勾选选定订单进行批量导出和批量派单')}
            className="px-3 py-1.5 border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-lg text-xs font-medium transition-colors"
          >
            批量操作
          </button>
        </div>

        {/* Order Cards List matching Screenshot 1 Table Structure */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto" />
              <p className="text-xs text-gray-500">暂无符合筛选条件的订单记录</p>
            </div>
          ) : (
            filteredOrders.map((ord) => (
              <div
                key={ord.id}
                className="border border-gray-200/90 rounded-xl overflow-hidden bg-white shadow-2xs hover:border-emerald-300 transition-all"
              >
                {/* Card Header matching Screenshot 1 */}
                <div className="bg-gray-50/90 px-4 py-2.5 border-b border-gray-200/70 flex flex-wrap items-center justify-between text-xs text-gray-600 gap-2">
                  <div className="flex items-center space-x-6 font-mono">
                    <div>
                      <span className="text-gray-400 mr-1.5">下单时间:</span>
                      <span className="font-semibold text-gray-800">{ord.orderTime}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 mr-1.5">订单编号:</span>
                      <span className="font-semibold text-gray-800">{ord.orderNo}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <span className="text-gray-500">
                      应付款: <strong className="text-gray-900 font-mono">¥{ord.payableAmount.toFixed(2)}</strong>
                    </span>
                  </div>
                </div>

                {/* Card Body matching Screenshot 1 Column Structure */}
                <div className="p-4 grid grid-cols-1 md:grid-cols-12 gap-4 items-center text-xs">
                  {/* Column 1: 商品信息 */}
                  <div className="md:col-span-4 flex items-center space-x-3">
                    <img
                      src={ord.productImage}
                      alt={ord.productTitle}
                      className="w-14 h-14 rounded-lg object-cover border border-gray-200 shrink-0"
                    />
                    <div>
                      <div
                        className="font-semibold text-gray-800 line-clamp-2 hover:text-[#10b981] cursor-pointer"
                        title={ord.productTitle}
                        onClick={() => setActiveOrderDetailId(ord.id)}
                      >
                        {ord.productTitle}
                      </div>
                      <div className="text-[11px] text-gray-400 mt-1 flex items-center space-x-2">
                        <span className="bg-gray-100 text-gray-600 px-1.5 py-0.2 rounded">
                          {ord.productCategory}
                        </span>
                        <span>预约: {ord.reservationTime}</span>
                      </div>
                    </div>
                  </div>

                  {/* Column 2: 价格 */}
                  <div className="md:col-span-2 text-center md:border-l border-gray-100">
                    <span className="text-gray-400 block text-[10px]">商品单价</span>
                    <span className="font-mono font-bold text-gray-800">¥{ord.price.toFixed(2)}</span>
                    {ord.discountAmount > 0 && (
                      <span className="block text-[10px] text-red-500">已优惠 ¥{ord.discountAmount}</span>
                    )}
                  </div>

                  {/* Column 3: 买家 */}
                  <div className="md:col-span-2 flex items-center space-x-2 md:border-l border-gray-100 pl-3">
                    <img
                      src={ord.buyerAvatar}
                      alt={ord.buyerName}
                      className="w-8 h-8 rounded-full object-cover border border-gray-200 shrink-0"
                    />
                    <div>
                      <div className="font-semibold text-gray-800">{ord.buyerName}</div>
                      <div className="text-[11px] text-gray-400 font-mono">{ord.buyerPhone}</div>
                    </div>
                  </div>

                  {/* Column 4: 状态 & 支付 */}
                  <div className="md:col-span-2 text-center md:border-l border-gray-100">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                        ord.status === '待付款'
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : ord.status === '待接单'
                          ? 'bg-blue-50 text-blue-700 border-blue-200'
                          : ord.status === '待服务'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : ord.status === '已完成'
                          ? 'bg-gray-100 text-gray-700 border-gray-200'
                          : 'bg-red-50 text-red-700 border-red-200'
                      }`}
                    >
                      {ord.status}
                    </span>
                    <div className="text-[11px] text-gray-400 mt-1 font-mono">
                      支付: {ord.paymentMethod}
                    </div>
                  </div>

                  {/* Column 5: 操作 buttons matching Screenshot 1 */}
                  <div className="md:col-span-2 flex flex-wrap items-center justify-end gap-1.5 md:border-l border-gray-100 pl-2">
                    <button
                      onClick={() => setActiveOrderDetailId(ord.id)}
                      className="px-2.5 py-1 text-emerald-700 hover:bg-emerald-50 rounded-md font-medium text-xs transition-colors"
                    >
                      订单详情
                    </button>

                    {ord.status === '待付款' && (
                      <>
                        <button
                          onClick={() => {
                            setPriceModalOrder(ord);
                            setPriceAdjustment('20');
                          }}
                          className="px-2.5 py-1 text-amber-700 hover:bg-amber-50 rounded-md text-xs font-medium"
                        >
                          修改价格
                        </button>
                        <button
                          onClick={() => setCloseModalOrder(ord)}
                          className="px-2.5 py-1 text-gray-600 hover:bg-gray-100 rounded-md text-xs"
                        >
                          关闭订单
                        </button>
                      </>
                    )}

                    {ord.status === '待接单' && (
                      <button
                        onClick={() => {
                          setDispatchModalOrder(ord);
                          setSelectedStaff('王小倩');
                        }}
                        className="px-2.5 py-1 bg-[#10b981] text-white hover:bg-[#059669] rounded-md font-medium text-xs shadow-2xs"
                      >
                        手动派单
                      </button>
                    )}

                    {(ord.status === '待服务' || ord.status === '待接单' || ord.status === '服务中') && (
                      <button
                        onClick={() => {
                          setChangeOrderModalOrder(ord);
                          setChangeOrderStaff('王小倩');
                          setChangeOrderDate(ord.reservationTime ? ord.reservationTime.split(' ')[0] : '2026-09-20');
                          setChangeOrderTime(ord.reservationTime ? ord.reservationTime.split(' ')[1] || '14:00' : '14:00');
                          setChangeOrderRemark('');
                        }}
                        className="px-2.5 py-1 text-emerald-700 hover:bg-emerald-50 rounded-md font-medium text-xs transition-colors"
                      >
                        改单
                      </button>
                    )}

                    <button
                      onClick={() => setChatModalOrder(ord)}
                      className="px-2 py-1 text-gray-600 hover:bg-gray-100 rounded-md text-xs"
                    >
                      联系用户
                    </button>

                    <button
                      onClick={() => {
                        setRemarkModalOrder(ord);
                        setRemarkText(ord.remark || '');
                      }}
                      className="px-2 py-1 text-gray-500 hover:bg-gray-100 rounded-md text-xs"
                    >
                      备注
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {renderOrderModals()}
    </div>
  );
};
