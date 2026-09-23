export interface ReportRecord {
  id: string;
  uploadTime: string; // 2026-09-19 14:20
  name: string;
  type: string; // 体检报告 | 随访报告 | 检验报告 | 影像检查 | 专科筛查
  source: string; // 后台上传 | 合作医院推送 | 智能设备同步 | 门诊就诊导入
  uploader: string; // 李明明 | 张玉婷 | 系统自动同步 | 赵全科
  workOrderNo: string; // GD2026091900018
  reportDate: string; // 2026-09-19
}

export interface OrderItem {
  id: string;
  orderNo: string;
  orderTime: string; // 2026-09-19 15:30:10
  closeTime?: string;
  serviceType: string;
  productName: string;
  productImage: string;
  price: number;
  discount: number;
  actualAmount: number;
  buyer: {
    name: string;
    nickname: string;
    avatar: string;
    phone: string;
    maskedPhone: string;
    idCard: string;
    userNo: string;
    registerTime: string;
    registerType: string;
    lastLoginTime: string;
    lastBuyTime: string;
    remarks: string;
  };
  status: '已关闭' | '已完成' | '服务中' | '待服务';
  closeReason?: string;
  payMethod: string;
  orderSource: string;
  appointment: {
    address: string;
    time: string;
    duration: string;
    phone: string;
  };
}

export interface CouponItem {
  id: string;
  name: string;
  status: '未使用' | '已使用' | '已过期';
  content: string; // ¥20 满200元可用
  scope: string; // 全部商品 | 护理服务 | 康复理疗
  receiveTime: string;
  expireTime: string;
}

export interface PointsItem {
  id: string;
  type: '收入' | '支出';
  amount: number;
  reason: string;
  remark: string;
  operator: string;
  time: string;
}

export interface GrowthItem {
  id: string;
  type: '收入' | '支出';
  amount: number;
  reason: string;
  remark: string;
  operator: string;
  time: string;
}

export interface ContentItem {
  id: string;
  text: string;
  image: string;
  topic: string;
  likes: number;
  favorites: number;
  shares: number;
  comments: number;
  publishTime: string;
  status: boolean; // true = 显示, false = 隐藏
}

export interface ServiceStaff {
  id: string;
  name: string;
  code: string;
  area: string;
  phone: string;
  status: '空闲' | '服务中';
  avatar: string;
}

export interface ServiceRecordItem {
  id: string;
  workOrderNo: string;
  orderNo: string;
  orderInfo: {
    title: string;
    price: number;
    discount: number;
    actualAmount: number;
    payMethod: string;
    orderTime: string;
    image: string;
  };
  serviceItem: string;
  status: '服务中' | '已完成' | '待派单';
  actualAmount: number;
  staff: string;
  dispatchTime: string;
  customer: {
    name: string;
    userNo: string;
    phone: string;
    maskedPhone: string;
    registerTime: string;
    registerType: string;
    lastLoginTime: string;
    lastBuyTime: string;
    remarks: string;
    avatar: string;
  };
  serviceArea: string;
  address: string;
  source: string;
  dispatcher: string;
  appointmentTime: string;
  duration: string;
  actualServiceTime: string;
  staffDetail: {
    name: string;
    phone: string;
  };
  estimatedCommission: number;
}

// 报告信息列表（严格从 2026-09-19 降序至 2026-09-02，每条内容各不相同）
export const INITIAL_REPORTS: ReportRecord[] = [
  {
    id: 'rep-01',
    uploadTime: '2026-09-19 14:20',
    name: '颈动脉彩色多普勒超声检查',
    type: '影像检查',
    source: '后台上传',
    uploader: '李明明',
    workOrderNo: 'GD2026091900018',
    reportDate: '2026-09-19',
  },
  {
    id: 'rep-02',
    uploadTime: '2026-09-18 10:23',
    name: '常规血脂生化四项检查',
    type: '体检报告',
    source: '后台上传',
    uploader: '李明明',
    workOrderNo: 'GD2026091800013',
    reportDate: '2026-09-18',
  },
  {
    id: 'rep-03',
    uploadTime: '2026-09-17 15:45',
    name: '糖化血红蛋白与空腹血糖检测',
    type: '化验报告',
    source: '合作医院推送',
    uploader: '张玉婷',
    workOrderNo: 'GD2026091700022',
    reportDate: '2026-09-17',
  },
  {
    id: 'rep-04',
    uploadTime: '2026-09-16 09:30',
    name: '24小时动态心电图监测分析报告',
    type: '专科筛查',
    source: '智能设备同步',
    uploader: '系统自动同步',
    workOrderNo: 'GD2026091600007',
    reportDate: '2026-09-16',
  },
  {
    id: 'rep-05',
    uploadTime: '2026-09-14 16:10',
    name: '长者骨密度与跌倒风险综合评估',
    type: '随访报告',
    source: '后台上传',
    uploader: '赵全科',
    workOrderNo: 'GD2026091400035',
    reportDate: '2026-09-14',
  },
  {
    id: 'rep-06',
    uploadTime: '2026-09-11 11:15',
    name: '肝功能与电解质生化全套',
    type: '检验报告',
    source: '门诊就诊导入',
    uploader: '李明明',
    workOrderNo: 'GD2026091100012',
    reportDate: '2026-09-11',
  },
  {
    id: 'rep-07',
    uploadTime: '2026-09-08 08:50',
    name: '慢病月度全面随访健康报告',
    type: '随访报告',
    source: '后台上传',
    uploader: '张玉婷',
    workOrderNo: 'GD2026090800004',
    reportDate: '2026-09-08',
  },
  {
    id: 'rep-08',
    uploadTime: '2026-09-03 14:05',
    name: '头部头颅CT平扫检查报告',
    type: '影像检查',
    source: '合作医院推送',
    uploader: '刘伟',
    workOrderNo: 'GD2026090300019',
    reportDate: '2026-09-03',
  },
];

// 订单信息列表（严格从 2026-09-19 降序至 2026-09-03，每条服务各不相同）
export const INITIAL_ORDERS: OrderItem[] = [
  {
    id: 'ord-01',
    orderNo: '2400126679',
    orderTime: '2026-09-19 15:30:10',
    serviceType: '康复理疗',
    productName: '脑中风术后肢体运动功能康复松动训练套餐',
    productImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=240&q=80',
    price: 399.00,
    discount: 99.00,
    actualAmount: 300.00,
    buyer: {
      name: '王强',
      nickname: '小王',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=160&q=80',
      phone: '19233664486',
      maskedPhone: '192****4486',
      idCard: '36909919470520289X',
      userNo: '202409000001',
      registerTime: '2026-09-01 10:33:24',
      registerType: '平台系统注册',
      lastLoginTime: '2026-09-19 10:33:24',
      lastBuyTime: '2026-09-19 15:30:10',
      remarks: '术后恢复良好，需协助肌力渐进抗阻与平衡练习。',
    },
    status: '服务中',
    payMethod: '支付宝',
    orderSource: '平台系统',
    appointment: {
      address: '徐汇区黎梅花园88栋3单元101',
      time: '2026-09-19 16:00:00',
      duration: '2小时',
      phone: '19256784886',
    },
  },
  {
    id: 'ord-02',
    orderNo: '2400126675',
    orderTime: '2026-09-18 14:12:07',
    serviceType: '日常保洁',
    productName: '日常清洁 2小时1人急速清洁全程质保',
    productImage: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=240&q=80',
    price: 300.00,
    discount: 0.00,
    actualAmount: 300.00,
    buyer: {
      name: '王强',
      nickname: '小王',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=160&q=80',
      phone: '19233664486',
      maskedPhone: '192****4486',
      idCard: '36909919470520289X',
      userNo: '202409000001',
      registerTime: '2026-09-01 10:33:24',
      registerType: '平台系统注册',
      lastLoginTime: '2026-09-19 10:33:24',
      lastBuyTime: '2026-09-18 14:12:07',
      remarks: '重点打扫卫生间与卧室，注意保持地面防滑干爽。',
    },
    status: '已完成',
    payMethod: '支付宝',
    orderSource: '平台系统',
    appointment: {
      address: '徐汇区黎梅花园88栋3单元101',
      time: '2026-09-18 15:00:00',
      duration: '2小时',
      phone: '19256784886',
    },
  },
  {
    id: 'ord-03',
    orderNo: '2400126670',
    orderTime: '2026-09-16 14:12:07',
    closeTime: '2026-09-16 15:12:07',
    serviceType: '日常保洁',
    productName: '日常清洁 2小时1人急速清洁全程质保',
    productImage: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=240&q=80',
    price: 399.00,
    discount: 99.00,
    actualAmount: 300.00,
    buyer: {
      name: '王强',
      nickname: '小王',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=160&q=80',
      phone: '19233664486',
      maskedPhone: '192****4486',
      idCard: '36909919470520289X',
      userNo: '202409000001',
      registerTime: '2026-09-01 10:33:24',
      registerType: '平台系统注册',
      lastLoginTime: '2026-09-19 10:33:24',
      lastBuyTime: '2026-09-18 14:12:07',
      remarks: '超时未付款自动取消，长者后续改由家属协助代订。',
    },
    status: '已关闭',
    closeReason: '支付超时，订单关闭',
    payMethod: '支付宝',
    orderSource: '平台系统',
    appointment: {
      address: '徐汇区黎梅花园88栋3单元101',
      time: '2026-09-17 14:12:07',
      duration: '2小时',
      phone: '19256784886',
    },
  },
  {
    id: 'ord-04',
    orderNo: '2400126662',
    orderTime: '2026-09-14 09:25:40',
    serviceType: '上门助浴',
    productName: '专业上门助浴与全身防褥疮温水擦拭护理',
    productImage: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=240&q=80',
    price: 220.00,
    discount: 40.00,
    actualAmount: 180.00,
    buyer: {
      name: '王强',
      nickname: '小王',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=160&q=80',
      phone: '19233664486',
      maskedPhone: '192****4486',
      idCard: '36909919470520289X',
      userNo: '202409000001',
      registerTime: '2026-09-01 10:33:24',
      registerType: '平台系统注册',
      lastLoginTime: '2026-09-19 10:33:24',
      lastBuyTime: '2026-09-18 14:12:07',
      remarks: '注意保暖防滑，洗浴过程全程监测心率血氧。',
    },
    status: '已完成',
    payMethod: '长护险补贴',
    orderSource: '平台系统',
    appointment: {
      address: '徐汇区黎梅花园88栋3单元101',
      time: '2026-09-14 10:00:00',
      duration: '1.5小时',
      phone: '19256784886',
    },
  },
  {
    id: 'ord-05',
    orderNo: '2400126658',
    orderTime: '2026-09-11 16:40:12',
    serviceType: '适老改造',
    productName: '独居长者居室卫生间防滑地垫与安全扶手改造',
    productImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=240&q=80',
    price: 450.00,
    discount: 90.00,
    actualAmount: 360.00,
    buyer: {
      name: '王强',
      nickname: '小王',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=160&q=80',
      phone: '19233664486',
      maskedPhone: '192****4486',
      idCard: '36909919470520289X',
      userNo: '202409000001',
      registerTime: '2026-09-01 10:33:24',
      registerType: '平台系统注册',
      lastLoginTime: '2026-09-19 10:33:24',
      lastBuyTime: '2026-09-18 14:12:07',
      remarks: '马桶旁加装折叠扶手，淋浴区增设一字型不锈钢防滑扶手。',
    },
    status: '已完成',
    payMethod: '微信支付',
    orderSource: '平台系统',
    appointment: {
      address: '徐汇区黎梅花园88栋3单元101',
      time: '2026-09-12 09:30:00',
      duration: '2.5小时',
      phone: '19256784886',
    },
  },
  {
    id: 'ord-06',
    orderNo: '2400126649',
    orderTime: '2026-09-08 11:15:30',
    serviceType: '慢病护理',
    productName: '慢病专属上门采血与健康建档全面评估套餐',
    productImage: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=240&q=80',
    price: 150.00,
    discount: 30.00,
    actualAmount: 120.00,
    buyer: {
      name: '王强',
      nickname: '小王',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=160&q=80',
      phone: '19233664486',
      maskedPhone: '192****4486',
      idCard: '36909919470520289X',
      userNo: '202409000001',
      registerTime: '2026-09-01 10:33:24',
      registerType: '平台系统注册',
      lastLoginTime: '2026-09-19 10:33:24',
      lastBuyTime: '2026-09-18 14:12:07',
      remarks: '采血化验空腹血糖与甘油三酯指标。',
    },
    status: '已完成',
    payMethod: '余额支付',
    orderSource: '平台系统',
    appointment: {
      address: '徐汇区黎梅花园88栋3单元101',
      time: '2026-09-08 14:00:00',
      duration: '1小时',
      phone: '19256784886',
    },
  },
  {
    id: 'ord-07',
    orderNo: '2400126631',
    orderTime: '2026-09-03 14:20:00',
    serviceType: '日常保洁',
    productName: '长者居室厨房油烟重垢深度保洁保养',
    productImage: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=240&q=80',
    price: 260.00,
    discount: 60.00,
    actualAmount: 200.00,
    buyer: {
      name: '王强',
      nickname: '小王',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=160&q=80',
      phone: '19233664486',
      maskedPhone: '192****4486',
      idCard: '36909919470520289X',
      userNo: '202409000001',
      registerTime: '2026-09-01 10:33:24',
      registerType: '平台系统注册',
      lastLoginTime: '2026-09-19 10:33:24',
      lastBuyTime: '2026-09-18 14:12:07',
      remarks: '灶台油烟机彻底拆洗，消除安全隐患。',
    },
    status: '已完成',
    payMethod: '微信支付',
    orderSource: '平台系统',
    appointment: {
      address: '徐汇区黎梅花园88栋3单元101',
      time: '2026-09-04 09:00:00',
      duration: '2小时',
      phone: '19256784886',
    },
  },
];

// 优惠券列表（严格从 2026-09-19 降序至 2026-09-02，每条不同）
export const INITIAL_COUPONS: CouponItem[] = [
  {
    id: 'cp-01',
    name: '秋季慢病关爱优惠券',
    status: '未使用',
    content: '¥30 满150元可用',
    scope: '慢病护理',
    receiveTime: '2026-09-19 09:15:00',
    expireTime: '2026-09-29 23:59:59',
  },
  {
    id: 'cp-02',
    name: '新客专享优惠券',
    status: '未使用',
    content: '¥20 满200元可用',
    scope: '全部商品',
    receiveTime: '2026-09-18 10:09:09',
    expireTime: '2026-09-28 10:09:09',
  },
  {
    id: 'cp-03',
    name: '专业上门助浴立减券',
    status: '未使用',
    content: '¥40 满180元可用',
    scope: '护理服务',
    receiveTime: '2026-09-16 14:20:00',
    expireTime: '2026-09-26 14:20:00',
  },
  {
    id: 'cp-04',
    name: '康复理疗专项补贴券',
    status: '已使用',
    content: '¥50 满300元可用',
    scope: '康复理疗',
    receiveTime: '2026-09-15 10:09:09',
    expireTime: '2026-09-25 10:09:09',
  },
  {
    id: 'cp-05',
    name: '居室适老改造抵扣券',
    status: '已使用',
    content: '¥90 满350元可用',
    scope: '适老改造',
    receiveTime: '2026-09-12 11:30:00',
    expireTime: '2026-09-22 11:30:00',
  },
  {
    id: 'cp-06',
    name: '智能健康硬件升级抵用券',
    status: '未使用',
    content: '¥60 满300元可用',
    scope: '健康硬件',
    receiveTime: '2026-09-08 16:40:00',
    expireTime: '2026-09-20 16:40:00',
  },
  {
    id: 'cp-07',
    name: '初秋长者迎新体验券',
    status: '已过期',
    content: '¥15 无门槛可用',
    scope: '全部商品',
    receiveTime: '2026-09-02 08:30:00',
    expireTime: '2026-09-12 23:59:59',
  },
];

// 积分列表（严格从 2026-09-19 降序至 2026-09-01，每条不同）
export const INITIAL_POINTS: PointsItem[] = [
  {
    id: 'pt-01',
    type: '收入',
    amount: 100,
    reason: '每日早间血压打卡奖励',
    remark: '-',
    operator: '系统',
    time: '2026-09-19 16:20:00',
  },
  {
    id: 'pt-02',
    type: '收入',
    amount: 100,
    reason: '订单完成积分',
    remark: '-',
    operator: '系统',
    time: '2026-09-18 14:10:00',
  },
  {
    id: 'pt-03',
    type: '支出',
    amount: 200,
    reason: '兑换上门助浴满减券',
    remark: '用户在商城积分中心自主兑换',
    operator: '王强',
    time: '2026-09-16 10:09:09',
  },
  {
    id: 'pt-04',
    type: '收入',
    amount: 80,
    reason: '连续7日用药按时打卡',
    remark: '-',
    operator: '系统',
    time: '2026-09-15 08:30:00',
  },
  {
    id: 'pt-05',
    type: '收入',
    amount: 150,
    reason: '季度慢病随访复核达标',
    remark: '责任护师李明明审核合格',
    operator: '李明明',
    time: '2026-09-12 15:45:00',
  },
  {
    id: 'pt-06',
    type: '支出',
    amount: 50,
    reason: '兑换防跌倒安全袜',
    remark: '-',
    operator: '系统',
    time: '2026-09-08 11:20:00',
  },
  {
    id: 'pt-07',
    type: '收入',
    amount: 100,
    reason: '新客完善健康档案奖励',
    remark: '-',
    operator: '系统',
    time: '2026-09-01 09:15:00',
  },
];

// 成长值列表（严格从 2026-09-19 降序至 2026-09-02，每条不同）
export const INITIAL_GROWTH: GrowthItem[] = [
  {
    id: 'gw-01',
    type: '收入',
    amount: 100,
    reason: '每日健康签到',
    remark: '-',
    operator: '系统',
    time: '2026-09-19 14:10:00',
  },
  {
    id: 'gw-02',
    type: '收入',
    amount: 100,
    reason: '每日健康签到',
    remark: '-',
    operator: '系统',
    time: '2026-09-18 10:09:09',
  },
  {
    id: 'gw-03',
    type: '收入',
    amount: 150,
    reason: '完成上门日常清洁订单',
    remark: '订单编号 2400126675 交易完成',
    operator: '系统',
    time: '2026-09-16 09:20:00',
  },
  {
    id: 'gw-04',
    type: '收入',
    amount: 80,
    reason: '参与社区健康宣教打卡',
    remark: '阅读高血压防治指南',
    operator: '系统',
    time: '2026-09-14 15:30:00',
  },
  {
    id: 'gw-05',
    type: '收入',
    amount: 120,
    reason: '绑定智能毫米波雷达设备',
    remark: '-',
    operator: '李明明',
    time: '2026-09-11 11:10:00',
  },
  {
    id: 'gw-06',
    type: '收入',
    amount: 100,
    reason: '每日健康签到',
    remark: '-',
    operator: '系统',
    time: '2026-09-07 16:05:00',
  },
  {
    id: 'gw-07',
    type: '收入',
    amount: 200,
    reason: '长者实名制认证建档',
    remark: '首次认证奖励',
    operator: '系统',
    time: '2026-09-02 08:45:00',
  },
];

// 内容信息列表（严格从 2026-09-19 降序至 2026-09-02，每条动态文字与话题各不相同）
export const INITIAL_CONTENTS: ContentItem[] = [
  {
    id: 'cnt-01',
    text: '今天，阳光正好，忍不住出门去公园散步，散步的过程中，我遇到了一位老友，聊起了当年的往事，心情格外舒畅...',
    image: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=200&q=80',
    topic: '摄影',
    likes: 1001,
    favorites: 210,
    shares: 100,
    comments: 6,
    publishTime: '2026-09-19 15:20:00',
    status: true,
  },
  {
    id: 'cnt-02',
    text: '早起测量血压128/78mmHg，降压药规律服用加上每天适度太极拳，整个人的精气神确实不一样了，大家也要坚持！',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=200&q=80',
    topic: '健康随笔',
    likes: 856,
    favorites: 185,
    shares: 88,
    comments: 12,
    publishTime: '2026-09-18 09:30:00',
    status: true,
  },
  {
    id: 'cnt-03',
    text: '社区的李护士今天上门指导了家庭防滑和药箱整理，帮我把早中晚要服用的药物分盒摆放整齐，特别贴心负责，点赞！',
    image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=200&q=80',
    topic: '社区关怀',
    likes: 642,
    favorites: 142,
    shares: 64,
    comments: 8,
    publishTime: '2026-09-17 14:10:00',
    status: true,
  },
  {
    id: 'cnt-04',
    text: '阳台上的金丝菊开了，初秋泡上一壶清茶，翻翻几本老书，岁月静好。老伙计们平时也别老闷在屋里，多看看风景。',
    image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=200&q=80',
    topic: '慢病养生',
    likes: 520,
    favorites: 98,
    shares: 45,
    comments: 15,
    publishTime: '2026-09-15 10:09:09',
    status: true,
  },
  {
    id: 'cnt-05',
    text: '今天在社区长者食堂品尝了低糖营养餐，清蒸鲈鱼配时令蔬菜，少油少盐却很鲜美，价格实惠又合老年人口味。',
    image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=200&q=80',
    topic: '饮食调理',
    likes: 430,
    favorites: 86,
    shares: 38,
    comments: 4,
    publishTime: '2026-09-13 16:45:00',
    status: true,
  },
  {
    id: 'cnt-06',
    text: '秋风渐凉，早晚温差大，老伙伴们早起锻炼别穿太单薄。出门记得护住膝盖和颈椎，保暖防感冒第一位。',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=200&q=80',
    topic: '晨练日记',
    likes: 312,
    favorites: 75,
    shares: 26,
    comments: 9,
    publishTime: '2026-09-10 11:20:00',
    status: true,
  },
  {
    id: 'cnt-07',
    text: '下周居委会组织健康操比赛，我和几位同栋的老邻居每天下午都在活动室排练，动一动心情畅快，身体也变轻巧了。',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=200&q=80',
    topic: '邻里生活',
    likes: 280,
    favorites: 60,
    shares: 18,
    comments: 3,
    publishTime: '2026-09-05 08:30:00',
    status: true,
  },
];

// 可用派单服务人员列表
export const AVAILABLE_STAFF: ServiceStaff[] = [
  {
    id: 'st-01',
    name: '王小倩',
    code: '2024340089',
    area: '上海徐汇',
    phone: '15689004488',
    status: '空闲',
    avatar: 'https://images.unsplash.com/photo-1594824813590-b19b675402a7?auto=format&fit=crop&w=120&q=80',
  },
  {
    id: 'st-02',
    name: '王伟',
    code: '2024340092',
    area: '上海徐汇',
    phone: '13918234455',
    status: '空闲',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
  },
  {
    id: 'st-03',
    name: '李建国',
    code: '2024340076',
    area: '上海徐汇',
    phone: '13817659922',
    status: '空闲',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
  },
  {
    id: 'st-04',
    name: '张玉婷',
    code: '2024340081',
    area: '上海徐汇',
    phone: '13761238890',
    status: '空闲',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=120&q=80',
  },
];

// 服务记录列表（严格从 2026-09-19 降序至 2026-09-03，每条不同）
export const INITIAL_SERVICES: ServiceRecordItem[] = [
  {
    id: 'srv-01',
    workOrderNo: 'GD2026091900018',
    orderNo: '2400126679',
    orderInfo: {
      title: '脑中风术后康复理疗套餐',
      price: 399.00,
      discount: 99.00,
      actualAmount: 300.00,
      payMethod: '支付宝',
      orderTime: '2026-09-19 11:09:09',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=240&q=80',
    },
    serviceItem: '肌力增强训练',
    status: '服务中',
    actualAmount: 300.00,
    staff: '王小倩; 王伟',
    dispatchTime: '2026-09-19 14:12:07',
    customer: {
      name: '王强',
      userNo: '202609000001',
      phone: '19233664486',
      maskedPhone: '192****4486',
      registerTime: '2026-08-30 10:09:09',
      registerType: '注册',
      lastLoginTime: '2026-09-19 10:09:09',
      lastBuyTime: '2026-09-19 11:09:09',
      remarks: '遵医嘱被动活动各关节，配合阻抗练习。',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=160&q=80',
    },
    serviceArea: '上海市徐汇区',
    address: '上海市徐汇区黎梅花园88栋3单元101',
    source: '后台派单',
    dispatcher: '李明明',
    appointmentTime: '2026-09-19 14:30',
    duration: '2h',
    actualServiceTime: '2026-09-19 14:30',
    staffDetail: {
      name: '王小倩',
      phone: '156****4488',
    },
    estimatedCommission: 240.00,
  },
  {
    id: 'srv-02',
    workOrderNo: 'GD2026091800013',
    orderNo: '2400126675',
    orderInfo: {
      title: '日常清洁 2小时1人急速清洁全程质保',
      price: 300.00,
      discount: 0.00,
      actualAmount: 300.00,
      payMethod: '支付宝',
      orderTime: '2026-09-18 10:09:09',
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=240&q=80',
    },
    serviceItem: '日常保洁与卫生间消毒',
    status: '已完成',
    actualAmount: 300.00,
    staff: '李明明; 张华',
    dispatchTime: '2026-09-18 10:09:09',
    customer: {
      name: '王强',
      userNo: '202609000001',
      phone: '19233664486',
      maskedPhone: '192****4486',
      registerTime: '2026-08-30 10:09:09',
      registerType: '注册',
      lastLoginTime: '2026-09-19 10:09:09',
      lastBuyTime: '2026-09-18 10:09:09',
      remarks: '长者居家行动注意保持走道清空无阻碍。',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=160&q=80',
    },
    serviceArea: '上海市徐汇区',
    address: '上海市徐汇区黎梅花园88栋3单元101',
    source: '后台派单',
    dispatcher: '李明明',
    appointmentTime: '2026-09-18 14:00',
    duration: '2h',
    actualServiceTime: '2026-09-18 14:00',
    staffDetail: {
      name: '李明明',
      phone: '138****9921',
    },
    estimatedCommission: 240.00,
  },
  {
    id: 'srv-03',
    workOrderNo: 'GD2026091600025',
    orderNo: '2400126668',
    orderInfo: {
      title: '专业上门助浴与全身防褥疮护理',
      price: 220.00,
      discount: 40.00,
      actualAmount: 180.00,
      payMethod: '微信支付',
      orderTime: '2026-09-16 09:10:00',
      image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=240&q=80',
    },
    serviceItem: '温水助浴与皮肤完整性护理',
    status: '已完成',
    actualAmount: 180.00,
    staff: '王小倩; 陈护师',
    dispatchTime: '2026-09-16 09:30:00',
    customer: {
      name: '王强',
      userNo: '202609000001',
      phone: '19233664486',
      maskedPhone: '192****4486',
      registerTime: '2026-08-30 10:09:09',
      registerType: '注册',
      lastLoginTime: '2026-09-19 10:09:09',
      lastBuyTime: '2026-09-18 10:09:09',
      remarks: '浴前浴后监测血压血氧，注意防着凉。',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=160&q=80',
    },
    serviceArea: '上海市徐汇区',
    address: '上海市徐汇区黎梅花园88栋3单元101',
    source: '后台派单',
    dispatcher: '李明明',
    appointmentTime: '2026-09-16 10:30',
    duration: '1.5h',
    actualServiceTime: '2026-09-16 10:30',
    staffDetail: {
      name: '王小倩',
      phone: '156****4488',
    },
    estimatedCommission: 144.00,
  },
  {
    id: 'srv-04',
    workOrderNo: 'GD2026091400031',
    orderNo: '2400126658',
    orderInfo: {
      title: '居室卫生间防滑扶手安全改造套餐',
      price: 450.00,
      discount: 90.00,
      actualAmount: 360.00,
      payMethod: '微信支付',
      orderTime: '2026-09-14 15:10:00',
      image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=240&q=80',
    },
    serviceItem: '适老安全改造与扶手打孔安装',
    status: '已完成',
    actualAmount: 360.00,
    staff: '陈工匠; 赵师傅',
    dispatchTime: '2026-09-14 15:40:00',
    customer: {
      name: '王强',
      userNo: '202609000001',
      phone: '19233664486',
      maskedPhone: '192****4486',
      registerTime: '2026-08-30 10:09:09',
      registerType: '注册',
      lastLoginTime: '2026-09-19 10:09:09',
      lastBuyTime: '2026-09-18 10:09:09',
      remarks: '安装承重实测合格，完成拉力测试验收。',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=160&q=80',
    },
    serviceArea: '上海市徐汇区',
    address: '上海市徐汇区黎梅花园88栋3单元101',
    source: '后台派单',
    dispatcher: '李明明',
    appointmentTime: '2026-09-15 09:30',
    duration: '2h',
    actualServiceTime: '2026-09-15 09:30',
    staffDetail: {
      name: '陈工匠',
      phone: '139****1123',
    },
    estimatedCommission: 288.00,
  },
  {
    id: 'srv-05',
    workOrderNo: 'GD2026091100008',
    orderNo: '2400126649',
    orderInfo: {
      title: '慢病专属上门采血与健康建档全面评估套餐',
      price: 150.00,
      discount: 30.00,
      actualAmount: 120.00,
      payMethod: '余额支付',
      orderTime: '2026-09-11 10:50:00',
      image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=240&q=80',
    },
    serviceItem: '常规静脉采血与慢病建档评估',
    status: '已完成',
    actualAmount: 120.00,
    staff: '张玉婷; 刘医生',
    dispatchTime: '2026-09-11 11:20:00',
    customer: {
      name: '王强',
      userNo: '202609000001',
      phone: '19233664486',
      maskedPhone: '192****4486',
      registerTime: '2026-08-30 10:09:09',
      registerType: '注册',
      lastLoginTime: '2026-09-19 10:09:09',
      lastBuyTime: '2026-09-18 10:09:09',
      remarks: '采血化验空腹血糖、血脂及糖化血红蛋白。',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=160&q=80',
    },
    serviceArea: '上海市徐汇区',
    address: '上海市徐汇区黎梅花园88栋3单元101',
    source: '后台派单',
    dispatcher: '李明明',
    appointmentTime: '2026-09-11 14:00',
    duration: '1h',
    actualServiceTime: '2026-09-11 14:00',
    staffDetail: {
      name: '张玉婷',
      phone: '137****8890',
    },
    estimatedCommission: 96.00,
  },
  {
    id: 'srv-06',
    workOrderNo: 'GD2026090700019',
    orderNo: '2400126639',
    orderInfo: {
      title: '三甲医院专科门诊专业陪同就医服务',
      price: 180.00,
      discount: 30.00,
      actualAmount: 150.00,
      payMethod: '微信支付',
      orderTime: '2026-09-07 08:15:00',
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=240&q=80',
    },
    serviceItem: '门诊陪同与代取检查化验单',
    status: '已完成',
    actualAmount: 150.00,
    staff: '钱护士; 周专员',
    dispatchTime: '2026-09-07 08:50:00',
    customer: {
      name: '王强',
      userNo: '202609000001',
      phone: '19233664486',
      maskedPhone: '192****4486',
      registerTime: '2026-08-30 10:09:09',
      registerType: '注册',
      lastLoginTime: '2026-09-19 10:09:09',
      lastBuyTime: '2026-09-18 10:09:09',
      remarks: '陪同至徐汇区中心医院心血管专科复诊取药。',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=160&q=80',
    },
    serviceArea: '上海市徐汇区',
    address: '上海市徐汇区淮海中路966号',
    source: '后台派单',
    dispatcher: '李明明',
    appointmentTime: '2026-09-07 09:30',
    duration: '3h',
    actualServiceTime: '2026-09-07 09:30',
    staffDetail: {
      name: '钱护士',
      phone: '136****5567',
    },
    estimatedCommission: 120.00,
  },
  {
    id: 'srv-07',
    workOrderNo: 'GD2026090300042',
    orderNo: '2400126631',
    orderInfo: {
      title: '长者居室厨房油烟深度保洁保养套餐',
      price: 260.00,
      discount: 60.00,
      actualAmount: 200.00,
      payMethod: '微信支付',
      orderTime: '2026-09-03 13:30:00',
      image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=240&q=80',
    },
    serviceItem: '居室厨卫深度保洁',
    status: '已完成',
    actualAmount: 200.00,
    staff: '孙阿姨; 郑主管',
    dispatchTime: '2026-09-03 14:00:00',
    customer: {
      name: '王强',
      userNo: '202609000001',
      phone: '19233664486',
      maskedPhone: '192****4486',
      registerTime: '2026-08-30 10:09:09',
      registerType: '注册',
      lastLoginTime: '2026-09-19 10:09:09',
      lastBuyTime: '2026-09-18 10:09:09',
      remarks: '油烟机滤网清洗与燃气阀安全巡检。',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=160&q=80',
    },
    serviceArea: '上海市徐汇区',
    address: '上海市徐汇区黎梅花园88栋3单元101',
    source: '后台派单',
    dispatcher: '李明明',
    appointmentTime: '2026-09-04 09:00',
    duration: '2h',
    actualServiceTime: '2026-09-04 09:00',
    staffDetail: {
      name: '孙阿姨',
      phone: '135****4432',
    },
    estimatedCommission: 160.00,
  },
];
