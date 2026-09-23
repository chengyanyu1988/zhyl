import React, { useState, useMemo } from 'react';
import {
  Search,
  RotateCcw,
  Calendar,
  Download,
  Filter,
  Users,
  CheckSquare,
  BarChart2,
  PieChart as PieChartIcon,
  TrendingUp,
  UserCheck,
  Star,
  DollarSign,
  Briefcase,
  ChevronRight,
  ArrowUpDown,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from 'recharts';
import { SubPageId } from '../../types';

interface DataAnalyticsManagementProps {
  subPageId: SubPageId;
  onNotice: (msg: string) => void;
}

export const DataAnalyticsManagement: React.FC<DataAnalyticsManagementProps> = ({
  subPageId,
  onNotice,
}) => {
  // Global filter dates default to 2026-09-01 to 2026-09-19 (yesterday)
  const [startDate, setStartDate] = useState('2026-09-01');
  const [endDate, setEndDate] = useState('2026-09-19');
  const [keyword, setKeyword] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minCount, setMinCount] = useState('');
  const [maxCount, setMaxCount] = useState('');

  // Toast notification helper
  const handleBatchOperation = () => {
    onNotice('已选择所选数据项进行批量导出处理');
  };

  const handleExport = () => {
    onNotice('报表数据已成功导出为 Excel 文件');
  };

  const handleResetFilters = () => {
    setStartDate('2026-09-01');
    setEndDate('2026-09-19');
    setKeyword('');
    setCategoryFilter('all');
    setMinPrice('');
    setMaxPrice('');
    setMinCount('');
    setMaxCount('');
    onNotice('已重置筛选条件');
  };

  // ==================== MOCK DATA SETS FOR 2026-09-01 to 2026-09-19 ====================

  // 1. Daily Trend Data (2026-09-01 ~ 2026-09-19)
  const userTrendData = [
    { date: '09-01', newUsers: 3400, activeUsers: 4800, totalOrders: 1120 },
    { date: '09-03', newUsers: 3200, activeUsers: 4600, totalOrders: 1080 },
    { date: '09-05', newUsers: 2900, activeUsers: 4300, totalOrders: 990 },
    { date: '09-08', newUsers: 3100, activeUsers: 4500, totalOrders: 1050 },
    { date: '09-10', newUsers: 2800, activeUsers: 4100, totalOrders: 940 },
    { date: '09-12', newUsers: 1520, activeUsers: 2800, totalOrders: 620 },
    { date: '09-15', newUsers: 3300, activeUsers: 4900, totalOrders: 1180 },
    { date: '09-17', newUsers: 3000, activeUsers: 4700, totalOrders: 1060 },
    { date: '09-19', newUsers: 3500, activeUsers: 5100, totalOrders: 1250 },
  ];

  // Age Breakdown
  const userAgeData = [
    { name: '50岁以下', value: 100, ratio: '10.8%', color: '#3b82f6' },
    { name: '50-60岁', value: 240, ratio: '26.0%', color: '#10b981' },
    { name: '60-70岁', value: 120, ratio: '13.0%', color: '#0ea5e9' },
    { name: '70-80岁', value: 120, ratio: '13.0%', color: '#f59e0b' },
    { name: '80岁以上', value: 340, ratio: '37.2%', color: '#f87171' },
  ];

  // Gender Breakdown
  const userGenderData = [
    { name: '男', value: 540, ratio: '54.0%', color: '#10b981' },
    { name: '女', value: 560, ratio: '56.0%', color: '#f59e0b' },
  ];

  // 2. User Social Data (Sorted strictly by date in DESCENDING order: 2026-09-19 down to 2026-09-01)
  const socialUserList = [
    {
      id: '2026340089',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120',
      name: '王强',
      realName: '王强',
      phone: '156****9900',
      regTime: '2026-09-19 16:20:00',
      posts: 200,
      views: 54000,
      following: 23,
      followers: 240,
      likes: 3000,
      favorites: 600,
      comments: 100,
      shares: 356,
    },
    {
      id: '2026340088',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120',
      name: '李华',
      realName: '李华',
      phone: '138****1234',
      regTime: '2026-09-18 14:15:20',
      posts: 185,
      views: 48200,
      following: 19,
      followers: 210,
      likes: 2800,
      favorites: 550,
      comments: 92,
      shares: 310,
    },
    {
      id: '2026340087',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120',
      name: '张伟',
      realName: '张伟',
      phone: '189****5678',
      regTime: '2026-09-17 11:30:10',
      posts: 160,
      views: 41000,
      following: 15,
      followers: 180,
      likes: 2400,
      favorites: 480,
      comments: 85,
      shares: 270,
    },
    {
      id: '2026340086',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120',
      name: '刘敏',
      realName: '刘敏',
      phone: '137****8899',
      regTime: '2026-09-16 09:45:00',
      posts: 142,
      views: 36500,
      following: 31,
      followers: 320,
      likes: 3100,
      favorites: 720,
      comments: 110,
      shares: 390,
    },
    {
      id: '2026340085',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=120',
      name: '陈静',
      realName: '陈静',
      phone: '159****3344',
      regTime: '2026-09-14 17:10:00',
      posts: 128,
      views: 32000,
      following: 12,
      followers: 165,
      likes: 1950,
      favorites: 410,
      comments: 68,
      shares: 215,
    },
    {
      id: '2026340084',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=120',
      name: '赵军',
      realName: '赵军',
      phone: '136****7788',
      regTime: '2026-09-12 10:25:00',
      posts: 115,
      views: 29000,
      following: 28,
      followers: 290,
      likes: 2750,
      favorites: 590,
      comments: 98,
      shares: 325,
    },
    {
      id: '2026340083',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120',
      name: '钱秀珍',
      realName: '钱秀珍',
      phone: '180****6611',
      regTime: '2026-09-09 15:50:00',
      posts: 96,
      views: 24500,
      following: 14,
      followers: 140,
      likes: 1600,
      favorites: 330,
      comments: 54,
      shares: 180,
    },
    {
      id: '2026340082',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=120',
      name: '孙杰',
      realName: '孙杰',
      phone: '150****2233',
      regTime: '2026-09-06 13:05:00',
      posts: 82,
      views: 21000,
      following: 22,
      followers: 205,
      likes: 1850,
      favorites: 390,
      comments: 62,
      shares: 200,
    },
    {
      id: '2026340081',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=120',
      name: '周丽',
      realName: '周丽',
      phone: '135****4455',
      regTime: '2026-09-03 09:12:00',
      posts: 75,
      views: 18900,
      following: 18,
      followers: 175,
      likes: 1420,
      favorites: 310,
      comments: 48,
      shares: 155,
    },
    {
      id: '2026340080',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=120',
      name: '吴德强',
      realName: '吴德强',
      phone: '188****9090',
      regTime: '2026-09-01 10:00:00',
      posts: 60,
      views: 15400,
      following: 10,
      followers: 120,
      likes: 1100,
      favorites: 240,
      comments: 36,
      shares: 120,
    },
  ];

  // 3. Trade Overview Funnel & Charts
  const tradeTrendData = [
    { date: '09-01', amount: 2850, orders: 210 },
    { date: '09-04', amount: 2300, orders: 185 },
    { date: '09-07', amount: 2600, orders: 205 },
    { date: '09-10', amount: 1460, orders: 112 },
    { date: '09-13', amount: 2900, orders: 230 },
    { date: '09-16', amount: 2500, orders: 195 },
    { date: '09-19', amount: 3100, orders: 245 },
  ];

  const orderAmountDistribution = [
    { range: '100以下', count: 800 },
    { range: '100-500', count: 1200 },
    { range: '500-1000', count: 2500 },
    { range: '1000-1500', count: 3415 },
    { range: '1500-2000', count: 2500 },
    { range: '2000-2500', count: 2200 },
    { range: '2500-3000', count: 1500 },
    { range: '3000以上', count: 600 },
  ];

  // 4. Product Analysis List (Sorted by date/amount descending, 2026-09-19 down to 2026-09-01)
  const productAnalysisList = [
    {
      id: '3230090001',
      name: '脑中风术后康复理疗套餐',
      category: '康复理疗',
      icon: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=120',
      views: 2450,
      visitors: 2100,
      favorites: 720,
      shares: 910,
      buyers: 230,
      orders: 250,
      amount: 25000.0,
      conversionRate: '11.9%',
      reviewCount: 80,
      rating: 4.8,
      updatedAt: '2026-09-19 15:30:00',
    },
    {
      id: '3230090002',
      name: '上门老人全能深度保洁套餐',
      category: '家政护理',
      icon: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=120',
      views: 2200,
      visitors: 1980,
      favorites: 650,
      shares: 840,
      buyers: 210,
      orders: 225,
      amount: 22500.0,
      conversionRate: '11.3%',
      reviewCount: 80,
      rating: 4.8,
      updatedAt: '2026-09-18 11:20:00',
    },
    {
      id: '3230090003',
      name: '24小时高级月嫂及母婴照顾',
      category: '家政护理',
      icon: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&q=80&w=120',
      views: 2000,
      visitors: 1900,
      favorites: 600,
      shares: 800,
      buyers: 190,
      orders: 200,
      amount: 20000.0,
      conversionRate: '10.5%',
      reviewCount: 80,
      rating: 4.8,
      updatedAt: '2026-09-17 09:40:00',
    },
    {
      id: '3230090004',
      name: '全套老年深度上门健康体检',
      category: '上门体检',
      icon: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=120',
      views: 1850,
      visitors: 1650,
      favorites: 540,
      shares: 720,
      buyers: 175,
      orders: 188,
      amount: 18800.0,
      conversionRate: '11.4%',
      reviewCount: 80,
      rating: 4.8,
      updatedAt: '2026-09-15 16:15:00',
    },
    {
      id: '3230090005',
      name: '针灸推拿痛症调理体验课',
      category: '康复理疗',
      icon: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=120',
      views: 1600,
      visitors: 1420,
      favorites: 480,
      shares: 610,
      buyers: 150,
      orders: 162,
      amount: 16200.0,
      conversionRate: '11.4%',
      reviewCount: 75,
      rating: 4.9,
      updatedAt: '2026-09-12 14:00:00',
    },
    {
      id: '3230090006',
      name: '卧床长者翻身拍背与创口护理',
      category: '家政护理',
      icon: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=120',
      views: 1400,
      visitors: 1250,
      favorites: 410,
      shares: 530,
      buyers: 130,
      orders: 140,
      amount: 14000.0,
      conversionRate: '11.2%',
      reviewCount: 68,
      rating: 4.7,
      updatedAt: '2026-09-08 10:30:00',
    },
    {
      id: '3230090007',
      name: '高血压慢性病上门追踪随访',
      category: '上门体检',
      icon: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=120',
      views: 1200,
      visitors: 1050,
      favorites: 350,
      shares: 420,
      buyers: 110,
      orders: 118,
      amount: 11800.0,
      conversionRate: '11.2%',
      reviewCount: 62,
      rating: 4.8,
      updatedAt: '2026-09-04 13:10:00',
    },
    {
      id: '3230090008',
      name: '老年专调营养餐饮配送服务',
      category: '家政护理',
      icon: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=120',
      views: 950,
      visitors: 820,
      favorites: 280,
      shares: 340,
      buyers: 90,
      orders: 95,
      amount: 9500.0,
      conversionRate: '11.5%',
      reviewCount: 50,
      rating: 4.6,
      updatedAt: '2026-09-01 09:20:00',
    },
  ];

  // 5. Repurchase List (Sorted by date / count in DESCENDING order)
  const repurchaseUserList = [
    {
      id: '2026340001',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120',
      name: '王强',
      phone: '156****2658',
      count: 18,
      itemQty: 24,
      amount: 7850.0,
      unitPrice: 436.11,
      lastOrderDate: '2026-09-19 17:10:00',
    },
    {
      id: '2026340002',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120',
      name: '张小林',
      phone: '138****3399',
      count: 15,
      itemQty: 20,
      amount: 6200.0,
      unitPrice: 413.33,
      lastOrderDate: '2026-09-18 14:22:00',
    },
    {
      id: '2026340003',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120',
      name: '刘建平',
      phone: '189****7711',
      count: 12,
      itemQty: 18,
      amount: 5400.0,
      unitPrice: 450.0,
      lastOrderDate: '2026-09-16 10:45:00',
    },
    {
      id: '2026340004',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120',
      name: '陈芳',
      phone: '137****5544',
      count: 10,
      itemQty: 15,
      amount: 4560.0,
      unitPrice: 456.0,
      lastOrderDate: '2026-09-14 16:30:00',
    },
    {
      id: '2026340005',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=120',
      name: '赵国庆',
      phone: '159****8822',
      count: 9,
      itemQty: 12,
      amount: 3980.0,
      unitPrice: 442.22,
      lastOrderDate: '2026-09-11 11:15:00',
    },
    {
      id: '2026340006',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120',
      name: '孙秀英',
      phone: '136****1100',
      count: 8,
      itemQty: 10,
      amount: 3450.0,
      unitPrice: 431.25,
      lastOrderDate: '2026-09-08 09:20:00',
    },
    {
      id: '2026340007',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=120',
      name: '周德明',
      phone: '180****9933',
      count: 6,
      itemQty: 8,
      amount: 2700.0,
      unitPrice: 450.0,
      lastOrderDate: '2026-09-04 15:40:00',
    },
    {
      id: '2026340008',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=120',
      name: '钱桂兰',
      phone: '150****6677',
      count: 5,
      itemQty: 6,
      amount: 2150.0,
      unitPrice: 430.0,
      lastOrderDate: '2026-09-01 10:10:00',
    },
  ];

  // 6. Work Order Category & Satisfaction
  const workOrderCategoryData = [
    { name: '家政护理', value: 350, color: '#f87171' },
    { name: '康复理疗', value: 330, color: '#10b981' },
    { name: '上门体检', value: 220, color: '#f59e0b' },
  ];

  const workOrderSatisfactionData = [
    { name: '满意', value: 880, ratio: '88.0%', color: '#10b981' },
    { name: '不满意', value: 120, ratio: '12.0%', color: '#f87171' },
  ];

  // 7. Performance Staff List (Sorted strictly by JOIN TIME in DESCENDING order: 2026-09-19 down to 2026-09-01)
  const performanceStaffList = [
    {
      id: '2026340089',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120',
      name: '王小倩',
      joinTime: '2026-09-19 16:45:10',
      workOrders: 145,
      orders: 62,
      clients: 72,
      totalOrderAmount: 58000.0,
      totalCommission: 17400.0,
      totalTips: 820.0,
      totalIncome: 18220.0,
      settledIncome: 12620.0,
      unsettledIncome: 5600.0,
    },
    {
      id: '2026340088',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=120',
      name: '李秋萍',
      joinTime: '2026-09-18 11:20:00',
      workOrders: 132,
      orders: 56,
      clients: 65,
      totalOrderAmount: 53000.0,
      totalCommission: 15900.0,
      totalTips: 750.0,
      totalIncome: 16650.0,
      settledIncome: 11050.0,
      unsettledIncome: 5600.0,
    },
    {
      id: '2026340087',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120',
      name: '张国强',
      joinTime: '2026-09-17 09:15:00',
      workOrders: 120,
      orders: 50,
      clients: 60,
      totalOrderAmount: 50000.0,
      totalCommission: 15000.0,
      totalTips: 600.0,
      totalIncome: 15600.0,
      settledIncome: 10000.0,
      unsettledIncome: 5600.0,
    },
    {
      id: '2026340086',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120',
      name: '陈建华',
      joinTime: '2026-09-15 14:30:00',
      workOrders: 110,
      orders: 48,
      clients: 55,
      totalOrderAmount: 46000.0,
      totalCommission: 13800.0,
      totalTips: 540.0,
      totalIncome: 14340.0,
      settledIncome: 10000.0,
      unsettledIncome: 4340.0,
    },
    {
      id: '2026340085',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120',
      name: '赵淑兰',
      joinTime: '2026-09-13 10:10:00',
      workOrders: 98,
      orders: 42,
      clients: 50,
      totalOrderAmount: 41000.0,
      totalCommission: 12300.0,
      totalTips: 480.0,
      totalIncome: 12780.0,
      settledIncome: 8000.0,
      unsettledIncome: 4780.0,
    },
    {
      id: '2026340084',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=120',
      name: '孙秀珍',
      joinTime: '2026-09-10 15:00:00',
      workOrders: 88,
      orders: 38,
      clients: 44,
      totalOrderAmount: 37000.0,
      totalCommission: 11100.0,
      totalTips: 420.0,
      totalIncome: 11520.0,
      settledIncome: 7800.0,
      unsettledIncome: 3720.0,
    },
    {
      id: '2026340083',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=120',
      name: '周明理',
      joinTime: '2026-09-07 08:45:00',
      workOrders: 76,
      orders: 32,
      clients: 38,
      totalOrderAmount: 31000.0,
      totalCommission: 9300.0,
      totalTips: 350.0,
      totalIncome: 9650.0,
      settledIncome: 6500.0,
      unsettledIncome: 3150.0,
    },
    {
      id: '2026340082',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=120',
      name: '钱德全',
      joinTime: '2026-09-04 13:20:00',
      workOrders: 65,
      orders: 28,
      clients: 32,
      totalOrderAmount: 26000.0,
      totalCommission: 7800.0,
      totalTips: 280.0,
      totalIncome: 8080.0,
      settledIncome: 5500.0,
      unsettledIncome: 2580.0,
    },
    {
      id: '2026340081',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120',
      name: '吴凤英',
      joinTime: '2026-09-01 09:00:00',
      workOrders: 50,
      orders: 22,
      clients: 25,
      totalOrderAmount: 21000.0,
      totalCommission: 6300.0,
      totalTips: 210.0,
      totalIncome: 6510.0,
      settledIncome: 4500.0,
      unsettledIncome: 2010.0,
    },
  ];

  // 8. Review Staff List (Sorted strictly by date descending, 2026-09-19 down to 2026-09-01)
  const reviewStaffList = [
    {
      id: '2026340089',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120',
      name: '王小倩',
      roleType: '家政护工',
      phone: '156****9900',
      clients: 380,
      workOrders: 420,
      evaluations: 380,
      satisfied: 368,
      unsatisfied: 12,
      satisfactionRate: '96.8%',
      joinDate: '2026-09-19 16:20:00',
    },
    {
      id: '2026340088',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=120',
      name: '李秋萍',
      roleType: '月嫂母婴护理',
      phone: '138****1122',
      clients: 362,
      workOrders: 400,
      evaluations: 360,
      satisfied: 348,
      unsatisfied: 12,
      satisfactionRate: '96.7%',
      joinDate: '2026-09-18 11:15:00',
    },
    {
      id: '2026340087',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120',
      name: '张国强',
      roleType: '理疗康复师',
      phone: '189****3344',
      clients: 340,
      workOrders: 375,
      evaluations: 330,
      satisfied: 318,
      unsatisfied: 12,
      satisfactionRate: '96.4%',
      joinDate: '2026-09-16 14:10:00',
    },
    {
      id: '2026340086',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120',
      name: '陈建华',
      roleType: '体检护士',
      phone: '137****5566',
      clients: 310,
      workOrders: 340,
      evaluations: 300,
      satisfied: 288,
      unsatisfied: 12,
      satisfactionRate: '96.0%',
      joinDate: '2026-09-14 09:30:00',
    },
    {
      id: '2026340085',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120',
      name: '赵淑兰',
      roleType: '慢病随访员',
      phone: '159****7788',
      clients: 280,
      workOrders: 310,
      evaluations: 270,
      satisfied: 258,
      unsatisfied: 12,
      satisfactionRate: '95.6%',
      joinDate: '2026-09-11 15:40:00',
    },
    {
      id: '2026340084',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=120',
      name: '孙秀珍',
      roleType: '家政护工',
      phone: '136****9911',
      clients: 250,
      workOrders: 280,
      evaluations: 240,
      satisfied: 228,
      unsatisfied: 12,
      satisfactionRate: '95.0%',
      joinDate: '2026-09-07 10:20:00',
    },
    {
      id: '2026340083',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=120',
      name: '周明理',
      roleType: '理疗康复师',
      phone: '180****2233',
      clients: 220,
      workOrders: 250,
      evaluations: 210,
      satisfied: 198,
      unsatisfied: 12,
      satisfactionRate: '94.3%',
      joinDate: '2026-09-03 13:10:00',
    },
  ];

  // Filtering Logic
  const filteredSocialUsers = useMemo(() => {
    return socialUserList.filter((u) => {
      const matchKey =
        !keyword ||
        u.name.includes(keyword) ||
        u.id.includes(keyword) ||
        u.phone.includes(keyword);
      return matchKey;
    });
  }, [keyword]);

  const filteredProducts = useMemo(() => {
    return productAnalysisList.filter((p) => {
      const matchCat = categoryFilter === 'all' || p.category === categoryFilter;
      const matchKey = !keyword || p.name.includes(keyword) || p.id.includes(keyword);
      const matchMinPrice = !minPrice || p.amount >= parseFloat(minPrice);
      const matchMaxPrice = !maxPrice || p.amount <= parseFloat(maxPrice);
      return matchCat && matchKey && matchMinPrice && matchMaxPrice;
    });
  }, [categoryFilter, keyword, minPrice, maxPrice]);

  const filteredRepurchase = useMemo(() => {
    return repurchaseUserList.filter((u) => {
      const matchKey = !keyword || u.name.includes(keyword) || u.phone.includes(keyword);
      const matchMinCount = !minCount || u.count >= parseInt(minCount, 10);
      const matchMaxCount = !maxCount || u.count <= parseInt(maxCount, 10);
      return matchKey && matchMinCount && matchMaxCount;
    });
  }, [keyword, minCount, maxCount]);

  const filteredPerformance = useMemo(() => {
    return performanceStaffList.filter((s) => {
      const matchKey = !keyword || s.name.includes(keyword) || s.id.includes(keyword);
      return matchKey;
    });
  }, [keyword]);

  const filteredReviews = useMemo(() => {
    return reviewStaffList.filter((s) => {
      const matchKey =
        !keyword || s.name.includes(keyword) || s.id.includes(keyword) || s.phone.includes(keyword);
      return matchKey;
    });
  }, [keyword]);

  // RENDER SWITCHER BASED ON subPageId
  return (
    <div className="p-6 bg-slate-50 min-h-screen text-slate-800">
      {/* 1. 用户概况 (data_user_overview) */}
      {subPageId === 'data_user_overview' && (
        <div className="space-y-6">
          {/* Top Title & Global Date Filter */}
          <div className="bg-white p-5 rounded-xl shadow-xs border border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-5 bg-emerald-500 rounded-full inline-block"></span>
              <h1 className="text-xl font-bold text-slate-800">用户概况</h1>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <span>选择日期</span>
              <div className="flex items-center gap-2 border border-slate-200 rounded-lg px-3 py-1.5 bg-white">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="outline-hidden text-slate-700 text-sm"
                />
                <span className="text-slate-400">~</span>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="outline-hidden text-slate-700 text-sm"
                />
                <Calendar className="w-4 h-4 text-slate-400 ml-1" />
              </div>
            </div>
          </div>

          {/* User Trend Chart Card */}
          <div className="bg-white p-6 rounded-xl shadow-xs border border-slate-100">
            <h2 className="text-base font-semibold text-slate-800 mb-4">用户趋势统计</h2>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={userTrendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="userColor" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" stroke="#94a3b8" tickLine={false} />
                  <YAxis stroke="#94a3b8" tickLine={false} domain={[0, 3500]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    }}
                    formatter={(value: any) => [`${value} 人`, '新增用户数量']}
                  />
                  <Area
                    type="monotone"
                    dataKey="newUsers"
                    stroke="#10b981"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#userColor)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center gap-2 mt-2 text-sm text-slate-600">
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
              <span>新增用户数量</span>
            </div>
          </div>

          {/* Two Donut Charts Side-by-Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Donut 1: 年龄构成 */}
            <div className="bg-white p-6 rounded-xl shadow-xs border border-slate-100">
              <h2 className="text-base font-semibold text-slate-800 mb-4">用户年龄构成</h2>
              <div className="h-64 relative flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={userAgeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={65}
                      outerRadius={95}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {userAgeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: any) => [`${value} 人次`, '数量']} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-xs text-slate-400">用户总数</span>
                  <span className="text-2xl font-bold text-slate-800">1220</span>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-4 mt-2 text-xs text-slate-600">
                {userAgeData.map((item) => (
                  <div key={item.name} className="flex items-center gap-1.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full inline-block"
                      style={{ backgroundColor: item.color }}
                    ></span>
                    <span>
                      {item.name} <span className="font-medium text-slate-800">{item.value}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Donut 2: 性别构成 */}
            <div className="bg-white p-6 rounded-xl shadow-xs border border-slate-100">
              <h2 className="text-base font-semibold text-slate-800 mb-4">用户性别构成</h2>
              <div className="h-64 relative flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={userGenderData}
                      cx="50%"
                      cy="50%"
                      innerRadius={65}
                      outerRadius={95}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {userGenderData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: any) => [`${value} 人`, '数量']} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-xs text-slate-400">用户总数</span>
                  <span className="text-2xl font-bold text-slate-800">1220</span>
                </div>
              </div>
              <div className="flex items-center justify-center gap-6 mt-2 text-xs text-slate-600">
                {userGenderData.map((item) => (
                  <div key={item.name} className="flex items-center gap-1.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full inline-block"
                      style={{ backgroundColor: item.color }}
                    ></span>
                    <span>
                      {item.name} <span className="font-medium text-slate-800">{item.value}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. 用户年龄分析 (data_user_age) */}
      {subPageId === 'data_user_age' && (
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-xl shadow-xs border border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-5 bg-emerald-500 rounded-full inline-block"></span>
              <h1 className="text-xl font-bold text-slate-800">用户年龄分析</h1>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <span>注册日期</span>
              <div className="flex items-center gap-2 border border-slate-200 rounded-lg px-3 py-1.5 bg-white">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="outline-hidden text-slate-700 text-sm"
                />
                <span className="text-slate-400">~</span>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="outline-hidden text-slate-700 text-sm"
                />
                <Calendar className="w-4 h-4 text-slate-400 ml-1" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-xs border border-slate-100">
            <h2 className="text-base font-semibold text-slate-800 mb-4">用户年龄构成</h2>
            <div className="h-64 relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={userAgeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {userAgeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xs text-slate-400">用户总数</span>
                <span className="text-2xl font-bold text-slate-800">1220</span>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-2 text-xs text-slate-600">
              {userAgeData.map((item) => (
                <div key={item.name} className="flex items-center gap-1.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full inline-block"
                    style={{ backgroundColor: item.color }}
                  ></span>
                  <span>
                    {item.name} <span className="font-medium text-slate-800">{item.value}</span>
                  </span>
                </div>
              ))}
            </div>

            <div className="flex justify-end mt-6 mb-3">
              <button
                onClick={handleExport}
                className="flex items-center gap-1.5 px-3.5 py-1.5 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg text-sm transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>导出</span>
              </button>
            </div>

            <div className="overflow-x-auto rounded-lg border border-slate-100">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 text-slate-600 font-medium border-b border-slate-100">
                  <tr>
                    <th className="py-3 px-4">序号</th>
                    <th className="py-3 px-4">年龄段</th>
                    <th className="py-3 px-4">人次</th>
                    <th className="py-3 px-4">比例</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {userAgeData.map((item, idx) => (
                    <tr key={item.name} className="hover:bg-slate-50/50">
                      <td className="py-3 px-4">{idx + 1}</td>
                      <td className="py-3 px-4 font-medium">{item.name}</td>
                      <td className="py-3 px-4">{item.value}</td>
                      <td className="py-3 px-4">{item.ratio}</td>
                    </tr>
                  ))}
                  <tr className="bg-slate-50 font-semibold text-slate-800">
                    <td className="py-3 px-4">合计</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">920</td>
                    <td className="py-3 px-4">100%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 3. 用户性别分析 (data_user_gender) */}
      {subPageId === 'data_user_gender' && (
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-xl shadow-xs border border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-5 bg-emerald-500 rounded-full inline-block"></span>
              <h1 className="text-xl font-bold text-slate-800">用户性别分析</h1>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <span>注册日期</span>
              <div className="flex items-center gap-2 border border-slate-200 rounded-lg px-3 py-1.5 bg-white">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="outline-hidden text-slate-700 text-sm"
                />
                <span className="text-slate-400">~</span>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="outline-hidden text-slate-700 text-sm"
                />
                <Calendar className="w-4 h-4 text-slate-400 ml-1" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-xs border border-slate-100">
            <h2 className="text-base font-semibold text-slate-800 mb-4">用户性别构成</h2>
            <div className="h-64 relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={userGenderData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {userGenderData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xs text-slate-400">用户总数</span>
                <span className="text-2xl font-bold text-slate-800">1220</span>
              </div>
            </div>
            <div className="flex items-center justify-center gap-6 mt-2 text-xs text-slate-600">
              {userGenderData.map((item) => (
                <div key={item.name} className="flex items-center gap-1.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full inline-block"
                    style={{ backgroundColor: item.color }}
                  ></span>
                  <span>
                    {item.name} <span className="font-medium text-slate-800">{item.value}</span>
                  </span>
                </div>
              ))}
            </div>

            <div className="flex justify-end mt-6 mb-3">
              <button
                onClick={handleExport}
                className="flex items-center gap-1.5 px-3.5 py-1.5 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg text-sm transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>导出</span>
              </button>
            </div>

            <div className="overflow-x-auto rounded-lg border border-slate-100">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 text-slate-600 font-medium border-b border-slate-100">
                  <tr>
                    <th className="py-3 px-4">序号</th>
                    <th className="py-3 px-4">性别</th>
                    <th className="py-3 px-4">人次</th>
                    <th className="py-3 px-4">比例</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {userGenderData.map((item, idx) => (
                    <tr key={item.name} className="hover:bg-slate-50/50">
                      <td className="py-3 px-4">{idx + 1}</td>
                      <td className="py-3 px-4 font-medium">{item.name}</td>
                      <td className="py-3 px-4">{item.value}</td>
                      <td className="py-3 px-4">{item.ratio}</td>
                    </tr>
                  ))}
                  <tr className="bg-slate-50 font-semibold text-slate-800">
                    <td className="py-3 px-4">合计</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">1000</td>
                    <td className="py-3 px-4">100%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 4. 用户社交统计 (data_user_social) */}
      {subPageId === 'data_user_social' && (
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-xl shadow-xs border border-slate-100 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-5 bg-emerald-500 rounded-full inline-block"></span>
              <h1 className="text-xl font-bold text-slate-800">用户社交统计</h1>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <span>注册日期</span>
                  <div className="flex items-center gap-2 border border-slate-200 rounded-lg px-3 py-1.5 bg-white">
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="outline-hidden text-slate-700 text-sm"
                    />
                    <span className="text-slate-400">~</span>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="outline-hidden text-slate-700 text-sm"
                    />
                    <Calendar className="w-4 h-4 text-slate-400 ml-1" />
                  </div>
                </div>

                <div className="relative w-64">
                  <input
                    type="text"
                    placeholder="请输入关键字"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg pl-3 pr-8 py-1.5 text-sm outline-hidden focus:border-emerald-500"
                  />
                  <Search className="w-4 h-4 text-slate-400 absolute right-2.5 top-2.5" />
                </div>

                <button
                  onClick={() => onNotice('搜索结果已更新')}
                  className="p-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors cursor-pointer"
                  title="查询"
                >
                  <Search className="w-4 h-4" />
                </button>
                <button
                  onClick={handleResetFilters}
                  className="p-2 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
                  title="重置"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleBatchOperation}
                className="px-4 py-1.5 border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-lg text-sm font-medium transition-colors cursor-pointer"
              >
                批量操作
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-xs border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 text-slate-600 font-medium border-b border-slate-100">
                  <tr>
                    <th className="py-3 px-4">头像/姓名</th>
                    <th className="py-3 px-4">ID</th>
                    <th className="py-3 px-4">真实姓名</th>
                    <th className="py-3 px-4">手机号码</th>
                    <th className="py-3 px-4">动态数量</th>
                    <th className="py-3 px-4">阅读量</th>
                    <th className="py-3 px-4">关注</th>
                    <th className="py-3 px-4">粉丝</th>
                    <th className="py-3 px-4">点赞</th>
                    <th className="py-3 px-4">收藏</th>
                    <th className="py-3 px-4">评论</th>
                    <th className="py-3 px-4">转发</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filteredSocialUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-9 h-9 rounded-full object-cover border border-slate-200"
                          />
                          <span className="font-medium text-slate-800">{user.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-slate-500 font-mono text-xs">{user.id}</td>
                      <td className="py-3 px-4">{user.realName}</td>
                      <td className="py-3 px-4 text-slate-600 font-mono text-xs">{user.phone}</td>
                      <td className="py-3 px-4 font-semibold text-slate-800">{user.posts}</td>
                      <td className="py-3 px-4">{user.views.toLocaleString()}</td>
                      <td className="py-3 px-4">{user.following}</td>
                      <td className="py-3 px-4">{user.followers}</td>
                      <td className="py-3 px-4">{user.likes}</td>
                      <td className="py-3 px-4">{user.favorites}</td>
                      <td className="py-3 px-4">{user.comments}</td>
                      <td className="py-3 px-4">{user.shares}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 5. 交易概况 (data_trade_overview) */}
      {subPageId === 'data_trade_overview' && (
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-xl shadow-xs border border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-5 bg-emerald-500 rounded-full inline-block"></span>
              <h1 className="text-xl font-bold text-slate-800">交易概况</h1>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <span>选择日期</span>
              <div className="flex items-center gap-2 border border-slate-200 rounded-lg px-3 py-1.5 bg-white">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="outline-hidden text-slate-700 text-sm"
                />
                <span className="text-slate-400">~</span>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="outline-hidden text-slate-700 text-sm"
                />
                <Calendar className="w-4 h-4 text-slate-400 ml-1" />
              </div>
            </div>
          </div>

          {/* Funnel Metric Card Block matching screenshot 8 */}
          <div className="bg-emerald-50/40 border border-emerald-100 p-6 rounded-xl space-y-4">
            <h2 className="text-base font-semibold text-slate-800 mb-2">交易概况</h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white p-5 rounded-xl border border-emerald-100 shadow-2xs">
              <div className="space-y-1">
                <p className="text-xs text-slate-500">浏览量</p>
                <p className="text-2xl font-bold text-slate-800">2512</p>
              </div>
              <div className="space-y-1 border-l border-slate-100 pl-4">
                <p className="text-xs text-slate-500">访客量</p>
                <p className="text-2xl font-bold text-slate-800">2265</p>
              </div>
              <div className="col-span-2 flex items-center justify-end">
                <span className="px-3 py-1 bg-emerald-500 text-white font-medium text-xs rounded-md">
                  访客
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white p-5 rounded-xl border border-emerald-100 shadow-2xs">
              <div className="space-y-1">
                <p className="text-xs text-slate-500">下单人数</p>
                <p className="text-2xl font-bold text-slate-800">303</p>
              </div>
              <div className="space-y-1 border-l border-slate-100 pl-4">
                <p className="text-xs text-slate-500">下单笔数</p>
                <p className="text-2xl font-bold text-slate-800">425</p>
              </div>
              <div className="space-y-1 border-l border-slate-100 pl-4">
                <p className="text-xs text-slate-500">下单金额 (元)</p>
                <p className="text-2xl font-bold text-emerald-600">12540.00</p>
              </div>
              <div className="flex items-center justify-end">
                <span className="px-3 py-1 bg-emerald-500 text-white font-medium text-xs rounded-md">
                  下单
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 bg-white p-5 rounded-xl border border-emerald-100 shadow-2xs">
              <div className="space-y-1">
                <p className="text-xs text-slate-500">支付人数</p>
                <p className="text-2xl font-bold text-slate-800">112</p>
              </div>
              <div className="space-y-1 border-l border-slate-100 pl-4">
                <p className="text-xs text-slate-500">支付订单数</p>
                <p className="text-2xl font-bold text-slate-800">203</p>
              </div>
              <div className="space-y-1 border-l border-slate-100 pl-4">
                <p className="text-xs text-slate-500">支付金额 (元)</p>
                <p className="text-2xl font-bold text-emerald-600">12500.00</p>
              </div>
              <div className="space-y-1 border-l border-slate-100 pl-4">
                <p className="text-xs text-slate-500">客单价 (元)</p>
                <p className="text-2xl font-bold text-slate-800">1100.00</p>
              </div>
              <div className="flex items-center justify-end">
                <span className="px-3 py-1 bg-emerald-500 text-white font-medium text-xs rounded-md">
                  支付
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white p-5 rounded-xl border border-emerald-100 shadow-2xs">
              <div className="space-y-1">
                <p className="text-xs text-slate-500">退款订单数</p>
                <p className="text-2xl font-bold text-slate-800">1</p>
              </div>
              <div className="space-y-1 border-l border-slate-100 pl-4">
                <p className="text-xs text-slate-500">退款金额 (元)</p>
                <p className="text-2xl font-bold text-rose-500">212.00</p>
              </div>
              <div className="space-y-1 border-l border-slate-100 pl-4">
                <p className="text-xs text-slate-500">退款率</p>
                <p className="text-2xl font-bold text-slate-800">0.50%</p>
              </div>
              <div className="flex items-center justify-end">
                <span className="px-3 py-1 bg-emerald-500 text-white font-medium text-xs rounded-md">
                  退款
                </span>
              </div>
            </div>
          </div>

          {/* Spline Trend Chart */}
          <div className="bg-white p-6 rounded-xl shadow-xs border border-slate-100">
            <h2 className="text-base font-semibold text-slate-800 mb-4">成交趋势</h2>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={tradeTrendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="tradeGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" stroke="#94a3b8" tickLine={false} />
                  <YAxis stroke="#94a3b8" tickLine={false} domain={[0, 3500]} />
                  <Tooltip formatter={(val: any) => [`${val} 元`, '订单金额']} />
                  <Area
                    type="monotone"
                    dataKey="amount"
                    stroke="#10b981"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#tradeGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center gap-2 mt-2 text-sm text-slate-600">
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
              <span>订单金额</span>
            </div>
          </div>

          {/* Bar Chart: Order Amount Distribution */}
          <div className="bg-white p-6 rounded-xl shadow-xs border border-slate-100">
            <h2 className="text-base font-semibold text-slate-800 mb-4">订单金额分布</h2>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={orderAmountDistribution}>
                  <XAxis dataKey="range" stroke="#94a3b8" tickLine={false} />
                  <YAxis stroke="#94a3b8" tickLine={false} />
                  <Tooltip formatter={(val: any) => [`${val} 笔`, '订单数量']} />
                  <Bar dataKey="count" fill="#34d399" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center gap-2 mt-2 text-sm text-slate-600">
              <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block"></span>
              <span>订单数量</span>
            </div>
          </div>
        </div>
      )}

      {/* 6. 商品分析 (data_product_analysis) */}
      {subPageId === 'data_product_analysis' && (
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-xl shadow-xs border border-slate-100 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-5 bg-emerald-500 rounded-full inline-block"></span>
              <h1 className="text-xl font-bold text-slate-800">商品分析</h1>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <span>商品类别</span>
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="border border-slate-200 rounded-lg px-3 py-1.5 bg-white text-sm outline-hidden"
                  >
                    <option value="all">请选择</option>
                    <option value="家政护理">家政护理</option>
                    <option value="康复理疗">康复理疗</option>
                    <option value="上门体检">上门体检</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <span>价格</span>
                  <input
                    type="number"
                    placeholder="最低价格"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="w-24 border border-slate-200 rounded-lg px-2.5 py-1.5 text-sm outline-hidden"
                  />
                  <span className="text-slate-400">-</span>
                  <input
                    type="number"
                    placeholder="最高价格"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-24 border border-slate-200 rounded-lg px-2.5 py-1.5 text-sm outline-hidden"
                  />
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <span>选择日期</span>
                  <div className="flex items-center gap-2 border border-slate-200 rounded-lg px-3 py-1.5 bg-white">
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="outline-hidden text-slate-700 text-sm"
                    />
                    <span className="text-slate-400">~</span>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="outline-hidden text-slate-700 text-sm"
                    />
                    <Calendar className="w-4 h-4 text-slate-400 ml-1" />
                  </div>
                </div>

                <div className="relative w-52">
                  <input
                    type="text"
                    placeholder="请输入关键字"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg pl-3 pr-8 py-1.5 text-sm outline-hidden focus:border-emerald-500"
                  />
                  <Search className="w-4 h-4 text-slate-400 absolute right-2.5 top-2.5" />
                </div>

                <button
                  onClick={() => onNotice('搜索结果已更新')}
                  className="p-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors cursor-pointer"
                  title="查询"
                >
                  <Search className="w-4 h-4" />
                </button>
                <button
                  onClick={handleResetFilters}
                  className="p-2 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
                  title="重置"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleBatchOperation}
                className="px-4 py-1.5 border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-lg text-sm font-medium transition-colors cursor-pointer"
              >
                批量操作
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-xs border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 text-slate-600 font-medium border-b border-slate-100">
                  <tr>
                    <th className="py-3 px-4">商品信息</th>
                    <th className="py-3 px-4">商品类别</th>
                    <th className="py-3 px-4">浏览量</th>
                    <th className="py-3 px-4">访客量</th>
                    <th className="py-3 px-4">收藏量</th>
                    <th className="py-3 px-4">分享次数</th>
                    <th className="py-3 px-4">支付人数</th>
                    <th className="py-3 px-4">支付订单数</th>
                    <th className="py-3 px-4">订单金额 (元)</th>
                    <th className="py-3 px-4">访客转化率</th>
                    <th className="py-3 px-4 text-center">评价数</th>
                    <th className="py-3 px-4 text-center">评分</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filteredProducts.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.icon}
                            alt={item.name}
                            className="w-10 h-10 rounded-lg object-cover border border-slate-200"
                          />
                          <div>
                            <p className="font-medium text-slate-800">{item.name}</p>
                            <p className="text-xs text-slate-400 font-mono">{item.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2.5 py-0.5 bg-slate-100 text-slate-700 rounded-md text-xs font-medium">
                          {item.category}
                        </span>
                      </td>
                      <td className="py-3 px-4">{item.views}</td>
                      <td className="py-3 px-4">{item.visitors}</td>
                      <td className="py-3 px-4">{item.favorites}</td>
                      <td className="py-3 px-4">{item.shares}</td>
                      <td className="py-3 px-4">{item.buyers}</td>
                      <td className="py-3 px-4">{item.orders}</td>
                      <td className="py-3 px-4 font-semibold text-emerald-600">
                        {item.amount.toFixed(2)}
                      </td>
                      <td className="py-3 px-4 font-medium text-slate-800">
                        {item.conversionRate}
                      </td>
                      <td className="py-3 px-4 text-center font-mono text-slate-800">
                        {item.reviewCount ?? 80}
                      </td>
                      <td className="py-3 px-4 text-center font-mono text-emerald-700 font-semibold">
                        {(item.rating ?? 4.8).toFixed(1)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 7. 复购分析 (data_repurchase_analysis) */}
      {subPageId === 'data_repurchase_analysis' && (
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-xl shadow-xs border border-slate-100 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-5 bg-emerald-500 rounded-full inline-block"></span>
              <h1 className="text-xl font-bold text-slate-800">复购分析</h1>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <span>购买次数</span>
                  <input
                    type="number"
                    placeholder="最低次数"
                    value={minCount}
                    onChange={(e) => setMinCount(e.target.value)}
                    className="w-24 border border-slate-200 rounded-lg px-2.5 py-1.5 text-sm outline-hidden"
                  />
                  <span className="text-slate-400">-</span>
                  <input
                    type="number"
                    placeholder="最高次数"
                    value={maxCount}
                    onChange={(e) => setMaxCount(e.target.value)}
                    className="w-24 border border-slate-200 rounded-lg px-2.5 py-1.5 text-sm outline-hidden"
                  />
                </div>

                <div className="relative w-64">
                  <input
                    type="text"
                    placeholder="请输入关键字"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg pl-3 pr-8 py-1.5 text-sm outline-hidden focus:border-emerald-500"
                  />
                  <Search className="w-4 h-4 text-slate-400 absolute right-2.5 top-2.5" />
                </div>

                <button
                  onClick={() => onNotice('搜索结果已更新')}
                  className="p-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors cursor-pointer"
                  title="查询"
                >
                  <Search className="w-4 h-4" />
                </button>
                <button
                  onClick={handleResetFilters}
                  className="p-2 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
                  title="重置"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleBatchOperation}
                className="px-4 py-1.5 border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-lg text-sm font-medium transition-colors cursor-pointer"
              >
                批量操作
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-xs border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 text-slate-600 font-medium border-b border-slate-100">
                  <tr>
                    <th className="py-3 px-4">头像/昵称</th>
                    <th className="py-3 px-4">ID</th>
                    <th className="py-3 px-4">手机号码</th>
                    <th className="py-3 px-4">购买次数</th>
                    <th className="py-3 px-4">购买商品数量</th>
                    <th className="py-3 px-4">支付金额 (元)</th>
                    <th className="py-3 px-4">次单价 (元)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filteredRepurchase.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-9 h-9 rounded-full object-cover border border-slate-200"
                          />
                          <span className="font-medium text-slate-800">{user.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-mono text-xs text-slate-500">{user.id}</td>
                      <td className="py-3 px-4 font-mono text-xs text-slate-600">{user.phone}</td>
                      <td className="py-3 px-4 font-bold text-emerald-600">{user.count}</td>
                      <td className="py-3 px-4">{user.itemQty}</td>
                      <td className="py-3 px-4 font-semibold text-slate-800">
                        {user.amount.toFixed(2)}
                      </td>
                      <td className="py-3 px-4 text-slate-600">{user.unitPrice.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 8. 工单分析 (data_workorder_analysis) */}
      {subPageId === 'data_workorder_analysis' && (
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-xl shadow-xs border border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-5 bg-emerald-500 rounded-full inline-block"></span>
              <h1 className="text-xl font-bold text-slate-800">服务工单分析</h1>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <span>选择日期</span>
              <div className="flex items-center gap-2 border border-slate-200 rounded-lg px-3 py-1.5 bg-white">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="outline-hidden text-slate-700 text-sm"
                />
                <span className="text-slate-400">~</span>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="outline-hidden text-slate-700 text-sm"
                />
                <Calendar className="w-4 h-4 text-slate-400 ml-1" />
              </div>
            </div>
          </div>

          {/* Stat cards row */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-2xs text-center">
              <p className="text-xs text-slate-500 mb-1">工单总数量</p>
              <p className="text-2xl font-bold text-slate-800">1000</p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-2xs text-center">
              <p className="text-xs text-slate-500 mb-1">待服务工单数量</p>
              <p className="text-2xl font-bold text-amber-600">690</p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-2xs text-center">
              <p className="text-xs text-slate-500 mb-1">服务工单数量</p>
              <p className="text-2xl font-bold text-blue-600">30</p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-2xs text-center">
              <p className="text-xs text-slate-500 mb-1">已完成工单数量</p>
              <p className="text-2xl font-bold text-emerald-600">24</p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-2xs text-center">
              <p className="text-xs text-slate-500 mb-1">已取消工单数量</p>
              <p className="text-2xl font-bold text-slate-400">60</p>
            </div>
          </div>

          {/* Spline Line Chart */}
          <div className="bg-white p-6 rounded-xl shadow-xs border border-slate-100">
            <h2 className="text-base font-semibold text-slate-800 mb-4">服务工单趋势统计</h2>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={userTrendData}>
                  <defs>
                    <linearGradient id="woColor" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" stroke="#94a3b8" tickLine={false} />
                  <YAxis stroke="#94a3b8" tickLine={false} />
                  <Tooltip formatter={(val: any) => [`${val} 单`, '新增工单数量']} />
                  <Area
                    type="monotone"
                    dataKey="totalOrders"
                    stroke="#10b981"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#woColor)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center gap-2 mt-2 text-sm text-slate-600">
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
              <span>新增工单数量</span>
            </div>
          </div>

          {/* Two Donut Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-xs border border-slate-100">
              <h2 className="text-base font-semibold text-slate-800 mb-4">工单分类构成</h2>
              <div className="h-64 relative flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={workOrderCategoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={65}
                      outerRadius={95}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {workOrderCategoryData.map((entry, idx) => (
                        <Cell key={`cell-${idx}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-xs text-slate-400">工单总数</span>
                  <span className="text-2xl font-bold text-slate-800">1000</span>
                </div>
              </div>
              <div className="flex items-center justify-center gap-6 mt-2 text-xs text-slate-600">
                {workOrderCategoryData.map((item) => (
                  <div key={item.name} className="flex items-center gap-1.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full inline-block"
                      style={{ backgroundColor: item.color }}
                    ></span>
                    <span>
                      {item.name} <span className="font-medium text-slate-800">{item.value}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-xs border border-slate-100">
              <h2 className="text-base font-semibold text-slate-800 mb-4">服务满意度</h2>
              <div className="h-64 relative flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={workOrderSatisfactionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={65}
                      outerRadius={95}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {workOrderSatisfactionData.map((entry, idx) => (
                        <Cell key={`cell-${idx}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-xs text-slate-400">工单评价总数量</span>
                  <span className="text-2xl font-bold text-slate-800">800</span>
                </div>
              </div>
              <div className="flex items-center justify-center gap-6 mt-2 text-xs text-slate-600">
                {workOrderSatisfactionData.map((item) => (
                  <div key={item.name} className="flex items-center gap-1.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full inline-block"
                      style={{ backgroundColor: item.color }}
                    ></span>
                    <span>
                      {item.name} <span className="font-medium text-slate-800">{item.value}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 9. 业绩统计 (data_performance_stats) */}
      {subPageId === 'data_performance_stats' && (
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-xl shadow-xs border border-slate-100 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-5 bg-emerald-500 rounded-full inline-block"></span>
              <h1 className="text-xl font-bold text-slate-800">业绩统计</h1>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <span>加入日期</span>
                  <div className="flex items-center gap-2 border border-slate-200 rounded-lg px-3 py-1.5 bg-white">
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="outline-hidden text-slate-700 text-sm"
                    />
                    <span className="text-slate-400">~</span>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="outline-hidden text-slate-700 text-sm"
                    />
                    <Calendar className="w-4 h-4 text-slate-400 ml-1" />
                  </div>
                </div>

                <div className="relative w-64">
                  <input
                    type="text"
                    placeholder="请输入关键字"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg pl-3 pr-8 py-1.5 text-sm outline-hidden focus:border-emerald-500"
                  />
                  <Search className="w-4 h-4 text-slate-400 absolute right-2.5 top-2.5" />
                </div>

                <button
                  onClick={() => onNotice('搜索结果已更新')}
                  className="p-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors cursor-pointer"
                  title="查询"
                >
                  <Search className="w-4 h-4" />
                </button>
                <button
                  onClick={handleResetFilters}
                  className="p-2 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
                  title="重置"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleBatchOperation}
                className="px-4 py-1.5 border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-lg text-sm font-medium transition-colors cursor-pointer"
              >
                批量操作
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-xs border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 text-slate-600 font-medium border-b border-slate-100">
                  <tr>
                    <th className="py-3 px-4">服务人员编号</th>
                    <th className="py-3 px-4">服务人员信息</th>
                    <th className="py-3 px-4">加入时间</th>
                    <th className="py-3 px-4">服务工单数量</th>
                    <th className="py-3 px-4">订单数量</th>
                    <th className="py-3 px-4">服务客户数量</th>
                    <th className="py-3 px-4">订单总金额 (元)</th>
                    <th className="py-3 px-4">佣金总金额 (元)</th>
                    <th className="py-3 px-4">打赏金额 (元)</th>
                    <th className="py-3 px-4">总收入 (元)</th>
                    <th className="py-3 px-4 text-center">
                      <div>已结算收入</div>
                      <div className="text-xs font-normal text-slate-400">(元)</div>
                    </th>
                    <th className="py-3 px-4 text-center">
                      <div>待结算收入</div>
                      <div className="text-xs font-normal text-slate-400">(元)</div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filteredPerformance.map((staff) => (
                    <tr key={staff.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-3 px-4 font-mono text-xs text-slate-500">{staff.id}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={staff.avatar}
                            alt={staff.name}
                            className="w-9 h-9 rounded-full object-cover border border-slate-200"
                          />
                          <span className="font-medium text-slate-800">{staff.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-mono text-xs text-slate-500">
                        {staff.joinTime}
                      </td>
                      <td className="py-3 px-4">{staff.workOrders}</td>
                      <td className="py-3 px-4">{staff.orders}</td>
                      <td className="py-3 px-4">{staff.clients}</td>
                      <td className="py-3 px-4">{staff.totalOrderAmount.toFixed(2)}</td>
                      <td className="py-3 px-4">{staff.totalCommission.toFixed(2)}</td>
                      <td className="py-3 px-4">{staff.totalTips.toFixed(2)}</td>
                      <td className="py-3 px-4 font-bold text-emerald-600">
                        {staff.totalIncome.toFixed(2)}
                      </td>
                      <td className="py-3 px-4 text-center font-mono text-slate-800">
                        {staff.settledIncome.toFixed(2)}
                      </td>
                      <td className="py-3 px-4 text-center font-mono text-slate-800">
                        {staff.unsettledIncome.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 10. 评价统计 (data_review_stats) */}
      {subPageId === 'data_review_stats' && (
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-xl shadow-xs border border-slate-100 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-5 bg-emerald-500 rounded-full inline-block"></span>
              <h1 className="text-xl font-bold text-slate-800">评价统计</h1>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <span>加入日期</span>
                  <div className="flex items-center gap-2 border border-slate-200 rounded-lg px-3 py-1.5 bg-white">
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="outline-hidden text-slate-700 text-sm"
                    />
                    <span className="text-slate-400">~</span>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="outline-hidden text-slate-700 text-sm"
                    />
                    <Calendar className="w-4 h-4 text-slate-400 ml-1" />
                  </div>
                </div>

                <div className="relative w-64">
                  <input
                    type="text"
                    placeholder="请输入关键字"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg pl-3 pr-8 py-1.5 text-sm outline-hidden focus:border-emerald-500"
                  />
                  <Search className="w-4 h-4 text-slate-400 absolute right-2.5 top-2.5" />
                </div>

                <button
                  onClick={() => onNotice('搜索结果已更新')}
                  className="p-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors cursor-pointer"
                  title="查询"
                >
                  <Search className="w-4 h-4" />
                </button>
                <button
                  onClick={handleResetFilters}
                  className="p-2 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
                  title="重置"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleBatchOperation}
                className="px-4 py-1.5 border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-lg text-sm font-medium transition-colors cursor-pointer"
              >
                批量操作
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-xs border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 text-slate-600 font-medium border-b border-slate-100">
                  <tr>
                    <th className="py-3 px-4">服务人员编号</th>
                    <th className="py-3 px-4">服务人员信息</th>
                    <th className="py-3 px-4">服务类型</th>
                    <th className="py-3 px-4">手机号码</th>
                    <th className="py-3 px-4">服务客户量</th>
                    <th className="py-3 px-4">服务工单量</th>
                    <th className="py-3 px-4">参评量</th>
                    <th className="py-3 px-4">满意数量</th>
                    <th className="py-3 px-4">不满意数量</th>
                    <th className="py-3 px-4">满意率</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filteredReviews.map((staff) => (
                    <tr key={staff.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-3 px-4 font-mono text-xs text-slate-500">{staff.id}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={staff.avatar}
                            alt={staff.name}
                            className="w-9 h-9 rounded-full object-cover border border-slate-200"
                          />
                          <span className="font-medium text-slate-800">{staff.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2.5 py-0.5 bg-slate-100 text-slate-700 rounded-md text-xs font-medium">
                          {staff.roleType}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono text-xs text-slate-600">{staff.phone}</td>
                      <td className="py-3 px-4">{staff.clients}</td>
                      <td className="py-3 px-4">{staff.workOrders}</td>
                      <td className="py-3 px-4">{staff.evaluations}</td>
                      <td className="py-3 px-4 text-emerald-600 font-medium">{staff.satisfied}</td>
                      <td className="py-3 px-4 text-rose-500 font-medium">{staff.unsatisfied}</td>
                      <td className="py-3 px-4 font-bold text-slate-800">
                        {staff.satisfactionRate}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
