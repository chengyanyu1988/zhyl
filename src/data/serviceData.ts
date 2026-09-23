// 详尽且不重复的服务管理模块真实业务数据
// 时间范围：2026年9月1日 至 2026年9月19日，严格按时间降序排列
// 表格每条记录均保证独特内容，不重复，日期后不带额外时间副词

export interface ServiceStaffItem {
  id: string; // 唯一服务人员ID
  staffNo: string;
  name: string;
  avatar: string;
  phone: string;
  serviceType: string;
  tag: string;
  region: string;
  joinWay: string;
  joinTime: string; // 2026-09-xx xx:xx:xx
  enabled: boolean;
  intro: string;
  idCardNo: string;
  bankCardNo: string;
  bankName: string;
  allowTips: boolean;
  loginPassword?: string;
  workShifts: string[];
}

export interface ServiceWorkOrderItem {
  id: string; // 工单编号 GD202609xxxxxx
  orderNo: string; // 订单号 2400126xxx
  title: string;
  thumbnail: string;
  serviceItem: string;
  actualAmount: number; // 实付款
  originalPrice?: number; // 商品价格
  discountAmount?: number; // 优惠金额
  paymentMethod?: string; // 支付方式
  orderCreateTime?: string; // 下单时间
  staffNames: string; // 服务人员
  staffPhone?: string;
  customerName: string;
  customerPhone: string;
  customerAvatar: string;
  customerId?: string;
  customerRegisterTime?: string;
  customerLastLogin?: string;
  customerLastPurchase?: string;
  dispatchTime: string; // 派单时间 2026-09-xx xx:xx:xx
  appointmentTime: string; // 预约时间 2026-09-xx xx:xx:xx
  status: '待服务' | '服务中' | '已完成' | '已取消';
  remark?: string;
  servicePeopleCount?: number;
  serviceRegion?: string;
  address?: string;
  dispatchSource?: string;
  dispatcherName?: string;
  estimatedDuration?: string;
  estimatedCommission?: number;
  actualStartTime?: string;
  actualDuration?: string;
  cancelTime?: string;
  cancelOperator?: string;
}

export interface ServiceCommissionItem {
  id: string; // 工单编号
  orderNo: string;
  title: string;
  thumbnail: string;
  serviceItem: string;
  staffName: string;
  staffPhone: string;
  staffAvatar: string;
  actualAmount: number; // 实付款
  commissionAmount: number; // 佣金金额
  settlementStatus: '结算中' | '已结算' | '待结算';
  applyTime: string; // 申请结算时间 2026-09-xx xx:xx:xx
  settledTime?: string;
}

export interface ServiceTagItem {
  id: string;
  name: string;
  staffCount: number;
  lastUpdater: string;
  lastUpdateTime: string; // 2026-09-xx xx:xx:xx
  enabled: boolean;
}

export interface ServiceAuditItem {
  id: string; // 服务人员ID
  name: string;
  avatar: string;
  phone: string;
  serviceType: string;
  auditStatus: '待审核' | '审核通过' | '已驳回';
  auditor: string;
  applyTime: string; // 2026-09-xx xx:xx:xx
  auditTime: string; // 2026-09-xx xx:xx:xx 或 '-'
  tag: string;
  intro: string;
  idCardNo: string;
  bankCardNo: string;
  bankName: string;
  allowTips: boolean;
  loginPassword?: string;
  addChannel: string;
  registerTime: string;
  lastLoginTime: string;
}

// 1. 全部服务人员模拟数据（时间从 2026-09-19 至 2026-09-01 严格降序）
export const INITIAL_SERVICE_STAFF: ServiceStaffItem[] = [
  {
    id: 'staff-01',
    staffNo: '2026340089',
    name: '王小倩',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
    phone: '156****4488',
    serviceType: '家政护工',
    tag: '金牌家政',
    region: '上海市徐汇区',
    joinWay: '服务端注册',
    joinTime: '2026-09-19 14:30:25',
    enabled: true,
    intro: '拥有5年高龄长者住家照护经验，擅长适老化软食营养烹饪及居室卫生无障碍清洁。',
    idCardNo: '31010419880915234X',
    bankCardNo: '6214 8301 2345 9811',
    bankName: '招商银行上海徐汇支行',
    allowTips: true,
    loginPassword: 'wxq_safe2026',
    workShifts: ['早上 9:00-12:00', '下午 14:00-17:00'],
  },
  {
    id: 'staff-02',
    staffNo: '2026340088',
    name: '李建国',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80',
    phone: '138****6621',
    serviceType: '康复理疗师',
    tag: '高级理疗师',
    region: '上海市黄浦区',
    joinWay: '机构指派',
    joinTime: '2026-09-18 16:20:10',
    enabled: true,
    intro: '三甲医院前康复科技师，精通脑卒中偏瘫康复训练、良肢位摆放与老年关节活动度保持。',
    idCardNo: '310101197904128831',
    bankCardNo: '6222 0210 0987 1145',
    bankName: '工商银行上海黄浦支行',
    allowTips: true,
    loginPassword: 'ljg_safe2026',
    workShifts: ['早上 9:00-12:00', '下午 14:00-17:00'],
  },
  {
    id: 'staff-03',
    staffNo: '2026340085',
    name: '张素珍',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
    phone: '159****3310',
    serviceType: '养老护理员',
    tag: '五星照护',
    region: '上海市静安区',
    joinWay: '后台添加',
    joinTime: '2026-09-17 11:15:40',
    enabled: true,
    intro: '国家中级养老护理员，擅长失智失能长者床边日常介护、防压疮翻身拍背与心理疏导。',
    idCardNo: '310106198311204426',
    bankCardNo: '6228 4800 3982 7701',
    bankName: '农业银行上海静安支行',
    allowTips: true,
    loginPassword: 'zsz_safe2026',
    workShifts: ['早上 9:00-12:00', '下午 14:00-17:00'],
  },
  {
    id: 'staff-04',
    staffNo: '2026340082',
    name: '陈志远',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    phone: '186****9012',
    serviceType: '助医陪诊员',
    tag: '资深陪诊',
    region: '上海市长宁区',
    joinWay: '服务端注册',
    joinTime: '2026-09-16 09:45:18',
    enabled: true,
    intro: '熟悉各大三甲医院挂号取药全流程，配备便携轮椅及专车，为独居高龄长者提供一站式陪伴。',
    idCardNo: '310105198506085517',
    bankCardNo: '6217 0001 5566 2209',
    bankName: '建设银行上海长宁支行',
    allowTips: true,
    loginPassword: 'czy_safe2026',
    workShifts: ['早上 9:00-12:00', '下午 14:00-17:00'],
  },
  {
    id: 'staff-05',
    staffNo: '2026340079',
    name: '吴海燕',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80',
    phone: '137****5520',
    serviceType: '适老助浴员',
    tag: '适老助浴',
    region: '上海市普陀区',
    joinWay: '服务端注册',
    joinTime: '2026-09-15 15:30:00',
    enabled: true,
    intro: '持有专业助浴师认证，掌握血压评估、便携充气浴槽操作及浴后保暖防风寒急救流程。',
    idCardNo: '310107198603221980',
    bankCardNo: '6225 8802 4411 9002',
    bankName: '招商银行上海普陀支行',
    allowTips: true,
    loginPassword: 'why_safe2026',
    workShifts: ['早上 9:00-12:00', '下午 14:00-17:00'],
  },
  {
    id: 'staff-06',
    staffNo: '2026340071',
    name: '周德明',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    phone: '139****1188',
    serviceType: '康复理疗师',
    tag: '高级康复师',
    region: '上海市浦东新区',
    joinWay: '机构指派',
    joinTime: '2026-09-14 10:20:00',
    enabled: true,
    intro: '专注骨折术后恢复指导与腰椎间盘突出牵引调理，深得社区长者信赖。',
    idCardNo: '310115197801193354',
    bankCardNo: '6214 8502 1199 8832',
    bankName: '浦发银行上海浦东支行',
    allowTips: true,
    loginPassword: 'zdm_safe2026',
    workShifts: ['早上 9:00-12:00'],
  },
  {
    id: 'staff-07',
    staffNo: '2026340065',
    name: '黄桂芬',
    avatar: 'https://images.unsplash.com/photo-1548142813-c348350df52b?w=120&auto=format&fit=crop&q=80',
    phone: '136****9922',
    serviceType: '家政护工',
    tag: '金牌家政',
    region: '上海市闵行区',
    joinWay: '后台添加',
    joinTime: '2026-09-12 14:10:00',
    enabled: true,
    intro: '10年养老服务经验，提供温和耐心的日常起居协助、慢病饮食搭配与服药提醒。',
    idCardNo: '310112198005166649',
    bankCardNo: '6222 0802 7788 3341',
    bankName: '交通银行上海闵行支行',
    allowTips: false,
    loginPassword: 'hgf_safe2026',
    workShifts: ['下午 14:00-17:00'],
  },
  {
    id: 'staff-08',
    staffNo: '2026340058',
    name: '钱立峰',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80',
    phone: '150****8844',
    serviceType: '居家安全技工',
    tag: '适老改造',
    region: '上海市虹口区',
    joinWay: '服务端注册',
    joinTime: '2026-09-10 11:00:00',
    enabled: true,
    intro: '专业适老环境改造评估师，精通卫生间L型安全扶手、防滑地垫及紧急呼叫雷达加装。',
    idCardNo: '310109198408091172',
    bankCardNo: '6229 0801 3322 5590',
    bankName: '民生银行上海虹口支行',
    allowTips: true,
    loginPassword: 'qlf_safe2026',
    workShifts: ['早上 9:00-12:00', '下午 14:00-17:00'],
  },
  {
    id: 'staff-09',
    staffNo: '2026340042',
    name: '孙美玲',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    phone: '135****6611',
    serviceType: '养老护理员',
    tag: '慢病专护',
    region: '上海市杨浦区',
    joinWay: '服务端注册',
    joinTime: '2026-09-07 16:40:00',
    enabled: true,
    intro: '老年糖尿病与高血压慢病专科护士出身，负责家庭胰岛素注射指导及血压波动随访记录。',
    idCardNo: '310110198709124483',
    bankCardNo: '6217 0009 8812 6634',
    bankName: '建设银行上海杨浦支行',
    allowTips: true,
    loginPassword: 'sml_safe2026',
    workShifts: ['早上 9:00-12:00', '下午 14:00-17:00'],
  },
  {
    id: 'staff-10',
    staffNo: '2026340030',
    name: '郑少华',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80',
    phone: '189****2277',
    serviceType: '助医陪诊员',
    tag: '金牌陪诊',
    region: '上海市徐汇区',
    joinWay: '机构指派',
    joinTime: '2026-09-03 09:15:00',
    enabled: true,
    intro: '持有急救CPR证书，擅长协助轮椅长者就医并清晰向家属转达主治医师医嘱。',
    idCardNo: '310104198202157790',
    bankCardNo: '6228 4801 9922 4410',
    bankName: '农业银行上海徐汇支行',
    allowTips: true,
    loginPassword: 'zsh_safe2026',
    workShifts: ['早上 9:00-12:00', '下午 14:00-17:00'],
  },
];

// 2. 工单管理模拟数据（时间从 2026-09-19 至 2026-09-01 严格降序）
export const INITIAL_SERVICE_WORK_ORDERS: ServiceWorkOrderItem[] = [
  {
    id: 'GD2026091901',
    orderNo: '2400126670',
    title: '脑中风术后康复理疗套餐',
    thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=120&auto=format&fit=crop&q=80',
    serviceItem: '肌力增强训练',
    actualAmount: 300.0,
    staffNames: '王小倩; 王伟',
    customerName: '小王',
    customerPhone: '192****4488',
    customerAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
    dispatchTime: '2026-09-19 16:30:00',
    appointmentTime: '2026-09-19 18:00:00',
    status: '待服务',
    remark: '长者右手手指轻度痉挛，请理疗师重点指导被动抓握练习。',
  },
  {
    id: 'GD2026091902',
    orderNo: '2400126671',
    title: '上门专业长者卧床助浴服务',
    thumbnail: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=120&auto=format&fit=crop&q=80',
    serviceItem: '深层助浴清洁及皮肤护理',
    actualAmount: 220.0,
    staffNames: '吴海燕; 孙美玲',
    customerName: '赵大爷',
    customerPhone: '138****5510',
    customerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    dispatchTime: '2026-09-19 14:15:00',
    appointmentTime: '2026-09-19 15:30:00',
    status: '待服务',
    remark: '带自发热恒温充气浴盆，室内空调预热至26度。',
  },
  {
    id: 'GD2026091801',
    orderNo: '2400126665',
    title: '居室防跌倒安全扶手安装工程',
    thumbnail: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=120&auto=format&fit=crop&q=80',
    serviceItem: '卫生间尼龙抗菌扶手施工',
    actualAmount: 480.0,
    staffNames: '钱立峰',
    customerName: '孙阿姨',
    customerPhone: '136****9922',
    customerAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
    dispatchTime: '2026-09-18 10:09:09',
    appointmentTime: '2026-09-18 14:00:00',
    status: '服务中',
    remark: '马桶旁L型扶手与淋浴间折叠防滑淋浴凳组合安装。',
  },
  {
    id: 'GD2026091703',
    orderNo: '2400126658',
    title: '三甲医院全流程陪诊与代取药',
    thumbnail: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=120&auto=format&fit=crop&q=80',
    serviceItem: '心血管内科复诊陪同',
    actualAmount: 260.0,
    staffNames: '陈志远; 郑少华',
    customerName: '周伯伯',
    customerPhone: '159****3341',
    customerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    dispatchTime: '2026-09-17 08:30:00',
    appointmentTime: '2026-09-17 09:30:00',
    status: '已完成',
    remark: '已顺利完成动态心电图检查，药单复印件已上传系统档案。',
  },
  {
    id: 'GD2026091602',
    orderNo: '2400126649',
    title: '慢病高血压居家用药随访指导',
    thumbnail: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=120&auto=format&fit=crop&q=80',
    serviceItem: '血压测量及服药依从性评估',
    actualAmount: 150.0,
    staffNames: '孙美玲',
    customerName: '林奶奶',
    customerPhone: '133****1122',
    customerAvatar: 'https://images.unsplash.com/photo-1548142813-c348350df52b?w=120&auto=format&fit=crop&q=80',
    dispatchTime: '2026-09-16 15:20:00',
    appointmentTime: '2026-09-16 16:00:00',
    status: '已完成',
    remark: '收缩压平稳在128mmHg，已提醒晨起勿突然坐起。',
  },
  {
    id: 'GD2026091501',
    orderNo: '2400126632',
    title: '失智长者专业认知症益智照护',
    thumbnail: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=120&auto=format&fit=crop&q=80',
    serviceItem: '怀旧疗法与手部精细动作训练',
    actualAmount: 320.0,
    staffNames: '张素珍; 王小倩',
    customerName: '郭老爷子',
    customerPhone: '180****7733',
    customerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80',
    dispatchTime: '2026-09-15 09:10:00',
    appointmentTime: '2026-09-15 10:00:00',
    status: '已完成',
    remark: '长者配合良好，情绪平稳，完成涂色卡与七巧板训练。',
  },
  {
    id: 'GD2026091204',
    orderNo: '2400126615',
    title: '适老化深度除螨保洁套餐',
    thumbnail: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=120&auto=format&fit=crop&q=80',
    serviceItem: '床垫吸尘蒸汽除螨与厨房去油污',
    actualAmount: 280.0,
    staffNames: '黄桂芬',
    customerName: '郑老伯',
    customerPhone: '152****6677',
    customerAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80',
    dispatchTime: '2026-09-12 13:40:00',
    appointmentTime: '2026-09-12 14:30:00',
    status: '已完成',
    remark: '保洁彻底，长者家属给予五星好评。',
  },
  {
    id: 'GD2026090802',
    orderNo: '2400126590',
    title: '老年骨关节康复理疗及推拿',
    thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=120&auto=format&fit=crop&q=80',
    serviceItem: '膝关节红外理疗与穴位按摩',
    actualAmount: 200.0,
    staffNames: '周德明',
    customerName: '马阿姨',
    customerPhone: '139****8822',
    customerAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
    dispatchTime: '2026-09-08 10:15:00',
    appointmentTime: '2026-09-08 11:00:00',
    status: '已完成',
    remark: '疼痛视觉模拟评分VAS由6分降至3分。',
  },
  {
    id: 'GD2026090501',
    orderNo: '2400126572',
    title: '急救绿通专属陪诊预约',
    thumbnail: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=120&auto=format&fit=crop&q=80',
    serviceItem: '呼吸科急诊陪同代办',
    actualAmount: 350.0,
    staffNames: '郑少华',
    customerName: '徐大爷',
    customerPhone: '158****3399',
    customerAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80',
    dispatchTime: '2026-09-05 16:50:00',
    appointmentTime: '2026-09-05 18:00:00',
    status: '已取消',
    remark: '长者家属临时改乘120急救车前往仁济医院，线上工单已原路退费。',
  },
  {
    id: 'GD2026090203',
    orderNo: '2400126541',
    title: '长护险定点重度失能照护包',
    thumbnail: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=120&auto=format&fit=crop&q=80',
    serviceItem: '会阴冲洗、鼻饲管护理及被动肢体活动',
    actualAmount: 300.0,
    staffNames: '张素珍; 李建国',
    customerName: '谢老太太',
    customerPhone: '131****4455',
    customerAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80',
    dispatchTime: '2026-09-02 09:00:00',
    appointmentTime: '2026-09-02 09:30:00',
    status: '已完成',
    remark: '长护险定点机构补贴已自动结算70%，自费部分30%已清算完毕。',
  },
];

// 3. 佣金记录模拟数据（时间从 2026-09-19 至 2026-09-01 严格降序）
export const INITIAL_SERVICE_COMMISSIONS: ServiceCommissionItem[] = [
  {
    id: 'GD20260919013',
    orderNo: '2400126670',
    title: '脑中风术后康复理疗套餐',
    thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=120&auto=format&fit=crop&q=80',
    serviceItem: '肌力增强训练',
    staffName: '王小倩',
    staffPhone: '156****4488',
    staffAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
    actualAmount: 300.0,
    commissionAmount: 200.0,
    settlementStatus: '结算中',
    applyTime: '2026-09-19 16:45:00',
  },
  {
    id: 'GD20260919008',
    orderNo: '2400126671',
    title: '上门专业长者卧床助浴服务',
    thumbnail: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=120&auto=format&fit=crop&q=80',
    serviceItem: '深层助浴清洁及皮肤护理',
    staffName: '吴海燕',
    staffPhone: '137****5520',
    staffAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80',
    actualAmount: 220.0,
    commissionAmount: 154.0,
    settlementStatus: '结算中',
    applyTime: '2026-09-19 15:10:00',
  },
  {
    id: 'GD20260918013',
    orderNo: '2400126665',
    title: '居室防跌倒安全扶手安装工程',
    thumbnail: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=120&auto=format&fit=crop&q=80',
    serviceItem: '卫生间尼龙抗菌扶手施工',
    staffName: '钱立峰',
    staffPhone: '150****8844',
    staffAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80',
    actualAmount: 480.0,
    commissionAmount: 336.0,
    settlementStatus: '已结算',
    applyTime: '2026-09-18 10:09:09',
    settledTime: '2026-09-18 16:30:00',
  },
  {
    id: 'GD20260917019',
    orderNo: '2400126658',
    title: '三甲医院全流程陪诊与代取药',
    thumbnail: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=120&auto=format&fit=crop&q=80',
    serviceItem: '心血管内科复诊陪同',
    staffName: '陈志远',
    staffPhone: '186****9012',
    staffAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    actualAmount: 260.0,
    commissionAmount: 182.0,
    settlementStatus: '已结算',
    applyTime: '2026-09-17 14:20:00',
    settledTime: '2026-09-17 18:00:00',
  },
  {
    id: 'GD20260916012',
    orderNo: '2400126649',
    title: '慢病高血压居家用药随访指导',
    thumbnail: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=120&auto=format&fit=crop&q=80',
    serviceItem: '血压测量及服药依从性评估',
    staffName: '孙美玲',
    staffPhone: '135****6611',
    staffAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    actualAmount: 150.0,
    commissionAmount: 105.0,
    settlementStatus: '已结算',
    applyTime: '2026-09-16 17:30:00',
    settledTime: '2026-09-17 09:00:00',
  },
  {
    id: 'GD20260915007',
    orderNo: '2400126632',
    title: '失智长者专业认知症益智照护',
    thumbnail: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=120&auto=format&fit=crop&q=80',
    serviceItem: '怀旧疗法与手部精细动作训练',
    staffName: '张素珍',
    staffPhone: '159****3310',
    staffAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
    actualAmount: 320.0,
    commissionAmount: 224.0,
    settlementStatus: '已结算',
    applyTime: '2026-09-15 12:40:00',
    settledTime: '2026-09-15 17:15:00',
  },
  {
    id: 'GD20260912005',
    orderNo: '2400126615',
    title: '适老化深度除螨保洁套餐',
    thumbnail: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=120&auto=format&fit=crop&q=80',
    serviceItem: '床垫吸尘蒸汽除螨与厨房去油污',
    staffName: '黄桂芬',
    staffPhone: '136****9922',
    staffAvatar: 'https://images.unsplash.com/photo-1548142813-c348350df52b?w=120&auto=format&fit=crop&q=80',
    actualAmount: 280.0,
    commissionAmount: 196.0,
    settlementStatus: '已结算',
    applyTime: '2026-09-12 16:30:00',
    settledTime: '2026-09-13 10:00:00',
  },
  {
    id: 'GD20260908003',
    orderNo: '2400126590',
    title: '老年骨关节康复理疗及推拿',
    thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=120&auto=format&fit=crop&q=80',
    serviceItem: '膝关节红外理疗与穴位按摩',
    staffName: '周德明',
    staffPhone: '139****1188',
    staffAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    actualAmount: 200.0,
    commissionAmount: 140.0,
    settlementStatus: '已结算',
    applyTime: '2026-09-08 14:00:00',
    settledTime: '2026-09-08 18:30:00',
  },
  {
    id: 'GD20260904001',
    orderNo: '2400126558',
    title: '重度失能全日家庭照护',
    thumbnail: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=120&auto=format&fit=crop&q=80',
    serviceItem: '压疮护理及生活照料',
    staffName: '李建国',
    staffPhone: '138****6621',
    staffAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80',
    actualAmount: 400.0,
    commissionAmount: 280.0,
    settlementStatus: '已结算',
    applyTime: '2026-09-04 18:10:00',
    settledTime: '2026-09-05 09:30:00',
  },
  {
    id: 'GD20260902002',
    orderNo: '2400126541',
    title: '长护险定点重度失能照护包',
    thumbnail: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=120&auto=format&fit=crop&q=80',
    serviceItem: '会阴冲洗、鼻饲管护理及被动肢体活动',
    staffName: '王小倩',
    staffPhone: '156****4488',
    staffAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
    actualAmount: 300.0,
    commissionAmount: 210.0,
    settlementStatus: '已结算',
    applyTime: '2026-09-02 11:20:00',
    settledTime: '2026-09-02 16:45:00',
  },
];

// 4. 标签管理模拟数据（时间从 2026-09-19 至 2026-09-01 严格降序）
export const INITIAL_SERVICE_TAGS: ServiceTagItem[] = [
  {
    id: 'tag-01',
    name: '高级理疗师',
    staffCount: 200,
    lastUpdater: '李明明',
    lastUpdateTime: '2026-09-19 14:20:00',
    enabled: true,
  },
  {
    id: 'tag-02',
    name: '金牌家政',
    staffCount: 168,
    lastUpdater: '王院长',
    lastUpdateTime: '2026-09-18 10:09:09',
    enabled: true,
  },
  {
    id: 'tag-03',
    name: '五星照护',
    staffCount: 125,
    lastUpdater: '陈主任',
    lastUpdateTime: '2026-09-17 16:45:30',
    enabled: true,
  },
  {
    id: 'tag-04',
    name: '资深陪诊',
    staffCount: 94,
    lastUpdater: '张主管',
    lastUpdateTime: '2026-09-16 11:30:15',
    enabled: true,
  },
  {
    id: 'tag-05',
    name: '适老助浴',
    staffCount: 82,
    lastUpdater: '李明明',
    lastUpdateTime: '2026-09-15 09:15:00',
    enabled: true,
  },
  {
    id: 'tag-06',
    name: '高级康复师',
    staffCount: 110,
    lastUpdater: '陈主任',
    lastUpdateTime: '2026-09-14 15:40:22',
    enabled: true,
  },
  {
    id: 'tag-07',
    name: '慢病专护',
    staffCount: 76,
    lastUpdater: '王院长',
    lastUpdateTime: '2026-09-11 13:20:00',
    enabled: true,
  },
  {
    id: 'tag-08',
    name: '适老改造',
    staffCount: 45,
    lastUpdater: '张主管',
    lastUpdateTime: '2026-09-08 10:35:10',
    enabled: true,
  },
  {
    id: 'tag-09',
    name: '认知症专护',
    staffCount: 58,
    lastUpdater: '李明明',
    lastUpdateTime: '2026-09-04 17:00:00',
    enabled: true,
  },
  {
    id: 'tag-10',
    name: '心理疏导',
    staffCount: 39,
    lastUpdater: '陈主任',
    lastUpdateTime: '2026-09-01 14:15:00',
    enabled: true,
  },
];

// 5. 审核管理模拟数据（时间从 2026-09-19 至 2026-09-01 严格降序）
export const INITIAL_SERVICE_AUDITS: ServiceAuditItem[] = [
  {
    id: '2024340089',
    name: '王小倩',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
    phone: '156****9900',
    serviceType: '家政护工',
    auditStatus: '待审核',
    auditor: '李明明',
    applyTime: '2026-09-19 11:20:00',
    auditTime: '-',
    tag: '金牌家政',
    intro: '专注于家庭清洁、洗衣与烹饪，有丰富的经验，能够确保家居环境整洁舒适。',
    idCardNo: '36909919870909289X',
    bankCardNo: '621 234 0089 9909 3456',
    bankName: '招商银行浦东支行',
    allowTips: true,
    loginPassword: 'ha138900',
    addChannel: '平台系统注册',
    registerTime: '2026-09-19 10:09:09',
    lastLoginTime: '2026-09-19 10:30:15',
  },
  {
    id: '2024340088',
    name: '刘建华',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80',
    phone: '138****3322',
    serviceType: '康复理疗师',
    auditStatus: '待审核',
    auditor: '陈主任',
    applyTime: '2026-09-18 14:10:00',
    auditTime: '-',
    tag: '高级理疗师',
    intro: '持有康复治疗师资格证书，擅长高龄长者下肢无力运动功能重建与平衡测试。',
    idCardNo: '310101198205123341',
    bankCardNo: '6222 0214 8877 6620',
    bankName: '工商银行上海分行',
    allowTips: true,
    loginPassword: 'ljh_safe2026',
    addChannel: '服务端注册',
    registerTime: '2026-09-18 13:00:00',
    lastLoginTime: '2026-09-18 13:45:00',
  },
  {
    id: '2024340085',
    name: '赵淑芬',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
    phone: '159****7766',
    serviceType: '养老护理员',
    auditStatus: '审核通过',
    auditor: '王院长',
    applyTime: '2026-09-17 09:30:00',
    auditTime: '2026-09-17 15:45:00',
    tag: '五星照护',
    intro: '十年养老院介护主管，掌握压疮预防换药及长者心理慰藉技术。',
    idCardNo: '310107198103194452',
    bankCardNo: '6228 4801 7733 9920',
    bankName: '农业银行普陀支行',
    allowTips: true,
    loginPassword: 'zsf_safe2026',
    addChannel: '机构推荐',
    registerTime: '2026-09-17 08:30:00',
    lastLoginTime: '2026-09-17 16:00:00',
  },
  {
    id: '2024340081',
    name: '徐振宇',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    phone: '186****1199',
    serviceType: '助医陪诊员',
    auditStatus: '审核通过',
    auditor: '李明明',
    applyTime: '2026-09-15 10:09:09',
    auditTime: '2026-09-15 16:00:00',
    tag: '资深陪诊',
    intro: '拥有专车及无障碍折叠轮椅，常年在瑞金、中山医院开展专人陪诊。',
    idCardNo: '310104198608221945',
    bankCardNo: '6217 0002 9988 3311',
    bankName: '建设银行徐汇支行',
    allowTips: true,
    loginPassword: 'xzy_safe2026',
    addChannel: '平台系统注册',
    registerTime: '2026-09-15 09:00:00',
    lastLoginTime: '2026-09-15 17:10:00',
  },
  {
    id: '2024340078',
    name: '唐秀兰',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80',
    phone: '137****4455',
    serviceType: '适老助浴员',
    auditStatus: '已驳回',
    auditor: '陈主任',
    applyTime: '2026-09-13 14:00:00',
    auditTime: '2026-09-13 17:30:00',
    tag: '适老助浴',
    intro: '申请上门助浴技师，健康体检合格证已过期，需重新提交二级以上医院健康证。',
    idCardNo: '310115198907142289',
    bankCardNo: '6225 8809 1122 3345',
    bankName: '招商银行浦东分行',
    allowTips: false,
    loginPassword: 'txl_safe2026',
    addChannel: '服务端注册',
    registerTime: '2026-09-13 11:30:00',
    lastLoginTime: '2026-09-13 14:20:00',
  },
  {
    id: '2024340072',
    name: '周海波',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    phone: '139****7711',
    serviceType: '家政护工',
    auditStatus: '审核通过',
    auditor: '李明明',
    applyTime: '2026-09-10 11:15:00',
    auditTime: '2026-09-10 16:30:00',
    tag: '金牌家政',
    intro: '擅长高龄长者营养配餐与日常起居看护，持健康证与家政服务资格证。',
    idCardNo: '310109198302187762',
    bankCardNo: '6214 8503 6677 8820',
    bankName: '浦发银行虹口支行',
    allowTips: true,
    loginPassword: 'zhb_safe2026',
    addChannel: '后台添加',
    registerTime: '2026-09-10 09:30:00',
    lastLoginTime: '2026-09-10 17:00:00',
  },
  {
    id: '2024340064',
    name: '朱丽萍',
    avatar: 'https://images.unsplash.com/photo-1548142813-c348350df52b?w=120&auto=format&fit=crop&q=80',
    phone: '136****5500',
    serviceType: '康复理疗师',
    auditStatus: '审核通过',
    auditor: '王院长',
    applyTime: '2026-09-06 09:40:00',
    auditTime: '2026-09-06 14:50:00',
    tag: '高级康复师',
    intro: '中医药大学针灸推拿专科毕业，专长老年腰腿痛温和推拿与关节活动改善。',
    idCardNo: '310112198509214431',
    bankCardNo: '6222 0803 1199 4452',
    bankName: '交通银行闵行支行',
    allowTips: true,
    loginPassword: 'zlp_safe2026',
    addChannel: '机构推荐',
    registerTime: '2026-09-06 08:30:00',
    lastLoginTime: '2026-09-06 15:30:00',
  },
  {
    id: '2024340051',
    name: '韩宝康',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80',
    phone: '150****2233',
    serviceType: '居家安全技工',
    auditStatus: '审核通过',
    auditor: '陈主任',
    applyTime: '2026-09-02 10:00:00',
    auditTime: '2026-09-02 15:10:00',
    tag: '适老改造',
    intro: '持有电工证与建筑施工技能证书，专注老年居室照明无死角改造与扶手牢固度加固。',
    idCardNo: '310106197711093321',
    bankCardNo: '6229 0802 4455 6671',
    bankName: '民生银行静安支行',
    allowTips: true,
    loginPassword: 'hbk_safe2026',
    addChannel: '服务端注册',
    registerTime: '2026-09-02 08:45:00',
    lastLoginTime: '2026-09-02 16:20:00',
  },
];
