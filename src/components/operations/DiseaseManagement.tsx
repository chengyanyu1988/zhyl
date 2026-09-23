import React, { useState, useMemo } from 'react';
import { Search, RotateCcw, Plus, X, Calendar } from 'lucide-react';
import { SubPageId, DiseaseItem, DiseaseCategoryItem } from '../../types';

interface DiseaseManagementProps {
  subPageId: SubPageId;
  onNotice: (msg: string) => void;
  onConfirmDelete: (title: string, message: string, onConfirm: () => void) => void;
}

const INITIAL_DISEASES: DiseaseItem[] = [
  {
    id: 'DIS_001',
    name: '胃溃疡',
    category: '消化内科',
    sharesCount: 100,
    collectsCount: 35,
    status: '已发布',
    updater: '李明明',
    lastUpdateTime: '2026-09-17 10:09:09',
    intro: '胃粘膜被胃酸和胃蛋白酶消化形成的炎性缺损。',
    symptoms: '胃痛、腹胀、反酸、嗳气、食欲减退。',
    complications: '胃出血、胃穿孔、幽门梗阻。',
    treatments: '抑酸剂、胃粘膜保护剂、幽门螺杆菌根除治疗。',
  },
  {
    id: 'DIS_002',
    name: '原发性高血压',
    category: '心血管内科',
    sharesCount: 240,
    collectsCount: 82,
    status: '已发布',
    updater: '陈医生',
    lastUpdateTime: '2026-09-16 15:20:00',
    intro: '以体循环动脉血压增高为主要特征的常见慢性病。',
    symptoms: '头晕、头痛、心悸、耳鸣、后颈部不适。',
    complications: '脑卒中、冠心病、肾功能衰竭。',
    treatments: '低盐饮食、规律运动、长效降压药长期规范服用。',
  },
  {
    id: 'DIS_003',
    name: '原发性骨质疏松症',
    category: '骨科',
    sharesCount: 180,
    collectsCount: 56,
    status: '已发布',
    updater: '李明明',
    lastUpdateTime: '2026-09-14 11:10:00',
    intro: '骨量减少、骨微结构破坏，导致骨脆性增加易发生骨折。',
    symptoms: '腰背疼痛、身高缩短、驼背、轻微碰撞易发生骨折。',
    complications: '髋部骨折、脊柱压缩性骨折。',
    treatments: '补充钙剂与维生素D、抗骨吸收药物治疗。',
  },
  {
    id: 'DIS_004',
    name: '2型糖尿病',
    category: '普通内科',
    sharesCount: 310,
    collectsCount: 120,
    status: '已发布',
    updater: '张主任',
    lastUpdateTime: '2026-09-11 09:30:00',
    intro: '胰岛素抵抗和胰岛素分泌相对不足引起的代谢性疾病。',
    symptoms: '多饮、多食、多尿、体重减轻、疲乏无力。',
    complications: '糖尿病视网膜病变、糖尿病足、肾病。',
    treatments: '饮食控制、适量运动、口服降糖药或胰岛素注射。',
  },
  {
    id: 'DIS_005',
    name: '脑卒中（中风恢复期）',
    category: '神经内科',
    sharesCount: 130,
    collectsCount: 45,
    status: '已发布',
    updater: '李明明',
    lastUpdateTime: '2026-09-07 14:00:00',
    intro: '急性脑血液循环障碍导致的局部脑功能缺陷。',
    symptoms: '肢体偏瘫、口眼歪斜、言语不清、吞咽困难。',
    complications: '肺部感染、下肢静脉血栓、关节挛缩。',
    treatments: '早期康复训练、二级预防用药、心理疏导。',
  },
  {
    id: 'DIS_006',
    name: '慢性阻塞性肺疾病（慢阻肺）',
    category: '普通内科',
    sharesCount: 95,
    collectsCount: 28,
    status: '草稿',
    updater: '王医师',
    lastUpdateTime: '2026-09-03 16:15:00',
    intro: '一种具有气流受限特征的可以预防和治疗的疾病。',
    symptoms: '慢性咳嗽、咳痰、气短或呼吸困难。',
    complications: '慢性肺源性心脏病、呼吸衰竭。',
    treatments: '戒烟、吸入支气管舒张剂、呼吸功能锻炼。',
  },
];

const INITIAL_CATS: DiseaseCategoryItem[] = [
  {
    id: 'DCAT_008',
    sortOrder: 8,
    name: '儿科',
    diseaseCount: 100,
    updater: '李明明',
    lastUpdateTime: '2026-09-18 10:09:09',
    status: '启用',
  },
  {
    id: 'DCAT_007',
    sortOrder: 7,
    name: '妇产科',
    diseaseCount: 100,
    updater: '李明明',
    lastUpdateTime: '2026-09-17 16:20:00',
    status: '启用',
  },
  {
    id: 'DCAT_006',
    sortOrder: 6,
    name: '普通内科',
    diseaseCount: 100,
    updater: '李明明',
    lastUpdateTime: '2026-09-15 14:00:00',
    status: '启用',
  },
  {
    id: 'DCAT_005',
    sortOrder: 5,
    name: '皮肤科',
    diseaseCount: 100,
    updater: '李明明',
    lastUpdateTime: '2026-09-12 11:30:00',
    status: '启用',
  },
  {
    id: 'DCAT_004',
    sortOrder: 4,
    name: '消化内科',
    diseaseCount: 100,
    updater: '李明明',
    lastUpdateTime: '2026-09-09 09:15:00',
    status: '启用',
  },
  {
    id: 'DCAT_003',
    sortOrder: 3,
    name: '神经内科',
    diseaseCount: 100,
    updater: '李明明',
    lastUpdateTime: '2026-09-06 15:40:00',
    status: '启用',
  },
  {
    id: 'DCAT_002',
    sortOrder: 2,
    name: '骨科',
    diseaseCount: 100,
    updater: '李明明',
    lastUpdateTime: '2026-09-04 10:00:00',
    status: '启用',
  },
  {
    id: 'DCAT_001',
    sortOrder: 1,
    name: '心血管内科',
    diseaseCount: 100,
    updater: '李明明',
    lastUpdateTime: '2026-09-02 13:20:00',
    status: '启用',
  },
];

export const DiseaseManagement: React.FC<DiseaseManagementProps> = ({
  subPageId,
  onNotice,
  onConfirmDelete,
}) => {
  const [diseases, setDiseases] = useState<DiseaseItem[]>(INITIAL_DISEASES);
  const [categories, setCategories] = useState<DiseaseCategoryItem[]>(INITIAL_CATS);

  // Filters
  const [keyword, setKeyword] = useState('');
  const [statusFilter, setStatusFilter] = useState('全部');
  const [categoryFilter, setCategoryFilter] = useState('全部');
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');

  // Modals
  const [diseaseModal, setDiseaseModal] = useState<{
    isOpen: boolean;
    item: DiseaseItem | null;
    isCreate: boolean;
  }>({ isOpen: false, item: null, isCreate: false });

  const [diseaseForm, setDiseaseForm] = useState<Partial<DiseaseItem>>({
    name: '',
    category: '消化内科',
    status: '已发布',
    intro: '',
    symptoms: '',
    complications: '',
    treatments: '',
  });

  const [catModal, setCatModal] = useState<{
    isOpen: boolean;
    item: DiseaseCategoryItem | null;
    isCreate: boolean;
  }>({ isOpen: false, item: null, isCreate: false });

  const [catForm, setCatForm] = useState<{ name: string; sortOrder: number; status: '启用' | '禁用' }>({
    name: '',
    sortOrder: 1,
    status: '启用',
  });

  const filteredDiseases = useMemo(() => {
    let list = [...diseases];
    if (statusFilter !== '全部') list = list.filter((d) => d.status === statusFilter);
    if (categoryFilter !== '全部') list = list.filter((d) => d.category === categoryFilter);
    if (keyword) {
      const k = keyword.toLowerCase();
      list = list.filter((d) => d.name.toLowerCase().includes(k) || (d.intro && d.intro.toLowerCase().includes(k)));
    }
    return list.sort((a, b) => b.lastUpdateTime.localeCompare(a.lastUpdateTime));
  }, [diseases, statusFilter, categoryFilter, keyword]);

  const filteredCats = useMemo(() => {
    let list = [...categories];
    if (keyword) {
      const k = keyword.toLowerCase();
      list = list.filter((c) => c.name.toLowerCase().includes(k));
    }
    return list.sort((a, b) => b.sortOrder - a.sortOrder);
  }, [categories, keyword]);

  const handleOpenDiseaseModal = (item?: DiseaseItem) => {
    if (item) {
      setDiseaseForm({ ...item });
      setDiseaseModal({ isOpen: true, item, isCreate: false });
    } else {
      setDiseaseForm({
        name: '',
        category: '消化内科',
        status: '已发布',
        intro: '',
        symptoms: '',
        complications: '',
        treatments: '',
      });
      setDiseaseModal({ isOpen: true, item: null, isCreate: true });
    }
  };

  const handleSaveDisease = (e: React.FormEvent) => {
    e.preventDefault();
    if (!diseaseForm.name) {
      onNotice('请输入疾病名称');
      return;
    }
    if (diseaseModal.isCreate) {
      const newItem: DiseaseItem = {
        id: 'DIS_' + Date.now(),
        name: diseaseForm.name || '',
        category: diseaseForm.category || '消化内科',
        sharesCount: 0,
        collectsCount: 0,
        status: (diseaseForm.status as any) || '已发布',
        updater: '管理员',
        lastUpdateTime: '2026-09-19 16:30:00',
        intro: diseaseForm.intro,
        symptoms: diseaseForm.symptoms,
        complications: diseaseForm.complications,
        treatments: diseaseForm.treatments,
      };
      setDiseases([newItem, ...diseases]);
      onNotice('已新增疾病数据');
    } else if (diseaseModal.item) {
      setDiseases(
        diseases.map((d) =>
          d.id === diseaseModal.item!.id ? { ...d, ...diseaseForm, lastUpdateTime: '2026-09-19 16:30:00' } : d
        )
      );
      onNotice('疾病条目已被修改');
    }
    setDiseaseModal({ isOpen: false, item: null, isCreate: false });
  };

  const handleDeleteDisease = (item: DiseaseItem) => {
    onConfirmDelete('删除疾病', `确定要删除“${item.name}”条目吗？`, () => {
      setDiseases(diseases.filter((d) => d.id !== item.id));
      onNotice('疾病条目已删除');
    });
  };

  const handleSaveCat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!catForm.name) {
      onNotice('请输入分类名称');
      return;
    }
    if (catModal.isCreate) {
      const newCat: DiseaseCategoryItem = {
        id: 'DCAT_' + Date.now(),
        sortOrder: catForm.sortOrder,
        name: catForm.name,
        diseaseCount: 0,
        updater: '管理员',
        lastUpdateTime: '2026-09-19 16:00:00',
        status: catForm.status,
      };
      setCategories([newCat, ...categories]);
      onNotice('已新增疾病分类');
    } else if (catModal.item) {
      setCategories(
        categories.map((c) =>
          c.id === catModal.item!.id
            ? { ...c, name: catForm.name, sortOrder: catForm.sortOrder, status: catForm.status, lastUpdateTime: '2026-09-19 16:00:00' }
            : c
        )
      );
      onNotice('分类设定已更新');
    }
    setCatModal({ isOpen: false, item: null, isCreate: false });
  };

  const handleToggleCatStatus = (cat: DiseaseCategoryItem) => {
    const next = cat.status === '启用' ? '禁用' : '启用';
    setCategories(categories.map((c) => (c.id === cat.id ? { ...c, status: next } : c)));
    onNotice(`分类“${cat.name}”设为：${next}`);
  };

  const handleDeleteCat = (cat: DiseaseCategoryItem) => {
    onConfirmDelete('删除分类', `确定要删除分类“${cat.name}”吗？`, () => {
      setCategories(categories.filter((c) => c.id !== cat.id));
      onNotice('分类已删除');
    });
  };

  const renderHeaderTitle = (title: string) => (
    <div className="flex items-center space-x-2.5 pb-2">
      <span className="w-1 h-4 bg-[#10b981] rounded-full"></span>
      <h1 className="text-sm font-semibold text-gray-800">{title}</h1>
    </div>
  );

  if (subPageId === 'ops_disease_list') {
    return (
      <div className="p-6 max-w-[1600px] mx-auto text-xs space-y-6">
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-4">
          {renderHeaderTitle('疾病管理')}
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
                <option value="心血管内科">心血管内科</option>
                <option value="消化内科">消化内科</option>
                <option value="骨科">骨科</option>
                <option value="神经内科">神经内科</option>
                <option value="普通内科">普通内科</option>
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
                placeholder="请输入疾病名称/症状"
                className="flex-1 px-3 py-1.5 border border-gray-200 rounded-md text-gray-700 focus:outline-none focus:border-[#10b981]"
              />
              <button
                onClick={() => onNotice(`检索到 ${filteredDiseases.length} 个疾病条目`)}
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
                  onNotice('已重置');
                }}
                className="p-2 border border-gray-200 hover:bg-gray-50 text-gray-500 rounded-md transition-colors shrink-0"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-hidden">
          <div className="p-4 flex items-center justify-between border-b border-gray-100">
            <div className="text-gray-500">共 <span className="text-[#10b981] font-semibold">{filteredDiseases.length}</span> 个疾病记录</div>
            <button
              onClick={() => handleOpenDiseaseModal()}
              className="px-4 py-1.5 bg-[#10b981] hover:bg-[#059669] text-white rounded-md font-medium transition-colors flex items-center space-x-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>新增疾病</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 text-gray-600 bg-gray-50/50">
                  <th className="py-3.5 px-4 font-medium">疾病名称</th>
                  <th className="py-3.5 px-4 font-medium">所属分类</th>
                  <th className="py-3.5 px-4 font-medium">常见症状与表现</th>
                  <th className="py-3.5 px-4 font-medium text-center">分享/收藏</th>
                  <th className="py-3.5 px-4 font-medium">更新人</th>
                  <th className="py-3.5 px-4 font-medium">更新时间</th>
                  <th className="py-3.5 px-4 font-medium text-center">状态</th>
                  <th className="py-3.5 px-4 font-medium text-center">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredDiseases.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="py-3.5 px-4 font-medium text-gray-800">{item.name}</td>
                    <td className="py-3.5 px-4 text-gray-600">{item.category}</td>
                    <td className="py-3.5 px-4 text-gray-500 max-w-xs truncate">{item.symptoms || '-'}</td>
                    <td className="py-3.5 px-4 text-center font-mono text-gray-500">
                      {item.sharesCount} / {item.collectsCount}
                    </td>
                    <td className="py-3.5 px-4 text-gray-700">{item.updater}</td>
                    <td className="py-3.5 px-4 font-mono text-gray-500 whitespace-nowrap">{item.lastUpdateTime}</td>
                    <td className="py-3.5 px-4 text-center">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          item.status === '已发布' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center space-x-3">
                        <button onClick={() => handleOpenDiseaseModal(item)} className="text-blue-600 hover:underline font-medium">
                          编辑
                        </button>
                        <button onClick={() => handleDeleteDisease(item)} className="text-red-500 hover:underline font-medium">
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

        {/* Modal for Disease */}
        {diseaseModal.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs">
            <div className="bg-white rounded-xl w-full max-w-lg overflow-hidden shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100">
                <h3 className="text-sm font-semibold text-gray-800">
                  {diseaseModal.isCreate ? '新增疾病条目' : '编辑疾病条目'}
                </h3>
                <button
                  onClick={() => setDiseaseModal({ isOpen: false, item: null, isCreate: false })}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveDisease} className="p-6 space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-gray-600 font-medium">疾病名称 <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      required
                      value={diseaseForm.name || ''}
                      onChange={(e) => setDiseaseForm({ ...diseaseForm, name: e.target.value })}
                      placeholder="如：胃溃疡"
                      className="w-full px-3 py-1.5 border border-gray-200 rounded-md focus:outline-none focus:border-[#10b981]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-gray-600 font-medium">科室分类</label>
                    <select
                      value={diseaseForm.category || '消化内科'}
                      onChange={(e) => setDiseaseForm({ ...diseaseForm, category: e.target.value })}
                      className="w-full px-3 py-1.5 border border-gray-200 rounded-md bg-white focus:outline-none focus:border-[#10b981]"
                    >
                      <option value="消化内科">消化内科</option>
                      <option value="心血管内科">心血管内科</option>
                      <option value="骨科">骨科</option>
                      <option value="神经内科">神经内科</option>
                      <option value="普通内科">普通内科</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-gray-600 font-medium">疾病简介</label>
                  <textarea
                    rows={2}
                    value={diseaseForm.intro || ''}
                    onChange={(e) => setDiseaseForm({ ...diseaseForm, intro: e.target.value })}
                    className="w-full px-3 py-1.5 border border-gray-200 rounded-md focus:outline-none focus:border-[#10b981]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-gray-600 font-medium">常见症状</label>
                  <textarea
                    rows={2}
                    value={diseaseForm.symptoms || ''}
                    onChange={(e) => setDiseaseForm({ ...diseaseForm, symptoms: e.target.value })}
                    className="w-full px-3 py-1.5 border border-gray-200 rounded-md focus:outline-none focus:border-[#10b981]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-gray-600 font-medium">主要治疗方案</label>
                  <textarea
                    rows={2}
                    value={diseaseForm.treatments || ''}
                    onChange={(e) => setDiseaseForm({ ...diseaseForm, treatments: e.target.value })}
                    className="w-full px-3 py-1.5 border border-gray-200 rounded-md focus:outline-none focus:border-[#10b981]"
                  />
                </div>

                <div className="pt-4 flex items-center justify-end space-x-3 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setDiseaseModal({ isOpen: false, item: null, isCreate: false })}
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
  }

  // DISEASE CATEGORIES PAGE
  return (
    <div className="p-6 max-w-[1600px] mx-auto text-xs space-y-6">
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-4">
        {renderHeaderTitle('疾病分类管理')}
        <div className="flex items-center space-x-3 max-w-md">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="请输入分类名称"
            className="flex-1 px-3 py-1.5 border border-gray-200 rounded-md text-gray-700 focus:outline-none focus:border-[#10b981]"
          />
          <button
            onClick={() => onNotice(`找到 ${filteredCats.length} 个分类`)}
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
        <div className="p-4 flex items-center justify-end border-b border-gray-100">
          <button
            onClick={() => {
              setCatForm({ name: '', sortOrder: filteredCats.length + 1, status: '启用' });
              setCatModal({ isOpen: true, item: null, isCreate: true });
            }}
            className="px-4 py-1.5 bg-[#10b981] hover:bg-[#059669] text-white rounded-md font-medium transition-colors flex items-center space-x-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>新增分类</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-gray-600 bg-gray-50/50">
                <th className="py-3.5 px-4 font-medium w-16">序号</th>
                <th className="py-3.5 px-4 font-medium">分类名称</th>
                <th className="py-3.5 px-4 font-medium text-center">疾病条目数</th>
                <th className="py-3.5 px-4 font-medium">更新人</th>
                <th className="py-3.5 px-4 font-medium">更新时间</th>
                <th className="py-3.5 px-4 font-medium text-center">状态</th>
                <th className="py-3.5 px-4 font-medium text-center">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredCats.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/60 transition-colors">
                  <td className="py-3.5 px-4 font-mono text-gray-500">{item.sortOrder}</td>
                  <td className="py-3.5 px-4 font-medium text-gray-800">{item.name}</td>
                  <td className="py-3.5 px-4 text-center font-mono text-gray-600">{item.diseaseCount}</td>
                  <td className="py-3.5 px-4 text-gray-700">{item.updater}</td>
                  <td className="py-3.5 px-4 font-mono text-gray-500 whitespace-nowrap">{item.lastUpdateTime}</td>
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => handleToggleCatStatus(item)}
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
                          setCatForm({ name: item.name, sortOrder: item.sortOrder, status: item.status });
                          setCatModal({ isOpen: true, item, isCreate: false });
                        }}
                        className="text-blue-600 hover:underline font-medium"
                      >
                        编辑
                      </button>
                      <button onClick={() => handleDeleteCat(item)} className="text-red-500 hover:underline font-medium">
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

      {/* Cat Modal */}
      {catModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-xl w-full max-w-sm overflow-hidden shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100">
              <h3 className="text-sm font-semibold text-gray-800">
                {catModal.isCreate ? '新增分类' : '编辑分类'}
              </h3>
              <button
                onClick={() => setCatModal({ isOpen: false, item: null, isCreate: false })}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveCat} className="p-6 space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-gray-600 font-medium">分类名称 <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  required
                  value={catForm.name}
                  onChange={(e) => setCatForm({ ...catForm, name: e.target.value })}
                  placeholder="如：消化内科"
                  className="w-full px-3 py-1.5 border border-gray-200 rounded-md focus:outline-none focus:border-[#10b981]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-gray-600 font-medium">序号 (数字越大越靠前)</label>
                <input
                  type="number"
                  value={catForm.sortOrder}
                  onChange={(e) => setCatForm({ ...catForm, sortOrder: Number(e.target.value) })}
                  className="w-full px-3 py-1.5 border border-gray-200 rounded-md focus:outline-none focus:border-[#10b981]"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-600 font-medium">状态</span>
                <button
                  type="button"
                  onClick={() => setCatForm({ ...catForm, status: catForm.status === '启用' ? '禁用' : '启用' })}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    catForm.status === '启用' ? 'bg-[#10b981] text-white' : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {catForm.status}
                </button>
              </div>

              <div className="pt-4 flex items-center justify-end space-x-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setCatModal({ isOpen: false, item: null, isCreate: false })}
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
