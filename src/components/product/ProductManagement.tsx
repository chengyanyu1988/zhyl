import React, { useState, useMemo } from 'react';
import {
  Search,
  RotateCcw,
  Plus,
  ArrowLeft,
  Upload,
  Trash2,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  ListOrdered,
  Quote,
  Image as ImageIcon,
  Table as TableIcon,
  Video,
  Undo,
  Redo,
  X,
  AlertCircle,
  Accessibility,
  HeartPulse,
  Activity,
  Smile,
  Utensils,
  Stethoscope,
  UserCheck,
  Sparkles,
} from 'lucide-react';
import { ProductItem, ProductCategoryItem, ServiceItemDetail, ProductParamItem, GeneralSettingsData, SubPageId } from '../../types';

interface ProductManagementProps {
  subPageId: SubPageId;
  onNotice: (msg: string) => void;
}

// Initial Category Data (Matching Screenshots 1 & 2 - Sorted by date/sort order descending)
export const INITIAL_CATEGORIES: ProductCategoryItem[] = [
  {
    id: 'CAT_008',
    sortOrder: 8,
    name: '生活照料',
    icon: 'Accessibility',
    productCount: 100,
    lastUpdater: '李明明',
    lastUpdateTime: '2026-09-19 14:20:00',
    status: '启用',
  },
  {
    id: 'CAT_007',
    sortOrder: 7,
    name: '临床护理',
    icon: 'Stethoscope',
    productCount: 88,
    lastUpdater: '王强',
    lastUpdateTime: '2026-09-18 16:10:00',
    status: '启用',
  },
  {
    id: 'CAT_006',
    sortOrder: 6,
    name: '康复护理',
    icon: 'HeartPulse',
    productCount: 95,
    lastUpdater: '陈主任',
    lastUpdateTime: '2026-09-17 11:30:00',
    status: '启用',
  },
  {
    id: 'CAT_005',
    sortOrder: 5,
    name: '心理关怀',
    icon: 'Smile',
    productCount: 42,
    lastUpdater: '院办李生',
    lastUpdateTime: '2026-09-16 09:45:00',
    status: '启用',
  },
  {
    id: 'CAT_004',
    sortOrder: 4,
    name: '上门做饭',
    icon: 'Utensils',
    productCount: 76,
    lastUpdater: '廖主管',
    lastUpdateTime: '2026-09-14 17:00:00',
    status: '启用',
  },
  {
    id: 'CAT_003',
    sortOrder: 3,
    name: '健康管理',
    icon: 'Activity',
    productCount: 110,
    lastUpdater: '孙经理',
    lastUpdateTime: '2026-09-11 10:15:00',
    status: '启用',
  },
  {
    id: 'CAT_002',
    sortOrder: 2,
    name: '陪同就医',
    icon: 'UserCheck',
    productCount: 64,
    lastUpdater: '张管理员',
    lastUpdateTime: '2026-09-08 15:30:00',
    status: '启用',
  },
  {
    id: 'CAT_001',
    sortOrder: 1,
    name: '日常清洁',
    icon: 'Sparkles',
    productCount: 130,
    lastUpdater: '钱工',
    lastUpdateTime: '2026-09-03 08:20:00',
    status: '启用',
  },
];

// Initial Service Items Data (Matching Screenshots 7 & 8)
export const INITIAL_SERVICE_ITEMS: ServiceItemDetail[] = [
  {
    id: 'ITEM_323009000_001',
    name: '肌力增强训练',
    code: '323009000-001',
    durationHours: 2,
    servicePeopleCount: 3,
    commission: 900.00,
    description: '肌力增强训练是一种通过特定的锻炼方法来增强肌肉力量和耐力的训练方式',
    status: '启用',
  },
  {
    id: 'ITEM_323009000_002',
    name: '关节活动度维持与改善',
    code: '323009000-002',
    durationHours: 1.5,
    servicePeopleCount: 2,
    commission: 650.00,
    description: '通过被动运动、牵伸运动恢复关节正常解剖活动范围',
    status: '启用',
  },
  {
    id: 'ITEM_323009000_003',
    name: '平衡功能专项训练',
    code: '323009000-003',
    durationHours: 1,
    servicePeopleCount: 1,
    commission: 480.00,
    description: '针对脑卒中后遗症患者建立重心转移能力与跌倒预警防范',
    status: '启用',
  },
  {
    id: 'ITEM_323009000_004',
    name: '步态分析与矫正引导',
    code: '323009000-004',
    durationHours: 2,
    servicePeopleCount: 2,
    commission: 800.00,
    description: '利用便携步态评估仪矫正划圈步态，协助重获平稳行走能力',
    status: '启用',
  },
  {
    id: 'ITEM_323009000_005',
    name: '吞咽功能障碍康复指导',
    code: '323009000-005',
    durationHours: 1,
    servicePeopleCount: 1,
    commission: 520.00,
    description: '含咽部冰刺激、器官抗阻练习与安全进食防呛咳示范',
    status: '启用',
  },
  {
    id: 'ITEM_323009000_006',
    name: '语言能力再康复训练',
    code: '323009000-006',
    durationHours: 1.5,
    servicePeopleCount: 1,
    commission: 600.00,
    description: '针对失语症进行构音器官运动及听理解表达沟通能力诱导',
    status: '启用',
  },
  {
    id: 'ITEM_323009000_007',
    name: '神经易化技术理疗',
    code: '323009000-007',
    durationHours: 2,
    servicePeopleCount: 2,
    commission: 880.00,
    description: '运用Bobath与PNF技术抑制异常反射，促进正常运动模式建立',
    status: '启用',
  },
  {
    id: 'ITEM_323009000_008',
    name: '认知功能激活干预',
    code: '323009000-008',
    durationHours: 1,
    servicePeopleCount: 1,
    commission: 450.00,
    description: '运用注意力训练卡片与回忆疗法延缓认知减退进程',
    status: '启用',
  },
];

// Initial Product Parameters Data (Matching Screenshots 7 & 8, Sorted strictly descending by date)
export const INITIAL_PARAMS: ProductParamItem[] = [
  {
    id: 'PARAM_010',
    sortOrder: 10,
    name: '检测项目',
    serviceType: '家政护工/上门体检',
    paramType: '文本',
    isRequired: true,
    placeholder: '请填写具体体检或检测项目名称',
    lastUpdater: '李明明',
    lastUpdateTime: '2026-09-19 15:30:00',
    status: '启用',
  },
  {
    id: 'PARAM_009',
    sortOrder: 9,
    name: '适用年龄',
    serviceType: '家政护工/上门体检',
    paramType: '文本',
    isRequired: false,
    placeholder: '请输入适用的年龄段范围',
    lastUpdater: '王强',
    lastUpdateTime: '2026-09-18 16:45:12',
    status: '启用',
  },
  {
    id: 'PARAM_008',
    sortOrder: 8,
    name: '适用面积',
    serviceType: '家政护工/上门体检',
    paramType: '文本',
    isRequired: true,
    placeholder: '请输入服务覆盖建筑面积',
    lastUpdater: '陈主任',
    lastUpdateTime: '2026-09-17 11:20:00',
    status: '启用',
  },
  {
    id: 'PARAM_007',
    sortOrder: 7,
    name: '适用场景',
    serviceType: '家政护工/上门体检',
    paramType: '下拉单选',
    isRequired: true,
    placeholder: '请选择使用场景',
    lastUpdater: '院办李生',
    lastUpdateTime: '2026-09-16 09:10:05',
    status: '启用',
  },
  {
    id: 'PARAM_006',
    sortOrder: 6,
    name: '适用范围',
    serviceType: '家政护工/上门体检',
    paramType: '文本',
    isRequired: true,
    placeholder: '请选择具体服务范围',
    lastUpdater: '廖主管',
    lastUpdateTime: '2026-09-14 14:00:00',
    status: '启用',
  },
  {
    id: 'PARAM_005',
    sortOrder: 5,
    name: '超时费用',
    serviceType: '家政护工/上门体检',
    paramType: '数字',
    isRequired: false,
    placeholder: '超时每小时加收费用（元）',
    lastUpdater: '孙经理',
    lastUpdateTime: '2026-09-12 10:25:30',
    status: '启用',
  },
  {
    id: 'PARAM_004',
    sortOrder: 4,
    name: '治疗方法',
    serviceType: '家政护工/上门体检',
    paramType: '下拉单选',
    isRequired: true,
    placeholder: '请选择理疗或治疗手段',
    lastUpdater: '张管理员',
    lastUpdateTime: '2026-09-09 16:15:00',
    status: '启用',
  },
  {
    id: 'PARAM_003',
    sortOrder: 3,
    name: '疗程',
    serviceType: '家政护工/上门体检',
    paramType: '数字',
    isRequired: true,
    placeholder: '请输入建议疗程次数',
    lastUpdater: '钱工',
    lastUpdateTime: '2026-09-06 11:00:00',
    status: '启用',
  },
  {
    id: 'PARAM_002',
    sortOrder: 2,
    name: '适用人群',
    serviceType: '家政护工/上门体检',
    paramType: '文本',
    isRequired: true,
    placeholder: '请输入适宜接诊的长者健康状况',
    lastUpdater: '赵医生',
    lastUpdateTime: '2026-09-04 09:30:00',
    status: '启用',
  },
  {
    id: 'PARAM_001',
    sortOrder: 1,
    name: '注意事项',
    serviceType: '家政护工/上门体检',
    paramType: '文本',
    isRequired: false,
    placeholder: '请输入服务禁忌症及特殊照护提示',
    lastUpdater: '管理员',
    lastUpdateTime: '2026-09-02 08:15:00',
    status: '启用',
  },
];

// Initial General Settings Data (Matching Screenshot 9)
export const INITIAL_GENERAL_SETTINGS: GeneralSettingsData = {
  orderButtonName: '立即预约',
  enablePraiseRate: true,
  enableDetailStaff: true,
  displayStaffCount: 5,
  enableProductSales: true,
};

// Initial Products Data (Matching Screenshots 3 - 6, Sorted strictly descending by date 2026-09-01 to 2026-09-19)
export const INITIAL_PRODUCTS: ProductItem[] = [
  {
    id: 'PROD_323009000',
    code: '323009000',
    title: '脑中风术后康复理疗套餐',
    thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=160&auto=format&fit=crop&q=80',
    category: '护理复健',
    tags: ['脑血管疾病', '运动疗法'],
    moduleCategory: '康复理疗',
    price: 1990.00,
    originalPrice: 2400.00,
    salesCount: 128,
    commission: 600.00,
    durationHours: 2,
    servicePeopleCount: 2,
    status: '已上架',
    lastUpdater: '李明明',
    lastUpdateTime: '2026-09-19 10:09:09',
    remarks: '由持有执业医师/物理治疗师资格证书人员上门一对一操作。',
    scene: '上门居家',
    area: '不限',
    scope: '肢体肌力训练、平衡训练、步态矫正与语言诱导',
    overtimeFee: 80.00,
    detailsHtml: '肌力增强训练是一种通过特定的锻炼方法来增强肌肉力量和耐力的训练方式。',
    validityPeriod: '购买后60天内有效',
    bookingRules: '需提供近期医院出院小结及评估报告，请提前24小时预约',
  },
  {
    id: 'PROD_323009001',
    code: '323009001',
    title: '日常清洁 2小时1人急速清洁全程质保',
    thumbnail: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=160&auto=format&fit=crop&q=80',
    category: '生活照料',
    tags: ['保洁护理', '上门清洁'],
    moduleCategory: '家政护理',
    price: 300.00,
    originalPrice: 380.00,
    salesCount: 340,
    commission: 120.00,
    durationHours: 2,
    servicePeopleCount: 1,
    status: '已上架',
    lastUpdater: '王强',
    lastUpdateTime: '2026-09-18 16:30:22',
    remarks: '适用居家日常深度保洁及长者房间整理消毒。',
    scene: '居家室内',
    area: '80平米以内',
    scope: '卧室、客厅、厨房明面清理及卫生间高温除菌',
    overtimeFee: 50.00,
    detailsHtml: '包含地面蒸汽除菌、家具除尘、窗户擦拭及餐具消毒。',
    validityPeriod: '购买后30天内有效',
    bookingRules: '请提前24小时预约',
  },
  {
    id: 'PROD_323009002',
    code: '323009002',
    title: '失能长者助浴洗头全套定制服务',
    thumbnail: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=160&auto=format&fit=crop&q=80',
    category: '适老助浴',
    tags: ['适老助浴', '失能照护'],
    moduleCategory: '家政护理',
    price: 260.00,
    originalPrice: 320.00,
    salesCount: 210,
    commission: 100.00,
    durationHours: 1,
    servicePeopleCount: 2,
    status: '已上架',
    lastUpdater: '陈主任',
    lastUpdateTime: '2026-09-17 14:15:10',
    remarks: '双人携充气浴缸上门，配备防滑与生命体征监测仪。',
    scene: '卧床长者房间',
    area: '床边空间2平米',
    scope: '洗头、全身擦浴/泡浴、指甲剪修、润肤涂抹',
    overtimeFee: 40.00,
    detailsHtml: '采用专利折叠助浴设备，让卧床老人重获舒适清爽。',
    validityPeriod: '购买后30天内有效',
    bookingRules: '服务前需确认老人血压及心率正常',
  },
  {
    id: 'PROD_323009003',
    code: '323009003',
    title: '上门常规心电图与采血体检',
    thumbnail: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=160&auto=format&fit=crop&q=80',
    category: '专业体检',
    tags: ['上门体检', '慢病筛查'],
    moduleCategory: '上门体检',
    price: 350.00,
    originalPrice: 420.00,
    salesCount: 180,
    commission: 150.00,
    durationHours: 1,
    servicePeopleCount: 1,
    status: '已上架',
    lastUpdater: '院办李生',
    lastUpdateTime: '2026-09-15 09:20:45',
    remarks: '包含静脉采血（血常规/生化/血糖）及便携心电图监测。',
    scene: '居家室内',
    area: '不限',
    scope: '静脉血采样、12导联心电图采集与三甲医生在线解读',
    overtimeFee: 0.00,
    detailsHtml: '资深护士带冷链采样箱上门，电子报告24小时内送达。',
    validityPeriod: '购买后15天内有效',
    bookingRules: '采样早晨保持空腹状态',
  },
  {
    id: 'PROD_323009004',
    code: '323009004',
    title: '重症长者24小时专护巡视',
    thumbnail: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=160&auto=format&fit=crop&q=80',
    category: '专项照护',
    tags: ['重症护理', '24小时专护'],
    moduleCategory: '家政护理',
    price: 680.00,
    originalPrice: 800.00,
    salesCount: 88,
    commission: 300.00,
    durationHours: 24,
    servicePeopleCount: 1,
    status: '已上架',
    lastUpdater: '廖主管',
    lastUpdateTime: '2026-09-12 17:10:00',
    remarks: '资深护工一对一全程跟进，详细记录护理日志。',
    scene: '居家/医院病房',
    area: '不限',
    scope: '翻身扣背、鼻饲喂食、导尿管护理、生命体征定时检测',
    overtimeFee: 60.00,
    detailsHtml: '全天候专业陪伴，减轻家属看护负担。',
    validityPeriod: '指定日期有效',
    bookingRules: '提前48小时预订以便排班',
  },
  {
    id: 'PROD_323009005',
    code: '323009005',
    title: '认知症（阿尔茨海默）感官刺激康复',
    thumbnail: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=160&auto=format&fit=crop&q=80',
    category: '护理复健',
    tags: ['认知症', '感官训练'],
    moduleCategory: '康复理疗',
    price: 520.00,
    originalPrice: 650.00,
    salesCount: 45,
    commission: 220.00,
    durationHours: 1.5,
    servicePeopleCount: 1,
    status: '已下架',
    lastUpdater: '孙经理',
    lastUpdateTime: '2026-09-08 11:05:30',
    remarks: '结合音乐疗法与怀旧训练延缓认知退化。',
    scene: '居家活动室',
    area: '不限',
    scope: '认知激活引导、情绪抚慰、定向力恢复锻炼',
    overtimeFee: 50.00,
    detailsHtml: '非药物干预疗法，促进老人大脑活力。',
    validityPeriod: '购买后30天有效',
    bookingRules: '家属需全程陪同协助',
  },
  {
    id: 'PROD_323009006',
    code: '323009006',
    title: '全套中医拔罐刮痧与经络疏通',
    thumbnail: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=160&auto=format&fit=crop&q=80',
    category: '中医保健',
    tags: ['中医理疗', '刮痧拔罐'],
    moduleCategory: '康复理疗',
    price: 320.00,
    originalPrice: 400.00,
    salesCount: 156,
    commission: 140.00,
    durationHours: 1,
    servicePeopleCount: 1,
    status: '已上架',
    lastUpdater: '赵医生',
    lastUpdateTime: '2026-09-03 08:30:00',
    remarks: '无烟温针拔罐，舒筋通络改善气血。',
    scene: '居家床榻',
    area: '不限',
    scope: '背部刮痧、关元/足三里温灸与关节疏理',
    overtimeFee: 40.00,
    detailsHtml: '传统中医理疗，缓解老年性肩颈腰腿酸痛。',
    validityPeriod: '购买后30天有效',
    bookingRules: '饭后1小时内不宜理疗',
  },
];

export const ProductManagement: React.FC<ProductManagementProps> = ({ subPageId, onNotice }) => {
  // Main Data States
  const [categories, setCategories] = useState<ProductCategoryItem[]>(INITIAL_CATEGORIES);
  const [serviceItems, setServiceItems] = useState<ServiceItemDetail[]>(INITIAL_SERVICE_ITEMS);
  const [products, setProducts] = useState<ProductItem[]>(INITIAL_PRODUCTS);

  // Mode States
  const [viewMode, setViewMode] = useState<'list' | 'create_prod' | 'edit_prod'>('list');
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);

  // Modal Dialog States (Matching Screenshots 2, 8 & Delete Prompt)
  const [categoryModal, setCategoryModal] = useState<{
    isOpen: boolean;
    item: ProductCategoryItem | null;
    isCreate: boolean;
  }>({ isOpen: false, item: null, isCreate: false });

  const [serviceItemModal, setServiceItemModal] = useState<{
    isOpen: boolean;
    item: ServiceItemDetail | null;
    isCreate: boolean;
  }>({ isOpen: false, item: null, isCreate: false });

  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  }>({ isOpen: false, title: '操作确认', message: '', onConfirm: () => {} });

  // Filters State
  const [keyword, setKeyword] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Category Edit Form Temporary State (Screenshot 2)
  const [categoryForm, setCategoryForm] = useState<Partial<ProductCategoryItem>>({
    name: '',
    sortOrder: 1,
    status: '启用',
    icon: 'Accessibility',
  });

  // Service Item Edit Form Temporary State (Screenshot 8)
  const [serviceItemForm, setServiceItemForm] = useState<Partial<ServiceItemDetail>>({
    name: '',
    code: '323009000-001',
    durationHours: 2,
    servicePeopleCount: 2,
    commission: 600,
    description: '',
    status: '启用',
  });

  // Product Add / Edit Form Temporary State (Screenshots 4, 5, 6)
  const [productForm, setProductForm] = useState<Partial<ProductItem>>({
    title: '',
    code: '323009000',
    category: '生活照料',
    tags: ['脑血管疾病', '运动疗法'],
    thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=160&auto=format&fit=crop&q=80',
    remarks: '',
    scene: '上门居家',
    area: '不限',
    scope: '常规服务范围',
    overtimeFee: 50,
    detailsHtml: '肌力增强训练是一种通过特定的锻炼方法来增强肌肉力量和耐力的训练方式。',
    price: 1990.00,
    originalPrice: 2400.00,
    salesCount: 0,
    commission: 600.00,
    durationHours: 2,
    servicePeopleCount: 2,
    status: '已上架',
    validityPeriod: '购买后60天内有效',
    bookingRules: '请提前24小时预约',
  });

  // Category view check
  const isCategoryView = subPageId === 'product_housekeeping_cats' || subPageId === 'product_checkup_cats';
  // Service item view check
  const isServiceItemView = subPageId === 'product_rehab_items';
  // Parameter view check (Screenshot 7 & 8)
  const isParamView = subPageId === 'product_settings_params';
  // General settings view check (Screenshot 9)
  const isGeneralSettingsView = subPageId === 'product_settings_general';

  // Product Param State & Handlers
  const [params, setParams] = useState<ProductParamItem[]>(INITIAL_PARAMS);
  const [generalSettings, setGeneralSettings] = useState<GeneralSettingsData>(INITIAL_GENERAL_SETTINGS);

  const [paramModal, setParamModal] = useState<{
    isOpen: boolean;
    item: ProductParamItem | null;
    isCreate: boolean;
  }>({ isOpen: false, item: null, isCreate: false });

  const [paramForm, setParamForm] = useState<Partial<ProductParamItem>>({
    name: '',
    serviceType: '家政护工/上门体检',
    paramType: '文本',
    isRequired: true,
    placeholder: '',
    sortOrder: 1,
    status: '启用',
  });

  const filteredParams = useMemo(() => {
    let result = [...params];
    if (keyword) {
      const k = keyword.toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(k) || p.serviceType.toLowerCase().includes(k));
    }
    return result.sort((a, b) => b.sortOrder - a.sortOrder);
  }, [params, keyword]);

  const handleOpenParamModal = (param?: ProductParamItem) => {
    if (param) {
      setParamForm({ ...param });
      setParamModal({ isOpen: true, item: param, isCreate: false });
    } else {
      setParamForm({
        name: '',
        serviceType: '家政护工/上门体检',
        paramType: '文本',
        isRequired: true,
        placeholder: '',
        sortOrder: params.length + 1,
        status: '启用',
      });
      setParamModal({ isOpen: true, item: null, isCreate: true });
    }
  };

  const handleSaveParam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!paramForm.name) {
      onNotice('请输入参数名称');
      return;
    }
    if (paramModal.isCreate) {
      const newP: ProductParamItem = {
        id: 'PARAM_' + Date.now(),
        sortOrder: Number(paramForm.sortOrder) || 1,
        name: paramForm.name,
        serviceType: paramForm.serviceType || '家政护工/上门体检',
        paramType: paramForm.paramType || '文本',
        isRequired: paramForm.isRequired ?? true,
        placeholder: paramForm.placeholder || '',
        lastUpdater: '系统管理员',
        lastUpdateTime: '2026-09-19 15:45:00',
        status: (paramForm.status as '启用' | '禁用') || '启用',
      };
      setParams([newP, ...params]);
      onNotice(`已添加参数“${newP.name}”`);
    } else if (paramModal.item) {
      setParams(
        params.map((p) =>
          p.id === paramModal.item!.id
            ? {
                ...p,
                ...paramForm,
                sortOrder: Number(paramForm.sortOrder),
                lastUpdateTime: '2026-09-19 15:50:00',
                lastUpdater: '编辑管理员',
              }
            : p
        )
      );
      onNotice(`参数“${paramForm.name}”修改已保存！`);
    }
    setParamModal({ isOpen: false, item: null, isCreate: false });
  };

  const handleToggleParamStatus = (param: ProductParamItem) => {
    const next = param.status === '启用' ? '禁用' : '启用';
    setParams(params.map((p) => (p.id === param.id ? { ...p, status: next, lastUpdateTime: '2026-09-19 15:55:00' } : p)));
    onNotice(`已将参数“${param.name}”状态设为：${next}`);
  };

  const handleDeleteParam = (param: ProductParamItem) => {
    setConfirmModal({
      isOpen: true,
      title: '操作确认',
      message: `确定要删除参数“${param.name}”吗？`,
      onConfirm: () => {
        setParams(params.filter((p) => p.id !== param.id));
        onNotice(`已删除参数“${param.name}”`);
        setConfirmModal((prev) => ({ ...prev, isOpen: false }));
      },
    });
  };

  // Title calculation
  const pageTitle = useMemo(() => {
    switch (subPageId) {
      case 'product_housekeeping_goods':
        return '家政护理 - 商品管理';
      case 'product_housekeeping_cats':
        return '分类管理';
      case 'product_rehab_goods':
        return '康复理疗 - 商品管理';
      case 'product_rehab_items':
        return '服务项目管理';
      case 'product_checkup_goods':
        return '上门体检 - 商品管理';
      case 'product_checkup_cats':
        return '分类管理';
      case 'product_settings_params':
        return '商品设置 - 参数管理';
      case 'product_settings_general':
        return '商品设置 - 通用设置';
      default:
        return '商品管理';
    }
  }, [subPageId]);

  // Handle Category Modal Open (Screenshot 2)
  const handleOpenCategoryModal = (cat?: ProductCategoryItem) => {
    if (cat) {
      setCategoryForm({ ...cat });
      setCategoryModal({ isOpen: true, item: cat, isCreate: false });
    } else {
      setCategoryForm({
        name: '',
        sortOrder: categories.length + 1,
        status: '启用',
        icon: 'Accessibility',
      });
      setCategoryModal({ isOpen: true, item: null, isCreate: true });
    }
  };

  // Handle Save Category
  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryForm.name) {
      onNotice('请输入分类名称');
      return;
    }

    if (categoryModal.isCreate) {
      const newCat: ProductCategoryItem = {
        id: 'CAT_' + Date.now(),
        sortOrder: Number(categoryForm.sortOrder) || 1,
        name: categoryForm.name,
        icon: 'Accessibility',
        productCount: 0,
        lastUpdater: '系统管理员',
        lastUpdateTime: '2026-09-19 15:00:00',
        status: (categoryForm.status as '启用' | '禁用') || '启用',
      };
      setCategories([newCat, ...categories]);
      onNotice(`已成功添加分类“${newCat.name}”`);
    } else if (categoryModal.item) {
      setCategories(
        categories.map((c) =>
          c.id === categoryModal.item!.id
            ? {
                ...c,
                ...categoryForm,
                sortOrder: Number(categoryForm.sortOrder),
                lastUpdateTime: '2026-09-19 15:05:00',
                lastUpdater: '编辑管理员',
              }
            : c
        )
      );
      onNotice(`分类“${categoryForm.name}”修改已保存！`);
    }
    setCategoryModal({ isOpen: false, item: null, isCreate: false });
  };

  // Toggle Category Status
  const handleToggleCategoryStatus = (cat: ProductCategoryItem) => {
    const next = cat.status === '启用' ? '禁用' : '启用';
    setCategories(
      categories.map((c) => (c.id === cat.id ? { ...c, status: next, lastUpdateTime: '2026-09-19 15:10:00' } : c))
    );
    onNotice(`已更新分类“${cat.name}”状态为：${next}`);
  };

  // Delete Category
  const handleDeleteCategory = (cat: ProductCategoryItem) => {
    setConfirmModal({
      isOpen: true,
      title: '操作确认',
      message: `确定删除分类“${cat.name}”吗？删除后关联商品需重新分配分类。`,
      onConfirm: () => {
        setCategories(categories.filter((c) => c.id !== cat.id));
        onNotice(`已删除分类“${cat.name}”`);
        setConfirmModal((prev) => ({ ...prev, isOpen: false }));
      },
    });
  };

  // Handle Service Item Modal Open (Screenshot 8)
  const handleOpenServiceItemModal = (item?: ServiceItemDetail) => {
    if (item) {
      setServiceItemForm({ ...item });
      setServiceItemModal({ isOpen: true, item, isCreate: false });
    } else {
      setServiceItemForm({
        name: '',
        code: '323009000-00' + (serviceItems.length + 1),
        durationHours: 2,
        servicePeopleCount: 2,
        commission: 600,
        description: '',
        status: '启用',
      });
      setServiceItemModal({ isOpen: true, item: null, isCreate: true });
    }
  };

  // Save Service Item
  const handleSaveServiceItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceItemForm.name) {
      onNotice('请输入项目名称');
      return;
    }

    if (serviceItemModal.isCreate) {
      const newItem: ServiceItemDetail = {
        id: 'ITEM_' + Date.now(),
        name: serviceItemForm.name,
        code: serviceItemForm.code || '323009000-099',
        durationHours: Number(serviceItemForm.durationHours) || 1,
        servicePeopleCount: Number(serviceItemForm.servicePeopleCount) || 1,
        commission: Number(serviceItemForm.commission) || 300,
        description: serviceItemForm.description || '',
        status: (serviceItemForm.status as '启用' | '禁用') || '启用',
      };
      setServiceItems([newItem, ...serviceItems]);
      onNotice(`已成功添加服务项目“${newItem.name}”`);
    } else if (serviceItemModal.item) {
      setServiceItems(
        serviceItems.map((s) =>
          s.id === serviceItemModal.item!.id
            ? {
                ...s,
                ...serviceItemForm,
                durationHours: Number(serviceItemForm.durationHours),
                servicePeopleCount: Number(serviceItemForm.servicePeopleCount),
                commission: Number(serviceItemForm.commission),
              }
            : s
        )
      );
      onNotice(`服务项目“${serviceItemForm.name}”更新成功！`);
    }
    setServiceItemModal({ isOpen: false, item: null, isCreate: false });
  };

  // Toggle Service Item Status
  const handleToggleServiceItemStatus = (item: ServiceItemDetail) => {
    const next = item.status === '启用' ? '禁用' : '启用';
    setServiceItems(serviceItems.map((s) => (s.id === item.id ? { ...s, status: next } : s)));
    onNotice(`服务项目“${item.name}”状态已更改为：${next}`);
  };

  // Delete Service Item
  const handleDeleteServiceItem = (item: ServiceItemDetail) => {
    setConfirmModal({
      isOpen: true,
      title: '操作确认',
      message: `确定删除服务项目“${item.name}”吗？`,
      onConfirm: () => {
        setServiceItems(serviceItems.filter((s) => s.id !== item.id));
        onNotice(`已删除服务项目“${item.name}”`);
        setConfirmModal((prev) => ({ ...prev, isOpen: false }));
      },
    });
  };

  // Product Open Add / Edit Form
  const handleOpenProductForm = (prod?: ProductItem) => {
    if (prod) {
      setEditingProduct(prod);
      setProductForm({ ...prod });
      setViewMode('edit_prod');
    } else {
      setEditingProduct(null);
      setProductForm({
        title: '',
        code: '32300900' + Math.floor(Math.random() * 9),
        category: '护理复健',
        tags: ['脑血管疾病', '运动疗法'],
        thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=160&auto=format&fit=crop&q=80',
        remarks: '',
        scene: '上门居家',
        area: '不限',
        scope: '常规服务范围',
        overtimeFee: 50,
        detailsHtml: '肌力增强训练是一种通过特定的锻炼方法来增强肌肉力量和耐力的训练方式。',
        price: 1990.00,
        originalPrice: 2400.00,
        salesCount: 0,
        commission: 600.00,
        durationHours: 2,
        servicePeopleCount: 2,
        status: '已上架',
        validityPeriod: '购买后60天内有效',
        bookingRules: '请提前24小时预约',
      });
      setViewMode('create_prod');
    }
  };

  // Copy Product
  const handleCopyProduct = (prod: ProductItem) => {
    const copied: ProductItem = {
      ...prod,
      id: 'PROD_' + Date.now(),
      code: '323009' + Math.floor(1000 + Math.random() * 9000),
      title: prod.title + ' (副本)',
      lastUpdater: '系统管理员',
      lastUpdateTime: '2026-09-19 15:20:00',
    };
    setProducts([copied, ...products]);
    onNotice(`已成功复制创建商品：“${copied.title}”`);
  };

  // Toggle Product Status (Image 3)
  const handleToggleProductStatus = (prod: ProductItem) => {
    const isOff = prod.status === '已下架';
    setConfirmModal({
      isOpen: true,
      title: '操作确认',
      message: isOff ? `确定上架商品“${prod.title}”吗？` : `确定下架该服务“${prod.title}”吗？`,
      onConfirm: () => {
        const next = isOff ? '已上架' : '已下架';
        setProducts(
          products.map((p) =>
            p.id === prod.id ? { ...p, status: next, lastUpdateTime: '2026-09-19 15:25:00' } : p
          )
        );
        onNotice(`商品“${prod.title}”已${next}`);
        setConfirmModal((prev) => ({ ...prev, isOpen: false }));
      },
    });
  };

  // Delete Product
  const handleDeleteProduct = (prod: ProductItem) => {
    setConfirmModal({
      isOpen: true,
      title: '操作确认',
      message: `确定删除商品“${prod.title}”吗？删除后无法恢复。`,
      onConfirm: () => {
        setProducts(products.filter((p) => p.id !== prod.id));
        onNotice(`已删除商品“${prod.title}”`);
        setConfirmModal((prev) => ({ ...prev, isOpen: false }));
      },
    });
  };

  // Save Product Form
  const handleSaveProductForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.title) {
      onNotice('请输入商品名称');
      return;
    }

    if (viewMode === 'create_prod') {
      const newP: ProductItem = {
        id: 'PROD_' + Date.now(),
        code: productForm.code || '323009000',
        title: productForm.title,
        thumbnail: productForm.thumbnail || 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=160&auto=format&fit=crop&q=80',
        category: productForm.category || '护理复健',
        tags: productForm.tags || ['脑血管疾病', '运动疗法'],
        moduleCategory: '康复理疗',
        price: Number(productForm.price) || 1990,
        originalPrice: Number(productForm.originalPrice) || 2400,
        salesCount: 0,
        commission: Number(productForm.commission) || 600,
        durationHours: Number(productForm.durationHours) || 2,
        servicePeopleCount: Number(productForm.servicePeopleCount) || 2,
        status: (productForm.status as '已上架' | '已下架') || '已上架',
        lastUpdater: '新增人员',
        lastUpdateTime: '2026-09-19 15:30:00',
        remarks: productForm.remarks,
        scene: productForm.scene,
        area: productForm.area,
        scope: productForm.scope,
        overtimeFee: Number(productForm.overtimeFee) || 0,
        detailsHtml: productForm.detailsHtml,
        validityPeriod: productForm.validityPeriod,
        bookingRules: productForm.bookingRules,
      };
      setProducts([newP, ...products]);
      onNotice(`新增商品“${newP.title}”已提交并成功保存上架！`);
    } else if (viewMode === 'edit_prod' && editingProduct) {
      setProducts(
        products.map((p) =>
          p.id === editingProduct.id
            ? ({
                ...p,
                ...productForm,
                price: Number(productForm.price),
                commission: Number(productForm.commission),
                durationHours: Number(productForm.durationHours),
                servicePeopleCount: Number(productForm.servicePeopleCount),
                lastUpdater: '编辑管理员',
                lastUpdateTime: '2026-09-19 15:35:00',
              } as ProductItem)
            : p
        )
      );
      onNotice(`商品“${productForm.title}”编辑保存成功！`);
    }

    setViewMode('list');
  };

  // Filtered Products List
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (statusFilter && p.status !== statusFilter) return false;
        if (minPrice && p.price < parseFloat(minPrice)) return false;
        if (maxPrice && p.price > parseFloat(maxPrice)) return false;
        if (startDate && p.lastUpdateTime.slice(0, 10) < startDate) return false;
        if (endDate && p.lastUpdateTime.slice(0, 10) > endDate) return false;
        if (keyword) {
          const q = keyword.trim().toLowerCase();
          return p.title.toLowerCase().includes(q) || p.code.includes(q) || p.lastUpdater.toLowerCase().includes(q);
        }
        return true;
      })
      .sort((a, b) => new Date(b.lastUpdateTime).getTime() - new Date(a.lastUpdateTime).getTime());
  }, [products, statusFilter, minPrice, maxPrice, startDate, endDate, keyword]);

  // Filtered Category List (Screenshot 1 - sorted by lastUpdateTime descending)
  const filteredCategories = useMemo(() => {
    return categories
      .filter((c) => {
        if (keyword) {
          return c.name.includes(keyword) || c.lastUpdater.includes(keyword);
        }
        return true;
      })
      .sort((a, b) => new Date(b.lastUpdateTime).getTime() - new Date(a.lastUpdateTime).getTime());
  }, [categories, keyword]);

  // Filtered Service Items List (Screenshot 7)
  const filteredServiceItems = useMemo(() => {
    return serviceItems.filter((s) => {
      if (keyword) {
        return s.name.includes(keyword) || s.code.includes(keyword) || s.description.includes(keyword);
      }
      return true;
    });
  }, [serviceItems, keyword]);

  // Handle Checkbox Selection
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      if (isCategoryView) setSelectedIds(filteredCategories.map((c) => c.id));
      else if (isServiceItemView) setSelectedIds(filteredServiceItems.map((s) => s.id));
      else setSelectedIds(filteredProducts.map((p) => p.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((i) => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  // RENDER: Add / Edit Product Form View (Screenshots 4, 5, 6)
  if (viewMode === 'create_prod' || viewMode === 'edit_prod') {
    return (
      <div className="p-6 max-w-[1600px] mx-auto text-xs space-y-6">
        {/* Top Header Card */}
        <div className="flex items-center justify-between bg-white rounded-xl p-4 px-6 border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setViewMode('list')}
              className="p-1.5 hover:bg-gray-100 rounded-md text-gray-500 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center space-x-2">
              <span className="w-1 h-4 bg-[#10b981] rounded-full"></span>
              <h1 className="text-sm font-semibold text-gray-800">
                {viewMode === 'create_prod' ? '新增商品信息' : '编辑商品信息'}
              </h1>
            </div>
          </div>
        </div>

        <form onSubmit={handleSaveProductForm} className="space-y-6">
          {/* Section 1: 基础信息 (Screenshot 4) */}
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-5">
            <div className="text-xs font-semibold text-gray-800 pb-3 border-b border-gray-100">
              基础信息
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl">
              {/* 商品名称 */}
              <div className="space-y-1.5">
                <label className="text-gray-600 font-medium">
                  商品名称<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={productForm.title || ''}
                  onChange={(e) => setProductForm({ ...productForm, title: e.target.value })}
                  placeholder="请输入"
                  className="w-full px-3 py-1.5 border border-gray-200 rounded-md text-gray-800 focus:outline-none focus:border-[#10b981]"
                />
              </div>

              {/* 商品编码 */}
              <div className="space-y-1.5">
                <label className="text-gray-600 font-medium">商品编码</label>
                <input
                  type="text"
                  disabled
                  value={productForm.code || '323009000'}
                  className="w-full px-3 py-1.5 border border-gray-200 rounded-md text-gray-400 bg-gray-50 font-mono"
                />
              </div>

              {/* 标签 */}
              <div className="space-y-1.5">
                <label className="text-gray-600 font-medium">
                  标签<span className="text-red-500">*</span>
                </label>
                <select
                  value={productForm.tags?.[0] || '脑血管疾病'}
                  onChange={(e) => setProductForm({ ...productForm, tags: [e.target.value, '运动疗法'] })}
                  className="w-full px-3 py-1.5 border border-gray-200 rounded-md text-gray-800 bg-white focus:outline-none focus:border-[#10b981]"
                >
                  <option value="脑血管疾病">脑血管疾病</option>
                  <option value="运动疗法">运动疗法</option>
                  <option value="保洁护理">保洁护理</option>
                  <option value="慢病筛查">慢病筛查</option>
                </select>
              </div>

              {/* 图片 */}
              <div className="space-y-1.5 md:col-span-3">
                <label className="text-gray-600 font-medium">
                  图片<span className="text-red-500">*</span>
                </label>
                <div className="flex items-start space-x-4">
                  <div className="w-24 h-24 border border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-400 hover:border-[#10b981] cursor-pointer bg-gray-50/50">
                    <Upload className="w-5 h-5 mb-1" />
                    <span className="text-[10px]">+ 上传图片</span>
                  </div>
                  {productForm.thumbnail && (
                    <div className="w-24 h-24 rounded-lg overflow-hidden border border-gray-200">
                      <img src={productForm.thumbnail} alt="" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="text-[11px] text-gray-400 self-center">
                    支持jpg, png等格式文件上传，文件大小不超过10MB，最多可上传9张
                  </div>
                </div>
              </div>

              {/* 商品备注 */}
              <div className="space-y-1.5 md:col-span-3">
                <label className="text-gray-600 font-medium">商品备注</label>
                <textarea
                  rows={2}
                  value={productForm.remarks || ''}
                  onChange={(e) => setProductForm({ ...productForm, remarks: e.target.value })}
                  placeholder="请输入"
                  className="w-full px-3 py-1.5 border border-gray-200 rounded-md text-gray-800 focus:outline-none focus:border-[#10b981]"
                />
              </div>
            </div>
          </div>

          {/* Section 2: 参数设置 (Screenshot 4) */}
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <span className="text-xs font-semibold text-gray-800">参数设置</span>
              <button
                type="button"
                onClick={() => onNotice('打开参数库管理')}
                className="text-[#10b981] hover:underline text-xs flex items-center space-x-1"
              >
                <span>+参数管理</span>
              </button>
            </div>

            <div className="space-y-3 max-w-4xl">
              {/* 治疗方法 */}
              <div className="flex items-center space-x-4 bg-gray-50/60 p-2.5 rounded-lg border border-gray-100">
                <span className="w-20 text-gray-600 font-medium shrink-0">治疗方法</span>
                <select className="w-64 px-3 py-1.5 border border-gray-200 rounded-md text-gray-800 bg-white focus:outline-none focus:border-[#10b981]">
                  <option>请选择</option>
                  <option selected>物理治疗 / 运动诱导</option>
                  <option>中医作业疗法</option>
                </select>
                <button type="button" className="text-gray-400 hover:text-red-500 ml-auto">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* 疗程 */}
              <div className="flex items-center space-x-4 bg-gray-50/60 p-2.5 rounded-lg border border-gray-100">
                <span className="w-20 text-gray-600 font-medium shrink-0">疗程</span>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    defaultValue="10"
                    className="w-32 px-3 py-1.5 border border-gray-200 rounded-md text-gray-800 bg-white focus:outline-none focus:border-[#10b981]"
                  />
                  <span className="text-gray-500">次</span>
                </div>
                <button type="button" className="text-gray-400 hover:text-red-500 ml-auto">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* 适用人群 */}
              <div className="flex items-center space-x-4 bg-gray-50/60 p-2.5 rounded-lg border border-gray-100">
                <span className="w-20 text-gray-600 font-medium shrink-0">适用人群</span>
                <input
                  type="text"
                  placeholder="请输入"
                  defaultValue="脑卒中、脑外伤后遗症偏瘫及肢体障碍长者"
                  className="flex-1 px-3 py-1.5 border border-gray-200 rounded-md text-gray-800 bg-white focus:outline-none focus:border-[#10b981]"
                />
                <button type="button" className="text-gray-400 hover:text-red-500">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Section 3: 服务详情 (Screenshot 5) */}
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-4">
            <div className="text-xs font-semibold text-gray-800 pb-3 border-b border-gray-100">
              服务详情
            </div>

            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-50/80 p-2 border-b border-gray-200 flex flex-wrap items-center gap-1.5 text-gray-600">
                <button type="button" className="p-1.5 hover:bg-white rounded" title="标题"><Bold className="w-3.5 h-3.5" /></button>
                <button type="button" className="p-1.5 hover:bg-white rounded" title="加粗"><Bold className="w-3.5 h-3.5" /></button>
                <button type="button" className="p-1.5 hover:bg-white rounded" title="斜体"><Italic className="w-3.5 h-3.5" /></button>
                <button type="button" className="p-1.5 hover:bg-white rounded" title="下划线"><Underline className="w-3.5 h-3.5" /></button>
                <button type="button" className="p-1.5 hover:bg-white rounded" title="删除线"><Strikethrough className="w-3.5 h-3.5" /></button>
                <span className="w-[1px] h-4 bg-gray-300 mx-1"></span>
                <button type="button" className="p-1.5 hover:bg-white rounded" title="无序列表"><List className="w-3.5 h-3.5" /></button>
                <button type="button" className="p-1.5 hover:bg-white rounded" title="有序列表"><ListOrdered className="w-3.5 h-3.5" /></button>
                <button type="button" className="p-1.5 hover:bg-white rounded" title="引用"><Quote className="w-3.5 h-3.5" /></button>
                <span className="w-[1px] h-4 bg-gray-300 mx-1"></span>
                <button type="button" className="p-1.5 hover:bg-white rounded" title="插入图片"><ImageIcon className="w-3.5 h-3.5" /></button>
                <button type="button" className="p-1.5 hover:bg-white rounded" title="插入表格"><TableIcon className="w-3.5 h-3.5" /></button>
                <button type="button" className="p-1.5 hover:bg-white rounded" title="插入视频"><Video className="w-3.5 h-3.5" /></button>
                <span className="w-[1px] h-4 bg-gray-300 mx-1"></span>
                <button type="button" className="p-1.5 hover:bg-white rounded" title="撤销"><Undo className="w-3.5 h-3.5" /></button>
                <button type="button" className="p-1.5 hover:bg-white rounded" title="重做"><Redo className="w-3.5 h-3.5" /></button>
              </div>
              <textarea
                rows={5}
                value={productForm.detailsHtml || ''}
                onChange={(e) => setProductForm({ ...productForm, detailsHtml: e.target.value })}
                placeholder="请输入服务详情内容..."
                className="w-full p-4 text-gray-800 focus:outline-none text-xs"
              />
            </div>
          </div>

          {/* Section 4: 服务项目信息 (Screenshot 5 & 6) */}
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <span className="text-xs font-semibold text-gray-800">服务项目信息</span>
              <button
                type="button"
                onClick={() => onNotice('已打开添加服务项目列表')}
                className="text-[#10b981] hover:underline text-xs"
              >
                +添加项目
              </button>
            </div>

            <div className="overflow-x-auto border border-gray-100 rounded-lg">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/50 text-gray-600 border-b border-gray-100">
                    <th className="py-2.5 px-3 font-medium">序号</th>
                    <th className="py-2.5 px-3 font-medium">项目名称</th>
                    <th className="py-2.5 px-3 font-medium">项目编号</th>
                    <th className="py-2.5 px-3 font-medium">服务时长（小时）</th>
                    <th className="py-2.5 px-3 font-medium">服务人数</th>
                    <th className="py-2.5 px-3 font-medium">佣金 (元)</th>
                    <th className="py-2.5 px-3 font-medium max-w-xs">项目说明</th>
                    <th className="py-2.5 px-3 font-medium w-20">次数</th>
                    <th className="py-2.5 px-3 font-medium text-center">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="hover:bg-gray-50/50">
                    <td className="py-3 px-3">1</td>
                    <td className="py-3 px-3 font-medium text-gray-800">肌力增强训练</td>
                    <td className="py-3 px-3 font-mono text-gray-600">323009000-001</td>
                    <td className="py-3 px-3">2</td>
                    <td className="py-3 px-3">2</td>
                    <td className="py-3 px-3 font-mono">600</td>
                    <td className="py-3 px-3 text-gray-600 max-w-xs truncate">
                      肌力增强训练是一种通过特定的锻炼方法来增强肌肉力量和耐力的训练方式
                    </td>
                    <td className="py-3 px-3">
                      <input
                        type="number"
                        defaultValue="1"
                        className="w-16 px-2 py-1 border border-gray-200 rounded text-center focus:outline-none focus:border-[#10b981]"
                      />
                    </td>
                    <td className="py-3 px-3 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <button type="button" className="text-blue-600 hover:underline">编辑</button>
                        <button type="button" className="text-red-500 hover:underline">删除</button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 5: 售卖信息 (Screenshot 6) */}
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-5">
            <div className="text-xs font-semibold text-gray-800 pb-3 border-b border-gray-100">
              售卖信息
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl">
              {/* 商品价格 */}
              <div className="space-y-1.5">
                <label className="text-gray-600 font-medium">
                  商品价格<span className="text-red-500">*</span>
                </label>
                <div className="flex items-center">
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={productForm.price || ''}
                    onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                    className="w-full px-3 py-1.5 border border-gray-200 rounded-l-md text-gray-800 focus:outline-none focus:border-[#10b981]"
                  />
                  <span className="bg-gray-50 border border-l-0 border-gray-200 text-gray-500 px-3 py-1.5 rounded-r-md">
                    元
                  </span>
                </div>
              </div>

              {/* 划线价 */}
              <div className="space-y-1.5">
                <label className="text-gray-600 font-medium">划线价</label>
                <div className="flex items-center">
                  <input
                    type="number"
                    step="0.01"
                    value={productForm.originalPrice || ''}
                    onChange={(e) => setProductForm({ ...productForm, originalPrice: Number(e.target.value) })}
                    className="w-full px-3 py-1.5 border border-gray-200 rounded-l-md text-gray-800 focus:outline-none focus:border-[#10b981]"
                  />
                  <span className="bg-gray-50 border border-l-0 border-gray-200 text-gray-500 px-3 py-1.5 rounded-r-md">
                    元
                  </span>
                </div>
              </div>

              {/* 销量 */}
              <div className="space-y-1.5">
                <label className="text-gray-600 font-medium">
                  销量<span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={productForm.salesCount || 0}
                  onChange={(e) => setProductForm({ ...productForm, salesCount: Number(e.target.value) })}
                  className="w-full px-3 py-1.5 border border-gray-200 rounded-md text-gray-800 focus:outline-none focus:border-[#10b981]"
                />
              </div>

              {/* 上门评估佣金 */}
              <div className="space-y-1.5">
                <label className="text-gray-600 font-medium">
                  上门评估佣金<span className="text-red-500">*</span>
                </label>
                <div className="flex items-center">
                  <input
                    type="number"
                    step="0.01"
                    value={productForm.commission || ''}
                    onChange={(e) => setProductForm({ ...productForm, commission: Number(e.target.value) })}
                    className="w-full px-3 py-1.5 border border-gray-200 rounded-l-md text-gray-800 focus:outline-none focus:border-[#10b981]"
                  />
                  <span className="bg-gray-50 border border-l-0 border-gray-200 text-gray-500 px-3 py-1.5 rounded-r-md">
                    元
                  </span>
                </div>
              </div>

              {/* 服务时长 */}
              <div className="space-y-1.5">
                <label className="text-gray-600 font-medium">
                  服务时长<span className="text-red-500">*</span>
                </label>
                <div className="flex items-center">
                  <input
                    type="number"
                    value={productForm.durationHours || ''}
                    onChange={(e) => setProductForm({ ...productForm, durationHours: Number(e.target.value) })}
                    className="w-full px-3 py-1.5 border border-gray-200 rounded-l-md text-gray-800 focus:outline-none focus:border-[#10b981]"
                  />
                  <span className="bg-gray-50 border border-l-0 border-gray-200 text-gray-500 px-3 py-1.5 rounded-r-md">
                    h
                  </span>
                </div>
              </div>

              {/* 服务人数 */}
              <div className="space-y-1.5">
                <label className="text-gray-600 font-medium">
                  服务人数<span className="text-red-500">*</span>
                </label>
                <div className="flex items-center">
                  <input
                    type="number"
                    value={productForm.servicePeopleCount || 1}
                    onChange={(e) => setProductForm({ ...productForm, servicePeopleCount: Number(e.target.value) })}
                    className="w-full px-3 py-1.5 border border-gray-200 rounded-l-md text-gray-800 focus:outline-none focus:border-[#10b981]"
                  />
                  <span className="bg-gray-50 border border-l-0 border-gray-200 text-gray-500 px-3 py-1.5 rounded-r-md">
                    人
                  </span>
                </div>
              </div>
            </div>

            {/* Radio / Textarea options */}
            <div className="space-y-4 pt-2 max-w-5xl">
              {/* 售卖时间 */}
              <div className="flex items-center space-x-6">
                <span className="w-20 text-gray-600 font-medium shrink-0">售卖时间</span>
                <div className="flex items-center space-x-6">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="statusChoice"
                      checked={productForm.status === '已上架'}
                      onChange={() => setProductForm({ ...productForm, status: '已上架' })}
                      className="accent-[#10b981]"
                    />
                    <span>立即上架</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="statusChoice"
                      checked={productForm.status === '已下架'}
                      onChange={() => setProductForm({ ...productForm, status: '已下架' })}
                      className="accent-[#10b981]"
                    />
                    <span>暂不上架</span>
                  </label>
                </div>
              </div>

              {/* 有效期 */}
              <div className="flex items-center space-x-6">
                <span className="w-20 text-gray-600 font-medium shrink-0">有效期</span>
                <select
                  value={productForm.validityPeriod || '购买后60天内有效'}
                  onChange={(e) => setProductForm({ ...productForm, validityPeriod: e.target.value })}
                  className="w-64 px-3 py-1.5 border border-gray-200 rounded-md text-gray-800 bg-white focus:outline-none focus:border-[#10b981]"
                >
                  <option value="请选择">请选择</option>
                  <option value="购买后30天内有效">购买后30天内有效</option>
                  <option value="购买后60天内有效">购买后60天内有效</option>
                  <option value="购买后90天内有效">购买后90天内有效</option>
                </select>
              </div>

              {/* 使用说明 */}
              <div className="flex items-start space-x-6">
                <span className="w-20 pt-1 text-gray-600 font-medium shrink-0">使用说明</span>
                <textarea
                  rows={2}
                  value={productForm.bookingRules || ''}
                  onChange={(e) => setProductForm({ ...productForm, bookingRules: e.target.value })}
                  placeholder="请输入"
                  className="flex-1 px-3 py-1.5 border border-gray-200 rounded-md text-gray-800 focus:outline-none focus:border-[#10b981]"
                />
              </div>
            </div>
          </div>

          {/* Bottom Action Bar (Screenshot 6) */}
          <div className="flex items-center space-x-3 pt-2">
            <button
              type="submit"
              className="px-6 py-2 bg-[#10b981] hover:bg-[#059669] text-white rounded-md font-medium transition-colors text-xs"
            >
              提交审核
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className="px-6 py-2 border border-gray-200 hover:bg-gray-50 text-gray-600 rounded-md font-medium transition-colors text-xs"
            >
              返回
            </button>
          </div>
        </form>
      </div>
    );
  }

  // RENDER 1: Category Management List View (Screenshot 1)
  if (isCategoryView) {
    return (
      <div className="p-6 max-w-[1600px] mx-auto text-xs space-y-6">
        {/* Filter Card (Screenshot 1) */}
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-4">
          <div className="flex items-center space-x-2.5 pb-2">
            <span className="w-1 h-4 bg-[#10b981] rounded-full"></span>
            <h1 className="text-sm font-semibold text-gray-800">{pageTitle}</h1>
          </div>

          <div className="flex items-center space-x-3 max-w-md">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="请输入关键字"
              className="flex-1 px-3 py-1.5 border border-gray-200 rounded-md text-gray-700 focus:outline-none focus:border-[#10b981]"
            />
            <button
              onClick={() => onNotice(`已筛选出 ${filteredCategories.length} 个分类`)}
              className="p-2 bg-[#10b981] hover:bg-[#059669] text-white rounded-md transition-colors shrink-0"
            >
              <Search className="w-4 h-4" />
            </button>
            <button
              onClick={() => { setKeyword(''); onNotice('已重置关键字搜索'); }}
              className="p-2 border border-gray-200 hover:bg-gray-50 text-gray-500 rounded-md transition-colors shrink-0"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Categories Table Card (Screenshot 1) */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-hidden">
          <div className="p-4 flex items-center justify-end space-x-3 border-b border-gray-100">
            <button
              onClick={() => handleOpenCategoryModal()}
              className="px-4 py-1.5 bg-[#10b981] hover:bg-[#059669] text-white rounded-md font-medium transition-colors flex items-center space-x-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>新增分类</span>
            </button>
            <button
              onClick={() => onNotice('批量操作选择分类')}
              className="px-4 py-1.5 border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-md font-medium transition-colors"
            >
              批量操作
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 text-gray-600 bg-gray-50/50">
                  <th className="py-3 px-4 font-medium w-16">序号</th>
                  <th className="py-3 px-4 font-medium">分类名称</th>
                  <th className="py-3 px-4 font-medium w-16">图标</th>
                  <th className="py-3 px-4 font-medium text-center">商品数量</th>
                  <th className="py-3 px-4 font-medium">最后更新人</th>
                  <th className="py-3 px-4 font-medium">最后更新时间</th>
                  <th className="py-3 px-4 font-medium text-center">状态</th>
                  <th className="py-3 px-4 font-medium text-center">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredCategories.map((cat) => (
                  <tr key={cat.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="py-3.5 px-4 font-mono text-gray-500">{cat.sortOrder}</td>
                    <td className="py-3.5 px-4 font-medium text-gray-800">{cat.name}</td>
                    <td className="py-3.5 px-4 text-[#4f46e5]">
                      <Accessibility className="w-5 h-5" />
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono font-medium text-[#10b981]">
                      {cat.productCount}
                    </td>
                    <td className="py-3.5 px-4 text-gray-700">{cat.lastUpdater}</td>
                    <td className="py-3.5 px-4 font-mono text-gray-500 whitespace-nowrap">
                      {cat.lastUpdateTime}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => handleToggleCategoryStatus(cat)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                          cat.status === '启用'
                            ? 'bg-[#10b981] text-white hover:bg-emerald-600'
                            : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                        }`}
                      >
                        {cat.status}
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center space-x-3">
                        <button
                          onClick={() => handleOpenCategoryModal(cat)}
                          className="text-blue-600 hover:underline font-medium"
                        >
                          编辑
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(cat)}
                          className="text-red-500 hover:underline font-medium"
                        >
                          删除
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Dialog: 编辑分类 / 新增分类 (Screenshot 2) */}
        {categoryModal.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs">
            <div className="bg-white rounded-xl w-full max-w-md overflow-hidden shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100">
                <h3 className="text-sm font-semibold text-gray-800">
                  {categoryModal.isCreate ? '新增分类' : '编辑分类'}
                </h3>
                <button
                  onClick={() => setCategoryModal({ isOpen: false, item: null, isCreate: false })}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveCategory} className="p-6 space-y-4 text-xs">
                {/* 分类名称* */}
                <div className="flex items-center space-x-3">
                  <label className="w-20 text-right text-gray-600 font-medium shrink-0">
                    分类名称<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={categoryForm.name || ''}
                    onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                    placeholder="如：生活照料"
                    className="flex-1 px-3 py-1.5 border border-gray-200 rounded-md text-gray-800 focus:outline-none focus:border-[#10b981]"
                  />
                </div>

                {/* 图标* */}
                <div className="flex items-start space-x-3">
                  <label className="w-20 text-right text-gray-600 font-medium pt-1 shrink-0">
                    图标<span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-col space-y-1">
                    <div className="w-12 h-12 border border-dashed border-gray-300 rounded-md flex items-center justify-center text-gray-400 hover:border-[#10b981] cursor-pointer bg-gray-50">
                      <Plus className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] text-gray-400">请上传尺寸100*100px，格式png</span>
                  </div>
                </div>

                {/* 序号* */}
                <div className="flex items-center space-x-3">
                  <label className="w-20 text-right text-gray-600 font-medium shrink-0">
                    序号<span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-col space-y-1 flex-1">
                    <input
                      type="number"
                      required
                      value={categoryForm.sortOrder || 1}
                      onChange={(e) => setCategoryForm({ ...categoryForm, sortOrder: Number(e.target.value) })}
                      className="w-full px-3 py-1.5 border border-gray-200 rounded-md text-gray-800 focus:outline-none focus:border-[#10b981]"
                    />
                    <span className="text-[10px] text-gray-400">数字越大，排序越靠前</span>
                  </div>
                </div>

                {/* 状态 */}
                <div className="flex items-center space-x-3">
                  <label className="w-20 text-right text-gray-600 font-medium shrink-0">状态</label>
                  <button
                    type="button"
                    onClick={() =>
                      setCategoryForm({
                        ...categoryForm,
                        status: categoryForm.status === '启用' ? '禁用' : '启用',
                      })
                    }
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                      categoryForm.status === '启用' ? 'bg-[#10b981] text-white' : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {categoryForm.status || '启用'}
                  </button>
                </div>

                {/* Modal Footer */}
                <div className="pt-4 flex items-center justify-end space-x-3 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setCategoryModal({ isOpen: false, item: null, isCreate: false })}
                    className="px-4 py-1.5 border border-gray-200 hover:bg-gray-50 text-gray-600 rounded-md transition-colors"
                  >
                    取消
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-1.5 bg-[#10b981] hover:bg-[#059669] text-white rounded-md font-medium transition-colors"
                  >
                    确定
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  // RENDER 2: Service Item Management View (Screenshot 7)
  if (isServiceItemView) {
    return (
      <div className="p-6 max-w-[1600px] mx-auto text-xs space-y-6">
        {/* Filter Card (Screenshot 7) */}
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-4">
          <div className="flex items-center space-x-2.5 pb-2">
            <span className="w-1 h-4 bg-[#10b981] rounded-full"></span>
            <h1 className="text-sm font-semibold text-gray-800">{pageTitle}</h1>
          </div>

          <div className="flex items-center space-x-3 max-w-md">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="请输入关键字"
              className="flex-1 px-3 py-1.5 border border-gray-200 rounded-md text-gray-700 focus:outline-none focus:border-[#10b981]"
            />
            <button
              onClick={() => onNotice(`已搜索到 ${filteredServiceItems.length} 项服务项目`)}
              className="p-2 bg-[#10b981] hover:bg-[#059669] text-white rounded-md transition-colors shrink-0"
            >
              <Search className="w-4 h-4" />
            </button>
            <button
              onClick={() => { setKeyword(''); onNotice('已重置服务项目筛选'); }}
              className="p-2 border border-gray-200 hover:bg-gray-50 text-gray-500 rounded-md transition-colors shrink-0"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Service Items Table Card (Screenshot 7) */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-hidden">
          <div className="p-4 flex items-center justify-end space-x-3 border-b border-gray-100">
            <button
              onClick={() => handleOpenServiceItemModal()}
              className="px-4 py-1.5 bg-[#10b981] hover:bg-[#059669] text-white rounded-md font-medium transition-colors flex items-center space-x-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>新增</span>
            </button>
            <button
              onClick={() => onNotice('支持批量修改服务项目状态或佣金')}
              className="px-4 py-1.5 border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-md font-medium transition-colors"
            >
              批量操作
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 text-gray-600 bg-gray-50/50">
                  <th className="py-3 px-4 w-10">
                    <input
                      type="checkbox"
                      checked={selectedIds.length > 0 && selectedIds.length === filteredServiceItems.length}
                      onChange={handleSelectAll}
                      className="rounded text-[#10b981] accent-[#10b981]"
                    />
                  </th>
                  <th className="py-3 px-4 font-medium">项目名称</th>
                  <th className="py-3 px-4 font-medium">项目编号</th>
                  <th className="py-3 px-4 font-medium text-center">服务时长 (小时)</th>
                  <th className="py-3 px-4 font-medium text-center">服务人数</th>
                  <th className="py-3 px-4 font-medium">佣金 (元)</th>
                  <th className="py-3 px-4 font-medium max-w-md">项目说明</th>
                  <th className="py-3 px-4 font-medium text-center">状态</th>
                  <th className="py-3 px-4 font-medium text-center">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredServiceItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="py-3.5 px-4">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(item.id)}
                        onChange={() => handleSelectOne(item.id)}
                        className="rounded text-[#10b981] accent-[#10b981]"
                      />
                    </td>
                    <td className="py-3.5 px-4 font-medium text-gray-800">{item.name}</td>
                    <td className="py-3.5 px-4 font-mono text-gray-600">{item.code}</td>
                    <td className="py-3.5 px-4 text-center font-mono">{item.durationHours}</td>
                    <td className="py-3.5 px-4 text-center font-mono">{item.servicePeopleCount}</td>
                    <td className="py-3.5 px-4 font-mono font-medium text-gray-800">
                      {item.commission.toFixed(2)}
                    </td>
                    <td className="py-3.5 px-4 text-gray-600 max-w-md line-clamp-2">
                      {item.description}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => handleToggleServiceItemStatus(item)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                          item.status === '启用'
                            ? 'bg-[#10b981] text-white hover:bg-emerald-600'
                            : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                        }`}
                      >
                        {item.status}
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center space-x-3">
                        <button
                          onClick={() => handleOpenServiceItemModal(item)}
                          className="text-blue-600 hover:underline font-medium"
                        >
                          编辑
                        </button>
                        <button
                          onClick={() => handleDeleteServiceItem(item)}
                          className="text-red-500 hover:underline font-medium"
                        >
                          删除
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Dialog: 编辑项目信息 / 新增项目信息 (Screenshot 8) */}
        {serviceItemModal.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs">
            <div className="bg-white rounded-xl w-full max-w-lg overflow-hidden shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100">
                <h3 className="text-sm font-semibold text-gray-800">
                  {serviceItemModal.isCreate ? '新增项目信息' : '编辑项目信息'}
                </h3>
                <button
                  onClick={() => setServiceItemModal({ isOpen: false, item: null, isCreate: false })}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveServiceItem} className="p-6 space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-4">
                  {/* 项目名称* */}
                  <div className="space-y-1">
                    <label className="text-gray-600 font-medium">
                      项目名称<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={serviceItemForm.name || ''}
                      onChange={(e) => setServiceItemForm({ ...serviceItemForm, name: e.target.value })}
                      placeholder="请输入"
                      className="w-full px-3 py-1.5 border border-gray-200 rounded-md text-gray-800 focus:outline-none focus:border-[#10b981]"
                    />
                  </div>

                  {/* 项目编号 */}
                  <div className="space-y-1">
                    <label className="text-gray-600 font-medium">项目编号</label>
                    <input
                      type="text"
                      disabled
                      value={serviceItemForm.code || '323009000'}
                      className="w-full px-3 py-1.5 border border-gray-200 rounded-md text-gray-400 bg-gray-50 font-mono"
                    />
                  </div>

                  {/* 佣金(元)* */}
                  <div className="space-y-1">
                    <label className="text-gray-600 font-medium">
                      佣金 (元)<span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center">
                      <input
                        type="number"
                        required
                        value={serviceItemForm.commission || ''}
                        onChange={(e) =>
                          setServiceItemForm({ ...serviceItemForm, commission: Number(e.target.value) })
                        }
                        placeholder="请输入"
                        className="w-full px-3 py-1.5 border border-gray-200 rounded-l-md text-gray-800 focus:outline-none focus:border-[#10b981]"
                      />
                      <span className="bg-gray-50 border border-l-0 border-gray-200 text-gray-500 px-3 py-1.5 rounded-r-md">
                        元
                      </span>
                    </div>
                  </div>

                  {/* 服务人数* */}
                  <div className="space-y-1">
                    <label className="text-gray-600 font-medium">
                      服务人数<span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center">
                      <input
                        type="number"
                        required
                        value={serviceItemForm.servicePeopleCount || ''}
                        onChange={(e) =>
                          setServiceItemForm({
                            ...serviceItemForm,
                            servicePeopleCount: Number(e.target.value),
                          })
                        }
                        placeholder="请输入"
                        className="w-full px-3 py-1.5 border border-gray-200 rounded-l-md text-gray-800 focus:outline-none focus:border-[#10b981]"
                      />
                      <span className="bg-gray-50 border border-l-0 border-gray-200 text-gray-500 px-3 py-1.5 rounded-r-md">
                        人
                      </span>
                    </div>
                  </div>

                  {/* 服务时长* */}
                  <div className="space-y-1 col-span-2">
                    <label className="text-gray-600 font-medium">
                      服务时长<span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center">
                      <input
                        type="number"
                        step="0.5"
                        required
                        value={serviceItemForm.durationHours || ''}
                        onChange={(e) =>
                          setServiceItemForm({ ...serviceItemForm, durationHours: Number(e.target.value) })
                        }
                        placeholder="请输入"
                        className="w-full px-3 py-1.5 border border-gray-200 rounded-l-md text-gray-800 focus:outline-none focus:border-[#10b981]"
                      />
                      <span className="bg-gray-50 border border-l-0 border-gray-200 text-gray-500 px-3 py-1.5 rounded-r-md">
                        小时
                      </span>
                    </div>
                  </div>

                  {/* 项目说明 */}
                  <div className="space-y-1 col-span-2">
                    <label className="text-gray-600 font-medium">项目说明</label>
                    <textarea
                      rows={3}
                      value={serviceItemForm.description || ''}
                      onChange={(e) => setServiceItemForm({ ...serviceItemForm, description: e.target.value })}
                      placeholder="请输入项目具体练习与操作规范说明..."
                      className="w-full px-3 py-1.5 border border-gray-200 rounded-md text-gray-800 focus:outline-none focus:border-[#10b981]"
                    />
                  </div>

                  {/* 状态 */}
                  <div className="space-y-1 col-span-2 flex items-center space-x-3">
                    <label className="text-gray-600 font-medium">状态</label>
                    <button
                      type="button"
                      onClick={() =>
                        setServiceItemForm({
                          ...serviceItemForm,
                          status: serviceItemForm.status === '启用' ? '禁用' : '启用',
                        })
                      }
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                        serviceItemForm.status === '启用' ? 'bg-[#10b981] text-white' : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {serviceItemForm.status || '启用'}
                    </button>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="pt-4 flex items-center justify-end space-x-3 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setServiceItemModal({ isOpen: false, item: null, isCreate: false })}
                    className="px-4 py-1.5 border border-gray-200 hover:bg-gray-50 text-gray-600 rounded-md transition-colors"
                  >
                    取消
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-1.5 bg-[#10b981] hover:bg-[#059669] text-white rounded-md font-medium transition-colors"
                  >
                    确定
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  // RENDER 2.5: Product Parameter Management View (Screenshots 7 & 8)
  if (isParamView) {
    return (
      <div className="p-6 max-w-[1600px] mx-auto text-xs space-y-6">
        {/* Filter Card */}
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-4">
          <div className="flex items-center space-x-2.5 pb-2">
            <span className="w-1 h-4 bg-[#10b981] rounded-full"></span>
            <h1 className="text-sm font-semibold text-gray-800">{pageTitle}</h1>
          </div>

          <div className="flex items-center space-x-3 max-w-md">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="请输入关键字"
              className="flex-1 px-3 py-1.5 border border-gray-200 rounded-md text-gray-700 focus:outline-none focus:border-[#10b981]"
            />
            <button
              onClick={() => onNotice(`已检索到 ${filteredParams.length} 个参数`)}
              className="p-2 bg-[#10b981] hover:bg-[#059669] text-white rounded-md transition-colors shrink-0"
            >
              <Search className="w-4 h-4" />
            </button>
            <button
              onClick={() => { setKeyword(''); onNotice('已重置关键字'); }}
              className="p-2 border border-gray-200 hover:bg-gray-50 text-gray-500 rounded-md transition-colors shrink-0"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-hidden">
          <div className="p-4 flex items-center justify-end space-x-3 border-b border-gray-100">
            <button
              onClick={() => handleOpenParamModal()}
              className="px-4 py-1.5 bg-[#10b981] hover:bg-[#059669] text-white rounded-md font-medium transition-colors flex items-center space-x-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>新增</span>
            </button>
            <button
              onClick={() => onNotice('支持勾选批量修改参数')}
              className="px-4 py-1.5 border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-md font-medium transition-colors"
            >
              批量操作
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 text-gray-600 bg-gray-50/50">
                  <th className="py-3 px-4 font-medium w-16">序号</th>
                  <th className="py-3 px-4 font-medium">参数名称</th>
                  <th className="py-3 px-4 font-medium">服务类型</th>
                  <th className="py-3 px-4 font-medium">参数类型</th>
                  <th className="py-3 px-4 font-medium text-center">是否必填</th>
                  <th className="py-3 px-4 font-medium">最后更新人</th>
                  <th className="py-3 px-4 font-medium">最后更新时间</th>
                  <th className="py-3 px-4 font-medium text-center">状态</th>
                  <th className="py-3 px-4 font-medium text-center">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredParams.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="py-3.5 px-4 font-mono text-gray-500">{item.sortOrder}</td>
                    <td className="py-3.5 px-4 font-medium text-gray-800">{item.name}</td>
                    <td className="py-3.5 px-4 text-gray-600">{item.serviceType}</td>
                    <td className="py-3.5 px-4 text-gray-600">{item.paramType}</td>
                    <td className="py-3.5 px-4 text-center">
                      <span className={`inline-block px-2 py-0.5 rounded text-[11px] ${item.isRequired ? 'bg-red-50 text-red-500 font-medium' : 'bg-gray-100 text-gray-500'}`}>
                        {item.isRequired ? '必填' : '非必填'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-gray-700">{item.lastUpdater}</td>
                    <td className="py-3.5 px-4 font-mono text-gray-500 whitespace-nowrap">{item.lastUpdateTime}</td>
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => handleToggleParamStatus(item)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                          item.status === '启用' ? 'bg-[#10b981] text-white' : 'bg-gray-200 text-gray-600'
                        }`}
                      >
                        {item.status}
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center space-x-3">
                        <button onClick={() => handleOpenParamModal(item)} className="text-blue-600 hover:underline font-medium">
                          编辑
                        </button>
                        <button onClick={() => handleDeleteParam(item)} className="text-red-500 hover:underline font-medium">
                          删除
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Dialog: 新增参数 / 编辑参数 (Screenshot 8) */}
        {paramModal.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs">
            <div className="bg-white rounded-xl w-full max-w-md overflow-hidden shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100">
                <h3 className="text-sm font-semibold text-gray-800">
                  {paramModal.isCreate ? '新增参数' : '编辑参数'}
                </h3>
                <button
                  onClick={() => setParamModal({ isOpen: false, item: null, isCreate: false })}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveParam} className="p-6 space-y-4 text-xs">
                <div className="flex items-center space-x-3">
                  <label className="w-20 text-right text-gray-600 font-medium shrink-0">
                    参数名称<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={paramForm.name || ''}
                    onChange={(e) => setParamForm({ ...paramForm, name: e.target.value })}
                    placeholder="如：检测项目"
                    className="flex-1 px-3 py-1.5 border border-gray-200 rounded-md text-gray-800 focus:outline-none focus:border-[#10b981]"
                  />
                </div>

                <div className="flex items-center space-x-3">
                  <label className="w-20 text-right text-gray-600 font-medium shrink-0">
                    服务类型<span className="text-red-500">*</span>
                  </label>
                  <select
                    value={paramForm.serviceType || '家政护工/上门体检'}
                    onChange={(e) => setParamForm({ ...paramForm, serviceType: e.target.value })}
                    className="flex-1 px-3 py-1.5 border border-gray-200 rounded-md text-gray-800 bg-white focus:outline-none focus:border-[#10b981]"
                  >
                    <option value="家政护工/上门体检">家政护工/上门体检</option>
                    <option value="康复理疗">康复理疗</option>
                    <option value="上门体检">上门体检</option>
                  </select>
                </div>

                <div className="flex items-center space-x-3">
                  <label className="w-20 text-right text-gray-600 font-medium shrink-0">
                    参数类型<span className="text-red-500">*</span>
                  </label>
                  <select
                    value={paramForm.paramType || '文本'}
                    onChange={(e) => setParamForm({ ...paramForm, paramType: e.target.value })}
                    className="flex-1 px-3 py-1.5 border border-gray-200 rounded-md text-gray-800 bg-white focus:outline-none focus:border-[#10b981]"
                  >
                    <option value="文本">文本</option>
                    <option value="数字">数字</option>
                    <option value="下拉单选">下拉单选</option>
                  </select>
                </div>

                <div className="flex items-center space-x-3">
                  <label className="w-20 text-right text-gray-600 font-medium shrink-0">
                    是否必填<span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center space-x-6">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="isRequiredChoice"
                        checked={paramForm.isRequired === true}
                        onChange={() => setParamForm({ ...paramForm, isRequired: true })}
                        className="accent-[#10b981]"
                      />
                      <span>必填</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="isRequiredChoice"
                        checked={paramForm.isRequired === false}
                        onChange={() => setParamForm({ ...paramForm, isRequired: false })}
                        className="accent-[#10b981]"
                      />
                      <span>非必填</span>
                    </label>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <label className="w-20 text-right text-gray-600 font-medium shrink-0">文字提示</label>
                  <input
                    type="text"
                    value={paramForm.placeholder || ''}
                    onChange={(e) => setParamForm({ ...paramForm, placeholder: e.target.value })}
                    placeholder="请输入文字提示"
                    className="flex-1 px-3 py-1.5 border border-gray-200 rounded-md text-gray-800 focus:outline-none focus:border-[#10b981]"
                  />
                </div>

                <div className="flex items-center space-x-3">
                  <label className="w-20 text-right text-gray-600 font-medium shrink-0">状态</label>
                  <button
                    type="button"
                    onClick={() =>
                      setParamForm({
                        ...paramForm,
                        status: paramForm.status === '启用' ? '禁用' : '启用',
                      })
                    }
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                      paramForm.status === '启用' ? 'bg-[#10b981] text-white' : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {paramForm.status || '启用'}
                  </button>
                </div>

                <div className="flex items-center space-x-3">
                  <label className="w-20 text-right text-gray-600 font-medium shrink-0">
                    序号<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    value={paramForm.sortOrder || 1}
                    onChange={(e) => setParamForm({ ...paramForm, sortOrder: Number(e.target.value) })}
                    className="flex-1 px-3 py-1.5 border border-gray-200 rounded-md text-gray-800 focus:outline-none focus:border-[#10b981]"
                  />
                </div>

                <div className="pt-4 flex items-center justify-end space-x-3 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setParamModal({ isOpen: false, item: null, isCreate: false })}
                    className="px-4 py-1.5 border border-gray-200 hover:bg-gray-50 text-gray-600 rounded-md transition-colors"
                  >
                    取消
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-1.5 bg-[#10b981] hover:bg-[#059669] text-white rounded-md font-medium transition-colors"
                  >
                    确定
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  // RENDER 2.8: General Settings View (Screenshot 9)
  if (isGeneralSettingsView) {
    return (
      <div className="p-6 max-w-[1200px] mx-auto text-xs space-y-6">
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-6">
          <div className="flex items-center space-x-2.5 pb-2 border-b border-gray-100">
            <span className="w-1 h-4 bg-[#10b981] rounded-full"></span>
            <h1 className="text-sm font-semibold text-gray-800">{pageTitle}</h1>
          </div>

          <div className="space-y-6 max-w-2xl text-xs">
            {/* 下单按钮名称 */}
            <div className="space-y-1.5">
              <label className="text-gray-700 font-medium">下单按钮名称</label>
              <input
                type="text"
                value={generalSettings.orderButtonName}
                onChange={(e) => setGeneralSettings({ ...generalSettings, orderButtonName: e.target.value })}
                className="w-80 px-3 py-1.5 border border-gray-200 rounded-md text-gray-800 focus:outline-none focus:border-[#10b981]"
              />
            </div>

            {/* 商品好评率 */}
            <div className="space-y-1.5">
              <div className="flex items-center space-x-3">
                <span className="text-gray-700 font-medium">商品好评率</span>
                <button
                  type="button"
                  onClick={() => setGeneralSettings({ ...generalSettings, enablePraiseRate: !generalSettings.enablePraiseRate })}
                  className={`w-10 h-5 flex items-center rounded-full p-0.5 transition-colors ${generalSettings.enablePraiseRate ? 'bg-[#10b981]' : 'bg-gray-200'}`}
                >
                  <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${generalSettings.enablePraiseRate ? 'translate-x-5' : 'translate-x-0'}`}></div>
                </button>
              </div>
              <p className="text-gray-400 text-[11px]">启用后，将在商品评价页面中展示好评率</p>
            </div>

            {/* 详情页服务人员 */}
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <span className="text-gray-700 font-medium">详情页服务人员</span>
                <button
                  type="button"
                  onClick={() => setGeneralSettings({ ...generalSettings, enableDetailStaff: !generalSettings.enableDetailStaff })}
                  className={`w-10 h-5 flex items-center rounded-full p-0.5 transition-colors ${generalSettings.enableDetailStaff ? 'bg-[#10b981]' : 'bg-gray-200'}`}
                >
                  <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${generalSettings.enableDetailStaff ? 'translate-x-5' : 'translate-x-0'}`}></div>
                </button>
              </div>
              <p className="text-gray-400 text-[11px]">启用后，将在商品详情页展示该商品所在服务类型下好评率高的服务人员</p>

              {generalSettings.enableDetailStaff && (
                <div className="flex items-center space-x-3 pt-1">
                  <span className="text-gray-600">展示数量</span>
                  <input
                    type="number"
                    value={generalSettings.displayStaffCount}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, displayStaffCount: Number(e.target.value) })}
                    className="w-24 px-3 py-1 border border-gray-200 rounded-md text-gray-800 focus:outline-none focus:border-[#10b981]"
                  />
                  <span className="text-gray-400">个</span>
                </div>
              )}
            </div>

            {/* 商品销量 */}
            <div className="space-y-1.5">
              <div className="flex items-center space-x-3">
                <span className="text-gray-700 font-medium">商品销量</span>
                <button
                  type="button"
                  onClick={() => setGeneralSettings({ ...generalSettings, enableProductSales: !generalSettings.enableProductSales })}
                  className={`w-10 h-5 flex items-center rounded-full p-0.5 transition-colors ${generalSettings.enableProductSales ? 'bg-[#10b981]' : 'bg-gray-200'}`}
                >
                  <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${generalSettings.enableProductSales ? 'translate-x-5' : 'translate-x-0'}`}></div>
                </button>
              </div>
              <p className="text-gray-400 text-[11px]">启用后，将在商品详情页展示商品销量</p>
            </div>

            {/* Save Button */}
            <div className="pt-4">
              <button
                type="button"
                onClick={() => onNotice('通用设置修改已保存成功！')}
                className="px-6 py-2 bg-[#10b981] hover:bg-[#059669] text-white rounded-md font-medium transition-colors"
              >
                保存
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // RENDER 3: Standard Product List View (Screenshot 3)
  return (
    <div className="p-6 max-w-[1600px] mx-auto text-xs space-y-6">
      {/* Filter Card (Screenshot 3) */}
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-4">
        <div className="flex items-center space-x-2.5 pb-2">
          <span className="w-1 h-4 bg-[#10b981] rounded-full"></span>
          <h1 className="text-sm font-semibold text-gray-800">{pageTitle}</h1>
        </div>

        {/* Row 1 Filter Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          {/* 状态 */}
          <div className="flex items-center space-x-2">
            <span className="text-gray-500 whitespace-nowrap w-10">状态</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="flex-1 px-3 py-1.5 border border-gray-200 rounded-md text-gray-700 bg-white focus:outline-none focus:border-[#10b981]"
            >
              <option value="">请选择</option>
              <option value="已上架">已上架</option>
              <option value="已下架">已下架</option>
            </select>
          </div>

          {/* 价格区间 */}
          <div className="flex items-center space-x-2 md:col-span-2">
            <span className="text-gray-500 whitespace-nowrap w-10">价格</span>
            <div className="flex items-center space-x-2 flex-1">
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                placeholder="最低价格"
                className="flex-1 px-2.5 py-1.5 border border-gray-200 rounded-md text-gray-700 focus:outline-none focus:border-[#10b981]"
              />
              <span className="text-gray-400">-</span>
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="最高价格"
                className="flex-1 px-2.5 py-1.5 border border-gray-200 rounded-md text-gray-700 focus:outline-none focus:border-[#10b981]"
              />
            </div>
          </div>
        </div>

        {/* Row 2 Filter Inputs */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-1">
          {/* 选择日期 */}
          <div className="flex items-center space-x-2 w-full md:w-auto min-w-[340px]">
            <span className="text-gray-500 whitespace-nowrap w-16">选择日期</span>
            <div className="flex items-center space-x-2 flex-1">
              <input
                type="date"
                min="2026-09-01"
                max="2026-09-19"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="flex-1 px-2.5 py-1.5 border border-gray-200 rounded-md text-gray-700 text-xs focus:outline-none focus:border-[#10b981]"
              />
              <span className="text-gray-400">~</span>
              <input
                type="date"
                min="2026-09-01"
                max="2026-09-19"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="flex-1 px-2.5 py-1.5 border border-gray-200 rounded-md text-gray-700 text-xs focus:outline-none focus:border-[#10b981]"
              />
            </div>
          </div>

          {/* Search Input & Action Buttons */}
          <div className="flex items-center space-x-3 w-full md:w-auto flex-1 max-w-md">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="请输入关键字"
              className="flex-1 px-3 py-1.5 border border-gray-200 rounded-md text-gray-700 focus:outline-none focus:border-[#10b981]"
            />
            <button
              onClick={() => onNotice(`已检索到 ${filteredProducts.length} 条符合条件的商品`)}
              className="p-2 bg-[#10b981] hover:bg-[#059669] text-white rounded-md transition-colors shrink-0"
            >
              <Search className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setStatusFilter(''); setMinPrice(''); setMaxPrice(''); setStartDate(''); setEndDate(''); setKeyword('');
                onNotice('已重置筛选条件');
              }}
              className="p-2 border border-gray-200 hover:bg-gray-50 text-gray-500 rounded-md transition-colors shrink-0"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Product Table Card (Screenshot 3) */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-hidden">
        {/* Top Actions */}
        <div className="p-4 flex items-center justify-end space-x-3 border-b border-gray-100">
          <button
            onClick={() => handleOpenProductForm()}
            className="px-4 py-1.5 bg-[#10b981] hover:bg-[#059669] text-white rounded-md font-medium transition-colors flex items-center space-x-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>新增</span>
          </button>
          <button
            onClick={() => {
              if (selectedIds.length === 0) onNotice('请先勾选需要批量操作的商品');
              else onNotice(`已对 ${selectedIds.length} 个勾选商品执行批量更新`);
            }}
            className="px-4 py-1.5 border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-md font-medium transition-colors"
          >
            批量操作
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-gray-600 bg-gray-50/50">
                <th className="py-3 px-4 font-medium">商品信息</th>
                <th className="py-3 px-4 font-medium">商品编码</th>
                <th className="py-3 px-4 font-medium">标签</th>
                <th className="py-3 px-4 font-medium">价格 (元)</th>
                <th className="py-3 px-4 font-medium">状态</th>
                <th className="py-3 px-4 font-medium">最后更新人</th>
                <th className="py-3 px-4 font-medium">最后更新时间</th>
                <th className="py-3 px-4 font-medium text-center">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProducts.map((prod) => (
                <tr key={prod.id} className="hover:bg-gray-50/60 transition-colors">
                  <td className="py-3.5 px-4 max-w-xs">
                    <div className="flex items-center space-x-3">
                      <img
                        src={prod.thumbnail}
                        alt=""
                        className="w-10 h-10 rounded-lg object-cover border border-gray-100 shrink-0"
                      />
                      <span className="font-medium text-gray-800 line-clamp-2">{prod.title}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-gray-600">{prod.code}</td>
                  <td className="py-3.5 px-4">
                    <div className="flex flex-col gap-1">
                      {prod.tags?.map((t, idx) => (
                        <span
                          key={idx}
                          className="inline-block px-1.5 py-0.5 bg-emerald-50 text-[#10b981] border border-emerald-100 rounded text-[10px] w-fit"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-medium text-gray-800">
                    {prod.price.toFixed(2)}
                  </td>
                  <td className="py-3.5 px-4">
                    {prod.status === '已上架' ? (
                      <span className="inline-flex items-center space-x-1 text-[#10b981]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]"></span>
                        <span>已上架</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center space-x-1 text-gray-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                        <span>已下架</span>
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-gray-700">{prod.lastUpdater}</td>
                  <td className="py-3.5 px-4 font-mono text-gray-500 whitespace-nowrap">
                    {prod.lastUpdateTime}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center justify-center space-x-2 text-xs">
                      <button
                        onClick={() => handleCopyProduct(prod)}
                        className="text-blue-600 hover:underline font-medium"
                      >
                        复制
                      </button>
                      <button
                        onClick={() => handleOpenProductForm(prod)}
                        className="text-blue-600 hover:underline font-medium"
                      >
                        编辑
                      </button>
                      <button
                        onClick={() => handleToggleProductStatus(prod)}
                        className="text-blue-600 hover:underline font-medium"
                      >
                        {prod.status === '已上架' ? '下架' : '上架'}
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(prod)}
                        className="text-red-500 hover:underline font-medium"
                      >
                        删除
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmation Modal */}
      {confirmModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-xl w-full max-w-sm overflow-hidden shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-150 p-6 space-y-4">
            <div className="flex items-center space-x-3 text-amber-500 font-semibold text-sm">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{confirmModal.title}</span>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">{confirmModal.message}</p>
            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                onClick={() => setConfirmModal((prev) => ({ ...prev, isOpen: false }))}
                className="px-4 py-1.5 border border-gray-200 hover:bg-gray-50 text-gray-600 rounded-md"
              >
                取消
              </button>
              <button
                onClick={confirmModal.onConfirm}
                className="px-4 py-1.5 bg-[#10b981] hover:bg-[#059669] text-white rounded-md font-medium"
              >
                确定
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
