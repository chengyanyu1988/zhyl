import React, { useState, useMemo } from 'react';
import { Search, RotateCcw, Trash2 } from 'lucide-react';
import { AppUser } from '../../types';
import { INITIAL_CONTENTS, ContentItem } from '../../data/userRecordsData';
import { UserProfileSidebar } from './UserProfileSidebar';

interface ContentInfoTabProps {
  user: AppUser;
  onNotice: (msg: string) => void;
}

export const ContentInfoTab: React.FC<ContentInfoTabProps> = ({ user, onNotice }) => {
  const [contents, setContents] = useState<ContentItem[]>(INITIAL_CONTENTS);
  const [keyword, setKeyword] = useState<string>('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const filteredContents = useMemo(() => {
    return contents
      .filter((item) => {
        if (!keyword.trim()) return true;
        const q = keyword.toLowerCase();
        return item.text.toLowerCase().includes(q) || item.topic.toLowerCase().includes(q);
      })
      .sort((a, b) => new Date(b.publishTime).getTime() - new Date(a.publishTime).getTime());
  }, [contents, keyword]);

  const handleToggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(filteredContents.map((c) => c.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleToggleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleToggleStatus = (id: string) => {
    setContents((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const nextStatus = !c.status;
          onNotice(`该动态展示状态已更新为【${nextStatus ? '公开显示' : '仅自己可见'}】`);
          return { ...c, status: nextStatus };
        }
        return c;
      })
    );
  };

  const handleDelete = (id: string) => {
    setContents((prev) => prev.filter((c) => c.id !== id));
    setSelectedIds((prev) => prev.filter((item) => item !== id));
    onNotice('已删除该动态内容记录');
  };

  const handleBatchDelete = () => {
    if (selectedIds.length === 0) {
      onNotice('请先勾选需要批量操作的内容');
      return;
    }
    setContents((prev) => prev.filter((c) => !selectedIds.includes(c.id)));
    onNotice(`已批量移除 ${selectedIds.length} 条内容动态`);
    setSelectedIds([]);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* 左侧个人画像侧边栏 */}
      <div className="lg:col-span-4 space-y-5">
        <UserProfileSidebar user={user} />
      </div>

      {/* 右侧内容信息列表 (Images 13, 14) */}
      <div className="lg:col-span-8 space-y-4 text-xs">
        {/* 顶部搜索操作栏 */}
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-2.5 flex-1 max-w-md">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="请输入关键字"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#10b981]"
              />
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2" />
            </div>

            <button
              type="button"
              onClick={() => onNotice(`已检索长者发布内容，关键字：${keyword || '全部'}`)}
              className="p-2 bg-[#10b981] hover:bg-[#059669] text-white rounded-lg transition-colors"
              title="搜索"
            >
              <Search className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={() => {
                setKeyword('');
                onNotice('已重置内容搜索');
              }}
              className="p-2 border border-gray-200 hover:bg-gray-50 text-gray-600 rounded-lg transition-colors"
              title="重置"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          <div>
            <button
              type="button"
              onClick={handleBatchDelete}
              className="px-3 py-1.5 border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-lg font-medium transition-colors"
            >
              批量操作
            </button>
          </div>
        </div>

        {/* 内容表格 */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-[#f9fafb] text-gray-500 border-b border-gray-100 font-medium">
                <tr>
                  <th className="py-3 px-3 w-10 text-center">
                    <input
                      type="checkbox"
                      checked={selectedIds.length > 0 && selectedIds.length === filteredContents.length}
                      onChange={(e) => handleToggleSelectAll(e.target.checked)}
                      className="rounded border-gray-300 text-[#10b981] focus:ring-[#10b981]"
                    />
                  </th>
                  <th className="py-3 px-3 min-w-[260px]">内容</th>
                  <th className="py-3 px-3 min-w-[80px]">话题</th>
                  <th className="py-3 px-3 min-w-[70px] text-center">点赞</th>
                  <th className="py-3 px-3 min-w-[70px] text-center">收藏</th>
                  <th className="py-3 px-3 min-w-[70px] text-center">分享</th>
                  <th className="py-3 px-3 min-w-[70px] text-center">评论</th>
                  <th className="py-3 px-3 min-w-[125px]">发布时间</th>
                  <th className="py-3 px-3 min-w-[70px] text-center">状态</th>
                  <th className="py-3 px-4 min-w-[60px] text-right">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredContents.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/70 transition-colors">
                    <td className="py-3.5 px-3 text-center">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(item.id)}
                        onChange={() => handleToggleSelectOne(item.id)}
                        className="rounded border-gray-300 text-[#10b981] focus:ring-[#10b981]"
                      />
                    </td>
                    <td className="py-3.5 px-3">
                      <div className="flex items-start space-x-3">
                        <img
                          src={item.image}
                          alt="配图"
                          className="w-14 h-14 rounded-lg object-cover border border-gray-100 shrink-0 mt-0.5 shadow-xs"
                        />
                        <p className="text-gray-700 line-clamp-3 leading-relaxed text-[11px]">
                          {item.text}
                        </p>
                      </div>
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-[11px]">
                        {item.topic}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-center font-mono text-gray-700">{item.likes}</td>
                    <td className="py-3.5 px-3 text-center font-mono text-gray-700">{item.favorites}</td>
                    <td className="py-3.5 px-3 text-center font-mono text-gray-700">{item.shares}</td>
                    <td className="py-3.5 px-3 text-center font-mono text-gray-700">{item.comments}</td>
                    <td className="py-3.5 px-3 font-mono text-gray-600">{item.publishTime}</td>
                    <td className="py-3.5 px-3 text-center">
                      <button
                        type="button"
                        onClick={() => handleToggleStatus(item.id)}
                        className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                          item.status ? 'bg-[#10b981]' : 'bg-gray-200'
                        }`}
                        title={item.status ? '公开显示中' : '已隐藏'}
                      >
                        <span
                          className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                            item.status ? 'translate-x-4' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => handleDelete(item.id)}
                        className="text-rose-500 hover:underline font-medium"
                      >
                        删除
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredContents.length === 0 && (
                  <tr>
                    <td colSpan={10} className="py-12 text-center text-gray-400">
                      暂无匹配的动态内容
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* 分页控制栏 (Images 13, 14) */}
          <div className="p-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3 text-gray-500 text-xs">
            <div>
              共 <span className="font-semibold text-gray-800">{filteredContents.length}</span> 条
            </div>
            <div className="flex items-center space-x-3">
              <select className="px-2 py-1 bg-gray-50 border border-gray-200 rounded text-gray-600">
                <option>每页10条</option>
                <option>每页20条</option>
              </select>
              <div className="flex items-center space-x-1">
                <button className="px-2 py-1 border border-gray-200 rounded hover:bg-gray-50 text-gray-400">
                  &lt;&lt;
                </button>
                <button className="px-2 py-1 border border-gray-200 rounded hover:bg-gray-50 text-gray-400">
                  &lt;
                </button>
                <button className="px-2.5 py-1 bg-[#10b981] text-white rounded font-medium">
                  1
                </button>
                <button className="px-2 py-1 border border-gray-200 rounded hover:bg-gray-50 text-gray-400">
                  &gt;
                </button>
                <button className="px-2 py-1 border border-gray-200 rounded hover:bg-gray-50 text-gray-400">
                  &gt;&gt;
                </button>
              </div>
              <div className="flex items-center space-x-1">
                <span>前往第</span>
                <input
                  type="number"
                  defaultValue={1}
                  className="w-10 px-1 py-0.5 border border-gray-200 rounded text-center text-gray-700 bg-gray-50"
                />
                <span>页</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
