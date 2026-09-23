import React, { useState, useMemo } from 'react';
import {
  Search,
  RotateCcw,
  Upload,
  Calendar,
  ChevronDown,
  X,
  User,
  FileSpreadsheet,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Download,
  Trash2,
} from 'lucide-react';

export interface ReportItem {
  id: string;
  uploadTime: string; // 2026-09-19 17:42
  user: {
    name: string;
    avatar: string;
  };
  name: string;
  type: string; // 体检报告 | 检验报告 | 评估报告 | 影像报告 | 专科筛查 | 随访报告
  source: string; // 后台上传 | 机构检测 | 智能设备同步 | 社区网格录入 | 医院互联
  uploader: string;
  workOrderNo: string;
  reportDate: string; // 2026-09-19
}

const INITIAL_REPORTS_DATA: ReportItem[] = [
  {
    id: 'rep-101',
    uploadTime: '2026-09-19 17:42',
    user: {
      name: '小王',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80',
    },
    name: '常规血脂全套化验生化分析',
    type: '体检报告',
    source: '后台上传',
    uploader: '李明明',
    workOrderNo: 'GD20260919013',
    reportDate: '2026-09-19',
  },
  {
    id: 'rep-102',
    uploadTime: '2026-09-19 14:15',
    user: {
      name: '高素琴',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80',
    },
    name: '24小时动态心电图(Holter)监测报告',
    type: '专科筛查',
    source: '智能设备同步',
    uploader: '张主管',
    workOrderNo: 'GD20260919008',
    reportDate: '2026-09-19',
  },
  {
    id: 'rep-103',
    uploadTime: '2026-09-19 10:23',
    user: {
      name: '钱宏业',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    },
    name: '双能X射线骨密度(DXA)及跌倒风险评估',
    type: '评估报告',
    source: '机构检测',
    uploader: '李明明',
    workOrderNo: 'GD20260918023',
    reportDate: '2026-09-18',
  },
  {
    id: 'rep-104',
    uploadTime: '2026-09-18 16:30',
    user: {
      name: '周金凤',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    },
    name: '糖化血红蛋白(HbA1c)与胰岛功能测定',
    type: '检验报告',
    source: '医院互联',
    uploader: '陈医生',
    workOrderNo: 'GD20260918015',
    reportDate: '2026-09-18',
  },
  {
    id: 'rep-105',
    uploadTime: '2026-09-18 11:05',
    user: {
      name: '何国栋',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
    },
    name: '头颅核磁共振(MRI)平扫及血管筛查报告',
    type: '影像报告',
    source: '后台上传',
    uploader: '赵护师',
    workOrderNo: 'GD20260917042',
    reportDate: '2026-09-17',
  },
  {
    id: 'rep-106',
    uploadTime: '2026-09-17 15:20',
    user: {
      name: '许桂兰',
      avatar: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&w=120&q=80',
    },
    name: '多导睡眠呼吸监测(PSG)分析报告',
    type: '评估报告',
    source: '智能设备同步',
    uploader: '孙助理',
    workOrderNo: 'GD20260916021',
    reportDate: '2026-09-16',
  },
  {
    id: 'rep-107',
    uploadTime: '2026-09-16 14:40',
    user: {
      name: '孙建华',
      avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=120&q=80',
    },
    name: '肺功能通气测试与慢阻肺早期筛查',
    type: '专科筛查',
    source: '机构检测',
    uploader: '王芳',
    workOrderNo: 'GD20260915019',
    reportDate: '2026-09-15',
  },
  {
    id: 'rep-108',
    uploadTime: '2026-09-15 09:50',
    user: {
      name: '赵立诚',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80',
    },
    name: '颈动脉彩色多普勒超声斑块检查报告',
    type: '影像报告',
    source: '后台上传',
    uploader: '李明明',
    workOrderNo: 'GD20260914006',
    reportDate: '2026-09-14',
  },
  {
    id: 'rep-109',
    uploadTime: '2026-09-14 16:10',
    user: {
      name: '张伯伯',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=120&q=80',
    },
    name: '简易精神状态检查(MMSE)认知筛查',
    type: '评估报告',
    source: '机构检测',
    uploader: '刘主管',
    workOrderNo: 'GD20260913018',
    reportDate: '2026-09-13',
  },
  {
    id: 'rep-110',
    uploadTime: '2026-09-12 11:30',
    user: {
      name: '郑秀荣',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80',
    },
    name: '慢病联合管理第三季度综合随访报告',
    type: '随访报告',
    source: '后台上传',
    uploader: '赵护师',
    workOrderNo: 'GD20260911027',
    reportDate: '2026-09-11',
  },
  {
    id: 'rep-111',
    uploadTime: '2026-09-10 10:00',
    user: {
      name: '陈培元',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
    },
    name: '肾功能五项与尿微量白蛋白化验分析',
    type: '检验报告',
    source: '医院互联',
    uploader: '陈医生',
    workOrderNo: 'GD20260909003',
    reportDate: '2026-09-09',
  },
  {
    id: 'rep-112',
    uploadTime: '2026-09-08 15:45',
    user: {
      name: '冯桂香',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80',
    },
    name: '术后关节活动度与步态平衡康复评定',
    type: '评估报告',
    source: '社区网格录入',
    uploader: '王芳',
    workOrderNo: 'GD20260907011',
    reportDate: '2026-09-07',
  },
];

interface ReportManagementProps {
  onNotice: (msg: string) => void;
}

export const ReportManagement: React.FC<ReportManagementProps> = ({ onNotice }) => {
  const [reports, setReports] = useState<ReportItem[]>(INITIAL_REPORTS_DATA);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [keyword, setKeyword] = useState<string>('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Upload Modal State
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [formName, setFormName] = useState('');
  const [formDate, setFormDate] = useState('2026-09-19');
  const [formType, setFormType] = useState('');
  const [formUser, setFormUser] = useState('');
  const [formWorkOrder, setFormWorkOrder] = useState('');

  // Dropdown lists
  const reportTypes = ['体检报告', '检验报告', '评估报告', '影像报告', '专科筛查', '随访报告'];
  const mockUsersList = [
    { name: '小王', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80' },
    { name: '高素琴', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80' },
    { name: '钱宏业', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80' },
    { name: '周金凤', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80' },
    { name: '何国栋', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80' },
    { name: '许桂兰', avatar: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&w=120&q=80' },
  ];

  const mockWorkOrders = [
    'GD20260919013 (常规生化巡查工单)',
    'GD20260919008 (心电动态跟踪工单)',
    'GD20260918023 (防跌倒上门评估工单)',
    'GD20260918015 (慢病血糖专访工单)',
    'GD20260917042 (影像会诊专案工单)',
  ];

  // Filtered reports, strictly descending by uploadTime
  const filteredReports = useMemo(() => {
    return reports
      .filter((r) => {
        const matchesType = selectedType === 'all' || r.type === selectedType;
        const q = keyword.trim().toLowerCase();
        const matchesKeyword =
          !q ||
          r.name.toLowerCase().includes(q) ||
          r.user.name.toLowerCase().includes(q) ||
          r.uploader.toLowerCase().includes(q) ||
          r.workOrderNo.toLowerCase().includes(q) ||
          r.source.toLowerCase().includes(q);

        return matchesType && matchesKeyword;
      })
      .sort((a, b) => new Date(b.uploadTime).getTime() - new Date(a.uploadTime).getTime());
  }, [reports, selectedType, keyword]);

  // Pagination slice
  const totalPages = Math.ceil(filteredReports.length / pageSize) || 1;
  const paginatedReports = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredReports.slice(start, start + pageSize);
  }, [filteredReports, currentPage]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(paginatedReports.map((r) => r.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleDeleteReport = (report: ReportItem) => {
    setReports((prev) => prev.filter((r) => r.id !== report.id));
    setSelectedIds((prev) => prev.filter((id) => id !== report.id));
    onNotice(`已删除报告【${report.name}】`);
  };

  const handleDownload = (report: ReportItem) => {
    onNotice(`正在下载【${report.user.name}】的《${report.name}》(PDF/DICOM)`);
  };

  const handleBatchOperation = () => {
    if (selectedIds.length === 0) {
      onNotice('请先勾选需要批量操作的报告项');
      return;
    }
    onNotice(`已对选中的 ${selectedIds.length} 项报告执行批量归档处理`);
  };

  const handleReset = () => {
    setSelectedType('all');
    setKeyword('');
    setCurrentPage(1);
    onNotice('已重置报告搜索条件');
  };

  // Submit Upload Modal
  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) {
      onNotice('请输入报告名称');
      return;
    }
    if (!formType) {
      onNotice('请选择报告类型');
      return;
    }

    const selectedUserObj = mockUsersList.find((u) => u.name === formUser) || mockUsersList[0];
    const newRep: ReportItem = {
      id: `rep-${Date.now()}`,
      uploadTime: '2026-09-19 17:50',
      user: {
        name: selectedUserObj.name,
        avatar: selectedUserObj.avatar,
      },
      name: formName.trim(),
      type: formType,
      source: '后台上传',
      uploader: '李明明',
      workOrderNo: formWorkOrder.split(' ')[0] || 'GD20260919099',
      reportDate: formDate || '2026-09-19',
    };

    setReports((prev) => [newRep, ...prev]);
    setShowUploadModal(false);
    setFormName('');
    setFormType('');
    setFormUser('');
    setFormWorkOrder('');
    onNotice(`报告《${newRep.name}》已成功上传并归入档案`);
  };

  return (
    <div className="p-6 max-w-[1600px] mx-auto text-xs space-y-4">
      {/* Top Filter Card */}
      <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-4">
        {/* Title */}
        <div className="flex items-center space-x-2 pb-2">
          <span className="w-1.5 h-4 bg-[#10b981] rounded-full"></span>
          <h1 className="text-sm font-semibold text-gray-800">报告管理</h1>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center space-x-2">
            <span className="text-gray-500 whitespace-nowrap">报告类型</span>
            <div className="relative">
              <select
                value={selectedType}
                onChange={(e) => {
                  setSelectedType(e.target.value);
                  setCurrentPage(1);
                }}
                className="appearance-none bg-white border border-gray-200 rounded-md px-3 py-1.5 pr-8 text-xs text-gray-700 focus:outline-none focus:border-[#10b981]"
              >
                <option value="all">请选择</option>
                {reportTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-2.5 pointer-events-none" />
            </div>
          </div>

          <div className="flex items-center flex-1 max-w-sm">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="请输入关键字"
              className="w-full border border-gray-200 rounded-md px-3 py-1.5 text-xs text-gray-700 focus:outline-none focus:border-[#10b981] placeholder:text-gray-400"
            />
          </div>

          {/* Search */}
          <button
            type="button"
            onClick={() => onNotice(`已匹配出 ${filteredReports.length} 份报告记录`)}
            className="w-8 h-8 rounded-md bg-[#10b981] hover:bg-[#059669] text-white flex items-center justify-center transition-colors"
            title="搜索"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Reset */}
          <button
            type="button"
            onClick={handleReset}
            className="w-8 h-8 rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50 flex items-center justify-center transition-colors"
            title="重置"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-4">
        {/* Top Buttons: 上传 / 批量操作 */}
        <div className="flex items-center justify-end space-x-2.5">
          <button
            type="button"
            onClick={() => {
              setFormName('');
              setFormDate('2026-09-19');
              setFormType('');
              setFormUser('小王');
              setFormWorkOrder('GD20260919013');
              setShowUploadModal(true);
            }}
            className="px-4 py-1.5 bg-[#10b981] hover:bg-[#059669] text-white rounded-md font-medium transition-colors"
          >
            上传
          </button>
          <button
            type="button"
            onClick={handleBatchOperation}
            className="px-4 py-1.5 border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-md font-medium transition-colors"
          >
            批量操作
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-gray-500 font-normal">
                <th className="py-3 px-3 w-10 text-center">
                  <input
                    type="checkbox"
                    checked={
                      paginatedReports.length > 0 &&
                      paginatedReports.every((r) => selectedIds.includes(r.id))
                    }
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="rounded text-[#10b981] accent-[#10b981]"
                  />
                </th>
                <th className="py-3 px-4 font-normal text-gray-600">上传时间</th>
                <th className="py-3 px-4 font-normal text-gray-600">所属用户</th>
                <th className="py-3 px-4 font-normal text-gray-600">报告名称</th>
                <th className="py-3 px-4 font-normal text-gray-600">报告类型</th>
                <th className="py-3 px-4 font-normal text-gray-600">报告来源</th>
                <th className="py-3 px-4 font-normal text-gray-600">上传人</th>
                <th className="py-3 px-4 font-normal text-gray-600">关联工单</th>
                <th className="py-3 px-4 font-normal text-gray-600">报告日期</th>
                <th className="py-3 px-4 font-normal text-gray-600 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {paginatedReports.map((report) => {
                const isSelected = selectedIds.includes(report.id);
                return (
                  <tr
                    key={report.id}
                    className={`hover:bg-gray-50/70 transition-colors ${
                      isSelected ? 'bg-emerald-50/20' : ''
                    }`}
                  >
                    <td className="py-3 px-3 text-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleToggleSelect(report.id)}
                        className="rounded text-[#10b981] accent-[#10b981]"
                      />
                    </td>
                    <td className="py-3 px-4 text-gray-600 font-mono">{report.uploadTime}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <img
                          src={report.user.avatar}
                          alt={report.user.name}
                          className="w-7 h-7 rounded-full object-cover border border-gray-100"
                        />
                        <span className="text-gray-800 font-medium">{report.user.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-800 font-medium">{report.name}</td>
                    <td className="py-3 px-4 text-gray-600">{report.type}</td>
                    <td className="py-3 px-4 text-gray-600">{report.source}</td>
                    <td className="py-3 px-4 text-gray-600">{report.uploader}</td>
                    <td className="py-3 px-4 text-gray-600 font-mono">{report.workOrderNo}</td>
                    <td className="py-3 px-4 text-gray-600 font-mono">{report.reportDate}</td>
                    <td className="py-3 px-4 text-right space-x-3">
                      <button
                        type="button"
                        onClick={() => handleDownload(report)}
                        className="text-[#10b981] hover:underline"
                      >
                        下载
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteReport(report)}
                        className="text-red-500 hover:underline"
                      >
                        删除
                      </button>
                    </td>
                  </tr>
                );
              })}
              {paginatedReports.length === 0 && (
                <tr>
                  <td colSpan={10} className="text-center py-10 text-gray-400">
                    暂无匹配的报告记录
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 text-xs text-gray-500">
          <div>
            已选 <span className="font-semibold text-gray-800">{selectedIds.length}</span> 项 / 共{' '}
            <span className="font-semibold text-gray-800">{filteredReports.length}</span> 条
          </div>
          <div className="flex items-center space-x-2">
            <span>每页 10 条</span>
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="p-1 rounded hover:bg-gray-100 disabled:opacity-30"
            >
              <ChevronsLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1 rounded hover:bg-gray-100 disabled:opacity-30"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-6 h-6 rounded text-xs flex items-center justify-center font-medium ${
                  currentPage === page
                    ? 'bg-[#10b981] text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1 rounded hover:bg-gray-100 disabled:opacity-30"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="p-1 rounded hover:bg-gray-100 disabled:opacity-30"
            >
              <ChevronsRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Upload Report Modal (Matches Image 4) */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 space-y-5 text-xs">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="font-semibold text-gray-800 text-sm">上传报告</div>
              <button
                type="button"
                onClick={() => setShowUploadModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleUploadSubmit} className="space-y-4">
              {/* 报告名称 */}
              <div className="flex items-center">
                <label className="w-24 text-gray-600">
                  <span className="text-red-500 mr-0.5">*</span>报告名称
                </label>
                <div className="flex-1">
                  <input
                    type="text"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="请输入"
                    className="w-full px-3 py-2 border border-gray-200 rounded-md text-xs text-gray-800 focus:outline-none focus:border-[#10b981]"
                  />
                </div>
              </div>

              {/* 报告日期 */}
              <div className="flex items-center">
                <label className="w-24 text-gray-600">报告日期</label>
                <div className="flex-1 relative">
                  <input
                    type="date"
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-md text-xs text-gray-800 focus:outline-none focus:border-[#10b981]"
                  />
                </div>
              </div>

              {/* 报告类型 */}
              <div className="flex items-center">
                <label className="w-24 text-gray-600">
                  <span className="text-red-500 mr-0.5">*</span>报告类型
                </label>
                <div className="flex-1 relative">
                  <select
                    value={formType}
                    onChange={(e) => setFormType(e.target.value)}
                    className="w-full appearance-none bg-white border border-gray-200 rounded-md px-3 py-2 text-xs text-gray-800 focus:outline-none focus:border-[#10b981]"
                  >
                    <option value="">请选择</option>
                    {reportTypes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-3 top-2.5 pointer-events-none" />
                </div>
              </div>

              {/* 所属用户 */}
              <div className="flex items-center">
                <label className="w-24 text-gray-600">所属用户</label>
                <div className="flex-1 relative">
                  <select
                    value={formUser}
                    onChange={(e) => setFormUser(e.target.value)}
                    className="w-full appearance-none bg-white border border-gray-200 rounded-md px-3 py-2 text-xs text-gray-800 focus:outline-none focus:border-[#10b981]"
                  >
                    <option value="">请选择</option>
                    {mockUsersList.map((u) => (
                      <option key={u.name} value={u.name}>
                        {u.name}
                      </option>
                    ))}
                  </select>
                  <User className="w-3.5 h-3.5 text-gray-400 absolute right-3 top-2.5 pointer-events-none" />
                </div>
              </div>

              {/* 关联工单 */}
              <div className="flex items-center">
                <label className="w-24 text-gray-600">关联工单</label>
                <div className="flex-1 relative">
                  <select
                    value={formWorkOrder}
                    onChange={(e) => setFormWorkOrder(e.target.value)}
                    className="w-full appearance-none bg-white border border-gray-200 rounded-md px-3 py-2 text-xs text-gray-800 focus:outline-none focus:border-[#10b981]"
                  >
                    <option value="">请选择</option>
                    {mockWorkOrders.map((wo) => (
                      <option key={wo} value={wo}>
                        {wo}
                      </option>
                    ))}
                  </select>
                  <FileSpreadsheet className="w-3.5 h-3.5 text-gray-400 absolute right-3 top-2.5 pointer-events-none" />
                </div>
              </div>

              {/* Modal Buttons: 取消 / 确定 */}
              <div className="pt-4 border-t border-gray-100 flex justify-end space-x-2.5">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-5 py-1.5 border border-gray-200 text-gray-600 rounded-md hover:bg-gray-50 transition-colors"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-5 py-1.5 bg-[#10b981] hover:bg-[#059669] text-white rounded-md font-medium transition-colors"
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
