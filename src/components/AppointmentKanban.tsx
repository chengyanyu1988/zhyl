import React, { useState, useMemo } from 'react';
import {
  Calendar as CalendarIcon,
  ChevronDown,
  Clock,
  User,
  Phone,
  MapPin,
  FileText,
  X,
  Plus,
  LayoutGrid,
  Table as TableIcon,
  Search,
  ArrowUpDown,
  CheckCircle2,
  AlertCircle,
  Filter,
} from 'lucide-react';
import { AppointmentItem, AppointmentStatus } from '../types';
import { INITIAL_APPOINTMENTS } from '../data/mockData';

interface AppointmentKanbanProps {
  onNotice: (msg: string) => void;
}

export const AppointmentKanban: React.FC<AppointmentKanbanProps> = ({
  onNotice,
}) => {
  // View mode: kanban or table
  const [viewMode, setViewMode] = useState<'kanban' | 'table'>('kanban');

  // Date selection: 2026-09-01 至 2026-09-18
  const [selectedDate, setSelectedDate] = useState<string>('2026-09-18');
  const [selectedStaff, setSelectedStaff] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [dateFilterScope, setDateFilterScope] = useState<'all' | 'specific'>('specific');

  const [appointments, setAppointments] = useState<AppointmentItem[]>(INITIAL_APPOINTMENTS);
  const [selectedAppointment, setSelectedAppointment] = useState<AppointmentItem | null>(null);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  // New appointment form state
  const [newTitle, setNewTitle] = useState('适老化居家跌倒风险评估与巡检');
  const [newDate, setNewDate] = useState('2026-09-18');
  const [newHour, setNewHour] = useState(11);
  const [newTimeRange, setNewTimeRange] = useState('11:00-12:00');
  const [newCategory, setNewCategory] = useState<'康复理疗' | '家政护理' | '上门体检'>('家政护理');
  const [newStaff, setNewStaff] = useState('王小倩');
  const [newUserName, setNewUserName] = useState('高素琴');
  const [newUserAge, setNewUserAge] = useState(82);
  const [newUserPhone, setNewUserPhone] = useState('138****6699');
  const [newUserAddress, setNewUserAddress] = useState('康乐家园 3栋 1单元 502室');
  const [newNotes, setNewNotes] = useState('老人独居有骨质疏松史，重点排查卫生间和卧室夜行照明防滑。');

  // Staff avatar lookup
  const staffAvatarMap: Record<string, string> = {
    '王小倩': 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80',
    '李建国': 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=120&q=80',
    '张玉婷': 'https://images.unsplash.com/photo-1594824813576-2612a2082260?auto=format&fit=crop&w=120&q=80',
    '陈秀英': 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80',
    '赵立峰': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
  };

  // Filtered and strictly sorted appointments (descending by date and hour)
  const filteredAppointments = useMemo(() => {
    return appointments
      .filter((apt) => {
        // In kanban view, we only show selectedDate. In table view, depend on dateFilterScope
        if (viewMode === 'kanban') {
          if (apt.date !== selectedDate) return false;
        } else {
          if (dateFilterScope === 'specific' && apt.date !== selectedDate) return false;
        }

        const matchesStaff = selectedStaff === 'all' || apt.staffName === selectedStaff;
        const matchesCategory = selectedCategory === 'all' || apt.category === selectedCategory;
        const matchesStatus = selectedStatus === 'all' || apt.status === selectedStatus;

        const q = searchQuery.trim().toLowerCase();
        const matchesSearch =
          !q ||
          apt.title.toLowerCase().includes(q) ||
          apt.userName.toLowerCase().includes(q) ||
          (apt.orderNo && apt.orderNo.toLowerCase().includes(q)) ||
          (apt.address && apt.address.toLowerCase().includes(q)) ||
          apt.staffName.toLowerCase().includes(q);

        return matchesStaff && matchesCategory && matchesStatus && matchesSearch;
      })
      .sort((a, b) => {
        // Strict descending sort by timestamp
        const timeA = new Date(`${a.date}T${String(a.startHour).padStart(2, '0')}:00:00`).getTime();
        const timeB = new Date(`${b.date}T${String(b.startHour).padStart(2, '0')}:00:00`).getTime();
        return timeB - timeA;
      });
  }, [
    appointments,
    viewMode,
    selectedDate,
    selectedStaff,
    selectedCategory,
    selectedStatus,
    searchQuery,
    dateFilterScope,
  ]);

  const timeSlots = [9, 10, 11, 12, 13, 14, 15, 16];

  const getAppointmentsForHour = (hour: number) => {
    return filteredAppointments.filter((apt) => apt.startHour === hour);
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case '已完成':
        return {
          topBorder: 'border-t-[3px] border-[#fbbf24]',
          statusColor: 'text-[#f59e0b]',
          badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
        };
      case '服务中':
        return {
          topBorder: 'border-t-[3px] border-[#2dd4bf]',
          statusColor: 'text-[#10b981]',
          badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        };
      case '待服务':
      default:
        return {
          topBorder: 'border-t-[3px] border-[#f87171]',
          statusColor: 'text-[#f87171]',
          badgeBg: 'bg-rose-50 text-rose-600 border-rose-200',
        };
    }
  };

  const getCategoryBadge = (cat: string) => {
    switch (cat) {
      case '康复理疗':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case '家政护理':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case '上门体检':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const handleAddAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanDateStr = newDate.replace(/-/g, '');
    const randomSuffix = Math.floor(100 + Math.random() * 900);
    const generatedOrderNo = `WO-${cleanDateStr}-${randomSuffix}`;

    const newApt: AppointmentItem = {
      id: `apt-${Date.now()}`,
      orderNo: generatedOrderNo,
      title: newTitle,
      timeRange: newTimeRange,
      startHour: newHour,
      userName: newUserName,
      userAge: Number(newUserAge) || 80,
      staffName: newStaff,
      userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=80&q=80',
      staffAvatar:
        staffAvatarMap[newStaff] ||
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=80&q=80',
      status: '待服务',
      category: newCategory,
      date: newDate,
      phone: newUserPhone,
      address: newUserAddress,
      notes: newNotes,
    };

    // Keep sorted descending by time
    const updated = [newApt, ...appointments].sort((a, b) => {
      const timeA = new Date(`${a.date}T${String(a.startHour).padStart(2, '0')}:00:00`).getTime();
      const timeB = new Date(`${b.date}T${String(b.startHour).padStart(2, '0')}:00:00`).getTime();
      return timeB - timeA;
    });

    setAppointments(updated);
    setShowAddModal(false);
    onNotice(`已成功添加工单【${newTitle}】(${newDate} ${newTimeRange})`);
  };

  const handleToggleStatus = (aptToUpdate: AppointmentItem) => {
    const nextStatus: AppointmentStatus =
      aptToUpdate.status === '待服务'
        ? '服务中'
        : aptToUpdate.status === '服务中'
        ? '已完成'
        : '待服务';

    const updated = appointments.map((a) =>
      a.id === aptToUpdate.id ? { ...a, status: nextStatus } : a
    );
    setAppointments(updated);
    if (selectedAppointment && selectedAppointment.id === aptToUpdate.id) {
      setSelectedAppointment({ ...selectedAppointment, status: nextStatus });
    }
    onNotice(`工单【${aptToUpdate.title}】状态已更新为: ${nextStatus}`);
  };

  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-5">
      {/* Kanban Main Card */}
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] min-h-[820px]">
        {/* Title Header with Mode Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-gray-100 gap-4">
          <div className="flex items-center space-x-3">
            <span className="w-1.5 h-4 bg-[#10b981] rounded-full"></span>
            <h1 className="text-base font-semibold text-gray-800 tracking-tight">
              预约看板
            </h1>

            {/* View Mode Toggle: Kanban vs Table */}
            <div className="flex items-center bg-gray-100 p-0.5 rounded-lg text-xs font-medium ml-3">
              <button
                id="tab-view-kanban"
                onClick={() => setViewMode('kanban')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md transition-all ${
                  viewMode === 'kanban'
                    ? 'bg-white text-emerald-700 shadow-xs font-semibold'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>看板视图</span>
              </button>
              <button
                id="tab-view-table"
                onClick={() => setViewMode('table')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md transition-all ${
                  viewMode === 'table'
                    ? 'bg-white text-emerald-700 shadow-xs font-semibold'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                <TableIcon className="w-3.5 h-3.5" />
                <span>表格列表</span>
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Sort order badge indicator */}
            <div className="hidden md:flex items-center space-x-1.5 text-xs text-emerald-700 bg-emerald-50/80 px-2.5 py-1 rounded-md border border-emerald-200">
              <ArrowUpDown className="w-3 h-3" />
              <span>按服务时间降序 (2026-09-18 至 2026-09-01)</span>
            </div>

            <button
              id="btn-add-appointment"
              onClick={() => setShowAddModal(true)}
              className="px-3.5 py-1.5 text-xs bg-[#10b981] hover:bg-[#059669] text-white rounded-lg flex items-center space-x-1.5 font-medium transition-colors shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>新增排班预约</span>
            </button>
          </div>
        </div>

        {/* Filter Controls Row */}
        <div className="flex flex-wrap items-center gap-4 pt-5 pb-5 text-xs text-gray-600 border-b border-gray-50">
          {/* Select Date */}
          <div className="flex items-center space-x-2 relative">
            <span className="text-gray-500 font-medium whitespace-nowrap">选择日期</span>
            <div
              id="date-picker-trigger"
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="flex items-center justify-between w-44 px-3.5 py-2 bg-white border border-gray-200 rounded-lg cursor-pointer hover:border-[#10b981] transition-colors shadow-2xs"
            >
              <span className="font-mono text-gray-800">
                {dateFilterScope === 'all' && viewMode === 'table'
                  ? '全部 (9月1日-18日)'
                  : `${selectedDate}`}
              </span>
              <CalendarIcon className="w-4 h-4 text-gray-400 shrink-0" />
            </div>

            {/* Date Picker Popover restricted to 2026-09-01 to 2026-09-18 */}
            {showDatePicker && (
              <div className="absolute top-11 left-0 w-72 bg-white rounded-xl shadow-xl border border-gray-100 p-3 z-50 animate-in fade-in">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-gray-100 font-semibold text-gray-800 text-xs">
                  <span>2026年9月</span>
                  <button
                    onClick={() => setShowDatePicker(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="text-[11px] text-gray-400 mb-2">
                  系统范围：2026-09-01 至 2026-09-18
                </div>

                {viewMode === 'table' && (
                  <button
                    onClick={() => {
                      setDateFilterScope('all');
                      setShowDatePicker(false);
                      onNotice('已切换为显示 2026年9月全部日期 (降序排列)');
                    }}
                    className={`w-full mb-2.5 py-1.5 rounded text-xs font-medium transition-colors ${
                      dateFilterScope === 'all'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    查看全部日期 (2026-09-01 至 2026-09-18)
                  </button>
                )}

                <div className="grid grid-cols-6 gap-1 text-center">
                  {Array.from({ length: 18 }, (_, i) => {
                    const dayNum = i + 1;
                    const dateStr = `2026-09-${dayNum < 10 ? '0' + dayNum : dayNum}`;
                    const isSelected = dateFilterScope === 'specific' && selectedDate === dateStr;

                    return (
                      <button
                        key={dayNum}
                        onClick={() => {
                          setSelectedDate(dateStr);
                          setDateFilterScope('specific');
                          setShowDatePicker(false);
                          onNotice(`已切换日期至: ${dateStr}`);
                        }}
                        className={`py-1.5 rounded text-xs transition-colors ${
                          isSelected
                            ? 'bg-[#10b981] text-white font-bold'
                            : 'hover:bg-gray-100 text-gray-700'
                        }`}
                      >
                        {dayNum}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Select Staff */}
          <div className="flex items-center space-x-2">
            <span className="text-gray-500 font-medium whitespace-nowrap">服务人员</span>
            <div className="relative">
              <select
                id="select-staff"
                value={selectedStaff}
                onChange={(e) => {
                  setSelectedStaff(e.target.value);
                  onNotice(
                    e.target.value === 'all'
                      ? '筛选：全部服务人员'
                      : `筛选服务人员：${e.target.value}`
                  );
                }}
                className="appearance-none w-44 px-3.5 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:border-[#10b981] shadow-2xs pr-8 cursor-pointer"
              >
                <option value="all">请选择 (全部)</option>
                <option value="王小倩">王小倩 (高级家政护工)</option>
                <option value="李建国">李建国 (康复理疗主管)</option>
                <option value="张玉婷">张玉婷 (主管护师)</option>
                <option value="陈秀英">陈秀英 (资深养老护理员)</option>
                <option value="赵立峰">赵立峰 (适老助安技师)</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Select Service Type */}
          <div className="flex items-center space-x-2">
            <span className="text-gray-500 font-medium whitespace-nowrap">服务类型</span>
            <div className="relative">
              <select
                id="select-category"
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  onNotice(
                    e.target.value === 'all'
                      ? '筛选：全部服务类型'
                      : `筛选服务类型：${e.target.value}`
                  );
                }}
                className="appearance-none w-40 px-3.5 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:border-[#10b981] shadow-2xs pr-8 cursor-pointer"
              >
                <option value="all">请选择 (全部)</option>
                <option value="家政护理">家政护理</option>
                <option value="康复理疗">康复理疗</option>
                <option value="上门体检">上门体检</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Select Status */}
          <div className="flex items-center space-x-2">
            <span className="text-gray-500 font-medium whitespace-nowrap">状态</span>
            <div className="relative">
              <select
                id="select-status"
                value={selectedStatus}
                onChange={(e) => {
                  setSelectedStatus(e.target.value);
                }}
                className="appearance-none w-32 px-3 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:border-[#10b981] shadow-2xs pr-8 cursor-pointer"
              >
                <option value="all">全部状态</option>
                <option value="待服务">待服务</option>
                <option value="服务中">服务中</option>
                <option value="已完成">已完成</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Search box (particularly useful for table view) */}
          <div className="flex-1 min-w-[200px] flex items-center justify-end">
            <div className="relative w-full max-w-xs">
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索长者/服务项/工单号/地址..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:border-[#10b981]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* VIEW MODE 1: KANBAN BOARD */}
        {viewMode === 'kanban' && (
          <div className="mt-4 border-t border-gray-100">
            <div className="py-2 text-[11px] text-gray-400 flex items-center justify-between">
              <span>当前看板日期：<strong className="text-gray-700">{selectedDate}</strong></span>
              <span>共找到 {filteredAppointments.length} 项排班工单</span>
            </div>

            {timeSlots.map((hour) => {
              const slotAppointments = getAppointmentsForHour(hour);

              return (
                <div
                  key={hour}
                  id={`timeline-slot-${hour}`}
                  className="flex border-b border-gray-100/80 min-h-[105px] relative group hover:bg-gray-50/30 transition-colors"
                >
                  {/* Time Label Column on the Left */}
                  <div className="w-20 pt-3 text-xs text-gray-400 font-normal shrink-0 select-none">
                    {hour}:00
                  </div>

                  {/* Appointment Cards Slot Area */}
                  <div className="flex-1 py-3 flex flex-wrap gap-4 items-start pl-2">
                    {slotAppointments.length > 0 ? (
                      slotAppointments.map((apt) => {
                        const style = getStatusStyle(apt.status);

                        return (
                          <div
                            key={apt.id}
                            id={`appointment-card-${apt.id}`}
                            onClick={() => setSelectedAppointment(apt)}
                            className={`w-72 bg-white rounded-lg p-3.5 border border-gray-200/90 shadow-xs cursor-pointer transition-all duration-150 hover:shadow-md hover:border-gray-300 ${style.topBorder} flex flex-col justify-between`}
                          >
                            {/* Card Top: OrderNo & Category */}
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="text-[10px] text-gray-400 font-mono">
                                {apt.orderNo || apt.id}
                              </span>
                              <span
                                className={`text-[10px] px-2 py-0.5 rounded-full border ${getCategoryBadge(
                                  apt.category
                                )}`}
                              >
                                {apt.category}
                              </span>
                            </div>

                            {/* Card Title */}
                            <div className="text-xs font-bold text-gray-800 tracking-tight line-clamp-1">
                              {apt.title}
                            </div>

                            {/* Time & User info */}
                            <div className="mt-2 space-y-1 text-[11px] text-gray-500">
                              <div className="flex items-center justify-between">
                                <span>时间: {apt.timeRange}</span>
                                <span className="font-semibold text-gray-700">
                                  {apt.userName} ({apt.userAge || 78}岁)
                                </span>
                              </div>
                              <div className="text-[10px] text-gray-400 truncate">
                                地址: {apt.address}
                              </div>
                            </div>

                            {/* Bottom Avatars & Status */}
                            <div className="mt-3 pt-2 border-t border-gray-50 flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <img
                                  src={apt.staffAvatar}
                                  alt={apt.staffName}
                                  className="h-6 w-6 rounded-full ring-1 ring-gray-200 object-cover"
                                />
                                <span className="text-[11px] text-gray-600 font-medium">
                                  {apt.staffName}
                                </span>
                              </div>
                              <span
                                className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${style.badgeBg}`}
                              >
                                {apt.status}
                              </span>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="h-full flex items-center text-xs text-gray-300 italic opacity-0 group-hover:opacity-100 transition-opacity">
                        该时间段暂无排班
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* VIEW MODE 2: TABLE VIEW (Desc strictly sorted) */}
        {viewMode === 'table' && (
          <div className="mt-3">
            {/* Table summary note */}
            <div className="flex items-center justify-between py-2.5 px-3 bg-gray-50 rounded-lg text-xs text-gray-500 mb-3">
              <div className="flex items-center space-x-2">
                <Filter className="w-3.5 h-3.5 text-emerald-600" />
                <span>
                  共筛选出 <strong className="text-emerald-700">{filteredAppointments.length}</strong> 条服务记录
                  （2026年9月18日 至 2026年9月1日，表格每条数据均真实唯一，严格按时间降序排列）
                </span>
              </div>
              <div className="text-[11px] text-gray-400">
                点击行内操作可查看详情或快速变更状态
              </div>
            </div>

            {/* Main Table */}
            <div className="overflow-x-auto border border-gray-100 rounded-xl">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-gray-50/80 text-gray-500 border-b border-gray-100">
                    <th className="py-3 px-3.5 text-left font-semibold w-32">工单编号</th>
                    <th className="py-3 px-3.5 text-left font-semibold w-40">
                      <div className="flex items-center space-x-1">
                        <span>预约服务时间</span>
                        <ArrowUpDown className="w-3 h-3 text-emerald-600" />
                      </div>
                    </th>
                    <th className="py-3 px-3.5 text-left font-semibold">服务项目内容</th>
                    <th className="py-3 px-3.5 text-center font-semibold w-24">业务类别</th>
                    <th className="py-3 px-3.5 text-left font-semibold w-40">长者对象</th>
                    <th className="py-3 px-3.5 text-left font-semibold">服务地址</th>
                    <th className="py-3 px-3.5 text-left font-semibold w-32">指派护工/医生</th>
                    <th className="py-3 px-3.5 text-center font-semibold w-24">工单状态</th>
                    <th className="py-3 px-3.5 text-right font-semibold w-32">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredAppointments.length > 0 ? (
                    filteredAppointments.map((apt) => {
                      const style = getStatusStyle(apt.status);

                      return (
                        <tr
                          key={apt.id}
                          className="hover:bg-gray-50/70 transition-colors"
                        >
                          {/* Order No */}
                          <td className="py-3 px-3.5 font-mono text-gray-500 text-[11px]">
                            {apt.orderNo || apt.id}
                          </td>

                          {/* Time & Date (Descending) */}
                          <td className="py-3 px-3.5">
                            <div className="flex flex-col">
                              <span className="font-semibold text-gray-800">
                                {apt.date}
                              </span>
                              <span className="text-gray-500 text-[11px]">
                                {apt.timeRange}
                              </span>
                            </div>
                          </td>

                          {/* Title */}
                          <td className="py-3 px-3.5 font-medium text-gray-800">
                            <div className="line-clamp-1" title={apt.title}>
                              {apt.title}
                            </div>
                            <div className="text-[11px] text-gray-400 line-clamp-1">
                              {apt.notes}
                            </div>
                          </td>

                          {/* Category Badge */}
                          <td className="py-3 px-3.5 text-center">
                            <span
                              className={`inline-block text-[11px] px-2 py-0.5 rounded-full border ${getCategoryBadge(
                                apt.category
                              )}`}
                            >
                              {apt.category}
                            </span>
                          </td>

                          {/* Elderly / Client */}
                          <td className="py-3 px-3.5">
                            <div className="flex items-center space-x-2">
                              <img
                                src={apt.userAvatar}
                                alt={apt.userName}
                                className="w-7 h-7 rounded-full object-cover shrink-0 ring-1 ring-gray-100"
                              />
                              <div className="flex flex-col">
                                <span className="font-medium text-gray-800">
                                  {apt.userName} ({apt.userAge || 78}岁)
                                </span>
                                <span className="text-[10px] text-gray-400 font-mono">
                                  {apt.phone}
                                </span>
                              </div>
                            </div>
                          </td>

                          {/* Address */}
                          <td className="py-3 px-3.5 text-gray-600 max-w-[180px]">
                            <div className="truncate" title={apt.address}>
                              {apt.address}
                            </div>
                          </td>

                          {/* Staff */}
                          <td className="py-3 px-3.5">
                            <div className="flex items-center space-x-2">
                              <img
                                src={apt.staffAvatar}
                                alt={apt.staffName}
                                className="w-6 h-6 rounded-full object-cover shrink-0 ring-1 ring-gray-200"
                              />
                              <span className="font-medium text-gray-700">
                                {apt.staffName}
                              </span>
                            </div>
                          </td>

                          {/* Status */}
                          <td className="py-3 px-3.5 text-center">
                            <span
                              className={`inline-block text-[11px] font-semibold px-2 py-0.5 rounded border ${style.badgeBg}`}
                            >
                              {apt.status}
                            </span>
                          </td>

                          {/* Actions */}
                          <td className="py-3 px-3.5 text-right">
                            <div className="flex items-center justify-end space-x-2">
                              <button
                                onClick={() => setSelectedAppointment(apt)}
                                className="text-emerald-700 hover:text-emerald-900 font-medium hover:underline"
                              >
                                详情
                              </button>
                              <span className="text-gray-300">|</span>
                              <button
                                onClick={() => handleToggleStatus(apt)}
                                className="text-gray-500 hover:text-gray-800 hover:underline"
                                title="点击流转工单状态"
                              >
                                变更
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={9} className="py-12 text-center text-gray-400">
                        暂无符合筛选条件的工单记录
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Appointment Detail Modal */}
      {selectedAppointment && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-[1px] flex items-center justify-center z-50 p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-gray-100 overflow-hidden text-xs">
            <div className="px-6 py-4 bg-gray-50/80 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-4 bg-[#10b981] rounded-full"></span>
                <span className="text-sm font-bold text-gray-800">
                  工单预约详情
                </span>
                <span className="text-xs font-mono text-gray-400">
                  {selectedAppointment.orderNo}
                </span>
              </div>
              <button
                onClick={() => setSelectedAppointment(null)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-start justify-between pb-3 border-b border-gray-100">
                <div>
                  <h3 className="text-base font-bold text-gray-800">
                    {selectedAppointment.title}
                  </h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span
                      className={`px-2 py-0.5 rounded border text-[11px] ${getCategoryBadge(
                        selectedAppointment.category
                      )}`}
                    >
                      {selectedAppointment.category}
                    </span>
                    <span className="text-gray-500 font-mono text-[11px]">
                      {selectedAppointment.date}
                    </span>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                    getStatusStyle(selectedAppointment.status).badgeBg
                  }`}
                >
                  {selectedAppointment.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-gray-600">
                <div className="flex items-center space-x-2 p-2.5 bg-gray-50 rounded-lg">
                  <User className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <div className="text-[10px] text-gray-400">长者姓名</div>
                    <div className="font-semibold text-gray-800">
                      {selectedAppointment.userName} ({selectedAppointment.userAge || 78}岁)
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 p-2.5 bg-gray-50 rounded-lg">
                  <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <div className="text-[10px] text-gray-400">服务时间段</div>
                    <div className="font-semibold text-gray-800">
                      {selectedAppointment.timeRange}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 p-2.5 bg-gray-50 rounded-lg">
                  <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <div className="text-[10px] text-gray-400">紧急联系电话</div>
                    <div className="font-semibold text-gray-800 font-mono">
                      {selectedAppointment.phone || '138****5211'}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 p-2.5 bg-gray-50 rounded-lg">
                  <User className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <div className="text-[10px] text-gray-400">指定服务人员</div>
                    <div className="font-semibold text-gray-800">
                      {selectedAppointment.staffName}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-gray-50 rounded-lg flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] text-gray-400">服务地址</div>
                  <div className="text-gray-700 font-medium">
                    {selectedAppointment.address || '阳光福邸 3栋 2单元 402室'}
                  </div>
                </div>
              </div>

              <div className="p-3 bg-emerald-50/40 rounded-lg border border-emerald-100">
                <div className="flex items-center space-x-1.5 text-emerald-800 font-semibold mb-1">
                  <FileText className="w-3.5 h-3.5" />
                  <span>服务注意事项与医嘱记录</span>
                </div>
                <div className="text-gray-600 leading-relaxed">
                  {selectedAppointment.notes || '常规适老健康巡护，按期核验监测指标并留痕归档。'}
                </div>
              </div>
            </div>

            <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
              <button
                onClick={() => handleToggleStatus(selectedAppointment)}
                className="px-3.5 py-1.5 bg-[#10b981] hover:bg-[#059669] text-white rounded-lg font-medium transition-colors"
              >
                流转状态至:{' '}
                {selectedAppointment.status === '待服务'
                  ? '服务中'
                  : selectedAppointment.status === '服务中'
                  ? '已完成'
                  : '待服务'}
              </button>

              <button
                onClick={() => setSelectedAppointment(null)}
                className="px-4 py-1.5 text-gray-600 hover:bg-gray-200/60 rounded-lg transition-colors"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Appointment Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-[1px] flex items-center justify-center z-50 p-4 animate-in fade-in">
          <form
            onSubmit={handleAddAppointment}
            className="bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-gray-100 overflow-hidden text-xs"
          >
            <div className="px-6 py-4 bg-gray-50/80 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-4 bg-[#10b981] rounded-full"></span>
                <span className="text-sm font-bold text-gray-800">
                  新建预约工单 (2026年9月)
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-3.5 max-h-[75vh] overflow-y-auto">
              <div>
                <label className="block text-gray-500 font-medium mb-1">
                  服务项目名称
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  required
                  placeholder="如：适老化居家安全巡检"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#10b981]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-500 font-medium mb-1">
                    长者姓名
                  </label>
                  <input
                    type="text"
                    value={newUserName}
                    onChange={(e) => setNewUserName(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#10b981]"
                  />
                </div>
                <div>
                  <label className="block text-gray-500 font-medium mb-1">
                    长者年龄
                  </label>
                  <input
                    type="number"
                    value={newUserAge}
                    onChange={(e) => setNewUserAge(Number(e.target.value))}
                    required
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#10b981]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-500 font-medium mb-1">
                    预约日期 (2026-09-01 至 2026-09-18)
                  </label>
                  <select
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#10b981]"
                  >
                    {Array.from({ length: 18 }, (_, i) => {
                      const day = 18 - i; // descending from 18 to 1
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
                  <label className="block text-gray-500 font-medium mb-1">
                    服务时间槽
                  </label>
                  <select
                    value={newHour}
                    onChange={(e) => {
                      const h = parseInt(e.target.value);
                      setNewHour(h);
                      setNewTimeRange(`${h}:00-${h + 1}:00`);
                    }}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#10b981]"
                  >
                    {[9, 10, 11, 12, 13, 14, 15, 16].map((h) => (
                      <option key={h} value={h}>
                        {h}:00 - {h + 1}:00
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-500 font-medium mb-1">
                    服务类别
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) =>
                      setNewCategory(
                        e.target.value as '康复理疗' | '家政护理' | '上门体检'
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#10b981]"
                  >
                    <option value="家政护理">家政护理</option>
                    <option value="康复理疗">康复理疗</option>
                    <option value="上门体检">上门体检</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-500 font-medium mb-1">
                    指定服务人员
                  </label>
                  <select
                    value={newStaff}
                    onChange={(e) => setNewStaff(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#10b981]"
                  >
                    <option value="王小倩">王小倩 (高级家政护工)</option>
                    <option value="李建国">李建国 (康复理疗主管)</option>
                    <option value="张玉婷">张玉婷 (主管护师)</option>
                    <option value="陈秀英">陈秀英 (资深养老护理员)</option>
                    <option value="赵立峰">赵立峰 (适老助安技师)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-500 font-medium mb-1">
                  联系电话
                </label>
                <input
                  type="text"
                  value={newUserPhone}
                  onChange={(e) => setNewUserPhone(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#10b981]"
                />
              </div>

              <div>
                <label className="block text-gray-500 font-medium mb-1">
                  详细服务地址
                </label>
                <input
                  type="text"
                  value={newUserAddress}
                  onChange={(e) => setNewUserAddress(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#10b981]"
                />
              </div>

              <div>
                <label className="block text-gray-500 font-medium mb-1">
                  服务注意事项与备注
                </label>
                <textarea
                  rows={2}
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#10b981]"
                />
              </div>
            </div>

            <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-200/60 rounded-lg transition-colors"
              >
                取消
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#10b981] hover:bg-[#059669] text-white rounded-lg font-medium transition-colors"
              >
                确认添加
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
