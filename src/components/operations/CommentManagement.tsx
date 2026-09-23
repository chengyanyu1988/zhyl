import React, { useState, useMemo } from 'react';
import { Search, RotateCcw, Calendar, MessageSquare, Heart, CheckCircle2, XCircle, Trash2 } from 'lucide-react';
import { SubPageId, CommentItem } from '../../types';

interface CommentManagementProps {
  subPageId: SubPageId;
  onNotice: (msg: string) => void;
  onConfirmDelete: (title: string, message: string, onConfirm: () => void) => void;
}

const INITIAL_COMMENTS: CommentItem[] = [
  {
    id: 'CMT_001',
    publishTime: '2026-09-19 15:20:10',
    content: '我们也需要关注老年人的心理需求和生活质量，为他们提供更加全面和人性化的关怀和支持。',
    module: '健康资讯',
    targetTitle: '老年人如何控制血糖？',
    likesCount: 1001,
    commenterName: '小王',
    commenterAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    status: '显示',
  },
  {
    id: 'CMT_002',
    publishTime: '2026-09-18 11:05:00',
    content: '这篇文章写得太详细了，对我们家老人的秋季饮食搭配有极大参考价值！感谢专家。',
    module: '健康资讯',
    targetTitle: '秋季老年人防凉防感冒指南',
    likesCount: 85,
    commenterName: '张大爷',
    commenterAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    status: '显示',
  },
  {
    id: 'CMT_003',
    publishTime: '2026-09-17 16:40:12',
    content: '视频里教练讲解的太极拳动作呼吸要领非常清晰，每天早晨都跟练一会，身体感觉轻快多了。',
    module: '健康讲堂',
    targetTitle: '太极拳二十四式全套跟练教学',
    likesCount: 142,
    commenterName: '陈阿姨',
    commenterAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
    status: '显示',
  },
  {
    id: 'CMT_004',
    publishTime: '2026-09-16 09:12:30',
    content: '请问高血压合并糖尿病患者的低盐食谱，这道虾仁蒸蛋可以作为主菜每周吃几次？',
    module: '食谱管理',
    targetTitle: '虾仁蒸蛋',
    likesCount: 38,
    commenterName: '刘医生',
    commenterAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    status: '显示',
  },
  {
    id: 'CMT_005',
    publishTime: '2026-09-14 14:15:00',
    content: '了解到了很多关于胃溃疡的日常调理方法，避免辛辣刺激，感谢平台分享这么实用的知识！',
    module: '疾病宝典',
    targetTitle: '胃溃疡',
    likesCount: 64,
    commenterName: '赵阿姨',
    commenterAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80',
    status: '显示',
  },
  {
    id: 'CMT_006',
    publishTime: '2026-09-12 10:30:00',
    content: '朝阳店的医护与无障碍设施很完善，工作态度也非常好，家里的老人住在那里我们很放心。',
    module: '养老机构',
    targetTitle: '金慧福养老机构（朝阳店）',
    likesCount: 92,
    commenterName: '李先生',
    commenterAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
    status: '隐藏',
  },
];

export const CommentManagement: React.FC<CommentManagementProps> = ({
  subPageId,
  onNotice,
  onConfirmDelete,
}) => {
  const [comments, setComments] = useState<CommentItem[]>(INITIAL_COMMENTS);

  // Filters
  const [keyword, setKeyword] = useState('');
  const [moduleFilter, setModuleFilter] = useState('全部');
  const [statusFilter, setStatusFilter] = useState('全部');
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');

  const filteredComments = useMemo(() => {
    let list = [...comments];
    if (moduleFilter !== '全部') list = list.filter((c) => c.module === moduleFilter);
    if (statusFilter !== '全部') list = list.filter((c) => c.status === statusFilter);
    if (keyword) {
      const k = keyword.toLowerCase();
      list = list.filter(
        (c) =>
          c.content.toLowerCase().includes(k) ||
          c.commenterName.toLowerCase().includes(k) ||
          c.targetTitle.toLowerCase().includes(k)
      );
    }
    return list.sort((a, b) => b.publishTime.localeCompare(a.publishTime));
  }, [comments, moduleFilter, statusFilter, keyword]);

  const handleToggleStatus = (item: CommentItem) => {
    const next = item.status === '显示' ? '隐藏' : '显示';
    setComments(comments.map((c) => (c.id === item.id ? { ...c, status: next } : c)));
    onNotice(`已将该条评论设为：${next}`);
  };

  const handleDeleteComment = (item: CommentItem) => {
    onConfirmDelete('删除评论', `确定要删除发布人“${item.commenterName}”的该条评论吗？`, () => {
      setComments(comments.filter((c) => c.id !== item.id));
      onNotice('评论已删除');
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
        {renderHeaderTitle('全部评论管理')}
        <div className="flex flex-wrap items-center gap-4 text-xs">
          <div className="flex items-center space-x-2">
            <span className="text-gray-500 font-medium">所属模块</span>
            <select
              value={moduleFilter}
              onChange={(e) => setModuleFilter(e.target.value)}
              className="border border-gray-200 rounded-md px-3 py-1.5 bg-white text-gray-700 focus:outline-none focus:border-[#10b981]"
            >
              <option value="全部">全部模块</option>
              <option value="健康资讯">健康资讯</option>
              <option value="健康讲堂">健康讲堂</option>
              <option value="食谱管理">食谱管理</option>
              <option value="疾病宝典">疾病宝典</option>
              <option value="养老机构">养老机构</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-gray-500 font-medium">状态</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-200 rounded-md px-3 py-1.5 bg-white text-gray-700 focus:outline-none focus:border-[#10b981]"
            >
              <option value="全部">全部状态</option>
              <option value="显示">显示</option>
              <option value="隐藏">隐藏</option>
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
              placeholder="请输入评论内容/评论人/关联标题"
              className="flex-1 px-3 py-1.5 border border-gray-200 rounded-md text-gray-700 focus:outline-none focus:border-[#10b981]"
            />
            <button
              onClick={() => onNotice(`查询到 ${filteredComments.length} 条评论`)}
              className="p-2 bg-[#10b981] hover:bg-[#059669] text-white rounded-md transition-colors shrink-0"
            >
              <Search className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setKeyword('');
                setModuleFilter('全部');
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
          <div className="text-gray-500">共 <span className="text-[#10b981] font-semibold">{filteredComments.length}</span> 条评论数据</div>
          <button
            onClick={() => onNotice('支持勾选多条评论批量操作')}
            className="px-4 py-1.5 border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-md font-medium transition-colors"
          >
            批量操作
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-gray-600 bg-gray-50/50">
                <th className="py-3.5 px-4 font-medium min-w-[140px]">评论人</th>
                <th className="py-3.5 px-4 font-medium min-w-[280px]">评论内容</th>
                <th className="py-3.5 px-4 font-medium">所属模块</th>
                <th className="py-3.5 px-4 font-medium">关联目标标题</th>
                <th className="py-3.5 px-4 font-medium text-center">点赞数</th>
                <th className="py-3.5 px-4 font-medium">发布时间</th>
                <th className="py-3.5 px-4 font-medium text-center">状态</th>
                <th className="py-3.5 px-4 font-medium text-center">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredComments.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/60 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center space-x-2.5">
                      <img
                        src={item.commenterAvatar}
                        alt={item.commenterName}
                        className="w-7 h-7 rounded-full object-cover border border-gray-100"
                      />
                      <span className="font-medium text-gray-800">{item.commenterName}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-gray-700 line-clamp-2">{item.content}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-[11px]">
                      {item.module}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-gray-600 font-medium max-w-xs truncate">{item.targetTitle}</td>
                  <td className="py-3.5 px-4 text-center font-mono text-gray-500">{item.likesCount}</td>
                  <td className="py-3.5 px-4 font-mono text-gray-500 whitespace-nowrap">{item.publishTime}</td>
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => handleToggleStatus(item)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                        item.status === '显示' ? 'bg-[#10b981] text-white' : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {item.status}
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <div className="flex items-center justify-center space-x-3">
                      <button
                        onClick={() => handleToggleStatus(item)}
                        className="text-blue-600 hover:underline font-medium"
                      >
                        {item.status === '显示' ? '隐藏' : '显示'}
                      </button>
                      <button onClick={() => handleDeleteComment(item)} className="text-red-500 hover:underline font-medium">
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
    </div>
  );
};
