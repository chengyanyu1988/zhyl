import React, { useState, useMemo, useRef } from 'react';
import {
  Search,
  RotateCcw,
  ChevronDown,
  Trash2,
  Check,
  Calendar,
  Clock,
  ArrowLeft,
  GripVertical,
  Upload,
  Image as ImageIcon,
  Type,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Link as LinkIcon,
  List,
  AlignLeft,
  Quote,
  Smile,
  Table,
  Play,
  Code,
  Undo2,
  Redo2,
  X,
  Sliders,
} from 'lucide-react';
import {
  SubPageId,
  AssessmentItem,
  AssessmentQuestion,
  AssessmentOption,
  AssessmentResultTier,
} from '../../types';

interface AssessmentManagementProps {
  subPageId: SubPageId;
  onNotice: (msg: string) => void;
  onConfirmDelete: (title: string, message: string, onConfirm: () => void) => void;
}

// 预设近期时间（2026年10月），降序排列的初始数据
const INITIAL_ASSESSMENTS: AssessmentItem[] = [
  {
    id: 'ASM_001',
    publishTime: '2026-10-21 10:09:09',
    title: '2型糖尿病风险筛查',
    questionCount: 5,
    totalScore: 100,
    participantCount: 5000,
    testCount: 6000,
    publisher: '李明明',
    status: '已发布',
    description: '针对中老年人血糖异常、多饮多尿及糖尿病家族史的早期风险分级初筛。',
    coverImages: ['https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=300&auto=format&fit=crop&q=80'],
    publishType: 'immediate',
    questions: [
      {
        id: 'q1',
        title: '近半年内是否经常感到口渴、排尿频次显著增加？',
        allowSkip: true,
        selectType: 'single',
        options: [
          { id: 'opt_1', label: '从不或极少发生', score: 0 },
          { id: 'opt_2', label: '偶尔发生 (每周1-2次)', score: 5 },
          { id: 'opt_3', label: '经常发生 (几乎每日均有)', score: 10 },
        ],
      },
      {
        id: 'q2',
        title: '直系亲属中是否有确诊糖尿病的先例？',
        allowSkip: true,
        selectType: 'single',
        options: [
          { id: 'opt_2_1', label: '无家族糖尿病史', score: 0 },
          { id: 'opt_2_2', label: '二代直系亲属确诊', score: 5 },
          { id: 'opt_2_3', label: '父母或同胞患有糖尿病', score: 10 },
        ],
      },
    ],
    resultTiers: [
      {
        id: 'rt_1',
        minScore: 0,
        maxScore: 40,
        description: '血糖代谢风险较低，请保持清淡低盐少糖膳食及每周健步活动。',
      },
      {
        id: 'rt_2',
        minScore: 41,
        maxScore: 100,
        description: '血糖异常风险偏高，建议前往社区卫生服务中心检测空腹血糖及糖化血红蛋白。',
      },
    ],
  },
  {
    id: 'ASM_002',
    publishTime: '2026-10-20 16:35:12',
    title: '老年高血压健康评估',
    questionCount: 5,
    totalScore: 100,
    participantCount: 5000,
    testCount: 6000,
    publisher: '李明明',
    status: '已发布',
    description: '评估长者日常血压平稳度、降压用药规律性及盐摄入等生活方式。',
  },
  {
    id: 'ASM_003',
    publishTime: '2026-10-19 14:20:00',
    title: '日常生活活动能力评定 (Barthel ADL)',
    questionCount: 10,
    totalScore: 100,
    participantCount: 4850,
    testCount: 5920,
    publisher: '李明明',
    status: '已发布',
    description: '国际通用生活自理能力评估标准，包含进食、穿衣、如厕、床椅转移等。',
  },
  {
    id: 'ASM_004',
    publishTime: '2026-10-18 11:15:30',
    title: '简易智能精神状态检查 (MMSE)',
    questionCount: 15,
    totalScore: 100,
    participantCount: 4620,
    testCount: 5580,
    publisher: '李明明',
    status: '已发布',
    description: '评估长者定向力、记忆力、心算注意力及语言操作能力，筛查认知障碍。',
  },
  {
    id: 'ASM_005',
    publishTime: '2026-10-17 15:40:00',
    title: '老年跌倒风险评定自测表',
    questionCount: 6,
    totalScore: 100,
    participantCount: 5120,
    testCount: 6240,
    publisher: '李明明',
    status: '已发布',
    description: '量化跌倒病史、辅具依赖、步态平稳度及视觉反射，防范跌倒骨折。',
  },
  {
    id: 'ASM_006',
    publishTime: '2026-10-16 09:30:18',
    title: '微型营养评定简表 (MNA-SF)',
    questionCount: 6,
    totalScore: 100,
    participantCount: 3980,
    testCount: 4760,
    publisher: '李明明',
    status: '已发布',
    description: '快速评估长者食欲、体质指数变化、行动能力与急性应激营养不良。',
  },
  {
    id: 'ASM_007',
    publishTime: '2026-10-15 14:10:05',
    title: '老年抑郁量表精简版 (GDS-15)',
    questionCount: 15,
    totalScore: 100,
    participantCount: 3420,
    testCount: 4180,
    publisher: '李明明',
    status: '已发布',
    description: '专注长者情绪活力、独居孤独感与社交意愿，提供早期心理关怀指引。',
  },
  {
    id: 'ASM_008',
    publishTime: '2026-10-14 16:25:40',
    title: '骨质疏松与骨折风险评估 (FRAX)',
    questionCount: 8,
    totalScore: 100,
    participantCount: 4310,
    testCount: 5230,
    publisher: '李明明',
    status: '已发布',
    description: '结合年龄、钙质吸收、家族骨折史量化未来十年骨脆性骨折概率。',
  },
  {
    id: 'ASM_009',
    publishTime: '2026-10-13 10:05:00',
    title: '匹兹堡睡眠质量指数 (PSQI)',
    questionCount: 8,
    totalScore: 100,
    participantCount: 4890,
    testCount: 5970,
    publisher: '李明明',
    status: '已发布',
    description: '评估入睡潜伏期、夜醒多梦、睡眠效率及日间功能障碍。',
  },
  {
    id: 'ASM_010',
    publishTime: '2026-10-12 11:30:00',
    title: '心脑血管疾病综合健康自测',
    questionCount: 10,
    totalScore: 100,
    participantCount: 5020,
    testCount: 6110,
    publisher: '李明明',
    status: '已发布',
    description: '血脂异常、心悸胸闷、运动耐力及颈动脉斑块综合风险评估。',
  },
  {
    id: 'ASM_011',
    publishTime: '2026-10-11 15:00:00',
    title: '老年白内障与视力自查量表',
    questionCount: 5,
    totalScore: 100,
    participantCount: 3750,
    testCount: 4520,
    publisher: '李明明',
    status: '已发布',
    description: '排查畏光暗视力减退、视物变形模糊及白内障进展预警。',
  },
  {
    id: 'ASM_012',
    publishTime: '2026-10-10 09:45:00',
    title: '肌少症简易五项筛查问卷 (SARC-F)',
    questionCount: 5,
    totalScore: 100,
    participantCount: 4160,
    testCount: 5080,
    publisher: '李明明',
    status: '已发布',
    description: '提重物能力、步行过马路、从椅子站起、爬楼梯及近一年跌倒次数。',
  },
  {
    id: 'ASM_013',
    publishTime: '2026-10-09 10:09:09',
    title: '老年听力损失与日常沟通评估',
    questionCount: 6,
    totalScore: 100,
    participantCount: 2980,
    testCount: 3640,
    publisher: '李明明',
    status: '未发布',
    description: '耳鸣、听不清电视音量、嘈杂环境对话辨识度等听力健康评估。',
  },
  {
    id: 'ASM_014',
    publishTime: '2026-10-08 14:20:10',
    title: '呼吸系统慢病健康自测',
    questionCount: 5,
    totalScore: 100,
    participantCount: 3100,
    testCount: 3820,
    publisher: '李明明',
    status: '已下架',
    description: '慢性咳嗽、晨起咳痰、活动后气促喘息等肺功能与慢阻肺早期筛查。',
  },
];

// 富文本编辑器工具栏组件（与截图 toolbar 1:1 对齐）
const EditorToolbar: React.FC<{
  onFormatAction?: (action: string) => void;
}> = ({ onFormatAction }) => {
  return (
    <div className="flex flex-wrap items-center gap-1.5 px-3 py-2 bg-white border border-gray-200 border-b-0 rounded-t-lg text-gray-600 select-none">
      <button
        type="button"
        onClick={() => onFormatAction?.('h')}
        title="标题 H"
        className="px-1.5 py-1 hover:bg-gray-100 rounded text-xs font-bold font-serif"
      >
        H
      </button>
      <button
        type="button"
        onClick={() => onFormatAction?.('b')}
        title="粗体 B"
        className="px-1.5 py-1 hover:bg-gray-100 rounded text-xs font-bold"
      >
        B
      </button>
      <button
        type="button"
        onClick={() => onFormatAction?.('font-size')}
        title="字号 Tᴛ"
        className="px-1.5 py-1 hover:bg-gray-100 rounded text-xs flex items-center font-serif"
      >
        <span>T</span>
        <span className="text-[10px]">ᴛ</span>
      </button>
      <button
        type="button"
        onClick={() => onFormatAction?.('clear')}
        title="清除格式"
        className="px-1.5 py-1 hover:bg-gray-100 rounded text-xs line-through"
      >
        Tx
      </button>

      <span className="w-px h-3.5 bg-gray-200 mx-0.5" />

      <button
        type="button"
        onClick={() => onFormatAction?.('italic')}
        title="斜体 I"
        className="px-1.5 py-1 hover:bg-gray-100 rounded text-xs italic font-serif"
      >
        I
      </button>
      <button
        type="button"
        onClick={() => onFormatAction?.('underline')}
        title="下划线 U"
        className="px-1.5 py-1 hover:bg-gray-100 rounded text-xs underline"
      >
        U
      </button>
      <button
        type="button"
        onClick={() => onFormatAction?.('strikethrough')}
        title="删除线 S"
        className="px-1.5 py-1 hover:bg-gray-100 rounded text-xs line-through"
      >
        S
      </button>
      <button
        type="button"
        onClick={() => onFormatAction?.('color')}
        title="字体颜色"
        className="px-1.5 py-1 hover:bg-gray-100 rounded text-xs flex flex-col items-center justify-center"
      >
        <span className="leading-none font-bold">A</span>
        <span className="w-3 h-0.5 bg-red-500 rounded-full mt-0.5"></span>
      </button>

      <span className="w-px h-3.5 bg-gray-200 mx-0.5" />

      <button
        type="button"
        onClick={() => onFormatAction?.('link')}
        title="插入链接"
        className="p-1 hover:bg-gray-100 rounded text-gray-500"
      >
        <LinkIcon className="w-3.5 h-3.5" />
      </button>
      <button
        type="button"
        onClick={() => onFormatAction?.('list')}
        title="无序列表"
        className="p-1 hover:bg-gray-100 rounded text-gray-500"
      >
        <List className="w-3.5 h-3.5" />
      </button>
      <button
        type="button"
        onClick={() => onFormatAction?.('align')}
        title="文本对齐"
        className="p-1 hover:bg-gray-100 rounded text-gray-500"
      >
        <AlignLeft className="w-3.5 h-3.5" />
      </button>
      <button
        type="button"
        onClick={() => onFormatAction?.('quote')}
        title="引用段落"
        className="p-1 hover:bg-gray-100 rounded text-gray-500"
      >
        <Quote className="w-3.5 h-3.5" />
      </button>
      <button
        type="button"
        onClick={() => onFormatAction?.('emoji')}
        title="表情符号"
        className="p-1 hover:bg-gray-100 rounded text-gray-500"
      >
        <Smile className="w-3.5 h-3.5" />
      </button>
      <button
        type="button"
        onClick={() => onFormatAction?.('image')}
        title="上传图片"
        className="p-1 hover:bg-gray-100 rounded text-gray-500"
      >
        <ImageIcon className="w-3.5 h-3.5" />
      </button>
      <button
        type="button"
        onClick={() => onFormatAction?.('table')}
        title="表格"
        className="p-1 hover:bg-gray-100 rounded text-gray-500"
      >
        <Table className="w-3.5 h-3.5" />
      </button>
      <button
        type="button"
        onClick={() => onFormatAction?.('video')}
        title="插入视频"
        className="p-1 hover:bg-gray-100 rounded text-gray-500"
      >
        <Play className="w-3.5 h-3.5" />
      </button>
      <button
        type="button"
        onClick={() => onFormatAction?.('code')}
        title="代码片段"
        className="p-1 hover:bg-gray-100 rounded text-gray-500 font-mono text-xs"
      >
        &gt;_
      </button>

      <span className="w-px h-3.5 bg-gray-200 mx-0.5" />

      <button
        type="button"
        onClick={() => onFormatAction?.('undo')}
        title="撤销"
        className="p-1 hover:bg-gray-100 rounded text-gray-500"
      >
        <Undo2 className="w-3.5 h-3.5" />
      </button>
      <button
        type="button"
        onClick={() => onFormatAction?.('redo')}
        title="重做"
        className="p-1 hover:bg-gray-100 rounded text-gray-500"
      >
        <Redo2 className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

export const AssessmentManagement: React.FC<AssessmentManagementProps> = ({
  subPageId: _subPageId,
  onNotice,
  onConfirmDelete,
}) => {
  const [assessments, setAssessments] = useState<AssessmentItem[]>(INITIAL_ASSESSMENTS);

  // 视图模式：'list' 为测评表格列表，'form' 为新增/编辑页面（根据截图 image_b0bddb01.png 和 image_ace80a6b.png 生成）
  const [viewMode, setViewMode] = useState<'list' | 'form'>('list');

  // ================= 列表搜索与分页状态 =================
  const [searchStatus, setSearchStatus] = useState<string>('ALL');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [appliedStatus, setAppliedStatus] = useState<string>('ALL');
  const [appliedKeyword, setAppliedKeyword] = useState<string>('');

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showBatchMenu, setShowBatchMenu] = useState(false);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [jumpPageInput, setJumpPageInput] = useState<string>('1');

  // ================= 新增/编辑 表单状态（1:1 对齐截图） =================
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formTitle, setFormTitle] = useState<string>('');
  const [formCoverImages, setFormCoverImages] = useState<string[]>([]);
  const [formPublishType, setFormPublishType] = useState<'immediate' | 'scheduled'>('immediate');
  const [formScheduledDate, setFormScheduledDate] = useState<string>('');
  const [formScheduledTime, setFormScheduledTime] = useState<string>('12 : 00');
  const [formInstructions, setFormInstructions] = useState<string>('');

  // 题目列表
  const [formQuestions, setFormQuestions] = useState<AssessmentQuestion[]>([
    {
      id: 'q_1',
      title: '',
      allowSkip: true,
      selectType: 'single',
      options: [
        { id: 'opt_1', label: '选项1', score: 1 },
        { id: 'opt_2', label: '选项2', score: 3 },
      ],
    },
  ]);

  // 结果判定区间列表
  const [formResultTiers, setFormResultTiers] = useState<AssessmentResultTier[]>([
    {
      id: 'rt_1',
      minScore: 0,
      maxScore: 60,
      description: '',
    },
  ]);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // 列表过滤与降序排序
  const filteredList = useMemo(() => {
    return assessments
      .filter((item) => {
        if (appliedStatus !== 'ALL' && item.status !== appliedStatus) {
          return false;
        }
        if (appliedKeyword.trim()) {
          const kw = appliedKeyword.trim().toLowerCase();
          const matchTitle = item.title.toLowerCase().includes(kw);
          const matchPublisher = item.publisher.toLowerCase().includes(kw);
          if (!matchTitle && !matchPublisher) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => b.publishTime.localeCompare(a.publishTime));
  }, [assessments, appliedStatus, appliedKeyword]);

  // 分页数据
  const totalItems = filteredList.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const validCurrentPage = Math.min(currentPage, totalPages);

  const paginatedList = useMemo(() => {
    const startIndex = (validCurrentPage - 1) * pageSize;
    return filteredList.slice(startIndex, startIndex + pageSize);
  }, [filteredList, validCurrentPage, pageSize]);

  const currentPageIds = useMemo(() => paginatedList.map((item) => item.id), [paginatedList]);
  const isAllCurrentSelected =
    currentPageIds.length > 0 && currentPageIds.every((id) => selectedIds.includes(id));

  const toggleSelectAll = () => {
    if (isAllCurrentSelected) {
      setSelectedIds((prev) => prev.filter((id) => !currentPageIds.includes(id)));
    } else {
      setSelectedIds((prev) => Array.from(new Set([...prev, ...currentPageIds])));
    }
  };

  const toggleSelectItem = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSearch = () => {
    setAppliedStatus(searchStatus);
    setAppliedKeyword(searchKeyword);
    setCurrentPage(1);
    setJumpPageInput('1');
  };

  const handleReset = () => {
    setSearchStatus('ALL');
    setSearchKeyword('');
    setAppliedStatus('ALL');
    setAppliedKeyword('');
    setCurrentPage(1);
    setJumpPageInput('1');
  };

  const handleJumpPage = (e: React.FormEvent) => {
    e.preventDefault();
    const target = parseInt(jumpPageInput, 10);
    if (!isNaN(target) && target >= 1 && target <= totalPages) {
      setCurrentPage(target);
    } else {
      setJumpPageInput(String(validCurrentPage));
    }
  };

  const handleDeleteItem = (item: AssessmentItem) => {
    onConfirmDelete(
      '确认删除测评量表',
      `您确定要删除【${item.title}】吗？删除后长者端将无法再进行该项测评。`,
      () => {
        setAssessments((prev) => prev.filter((a) => a.id !== item.id));
        setSelectedIds((prev) => prev.filter((id) => id !== item.id));
        onNotice(`测评【${item.title}】已成功删除`);
      }
    );
  };

  // 进入「新增」页面
  const handleOpenAddPage = () => {
    setEditingId(null);
    setFormTitle('');
    setFormCoverImages([]);
    setFormPublishType('immediate');
    setFormScheduledDate('');
    setFormScheduledTime('12 : 00');
    setFormInstructions('');
    setFormQuestions([
      {
        id: `q_${Date.now()}`,
        title: '',
        allowSkip: true,
        selectType: 'single',
        options: [
          { id: `opt_1_${Date.now()}`, label: '选项1', score: 1 },
          { id: `opt_2_${Date.now()}`, label: '选项2', score: 3 },
        ],
      },
    ]);
    setFormResultTiers([
      {
        id: `rt_${Date.now()}`,
        minScore: 0,
        maxScore: 60,
        description: '',
      },
    ]);
    setViewMode('form');
  };

  // 进入「编辑」页面
  const handleOpenEditPage = (item: AssessmentItem) => {
    setEditingId(item.id);
    setFormTitle(item.title);
    setFormCoverImages(item.coverImages || []);
    setFormPublishType(item.publishType || 'immediate');
    setFormScheduledDate(item.scheduledDate || '');
    setFormScheduledTime(item.scheduledTime || '12 : 00');
    setFormInstructions(item.instructionsHtml || item.description || '');

    if (item.questions && item.questions.length > 0) {
      setFormQuestions(item.questions);
    } else {
      setFormQuestions([
        {
          id: `q_${Date.now()}`,
          title: item.title,
          allowSkip: true,
          selectType: 'single',
          options: [
            { id: `opt_1_${Date.now()}`, label: '正常/自理', score: 10 },
            { id: `opt_2_${Date.now()}`, label: '轻度异常', score: 5 },
            { id: `opt_3_${Date.now()}`, label: '重度受损', score: 0 },
          ],
        },
      ]);
    }

    if (item.resultTiers && item.resultTiers.length > 0) {
      setFormResultTiers(item.resultTiers);
    } else {
      setFormResultTiers([
        {
          id: `rt_${Date.now()}`,
          minScore: 0,
          maxScore: 60,
          description: item.description || '',
        },
      ]);
    }

    setViewMode('form');
  };

  // 封面图片上传/选择处理
  const handleTriggerUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const fakeUrl = URL.createObjectURL(file);
      if (formCoverImages.length < 3) {
        setFormCoverImages([...formCoverImages, fakeUrl]);
        onNotice(`成功添加图片【${file.name}】`);
      } else {
        onNotice('最多只可上传3张封面图片');
      }
    }
  };

  const handleRemoveCover = (index: number) => {
    setFormCoverImages((prev) => prev.filter((_, i) => i !== index));
  };

  // 题目操作
  const handleAddQuestion = () => {
    const newQ: AssessmentQuestion = {
      id: `q_${Date.now()}`,
      title: '',
      allowSkip: true,
      selectType: 'single',
      options: [
        { id: `opt_${Date.now()}_1`, label: '选项1', score: 1 },
        { id: `opt_${Date.now()}_2`, label: '选项2', score: 3 },
      ],
    };
    setFormQuestions([...formQuestions, newQ]);
    onNotice('已添加新题目');
  };

  const handleDeleteQuestion = (qIndex: number) => {
    if (formQuestions.length <= 1) {
      onNotice('至少需要保留一道题目');
      return;
    }
    setFormQuestions((prev) => prev.filter((_, i) => i !== qIndex));
    onNotice(`已删除第 ${qIndex + 1} 题`);
  };

  const handleUpdateQuestion = (qIndex: number, updates: Partial<AssessmentQuestion>) => {
    setFormQuestions((prev) =>
      prev.map((q, i) => (i === qIndex ? { ...q, ...updates } : q))
    );
  };

  const handleAddOption = (qIndex: number) => {
    setFormQuestions((prev) =>
      prev.map((q, i) => {
        if (i === qIndex) {
          const nextOptNo = q.options.length + 1;
          const newOpt: AssessmentOption = {
            id: `opt_${Date.now()}_${nextOptNo}`,
            label: `选项${nextOptNo}`,
            score: nextOptNo,
          };
          return { ...q, options: [...q.options, newOpt] };
        }
        return q;
      })
    );
  };

  const handleDeleteOption = (qIndex: number, optIndex: number) => {
    setFormQuestions((prev) =>
      prev.map((q, i) => {
        if (i === qIndex) {
          if (q.options.length <= 1) {
            onNotice('每道题至少需保留一个选项');
            return q;
          }
          return {
            ...q,
            options: q.options.filter((_, oIdx) => oIdx !== optIndex),
          };
        }
        return q;
      })
    );
  };

  const handleUpdateOption = (
    qIndex: number,
    optIndex: number,
    updates: Partial<AssessmentOption>
  ) => {
    setFormQuestions((prev) =>
      prev.map((q, i) => {
        if (i === qIndex) {
          return {
            ...q,
            options: q.options.map((opt, oIdx) =>
              oIdx === optIndex ? { ...opt, ...updates } : opt
            ),
          };
        }
        return q;
      })
    );
  };

  // 测评结果条目操作
  const handleAddResultTier = () => {
    const lastTier = formResultTiers[formResultTiers.length - 1];
    const newMin = lastTier ? lastTier.maxScore + 1 : 0;
    const newTier: AssessmentResultTier = {
      id: `rt_${Date.now()}`,
      minScore: Math.min(100, newMin),
      maxScore: 100,
      description: '',
    };
    setFormResultTiers([...formResultTiers, newTier]);
    onNotice('已添加结果条目');
  };

  const handleDeleteResultTier = (rIndex: number) => {
    if (formResultTiers.length <= 1) {
      onNotice('至少需保留一个测评结果条目');
      return;
    }
    setFormResultTiers((prev) => prev.filter((_, i) => i !== rIndex));
    onNotice('已删除测评结果条目');
  };

  const handleUpdateResultTier = (
    rIndex: number,
    updates: Partial<AssessmentResultTier>
  ) => {
    setFormResultTiers((prev) =>
      prev.map((tier, i) => (i === rIndex ? { ...tier, ...updates } : tier))
    );
  };

  // 保存新增或编辑的表单
  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      onNotice('请输入测评标题');
      return;
    }

    const now = new Date();
    const pad = (n: number) => String(n).padStart(2, '0');
    const currentTimeStr = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(
      now.getDate()
    )} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;

    const payload: AssessmentItem = {
      id: editingId || `ASM_${Date.now()}`,
      publishTime: currentTimeStr,
      title: formTitle.trim(),
      questionCount: formQuestions.length,
      totalScore: 100,
      participantCount: editingId ? 5000 : 0,
      testCount: editingId ? 6000 : 0,
      publisher: '李明明',
      status: '已发布',
      coverImages: formCoverImages,
      publishType: formPublishType,
      scheduledDate: formScheduledDate,
      scheduledTime: formScheduledTime,
      instructionsHtml: formInstructions,
      description: formInstructions || '老年健康标准化自测评估量表',
      questions: formQuestions,
      resultTiers: formResultTiers,
    };

    setAssessments((prev) => {
      const exists = prev.some((a) => a.id === payload.id);
      if (exists) {
        return prev.map((a) => (a.id === payload.id ? payload : a));
      }
      return [payload, ...prev];
    });

    onNotice(`测评【${payload.title}】已成功保存！`);
    setViewMode('list');
  };

  // 批量操作处理
  const handleBatchPublish = () => {
    if (selectedIds.length === 0) {
      onNotice('请先勾选需要批量操作的测评');
      return;
    }
    setAssessments((prev) =>
      prev.map((item) => (selectedIds.includes(item.id) ? { ...item, status: '已发布' } : item))
    );
    onNotice(`已批量发布 ${selectedIds.length} 项测评`);
    setShowBatchMenu(false);
  };

  const handleBatchUnpublish = () => {
    if (selectedIds.length === 0) {
      onNotice('请先勾选需要批量操作的测评');
      return;
    }
    setAssessments((prev) =>
      prev.map((item) => (selectedIds.includes(item.id) ? { ...item, status: '已下架' } : item))
    );
    onNotice(`已批量下架 ${selectedIds.length} 项测评`);
    setShowBatchMenu(false);
  };

  const handleBatchDelete = () => {
    if (selectedIds.length === 0) {
      onNotice('请先勾选需要批量操作的测评');
      return;
    }
    onConfirmDelete(
      '批量删除测评',
      `您确定要删除已勾选的 ${selectedIds.length} 项测评吗？此操作不可逆。`,
      () => {
        setAssessments((prev) => prev.filter((item) => !selectedIds.includes(item.id)));
        setSelectedIds([]);
        setShowBatchMenu(false);
        onNotice('已成功批量删除选中的测评');
      }
    );
  };

  // ====================== 渲染新增/编辑页面 (根据截图 1:1) ======================
  if (viewMode === 'form') {
    return (
      <div className="space-y-4">
        {/* 顶部标题栏（带返回按钮与标志性绿条） */}
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex items-center justify-between">
          <div className="flex items-center">
            <span className="w-1.5 h-4.5 bg-[#10b981] rounded-full inline-block mr-2.5"></span>
            <h2 className="text-base font-bold text-gray-800 tracking-tight">
              {editingId ? '编辑测评信息' : '新增测评信息'}
            </h2>
          </div>

          <button
            type="button"
            onClick={() => setViewMode('list')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-600 text-xs transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            返回列表
          </button>
        </div>

        {/* 表单主体卡片 */}
        <form
          onSubmit={handleSaveForm}
          className="bg-white rounded-xl p-6 sm:p-8 border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-8"
        >
          {/* ================= 一、基础信息 (截图一 image_b0bddb01.png) ================= */}
          <div>
            <h3 className="text-sm font-bold text-gray-800 mb-6">基础信息</h3>

            <div className="space-y-6">
              {/* 1. 测评标题* */}
              <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4">
                <label className="sm:w-24 pt-2 text-xs sm:text-sm text-gray-600 shrink-0">
                  测评标题<span className="text-red-500 ml-0.5">*</span>
                </label>
                <div className="flex-1 max-w-3xl">
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="请输入"
                    className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 hover:border-gray-300 focus:outline-none focus:border-[#10b981] transition-colors"
                  />
                </div>
              </div>

              {/* 2. 封面图片* */}
              <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4">
                <label className="sm:w-24 pt-2 text-xs sm:text-sm text-gray-600 shrink-0">
                  封面图片<span className="text-red-500 ml-0.5">*</span>
                </label>
                <div className="flex-1 max-w-3xl">
                  <div className="flex flex-wrap items-center gap-3">
                    {/* 已上传图片展示 */}
                    {formCoverImages.map((imgUrl, idx) => (
                      <div
                        key={idx}
                        className="relative w-44 h-28 rounded-lg overflow-hidden border border-gray-200 group"
                      >
                        <img
                          src={imgUrl}
                          alt={`封面 ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveCover(idx)}
                          className="absolute top-1 right-1 p-1 bg-black/60 hover:bg-black/80 text-white rounded-full transition-opacity opacity-0 group-hover:opacity-100"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}

                    {/* 上传按钮框（与截图 1:1 风格） */}
                    {formCoverImages.length < 3 && (
                      <div
                        onClick={handleTriggerUpload}
                        className="w-48 h-28 border border-gray-200 rounded-lg flex flex-col items-center justify-center bg-gray-50/50 hover:bg-gray-100/70 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors"
                      >
                        <span className="text-xs">+ 上传图片</span>
                      </div>
                    )}

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </div>

                  <p className="text-xs text-gray-400 mt-2">
                    支持jpg, png等格式文件上传，文件大小不超过10MB，最多可上传3张
                  </p>
                </div>
              </div>

              {/* 3. 发布时间 */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <label className="sm:w-24 text-xs sm:text-sm text-gray-600 shrink-0">
                  发布时间
                </label>
                <div className="flex-1 max-w-3xl flex flex-wrap items-center gap-6">
                  {/* 立即发布 */}
                  <label className="inline-flex items-center gap-2 cursor-pointer select-none text-xs sm:text-sm text-gray-700">
                    <input
                      type="radio"
                      name="publishType"
                      checked={formPublishType === 'immediate'}
                      onChange={() => setFormPublishType('immediate')}
                      className="w-4 h-4 text-[#10b981] focus:ring-[#10b981] border-gray-300 accent-[#10b981]"
                    />
                    <span>立即发布</span>
                  </label>

                  {/* 定时发布 */}
                  <div className="inline-flex items-center gap-2">
                    <label className="inline-flex items-center gap-2 cursor-pointer select-none text-xs sm:text-sm text-gray-700">
                      <input
                        type="radio"
                        name="publishType"
                        checked={formPublishType === 'scheduled'}
                        onChange={() => setFormPublishType('scheduled')}
                        className="w-4 h-4 text-[#10b981] focus:ring-[#10b981] border-gray-300 accent-[#10b981]"
                      />
                      <span>定时发布</span>
                    </label>

                    {/* 日期选择输入框 */}
                    <div className="relative">
                      <input
                        type="date"
                        value={formScheduledDate}
                        onChange={(e) => setFormScheduledDate(e.target.value)}
                        placeholder="请选择日期"
                        disabled={formPublishType !== 'scheduled'}
                        className="w-44 px-3 py-1.5 text-xs border border-gray-200 rounded-lg text-gray-700 bg-white hover:border-gray-300 focus:outline-none focus:border-[#10b981] disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
                      />
                    </div>

                    {/* 时间选择输入框 */}
                    <div className="relative flex items-center">
                      <input
                        type="text"
                        value={formScheduledTime}
                        onChange={(e) => setFormScheduledTime(e.target.value)}
                        placeholder="12 : 00"
                        disabled={formPublishType !== 'scheduled'}
                        className="w-32 px-3 py-1.5 text-xs border border-gray-200 rounded-lg text-gray-700 bg-white hover:border-gray-300 focus:outline-none focus:border-[#10b981] disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors pr-7 font-mono"
                      />
                      <Clock className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>

              {/* 4. 测试说明* */}
              <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4">
                <label className="sm:w-24 pt-2 text-xs sm:text-sm text-gray-600 shrink-0">
                  测试说明<span className="text-red-500 ml-0.5">*</span>
                </label>
                <div className="flex-1 max-w-3xl">
                  <div className="border border-gray-200 rounded-lg overflow-hidden focus-within:border-[#10b981] transition-colors">
                    {/* 富文本工具栏 */}
                    <EditorToolbar />
                    {/* 编辑器内容区 */}
                    <textarea
                      rows={7}
                      required
                      value={formInstructions}
                      onChange={(e) => setFormInstructions(e.target.value)}
                      placeholder="请详细录入该测评量表的前置说明、测试对象注意事项及作答指引..."
                      className="w-full p-3.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none resize-none bg-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100" />

          {/* ================= 二、题目设置 (截图二 image_ace80a6b.png) ================= */}
          <div>
            <h3 className="text-sm font-bold text-gray-800 mb-6">题目设置</h3>

            <div className="space-y-6 max-w-3xl sm:ml-28">
              {formQuestions.map((q, qIndex) => (
                <div
                  key={q.id}
                  className="border border-gray-200/90 rounded-xl p-5 bg-[#fafbfc]/60 space-y-4 shadow-[0_1px_4px_rgba(0,0,0,0.02)]"
                >
                  {/* 题目输入栏 */}
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400 cursor-grab p-1" title="按住拖拽排序">
                      <GripVertical className="w-4 h-4" />
                    </span>
                    <span className="font-bold text-sm text-red-500 mr-0.5">*{qIndex + 1}.</span>
                    <input
                      type="text"
                      required
                      value={q.title}
                      onChange={(e) => handleUpdateQuestion(qIndex, { title: e.target.value })}
                      placeholder="请输入问题"
                      className="flex-1 px-3.5 py-2 text-sm border border-gray-200 rounded-lg text-gray-800 bg-white placeholder-gray-400 hover:border-gray-300 focus:outline-none focus:border-[#10b981] transition-colors"
                    />
                  </div>

                  {/* 选项列表 */}
                  <div className="space-y-3 pl-6">
                    {q.options.map((opt, optIndex) => (
                      <div key={opt.id} className="flex items-center gap-2.5">
                        <span className="text-gray-300 cursor-grab p-0.5" title="拖拽排序">
                          <GripVertical className="w-3.5 h-3.5" />
                        </span>

                        <input
                          type="text"
                          required
                          value={opt.label}
                          onChange={(e) =>
                            handleUpdateOption(qIndex, optIndex, { label: e.target.value })
                          }
                          placeholder={`选项${optIndex + 1}`}
                          className="w-72 sm:w-80 px-3 py-1.5 text-xs sm:text-sm border border-gray-200 rounded-lg text-gray-800 bg-white hover:border-gray-300 focus:outline-none focus:border-[#10b981] transition-colors"
                        />

                        {/* 分数输入框 */}
                        <div className="flex items-center gap-1">
                          <input
                            type="number"
                            min={0}
                            value={opt.score}
                            onChange={(e) =>
                              handleUpdateOption(qIndex, optIndex, {
                                score: Number(e.target.value),
                              })
                            }
                            className="w-12 px-2 py-1.5 text-xs text-center border border-gray-200 rounded-lg text-gray-700 bg-white hover:border-gray-300 focus:outline-none focus:border-[#10b981] font-mono"
                          />
                          <span className="text-xs text-gray-500">分</span>
                        </div>

                        {/* 删除选项垃圾桶 */}
                        <button
                          type="button"
                          onClick={() => handleDeleteOption(qIndex, optIndex)}
                          title="删除选项"
                          className="p-1 text-gray-400 hover:text-rose-500 rounded transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>

                        {/* 在最后一个选项右侧显示 +添加选项 */}
                        {optIndex === q.options.length - 1 && (
                          <button
                            type="button"
                            onClick={() => handleAddOption(qIndex)}
                            className="text-xs text-[#10b981] hover:text-[#059669] hover:underline cursor-pointer font-medium ml-1 flex items-center gap-0.5"
                          >
                            +添加选项
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* 题目底部控制栏 */}
                  <div className="border-t border-gray-100 pt-3 flex flex-wrap items-center justify-between text-xs gap-3">
                    <div className="flex items-center gap-6">
                      {/* 允许跳过 开关 */}
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600">允许跳过</span>
                        <button
                          type="button"
                          onClick={() =>
                            handleUpdateQuestion(qIndex, { allowSkip: !q.allowSkip })
                          }
                          className={`relative inline-flex h-5 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
                            q.allowSkip ? 'bg-[#10b981]' : 'bg-gray-300'
                          }`}
                        >
                          <span
                            className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out translate-y-0.5 ${
                              q.allowSkip ? 'translate-x-6' : 'translate-x-0.5'
                            }`}
                          />
                          <span
                            className={`absolute text-[9px] font-bold text-white leading-5 pointer-events-none ${
                              q.allowSkip ? 'left-1.5' : 'right-1.5 text-gray-600'
                            }`}
                          >
                            {q.allowSkip ? '启用' : '禁用'}
                          </span>
                        </button>
                      </div>

                      {/* 选择方式 */}
                      <div className="flex items-center gap-3">
                        <span className="text-gray-600">选择方式</span>
                        <label className="inline-flex items-center gap-1.5 cursor-pointer text-gray-700">
                          <input
                            type="radio"
                            name={`selectType_${q.id}`}
                            checked={q.selectType === 'single' || !q.selectType}
                            onChange={() => handleUpdateQuestion(qIndex, { selectType: 'single' })}
                            className="w-3.5 h-3.5 text-[#10b981] focus:ring-[#10b981] accent-[#10b981]"
                          />
                          <span>单选</span>
                        </label>
                        <label className="inline-flex items-center gap-1.5 cursor-pointer text-gray-700">
                          <input
                            type="radio"
                            name={`selectType_${q.id}`}
                            checked={q.selectType === 'multiple'}
                            onChange={() =>
                              handleUpdateQuestion(qIndex, { selectType: 'multiple' })
                            }
                            className="w-3.5 h-3.5 text-[#10b981] focus:ring-[#10b981] accent-[#10b981]"
                          />
                          <span>多选</span>
                        </label>
                      </div>
                    </div>

                    {/* 右侧：添加新题目 / 删除题目 */}
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        onClick={handleAddQuestion}
                        className="text-[#10b981] hover:text-[#059669] hover:underline cursor-pointer font-medium"
                      >
                        添加新题目
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteQuestion(qIndex)}
                        className="text-[#f43f5e] hover:text-rose-700 hover:underline cursor-pointer font-medium"
                      >
                        删除题目
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-100" />

          {/* ================= 三、设置测评结果 (截图二 image_ace80a6b.png) ================= */}
          <div>
            <h3 className="text-sm font-bold text-gray-800 mb-6">设置测评结果</h3>

            <div className="space-y-6 max-w-3xl sm:ml-28">
              {formResultTiers.map((tier, rIndex) => (
                <div
                  key={tier.id}
                  className="border border-gray-200/90 rounded-xl p-5 bg-[#fafbfc]/60 space-y-4 shadow-[0_1px_4px_rgba(0,0,0,0.02)]"
                >
                  {/* 问卷总分: 100 分 */}
                  <div className="text-xs sm:text-sm text-gray-600 flex items-center">
                    <span>问卷总分：</span>
                    <span className="text-[#f43f5e] font-bold font-mono ml-0.5">100</span>
                    <span className="ml-1">分</span>
                  </div>

                  {/* 得分范围* */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <label className="text-xs sm:text-sm text-gray-600 sm:w-20 shrink-0">
                      得分范围<span className="text-red-500 ml-0.5">*</span>
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min={0}
                        max={100}
                        required
                        value={tier.minScore}
                        onChange={(e) =>
                          handleUpdateResultTier(rIndex, { minScore: Number(e.target.value) })
                        }
                        className="w-16 px-2.5 py-1.5 text-xs text-center border border-gray-200 rounded-lg text-gray-800 bg-white hover:border-gray-300 focus:outline-none focus:border-[#10b981] font-mono"
                      />
                      <span className="text-gray-400 font-mono">-</span>
                      <input
                        type="number"
                        min={0}
                        max={100}
                        required
                        value={tier.maxScore}
                        onChange={(e) =>
                          handleUpdateResultTier(rIndex, { maxScore: Number(e.target.value) })
                        }
                        className="w-16 px-2.5 py-1.5 text-xs text-center border border-gray-200 rounded-lg text-gray-800 bg-white hover:border-gray-300 focus:outline-none focus:border-[#10b981] font-mono"
                      />
                      <span className="text-xs text-gray-500">分</span>
                    </div>
                  </div>

                  {/* 结果说明* */}
                  <div className="flex flex-col sm:flex-row sm:items-start gap-2">
                    <label className="text-xs sm:text-sm text-gray-600 sm:w-20 pt-2 shrink-0">
                      结果说明<span className="text-red-500 ml-0.5">*</span>
                    </label>
                    <div className="flex-1">
                      <div className="border border-gray-200 rounded-lg overflow-hidden focus-within:border-[#10b981] transition-colors">
                        <EditorToolbar />
                        <textarea
                          rows={6}
                          required
                          value={tier.description}
                          onChange={(e) =>
                            handleUpdateResultTier(rIndex, { description: e.target.value })
                          }
                          placeholder="请输入该分段对应的老年健康评估判定结论、风险等级与照护建议..."
                          className="w-full p-3.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none resize-none bg-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* 结果条目底部动作按钮 */}
              <div className="flex items-center gap-4 text-xs pt-1">
                <button
                  type="button"
                  onClick={handleAddResultTier}
                  className="text-[#10b981] hover:text-[#059669] hover:underline cursor-pointer font-medium"
                >
                  添加结果条目
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteResultTier(formResultTiers.length - 1)}
                  className="text-[#f43f5e] hover:text-rose-700 hover:underline cursor-pointer font-medium"
                >
                  删除结果
                </button>
              </div>
            </div>
          </div>

          {/* 表单提交与取消按钮条 */}
          <div className="pt-6 border-t border-gray-100 flex items-center justify-end gap-3 sm:ml-28 max-w-3xl">
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className="px-6 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-600 text-sm font-medium transition-colors cursor-pointer"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-8 py-2 rounded-lg bg-[#10b981] hover:bg-[#059669] text-white text-sm font-medium shadow-sm transition-colors cursor-pointer"
            >
              保存测评
            </button>
          </div>
        </form>
      </div>
    );
  }

  // ====================== 渲染测评列表页面 (根据截图 image_6b820b5b.png) ======================
  return (
    <div className="space-y-4">
      {/* 顶部检索卡片 */}
      <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
        <div className="flex items-center">
          <span className="w-1.5 h-4.5 bg-[#10b981] rounded-full inline-block mr-2.5"></span>
          <h2 className="text-base font-bold text-gray-800 tracking-tight">测评管理</h2>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">状态</span>
            <div className="relative">
              <select
                value={searchStatus}
                onChange={(e) => setSearchStatus(e.target.value)}
                className="appearance-none w-36 sm:w-44 px-3 py-2 text-sm border border-gray-200 rounded-lg text-gray-700 bg-white hover:border-gray-300 focus:outline-none focus:border-[#10b981] cursor-pointer transition-colors pr-8"
              >
                <option value="ALL">请选择</option>
                <option value="已发布">已发布</option>
                <option value="未发布">未发布</option>
                <option value="已下架">已下架</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div className="relative flex-1 min-w-[240px] max-w-md">
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="请输入关键字"
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg text-gray-800 bg-white placeholder-gray-400 hover:border-gray-300 focus:outline-none focus:border-[#10b981] transition-colors"
            />
          </div>

          <button
            onClick={handleSearch}
            title="搜索"
            className="w-9 h-9 flex items-center justify-center bg-[#10b981] hover:bg-[#059669] text-white rounded-lg transition-colors shadow-sm cursor-pointer"
          >
            <Search className="w-4 h-4" />
          </button>

          <button
            onClick={handleReset}
            title="重置"
            className="w-9 h-9 flex items-center justify-center border border-gray-200 hover:bg-gray-50 text-gray-600 rounded-lg transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 主数据列表卡片 */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-hidden p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="text-xs text-gray-500">
            {selectedIds.length > 0 && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 font-medium">
                <Check className="w-3.5 h-3.5" />
                已选中 {selectedIds.length} 项
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 relative">
            <button
              onClick={handleOpenAddPage}
              className="px-4 py-1.5 bg-[#10b981] hover:bg-[#059669] text-white text-sm font-medium rounded-lg transition-colors shadow-sm cursor-pointer"
            >
              新增
            </button>

            <div className="relative">
              <button
                onClick={() => setShowBatchMenu(!showBatchMenu)}
                className="px-4 py-1.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-lg transition-colors cursor-pointer"
              >
                批量操作
              </button>

              {showBatchMenu && (
                <div className="absolute right-0 top-full mt-1.5 w-32 bg-white border border-gray-100 rounded-xl shadow-lg py-1.5 z-20 text-xs">
                  <button
                    onClick={handleBatchPublish}
                    className="w-full text-left px-3.5 py-2 hover:bg-gray-50 text-gray-700"
                  >
                    批量发布
                  </button>
                  <button
                    onClick={handleBatchUnpublish}
                    className="w-full text-left px-3.5 py-2 hover:bg-gray-50 text-gray-700"
                  >
                    批量下架
                  </button>
                  <button
                    onClick={handleBatchDelete}
                    className="w-full text-left px-3.5 py-2 hover:bg-rose-50 text-rose-600 font-medium"
                  >
                    批量删除
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 测评数据表格 */}
        <div className="overflow-x-auto border border-gray-100 rounded-lg">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#fafbfc] border-b border-gray-100 text-gray-600 font-medium">
              <tr>
                <th className="py-3.5 px-4 w-12 text-center">
                  <input
                    type="checkbox"
                    checked={isAllCurrentSelected}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded text-[#10b981] focus:ring-[#10b981] border-gray-300 cursor-pointer"
                  />
                </th>
                <th className="py-3.5 px-4 text-center font-normal">发布时间</th>
                <th className="py-3.5 px-4 text-center font-normal">测评标题</th>
                <th className="py-3.5 px-4 text-center font-normal">题目数量</th>
                <th className="py-3.5 px-4 text-center font-normal">总分</th>
                <th className="py-3.5 px-4 text-center font-normal">测试人数</th>
                <th className="py-3.5 px-4 text-center font-normal">测试次数</th>
                <th className="py-3.5 px-4 text-center font-normal">发布人</th>
                <th className="py-3.5 px-4 text-center font-normal">状态</th>
                <th className="py-3.5 px-4 text-center font-normal">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedList.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-12 text-center text-gray-400 text-sm">
                    暂无相匹配的测评数据
                  </td>
                </tr>
              ) : (
                paginatedList.map((item) => {
                  const isChecked = selectedIds.includes(item.id);
                  return (
                    <tr
                      key={item.id}
                      className={`hover:bg-[#fbfdfc] transition-colors ${
                        isChecked ? 'bg-emerald-50/20' : ''
                      }`}
                    >
                      <td className="py-3.5 px-4 text-center">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleSelectItem(item.id)}
                          className="w-4 h-4 rounded text-[#10b981] focus:ring-[#10b981] border-gray-300 cursor-pointer"
                        />
                      </td>
                      <td className="py-3.5 px-4 text-center font-mono text-gray-600 text-xs sm:text-sm">
                        {item.publishTime}
                      </td>
                      <td className="py-3.5 px-4 text-center font-medium text-gray-800">
                        {item.title}
                      </td>
                      <td className="py-3.5 px-4 text-center text-gray-700">
                        {item.questionCount}
                      </td>
                      <td className="py-3.5 px-4 text-center text-gray-700 font-mono">
                        {item.totalScore}
                      </td>
                      <td className="py-3.5 px-4 text-center text-gray-700 font-mono">
                        {item.participantCount}
                      </td>
                      <td className="py-3.5 px-4 text-center text-gray-700 font-mono">
                        {item.testCount}
                      </td>
                      <td className="py-3.5 px-4 text-center text-gray-700">
                        {item.publisher}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        {item.status === '已发布' ? (
                          <span className="inline-flex items-center gap-1.5 text-xs text-[#10b981] font-normal">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]"></span>
                            已发布
                          </span>
                        ) : item.status === '未发布' ? (
                          <span className="inline-flex items-center gap-1.5 text-xs text-amber-500 font-normal">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                            未发布
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-xs text-gray-400 font-normal">
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                            已下架
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <div className="flex items-center justify-center gap-3 text-xs sm:text-sm">
                          <button
                            onClick={() => handleOpenEditPage(item)}
                            className="text-[#10b981] hover:text-[#059669] hover:underline cursor-pointer font-normal"
                          >
                            编辑
                          </button>
                          <button
                            onClick={() => handleDeleteItem(item)}
                            className="text-[#f43f5e] hover:text-rose-700 hover:underline cursor-pointer font-normal"
                          >
                            删除
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* 底部翻页控制器 (每页默认显示 10 条数据) */}
        <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-600">
          <div className="flex items-center gap-3">
            <span>共 {totalItems} 条</span>
            <div className="flex items-center gap-1">
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setCurrentPage(1);
                  setJumpPageInput('1');
                }}
                className="border border-gray-200 rounded px-2 py-1 text-xs text-gray-700 bg-white hover:border-gray-300 focus:outline-none focus:border-[#10b981] cursor-pointer"
              >
                <option value={10}>10 条/页</option>
                <option value={20}>20 条/页</option>
                <option value={50}>50 条/页</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-1.5 select-none">
            <button
              onClick={() => {
                setCurrentPage(1);
                setJumpPageInput('1');
              }}
              disabled={validCurrentPage <= 1}
              className="px-2 py-1 rounded border border-gray-200 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed text-gray-600 transition-colors font-mono"
            >
              &lt;&lt;
            </button>

            <button
              onClick={() => {
                const prev = Math.max(1, validCurrentPage - 1);
                setCurrentPage(prev);
                setJumpPageInput(String(prev));
              }}
              disabled={validCurrentPage <= 1}
              className="px-2 py-1 rounded border border-gray-200 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed text-gray-600 transition-colors font-mono"
            >
              &lt;
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
              const isActive = p === validCurrentPage;
              return (
                <button
                  key={p}
                  onClick={() => {
                    setCurrentPage(p);
                    setJumpPageInput(String(p));
                  }}
                  className={`min-w-[28px] h-7 px-2 rounded text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-[#10b981] text-white'
                      : 'border border-gray-200 hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  {p}
                </button>
              );
            })}

            <button
              onClick={() => {
                const next = Math.min(totalPages, validCurrentPage + 1);
                setCurrentPage(next);
                setJumpPageInput(String(next));
              }}
              disabled={validCurrentPage >= totalPages}
              className="px-2 py-1 rounded border border-gray-200 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed text-gray-600 transition-colors font-mono"
            >
              &gt;
            </button>

            <button
              onClick={() => {
                setCurrentPage(totalPages);
                setJumpPageInput(String(totalPages));
              }}
              disabled={validCurrentPage >= totalPages}
              className="px-2 py-1 rounded border border-gray-200 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed text-gray-600 transition-colors font-mono"
            >
              &gt;&gt;
            </button>

            <form onSubmit={handleJumpPage} className="flex items-center gap-1 ml-2 text-gray-600">
              <span>前往</span>
              <input
                type="number"
                min={1}
                max={totalPages}
                value={jumpPageInput}
                onChange={(e) => setJumpPageInput(e.target.value)}
                className="w-11 h-7 text-center border border-gray-200 rounded text-xs focus:outline-none focus:border-[#10b981]"
              />
              <span>页</span>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
