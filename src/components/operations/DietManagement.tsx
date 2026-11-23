import React, { useState, useMemo } from 'react';
import {
  Search,
  RotateCcw,
  Calendar,
  Clock,
  Plus,
  X,
} from 'lucide-react';
import { SubPageId, RecipeItem, DietTagItem } from '../../types';

interface DietManagementProps {
  subPageId: SubPageId;
  onNotice: (msg: string) => void;
  onConfirmDelete: (title: string, message: string, onConfirm: () => void) => void;
}

const INITIAL_RECIPES: RecipeItem[] = [
  {
    id: 'REC_001',
    title: '虾仁蒸蛋',
    category: '午餐',
    tags: ['低盐', '低糖'],
    sharesCount: 100,
    collectsCount: 35,
    status: '已发布',
    updater: '李明明',
    lastUpdateTime: '2026-10-19 10:09:09',
    coverImage: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&auto=format&fit=crop&q=80',
    detailHtml: '<p>软嫩可口，高蛋白低胆固醇，适合中老年人日常食用。</p>',
    publishType: '立即发布',
  },
  {
    id: 'REC_002',
    title: '银耳莲子红枣羹',
    category: '早餐',
    tags: ['低糖', '易消化'],
    sharesCount: 142,
    collectsCount: 52,
    status: '已发布',
    updater: '张建国',
    lastUpdateTime: '2026-10-18 15:30:00',
    coverImage: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=200&auto=format&fit=crop&q=80',
    detailHtml: '<p>滋阴润肺，小火慢炖出胶，软糯香甜。</p>',
    publishType: '立即发布',
  },
  {
    id: 'REC_003',
    title: '清蒸清江黄花鱼',
    category: '晚餐',
    tags: ['高蛋白', '低脂'],
    sharesCount: 88,
    collectsCount: 29,
    status: '已发布',
    updater: '李明明',
    lastUpdateTime: '2026-10-17 09:12:34',
    coverImage: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=200&auto=format&fit=crop&q=80',
    detailHtml: '<p>肉质细腻，富含不饱和脂肪酸，助益心血管健康。</p>',
    publishType: '立即发布',
  },
  {
    id: 'REC_004',
    title: '山药铁棍排骨养生汤',
    category: '午餐',
    tags: ['易消化', '高钙'],
    sharesCount: 215,
    collectsCount: 81,
    status: '已发布',
    updater: '王芳',
    lastUpdateTime: '2026-10-15 14:20:10',
    coverImage: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=200&auto=format&fit=crop&q=80',
    detailHtml: '<p>健脾养胃，文火炖煮2小时，汤浓肉烂。</p>',
    publishType: '立即发布',
  },
  {
    id: 'REC_005',
    title: '降压香芹炒香干',
    category: '午餐',
    tags: ['低盐', '降压'],
    sharesCount: 67,
    collectsCount: 19,
    status: '已发布',
    updater: '陈主任',
    lastUpdateTime: '2026-10-12 11:05:22',
    coverImage: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=200&auto=format&fit=crop&q=80',
    detailHtml: '<p>富含膳食纤维与芹菜素，清爽利口。</p>',
    publishType: '立即发布',
  },
  {
    id: 'REC_006',
    title: '有机燕麦紫薯红豆粥',
    category: '早餐',
    tags: ['低糖', '高纤'],
    sharesCount: 190,
    collectsCount: 64,
    status: '已发布',
    updater: '李明明',
    lastUpdateTime: '2026-10-08 16:00:00',
    coverImage: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=200&auto=format&fit=crop&q=80',
    detailHtml: '<p>粗细搭配，稳定血糖，促进肠道蠕动。</p>',
    publishType: '立即发布',
  },
  {
    id: 'REC_007',
    title: '枸杞当归蒸清远鸡腿',
    category: '晚餐',
    tags: ['高蛋白', '滋补'],
    sharesCount: 112,
    collectsCount: 40,
    status: '草稿',
    updater: '张建国',
    lastUpdateTime: '2026-10-03 08:45:11',
    coverImage: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=200&auto=format&fit=crop&q=80',
    detailHtml: '<p>药食同源，补气养血，温和不燥。</p>',
    publishType: '立即发布',
  },
];

const INITIAL_TAGS: DietTagItem[] = [
  {
    id: 'TAG_001',
    name: '低糖',
    recipeCount: 200,
    updater: '李明明',
    lastUpdateTime: '2026-10-18 10:09:09',
    status: '启用',
  },
  {
    id: 'TAG_002',
    name: '低盐',
    recipeCount: 185,
    updater: '王芳',
    lastUpdateTime: '2026-10-17 14:20:00',
    status: '启用',
  },
  {
    id: 'TAG_003',
    name: '高蛋白',
    recipeCount: 142,
    updater: '张建国',
    lastUpdateTime: '2026-10-16 11:30:15',
    status: '启用',
  },
  {
    id: 'TAG_004',
    name: '易消化',
    recipeCount: 98,
    updater: '李明明',
    lastUpdateTime: '2026-10-14 09:10:00',
    status: '启用',
  },
  {
    id: 'TAG_005',
    name: '高钙',
    recipeCount: 120,
    updater: '陈主任',
    lastUpdateTime: '2026-10-10 16:00:00',
    status: '启用',
  },
  {
    id: 'TAG_006',
    name: '低脂',
    recipeCount: 76,
    updater: '王芳',
    lastUpdateTime: '2026-10-06 15:12:00',
    status: '启用',
  },
  {
    id: 'TAG_007',
    name: '降压膳食',
    recipeCount: 64,
    updater: '张建国',
    lastUpdateTime: '2026-10-02 08:30:00',
    status: '禁用',
  },
];

export const DietManagement: React.FC<DietManagementProps> = ({
  subPageId,
  onNotice,
  onConfirmDelete,
}) => {
  const [recipes, setRecipes] = useState<RecipeItem[]>(INITIAL_RECIPES);
  const [tags, setTags] = useState<DietTagItem[]>(INITIAL_TAGS);

  // Filters
  const [keyword, setKeyword] = useState('');
  const [statusFilter, setStatusFilter] = useState('全部');
  const [categoryFilter, setCategoryFilter] = useState('全部');
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');

  // Modals / Forms
  const [recipeModal, setRecipeModal] = useState<{
    isOpen: boolean;
    item: RecipeItem | null;
    isCreate: boolean;
  }>({ isOpen: false, item: null, isCreate: false });

  const [recipeForm, setRecipeForm] = useState<Partial<RecipeItem>>({
    title: '',
    category: '',
    tags: [],
    status: '已发布',
    coverImage: '',
    detailHtml: '',
    publishType: '立即发布',
    scheduledDate: '',
    scheduledTime: '12 : 00',
  });

  const [tagModal, setTagModal] = useState<{
    isOpen: boolean;
    item: DietTagItem | null;
    isCreate: boolean;
  }>({ isOpen: false, item: null, isCreate: false });

  const [tagForm, setTagForm] = useState<{ name: string; status: '启用' | '禁用' }>({
    name: '',
    status: '启用',
  });

  // Filtered Recipes (Sorted Descending by date)
  const filteredRecipes = useMemo(() => {
    let list = [...recipes];
    if (statusFilter !== '全部') list = list.filter((r) => r.status === statusFilter);
    if (categoryFilter !== '全部') list = list.filter((r) => r.category === categoryFilter);
    if (keyword) {
      const k = keyword.toLowerCase();
      list = list.filter((r) => r.title.toLowerCase().includes(k) || r.tags.some((t) => t.toLowerCase().includes(k)));
    }
    return list.sort((a, b) => b.lastUpdateTime.localeCompare(a.lastUpdateTime));
  }, [recipes, statusFilter, categoryFilter, keyword]);

  // Filtered Tags
  const filteredTags = useMemo(() => {
    let list = [...tags];
    if (keyword) {
      const k = keyword.toLowerCase();
      list = list.filter((t) => t.name.toLowerCase().includes(k));
    }
    return list.sort((a, b) => b.lastUpdateTime.localeCompare(a.lastUpdateTime));
  }, [tags, keyword]);

  // Save recipe
  const handleSaveRecipe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipeForm.title) {
      onNotice('请输入菜谱标题');
      return;
    }
    if (recipeModal.isCreate) {
      const newItem: RecipeItem = {
        id: 'REC_' + Date.now(),
        title: recipeForm.title || '',
        category: recipeForm.category || '午餐',
        tags: recipeForm.tags || ['低盐'],
        sharesCount: 0,
        collectsCount: 0,
        status: (recipeForm.status as any) || '已发布',
        updater: '管理员',
        lastUpdateTime: '2026-10-21 16:30:00',
        coverImage: recipeForm.coverImage || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&auto=format&fit=crop&q=80',
        detailHtml: recipeForm.detailHtml,
        publishType: recipeForm.publishType as any,
        scheduledDate: recipeForm.scheduledDate,
        scheduledTime: recipeForm.scheduledTime,
      };
      setRecipes([newItem, ...recipes]);
      onNotice('成功新增菜谱');
    } else if (recipeModal.item) {
      setRecipes(
        recipes.map((r) =>
          r.id === recipeModal.item!.id
            ? { ...r, ...recipeForm, lastUpdateTime: '2026-10-21 16:30:00' }
            : r
        )
      );
      onNotice('食谱已被更新');
    }
    setRecipeModal({ isOpen: false, item: null, isCreate: false });
  };

  const handleOpenRecipeModal = (item?: RecipeItem) => {
    if (item) {
      // Edit mode: populate existing item data
      setRecipeForm({
        ...item,
        publishType: item.publishType || '立即发布',
        scheduledDate: item.scheduledDate || '',
        scheduledTime: item.scheduledTime || '12 : 00',
      });
      setRecipeModal({ isOpen: true, item, isCreate: false });
    } else {
      // Add mode: completely cleared data
      setRecipeForm({
        title: '',
        category: '',
        tags: [],
        status: '已发布',
        coverImage: '',
        detailHtml: '',
        publishType: '立即发布',
        scheduledDate: '',
        scheduledTime: '12 : 00',
      });
      setRecipeModal({ isOpen: true, item: null, isCreate: true });
    }
  };

  const handleDeleteRecipe = (item: RecipeItem) => {
    onConfirmDelete('删除食谱', `确定要删除食谱“${item.title}”吗？`, () => {
      setRecipes(recipes.filter((r) => r.id !== item.id));
      onNotice('食谱已删除');
    });
  };

  const handleSaveTag = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tagForm.name) {
      onNotice('请输入标签名称');
      return;
    }
    if (tagModal.isCreate) {
      const newT: DietTagItem = {
        id: 'TAG_' + Date.now(),
        name: tagForm.name,
        recipeCount: 0,
        updater: '管理员',
        lastUpdateTime: '2026-10-19 16:00:00',
        status: tagForm.status,
      };
      setTags([newT, ...tags]);
      onNotice('已新增膳食标签');
    } else if (tagModal.item) {
      setTags(
        tags.map((t) =>
          t.id === tagModal.item!.id
            ? { ...t, name: tagForm.name, status: tagForm.status, lastUpdateTime: '2026-10-19 16:00:00' }
            : t
        )
      );
      onNotice('标签修改已保存');
    }
    setTagModal({ isOpen: false, item: null, isCreate: false });
  };

  const handleToggleTagStatus = (tag: DietTagItem) => {
    const next = tag.status === '启用' ? '禁用' : '启用';
    setTags(tags.map((t) => (t.id === tag.id ? { ...t, status: next } : t)));
    onNotice(`标签“${tag.name}”设为：${next}`);
  };

  const handleDeleteTag = (tag: DietTagItem) => {
    onConfirmDelete('删除标签', `确定要删除膳食标签“${tag.name}”吗？`, () => {
      setTags(tags.filter((t) => t.id !== tag.id));
      onNotice('标签已删除');
    });
  };

  const renderHeaderTitle = (title: string) => (
    <div className="flex items-center space-x-2.5 pb-2">
      <span className="w-1.5 h-5 bg-[#10b981] rounded-full"></span>
      <h1 className="text-sm font-bold text-gray-800">{title}</h1>
    </div>
  );

  // 1. RECIPES LIST PAGE
  if (subPageId === 'ops_diet_recipes') {
    return (
      <div className="p-6 max-w-[1600px] mx-auto text-xs space-y-6">
        {/* Search & Filter bar */}
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-4">
          {renderHeaderTitle('食谱管理')}
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <div className="flex items-center space-x-2">
              <span className="text-gray-500 font-medium">状态</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-200 rounded-md px-3 py-1.5 bg-white text-gray-700 focus:outline-none focus:border-[#10b981]"
              >
                <option value="全部">全部状态</option>
                <option value="已发布">已发布</option>
                <option value="草稿">草稿</option>
                <option value="已下架">已下架</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-gray-500 font-medium">分类</span>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="border border-gray-200 rounded-md px-3 py-1.5 bg-white text-gray-700 focus:outline-none focus:border-[#10b981]"
              >
                <option value="全部">全部分类</option>
                <option value="早餐">早餐</option>
                <option value="午餐">午餐</option>
                <option value="晚餐">晚餐</option>
                <option value="降压餐">降压餐</option>
                <option value="减脂餐">减脂餐</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-gray-500 font-medium">更新时间</span>
              <div className="flex items-center space-x-1.5 border border-gray-200 rounded-md px-3 py-1.5 bg-white">
                <input
                  type="date"
                  value={dateStart}
                  onChange={(e) => setDateStart(e.target.value)}
                  className="focus:outline-none text-gray-700 text-xs"
                />
                <span className="text-gray-400">~</span>
                <input
                  type="date"
                  value={dateEnd}
                  onChange={(e) => setDateEnd(e.target.value)}
                  className="focus:outline-none text-gray-700 text-xs"
                />
                <Calendar className="w-3.5 h-3.5 text-gray-400" />
              </div>
            </div>

            <div className="flex items-center space-x-2 min-w-[240px]">
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="请输入关键字/菜谱名称"
                className="flex-1 px-3 py-1.5 border border-gray-200 rounded-md text-gray-700 focus:outline-none focus:border-[#10b981]"
              />
              <button
                onClick={() => onNotice(`查询到 ${filteredRecipes.length} 项食谱`)}
                className="p-2 bg-[#10b981] hover:bg-[#059669] text-white rounded-md transition-colors shrink-0"
              >
                <Search className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setKeyword('');
                  setStatusFilter('全部');
                  setCategoryFilter('全部');
                  setDateStart('');
                  setDateEnd('');
                  onNotice('重置筛选');
                }}
                className="p-2 border border-gray-200 hover:bg-gray-50 text-gray-500 rounded-md transition-colors shrink-0"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Action bar & Table */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-hidden">
          <div className="p-4 flex items-center justify-between border-b border-gray-100">
            <div className="text-gray-500">共 <span className="text-[#10b981] font-semibold">{filteredRecipes.length}</span> 条食谱数据</div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => handleOpenRecipeModal()}
                className="px-4 py-1.5 bg-[#10b981] hover:bg-[#059669] text-white rounded-md font-medium transition-colors flex items-center space-x-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>新增</span>
              </button>
              <button
                onClick={() => onNotice('勾选批量下架食谱')}
                className="px-4 py-1.5 border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-md font-medium transition-colors"
              >
                批量下架
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 text-gray-600 bg-gray-50/50">
                  <th className="py-3.5 px-4 font-medium w-16">封面</th>
                  <th className="py-3.5 px-4 font-medium">菜谱标题</th>
                  <th className="py-3.5 px-4 font-medium">分类</th>
                  <th className="py-3.5 px-4 font-medium">标签</th>
                  <th className="py-3.5 px-4 font-medium text-center">分享/收藏</th>
                  <th className="py-3.5 px-4 font-medium">更新人</th>
                  <th className="py-3.5 px-4 font-medium">更新时间</th>
                  <th className="py-3.5 px-4 font-medium text-center">状态</th>
                  <th className="py-3.5 px-4 font-medium text-center">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredRecipes.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="py-3.5 px-4">
                      <img
                        src={item.coverImage || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&auto=format&fit=crop&q=80'}
                        alt={item.title}
                        className="w-12 h-12 object-cover rounded-lg border border-gray-100"
                      />
                    </td>
                    <td className="py-3.5 px-4 font-medium text-gray-800">{item.title}</td>
                    <td className="py-3.5 px-4 text-gray-600">{item.category}</td>
                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap gap-1">
                        {item.tags.map((t) => (
                          <span key={t} className="px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded text-[11px]">
                            {t}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-center text-gray-500 font-mono">
                      {item.sharesCount} / {item.collectsCount}
                    </td>
                    <td className="py-3.5 px-4 text-gray-700">{item.updater}</td>
                    <td className="py-3.5 px-4 font-mono text-gray-500 whitespace-nowrap">{item.lastUpdateTime}</td>
                    <td className="py-3.5 px-4 text-center">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          item.status === '已发布'
                            ? 'bg-emerald-100 text-emerald-700'
                            : item.status === '草稿'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-gray-100 text-gray-500'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center space-x-3">
                        <button onClick={() => handleOpenRecipeModal(item)} className="text-blue-600 hover:underline font-medium">
                          编辑
                        </button>
                        <button onClick={() => handleDeleteRecipe(item)} className="text-red-500 hover:underline font-medium">
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

        {/* Modal for Recipe Form matching Screenshot */}
        {recipeModal.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
            <div className="bg-white rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-150">
              {/* Top Header matching screenshot */}
              <div className="px-8 py-5 flex items-center justify-between border-b border-gray-100">
                <div className="flex items-center space-x-2.5">
                  <span className="w-1.5 h-5 bg-[#10b981] rounded-full"></span>
                  <h3 className="text-base font-bold text-gray-800">
                    {recipeModal.isCreate ? '新增菜谱' : '编辑菜谱'}
                  </h3>
                </div>
                <button
                  onClick={() => setRecipeModal({ isOpen: false, item: null, isCreate: false })}
                  className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveRecipe} className="p-8 space-y-6 text-xs max-h-[75vh] overflow-y-auto">
                {/* Recipe Title */}
                <div className="grid grid-cols-12 gap-4 items-center">
                  <label className="col-span-2 text-right text-gray-700 font-medium">
                    菜谱标题 <span className="text-red-500">*</span>
                  </label>
                  <div className="col-span-10">
                    <input
                      type="text"
                      required
                      value={recipeForm.title || ''}
                      onChange={(e) => setRecipeForm({ ...recipeForm, title: e.target.value })}
                      placeholder="请输入"
                      className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#10b981] text-xs"
                    />
                  </div>
                </div>

                {/* Recipe Cover */}
                <div className="grid grid-cols-12 gap-4 items-start">
                  <label className="col-span-2 text-right text-gray-700 font-medium pt-2">
                    菜谱封面 <span className="text-red-500">*</span>
                  </label>
                  <div className="col-span-10 space-y-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-36 h-28 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center text-gray-400 bg-gray-50/50 hover:bg-gray-50 cursor-pointer transition-colors relative group overflow-hidden">
                        {recipeForm.coverImage ? (
                          <img src={recipeForm.coverImage} alt="Cover" className="w-full h-full object-cover" />
                        ) : (
                          <>
                            <Plus className="w-5 h-5 mb-1 text-gray-400 group-hover:text-[#10b981]" />
                            <span className="text-xs text-gray-500 group-hover:text-[#10b981] font-medium">+ 上传图片</span>
                          </>
                        )}
                        <input
                          type="text"
                          value={recipeForm.coverImage || ''}
                          onChange={(e) => setRecipeForm({ ...recipeForm, coverImage: e.target.value })}
                          placeholder="输入图片URL"
                          className="absolute inset-0 opacity-0 cursor-pointer"
                          title="点击输入图片链接"
                        />
                      </div>
                    </div>
                    <p className="text-[11px] text-gray-400">
                      支持jpg, png等格式文件上传，文件大小不超过10MB
                    </p>
                  </div>
                </div>

                {/* Tags & Category */}
                <div className="grid grid-cols-12 gap-4 items-center">
                  <label className="col-span-2 text-right text-gray-700 font-medium">
                    标签 <span className="text-red-500">*</span>
                  </label>
                  <div className="col-span-4">
                    <select
                      value={recipeForm.tags?.[0] || ''}
                      onChange={(e) => setRecipeForm({ ...recipeForm, tags: [e.target.value] })}
                      className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-[#10b981] text-xs text-gray-700"
                    >
                      <option value="">请选择</option>
                      {tags.map((t) => (
                        <option key={t.id} value={t.name}>{t.name}</option>
                      ))}
                    </select>
                  </div>

                  <label className="col-span-2 text-right text-gray-700 font-medium">
                    分类 <span className="text-red-500">*</span>
                  </label>
                  <div className="col-span-4">
                    <select
                      value={recipeForm.category || ''}
                      onChange={(e) => setRecipeForm({ ...recipeForm, category: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-[#10b981] text-xs text-gray-700"
                    >
                      <option value="">请选择</option>
                      <option value="早餐">早餐</option>
                      <option value="午餐">午餐</option>
                      <option value="晚餐">晚餐</option>
                      <option value="降压餐">降压餐</option>
                      <option value="减脂餐">减脂餐</option>
                    </select>
                  </div>
                </div>

                {/* Publish Time */}
                <div className="grid grid-cols-12 gap-4 items-start">
                  <label className="col-span-2 text-right text-gray-700 font-medium pt-1">
                    发布时间
                  </label>
                  <div className="col-span-10 space-y-3">
                    <div className="flex items-center space-x-6">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="publishType"
                          checked={recipeForm.publishType === '立即发布' || !recipeForm.publishType}
                          onChange={() => setRecipeForm({ ...recipeForm, publishType: '立即发布' })}
                          className="text-[#10b981] focus:ring-[#10b981] accent-[#10b981]"
                        />
                        <span className="text-gray-700 font-medium">立即发布</span>
                      </label>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="publishType"
                          checked={recipeForm.publishType === '定时发布'}
                          onChange={() => setRecipeForm({ ...recipeForm, publishType: '定时发布' })}
                          className="text-[#10b981] focus:ring-[#10b981] accent-[#10b981]"
                        />
                        <span className="text-gray-700 font-medium">定时发布</span>
                      </label>
                    </div>

                    {recipeForm.publishType === '定时发布' && (
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2 border border-gray-200 rounded-lg px-3 py-2 bg-white w-56">
                          <input
                            type="date"
                            value={recipeForm.scheduledDate || ''}
                            onChange={(e) => setRecipeForm({ ...recipeForm, scheduledDate: e.target.value })}
                            className="w-full focus:outline-none text-xs text-gray-700"
                          />
                          <Calendar className="w-4 h-4 text-gray-400 shrink-0" />
                        </div>
                        <div className="flex items-center space-x-2 border border-gray-200 rounded-lg px-3 py-2 bg-white w-32">
                          <input
                            type="text"
                            value={recipeForm.scheduledTime || '12 : 00'}
                            onChange={(e) => setRecipeForm({ ...recipeForm, scheduledTime: e.target.value })}
                            className="w-full focus:outline-none text-xs text-gray-700 font-mono text-center"
                          />
                          <Clock className="w-4 h-4 text-gray-400 shrink-0" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Recipe Details (Rich Text Editor Simulation matching screenshot) */}
                <div className="grid grid-cols-12 gap-4 items-start">
                  <label className="col-span-2 text-right text-gray-700 font-medium pt-2">
                    菜谱详情 <span className="text-red-500">*</span>
                  </label>
                  <div className="col-span-10 border border-gray-200 rounded-xl overflow-hidden bg-white shadow-xs">
                    {/* Toolbar */}
                    <div className="flex flex-wrap items-center gap-1.5 bg-gray-50/80 border-b border-gray-200 px-3 py-2.5 text-gray-600 text-sm">
                      <button type="button" className="p-1 hover:bg-gray-200 rounded font-bold" title="标题">H</button>
                      <button type="button" className="p-1 hover:bg-gray-200 rounded font-bold" title="加粗">B</button>
                      <button type="button" className="p-1 hover:bg-gray-200 rounded font-bold" title="字号">T</button>
                      <button type="button" className="p-1 hover:bg-gray-200 rounded line-through" title="删除线">S</button>
                      <button type="button" className="p-1 hover:bg-gray-200 rounded italic" title="斜体">I</button>
                      <button type="button" className="p-1 hover:bg-gray-200 rounded underline" title="下划线">U</button>
                      <button type="button" className="p-1 hover:bg-gray-200 rounded" title="文本颜色">A</button>
                      <span className="w-px h-4 bg-gray-300 mx-1"></span>
                      <button type="button" className="p-1 hover:bg-gray-200 rounded" title="超链接">🔗</button>
                      <button type="button" className="p-1 hover:bg-gray-200 rounded" title="列表">≡</button>
                      <button type="button" className="p-1 hover:bg-gray-200 rounded" title="对齐">≣</button>
                      <button type="button" className="p-1 hover:bg-gray-200 rounded" title="引用">“</button>
                      <button type="button" className="p-1 hover:bg-gray-200 rounded" title="表情">☺</button>
                      <button type="button" className="p-1 hover:bg-gray-200 rounded" title="插入图片">🖼</button>
                      <button type="button" className="p-1 hover:bg-gray-200 rounded" title="表格">⊞</button>
                      <button type="button" className="p-1 hover:bg-gray-200 rounded" title="视频">▶</button>
                      <button type="button" className="p-1 hover:bg-gray-200 rounded" title="源码">&gt;_</button>
                      <span className="w-px h-4 bg-gray-300 mx-1"></span>
                      <button type="button" className="p-1 hover:bg-gray-200 rounded" title="撤销">↩</button>
                      <button type="button" className="p-1 hover:bg-gray-200 rounded" title="重做">↪</button>
                    </div>
                    <textarea
                      rows={8}
                      value={recipeForm.detailHtml || ''}
                      onChange={(e) => setRecipeForm({ ...recipeForm, detailHtml: e.target.value })}
                      placeholder="请输入菜谱详情及营养说明..."
                      className="w-full p-4 focus:outline-none text-xs text-gray-800 leading-relaxed resize-y"
                    />
                  </div>
                </div>

                {/* Form Buttons */}
                <div className="pt-5 flex items-center justify-end space-x-3 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setRecipeModal({ isOpen: false, item: null, isCreate: false })}
                    className="px-5 py-2 border border-gray-200 hover:bg-gray-50 text-gray-600 rounded-lg text-xs font-medium"
                  >
                    取消
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-[#10b981] hover:bg-[#059669] text-white rounded-lg text-xs font-medium shadow-sm transition-colors"
                  >
                    保存
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  // 2. DIET TAGS PAGE
  return (
    <div className="p-6 max-w-[1600px] mx-auto text-xs space-y-6">
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-4">
        {renderHeaderTitle('膳食标签管理')}
        <div className="flex items-center space-x-3 max-w-md">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="请输入标签名称"
            className="flex-1 px-3 py-1.5 border border-gray-200 rounded-md text-gray-700 focus:outline-none focus:border-[#10b981]"
          />
          <button
            onClick={() => onNotice(`搜寻到 ${filteredTags.length} 个膳食标签`)}
            className="p-2 bg-[#10b981] hover:bg-[#059669] text-white rounded-md transition-colors shrink-0"
          >
            <Search className="w-4 h-4" />
          </button>
          <button
            onClick={() => { setKeyword(''); onNotice('重置搜索'); }}
            className="p-2 border border-gray-200 hover:bg-gray-50 text-gray-500 rounded-md transition-colors shrink-0"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-hidden">
        <div className="p-4 flex items-center justify-end space-x-3 border-b border-gray-100">
          <button
            onClick={() => {
              setTagForm({ name: '', status: '启用' });
              setTagModal({ isOpen: true, item: null, isCreate: true });
            }}
            className="px-4 py-1.5 bg-[#10b981] hover:bg-[#059669] text-white rounded-md font-medium transition-colors flex items-center space-x-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>新增标签</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-gray-600 bg-gray-50/50">
                <th className="py-3.5 px-4 font-medium">标签名称</th>
                <th className="py-3.5 px-4 font-medium text-center">关联食谱数</th>
                <th className="py-3.5 px-4 font-medium">更新人</th>
                <th className="py-3.5 px-4 font-medium">更新时间</th>
                <th className="py-3.5 px-4 font-medium text-center">状态</th>
                <th className="py-3.5 px-4 font-medium text-center">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredTags.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/60 transition-colors">
                  <td className="py-3.5 px-4 font-medium text-gray-800">{item.name}</td>
                  <td className="py-3.5 px-4 text-center font-mono text-gray-600">{item.recipeCount}</td>
                  <td className="py-3.5 px-4 text-gray-700">{item.updater}</td>
                  <td className="py-3.5 px-4 font-mono text-gray-500 whitespace-nowrap">{item.lastUpdateTime}</td>
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => handleToggleTagStatus(item)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                        item.status === '启用' ? 'bg-[#10b981] text-white' : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {item.status}
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <div className="flex items-center justify-center space-x-3">
                      <button
                        onClick={() => {
                          setTagForm({ name: item.name, status: item.status });
                          setTagModal({ isOpen: true, item, isCreate: false });
                        }}
                        className="text-blue-600 hover:underline font-medium"
                      >
                        编辑
                      </button>
                      <button onClick={() => handleDeleteTag(item)} className="text-red-500 hover:underline font-medium">
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

      {/* Tag Modal */}
      {tagModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-xl w-full max-w-sm overflow-hidden shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100">
              <h3 className="text-sm font-semibold text-gray-800">
                {tagModal.isCreate ? '新增标签' : '编辑标签'}
              </h3>
              <button
                onClick={() => setTagModal({ isOpen: false, item: null, isCreate: false })}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveTag} className="p-6 space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-gray-600 font-medium">标签名称 <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  required
                  value={tagForm.name}
                  onChange={(e) => setTagForm({ ...tagForm, name: e.target.value })}
                  placeholder="如：低盐"
                  className="w-full px-3 py-1.5 border border-gray-200 rounded-md focus:outline-none focus:border-[#10b981]"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-600 font-medium">状态</span>
                <button
                  type="button"
                  onClick={() => setTagForm({ ...tagForm, status: tagForm.status === '启用' ? '禁用' : '启用' })}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    tagForm.status === '启用' ? 'bg-[#10b981] text-white' : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {tagForm.status}
                </button>
              </div>

              <div className="pt-4 flex items-center justify-end space-x-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setTagModal({ isOpen: false, item: null, isCreate: false })}
                  className="px-4 py-1.5 border border-gray-200 hover:bg-gray-50 text-gray-600 rounded-md"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-5 py-1.5 bg-[#10b981] hover:bg-[#059669] text-white rounded-md font-medium"
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
};
