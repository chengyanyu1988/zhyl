import React, { useState, useMemo } from 'react';
import {
  Search,
  RotateCcw,
  Calendar,
  Clock,
  Plus,
  Trash2,
  Edit3,
  X,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  UtensilsCrossed,
  Layers,
  ArrowUpDown,
  ArrowLeft,
} from 'lucide-react';
import { SubPageId, FoodItem, FoodCategoryItem } from '../../types';

interface FoodManagementProps {
  subPageId: SubPageId;
  onNotice: (msg: string) => void;
  onConfirmDelete: (title: string, message: string, onConfirm: () => void) => void;
}

// 预置近期2026年10月的食物数据，严格按更新时间降序排列
const INITIAL_FOOD_ITEMS: FoodItem[] = [
  {
    id: 'FOOD_001',
    name: '全麦面包',
    category: '主食',
    calories: 456,
    defaultPortion: 100,
    carbs: 48.6,
    protein: 12.5,
    fat: 3.2,
    publishType: 'immediate',
    remark: '富含全麦胚芽与膳食纤维，适宜控糖老人早间搭配脱脂奶',
    sharesCount: 100,
    favoritesCount: 35,
    status: '已发布',
    updater: '李明明',
    lastUpdateTime: '2026-10-21 10:09:09',
    tags: ['全谷物', '低GI', '高饱腹感'],
    suitableFor: ['老年人', '高血糖', '体质调理'],
  },
  {
    id: 'FOOD_002',
    name: '燕麦片',
    category: '主食',
    calories: 389,
    defaultPortion: 50,
    carbs: 61.2,
    protein: 15.0,
    fat: 6.7,
    publishType: 'immediate',
    remark: '可溶性膳食纤维含量高，胃溃疡急性发作期需充分煮软',
    sharesCount: 142,
    favoritesCount: 68,
    status: '已发布',
    updater: '李明明',
    lastUpdateTime: '2026-10-21 09:45:20',
    tags: ['β-葡聚糖', '可溶膳食纤维'],
    suitableFor: ['高血脂', '心血管健康', '通便防燥'],
  },
  {
    id: 'FOOD_003',
    name: '水煮西兰花',
    category: '蔬菜',
    calories: 34,
    defaultPortion: 150,
    carbs: 4.3,
    protein: 4.1,
    fat: 0.6,
    publishType: 'immediate',
    remark: '十字花科抗氧化佳品，烹调建议水开焯烫1-2分钟',
    sharesCount: 86,
    favoritesCount: 42,
    status: '已发布',
    updater: '王芳',
    lastUpdateTime: '2026-10-20 18:30:15',
    tags: ['萝卜硫素', '高维C', '抗氧化'],
    suitableFor: ['高血压', '慢病调理', '术后康复'],
  },
  {
    id: 'FOOD_004',
    name: '低脂纯牛奶',
    category: '乳制品',
    calories: 54,
    defaultPortion: 250,
    carbs: 4.8,
    protein: 3.4,
    fat: 1.5,
    publishType: 'immediate',
    remark: '每日补钙标配，乳糖不耐者建议加热后分次饮用',
    sharesCount: 95,
    favoritesCount: 53,
    status: '已发布',
    updater: '张伟',
    lastUpdateTime: '2026-10-20 16:15:00',
    tags: ['天然乳钙', '优质蛋白'],
    suitableFor: ['骨质疏松', '夜间补钙', '肌少症'],
  },
  {
    id: 'FOOD_005',
    name: '香煎鸡胸肉',
    category: '肉类',
    calories: 133,
    defaultPortion: 120,
    carbs: 0.8,
    protein: 24.6,
    fat: 2.1,
    publishType: 'immediate',
    remark: '去皮少油煎熟，高生物价蛋白质，肌少症食疗推荐',
    sharesCount: 210,
    favoritesCount: 118,
    status: '已发布',
    updater: '陈思',
    lastUpdateTime: '2026-10-20 14:05:40',
    tags: ['高蛋白', '低脂肪', '易吸收'],
    suitableFor: ['肌肉维持', '术后复健', '营养不良'],
  },
  {
    id: 'FOOD_006',
    name: '红富士苹果',
    category: '水果',
    calories: 52,
    defaultPortion: 200,
    carbs: 13.5,
    protein: 0.4,
    fat: 0.2,
    publishType: 'immediate',
    remark: '富含果胶及钾盐，牙齿不便老人可切小薄片或微波温热',
    sharesCount: 78,
    favoritesCount: 39,
    status: '已发布',
    updater: '赵磊',
    lastUpdateTime: '2026-10-20 11:20:19',
    tags: ['果胶', '钾元素', '有机酸'],
    suitableFor: ['平稳血压', '促进肠道蠕动'],
  },
  {
    id: 'FOOD_007',
    name: '水煮土鸡蛋',
    category: '蛋类',
    calories: 143,
    defaultPortion: 60,
    carbs: 1.5,
    protein: 13.3,
    fat: 8.8,
    publishType: 'immediate',
    remark: '卵磷脂补充极佳来源，蛋黄软嫩适口',
    sharesCount: 165,
    favoritesCount: 92,
    status: '已发布',
    updater: '李明明',
    lastUpdateTime: '2026-10-19 17:50:33',
    tags: ['卵磷脂', '全营养蛋白'],
    suitableFor: ['脑力维持', '体虚康复', '早餐推荐'],
  },
  {
    id: 'FOOD_008',
    name: '清炒菠菜',
    category: '蔬菜',
    calories: 23,
    defaultPortion: 200,
    carbs: 2.8,
    protein: 2.6,
    fat: 0.3,
    publishType: 'immediate',
    remark: '焯水后再炒以去除草酸，保护钙质与矿物质吸收',
    sharesCount: 54,
    favoritesCount: 28,
    status: '已发布',
    updater: '王芳',
    lastUpdateTime: '2026-10-19 15:35:10',
    tags: ['叶酸', '叶黄素', '高钾低钠'],
    suitableFor: ['视力保护', '心脑血管调理'],
  },
  {
    id: 'FOOD_009',
    name: '嫩豆腐',
    category: '豆制品',
    calories: 81,
    defaultPortion: 150,
    carbs: 3.8,
    protein: 8.1,
    fat: 3.7,
    publishType: 'immediate',
    remark: '细软多汁，适合咀嚼消化功能弱的长辈作为植物蛋白质来源',
    sharesCount: 88,
    favoritesCount: 46,
    status: '已发布',
    updater: '张伟',
    lastUpdateTime: '2026-10-19 10:18:45',
    tags: ['大豆异黄酮', '优质植物蛋白', '细软易嚼'],
    suitableFor: ['牙口不佳', '三高老人', '日常代肉'],
  },
  {
    id: 'FOOD_010',
    name: '五谷糙米饭',
    category: '主食',
    calories: 116,
    defaultPortion: 150,
    carbs: 25.5,
    protein: 2.7,
    fat: 0.9,
    publishType: 'immediate',
    remark: '建议糙米与白米按1:2比例浸泡后蒸煮，软烂易消化',
    sharesCount: 112,
    favoritesCount: 75,
    status: '已发布',
    updater: '李明明',
    lastUpdateTime: '2026-10-18 16:42:20',
    tags: ['B族维生素', '未精制谷物'],
    suitableFor: ['慢性胃肠虚弱减量食用', '慢病控糖'],
  },
  {
    id: 'FOOD_011',
    name: '清蒸鲈鱼',
    category: '水产',
    calories: 105,
    defaultPortion: 150,
    carbs: 0.0,
    protein: 18.6,
    fat: 3.4,
    publishType: 'immediate',
    remark: '鱼肉细腻少刺，清蒸保留丰富DHA脑黄金',
    sharesCount: 134,
    favoritesCount: 82,
    status: '已发布',
    updater: '陈思',
    lastUpdateTime: '2026-10-18 14:10:05',
    tags: ['DHA', 'EPA', '清淡少刺'],
    suitableFor: ['血管弹性维持', '脑力衰退预防'],
  },
  {
    id: 'FOOD_012',
    name: '彩椒炒牛肉',
    category: '肉类',
    calories: 128,
    defaultPortion: 120,
    carbs: 2.1,
    protein: 20.2,
    fat: 4.5,
    publishType: 'immediate',
    remark: '维C与血红素铁互促吸收，强健气血',
    sharesCount: 156,
    favoritesCount: 94,
    status: '已发布',
    updater: '赵磊',
    lastUpdateTime: '2026-10-18 09:25:30',
    tags: ['血红素铁', '肌酸', '高维C护铁吸收'],
    suitableFor: ['缺铁性贫血', '体乏无力'],
  },
  {
    id: 'FOOD_013',
    name: '生核桃仁',
    category: '坚果',
    calories: 654,
    defaultPortion: 20,
    carbs: 13.7,
    protein: 15.2,
    fat: 65.2,
    publishType: 'immediate',
    remark: '每日一小把（约2-3个），不饱和脂肪酸保护脑微血管',
    sharesCount: 92,
    favoritesCount: 58,
    status: '已发布',
    updater: '李明明',
    lastUpdateTime: '2026-10-17 17:15:18',
    tags: ['亚麻酸', '不饱和脂肪酸', '维生素E'],
    suitableFor: ['每日定量', '记忆力减退'],
  },
  {
    id: 'FOOD_014',
    name: '紫菜虾皮蛋花汤',
    category: '汤品',
    calories: 38,
    defaultPortion: 250,
    carbs: 2.1,
    protein: 4.8,
    fat: 1.2,
    publishType: 'immediate',
    remark: '清淡提鲜，温胃暖胃，注意控制钠盐添加',
    sharesCount: 45,
    favoritesCount: 22,
    status: '已发布',
    updater: '王芳',
    lastUpdateTime: '2026-10-17 11:40:50',
    tags: ['碘元素', '清爽开胃', '易消化'],
    suitableFor: ['餐前温胃', '缺碘体质'],
  },
];

const INITIAL_CATEGORIES: FoodCategoryItem[] = [
  {
    id: 'CAT_001',
    sortOrder: 8,
    name: '主食',
    code: 'STAPLE',
    foodCount: 100,
    updater: '李明明',
    lastUpdateTime: '2026-10-21 10:09:09',
    status: '启用',
    description: '五谷杂粮与复合全谷物，富含膳食纤维与B族维生素，平稳餐后升糖',
  },
  {
    id: 'CAT_002',
    sortOrder: 7,
    name: '肉蛋',
    code: 'MEAT_EGG',
    foodCount: 100,
    updater: '李明明',
    lastUpdateTime: '2026-10-21 09:45:12',
    status: '启用',
    description: '精瘦肉、禽肉及禽蛋，卵磷脂与血红素铁丰富，维持肌肉量与抗病力',
  },
  {
    id: 'CAT_003',
    sortOrder: 6,
    name: '蔬菜',
    code: 'VEGETABLES',
    foodCount: 100,
    updater: '李明明',
    lastUpdateTime: '2026-10-20 18:30:15',
    status: '启用',
    description: '深色绿叶菜、十字花科与瓜茄类，高钾低钠，补充植物多酚与叶酸',
  },
  {
    id: 'CAT_004',
    sortOrder: 5,
    name: '乳制品',
    code: 'DAIRY',
    foodCount: 100,
    updater: '李明明',
    lastUpdateTime: '2026-10-20 16:15:00',
    status: '启用',
    description: '低脂高钙牛奶与发酵酸奶，骨骼与肌肉健康支持，防骨质疏松',
  },
  {
    id: 'CAT_005',
    sortOrder: 4,
    name: '水果',
    code: 'FRUIT',
    foodCount: 100,
    updater: '李明明',
    lastUpdateTime: '2026-10-20 14:05:40',
    status: '启用',
    description: '低糖高钾多酚水果，促进肠道蠕动与温和抗氧化',
  },
  {
    id: 'CAT_006',
    sortOrder: 3,
    name: '油脂',
    code: 'OILS',
    foodCount: 100,
    updater: '李明明',
    lastUpdateTime: '2026-10-20 11:20:19',
    status: '启用',
    description: '橄榄油、山茶油与紫苏籽油，富含单不饱和与多不饱和脂肪酸',
  },
  {
    id: 'CAT_007',
    sortOrder: 2,
    name: '豆制品',
    code: 'SOY_PRODUCTS',
    foodCount: 100,
    updater: '李明明',
    lastUpdateTime: '2026-10-19 17:50:33',
    status: '启用',
    description: '大豆深加工食品，细软好吸收的植物高蛋白，补充大豆异黄酮',
  },
  {
    id: 'CAT_008',
    sortOrder: 1,
    name: '零食',
    code: 'SNACKS',
    foodCount: 100,
    updater: '李明明',
    lastUpdateTime: '2026-10-19 10:18:45',
    status: '启用',
    description: '健康适老代餐糕点与低糖烘焙小点，满足加餐能量补给',
  },
  {
    id: 'CAT_009',
    sortOrder: 9,
    name: '坚果',
    code: 'NUTS',
    foodCount: 100,
    updater: '李明明',
    lastUpdateTime: '2026-10-18 16:42:20',
    status: '启用',
    description: '天然烘焙坚果籽类，原味无盐添加，保护脑神经微血管',
  },
  {
    id: 'CAT_010',
    sortOrder: 10,
    name: '水产海鲜',
    code: 'SEAFOOD',
    foodCount: 100,
    updater: '李明明',
    lastUpdateTime: '2026-10-18 14:10:05',
    status: '启用',
    description: '深海少刺鱼类与清淡贝类，富含Omega-3健康脂肪酸',
  },
  {
    id: 'CAT_011',
    sortOrder: 11,
    name: '菌藻类',
    code: 'FUNGI_ALGAE',
    foodCount: 100,
    updater: '李明明',
    lastUpdateTime: '2026-10-17 17:15:18',
    status: '启用',
    description: '黑木耳、香菇与海带，菌菇多糖强健免疫，滋养脾胃',
  },
  {
    id: 'CAT_012',
    sortOrder: 12,
    name: '汤品饮品',
    code: 'SOUP_DRINK',
    foodCount: 100,
    updater: '李明明',
    lastUpdateTime: '2026-10-17 11:40:50',
    status: '启用',
    description: '低盐清淡营养汤饮与滋补药膳水，润燥温中',
  },
  {
    id: 'CAT_013',
    sortOrder: 13,
    name: '调味品',
    code: 'CONDIMENTS',
    foodCount: 100,
    updater: '李明明',
    lastUpdateTime: '2026-10-16 15:20:00',
    status: '启用',
    description: '减盐生抽、香醋与天然辛香料，提升长辈食欲减少钠摄入',
  },
  {
    id: 'CAT_014',
    sortOrder: 14,
    name: '药膳滋补',
    code: 'MEDICINAL_DIET',
    foodCount: 100,
    updater: '李明明',
    lastUpdateTime: '2026-10-15 09:30:00',
    status: '启用',
    description: '黄芪、枸杞、百合药食同源配膳，四季调理气血安神',
  },
];

export const FoodManagement: React.FC<FoodManagementProps> = ({
  subPageId,
  onNotice,
  onConfirmDelete,
}) => {
  // Current tab: either 'food_list' (食物列表) or 'category' (分类管理)
  const [activeTab, setActiveTab] = useState<'food_list' | 'category'>(
    subPageId === 'ops_food_cats' ? 'category' : 'food_list'
  );

  // Subview for food list: 'list' (表格) or 'form' (截图中的新增/编辑页面)
  const [viewMode, setViewMode] = useState<'list' | 'form'>('list');

  // Synchronize when subPageId prop changes from sidebar navigation
  React.useEffect(() => {
    if (subPageId === 'ops_food_cats') {
      setActiveTab('category');
      setViewMode('list');
    } else {
      setActiveTab('food_list');
    }
  }, [subPageId]);

  // Food items list state
  const [foodItems, setFoodItems] = useState<FoodItem[]>(INITIAL_FOOD_ITEMS);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Search & Filter state (matching user screenshot)
  const [statusFilter, setStatusFilter] = useState<string>('请选择');
  const [categoryFilter, setCategoryFilter] = useState<string>('请选择');
  const [dateStart, setDateStart] = useState<string>('');
  const [dateEnd, setDateEnd] = useState<string>('');
  const [keyword, setKeyword] = useState<string>('');

  // Pagination state: default 10 per page as requested by user
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [jumpPageInput, setJumpPageInput] = useState<string>('');

  // Form state for 新增/编辑页面 (matching image_706699b6.png)
  const [isAddMode, setIsAddMode] = useState(true);
  const [formFoodName, setFormFoodName] = useState('');
  const [formCategory, setFormCategory] = useState('请选择');
  const [formCalories, setFormCalories] = useState<string>('');
  const [formDefaultPortion, setFormDefaultPortion] = useState<string>('');
  const [formCarbs, setFormCarbs] = useState<string>('');
  const [formProtein, setFormProtein] = useState<string>('');
  const [formFat, setFormFat] = useState<string>('');
  const [formPublishType, setFormPublishType] = useState<'immediate' | 'scheduled'>('immediate');
  const [formScheduledDate, setFormScheduledDate] = useState('');
  const [formScheduledTime, setFormScheduledTime] = useState('12 : 00');
  const [formRemark, setFormRemark] = useState('');
  const [editingItemId, setEditingItemId] = useState<string | null>(null);

  // Category items state
  const [categories, setCategories] = useState<FoodCategoryItem[]>(INITIAL_CATEGORIES);
  const [isCatModalOpen, setIsCatModalOpen] = useState(false);
  const [editingCat, setEditingCat] = useState<Partial<FoodCategoryItem> | null>(null);

  // Category search, pagination & batch state (matching image_ad5be337.png)
  const [catKeyword, setCatKeyword] = useState<string>('');
  const [catCurrentPage, setCatCurrentPage] = useState<number>(1);
  const [catPageSize, setCatPageSize] = useState<number>(10); // Default 10 items per page as requested
  const [catJumpPageInput, setCatJumpPageInput] = useState<string>('');
  const [selectedCatIds, setSelectedCatIds] = useState<string[]>([]);
  const [isCatBatchMode, setIsCatBatchMode] = useState<boolean>(false);
  const [isCatBatchModalOpen, setIsCatBatchModalOpen] = useState<boolean>(false);

  // Categories filtered & strictly sorted in descending order of lastUpdateTime
  const filteredCategories = useMemo(() => {
    let result = [...categories];

    if (catKeyword.trim()) {
      const kw = catKeyword.trim().toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(kw) ||
          c.updater.toLowerCase().includes(kw) ||
          (c.description && c.description.toLowerCase().includes(kw))
      );
    }

    // Strictly sort descending by lastUpdateTime
    result.sort(
      (a, b) => new Date(b.lastUpdateTime).getTime() - new Date(a.lastUpdateTime).getTime()
    );

    return result;
  }, [categories, catKeyword]);

  const catTotalItems = filteredCategories.length;
  const catTotalPages = Math.max(1, Math.ceil(catTotalItems / catPageSize));

  const paginatedCategories = useMemo(() => {
    const startIndex = (catCurrentPage - 1) * catPageSize;
    return filteredCategories.slice(startIndex, startIndex + catPageSize);
  }, [filteredCategories, catCurrentPage, catPageSize]);

  // Reset category page when keyword changes
  React.useEffect(() => {
    setCatCurrentPage(1);
    setSelectedCatIds([]);
  }, [catKeyword, catPageSize]);

  // Category status toggle
  const handleToggleCategoryStatus = (catId: string) => {
    setCategories((prev) =>
      prev.map((c) => {
        if (c.id === catId) {
          const nextStatus = c.status === '启用' ? '禁用' : '启用';
          onNotice(`已${nextStatus}分类「${c.name}」`);
          return { ...c, status: nextStatus };
        }
        return c;
      })
    );
  };

  // Delete category
  const handleDeleteCategory = (cat: FoodCategoryItem) => {
    onConfirmDelete(
      '确认删除分类',
      `确定要删除分类「${cat.name}」吗？此操作无法撤销。`,
      () => {
        setCategories((prev) => prev.filter((c) => c.id !== cat.id));
        setSelectedCatIds((prev) => prev.filter((id) => id !== cat.id));
        onNotice(`已删除分类：${cat.name}`);
      }
    );
  };

  // Jump to Food List filtered by category when clicking food count
  const handleCategoryFoodCountClick = (categoryName: string) => {
    setActiveTab('food_list');
    setViewMode('list');
    setCategoryFilter(categoryName);
    onNotice(`已定位至「${categoryName}」分类下的食物列表`);
  };

  // Category select handlers
  const handleToggleSelectCat = (catId: string) => {
    setSelectedCatIds((prev) =>
      prev.includes(catId) ? prev.filter((id) => id !== catId) : [...prev, catId]
    );
  };

  const handleToggleSelectAllCats = () => {
    const pageIds = paginatedCategories.map((c) => c.id);
    const allSelected = pageIds.length > 0 && pageIds.every((id) => selectedCatIds.includes(id));
    if (allSelected) {
      setSelectedCatIds((prev) => prev.filter((id) => !pageIds.includes(id)));
    } else {
      setSelectedCatIds((prev) => Array.from(new Set([...prev, ...pageIds])));
    }
  };

  // Category page jump handler
  const handleCatJumpPage = (e: React.FormEvent) => {
    e.preventDefault();
    const page = parseInt(catJumpPageInput, 10);
    if (!isNaN(page) && page >= 1 && page <= catTotalPages) {
      setCatCurrentPage(page);
      setCatJumpPageInput('');
    } else {
      onNotice(`请输入 1 至 ${catTotalPages} 之间的有效页码`);
    }
  };

  // Filtered & sorted data: strictly descending order by lastUpdateTime
  const filteredFoodItems = useMemo(() => {
    let result = [...foodItems];

    if (statusFilter && statusFilter !== '请选择' && statusFilter !== '全部') {
      result = result.filter((item) => item.status === statusFilter);
    }

    if (categoryFilter && categoryFilter !== '请选择' && categoryFilter !== '全部') {
      result = result.filter((item) => item.category === categoryFilter);
    }

    if (keyword.trim()) {
      const kw = keyword.trim().toLowerCase();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(kw) ||
          item.updater.toLowerCase().includes(kw) ||
          item.category.toLowerCase().includes(kw)
      );
    }

    if (dateStart) {
      result = result.filter((item) => item.lastUpdateTime >= dateStart);
    }
    if (dateEnd) {
      result = result.filter((item) => item.lastUpdateTime <= dateEnd + ' 23:59:59');
    }

    // Sort strictly by lastUpdateTime in DESCENDING order
    result.sort((a, b) => {
      return new Date(b.lastUpdateTime).getTime() - new Date(a.lastUpdateTime).getTime();
    });

    return result;
  }, [foodItems, statusFilter, categoryFilter, keyword, dateStart, dateEnd]);

  // Paginated items
  const totalItems = filteredFoodItems.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  // Current slice
  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredFoodItems.slice(startIndex, startIndex + pageSize);
  }, [filteredFoodItems, currentPage, pageSize]);

  // Reset page when filter changes
  React.useEffect(() => {
    setCurrentPage(1);
    setSelectedIds([]);
  }, [statusFilter, categoryFilter, keyword, dateStart, dateEnd, pageSize]);

  // Checkbox handlers
  const isAllCurrentSelected =
    paginatedItems.length > 0 &&
    paginatedItems.every((item) => selectedIds.includes(item.id));

  const handleToggleSelectAll = () => {
    if (isAllCurrentSelected) {
      const currentIds = paginatedItems.map((item) => item.id);
      setSelectedIds((prev) => prev.filter((id) => !currentIds.includes(id)));
    } else {
      const currentIds = paginatedItems.map((item) => item.id);
      setSelectedIds((prev) => Array.from(new Set([...prev, ...currentIds])));
    }
  };

  const handleToggleSelectItem = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Reset filter form
  const handleResetFilters = () => {
    setStatusFilter('请选择');
    setCategoryFilter('请选择');
    setDateStart('');
    setDateEnd('');
    setKeyword('');
    setCurrentPage(1);
    onNotice('筛选条件已重置');
  };

  // Delete item handler
  const handleDeleteItem = (item: FoodItem) => {
    onConfirmDelete(
      '确认删除食物',
      `确定要删除食物「${item.name}」吗？此操作无法撤销。`,
      () => {
        setFoodItems((prev) => prev.filter((f) => f.id !== item.id));
        setSelectedIds((prev) => prev.filter((id) => id !== item.id));
        onNotice(`已删除食物：${item.name}`);
      }
    );
  };

  // Batch operations
  const handleBatchOperation = () => {
    if (selectedIds.length === 0) {
      onNotice('请先勾选需要操作的食物条目');
      return;
    }
    onConfirmDelete(
      '批量删除确认',
      `确定要批量删除已选中的 ${selectedIds.length} 项食物记录吗？`,
      () => {
        setFoodItems((prev) => prev.filter((f) => !selectedIds.includes(f.id)));
        setSelectedIds([]);
        onNotice(`已成功批量删除 ${selectedIds.length} 项数据`);
      }
    );
  };

  // Open "新增" form page
  const handleOpenAddForm = () => {
    setIsAddMode(true);
    setEditingItemId(null);
    setFormFoodName('');
    setFormCategory('请选择');
    setFormCalories('');
    setFormDefaultPortion('');
    setFormCarbs('');
    setFormProtein('');
    setFormFat('');
    setFormPublishType('immediate');
    setFormScheduledDate('');
    setFormScheduledTime('12 : 00');
    setFormRemark('');
    setViewMode('form');
  };

  // Open "编辑" form page
  const handleOpenEditForm = (item: FoodItem) => {
    setIsAddMode(false);
    setEditingItemId(item.id);
    setFormFoodName(item.name || '');
    setFormCategory(item.category || '请选择');
    setFormCalories(item.calories !== undefined ? String(item.calories) : '');
    setFormDefaultPortion(item.defaultPortion !== undefined ? String(item.defaultPortion) : '100');
    setFormCarbs(item.carbs !== undefined ? String(item.carbs) : '');
    setFormProtein(item.protein !== undefined ? String(item.protein) : '');
    setFormFat(item.fat !== undefined ? String(item.fat) : '');
    setFormPublishType(item.publishType || 'immediate');
    setFormScheduledDate(item.scheduledDate || '');
    setFormScheduledTime(item.scheduledTime || '12 : 00');
    setFormRemark(item.remark || '');
    setViewMode('form');
  };

  // Save form handler (for screenshot form)
  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formFoodName.trim()) {
      onNotice('请输入食物名称');
      return;
    }
    if (!formCategory || formCategory === '请选择') {
      onNotice('请选择食物分类');
      return;
    }
    if (!formCalories.trim()) {
      onNotice('请输入热量数值');
      return;
    }
    if (!formDefaultPortion.trim()) {
      onNotice('请输入默认份量');
      return;
    }

    const now = new Date();
    const formattedNow = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
      2,
      '0'
    )}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(
      2,
      '0'
    )}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

    if (isAddMode) {
      const newItem: FoodItem = {
        id: `FOOD_${Date.now()}`,
        name: formFoodName.trim(),
        category: formCategory,
        calories: Number(formCalories) || 0,
        defaultPortion: Number(formDefaultPortion) || 100,
        carbs: formCarbs ? Number(formCarbs) : 0,
        protein: formProtein ? Number(formProtein) : 0,
        fat: formFat ? Number(formFat) : 0,
        publishType: formPublishType,
        scheduledDate: formScheduledDate,
        scheduledTime: formScheduledTime,
        remark: formRemark.trim(),
        sharesCount: 0,
        favoritesCount: 0,
        status: formPublishType === 'immediate' ? '已发布' : '未发布',
        updater: '李明明',
        lastUpdateTime: formattedNow,
        tags: ['健康推荐'],
        suitableFor: ['老年人'],
      };
      setFoodItems((prev) => [newItem, ...prev]);
      onNotice(`已成功新增食物「${newItem.name}」`);
    } else if (editingItemId) {
      setFoodItems((prev) =>
        prev.map((item) =>
          item.id === editingItemId
            ? {
                ...item,
                name: formFoodName.trim(),
                category: formCategory,
                calories: Number(formCalories) || 0,
                defaultPortion: Number(formDefaultPortion) || 100,
                carbs: formCarbs ? Number(formCarbs) : 0,
                protein: formProtein ? Number(formProtein) : 0,
                fat: formFat ? Number(formFat) : 0,
                publishType: formPublishType,
                scheduledDate: formScheduledDate,
                scheduledTime: formScheduledTime,
                remark: formRemark.trim(),
                lastUpdateTime: formattedNow,
              }
            : item
        )
      );
      onNotice(`已保存食物「${formFoodName.trim()}」的修改`);
    }

    // Switch back to list view
    setViewMode('list');
  };

  // Page jump handler
  const handleJumpPage = (e: React.FormEvent) => {
    e.preventDefault();
    const pageNum = parseInt(jumpPageInput, 10);
    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
      setJumpPageInput('');
    } else {
      onNotice(`请输入 1 至 ${totalPages} 之间的有效页码`);
    }
  };

  return (
    <div className="space-y-4">
      {/* 顶部Tab切换（兼顾食物列表与分类管理） */}
      <div className="flex items-center justify-between border-b border-gray-200/80 pb-2">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              setActiveTab('food_list');
              setViewMode('list');
            }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-2 ${
              activeTab === 'food_list'
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/60'
            }`}
          >
            <UtensilsCrossed className="w-4 h-4" />
            <span>食物列表</span>
            <span className="px-1.5 py-0.5 text-xs rounded-full bg-emerald-100 text-emerald-800 font-semibold">
              {foodItems.length}
            </span>
          </button>

          <button
            onClick={() => {
              setActiveTab('category');
              setViewMode('list');
            }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-2 ${
              activeTab === 'category'
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/60'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>分类管理</span>
            <span className="px-1.5 py-0.5 text-xs rounded-full bg-gray-100 text-gray-700">
              {categories.length}
            </span>
          </button>
        </div>

        {viewMode === 'form' && (
          <button
            onClick={() => setViewMode('list')}
            className="text-xs text-gray-500 hover:text-gray-800 flex items-center space-x-1 px-2.5 py-1 rounded border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>返回食物列表</span>
          </button>
        )}
      </div>

      {activeTab === 'food_list' ? (
        viewMode === 'form' ? (
          /* =======================================================
             新增 / 编辑食物信息页面（严格根据 image_706699b6.png 截图生成）
             ======================================================= */
          <div className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] p-6 min-h-[640px]">
            {/* 页面标题：绿色竖线 + 新增食物信息 */}
            <div className="flex items-center space-x-2 mb-8">
              <div className="w-1.5 h-4.5 bg-[#10b981] rounded-full"></div>
              <h2 className="text-gray-800 font-semibold text-base">
                {isAddMode ? '新增食物信息' : '编辑食物信息'}
              </h2>
            </div>

            {/* 表单主体 */}
            <form onSubmit={handleSaveForm} className="space-y-6">
              {/* 1. 食物名称* */}
              <div className="flex items-center space-x-4">
                <label className="w-24 text-right text-sm text-gray-600 shrink-0">
                  食物名称<span className="text-red-500 ml-0.5">*</span>
                </label>
                <input
                  type="text"
                  value={formFoodName}
                  onChange={(e) => setFormFoodName(e.target.value)}
                  placeholder="请输入"
                  className="w-64 px-3 py-2 text-sm border border-gray-200 rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#10b981] transition-colors"
                />
              </div>

              {/* 2. 分类* */}
              <div className="flex items-center space-x-4">
                <label className="w-24 text-right text-sm text-gray-600 shrink-0">
                  分类<span className="text-red-500 ml-0.5">*</span>
                </label>
                <div className="relative w-64">
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-md text-gray-700 focus:outline-none focus:border-[#10b981] transition-colors appearance-none cursor-pointer pr-8"
                  >
                    <option value="请选择">请选择</option>
                    <option value="主食">主食</option>
                    <option value="蔬菜">蔬菜</option>
                    <option value="乳制品">乳制品</option>
                    <option value="肉类">肉类</option>
                    <option value="水果">水果</option>
                    <option value="蛋类">蛋类</option>
                    <option value="豆制品">豆制品</option>
                    <option value="水产">水产</option>
                    <option value="坚果">坚果</option>
                    <option value="汤品">汤品</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-gray-400">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* 3. 热量* */}
              <div className="flex items-center space-x-4">
                <label className="w-24 text-right text-sm text-gray-600 shrink-0">
                  热量<span className="text-red-500 ml-0.5">*</span>
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    step="any"
                    value={formCalories}
                    onChange={(e) => setFormCalories(e.target.value)}
                    placeholder=""
                    className="w-64 px-3 py-2 text-sm border border-gray-200 rounded-md text-gray-700 focus:outline-none focus:border-[#10b981] transition-colors"
                  />
                  <span className="text-sm text-gray-500 select-none">千卡/100克</span>
                </div>
              </div>

              {/* 4. 默认份量* */}
              <div className="flex items-center space-x-4">
                <label className="w-24 text-right text-sm text-gray-600 shrink-0">
                  默认份量<span className="text-red-500 ml-0.5">*</span>
                </label>
                <div className="flex w-64 border border-gray-200 rounded-md overflow-hidden focus-within:border-[#10b981] transition-colors">
                  <input
                    type="number"
                    step="any"
                    value={formDefaultPortion}
                    onChange={(e) => setFormDefaultPortion(e.target.value)}
                    placeholder=""
                    className="w-full px-3 py-2 text-sm text-gray-700 focus:outline-none"
                  />
                  <div className="bg-[#f9fafb] border-l border-gray-200 px-3.5 py-2 text-sm text-gray-500 shrink-0 flex items-center justify-center select-none">
                    克
                  </div>
                </div>
              </div>

              {/* 5. 碳水、蛋白质、脂肪（三列并排） */}
              <div className="flex flex-wrap items-center gap-y-3">
                {/* 碳水 */}
                <div className="flex items-center space-x-4">
                  <label className="w-24 text-right text-sm text-gray-600 shrink-0">碳水</label>
                  <div className="flex w-52 border border-gray-200 rounded-md overflow-hidden focus-within:border-[#10b981] transition-colors">
                    <input
                      type="number"
                      step="any"
                      value={formCarbs}
                      onChange={(e) => setFormCarbs(e.target.value)}
                      placeholder=""
                      className="w-full px-3 py-2 text-sm text-gray-700 focus:outline-none"
                    />
                    <div className="bg-[#f9fafb] border-l border-gray-200 px-3 py-2 text-sm text-gray-500 shrink-0 flex items-center justify-center select-none">
                      克
                    </div>
                  </div>
                </div>

                {/* 蛋白质 */}
                <div className="flex items-center space-x-3 ml-0 sm:ml-4">
                  <label className="text-sm text-gray-600 shrink-0">蛋白质</label>
                  <div className="flex w-52 border border-gray-200 rounded-md overflow-hidden focus-within:border-[#10b981] transition-colors">
                    <input
                      type="number"
                      step="any"
                      value={formProtein}
                      onChange={(e) => setFormProtein(e.target.value)}
                      placeholder=""
                      className="w-full px-3 py-2 text-sm text-gray-700 focus:outline-none"
                    />
                    <div className="bg-[#f9fafb] border-l border-gray-200 px-3 py-2 text-sm text-gray-500 shrink-0 flex items-center justify-center select-none">
                      克
                    </div>
                  </div>
                </div>

                {/* 脂肪 */}
                <div className="flex items-center space-x-3 ml-0 sm:ml-4">
                  <label className="text-sm text-gray-600 shrink-0">脂肪</label>
                  <div className="flex w-52 border border-gray-200 rounded-md overflow-hidden focus-within:border-[#10b981] transition-colors">
                    <input
                      type="number"
                      step="any"
                      value={formFat}
                      onChange={(e) => setFormFat(e.target.value)}
                      placeholder=""
                      className="w-full px-3 py-2 text-sm text-gray-700 focus:outline-none"
                    />
                    <div className="bg-[#f9fafb] border-l border-gray-200 px-3 py-2 text-sm text-gray-500 shrink-0 flex items-center justify-center select-none">
                      克
                    </div>
                  </div>
                </div>
              </div>

              {/* 6. 发布时间 */}
              <div className="flex items-start space-x-4 pt-1">
                <label className="w-24 text-right text-sm text-gray-600 shrink-0 pt-1">
                  发布时间
                </label>
                <div className="space-y-3">
                  {/* 单选1：立即发布 */}
                  <label className="flex items-center space-x-2 cursor-pointer select-none">
                    <input
                      type="radio"
                      name="publishTimeType"
                      checked={formPublishType === 'immediate'}
                      onChange={() => setFormPublishType('immediate')}
                      className="w-4 h-4 text-[#10b981] focus:ring-[#10b981] accent-[#10b981] cursor-pointer"
                    />
                    <span className="text-sm text-gray-700">立即发布</span>
                  </label>

                  {/* 单选2：定时发布 */}
                  <div className="flex flex-wrap items-center gap-3">
                    <label className="flex items-center space-x-2 cursor-pointer select-none shrink-0">
                      <input
                        type="radio"
                        name="publishTimeType"
                        checked={formPublishType === 'scheduled'}
                        onChange={() => setFormPublishType('scheduled')}
                        className="w-4 h-4 text-[#10b981] focus:ring-[#10b981] accent-[#10b981] cursor-pointer"
                      />
                      <span className="text-sm text-gray-700">定时发布</span>
                    </label>

                    {/* 选择日期控件 */}
                    <div className="flex items-center border border-gray-200 rounded-md bg-white px-3 py-1.5 text-sm text-gray-700 focus-within:border-[#10b981] w-48">
                      <input
                        type="date"
                        value={formScheduledDate}
                        onChange={(e) => {
                          setFormScheduledDate(e.target.value);
                          setFormPublishType('scheduled');
                        }}
                        className="w-full bg-transparent text-gray-700 text-xs focus:outline-none"
                      />
                      <Calendar className="w-4 h-4 text-gray-400 ml-1 shrink-0" />
                    </div>

                    {/* 选择时间控件 */}
                    <div className="flex items-center border border-gray-200 rounded-md bg-white px-3 py-1.5 text-sm text-gray-700 focus-within:border-[#10b981] w-40">
                      <input
                        type="text"
                        value={formScheduledTime}
                        onChange={(e) => {
                          setFormScheduledTime(e.target.value);
                          setFormPublishType('scheduled');
                        }}
                        placeholder="12 : 00"
                        className="w-full bg-transparent text-gray-700 text-xs focus:outline-none text-center"
                      />
                      <Clock className="w-4 h-4 text-gray-400 ml-1 shrink-0" />
                    </div>
                  </div>
                </div>
              </div>

              {/* 7. 备注 */}
              <div className="flex items-start space-x-4 pt-1">
                <label className="w-24 text-right text-sm text-gray-600 shrink-0 pt-2">备注</label>
                <div className="w-[580px] max-w-full">
                  <textarea
                    rows={4}
                    value={formRemark}
                    onChange={(e) => setFormRemark(e.target.value)}
                    placeholder="请输入"
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#10b981] transition-colors resize-none"
                  />
                </div>
              </div>

              {/* 8. 底部操作按钮：保存、返回 */}
              <div className="flex items-center space-x-3 pt-6 pl-28">
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#10b981] hover:bg-[#059669] text-white rounded-md text-sm font-medium transition-colors shadow-sm cursor-pointer"
                >
                  保存
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className="px-6 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-md text-sm font-medium transition-colors cursor-pointer"
                >
                  返回
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* =======================================================
             食物列表表格主视图（根据前一截图制作，支持10条/页与降序）
             ======================================================= */
          <>
            {/* 上半部分：检索卡片 */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] p-5">
              {/* 标题 */}
              <div className="flex items-center space-x-2 mb-5">
                <div className="w-1.5 h-4.5 bg-[#10b981] rounded-full"></div>
                <h2 className="text-gray-800 font-semibold text-base">食物列表</h2>
              </div>

              {/* 表单检索控件区 */}
              <div className="space-y-4">
                {/* 第一行：状态、分类 */}
                <div className="flex flex-wrap items-center gap-6">
                  {/* 状态 */}
                  <div className="flex items-center space-x-3">
                    <label className="text-sm text-gray-600 shrink-0">状态</label>
                    <div className="relative">
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="w-44 px-3 py-1.5 text-sm bg-white border border-gray-200 rounded-md text-gray-700 focus:outline-none focus:border-[#10b981] transition-colors appearance-none cursor-pointer pr-8"
                      >
                        <option value="请选择">请选择</option>
                        <option value="全部">全部状态</option>
                        <option value="已发布">已发布</option>
                        <option value="未发布">未发布</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* 分类 */}
                  <div className="flex items-center space-x-3">
                    <label className="text-sm text-gray-600 shrink-0">分类</label>
                    <div className="relative">
                      <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="w-44 px-3 py-1.5 text-sm bg-white border border-gray-200 rounded-md text-gray-700 focus:outline-none focus:border-[#10b981] transition-colors appearance-none cursor-pointer pr-8"
                      >
                        <option value="请选择">请选择</option>
                        <option value="全部">全部分类</option>
                        <option value="主食">主食</option>
                        <option value="蔬菜">蔬菜</option>
                        <option value="乳制品">乳制品</option>
                        <option value="肉类">肉类</option>
                        <option value="水果">水果</option>
                        <option value="蛋类">蛋类</option>
                        <option value="豆制品">豆制品</option>
                        <option value="水产">水产</option>
                        <option value="坚果">坚果</option>
                        <option value="汤品">汤品</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 第二行：更新日期、关键字、查询与重置按钮 */}
                <div className="flex flex-wrap items-center gap-4">
                  {/* 更新日期 */}
                  <div className="flex items-center space-x-2">
                    <label className="text-sm text-gray-600 shrink-0">更新日期</label>
                    <div className="flex items-center border border-gray-200 rounded-md bg-white px-2.5 py-1 text-sm text-gray-700 focus-within:border-[#10b981]">
                      <input
                        type="date"
                        value={dateStart}
                        onChange={(e) => setDateStart(e.target.value)}
                        className="w-32 bg-transparent text-gray-700 text-xs focus:outline-none"
                      />
                      <span className="text-gray-400 mx-1.5">~</span>
                      <input
                        type="date"
                        value={dateEnd}
                        onChange={(e) => setDateEnd(e.target.value)}
                        className="w-32 bg-transparent text-gray-700 text-xs focus:outline-none"
                      />
                      <Calendar className="w-4 h-4 text-gray-400 ml-1.5 shrink-0" />
                    </div>
                  </div>

                  {/* 关键字搜索输入框 */}
                  <div className="flex-1 min-w-[200px] max-w-sm">
                    <input
                      type="text"
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                      placeholder="请输入关键字"
                      className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#10b981] transition-colors"
                    />
                  </div>

                  {/* 搜索按钮 */}
                  <button
                    onClick={() => onNotice(`查询到 ${filteredFoodItems.length} 条食物记录`)}
                    className="p-2 bg-[#10b981] hover:bg-[#059669] text-white rounded-md transition-colors shadow-sm shrink-0 flex items-center justify-center cursor-pointer"
                    title="搜索"
                  >
                    <Search className="w-4 h-4" />
                  </button>

                  {/* 重置按钮 */}
                  <button
                    onClick={handleResetFilters}
                    className="p-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-500 rounded-md transition-colors shrink-0 flex items-center justify-center cursor-pointer"
                    title="重置"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* 下半部分：数据表格卡片 */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-hidden">
              {/* 表格顶部操作按钮区：新增、批量操作 */}
              <div className="p-4 flex items-center justify-between border-b border-gray-100">
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <span>共找到 <span className="text-[#10b981] font-semibold">{totalItems}</span> 条食物数据</span>
                  {selectedIds.length > 0 && (
                    <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200">
                      已勾选 {selectedIds.length} 项
                    </span>
                  )}
                </div>

                <div className="flex items-center space-x-3">
                  {/* 新增按钮：点击进入专用的「新增食物信息」页面 */}
                  <button
                    onClick={handleOpenAddForm}
                    className="px-4 py-1.5 bg-[#10b981] hover:bg-[#059669] text-white rounded-md font-medium text-sm transition-colors shadow-sm flex items-center space-x-1 cursor-pointer"
                  >
                    <span>新增</span>
                  </button>

                  {/* 批量操作按钮 */}
                  <button
                    onClick={handleBatchOperation}
                    className="px-4 py-1.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-md font-medium text-sm transition-colors cursor-pointer"
                  >
                    批量操作
                  </button>
                </div>
              </div>

              {/* 表格主体 */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 text-gray-600 bg-gray-50/40">
                      <th className="py-3.5 px-4 w-12 text-center">
                        <input
                          type="checkbox"
                          checked={isAllCurrentSelected}
                          onChange={handleToggleSelectAll}
                          className="rounded border-gray-300 text-[#10b981] focus:ring-[#10b981] cursor-pointer w-4 h-4"
                        />
                      </th>
                      <th className="py-3.5 px-4 font-medium text-gray-700 min-w-[120px]">食物名称</th>
                      <th className="py-3.5 px-4 font-medium text-gray-700 min-w-[90px]">分类</th>
                      <th className="py-3.5 px-4 font-medium text-gray-700 min-w-[140px]">
                        热量（千卡/100克）
                      </th>
                      <th className="py-3.5 px-4 font-medium text-gray-700 min-w-[80px]">分享</th>
                      <th className="py-3.5 px-4 font-medium text-gray-700 min-w-[80px]">收藏</th>
                      <th className="py-3.5 px-4 font-medium text-gray-700 min-w-[90px]">状态</th>
                      <th className="py-3.5 px-4 font-medium text-gray-700 min-w-[90px]">更新人</th>
                      <th className="py-3.5 px-4 font-medium text-gray-700 min-w-[170px]">
                        <div className="flex items-center space-x-1">
                          <span>最后更新时间</span>
                          <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />
                        </div>
                      </th>
                      <th className="py-3.5 px-4 font-medium text-gray-700 min-w-[110px] text-center">操作</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {paginatedItems.length === 0 ? (
                      <tr>
                        <td colSpan={10} className="py-12 text-center text-gray-400">
                          <UtensilsCrossed className="w-8 h-8 mx-auto mb-2 opacity-40" />
                          <p>暂无符合筛选条件的食物记录</p>
                        </td>
                      </tr>
                    ) : (
                      paginatedItems.map((item) => {
                        const isSelected = selectedIds.includes(item.id);
                        return (
                          <tr
                            key={item.id}
                            className={`hover:bg-gray-50/70 transition-colors ${
                              isSelected ? 'bg-emerald-50/30' : ''
                            }`}
                          >
                            <td className="py-3.5 px-4 text-center">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => handleToggleSelectItem(item.id)}
                                className="rounded border-gray-300 text-[#10b981] focus:ring-[#10b981] cursor-pointer w-4 h-4"
                              />
                            </td>

                            <td className="py-3.5 px-4 font-medium text-gray-800">
                              {item.name}
                            </td>

                            <td className="py-3.5 px-4 text-gray-700">
                              {item.category}
                            </td>

                            <td className="py-3.5 px-4 font-mono text-gray-700">
                              {item.calories}
                            </td>

                            <td className="py-3.5 px-4 font-mono text-gray-700">
                              {item.sharesCount}
                            </td>

                            <td className="py-3.5 px-4 font-mono text-gray-700">
                              {item.favoritesCount}
                            </td>

                            <td className="py-3.5 px-4">
                              {item.status === '已发布' || item.status === '已上架' ? (
                                <div className="flex items-center space-x-1.5 text-[#10b981]">
                                  <span className="w-2 h-2 rounded-full bg-[#10b981]"></span>
                                  <span className="font-medium text-xs">已发布</span>
                                </div>
                              ) : (
                                <div className="flex items-center space-x-1.5 text-gray-400">
                                  <span className="w-2 h-2 rounded-full bg-gray-300"></span>
                                  <span className="text-xs">未发布</span>
                                </div>
                              )}
                            </td>

                            <td className="py-3.5 px-4 text-gray-700">
                              {item.updater}
                            </td>

                            <td className="py-3.5 px-4 font-mono text-gray-600 text-xs">
                              {item.lastUpdateTime}
                            </td>

                            <td className="py-3.5 px-4 text-center">
                              <div className="flex items-center justify-center space-x-3 text-xs">
                                <button
                                  onClick={() => handleOpenEditForm(item)}
                                  className="text-[#10b981] hover:underline font-medium cursor-pointer"
                                >
                                  编辑
                                </button>
                                <button
                                  onClick={() => handleDeleteItem(item)}
                                  className="text-[#f43f5e] hover:underline font-medium cursor-pointer"
                                >
                                  删除
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              {/* 分页控制栏：每页10条数据 */}
              <div className="p-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4 text-sm text-gray-600">
                <div className="text-gray-500 text-xs sm:text-sm">
                  共 <span className="text-gray-800 font-semibold">{totalItems}</span> 条
                </div>

                <div className="flex items-center space-x-3 text-xs sm:text-sm">
                  <div className="relative">
                    <select
                      value={pageSize}
                      onChange={(e) => setPageSize(Number(e.target.value))}
                      className="px-2.5 py-1 text-xs border border-gray-200 rounded text-gray-700 bg-white focus:outline-none focus:border-[#10b981] appearance-none pr-6 cursor-pointer"
                    >
                      <option value={10}>10条/页</option>
                      <option value={20}>20条/页</option>
                      <option value={50}>50条/页</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1.5 text-gray-400">
                      <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                      </svg>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1">
                    <button
                      disabled={currentPage <= 1}
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      className="p-1.5 rounded border border-gray-200 hover:bg-gray-50 disabled:opacity-30 disabled:pointer-events-none text-gray-600 transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                      <button
                        key={num}
                        onClick={() => setCurrentPage(num)}
                        className={`w-7 h-7 text-xs rounded transition-colors ${
                          currentPage === num
                            ? 'bg-[#10b981] text-white font-semibold shadow-sm'
                            : 'hover:bg-gray-100 text-gray-600'
                        }`}
                      >
                        {num}
                      </button>
                    ))}

                    <button
                      disabled={currentPage >= totalPages}
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      className="p-1.5 rounded border border-gray-200 hover:bg-gray-50 disabled:opacity-30 disabled:pointer-events-none text-gray-600 transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  <form onSubmit={handleJumpPage} className="flex items-center space-x-1 text-xs text-gray-500">
                    <span>前往</span>
                    <input
                      type="text"
                      value={jumpPageInput}
                      onChange={(e) => setJumpPageInput(e.target.value)}
                      placeholder={String(currentPage)}
                      className="w-10 px-1.5 py-0.5 border border-gray-200 rounded text-center text-gray-700 focus:outline-none focus:border-[#10b981]"
                    />
                    <span>页</span>
                  </form>
                </div>
              </div>
            </div>
          </>
        )
      ) : (
        /* 分类管理视图 (根据 image_ad5be337.png 1:1 精确呈现) */
        <div className="space-y-4">
          {/* 顶部检索卡片 */}
          <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
            <div className="flex items-center space-x-2.5 mb-4">
              <div className="w-1.5 h-4.5 bg-[#10b981] rounded-full" />
              <h2 className="text-base font-bold text-gray-800 tracking-tight">分类管理</h2>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={catKeyword}
                onChange={(e) => setCatKeyword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setCatCurrentPage(1);
                  }
                }}
                placeholder="请输入关键字"
                className="w-72 px-3.5 py-1.5 text-sm bg-white border border-gray-200 rounded-md placeholder-gray-400 text-gray-700 focus:outline-none focus:border-[#10b981] transition-colors"
              />
              <button
                onClick={() => setCatCurrentPage(1)}
                className="p-2 bg-[#10b981] hover:bg-[#059669] text-white rounded-md transition-colors shadow-xs cursor-pointer"
                title="搜索"
              >
                <Search className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setCatKeyword('');
                  setCatCurrentPage(1);
                  setSelectedCatIds([]);
                  onNotice('已重置搜索条件');
                }}
                className="p-2 bg-white border border-gray-200 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-md transition-colors shadow-xs cursor-pointer"
                title="重置"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 分类数据主卡片 */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-hidden">
            {/* 右上角操作按钮 */}
            <div className="p-4 flex items-center justify-end space-x-3 border-b border-gray-50">
              <button
                onClick={() => {
                  setEditingCat({
                    name: '',
                    code: '',
                    foodCount: 100,
                    updater: '李明明',
                    status: '启用',
                    description: '',
                  });
                  setIsCatModalOpen(true);
                }}
                className="px-4 py-1.5 bg-[#10b981] hover:bg-[#059669] text-white rounded-md text-sm font-medium transition-colors shadow-xs cursor-pointer flex items-center space-x-1"
              >
                <Plus className="w-4 h-4" />
                <span>新增</span>
              </button>
              <button
                onClick={() => {
                  if (!isCatBatchMode) {
                    setIsCatBatchMode(true);
                    onNotice('已开启批量操作模式，请勾选需要操作的分类条目');
                  } else if (selectedCatIds.length === 0) {
                    onNotice('请先勾选需要操作的分类条目');
                  } else {
                    setIsCatBatchModalOpen(true);
                  }
                }}
                className="px-3.5 py-1.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-md text-sm transition-colors shadow-xs cursor-pointer"
              >
                批量操作 {selectedCatIds.length > 0 && `(${selectedCatIds.length})`}
              </button>
              {isCatBatchMode && (
                <button
                  onClick={() => {
                    setIsCatBatchMode(false);
                    setSelectedCatIds([]);
                  }}
                  className="px-2.5 py-1.5 text-xs text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors cursor-pointer"
                >
                  退出批量
                </button>
              )}
            </div>

            {/* 分类数据表格 */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-600 bg-gray-50/40">
                    {isCatBatchMode && (
                      <th className="py-3 px-4 w-12 text-center">
                        <input
                          type="checkbox"
                          checked={
                            paginatedCategories.length > 0 &&
                            paginatedCategories.every((c) => selectedCatIds.includes(c.id))
                          }
                          onChange={handleToggleSelectAllCats}
                          className="w-4 h-4 rounded text-[#10b981] accent-[#10b981] cursor-pointer"
                        />
                      </th>
                    )}
                    <th className="py-3.5 px-6 font-medium text-gray-700 w-24">序号</th>
                    <th className="py-3.5 px-6 font-medium text-gray-700 min-w-[140px]">分类名称</th>
                    <th className="py-3.5 px-6 font-medium text-gray-700 min-w-[120px]">饮食条目数量</th>
                    <th className="py-3.5 px-6 font-medium text-gray-700 min-w-[120px]">最后更新人</th>
                    <th className="py-3.5 px-6 font-medium text-gray-700 min-w-[180px]">最后更新时间</th>
                    <th className="py-3.5 px-6 font-medium text-gray-700 min-w-[100px]">状态</th>
                    <th className="py-3.5 px-6 font-medium text-gray-700 min-w-[120px]">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {paginatedCategories.length === 0 ? (
                    <tr>
                      <td colSpan={isCatBatchMode ? 8 : 7} className="py-12 text-center text-gray-400">
                        暂无匹配分类数据
                      </td>
                    </tr>
                  ) : (
                    paginatedCategories.map((cat, idx) => {
                      // 严格根据截图降序序列呈现序号 (8, 7, 6, 5, 4, 3, 2, 1...)
                      const displaySeq = catTotalItems - ((catCurrentPage - 1) * catPageSize + idx);
                      const isSelected = selectedCatIds.includes(cat.id);

                      return (
                        <tr
                          key={cat.id}
                          className={`hover:bg-gray-50/70 transition-colors ${
                            isSelected ? 'bg-emerald-50/30' : ''
                          }`}
                        >
                          {isCatBatchMode && (
                            <td className="py-3 px-4 text-center">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => handleToggleSelectCat(cat.id)}
                                className="w-4 h-4 rounded text-[#10b981] accent-[#10b981] cursor-pointer"
                              />
                            </td>
                          )}
                          <td className="py-3.5 px-6 text-gray-700 font-mono text-sm">{displaySeq}</td>
                          <td className="py-3.5 px-6 font-medium text-gray-900">{cat.name}</td>
                          <td className="py-3.5 px-6">
                            <button
                              type="button"
                              onClick={() => handleCategoryFoodCountClick(cat.name)}
                              className="text-[#10b981] hover:underline font-medium cursor-pointer"
                              title="点击查看该分类下的食物"
                            >
                              {cat.foodCount}
                            </button>
                          </td>
                          <td className="py-3.5 px-6 text-gray-700">{cat.updater}</td>
                          <td className="py-3.5 px-6 text-gray-700 font-mono text-xs">
                            {cat.lastUpdateTime}
                          </td>
                          <td className="py-3.5 px-6">
                            {/* 状态滑块切换按钮 (1:1 还原截图胶囊滑块) */}
                            <button
                              type="button"
                              onClick={() => handleToggleCategoryStatus(cat.id)}
                              className={`relative inline-flex items-center h-6 w-14 rounded-full transition-colors cursor-pointer focus:outline-none select-none px-1.5 shadow-xs ${
                                cat.status === '启用' ? 'bg-[#10b981]' : 'bg-[#9ca3af]'
                              }`}
                              title={`点击${cat.status === '启用' ? '禁用' : '启用'}`}
                            >
                              {cat.status === '启用' ? (
                                <>
                                  <span className="text-[11px] font-medium text-white mr-auto pl-0.5 select-none">
                                    启用
                                  </span>
                                  <span className="w-3.5 h-3.5 bg-white rounded-full shadow-xs transition-transform" />
                                </>
                              ) : (
                                <>
                                  <span className="w-3.5 h-3.5 bg-white rounded-full shadow-xs transition-transform mr-auto" />
                                  <span className="text-[11px] font-medium text-white pr-0.5 select-none">
                                    禁用
                                  </span>
                                </>
                              )}
                            </button>
                          </td>
                          <td className="py-3.5 px-6">
                            <div className="flex items-center space-x-3 text-sm">
                              <button
                                onClick={() => {
                                  setEditingCat(cat);
                                  setIsCatModalOpen(true);
                                }}
                                className="text-[#10b981] hover:underline cursor-pointer"
                              >
                                编辑
                              </button>
                              <button
                                onClick={() => handleDeleteCategory(cat)}
                                className="text-[#f87171] hover:underline cursor-pointer"
                              >
                                删除
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* 底部完整分页 (严格默认每页10条，包含 << < 1 2 > >> 及跳转) */}
            <div className="p-4 border-t border-gray-100 flex flex-wrap items-center justify-end gap-3 text-xs text-gray-600">
              <div className="flex items-center space-x-2">
                <span>共{catTotalItems}条</span>
                <select
                  value={catPageSize}
                  onChange={(e) => {
                    setCatPageSize(Number(e.target.value));
                    setCatCurrentPage(1);
                  }}
                  className="px-2 py-1 border border-gray-200 rounded text-xs text-gray-700 bg-white focus:outline-none focus:border-[#10b981]"
                >
                  <option value={10}>每页10条</option>
                  <option value={20}>每页20条</option>
                  <option value={50}>每页50条</option>
                </select>
              </div>

              {/* 页码翻页器 */}
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => setCatCurrentPage(1)}
                  disabled={catCurrentPage === 1}
                  className="px-2 py-1 rounded border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:pointer-events-none text-gray-600 font-mono text-xs cursor-pointer"
                  title="首页"
                >
                  &lt;&lt;
                </button>
                <button
                  onClick={() => setCatCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={catCurrentPage === 1}
                  className="px-2 py-1 rounded border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:pointer-events-none text-gray-600 font-mono text-xs cursor-pointer"
                  title="上一页"
                >
                  &lt;
                </button>

                {Array.from({ length: catTotalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCatCurrentPage(page)}
                    className={`px-2.5 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
                      catCurrentPage === page
                        ? 'bg-[#10b981] text-white shadow-xs'
                        : 'border border-gray-200 hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => setCatCurrentPage((p) => Math.min(catTotalPages, p + 1))}
                  disabled={catCurrentPage === catTotalPages}
                  className="px-2 py-1 rounded border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:pointer-events-none text-gray-600 font-mono text-xs cursor-pointer"
                  title="下一页"
                >
                  &gt;
                </button>
                <button
                  onClick={() => setCatCurrentPage(catTotalPages)}
                  disabled={catCurrentPage === catTotalPages}
                  className="px-2 py-1 rounded border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:pointer-events-none text-gray-600 font-mono text-xs cursor-pointer"
                  title="末页"
                >
                  &gt;&gt;
                </button>
              </div>

              {/* 前往页码 */}
              <form onSubmit={handleCatJumpPage} className="flex items-center space-x-1">
                <span>前往第</span>
                <input
                  type="text"
                  value={catJumpPageInput}
                  onChange={(e) => setCatJumpPageInput(e.target.value)}
                  placeholder={String(catCurrentPage)}
                  className="w-10 px-1 py-0.5 border border-gray-200 rounded text-center text-gray-700 text-xs focus:outline-none focus:border-[#10b981]"
                />
                <span>页</span>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* 分类编辑/新增弹窗 */}
      {isCatModalOpen && editingCat && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden border border-gray-100 animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-4 bg-[#10b981] rounded-full" />
                <h3 className="font-semibold text-gray-800 text-base">
                  {editingCat.id ? '编辑分类' : '新增分类'}
                </h3>
              </div>
              <button
                onClick={() => setIsCatModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!editingCat.name) return;
                const now = new Date();
                const timeStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
                  2,
                  '0'
                )}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(
                  2,
                  '0'
                )}:${String(now.getMinutes()).padStart(2, '0')}:${String(
                  now.getSeconds()
                ).padStart(2, '0')}`;

                if (editingCat.id) {
                  setCategories((prev) =>
                    prev.map((c) =>
                      c.id === editingCat.id
                        ? ({ ...c, ...editingCat, lastUpdateTime: timeStr } as FoodCategoryItem)
                        : c
                    )
                  );
                  onNotice(`分类「${editingCat.name}」已更新`);
                } else {
                  const newCat: FoodCategoryItem = {
                    id: `CAT_${Date.now()}`,
                    name: editingCat.name.trim(),
                    code: editingCat.code || `CAT_${Date.now().toString().slice(-4)}`,
                    foodCount: Number(editingCat.foodCount) || 100,
                    updater: editingCat.updater || '李明明',
                    lastUpdateTime: timeStr,
                    status: (editingCat.status as '启用' | '禁用') || '启用',
                    sortOrder: editingCat.sortOrder || categories.length + 1,
                    description: editingCat.description || '',
                  };
                  // 置顶新增，保持时间降序
                  setCategories((prev) => [newCat, ...prev]);
                  onNotice(`新增分类「${newCat.name}」成功`);
                }
                setIsCatModalOpen(false);
              }}
              className="p-6 space-y-4"
            >
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  分类名称 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={editingCat.name || ''}
                  onChange={(e) => setEditingCat({ ...editingCat, name: e.target.value })}
                  placeholder="如：主食、肉蛋、蔬菜"
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-[#10b981]"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">饮食条目数量</label>
                  <input
                    type="number"
                    value={editingCat.foodCount ?? 100}
                    onChange={(e) =>
                      setEditingCat({ ...editingCat, foodCount: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-[#10b981]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">最后更新人</label>
                  <input
                    type="text"
                    value={editingCat.updater || '李明明'}
                    onChange={(e) => setEditingCat({ ...editingCat, updater: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-[#10b981]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">状态</label>
                <select
                  value={editingCat.status || '启用'}
                  onChange={(e) =>
                    setEditingCat({ ...editingCat, status: e.target.value as '启用' | '禁用' })
                  }
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-[#10b981]"
                >
                  <option value="启用">启用</option>
                  <option value="禁用">禁用</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">分类描述</label>
                <textarea
                  rows={2}
                  value={editingCat.description || ''}
                  onChange={(e) => setEditingCat({ ...editingCat, description: e.target.value })}
                  placeholder="分类说明及适老营养指引"
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-[#10b981]"
                />
              </div>
              <div className="pt-4 border-t border-gray-100 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsCatModalOpen(false)}
                  className="px-4 py-2 border border-gray-200 hover:bg-gray-50 text-gray-600 rounded-md text-sm cursor-pointer"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#10b981] hover:bg-[#059669] text-white rounded-md text-sm font-medium cursor-pointer"
                >
                  保存
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 批量操作弹窗 */}
      {isCatBatchModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-sm w-full overflow-hidden border border-gray-100 animate-in fade-in zoom-in-95 duration-150 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-semibold text-gray-800 text-sm">批量操作分类</h3>
              <button
                onClick={() => setIsCatBatchModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-gray-600">
              已选定 <span className="font-semibold text-[#10b981]">{selectedCatIds.length}</span> 个分类，请选择需要执行的操作：
            </p>
            <div className="space-y-2 pt-1">
              <button
                onClick={() => {
                  setCategories((prev) =>
                    prev.map((c) => (selectedCatIds.includes(c.id) ? { ...c, status: '启用' } : c))
                  );
                  setIsCatBatchModalOpen(false);
                  setIsCatBatchMode(false);
                  setSelectedCatIds([]);
                  onNotice(`已批量启用 ${selectedCatIds.length} 个分类`);
                }}
                className="w-full py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-medium rounded-md transition-colors cursor-pointer"
              >
                批量启用选中分类
              </button>
              <button
                onClick={() => {
                  setCategories((prev) =>
                    prev.map((c) => (selectedCatIds.includes(c.id) ? { ...c, status: '禁用' } : c))
                  );
                  setIsCatBatchModalOpen(false);
                  setIsCatBatchMode(false);
                  setSelectedCatIds([]);
                  onNotice(`已批量禁用 ${selectedCatIds.length} 个分类`);
                }}
                className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium rounded-md transition-colors cursor-pointer"
              >
                批量禁用选中分类
              </button>
              <button
                onClick={() => {
                  setIsCatBatchModalOpen(false);
                  onConfirmDelete(
                    '批量删除确认',
                    `确定要批量删除已选中的 ${selectedCatIds.length} 个分类吗？`,
                    () => {
                      setCategories((prev) => prev.filter((c) => !selectedCatIds.includes(c.id)));
                      setSelectedCatIds([]);
                      setIsCatBatchMode(false);
                      onNotice(`已批量删除分类数据`);
                    }
                  );
                }}
                className="w-full py-2 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-medium rounded-md transition-colors cursor-pointer"
              >
                批量删除选中分类
              </button>
            </div>
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setIsCatBatchModalOpen(false)}
                className="px-3 py-1.5 border border-gray-200 text-gray-500 rounded text-xs hover:bg-gray-50 cursor-pointer"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
