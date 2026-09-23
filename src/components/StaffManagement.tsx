import React, { useState, useMemo } from 'react';
import {
  Users2,
  Search,
  ArrowUpDown,
  Star,
  CheckCircle,
  Phone,
  Award,
  Calendar,
  X,
} from 'lucide-react';
import { StaffMember } from '../types';
import { MOCK_STAFF_LIST } from '../data/extendedData';

interface StaffManagementProps {
  onNotice: (msg: string) => void;
  subPage: 'staff_list' | 'staff_schedule';
}

export const StaffManagement: React.FC<StaffManagementProps> = ({
  onNotice,
  subPage,
}) => {
  const [staffList, setStaffList] = useState<StaffMember[]>(MOCK_STAFF_LIST);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const filteredStaff = useMemo(() => {
    return staffList
      .filter((s) => {
        const matchesType = selectedType === 'all' || s.serviceType === selectedType;
        const matchesStatus = selectedStatus === 'all' || s.status === selectedStatus;
        const q = searchQuery.trim().toLowerCase();
        const matchesSearch =
          !q ||
          s.name.toLowerCase().includes(q) ||
          s.staffNo.toLowerCase().includes(q) ||
          s.title.toLowerCase().includes(q) ||
          s.certificate.toLowerCase().includes(q);

        return matchesType && matchesStatus && matchesSearch;
      })
      .sort((a, b) => new Date(b.latestServiceDate).getTime() - new Date(a.latestServiceDate).getTime());
  }, [staffList, searchQuery, selectedType, selectedStatus]);

  const handleToggleStatus = (staff: StaffMember) => {
    const nextStatus =
      staff.status === '服务中'
        ? '空闲接单'
        : staff.status === '空闲接单'
        ? '轮休'
        : '服务中';

    const updated = staffList.map((s) =>
      s.id === staff.id ? { ...s, status: nextStatus as '服务中' | '空闲接单' | '轮休' } : s
    );
    setStaffList(updated);
    onNotice(`已更新【${staff.name}】状态为: ${nextStatus}`);
  };

  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-5">
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] min-h-[820px]">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-gray-100 gap-4">
          <div className="flex items-center space-x-3">
            <span className="w-1.5 h-4 bg-[#10b981] rounded-full"></span>
            <h1 className="text-base font-semibold text-gray-800 tracking-tight">
              {subPage === 'staff_schedule' ? '护工排班考勤与在岗调度' : '护工照护 - 专业服务人员库'}
            </h1>
            <span className="text-xs text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 font-medium">
              在册人员 {filteredStaff.length} 名
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <div className="hidden md:flex items-center space-x-1.5 text-xs text-emerald-700 bg-emerald-50/80 px-2.5 py-1 rounded-md border border-emerald-200">
              <ArrowUpDown className="w-3 h-3" />
              <span>按最新履约时间降序 (2026-09-18 至 2026-09-01)</span>
            </div>
          </div>
        </div>

        {/* Filter Row */}
        <div className="flex flex-wrap items-center gap-4 pt-5 pb-5 text-xs text-gray-600 border-b border-gray-50">
          <div className="flex items-center space-x-2">
            <span className="text-gray-500 font-medium">服务类别</span>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:border-[#10b981]"
            >
              <option value="all">全部类别</option>
              <option value="家政护理">家政护理</option>
              <option value="康复理疗">康复理疗</option>
              <option value="上门体检">上门体检</option>
              <option value="适老改造">适老改造</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-gray-500 font-medium">在岗状态</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:border-[#10b981]"
            >
              <option value="all">全部状态</option>
              <option value="服务中">服务中</option>
              <option value="空闲接单">空闲接单</option>
              <option value="轮休">轮休</option>
            </select>
          </div>

          <div className="flex-1 min-w-[220px] flex justify-end">
            <div className="relative w-full max-w-xs">
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索护工姓名/工号/职称/证书..."
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

        {/* Staff Table */}
        <div className="mt-4 overflow-x-auto border border-gray-100 rounded-xl">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-gray-50/80 text-gray-500 border-b border-gray-100">
                <th className="py-3 px-3.5 text-left font-semibold w-24">工号</th>
                <th className="py-3 px-3.5 text-left font-semibold w-48">人员基本信息</th>
                <th className="py-3 px-3.5 text-left font-semibold w-28">专业服务类别</th>
                <th className="py-3 px-3.5 text-left font-semibold">国家认证资质与职称</th>
                <th className="py-3 px-3.5 text-center font-semibold w-28">9月累计工单</th>
                <th className="py-3 px-3.5 text-center font-semibold w-24">长者好评率</th>
                <th className="py-3 px-3.5 text-left font-semibold w-36">
                  <div className="flex items-center space-x-1">
                    <span>最新履约日期</span>
                    <ArrowUpDown className="w-3 h-3 text-emerald-600" />
                  </div>
                </th>
                <th className="py-3 px-3.5 text-center font-semibold w-24">当前状态</th>
                <th className="py-3 px-3.5 text-right font-semibold w-24">调度操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredStaff.map((staff) => {
                const isYesterday = staff.latestServiceDate === '2026-09-18';

                return (
                  <tr key={staff.id} className="hover:bg-gray-50/70 transition-colors">
                    <td className="py-3 px-3.5 font-mono text-gray-500 text-[11px]">
                      {staff.staffNo}
                    </td>

                    <td className="py-3 px-3.5">
                      <div className="flex items-center space-x-2.5">
                        <img
                          src={staff.avatar}
                          alt={staff.name}
                          className="w-8 h-8 rounded-full object-cover ring-1 ring-gray-200"
                        />
                        <div>
                          <div className="font-semibold text-gray-800 flex items-center space-x-1">
                            <span>{staff.name}</span>
                            <span className="text-[10px] text-gray-400 font-normal">
                              ({staff.gender})
                            </span>
                          </div>
                          <div className="text-[10px] text-gray-400 font-mono">
                            {staff.phone}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-3.5">
                      <span className="inline-block text-[11px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {staff.serviceType}
                      </span>
                    </td>

                    <td className="py-3 px-3.5">
                      <div className="text-gray-700 font-medium">{staff.title}</div>
                      <div className="text-[10px] text-gray-400 flex items-center space-x-1 mt-0.5">
                        <Award className="w-3 h-3 text-amber-500" />
                        <span>{staff.certificate}</span>
                      </div>
                    </td>

                    <td className="py-3 px-3.5 text-center font-bold text-gray-800">
                      {staff.monthlyOrders} 单
                    </td>

                    <td className="py-3 px-3.5 text-center">
                      <span className="inline-flex items-center space-x-1 text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span>{staff.satisfactionRate}</span>
                      </span>
                    </td>

                    <td className="py-3 px-3.5">
                      <div className="flex items-center space-x-1 font-semibold text-gray-800">
                        <span>{staff.latestServiceDate}</span>
                      </div>
                    </td>

                    <td className="py-3 px-3.5 text-center">
                      <span
                        className={`inline-block text-[11px] px-2.5 py-0.5 rounded-full border font-medium ${
                          staff.status === '服务中'
                            ? 'bg-blue-50 text-blue-700 border-blue-200'
                            : staff.status === '空闲接单'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-gray-100 text-gray-600 border-gray-200'
                        }`}
                      >
                        {staff.status}
                      </span>
                    </td>

                    <td className="py-3 px-3.5 text-right">
                      <button
                        onClick={() => handleToggleStatus(staff)}
                        className="text-emerald-700 hover:text-emerald-900 font-medium hover:underline"
                      >
                        切换状态
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
