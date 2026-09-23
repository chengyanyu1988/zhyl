import React, { useState, useMemo } from 'react';
import { Search, RotateCcw, Copy, Check, ArrowLeft, ExternalLink, Phone } from 'lucide-react';
import { AppUser } from '../../types';
import { INITIAL_ORDERS, OrderItem } from '../../data/userRecordsData';
import { UserProfileSidebar } from './UserProfileSidebar';

interface OrderInfoTabProps {
  user: AppUser;
  onNotice: (msg: string) => void;
}

export const OrderInfoTab: React.FC<OrderInfoTabProps> = ({ user, onNotice }) => {
  const [orders, setOrders] = useState<OrderItem[]>(INITIAL_ORDERS);
  const [serviceFilter, setServiceFilter] = useState<string>('全部');
  const [keyword, setKeyword] = useState<string>('');
  const [viewingOrderDetail, setViewingOrderDetail] = useState<OrderItem | null>(null);
  const [copiedOrderNo, setCopiedOrderNo] = useState<string | null>(null);

  const filteredOrders = useMemo(() => {
    return orders
      .filter((ord) => {
        const matchType = serviceFilter === '全部' || ord.serviceType === serviceFilter;
        const matchKeyword =
          !keyword.trim() ||
          ord.orderNo.toLowerCase().includes(keyword.toLowerCase()) ||
          ord.productName.toLowerCase().includes(keyword.toLowerCase()) ||
          ord.buyer.name.toLowerCase().includes(keyword.toLowerCase());
        return matchType && matchKeyword;
      })
      .sort((a, b) => new Date(b.orderTime).getTime() - new Date(a.orderTime).getTime());
  }, [orders, serviceFilter, keyword]);

  const handleCopy = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedOrderNo(text);
    onNotice(`已复制单号：${text}`);
    setTimeout(() => setCopiedOrderNo(null), 2000);
  };

  // 如果处于“订单详情”查看模式 (Images 6, 7)
  if (viewingOrderDetail) {
    const ord = viewingOrderDetail;
    return (
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-6 text-xs">
        {/* 标题 */}
        <div className="flex items-center space-x-2 pb-3 border-b border-gray-100">
          <span className="w-1.5 h-4 bg-[#10b981] rounded-full"></span>
          <h2 className="text-base font-semibold text-gray-800">订单详情</h2>
        </div>

        {/* 状态大卡片 */}
        <div className="space-y-1.5 py-1">
          <div className="text-lg font-bold text-gray-800 tracking-tight">
            {ord.status === '已关闭' ? '订单关闭' : ord.status === '已完成' ? '订单已完成' : '订单履行中'}
          </div>
          <div className="text-gray-500">
            {ord.closeReason || '长者照护预约已成功，正由专业医护及照护人员提供履约支持'}
          </div>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => onNotice(`为订单【${ord.orderNo}】添加补充备注`)}
              className="text-[#10b981] hover:underline font-medium"
            >
              订单备注：添加备注
            </button>
          </div>
        </div>

        {/* 订单信息三列横向栅格 (Image 6, 7) */}
        <div className="border-t border-gray-100 pt-5 space-y-3">
          <h3 className="text-sm font-semibold text-gray-800">订单信息</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-50/50 p-5 rounded-xl border border-gray-100">
            {/* 1. 用户信息 */}
            <div className="space-y-2 text-gray-600 border-b md:border-b-0 md:border-r border-gray-200/60 pr-4 pb-4 md:pb-0">
              <div className="text-gray-400 font-medium pb-1">用户信息</div>
              <div className="flex items-center space-x-3 pb-2">
                <img
                  src={ord.buyer.avatar}
                  alt={ord.buyer.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100 shadow-xs"
                />
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-bold text-gray-800">{ord.buyer.name}</span>
                    <button
                      type="button"
                      onClick={() => onNotice(`调阅长者【${ord.buyer.name}】完整健康信息档案`)}
                      className="text-[#10b981] hover:underline text-[11px]"
                    >
                      查看详情
                    </button>
                    <button
                      type="button"
                      onClick={() => onNotice(`呼叫长者联系电话：${ord.buyer.phone}`)}
                      className="text-[#10b981] hover:underline text-[11px]"
                    >
                      联系用户
                    </button>
                  </div>
                  <div className="text-[11px] text-gray-400 font-mono">
                    ID: {ord.buyer.userNo}
                  </div>
                </div>
              </div>

              <div className="space-y-1 text-[11px]">
                <div><span className="text-gray-400">手机号码：</span><span className="font-mono text-gray-700">{ord.buyer.phone}</span></div>
                <div><span className="text-gray-400">注册时间：</span><span className="font-mono text-gray-700">{ord.buyer.registerTime}</span></div>
                <div><span className="text-gray-400">注册方式：</span><span className="text-gray-700">{ord.buyer.registerType}</span></div>
                <div><span className="text-gray-400">最近登录时间：</span><span className="font-mono text-gray-700">{ord.buyer.lastLoginTime}</span></div>
                <div><span className="text-gray-400">最近购买时间：</span><span className="font-mono text-gray-700">{ord.buyer.lastBuyTime}</span></div>
                <div className="pt-1"><span className="text-gray-400">备注：</span><span className="text-gray-700">{ord.buyer.remarks}</span></div>
              </div>
            </div>

            {/* 2. 订单信息 */}
            <div className="space-y-2 text-gray-600 border-b md:border-b-0 md:border-r border-gray-200/60 pr-4 pb-4 md:pb-0 text-[11px]">
              <div className="text-gray-400 font-medium pb-1 text-xs">订单信息</div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-400">订单编号：</span>
                <span className="font-mono font-medium text-gray-800">{ord.orderNo}</span>
                <button
                  type="button"
                  onClick={() => handleCopy(ord.orderNo)}
                  className="text-[#10b981] hover:underline flex items-center space-x-1"
                >
                  {copiedOrderNo === ord.orderNo ? (
                    <span className="text-emerald-600 flex items-center text-[10px]"><Check className="w-3 h-3 mr-0.5" />已复制</span>
                  ) : (
                    <span>复制</span>
                  )}
                </button>
              </div>
              <div><span className="text-gray-400">下单时间：</span><span className="font-mono text-gray-700">{ord.orderTime}</span></div>
              {ord.closeTime && (
                <div><span className="text-gray-400">关闭时间：</span><span className="font-mono text-gray-700">{ord.closeTime}</span></div>
              )}
              <div>
                <span className="text-gray-400">订单状态：</span>
                <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                  ord.status === '已完成'
                    ? 'bg-emerald-50 text-emerald-600'
                    : ord.status === '已关闭'
                    ? 'bg-gray-100 text-gray-600'
                    : 'bg-blue-50 text-blue-600'
                }`}>
                  {ord.status}
                </span>
              </div>
              <div><span className="text-gray-400">订单来源：</span><span className="text-gray-700">{ord.orderSource}</span></div>
            </div>

            {/* 3. 预约信息 */}
            <div className="space-y-2 text-gray-600 text-[11px]">
              <div className="text-gray-400 font-medium pb-1 text-xs">预约信息</div>
              <div><span className="text-gray-400">上门地址：</span><span className="text-gray-800">{ord.appointment.address}</span></div>
              <div><span className="text-gray-400">预约时间：</span><span className="font-mono text-gray-700">{ord.appointment.time}</span></div>
              <div><span className="text-gray-400">预计时长：</span><span className="text-gray-700">{ord.appointment.duration}</span></div>
              <div><span className="text-gray-400">联系方式：</span><span className="font-mono text-gray-700">{ord.appointment.phone}</span></div>
            </div>
          </div>
        </div>

        {/* 商品信息明细表 */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-800">商品信息</h3>
          <div className="border border-gray-100 rounded-xl overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-[#f9fafb] text-gray-500 border-b border-gray-100 font-medium">
                <tr>
                  <th className="py-3 px-4">商品信息</th>
                  <th className="py-3 px-3 text-center">价格</th>
                  <th className="py-3 px-3 text-center">小计</th>
                  <th className="py-3 px-3 text-center">支付方式</th>
                  <th className="py-3 px-4 text-center">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <tr>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={ord.productImage}
                        alt={ord.productName}
                        className="w-16 h-12 rounded-lg object-cover border border-gray-100 shadow-xs"
                      />
                      <span className="font-medium text-gray-800">{ord.productName}</span>
                    </div>
                  </td>
                  <td className="py-4 px-3 text-center font-mono font-medium text-gray-700">
                    ¥{ord.price.toFixed(2)}
                  </td>
                  <td className="py-4 px-3 text-center font-mono font-semibold text-gray-800">
                    ¥{ord.price.toFixed(2)}
                  </td>
                  <td className="py-4 px-3 text-center text-gray-600">
                    {ord.payMethod}
                  </td>
                  <td className="py-4 px-4 text-center text-gray-400">-</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 结算汇总 (Image 7) */}
          <div className="flex flex-col items-end space-y-1.5 pt-4 text-xs">
            <div className="text-gray-500">
              商品总价：<span className="font-mono text-gray-800 font-medium">¥{ord.price.toFixed(2)}</span>
            </div>
            <div className="text-gray-500">
              优惠：<span className="font-mono text-rose-600 font-medium">-¥{ord.discount.toFixed(2)}</span>
            </div>
            <div className="text-sm font-bold text-gray-900 pt-1">
              应付款：<span className="font-mono text-[#10b981]">¥{ord.actualAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* 底部返回按钮 */}
        <div className="pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={() => setViewingOrderDetail(null)}
            className="px-5 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 font-medium transition-colors"
          >
            返回
          </button>
        </div>
      </div>
    );
  }

  // 主列表页面 (Images 4, 5)
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* 左侧个人画像侧边栏 */}
      <div className="lg:col-span-4 space-y-5">
        <UserProfileSidebar user={user} />
      </div>

      {/* 右侧订单列表与检索 */}
      <div className="lg:col-span-8 space-y-4 text-xs">
        {/* 顶部搜索筛选 */}
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2.5 flex-1 min-w-[280px]">
            <div className="flex items-center space-x-2">
              <span className="text-gray-500 shrink-0">服务类型</span>
              <select
                value={serviceFilter}
                onChange={(e) => setServiceFilter(e.target.value)}
                className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:border-[#10b981]"
              >
                <option value="全部">请选择</option>
                <option value="康复理疗">康复理疗</option>
                <option value="日常保洁">日常保洁</option>
                <option value="上门助浴">上门助浴</option>
                <option value="适老改造">适老改造</option>
                <option value="慢病护理">慢病护理</option>
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
              onClick={() => onNotice(`已检索订单：${serviceFilter}，关键字：${keyword || '全部'}`)}
              className="p-2 bg-[#10b981] hover:bg-[#059669] text-white rounded-lg transition-colors"
              title="搜索"
            >
              <Search className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={() => {
                setServiceFilter('全部');
                setKeyword('');
                onNotice('已重置订单搜索筛选');
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
              onClick={() => onNotice('已开启订单批量操作模式')}
              className="px-3 py-1.5 border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-lg font-medium transition-colors"
            >
              批量操作
            </button>
          </div>
        </div>

        {/* 订单列表卡片 (Images 4, 5) */}
        <div className="space-y-3">
          {/* 表头 */}
          <div className="bg-[#f9fafb] px-4 py-3 rounded-xl border border-gray-100 flex items-center text-gray-500 font-medium">
            <div className="w-5/12">商品信息</div>
            <div className="w-2/12 text-center">价格 (元)</div>
            <div className="w-2/12 text-center">买家</div>
            <div className="w-1/12 text-center">订单状态</div>
            <div className="w-1/12 text-center">支付方式</div>
            <div className="w-1/12 text-right">操作</div>
          </div>

          {filteredOrders.map((ord) => (
            <div
              key={ord.id}
              className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] overflow-hidden transition-all hover:border-gray-200"
            >
              {/* 卡片顶栏灰底：下单时间、订单编号、实付款 */}
              <div className="bg-gray-50/80 px-4 py-2 border-b border-gray-100 flex flex-wrap items-center justify-between text-gray-500 text-[11px]">
                <div className="flex items-center space-x-6">
                  <span>下单时间：<span className="font-mono text-gray-700">{ord.orderTime}</span></span>
                  <span>订单编号：<span className="font-mono text-gray-700">{ord.orderNo}</span></span>
                </div>
                <div>
                  实付款：<span className="font-mono font-bold text-gray-800 text-xs">¥{ord.actualAmount.toFixed(2)}</span>
                </div>
              </div>

              {/* 卡片内容列 */}
              <div className="p-4 flex flex-wrap items-center">
                {/* 商品信息 */}
                <div className="w-full md:w-5/12 flex items-center space-x-3 mb-2 md:mb-0">
                  <img
                    src={ord.productImage}
                    alt={ord.productName}
                    className="w-16 h-12 rounded-lg object-cover border border-gray-100 shadow-xs shrink-0"
                  />
                  <div className="min-w-0 pr-3">
                    <div className="font-medium text-gray-800 leading-snug line-clamp-2">
                      {ord.productName}
                    </div>
                    <span className="inline-block mt-1 px-1.5 py-0.5 bg-gray-100 rounded text-[10px] text-gray-500">
                      {ord.serviceType}
                    </span>
                  </div>
                </div>

                {/* 价格 */}
                <div className="w-1/2 md:w-2/12 text-center font-mono font-medium text-gray-700">
                  ¥{ord.price.toFixed(2)}
                </div>

                {/* 买家 */}
                <div className="w-1/2 md:w-2/12 flex items-center justify-center space-x-2">
                  <img
                    src={ord.buyer.avatar}
                    alt={ord.buyer.name}
                    className="w-7 h-7 rounded-full object-cover ring-1 ring-gray-100"
                  />
                  <div className="text-left text-[11px]">
                    <div className="font-semibold text-gray-800">{ord.buyer.nickname || ord.buyer.name}</div>
                    <div className="text-gray-400 font-mono text-[10px]">{ord.buyer.maskedPhone}</div>
                  </div>
                </div>

                {/* 订单状态 */}
                <div className="w-1/2 md:w-1/12 text-center">
                  <span
                    className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                      ord.status === '已完成'
                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-200/60'
                        : ord.status === '服务中'
                        ? 'bg-blue-50 text-blue-600 border border-blue-200/60'
                        : 'bg-gray-100 text-gray-600 border border-gray-200'
                    }`}
                  >
                    {ord.status}
                  </span>
                </div>

                {/* 支付方式 */}
                <div className="w-1/2 md:w-1/12 text-center text-gray-600">
                  {ord.payMethod}
                </div>

                {/* 操作 (Image 5) */}
                <div className="w-full md:w-1/12 flex md:flex-col items-center md:items-end justify-end space-x-3 md:space-x-0 md:space-y-1 font-medium mt-2 md:mt-0">
                  <button
                    type="button"
                    onClick={() => setViewingOrderDetail(ord)}
                    className="text-[#10b981] hover:underline"
                  >
                    订单详情
                  </button>
                  <button
                    type="button"
                    onClick={() => onNotice(`正在联系买家【${ord.buyer.name}】电话：${ord.buyer.phone}`)}
                    className="text-gray-500 hover:text-gray-800 hover:underline"
                  >
                    联系用户
                  </button>
                  <button
                    type="button"
                    onClick={() => onNotice(`为订单【${ord.orderNo}】添加跟进备注`)}
                    className="text-gray-400 hover:text-gray-700 hover:underline"
                  >
                    备注
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredOrders.length === 0 && (
            <div className="bg-white rounded-xl p-12 text-center text-gray-400 border border-gray-100">
              暂无匹配的服务订单记录
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
