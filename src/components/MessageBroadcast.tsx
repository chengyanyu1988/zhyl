import React, { useState, useMemo } from 'react';
import {
  Search,
  RotateCcw,
  ChevronDown,
  Calendar,
  Clock,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  X,
  Check,
} from 'lucide-react';

export interface BroadcastMessage {
  id: string;
  sendTime: string; // 2026-09-19 15:30:00 (descending)
  title: string;
  status: '待发送' | '已发送' | '发送中';
  content: string; // 报告类型/消息内容
  recipient: string; // 所有用户, 高龄独居长者...
  sendMethod: '系统消息' | '短信' | '会话消息';
}

const INITIAL_BROADCAST_MESSAGES: BroadcastMessage[] = [
  {
    id: 'msg-01',
    sendTime: '2026-09-19 16:40',
    title: '重阳节敬老义诊与慢病筛查活动安排',
    status: '待发送',
    content: '尊敬的长者及家属：社区卫生中心将于本周六开展免费心电、骨密度与眼底筛查，请按时前往或预约上门。',
    recipient: '所有用户',
    sendMethod: '系统消息',
  },
  {
    id: 'msg-02',
    sendTime: '2026-09-19 11:15',
    title: '秋季流感疫苗及肺炎球菌疫苗接种通知',
    status: '待发送',
    content: '亲爱的长者：秋季呼吸道疾病高发，针对65岁以上长者的免费流感疫苗接种已开放预约，点击查看预约网点。',
    recipient: '所有用户',
    sendMethod: '系统消息',
  },
  {
    id: 'msg-03',
    sendTime: '2026-09-18 17:20',
    title: '长护险定点居家上门助浴服务补贴公示',
    status: '已发送',
    content: '长护险定点参保家庭请注意，9月份失能等级评定及助浴、康复护理自负抵扣账单已同步更新，请核对。',
    recipient: '所有用户',
    sendMethod: '系统消息',
  },
  {
    id: 'msg-04',
    sendTime: '2026-09-18 10:30',
    title: '适老化智能居家监护设备在线巡检提示',
    status: '已发送',
    content: '平台已对辖区内跌倒雷达与SOS紧急呼叫器完成常规无线链路自检，设备运行状态良好，请安心使用。',
    recipient: '所有用户',
    sendMethod: '短信',
  },
  {
    id: 'msg-05',
    sendTime: '2026-09-17 15:45',
    title: '协议修订通知',
    status: '待发送',
    content: '亲爱的用户，我们最近更新了隐私协议与长者健康数据委托管理规则，点击查看全部内容。',
    recipient: '所有用户',
    sendMethod: '系统消息',
  },
  {
    id: 'msg-06',
    sendTime: '2026-09-17 09:20',
    title: '高血压长者降压药物规范服用温馨指引',
    status: '已发送',
    content: '近期气温波动较大，清晨血压易出现高峰。请遵医嘱按时服药，避免剧烈起卧，每日早晚定时打卡记录。',
    recipient: '所有用户',
    sendMethod: '系统消息',
  },
  {
    id: 'msg-07',
    sendTime: '2026-09-16 14:10',
    title: '社区银发助餐配送中秋特色软糯营养餐食',
    status: '已发送',
    content: '中秋节营养助餐菜单已上线，低糖控脂适老菜品包含清蒸鲈鱼与杂粮米饭，支持子女代下单配餐。',
    recipient: '所有用户',
    sendMethod: '系统消息',
  },
  {
    id: 'msg-08',
    sendTime: '2026-09-15 16:30',
    title: '跌倒高危预警长者防滑设施巡回检查通知',
    status: '已发送',
    content: '防跌倒评估得分低于70分的长者家庭，网格护理员将于本周内上门复查扶手稳固度并赠送防滑袜。',
    recipient: '所有用户',
    sendMethod: '会话消息',
  },
  {
    id: 'msg-09',
    sendTime: '2026-09-14 10:00',
    title: '糖尿病足早期自查要点与皮肤护理科普',
    status: '已发送',
    content: '每日洗脚水温不宜超过37℃，洗后擦干脚趾缝，如出现麻木、发凉或皲裂请及时联系家庭医生。',
    recipient: '所有用户',
    sendMethod: '系统消息',
  },
  {
    id: 'msg-10',
    sendTime: '2026-09-12 11:25',
    title: '九月中旬智能手环与血糖仪耗材申领提醒',
    status: '已发送',
    content: '慢病管理签约长者可凭敬老积分免费兑换血糖试纸与采血针50套，支持社区网点自提或顺丰包邮。',
    recipient: '所有用户',
    sendMethod: '短信',
  },
  {
    id: 'msg-11',
    sendTime: '2026-09-09 14:00',
    title: '家庭医生签约服务第三季度履约报告出炉',
    status: '已发送',
    content: '您所在网格的家庭医生团队已完成季度健康档案归集，包含血常规、生化及心肺功能评估综述。',
    recipient: '所有用户',
    sendMethod: '系统消息',
  },
  {
    id: 'msg-12',
    sendTime: '2026-09-05 09:30',
    title: '银发学堂秋季老年心理关怀交流会开课',
    status: '已发送',
    content: '本周三下午开展《老有所乐·笑看夕阳》心理沙龙与书画茶艺交流，欢迎社区长者携家属共同参与。',
    recipient: '所有用户',
    sendMethod: '系统消息',
  },
];

interface MessageBroadcastProps {
  onNotice: (msg: string) => void;
}

export const MessageBroadcast: React.FC<MessageBroadcastProps> = ({ onNotice }) => {
  const [messages, setMessages] = useState<BroadcastMessage[]>(INITIAL_BROADCAST_MESSAGES);
  const [viewMode, setViewMode] = useState<'list' | 'create'>('list');
  const [editingMessage, setEditingMessage] = useState<BroadcastMessage | null>(null);

  // Filter state
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [keyword, setKeyword] = useState<string>('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Form state (Matches Screenshot 2: 新增消息)
  const [formName, setFormName] = useState('');
  const [recipientType, setRecipientType] = useState<'all' | 'part'>('all');
  const [insertProduct, setInsertProduct] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [sendTimeType, setSendTimeType] = useState<'now' | 'scheduled'>('now');
  const [scheduledDate, setScheduledDate] = useState('2026-09-19');
  const [scheduledHour, setScheduledHour] = useState('12');
  const [scheduledMinute, setScheduledMinute] = useState('00');
  const [formContent, setFormContent] = useState('');
  const [formMethod, setFormMethod] = useState<'系统消息' | '短信' | '会话消息'>('系统消息');

  // Available product catalog for product link insertion
  const sampleProducts = [
    '日常清洁 2小时1人急速清洁全...',
    '助医陪诊 半日门诊专人陪护...',
    '适老化上门助浴与防跌评估...',
    '家庭医生慢病季度管理卡...',
  ];

  // Filtered & sorted messages (strictly descending by sendTime)
  const filteredMessages = useMemo(() => {
    return messages
      .filter((m) => {
        const matchesStatus = statusFilter === 'all' || m.status === statusFilter;
        const q = keyword.trim().toLowerCase();
        const matchesKeyword =
          !q ||
          m.title.toLowerCase().includes(q) ||
          m.content.toLowerCase().includes(q) ||
          m.recipient.toLowerCase().includes(q) ||
          m.sendMethod.toLowerCase().includes(q);

        return matchesStatus && matchesKeyword;
      })
      .sort((a, b) => new Date(b.sendTime).getTime() - new Date(a.sendTime).getTime());
  }, [messages, statusFilter, keyword]);

  const totalPages = Math.ceil(filteredMessages.length / pageSize) || 1;
  const paginatedMessages = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredMessages.slice(start, start + pageSize);
  }, [filteredMessages, currentPage]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(paginatedMessages.map((m) => m.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleDelete = (msg: BroadcastMessage) => {
    setMessages((prev) => prev.filter((m) => m.id !== msg.id));
    setSelectedIds((prev) => prev.filter((id) => id !== msg.id));
    onNotice(`已删除群发消息【${msg.title}】`);
  };

  const handleOpenCreate = () => {
    setEditingMessage(null);
    setFormName('');
    setRecipientType('all');
    setInsertProduct(false);
    setSelectedProducts([]);
    setSendTimeType('now');
    setScheduledDate('2026-09-19');
    setScheduledHour('12');
    setScheduledMinute('00');
    setFormContent('');
    setFormMethod('系统消息');
    setViewMode('create');
  };

  const handleOpenEdit = (msg: BroadcastMessage) => {
    setEditingMessage(msg);
    setFormName(msg.title);
    setRecipientType(msg.recipient === '所有用户' ? 'all' : 'part');
    setInsertProduct(false);
    setSendTimeType('now');
    setFormContent(msg.content);
    setFormMethod(msg.sendMethod);
    setViewMode('create');
  };

  const handleSaveMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) {
      onNotice('请输入消息名称');
      return;
    }
    if (!formContent.trim()) {
      onNotice('请输入消息内容');
      return;
    }

    const calculatedTime =
      sendTimeType === 'now'
        ? '2026-09-19 17:15'
        : `${scheduledDate} ${scheduledHour.padStart(2, '0')}:${scheduledMinute.padStart(2, '0')}`;

    if (editingMessage) {
      setMessages((prev) =>
        prev.map((item) =>
          item.id === editingMessage.id
            ? {
                ...item,
                title: formName.trim(),
                content: formContent.trim(),
                recipient: recipientType === 'all' ? '所有用户' : '部分长者用户',
                sendMethod: formMethod,
                sendTime: calculatedTime,
              }
            : item
        )
      );
      onNotice(`已更新消息【${formName.trim()}】`);
    } else {
      const newMsg: BroadcastMessage = {
        id: `msg-${Date.now()}`,
        sendTime: calculatedTime,
        title: formName.trim(),
        status: sendTimeType === 'now' ? '待发送' : '待发送',
        content: formContent.trim(),
        recipient: recipientType === 'all' ? '所有用户' : '部分长者用户',
        sendMethod: formMethod,
      };
      setMessages((prev) => [newMsg, ...prev]);
      onNotice(`已新增群发消息【${newMsg.title}】`);
    }

    setViewMode('list');
  };

  const handleBatchOperation = () => {
    if (selectedIds.length === 0) {
      onNotice('请先勾选需要批量操作的消息');
      return;
    }
    onNotice(`已对选中的 ${selectedIds.length} 条消息执行批量发送/撤回处理`);
  };

  const handleResetFilters = () => {
    setStatusFilter('all');
    setKeyword('');
    setCurrentPage(1);
    onNotice('已重置消息筛选条件');
  };

  // -------------------------------------------------------------
  // VIEW: CREATE / EDIT (Matches Screenshot 2)
  // -------------------------------------------------------------
  if (viewMode === 'create') {
    return (
      <div className="p-6 max-w-[1600px] mx-auto text-xs">
        <div className="bg-white rounded-xl p-8 border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-6">
          {/* Header indicator */}
          <div className="flex items-center space-x-2.5 pb-5 border-b border-gray-100">
            <span className="w-1 h-4 bg-[#10b981] rounded-full"></span>
            <h1 className="text-sm font-semibold text-gray-800">
              {editingMessage ? '编辑消息' : '新增消息'}
            </h1>
          </div>

          <form onSubmit={handleSaveMessage} className="space-y-6 max-w-2xl">
            {/* 消息名称 */}
            <div className="flex items-center">
              <label className="w-24 text-gray-600">
                <span className="text-red-500 mr-0.5">*</span>消息名称
              </label>
              <div className="flex-1">
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="请输入"
                  className="w-full max-w-sm px-3 py-2 border border-gray-200 rounded-md text-gray-800 focus:outline-none focus:border-[#10b981] text-xs placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* 接收人 */}
            <div className="flex items-center">
              <label className="w-24 text-gray-600">接收人</label>
              <div className="flex items-center space-x-6">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="recipient"
                    checked={recipientType === 'all'}
                    onChange={() => setRecipientType('all')}
                    className="text-[#10b981] accent-[#10b981]"
                  />
                  <span className="text-gray-700">全部用户</span>
                </label>
                <div className="flex items-center space-x-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="recipient"
                      checked={recipientType === 'part'}
                      onChange={() => setRecipientType('part')}
                      className="text-[#10b981] accent-[#10b981]"
                    />
                    <span className="text-gray-700">部分用户</span>
                  </label>
                  {recipientType === 'part' && (
                    <button
                      type="button"
                      onClick={() => onNotice('已弹出按标签/慢病维度选择长者对话框')}
                      className="text-[#10b981] hover:underline"
                    >
                      +选择用户
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* 插入商品链接 */}
            <div className="flex items-center">
              <label className="w-24 text-gray-600">插入商品链接</label>
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={insertProduct}
                  onChange={(e) => setInsertProduct(e.target.checked)}
                  className="rounded text-[#10b981] accent-[#10b981]"
                />
                <button
                  type="button"
                  onClick={() => {
                    setInsertProduct(true);
                    onNotice('已展开推荐适老服务商品目录');
                  }}
                  className="text-[#10b981] hover:underline"
                >
                  +选择商品
                </button>
              </div>
            </div>

            {/* 发送时间 */}
            <div className="flex items-start">
              <label className="w-24 pt-1.5 text-gray-600">发送时间</label>
              <div className="flex-1 space-y-3">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="sendTime"
                    checked={sendTimeType === 'now'}
                    onChange={() => setSendTimeType('now')}
                    className="text-[#10b981] accent-[#10b981]"
                  />
                  <span className="text-gray-700">立即发送</span>
                </label>

                <div className="flex items-center space-x-3">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="sendTime"
                      checked={sendTimeType === 'scheduled'}
                      onChange={() => setSendTimeType('scheduled')}
                      className="text-[#10b981] accent-[#10b981]"
                    />
                    <span className="text-gray-700">定时发布</span>
                  </label>

                  {/* Date Input */}
                  <div className="flex items-center border border-gray-200 rounded-md px-2.5 py-1.5 bg-white space-x-2">
                    <input
                      type="date"
                      value={scheduledDate}
                      onChange={(e) => setScheduledDate(e.target.value)}
                      disabled={sendTimeType !== 'scheduled'}
                      className="text-gray-700 focus:outline-none text-xs disabled:bg-gray-50"
                    />
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                  </div>

                  {/* Time Input */}
                  <div className="flex items-center border border-gray-200 rounded-md px-2.5 py-1.5 bg-white space-x-1.5">
                    <input
                      type="text"
                      value={scheduledHour}
                      onChange={(e) => setScheduledHour(e.target.value)}
                      disabled={sendTimeType !== 'scheduled'}
                      className="w-6 text-center text-xs text-gray-700 focus:outline-none"
                    />
                    <span className="text-gray-400">:</span>
                    <input
                      type="text"
                      value={scheduledMinute}
                      onChange={(e) => setScheduledMinute(e.target.value)}
                      disabled={sendTimeType !== 'scheduled'}
                      className="w-6 text-center text-xs text-gray-700 focus:outline-none"
                    />
                    <Clock className="w-3.5 h-3.5 text-gray-400 ml-1" />
                  </div>
                </div>
              </div>
            </div>

            {/* 消息内容 */}
            <div className="flex items-start">
              <label className="w-24 pt-2 text-gray-600">
                <span className="text-red-500 mr-0.5">*</span>消息内容
              </label>
              <div className="flex-1">
                <textarea
                  rows={4}
                  value={formContent}
                  onChange={(e) => setFormContent(e.target.value)}
                  placeholder="请输入"
                  className="w-full max-w-xl p-3 border border-gray-200 rounded-md text-gray-800 focus:outline-none focus:border-[#10b981] text-xs placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* 发送方式 */}
            <div className="flex items-center">
              <label className="w-24 text-gray-600">发送方式</label>
              <div className="flex items-center space-x-6">
                {(['系统消息', '短信', '会话消息'] as const).map((method) => (
                  <label key={method} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="sendMethod"
                      checked={formMethod === method}
                      onChange={() => setFormMethod(method)}
                      className="text-[#10b981] accent-[#10b981]"
                    />
                    <span className="text-gray-700">{method}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Form Actions: 保存 / 返回 */}
            <div className="pt-6 border-t border-gray-100 flex items-center space-x-3">
              <button
                type="submit"
                className="px-6 py-2 bg-[#10b981] text-white rounded-md hover:bg-[#059669] font-medium transition-colors"
              >
                保存
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className="px-6 py-2 bg-white border border-gray-200 text-gray-700 rounded-md hover:bg-gray-50 font-medium transition-colors"
              >
                返回
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // VIEW: LIST (Matches Screenshot 1)
  // -------------------------------------------------------------
  return (
    <div className="p-6 max-w-[1600px] mx-auto text-xs space-y-4">
      {/* Top Filter Card */}
      <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-4">
        {/* Title */}
        <div className="flex items-center space-x-2 pb-2">
          <span className="w-1.5 h-4 bg-[#10b981] rounded-full"></span>
          <h1 className="text-sm font-semibold text-gray-800">消息群发</h1>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center space-x-2">
            <span className="text-gray-500 whitespace-nowrap">状态</span>
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="appearance-none bg-white border border-gray-200 rounded-md px-3 py-1.5 pr-8 text-xs text-gray-700 focus:outline-none focus:border-[#10b981]"
              >
                <option value="all">请选择</option>
                <option value="待发送">待发送</option>
                <option value="已发送">已发送</option>
                <option value="发送中">发送中</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-2.5 pointer-events-none" />
            </div>
          </div>

          <div className="flex items-center flex-1 max-w-sm">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="请输入关键字"
              className="w-full border border-gray-200 rounded-md px-3 py-1.5 text-xs text-gray-700 focus:outline-none focus:border-[#10b981] placeholder:text-gray-400"
            />
          </div>

          {/* Search Button */}
          <button
            type="button"
            onClick={() => onNotice(`已检索到 ${filteredMessages.length} 条群发消息`)}
            className="w-8 h-8 rounded-md bg-[#10b981] hover:bg-[#059669] text-white flex items-center justify-center transition-colors"
            title="搜索"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Reset Button */}
          <button
            type="button"
            onClick={handleResetFilters}
            className="w-8 h-8 rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50 flex items-center justify-center transition-colors"
            title="重置"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-4">
        {/* Actions: 新增 / 批量操作 */}
        <div className="flex items-center justify-end space-x-2.5">
          <button
            type="button"
            onClick={handleOpenCreate}
            className="px-4 py-1.5 bg-[#10b981] hover:bg-[#059669] text-white rounded-md font-medium transition-colors"
          >
            新增
          </button>
          <button
            type="button"
            onClick={handleBatchOperation}
            className="px-4 py-1.5 border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-md font-medium transition-colors"
          >
            批量操作
          </button>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-gray-500 font-normal">
                <th className="py-3 px-4 font-normal text-gray-600">发送时间</th>
                <th className="py-3 px-4 font-normal text-gray-600">消息标题</th>
                <th className="py-3 px-4 font-normal text-gray-600">状态</th>
                <th className="py-3 px-4 font-normal text-gray-600">报告类型</th>
                <th className="py-3 px-4 font-normal text-gray-600">接收人</th>
                <th className="py-3 px-4 font-normal text-gray-600">发送方式</th>
                <th className="py-3 px-4 font-normal text-gray-600 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {paginatedMessages.map((msg) => {
                const isSelected = selectedIds.includes(msg.id);
                return (
                  <tr
                    key={msg.id}
                    className={`hover:bg-gray-50/70 transition-colors ${
                      isSelected ? 'bg-emerald-50/20' : ''
                    }`}
                  >
                    <td className="py-3.5 px-4 text-gray-600 font-mono">{msg.sendTime}</td>
                    <td className="py-3.5 px-4 font-medium text-gray-800">{msg.title}</td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center text-cyan-500 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full mr-1.5 bg-cyan-400"></span>
                        {msg.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-gray-600 max-w-md line-clamp-2">
                      {msg.content}
                    </td>
                    <td className="py-3.5 px-4 text-gray-600">{msg.recipient}</td>
                    <td className="py-3.5 px-4 text-gray-600">{msg.sendMethod}</td>
                    <td className="py-3.5 px-4 text-right space-x-3">
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(msg)}
                        className="text-[#10b981] hover:underline"
                      >
                        编辑
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(msg)}
                        className="text-red-500 hover:underline"
                      >
                        删除
                      </button>
                    </td>
                  </tr>
                );
              })}
              {paginatedMessages.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-gray-400">
                    暂无匹配的群发消息记录
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 text-xs text-gray-500">
          <div>
            共 <span className="font-semibold text-gray-800">{filteredMessages.length}</span> 条
          </div>
          <div className="flex items-center space-x-2">
            <span>每页 10 条</span>
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="p-1 rounded hover:bg-gray-100 disabled:opacity-30"
            >
              <ChevronsLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1 rounded hover:bg-gray-100 disabled:opacity-30"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-6 h-6 rounded text-xs flex items-center justify-center font-medium ${
                  currentPage === page
                    ? 'bg-[#10b981] text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1 rounded hover:bg-gray-100 disabled:opacity-30"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="p-1 rounded hover:bg-gray-100 disabled:opacity-30"
            >
              <ChevronsRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
