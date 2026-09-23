export type MainNavId =
  | 'home'
  | 'users'
  | 'staff'
  | 'product'
  | 'trade'
  | 'ops'
  | 'data'
  | 'care'
  | 'monitoring'
  | 'finance'
  | 'analytics'
  | 'system';

export type SubPageId =
  // home
  | 'workbench'
  | 'appointment'
  // users (matching screenshot)
  | 'user_list'
  | 'user_tags'
  | 'user_reports'
  | 'user_levels'
  | 'msg_broadcast'
  | 'msg_chat'
  | 'market_coupons'
  | 'market_points'
  | 'market_growth'
  | 'elderly_list'
  | 'health_records'
  // staff / service (matching screenshots 1-10)
  | 'staff_list'
  | 'staff_schedule'
  | 'service_staff_list'
  | 'service_staff_tags'
  | 'service_staff_audit'
  | 'service_work_orders'
  | 'service_commission'
  | 'service_tips'
  | 'service_order_settings'
  // product (matching screenshots 4-8)
  | 'product_housekeeping_goods'
  | 'product_housekeeping_cats'
  | 'product_rehab_goods'
  | 'product_rehab_items'
  | 'product_checkup_goods'
  | 'product_checkup_cats'
  | 'product_settings_params'
  | 'product_settings_general'
  // trade / 交易 (matching screenshots 1-28)
  | 'trade_all_orders'
  | 'trade_order_detail'
  | 'trade_after_sales'
  | 'trade_reviews'
  | 'trade_withdrawals'
  | 'trade_statements'
  | 'trade_refund_reasons'
  | 'trade_general_settings'
  // ops / operations (matching latest screenshots)
  | 'ops_life_dynamics'
  | 'ops_life_topics'
  | 'ops_life_banners'
  | 'ops_activity_list'
  | 'ops_activity_registrations'
  | 'ops_activity_fields'
  | 'ops_diet_recipes'
  | 'ops_diet_tags'
  | 'ops_news_list'
  | 'ops_disease_list'
  | 'ops_disease_cats'
  | 'ops_institution_list'
  | 'ops_institution_tags'
  | 'ops_lecture_videos'
  | 'ops_lecture_tags'
  | 'ops_comments_all'
  // data / 数据 (matching screenshots)
  | 'data_user_overview'
  | 'data_user_age'
  | 'data_user_gender'
  | 'data_user_social'
  | 'data_trade_overview'
  | 'data_product_analysis'
  | 'data_repurchase_analysis'
  | 'data_workorder_analysis'
  | 'data_performance_stats'
  | 'data_review_stats'
  // care
  | 'service_orders'
  | 'care_plans'
  // monitoring
  | 'video_monitor'
  | 'alarm_events'
  // finance
  | 'order_bills'
  | 'insurance_settlement'
  // analytics
  | 'operation_stats'
  | 'elderly_portrait'
  // system (matching system settings screenshots)
  | 'org_settings'
  | 'audit_logs'
  | 'sys_staff'
  | 'sys_staff_form'
  | 'sys_roles'
  | 'sys_role_form'
  | 'sys_drug_units'
  | 'sys_protocols'
  | 'sys_logs'
  | 'sys_profile'
  | 'sys_reset_pwd';

export type ActivePage = SubPageId;

export interface StatCardData {
  title: string;
  value: number;
  changeText: string;
  isPositive: boolean;
  type: 'green-line' | 'yellow-bar' | 'red-line' | 'purple-bar';
}

export interface QuickEntranceItem {
  id: string;
  title: string;
  iconName: string;
  bgColor: string;
  textColor: string;
  targetPage?: SubPageId;
}

export interface UserTagItem {
  name: string;
  count: number;
  percentage: number;
}

export interface ServiceRatioItem {
  name: string;
  ratio: number;
  color: string;
}

export interface TrendDataPoint {
  date: string;
  value: number;
}

export interface TopProductItem {
  rank: number;
  image: string;
  title: string;
  orderCount: number;
}

export interface TopStaffItem {
  rank: number;
  avatar: string;
  name: string;
  serviceType: string;
  workOrderCount: number;
}

export type AppointmentStatus = '已完成' | '服务中' | '待服务';

export interface AppointmentItem {
  id: string;
  orderNo?: string;
  title: string;
  timeRange: string;
  startHour: number; // e.g. 9 for 9:00
  userName: string;
  userAge?: number;
  userAvatar?: string;
  staffName: string;
  staffAvatar?: string;
  status: AppointmentStatus;
  category: '康复理疗' | '家政护理' | '上门体检';
  date: string;
  phone?: string;
  address?: string;
  notes?: string;
}

// Elderly profile data interface
export interface ElderlyProfile {
  id: string;
  recordNo: string;
  name: string;
  age: number;
  gender: '男' | '女';
  phone: string;
  idCard: string;
  roomAddress: string;
  emergencyContact: string;
  careLevel: '特级护理' | '一级护理' | '二级护理' | '自理关怀';
  chronicTags: string[];
  assignedStaff: string;
  assignedDoctor: string;
  latestUpdateDate: string; // 2026-09-01 to 2026-09-18
  status: '在护' | '监护中' | '随访中';
  healthScore: number;
}

// Staff member data interface
export interface StaffMember {
  id: string;
  staffNo: string;
  name: string;
  gender: '男' | '女';
  avatar: string;
  title: string;
  serviceType: '家政护理' | '康复理疗' | '上门体检' | '适老改造';
  phone: string;
  monthlyOrders: number;
  satisfactionRate: string;
  status: '服务中' | '空闲接单' | '轮休';
  latestServiceDate: string; // 2026-09-01 to 2026-09-18
  certificate: string;
}

// Service order interface
export interface CareOrder {
  id: string;
  orderNo: string;
  serviceName: string;
  category: '康复理疗' | '家政护理' | '上门体检' | '应急关怀';
  elderlyName: string;
  elderlyAge: number;
  staffName: string;
  address: string;
  price: number;
  subsidyAmount: number;
  orderTime: string; // 2026-09-18 15:30 down to 2026-09-01
  status: '已完成' | '服务中' | '待响应';
  rating?: number;
  feedback?: string;
}

// Alarm event interface
export interface AlarmEvent {
  id: string;
  alarmNo: string;
  alarmType: '跌倒风险预警' | '夜起超时未归' | '心率异常波动' | '卫生间紧急拉绳' | '离开安全围栏';
  elderlyName: string;
  roomLocation: string;
  deviceSource: string;
  triggerTime: string; // 2026-09-18 16:45 down to 2026-09-01
  severity: '高危' | '中度' | '一般提醒';
  handleStatus: '已处置核实' | '护工处理中' | '待确认';
  handlerStaff: string;
}

// Finance bill transaction interface
export interface FinanceBill {
  id: string;
  billNo: string;
  title: string;
  elderlyName: string;
  payerName: string;
  totalAmount: number;
  insuranceCover: number;
  selfPaid: number;
  payChannel: '长护险基金' | '微信支付' | '医保卡' | '社区助老补贴';
  payTime: string; // 2026-09-18 16:20 down to 2026-09-01
  status: '支付成功' | '已开票' | '补贴审核中';
}

// Audit log interface
export interface AuditLog {
  id: string;
  operator: string;
  role: string;
  action: string;
  module: string;
  ipAddress: string;
  timestamp: string; // 2026-09-18 17:15 down to 2026-09-01
  status: '成功' | '警告';
  detail: string;
}

// User Management (用户管理) AppUser interface matching the user screenshot
export interface UserOperationRecord {
  id: string;
  action: string;
  operator: string;
  time: string; // strictly between 2026-09-18 and 2026-09-01
}

export interface AppUser {
  id: string;
  userNo: string; // e.g. "202609000001"
  name: string;
  avatar: string;
  gender: '男' | '女';
  tags: string[]; // e.g. ['高血压', '糖尿病', '多次购买']
  realName: string;
  phone: string;
  phoneMasked: string; // e.g. "192****4486"
  registerTime: string; // e.g. "2026-09-18 10:09:09" (descending)
  registerType: string; // e.g. "PC端注册", "平台系统注册", "社区代办"
  lastLoginTime: string;
  lastBuyTime: string;
  remarks: string;

  // Social stats
  social: {
    posts: number;
    reads: number;
    following: number;
    followers: number;
    likes: number;
    favorites: number;
    comments: number;
    shares: number;
  };

  // Operation history logs
  operationLogs: UserOperationRecord[];

  // Profile detail form fields
  profile: {
    nickname: string;
    accountId: string;
    birthDate: string;
    idCard: string;
    address: string;
    bio: string;
    height: string;
    weight: string;
    ethnicity: string;
    education: string;
    nativePlace: string;
    marriage: string;
    occupation: string;
    company: string;
    emergencyContact: string;
    emergencyPhone: string;
    status: '启用' | '禁用';
    passwordMasked: string;
  };

  // Extra detail tab content
  healthDetails?: {
    bloodPressure: string;
    glucose: string;
    heartRate: number;
    fallRiskLevel: string;
    doctorNotes: string;
  };
  medications?: {
    name: string;
    dosage: string;
    frequency: string;
    prescribedDate: string;
  }[];
  devices?: {
    name: string;
    code: string;
    boundDate: string;
    status: string;
  }[];
}

export interface ProductItem {
  id: string;
  code: string; // e.g. "323009000"
  title: string;
  thumbnail: string;
  category: string; // e.g. "生活照料", "护理复健", "专业体检"
  tags?: string[]; // e.g. ['脑血管疾病', '运动疗法']
  moduleCategory: '家政护理' | '康复理疗' | '上门体检' | '通用商品';
  price: number;
  originalPrice?: number;
  salesCount: number;
  commission: number;
  durationHours: number;
  servicePeopleCount: number;
  status: '已上架' | '已下架';
  lastUpdater: string;
  lastUpdateTime: string; // e.g. "2026-09-19 10:09:09"
  remarks?: string;
  scene?: string;
  area?: string;
  scope?: string;
  overtimeFee?: number;
  detailsHtml?: string;
  isLimitedTimeDiscount?: boolean;
  discountStartTime?: string;
  discountEndTime?: string;
  validityPeriod?: string;
  bookingRules?: string;
}

export interface ProductCategoryItem {
  id: string;
  sortOrder: number;
  name: string;
  icon: string;
  productCount: number;
  lastUpdater: string;
  lastUpdateTime: string; // strictly 2026-09-01 to 2026-09-19
  status: '启用' | '禁用';
}

export interface ServiceItemDetail {
  id: string;
  name: string;
  code: string;
  durationHours: number;
  servicePeopleCount: number;
  commission: number;
  description: string;
  status: '启用' | '禁用';
}

export interface ProductParamItem {
  id: string;
  sortOrder: number;
  name: string;
  serviceType: string;
  paramType: string;
  isRequired: boolean;
  placeholder?: string;
  lastUpdater: string;
  lastUpdateTime: string;
  status: '启用' | '禁用';
}

export interface GeneralSettingsData {
  orderButtonName: string;
  enablePraiseRate: boolean;
  enableDetailStaff: boolean;
  displayStaffCount: number;
  enableProductSales: boolean;
}

// Operations / 运营 Data Interfaces (Screenshots 1 - 13)
export interface DynamicPostItem {
  id: string;
  content: string;
  topic: string;
  likesCount: number;
  collectsCount: number;
  sharesCount: number;
  commentsCount: number;
  publisherName: string;
  publisherPhone: string;
  publisherAvatar: string;
  publishTime: string; // YYYY-MM-DD HH:mm:ss in 2026-09-01..2026-09-19
  status: '显示' | '隐藏';
  image: string;
}

export interface TopicItem {
  id: string;
  topicName: string;
  contentCount: number;
  viewCount: number;
  shareCount: number;
  followCount: number;
  lastUpdater: string;
  lastUpdateTime: string; // YYYY-MM-DD HH:mm:ss in 2026-09-01..2026-09-19
  status: '启用' | '禁用';
}

export interface BannerItem {
  id: string;
  sortOrder: number;
  imageUrl: string;
  title: string;
  linkUrl: string;
  lastUpdater: string;
  lastUpdateTime: string; // YYYY-MM-DD HH:mm:ss in 2026-09-01..2026-09-19
  status: '启用' | '禁用';
}

export interface ActivityItem {
  id: string;
  title: string;
  status: '进行中' | '已结束' | '未开始';
  category: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  location: string;
  imageUrl: string;
  registrationDeadline: string; // YYYY-MM-DD
  description: string;
  enableRegistration: boolean;
  publishType: '立即发布' | '定时发布';
  publishTime: string;
  remarks: string;
  lastUpdater: string;
  lastUpdateTime: string; // YYYY-MM-DD HH:mm:ss in 2026-09-01..2026-09-19
}

export interface ActivityRegistrationItem {
  id: string;
  accountNickname: string;
  accountUid: string;
  accountAvatar: string;
  realName: string;
  age: number;
  phone: string;
  photographyDuration: string;
  address: string;
  status: '待审核' | '审核通过' | '审核不通过';
  submitTime: string; // YYYY-MM-DD HH:mm:ss in 2026-09-01..2026-09-19
  remarks?: string;
}

export interface ActivityFieldItem {
  id: string;
  sortOrder: number;
  fieldName: string;
  fieldType: '文本' | '数字' | '下拉单选';
  isRequired: boolean;
  placeholder: string;
  lastUpdater: string;
  lastUpdateTime: string; // YYYY-MM-DD HH:mm:ss in 2026-09-01..2026-09-19
  status: '启用' | '禁用';
}

export interface RecipeItem {
  id: string;
  title: string;
  category: string;
  tags: string[];
  sharesCount: number;
  collectsCount: number;
  status: '已发布' | '草稿' | '已下架';
  updater: string;
  lastUpdateTime: string; // YYYY-MM-DD HH:mm:ss in 2026-09-01..2026-09-19
  coverImage?: string;
  detailHtml?: string;
  publishType?: '立即发布' | '定时发布';
  scheduledDate?: string;
  scheduledTime?: string;
}

export interface DietTagItem {
  id: string;
  name: string;
  recipeCount: number;
  updater: string;
  lastUpdateTime: string; // YYYY-MM-DD HH:mm:ss in 2026-09-01..2026-09-19
  status: '启用' | '禁用';
}

export interface HealthNewsItem {
  id: string;
  title: string;
  publishTime: string; // YYYY-MM-DD HH:mm:ss in 2026-09-01..2026-09-19
  likesCount: number;
  collectsCount: number;
  sharesCount: number;
  commentsCount: number;
  publisher: string;
  status: '已发布' | '草稿' | '已下架';
  coverImage?: string;
  detailHtml?: string;
  publishType?: '立即发布' | '定时发布';
}

export interface DiseaseItem {
  id: string;
  name: string;
  category: string;
  sharesCount: number;
  collectsCount: number;
  status: '已发布' | '草稿';
  updater: string;
  lastUpdateTime: string; // YYYY-MM-DD HH:mm:ss in 2026-09-01..2026-09-19
  intro?: string;
  symptoms?: string;
  complications?: string;
  treatments?: string;
}

export interface DiseaseCategoryItem {
  id: string;
  sortOrder: number;
  name: string;
  diseaseCount: number;
  updater: string;
  lastUpdateTime: string; // YYYY-MM-DD HH:mm:ss in 2026-09-01..2026-09-19
  status: '启用' | '禁用';
}

export interface InstitutionItem {
  id: string;
  name: string;
  featureTags: string[];
  sharesCount: number;
  collectsCount: number;
  status: '已发布' | '草稿';
  updater: string;
  lastUpdateTime: string; // YYYY-MM-DD HH:mm:ss in 2026-09-01..2026-09-19
  coverImage?: string;
  businessHours?: string;
  address?: string;
  phone?: string;
  detailHtml?: string;
}

export interface InstitutionTagItem {
  id: string;
  name: string;
  institutionCount: number;
  updater: string;
  lastUpdateTime: string; // YYYY-MM-DD HH:mm:ss in 2026-09-01..2026-09-19
  status: '启用' | '禁用';
}

export interface LectureVideoItem {
  id: string;
  title: string;
  tags: string[];
  likesCount: number;
  collectsCount: number;
  sharesCount: number;
  commentsCount: number;
  updater: string;
  lastUpdateTime: string; // YYYY-MM-DD HH:mm:ss in 2026-09-01..2026-09-19
  status: '已发布' | '草稿';
  coverImage?: string;
  videoUrl?: string;
  intro?: string;
}

export interface LectureTagItem {
  id: string;
  name: string;
  videoCount: number;
  updater: string;
  lastUpdateTime: string; // YYYY-MM-DD HH:mm:ss in 2026-09-01..2026-09-19
  status: '启用' | '禁用';
}

export interface CommentItem {
  id: string;
  publishTime: string; // YYYY-MM-DD HH:mm:ss in 2026-09-01..2026-09-19
  content: string;
  module: string; // 健康资讯, 健康讲堂, 食谱管理, 疾病宝典
  targetTitle: string;
  likesCount: number;
  commenterName: string;
  commenterAvatar: string;
  status: '显示' | '隐藏';
}

// 交易 (Trade / Order Management) Interfaces
export type TradeOrderStatus =
  | '待付款'
  | '待接单'
  | '待服务'
  | '服务中'
  | '已完成'
  | '退款完成，订单关闭'
  | '支付超时，订单关闭';

export interface TradeOrder {
  id: string;
  orderNo: string;
  orderTime: string; // strictly 2026-09-01 to 2026-09-19 (descending)
  payTime?: string;
  dispatchTime?: string;
  finishTime?: string;
  closeTime?: string;

  // Buyer info
  buyerName: string;
  buyerPhone: string; // masked e.g. "138****1234"
  buyerPhoneFull: string;
  buyerAvatar: string;
  buyerId: string;
  buyerRegisterTime: string;
  buyerRegisterType: string;
  buyerLastLogin: string;
  buyerLastBuy: string;

  // Product info
  productImage: string;
  productTitle: string;
  productCategory: '家政护工' | '康复理疗' | '上门体检';
  originalPrice: number;
  discountAmount: number;
  price: number;
  payableAmount: number;
  actualPaidAmount: number;

  // Status & Payment
  status: TradeOrderStatus;
  paymentMethod: '支付宝' | '微信支付' | '银联支付' | '-';
  orderSource: '平台系统' | '服务大厅' | 'Web端' | '社区窗口';

  // Reservation & Staff
  address: string;
  reservationTime: string;
  estimatedDuration: string;
  contactPhone: string;
  couponCode?: string;
  assignedStaff?: string;

  // Remark
  remark?: string;

  // After Sales (if applicable)
  afterSalesNo?: string;
  refundAmount?: number;
  refundReason?: string;
  refundExplanation?: string;
  refundApplyTime?: string;
  refundStatus?: '退款成功' | '处理中' | '已拒绝';
  refundChannel?: string;
  refundRemark?: string;
  refundOperatorTime?: string;
  refundOperator?: string;
}

export interface AfterSalesRecord {
  id: string;
  afterSalesNo: string;
  orderNo: string;
  buyerName: string;
  buyerAvatar?: string;
  buyerPhone: string;
  buyerId?: string;
  buyerRegisterTime?: string;
  buyerRegisterType?: string;
  buyerLastLogin?: string;
  buyerLastBuy?: string;
  productTitle: string;
  productImage: string;
  price?: number;
  actualPaidAmount: number;
  refundAmount: number;
  reason: string;
  refundExplanation?: string;
  applyTime: string; // strictly 2026-09-01 to 2026-09-19
  status: '处理中' | '售后完成' | '售后关闭';
  operator?: string;
  payMethod?: '支付宝' | '微信支付' | '银联支付';
  assignedStaff?: string;
  orderTime?: string;
  payTime?: string;
  acceptTime?: string;
  dealTime?: string;
  finishTime?: string;
  cancelTime?: string;
  orderStatus?: string;
  orderSource?: string;
  refundChannel?: string;
  remark?: string;
}

export interface OrderReview {
  id: string;
  productTitle: string;
  productImage: string;
  productCode: string;
  serviceType?: '家政护理' | '康复理疗' | '上门体检';
  rating: number; // 1 to 5
  buyerName: string;
  buyerAvatar: string;
  buyerPhone: string;
  locationTag?: string;
  timeAgoTag?: string;
  orderNo: string;
  content: string;
  staffName: string;
  reviewTime: string; // strictly 2026-09-01 to 2026-09-19
  replyContent?: string;
  replyTime?: string;
  status: '显示' | '隐藏';
  isTop?: boolean;
}

export interface WithdrawalRecord {
  id: string;
  withdrawalNo: string;
  staffName: string;
  staffPhone: string;
  staffAvatar?: string;
  staffIdCard?: string;
  accountNo?: string;
  amount: number;
  serviceFee?: number;
  bankName: string;
  bankBranch?: string;
  bankCardMasked: string;
  applyTime: string; // strictly 2026-09-01 to 2026-09-19
  finishTime?: string;
  status: '提现成功' | '审核中' | '已到账' | '提现失败';
}

export interface FinancialStatement {
  id: string;
  statementNo: string;
  type: '收入' | '支出' | '订单收入' | '退款支出' | '服务佣金' | '提现扣减';
  billType?: string;
  orderNo?: string;
  channel: '微信支付' | '支付宝' | '银联' | '长护险平台' | '招商银行';
  amount: number; // positive or negative
  balance: number;
  time: string; // strictly 2026-09-01 to 2026-09-19
  remark: string;
}

export interface RefundReasonSetting {
  id: string;
  sortOrder: number;
  reasonText: string;
  relatedOrderCount: number;
  updater: string;
  lastUpdateTime: string; // strictly 2026-09-01 to 2026-09-19
  status: '启用' | '禁用';
}

export interface TradeGeneralSettings {
  unpaidAutoCancelMinutes: number;
  allowRefundAfterOrder: boolean;
  afterSalesDeadlineDays: number;
  autoRefundTimeoutHours: number;
  autoApproveRefund: boolean;
}





