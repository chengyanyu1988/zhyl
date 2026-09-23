import React, { useState, useMemo } from 'react';
import {
  Search,
  RotateCcw,
  Plus,
  X,
  Calendar,
  Image as ImageIcon,
  CheckCircle2,
  XCircle,
  Clock,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import {
  SubPageId,
  DynamicPostItem,
  TopicItem,
  BannerItem,
  ActivityItem,
  ActivityRegistrationItem,
  ActivityFieldItem,
} from '../../types';

interface OperationsManagementProps {
  subPageId: SubPageId;
  onNotice: (msg: string) => void;
}

// Initial Mock Data (All dates in 2026-09-01 .. 2026-09-19, sorted DESCENDING)
const INITIAL_DYNAMICS: DynamicPostItem[] = [
  {
    id: 'DYN_001',
    content: '今天，阳光正好，忍不住出门去公园散步，散步的过程中，我遇到了一位老友，聊得非常投缘！',
    topic: '摄影',
    likesCount: 1280,
    collectsCount: 340,
    sharesCount: 180,
    commentsCount: 24,
    publisherName: '笑看人生',
    publisherPhone: '192****4488',
    publisherAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    publishTime: '2026-09-19 16:45:10',
    status: '显示',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=160&auto=format&fit=crop&q=80',
  },
  {
    id: 'DYN_002',
    content: '参加了社区组织的手工泥塑课，做了一个特别可爱的小茶壶，感觉自己又年轻了几岁。',
    topic: '老有所乐',
    likesCount: 950,
    collectsCount: 210,
    sharesCount: 92,
    commentsCount: 18,
    publisherName: '张建国',
    publisherPhone: '138****9012',
    publisherAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    publishTime: '2026-09-18 14:20:00',
    status: '显示',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=160&auto=format&fit=crop&q=80',
  },
  {
    id: 'DYN_003',
    content: '清晨打太极拳，空气清新极了，坚持锻炼一个月后，腰腿明显舒畅了许多。',
    topic: '晨练生活',
    likesCount: 880,
    collectsCount: 156,
    sharesCount: 65,
    commentsCount: 12,
    publisherName: '秋水长天',
    publisherPhone: '159****3341',
    publisherAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
    publishTime: '2026-09-17 08:30:15',
    status: '显示',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=160&auto=format&fit=crop&q=80',
  },
  {
    id: 'DYN_004',
    content: '分享一道适合秋季滋补的百合银耳羹，软糯爽口，做法也很简单，大家可以试试。',
    topic: '健康膳食',
    likesCount: 1420,
    collectsCount: 520,
    sharesCount: 310,
    commentsCount: 45,
    publisherName: '陈阿姨厨艺',
    publisherPhone: '136****8899',
    publisherAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80',
    publishTime: '2026-09-15 18:10:00',
    status: '显示',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=160&auto=format&fit=crop&q=80',
  },
  {
    id: 'DYN_005',
    content: '今天在日照中心和大家一起看老电影《百花深处》，满满的都是青春岁月的回忆。',
    topic: '老有所乐',
    likesCount: 610,
    collectsCount: 110,
    sharesCount: 40,
    commentsCount: 9,
    publisherName: '老刘头',
    publisherPhone: '177****5521',
    publisherAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    publishTime: '2026-09-12 15:00:22',
    status: '显示',
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=160&auto=format&fit=crop&q=80',
  },
  {
    id: 'DYN_006',
    content: '学会了在智慧养老系统线上预约挂号，以后看病再也不用一大早去医院排长队啦！',
    topic: '智慧养老',
    likesCount: 730,
    collectsCount: 290,
    sharesCount: 115,
    commentsCount: 16,
    publisherName: '幸福安康',
    publisherPhone: '180****6677',
    publisherAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80',
    publishTime: '2026-09-08 10:45:00',
    status: '显示',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=160&auto=format&fit=crop&q=80',
  },
  {
    id: 'DYN_007',
    content: '迎中秋喜庆活动，社区老少同乐欢聚一堂，做月饼做灯笼，气氛其乐融融。',
    topic: '老年活动',
    likesCount: 1890,
    collectsCount: 430,
    sharesCount: 260,
    commentsCount: 38,
    publisherName: '阳光护工小李',
    publisherPhone: '135****1122',
    publisherAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
    publishTime: '2026-09-03 16:30:00',
    status: '隐藏',
    image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=160&auto=format&fit=crop&q=80',
  },
];

const INITIAL_TOPICS: TopicItem[] = [
  {
    id: 'TOPIC_001',
    topicName: '老年生活也可以很精彩',
    contentCount: 240,
    viewCount: 680000,
    shareCount: 8200,
    followCount: 450,
    lastUpdater: '李明明',
    lastUpdateTime: '2026-09-19 10:09:09',
    status: '启用',
  },
  {
    id: 'TOPIC_002',
    topicName: '桂花树下的秋季回忆',
    contentCount: 185,
    viewCount: 420000,
    shareCount: 5100,
    followCount: 320,
    lastUpdater: '王强',
    lastUpdateTime: '2026-09-18 16:30:00',
    status: '启用',
  },
  {
    id: 'TOPIC_003',
    topicName: '健康膳食养生方',
    contentCount: 312,
    viewCount: 950000,
    shareCount: 12400,
    followCount: 890,
    lastUpdater: '刘雪',
    lastUpdateTime: '2026-09-16 11:20:15',
    status: '启用',
  },
  {
    id: 'TOPIC_004',
    topicName: '社区晨练与太极文化',
    contentCount: 142,
    viewCount: 310000,
    shareCount: 3800,
    followCount: 210,
    lastUpdater: '陈管理',
    lastUpdateTime: '2026-09-14 09:15:00',
    status: '启用',
  },
  {
    id: 'TOPIC_005',
    topicName: '智能设备使用技巧',
    contentCount: 98,
    viewCount: 260000,
    shareCount: 2900,
    followCount: 175,
    lastUpdater: '李明明',
    lastUpdateTime: '2026-09-10 14:00:00',
    status: '启用',
  },
  {
    id: 'TOPIC_006',
    topicName: '含糖量低的秋季水果推荐',
    contentCount: 76,
    viewCount: 180000,
    shareCount: 1900,
    followCount: 130,
    lastUpdater: '张三峰',
    lastUpdateTime: '2026-09-05 17:40:00',
    status: '禁用',
  },
];

const INITIAL_BANNERS: BannerItem[] = [
  {
    id: 'BAN_001',
    sortOrder: 4,
    imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=320&auto=format&fit=crop&q=80',
    title: '2026年摄影比赛宣传',
    linkUrl: 'https://example.com/activity/photo2026',
    lastUpdater: '李明明',
    lastUpdateTime: '2026-09-18 10:09:09',
    status: '启用',
  },
  {
    id: 'BAN_002',
    sortOrder: 3,
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=320&auto=format&fit=crop&q=80',
    title: '秋季老年健康体检优惠月',
    linkUrl: 'https://example.com/checkup/autumn',
    lastUpdater: '王强',
    lastUpdateTime: '2026-09-16 14:30:00',
    status: '启用',
  },
  {
    id: 'BAN_003',
    sortOrder: 2,
    imageUrl: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=320&auto=format&fit=crop&q=80',
    title: '社区日照中心重阳节特别活动',
    linkUrl: 'https://example.com/activity/chongyang',
    lastUpdater: '张丽华',
    lastUpdateTime: '2026-09-12 09:10:00',
    status: '启用',
  },
  {
    id: 'BAN_004',
    sortOrder: 1,
    imageUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=320&auto=format&fit=crop&q=80',
    title: '智慧居家养老服务平台上线指南',
    linkUrl: 'https://example.com/guide/homecare',
    lastUpdater: '李明明',
    lastUpdateTime: '2026-09-04 11:25:00',
    status: '启用',
  },
];

const INITIAL_ACTIVITIES: ActivityItem[] = [
  {
    id: 'ACT_001',
    title: '桂花小区老年摄影大赛火热进行中',
    status: '进行中',
    category: '文化娱乐',
    startDate: '2026-09-10',
    endDate: '2026-09-25',
    location: '桂花小区',
    imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=200&auto=format&fit=crop&q=80',
    registrationDeadline: '2026-09-22',
    description: '欢迎广大老年摄影爱好者捕捉金秋时节的美好生活光影。作品将通过专业评委评分并颁发丰厚奖品。',
    enableRegistration: true,
    publishType: '立即发布',
    publishTime: '2026-09-09 10:00:00',
    remarks: '需要自带摄影设备',
    lastUpdater: '李明明',
    lastUpdateTime: '2026-09-18 10:09:09',
  },
  {
    id: 'ACT_002',
    title: '社区金秋健步走与健康讲座',
    status: '进行中',
    category: '体育健身',
    startDate: '2026-09-15',
    endDate: '2026-09-28',
    location: '滨江森林公园',
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=200&auto=format&fit=crop&q=80',
    registrationDeadline: '2026-09-24',
    description: '结伴同行，呼吸清新空气，听心血管专家现场解答老年秋季保健知识。',
    enableRegistration: true,
    publishType: '立即发布',
    publishTime: '2026-09-14 08:30:00',
    remarks: '免费提供饮用水与健康手册',
    lastUpdater: '张丽华',
    lastUpdateTime: '2026-09-17 15:20:00',
  },
  {
    id: 'ACT_003',
    title: '书画交流与中秋名家作品展',
    status: '已结束',
    category: '文化娱乐',
    startDate: '2026-09-02',
    endDate: '2026-09-08',
    location: '社区活动中心大厅',
    imageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=200&auto=format&fit=crop&q=80',
    registrationDeadline: '2026-09-01',
    description: '展示社区老同志现场临摹与创作的优秀书法作品，弘扬传统美德。',
    enableRegistration: false,
    publishType: '立即发布',
    publishTime: '2026-09-01 09:00:00',
    remarks: '已顺利闭幕',
    lastUpdater: '王强',
    lastUpdateTime: '2026-09-09 09:00:00',
  },
  {
    id: 'ACT_004',
    title: '智能手机应用全能培训班',
    status: '未开始',
    category: '教育培训',
    startDate: '2026-09-22',
    endDate: '2026-10-10',
    location: '日照中心多媒体教室',
    imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=200&auto=format&fit=crop&q=80',
    registrationDeadline: '2026-09-21',
    description: '一步步教授使用微信支付、网约车、网上挂号及防诈骗知识。',
    enableRegistration: true,
    publishType: '立即发布',
    publishTime: '2026-09-12 11:00:00',
    remarks: '需自备智能手机',
    lastUpdater: '李明明',
    lastUpdateTime: '2026-09-12 11:30:00',
  },
];

const INITIAL_REGISTRATIONS: ActivityRegistrationItem[] = [
  {
    id: 'REG_001',
    accountNickname: '小王',
    accountUid: 'UID:2021340001',
    accountAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    realName: '王强',
    age: 65,
    phone: '156****9900',
    photographyDuration: '2年',
    address: '徐汇区黎梅花园88栋3单元101',
    status: '待审核',
    submitTime: '2026-09-19 14:20:00',
    remarks: '热爱风光摄影',
  },
  {
    id: 'REG_002',
    accountNickname: '笑看人生',
    accountUid: 'UID:2021340002',
    accountAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    realName: '李国栋',
    age: 68,
    phone: '192****4488',
    photographyDuration: '5年',
    address: '静安区绿地新城12号202',
    status: '待审核',
    submitTime: '2026-09-18 10:09:09',
    remarks: '自带单反相机',
  },
  {
    id: 'REG_003',
    accountNickname: '秋水长天',
    accountUid: 'UID:2021340003',
    accountAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
    realName: '张美英',
    age: 62,
    phone: '138****7722',
    photographyDuration: '1年',
    address: '普陀区长寿路500号804',
    status: '审核通过',
    submitTime: '2026-09-16 16:45:00',
    remarks: '合规准入',
  },
  {
    id: 'REG_004',
    accountNickname: '老刘头',
    accountUid: 'UID:2021340004',
    accountAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    realName: '刘建业',
    age: 71,
    phone: '177****5521',
    photographyDuration: '3年',
    address: '长宁区天山路120弄',
    status: '审核通过',
    submitTime: '2026-09-14 11:30:00',
    remarks: '符合要求',
  },
  {
    id: 'REG_005',
    accountNickname: '幸福安康',
    accountUid: 'UID:2021340005',
    accountAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80',
    realName: '赵淑兰',
    age: 66,
    phone: '180****6677',
    photographyDuration: '零基础',
    address: '虹口区四川北路1880号',
    status: '审核不通过',
    submitTime: '2026-09-10 09:15:00',
    remarks: '未在服务区域内',
  },
];

const INITIAL_FIELDS: ActivityFieldItem[] = [
  {
    id: 'FLD_010',
    sortOrder: 10,
    fieldName: 'QQ号码',
    fieldType: '文本',
    isRequired: true,
    placeholder: '请输入QQ号码',
    lastUpdater: '李明明',
    lastUpdateTime: '2026-09-19 10:09:09',
    status: '启用',
  },
  {
    id: 'FLD_009',
    sortOrder: 9,
    fieldName: '退休年限',
    fieldType: '文本',
    isRequired: true,
    placeholder: '如：已退休5年',
    lastUpdater: '李明明',
    lastUpdateTime: '2026-09-18 15:20:00',
    status: '启用',
  },
  {
    id: 'FLD_008',
    sortOrder: 8,
    fieldName: '业余爱好',
    fieldType: '文本',
    isRequired: true,
    placeholder: '如：书法、太极、摄影',
    lastUpdater: '李明明',
    lastUpdateTime: '2026-09-17 11:40:00',
    status: '启用',
  },
  {
    id: 'FLD_007',
    sortOrder: 7,
    fieldName: '空闲时间',
    fieldType: '文本',
    isRequired: true,
    placeholder: '如：周一至周五上午',
    lastUpdater: '李明明',
    lastUpdateTime: '2026-09-16 09:05:00',
    status: '启用',
  },
  {
    id: 'FLD_006',
    sortOrder: 6,
    fieldName: '摄影时长',
    fieldType: '文本',
    isRequired: true,
    placeholder: '如：2年',
    lastUpdater: '李明明',
    lastUpdateTime: '2026-09-14 14:10:00',
    status: '启用',
  },
  {
    id: 'FLD_005',
    sortOrder: 5,
    fieldName: '家庭住址',
    fieldType: '文本',
    isRequired: true,
    placeholder: '请输入详细家庭住址',
    lastUpdater: '李明明',
    lastUpdateTime: '2026-09-12 16:30:00',
    status: '启用',
  },
  {
    id: 'FLD_004',
    sortOrder: 4,
    fieldName: '微信号码',
    fieldType: '文本',
    isRequired: true,
    placeholder: '请输入微信号码',
    lastUpdater: '李明明',
    lastUpdateTime: '2026-09-10 10:00:00',
    status: '启用',
  },
  {
    id: 'FLD_003',
    sortOrder: 3,
    fieldName: '手机号码',
    fieldType: '文本',
    isRequired: true,
    placeholder: '请输入手机号码',
    lastUpdater: '李明明',
    lastUpdateTime: '2026-09-08 11:15:00',
    status: '启用',
  },
  {
    id: 'FLD_002',
    sortOrder: 2,
    fieldName: '年龄',
    fieldType: '文本',
    isRequired: true,
    placeholder: '请输入年龄',
    lastUpdater: '李明明',
    lastUpdateTime: '2026-09-05 13:40:00',
    status: '启用',
  },
];

export const OperationsManagement: React.FC<OperationsManagementProps> = ({
  subPageId,
  onNotice,
}) => {
  // Global filter states
  const [keyword, setKeyword] = useState('');
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');
  const [statusFilter, setStatusFilter] = useState('全部');
  const [categoryFilter, setCategoryFilter] = useState('全部');

  // Confirmation Modal
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  }>({ isOpen: false, title: '', message: '', onConfirm: () => {} });

  // 1. Dynamics State (生活圈 - 动态管理)
  const [dynamics, setDynamics] = useState<DynamicPostItem[]>(INITIAL_DYNAMICS);
  const filteredDynamics = useMemo(() => {
    let list = [...dynamics];
    if (keyword) {
      const k = keyword.toLowerCase();
      list = list.filter(
        (d) =>
          d.content.toLowerCase().includes(k) ||
          d.topic.toLowerCase().includes(k) ||
          d.publisherName.toLowerCase().includes(k)
      );
    }
    return list.sort((a, b) => b.publishTime.localeCompare(a.publishTime));
  }, [dynamics, keyword]);

  const handleToggleDynamicStatus = (item: DynamicPostItem) => {
    const next = item.status === '显示' ? '隐藏' : '显示';
    setDynamics(dynamics.map((d) => (d.id === item.id ? { ...d, status: next } : d)));
    onNotice(`已将动态设为：${next}`);
  };

  const handleDeleteDynamic = (item: DynamicPostItem) => {
    setConfirmModal({
      isOpen: true,
      title: '删除动态',
      message: `确定要删除发布人“${item.publisherName}”的该条动态吗？`,
      onConfirm: () => {
        setDynamics(dynamics.filter((d) => d.id !== item.id));
        onNotice('动态已删除');
        setConfirmModal((prev) => ({ ...prev, isOpen: false }));
      },
    });
  };

  // 2. Topics State (生活圈 - 话题管理)
  const [topics, setTopics] = useState<TopicItem[]>(INITIAL_TOPICS);
  const [topicModal, setTopicModal] = useState<{
    isOpen: boolean;
    item: TopicItem | null;
    isCreate: boolean;
  }>({ isOpen: false, item: null, isCreate: false });
  const [topicForm, setTopicForm] = useState<{ topicName: string; status: '启用' | '禁用' }>({
    topicName: '',
    status: '启用',
  });

  const filteredTopics = useMemo(() => {
    let list = [...topics];
    if (keyword) {
      const k = keyword.toLowerCase();
      list = list.filter((t) => t.topicName.toLowerCase().includes(k));
    }
    return list.sort((a, b) => b.lastUpdateTime.localeCompare(a.lastUpdateTime));
  }, [topics, keyword]);

  const handleOpenTopicModal = (item?: TopicItem) => {
    if (item) {
      setTopicForm({ topicName: item.topicName, status: item.status });
      setTopicModal({ isOpen: true, item, isCreate: false });
    } else {
      setTopicForm({ topicName: '', status: '启用' });
      setTopicModal({ isOpen: true, item: null, isCreate: true });
    }
  };

  const handleSaveTopic = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topicForm.topicName) {
      onNotice('请输入话题名称');
      return;
    }
    if (topicModal.isCreate) {
      const newT: TopicItem = {
        id: 'TOPIC_' + Date.now(),
        topicName: topicForm.topicName,
        contentCount: 0,
        viewCount: 1,
        shareCount: 0,
        followCount: 0,
        lastUpdater: '系统管理员',
        lastUpdateTime: '2026-09-19 18:00:00',
        status: topicForm.status,
      };
      setTopics([newT, ...topics]);
      onNotice(`已新增话题“${newT.topicName}”`);
    } else if (topicModal.item) {
      setTopics(
        topics.map((t) =>
          t.id === topicModal.item!.id
            ? {
                ...t,
                topicName: topicForm.topicName,
                status: topicForm.status,
                lastUpdateTime: '2026-09-19 18:10:00',
                lastUpdater: '编辑管理员',
              }
            : t
        )
      );
      onNotice(`话题“${topicForm.topicName}”已保存修改`);
    }
    setTopicModal({ isOpen: false, item: null, isCreate: false });
  };

  const handleToggleTopicStatus = (item: TopicItem) => {
    const next = item.status === '启用' ? '禁用' : '启用';
    setTopics(topics.map((t) => (t.id === item.id ? { ...t, status: next } : t)));
    onNotice(`已将话题“${item.topicName}”设为：${next}`);
  };

  const handleDeleteTopic = (item: TopicItem) => {
    setConfirmModal({
      isOpen: true,
      title: '删除话题',
      message: `确定要删除话题“${item.topicName}”吗？`,
      onConfirm: () => {
        setTopics(topics.filter((t) => t.id !== item.id));
        onNotice('话题已删除');
        setConfirmModal((prev) => ({ ...prev, isOpen: false }));
      },
    });
  };

  // 3. Banners State (生活圈 - 轮播图管理)
  const [banners, setBanners] = useState<BannerItem[]>(INITIAL_BANNERS);
  const [bannerPageMode, setBannerPageMode] = useState<'list' | 'add' | 'edit'>('list');
  const [editingBanner, setEditingBanner] = useState<Partial<BannerItem>>({
    title: '',
    imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=320&auto=format&fit=crop&q=80',
    linkUrl: '',
    sortOrder: 8,
    status: '启用',
  });

  const filteredBanners = useMemo(() => {
    let list = [...banners];
    if (keyword) {
      const k = keyword.toLowerCase();
      list = list.filter((b) => b.title.toLowerCase().includes(k));
    }
    return list.sort((a, b) => b.lastUpdateTime.localeCompare(a.lastUpdateTime));
  }, [banners, keyword]);

  const handleSaveBanner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBanner.title) {
      onNotice('请输入轮播图标题');
      return;
    }
    if (bannerPageMode === 'add') {
      const newB: BannerItem = {
        id: 'BAN_' + Date.now(),
        sortOrder: Number(editingBanner.sortOrder) || 1,
        imageUrl: editingBanner.imageUrl || 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=320&auto=format&fit=crop&q=80',
        title: editingBanner.title,
        linkUrl: editingBanner.linkUrl || '',
        lastUpdater: '系统管理员',
        lastUpdateTime: '2026-09-19 17:30:00',
        status: (editingBanner.status as '启用' | '禁用') || '启用',
      };
      setBanners([newB, ...banners]);
      onNotice(`已成功新增轮播图“${newB.title}”`);
    } else if (editingBanner.id) {
      setBanners(
        banners.map((b) =>
          b.id === editingBanner.id
            ? {
                ...b,
                ...editingBanner,
                sortOrder: Number(editingBanner.sortOrder),
                lastUpdateTime: '2026-09-19 17:40:00',
              }
            : b
        )
      );
      onNotice(`轮播图“${editingBanner.title}”保存修改成功`);
    }
    setBannerPageMode('list');
  };

  const handleToggleBannerStatus = (item: BannerItem) => {
    const next = item.status === '启用' ? '禁用' : '启用';
    setBanners(banners.map((b) => (b.id === item.id ? { ...b, status: next } : b)));
    onNotice(`已将轮播图设为：${next}`);
  };

  const handleDeleteBanner = (item: BannerItem) => {
    setConfirmModal({
      isOpen: true,
      title: '删除轮播图',
      message: `确定要删除轮播图“${item.title}”吗？`,
      onConfirm: () => {
        setBanners(banners.filter((b) => b.id !== item.id));
        onNotice('轮播图已删除');
        setConfirmModal((prev) => ({ ...prev, isOpen: false }));
      },
    });
  };

  // 4. Activity State (老年活动 - 活动管理)
  const [activities, setActivities] = useState<ActivityItem[]>(INITIAL_ACTIVITIES);
  const [activityMode, setActivityMode] = useState<'list' | 'form'>('list');
  const [activityForm, setActivityForm] = useState<Partial<ActivityItem>>({
    title: '',
    category: '文化娱乐',
    startDate: '2026-09-20',
    endDate: '2026-09-30',
    location: '',
    imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=200&auto=format&fit=crop&q=80',
    registrationDeadline: '2026-09-25',
    description: '',
    enableRegistration: true,
    publishType: '立即发布',
    remarks: '',
    status: '进行中',
  });

  const filteredActivities = useMemo(() => {
    let list = [...activities];
    if (statusFilter !== '全部') {
      list = list.filter((a) => a.status === statusFilter);
    }
    if (categoryFilter !== '全部') {
      list = list.filter((a) => a.category === categoryFilter);
    }
    if (keyword) {
      const k = keyword.toLowerCase();
      list = list.filter((a) => a.title.toLowerCase().includes(k) || a.location.toLowerCase().includes(k));
    }
    return list.sort((a, b) => b.lastUpdateTime.localeCompare(a.lastUpdateTime));
  }, [activities, statusFilter, categoryFilter, keyword]);

  const handleSaveActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activityForm.title) {
      onNotice('请输入活动标题');
      return;
    }
    if (activityForm.id) {
      setActivities(
        activities.map((a) =>
          a.id === activityForm.id
            ? {
                ...a,
                ...activityForm,
                lastUpdateTime: '2026-09-19 16:50:00',
              }
            : a
        )
      );
      onNotice(`活动“${activityForm.title}”已成功修改！`);
    } else {
      const newA: ActivityItem = {
        id: 'ACT_' + Date.now(),
        title: activityForm.title,
        status: (activityForm.status as any) || '进行中',
        category: activityForm.category || '文化娱乐',
        startDate: activityForm.startDate || '2026-09-20',
        endDate: activityForm.endDate || '2026-09-30',
        location: activityForm.location || '社区中心',
        imageUrl: activityForm.imageUrl || 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=200&auto=format&fit=crop&q=80',
        registrationDeadline: activityForm.registrationDeadline || '2026-09-25',
        description: activityForm.description || '',
        enableRegistration: activityForm.enableRegistration ?? true,
        publishType: activityForm.publishType || '立即发布',
        publishTime: '2026-09-19 16:50:00',
        remarks: activityForm.remarks || '',
        lastUpdater: '系统管理员',
        lastUpdateTime: '2026-09-19 16:50:00',
      };
      setActivities([newA, ...activities]);
      onNotice(`已成功新增活动“${newA.title}”`);
    }
    setActivityMode('list');
  };

  const handleDeleteActivity = (item: ActivityItem) => {
    setConfirmModal({
      isOpen: true,
      title: '删除活动',
      message: `确定要删除活动“${item.title}”吗？`,
      onConfirm: () => {
        setActivities(activities.filter((a) => a.id !== item.id));
        onNotice('活动已删除');
        setConfirmModal((prev) => ({ ...prev, isOpen: false }));
      },
    });
  };

  // 5. Activity Registrations State (老年活动 - 报名信息管理)
  const [registrations, setRegistrations] = useState<ActivityRegistrationItem[]>(INITIAL_REGISTRATIONS);
  const [reviewModal, setReviewModal] = useState<{
    isOpen: boolean;
    item: ActivityRegistrationItem | null;
  }>({ isOpen: false, item: null });
  const [reviewForm, setReviewForm] = useState<Partial<ActivityRegistrationItem>>({});

  const filteredRegistrations = useMemo(() => {
    let list = [...registrations];
    if (statusFilter !== '全部') {
      list = list.filter((r) => r.status === statusFilter);
    }
    if (keyword) {
      const k = keyword.toLowerCase();
      list = list.filter(
        (r) =>
          r.realName.toLowerCase().includes(k) ||
          r.phone.includes(k) ||
          r.accountNickname.toLowerCase().includes(k)
      );
    }
    return list.sort((a, b) => b.submitTime.localeCompare(a.submitTime));
  }, [registrations, statusFilter, keyword]);

  const handleOpenReviewModal = (item: ActivityRegistrationItem) => {
    setReviewForm({ ...item });
    setReviewModal({ isOpen: true, item });
  };

  const handleAuditRegistration = (approved: boolean) => {
    if (!reviewModal.item) return;
    const targetStatus = approved ? '审核通过' : '审核不通过';
    setRegistrations(
      registrations.map((r) =>
        r.id === reviewModal.item!.id
          ? {
              ...r,
              ...reviewForm,
              status: targetStatus,
              submitTime: '2026-09-19 17:00:00',
            }
          : r
      )
    );
    onNotice(`已将“${reviewModal.item.realName}”的报名设为：${targetStatus}`);
    setReviewModal({ isOpen: false, item: null });
  };

  const handleDeleteRegistration = (item: ActivityRegistrationItem) => {
    setConfirmModal({
      isOpen: true,
      title: '删除报名记录',
      message: `确定要删除“${item.realName}”的报名记录吗？`,
      onConfirm: () => {
        setRegistrations(registrations.filter((r) => r.id !== item.id));
        onNotice('报名记录已删除');
        setConfirmModal((prev) => ({ ...prev, isOpen: false }));
      },
    });
  };

  // 6. Activity Fields State (老年活动 - 字段管理)
  const [fields, setFields] = useState<ActivityFieldItem[]>(INITIAL_FIELDS);
  const [fieldModal, setFieldModal] = useState<{
    isOpen: boolean;
    item: ActivityFieldItem | null;
    isCreate: boolean;
  }>({ isOpen: false, item: null, isCreate: false });
  const [fieldForm, setFieldForm] = useState<Partial<ActivityFieldItem>>({
    fieldName: '',
    fieldType: '文本',
    isRequired: true,
    placeholder: '',
    sortOrder: 8,
    status: '启用',
  });

  const filteredFields = useMemo(() => {
    let list = [...fields];
    if (keyword) {
      const k = keyword.toLowerCase();
      list = list.filter((f) => f.fieldName.toLowerCase().includes(k));
    }
    return list.sort((a, b) => b.lastUpdateTime.localeCompare(a.lastUpdateTime));
  }, [fields, keyword]);

  const handleOpenFieldModal = (item?: ActivityFieldItem) => {
    if (item) {
      setFieldForm({ ...item });
      setFieldModal({ isOpen: true, item, isCreate: false });
    } else {
      setFieldForm({
        fieldName: '',
        fieldType: '文本',
        isRequired: true,
        placeholder: '',
        sortOrder: fields.length + 1,
        status: '启用',
      });
      setFieldModal({ isOpen: true, item: null, isCreate: true });
    }
  };

  const handleSaveField = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fieldForm.fieldName) {
      onNotice('请输入字段名称');
      return;
    }
    if (fieldModal.isCreate) {
      const newF: ActivityFieldItem = {
        id: 'FLD_' + Date.now(),
        sortOrder: Number(fieldForm.sortOrder) || 1,
        fieldName: fieldForm.fieldName,
        fieldType: (fieldForm.fieldType as any) || '文本',
        isRequired: fieldForm.isRequired ?? true,
        placeholder: fieldForm.placeholder || '',
        lastUpdater: '李明明',
        lastUpdateTime: '2026-09-19 17:15:00',
        status: (fieldForm.status as any) || '启用',
      };
      setFields([newF, ...fields]);
      onNotice(`已成功添加字段“${newF.fieldName}”`);
    } else if (fieldModal.item) {
      setFields(
        fields.map((f) =>
          f.id === fieldModal.item!.id
            ? {
                ...f,
                ...fieldForm,
                sortOrder: Number(fieldForm.sortOrder),
                lastUpdateTime: '2026-09-19 17:20:00',
              }
            : f
        )
      );
      onNotice(`字段“${fieldForm.fieldName}”已修改`);
    }
    setFieldModal({ isOpen: false, item: null, isCreate: false });
  };

  const handleToggleFieldStatus = (item: ActivityFieldItem) => {
    const next = item.status === '启用' ? '禁用' : '启用';
    setFields(fields.map((f) => (f.id === item.id ? { ...f, status: next } : f)));
    onNotice(`已将字段“${item.fieldName}”状态设为：${next}`);
  };

  const handleDeleteField = (item: ActivityFieldItem) => {
    setConfirmModal({
      isOpen: true,
      title: '删除字段',
      message: `确定要删除字段“${item.fieldName}”吗？`,
      onConfirm: () => {
        setFields(fields.filter((f) => f.id !== item.id));
        onNotice('字段已删除');
        setConfirmModal((prev) => ({ ...prev, isOpen: false }));
      },
    });
  };

  // Helper title renderer
  const renderHeaderTitle = (title: string) => (
    <div className="flex items-center space-x-2.5 pb-2">
      <span className="w-1 h-4 bg-[#10b981] rounded-full"></span>
      <h1 className="text-sm font-semibold text-gray-800">{title}</h1>
    </div>
  );

  // RENDER 1: Dynamic Posts Management (生活圈 - 动态管理)
  if (subPageId === 'ops_life_dynamics') {
    return (
      <div className="p-6 max-w-[1600px] mx-auto text-xs space-y-6">
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-4">
          {renderHeaderTitle('动态管理')}
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <div className="flex items-center space-x-2">
              <span className="text-gray-500 font-medium">发布日期</span>
              <div className="flex items-center space-x-1.5 border border-gray-200 rounded-md px-3 py-1.5 bg-white">
                <input
                  type="date"
                  value={dateStart}
                  onChange={(e) => setDateStart(e.target.value)}
                  className="focus:outline-none text-gray-700 text-xs"
                />
                <span className="text-gray-400">~</span>
                <input
                  type="date"
                  value={dateEnd}
                  onChange={(e) => setDateEnd(e.target.value)}
                  className="focus:outline-none text-gray-700 text-xs"
                />
                <Calendar className="w-3.5 h-3.5 text-gray-400" />
              </div>
            </div>

            <div className="flex items-center space-x-2 min-w-[260px]">
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="请输入关键字"
                className="flex-1 px-3 py-1.5 border border-gray-200 rounded-md text-gray-700 focus:outline-none focus:border-[#10b981]"
              />
              <button
                onClick={() => onNotice(`检索到 ${filteredDynamics.length} 条动态`)}
                className="p-2 bg-[#10b981] hover:bg-[#059669] text-white rounded-md transition-colors shrink-0"
              >
                <Search className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setKeyword('');
                  setDateStart('');
                  setDateEnd('');
                  onNotice('已重置筛选条件');
                }}
                className="p-2 border border-gray-200 hover:bg-gray-50 text-gray-500 rounded-md transition-colors shrink-0"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-hidden">
          <div className="p-4 flex items-center justify-end border-b border-gray-100">
            <button
              onClick={() => onNotice('支持勾选列表批量删除动态')}
              className="px-4 py-1.5 border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-md font-medium transition-colors"
            >
              批量操作
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 text-gray-600 bg-gray-50/50">
                  <th className="py-3.5 px-4 font-medium min-w-[240px]">内容</th>
                  <th className="py-3.5 px-4 font-medium">话题</th>
                  <th className="py-3.5 px-4 font-medium text-center">点赞</th>
                  <th className="py-3.5 px-4 font-medium text-center">收藏</th>
                  <th className="py-3.5 px-4 font-medium text-center">分享</th>
                  <th className="py-3.5 px-4 font-medium text-center">评论</th>
                  <th className="py-3.5 px-4 font-medium">发布人</th>
                  <th className="py-3.5 px-4 font-medium">发布时间</th>
                  <th className="py-3.5 px-4 font-medium text-center">状态</th>
                  <th className="py-3.5 px-4 font-medium text-center">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredDynamics.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={item.image}
                          alt="post"
                          className="w-12 h-12 rounded-lg object-cover shrink-0 border border-gray-100 shadow-xs"
                        />
                        <p className="text-gray-800 line-clamp-2 max-w-xs">{item.content}</p>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-gray-600 font-medium">#{item.topic}</td>
                    <td className="py-3.5 px-4 text-center font-mono text-gray-600">{item.likesCount}</td>
                    <td className="py-3.5 px-4 text-center font-mono text-gray-600">{item.collectsCount}</td>
                    <td className="py-3.5 px-4 text-center font-mono text-gray-600">{item.sharesCount}</td>
                    <td className="py-3.5 px-4 text-center font-mono text-[#10b981] font-semibold">
                      {item.commentsCount}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center space-x-2">
                        <img
                          src={item.publisherAvatar}
                          alt="avatar"
                          className="w-7 h-7 rounded-full object-cover shrink-0 border border-gray-100"
                        />
                        <div>
                          <div className="font-medium text-gray-800">{item.publisherName}</div>
                          <div className="text-[11px] text-gray-400 font-mono">{item.publisherPhone}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-gray-500 whitespace-nowrap">{item.publishTime}</td>
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => handleToggleDynamicStatus(item)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                          item.status === '显示' ? 'bg-[#10b981] text-white' : 'bg-gray-200 text-gray-600'
                        }`}
                      >
                        {item.status}
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <button onClick={() => handleDeleteDynamic(item)} className="text-red-500 hover:underline font-medium">
                        删除
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // RENDER 2: Topic Management (生活圈 - 话题管理)
  if (subPageId === 'ops_life_topics') {
    return (
      <div className="p-6 max-w-[1600px] mx-auto text-xs space-y-6">
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-4">
          {renderHeaderTitle('话题管理')}
          <div className="flex items-center space-x-3 max-w-md">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="请输入关键字"
              className="flex-1 px-3 py-1.5 border border-gray-200 rounded-md text-gray-700 focus:outline-none focus:border-[#10b981]"
            />
            <button
              onClick={() => onNotice(`找到 ${filteredTopics.length} 个话题`)}
              className="p-2 bg-[#10b981] hover:bg-[#059669] text-white rounded-md transition-colors shrink-0"
            >
              <Search className="w-4 h-4" />
            </button>
            <button
              onClick={() => { setKeyword(''); onNotice('已重置检索'); }}
              className="p-2 border border-gray-200 hover:bg-gray-50 text-gray-500 rounded-md transition-colors shrink-0"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-hidden">
          <div className="p-4 flex items-center justify-end space-x-3 border-b border-gray-100">
            <button
              onClick={() => handleOpenTopicModal()}
              className="px-4 py-1.5 bg-[#10b981] hover:bg-[#059669] text-white rounded-md font-medium transition-colors flex items-center space-x-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>新增</span>
            </button>
            <button
              onClick={() => onNotice('支持勾选批量修改话题状态')}
              className="px-4 py-1.5 border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-md font-medium transition-colors"
            >
              批量操作
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 text-gray-600 bg-gray-50/50">
                  <th className="py-3.5 px-4 font-medium w-12 text-center">
                    <input type="checkbox" className="accent-[#10b981]" />
                  </th>
                  <th className="py-3.5 px-4 font-medium">话题内容</th>
                  <th className="py-3.5 px-4 font-medium text-center">内容数量</th>
                  <th className="py-3.5 px-4 font-medium text-center">浏览</th>
                  <th className="py-3.5 px-4 font-medium text-center">分享</th>
                  <th className="py-3.5 px-4 font-medium text-center">关注</th>
                  <th className="py-3.5 px-4 font-medium">最后更新人</th>
                  <th className="py-3.5 px-4 font-medium">最后更新时间</th>
                  <th className="py-3.5 px-4 font-medium text-center">状态</th>
                  <th className="py-3.5 px-4 font-medium text-center">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredTopics.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="py-3.5 px-4 text-center">
                      <input type="checkbox" className="accent-[#10b981]" />
                    </td>
                    <td className="py-3.5 px-4 font-medium text-gray-800">{item.topicName}</td>
                    <td className="py-3.5 px-4 text-center font-mono text-[#10b981] font-semibold">
                      {item.contentCount}
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono text-gray-600">{item.viewCount}</td>
                    <td className="py-3.5 px-4 text-center font-mono text-gray-600">{item.shareCount}</td>
                    <td className="py-3.5 px-4 text-center font-mono text-gray-600">{item.followCount}</td>
                    <td className="py-3.5 px-4 text-gray-700">{item.lastUpdater}</td>
                    <td className="py-3.5 px-4 font-mono text-gray-500 whitespace-nowrap">{item.lastUpdateTime}</td>
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => handleToggleTopicStatus(item)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                          item.status === '启用' ? 'bg-[#10b981] text-white' : 'bg-gray-200 text-gray-600'
                        }`}
                      >
                        {item.status}
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center space-x-3">
                        <button onClick={() => handleOpenTopicModal(item)} className="text-blue-600 hover:underline font-medium">
                          编辑
                        </button>
                        <button onClick={() => handleDeleteTopic(item)} className="text-red-500 hover:underline font-medium">
                          删除
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal: 编辑话题 / 新增话题 (Screenshot 3) */}
        {topicModal.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs">
            <div className="bg-white rounded-xl w-full max-w-md overflow-hidden shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100">
                <h3 className="text-sm font-semibold text-gray-800">
                  {topicModal.isCreate ? '新增话题' : '编辑话题'}
                </h3>
                <button
                  onClick={() => setTopicModal({ isOpen: false, item: null, isCreate: false })}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveTopic} className="p-6 space-y-4 text-xs">
                <div className="flex items-center space-x-3">
                  <label className="w-20 text-right text-gray-600 font-medium shrink-0">
                    话题名称<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={topicForm.topicName}
                    onChange={(e) => setTopicForm({ ...topicForm, topicName: e.target.value })}
                    placeholder="请输入话题名称"
                    className="flex-1 px-3 py-1.5 border border-gray-200 rounded-md text-gray-800 focus:outline-none focus:border-[#10b981]"
                  />
                </div>

                <div className="flex items-center space-x-3">
                  <label className="w-20 text-right text-gray-600 font-medium shrink-0">状态</label>
                  <button
                    type="button"
                    onClick={() =>
                      setTopicForm({ ...topicForm, status: topicForm.status === '启用' ? '禁用' : '启用' })
                    }
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                      topicForm.status === '启用' ? 'bg-[#10b981] text-white' : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {topicForm.status}
                  </button>
                </div>

                <div className="pt-4 flex items-center justify-end space-x-3 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setTopicModal({ isOpen: false, item: null, isCreate: false })}
                    className="px-4 py-1.5 border border-gray-200 hover:bg-gray-50 text-gray-600 rounded-md transition-colors"
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
  }

  // RENDER 3: Banner Management (生活圈 - 轮播图管理 - Screenshots 4 & 5)
  if (subPageId === 'ops_life_banners') {
    if (bannerPageMode === 'add' || bannerPageMode === 'edit') {
      return (
        <div className="p-6 max-w-[1200px] mx-auto text-xs space-y-6">
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-6">
            {renderHeaderTitle(bannerPageMode === 'add' ? '新增轮播图' : '编辑轮播图')}

            <form onSubmit={handleSaveBanner} className="space-y-5 max-w-xl text-xs">
              <div className="flex items-center space-x-3">
                <label className="w-20 text-right text-gray-600 font-medium shrink-0">
                  标题<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={editingBanner.title || ''}
                  onChange={(e) => setEditingBanner({ ...editingBanner, title: e.target.value })}
                  placeholder="请输入标题"
                  className="flex-1 px-3 py-1.5 border border-gray-200 rounded-md text-gray-800 focus:outline-none focus:border-[#10b981]"
                />
              </div>

              <div className="flex items-start space-x-3">
                <label className="w-20 text-right text-gray-600 font-medium shrink-0 pt-2">
                  图片<span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  <div className="w-48 h-28 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center text-gray-400 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer overflow-hidden relative group">
                    {editingBanner.imageUrl ? (
                      <img src={editingBanner.imageUrl} alt="banner" className="w-full h-full object-cover" />
                    ) : (
                      <>
                        <ImageIcon className="w-6 h-6 mb-1 text-gray-300" />
                        <span>+ 上传图片</span>
                      </>
                    )}
                  </div>
                  <p className="text-gray-400 text-[11px]">支持jpg, png等格式文件上传，文件大小不超过10MB</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <label className="w-20 text-right text-gray-600 font-medium shrink-0">链接</label>
                <input
                  type="text"
                  value={editingBanner.linkUrl || ''}
                  onChange={(e) => setEditingBanner({ ...editingBanner, linkUrl: e.target.value })}
                  placeholder="请输入"
                  className="flex-1 px-3 py-1.5 border border-gray-200 rounded-md text-gray-800 focus:outline-none focus:border-[#10b981]"
                />
              </div>

              <div className="flex items-center space-x-3">
                <label className="w-20 text-right text-gray-600 font-medium shrink-0">
                  序号<span className="text-red-500">*</span>
                </label>
                <div className="space-y-1 flex-1">
                  <input
                    type="number"
                    required
                    value={editingBanner.sortOrder || 1}
                    onChange={(e) => setEditingBanner({ ...editingBanner, sortOrder: Number(e.target.value) })}
                    className="w-full px-3 py-1.5 border border-gray-200 rounded-md text-gray-800 focus:outline-none focus:border-[#10b981]"
                  />
                  <p className="text-gray-400 text-[11px]">数字越大，排序越靠前</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <label className="w-20 text-right text-gray-600 font-medium shrink-0">状态</label>
                <button
                  type="button"
                  onClick={() =>
                    setEditingBanner({
                      ...editingBanner,
                      status: editingBanner.status === '启用' ? '禁用' : '启用',
                    })
                  }
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    editingBanner.status === '启用' ? 'bg-[#10b981] text-white' : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {editingBanner.status || '启用'}
                </button>
              </div>

              <div className="pt-4 flex items-center space-x-3">
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#10b981] hover:bg-[#059669] text-white rounded-md font-medium transition-colors"
                >
                  保存
                </button>
                <button
                  type="button"
                  onClick={() => setBannerPageMode('list')}
                  className="px-6 py-2 border border-gray-200 hover:bg-gray-50 text-gray-600 rounded-md transition-colors"
                >
                  返回
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    }

    return (
      <div className="p-6 max-w-[1600px] mx-auto text-xs space-y-6">
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-4">
          {renderHeaderTitle('轮播图管理')}
          <div className="flex items-center space-x-3 max-w-md">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="请输入关键字"
              className="flex-1 px-3 py-1.5 border border-gray-200 rounded-md text-gray-700 focus:outline-none focus:border-[#10b981]"
            />
            <button
              onClick={() => onNotice(`找到 ${filteredBanners.length} 张轮播图`)}
              className="p-2 bg-[#10b981] hover:bg-[#059669] text-white rounded-md transition-colors shrink-0"
            >
              <Search className="w-4 h-4" />
            </button>
            <button
              onClick={() => { setKeyword(''); onNotice('已重置'); }}
              className="p-2 border border-gray-200 hover:bg-gray-50 text-gray-500 rounded-md transition-colors shrink-0"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-hidden">
          <div className="p-4 flex items-center justify-end space-x-3 border-b border-gray-100">
            <button
              onClick={() => {
                setEditingBanner({
                  title: '',
                  imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=320&auto=format&fit=crop&q=80',
                  linkUrl: '',
                  sortOrder: banners.length + 1,
                  status: '启用',
                });
                setBannerPageMode('add');
              }}
              className="px-4 py-1.5 bg-[#10b981] hover:bg-[#059669] text-white rounded-md font-medium transition-colors flex items-center space-x-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>新增</span>
            </button>
            <button
              onClick={() => onNotice('支持勾选批量修改轮播图')}
              className="px-4 py-1.5 border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-md font-medium transition-colors"
            >
              批量操作
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 text-gray-600 bg-gray-50/50">
                  <th className="py-3.5 px-4 font-medium w-16">序号</th>
                  <th className="py-3.5 px-4 font-medium">Banner图</th>
                  <th className="py-3.5 px-4 font-medium">标题</th>
                  <th className="py-3.5 px-4 font-medium">最后更新人</th>
                  <th className="py-3.5 px-4 font-medium">最后更新时间</th>
                  <th className="py-3.5 px-4 font-medium text-center">状态</th>
                  <th className="py-3.5 px-4 font-medium text-center">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredBanners.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="py-3.5 px-4 font-mono text-gray-500">{item.sortOrder}</td>
                    <td className="py-3.5 px-4">
                      <img
                        src={item.imageUrl}
                        alt="banner"
                        className="w-24 h-12 rounded-md object-cover border border-gray-100 shadow-xs"
                      />
                    </td>
                    <td className="py-3.5 px-4 font-medium text-gray-800">{item.title}</td>
                    <td className="py-3.5 px-4 text-gray-700">{item.lastUpdater}</td>
                    <td className="py-3.5 px-4 font-mono text-gray-500 whitespace-nowrap">{item.lastUpdateTime}</td>
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => handleToggleBannerStatus(item)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                          item.status === '启用' ? 'bg-[#10b981] text-white' : 'bg-gray-200 text-gray-600'
                        }`}
                      >
                        {item.status}
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center space-x-3">
                        <button
                          onClick={() => {
                            setEditingBanner({ ...item });
                            setBannerPageMode('edit');
                          }}
                          className="text-blue-600 hover:underline font-medium"
                        >
                          编辑
                        </button>
                        <button onClick={() => handleDeleteBanner(item)} className="text-red-500 hover:underline font-medium">
                          删除
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination bar (Screenshot 4) */}
          <div className="p-4 flex items-center justify-between border-t border-gray-100 text-gray-500 text-xs">
            <span>共 {filteredBanners.length} 条</span>
            <div className="flex items-center space-x-2">
              <span className="text-gray-400">每页10条</span>
              <div className="flex items-center space-x-1">
                <button className="px-2 py-1 border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50">
                  &lt;&lt;
                </button>
                <button className="px-2 py-1 border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50">
                  &lt;
                </button>
                <span className="px-3 py-1 bg-[#10b981] text-white rounded font-medium">1</span>
                <button className="px-2 py-1 border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50">
                  &gt;
                </button>
                <button className="px-2 py-1 border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50">
                  &gt;&gt;
                </button>
              </div>
              <span className="text-gray-400">前往第 1 页</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // RENDER 4: Activity Management (老年活动 - 活动管理 - Screenshots 6, 7, 8)
  if (subPageId === 'ops_activity_list') {
    if (activityMode === 'form') {
      return (
        <div className="p-6 max-w-[1400px] mx-auto text-xs space-y-6">
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-6">
            {renderHeaderTitle(activityForm.id ? '编辑活动' : '新增活动')}

            <form onSubmit={handleSaveActivity} className="space-y-5 text-xs max-w-4xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-gray-700 font-medium">
                    活动标题<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={activityForm.title || ''}
                    onChange={(e) => setActivityForm({ ...activityForm, title: e.target.value })}
                    placeholder="请输入活动标题"
                    className="w-full px-3 py-1.5 border border-gray-200 rounded-md text-gray-800 focus:outline-none focus:border-[#10b981]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-gray-700 font-medium">
                    分类<span className="text-red-500">*</span>
                  </label>
                  <select
                    value={activityForm.category || '文化娱乐'}
                    onChange={(e) => setActivityForm({ ...activityForm, category: e.target.value })}
                    className="w-full px-3 py-1.5 border border-gray-200 rounded-md text-gray-800 bg-white focus:outline-none focus:border-[#10b981]"
                  >
                    <option value="文化娱乐">文化娱乐</option>
                    <option value="体育健身">体育健身</option>
                    <option value="教育培训">教育培训</option>
                    <option value="节日关怀">节日关怀</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-gray-700 font-medium">
                  图片<span className="text-red-500">*</span>
                </label>
                <div className="w-48 h-28 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center text-gray-400 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer overflow-hidden relative group">
                  {activityForm.imageUrl ? (
                    <img src={activityForm.imageUrl} alt="activity" className="w-full h-full object-cover" />
                  ) : (
                    <>
                      <ImageIcon className="w-6 h-6 mb-1 text-gray-300" />
                      <span>+ 上传图片</span>
                    </>
                  )}
                </div>
                <p className="text-gray-400 text-[11px]">支持jpg, png等格式文件上传，文件大小不超过10MB</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-gray-700 font-medium">活动日期</label>
                  <div className="flex items-center space-x-2 border border-gray-200 rounded-md px-3 py-1.5 bg-white">
                    <input
                      type="date"
                      value={activityForm.startDate || ''}
                      onChange={(e) => setActivityForm({ ...activityForm, startDate: e.target.value })}
                      className="focus:outline-none text-gray-700 text-xs flex-1"
                    />
                    <span className="text-gray-400">~</span>
                    <input
                      type="date"
                      value={activityForm.endDate || ''}
                      onChange={(e) => setActivityForm({ ...activityForm, endDate: e.target.value })}
                      className="focus:outline-none text-gray-700 text-xs flex-1"
                    />
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-gray-700 font-medium">活动地点</label>
                  <input
                    type="text"
                    value={activityForm.location || ''}
                    onChange={(e) => setActivityForm({ ...activityForm, location: e.target.value })}
                    placeholder="请输入"
                    className="w-full px-3 py-1.5 border border-gray-200 rounded-md text-gray-800 focus:outline-none focus:border-[#10b981]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-gray-700 font-medium">报名截止日期</label>
                <div className="flex items-center space-x-2 border border-gray-200 rounded-md px-3 py-1.5 bg-white max-w-xs">
                  <input
                    type="date"
                    value={activityForm.registrationDeadline || ''}
                    onChange={(e) => setActivityForm({ ...activityForm, registrationDeadline: e.target.value })}
                    className="focus:outline-none text-gray-700 text-xs flex-1"
                  />
                  <Calendar className="w-3.5 h-3.5 text-gray-400" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-gray-700 font-medium">活动详情</label>
                <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
                  <div className="p-2 bg-gray-50 border-b border-gray-200 flex items-center space-x-3 text-gray-600 font-bold">
                    <span>H</span>
                    <span>B</span>
                    <span>T</span>
                    <span>I</span>
                    <span>U</span>
                    <span>S</span>
                    <span>A</span>
                  </div>
                  <textarea
                    rows={6}
                    value={activityForm.description || ''}
                    onChange={(e) => setActivityForm({ ...activityForm, description: e.target.value })}
                    placeholder="请输入活动详情说明..."
                    className="w-full p-3 text-gray-800 focus:outline-none text-xs"
                  ></textarea>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-center space-x-3">
                  <span className="text-gray-700 font-medium">报名信息填写</span>
                  <button
                    type="button"
                    onClick={() =>
                      setActivityForm({ ...activityForm, enableRegistration: !activityForm.enableRegistration })
                    }
                    className={`w-10 h-5 flex items-center rounded-full p-0.5 transition-colors ${
                      activityForm.enableRegistration ? 'bg-[#10b981]' : 'bg-gray-200'
                    }`}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                        activityForm.enableRegistration ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    ></div>
                  </button>
                  {activityForm.enableRegistration && (
                    <span
                      onClick={() => onNotice('支持动态配置自定义报名收集字段')}
                      className="text-[#10b981] hover:underline cursor-pointer font-medium ml-2"
                    >
                      + 字段管理
                    </span>
                  )}
                </div>

                <div className="flex items-center space-x-6 pt-1">
                  <span className="text-gray-700 font-medium">发布时间</span>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="pubType"
                      checked={activityForm.publishType === '立即发布'}
                      onChange={() => setActivityForm({ ...activityForm, publishType: '立即发布' })}
                      className="accent-[#10b981]"
                    />
                    <span>立即发布</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="pubType"
                      checked={activityForm.publishType === '定时发布'}
                      onChange={() => setActivityForm({ ...activityForm, publishType: '定时发布' })}
                      className="accent-[#10b981]"
                    />
                    <span>定时发布</span>
                  </label>
                </div>

                <div className="space-y-1.5 pt-1">
                  <label className="text-gray-700 font-medium">备注</label>
                  <input
                    type="text"
                    value={activityForm.remarks || ''}
                    onChange={(e) => setActivityForm({ ...activityForm, remarks: e.target.value })}
                    placeholder="请输入备注"
                    className="w-full px-3 py-1.5 border border-gray-200 rounded-md text-gray-800 focus:outline-none focus:border-[#10b981]"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center space-x-3">
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#10b981] hover:bg-[#059669] text-white rounded-md font-medium transition-colors"
                >
                  保存
                </button>
                <button
                  type="button"
                  onClick={() => setActivityMode('list')}
                  className="px-6 py-2 border border-gray-200 hover:bg-gray-50 text-gray-600 rounded-md transition-colors"
                >
                  返回
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    }

    return (
      <div className="p-6 max-w-[1600px] mx-auto text-xs space-y-6">
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-4">
          {renderHeaderTitle('活动管理')}

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2">
              <span className="text-gray-500 font-medium">状态</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-1.5 border border-gray-200 rounded-md text-gray-700 bg-white focus:outline-none focus:border-[#10b981]"
              >
                <option value="全部">请选择</option>
                <option value="进行中">进行中</option>
                <option value="未开始">未开始</option>
                <option value="已结束">已结束</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-gray-500 font-medium">分类</span>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-1.5 border border-gray-200 rounded-md text-gray-700 bg-white focus:outline-none focus:border-[#10b981]"
              >
                <option value="全部">请选择</option>
                <option value="文化娱乐">文化娱乐</option>
                <option value="体育健身">体育健身</option>
                <option value="教育培训">教育培训</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-gray-500 font-medium">更新日期</span>
              <div className="flex items-center space-x-1.5 border border-gray-200 rounded-md px-3 py-1.5 bg-white">
                <input
                  type="date"
                  value={dateStart}
                  onChange={(e) => setDateStart(e.target.value)}
                  className="focus:outline-none text-gray-700 text-xs"
                />
                <span className="text-gray-400">~</span>
                <input
                  type="date"
                  value={dateEnd}
                  onChange={(e) => setDateEnd(e.target.value)}
                  className="focus:outline-none text-gray-700 text-xs"
                />
                <Calendar className="w-3.5 h-3.5 text-gray-400" />
              </div>
            </div>

            <div className="flex items-center space-x-2 flex-1 max-w-sm">
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="请输入关键字"
                className="flex-1 px-3 py-1.5 border border-gray-200 rounded-md text-gray-700 focus:outline-none focus:border-[#10b981]"
              />
              <button
                onClick={() => onNotice(`找到 ${filteredActivities.length} 个活动`)}
                className="p-2 bg-[#10b981] hover:bg-[#059669] text-white rounded-md transition-colors shrink-0"
              >
                <Search className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setKeyword('');
                  setStatusFilter('全部');
                  setCategoryFilter('全部');
                  onNotice('已重置');
                }}
                className="p-2 border border-gray-200 hover:bg-gray-50 text-gray-500 rounded-md transition-colors shrink-0"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-hidden">
          <div className="p-4 flex items-center justify-end space-x-3 border-b border-gray-100">
            <button
              onClick={() => {
                setActivityForm({
                  title: '',
                  category: '文化娱乐',
                  startDate: '2026-09-20',
                  endDate: '2026-09-30',
                  location: '社区中心',
                  imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=200&auto=format&fit=crop&q=80',
                  registrationDeadline: '2026-09-25',
                  description: '',
                  enableRegistration: true,
                  publishType: '立即发布',
                  status: '进行中',
                });
                setActivityMode('form');
              }}
              className="px-4 py-1.5 bg-[#10b981] hover:bg-[#059669] text-white rounded-md font-medium transition-colors flex items-center space-x-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>新增</span>
            </button>
            <button
              onClick={() => onNotice('支持勾选批量修改活动')}
              className="px-4 py-1.5 border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-md font-medium transition-colors"
            >
              批量操作
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 text-gray-600 bg-gray-50/50">
                  <th className="py-3.5 px-4 font-medium min-w-[220px]">活动信息</th>
                  <th className="py-3.5 px-4 font-medium text-center">活动状态</th>
                  <th className="py-3.5 px-4 font-medium">分类</th>
                  <th className="py-3.5 px-4 font-medium text-center">活动时间</th>
                  <th className="py-3.5 px-4 font-medium">活动地点</th>
                  <th className="py-3.5 px-4 font-medium">最后更新人</th>
                  <th className="py-3.5 px-4 font-medium">最后更新时间</th>
                  <th className="py-3.5 px-4 font-medium text-center">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredActivities.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={item.imageUrl}
                          alt="act"
                          className="w-12 h-12 rounded-lg object-cover shrink-0 border border-gray-100 shadow-xs"
                        />
                        <span className="font-medium text-gray-800 line-clamp-2">{item.title}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="inline-flex items-center space-x-1.5 font-medium text-[#10b981]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]"></span>
                        <span>{item.status}</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-gray-600">{item.category}</td>
                    <td className="py-3.5 px-4 text-center font-mono text-gray-500 whitespace-nowrap">
                      {item.startDate} <br /> ~ {item.endDate}
                    </td>
                    <td className="py-3.5 px-4 text-gray-700">{item.location}</td>
                    <td className="py-3.5 px-4 text-gray-700">{item.lastUpdater}</td>
                    <td className="py-3.5 px-4 font-mono text-gray-500 whitespace-nowrap">{item.lastUpdateTime}</td>
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center space-x-3">
                        <button
                          onClick={() => onNotice(`正在查看“${item.title}”的报名详情`)}
                          className="text-[#10b981] hover:underline font-medium"
                        >
                          报名信息
                        </button>
                        <button
                          onClick={() => {
                            setActivityForm({ ...item });
                            setActivityMode('form');
                          }}
                          className="text-blue-600 hover:underline font-medium"
                        >
                          编辑
                        </button>
                        <button onClick={() => handleDeleteActivity(item)} className="text-red-500 hover:underline font-medium">
                          删除
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // RENDER 5: Activity Registrations (老年活动 - 报名信息管理 - Screenshots 9, 10, 11)
  if (subPageId === 'ops_activity_registrations') {
    return (
      <div className="p-6 max-w-[1600px] mx-auto text-xs space-y-6">
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-4">
          {renderHeaderTitle('报名信息')}

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2">
              <span className="text-gray-500 font-medium">状态</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-1.5 border border-gray-200 rounded-md text-gray-700 bg-white focus:outline-none focus:border-[#10b981]"
              >
                <option value="全部">请选择</option>
                <option value="待审核">待审核</option>
                <option value="审核通过">审核通过</option>
                <option value="审核不通过">审核不通过</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-gray-500 font-medium">提交日期</span>
              <div className="flex items-center space-x-1.5 border border-gray-200 rounded-md px-3 py-1.5 bg-white">
                <input
                  type="date"
                  value={dateStart}
                  onChange={(e) => setDateStart(e.target.value)}
                  className="focus:outline-none text-gray-700 text-xs"
                />
                <span className="text-gray-400">~</span>
                <input
                  type="date"
                  value={dateEnd}
                  onChange={(e) => setDateEnd(e.target.value)}
                  className="focus:outline-none text-gray-700 text-xs"
                />
                <Calendar className="w-3.5 h-3.5 text-gray-400" />
              </div>
            </div>

            <div className="flex items-center space-x-2 flex-1 max-w-md">
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="请输入关键字"
                className="flex-1 px-3 py-1.5 border border-gray-200 rounded-md text-gray-700 focus:outline-none focus:border-[#10b981]"
              />
              <button
                onClick={() => onNotice(`查询到 ${filteredRegistrations.length} 条报名记录`)}
                className="p-2 bg-[#10b981] hover:bg-[#059669] text-white rounded-md transition-colors shrink-0"
              >
                <Search className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setKeyword('');
                  setStatusFilter('全部');
                  onNotice('已重置');
                }}
                className="p-2 border border-gray-200 hover:bg-gray-50 text-gray-500 rounded-md transition-colors shrink-0"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-hidden">
          <div className="p-4 flex items-center justify-end space-x-3 border-b border-gray-100">
            <button
              onClick={() => onNotice('支持批量勾选审核报名信息')}
              className="px-4 py-1.5 border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-md font-medium transition-colors"
            >
              批量操作
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 text-gray-600 bg-gray-50/50">
                  <th className="py-3.5 px-4 font-medium w-12 text-center">
                    <input type="checkbox" className="accent-[#10b981]" />
                  </th>
                  <th className="py-3.5 px-4 font-medium">头像/昵称</th>
                  <th className="py-3.5 px-4 font-medium">姓名</th>
                  <th className="py-3.5 px-4 font-medium text-center">年龄</th>
                  <th className="py-3.5 px-4 font-medium">手机号码</th>
                  <th className="py-3.5 px-4 font-medium text-center">摄影时长</th>
                  <th className="py-3.5 px-4 font-medium min-w-[180px]">家庭住址</th>
                  <th className="py-3.5 px-4 font-medium text-center">状态</th>
                  <th className="py-3.5 px-4 font-medium">提交时间</th>
                  <th className="py-3.5 px-4 font-medium text-center">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredRegistrations.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="py-3.5 px-4 text-center">
                      <input type="checkbox" className="accent-[#10b981]" />
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center space-x-2">
                        <img
                          src={item.accountAvatar}
                          alt="avatar"
                          className="w-8 h-8 rounded-full object-cover shrink-0 border border-gray-100"
                        />
                        <span className="font-medium text-gray-800">{item.accountNickname}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-gray-800">{item.realName}</td>
                    <td className="py-3.5 px-4 text-center font-mono text-gray-600">{item.age}</td>
                    <td className="py-3.5 px-4 font-mono text-gray-600">{item.phone}</td>
                    <td className="py-3.5 px-4 text-center text-gray-600">{item.photographyDuration}</td>
                    <td className="py-3.5 px-4 text-gray-700">{item.address}</td>
                    <td className="py-3.5 px-4 text-center">
                      <span
                        className={`inline-flex items-center space-x-1 font-medium ${
                          item.status === '待审核'
                            ? 'text-emerald-500'
                            : item.status === '审核通过'
                            ? 'text-blue-600'
                            : 'text-red-500'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            item.status === '待审核'
                              ? 'bg-emerald-500'
                              : item.status === '审核通过'
                              ? 'bg-blue-600'
                              : 'bg-red-500'
                          }`}
                        ></span>
                        <span>{item.status}</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-gray-500 whitespace-nowrap">{item.submitTime}</td>
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center space-x-3">
                        <button
                          onClick={() => handleOpenReviewModal(item)}
                          className="text-[#10b981] hover:underline font-medium"
                        >
                          审核
                        </button>
                        <button onClick={() => handleDeleteRegistration(item)} className="text-red-500 hover:underline font-medium">
                          删除
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal: 报名信息审核 (Screenshots 11) */}
        {reviewModal.isOpen && reviewModal.item && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs">
            <div className="bg-white rounded-xl w-full max-w-lg overflow-hidden shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100">
                <h3 className="text-sm font-semibold text-gray-800">报名信息审核</h3>
                <button
                  onClick={() => setReviewModal({ isOpen: false, item: null })}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 space-y-4 text-xs">
                <div className="flex items-center space-x-3">
                  <label className="w-20 text-right text-gray-500 font-medium shrink-0">账户</label>
                  <div className="flex items-center space-x-2">
                    <img
                      src={reviewModal.item.accountAvatar}
                      alt="avatar"
                      className="w-8 h-8 rounded-full object-cover shrink-0"
                    />
                    <span className="font-medium text-gray-800">{reviewModal.item.accountNickname}</span>
                    <span className="text-gray-400 font-mono">({reviewModal.item.accountUid})</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <label className="w-20 text-right text-gray-600 font-medium shrink-0">
                    姓名<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={reviewForm.realName || ''}
                    onChange={(e) => setReviewForm({ ...reviewForm, realName: e.target.value })}
                    className="flex-1 px-3 py-1.5 border border-gray-200 rounded-md text-gray-800 focus:outline-none focus:border-[#10b981]"
                  />
                </div>

                <div className="flex items-center space-x-3">
                  <label className="w-20 text-right text-gray-600 font-medium shrink-0">
                    年龄<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={reviewForm.age || 60}
                    onChange={(e) => setReviewForm({ ...reviewForm, age: Number(e.target.value) })}
                    className="flex-1 px-3 py-1.5 border border-gray-200 rounded-md text-gray-800 focus:outline-none focus:border-[#10b981]"
                  />
                </div>

                <div className="flex items-center space-x-3">
                  <label className="w-20 text-right text-gray-600 font-medium shrink-0">
                    手机号码<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={reviewForm.phone || ''}
                    onChange={(e) => setReviewForm({ ...reviewForm, phone: e.target.value })}
                    className="flex-1 px-3 py-1.5 border border-gray-200 rounded-md text-gray-800 focus:outline-none focus:border-[#10b981]"
                  />
                </div>

                <div className="flex items-center space-x-3">
                  <label className="w-20 text-right text-gray-600 font-medium shrink-0">
                    摄影时长<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={reviewForm.photographyDuration || ''}
                    onChange={(e) => setReviewForm({ ...reviewForm, photographyDuration: e.target.value })}
                    className="flex-1 px-3 py-1.5 border border-gray-200 rounded-md text-gray-800 focus:outline-none focus:border-[#10b981]"
                  />
                </div>

                <div className="flex items-center space-x-3">
                  <label className="w-20 text-right text-gray-600 font-medium shrink-0">
                    家庭住址<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={reviewForm.address || ''}
                    onChange={(e) => setReviewForm({ ...reviewForm, address: e.target.value })}
                    className="flex-1 px-3 py-1.5 border border-gray-200 rounded-md text-gray-800 focus:outline-none focus:border-[#10b981]"
                  />
                </div>

                <div className="flex items-start space-x-3">
                  <label className="w-20 text-right text-gray-500 font-medium shrink-0 pt-1.5">备注</label>
                  <textarea
                    rows={2}
                    value={reviewForm.remarks || ''}
                    onChange={(e) => setReviewForm({ ...reviewForm, remarks: e.target.value })}
                    placeholder="请输入"
                    className="flex-1 p-2 border border-gray-200 rounded-md text-gray-800 focus:outline-none focus:border-[#10b981]"
                  ></textarea>
                </div>

                <div className="pt-4 flex items-center justify-end space-x-3 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setReviewModal({ isOpen: false, item: null })}
                    className="px-4 py-1.5 border border-gray-200 hover:bg-gray-50 text-gray-600 rounded-md transition-colors"
                  >
                    取消
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAuditRegistration(true)}
                    className="px-5 py-1.5 bg-[#10b981] hover:bg-[#059669] text-white rounded-md font-medium transition-colors"
                  >
                    审核通过
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAuditRegistration(false)}
                    className="px-5 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-md font-medium transition-colors"
                  >
                    审核不通过
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // RENDER 6: Field Management (老年活动 - 字段管理 - Screenshots 12 & 13)
  return (
    <div className="p-6 max-w-[1600px] mx-auto text-xs space-y-6">
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-4">
        {renderHeaderTitle('字段管理')}
        <div className="flex items-center space-x-3 max-w-md">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="请输入关键字"
            className="flex-1 px-3 py-1.5 border border-gray-200 rounded-md text-gray-700 focus:outline-none focus:border-[#10b981]"
          />
          <button
            onClick={() => onNotice(`找到 ${filteredFields.length} 个字段`)}
            className="p-2 bg-[#10b981] hover:bg-[#059669] text-white rounded-md transition-colors shrink-0"
          >
            <Search className="w-4 h-4" />
          </button>
          <button
            onClick={() => { setKeyword(''); onNotice('已重置'); }}
            className="p-2 border border-gray-200 hover:bg-gray-50 text-gray-500 rounded-md transition-colors shrink-0"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-hidden">
        <div className="p-4 flex items-center justify-end space-x-3 border-b border-gray-100">
          <button
            onClick={() => handleOpenFieldModal()}
            className="px-4 py-1.5 bg-[#10b981] hover:bg-[#059669] text-white rounded-md font-medium transition-colors flex items-center space-x-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>新增</span>
          </button>
          <button
            onClick={() => onNotice('支持勾选批量修改字段')}
            className="px-4 py-1.5 border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-md font-medium transition-colors"
          >
            批量操作
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-gray-600 bg-gray-50/50">
                <th className="py-3.5 px-4 font-medium w-16">序号</th>
                <th className="py-3.5 px-4 font-medium">字段名称</th>
                <th className="py-3.5 px-4 font-medium">字段类型</th>
                <th className="py-3.5 px-4 font-medium text-center">是否必填</th>
                <th className="py-3.5 px-4 font-medium">最后更新人</th>
                <th className="py-3.5 px-4 font-medium">最后更新时间</th>
                <th className="py-3.5 px-4 font-medium text-center">状态</th>
                <th className="py-3.5 px-4 font-medium text-center">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredFields.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/60 transition-colors">
                  <td className="py-3.5 px-4 font-mono text-gray-500">{item.sortOrder}</td>
                  <td className="py-3.5 px-4 font-medium text-gray-800">{item.fieldName}</td>
                  <td className="py-3.5 px-4 text-gray-600">{item.fieldType}</td>
                  <td className="py-3.5 px-4 text-center">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[11px] ${
                        item.isRequired ? 'bg-red-50 text-red-500 font-medium' : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {item.isRequired ? '必填' : '非必填'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-gray-700">{item.lastUpdater}</td>
                  <td className="py-3.5 px-4 font-mono text-gray-500 whitespace-nowrap">{item.lastUpdateTime}</td>
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => handleToggleFieldStatus(item)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                        item.status === '启用' ? 'bg-[#10b981] text-white' : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {item.status}
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <div className="flex items-center justify-center space-x-3">
                      <button onClick={() => handleOpenFieldModal(item)} className="text-blue-600 hover:underline font-medium">
                        编辑
                      </button>
                      <button onClick={() => handleDeleteField(item)} className="text-red-500 hover:underline font-medium">
                        删除
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: 新增字段 / 编辑字段 (Screenshot 13) */}
      {fieldModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-xl w-full max-w-md overflow-hidden shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100">
              <h3 className="text-sm font-semibold text-gray-800">
                {fieldModal.isCreate ? '新增字段' : '编辑字段'}
              </h3>
              <button
                onClick={() => setFieldModal({ isOpen: false, item: null, isCreate: false })}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveField} className="p-6 space-y-4 text-xs">
              <div className="flex items-center space-x-3">
                <label className="w-20 text-right text-gray-600 font-medium shrink-0">
                  字段名称<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={fieldForm.fieldName || ''}
                  onChange={(e) => setFieldForm({ ...fieldForm, fieldName: e.target.value })}
                  placeholder="如：摄影时长"
                  className="flex-1 px-3 py-1.5 border border-gray-200 rounded-md text-gray-800 focus:outline-none focus:border-[#10b981]"
                />
              </div>

              <div className="flex items-center space-x-3">
                <label className="w-20 text-right text-gray-600 font-medium shrink-0">
                  是否必填<span className="text-red-500">*</span>
                </label>
                <div className="flex items-center space-x-6">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="isRequiredChoiceField"
                      checked={fieldForm.isRequired === true}
                      onChange={() => setFieldForm({ ...fieldForm, isRequired: true })}
                      className="accent-[#10b981]"
                    />
                    <span>必填</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="isRequiredChoiceField"
                      checked={fieldForm.isRequired === false}
                      onChange={() => setFieldForm({ ...fieldForm, isRequired: false })}
                      className="accent-[#10b981]"
                    />
                    <span>非必填</span>
                  </label>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <label className="w-20 text-right text-gray-600 font-medium shrink-0">
                  字段类型<span className="text-red-500">*</span>
                </label>
                <select
                  value={fieldForm.fieldType || '文本'}
                  onChange={(e) => setFieldForm({ ...fieldForm, fieldType: e.target.value as any })}
                  className="flex-1 px-3 py-1.5 border border-gray-200 rounded-md text-gray-800 bg-white focus:outline-none focus:border-[#10b981]"
                >
                  <option value="文本">文本</option>
                  <option value="数字">数字</option>
                  <option value="下拉单选">下拉单选</option>
                </select>
              </div>

              <div className="flex items-center space-x-3">
                <label className="w-20 text-right text-gray-600 font-medium shrink-0">文字提示</label>
                <input
                  type="text"
                  value={fieldForm.placeholder || ''}
                  onChange={(e) => setFieldForm({ ...fieldForm, placeholder: e.target.value })}
                  placeholder="请输入文字提示"
                  className="flex-1 px-3 py-1.5 border border-gray-200 rounded-md text-gray-800 focus:outline-none focus:border-[#10b981]"
                />
              </div>

              <div className="flex items-center space-x-3">
                <label className="w-20 text-right text-gray-600 font-medium shrink-0">
                  序号<span className="text-red-500">*</span>
                </label>
                <div className="space-y-1 flex-1">
                  <input
                    type="number"
                    required
                    value={fieldForm.sortOrder || 1}
                    onChange={(e) => setFieldForm({ ...fieldForm, sortOrder: Number(e.target.value) })}
                    className="w-full px-3 py-1.5 border border-gray-200 rounded-md text-gray-800 focus:outline-none focus:border-[#10b981]"
                  />
                  <p className="text-gray-400 text-[11px]">数字越大，排序越靠前</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <label className="w-20 text-right text-gray-600 font-medium shrink-0">状态</label>
                <button
                  type="button"
                  onClick={() =>
                    setFieldForm({
                      ...fieldForm,
                      status: fieldForm.status === '启用' ? '禁用' : '启用',
                    })
                  }
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    fieldForm.status === '启用' ? 'bg-[#10b981] text-white' : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {fieldForm.status || '启用'}
                </button>
              </div>

              <div className="pt-4 flex items-center justify-end space-x-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setFieldModal({ isOpen: false, item: null, isCreate: false })}
                  className="px-4 py-1.5 border border-gray-200 hover:bg-gray-50 text-gray-600 rounded-md transition-colors"
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

      {/* Confirmation Modal */}
      {confirmModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-xl w-full max-w-sm overflow-hidden shadow-2xl border border-gray-100 p-6 space-y-4">
            <h3 className="text-sm font-semibold text-gray-800">{confirmModal.title}</h3>
            <p className="text-gray-600 text-xs">{confirmModal.message}</p>
            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                onClick={() => setConfirmModal((prev) => ({ ...prev, isOpen: false }))}
                className="px-4 py-1.5 border border-gray-200 hover:bg-gray-50 text-gray-600 rounded-md transition-colors"
              >
                取消
              </button>
              <button
                onClick={confirmModal.onConfirm}
                className="px-4 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-md font-medium transition-colors"
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
