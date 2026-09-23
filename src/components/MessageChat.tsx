import React, { useState, useMemo } from 'react';
import {
  Search,
  LogOut,
  Send,
  User,
  ShoppingBag,
  ExternalLink,
  ChevronRight,
  Clock,
  CheckCircle2,
} from 'lucide-react';

interface ChatContact {
  id: string;
  name: string;
  nickname: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unreadCount?: number;
  tags: string[];
  totalOrders: number;
  totalSpent: string;
  orders: {
    id: string;
    status: string;
    title: string;
    orderTime: string; // 2026-09-15 14:12:07 (descending)
    amount: string;
    image: string;
  }[];
}

interface ChatMessage {
  id: string;
  sender: 'staff' | 'user';
  time: string;
  text?: string;
  productCard?: {
    title: string;
    price: string;
    image: string;
  };
}

const INITIAL_CONTACTS: ChatContact[] = [
  {
    id: 'contact-01',
    name: '小王',
    nickname: '笑看人生',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80',
    lastMessage: '您好',
    time: '09:09',
    unreadCount: 3,
    tags: ['高血压', '糖尿病', '多次购买'],
    totalOrders: 3,
    totalSpent: '1004.00',
    orders: [
      {
        id: 'ord-01',
        status: '已完成',
        title: '日常清洁 2小时1人急速清洁全...',
        orderTime: '2026-09-15 14:12:07',
        amount: '300.00',
        image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=120&q=80',
      },
      {
        id: 'ord-02',
        status: '已完成',
        title: '居家助浴 适老专业洗护防滑指导...',
        orderTime: '2026-09-12 14:12:07',
        amount: '300.00',
        image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=120&q=80',
      },
      {
        id: 'ord-03',
        status: '已完成',
        title: '慢病随访 血糖血压多导监测服务...',
        orderTime: '2026-09-08 10:20:15',
        amount: '404.00',
        image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=120&q=80',
      },
    ],
  },
  {
    id: 'contact-02',
    name: '刘小华',
    nickname: '清风徐来',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80',
    lastMessage: '请问您要咨询什么问题呢？',
    time: '09:09',
    tags: ['骨质疏松', '防跌倒特护'],
    totalOrders: 2,
    totalSpent: '598.00',
    orders: [
      {
        id: 'ord-04',
        status: '已完成',
        title: '防跌倒评估 卫生间安全扶手安装...',
        orderTime: '2026-09-17 11:30:00',
        amount: '299.00',
        image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=120&q=80',
      },
      {
        id: 'ord-05',
        status: '已完成',
        title: '长者骨密度超声筛查上门服务...',
        orderTime: '2026-09-10 16:00:00',
        amount: '299.00',
        image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=120&q=80',
      },
    ],
  },
  {
    id: 'contact-03',
    name: '赵丽珍',
    nickname: '夕阳红霞',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    lastMessage: '299元',
    time: '09:09',
    tags: ['冠心病', '高龄独居'],
    totalOrders: 1,
    totalSpent: '299.00',
    orders: [
      {
        id: 'ord-06',
        status: '已完成',
        title: '动态心电图监测 48小时居家佩戴...',
        orderTime: '2026-09-16 09:45:10',
        amount: '299.00',
        image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=120&q=80',
      },
    ],
  },
  {
    id: 'contact-04',
    name: '王小倩',
    nickname: '知足常乐',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    lastMessage: '好的',
    time: '09:09',
    tags: ['脑梗恢复期', '长护险定点'],
    totalOrders: 4,
    totalSpent: '1680.00',
    orders: [
      {
        id: 'ord-07',
        status: '已完成',
        title: '偏瘫肢体被动康复理疗上门指导...',
        orderTime: '2026-09-18 15:20:00',
        amount: '450.00',
        image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=120&q=80',
      },
      {
        id: 'ord-08',
        status: '已完成',
        title: '智能防走失定位手环配置与绑定...',
        orderTime: '2026-09-13 10:15:00',
        amount: '380.00',
        image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=120&q=80',
      },
    ],
  },
];

const SAMPLE_PRODUCTS = [
  {
    id: 'prod-01',
    title: '日常清洁 2小时1人急速清洁全...',
    price: '599.00',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=120&q=80',
  },
  {
    id: 'prod-02',
    title: '助医陪诊 半日门诊专人全程陪护...',
    price: '299.00',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=120&q=80',
  },
  {
    id: 'prod-03',
    title: '适老化上门助浴与防跌倒环境评估...',
    price: '199.00',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=120&q=80',
  },
  {
    id: 'prod-04',
    title: '家庭医生慢病季度健康照护卡...',
    price: '880.00',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=120&q=80',
  },
  {
    id: 'prod-05',
    title: '智能生命体征监测床垫租赁服务...',
    price: '360.00',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=120&q=80',
  },
  {
    id: 'prod-06',
    title: '康复师上门脑梗偏瘫肢体运动指导...',
    price: '450.00',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=120&q=80',
  },
];

interface MessageChatProps {
  onNotice: (msg: string) => void;
}

export const MessageChat: React.FC<MessageChatProps> = ({ onNotice }) => {
  const [contacts, setContacts] = useState<ChatContact[]>(INITIAL_CONTACTS);
  const [selectedContactId, setSelectedContactId] = useState<string>('contact-01');
  const [rightPanelTab, setRightPanelTab] = useState<'profile' | 'products'>('profile');
  const [searchContact, setSearchContact] = useState('');
  const [searchProduct, setSearchProduct] = useState('');
  const [inputText, setInputText] = useState('');

  // Conversation history mapped per contact
  const [messagesMap, setMessagesMap] = useState<Record<string, ChatMessage[]>>({
    'contact-01': [
      { id: 'm1', sender: 'staff', time: '10:10', text: '您好！' },
      { id: 'm2', sender: 'user', time: '10:10', text: '请问康复项目适合多大年龄的老人？' },
      { id: 'm3', sender: 'staff', time: '10:10', text: '60-80岁' },
    ],
    'contact-02': [
      { id: 'm4', sender: 'staff', time: '09:09', text: '您好，这里是康养医护中心客服，请问您要咨询什么问题呢？' },
    ],
    'contact-03': [
      { id: 'm5', sender: 'user', time: '09:09', text: '请问动态心电图预约费用是多少？' },
      { id: 'm6', sender: 'staff', time: '09:09', text: '299元' },
    ],
    'contact-04': [
      { id: 'm7', sender: 'staff', time: '09:08', text: '明天上午9点护工刘师傅将上门协助康复训练，请您做好准备。' },
      { id: 'm8', sender: 'user', time: '09:09', text: '好的' },
    ],
  });

  const currentContact = useMemo(() => {
    return contacts.find((c) => c.id === selectedContactId) || contacts[0];
  }, [contacts, selectedContactId]);

  const currentMessages = useMemo(() => {
    return messagesMap[currentContact.id] || [];
  }, [messagesMap, currentContact.id]);

  const filteredContacts = useMemo(() => {
    if (!searchContact.trim()) return contacts;
    const q = searchContact.toLowerCase();
    return contacts.filter(
      (c) => c.name.toLowerCase().includes(q) || c.nickname.toLowerCase().includes(q)
    );
  }, [contacts, searchContact]);

  const filteredProducts = useMemo(() => {
    if (!searchProduct.trim()) return SAMPLE_PRODUCTS;
    const q = searchProduct.toLowerCase();
    return SAMPLE_PRODUCTS.filter((p) => p.title.toLowerCase().includes(q));
  }, [searchProduct]);

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg: ChatMessage = {
      id: `m-${Date.now()}`,
      sender: 'staff',
      time: '10:12',
      text: inputText.trim(),
    };

    setMessagesMap((prev) => ({
      ...prev,
      [currentContact.id]: [...(prev[currentContact.id] || []), newMsg],
    }));

    setInputText('');
    onNotice(`已发送回复给【${currentContact.name}】`);
  };

  const handleSendProduct = (prod: (typeof SAMPLE_PRODUCTS)[0]) => {
    const newMsg: ChatMessage = {
      id: `m-${Date.now()}`,
      sender: 'staff',
      time: '10:12',
      productCard: {
        title: prod.title,
        price: prod.price,
        image: prod.image,
      },
    };

    setMessagesMap((prev) => ({
      ...prev,
      [currentContact.id]: [...(prev[currentContact.id] || []), newMsg],
    }));

    onNotice(`已向【${currentContact.name}】推荐商品《${prod.title}》`);
  };

  const handleEndSession = () => {
    onNotice(`已结束与【${currentContact.name} (${currentContact.nickname})】的会话服务`);
  };

  return (
    <div className="p-6 max-w-[1600px] mx-auto text-xs">
      <div className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col h-[780px]">
        {/* Top Bar (Matches Screenshot 3: 会话 / [昵称] / 结束会话 / 客户资料-商品列表) */}
        <div className="px-6 py-3.5 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-4 bg-[#10b981] rounded-full"></span>
            <h1 className="text-sm font-semibold text-gray-800">会话</h1>
          </div>

          <div className="font-semibold text-gray-800 text-sm">{currentContact.nickname}</div>

          <div className="flex items-center space-x-6">
            <button
              type="button"
              onClick={handleEndSession}
              className="flex items-center space-x-1 text-[#10b981] hover:text-[#059669] font-medium"
            >
              <LogOut className="w-4 h-4" />
              <span>结束会话</span>
            </button>

            {/* Right Panel Tabs */}
            <div className="flex items-center space-x-6 border-l border-gray-100 pl-6">
              <button
                type="button"
                onClick={() => setRightPanelTab('profile')}
                className={`pb-1 font-medium transition-colors relative ${
                  rightPanelTab === 'profile'
                    ? 'text-[#10b981]'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                客户资料
                {rightPanelTab === 'profile' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#10b981] rounded-full"></span>
                )}
              </button>

              <button
                type="button"
                onClick={() => setRightPanelTab('products')}
                className={`pb-1 font-medium transition-colors relative ${
                  rightPanelTab === 'products'
                    ? 'text-[#10b981]'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                商品列表
                {rightPanelTab === 'products' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#10b981] rounded-full"></span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* 3-Column Layout */}
        <div className="flex-1 flex overflow-hidden">
          {/* Column 1: Contacts List */}
          <div className="w-64 border-r border-gray-100 flex flex-col bg-white">
            {/* Search */}
            <div className="p-3 border-b border-gray-100">
              <div className="relative">
                <input
                  type="text"
                  value={searchContact}
                  onChange={(e) => setSearchContact(e.target.value)}
                  placeholder="搜索会话"
                  className="w-full pl-3 pr-8 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#10b981]"
                />
                <Search className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-2.5" />
              </div>
            </div>

            {/* Contacts */}
            <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
              {filteredContacts.map((c) => {
                const isActive = c.id === currentContact.id;
                return (
                  <div
                    key={c.id}
                    onClick={() => {
                      setSelectedContactId(c.id);
                      onNotice(`已切换至与长者【${c.name}】的会话`);
                    }}
                    className={`p-3 flex items-center space-x-3 cursor-pointer transition-colors ${
                      isActive ? 'bg-emerald-50/40' : 'hover:bg-gray-50'
                    }`}
                  >
                    <img
                      src={c.avatar}
                      alt={c.name}
                      className="w-10 h-10 rounded-full object-cover border border-gray-100 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-gray-800 truncate">{c.name}</span>
                        <span className="text-[10px] text-gray-400">{c.time}</span>
                      </div>
                      <div className="flex items-center justify-between mt-0.5">
                        <p className="text-gray-500 truncate text-[11px]">{c.lastMessage}</p>
                        {c.unreadCount && (
                          <span className="w-4 h-4 bg-red-500 text-white rounded-full text-[10px] flex items-center justify-center font-semibold">
                            {c.unreadCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Column 2: Chat Conversation Area (Middle) */}
          <div className="flex-1 flex flex-col bg-[#fafbfc]">
            {/* Messages Scroll Area */}
            <div className="flex-1 p-6 overflow-y-auto space-y-5">
              <div className="text-center">
                <span className="inline-block px-3 py-0.5 bg-gray-200/60 rounded-full text-[10px] text-gray-500 font-mono">
                  10:10
                </span>
              </div>

              {currentMessages.map((msg) => {
                if (msg.sender === 'user') {
                  return (
                    <div key={msg.id} className="flex items-start justify-end space-x-3">
                      <div className="max-w-md bg-[#10b981] text-white px-4 py-2.5 rounded-2xl rounded-tr-sm text-xs leading-relaxed shadow-sm">
                        {msg.text}
                      </div>
                      <img
                        src={currentContact.avatar}
                        alt={currentContact.name}
                        className="w-8 h-8 rounded-full object-cover border border-gray-100 flex-shrink-0"
                      />
                    </div>
                  );
                }

                // Staff / Doctor Bubble
                return (
                  <div key={msg.id} className="flex items-start space-x-3">
                    <img
                      src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=120&q=80"
                      alt="Doctor"
                      className="w-8 h-8 rounded-full object-cover border border-gray-100 flex-shrink-0"
                    />
                    <div className="space-y-1 max-w-md">
                      {msg.text && (
                        <div className="bg-white border border-gray-100 text-gray-800 px-4 py-2.5 rounded-2xl rounded-tl-sm text-xs leading-relaxed shadow-sm">
                          {msg.text}
                        </div>
                      )}
                      {msg.productCard && (
                        <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm flex items-center space-x-3 max-w-sm">
                          <img
                            src={msg.productCard.image}
                            alt={msg.productCard.title}
                            className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-gray-800 truncate">
                              {msg.productCard.title}
                            </p>
                            <p className="text-emerald-600 font-bold mt-1 font-mono">
                              ¥{msg.productCard.price}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Input Bar */}
            <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-100">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="请输入"
                  className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-800 focus:outline-none focus:border-[#10b981] focus:bg-white placeholder-gray-400"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className="px-5 py-2.5 bg-[#10b981] hover:bg-[#059669] text-white rounded-lg font-medium transition-colors disabled:opacity-40 flex items-center space-x-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>发送</span>
                </button>
              </div>
            </form>
          </div>

          {/* Column 3: Right Panel (客户资料 OR 商品列表) */}
          <div className="w-80 border-l border-gray-100 bg-white flex flex-col">
            {/* VIEW 1: 客户资料 (Screenshot 3) */}
            {rightPanelTab === 'profile' && (
              <div className="p-4 space-y-5 overflow-y-auto flex-1">
                {/* Profile Header Card */}
                <div className="flex items-center space-x-3 pb-4 border-b border-gray-100">
                  <img
                    src={currentContact.avatar}
                    alt={currentContact.name}
                    className="w-12 h-12 rounded-full object-cover border border-gray-100 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-gray-800 text-sm">
                        {currentContact.name}
                      </span>
                      <button
                        type="button"
                        onClick={() => onNotice(`已调阅长者【${currentContact.name}】的完整健康档案`)}
                        className="text-[#10b981] text-xs hover:underline"
                      >
                        查看资料
                      </button>
                    </div>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {currentContact.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-emerald-50 text-[#10b981] border border-emerald-100 rounded text-[10px]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-2 text-center py-2 bg-gray-50/70 rounded-lg">
                  <div>
                    <div className="text-[11px] text-gray-400">累计订单数</div>
                    <div className="text-sm font-bold text-gray-800 font-mono mt-0.5">
                      {currentContact.orders.length}
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] text-gray-400">累计消费金额 (元)</div>
                    <div className="text-sm font-bold text-gray-800 font-mono mt-0.5">
                      {currentContact.totalSpent}
                    </div>
                  </div>
                </div>

                {/* 订单列表 (Strictly descending dates within 2026-09 to 2026-09-19) */}
                <div className="space-y-3">
                  <div className="text-xs font-semibold text-gray-800">
                    订单列表 ({currentContact.orders.length})
                  </div>

                  <div className="space-y-2.5">
                    {currentContact.orders.map((ord) => (
                      <div
                        key={ord.id}
                        className="border border-gray-100 rounded-lg p-3 bg-gray-50/40 space-y-2"
                      >
                        <div className="text-[11px] text-gray-500 font-medium">
                          {ord.status}
                        </div>
                        <div className="flex items-center space-x-2.5">
                          <img
                            src={ord.image}
                            alt={ord.title}
                            className="w-12 h-12 rounded object-cover flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-800 truncate text-[11px]">
                              {ord.title}
                            </p>
                            <button
                              type="button"
                              onClick={() => onNotice(`正在查看订单明细【${ord.id}】`)}
                              className="text-[#10b981] text-[10px] hover:underline mt-0.5"
                            >
                              订单详情
                            </button>
                          </div>
                        </div>
                        <div className="text-[10px] text-gray-400 font-mono">
                          下单时间: {ord.orderTime}
                        </div>
                        <div className="text-[10px] text-gray-700 font-mono">
                          订单金额: {ord.amount}元
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* VIEW 2: 商品列表 (Screenshot 4) */}
            {rightPanelTab === 'products' && (
              <div className="flex flex-col flex-1 overflow-hidden">
                {/* Product Search */}
                <div className="p-3 border-b border-gray-100">
                  <div className="relative">
                    <input
                      type="text"
                      value={searchProduct}
                      onChange={(e) => setSearchProduct(e.target.value)}
                      placeholder="搜索商品"
                      className="w-full pl-3 pr-8 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#10b981]"
                    />
                    <Search className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-2.5" />
                  </div>
                </div>

                {/* Product List */}
                <div className="p-3 space-y-3 overflow-y-auto flex-1">
                  {filteredProducts.map((prod) => (
                    <div
                      key={prod.id}
                      className="border border-gray-100 rounded-lg p-2.5 bg-white hover:border-gray-200 transition-colors flex items-center space-x-2.5"
                    >
                      <img
                        src={prod.image}
                        alt={prod.title}
                        className="w-14 h-14 rounded object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-800 truncate text-[11px]">
                          {prod.title}
                        </p>
                        <div className="flex items-center justify-between mt-1.5">
                          <span className="text-[#10b981] font-bold font-mono text-xs">
                            ¥{prod.price}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleSendProduct(prod)}
                            className="px-2.5 py-1 bg-[#10b981] hover:bg-[#059669] text-white rounded text-[11px] font-medium transition-colors"
                          >
                            发送
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
