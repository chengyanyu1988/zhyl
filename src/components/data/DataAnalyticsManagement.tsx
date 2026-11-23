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
  ArrowUpRight,
  Heart,
  Activity,
  CheckCircle2,
  User,
  LayoutGrid,
  List,
  SlidersHorizontal,
  Clock,
  Sparkles,
  ShieldCheck,
  Eye,
  Layers,
  HeartPulse,
  Stethoscope,
  Info,
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
  ComposedChart,
  Line,
  Legend,
  CartesianGrid,
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
  // Global filter dates default to 2026-10-01 to 2026-10-19 (yesterday)
  const [startDate, setStartDate] = useState('2026-10-01');
  const [endDate, setEndDate] = useState('2026-10-19');
  const [keyword, setKeyword] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minCount, setMinCount] = useState('');
  const [maxCount, setMaxCount] = useState('');
  const [trendMetric, setTrendMetric] = useState<'all' | 'new' | 'active'>('all');
  // Age analysis specific states
  const [ageChartMode, setAgeChartMode] = useState<'composed' | 'area' | 'ranked'>('composed');
  const [ageTableViewMode, setAgeTableViewMode] = useState<'cards' | 'strips'>('cards');
  const [ageCareFilter, setAgeCareFilter] = useState<'all' | 'self' | 'assisted' | 'special'>('all');
  const [ageSearchKeyword, setAgeSearchKeyword] = useState('');
  const [ageSortBy, setAgeSortBy] = useState<'default' | 'count_desc' | 'intensity_desc'>('default');

  // Toast notification helper
  const handleBatchOperation = () => {
    onNotice('已选择所选数据项进行批量导出处理');
  };

  const handleExport = () => {
    onNotice('报表数据已成功导出为 Excel 文件');
  };

  const handleResetFilters = () => {
    setStartDate('2026-10-01');
    setEndDate('2026-10-19');
    setKeyword('');
    setCategoryFilter('all');
    setMinPrice('');
    setMaxPrice('');
    setMinCount('');
    setMaxCount('');
    onNotice('已重置筛选条件');
  };

  // ==================== MOCK DATA SETS FOR 2026-10-01 to 2026-10-19 ====================

  // 1. Daily Trend Data (2026-10-01 ~ 2026-10-19)
  const userTrendData = [
    { date: '10-01', newUsers: 3400, activeUsers: 4800, totalOrders: 1120 },
    { date: '10-03', newUsers: 3200, activeUsers: 4600, totalOrders: 1080 },
    { date: '10-05', newUsers: 2900, activeUsers: 4300, totalOrders: 990 },
    { date: '10-08', newUsers: 3100, activeUsers: 4500, totalOrders: 1050 },
    { date: '10-10', newUsers: 2800, activeUsers: 4100, totalOrders: 940 },
    { date: '10-13', newUsers: 1520, activeUsers: 2800, totalOrders: 620 },
    { date: '10-16', newUsers: 3300, activeUsers: 4900, totalOrders: 1180 },
    { date: '10-18', newUsers: 3000, activeUsers: 4700, totalOrders: 1060 },
    { date: '10-20', newUsers: 3500, activeUsers: 5100, totalOrders: 1250 },
  ];

  // Age Breakdown
  const userAgeData = [
    { name: '50岁以下', value: 100, ratio: '10.8%', color: '#3b82f6' },
    { name: '50-60岁', value: 240, ratio: '26.0%', color: '#10b981' },
    { name: '60-70岁', value: 120, ratio: '13.0%', color: '#0ea5e9' },
    { name: '70-80岁', value: 120, ratio: '13.0%', color: '#f59e0b' },
    { name: '80岁以上', value: 340, ratio: '37.2%', color: '#f87171' },
  ];

  // Enhanced Age Cohort Insights for data_user_age
  const ageCohortsDetail = [
    {
      id: 'cohort-1',
      name: '50岁以下',
      subTitle: '子女代办 / 初涉老预备期',
      value: 100,
      ratio: '10.8%',
      ratioNum: 10.8,
      color: '#3b82f6',
      bgLight: 'bg-blue-50/70',
      borderLight: 'border-blue-200/80',
      careType: 'self',
      careLevel: '自理型',
      careLevelBadge: 'bg-blue-50 text-blue-700 border-blue-200',
      careNeedIndex: 18,
      vitalityIndex: 92,
      avgFrequency: '1.8次/月',
      avgSpend: '¥320',
      careHours: '12h/月',
      keyDemands: ['适老化辅具代购', '体检预约', '紧急呼叫绑定', '家庭健康档案'],
      coreScenario: '多由子女代为咨询或绑定设备，重点关注父母防跌倒与健康预警',
      riskLevel: '平稳自理',
      riskBadge: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      growthTrend: '+14.2%',
    },
    {
      id: 'cohort-2',
      name: '50-60岁',
      subTitle: '活力银发 / 自理高活跃客群',
      value: 240,
      ratio: '26.0%',
      ratioNum: 26.0,
      color: '#10b981',
      bgLight: 'bg-emerald-50/70',
      borderLight: 'border-emerald-200/80',
      careType: 'self',
      careLevel: '活力型',
      careLevelBadge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      careNeedIndex: 32,
      vitalityIndex: 82,
      avgFrequency: '3.6次/月',
      avgSpend: '¥680',
      careHours: '24h/月',
      keyDemands: ['中医理疗康复', '长者文娱活动', '健康体检套餐', '助行旅居养生'],
      coreScenario: '生活自理能力强，精神文化需求旺盛，是线上预约与活动报名主力',
      riskLevel: '健康活力',
      riskBadge: 'text-teal-700 bg-teal-50 border-teal-200',
      growthTrend: '+18.5%',
    },
    {
      id: 'cohort-3',
      name: '60-70岁',
      subTitle: '平稳过渡 / 慢病保健管理期',
      value: 120,
      ratio: '13.0%',
      ratioNum: 13.0,
      color: '#0ea5e9',
      bgLight: 'bg-sky-50/70',
      borderLight: 'border-sky-200/80',
      careType: 'assisted',
      careLevel: '轻度介助',
      careLevelBadge: 'bg-sky-50 text-sky-700 border-sky-200',
      careNeedIndex: 52,
      vitalityIndex: 65,
      avgFrequency: '5.2次/月',
      avgSpend: '¥1,120',
      careHours: '40h/月',
      keyDemands: ['高血压糖尿病随访', '社区助餐送餐', '日常家政清洁', '定期用药提醒'],
      coreScenario: '慢病进入规范监测期，助餐与家政开始成为日常刚性需求',
      riskLevel: '常规关注',
      riskBadge: 'text-sky-700 bg-sky-50 border-sky-200',
      growthTrend: '+9.3%',
    },
    {
      id: 'cohort-4',
      name: '70-80岁',
      subTitle: '慢病高发 / 中度介助依赖期',
      value: 120,
      ratio: '13.0%',
      ratioNum: 13.0,
      color: '#f59e0b',
      bgLight: 'bg-amber-50/70',
      borderLight: 'border-amber-200/80',
      careType: 'assisted',
      careLevel: '中度介护',
      careLevelBadge: 'bg-amber-50 text-amber-700 border-amber-200',
      careNeedIndex: 78,
      vitalityIndex: 44,
      avgFrequency: '9.4次/月',
      avgSpend: '¥1,950',
      careHours: '72h/月',
      keyDemands: ['上门助浴护理', '就医绿色通道陪诊', '专业居家照料', '防跌倒看护'],
      coreScenario: '活动范围受限，日常照护依赖程度明显上升，照护频次与客单价高',
      riskLevel: '重点监测',
      riskBadge: 'text-amber-700 bg-amber-50 border-amber-200',
      growthTrend: '+6.8%',
    },
    {
      id: 'cohort-5',
      name: '80岁以上',
      subTitle: '重度失能 / 特护关爱第一客群',
      value: 340,
      ratio: '37.2%',
      ratioNum: 37.2,
      color: '#ef4444',
      bgLight: 'bg-rose-50/70',
      borderLight: 'border-rose-200/80',
      careType: 'special',
      careLevel: '重度/特护',
      careLevelBadge: 'bg-rose-50 text-rose-700 border-rose-200',
      careNeedIndex: 96,
      vitalityIndex: 24,
      avgFrequency: '18.6次/月',
      avgSpend: '¥3,650',
      careHours: '160h/月',
      keyDemands: ['24小时专人陪护', '防压疮翻身护理', '管路护理留置', '生命体征急救'],
      coreScenario: '平台占比最高的群体（37.2%），多为重度失能/高龄空巢，需综合医护介入',
      riskLevel: '高危特护',
      riskBadge: 'text-rose-700 bg-rose-50 border-rose-200',
      growthTrend: '+12.4%',
    },
  ];

  const filteredAgeCohorts = useMemo(() => {
    return ageCohortsDetail
      .filter((item) => {
        if (ageCareFilter === 'self' && item.careType !== 'self') return false;
        if (ageCareFilter === 'assisted' && item.careType !== 'assisted') return false;
        if (ageCareFilter === 'special' && item.careType !== 'special') return false;
        if (ageSearchKeyword.trim()) {
          const kw = ageSearchKeyword.toLowerCase();
          const matchName = item.name.toLowerCase().includes(kw);
          const matchSub = item.subTitle.toLowerCase().includes(kw);
          const matchDemands = item.keyDemands.some((d) => d.toLowerCase().includes(kw));
          const matchLevel = item.careLevel.toLowerCase().includes(kw);
          if (!matchName && !matchSub && !matchDemands && !matchLevel) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (ageSortBy === 'count_desc') return b.value - a.value;
        if (ageSortBy === 'intensity_desc') return b.careNeedIndex - a.careNeedIndex;
        return 0; // default order
      });
  }, [ageCareFilter, ageSearchKeyword, ageSortBy]);

  // Gender Breakdown
  const userGenderData = [
    { name: '男', value: 540, ratio: '54.0%', color: '#10b981' },
    { name: '女', value: 560, ratio: '56.0%', color: '#f59e0b' },
  ];

  // 2. User Social Data (Sorted strictly by date in DESCENDING order: 2026-10-19 down to 2026-10-01)
  const socialUserList = [
    {
      id: '2026340089',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120',
      name: '王强',
      realName: '王强',
      phone: '156****9900',
      regTime: '2026-10-19 16:20:00',
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
      regTime: '2026-10-18 14:15:20',
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
      regTime: '2026-10-17 11:30:10',
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
      regTime: '2026-10-16 09:45:00',
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
      regTime: '2026-10-14 17:10:00',
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
      regTime: '2026-10-12 10:25:00',
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
      regTime: '2026-10-09 15:50:00',
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
      regTime: '2026-10-06 13:05:00',
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
      regTime: '2026-10-03 09:12:00',
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
      regTime: '2026-10-01 10:00:00',
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
    { date: '10-01', amount: 2850, orders: 210 },
    { date: '10-04', amount: 2300, orders: 185 },
    { date: '10-07', amount: 2600, orders: 205 },
    { date: '10-10', amount: 1460, orders: 112 },
    { date: '10-14', amount: 2900, orders: 230 },
    { date: '10-17', amount: 2500, orders: 195 },
    { date: '10-20', amount: 3100, orders: 245 },
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

  // 4. Product Analysis List (Sorted by date/amount descending, 2026-10-19 down to 2026-10-01)
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
      updatedAt: '2026-10-19 15:30:00',
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
      updatedAt: '2026-10-18 11:20:00',
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
      updatedAt: '2026-10-17 09:40:00',
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
      updatedAt: '2026-10-15 16:15:00',
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
      updatedAt: '2026-10-12 14:00:00',
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
      updatedAt: '2026-10-08 10:30:00',
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
      updatedAt: '2026-10-04 13:10:00',
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
      updatedAt: '2026-10-01 09:20:00',
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
      lastOrderDate: '2026-10-19 17:10:00',
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
      lastOrderDate: '2026-10-18 14:22:00',
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
      lastOrderDate: '2026-10-16 10:45:00',
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
      lastOrderDate: '2026-10-14 16:30:00',
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
      lastOrderDate: '2026-10-11 11:15:00',
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
      lastOrderDate: '2026-10-08 09:20:00',
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
      lastOrderDate: '2026-10-04 15:40:00',
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
      lastOrderDate: '2026-10-01 10:10:00',
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

  // 7. Performance Staff List (Sorted strictly by JOIN TIME in DESCENDING order: 2026-10-19 down to 2026-10-01)
  const performanceStaffList = [
    {
      id: '2026340089',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120',
      name: '王小倩',
      joinTime: '2026-10-19 16:45:10',
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
      joinTime: '2026-10-18 11:20:00',
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
      joinTime: '2026-10-17 09:15:00',
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
      joinTime: '2026-10-15 14:30:00',
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
      joinTime: '2026-10-13 10:10:00',
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
      joinTime: '2026-10-10 15:00:00',
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
      joinTime: '2026-10-07 08:45:00',
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
      joinTime: '2026-10-04 13:20:00',
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
      joinTime: '2026-10-01 09:00:00',
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

  // 8. Review Staff List (Sorted strictly by date descending, 2026-10-19 down to 2026-10-01)
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
      joinDate: '2026-10-19 16:20:00',
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
      joinDate: '2026-10-18 11:15:00',
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
      joinDate: '2026-10-16 14:10:00',
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
      joinDate: '2026-10-14 09:30:00',
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
      joinDate: '2026-10-11 15:40:00',
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
      joinDate: '2026-10-07 10:20:00',
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
      joinDate: '2026-10-03 13:10:00',
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
          <div className="bg-white p-5 rounded-2xl shadow-xs border border-slate-200/80 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-6 bg-emerald-500 rounded-full inline-block"></span>
              <div>
                <h1 className="text-xl font-bold text-slate-800">用户概况与画像分析</h1>
                <p className="text-xs text-slate-400 mt-0.5">
                  综合呈现全平台在册长者增长态势、年龄阶梯分布与性别多维画像
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <span className="font-medium text-slate-500">统计日期:</span>
              <div className="flex items-center gap-2 border border-slate-200 rounded-lg px-3 py-1.5 bg-slate-50">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="outline-hidden text-slate-700 text-xs bg-transparent"
                />
                <span className="text-slate-400">至</span>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="outline-hidden text-slate-700 text-xs bg-transparent"
                />
                <Calendar className="w-3.5 h-3.5 text-slate-400 ml-1" />
              </div>
              <button
                onClick={handleExport}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors flex items-center space-x-1"
              >
                <Download className="w-3.5 h-3.5" />
                <span>导出报表</span>
              </button>
            </div>
          </div>

          {/* Top Metric Summary Cards (4 Cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 font-medium">累计在册用户数</span>
                <div className="text-2xl font-bold text-slate-800 mt-1">12,850</div>
                <div className="flex items-center gap-1 text-[11px] text-emerald-600 mt-1 font-medium">
                  <ArrowUpRight className="w-3 h-3" />
                  <span>较上月 +11.8%</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 font-medium">近30日活跃长者</span>
                <div className="text-2xl font-bold text-slate-800 mt-1">5,100</div>
                <div className="flex items-center gap-1 text-[11px] text-blue-600 mt-1 font-medium">
                  <span>活跃覆盖率 39.7%</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Activity className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 font-medium">核心高龄客群 (70岁+)</span>
                <div className="text-2xl font-bold text-slate-800 mt-1">460 人</div>
                <div className="flex items-center gap-1 text-[11px] text-amber-600 mt-1 font-medium">
                  <span>高龄占比 50.2% (重度需求)</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Heart className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 font-medium">男女长者比例</span>
                <div className="text-2xl font-bold text-slate-800 mt-1">1 : 1.04</div>
                <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-1 font-medium">
                  <span>男 540人 : 女 560人 (均衡)</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <UserCheck className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Main Analytics Grid: Bento Grid (Left 7 Cols vs Right 5 Cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* ========================================================
                LEFT: 用户趋势统计 (由原折线改为高质感双指标梯度柱状图)
                占 7 列 (约 58% 宽度)
               ======================================================== */}
            <div className="lg:col-span-7 bg-white p-6 rounded-2xl shadow-xs border border-slate-200/80 flex flex-col justify-between">
              <div>
                {/* Header with Metric Selectors */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-100">
                  <div>
                    <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
                      <BarChart2 className="w-4 h-4 text-emerald-600" />
                      <span>用户趋势统计</span>
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      新增用户与活跃用户近期变化对比分析
                    </p>
                  </div>

                  {/* Interactive Metric Filter Pills */}
                  <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
                    <button
                      onClick={() => setTrendMetric('all')}
                      className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                        trendMetric === 'all'
                          ? 'bg-white text-emerald-700 font-bold shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      双指标对比
                    </button>
                    <button
                      onClick={() => setTrendMetric('new')}
                      className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                        trendMetric === 'new'
                          ? 'bg-white text-emerald-700 font-bold shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      仅看新增
                    </button>
                    <button
                      onClick={() => setTrendMetric('active')}
                      className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                        trendMetric === 'active'
                          ? 'bg-white text-blue-700 font-bold shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      仅看活跃
                    </button>
                  </div>
                </div>

                {/* The Column Bar Chart (Replaced plain curve line) */}
                <div className="h-80 w-full pt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={userTrendData}
                      margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                      barGap={6}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis
                        dataKey="date"
                        stroke="#94a3b8"
                        fontSize={11}
                        tickLine={false}
                        axisLine={{ stroke: '#e2e8f0' }}
                      />
                      <YAxis
                        stroke="#94a3b8"
                        fontSize={11}
                        tickLine={false}
                        axisLine={false}
                        domain={[0, 6000]}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#ffffff',
                          borderRadius: '12px',
                          border: '1px solid #e2e8f0',
                          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                          fontSize: '12px',
                        }}
                        formatter={(val: any, name: any) => [
                          `${val} 人`,
                          name === 'newUsers' ? '新增登记用户' : '活跃互动用户',
                        ]}
                      />
                      <Legend
                        verticalAlign="top"
                        align="right"
                        iconType="circle"
                        wrapperStyle={{ paddingBottom: '12px', fontSize: '11px' }}
                        formatter={(value) =>
                          value === 'newUsers' ? '新增用户数量' : '活跃用户数量'
                        }
                      />
                      {(trendMetric === 'all' || trendMetric === 'new') && (
                        <Bar
                          dataKey="newUsers"
                          name="newUsers"
                          fill="#00b074"
                          radius={[5, 5, 0, 0]}
                          barSize={trendMetric === 'new' ? 24 : 14}
                        />
                      )}
                      {(trendMetric === 'all' || trendMetric === 'active') && (
                        <Bar
                          dataKey="activeUsers"
                          name="activeUsers"
                          fill="#0284c7"
                          radius={[5, 5, 0, 0]}
                          barSize={trendMetric === 'active' ? 24 : 14}
                        />
                      )}
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Bottom Insight Strip */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 bg-slate-50/70 p-3 rounded-xl">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>
                    峰值日期：<strong>10-20</strong> (活跃 5,100人 / 新增 3,500人)
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  <span>日均新增长者：<strong>2,968 人</strong></span>
                </div>
                <div className="text-emerald-600 font-semibold">
                  总增长态势良好 (环比 +14.2%)
                </div>
              </div>
            </div>

            {/* ========================================================
                RIGHT: 年龄构成 + 性别构成 (左右拆分、上下堆叠)
                占 5 列 (约 42% 宽度)
               ======================================================== */}
            <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
              {/* Card 1: 用户年龄构成 (由原饼图改为横向阶梯分布对比图与梯队条) */}
              <div className="bg-white p-5 rounded-2xl shadow-xs border border-slate-200/80">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                  <div>
                    <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
                      <span className="w-1.5 h-4 bg-blue-600 rounded-full"></span>
                      <span>用户年龄梯队分布</span>
                    </h2>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      全年龄段长者数量与照护需求梯级
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg">
                    样本总量: 920 人
                  </span>
                </div>

                {/* Horizontal Ranked Cohort Progressive Bars */}
                <div className="space-y-3 pt-1">
                  {userAgeData.map((item) => (
                    <div key={item.name} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span
                            className="w-2.5 h-2.5 rounded-full shrink-0"
                            style={{ backgroundColor: item.color }}
                          ></span>
                          <span className="font-semibold text-slate-700">{item.name}</span>
                          {item.name === '80岁以上' && (
                            <span className="text-[10px] bg-rose-50 text-rose-600 font-semibold px-1.5 py-0.2 rounded border border-rose-200">
                              重点照护
                            </span>
                          )}
                          {item.name === '50-60岁' && (
                            <span className="text-[10px] bg-emerald-50 text-emerald-600 font-semibold px-1.5 py-0.2 rounded border border-emerald-200">
                              活力银发
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-800">{item.value} 人</span>
                          <span className="text-slate-400 font-mono text-[11px] w-12 text-right">
                            {item.ratio}
                          </span>
                        </div>
                      </div>

                      {/* Visual Progressive Bar */}
                      <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden flex">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: item.ratio,
                            backgroundColor: item.color,
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-3.5 pt-2.5 border-t border-slate-100 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>80岁及以上高龄长者占比达 37.2%，以居家重度照护为主</span>
                </div>
              </div>

              {/* Card 2: 用户性别构成 (由原饼图改为双轨极性对比与性别画像对比卡) */}
              <div className="bg-white p-5 rounded-2xl shadow-xs border border-slate-200/80">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                  <div>
                    <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
                      <span className="w-1.5 h-4 bg-purple-600 rounded-full"></span>
                      <span>用户性别构成与画像</span>
                    </h2>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      男女长者比例对比及主要照护诉求倾向
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-200">
                    比例 1 : 1.04
                  </span>
                </div>

                {/* Dual-Polar Comparison Progress Rail (双极无缝对比轨) */}
                <div className="space-y-2 py-1">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <div className="flex items-center gap-1.5 text-blue-700">
                      <User className="w-4 h-4 text-blue-600" />
                      <span>男性长者 540 人</span>
                      <span className="text-[11px] bg-blue-100 text-blue-800 px-1.5 py-0.2 rounded font-mono">
                        49.1%
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-rose-700">
                      <span className="text-[11px] bg-rose-100 text-rose-800 px-1.5 py-0.2 rounded font-mono">
                        50.9%
                      </span>
                      <span>女性长者 560 人</span>
                      <Heart className="w-4 h-4 text-rose-500" />
                    </div>
                  </div>

                  {/* Dual Bar Track */}
                  <div className="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden flex p-0.5 border border-slate-200/70">
                    <div
                      className="h-full bg-gradient-to-r from-blue-600 to-teal-500 rounded-l-full transition-all"
                      style={{ width: '49.1%' }}
                      title="男性 49.1%"
                    ></div>
                    <div className="w-0.5 h-full bg-white"></div>
                    <div
                      className="h-full bg-gradient-to-r from-amber-400 to-rose-500 rounded-r-full transition-all"
                      style={{ width: '50.9%' }}
                      title="女性 50.9%"
                    ></div>
                  </div>
                </div>

                {/* Persona Characteristic Cards */}
                <div className="grid grid-cols-2 gap-3 mt-3.5 pt-2">
                  <div className="bg-blue-50/60 p-2.5 rounded-xl border border-blue-100">
                    <div className="text-xs font-bold text-blue-900 flex items-center justify-between">
                      <span>♂ 男性群体偏好</span>
                      <span className="text-[10px] text-blue-600 font-normal">均龄 68.4岁</span>
                    </div>
                    <p className="text-[11px] text-blue-800/80 mt-1 leading-relaxed">
                      慢性病管理、康复理疗、健康讲堂与活动报名参与度较高
                    </p>
                  </div>

                  <div className="bg-rose-50/60 p-2.5 rounded-xl border border-rose-100">
                    <div className="text-xs font-bold text-rose-900 flex items-center justify-between">
                      <span>♀ 女性群体偏好</span>
                      <span className="text-[10px] text-rose-600 font-normal">均龄 71.2岁</span>
                    </div>
                    <p className="text-[11px] text-rose-800/80 mt-1 leading-relaxed">
                      家政护理清洁、膳食营养食谱、文娱社区互动倾向明显
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. 用户年龄分析 (data_user_age) */}
      {subPageId === 'data_user_age' && (
        <div className="space-y-6">
          {/* Top Filter and Title Bar */}
          <div className="bg-white p-5 rounded-2xl shadow-xs border border-slate-200/80 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="w-2 h-6 bg-emerald-500 rounded-full inline-block"></span>
              <div>
                <h1 className="text-xl font-bold text-slate-800">用户年龄多维深度分析</h1>
                <p className="text-xs text-slate-400 mt-0.5">
                  全域长者年龄梯队、健康自理能力、照护需求强度及客群画像全景洞察
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 border border-slate-200/80 rounded-xl px-3 py-1.5">
                <Calendar className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-xs font-medium text-slate-500">统计周期:</span>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="outline-hidden text-slate-700 text-xs bg-transparent cursor-pointer font-mono"
                />
                <span className="text-slate-400">~</span>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="outline-hidden text-slate-700 text-xs bg-transparent cursor-pointer font-mono"
                />
              </div>
              <button
                onClick={handleExport}
                className="flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>导出全量年龄分析报表</span>
              </button>
            </div>
          </div>

          {/* ========================================================
              SECTION 1: 全新样式的用户年龄构成图表 (代替原单调饼图)
              提供复合柱状图 / 平滑密度图 / 梯队对比条三种形态一键切换
             ======================================================== */}
          <div className="bg-white p-6 rounded-2xl shadow-xs border border-slate-200/80">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-4 border-b border-slate-100">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-4.5 bg-blue-600 rounded-full"></span>
                  <h2 className="text-base font-bold text-slate-800">
                    用户年龄阶梯构成与照护需求强度图
                  </h2>
                  <span className="text-[11px] text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full font-medium">
                    多维复合图表
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  左轴呈现各年龄段长者注册人次与占比，右轴联动呈现照护需求指数（满分 100）
                </p>
              </div>

              {/* Chart Mode Toggle */}
              <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl">
                <button
                  onClick={() => setAgeChartMode('composed')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                    ageChartMode === 'composed'
                      ? 'bg-white text-blue-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <BarChart2 className="w-3.5 h-3.5" />
                  <span>复合柱状图</span>
                </button>
                <button
                  onClick={() => setAgeChartMode('area')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                    ageChartMode === 'area'
                      ? 'bg-white text-blue-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>密度面积图</span>
                </button>
                <button
                  onClick={() => setAgeChartMode('ranked')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                    ageChartMode === 'ranked'
                      ? 'bg-white text-blue-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>梯队横向分布</span>
                </button>
              </div>
            </div>

            {/* Chart Container */}
            <div className="h-72 w-full mt-2">
              {ageChartMode === 'composed' && (
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart
                    data={ageCohortsDetail}
                    margin={{ top: 20, right: 30, left: 10, bottom: 10 }}
                  >
                    <defs>
                      <linearGradient id="ageBarBlue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.9} />
                        <stop offset="100%" stopColor="#1d4ed8" stopOpacity={0.7} />
                      </linearGradient>
                      <linearGradient id="ageBarGreen" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10b981" stopOpacity={0.9} />
                        <stop offset="100%" stopColor="#047857" stopOpacity={0.7} />
                      </linearGradient>
                      <linearGradient id="ageBarSky" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#0ea5e9" stopOpacity={0.9} />
                        <stop offset="100%" stopColor="#0369a1" stopOpacity={0.7} />
                      </linearGradient>
                      <linearGradient id="ageBarAmber" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.9} />
                        <stop offset="100%" stopColor="#b45309" stopOpacity={0.7} />
                      </linearGradient>
                      <linearGradient id="ageBarRose" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#ef4444" stopOpacity={0.9} />
                        <stop offset="100%" stopColor="#b91c1c" stopOpacity={0.7} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis
                      dataKey="name"
                      tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }}
                      axisLine={{ stroke: '#e2e8f0' }}
                      tickLine={false}
                    />
                    <YAxis
                      yAxisId="left"
                      tick={{ fill: '#64748b', fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                      unit="人"
                    />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      domain={[0, 100]}
                      tick={{ fill: '#f59e0b', fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                      unit="分"
                    />
                    <Tooltip
                      content={({ active, payload }: any) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-slate-900/95 backdrop-blur-md text-white p-3.5 rounded-xl shadow-xl border border-slate-700 text-xs space-y-1.5 min-w-[210px]">
                              <div className="flex items-center justify-between pb-1.5 border-b border-slate-800">
                                <span className="font-bold text-sm text-slate-100">{data.name}</span>
                                <span
                                  className="text-[11px] px-2 py-0.5 rounded-md font-medium"
                                  style={{
                                    backgroundColor: `${data.color}26`,
                                    color: data.color,
                                  }}
                                >
                                  {data.careLevel}
                                </span>
                              </div>
                              <div className="flex items-center justify-between pt-0.5">
                                <span className="text-slate-400">长者人数:</span>
                                <span className="font-bold text-white font-mono">
                                  {data.value} 人 ({data.ratio})
                                </span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-slate-400">照护需求强度:</span>
                                <span className="font-bold text-amber-400 font-mono">
                                  {data.careNeedIndex} 分
                                </span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-slate-400">月均上门频次:</span>
                                <span className="font-bold text-emerald-400">
                                  {data.avgFrequency}
                                </span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-slate-400">人均月服务消费:</span>
                                <span className="font-bold text-sky-400 font-mono">
                                  {data.avgSpend}
                                </span>
                              </div>
                              <div className="pt-1.5 text-[10px] text-slate-400 border-t border-slate-800 flex items-center justify-between">
                                <span>诉求: {data.keyDemands[0]}</span>
                                <span className="text-emerald-400 font-mono">{data.growthTrend}</span>
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Legend
                      verticalAlign="top"
                      align="right"
                      iconType="circle"
                      wrapperStyle={{ paddingBottom: '12px', fontSize: '12px' }}
                    />
                    <Bar
                      yAxisId="left"
                      dataKey="value"
                      name="长者人次 (人)"
                      radius={[8, 8, 0, 0]}
                      barSize={40}
                    >
                      {ageCohortsDetail.map((entry, index) => {
                        const grads = [
                          'url(#ageBarBlue)',
                          'url(#ageBarGreen)',
                          'url(#ageBarSky)',
                          'url(#ageBarAmber)',
                          'url(#ageBarRose)',
                        ];
                        return <Cell key={`cell-${index}`} fill={grads[index % grads.length]} />;
                      })}
                    </Bar>
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="careNeedIndex"
                      name="照护需求强度 (分)"
                      stroke="#f59e0b"
                      strokeWidth={3}
                      dot={{ r: 4, fill: '#f59e0b', strokeWidth: 2, stroke: '#ffffff' }}
                      activeDot={{ r: 6, fill: '#d97706', stroke: '#ffffff' }}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              )}

              {ageChartMode === 'area' && (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={ageCohortsDetail}
                    margin={{ top: 20, right: 30, left: 10, bottom: 10 }}
                  >
                    <defs>
                      <linearGradient id="ageAreaGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.5} />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.05} />
                      </linearGradient>
                      <linearGradient id="careAreaGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.4} />
                        <stop offset="100%" stopColor="#f59e0b" stopOpacity={0.05} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis
                      dataKey="name"
                      tick={{ fill: '#64748b', fontSize: 12 }}
                      axisLine={{ stroke: '#e2e8f0' }}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fill: '#64748b', fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      content={({ active, payload }: any) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-slate-900/95 text-white p-3 rounded-xl shadow-lg text-xs space-y-1">
                              <span className="font-bold">{data.name}</span>
                              <div className="text-slate-300">人数: {data.value} 人 ({data.ratio})</div>
                              <div className="text-amber-400">照护强度: {data.careNeedIndex} 分</div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Legend verticalAlign="top" align="right" wrapperStyle={{ paddingBottom: '12px', fontSize: '12px' }} />
                    <Area
                      type="monotone"
                      dataKey="value"
                      name="长者人数"
                      stroke="#3b82f6"
                      strokeWidth={2.5}
                      fillOpacity={1}
                      fill="url(#ageAreaGradient)"
                    />
                    <Area
                      type="monotone"
                      dataKey="careNeedIndex"
                      name="照护需求强度"
                      stroke="#f59e0b"
                      strokeWidth={2}
                      strokeDasharray="4 4"
                      fillOpacity={1}
                      fill="url(#careAreaGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}

              {ageChartMode === 'ranked' && (
                <div className="space-y-3.5 pt-2 px-2 max-w-4xl mx-auto">
                  {ageCohortsDetail.map((item, idx) => (
                    <div key={item.id} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span
                            className="w-5 h-5 rounded-full text-white text-[10px] font-bold flex items-center justify-center shrink-0"
                            style={{ backgroundColor: item.color }}
                          >
                            {idx + 1}
                          </span>
                          <span className="font-bold text-slate-800">{item.name}</span>
                          <span className="text-[11px] text-slate-400">({item.subTitle})</span>
                          <span className={`text-[10px] px-2 py-0.2 rounded border font-medium ${item.careLevelBadge}`}>
                            {item.careLevel}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-slate-500 text-xs">
                            人均 {item.avgSpend}/月
                          </span>
                          <span className="font-bold text-slate-800 font-mono">{item.value} 人</span>
                          <span className="font-mono font-bold text-blue-600 text-xs w-12 text-right">
                            {item.ratio}
                          </span>
                        </div>
                      </div>
                      <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{
                            width: `${(item.value / 340) * 100}%`,
                            backgroundColor: item.color,
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Summary Pill Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mt-5 pt-4 border-t border-slate-100">
              {ageCohortsDetail.map((c) => (
                <div
                  key={c.name}
                  className="p-2.5 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: c.color }}></span>
                      <span className="font-semibold text-slate-700">{c.name}</span>
                    </div>
                    <span className="font-mono text-slate-400">{c.ratio}</span>
                  </div>
                  <div className="mt-1 flex items-baseline justify-between">
                    <span className="text-base font-bold text-slate-800 font-mono">{c.value} <span className="text-[10px] text-slate-400 font-normal">人</span></span>
                    <span className="text-[10px] text-amber-700 font-medium">强度 {c.careNeedIndex}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ========================================================
              SECTION 2: 全新样式的长者画像与服务需求矩阵 (代替原简易表格)
              提供「画像卡片流」与「精细梯队行条」两种展示样式
             ======================================================== */}
          <div className="bg-white p-6 rounded-2xl shadow-xs border border-slate-200/80 space-y-5">
            {/* Control & Filter Toolbar */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-4.5 bg-emerald-600 rounded-full"></span>
                  <h2 className="text-base font-bold text-slate-800">
                    各年龄梯队全息画像与服务诉求矩阵
                  </h2>
                  <span className="text-xs text-slate-400">
                    (共 {filteredAgeCohorts.length} 个年龄梯队群体)
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  告别传统单调表格，立体化展示不同年龄段长者的照护等级、核心服务诉求、客单消费与护理配置建议
                </p>
              </div>

              {/* View Switcher, Search, and Export Actions */}
              <div className="flex flex-wrap items-center gap-2.5">
                {/* Search Box */}
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="搜索年龄段或服务诉求..."
                    value={ageSearchKeyword}
                    onChange={(e) => setAgeSearchKeyword(e.target.value)}
                    className="pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 placeholder:text-slate-400 outline-hidden focus:border-emerald-500 w-48"
                  />
                </div>

                {/* Sort Option */}
                <select
                  value={ageSortBy}
                  onChange={(e: any) => setAgeSortBy(e.target.value)}
                  className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 outline-hidden cursor-pointer"
                >
                  <option value="default">默认年龄梯队排序</option>
                  <option value="count_desc">按长者人次降序</option>
                  <option value="intensity_desc">按照护需求强度降序</option>
                </select>

                {/* View Mode Toggle: Cards vs Strips */}
                <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl">
                  <button
                    onClick={() => setAgeTableViewMode('cards')}
                    title="画像卡片矩阵视图"
                    className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                      ageTableViewMode === 'cards'
                        ? 'bg-white text-emerald-700 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                    <span>画像卡片流</span>
                  </button>
                  <button
                    onClick={() => setAgeTableViewMode('strips')}
                    title="精细宽行清单视图"
                    className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                      ageTableViewMode === 'strips'
                        ? 'bg-white text-emerald-700 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <List className="w-3.5 h-3.5" />
                    <span>梯队精细清单</span>
                  </button>
                </div>

                {/* Export Button */}
                <button
                  onClick={handleExport}
                  className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-medium transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-slate-500" />
                  <span>导出明细</span>
                </button>
              </div>
            </div>

            {/* Filter Chips by Care Level */}
            <div className="flex items-center gap-2 flex-wrap text-xs">
              <span className="text-slate-400 font-medium">梯队分类筛选:</span>
              <button
                onClick={() => setAgeCareFilter('all')}
                className={`px-3 py-1 rounded-lg transition-colors cursor-pointer font-medium ${
                  ageCareFilter === 'all'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                全部梯队 (5)
              </button>
              <button
                onClick={() => setAgeCareFilter('self')}
                className={`px-3 py-1 rounded-lg transition-colors cursor-pointer font-medium ${
                  ageCareFilter === 'self'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                }`}
              >
                自理活力型 (2)
              </button>
              <button
                onClick={() => setAgeCareFilter('assisted')}
                className={`px-3 py-1 rounded-lg transition-colors cursor-pointer font-medium ${
                  ageCareFilter === 'assisted'
                    ? 'bg-sky-600 text-white'
                    : 'bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-200'
                }`}
              >
                介助介护型 (2)
              </button>
              <button
                onClick={() => setAgeCareFilter('special')}
                className={`px-3 py-1 rounded-lg transition-colors cursor-pointer font-medium ${
                  ageCareFilter === 'special'
                    ? 'bg-rose-600 text-white'
                    : 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
                }`}
              >
                高龄特护型 (1)
              </button>
            </div>

            {/* ==============================================
                STYLE A: 画像卡片矩阵视图 (Persona Cards Grid)
               ============================================== */}
            {ageTableViewMode === 'cards' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {filteredAgeCohorts.map((cohort) => (
                  <div
                    key={cohort.id}
                    className="bg-white rounded-2xl border border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
                  >
                    {/* Top colored stripe */}
                    <div className="h-1.5 w-full" style={{ backgroundColor: cohort.color }}></div>

                    <div className="p-4 space-y-3.5 flex-1">
                      {/* Cohort Header */}
                      <div className="flex items-start justify-between gap-1">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h3 className="font-bold text-slate-800 text-base">{cohort.name}</h3>
                            <span className={`text-[10px] px-1.5 py-0.2 rounded border font-medium ${cohort.careLevelBadge}`}>
                              {cohort.careLevel}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 mt-0.5">{cohort.subTitle}</p>
                        </div>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold shrink-0 ${cohort.riskBadge}`}>
                          {cohort.riskLevel}
                        </span>
                      </div>

                      {/* Main Count & Percentage Meter */}
                      <div className="bg-slate-50/80 rounded-xl p-3 border border-slate-100 space-y-1.5">
                        <div className="flex items-baseline justify-between">
                          <span className="text-2xl font-black text-slate-800 font-mono">
                            {cohort.value}
                            <span className="text-xs text-slate-400 font-normal ml-1">人次</span>
                          </span>
                          <span className="text-xs font-bold font-mono" style={{ color: cohort.color }}>
                            {cohort.ratio}
                          </span>
                        </div>
                        {/* Progress Bar */}
                        <div className="w-full h-1.5 bg-slate-200/80 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${(cohort.value / 340) * 100}%`,
                              backgroundColor: cohort.color,
                            }}
                          ></div>
                        </div>
                        <div className="flex items-center justify-between text-[10px] text-slate-400 pt-0.5">
                          <span>月环比趋势</span>
                          <span className="text-emerald-600 font-semibold font-mono">{cohort.growthTrend}</span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Actions */}
                    <div className="p-3 bg-slate-50/60 border-t border-slate-100 flex items-center gap-2">
                      <button
                        onClick={() => onNotice(`已筛选出【${cohort.name}】全量长者花名册与健康档案`)}
                        className="flex-1 py-1.5 px-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-lg text-xs font-medium text-center transition-colors cursor-pointer"
                      >
                        查看人群名单
                      </button>
                      <button
                        onClick={() => onNotice(`正在为【${cohort.name}】群体配置专属照护包及关怀计划`)}
                        className="py-1.5 px-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                        title="调配服务方案"
                      >
                        配方案
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ==============================================
                STYLE B: 梯队精细清单视图 (Card Strip Rows)
               ============================================== */}
            {ageTableViewMode === 'strips' && (
              <div className="space-y-3">
                {filteredAgeCohorts.map((cohort, idx) => (
                  <div
                    key={cohort.id}
                    className="p-4 bg-white rounded-2xl border border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-sm transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                  >
                    {/* Left Rank & Title */}
                    <div className="flex items-center gap-3.5 min-w-[240px]">
                      <span
                        className="w-8 h-8 rounded-xl text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs"
                        style={{ backgroundColor: cohort.color }}
                      >
                        0{idx + 1}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-slate-800 text-base">{cohort.name}</h3>
                          <span className={`text-[10px] px-2 py-0.2 rounded border font-medium ${cohort.careLevelBadge}`}>
                            {cohort.careLevel}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">{cohort.subTitle}</p>
                      </div>
                    </div>

                    {/* Population Bar */}
                    <div className="min-w-[180px] space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400">样本长者:</span>
                        <span className="font-bold text-slate-800 font-mono">
                          {cohort.value} 人 ({cohort.ratio})
                        </span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${(cohort.value / 340) * 100}%`,
                            backgroundColor: cohort.color,
                          }}
                        ></div>
                      </div>
                    </div>

                    {/* Demands Pills */}
                    <div className="flex-1 max-w-md hidden xl:block">
                      <div className="text-[11px] text-slate-400 mb-1">主要服务诉求倾向</div>
                      <div className="flex flex-wrap gap-1">
                        {cohort.keyDemands.map((d) => (
                          <span key={d} className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                            {d}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Operational Metrics */}
                    <div className="flex items-center gap-4 text-xs shrink-0">
                      <div>
                        <span className="text-[10px] text-slate-400 block">照护需求指数</span>
                        <span className="font-bold text-amber-600 font-mono text-sm">{cohort.careNeedIndex}</span>
                        <span className="text-[10px] text-slate-400"> /100</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block">月度服务频次</span>
                        <span className="font-semibold text-slate-700">{cohort.avgFrequency}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block">客单均价</span>
                        <span className="font-bold text-blue-700 font-mono">{cohort.avgSpend}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => onNotice(`已导出【${cohort.name}】梯队详细长者健康数据表`)}
                        className="px-3 py-1.5 border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-medium transition-colors cursor-pointer"
                      >
                        导出名单
                      </button>
                      <button
                        onClick={() => onNotice(`正在为【${cohort.name}】群体下发智能关怀服务策略`)}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                      >
                        关怀计划
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Bottom Aggregate Summary Panel */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs shrink-0">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                </div>
                <div className="text-xs">
                  <div className="font-bold text-slate-800 flex items-center gap-2">
                    <span>全平台年龄梯队运营策略洞察</span>
                    <span className="font-normal text-slate-400">|</span>
                    <span className="font-mono text-emerald-700">总样本 920 人次 · 覆盖 5 大阶梯群</span>
                  </div>
                  <p className="text-slate-500 mt-0.5">
                    80岁以上重度特护与50-60岁活力银发呈现鲜明「双峰分布」，建议针对性布局「入户特护」与「文娱康养」两大产品线
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onNotice('已为您生成平台长者年龄构成与梯队服务配比建议白皮书 (PDF)')}
                  className="px-3.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-medium transition-colors cursor-pointer shadow-2xs"
                >
                  生成建议白皮书
                </button>
                <button
                  onClick={handleExport}
                  className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer shadow-xs"
                >
                  下载完整数据集
                </button>
              </div>
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

          {/* Gender Composition Chart (Bar Chart instead of Pie Chart) */}
          <div className="bg-white p-6 rounded-2xl shadow-xs border border-slate-200/80">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-4.5 bg-blue-600 rounded-full"></span>
                <h2 className="text-base font-bold text-slate-800">用户性别构成</h2>
              </div>
              <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
                男女比例 1 : 1.04 · 样本总量 1,100 人
              </span>
            </div>

            <div className="h-64 w-full max-w-2xl mx-auto">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { name: '男性长者', value: 540, ratio: '49.1%', fill: '#3b82f6' },
                    { name: '女性长者', value: 560, ratio: '50.9%', fill: '#f43f5e' },
                  ]}
                  margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                  barSize={56}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: '#475569', fontSize: 13, fontWeight: 600 }}
                    axisLine={{ stroke: '#e2e8f0' }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: '#64748b', fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                    unit="人"
                  />
                  <Tooltip
                    content={({ active, payload }: any) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-slate-900/95 text-white p-2.5 rounded-xl shadow-lg text-xs space-y-1">
                            <span className="font-bold">{data.name}</span>
                            <div className="text-slate-300">
                              长者人数: <span className="font-bold text-white font-mono">{data.value} 人</span>
                            </div>
                            <div className="text-slate-300">
                              全域占比: <span className="font-bold text-amber-400 font-mono">{data.ratio}</span>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                    <Cell fill="#3b82f6" />
                    <Cell fill="#f43f5e" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Gender Details (Clean Row Cards instead of Raw Table) */}
          <div className="bg-white p-6 rounded-2xl shadow-xs border border-slate-200/80 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-4.5 bg-emerald-600 rounded-full"></span>
                <h2 className="text-base font-bold text-slate-800">性别数据明细</h2>
              </div>
              <button
                onClick={handleExport}
                className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl text-xs font-medium transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>导出数据</span>
              </button>
            </div>

            <div className="space-y-3">
              {/* Male Row Card */}
              <div className="p-4 rounded-xl border border-blue-100 bg-blue-50/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-800 text-sm">男性长者</span>
                    <span className="text-xs text-slate-400 ml-2">序号: 01</span>
                  </div>
                </div>
                <div className="flex-1 max-w-md mx-2">
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '49.1%' }}></div>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <div>
                    <span className="text-slate-400">长者人次: </span>
                    <span className="font-bold text-slate-800 font-mono text-sm">540 人</span>
                  </div>
                  <div>
                    <span className="text-slate-400">占比: </span>
                    <span className="font-bold text-blue-600 font-mono text-sm">49.1%</span>
                  </div>
                </div>
              </div>

              {/* Female Row Card */}
              <div className="p-4 rounded-xl border border-rose-100 bg-rose-50/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-500 flex items-center justify-center font-bold">
                    <Heart className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-800 text-sm">女性长者</span>
                    <span className="text-xs text-slate-400 ml-2">序号: 02</span>
                  </div>
                </div>
                <div className="flex-1 max-w-md mx-2">
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-rose-500 rounded-full" style={{ width: '50.9%' }}></div>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <div>
                    <span className="text-slate-400">长者人次: </span>
                    <span className="font-bold text-slate-800 font-mono text-sm">560 人</span>
                  </div>
                  <div>
                    <span className="text-slate-400">占比: </span>
                    <span className="font-bold text-rose-600 font-mono text-sm">50.9%</span>
                  </div>
                </div>
              </div>

              {/* Total Summary Row */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between text-xs text-slate-600 px-4">
                <span className="font-semibold text-slate-700">合计</span>
                <div className="flex items-center gap-6">
                  <span>总人次: <strong className="text-slate-800 font-mono text-sm">1,100 人</strong></span>
                  <span>总比例: <strong className="text-slate-800 font-mono text-sm">100%</strong></span>
                </div>
              </div>
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

          {/* 1. 交易概况版块 (新样式：极简4阶段流式指标卡) */}
          <div className="bg-white p-6 rounded-2xl shadow-xs border border-slate-200/80">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-4.5 bg-emerald-600 rounded-full"></span>
                <h2 className="text-base font-bold text-slate-800">交易概况</h2>
              </div>
              <span className="text-xs text-slate-400">统计周期数据汇总</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Stage 1: 流量 */}
              <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/60 space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                  <span>访客流量</span>
                  <span className="text-[11px] text-blue-600 font-normal">浏览与访客</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-[11px] text-slate-400 block">浏览量</span>
                    <span className="text-xl font-bold text-slate-800 font-mono">2,512</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block">访客量</span>
                    <span className="text-xl font-bold text-slate-800 font-mono">2,265</span>
                  </div>
                </div>
              </div>

              {/* Stage 2: 下单 */}
              <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/60 space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                  <span>下单意向</span>
                  <span className="text-[11px] text-emerald-600 font-normal">订单发起</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-[11px] text-slate-400 block">下单人数</span>
                    <span className="text-xl font-bold text-slate-800 font-mono">303</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block">下单笔数</span>
                    <span className="text-xl font-bold text-slate-800 font-mono">425</span>
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs">
                  <span className="text-slate-400 text-[11px]">下单金额</span>
                  <span className="font-bold text-emerald-600 font-mono text-sm">¥12,540.00</span>
                </div>
              </div>

              {/* Stage 3: 支付 */}
              <div className="p-4 rounded-xl border border-emerald-100 bg-emerald-50/30 space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                  <span>支付成交</span>
                  <span className="text-[11px] text-emerald-700 font-normal">完成支付</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-[11px] text-slate-400 block">支付人数</span>
                    <span className="text-xl font-bold text-slate-800 font-mono">112</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block">支付订单数</span>
                    <span className="text-xl font-bold text-slate-800 font-mono">203</span>
                  </div>
                </div>
                <div className="pt-2 border-t border-emerald-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 text-[11px]">支付金额 / 客单</span>
                  <span className="font-bold text-emerald-700 font-mono text-sm">¥12,500.00 / ¥1,100</span>
                </div>
              </div>

              {/* Stage 4: 退款 */}
              <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/60 space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                  <span>退款售后</span>
                  <span className="text-[11px] text-slate-400 font-normal">退款率 0.50%</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-[11px] text-slate-400 block">退款订单数</span>
                    <span className="text-xl font-bold text-slate-800 font-mono">1</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block">退款金额</span>
                    <span className="text-xl font-bold text-rose-500 font-mono">¥212.00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. 成交趋势版块 (原曲线图改为柱状复合趋势图) */}
          <div className="bg-white p-6 rounded-2xl shadow-xs border border-slate-200/80">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-4.5 bg-blue-600 rounded-full"></span>
                <h2 className="text-base font-bold text-slate-800">成交趋势</h2>
              </div>
              <div className="flex items-center gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-blue-500 inline-block"></span>
                  订单金额 (元)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
                  订单笔数 (笔)
                </span>
              </div>
            </div>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={tradeTrendData} margin={{ top: 15, right: 20, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="date" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={{ stroke: '#e2e8f0' }} tickLine={false} />
                  <YAxis yAxisId="left" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} unit="元" domain={[0, 3500]} />
                  <YAxis yAxisId="right" orientation="right" tick={{ fill: '#f59e0b', fontSize: 11 }} axisLine={false} tickLine={false} unit="笔" domain={[0, 300]} />
                  <Tooltip
                    content={({ active, payload, label }: any) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-slate-900/95 text-white p-2.5 rounded-xl shadow-lg text-xs space-y-1">
                            <span className="font-bold">{label}</span>
                            <div className="text-blue-300">
                              订单金额: <span className="font-bold text-white font-mono">{payload[0]?.value} 元</span>
                            </div>
                            <div className="text-amber-300">
                              订单笔数: <span className="font-bold text-white font-mono">{payload[1]?.value} 笔</span>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar yAxisId="left" dataKey="amount" name="订单金额" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={28} />
                  <Line yAxisId="right" type="monotone" dataKey="orders" name="订单笔数" stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 3, fill: '#f59e0b' }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 3. 订单金额分布版块 (原柱状图改为平滑分布面积曲线图) */}
          <div className="bg-white p-6 rounded-2xl shadow-xs border border-slate-200/80">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-4.5 bg-emerald-600 rounded-full"></span>
                <h2 className="text-base font-bold text-slate-800">订单金额分布</h2>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
                <span>订单数量分布 (笔)</span>
              </div>
            </div>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={orderAmountDistribution} margin={{ top: 15, right: 20, left: 10, bottom: 5 }}>
                  <defs>
                    <linearGradient id="orderAmountGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="range" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={{ stroke: '#e2e8f0' }} tickLine={false} />
                  <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} unit="笔" />
                  <Tooltip
                    content={({ active, payload, label }: any) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-slate-900/95 text-white p-2.5 rounded-xl shadow-lg text-xs space-y-1">
                            <span className="font-bold">{label}</span>
                            <div className="text-emerald-300">
                              订单数量: <span className="font-bold text-white font-mono">{payload[0]?.value} 笔</span>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="count"
                    stroke="#10b981"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#orderAmountGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
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
