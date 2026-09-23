import React, { useState, useMemo } from 'react';
import { Search, RotateCcw, Plus, X, Calendar } from 'lucide-react';
import { ServiceTagItem, INITIAL_SERVICE_TAGS } from '../../data/serviceData';

interface ServiceStaffTagsProps {
  onNotice: (msg: string) => void;
}

export const ServiceStaffTags: React.FC<ServiceStaffTagsProps> = ({ onNotice }) => {
  const [tags, setTags] = useState<ServiceTagItem[]>(INITIAL_SERVICE_TAGS);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Filters (Screenshot 6)
  const [tagNameFilter, setTagNameFilter] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Modal (Screenshot 7)
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTag, setEditingTag] = useState<ServiceTagItem | null>(null);
  const [formTagName, setFormTagName] = useState('');
  const [formEnabled, setFormEnabled] = useState(true);

  const filteredTags = useMemo(() => {
    return tags
      .filter((item) => {
        if (tagNameFilter && !item.name.includes(tagNameFilter.trim())) return false;
        if (startDate && item.lastUpdateTime.slice(0, 10) < startDate) return false;
        if (endDate && item.lastUpdateTime.slice(0, 10) > endDate) return false;
        return true;
      })
      .sort((a, b) => new Date(b.lastUpdateTime).getTime() - new Date(a.lastUpdateTime).getTime());
  }, [tags, tagNameFilter, startDate, endDate]);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(filteredTags.map((t) => t.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleResetFilters = () => {
    setTagNameFilter('');
    setStartDate('');
    setEndDate('');
    onNotice('已重置服务人员标签检索条件');
  };

  const handleToggleEnabled = (tag: ServiceTagItem) => {
    const updated = tags.map((t) => (t.id === tag.id ? { ...t, enabled: !t.enabled } : t));
    setTags(updated);
    onNotice(`已${!tag.enabled ? '启用' : '禁用'}标签【${tag.name}】`);
  };

  const handleDelete = (tag: ServiceTagItem) => {
    if (confirm(`确认删除服务人员标签【${tag.name}】？`)) {
      setTags(tags.filter((t) => t.id !== tag.id));
      onNotice(`已删除服务人员标签【${tag.name}】`);
    }
  };

  const handleOpenCreate = () => {
    setEditingTag(null);
    setFormTagName('');
    setFormEnabled(true);
    setModalOpen(true);
  };

  const handleOpenEdit = (tag: ServiceTagItem) => {
    setEditingTag(tag);
    setFormTagName(tag.name);
    setFormEnabled(tag.enabled);
    setModalOpen(true);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTagName.trim()) {
      alert('请填写标签名称');
      return;
    }

    if (editingTag) {
      const updated = tags.map((t) =>
        t.id === editingTag.id
          ? {
              ...t,
              name: formTagName.trim(),
              enabled: formEnabled,
              lastUpdater: '当前管理员',
              lastUpdateTime: '2026-09-19 16:30:00',
            }
          : t
      );
      setTags(updated);
      onNotice(`已成功更新标签【${formTagName}】`);
    } else {
      const newTag: ServiceTagItem = {
        id: `tag-${Date.now()}`,
        name: formTagName.trim(),
        staffCount: 0,
        lastUpdater: '当前管理员',
        lastUpdateTime: '2026-09-19 16:30:00',
        enabled: formEnabled,
      };
      setTags([newTag, ...tags]);
      onNotice(`已新增服务人员标签【${formTagName}】`);
    }
    setModalOpen(false);
  };

  return (
    <div className="p-6 max-w-[1600px] mx-auto text-xs space-y-6">
      {/* Filter Card (Screenshot 6) */}
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-5">
        {/* Title */}
        <div className="flex items-center space-x-2.5 pb-2">
          <span className="w-1 h-4 bg-[#10b981] rounded-full"></span>
          <h1 className="text-sm font-semibold text-gray-800">标签管理</h1>
        </div>

        {/* Filter Rows */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <span className="text-gray-500 whitespace-nowrap">标签名称</span>
            <input
              type="text"
              value={tagNameFilter}
              onChange={(e) => setTagNameFilter(e.target.value)}
              placeholder="请输入"
              className="w-48 px-3 py-1.5 border border-gray-200 rounded-md text-gray-700 focus:outline-none focus:border-[#10b981]"
            />
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-gray-500 whitespace-nowrap">更新日期</span>
            <div className="flex items-center space-x-2">
              <input
                type="date"
                min="2026-09-01"
                max="2026-09-19"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-36 px-2.5 py-1.5 border border-gray-200 rounded-md text-gray-700 text-xs focus:outline-none focus:border-[#10b981]"
              />
              <span className="text-gray-400">~</span>
              <input
                type="date"
                min="2026-09-01"
                max="2026-09-19"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-36 px-2.5 py-1.5 border border-gray-200 rounded-md text-gray-700 text-xs focus:outline-none focus:border-[#10b981]"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => onNotice(`已筛选出 ${filteredTags.length} 个标签`)}
              className="p-2 bg-[#10b981] hover:bg-[#059669] text-white rounded-md transition-colors"
              title="搜索"
            >
              <Search className="w-4 h-4" />
            </button>
            <button
              onClick={handleResetFilters}
              className="p-2 border border-gray-200 hover:bg-gray-50 text-gray-500 rounded-md transition-colors"
              title="重置"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Table Card (Screenshot 6) */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-hidden">
        {/* Top Actions */}
        <div className="p-4 flex items-center justify-end space-x-3 border-b border-gray-100">
          <button
            onClick={handleOpenCreate}
            className="px-4 py-1.5 bg-[#10b981] hover:bg-[#059669] text-white rounded-md font-medium transition-colors"
          >
            新增
          </button>
          <button
            onClick={() => {
              if (selectedIds.length === 0) {
                onNotice('请先勾选需要批量操作的标签');
              } else {
                onNotice(`已批量处理 ${selectedIds.length} 个服务标签`);
              }
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
                <th className="py-3 px-4 w-10">
                  <input
                    type="checkbox"
                    checked={selectedIds.length > 0 && selectedIds.length === filteredTags.length}
                    onChange={handleSelectAll}
                    className="rounded text-[#10b981] accent-[#10b981]"
                  />
                </th>
                <th className="py-3 px-4 font-medium">标签名称</th>
                <th className="py-3 px-4 font-medium">服务人员数</th>
                <th className="py-3 px-4 font-medium">最后更新人</th>
                <th className="py-3 px-4 font-medium">最后更新时间</th>
                <th className="py-3 px-4 font-medium">状态</th>
                <th className="py-3 px-4 font-medium text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredTags.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-400">
                    暂无符合条件的标签数据
                  </td>
                </tr>
              ) : (
                filteredTags.map((tag) => (
                  <tr key={tag.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="py-3.5 px-4">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(tag.id)}
                        onChange={() => handleSelectOne(tag.id)}
                        className="rounded text-[#10b981] accent-[#10b981]"
                      />
                    </td>
                    <td className="py-3.5 px-4 font-medium text-gray-800">{tag.name}</td>
                    <td className="py-3.5 px-4 font-mono text-gray-600">{tag.staffCount}</td>
                    <td className="py-3.5 px-4 text-gray-600">{tag.lastUpdater}</td>
                    <td className="py-3.5 px-4 font-mono text-gray-500 whitespace-nowrap">
                      {tag.lastUpdateTime}
                    </td>
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => handleToggleEnabled(tag)}
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium transition-colors ${
                          tag.enabled
                            ? 'bg-[#10b981] text-white hover:bg-[#059669]'
                            : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                        }`}
                      >
                        {tag.enabled ? '启用' : '禁用'}
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end space-x-3">
                        <button
                          onClick={() => handleOpenEdit(tag)}
                          className="text-[#10b981] hover:underline"
                        >
                          编辑
                        </button>
                        <button
                          onClick={() => handleDelete(tag)}
                          className="text-rose-500 hover:underline"
                        >
                          删除
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: 新增标签 / 编辑标签 (Screenshot 7) */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <form
            onSubmit={handleSaveModal}
            className="bg-white rounded-xl p-6 max-w-md w-full border border-gray-100 shadow-2xl space-y-5"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center space-x-2">
                <span className="w-1 h-4 bg-[#10b981] rounded-full"></span>
                <h3 className="font-semibold text-gray-800 text-sm">
                  {editingTag ? '编辑标签' : '新增标签'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Fields */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <label className="w-20 text-gray-600">
                  标签名称<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formTagName}
                  onChange={(e) => setFormTagName(e.target.value)}
                  placeholder="请输入"
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-md text-gray-800 focus:outline-none focus:border-[#10b981]"
                />
              </div>

              <div className="flex items-center space-x-3">
                <label className="w-20 text-gray-600">状态</label>
                <button
                  type="button"
                  onClick={() => setFormEnabled(!formEnabled)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    formEnabled ? 'bg-[#10b981] text-white' : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {formEnabled ? '启用' : '禁用'}
                </button>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-gray-100 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="px-4 py-1.5 border border-gray-200 text-gray-600 rounded-md hover:bg-gray-50 transition-colors"
              >
                取消
              </button>
              <button
                type="submit"
                className="px-5 py-1.5 bg-[#10b981] text-white rounded-md hover:bg-[#059669] font-medium transition-colors"
              >
                确认
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
