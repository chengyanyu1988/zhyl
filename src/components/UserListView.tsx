import React, { useState, useMemo } from 'react';
import {
  LayoutGrid,
  List,
  Search,
  RotateCcw,
  Plus,
  Trash2,
  Calendar,
  ChevronDown,
  X,
  Tag,
  Check,
  CheckCircle2,
  ArrowUpDown,
} from 'lucide-react';
import { AppUser } from '../types';
import { MOCK_APP_USERS } from '../data/userData';

interface UserListViewProps {
  onSelectUser: (user: AppUser) => void;
  onNotice: (msg: string) => void;
}

export const UserListView: React.FC<UserListViewProps> = ({
  onSelectUser,
  onNotice,
}) => {
  const [users, setUsers] = useState<AppUser[]>(MOCK_APP_USERS);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filters
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [startDate, setStartDate] = useState<string>('2026-09-01');
  const [endDate, setEndDate] = useState<string>('2026-09-18');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [tagModalUser, setTagModalUser] = useState<AppUser | null>(null);
  const [newTagInput, setNewTagInput] = useState('');
  const [deleteConfirmUser, setDeleteConfirmUser] = useState<AppUser | null>(null);

  // New user form state
  const [newUserName, setNewUserName] = useState('赵玉兰');
  const [newUserPhone, setNewUserPhone] = useState('13955667788');
  const [newUserGender, setNewGender] = useState<'男' | '女'>('女');
  const [newUserTags, setNewUserTags] = useState('高血压, 骨质疏松');
  const [newUserDate, setNewUserDate] = useState('2026-09-18');
  const [newUserAddress, setNewUserAddress] = useState('金桂名邸 2栋 1单元 302室');

  // Available tag options
  const tagOptions = [
    '高血压',
    '糖尿病',
    '多次购买',
    '骨质疏松',
    '长护险定点',
    '脑梗恢复期',
    '独居高龄',
    '失能特护',
    'COPD慢阻肺',
    '助餐关怀',
  ];

  // Filtered and strictly descending-sorted users
  const filteredUsers = useMemo(() => {
    return users
      .filter((u) => {
        const matchesTag =
          selectedTag === 'all' || u.tags.some((t) => t.includes(selectedTag));
        const userDate = u.registerTime.slice(0, 10);
        const matchesStartDate = !startDate || userDate >= startDate;
        const matchesEndDate = !endDate || userDate <= endDate;
        const q = searchQuery.trim().toLowerCase();
        const matchesSearch =
          !q ||
          u.name.toLowerCase().includes(q) ||
          u.userNo.toLowerCase().includes(q) ||
          u.realName.toLowerCase().includes(q) ||
          u.phone.includes(q) ||
          u.profile.address.toLowerCase().includes(q) ||
          u.tags.some((t) => t.toLowerCase().includes(q));

        return matchesTag && matchesStartDate && matchesEndDate && matchesSearch;
      })
      .sort((a, b) => new Date(b.registerTime).getTime() - new Date(a.registerTime).getTime());
  }, [users, selectedTag, startDate, endDate, searchQuery]);

  const handleResetFilters = () => {
    setSelectedTag('all');
    setStartDate('2026-09-01');
    setEndDate('2026-09-18');
    setSearchQuery('');
    onNotice('已重置所有筛选条件');
  };

  const handleDeleteUser = (user: AppUser) => {
    setUsers((prev) => prev.filter((u) => u.id !== user.id));
    setDeleteConfirmUser(null);
    onNotice(`已移除用户【${user.name}】(${user.userNo})`);
  };

  const handleAddTagSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tagModalUser || !newTagInput.trim()) return;

    const trimmed = newTagInput.trim();
    if (tagModalUser.tags.includes(trimmed)) {
      onNotice('该标签已存在');
      return;
    }

    const updated = users.map((u) =>
      u.id === tagModalUser.id ? { ...u, tags: [...u.tags, trimmed] } : u
    );
    setUsers(updated);
    setTagModalUser(null);
    setNewTagInput('');
    onNotice(`已为用户【${tagModalUser.name}】添加标签: ${trimmed}`);
  };

  const handleAddUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: AppUser = {
      id: `usr-${Date.now()}`,
      userNo: `2026090000${Math.floor(10 + Math.random() * 89)}`,
      name: newUserName,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&q=80',
      gender: newUserGender,
      tags: newUserTags.split(',').map((t) => t.trim()).filter(Boolean),
      realName: newUserName,
      phone: newUserPhone,
      phoneMasked: `${newUserPhone.slice(0, 3)}****${newUserPhone.slice(-4)}`,
      registerTime: `${newUserDate} 10:15:00`,
      registerType: '社区代办',
      lastLoginTime: `${newUserDate} 10:15:00`,
      lastBuyTime: `${newUserDate} 10:15:00`,
      remarks: '新录入建档长者，需跟进慢病管理及日常巡访。',
      social: {
        posts: 10,
        reads: 120,
        following: 15,
        followers: 20,
        likes: 500,
        favorites: 80,
        comments: 60,
        shares: 20,
      },
      operationLogs: [
        {
          id: `op-new-${Date.now()}`,
          action: '新增用户信息',
          operator: 'admin',
          time: `${newUserDate} 10:15:00`,
        },
      ],
      profile: {
        nickname: newUserName,
        accountId: `3230090${Math.floor(10 + Math.random() * 89)}`,
        birthDate: '1945-06-18',
        idCard: '320106194506180021',
        address: newUserAddress,
        bio: '热爱生活，知足常乐。',
        height: '165cm',
        weight: '60kg',
        ethnicity: '汉族',
        education: '高中',
        nativePlace: '南京市',
        marriage: '已婚',
        occupation: '退休职工',
        company: '南京纺织机械厂',
        emergencyContact: '家属代办',
        emergencyPhone: '13800000000',
        status: '启用',
        passwordMasked: 'ha889900',
      },
    };

    const updated = [newUser, ...users].sort(
      (a, b) => new Date(b.registerTime).getTime() - new Date(a.registerTime).getTime()
    );
    setUsers(updated);
    setShowAddModal(false);
    onNotice(`已成功新增建档长者【${newUserName}】(${newUserDate})`);
  };

  const getTagBadgeStyle = (tag: string, index: number) => {
    if (tag.includes('高血压') || tag.includes('健康') || index === 0) {
      return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    } else if (tag.includes('糖尿') || tag.includes('特护') || index === 1) {
      return 'bg-rose-50 text-rose-700 border-rose-200';
    }
    return 'bg-blue-50 text-blue-700 border-blue-200';
  };

  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-5">
      {/* Top Filter & Search Card */}
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
        {/* Title row */}
        <div className="flex items-center space-x-3 pb-5 border-b border-gray-100">
          <h1 className="text-base font-semibold text-gray-800 tracking-tight">
            全部用户
          </h1>
          <span className="text-xs text-gray-400">
            共 {filteredUsers.length} 位长者记录 (2026年9月)
          </span>
        </div>

        {/* Filter controls matching screenshot */}
        <div className="flex flex-wrap items-center gap-6 pt-5 text-xs text-gray-600">
          {/* Tag select */}
          <div className="flex items-center space-x-2">
            <span className="text-gray-500 font-medium shrink-0">用户标签</span>
            <div className="relative">
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="appearance-none pl-3 pr-8 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:border-[#10b981] cursor-pointer min-w-[140px]"
              >
                <option value="all">请选择</option>
                {tagOptions.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Registration Date picker */}
          <div className="flex items-center space-x-2">
            <span className="text-gray-500 font-medium shrink-0">注册日期</span>
            <div className="flex items-center px-2.5 py-1.5 bg-white border border-gray-200 rounded-lg text-gray-700 space-x-1 hover:border-[#10b981] transition-colors focus-within:border-[#10b981] focus-within:ring-1 focus-within:ring-[#10b981]/20">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="bg-transparent border-none text-xs text-gray-700 focus:outline-none font-sans cursor-pointer p-0"
              />
              <span className="text-gray-400 px-0.5">~</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="bg-transparent border-none text-xs text-gray-700 focus:outline-none font-sans cursor-pointer p-0"
              />
              <Calendar className="w-3.5 h-3.5 text-gray-400 pointer-events-none ml-1 shrink-0" />
            </div>
          </div>

          {/* Search Input & Action Buttons */}
          <div className="flex items-center space-x-2 flex-1 min-w-[280px]">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="请输入关键字"
              className="flex-1 px-3.5 py-2 bg-white border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:border-[#10b981] placeholder:text-gray-400"
            />
            {/* Search Button (Green) */}
            <button
              id="user-search-btn"
              onClick={() => onNotice(`已检索长者: "${searchQuery || '全部'}"`)}
              className="w-8 h-8 rounded-lg bg-[#10b981] hover:bg-[#059669] text-white flex items-center justify-center transition-colors shadow-xs shrink-0"
              title="搜索"
            >
              <Search className="w-4 h-4" />
            </button>
            {/* Reset Button */}
            <button
              id="user-reset-btn"
              onClick={handleResetFilters}
              className="w-8 h-8 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 flex items-center justify-center transition-colors shrink-0"
              title="重置"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] min-h-[720px]">
        {/* View Switcher & Action Bar matching screenshot */}
        <div className="flex items-center justify-between pb-5 border-b border-gray-100">
          {/* Left: View toggle icons */}
          <div className="flex items-center space-x-2">
            <button
              id="view-grid-btn"
              onClick={() => setViewMode('grid')}
              title="网格卡片视图"
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === 'grid'
                  ? 'text-[#10b981] bg-emerald-50'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              id="view-list-btn"
              onClick={() => setViewMode('list')}
              title="列表表格视图"
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === 'list'
                  ? 'text-[#10b981] bg-emerald-50'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* Right: New & Batch operations */}
          <div className="flex items-center space-x-3">
            <button
              id="btn-add-user"
              onClick={() => setShowAddModal(true)}
              className="px-4 py-1.5 text-xs bg-[#10b981] hover:bg-[#059669] text-white rounded-lg font-medium transition-colors shadow-xs"
            >
              新增
            </button>
            <button
              id="btn-batch-ops"
              onClick={() => onNotice('已选定当页所有长者进入批量健康随访通知与标签派发')}
              className="px-4 py-1.5 text-xs bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 rounded-lg font-medium transition-colors"
            >
              批量操作
            </button>
          </div>
        </div>

        {/* View 1: Grid Cards (matching screenshot) */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 pt-6">
            {filteredUsers.map((user) => {
              return (
                <div
                  key={user.id}
                  className="bg-white rounded-xl border border-gray-100/90 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:border-emerald-200 transition-all duration-200 p-5 flex flex-col justify-between relative group text-xs"
                >
                  {/* Delete Icon on top right */}
                  <button
                    onClick={() => setDeleteConfirmUser(user)}
                    title="删除长者"
                    className="absolute top-4 right-4 text-gray-300 hover:text-rose-500 transition-colors p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div>
                    {/* Top Row: Avatar & Name/ID */}
                    <div className="flex items-center space-x-3 pr-8">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100 shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center space-x-1.5">
                          <h3 className="font-bold text-gray-800 text-sm tracking-tight truncate">
                            {user.name}
                          </h3>
                          <span
                            className={`text-[10px] font-bold ${
                              user.gender === '男' ? 'text-teal-600' : 'text-rose-500'
                            }`}
                          >
                            {user.gender === '男' ? '♂' : '♀'}
                          </span>
                        </div>
                        <div className="text-[11px] text-gray-400 font-mono mt-0.5">
                          ID:{user.userNo}
                        </div>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mt-3.5">
                      {user.tags.slice(0, 3).map((tag, idx) => (
                        <span
                          key={tag}
                          className={`px-2 py-0.5 rounded text-[10px] font-medium border ${getTagBadgeStyle(
                            tag,
                            idx
                          )}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Detail Lines matching screenshot */}
                    <div className="space-y-1.5 mt-4 text-[11px] text-gray-500">
                      <div>
                        真实姓名：<span className="text-gray-800 font-medium">{user.realName}</span>
                      </div>
                      <div>
                        手机号码：<span className="text-gray-800 font-mono font-medium">{user.phoneMasked}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span>注册时间：</span>
                        <span className="text-gray-800 font-mono font-medium">{user.registerTime}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action Buttons matching screenshot */}
                  <div className="grid grid-cols-2 gap-2 pt-5 mt-4 border-t border-gray-50">
                    <button
                      onClick={() => onSelectUser(user)}
                      className="w-full py-1.5 bg-[#10b981] hover:bg-[#059669] text-white rounded-lg font-medium text-center transition-colors shadow-xs"
                    >
                      用户详情
                    </button>
                    <button
                      onClick={() => {
                        setTagModalUser(user);
                        setNewTagInput('');
                      }}
                      className="w-full py-1.5 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 rounded-lg font-medium text-center transition-colors"
                    >
                      添加标签
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* View 2: List / Table View */
          <div className="mt-4 overflow-x-auto border border-gray-100 rounded-xl text-xs">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50/80 text-gray-500 border-b border-gray-100">
                  <th className="py-3 px-3.5 text-left font-semibold w-28">用户ID</th>
                  <th className="py-3 px-3.5 text-left font-semibold w-40">长者信息</th>
                  <th className="py-3 px-3.5 text-left font-semibold w-32">手机号码</th>
                  <th className="py-3 px-3.5 text-left font-semibold">健康与慢性病标签</th>
                  <th className="py-3 px-3.5 text-left font-semibold w-40">
                    <div className="flex items-center space-x-1">
                      <span>注册时间</span>
                      <ArrowUpDown className="w-3 h-3 text-emerald-600" />
                    </div>
                  </th>
                  <th className="py-3 px-3.5 text-left font-semibold w-40">最近登录</th>
                  <th className="py-3 px-3.5 text-center font-semibold w-20">状态</th>
                  <th className="py-3 px-3.5 text-right font-semibold w-32">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredUsers.map((user) => {
                  const isYesterday = user.registerTime.startsWith('2026-09-18');

                  return (
                    <tr key={user.id} className="hover:bg-gray-50/70 transition-colors">
                      <td className="py-3 px-3.5 font-mono text-gray-500 text-[11px]">
                        {user.userNo}
                      </td>

                      <td className="py-3 px-3.5">
                        <div className="flex items-center space-x-2.5">
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-8 h-8 rounded-full object-cover ring-1 ring-gray-200"
                          />
                          <div>
                            <div className="font-semibold text-gray-800 flex items-center space-x-1">
                              <span>{user.name}</span>
                              <span className="text-[10px] text-gray-400 font-normal">
                                ({user.gender})
                              </span>
                            </div>
                            <div className="text-[10px] text-gray-400">
                              {user.profile.nativePlace}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-3.5 font-mono text-gray-700">
                        {user.phoneMasked}
                      </td>

                      <td className="py-3 px-3.5">
                        <div className="flex flex-wrap gap-1">
                          {user.tags.map((tag, idx) => (
                            <span
                              key={tag}
                              className={`px-1.5 py-0.5 rounded text-[10px] font-medium border ${getTagBadgeStyle(
                                tag,
                                idx
                              )}`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>

                      <td className="py-3 px-3.5">
                        <div className="flex items-center space-x-1 font-semibold text-gray-800">
                          <span>{user.registerTime}</span>
                        </div>
                      </td>

                      <td className="py-3 px-3.5 text-gray-600 font-mono text-[11px]">
                        {user.lastLoginTime}
                      </td>

                      <td className="py-3 px-3.5 text-center">
                        <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px]">
                          {user.profile.status}
                        </span>
                      </td>

                      <td className="py-3 px-3.5 text-right space-x-2">
                        <button
                          onClick={() => onSelectUser(user)}
                          className="text-emerald-700 hover:text-emerald-900 font-medium hover:underline"
                        >
                          详情
                        </button>
                        <button
                          onClick={() => {
                            setTagModalUser(user);
                            setNewTagInput('');
                          }}
                          className="text-gray-500 hover:text-gray-700 hover:underline"
                        >
                          标签
                        </button>
                        <button
                          onClick={() => setDeleteConfirmUser(user)}
                          className="text-rose-500 hover:text-rose-700 hover:underline"
                        >
                          删除
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Tag Add Modal */}
      {tagModalUser && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-[1px] flex items-center justify-center z-50 p-4 animate-in fade-in">
          <form
            onSubmit={handleAddTagSubmit}
            className="bg-white rounded-2xl w-full max-w-sm shadow-2xl border border-gray-100 overflow-hidden text-xs"
          >
            <div className="px-5 py-4 bg-gray-50/80 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center space-x-2 font-bold text-gray-800">
                <Tag className="w-4 h-4 text-emerald-600" />
                <span>为【{tagModalUser.name}】添加标签</span>
              </div>
              <button
                type="button"
                onClick={() => setTagModalUser(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-3">
              <div className="text-gray-500">当前已有标签：</div>
              <div className="flex flex-wrap gap-1.5">
                {tagModalUser.tags.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-[11px]"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="pt-2">
                <label className="block text-gray-500 font-medium mb-1">
                  选择或输入新标签名称
                </label>
                <input
                  type="text"
                  value={newTagInput}
                  onChange={(e) => setNewTagInput(e.target.value)}
                  placeholder="例如: 跌倒高危, 听力轻损, 助浴关怀"
                  required
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#10b981]"
                />
              </div>

              {/* Quick tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {['心血管随访', '跌倒高危', '助浴特护', '独居长者', '关节炎'].map(
                  (qt) => (
                    <button
                      type="button"
                      key={qt}
                      onClick={() => setNewTagInput(qt)}
                      className="px-2 py-0.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded text-[10px]"
                    >
                      +{qt}
                    </button>
                  )
                )}
              </div>
            </div>

            <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-end space-x-2">
              <button
                type="button"
                onClick={() => setTagModalUser(null)}
                className="px-3.5 py-1.5 text-gray-600 hover:bg-gray-200/60 rounded-lg"
              >
                取消
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-[#10b981] hover:bg-[#059669] text-white rounded-lg font-medium shadow-xs"
              >
                确认添加
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmUser && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-[1px] flex items-center justify-center z-50 p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl border border-gray-100 overflow-hidden text-xs p-5 space-y-4">
            <div className="flex items-center space-x-3 text-rose-600">
              <Trash2 className="w-5 h-5" />
              <h3 className="font-bold text-sm text-gray-800">确认删除该长者记录？</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              确定要移除长者【{deleteConfirmUser.name}】(ID: {deleteConfirmUser.userNo}) 吗？删除后相关健康档案与履约记录将被归档。
            </p>
            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                onClick={() => setDeleteConfirmUser(null)}
                className="px-4 py-1.5 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50"
              >
                取消
              </button>
              <button
                onClick={() => handleDeleteUser(deleteConfirmUser)}
                className="px-4 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-medium"
              >
                确认删除
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-[1px] flex items-center justify-center z-50 p-4 animate-in fade-in">
          <form
            onSubmit={handleAddUserSubmit}
            className="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-gray-100 overflow-hidden text-xs"
          >
            <div className="px-6 py-4 bg-gray-50/80 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center space-x-2 font-bold text-gray-800">
                <span className="w-1.5 h-4 bg-[#10b981] rounded-full"></span>
                <span>新增建档长者 (2026年9月)</span>
              </div>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-3.5">
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="block text-gray-500 font-medium mb-1">长者姓名</label>
                  <input
                    type="text"
                    value={newUserName}
                    onChange={(e) => setNewUserName(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#10b981]"
                  />
                </div>
                <div>
                  <label className="block text-gray-500 font-medium mb-1">性别</label>
                  <select
                    value={newUserGender}
                    onChange={(e) => setNewGender(e.target.value as '男' | '女')}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#10b981]"
                  >
                    <option value="女">女</option>
                    <option value="男">男</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-500 font-medium mb-1">手机号码</label>
                <input
                  type="text"
                  value={newUserPhone}
                  onChange={(e) => setNewUserPhone(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#10b981]"
                />
              </div>

              <div>
                <label className="block text-gray-500 font-medium mb-1">注册建档日期 (2026-09-01 至 2026-09-18)</label>
                <select
                  value={newUserDate}
                  onChange={(e) => setNewUserDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#10b981]"
                >
                  {Array.from({ length: 18 }, (_, i) => {
                    const day = 18 - i;
                    const d = `2026-09-${day < 10 ? '0' + day : day}`;
                    return (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div>
                <label className="block text-gray-500 font-medium mb-1">用户慢病与健康标签 (逗号隔开)</label>
                <input
                  type="text"
                  value={newUserTags}
                  onChange={(e) => setNewUserTags(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#10b981]"
                />
              </div>

              <div>
                <label className="block text-gray-500 font-medium mb-1">家庭住址</label>
                <input
                  type="text"
                  value={newUserAddress}
                  onChange={(e) => setNewUserAddress(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#10b981]"
                />
              </div>
            </div>

            <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-200/60 rounded-lg"
              >
                取消
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#10b981] hover:bg-[#059669] text-white rounded-lg font-medium shadow-xs"
              >
                确认录入
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
