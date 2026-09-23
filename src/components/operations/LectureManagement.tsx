import React, { useState, useMemo } from 'react';
import { Search, RotateCcw, Plus, X, Calendar, Video } from 'lucide-react';
import { SubPageId, LectureVideoItem, LectureTagItem } from '../../types';

interface LectureManagementProps {
  subPageId: SubPageId;
  onNotice: (msg: string) => void;
  onConfirmDelete: (title: string, message: string, onConfirm: () => void) => void;
}

const INITIAL_VIDEOS: LectureVideoItem[] = [
  {
    id: 'LEC_001',
    title: '老年人如何科学合理地补充维生素与微量元素？',
    tags: ['老年健康', '健康饮食'],
    likesCount: 1001,
    collectsCount: 210,
    sharesCount: 100,
    commentsCount: 6,
    updater: '李明明',
    lastUpdateTime: '2026-09-15 10:09:09',
    status: '已发布',
    coverImage: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=200&auto=format&fit=crop&q=80',
    videoUrl: 'https://example.com/video/vitamin.mp4',
    intro: '特邀营养科主任详细拆解老年人体内微量元素吸收机制与补钙指南。',
  },
  {
    id: 'LEC_002',
    title: '太极拳二十四式全套跟练教学（分解动作带读）',
    tags: ['健身运动', '中医养生'],
    likesCount: 850,
    collectsCount: 190,
    sharesCount: 85,
    commentsCount: 12,
    updater: '张教练',
    lastUpdateTime: '2026-09-13 14:20:00',
    status: '已发布',
    coverImage: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=200&auto=format&fit=crop&q=80',
    videoUrl: 'https://example.com/video/taichi.mp4',
    intro: '适合高龄长者打基功的太极教程，修身养性，增强平衡力。',
  },
  {
    id: 'LEC_003',
    title: '老年高血压居家血压监测注意事项与误区辟谣',
    tags: ['慢病管理', '老年健康'],
    likesCount: 620,
    collectsCount: 140,
    sharesCount: 70,
    commentsCount: 8,
    updater: '陈医师',
    lastUpdateTime: '2026-09-10 09:30:00',
    status: '已发布',
    coverImage: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=200&auto=format&fit=crop&q=80',
    videoUrl: 'https://example.com/video/bp.mp4',
    intro: '正确使用袖带式血压计，记录晨起与睡前双峰曲线。',
  },
  {
    id: 'LEC_004',
    title: '健身气功·八段锦完整动作要领与呼吸配合实操',
    tags: ['中医养生', '健身运动'],
    likesCount: 1420,
    collectsCount: 310,
    sharesCount: 180,
    commentsCount: 24,
    updater: '李明明',
    lastUpdateTime: '2026-09-07 16:00:00',
    status: '已发布',
    coverImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=200&auto=format&fit=crop&q=80',
    videoUrl: 'https://example.com/video/baduanjin.mp4',
    intro: '柔和缓慢，圆活连贯，松紧结合，动静相兼。',
  },
  {
    id: 'LEC_005',
    title: '膝关节退行性病变的日常防范与居家康复操',
    tags: ['慢病管理', '老年健康'],
    likesCount: 510,
    collectsCount: 115,
    sharesCount: 45,
    commentsCount: 5,
    updater: '赵医生',
    lastUpdateTime: '2026-09-03 11:10:00',
    status: '已发布',
    coverImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&auto=format&fit=crop&q=80',
    videoUrl: 'https://example.com/video/knee.mp4',
    intro: '保护关节软骨，加强股四头肌力量锻炼。',
  },
];

const INITIAL_TAGS: LectureTagItem[] = [
  {
    id: 'LTAG_001',
    name: '健康饮食',
    videoCount: 500,
    updater: '李明明',
    lastUpdateTime: '2026-09-18 10:09:09',
    status: '启用',
  },
  {
    id: 'LTAG_002',
    name: '老年健康',
    videoCount: 450,
    updater: '李明明',
    lastUpdateTime: '2026-09-16 15:20:00',
    status: '启用',
  },
  {
    id: 'LTAG_003',
    name: '中医养生',
    videoCount: 380,
    updater: '李明明',
    lastUpdateTime: '2026-09-13 09:40:00',
    status: '启用',
  },
  {
    id: 'LTAG_004',
    name: '健身运动',
    videoCount: 310,
    updater: '李明明',
    lastUpdateTime: '2026-09-09 11:15:00',
    status: '启用',
  },
  {
    id: 'LTAG_005',
    name: '慢病管理',
    videoCount: 280,
    updater: '李明明',
    lastUpdateTime: '2026-09-05 14:00:00',
    status: '启用',
  },
];

export const LectureManagement: React.FC<LectureManagementProps> = ({
  subPageId,
  onNotice,
  onConfirmDelete,
}) => {
  const [videos, setVideos] = useState<LectureVideoItem[]>(INITIAL_VIDEOS);
  const [tags, setTags] = useState<LectureTagItem[]>(INITIAL_TAGS);

  // Filters
  const [keyword, setKeyword] = useState('');
  const [statusFilter, setStatusFilter] = useState('全部');
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');

  // Modals
  const [videoModal, setVideoModal] = useState<{
    isOpen: boolean;
    item: LectureVideoItem | null;
    isCreate: boolean;
  }>({ isOpen: false, item: null, isCreate: false });

  const [videoForm, setVideoForm] = useState<Partial<LectureVideoItem>>({
    title: '',
    tags: ['老年健康'],
    status: '已发布',
    coverImage: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=200&auto=format&fit=crop&q=80',
    intro: '',
  });

  const [tagModal, setTagModal] = useState<{
    isOpen: boolean;
    item: LectureTagItem | null;
    isCreate: boolean;
  }>({ isOpen: false, item: null, isCreate: false });

  const [tagForm, setTagForm] = useState<{ name: string; status: '启用' | '禁用' }>({
    name: '',
    status: '启用',
  });

  const filteredVideos = useMemo(() => {
    let list = [...videos];
    if (statusFilter !== '全部') list = list.filter((v) => v.status === statusFilter);
    if (keyword) {
      const k = keyword.toLowerCase();
      list = list.filter((v) => v.title.toLowerCase().includes(k) || v.tags.some((t) => t.toLowerCase().includes(k)));
    }
    return list.sort((a, b) => b.lastUpdateTime.localeCompare(a.lastUpdateTime));
  }, [videos, statusFilter, keyword]);

  const filteredTags = useMemo(() => {
    let list = [...tags];
    if (keyword) {
      const k = keyword.toLowerCase();
      list = list.filter((t) => t.name.toLowerCase().includes(k));
    }
    return list.sort((a, b) => b.lastUpdateTime.localeCompare(a.lastUpdateTime));
  }, [tags, keyword]);

  const handleOpenVideoModal = (item?: LectureVideoItem) => {
    if (item) {
      setVideoForm({ ...item });
      setVideoModal({ isOpen: true, item, isCreate: false });
    } else {
      setVideoForm({
        title: '',
        tags: ['老年健康', '健康饮食'],
        status: '已发布',
        coverImage: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=200&auto=format&fit=crop&q=80',
        intro: '',
      });
      setVideoModal({ isOpen: true, item: null, isCreate: true });
    }
  };

  const handleSaveVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoForm.title) {
      onNotice('请输入视频标题');
      return;
    }
    if (videoModal.isCreate) {
      const newItem: LectureVideoItem = {
        id: 'LEC_' + Date.now(),
        title: videoForm.title || '',
        tags: videoForm.tags || ['老年健康'],
        likesCount: 0,
        collectsCount: 0,
        sharesCount: 0,
        commentsCount: 0,
        updater: '管理员',
        lastUpdateTime: '2026-09-19 16:30:00',
        status: (videoForm.status as any) || '已发布',
        coverImage: videoForm.coverImage,
        intro: videoForm.intro,
      };
      setVideos([newItem, ...videos]);
      onNotice('已上传讲堂视频');
    } else if (videoModal.item) {
      setVideos(
        videos.map((v) =>
          v.id === videoModal.item!.id ? { ...v, ...videoForm, lastUpdateTime: '2026-09-19 16:30:00' } : v
        )
      );
      onNotice('讲堂视频已被更新');
    }
    setVideoModal({ isOpen: false, item: null, isCreate: false });
  };

  const handleDeleteVideo = (item: LectureVideoItem) => {
    onConfirmDelete('删除讲堂视频', `确定要删除“${item.title}”吗？`, () => {
      setVideos(videos.filter((v) => v.id !== item.id));
      onNotice('讲堂视频已删除');
    });
  };

  const handleSaveTag = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tagForm.name) {
      onNotice('请输入标签名称');
      return;
    }
    if (tagModal.isCreate) {
      const newTag: LectureTagItem = {
        id: 'LTAG_' + Date.now(),
        name: tagForm.name,
        videoCount: 0,
        updater: '管理员',
        lastUpdateTime: '2026-09-19 16:00:00',
        status: tagForm.status,
      };
      setTags([newTag, ...tags]);
      onNotice('已新增讲堂标签');
    } else if (tagModal.item) {
      setTags(
        tags.map((t) =>
          t.id === tagModal.item!.id
            ? { ...t, name: tagForm.name, status: tagForm.status, lastUpdateTime: '2026-09-19 16:00:00' }
            : t
        )
      );
      onNotice('标签设定已更新');
    }
    setTagModal({ isOpen: false, item: null, isCreate: false });
  };

  const handleToggleTagStatus = (tag: LectureTagItem) => {
    const next = tag.status === '启用' ? '禁用' : '启用';
    setTags(tags.map((t) => (t.id === tag.id ? { ...t, status: next } : t)));
    onNotice(`标签“${tag.name}”设为：${next}`);
  };

  const handleDeleteTag = (tag: LectureTagItem) => {
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

  if (subPageId === 'ops_lecture_videos') {
    return (
      <div className="p-6 max-w-[1600px] mx-auto text-xs space-y-6">
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-4">
          {renderHeaderTitle('健康讲堂 - 视频列表')}
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
                placeholder="请输入视频标题/标签"
                className="flex-1 px-3 py-1.5 border border-gray-200 rounded-md text-gray-700 focus:outline-none focus:border-[#10b981]"
              />
              <button
                onClick={() => onNotice(`检索到 ${filteredVideos.length} 个视频`)}
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
                  onNotice('重置筛选');
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
            <div className="text-gray-500">共 <span className="text-[#10b981] font-semibold">{filteredVideos.length}</span> 个讲堂视频</div>
            <button
              onClick={() => handleOpenVideoModal()}
              className="px-4 py-1.5 bg-[#10b981] hover:bg-[#059669] text-white rounded-md font-medium transition-colors flex items-center space-x-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>新增视频</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 text-gray-600 bg-gray-50/50">
                  <th className="py-3.5 px-4 font-medium w-16">封面</th>
                  <th className="py-3.5 px-4 font-medium min-w-[240px]">视频标题</th>
                  <th className="py-3.5 px-4 font-medium">标签</th>
                  <th className="py-3.5 px-4 font-medium text-center">互动数据 (赞/藏/享/评)</th>
                  <th className="py-3.5 px-4 font-medium">更新人</th>
                  <th className="py-3.5 px-4 font-medium">更新时间</th>
                  <th className="py-3.5 px-4 font-medium text-center">状态</th>
                  <th className="py-3.5 px-4 font-medium text-center">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredVideos.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-gray-100 group">
                        <img src={item.coverImage} alt={item.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <Video className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-gray-800 line-clamp-2">{item.title}</td>
                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap gap-1">
                        {item.tags.map((t) => (
                          <span key={t} className="px-2 py-0.5 bg-purple-50 text-purple-600 rounded text-[11px]">
                            {t}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono text-gray-500">
                      {item.likesCount} / {item.collectsCount} / {item.sharesCount} / {item.commentsCount}
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
                        <button onClick={() => handleOpenVideoModal(item)} className="text-blue-600 hover:underline font-medium">
                          编辑
                        </button>
                        <button onClick={() => handleDeleteVideo(item)} className="text-red-500 hover:underline font-medium">
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

        {/* Modal for Video */}
        {videoModal.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs">
            <div className="bg-white rounded-xl w-full max-w-lg overflow-hidden shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100">
                <h3 className="text-sm font-semibold text-gray-800">
                  {videoModal.isCreate ? '新增讲堂视频' : '编辑讲堂视频'}
                </h3>
                <button
                  onClick={() => setVideoModal({ isOpen: false, item: null, isCreate: false })}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveVideo} className="p-6 space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="text-gray-600 font-medium">视频标题 <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    required
                    value={videoForm.title || ''}
                    onChange={(e) => setVideoForm({ ...videoForm, title: e.target.value })}
                    placeholder="请输入视频标题"
                    className="w-full px-3 py-1.5 border border-gray-200 rounded-md focus:outline-none focus:border-[#10b981]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-gray-600 font-medium">封面图片 URL</label>
                  <input
                    type="text"
                    value={videoForm.coverImage || ''}
                    onChange={(e) => setVideoForm({ ...videoForm, coverImage: e.target.value })}
                    className="w-full px-3 py-1.5 border border-gray-200 rounded-md focus:outline-none focus:border-[#10b981]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-gray-600 font-medium">视频介绍</label>
                  <textarea
                    rows={3}
                    value={videoForm.intro || ''}
                    onChange={(e) => setVideoForm({ ...videoForm, intro: e.target.value })}
                    className="w-full px-3 py-1.5 border border-gray-200 rounded-md focus:outline-none focus:border-[#10b981]"
                  />
                </div>

                <div className="pt-4 flex items-center justify-end space-x-3 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setVideoModal({ isOpen: false, item: null, isCreate: false })}
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

  // LECTURE TAGS PAGE
  return (
    <div className="p-6 max-w-[1600px] mx-auto text-xs space-y-6">
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-4">
        {renderHeaderTitle('视频标签管理')}
        <div className="flex items-center space-x-3 max-w-md">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="请输入标签名称"
            className="flex-1 px-3 py-1.5 border border-gray-200 rounded-md text-gray-700 focus:outline-none focus:border-[#10b981]"
          />
          <button
            onClick={() => onNotice(`找到 ${filteredTags.length} 个视频标签`)}
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
                <th className="py-3.5 px-4 font-medium text-center">关联视频数</th>
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
                  <td className="py-3.5 px-4 text-center font-mono text-gray-600">{item.videoCount}</td>
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
                {tagModal.isCreate ? '新增视频标签' : '编辑视频标签'}
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
                  placeholder="如：健康饮食"
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
