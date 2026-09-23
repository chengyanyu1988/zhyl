import React, { useState, useMemo } from 'react';
import { Search, RotateCcw, Plus, X, Calendar, Phone, MapPin } from 'lucide-react';
import { SubPageId, InstitutionItem, InstitutionTagItem } from '../../types';

interface InstitutionManagementProps {
  subPageId: SubPageId;
  onNotice: (msg: string) => void;
  onConfirmDelete: (title: string, message: string, onConfirm: () => void) => void;
}

const INITIAL_INSTITUTIONS: InstitutionItem[] = [
  {
    id: 'INST_001',
    name: '金慧福养老机构（朝阳店）',
    featureTags: ['24h监护', '特殊护理', '日间照料'],
    sharesCount: 100,
    collectsCount: 35,
    status: '已发布',
    updater: '李明明',
    lastUpdateTime: '2026-09-19 10:09:09',
    coverImage: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=200&auto=format&fit=crop&q=80',
    businessHours: '08:00 - 20:00',
    address: '北京市朝阳区北苑路88号院',
    phone: '010-88886666',
    detailHtml: '<p>拥有专业护理团队与现代化生活娱乐设施，为高龄长者提供舒适温馨的养护家园。</p>',
  },
  {
    id: 'INST_002',
    name: '泰康之家·燕园高级养老社区',
    featureTags: ['医养结合', '康复训练', '24h监护'],
    sharesCount: 180,
    collectsCount: 62,
    status: '已发布',
    updater: '张主管',
    lastUpdateTime: '2026-09-17 15:30:00',
    coverImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=200&auto=format&fit=crop&q=80',
    businessHours: '24小时全天候',
    address: '北京市昌平区南头村泰康路1号',
    phone: '010-66778899',
    detailHtml: '<p>大规模、全功能、医养结合的高品质养老社区，配有二级康复医院。</p>',
  },
  {
    id: 'INST_003',
    name: '亲和源老年公寓（浦东店）',
    featureTags: ['日间照料', '心理疏导'],
    sharesCount: 125,
    collectsCount: 41,
    status: '已发布',
    updater: '李明明',
    lastUpdateTime: '2026-09-14 09:40:00',
    coverImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=200&auto=format&fit=crop&q=80',
    businessHours: '08:00 - 18:00',
    address: '上海市浦东新区秀浦路2555号',
    phone: '021-55443322',
    detailHtml: '<p>以会员制为特色的老年社群公寓，丰富文娱活动与居家式照料服务。</p>',
  },
  {
    id: 'INST_004',
    name: '松堂关怀医院与护理院',
    featureTags: ['临终关怀', '特殊护理'],
    sharesCount: 90,
    collectsCount: 28,
    status: '已发布',
    updater: '王主管',
    lastUpdateTime: '2026-09-10 11:15:00',
    coverImage: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=200&auto=format&fit=crop&q=80',
    businessHours: '24小时全天候',
    address: '北京市朝阳区管庄东里',
    phone: '010-51234567',
    detailHtml: '<p>国内首家临终关怀医院，注重尊严与舒缓疗护。</p>',
  },
  {
    id: 'INST_005',
    name: '乐成养老·双井恭和苑',
    featureTags: ['认知症照护', '24h监护'],
    sharesCount: 150,
    collectsCount: 55,
    status: '已发布',
    updater: '李明明',
    lastUpdateTime: '2026-09-05 16:00:00',
    coverImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=200&auto=format&fit=crop&q=80',
    businessHours: '24小时全天候',
    address: '北京市朝阳区双井广渠门外大街1号',
    phone: '010-87654321',
    detailHtml: '<p>直营连锁高品质养老机构，专注于失能失智长者的精细化照护。</p>',
  },
];

const INITIAL_TAGS: InstitutionTagItem[] = [
  {
    id: 'ITAG_001',
    name: '24小时监护',
    institutionCount: 500,
    updater: '李明明',
    lastUpdateTime: '2026-09-18 10:09:09',
    status: '启用',
  },
  {
    id: 'ITAG_002',
    name: '特殊护理',
    institutionCount: 380,
    updater: '李明明',
    lastUpdateTime: '2026-09-16 14:30:00',
    status: '启用',
  },
  {
    id: 'ITAG_003',
    name: '康复训练',
    institutionCount: 290,
    updater: '李明明',
    lastUpdateTime: '2026-09-14 11:00:00',
    status: '启用',
  },
  {
    id: 'ITAG_004',
    name: '临终关怀',
    institutionCount: 150,
    updater: '李明明',
    lastUpdateTime: '2026-09-11 09:20:00',
    status: '启用',
  },
  {
    id: 'ITAG_005',
    name: '认知症照护',
    institutionCount: 220,
    updater: '李明明',
    lastUpdateTime: '2026-09-08 16:45:00',
    status: '启用',
  },
  {
    id: 'ITAG_006',
    name: '日间照料',
    institutionCount: 310,
    updater: '李明明',
    lastUpdateTime: '2026-09-04 10:15:00',
    status: '启用',
  },
];

export const InstitutionManagement: React.FC<InstitutionManagementProps> = ({
  subPageId,
  onNotice,
  onConfirmDelete,
}) => {
  const [institutions, setInstitutions] = useState<InstitutionItem[]>(INITIAL_INSTITUTIONS);
  const [tags, setTags] = useState<InstitutionTagItem[]>(INITIAL_TAGS);

  // Filters
  const [keyword, setKeyword] = useState('');
  const [statusFilter, setStatusFilter] = useState('全部');
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');

  // Modals
  const [instModal, setInstModal] = useState<{
    isOpen: boolean;
    item: InstitutionItem | null;
    isCreate: boolean;
  }>({ isOpen: false, item: null, isCreate: false });

  const [instForm, setInstForm] = useState<Partial<InstitutionItem>>({
    name: '',
    phone: '',
    address: '',
    businessHours: '08:00 - 20:00',
    status: '已发布',
    coverImage: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=200&auto=format&fit=crop&q=80',
    featureTags: ['24h监护'],
  });

  const [tagModal, setTagModal] = useState<{
    isOpen: boolean;
    item: InstitutionTagItem | null;
    isCreate: boolean;
  }>({ isOpen: false, item: null, isCreate: false });

  const [tagForm, setTagForm] = useState<{ name: string; status: '启用' | '禁用' }>({
    name: '',
    status: '启用',
  });

  const filteredInsts = useMemo(() => {
    let list = [...institutions];
    if (statusFilter !== '全部') list = list.filter((i) => i.status === statusFilter);
    if (keyword) {
      const k = keyword.toLowerCase();
      list = list.filter(
        (i) => i.name.toLowerCase().includes(k) || (i.address && i.address.toLowerCase().includes(k))
      );
    }
    return list.sort((a, b) => b.lastUpdateTime.localeCompare(a.lastUpdateTime));
  }, [institutions, statusFilter, keyword]);

  const filteredTags = useMemo(() => {
    let list = [...tags];
    if (keyword) {
      const k = keyword.toLowerCase();
      list = list.filter((t) => t.name.toLowerCase().includes(k));
    }
    return list.sort((a, b) => b.lastUpdateTime.localeCompare(a.lastUpdateTime));
  }, [tags, keyword]);

  const handleOpenInstModal = (item?: InstitutionItem) => {
    if (item) {
      setInstForm({ ...item });
      setInstModal({ isOpen: true, item, isCreate: false });
    } else {
      setInstForm({
        name: '',
        phone: '',
        address: '',
        businessHours: '08:00 - 20:00',
        status: '已发布',
        coverImage: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=200&auto=format&fit=crop&q=80',
        featureTags: ['24h监护', '特殊护理'],
      });
      setInstModal({ isOpen: true, item: null, isCreate: true });
    }
  };

  const handleSaveInst = (e: React.FormEvent) => {
    e.preventDefault();
    if (!instForm.name) {
      onNotice('请输入机构名称');
      return;
    }
    if (instModal.isCreate) {
      const newItem: InstitutionItem = {
        id: 'INST_' + Date.now(),
        name: instForm.name || '',
        featureTags: instForm.featureTags || ['24h监护'],
        sharesCount: 0,
        collectsCount: 0,
        status: (instForm.status as any) || '已发布',
        updater: '管理员',
        lastUpdateTime: '2026-09-19 16:30:00',
        coverImage: instForm.coverImage,
        businessHours: instForm.businessHours,
        address: instForm.address,
        phone: instForm.phone,
      };
      setInstitutions([newItem, ...institutions]);
      onNotice('已新增养老机构');
    } else if (instModal.item) {
      setInstitutions(
        institutions.map((i) =>
          i.id === instModal.item!.id ? { ...i, ...instForm, lastUpdateTime: '2026-09-19 16:30:00' } : i
        )
      );
      onNotice('机构数据已被修改');
    }
    setInstModal({ isOpen: false, item: null, isCreate: false });
  };

  const handleDeleteInst = (item: InstitutionItem) => {
    onConfirmDelete('删除机构', `确定要删除“${item.name}”吗？`, () => {
      setInstitutions(institutions.filter((i) => i.id !== item.id));
      onNotice('机构已删除');
    });
  };

  const handleSaveTag = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tagForm.name) {
      onNotice('请输入标签名称');
      return;
    }
    if (tagModal.isCreate) {
      const newTag: InstitutionTagItem = {
        id: 'ITAG_' + Date.now(),
        name: tagForm.name,
        institutionCount: 0,
        updater: '管理员',
        lastUpdateTime: '2026-09-19 16:00:00',
        status: tagForm.status,
      };
      setTags([newTag, ...tags]);
      onNotice('已新增机构标签');
    } else if (tagModal.item) {
      setTags(
        tags.map((t) =>
          t.id === tagModal.item!.id
            ? { ...t, name: tagForm.name, status: tagForm.status, lastUpdateTime: '2026-09-19 16:00:00' }
            : t
        )
      );
      onNotice('标签设定已修改');
    }
    setTagModal({ isOpen: false, item: null, isCreate: false });
  };

  const handleToggleTagStatus = (tag: InstitutionTagItem) => {
    const next = tag.status === '启用' ? '禁用' : '启用';
    setTags(tags.map((t) => (t.id === tag.id ? { ...t, status: next } : t)));
    onNotice(`标签“${tag.name}”设为：${next}`);
  };

  const handleDeleteTag = (tag: InstitutionTagItem) => {
    onConfirmDelete('删除标签', `确定要删除标签“${tag.name}”吗？`, () => {
      setTags(tags.filter((t) => t.id !== tag.id));
      onNotice('标签已删除');
    });
  };

  const renderHeaderTitle = (title: string) => (
    <div className="flex items-center space-x-2.5 pb-2">
      <span className="w-1 h-4 bg-[#10b981] rounded-full"></span>
      <h1 className="text-sm font-semibold text-gray-800">{title}</h1>
    </div>
  );

  if (subPageId === 'ops_institution_list') {
    return (
      <div className="p-6 max-w-[1600px] mx-auto text-xs space-y-6">
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-4">
          {renderHeaderTitle('机构列表管理')}
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
                placeholder="请输入机构名称/地址"
                className="flex-1 px-3 py-1.5 border border-gray-200 rounded-md text-gray-700 focus:outline-none focus:border-[#10b981]"
              />
              <button
                onClick={() => onNotice(`检索到 ${filteredInsts.length} 家养老机构`)}
                className="p-2 bg-[#10b981] hover:bg-[#059669] text-white rounded-md transition-colors shrink-0"
              >
                <Search className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setKeyword('');
                  setStatusFilter('全部');
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
            <div className="text-gray-500">共 <span className="text-[#10b981] font-semibold">{filteredInsts.length}</span> 家机构数据</div>
            <button
              onClick={() => handleOpenInstModal()}
              className="px-4 py-1.5 bg-[#10b981] hover:bg-[#059669] text-white rounded-md font-medium transition-colors flex items-center space-x-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>新增机构</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 text-gray-600 bg-gray-50/50">
                  <th className="py-3.5 px-4 font-medium w-16">封面</th>
                  <th className="py-3.5 px-4 font-medium">机构名称</th>
                  <th className="py-3.5 px-4 font-medium">特色服务标签</th>
                  <th className="py-3.5 px-4 font-medium">营业时间 / 电话</th>
                  <th className="py-3.5 px-4 font-medium">地址</th>
                  <th className="py-3.5 px-4 font-medium text-center">分享/收藏</th>
                  <th className="py-3.5 px-4 font-medium">更新时间</th>
                  <th className="py-3.5 px-4 font-medium text-center">状态</th>
                  <th className="py-3.5 px-4 font-medium text-center">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredInsts.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="py-3.5 px-4">
                      <img
                        src={item.coverImage}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-lg border border-gray-100"
                      />
                    </td>
                    <td className="py-3.5 px-4 font-medium text-gray-800">{item.name}</td>
                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap gap-1">
                        {item.featureTags.map((t) => (
                          <span key={t} className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-[11px]">
                            {t}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-gray-600 space-y-0.5">
                      <div>{item.businessHours}</div>
                      <div className="text-gray-400 font-mono flex items-center space-x-1">
                        <Phone className="w-3 h-3" />
                        <span>{item.phone}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-gray-600 max-w-xs truncate">{item.address}</td>
                    <td className="py-3.5 px-4 text-center font-mono text-gray-500">
                      {item.sharesCount} / {item.collectsCount}
                    </td>
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
                        <button onClick={() => handleOpenInstModal(item)} className="text-blue-600 hover:underline font-medium">
                          编辑
                        </button>
                        <button onClick={() => handleDeleteInst(item)} className="text-red-500 hover:underline font-medium">
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

        {/* Modal for Inst */}
        {instModal.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs">
            <div className="bg-white rounded-xl w-full max-w-lg overflow-hidden shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100">
                <h3 className="text-sm font-semibold text-gray-800">
                  {instModal.isCreate ? '新增养老机构' : '编辑养老机构'}
                </h3>
                <button
                  onClick={() => setInstModal({ isOpen: false, item: null, isCreate: false })}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveInst} className="p-6 space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="text-gray-600 font-medium">机构名称 <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    required
                    value={instForm.name || ''}
                    onChange={(e) => setInstForm({ ...instForm, name: e.target.value })}
                    placeholder="请输入机构名称"
                    className="w-full px-3 py-1.5 border border-gray-200 rounded-md focus:outline-none focus:border-[#10b981]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-gray-600 font-medium">联系电话</label>
                    <input
                      type="text"
                      value={instForm.phone || ''}
                      onChange={(e) => setInstForm({ ...instForm, phone: e.target.value })}
                      placeholder="010-88886666"
                      className="w-full px-3 py-1.5 border border-gray-200 rounded-md focus:outline-none focus:border-[#10b981]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-gray-600 font-medium">营业时间</label>
                    <input
                      type="text"
                      value={instForm.businessHours || ''}
                      onChange={(e) => setInstForm({ ...instForm, businessHours: e.target.value })}
                      placeholder="08:00 - 20:00"
                      className="w-full px-3 py-1.5 border border-gray-200 rounded-md focus:outline-none focus:border-[#10b981]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-gray-600 font-medium">机构地址</label>
                  <input
                    type="text"
                    value={instForm.address || ''}
                    onChange={(e) => setInstForm({ ...instForm, address: e.target.value })}
                    placeholder="请输入详细地址"
                    className="w-full px-3 py-1.5 border border-gray-200 rounded-md focus:outline-none focus:border-[#10b981]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-gray-600 font-medium">封面图片 URL</label>
                  <input
                    type="text"
                    value={instForm.coverImage || ''}
                    onChange={(e) => setInstForm({ ...instForm, coverImage: e.target.value })}
                    className="w-full px-3 py-1.5 border border-gray-200 rounded-md focus:outline-none focus:border-[#10b981]"
                  />
                </div>

                <div className="pt-4 flex items-center justify-end space-x-3 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setInstModal({ isOpen: false, item: null, isCreate: false })}
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

  // INSTITUTION TAGS PAGE
  return (
    <div className="p-6 max-w-[1600px] mx-auto text-xs space-y-6">
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-4">
        {renderHeaderTitle('机构标签管理')}
        <div className="flex items-center space-x-3 max-w-md">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="请输入标签名称"
            className="flex-1 px-3 py-1.5 border border-gray-200 rounded-md text-gray-700 focus:outline-none focus:border-[#10b981]"
          />
          <button
            onClick={() => onNotice(`检索到 ${filteredTags.length} 个机构标签`)}
            className="p-2 bg-[#10b981] hover:bg-[#059669] text-white rounded-md transition-colors shrink-0"
          >
            <Search className="w-4 h-4" />
          </button>
          <button
            onClick={() => { setKeyword(''); onNotice('已重置'); }}
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
                <th className="py-3.5 px-4 font-medium text-center">关联机构数</th>
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
                  <td className="py-3.5 px-4 text-center font-mono text-gray-600">{item.institutionCount}</td>
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
                {tagModal.isCreate ? '新增机构标签' : '编辑机构标签'}
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
                  placeholder="如：24小时监护"
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
