import React, { useState, useMemo } from 'react';
import {
  Search,
  RotateCcw,
  Plus,
  Trash2,
  Calendar,
  Check,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  SlidersHorizontal,
  X,
  PackageCheck,
} from 'lucide-react';

export interface TagItem {
  id: string;
  name: string;
  type: '自动标签' | '手动标签';
  userCount: number;
  updater: string;
  updateTime: string;
  status: boolean; // true = 启用, false = 停用
  conditionRule?: {
    matchType: 'all' | 'any';
    buyCountEnabled: boolean;
    buyCountMin: string;
    buyCountMax: string;
    buyAmountEnabled: boolean;
    buyAmountMin: string;
    buyAmountMax: string;
    productEnabled: boolean;
    selectedProducts: string[];
  };
}

const INITIAL_TAGS: TagItem[] = [
  {
    id: 'tag-01',
    name: '慢性病',
    type: '自动标签',
    userCount: 320,
    updater: '李明明',
    updateTime: '2026-09-19 16:35:20',
    status: true,
  },
  {
    id: 'tag-02',
    name: '高血压预警',
    type: '自动标签',
    userCount: 268,
    updater: '王芳',
    updateTime: '2026-09-19 14:12:08',
    status: true,
  },
  {
    id: 'tag-03',
    name: '糖尿病照护',
    type: '自动标签',
    userCount: 215,
    updater: '张建国',
    updateTime: '2026-09-19 10:09:09',
    status: true,
  },
  {
    id: 'tag-04',
    name: '独居高龄',
    type: '手动标签',
    userCount: 184,
    updater: '陈晓华',
    updateTime: '2026-09-18 17:45:30',
    status: true,
  },
  {
    id: 'tag-05',
    name: '骨质疏松防跌',
    type: '自动标签',
    userCount: 156,
    updater: '赵云',
    updateTime: '2026-09-18 11:20:15',
    status: true,
  },
  {
    id: 'tag-06',
    name: '长护险定点',
    type: '手动标签',
    userCount: 142,
    updater: '孙倩',
    updateTime: '2026-09-17 15:30:40',
    status: true,
  },
  {
    id: 'tag-07',
    name: '脑梗恢复期',
    type: '手动标签',
    userCount: 128,
    updater: '刘洋',
    updateTime: '2026-09-16 09:18:22',
    status: true,
  },
  {
    id: 'tag-08',
    name: '认知障碍筛查',
    type: '自动标签',
    userCount: 95,
    updater: '周伟',
    updateTime: '2026-09-15 14:05:10',
    status: true,
  },
  {
    id: 'tag-09',
    name: '助餐特需配餐',
    type: '手动标签',
    userCount: 84,
    updater: '钱佳',
    updateTime: '2026-09-14 11:42:00',
    status: true,
  },
  {
    id: 'tag-10',
    name: '优质消费会员',
    type: '自动标签',
    userCount: 76,
    updater: '吴敏',
    updateTime: '2026-09-13 16:20:00',
    status: true,
  },
  {
    id: 'tag-11',
    name: '居家失能特护',
    type: '手动标签',
    userCount: 68,
    updater: '李明明',
    updateTime: '2026-09-11 10:15:30',
    status: true,
  },
  {
    id: 'tag-12',
    name: '助听与言语关爱',
    type: '手动标签',
    userCount: 52,
    updater: '王芳',
    updateTime: '2026-09-08 14:50:12',
    status: true,
  },
  {
    id: 'tag-13',
    name: '术后心脑休养',
    type: '手动标签',
    userCount: 45,
    updater: '张建国',
    updateTime: '2026-09-05 09:30:00',
    status: false,
  },
  {
    id: 'tag-14',
    name: '社区自理活跃',
    type: '自动标签',
    userCount: 38,
    updater: '陈晓华',
    updateTime: '2026-09-02 11:00:00',
    status: true,
  },
];

interface TagManagementProps {
  onNotice: (msg: string) => void;
}

export const TagManagement: React.FC<TagManagementProps> = ({ onNotice }) => {
  const [tags, setTags] = useState<TagItem[]>(INITIAL_TAGS);
  const [viewMode, setViewMode] = useState<'list' | 'create'>('list');
  const [editingTag, setEditingTag] = useState<TagItem | null>(null);

  // Filter state
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [keyword, setKeyword] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Form state for Create / Edit Tag
  const [tagName, setTagName] = useState('');
  const [tagStatus, setTagStatus] = useState(true);
  const [tagType, setTagType] = useState<'自动标签' | '手动标签'>('自动标签');
  const [matchType, setMatchType] = useState<'all' | 'any'>('all');
  const [buyCountEnabled, setBuyCountEnabled] = useState(false);
  const [buyCountMin, setBuyCountMin] = useState('');
  const [buyCountMax, setBuyCountMax] = useState('');
  const [buyAmountEnabled, setBuyAmountEnabled] = useState(false);
  const [buyAmountMin, setBuyAmountMin] = useState('');
  const [buyAmountMax, setBuyAmountMax] = useState('');
  const [productEnabled, setProductEnabled] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [showProductModal, setShowProductModal] = useState(false);

  // Available mock products for picker
  const availableProducts = [
    '长者定制无糖高钙燕麦乳 (礼盒装)',
    '便携式智能毫米波防跌倒雷达监测仪',
    '腕式全自动血氧心率睡眠健康手环',
    '居家适老化防滑助力安全扶手套组',
    '特级长护险居家上门助浴与护理月卡',
    '中医理疗温经通络经络艾灸养生包',
  ];

  // Open create form
  const handleOpenCreate = () => {
    setEditingTag(null);
    setTagName('');
    setTagStatus(true);
    setTagType('自动标签');
    setMatchType('all');
    setBuyCountEnabled(false);
    setBuyCountMin('');
    setBuyCountMax('');
    setBuyAmountEnabled(false);
    setBuyAmountMin('');
    setBuyAmountMax('');
    setProductEnabled(false);
    setSelectedProducts([]);
    setViewMode('create');
  };

  // Open edit form
  const handleOpenEdit = (tag: TagItem) => {
    setEditingTag(tag);
    setTagName(tag.name);
    setTagStatus(tag.status);
    setTagType(tag.type);
    if (tag.conditionRule) {
      setMatchType(tag.conditionRule.matchType);
      setBuyCountEnabled(tag.conditionRule.buyCountEnabled);
      setBuyCountMin(tag.conditionRule.buyCountMin);
      setBuyCountMax(tag.conditionRule.buyCountMax);
      setBuyAmountEnabled(tag.conditionRule.buyAmountEnabled);
      setBuyAmountMin(tag.conditionRule.buyAmountMin);
      setBuyAmountMax(tag.conditionRule.buyAmountMax);
      setProductEnabled(tag.conditionRule.productEnabled);
      setSelectedProducts(tag.conditionRule.selectedProducts || []);
    } else {
      setMatchType('all');
      setBuyCountEnabled(false);
      setBuyCountMin('');
      setBuyCountMax('');
      setBuyAmountEnabled(false);
      setBuyAmountMin('');
      setBuyAmountMax('');
      setProductEnabled(false);
      setSelectedProducts([]);
    }
    setViewMode('create');
  };

  // Save form
  const handleSaveTag = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tagName.trim()) {
      onNotice('请输入标签名称');
      return;
    }

    if (editingTag) {
      setTags((prev) =>
        prev.map((item) =>
          item.id === editingTag.id
            ? {
                ...item,
                name: tagName.trim(),
                status: tagStatus,
                type: tagType,
                updater: '李明明',
                updateTime: '2026-09-19 17:10:00',
                conditionRule: {
                  matchType,
                  buyCountEnabled,
                  buyCountMin,
                  buyCountMax,
                  buyAmountEnabled,
                  buyAmountMin,
                  buyAmountMax,
                  productEnabled,
                  selectedProducts,
                },
              }
            : item
        )
      );
      onNotice(`已成功更新标签【${tagName.trim()}】`);
    } else {
      const newTag: TagItem = {
        id: `tag-${Date.now()}`,
        name: tagName.trim(),
        type: tagType,
        userCount: 0,
        updater: '李明明',
        updateTime: '2026-09-19 17:15:00',
        status: tagStatus,
        conditionRule: {
          matchType,
          buyCountEnabled,
          buyCountMin,
          buyCountMax,
          buyAmountEnabled,
          buyAmountMin,
          buyAmountMax,
          productEnabled,
          selectedProducts,
        },
      };
      setTags((prev) => [newTag, ...prev]);
      onNotice(`已成功新增标签【${tagName.trim()}】`);
    }
    setViewMode('list');
  };

  // Filtered & sorted descending
  const filteredTags = useMemo(() => {
    return tags
      .filter((tag) => {
        const q = keyword.trim().toLowerCase();
        const matchesKeyword =
          !q ||
          tag.name.toLowerCase().includes(q) ||
          tag.type.toLowerCase().includes(q) ||
          tag.updater.toLowerCase().includes(q);

        let matchesDate = true;
        if (dateRange.start) {
          matchesDate = matchesDate && tag.updateTime >= dateRange.start;
        }
        if (dateRange.end) {
          matchesDate = matchesDate && tag.updateTime <= dateRange.end + ' 23:59:59';
        }
        return matchesKeyword && matchesDate;
      })
      .sort((a, b) => new Date(b.updateTime).getTime() - new Date(a.updateTime).getTime());
  }, [tags, keyword, dateRange]);

  // Pagination slice
  const totalPages = Math.ceil(filteredTags.length / pageSize) || 1;
  const paginatedTags = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredTags.slice(start, start + pageSize);
  }, [filteredTags, currentPage]);

  const handleToggleStatus = (tag: TagItem) => {
    setTags((prev) =>
      prev.map((t) => (t.id === tag.id ? { ...t, status: !t.status } : t))
    );
    onNotice(`标签【${tag.name}】已${!tag.status ? '启用' : '停用'}`);
  };

  const handleDeleteTag = (tag: TagItem) => {
    setTags((prev) => prev.filter((t) => t.id !== tag.id));
    setSelectedIds((prev) => prev.filter((id) => id !== tag.id));
    onNotice(`已删除标签【${tag.name}】`);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(paginatedTags.map((t) => t.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleBatchOperation = () => {
    if (selectedIds.length === 0) {
      onNotice('请先勾选需要批量操作的标签项');
      return;
    }
    onNotice(`已针对选中的 ${selectedIds.length} 项标签执行批量更新`);
  };

  const handleResetFilters = () => {
    setKeyword('');
    setDateRange({ start: '', end: '' });
    setCurrentPage(1);
    onNotice('已重置标签搜索条件');
  };

  // -------------------------------------------------------------
  // VIEW: CREATE / EDIT TAG (Matches Image 2)
  // -------------------------------------------------------------
  if (viewMode === 'create') {
    return (
      <div className="p-6 max-w-[1600px] mx-auto text-xs">
        <div className="bg-white rounded-xl p-8 border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-6">
          {/* Title Header with green vertical pill indicator */}
          <div className="flex items-center space-x-2.5 pb-5 border-b border-gray-100">
            <span className="w-1 h-4 bg-[#10b981] rounded-full"></span>
            <h1 className="text-sm font-semibold text-gray-800">
              {editingTag ? '编辑标签' : '新增标签'}
            </h1>
          </div>

          <form onSubmit={handleSaveTag} className="space-y-6 max-w-2xl">
            {/* 标签名称 */}
            <div className="flex items-center">
              <label className="w-24 text-gray-600">
                <span className="text-red-500 mr-0.5">*</span>标签名称
              </label>
              <div className="flex-1">
                <input
                  type="text"
                  value={tagName}
                  onChange={(e) => setTagName(e.target.value)}
                  placeholder="请输入"
                  className="w-full max-w-sm px-3.5 py-2 border border-gray-200 rounded-md text-gray-800 focus:outline-none focus:border-[#10b981] text-xs placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* 状态 */}
            <div className="flex items-center">
              <label className="w-24 text-gray-600">状态</label>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => setTagStatus(!tagStatus)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    tagStatus ? 'bg-[#10b981]' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      tagStatus ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
                <span className="text-xs text-gray-600">{tagStatus ? '启用' : '停用'}</span>
              </div>
            </div>

            {/* 标签类型 */}
            <div className="flex items-center">
              <label className="w-24 text-gray-600">标签类型</label>
              <div className="flex items-center space-x-6">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="tagType"
                    checked={tagType === '自动标签'}
                    onChange={() => setTagType('自动标签')}
                    className="w-4 h-4 text-[#10b981] accent-[#10b981] focus:ring-[#10b981]"
                  />
                  <span className="text-gray-700">自动标签</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="tagType"
                    checked={tagType === '手动标签'}
                    onChange={() => setTagType('手动标签')}
                    className="w-4 h-4 text-[#10b981] accent-[#10b981] focus:ring-[#10b981]"
                  />
                  <span className="text-gray-700">手动标签</span>
                </label>
              </div>
            </div>

            {/* 满足条件 (仅自动标签可见) */}
            {tagType === '自动标签' && (
              <div className="flex items-start">
                <label className="w-24 pt-1.5 text-gray-600">满足条件</label>
                <div className="flex-1 space-y-4">
                  {/* Radio options */}
                  <div className="flex items-center space-x-6">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="matchType"
                        checked={matchType === 'all'}
                        onChange={() => setMatchType('all')}
                        className="w-4 h-4 text-[#10b981] accent-[#10b981]"
                      />
                      <span className="text-gray-700">必须满足所有被选中的条件</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="matchType"
                        checked={matchType === 'any'}
                        onChange={() => setMatchType('any')}
                        className="w-4 h-4 text-[#10b981] accent-[#10b981]"
                      />
                      <span className="text-gray-700">满足任意一个被选中的条件</span>
                    </label>
                  </div>

                  {/* 条件1: 累计消费次数 */}
                  <div className="flex items-center space-x-3 text-xs">
                    <span className="text-gray-400 w-12">条件1</span>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={buyCountEnabled}
                        onChange={(e) => setBuyCountEnabled(e.target.checked)}
                        className="rounded text-[#10b981] accent-[#10b981]"
                      />
                      <span className="text-gray-700">累计消费次数</span>
                    </label>
                    <div className="flex items-center space-x-2">
                      <div className="relative">
                        <input
                          type="number"
                          value={buyCountMin}
                          onChange={(e) => setBuyCountMin(e.target.value)}
                          disabled={!buyCountEnabled}
                          className="w-24 px-2.5 py-1.5 pr-6 border border-gray-200 rounded text-right focus:outline-none focus:border-[#10b981] disabled:bg-gray-50"
                        />
                        <span className="absolute right-2 top-1.5 text-gray-400">次</span>
                      </div>
                      <span className="text-gray-400">-</span>
                      <div className="relative">
                        <input
                          type="number"
                          value={buyCountMax}
                          onChange={(e) => setBuyCountMax(e.target.value)}
                          disabled={!buyCountEnabled}
                          className="w-24 px-2.5 py-1.5 pr-6 border border-gray-200 rounded text-right focus:outline-none focus:border-[#10b981] disabled:bg-gray-50"
                        />
                        <span className="absolute right-2 top-1.5 text-gray-400">次</span>
                      </div>
                    </div>
                  </div>

                  {/* 条件2: 累计消费金额 */}
                  <div className="flex items-center space-x-3 text-xs">
                    <span className="text-gray-400 w-12">条件2</span>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={buyAmountEnabled}
                        onChange={(e) => setBuyAmountEnabled(e.target.checked)}
                        className="rounded text-[#10b981] accent-[#10b981]"
                      />
                      <span className="text-gray-700">累计消费金额</span>
                    </label>
                    <div className="flex items-center space-x-2">
                      <div className="relative">
                        <input
                          type="number"
                          value={buyAmountMin}
                          onChange={(e) => setBuyAmountMin(e.target.value)}
                          disabled={!buyAmountEnabled}
                          className="w-24 px-2.5 py-1.5 pr-6 border border-gray-200 rounded text-right focus:outline-none focus:border-[#10b981] disabled:bg-gray-50"
                        />
                        <span className="absolute right-2 top-1.5 text-gray-400">元</span>
                      </div>
                      <span className="text-gray-400">-</span>
                      <div className="relative">
                        <input
                          type="number"
                          value={buyAmountMax}
                          onChange={(e) => setBuyAmountMax(e.target.value)}
                          disabled={!buyAmountEnabled}
                          className="w-24 px-2.5 py-1.5 pr-6 border border-gray-200 rounded text-right focus:outline-none focus:border-[#10b981] disabled:bg-gray-50"
                        />
                        <span className="absolute right-2 top-1.5 text-gray-400">元</span>
                      </div>
                    </div>
                  </div>

                  {/* 购买指定商品 */}
                  <div className="flex items-center space-x-3 text-xs">
                    <span className="text-gray-700">购买指定商品</span>
                    <input
                      type="checkbox"
                      checked={productEnabled}
                      onChange={(e) => setProductEnabled(e.target.checked)}
                      className="rounded text-[#10b981] accent-[#10b981]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowProductModal(true)}
                      className="text-[#10b981] hover:underline font-medium"
                    >
                      +选择商品 {selectedProducts.length > 0 ? `(已选${selectedProducts.length}件)` : ''}
                    </button>
                  </div>
                  {selectedProducts.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {selectedProducts.map((p) => (
                        <span
                          key={p}
                          className="inline-flex items-center space-x-1.5 px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded text-[11px]"
                        >
                          <span>{p}</span>
                          <button
                            type="button"
                            onClick={() =>
                              setSelectedProducts((prev) => prev.filter((item) => item !== p))
                            }
                            className="text-emerald-500 hover:text-emerald-800"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Bottom Actions: 保存 / 返回 */}
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

        {/* Product Picker Modal */}
        {showProductModal && (
          <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 space-y-4 text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div className="font-semibold text-gray-800 text-sm">选择指定商品</div>
                <button
                  onClick={() => setShowProductModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2 max-h-60 overflow-y-auto">
                {availableProducts.map((prod) => {
                  const isChecked = selectedProducts.includes(prod);
                  return (
                    <label
                      key={prod}
                      className="flex items-center space-x-2.5 p-2 rounded-lg border border-gray-100 hover:bg-gray-50 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {
                          setSelectedProducts((prev) =>
                            isChecked ? prev.filter((p) => p !== prod) : [...prev, prod]
                          );
                        }}
                        className="rounded text-[#10b981] accent-[#10b981]"
                      />
                      <span className="text-gray-700">{prod}</span>
                    </label>
                  );
                })}
              </div>

              <div className="pt-3 border-t border-gray-100 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowProductModal(false)}
                  className="px-4 py-1.5 border border-gray-200 rounded text-gray-600 hover:bg-gray-50"
                >
                  取消
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setProductEnabled(selectedProducts.length > 0);
                    setShowProductModal(false);
                    onNotice(`已选定 ${selectedProducts.length} 件指定商品`);
                  }}
                  className="px-4 py-1.5 bg-[#10b981] text-white rounded hover:bg-[#059669]"
                >
                  确定
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // -------------------------------------------------------------
  // VIEW: LIST (Matches Image 1)
  // -------------------------------------------------------------
  return (
    <div className="p-6 max-w-[1600px] mx-auto text-xs space-y-4">
      {/* Top Card: Title + Filters + Search */}
      <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-4">
        {/* Title */}
        <div className="flex items-center space-x-2 pb-2">
          <span className="w-1.5 h-4 bg-[#10b981] rounded-full"></span>
          <h1 className="text-sm font-semibold text-gray-800">标签管理</h1>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center space-x-2">
            <span className="text-gray-500 whitespace-nowrap">更新日期</span>
            <div className="flex items-center border border-gray-200 rounded-md px-2.5 py-1.5 bg-white space-x-2">
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange((prev) => ({ ...prev, start: e.target.value }))}
                className="text-gray-600 focus:outline-none text-xs"
              />
              <span className="text-gray-400">~</span>
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange((prev) => ({ ...prev, end: e.target.value }))}
                className="text-gray-600 focus:outline-none text-xs"
              />
              <Calendar className="w-3.5 h-3.5 text-gray-400 ml-1" />
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

          {/* Search Button (Green) */}
          <button
            type="button"
            onClick={() => onNotice(`已筛选出 ${filteredTags.length} 条符合条件的标签`)}
            className="w-8 h-8 rounded-md bg-[#10b981] hover:bg-[#059669] text-white flex items-center justify-center transition-colors"
            title="搜索"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Reset Button (Outline) */}
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
        {/* Action Buttons Top Right */}
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
                <th className="py-3 px-3 w-10 text-center">
                  <input
                    type="checkbox"
                    checked={
                      paginatedTags.length > 0 &&
                      paginatedTags.every((t) => selectedIds.includes(t.id))
                    }
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="rounded text-[#10b981] accent-[#10b981]"
                  />
                </th>
                <th className="py-3 px-4 font-normal text-gray-600">标签名称</th>
                <th className="py-3 px-4 font-normal text-gray-600">标签类型</th>
                <th className="py-3 px-4 font-normal text-gray-600">用户数量</th>
                <th className="py-3 px-4 font-normal text-gray-600">最后更新人</th>
                <th className="py-3 px-4 font-normal text-gray-600">最后更新时间</th>
                <th className="py-3 px-4 font-normal text-gray-600">状态</th>
                <th className="py-3 px-4 font-normal text-gray-600 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {paginatedTags.map((tag) => {
                const isSelected = selectedIds.includes(tag.id);
                return (
                  <tr
                    key={tag.id}
                    className={`hover:bg-gray-50/70 transition-colors ${
                      isSelected ? 'bg-emerald-50/20' : ''
                    }`}
                  >
                    <td className="py-3 px-3 text-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleToggleSelect(tag.id)}
                        className="rounded text-[#10b981] accent-[#10b981]"
                      />
                    </td>
                    <td className="py-3 px-4 text-gray-800 font-medium">{tag.name}</td>
                    <td className="py-3 px-4 text-gray-600">{tag.type}</td>
                    <td className="py-3 px-4">
                      <span className="text-[#10b981] font-medium cursor-pointer hover:underline">
                        {tag.userCount}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{tag.updater}</td>
                    <td className="py-3 px-4 text-gray-600 font-mono">{tag.updateTime}</td>
                    <td className="py-3 px-4">
                      <button
                        type="button"
                        onClick={() => handleToggleStatus(tag)}
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium transition-colors ${
                          tag.status
                            ? 'bg-[#10b981] text-white'
                            : 'bg-gray-200 text-gray-600'
                        }`}
                      >
                        {tag.status ? '启用' : '停用'}
                      </button>
                    </td>
                    <td className="py-3 px-4 text-right space-x-3">
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(tag)}
                        className="text-[#10b981] hover:underline"
                      >
                        编辑
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteTag(tag)}
                        className="text-red-500 hover:underline"
                      >
                        删除
                      </button>
                    </td>
                  </tr>
                );
              })}
              {paginatedTags.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center py-10 text-gray-400">
                    暂无匹配的标签记录
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 text-xs text-gray-500">
          <div>
            已选 <span className="font-semibold text-gray-800">{selectedIds.length}</span> 项 / 共{' '}
            <span className="font-semibold text-gray-800">{filteredTags.length}</span> 条
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
