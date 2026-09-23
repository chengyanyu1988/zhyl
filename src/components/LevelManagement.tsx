import React, { useState, useMemo } from 'react';
import {
  Search,
  RotateCcw,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

export interface LevelItem {
  id: string;
  name: string; // e.g. Lv1, Lv2...
  status: boolean; // true = 启用, false = 停用
  levelType: string; // 一级, 二级...
  upgradeType: string; // 注册, 累计消费, 积分达成...
  benefits: string; // 2倍积分; 9.8折优惠; 健康测评
  receiver: string; // 张珊, 李明明...
  sendMethod: string; // 系统消息, 短信通知...
  updateTime: string; // 2026-09-19 16:30:00, descending
  upgradeConditions?: {
    spendAmountEnabled: boolean;
    spendAmount: string;
    growthEnabled: boolean;
    growthValue: string;
  };
  benefitSettings?: {
    discountEnabled: boolean;
    discountValue: string;
    pointsMultiplierEnabled: boolean;
    pointsMultiplierValue: string;
    healthAssessmentEnabled: boolean;
  };
  description?: string;
}

const INITIAL_LEVELS: LevelItem[] = [
  {
    id: 'lvl-01',
    name: 'Lv1',
    status: true,
    levelType: '一级',
    upgradeType: '注册',
    benefits: '1倍积分; 新人礼包; 基础健康档案',
    receiver: '张珊',
    sendMethod: '系统消息',
    updateTime: '2026-09-19 16:30:00',
    upgradeConditions: {
      spendAmountEnabled: false,
      spendAmount: '',
      growthEnabled: false,
      growthValue: '',
    },
    benefitSettings: {
      discountEnabled: false,
      discountValue: '',
      pointsMultiplierEnabled: false,
      pointsMultiplierValue: '',
      healthAssessmentEnabled: true,
    },
    description: '长者完成实名注册认证即可享受的基础银发会员等级。',
  },
  {
    id: 'lvl-02',
    name: 'Lv2',
    status: true,
    levelType: '一级',
    upgradeType: '注册',
    benefits: '2倍积分; 9.8折优惠; 健康测评',
    receiver: '张珊',
    sendMethod: '系统消息',
    updateTime: '2026-09-18 14:20:10',
    upgradeConditions: {
      spendAmountEnabled: true,
      spendAmount: '500',
      growthEnabled: true,
      growthValue: '200',
    },
    benefitSettings: {
      discountEnabled: true,
      discountValue: '9.8',
      pointsMultiplierEnabled: true,
      pointsMultiplierValue: '2',
      healthAssessmentEnabled: true,
    },
    description: '累计消费满500元或成长值达200点，享季度健康档案评估及折扣。',
  },
  {
    id: 'lvl-03',
    name: 'Lv3',
    status: true,
    levelType: '一级',
    upgradeType: '注册',
    benefits: '2倍积分; 9.8折优惠; 健康测评',
    receiver: '张珊',
    sendMethod: '系统消息',
    updateTime: '2026-09-17 11:15:30',
    upgradeConditions: {
      spendAmountEnabled: true,
      spendAmount: '1200',
      growthEnabled: true,
      growthValue: '600',
    },
    benefitSettings: {
      discountEnabled: true,
      discountValue: '9.5',
      pointsMultiplierEnabled: true,
      pointsMultiplierValue: '2',
      healthAssessmentEnabled: true,
    },
    description: '享社区助餐优先排期及双月心脑血管健康综合评估。',
  },
  {
    id: 'lvl-04',
    name: 'Lv4',
    status: true,
    levelType: '一级',
    upgradeType: '注册',
    benefits: '2倍积分; 9.8折优惠; 健康测评',
    receiver: '张珊',
    sendMethod: '系统消息',
    updateTime: '2026-09-16 15:40:00',
    upgradeConditions: {
      spendAmountEnabled: true,
      spendAmount: '3000',
      growthEnabled: true,
      growthValue: '1500',
    },
    benefitSettings: {
      discountEnabled: true,
      discountValue: '9.2',
      pointsMultiplierEnabled: true,
      pointsMultiplierValue: '2',
      healthAssessmentEnabled: true,
    },
    description: '赠送专车陪诊服务券及每月骨密度、慢病动态随访。',
  },
  {
    id: 'lvl-05',
    name: 'Lv5',
    status: true,
    levelType: '二级',
    upgradeType: '累计消费',
    benefits: '2.5倍积分; 8.8折优惠; 专属管家; 绿色通道',
    receiver: '李明明',
    sendMethod: '短信通知',
    updateTime: '2026-09-14 09:30:00',
    upgradeConditions: {
      spendAmountEnabled: true,
      spendAmount: '6000',
      growthEnabled: true,
      growthValue: '3500',
    },
    benefitSettings: {
      discountEnabled: true,
      discountValue: '8.8',
      pointsMultiplierEnabled: true,
      pointsMultiplierValue: '2.5',
      healthAssessmentEnabled: true,
    },
    description: '配备专属健康管理师，建立家庭医生档案，提供全年体检全套服务。',
  },
  {
    id: 'lvl-06',
    name: 'Lv6',
    status: true,
    levelType: '二级',
    upgradeType: '照护签约',
    benefits: '3倍积分; 8.5折优惠; 设备免押; 三甲会诊',
    receiver: '运营主管',
    sendMethod: '系统消息',
    updateTime: '2026-09-10 14:10:00',
    upgradeConditions: {
      spendAmountEnabled: true,
      spendAmount: '12000',
      growthEnabled: true,
      growthValue: '7000',
    },
    benefitSettings: {
      discountEnabled: true,
      discountValue: '8.5',
      pointsMultiplierEnabled: true,
      pointsMultiplierValue: '3',
      healthAssessmentEnabled: true,
    },
    description: '居家智能监测设备免收押金，优先享有三甲医院专家深度会诊名额。',
  },
  {
    id: 'lvl-07',
    name: 'Lv7',
    status: true,
    levelType: '三级',
    upgradeType: '定制签约',
    benefits: '3.5倍积分; 8.0折优惠; 24h家庭医生; 旅居康养',
    receiver: '会长专线',
    sendMethod: '微信服务号',
    updateTime: '2026-09-04 10:00:00',
    upgradeConditions: {
      spendAmountEnabled: true,
      spendAmount: '30000',
      growthEnabled: true,
      growthValue: '20000',
    },
    benefitSettings: {
      discountEnabled: true,
      discountValue: '8.0',
      pointsMultiplierEnabled: true,
      pointsMultiplierValue: '3.5',
      healthAssessmentEnabled: true,
    },
    description: '定制全天候私人照护计划，提供全国连锁医养中心度假与绿色直通。',
  },
];

interface LevelManagementProps {
  onNotice: (msg: string) => void;
}

export const LevelManagement: React.FC<LevelManagementProps> = ({ onNotice }) => {
  const [levels, setLevels] = useState<LevelItem[]>(INITIAL_LEVELS);
  const [viewMode, setViewMode] = useState<'list' | 'create'>('list');
  const [editingLevel, setEditingLevel] = useState<LevelItem | null>(null);

  // Filter state
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [keyword, setKeyword] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Pagination (Matches Screenshot 5: 共7条 每页10条)
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Form state for Create / Edit Level (Matches Image 6)
  const [levelName, setLevelName] = useState('');
  const [spendAmountEnabled, setSpendAmountEnabled] = useState(false);
  const [spendAmount, setSpendAmount] = useState('');
  const [growthEnabled, setGrowthEnabled] = useState(false);
  const [growthValue, setGrowthValue] = useState('');
  const [discountEnabled, setDiscountEnabled] = useState(false);
  const [discountValue, setDiscountValue] = useState('');
  const [pointsMultiplierEnabled, setPointsMultiplierEnabled] = useState(false);
  const [pointsMultiplierValue, setPointsMultiplierValue] = useState('');
  const [healthAssessmentEnabled, setHealthAssessmentEnabled] = useState(false);
  const [levelStatus, setLevelStatus] = useState(true);
  const [description, setDescription] = useState('');

  const handleOpenCreate = () => {
    setEditingLevel(null);
    setLevelName('');
    setSpendAmountEnabled(false);
    setSpendAmount('');
    setGrowthEnabled(false);
    setGrowthValue('');
    setDiscountEnabled(false);
    setDiscountValue('');
    setPointsMultiplierEnabled(false);
    setPointsMultiplierValue('');
    setHealthAssessmentEnabled(false);
    setLevelStatus(true);
    setDescription('');
    setViewMode('create');
  };

  const handleOpenEdit = (lvl: LevelItem) => {
    setEditingLevel(lvl);
    setLevelName(lvl.name);
    setLevelStatus(lvl.status);
    setDescription(lvl.description || '');

    if (lvl.upgradeConditions) {
      setSpendAmountEnabled(lvl.upgradeConditions.spendAmountEnabled);
      setSpendAmount(lvl.upgradeConditions.spendAmount);
      setGrowthEnabled(lvl.upgradeConditions.growthEnabled);
      setGrowthValue(lvl.upgradeConditions.growthValue);
    } else {
      setSpendAmountEnabled(false);
      setSpendAmount('');
      setGrowthEnabled(false);
      setGrowthValue('');
    }

    if (lvl.benefitSettings) {
      setDiscountEnabled(lvl.benefitSettings.discountEnabled);
      setDiscountValue(lvl.benefitSettings.discountValue);
      setPointsMultiplierEnabled(lvl.benefitSettings.pointsMultiplierEnabled);
      setPointsMultiplierValue(lvl.benefitSettings.pointsMultiplierValue);
      setHealthAssessmentEnabled(lvl.benefitSettings.healthAssessmentEnabled);
    } else {
      setDiscountEnabled(false);
      setDiscountValue('');
      setPointsMultiplierEnabled(false);
      setPointsMultiplierValue('');
      setHealthAssessmentEnabled(false);
    }

    setViewMode('create');
  };

  const handleSaveLevel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!levelName.trim()) {
      onNotice('请输入等级名称');
      return;
    }

    const benefitsArr: string[] = [];
    if (pointsMultiplierEnabled && pointsMultiplierValue) {
      benefitsArr.push(`${pointsMultiplierValue}倍积分`);
    }
    if (discountEnabled && discountValue) {
      benefitsArr.push(`${discountValue}折优惠`);
    }
    if (healthAssessmentEnabled) {
      benefitsArr.push('健康测评');
    }
    const benefitsString = benefitsArr.length > 0 ? benefitsArr.join('; ') : '常规会员服务';

    if (editingLevel) {
      setLevels((prev) =>
        prev.map((item) =>
          item.id === editingLevel.id
            ? {
                ...item,
                name: levelName.trim(),
                status: levelStatus,
                benefits: benefitsString,
                description,
                updateTime: '2026-09-19 17:25:00',
                upgradeConditions: {
                  spendAmountEnabled,
                  spendAmount,
                  growthEnabled,
                  growthValue,
                },
                benefitSettings: {
                  discountEnabled,
                  discountValue,
                  pointsMultiplierEnabled,
                  pointsMultiplierValue,
                  healthAssessmentEnabled,
                },
              }
            : item
        )
      );
      onNotice(`已成功修改等级【${levelName.trim()}】设置`);
    } else {
      const newLvl: LevelItem = {
        id: `lvl-${Date.now()}`,
        name: levelName.trim(),
        status: levelStatus,
        levelType: '一级',
        upgradeType: spendAmountEnabled ? '累计消费' : '注册',
        benefits: benefitsString,
        receiver: '张珊',
        sendMethod: '系统消息',
        updateTime: '2026-09-19 17:30:00',
        description,
        upgradeConditions: {
          spendAmountEnabled,
          spendAmount,
          growthEnabled,
          growthValue,
        },
        benefitSettings: {
          discountEnabled,
          discountValue,
          pointsMultiplierEnabled,
          pointsMultiplierValue,
          healthAssessmentEnabled,
        },
      };
      setLevels((prev) => [newLvl, ...prev]);
      onNotice(`已成功新增等级【${levelName.trim()}】`);
    }
    setViewMode('list');
  };

  // Filtered & sorted descending
  const filteredLevels = useMemo(() => {
    return levels
      .filter((lvl) => {
        const q = keyword.trim().toLowerCase();
        const matchesKeyword =
          !q ||
          lvl.name.toLowerCase().includes(q) ||
          lvl.levelType.toLowerCase().includes(q) ||
          lvl.upgradeType.toLowerCase().includes(q) ||
          lvl.benefits.toLowerCase().includes(q) ||
          lvl.receiver.toLowerCase().includes(q);

        let matchesDate = true;
        if (dateRange.start) {
          matchesDate = matchesDate && lvl.updateTime >= dateRange.start;
        }
        if (dateRange.end) {
          matchesDate = matchesDate && lvl.updateTime <= dateRange.end + ' 23:59:59';
        }

        return matchesKeyword && matchesDate;
      })
      .sort((a, b) => new Date(b.updateTime).getTime() - new Date(a.updateTime).getTime());
  }, [levels, keyword, dateRange]);

  const totalPages = Math.ceil(filteredLevels.length / pageSize) || 1;
  const paginatedLevels = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredLevels.slice(start, start + pageSize);
  }, [filteredLevels, currentPage]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(paginatedLevels.map((l) => l.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleDeleteLevel = (lvl: LevelItem) => {
    setLevels((prev) => prev.filter((l) => l.id !== lvl.id));
    setSelectedIds((prev) => prev.filter((id) => id !== lvl.id));
    onNotice(`已删除等级配置【${lvl.name}】`);
  };

  const handleResetFilters = () => {
    setKeyword('');
    setDateRange({ start: '', end: '' });
    setCurrentPage(1);
    onNotice('已重置等级查询条件');
  };

  const handleBatchOperation = () => {
    if (selectedIds.length === 0) {
      onNotice('请先勾选需要批量操作的等级项');
      return;
    }
    onNotice(`已对选中的 ${selectedIds.length} 项等级规则执行同步`);
  };

  // -------------------------------------------------------------
  // VIEW: CREATE / EDIT LEVEL (Matches Image 6)
  // -------------------------------------------------------------
  if (viewMode === 'create') {
    return (
      <div className="p-6 max-w-[1600px] mx-auto text-xs">
        <div className="bg-white rounded-xl p-8 border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-6">
          {/* Header indicator */}
          <div className="flex items-center space-x-2.5 pb-5 border-b border-gray-100">
            <span className="w-1 h-4 bg-[#10b981] rounded-full"></span>
            <h1 className="text-sm font-semibold text-gray-800">
              {editingLevel ? '编辑等级' : '新增等级'}
            </h1>
          </div>

          <form onSubmit={handleSaveLevel} className="space-y-6 max-w-2xl">
            {/* 等级名称 */}
            <div className="flex items-center">
              <label className="w-24 text-gray-600">
                <span className="text-red-500 mr-0.5">*</span>等级名称
              </label>
              <div className="flex-1">
                <input
                  type="text"
                  value={levelName}
                  onChange={(e) => setLevelName(e.target.value)}
                  placeholder="请输入"
                  className="w-full max-w-sm px-3.5 py-2 border border-gray-200 rounded-md text-gray-800 focus:outline-none focus:border-[#10b981] text-xs placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* 升级条件 */}
            <div className="flex items-start">
              <label className="w-24 pt-1.5 text-gray-600">升级条件</label>
              <div className="flex-1 space-y-3">
                {/* 累计消费金额 */}
                <div className="flex items-center space-x-3">
                  <label className="flex items-center space-x-2 cursor-pointer w-28">
                    <input
                      type="checkbox"
                      checked={spendAmountEnabled}
                      onChange={(e) => setSpendAmountEnabled(e.target.checked)}
                      className="rounded text-[#10b981] accent-[#10b981]"
                    />
                    <span className="text-gray-700">累计消费金额</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={spendAmount}
                      onChange={(e) => setSpendAmount(e.target.value)}
                      disabled={!spendAmountEnabled}
                      className="w-36 px-2.5 py-1.5 pr-6 border border-gray-200 rounded text-right focus:outline-none focus:border-[#10b981] disabled:bg-gray-50"
                    />
                    <span className="absolute right-2 top-1.5 text-gray-400">元</span>
                  </div>
                </div>

                {/* 成长值 */}
                <div className="flex items-center space-x-3">
                  <label className="flex items-center space-x-2 cursor-pointer w-28">
                    <input
                      type="checkbox"
                      checked={growthEnabled}
                      onChange={(e) => setGrowthEnabled(e.target.checked)}
                      className="rounded text-[#10b981] accent-[#10b981]"
                    />
                    <span className="text-gray-700">成长值</span>
                  </label>
                  <input
                    type="number"
                    value={growthValue}
                    onChange={(e) => setGrowthValue(e.target.value)}
                    disabled={!growthEnabled}
                    className="w-36 px-2.5 py-1.5 border border-gray-200 rounded text-right focus:outline-none focus:border-[#10b981] disabled:bg-gray-50"
                  />
                </div>
              </div>
            </div>

            {/* 等级权益 */}
            <div className="flex items-start">
              <label className="w-24 pt-1.5 text-gray-600">等级权益</label>
              <div className="flex-1 space-y-3">
                {/* 折扣 */}
                <div className="flex items-center space-x-3">
                  <label className="flex items-center space-x-2 cursor-pointer w-24">
                    <input
                      type="checkbox"
                      checked={discountEnabled}
                      onChange={(e) => setDiscountEnabled(e.target.checked)}
                      className="rounded text-[#10b981] accent-[#10b981]"
                    />
                    <span className="text-gray-700">折扣</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.1"
                      value={discountValue}
                      onChange={(e) => setDiscountValue(e.target.value)}
                      disabled={!discountEnabled}
                      className="w-32 px-2.5 py-1.5 pr-6 border border-gray-200 rounded text-right focus:outline-none focus:border-[#10b981] disabled:bg-gray-50"
                    />
                    <span className="absolute right-2 top-1.5 text-gray-400">折</span>
                  </div>
                </div>

                {/* 积分翻倍 */}
                <div className="flex items-center space-x-3">
                  <label className="flex items-center space-x-2 cursor-pointer w-24">
                    <input
                      type="checkbox"
                      checked={pointsMultiplierEnabled}
                      onChange={(e) => setPointsMultiplierEnabled(e.target.checked)}
                      className="rounded text-[#10b981] accent-[#10b981]"
                    />
                    <span className="text-gray-700">积分翻倍</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.5"
                      value={pointsMultiplierValue}
                      onChange={(e) => setPointsMultiplierValue(e.target.value)}
                      disabled={!pointsMultiplierEnabled}
                      className="w-32 px-2.5 py-1.5 pr-6 border border-gray-200 rounded text-right focus:outline-none focus:border-[#10b981] disabled:bg-gray-50"
                    />
                    <span className="absolute right-2 top-1.5 text-gray-400">折</span>
                  </div>
                </div>

                {/* 健康测评 */}
                <div className="flex items-center space-x-3">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={healthAssessmentEnabled}
                      onChange={(e) => setHealthAssessmentEnabled(e.target.checked)}
                      className="rounded text-[#10b981] accent-[#10b981]"
                    />
                    <span className="text-gray-700">健康测评</span>
                  </label>
                </div>
              </div>
            </div>

            {/* 状态 */}
            <div className="flex items-center">
              <label className="w-24 text-gray-600">状态</label>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => setLevelStatus(!levelStatus)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    levelStatus ? 'bg-[#10b981]' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      levelStatus ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
                <span className="text-xs text-gray-600">{levelStatus ? '启用' : '停用'}</span>
              </div>
            </div>

            {/* 等级说明 */}
            <div className="flex items-start">
              <label className="w-24 pt-2 text-gray-600">等级说明</label>
              <div className="flex-1">
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="请输入"
                  className="w-full max-w-xl p-3 border border-gray-200 rounded-md text-gray-800 focus:outline-none focus:border-[#10b981] text-xs placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Actions: 保存 / 返回 */}
            <div className="pt-6 border-t border-gray-100 flex items-center space-x-3">
              <button
                type="submit"
                className="px-6 py-2 bg-[#10b981] text-white rounded-md hover:bg-[#059669] font-medium transition-colors"
              >
                保存
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className="px-6 py-2 bg-white border border-gray-200 text-gray-700 rounded-md hover:bg-gray-50 font-medium transition-colors"
              >
                返回
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // VIEW: LIST (Matches Image 5)
  // -------------------------------------------------------------
  return (
    <div className="p-6 max-w-[1600px] mx-auto text-xs space-y-4">
      {/* Filter Card */}
      <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-4">
        {/* Title */}
        <div className="flex items-center space-x-2 pb-2">
          <span className="w-1.5 h-4 bg-[#10b981] rounded-full"></span>
          <h1 className="text-sm font-semibold text-gray-800">等级管理</h1>
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center space-x-2">
            <span className="text-gray-500 whitespace-nowrap">更新日期</span>
            <div className="flex items-center border border-gray-200 rounded-md px-2.5 py-1.5 bg-white space-x-2">
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange((prev) => ({ ...prev, start: e.target.value }))}
                className="text-gray-600 focus:outline-none text-xs"
              />
              <span className="text-gray-400">~</span>
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange((prev) => ({ ...prev, end: e.target.value }))}
                className="text-gray-600 focus:outline-none text-xs"
              />
              <Calendar className="w-3.5 h-3.5 text-gray-400 ml-1" />
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

          {/* Search Button */}
          <button
            type="button"
            onClick={() => onNotice(`已匹配出 ${filteredLevels.length} 条等级规则`)}
            className="w-8 h-8 rounded-md bg-[#10b981] hover:bg-[#059669] text-white flex items-center justify-center transition-colors"
            title="搜索"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Reset Button */}
          <button
            type="button"
            onClick={handleResetFilters}
            className="w-8 h-8 rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50 flex items-center justify-center transition-colors"
            title="重置"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-4">
        {/* Top Buttons: 新增 / 批量操作 */}
        <div className="flex items-center justify-end space-x-2.5">
          <button
            type="button"
            onClick={handleOpenCreate}
            className="px-4 py-1.5 bg-[#10b981] hover:bg-[#059669] text-white rounded-md font-medium transition-colors"
          >
            新增
          </button>
          <button
            type="button"
            onClick={handleBatchOperation}
            className="px-4 py-1.5 border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-md font-medium transition-colors"
          >
            批量操作
          </button>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-gray-500 font-normal">
                <th className="py-3 px-3 w-10 text-center">
                  <input
                    type="checkbox"
                    checked={
                      paginatedLevels.length > 0 &&
                      paginatedLevels.every((l) => selectedIds.includes(l.id))
                    }
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="rounded text-[#10b981] accent-[#10b981]"
                  />
                </th>
                <th className="py-3 px-4 font-normal text-gray-600">等级名称</th>
                <th className="py-3 px-4 font-normal text-gray-600">状态</th>
                <th className="py-3 px-4 font-normal text-gray-600">等级类型</th>
                <th className="py-3 px-4 font-normal text-gray-600">升级类型</th>
                <th className="py-3 px-4 font-normal text-gray-600">等级权益</th>
                <th className="py-3 px-4 font-normal text-gray-600">接收人</th>
                <th className="py-3 px-4 font-normal text-gray-600">发送方式</th>
                <th className="py-3 px-4 font-normal text-gray-600 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {paginatedLevels.map((lvl) => {
                const isSelected = selectedIds.includes(lvl.id);
                return (
                  <tr
                    key={lvl.id}
                    className={`hover:bg-gray-50/70 transition-colors ${
                      isSelected ? 'bg-emerald-50/20' : ''
                    }`}
                  >
                    <td className="py-3 px-3 text-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleToggleSelect(lvl.id)}
                        className="rounded text-[#10b981] accent-[#10b981]"
                      />
                    </td>
                    {/* Golden / Amber Lv text matching screenshot */}
                    <td className="py-3 px-4 font-bold text-[#eab308]">{lvl.name}</td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center text-gray-700">
                        <span
                          className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                            lvl.status ? 'bg-[#10b981]' : 'bg-gray-400'
                          }`}
                        ></span>
                        {lvl.status ? '启用' : '停用'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{lvl.levelType}</td>
                    <td className="py-3 px-4 text-gray-600">{lvl.upgradeType}</td>
                    <td className="py-3 px-4 text-gray-700 max-w-md">{lvl.benefits}</td>
                    <td className="py-3 px-4 text-gray-600">{lvl.receiver}</td>
                    <td className="py-3 px-4 text-gray-600">{lvl.sendMethod}</td>
                    <td className="py-3 px-4 text-right space-x-3">
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(lvl)}
                        className="text-[#10b981] hover:underline"
                      >
                        编辑
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteLevel(lvl)}
                        className="text-red-500 hover:underline"
                      >
                        删除
                      </button>
                    </td>
                  </tr>
                );
              })}
              {paginatedLevels.length === 0 && (
                <tr>
                  <td colSpan={9} className="text-center py-10 text-gray-400">
                    暂无匹配的等级规则记录
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar (Matching Screenshot 5: 共7条 每页10条 v << < 1 > >> 前往第 1 页) */}
        <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-100 text-xs text-gray-500">
          <span>共{filteredLevels.length}条</span>

          <div className="flex items-center space-x-1">
            <span>每页10条</span>
            <span className="text-gray-400">∨</span>
          </div>

          <div className="flex items-center space-x-1">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="px-1.5 py-1 text-gray-400 hover:text-gray-700 disabled:opacity-30"
            >
              &lt;&lt;
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-1.5 py-1 text-gray-400 hover:text-gray-700 disabled:opacity-30"
            >
              &lt;
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
              className="px-1.5 py-1 text-gray-400 hover:text-gray-700 disabled:opacity-30"
            >
              &gt;
            </button>
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="px-1.5 py-1 text-gray-400 hover:text-gray-700 disabled:opacity-30"
            >
              &gt;&gt;
            </button>
          </div>

          <div className="flex items-center space-x-1">
            <span>前往第</span>
            <input
              type="text"
              value={currentPage}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10);
                if (!isNaN(val) && val >= 1 && val <= totalPages) {
                  setCurrentPage(val);
                }
              }}
              className="w-10 px-1 py-0.5 border border-gray-200 rounded text-center text-xs focus:outline-none focus:border-[#10b981]"
            />
            <span>页</span>
          </div>
        </div>
      </div>
    </div>
  );
};
