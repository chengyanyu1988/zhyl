import React, { useState, useMemo } from 'react';
import {
  Search,
  RotateCcw,
  Plus,
  Layers,
  Upload,
  Calendar,
  X,
  CheckCircle2,
  FileText,
  DollarSign,
  User,
  Phone,
} from 'lucide-react';
import {
  ServiceStaffItem,
  INITIAL_SERVICE_STAFF,
  INITIAL_SERVICE_WORK_ORDERS,
  INITIAL_SERVICE_COMMISSIONS,
} from '../../data/serviceData';

interface ServiceStaffListProps {
  onNotice: (msg: string) => void;
}

export const ServiceStaffList: React.FC<ServiceStaffListProps> = ({ onNotice }) => {
  const [staffList, setStaffList] = useState<ServiceStaffItem[]>(INITIAL_SERVICE_STAFF);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentView, setCurrentView] = useState<'list' | 'create' | 'edit'>('list');
  const [editingStaff, setEditingStaff] = useState<ServiceStaffItem | null>(null);

  // Filters
  const [filterType, setFilterType] = useState<string>('');
  const [filterTag, setFilterTag] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [keyword, setKeyword] = useState<string>('');

  // Modals for "工单记录" and "佣金记录"
  const [viewingStaffOrders, setViewingStaffOrders] = useState<ServiceStaffItem | null>(null);
  const [viewingStaffCommissions, setViewingStaffCommissions] = useState<ServiceStaffItem | null>(null);

  // Form states (Screenshots 2 & 3)
  const [formName, setFormName] = useState('');
  const [formStaffId, setFormStaffId] = useState('323009000');
  const [formType, setFormType] = useState('家政护工');
  const [formPhone, setFormPhone] = useState('');
  const [formTag, setFormTag] = useState('金牌家政');
  const [formRegion, setFormRegion] = useState('上海市徐汇区');
  const [formIntro, setFormIntro] = useState('');
  const [formIdCard, setFormIdCard] = useState('');
  const [formBankCard, setFormBankCard] = useState('');
  const [formBankName, setFormBankName] = useState('');
  const [formEnabled, setFormEnabled] = useState(true);
  const [formPassword, setFormPassword] = useState('');
  const [formAllowTips, setFormAllowTips] = useState(true);
  const [formMorningShift, setFormMorningShift] = useState(true);
  const [formAfternoonShift, setFormAfternoonShift] = useState(true);

  // Filtered staff list
  const filteredStaff = useMemo(() => {
    return staffList
      .filter((item) => {
        if (filterType && item.serviceType !== filterType) return false;
        if (filterTag && item.tag !== filterTag) return false;
        if (keyword) {
          const q = keyword.trim().toLowerCase();
          const matchName = item.name.toLowerCase().includes(q);
          const matchNo = item.staffNo.includes(q);
          const matchPhone = item.phone.includes(q);
          const matchRegion = item.region.includes(q);
          if (!matchName && !matchNo && !matchPhone && !matchRegion) return false;
        }
        if (startDate && item.joinTime.slice(0, 10) < startDate) return false;
        if (endDate && item.joinTime.slice(0, 10) > endDate) return false;
        return true;
      })
      .sort((a, b) => new Date(b.joinTime).getTime() - new Date(a.joinTime).getTime());
  }, [staffList, filterType, filterTag, startDate, endDate, keyword]);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(filteredStaff.map((s) => s.id));
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

  const handleToggleEnabled = (staff: ServiceStaffItem) => {
    const updated = staffList.map((s) => (s.id === staff.id ? { ...s, enabled: !s.enabled } : s));
    setStaffList(updated);
    onNotice(`已${!staff.enabled ? '启用' : '禁用'}服务人员【${staff.name}】的接单资质`);
  };

  const handleDelete = (staff: ServiceStaffItem) => {
    if (confirm(`确认移除服务人员【${staff.name}】？`)) {
      setStaffList(staffList.filter((s) => s.id !== staff.id));
      onNotice(`已成功移除服务人员【${staff.name}】`);
    }
  };

  const handleResetFilters = () => {
    setFilterType('');
    setFilterTag('');
    setStartDate('');
    setEndDate('');
    setKeyword('');
    onNotice('已重置服务人员检索条件');
  };

  const handleOpenCreate = () => {
    setEditingStaff(null);
    setFormName('');
    setFormStaffId(`32300${Math.floor(1000 + Math.random() * 9000)}`);
    setFormType('家政护工');
    setFormPhone('');
    setFormTag('金牌家政');
    setFormRegion('上海市徐汇区');
    setFormIntro('');
    setFormIdCard('');
    setFormBankCard('');
    setFormBankName('');
    setFormEnabled(true);
    setFormPassword('');
    setFormAllowTips(true);
    setFormMorningShift(true);
    setFormAfternoonShift(true);
    setCurrentView('create');
  };

  const handleOpenEdit = (staff: ServiceStaffItem) => {
    setEditingStaff(staff);
    setFormName(staff.name);
    setFormStaffId(staff.staffNo);
    setFormType(staff.serviceType);
    setFormPhone(staff.phone);
    setFormTag(staff.tag);
    setFormRegion(staff.region);
    setFormIntro(staff.intro);
    setFormIdCard(staff.idCardNo);
    setFormBankCard(staff.bankCardNo);
    setFormBankName(staff.bankName);
    setFormEnabled(staff.enabled);
    setFormPassword(staff.loginPassword || 'safe2026');
    setFormAllowTips(staff.allowTips);
    setFormMorningShift(staff.workShifts.includes('早上 9:00-12:00'));
    setFormAfternoonShift(staff.workShifts.includes('下午 14:00-17:00'));
    setCurrentView('edit');
  };

  const handleSubmitStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) {
      alert('请填写姓名');
      return;
    }
    if (!formPhone.trim()) {
      alert('请填写手机号码');
      return;
    }

    const shifts: string[] = [];
    if (formMorningShift) shifts.push('早上 9:00-12:00');
    if (formAfternoonShift) shifts.push('下午 14:00-17:00');

    if (editingStaff) {
      const updated = staffList.map((s) =>
        s.id === editingStaff.id
          ? {
              ...s,
              name: formName,
              serviceType: formType,
              phone: formPhone,
              tag: formTag,
              region: formRegion,
              intro: formIntro,
              idCardNo: formIdCard,
              bankCardNo: formBankCard,
              bankName: formBankName,
              enabled: formEnabled,
              allowTips: formAllowTips,
              loginPassword: formPassword,
              workShifts: shifts,
            }
          : s
      );
      setStaffList(updated);
      onNotice(`已成功更新服务人员【${formName}】信息`);
    } else {
      const newStaff: ServiceStaffItem = {
        id: `staff-${Date.now()}`,
        staffNo: formStaffId,
        name: formName,
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
        phone: formPhone,
        serviceType: formType,
        tag: formTag,
        region: formRegion,
        joinWay: '后台添加',
        joinTime: '2026-09-19 15:00:00',
        enabled: formEnabled,
        intro: formIntro,
        idCardNo: formIdCard || '310104199001011234',
        bankCardNo: formBankCard || '6214 8301 9988 1234',
        bankName: formBankName || '招商银行上海分行',
        allowTips: formAllowTips,
        loginPassword: formPassword || 'safe2026',
        workShifts: shifts,
      };
      setStaffList([newStaff, ...staffList]);
      onNotice(`已提交服务人员【${formName}】资料并送入审核流`);
    }
    setCurrentView('list');
  };

  // If in create or edit view, render Screenshot 2 & 3 Form
  if (currentView === 'create' || currentView === 'edit') {
    return (
      <div className="p-6 max-w-[1600px] mx-auto text-xs space-y-6">
        <div className="bg-white rounded-xl p-8 border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-6">
          {/* Header */}
          <div className="flex items-center space-x-2.5 pb-5 border-b border-gray-100">
            <span className="w-1 h-4 bg-[#10b981] rounded-full"></span>
            <h1 className="text-sm font-semibold text-gray-800">
              {currentView === 'create' ? '新增服务人员' : '编辑服务人员'}
            </h1>
          </div>

          <form onSubmit={handleSubmitStaff} className="space-y-8 max-w-4xl">
            {/* Section 1: 基础信息 */}
            <div className="space-y-4">
              <h2 className="text-xs font-semibold text-gray-800 pb-2 border-b border-gray-50">基础信息</h2>

              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center space-x-3">
                  <label className="w-20 text-gray-600">
                    姓名<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="请输入"
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-md text-gray-800 focus:outline-none focus:border-[#10b981]"
                  />
                </div>

                <div className="flex items-center space-x-3">
                  <label className="w-20 text-gray-600">ID</label>
                  <input
                    type="text"
                    disabled
                    value={formStaffId}
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-md bg-gray-50 text-gray-500"
                  />
                </div>
              </div>

              {/* 头像 */}
              <div className="flex items-center space-x-3">
                <label className="w-20 text-gray-600">头像</label>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-lg bg-gray-100 border border-dashed border-gray-300 flex items-center justify-center text-gray-400 overflow-hidden">
                    <User className="w-6 h-6" />
                  </div>
                  <button
                    type="button"
                    onClick={() => onNotice('已支持长者照护资质证件与真实形象照片上传')}
                    className="text-[#10b981] hover:underline"
                  >
                    +点击上传
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center space-x-3">
                  <label className="w-20 text-gray-600">
                    服务类型<span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formType}
                    onChange={(e) => setFormType(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-md text-gray-800 bg-white focus:outline-none focus:border-[#10b981]"
                  >
                    <option value="家政护工">家政护工</option>
                    <option value="康复理疗师">康复理疗师</option>
                    <option value="养老护理员">养老护理员</option>
                    <option value="助医陪诊员">助医陪诊员</option>
                    <option value="适老助浴员">适老助浴员</option>
                    <option value="居家安全技工">居家安全技工</option>
                  </select>
                </div>

                <div className="flex items-center space-x-3">
                  <label className="w-20 text-gray-600">
                    手机号码<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    placeholder="请输入"
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-md text-gray-800 focus:outline-none focus:border-[#10b981]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center space-x-3">
                  <label className="w-20 text-gray-600">标签</label>
                  <select
                    value={formTag}
                    onChange={(e) => setFormTag(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-md text-gray-800 bg-white focus:outline-none focus:border-[#10b981]"
                  >
                    <option value="金牌家政">金牌家政</option>
                    <option value="高级理疗师">高级理疗师</option>
                    <option value="五星照护">五星照护</option>
                    <option value="资深陪诊">资深陪诊</option>
                    <option value="适老助浴">适老助浴</option>
                    <option value="慢病专护">慢病专护</option>
                    <option value="适老改造">适老改造</option>
                  </select>
                </div>

                <div className="flex items-center space-x-3">
                  <label className="w-20 text-gray-600">服务区域</label>
                  <input
                    type="text"
                    value={formRegion}
                    onChange={(e) => setFormRegion(e.target.value)}
                    placeholder="请选择"
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-md text-gray-800 focus:outline-none focus:border-[#10b981]"
                  />
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <label className="w-20 pt-2 text-gray-600">简介</label>
                <textarea
                  rows={3}
                  value={formIntro}
                  onChange={(e) => setFormIntro(e.target.value)}
                  placeholder="请输入专业技能、从业年限及个人照护特长"
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-md text-gray-800 focus:outline-none focus:border-[#10b981]"
                />
              </div>
            </div>

            {/* Section 2: 实名信息 */}
            <div className="space-y-4 pt-2">
              <h2 className="text-xs font-semibold text-gray-800 pb-2 border-b border-gray-50">实名信息</h2>

              <div className="flex items-center space-x-3">
                <label className="w-20 text-gray-600">
                  身份证号<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formIdCard}
                  onChange={(e) => setFormIdCard(e.target.value)}
                  placeholder="请输入18位身份证号"
                  className="w-96 px-3 py-2 border border-gray-200 rounded-md text-gray-800 focus:outline-none focus:border-[#10b981]"
                />
              </div>

              {/* 证件上传卡片 */}
              <div className="flex items-start space-x-3">
                <label className="w-20 pt-2 text-gray-600">
                  身份证<span className="text-red-500">*</span>
                </label>
                <div className="flex items-center space-x-4">
                  <div
                    onClick={() => onNotice('支持上传居民身份证正面头像面')}
                    className="w-44 h-24 border border-dashed border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 flex flex-col items-center justify-center cursor-pointer transition-colors"
                  >
                    <span className="text-gray-400 text-xs">+ 正面照</span>
                  </div>
                  <div
                    onClick={() => onNotice('支持上传居民身份证反面国徽面')}
                    className="w-44 h-24 border border-dashed border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 flex flex-col items-center justify-center cursor-pointer transition-colors"
                  >
                    <span className="text-gray-400 text-xs">+ 反面照</span>
                  </div>
                </div>
              </div>
              <div className="pl-24 text-[11px] text-gray-400">
                支持jpg, png等格式文件上传，文件大小不超过10MB
              </div>

              <div className="flex items-start space-x-3">
                <label className="w-20 pt-2 text-gray-600">职业证书</label>
                <div
                  onClick={() => onNotice('支持上传养老护理员、护士执业证或康复理疗师证书')}
                  className="w-44 h-24 border border-dashed border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 flex flex-col items-center justify-center cursor-pointer transition-colors"
                >
                  <span className="text-gray-400 text-xs">+ 正面照</span>
                </div>
              </div>
              <div className="pl-24 text-[11px] text-gray-400">
                支持jpg, png等格式文件上传，文件大小不超过10MB，可上传多张
              </div>

              <div className="grid grid-cols-2 gap-6 pt-2">
                <div className="flex items-center space-x-3">
                  <label className="w-20 text-gray-600">
                    银行卡号<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formBankCard}
                    onChange={(e) => setFormBankCard(e.target.value)}
                    placeholder="请输入银行结算卡号"
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-md text-gray-800 focus:outline-none focus:border-[#10b981]"
                  />
                </div>

                <div className="flex items-center space-x-3">
                  <label className="w-20 text-gray-600">
                    开户行<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formBankName}
                    onChange={(e) => setFormBankName(e.target.value)}
                    placeholder="请输入开户支行"
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-md text-gray-800 focus:outline-none focus:border-[#10b981]"
                  />
                </div>
              </div>
            </div>

            {/* Section 3: 其它信息 (Screenshot 3) */}
            <div className="space-y-4 pt-2">
              <h2 className="text-xs font-semibold text-gray-800 pb-2 border-b border-gray-50">其它信息</h2>

              <div className="grid grid-cols-2 gap-6">
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

                <div className="flex items-center space-x-3">
                  <label className="w-20 text-gray-600">
                    登录密码<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formPassword}
                    onChange={(e) => setFormPassword(e.target.value)}
                    placeholder="请输入服务调度系统登录密码"
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-md text-gray-800 focus:outline-none focus:border-[#10b981]"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <label className="w-20 text-gray-600">用户打赏</label>
                <button
                  type="button"
                  onClick={() => setFormAllowTips(!formAllowTips)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    formAllowTips ? 'bg-[#10b981] text-white' : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {formAllowTips ? '启用' : '禁用'}
                </button>
              </div>

              <div className="flex items-center space-x-3">
                <label className="w-20 text-gray-600">工作时段</label>
                <div className="flex items-center space-x-6">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formMorningShift}
                      onChange={(e) => setFormMorningShift(e.target.checked)}
                      className="rounded text-[#10b981] accent-[#10b981]"
                    />
                    <span className="text-gray-700">早上 9:00-12:00</span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formAfternoonShift}
                      onChange={(e) => setFormAfternoonShift(e.target.checked)}
                      className="rounded text-[#10b981] accent-[#10b981]"
                    />
                    <span className="text-gray-700">下午 14:00-17:00</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-gray-100 flex items-center space-x-3">
              <button
                type="submit"
                className="px-6 py-2 bg-[#10b981] text-white rounded-md hover:bg-[#059669] font-medium transition-colors"
              >
                提交审核
              </button>
              <button
                type="button"
                onClick={() => setCurrentView('list')}
                className="px-6 py-2 border border-gray-200 text-gray-600 rounded-md hover:bg-gray-50 transition-colors"
              >
                返回
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Otherwise, render List view (Screenshot 1)
  return (
    <div className="p-6 max-w-[1600px] mx-auto text-xs space-y-6">
      {/* Search & Filter Card (Screenshot 1) */}
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-5">
        {/* Title */}
        <div className="flex items-center space-x-2.5 pb-2">
          <span className="w-1 h-4 bg-[#10b981] rounded-full"></span>
          <h1 className="text-sm font-semibold text-gray-800">全部服务人员</h1>
        </div>

        {/* Filter Rows */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          {/* 服务类型 */}
          <div className="flex items-center space-x-2">
            <span className="text-gray-500 whitespace-nowrap w-16">服务类型</span>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="flex-1 px-3 py-1.5 border border-gray-200 rounded-md text-gray-700 bg-white focus:outline-none focus:border-[#10b981]"
            >
              <option value="">请选择</option>
              <option value="家政护工">家政护工</option>
              <option value="康复理疗师">康复理疗师</option>
              <option value="养老护理员">养老护理员</option>
              <option value="助医陪诊员">助医陪诊员</option>
              <option value="适老助浴员">适老助浴员</option>
              <option value="居家安全技工">居家安全技工</option>
            </select>
          </div>

          {/* 标签 */}
          <div className="flex items-center space-x-2">
            <span className="text-gray-500 whitespace-nowrap w-12">标签</span>
            <select
              value={filterTag}
              onChange={(e) => setFilterTag(e.target.value)}
              className="flex-1 px-3 py-1.5 border border-gray-200 rounded-md text-gray-700 bg-white focus:outline-none focus:border-[#10b981]"
            >
              <option value="">请选择</option>
              <option value="金牌家政">金牌家政</option>
              <option value="高级理疗师">高级理疗师</option>
              <option value="五星照护">五星照护</option>
              <option value="资深陪诊">资深陪诊</option>
              <option value="适老助浴">适老助浴</option>
              <option value="高级康复师">高级康复师</option>
              <option value="慢病专护">慢病专护</option>
            </select>
          </div>

          {/* 加入日期 */}
          <div className="flex items-center space-x-2 md:col-span-2">
            <span className="text-gray-500 whitespace-nowrap w-16">加入日期</span>
            <div className="flex items-center space-x-2 flex-1">
              <input
                type="date"
                min="2026-09-01"
                max="2026-09-19"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="flex-1 px-2.5 py-1.5 border border-gray-200 rounded-md text-gray-700 text-xs focus:outline-none focus:border-[#10b981]"
              />
              <span className="text-gray-400">~</span>
              <input
                type="date"
                min="2026-09-01"
                max="2026-09-19"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="flex-1 px-2.5 py-1.5 border border-gray-200 rounded-md text-gray-700 text-xs focus:outline-none focus:border-[#10b981]"
              />
            </div>
          </div>
        </div>

        {/* Search Input & Action Buttons */}
        <div className="flex items-center space-x-3 max-w-md">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onNotice(`搜索关键词: ${keyword}`)}
            placeholder="请输入关键字"
            className="flex-1 px-3 py-1.5 border border-gray-200 rounded-md text-gray-700 focus:outline-none focus:border-[#10b981]"
          />
          <button
            onClick={() => onNotice(`已根据输入条件筛选出 ${filteredStaff.length} 名服务人员`)}
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

      {/* Main Table Card (Screenshot 1) */}
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
                onNotice('请先勾选需要批量操作的服务人员');
              } else {
                onNotice(`已批量处理选中的 ${selectedIds.length} 位服务人员`);
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
                    checked={selectedIds.length > 0 && selectedIds.length === filteredStaff.length}
                    onChange={handleSelectAll}
                    className="rounded text-[#10b981] accent-[#10b981]"
                  />
                </th>
                <th className="py-3 px-4 font-medium">服务人员信息</th>
                <th className="py-3 px-4 font-medium">服务人员ID</th>
                <th className="py-3 px-4 font-medium">服务类型</th>
                <th className="py-3 px-4 font-medium">标签</th>
                <th className="py-3 px-4 font-medium">负责区域</th>
                <th className="py-3 px-4 font-medium">加入方式</th>
                <th className="py-3 px-4 font-medium">加入时间</th>
                <th className="py-3 px-4 font-medium">状态</th>
                <th className="py-3 px-4 font-medium text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredStaff.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-12 text-center text-gray-400">
                    暂无符合条件的服务人员记录
                  </td>
                </tr>
              ) : (
                filteredStaff.map((staff) => (
                  <tr key={staff.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="py-3.5 px-4">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(staff.id)}
                        onChange={() => handleSelectOne(staff.id)}
                        className="rounded text-[#10b981] accent-[#10b981]"
                      />
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={staff.avatar}
                          alt={staff.name}
                          className="w-9 h-9 rounded-full object-cover border border-gray-100 shadow-sm shrink-0"
                        />
                        <div>
                          <div className="font-medium text-gray-800">{staff.name}</div>
                          <div className="text-gray-400 font-mono text-[11px]">{staff.phone}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-gray-600">{staff.staffNo}</td>
                    <td className="py-3.5 px-4 text-gray-700">{staff.serviceType}</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-0.5 rounded text-[11px] font-medium border border-blue-200 text-blue-600 bg-blue-50/50">
                        {staff.tag}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-gray-600">{staff.region}</td>
                    <td className="py-3.5 px-4 text-gray-600">{staff.joinWay}</td>
                    <td className="py-3.5 px-4 font-mono text-gray-500 whitespace-nowrap">
                      {staff.joinTime}
                    </td>
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => handleToggleEnabled(staff)}
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium transition-colors ${
                          staff.enabled
                            ? 'bg-[#10b981] text-white hover:bg-[#059669]'
                            : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                        }`}
                      >
                        {staff.enabled ? '启用' : '禁用'}
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end space-x-3">
                        <button
                          onClick={() => handleOpenEdit(staff)}
                          className="text-[#10b981] hover:underline"
                        >
                          编辑
                        </button>
                        <button
                          onClick={() => setViewingStaffOrders(staff)}
                          className="text-[#10b981] hover:underline"
                        >
                          工单记录
                        </button>
                        <button
                          onClick={() => setViewingStaffCommissions(staff)}
                          className="text-[#10b981] hover:underline"
                        >
                          佣金记录
                        </button>
                        <button
                          onClick={() => handleDelete(staff)}
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

      {/* Modal: 工单记录 */}
      {viewingStaffOrders && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-4xl w-full border border-gray-100 shadow-2xl space-y-4 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center space-x-2">
                <span className="w-1 h-4 bg-[#10b981] rounded-full"></span>
                <h3 className="font-semibold text-gray-800 text-sm">
                  【{viewingStaffOrders.name}】的工单服务记录
                </h3>
              </div>
              <button
                onClick={() => setViewingStaffOrders(null)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3">
              {INITIAL_SERVICE_WORK_ORDERS.filter((wo) =>
                wo.staffNames.includes(viewingStaffOrders.name)
              ).length === 0 ? (
                <div className="py-12 text-center text-gray-400">该服务人员暂无分配工单记录</div>
              ) : (
                INITIAL_SERVICE_WORK_ORDERS.filter((wo) =>
                  wo.staffNames.includes(viewingStaffOrders.name)
                ).map((wo) => (
                  <div
                    key={wo.id}
                    className="p-3 border border-gray-100 rounded-lg hover:border-[#10b981]/30 transition-colors flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={wo.thumbnail}
                        alt=""
                        className="w-12 h-12 rounded object-cover border border-gray-100 shrink-0"
                      />
                      <div>
                        <div className="font-medium text-gray-800">{wo.title}</div>
                        <div className="text-gray-400 text-[11px] font-mono">
                          工单: {wo.id} | 预约: {wo.appointmentTime}
                        </div>
                        <div className="text-gray-500 text-[11px]">
                          服务长者: {wo.customerName} ({wo.customerPhone})
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-gray-800 font-mono">¥{wo.actualAmount.toFixed(2)}</div>
                      <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded text-[10px]">
                        {wo.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="pt-3 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setViewingStaffOrders(null)}
                className="px-4 py-1.5 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: 佣金记录 */}
      {viewingStaffCommissions && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-4xl w-full border border-gray-100 shadow-2xl space-y-4 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center space-x-2">
                <span className="w-1 h-4 bg-[#10b981] rounded-full"></span>
                <h3 className="font-semibold text-gray-800 text-sm">
                  【{viewingStaffCommissions.name}】的佣金结算记录
                </h3>
              </div>
              <button
                onClick={() => setViewingStaffCommissions(null)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3">
              {INITIAL_SERVICE_COMMISSIONS.filter(
                (cm) => cm.staffName === viewingStaffCommissions.name
              ).length === 0 ? (
                <div className="py-12 text-center text-gray-400">该服务人员暂无佣金结算明细</div>
              ) : (
                INITIAL_SERVICE_COMMISSIONS.filter(
                  (cm) => cm.staffName === viewingStaffCommissions.name
                ).map((cm) => (
                  <div
                    key={cm.id}
                    className="p-3 border border-gray-100 rounded-lg hover:border-[#10b981]/30 transition-colors flex items-center justify-between"
                  >
                    <div>
                      <div className="font-medium text-gray-800">{cm.title}</div>
                      <div className="text-gray-400 text-[11px] font-mono">
                        工单号: {cm.id} | 申请: {cm.applyTime}
                      </div>
                      <div className="text-gray-500 text-[11px]">订单总额: ¥{cm.actualAmount.toFixed(2)}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-emerald-600 font-mono text-sm">
                        +¥{cm.commissionAmount.toFixed(2)}
                      </div>
                      <span className="text-[11px] text-blue-600">{cm.settlementStatus}</span>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="pt-3 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setViewingStaffCommissions(null)}
                className="px-4 py-1.5 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
