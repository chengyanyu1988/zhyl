import React, { useState, useMemo } from 'react';
import { Search, RotateCcw, Upload, SlidersHorizontal, Download, Trash2, X, Calendar } from 'lucide-react';
import { AppUser } from '../../types';
import { INITIAL_REPORTS, ReportRecord } from '../../data/userRecordsData';
import { UserProfileSidebar } from './UserProfileSidebar';

interface ReportInfoTabProps {
  user: AppUser;
  onNotice: (msg: string) => void;
}

export const ReportInfoTab: React.FC<ReportInfoTabProps> = ({ user, onNotice }) => {
  const [reports, setReports] = useState<ReportRecord[]>(INITIAL_REPORTS);
  const [selectedType, setSelectedType] = useState<string>('全部');
  const [keyword, setKeyword] = useState<string>('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);

  // 上传表单状态
  const [formName, setFormName] = useState('');
  const [formDate, setFormDate] = useState('2026-09-19');
  const [formType, setFormType] = useState('体检报告');
  const [formWorkOrder, setFormWorkOrder] = useState('GD2026091900018');

  const filteredReports = useMemo(() => {
    return reports
      .filter((item) => {
        const matchType = selectedType === '全部' || item.type === selectedType;
        const matchKeyword =
          !keyword.trim() ||
          item.name.toLowerCase().includes(keyword.toLowerCase()) ||
          item.workOrderNo.toLowerCase().includes(keyword.toLowerCase()) ||
          item.uploader.toLowerCase().includes(keyword.toLowerCase());
        return matchType && matchKeyword;
      })
      .sort((a, b) => new Date(b.uploadTime).getTime() - new Date(a.uploadTime).getTime());
  }, [reports, selectedType, keyword]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(filteredReports.map((r) => r.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleDelete = (id: string, name: string) => {
    setReports((prev) => prev.filter((r) => r.id !== id));
    setSelectedIds((prev) => prev.filter((item) => item !== id));
    onNotice(`已成功删除报告【${name}】`);
  };

  const handleBatchDelete = () => {
    if (selectedIds.length === 0) {
      onNotice('请先勾选需要批量操作的报告项');
      return;
    }
    setReports((prev) => prev.filter((r) => !selectedIds.includes(r.id)));
    onNotice(`已批量移除选中的 ${selectedIds.length} 份报告`);
    setSelectedIds([]);
  };

  const handleSaveUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) {
      onNotice('请输入报告名称');
      return;
    }

    const newReport: ReportRecord = {
      id: `rep-${Date.now()}`,
      uploadTime: '2026-09-19 16:30',
      name: formName.trim(),
      type: formType,
      source: '后台上传',
      uploader: '李明明',
      workOrderNo: formWorkOrder || 'GD2026091900026',
      reportDate: formDate || '2026-09-19',
    };

    setReports((prev) => [newReport, ...prev]);
    setIsUploadModalOpen(false);
    setFormName('');
    onNotice(`长者新报告【${newReport.name}】已成功上传建档并关联工单`);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* 左侧个人画像侧边栏 */}
      <div className="lg:col-span-4 space-y-5">
        <UserProfileSidebar user={user} />
      </div>

      {/* 右侧报告列表及操作区 */}
      <div className="lg:col-span-8 space-y-4">
        {/* 顶部筛选与操作按钮 (Image 1) */}
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2.5 flex-1 min-w-[280px]">
            <div className="flex items-center space-x-2">
              <span className="text-gray-500 shrink-0">报告类型</span>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:border-[#10b981]"
              >
                <option value="全部">请选择</option>
                <option value="体检报告">体检报告</option>
                <option value="化验报告">化验报告</option>
                <option value="影像检查">影像检查</option>
                <option value="专科筛查">专科筛查</option>
                <option value="随访报告">随访报告</option>
              </select>
            </div>

            <div className="relative flex-1 min-w-[160px] max-w-xs">
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
              onClick={() => onNotice(`已筛选：${selectedType}，关键字：${keyword || '全部'}`)}
              className="p-2 bg-[#10b981] hover:bg-[#059669] text-white rounded-lg transition-colors"
              title="搜索"
            >
              <Search className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={() => {
                setSelectedType('全部');
                setKeyword('');
                onNotice('已重置搜索条件');
              }}
              className="p-2 border border-gray-200 hover:bg-gray-50 text-gray-600 rounded-lg transition-colors"
              title="重置"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => setIsUploadModalOpen(true)}
              className="px-4 py-1.5 bg-[#10b981] hover:bg-[#059669] text-white rounded-lg font-medium transition-colors flex items-center space-x-1.5"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>上传</span>
            </button>
            <button
              type="button"
              onClick={handleBatchDelete}
              className="px-3 py-1.5 border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-lg font-medium transition-colors"
            >
              批量操作
            </button>
          </div>
        </div>

        {/* 报告表格 (Image 1, 2) */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] overflow-hidden text-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-[#f9fafb] text-gray-500 border-b border-gray-100 font-medium">
                <tr>
                  <th className="py-3 px-3 w-10 text-center">
                    <input
                      type="checkbox"
                      checked={selectedIds.length > 0 && selectedIds.length === filteredReports.length}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      className="rounded border-gray-300 text-[#10b981] focus:ring-[#10b981]"
                    />
                  </th>
                  <th className="py-3 px-3 min-w-[120px]">上传时间</th>
                  <th className="py-3 px-3 min-w-[150px]">报告名称</th>
                  <th className="py-3 px-3 min-w-[90px]">报告类型</th>
                  <th className="py-3 px-3 min-w-[90px]">报告来源</th>
                  <th className="py-3 px-3 min-w-[80px]">上传人</th>
                  <th className="py-3 px-3 min-w-[130px]">关联工单</th>
                  <th className="py-3 px-3 min-w-[90px]">报告日期</th>
                  <th className="py-3 px-4 min-w-[90px] text-right">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredReports.map((rep) => (
                  <tr key={rep.id} className="hover:bg-gray-50/70 transition-colors">
                    <td className="py-3.5 px-3 text-center">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(rep.id)}
                        onChange={() => handleToggleSelect(rep.id)}
                        className="rounded border-gray-300 text-[#10b981] focus:ring-[#10b981]"
                      />
                    </td>
                    <td className="py-3.5 px-3 font-mono text-gray-600">{rep.uploadTime}</td>
                    <td className="py-3.5 px-3 font-medium text-gray-800">{rep.name}</td>
                    <td className="py-3.5 px-3 text-gray-600">{rep.type}</td>
                    <td className="py-3.5 px-3 text-gray-600">{rep.source}</td>
                    <td className="py-3.5 px-3 text-gray-700">{rep.uploader}</td>
                    <td className="py-3.5 px-3 font-mono text-gray-600">{rep.workOrderNo}</td>
                    <td className="py-3.5 px-3 font-mono text-gray-600">{rep.reportDate}</td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end space-x-3 font-medium">
                        <button
                          type="button"
                          onClick={() => onNotice(`正在导出并下载【${rep.name}】PDF电子版档案`)}
                          className="text-[#10b981] hover:underline"
                        >
                          下载
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(rep.id, rep.name)}
                          className="text-rose-500 hover:underline"
                        >
                          删除
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredReports.length === 0 && (
                  <tr>
                    <td colSpan={9} className="py-12 text-center text-gray-400">
                      暂无符合条件的报告记录
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* 分页控制栏 (Image 1, 2) */}
          <div className="p-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3 text-gray-500 text-xs">
            <div>
              共 <span className="font-semibold text-gray-800">{filteredReports.length}</span> 条
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

      {/* 上传报告弹窗 (Image 3) */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden text-xs">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="text-sm font-semibold text-gray-800">上传报告</h3>
              <button
                type="button"
                onClick={() => setIsUploadModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveUpload} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="block text-gray-600 font-medium">
                  报告名称<span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="请输入报告名称"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#10b981]"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="block text-gray-600 font-medium">报告日期</label>
                <div className="relative">
                  <input
                    type="date"
                    value={formDate}
                    max="2026-09-19"
                    onChange={(e) => setFormDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#10b981]"
                  />
                  <Calendar className="w-4 h-4 text-gray-400 absolute right-3 top-2.5 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-gray-600 font-medium">
                  报告类型<span className="text-rose-500">*</span>
                </label>
                <select
                  value={formType}
                  onChange={(e) => setFormType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#10b981]"
                >
                  <option value="体检报告">体检报告</option>
                  <option value="化验报告">化验报告</option>
                  <option value="影像检查">影像检查</option>
                  <option value="专科筛查">专科筛查</option>
                  <option value="随访报告">随访报告</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-gray-600 font-medium">关联工单</label>
                <select
                  value={formWorkOrder}
                  onChange={(e) => setFormWorkOrder(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#10b981]"
                >
                  <option value="GD2026091900018">GD2026091900018 (脑中风术后康复理疗)</option>
                  <option value="GD2026091800013">GD2026091800013 (日常清洁急速清洁全程质保)</option>
                  <option value="GD2026091600025">GD2026091600025 (专业上门助浴)</option>
                  <option value="GD2026091400031">GD2026091400031 (防滑安全扶手改造)</option>
                </select>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#10b981] hover:bg-[#059669] text-white rounded-lg font-medium"
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
