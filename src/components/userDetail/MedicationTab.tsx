import React, { useState, useMemo } from 'react';
import {
  Search,
  RotateCcw,
  Plus,
  Trash2,
  Edit2,
  X,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Check,
} from 'lucide-react';
import { AppUser } from '../../types';
import { MedicationRecord, INITIAL_MEDICATIONS } from '../../data/healthData';

interface MedicationTabProps {
  user: AppUser;
  onNotice: (msg: string) => void;
}

export const MedicationTab: React.FC<MedicationTabProps> = ({
  user,
  onNotice,
}) => {
  const [medications, setMedications] = useState<MedicationRecord[]>(INITIAL_MEDICATIONS);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Modal State for Add / Edit
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingMed, setEditingMed] = useState<MedicationRecord | null>(null);

  // Form fields for Add / Edit (matching Image 5)
  const [formName, setFormName] = useState('');
  const [formTime, setFormTime] = useState('07:30');
  const [formPeriod, setFormPeriod] = useState<MedicationRecord['period']>('晨服');
  const [formFrequency, setFormFrequency] = useState('每日一次');
  const [formUnit, setFormUnit] = useState('片');
  const [formQuantity, setFormQuantity] = useState('1');
  const [formReminder, setFormReminder] = useState(true);
  const [formFirstReminderDate, setFormFirstReminderDate] = useState('2026-09-19');

  // Delete Confirm Modal State (matching Image 6)
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [showBatchDeleteConfirm, setShowBatchDeleteConfirm] = useState(false);

  // Filtered & descending sorted list
  const filteredList = useMemo(() => {
    return medications
      .filter((m) => {
        if (!searchKeyword.trim()) return true;
        const q = searchKeyword.toLowerCase();
        return (
          m.name.toLowerCase().includes(q) ||
          m.source.toLowerCase().includes(q) ||
          m.addedBy.toLowerCase().includes(q) ||
          m.period.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => new Date(b.addTime).getTime() - new Date(a.addTime).getTime());
  }, [medications, searchKeyword]);

  const handleOpenAdd = () => {
    setEditingMed(null);
    setFormName('');
    setFormTime('07:30');
    setFormPeriod('晨服');
    setFormFrequency('每日一次');
    setFormUnit('片');
    setFormQuantity('1');
    setFormReminder(true);
    setFormFirstReminderDate('2026-09-19');
    setShowEditModal(true);
  };

  const handleOpenEdit = (med: MedicationRecord) => {
    setEditingMed(med);
    setFormName(med.name);
    setFormTime(med.time);
    setFormPeriod(med.period);
    setFormFrequency(med.frequency);
    setFormUnit(med.unit || '片');
    setFormQuantity(med.quantity || '1');
    setFormReminder(med.reminderEnabled);
    setFormFirstReminderDate(med.firstReminderDate || '2026-09-19');
    setShowEditModal(true);
  };

  const handleSaveMed = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) {
      onNotice('请输入药品名称');
      return;
    }

    if (editingMed) {
      setMedications((prev) =>
        prev.map((m) =>
          m.id === editingMed.id
            ? {
                ...m,
                name: formName.trim(),
                time: formTime,
                period: formPeriod,
                frequency: formFrequency,
                unit: formUnit,
                quantity: formQuantity,
                dosage: `${formQuantity}${formUnit}/次`,
                reminderEnabled: formReminder,
                firstReminderDate: formFirstReminderDate,
              }
            : m
        )
      );
      onNotice(`已更新用药信息：${formName}`);
    } else {
      const newMed: MedicationRecord = {
        id: `med-${Date.now()}`,
        name: formName.trim(),
        period: formPeriod,
        frequency: formFrequency,
        time: formTime,
        dosage: `${formQuantity}${formUnit}/次`,
        unit: formUnit,
        quantity: formQuantity,
        reminderEnabled: formReminder,
        firstReminderDate: formFirstReminderDate,
        source: '自主录入',
        addedBy: '照护主管',
        addTime: '2026-09-19 16:30:00',
      };
      setMedications((prev) => [newMed, ...prev]);
      onNotice(`已成功新增用药方案：${formName}`);
    }
    setShowEditModal(false);
  };

  const toggleReminder = (id: string) => {
    setMedications((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          const nextVal = !m.reminderEnabled;
          onNotice(`用药提醒已${nextVal ? '开启' : '关闭'}：${m.name}`);
          return { ...m, reminderEnabled: nextVal };
        }
        return m;
      })
    );
  };

  const handleConfirmDelete = () => {
    if (deleteTargetId) {
      setMedications((prev) => prev.filter((m) => m.id !== deleteTargetId));
      setSelectedIds((prev) => prev.filter((id) => id !== deleteTargetId));
      onNotice('已成功删除该用药记录');
      setDeleteTargetId(null);
    }
  };

  const handleBatchDelete = () => {
    if (selectedIds.length === 0) {
      onNotice('请先选择要删除的用药记录');
      return;
    }
    setMedications((prev) => prev.filter((m) => !selectedIds.includes(m.id)));
    setSelectedIds([]);
    setShowBatchDeleteConfirm(false);
    onNotice(`已批量删除选中的用药记录`);
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(filteredList.map((m) => m.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-4 text-xs">
      {/* 顶部搜索与操作栏 (Image 3, 4) */}
      <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-2.5 flex-1 max-w-md">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="请输入关键字"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="w-full pl-8 pr-3 py-2 bg-gray-50 border border-gray-200/80 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#10b981] focus:bg-white"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-2.5 top-2.5" />
          </div>
          <button
            type="button"
            onClick={() => onNotice(`已搜索：${searchKeyword || '全部'}`)}
            className="px-4 py-2 bg-[#10b981] hover:bg-[#059669] text-white rounded-lg font-medium transition-colors"
          >
            搜索
          </button>
          <button
            type="button"
            onClick={() => {
              setSearchKeyword('');
              onNotice('已重置搜索条件');
            }}
            className="px-4 py-2 bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-lg font-medium transition-colors"
          >
            重置
          </button>
        </div>

        <div className="flex items-center space-x-2.5">
          <button
            type="button"
            onClick={handleOpenAdd}
            className="px-4 py-2 bg-[#10b981] hover:bg-[#059669] text-white rounded-lg font-medium transition-colors shadow-xs flex items-center space-x-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>新增</span>
          </button>
          <button
            type="button"
            onClick={() => {
              if (selectedIds.length === 0) {
                onNotice('请先勾选需要批量操作的药品行');
                return;
              }
              setShowBatchDeleteConfirm(true);
            }}
            className="px-3.5 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-lg font-medium transition-colors"
          >
            批量操作
          </button>
        </div>
      </div>

      {/* 表格容器 */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#f9fafb] text-gray-500 border-b border-gray-100 font-medium">
              <tr>
                <th className="py-3 px-3 w-10 text-center">
                  <input
                    type="checkbox"
                    checked={
                      filteredList.length > 0 &&
                      selectedIds.length === filteredList.length
                    }
                    onChange={handleSelectAll}
                    className="rounded text-[#10b981] focus:ring-[#10b981]"
                  />
                </th>
                <th className="py-3 px-2 w-12 text-center">序号</th>
                <th className="py-3 px-3">时段</th>
                <th className="py-3 px-3">药品名称</th>
                <th className="py-3 px-3">用药频率</th>
                <th className="py-3 px-3">用药时间</th>
                <th className="py-3 px-3">计量</th>
                <th className="py-3 px-3 text-center">用药提醒</th>
                <th className="py-3 px-3">数据来源</th>
                <th className="py-3 px-3">添加人</th>
                <th className="py-3 px-3 font-mono">添加时间</th>
                <th className="py-3 px-4 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredList.length === 0 ? (
                <tr>
                  <td colSpan={12} className="py-10 text-center text-gray-400">
                    暂无匹配的用药数据
                  </td>
                </tr>
              ) : (
                filteredList.map((med, index) => {
                  const isChecked = selectedIds.includes(med.id);
                  return (
                    <tr
                      key={med.id}
                      className={`hover:bg-emerald-50/20 transition-colors ${
                        isChecked ? 'bg-emerald-50/30' : ''
                      }`}
                    >
                      <td className="py-3.5 px-3 text-center">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleSelectRow(med.id)}
                          className="rounded text-[#10b981] focus:ring-[#10b981]"
                        />
                      </td>
                      <td className="py-3.5 px-2 text-center text-gray-500 font-mono">
                        {index + 1}
                      </td>
                      <td className="py-3.5 px-3">
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-[11px]">
                          {med.period}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 font-semibold text-gray-800">
                        {med.name}
                      </td>
                      <td className="py-3.5 px-3 text-gray-600 font-medium">
                        {med.frequency}
                      </td>
                      <td className="py-3.5 px-3 font-mono text-gray-700">
                        {med.time}
                      </td>
                      <td className="py-3.5 px-3 text-gray-600 font-mono">
                        {med.dosage}
                      </td>
                      <td className="py-3.5 px-3 text-center">
                        {/* Toggle switch */}
                        <button
                          type="button"
                          onClick={() => toggleReminder(med.id)}
                          className={`w-9 h-5 flex items-center rounded-full p-0.5 transition-colors duration-200 ease-in-out mx-auto ${
                            med.reminderEnabled ? 'bg-[#10b981]' : 'bg-gray-300'
                          }`}
                        >
                          <div
                            className={`bg-white w-4 h-4 rounded-full shadow-xs transform transition-transform duration-200 ease-in-out ${
                              med.reminderEnabled ? 'translate-x-4' : 'translate-x-0'
                            }`}
                          />
                        </button>
                      </td>
                      <td className="py-3.5 px-3 text-gray-600">
                        {med.source}
                      </td>
                      <td className="py-3.5 px-3 text-gray-700">
                        {med.addedBy}
                      </td>
                      <td className="py-3.5 px-3 text-gray-500 font-mono">
                        {med.addTime}
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-2">
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(med)}
                          className="text-[#10b981] hover:underline font-medium"
                        >
                          编辑
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteTargetId(med.id)}
                          className="text-rose-500 hover:underline font-medium"
                        >
                          删除
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* 分页栏 */}
        <div className="p-4 border-t border-gray-100 flex items-center justify-between text-gray-500 text-xs">
          <span>共 {filteredList.length} 条记录</span>
          <div className="flex items-center space-x-2">
            <button
              type="button"
              disabled
              className="p-1 rounded border border-gray-200 text-gray-300 cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-2.5 py-1 bg-[#10b981] text-white rounded font-medium">
              1
            </span>
            <button
              type="button"
              disabled
              className="p-1 rounded border border-gray-200 text-gray-300 cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 新增/编辑用药弹窗 (Image 5) */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="text-base font-semibold text-gray-800">
                {editingMed ? '编辑用药信息' : '新增用药信息'}
              </h3>
              <button
                type="button"
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveMed} className="p-6 space-y-4 text-xs">
              {/* 药品名称* */}
              <div className="flex items-center space-x-3">
                <span className="w-24 text-gray-600 font-medium shrink-0 text-right">
                  <span className="text-rose-500 mr-0.5">*</span>药品名称
                </span>
                <input
                  type="text"
                  required
                  placeholder="请输入药品完整通用名称"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 focus:bg-white focus:outline-none focus:border-[#10b981]"
                />
              </div>

              {/* 用药时段与时间* */}
              <div className="flex items-center space-x-3">
                <span className="w-24 text-gray-600 font-medium shrink-0 text-right">
                  <span className="text-rose-500 mr-0.5">*</span>用药时间
                </span>
                <div className="flex items-center space-x-2 flex-1">
                  <select
                    value={formPeriod}
                    onChange={(e) => setFormPeriod(e.target.value as any)}
                    className="w-28 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 focus:bg-white focus:outline-none focus:border-[#10b981]"
                  >
                    <option value="晨服">晨服</option>
                    <option value="随餐">随餐</option>
                    <option value="午餐后">午餐后</option>
                    <option value="晚餐前">晚餐前</option>
                    <option value="晚餐后">晚餐后</option>
                    <option value="睡前">睡前</option>
                  </select>
                  <input
                    type="time"
                    required
                    value={formTime}
                    onChange={(e) => setFormTime(e.target.value)}
                    className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 focus:bg-white focus:outline-none focus:border-[#10b981] font-mono"
                  />
                </div>
              </div>

              {/* 用药频率* */}
              <div className="flex items-center space-x-3">
                <span className="w-24 text-gray-600 font-medium shrink-0 text-right">
                  <span className="text-rose-500 mr-0.5">*</span>用药频率
                </span>
                <select
                  value={formFrequency}
                  onChange={(e) => setFormFrequency(e.target.value)}
                  className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 focus:bg-white focus:outline-none focus:border-[#10b981]"
                >
                  <option value="每日一次">每日一次</option>
                  <option value="每日两次">每日两次</option>
                  <option value="每日三次">每日三次</option>
                  <option value="隔日一次">隔日一次</option>
                  <option value="每晚一次">每晚一次</option>
                  <option value="必要时">必要时服用</option>
                </select>
              </div>

              {/* 单位* & 用量* */}
              <div className="flex items-center space-x-3">
                <span className="w-24 text-gray-600 font-medium shrink-0 text-right">
                  <span className="text-rose-500 mr-0.5">*</span>单位
                </span>
                <div className="flex items-center space-x-3 flex-1">
                  <select
                    value={formUnit}
                    onChange={(e) => setFormUnit(e.target.value)}
                    className="w-24 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 focus:bg-white focus:outline-none focus:border-[#10b981]"
                  >
                    <option value="片">片</option>
                    <option value="粒">粒</option>
                    <option value="支">支</option>
                    <option value="袋">袋</option>
                    <option value="丸">丸</option>
                  </select>

                  <span className="text-gray-600 font-medium shrink-0">
                    <span className="text-rose-500 mr-0.5">*</span>用量
                  </span>
                  <input
                    type="text"
                    required
                    placeholder="如 1 或 0.5"
                    value={formQuantity}
                    onChange={(e) => setFormQuantity(e.target.value)}
                    className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 focus:bg-white focus:outline-none focus:border-[#10b981] font-mono"
                  />
                </div>
              </div>

              {/* 用药提醒开关 */}
              <div className="flex items-center space-x-3">
                <span className="w-24 text-gray-600 font-medium shrink-0 text-right">
                  用药提醒
                </span>
                <div className="flex items-center space-x-3 flex-1">
                  <button
                    type="button"
                    onClick={() => setFormReminder(!formReminder)}
                    className={`w-9 h-5 flex items-center rounded-full p-0.5 transition-colors duration-200 ease-in-out ${
                      formReminder ? 'bg-[#10b981]' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow-xs transform transition-transform duration-200 ease-in-out ${
                        formReminder ? 'translate-x-4' : 'translate-x-0'
                      }`}
                    />
                  </button>
                  <span className="text-gray-500">
                    {formReminder ? '已开启语音播报与手环震动提醒' : '已关闭'}
                  </span>
                </div>
              </div>

              {/* 首次提醒日期* */}
              <div className="flex items-center space-x-3">
                <span className="w-24 text-gray-600 font-medium shrink-0 text-right">
                  <span className="text-rose-500 mr-0.5">*</span>首次提醒日期
                </span>
                <input
                  type="date"
                  required
                  value={formFirstReminderDate}
                  onChange={(e) => setFormFirstReminderDate(e.target.value)}
                  className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 focus:bg-white focus:outline-none focus:border-[#10b981] font-mono"
                />
              </div>

              {/* 底部按钮 */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-5 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#10b981] hover:bg-[#059669] text-white rounded-lg font-medium transition-colors shadow-xs"
                >
                  确定
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 删除确认弹窗 (Image 6) */}
      {(deleteTargetId || showBatchDeleteConfirm) && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-6 text-center animate-in fade-in duration-200 space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-gray-800">操作确认</h4>
              <p className="text-gray-500 mt-2 text-xs leading-relaxed">
                信息删除后无法恢复，确定要删除吗？
              </p>
            </div>
            <div className="flex items-center justify-center space-x-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setDeleteTargetId(null);
                  setShowBatchDeleteConfirm(false);
                }}
                className="px-5 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 font-medium text-xs transition-colors"
              >
                取消
              </button>
              <button
                type="button"
                onClick={deleteTargetId ? handleConfirmDelete : handleBatchDelete}
                className="px-5 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-lg font-medium text-xs transition-colors shadow-xs"
              >
                确定
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
