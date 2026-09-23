import React, { useState, useMemo } from 'react';
import { Search, RotateCcw, Plus, X, Calendar } from 'lucide-react';
import { SubPageId, HealthNewsItem } from '../../types';

interface HealthNewsManagementProps {
  subPageId: SubPageId;
  onNotice: (msg: string) => void;
  onConfirmDelete: (title: string, message: string, onConfirm: () => void) => void;
}

const INITIAL_NEWS: HealthNewsItem[] = [
  {
    id: 'NEWS_001',
    title: '老年人秋季如何科学平稳控制血糖？专家给您提个醒',
    publishTime: '2026-09-18 10:09:09',
    likesCount: 1001,
    collectsCount: 210,
    sharesCount: 100,
    commentsCount: 6,
    publisher: '李明明',
    status: '已发布',
    coverImage: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=200&auto=format&fit=crop&q=80',
    detailHtml: '<p>秋季气温骤降，人体胰岛素分泌发生变化，老年糖尿病患者需要从饮食、运动、用药三个维度进行科学调理。</p>',
  },
  {
    id: 'NEWS_002',
    title: '秋季防凉防感冒全攻略：老年人必看的六大保健细节',
    publishTime: '2026-09-17 14:30:00',
    likesCount: 856,
    collectsCount: 180,
    sharesCount: 85,
    commentsCount: 12,
    publisher: '张医师',
    status: '已发布',
    coverImage: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=200&auto=format&fit=crop&q=80',
    detailHtml: '<p>适时添衣保暖，保持室内通风，多喝温开水，适度锻炼提高呼吸道免疫力。</p>',
  },
  {
    id: 'NEWS_003',
    title: '预防骨质疏松的科学饮食之道：高钙与维生素D搭配',
    publishTime: '2026-09-15 11:15:20',
    likesCount: 620,
    collectsCount: 145,
    sharesCount: 92,
    commentsCount: 8,
    publisher: '陈主任',
    status: '已发布',
    coverImage: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=200&auto=format&fit=crop&q=80',
    detailHtml: '<p>补充钙质不仅靠喝牛奶，日常多晒太阳促成维生素D合成也是关键关键要素。</p>',
  },
  {
    id: 'NEWS_004',
    title: '老年人睡眠障碍的自我调理策略与心理抚慰指南',
    publishTime: '2026-09-12 09:40:00',
    likesCount: 1240,
    collectsCount: 310,
    sharesCount: 150,
    commentsCount: 15,
    publisher: '李明明',
    status: '已发布',
    coverImage: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=200&auto=format&fit=crop&q=80',
    detailHtml: '<p>打造舒适睡眠环境，睡前烫脚放松，避免睡前高度兴奋与繁重思考。</p>',
  },
  {
    id: 'NEWS_005',
    title: '高血压患者晨起“三不要”：避开血压骤升的高危时段',
    publishTime: '2026-09-08 16:20:10',
    likesCount: 930,
    collectsCount: 225,
    sharesCount: 110,
    commentsCount: 9,
    publisher: '赵健康',
    status: '已发布',
    coverImage: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=200&auto=format&fit=crop&q=80',
    detailHtml: '<p>晨起动作宜缓，切忌猛然起床，忌立刻剧烈运动，忌用力排便。</p>',
  },
  {
    id: 'NEWS_006',
    title: '社区开展金秋送健康义诊讲座：免费测血压血糖',
    publishTime: '2026-09-03 10:00:00',
    likesCount: 450,
    collectsCount: 95,
    sharesCount: 40,
    commentsCount: 4,
    publisher: '李明明',
    status: '草稿',
    coverImage: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=200&auto=format&fit=crop&q=80',
    detailHtml: '<p>邀请三甲医院专家团队亲临现场，为社区老同志解答日常健康困惑。</p>',
  },
];

export const HealthNewsManagement: React.FC<HealthNewsManagementProps> = ({
  subPageId,
  onNotice,
  onConfirmDelete,
}) => {
  const [newsList, setNewsList] = useState<HealthNewsItem[]>(INITIAL_NEWS);
  const [keyword, setKeyword] = useState('');
  const [statusFilter, setStatusFilter] = useState('全部');
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');

  const [newsModal, setNewsModal] = useState<{
    isOpen: boolean;
    item: HealthNewsItem | null;
    isCreate: boolean;
  }>({ isOpen: false, item: null, isCreate: false });

  const [newsForm, setNewsForm] = useState<Partial<HealthNewsItem>>({
    title: '',
    publisher: '管理员',
    status: '已发布',
    coverImage: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=200&auto=format&fit=crop&q=80',
    detailHtml: '',
  });

  const filteredNews = useMemo(() => {
    let list = [...newsList];
    if (statusFilter !== '全部') list = list.filter((n) => n.status === statusFilter);
    if (keyword) {
      const k = keyword.toLowerCase();
      list = list.filter((n) => n.title.toLowerCase().includes(k) || n.publisher.toLowerCase().includes(k));
    }
    return list.sort((a, b) => b.publishTime.localeCompare(a.publishTime));
  }, [newsList, statusFilter, keyword]);

  const handleOpenNewsModal = (item?: HealthNewsItem) => {
    if (item) {
      setNewsForm({ ...item });
      setNewsModal({ isOpen: true, item, isCreate: false });
    } else {
      setNewsForm({
        title: '',
        publisher: '管理员',
        status: '已发布',
        coverImage: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=200&auto=format&fit=crop&q=80',
        detailHtml: '',
      });
      setNewsModal({ isOpen: true, item: null, isCreate: true });
    }
  };

  const handleSaveNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsForm.title) {
      onNotice('请输入资讯标题');
      return;
    }
    if (newsModal.isCreate) {
      const newItem: HealthNewsItem = {
        id: 'NEWS_' + Date.now(),
        title: newsForm.title || '',
        publishTime: '2026-09-19 16:20:00',
        likesCount: 0,
        collectsCount: 0,
        sharesCount: 0,
        commentsCount: 0,
        publisher: newsForm.publisher || '管理员',
        status: (newsForm.status as any) || '已发布',
        coverImage: newsForm.coverImage,
        detailHtml: newsForm.detailHtml,
      };
      setNewsList([newItem, ...newsList]);
      onNotice('已创建健康资讯');
    } else if (newsModal.item) {
      setNewsList(
        newsList.map((n) =>
          n.id === newsModal.item!.id ? { ...n, ...newsForm, publishTime: '2026-09-19 16:20:00' } : n
        )
      );
      onNotice('健康资讯已保存');
    }
    setNewsModal({ isOpen: false, item: null, isCreate: false });
  };

  const handleDeleteNews = (item: HealthNewsItem) => {
    onConfirmDelete('删除资讯', `确定要删除资讯“${item.title}”吗？`, () => {
      setNewsList(newsList.filter((n) => n.id !== item.id));
      onNotice('资讯已删除');
    });
  };

  const renderHeaderTitle = (title: string) => (
    <div className="flex items-center space-x-2.5 pb-2">
      <span className="w-1 h-4 bg-[#10b981] rounded-full"></span>
      <h1 className="text-sm font-semibold text-gray-800">{title}</h1>
    </div>
  );

  return (
    <div className="p-6 max-w-[1600px] mx-auto text-xs space-y-6">
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-4">
        {renderHeaderTitle('健康资讯管理')}
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
            <span className="text-gray-500 font-medium">发布时间</span>
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
              placeholder="请输入资讯标题/发布人"
              className="flex-1 px-3 py-1.5 border border-gray-200 rounded-md text-gray-700 focus:outline-none focus:border-[#10b981]"
            />
            <button
              onClick={() => onNotice(`搜寻到 ${filteredNews.length} 条资讯`)}
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
          <div className="text-gray-500">共 <span className="text-[#10b981] font-semibold">{filteredNews.length}</span> 条资讯数据</div>
          <button
            onClick={() => handleOpenNewsModal()}
            className="px-4 py-1.5 bg-[#10b981] hover:bg-[#059669] text-white rounded-md font-medium transition-colors flex items-center space-x-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>新增资讯</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-gray-600 bg-gray-50/50">
                <th className="py-3.5 px-4 font-medium w-16">封面</th>
                <th className="py-3.5 px-4 font-medium min-w-[260px]">资讯标题</th>
                <th className="py-3.5 px-4 font-medium text-center">互动数据 (赞/藏/享/评)</th>
                <th className="py-3.5 px-4 font-medium">发布人</th>
                <th className="py-3.5 px-4 font-medium">发布时间</th>
                <th className="py-3.5 px-4 font-medium text-center">状态</th>
                <th className="py-3.5 px-4 font-medium text-center">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredNews.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/60 transition-colors">
                  <td className="py-3.5 px-4">
                    <img
                      src={item.coverImage}
                      alt={item.title}
                      className="w-12 h-12 object-cover rounded-lg border border-gray-100"
                    />
                  </td>
                  <td className="py-3.5 px-4 font-medium text-gray-800 line-clamp-2">{item.title}</td>
                  <td className="py-3.5 px-4 text-center font-mono text-gray-500">
                    {item.likesCount} / {item.collectsCount} / {item.sharesCount} / {item.commentsCount}
                  </td>
                  <td className="py-3.5 px-4 text-gray-700">{item.publisher}</td>
                  <td className="py-3.5 px-4 font-mono text-gray-500 whitespace-nowrap">{item.publishTime}</td>
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
                      <button onClick={() => handleOpenNewsModal(item)} className="text-blue-600 hover:underline font-medium">
                        编辑
                      </button>
                      <button onClick={() => handleDeleteNews(item)} className="text-red-500 hover:underline font-medium">
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

      {/* News Modal */}
      {newsModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-xl w-full max-w-lg overflow-hidden shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100">
              <h3 className="text-sm font-semibold text-gray-800">
                {newsModal.isCreate ? '新增健康资讯' : '编辑健康资讯'}
              </h3>
              <button
                onClick={() => setNewsModal({ isOpen: false, item: null, isCreate: false })}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveNews} className="p-6 space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-gray-600 font-medium">资讯标题 <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  required
                  value={newsForm.title || ''}
                  onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                  placeholder="请输入资讯标题"
                  className="w-full px-3 py-1.5 border border-gray-200 rounded-md focus:outline-none focus:border-[#10b981]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-gray-600 font-medium">发布人</label>
                  <input
                    type="text"
                    value={newsForm.publisher || '管理员'}
                    onChange={(e) => setNewsForm({ ...newsForm, publisher: e.target.value })}
                    className="w-full px-3 py-1.5 border border-gray-200 rounded-md focus:outline-none focus:border-[#10b981]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-gray-600 font-medium">状态</label>
                  <select
                    value={newsForm.status || '已发布'}
                    onChange={(e) => setNewsForm({ ...newsForm, status: e.target.value as any })}
                    className="w-full px-3 py-1.5 border border-gray-200 rounded-md bg-white focus:outline-none focus:border-[#10b981]"
                  >
                    <option value="已发布">已发布</option>
                    <option value="草稿">草稿</option>
                    <option value="已下架">已下架</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-gray-600 font-medium">封面图片 URL</label>
                <input
                  type="text"
                  value={newsForm.coverImage || ''}
                  onChange={(e) => setNewsForm({ ...newsForm, coverImage: e.target.value })}
                  className="w-full px-3 py-1.5 border border-gray-200 rounded-md focus:outline-none focus:border-[#10b981]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-gray-600 font-medium">正文内容</label>
                <textarea
                  rows={4}
                  value={newsForm.detailHtml || ''}
                  onChange={(e) => setNewsForm({ ...newsForm, detailHtml: e.target.value })}
                  placeholder="输入资讯正文内容"
                  className="w-full px-3 py-1.5 border border-gray-200 rounded-md focus:outline-none focus:border-[#10b981]"
                />
              </div>

              <div className="pt-4 flex items-center justify-end space-x-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setNewsModal({ isOpen: false, item: null, isCreate: false })}
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
