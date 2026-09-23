import React, { useState, useMemo } from 'react';
import {
  Search,
  RotateCcw,
  Plus,
  Edit3,
  Trash2,
  Upload,
  Lock,
  User as UserIcon,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Save,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  ListOrdered,
  Link as LinkIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Image as ImageIcon,
  Table as TableIcon,
  Video as VideoIcon,
  Code as CodeIcon,
  Undo,
  Redo,
  Smile,
  Quote,
  Heading,
  ArrowUpDown,
} from 'lucide-react';
import { SubPageId } from '../types';

interface SystemSettingsProps {
  onNotice: (msg: string) => void;
  subPage: SubPageId;
  onNavigate?: (page: SubPageId) => void;
  onConfirmDelete?: (title: string, message: string, onConfirm: () => void) => void;
}

// ------------------- MOCK DATASETS (2026-09-01 to 2026-09-19 DESCENDING) -------------------

// 1. Staff Members Data
interface StaffItem {
  id: string;
  staffNo: string;
  name: string;
  role: string;
  phone: string;
  remark: string;
  updatedBy: string;
  updatedTime: string;
  status: boolean;
  avatar?: string;
}

const INITIAL_STAFF_LIST: StaffItem[] = [
  {
    id: 's-01',
    staffNo: '2001009001',
    name: '李明明',
    role: '管理员',
    phone: '17655558888',
    remark: '系统高级超级管理员，负责全局调度与设置',
    updatedBy: '李明明',
    updatedTime: '2026-09-19 17:45:10',
    status: true,
  },
  {
    id: 's-02',
    staffNo: '2001009002',
    name: '张华',
    role: '派单员',
    phone: '13811223344',
    remark: '负责雨花台区及周边居家护理工单派发',
    updatedBy: '李明明',
    updatedTime: '2026-09-19 14:20:05',
    status: true,
  },
  {
    id: 's-03',
    staffNo: '2001009003',
    name: '王小倩',
    role: '护工主管',
    phone: '15966778899',
    remark: '负责护理人员每日体温与体征巡检督导',
    updatedBy: '王小倩',
    updatedTime: '2026-09-18 16:15:30',
    status: true,
  },
  {
    id: 's-04',
    staffNo: '2001009004',
    name: '刘建国',
    role: '财务员',
    phone: '18033445566',
    remark: '负责长者护理月度对账与医保结算审核',
    updatedBy: '李明明',
    updatedTime: '2026-09-17 11:10:45',
    status: true,
  },
  {
    id: 's-05',
    staffNo: '2001009005',
    name: '陈芳',
    role: '客服专员',
    phone: '13677889900',
    remark: '负责24小时应急呼叫热线解答与投诉处理',
    updatedBy: '王小倩',
    updatedTime: '2026-09-15 09:40:22',
    status: true,
  },
  {
    id: 's-06',
    staffNo: '2001009006',
    name: '赵雷',
    role: '维保工程师',
    phone: '17722334455',
    remark: '负责毫米波雷达及视频跌倒告警硬件调优',
    updatedBy: '李明明',
    updatedTime: '2026-09-12 15:30:00',
    status: true,
  },
  {
    id: 's-07',
    staffNo: '2001009007',
    name: '孙莉',
    role: '膳食主管',
    phone: '18944556677',
    remark: '负责养老中心糖尿病及高血压定制食谱审核',
    updatedBy: '张华',
    updatedTime: '2026-09-08 10:15:18',
    status: true,
  },
  {
    id: 's-08',
    staffNo: '2001009008',
    name: '周强',
    role: '运营主管',
    phone: '15088991122',
    remark: '负责老年大学义诊活动筹备与推广',
    updatedBy: '李明明',
    updatedTime: '2026-09-03 13:25:00',
    status: true,
  },
];

// 2. Roles Data
interface RoleItem {
  id: string;
  roleName: string;
  staffCount: number;
  remark: string;
  updatedBy: string;
  updatedTime: string;
  status: boolean;
}

const INITIAL_ROLE_LIST: RoleItem[] = [
  {
    id: 'r-01',
    roleName: '管理员',
    staffCount: 12,
    remark: '具备智慧养老管理平台全部配置与数据查看权限',
    updatedBy: '李明明',
    updatedTime: '2026-09-19 18:10:00',
    status: true,
  },
  {
    id: 'r-02',
    roleName: '派单员',
    staffCount: 80,
    remark: '负责助餐、助洁、上门理疗工单调度与派发',
    updatedBy: '李明明',
    updatedTime: '2026-09-19 15:30:22',
    status: true,
  },
  {
    id: 'r-03',
    roleName: '护工主管',
    staffCount: 24,
    remark: '负责护理人员质检抽查及紧急告警处置响应',
    updatedBy: '王小倩',
    updatedTime: '2026-09-18 10:45:15',
    status: true,
  },
  {
    id: 'r-04',
    roleName: '财务主管',
    staffCount: 6,
    remark: '负责服务款项核对、机构提现及明细统计导出',
    updatedBy: '刘建国',
    updatedTime: '2026-09-16 16:20:00',
    status: true,
  },
  {
    id: 'r-05',
    roleName: '客服专员',
    staffCount: 15,
    remark: '负责长者咨询接待、服务满意度回访及退款初审',
    updatedBy: '李明明',
    updatedTime: '2026-09-14 11:05:40',
    status: true,
  },
  {
    id: 'r-06',
    roleName: '维保工程师',
    staffCount: 8,
    remark: '负责摄像头接入、智能床垫及安防感应设备维护',
    updatedBy: '赵雷',
    updatedTime: '2026-09-11 09:15:30',
    status: true,
  },
  {
    id: 'r-07',
    roleName: '运营专员',
    staffCount: 18,
    remark: '负责活动信息发布、优惠卷规则及积分商城上架',
    updatedBy: '周强',
    updatedTime: '2026-09-06 14:00:10',
    status: true,
  },
];

// 3. Drug Units Data
interface DrugUnitItem {
  id: string;
  seq: number;
  unitName: string;
  relatedCount: number;
  updatedBy: string;
  updatedTime: string;
  status: boolean;
}

const INITIAL_DRUG_UNITS: DrugUnitItem[] = [
  { id: 'u-08', seq: 8, unitName: '片', relatedCount: 120, updatedBy: '李明明', updatedTime: '2026-09-19 16:50:00', status: true },
  { id: 'u-07', seq: 7, unitName: '颗', relatedCount: 98, updatedBy: '李明明', updatedTime: '2026-09-18 14:30:12', status: true },
  { id: 'u-06', seq: 6, unitName: '瓶', relatedCount: 85, updatedBy: '李明明', updatedTime: '2026-09-17 10:15:00', status: true },
  { id: 'u-05', seq: 5, unitName: '包', relatedCount: 76, updatedBy: '李明明', updatedTime: '2026-09-16 16:00:25', status: true },
  { id: 'u-04', seq: 4, unitName: '盒', relatedCount: 150, updatedBy: '李明明', updatedTime: '2026-09-14 11:20:10', status: true },
  { id: 'u-03', seq: 3, unitName: '粒', relatedCount: 64, updatedBy: '李明明', updatedTime: '2026-09-12 09:45:00', status: true },
  { id: 'u-02', seq: 2, unitName: '支', relatedCount: 42, updatedBy: '李明明', updatedTime: '2026-09-08 15:10:30', status: true },
  { id: 'u-01', seq: 1, unitName: '枚', relatedCount: 30, updatedBy: '李明明', updatedTime: '2026-09-02 13:00:00', status: true },
];

// 4. Operation Logs Data (2026-09-19 to 2026-09-01 DESCENDING)
interface OpLogItem {
  id: string;
  time: string;
  operator: string;
  staffNo: string;
  ip: string;
  module: string;
  detail: string;
}

const INITIAL_OP_LOGS: OpLogItem[] = [
  {
    id: 'log-01',
    time: '2026-09-19 18:40:22',
    operator: '王小倩',
    staffNo: '2024340089',
    ip: '172.19.30.2',
    module: '用户/全部用户',
    detail: '新增员工信息 [员工姓名: 李明明, 编号: 4001009001]',
  },
  {
    id: 'log-02',
    time: '2026-09-19 16:12:05',
    operator: '李明明',
    staffNo: '2024340090',
    ip: '172.19.30.5',
    module: '订单/售后管理',
    detail: '审核同意售后退款申请 [售后单号: TK20260919001, 退款金额: ¥180.00]',
  },
  {
    id: 'log-03',
    time: '2026-09-19 10:25:30',
    operator: '张华',
    staffNo: '2024340091',
    ip: '172.19.30.12',
    module: '系统/角色管理',
    detail: '修改 [派单员] 角色权限，新增关怀服务工单改派权限',
  },
  {
    id: 'log-04',
    time: '2026-09-18 15:30:10',
    operator: '刘建国',
    staffNo: '2024340092',
    ip: '172.19.30.8',
    module: '系统/药品单位',
    detail: '新增药品计价包装单位 [单位名称: 贴, 排序序号: 9]',
  },
  {
    id: 'log-05',
    time: '2026-09-18 09:15:00',
    operator: '陈芳',
    staffNo: '2024340093',
    ip: '172.19.30.16',
    module: '关怀/服务工单',
    detail: '指派上门护理工单 #WO2026091802 至服务护理人员李强',
  },
  {
    id: 'log-06',
    time: '2026-09-17 14:05:40',
    operator: '赵雷',
    staffNo: '2024340094',
    ip: '172.19.30.22',
    module: '系统/协议管理',
    detail: '更新 [用户端隐私政策] 中智慧健康监测传感器数据采集条款',
  },
  {
    id: 'log-07',
    time: '2026-09-16 11:20:15',
    operator: '孙莉',
    staffNo: '2024340095',
    ip: '172.19.30.31',
    module: '系统/员工管理',
    detail: '重置员工 [张华 - 2001009002] 登录初始密码',
  },
  {
    id: 'log-08',
    time: '2026-09-15 16:00:00',
    operator: '周强',
    staffNo: '2024340096',
    ip: '172.19.30.10',
    module: '数据/交易分析',
    detail: '导出2026年8月智慧养老服务平台综合交易与退款对账月报',
  },
  {
    id: 'log-09',
    time: '2026-09-12 10:40:22',
    operator: '王小倩',
    staffNo: '2024340089',
    ip: '172.19.30.2',
    module: '用户/标签管理',
    detail: '创建长者健康分类标签 [失能特护, 高血压高危人群]',
  },
  {
    id: 'log-10',
    time: '2026-09-05 08:50:10',
    operator: '李明明',
    staffNo: '2024340090',
    ip: '172.19.30.5',
    module: '系统/个人资料',
    detail: '更新个人主账号绑定手机号码为 [17615904456]',
  },
];

export const SystemSettings: React.FC<SystemSettingsProps> = ({
  onNotice,
  subPage,
  onNavigate,
  onConfirmDelete,
}) => {
  // Common states
  const [staffList, setStaffList] = useState<StaffItem[]>(INITIAL_STAFF_LIST);
  const [roleList, setRoleList] = useState<RoleItem[]>(INITIAL_ROLE_LIST);
  const [drugUnits, setDrugUnits] = useState<DrugUnitItem[]>(INITIAL_DRUG_UNITS);
  const [opLogs] = useState<OpLogItem[]>(INITIAL_OP_LOGS);

  // Filters
  const [staffRoleFilter, setStaffRoleFilter] = useState('请选择');
  const [staffDateStart, setStaffDateStart] = useState('');
  const [staffDateEnd, setStaffDateEnd] = useState('');
  const [staffKeyword, setStaffKeyword] = useState('');

  const [roleDateStart, setRoleDateStart] = useState('');
  const [roleDateEnd, setRoleDateEnd] = useState('');
  const [roleKeyword, setRoleKeyword] = useState('');

  const [drugKeyword, setDrugKeyword] = useState('');

  const [logDateStart, setLogDateStart] = useState('');
  const [logDateEnd, setLogDateEnd] = useState('');
  const [logKeyword, setLogKeyword] = useState('');

  // Form / Editing States
  const [editingStaff, setEditingStaff] = useState<StaffItem | null>(null);
  const [staffFormData, setStaffFormData] = useState({
    name: '李明明',
    staffNo: '4001009001',
    phone: '17615904456',
    role: '派单员',
    password: '',
    status: true,
    remark: '',
  });

  const [editingRole, setEditingRole] = useState<RoleItem | null>(null);
  const [roleFormData, setRoleFormData] = useState({
    roleName: '',
    remark: '',
    status: true,
    permissions: {
      all: false,
      user: { all: false, view: true, detail: true, add: false, del: false, tag: false },
      order: { all: false, afterSales: true, reviews: true },
      care: { orders: true, plans: false },
      video: { monitor: true, alarm: true },
      system: { staff: true, role: true, drug: true, protocol: true, log: true, profile: true },
    },
  });

  // Drug Unit Modal State
  const [isDrugModalOpen, setIsDrugModalOpen] = useState(false);
  const [editingDrugUnit, setEditingDrugUnit] = useState<DrugUnitItem | null>(null);
  const [drugFormData, setDrugFormData] = useState({
    unitName: '片',
    seq: 8,
    status: true,
  });

  // Protocol Tabs State
  const [protocolTab, setProtocolTab] = useState<'user' | 'server'>('user');
  const [userProtocolContent, setUserProtocolContent] = useState(
    `本《用户端隐私政策》旨在告知您阳光智慧养老服务平台（以下简称“本平台”）如何收集、使用、存储及保护您及受看护长者的个人隐私与健康数据。\n\n一、我们收集的信息范围\n1. 基础身份信息：包括长者及紧急联系人的姓名、身份证号、联系电话、居住地址；\n2. 健康看护数据：包括体温、心率、睡眠质量、跌倒告警记录及智慧设备上传的实时姿态监测数据；\n\n二、信息的安全保障\n本平台使用加密算法对长者健康隐私数据进行高强度加密保存，严格控制访问权限。`
  );
  const [serverProtocolContent, setServerProtocolContent] = useState(
    `本《服务端隐私政策》规范管理护理服务人员、派单专员及第三方医疗机构员工在履职过程中的数据访问边界与操作合规要求。\n\n一、服务人员行为规范\n1. 所有服务员工仅在获得工单授权后，方可调取被看护长者的必要联系方式与健康备注；\n2. 严禁任何私自下载、传播长者个人身份与住址信息的行为，违者将依法追究责任。`
  );

  // Profile State
  const [profileData, setProfileData] = useState({
    name: '李明明',
    staffNo: '4001009001',
    phone: '17615904456',
    role: '派单员',
    remark: '',
  });

  // Reset Password State
  const [pwdData, setPwdData] = useState({
    oldPwd: '',
    newPwd: '',
    confirmPwd: '',
  });

  // -------------- Handlers --------------
  const handleOpenAddStaff = () => {
    setEditingStaff(null);
    setStaffFormData({
      name: '',
      staffNo: `400100${Math.floor(1000 + Math.random() * 9000)}`,
      phone: '',
      role: '派单员',
      password: '',
      status: true,
      remark: '',
    });
    if (onNavigate) onNavigate('sys_staff_form');
  };

  const handleEditStaff = (item: StaffItem) => {
    setEditingStaff(item);
    setStaffFormData({
      name: item.name,
      staffNo: item.staffNo,
      phone: item.phone,
      role: item.role,
      password: '******',
      status: item.status,
      remark: item.remark || '',
    });
    if (onNavigate) onNavigate('sys_staff_form');
  };

  const handleSaveStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!staffFormData.name || !staffFormData.phone) {
      onNotice('请填写姓名和手机号码！');
      return;
    }
    if (editingStaff) {
      setStaffList((prev) =>
        prev.map((s) =>
          s.id === editingStaff.id
            ? {
                ...s,
                name: staffFormData.name,
                phone: staffFormData.phone,
                role: staffFormData.role,
                status: staffFormData.status,
                remark: staffFormData.remark,
                updatedTime: '2026-09-19 18:30:00',
              }
            : s
        )
      );
      onNotice('员工信息已成功修改！');
    } else {
      const newItem: StaffItem = {
        id: `s-${Date.now()}`,
        staffNo: staffFormData.staffNo,
        name: staffFormData.name,
        role: staffFormData.role,
        phone: staffFormData.phone,
        remark: staffFormData.remark || '新入职服务员工',
        updatedBy: '李明明',
        updatedTime: '2026-09-19 18:35:00',
        status: staffFormData.status,
      };
      setStaffList((prev) => [newItem, ...prev]);
      onNotice('新增员工保存成功！');
    }
    if (onNavigate) onNavigate('sys_staff');
  };

  const handleDeleteStaff = (item: StaffItem) => {
    if (onConfirmDelete) {
      onConfirmDelete('确认删除员工', `确认要删除员工“${item.name} (${item.staffNo})”吗？此操作无法撤销。`, () => {
        setStaffList((prev) => prev.filter((s) => s.id !== item.id));
        onNotice(`员工 ${item.name} 已被成功删除。`);
      });
    } else {
      setStaffList((prev) => prev.filter((s) => s.id !== item.id));
      onNotice(`员工 ${item.name} 已被删除。`);
    }
  };

  const handleToggleStaffStatus = (id: string) => {
    setStaffList((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          const next = !s.status;
          onNotice(`员工 [${s.name}] 账号状态已切换为: ${next ? '启用' : '禁用'}`);
          return { ...s, status: next };
        }
        return s;
      })
    );
  };

  // Role Handlers
  const handleOpenAddRole = () => {
    setEditingRole(null);
    setRoleFormData({
      roleName: '',
      remark: '',
      status: true,
      permissions: {
        all: false,
        user: { all: false, view: true, detail: true, add: false, del: false, tag: false },
        order: { all: false, afterSales: true, reviews: true },
        care: { orders: true, plans: false },
        video: { monitor: true, alarm: true },
        system: { staff: true, role: true, drug: true, protocol: true, log: true, profile: true },
      },
    });
    if (onNavigate) onNavigate('sys_role_form');
  };

  const handleEditRole = (item: RoleItem) => {
    setEditingRole(item);
    setRoleFormData((prev) => ({
      ...prev,
      roleName: item.roleName,
      remark: item.remark,
      status: item.status,
    }));
    if (onNavigate) onNavigate('sys_role_form');
  };

  const handleSaveRole = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roleFormData.roleName) {
      onNotice('请输入角色名称！');
      return;
    }
    if (editingRole) {
      setRoleList((prev) =>
        prev.map((r) =>
          r.id === editingRole.id
            ? {
                ...r,
                roleName: roleFormData.roleName,
                remark: roleFormData.remark,
                status: roleFormData.status,
                updatedTime: '2026-09-19 18:25:00',
              }
            : r
        )
      );
      onNotice('角色配置修改保存成功！');
    } else {
      const newRole: RoleItem = {
        id: `r-${Date.now()}`,
        roleName: roleFormData.roleName,
        staffCount: 0,
        remark: roleFormData.remark || '自定义角色权限方案',
        updatedBy: '李明明',
        updatedTime: '2026-09-19 18:28:00',
        status: roleFormData.status,
      };
      setRoleList((prev) => [newRole, ...prev]);
      onNotice('新增角色成功！');
    }
    if (onNavigate) onNavigate('sys_roles');
  };

  const handleDeleteRole = (item: RoleItem) => {
    if (onConfirmDelete) {
      onConfirmDelete('确认删除角色', `确定要删除角色“${item.roleName}”吗？关联的 ${item.staffCount} 名员工权限将受影响。`, () => {
        setRoleList((prev) => prev.filter((r) => r.id !== item.id));
        onNotice(`角色 ${item.roleName} 已成功删除。`);
      });
    } else {
      setRoleList((prev) => prev.filter((r) => r.id !== item.id));
      onNotice(`角色 ${item.roleName} 已删除。`);
    }
  };

  // Drug Unit Handlers
  const handleOpenAddDrugModal = () => {
    setEditingDrugUnit(null);
    setDrugFormData({
      unitName: '',
      seq: (drugUnits.length > 0 ? Math.max(...drugUnits.map((d) => d.seq)) : 0) + 1,
      status: true,
    });
    setIsDrugModalOpen(true);
  };

  const handleOpenEditDrugModal = (item: DrugUnitItem) => {
    setEditingDrugUnit(item);
    setDrugFormData({
      unitName: item.unitName,
      seq: item.seq,
      status: item.status,
    });
    setIsDrugModalOpen(true);
  };

  const handleSaveDrugModal = () => {
    if (!drugFormData.unitName.trim()) {
      onNotice('请输入单位名称！');
      return;
    }
    if (editingDrugUnit) {
      setDrugUnits((prev) =>
        prev.map((d) =>
          d.id === editingDrugUnit.id
            ? {
                ...d,
                unitName: drugFormData.unitName,
                seq: Number(drugFormData.seq),
                status: drugFormData.status,
                updatedTime: '2026-09-19 17:50:00',
              }
            : d
        )
      );
      onNotice('药品单位更新成功！');
    } else {
      const newUnit: DrugUnitItem = {
        id: `u-${Date.now()}`,
        seq: Number(drugFormData.seq),
        unitName: drugFormData.unitName,
        relatedCount: 0,
        updatedBy: '李明明',
        updatedTime: '2026-09-19 17:52:00',
        status: drugFormData.status,
      };
      setDrugUnits((prev) => [newUnit, ...prev]);
      onNotice('新增药品单位保存成功！');
    }
    setIsDrugModalOpen(false);
  };

  const handleDeleteDrugUnit = (item: DrugUnitItem) => {
    if (onConfirmDelete) {
      onConfirmDelete('确认删除单位', `确认删除药品单位“${item.unitName}”吗？`, () => {
        setDrugUnits((prev) => prev.filter((d) => d.id !== item.id));
        onNotice(`药品单位 [${item.unitName}] 已删除。`);
      });
    } else {
      setDrugUnits((prev) => prev.filter((d) => d.id !== item.id));
      onNotice(`药品单位 [${item.unitName}] 已删除。`);
    }
  };

  // Profile Save
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onNotice('个人资料更新成功！');
  };

  // Reset Pwd Save
  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pwdData.oldPwd || !pwdData.newPwd) {
      onNotice('请输入完整的新旧密码！');
      return;
    }
    if (pwdData.newPwd !== pwdData.confirmPwd) {
      onNotice('新密码与确认密码输入不一致，请重试！');
      return;
    }
    onNotice('密码修改成功，请牢记新密码！');
    setPwdData({ oldPwd: '', newPwd: '', confirmPwd: '' });
  };

  // -------------- FILTERED LISTS --------------
  const filteredStaff = useMemo(() => {
    return staffList.filter((s) => {
      const matchRole = staffRoleFilter === '请选择' || s.role === staffRoleFilter;
      const matchKw =
        !staffKeyword ||
        s.name.includes(staffKeyword) ||
        s.staffNo.includes(staffKeyword) ||
        s.phone.includes(staffKeyword) ||
        s.remark.includes(staffKeyword);
      return matchRole && matchKw;
    });
  }, [staffList, staffRoleFilter, staffKeyword]);

  const filteredRoles = useMemo(() => {
    return roleList.filter((r) => {
      return !roleKeyword || r.roleName.includes(roleKeyword) || r.remark.includes(roleKeyword);
    });
  }, [roleList, roleKeyword]);

  const filteredDrugUnits = useMemo(() => {
    return drugUnits.filter((d) => !drugKeyword || d.unitName.includes(drugKeyword));
  }, [drugUnits, drugKeyword]);

  const filteredOpLogs = useMemo(() => {
    return opLogs.filter((l) => {
      return (
        !logKeyword ||
        l.operator.includes(logKeyword) ||
        l.staffNo.includes(logKeyword) ||
        l.detail.includes(logKeyword) ||
        l.module.includes(logKeyword)
      );
    });
  }, [opLogs, logKeyword]);

  // -------------- RENDER SUB-VIEWS --------------

  // 1. 员工管理 (Staff Management List)
  const renderStaffView = () => (
    <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] min-h-[680px] space-y-5">
      {/* Page Title Header */}
      <div className="flex items-center space-x-2.5 pb-4 border-b border-gray-100">
        <span className="w-1.5 h-4 bg-[#10b981] rounded-full"></span>
        <h1 className="text-base font-semibold text-gray-800 tracking-tight">员工管理</h1>
      </div>

      {/* Filter Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex flex-wrap items-center gap-3">
          {/* Role Filter */}
          <div className="flex items-center space-x-2">
            <span className="text-gray-500 font-medium">角色</span>
            <select
              value={staffRoleFilter}
              onChange={(e) => setStaffRoleFilter(e.target.value)}
              className="px-3 py-1.5 bg-white border border-gray-200 rounded-md text-gray-700 min-w-[120px] focus:outline-none focus:border-[#10b981]"
            >
              <option value="请选择">请选择</option>
              <option value="管理员">管理员</option>
              <option value="派单员">派单员</option>
              <option value="护工主管">护工主管</option>
              <option value="财务员">财务员</option>
              <option value="客服专员">客服专员</option>
              <option value="维保工程师">维保工程师</option>
              <option value="膳食主管">膳食主管</option>
              <option value="运营主管">运营主管</option>
            </select>
          </div>

          {/* Date Filter */}
          <div className="flex items-center space-x-2">
            <span className="text-gray-500 font-medium">更新日期</span>
            <div className="flex items-center space-x-1.5 bg-white border border-gray-200 rounded-md px-2 py-1">
              <input
                type="text"
                placeholder="请选择日期"
                value={staffDateStart}
                onChange={(e) => setStaffDateStart(e.target.value)}
                className="w-24 text-center text-gray-600 focus:outline-none bg-transparent"
              />
              <span className="text-gray-300">~</span>
              <input
                type="text"
                placeholder="请选择日期"
                value={staffDateEnd}
                onChange={(e) => setStaffDateEnd(e.target.value)}
                className="w-24 text-center text-gray-600 focus:outline-none bg-transparent"
              />
            </div>
          </div>

          {/* Keyword Input */}
          <div className="relative w-56">
            <input
              type="text"
              placeholder="请输入关键字"
              value={staffKeyword}
              onChange={(e) => setStaffKeyword(e.target.value)}
              className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-md text-gray-700 focus:outline-none focus:border-[#10b981]"
            />
          </div>

          {/* Buttons */}
          <button
            onClick={() => onNotice('数据查询成功')}
            className="p-1.5 bg-[#10b981] text-white rounded-md hover:bg-[#059669] transition-colors"
            title="搜索"
          >
            <Search className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              setStaffRoleFilter('请选择');
              setStaffDateStart('');
              setStaffDateEnd('');
              setStaffKeyword('');
            }}
            className="p-1.5 bg-white border border-gray-200 text-gray-600 rounded-md hover:bg-gray-50 transition-colors"
            title="重置"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Top Right Actions */}
        <div className="flex items-center space-x-2.5">
          <button
            onClick={handleOpenAddStaff}
            className="px-4 py-1.5 bg-[#10b981] hover:bg-[#059669] text-white rounded-md font-medium transition-colors shadow-xs"
          >
            新增
          </button>
          <button
            onClick={() => onNotice('支持批量修改状态或删除员工')}
            className="px-3.5 py-1.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-md font-medium transition-colors"
          >
            批量操作
          </button>
        </div>
      </div>

      {/* Table Area */}
      <div className="overflow-x-auto border border-gray-100 rounded-lg">
        <table className="w-full text-xs text-left">
          <thead>
            <tr className="bg-gray-50 text-gray-500 border-b border-gray-100">
              <th className="py-3 px-3 w-10 text-center">
                <input type="checkbox" className="rounded border-gray-300 text-[#10b981]" />
              </th>
              <th className="py-3 px-3 font-medium">员工编号</th>
              <th className="py-3 px-3 font-medium">姓名</th>
              <th className="py-3 px-3 font-medium">角色</th>
              <th className="py-3 px-3 font-medium">手机号码</th>
              <th className="py-3 px-3 font-medium">备注</th>
              <th className="py-3 px-3 font-medium">更新人</th>
              <th className="py-3 px-3 font-medium">最后更新时间</th>
              <th className="py-3 px-3 font-medium text-center">状态</th>
              <th className="py-3 px-3 font-medium text-center">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-gray-700">
            {filteredStaff.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50/70 transition-colors">
                <td className="py-3 px-3 text-center">
                  <input type="checkbox" className="rounded border-gray-300 text-[#10b981]" />
                </td>
                <td className="py-3 px-3 font-mono text-gray-800">{item.staffNo}</td>
                <td className="py-3 px-3 font-medium text-gray-800">{item.name}</td>
                <td className="py-3 px-3">{item.role}</td>
                <td className="py-3 px-3 font-mono text-gray-600">{item.phone}</td>
                <td className="py-3 px-3 text-gray-400 max-w-xs truncate">{item.remark || '-'}</td>
                <td className="py-3 px-3 text-gray-600">{item.updatedBy}</td>
                <td className="py-3 px-3 text-gray-500 font-mono">{item.updatedTime}</td>
                <td className="py-3 px-3 text-center">
                  <button
                    onClick={() => handleToggleStaffStatus(item.id)}
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium transition-colors ${
                      item.status ? 'bg-[#10b981]/10 text-[#10b981]' : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                        item.status ? 'bg-[#10b981]' : 'bg-gray-400'
                      }`}
                    ></span>
                    {item.status ? '启用' : '禁用'}
                  </button>
                </td>
                <td className="py-3 px-3 text-center space-x-2">
                  <button
                    onClick={() => handleEditStaff(item)}
                    className="text-[#10b981] hover:underline font-medium"
                  >
                    编辑
                  </button>
                  <button
                    onClick={() => handleDeleteStaff(item)}
                    className="text-red-500 hover:underline font-medium"
                  >
                    删除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // 2. 新增/编辑员工表单 (Staff Form)
  const renderStaffFormView = () => (
    <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] min-h-[680px] space-y-6">
      <div className="flex items-center space-x-2.5 pb-4 border-b border-gray-100">
        <span className="w-1.5 h-4 bg-[#10b981] rounded-full"></span>
        <h1 className="text-base font-semibold text-gray-800 tracking-tight">
          {editingStaff ? '编辑员工' : '新增员工'}
        </h1>
      </div>

      <form onSubmit={handleSaveStaff} className="space-y-6 text-xs max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1.5">
              姓名<span className="text-red-500 ml-0.5">*</span>
            </label>
            <input
              type="text"
              placeholder="请输入"
              value={staffFormData.name}
              onChange={(e) => setStaffFormData({ ...staffFormData, name: e.target.value })}
              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-[#10b981]"
            />
          </div>

          {/* Staff No */}
          <div>
            <label className="block text-gray-700 font-medium mb-1.5">员工编号</label>
            <input
              type="text"
              value={staffFormData.staffNo}
              disabled
              className="w-full px-3 py-2 bg-gray-100 border border-gray-200 text-gray-500 rounded-md"
            />
          </div>

          {/* Avatar */}
          <div>
            <label className="block text-gray-700 font-medium mb-1.5">头像</label>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-100 border border-gray-200 rounded-md flex items-center justify-center text-gray-400">
                <UserIcon className="w-5 h-5" />
              </div>
              <button
                type="button"
                onClick={() => onNotice('请选择本地图片上传')}
                className="text-[#10b981] hover:underline font-medium"
              >
                +点击上传
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Phone */}
          <div>
            <label className="block text-gray-700 font-medium mb-1.5">
              手机号码<span className="text-red-500 ml-0.5">*</span>
            </label>
            <input
              type="text"
              placeholder="请输入"
              value={staffFormData.phone}
              onChange={(e) => setStaffFormData({ ...staffFormData, phone: e.target.value })}
              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-[#10b981]"
            />
            <p className="text-[11px] text-gray-400 mt-1">登录账号，请确认填写的信息正确</p>
          </div>

          {/* Role */}
          <div>
            <label className="block text-gray-700 font-medium mb-1.5">角色</label>
            <select
              value={staffFormData.role}
              onChange={(e) => setStaffFormData({ ...staffFormData, role: e.target.value })}
              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-gray-700 focus:outline-none focus:border-[#10b981]"
            >
              <option value="派单员">派单员</option>
              <option value="管理员">管理员</option>
              <option value="护工主管">护工主管</option>
              <option value="财务员">财务员</option>
              <option value="客服专员">客服专员</option>
              <option value="维保工程师">维保工程师</option>
            </select>
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-1.5">
              登录密码<span className="text-red-500 ml-0.5">*</span>
            </label>
            <input
              type="password"
              placeholder="请输入"
              value={staffFormData.password}
              onChange={(e) => setStaffFormData({ ...staffFormData, password: e.target.value })}
              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-[#10b981]"
            />
          </div>
        </div>

        {/* Status */}
        <div>
          <label className="block text-gray-700 font-medium mb-1.5">状态</label>
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => setStaffFormData({ ...staffFormData, status: !staffFormData.status })}
              className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                staffFormData.status ? 'bg-[#10b981]' : 'bg-gray-300'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  staffFormData.status ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
            <span className="text-gray-600 font-medium">
              {staffFormData.status ? '启用' : '禁用'}
            </span>
          </div>
        </div>

        {/* Remark */}
        <div>
          <label className="block text-gray-700 font-medium mb-1.5">备注</label>
          <textarea
            rows={4}
            placeholder="请输入"
            value={staffFormData.remark}
            onChange={(e) => setStaffFormData({ ...staffFormData, remark: e.target.value })}
            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-[#10b981]"
          />
        </div>

        {/* Form Action Buttons */}
        <div className="flex items-center space-x-3 pt-4 border-t border-gray-100">
          <button
            type="submit"
            className="px-5 py-2 bg-[#10b981] hover:bg-[#059669] text-white rounded-md font-medium transition-colors shadow-xs"
          >
            保存
          </button>
          <button
            type="button"
            onClick={() => onNavigate && onNavigate('sys_staff')}
            className="px-5 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-md font-medium transition-colors"
          >
            返回
          </button>
        </div>
      </form>
    </div>
  );

  // 3. 角色管理 (Role Management List)
  const renderRolesView = () => (
    <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] min-h-[680px] space-y-5">
      <div className="flex items-center space-x-2.5 pb-4 border-b border-gray-100">
        <span className="w-1.5 h-4 bg-[#10b981] rounded-full"></span>
        <h1 className="text-base font-semibold text-gray-800 tracking-tight">角色管理</h1>
      </div>

      {/* Filter Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center space-x-2">
            <span className="text-gray-500 font-medium">更新日期</span>
            <div className="flex items-center space-x-1.5 bg-white border border-gray-200 rounded-md px-2 py-1">
              <input
                type="text"
                placeholder="请选择日期"
                value={roleDateStart}
                onChange={(e) => setRoleDateStart(e.target.value)}
                className="w-24 text-center text-gray-600 focus:outline-none bg-transparent"
              />
              <span className="text-gray-300">~</span>
              <input
                type="text"
                placeholder="请选择日期"
                value={roleDateEnd}
                onChange={(e) => setRoleDateEnd(e.target.value)}
                className="w-24 text-center text-gray-600 focus:outline-none bg-transparent"
              />
            </div>
          </div>

          <div className="relative w-56">
            <input
              type="text"
              placeholder="请输入关键字"
              value={roleKeyword}
              onChange={(e) => setRoleKeyword(e.target.value)}
              className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-md text-gray-700 focus:outline-none focus:border-[#10b981]"
            />
          </div>

          <button
            onClick={() => onNotice('角色查询成功')}
            className="p-1.5 bg-[#10b981] text-white rounded-md hover:bg-[#059669] transition-colors"
          >
            <Search className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              setRoleDateStart('');
              setRoleDateEnd('');
              setRoleKeyword('');
            }}
            className="p-1.5 bg-white border border-gray-200 text-gray-600 rounded-md hover:bg-gray-50 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center space-x-2.5">
          <button
            onClick={handleOpenAddRole}
            className="px-4 py-1.5 bg-[#10b981] hover:bg-[#059669] text-white rounded-md font-medium transition-colors shadow-xs"
          >
            新增
          </button>
          <button
            onClick={() => onNotice('支持批量更改角色状态')}
            className="px-3.5 py-1.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-md font-medium transition-colors"
          >
            批量操作
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-gray-100 rounded-lg">
        <table className="w-full text-xs text-left">
          <thead>
            <tr className="bg-gray-50 text-gray-500 border-b border-gray-100">
              <th className="py-3 px-3 w-10 text-center">
                <input type="checkbox" className="rounded border-gray-300 text-[#10b981]" />
              </th>
              <th className="py-3 px-3 font-medium">角色名称</th>
              <th className="py-3 px-3 font-medium">员工人数</th>
              <th className="py-3 px-3 font-medium">备注</th>
              <th className="py-3 px-3 font-medium">更新人</th>
              <th className="py-3 px-3 font-medium">最后更新时间</th>
              <th className="py-3 px-3 font-medium text-center">状态</th>
              <th className="py-3 px-3 font-medium text-center">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-gray-700">
            {filteredRoles.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50/70 transition-colors">
                <td className="py-3 px-3 text-center">
                  <input type="checkbox" className="rounded border-gray-300 text-[#10b981]" />
                </td>
                <td className="py-3 px-3 font-medium text-gray-800">{item.roleName}</td>
                <td className="py-3 px-3 text-[#10b981] font-semibold">{item.staffCount}</td>
                <td className="py-3 px-3 text-gray-400 max-w-xs truncate">{item.remark || '-'}</td>
                <td className="py-3 px-3 text-gray-600">{item.updatedBy}</td>
                <td className="py-3 px-3 text-gray-500 font-mono">{item.updatedTime}</td>
                <td className="py-3 px-3 text-center">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#10b981]/10 text-[#10b981]">
                    <span className="w-1.5 h-1.5 rounded-full mr-1.5 bg-[#10b981]"></span>
                    启用
                  </span>
                </td>
                <td className="py-3 px-3 text-center space-x-2">
                  <button
                    onClick={() => handleEditRole(item)}
                    className="text-[#10b981] hover:underline font-medium"
                  >
                    编辑
                  </button>
                  <button
                    onClick={() => handleDeleteRole(item)}
                    className="text-red-500 hover:underline font-medium"
                  >
                    删除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // 4. 新增/编辑角色表单 (Role Form)
  const renderRoleFormView = () => (
    <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] min-h-[680px] space-y-6">
      <div className="flex items-center space-x-2.5 pb-4 border-b border-gray-100">
        <span className="w-1.5 h-4 bg-[#10b981] rounded-full"></span>
        <h1 className="text-base font-semibold text-gray-800 tracking-tight">
          {editingRole ? '编辑角色' : '新增角色'}
        </h1>
      </div>

      <form onSubmit={handleSaveRole} className="space-y-6 text-xs max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-medium mb-1.5">
              角色名称<span className="text-red-500 ml-0.5">*</span>
            </label>
            <input
              type="text"
              placeholder="请输入"
              value={roleFormData.roleName}
              onChange={(e) => setRoleFormData({ ...roleFormData, roleName: e.target.value })}
              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-[#10b981]"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1.5">状态</label>
            <div className="flex items-center space-x-2 pt-1">
              <button
                type="button"
                onClick={() => setRoleFormData({ ...roleFormData, status: !roleFormData.status })}
                className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  roleFormData.status ? 'bg-[#10b981]' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    roleFormData.status ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
              <span className="text-gray-600 font-medium">
                {roleFormData.status ? '启用' : '禁用'}
              </span>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1.5">备注</label>
          <textarea
            rows={3}
            placeholder="请输入"
            value={roleFormData.remark}
            onChange={(e) => setRoleFormData({ ...roleFormData, remark: e.target.value })}
            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-[#10b981]"
          />
        </div>

        {/* Permissions Checkbox Tree */}
        <div className="space-y-3 pt-2">
          <label className="block text-gray-800 font-semibold">角色权限</label>
          <div className="border border-gray-100 rounded-lg p-4 space-y-4 bg-gray-50/50">
            {/* 全部 */}
            <label className="flex items-center space-x-2 font-medium text-gray-800 cursor-pointer">
              <input type="checkbox" className="rounded border-gray-300 text-[#10b981]" />
              <span>全部</span>
            </label>

            {/* 用户 */}
            <div className="pl-4 space-y-2">
              <label className="flex items-center space-x-2 font-medium text-gray-700 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded border-gray-300 text-[#10b981]" />
                <span>用户</span>
              </label>
              <div className="pl-6 flex flex-wrap gap-4 text-gray-600">
                <label className="flex items-center space-x-1.5 cursor-pointer">
                  <input type="checkbox" className="rounded border-gray-300 text-[#10b981]" />
                  <span>全部用户</span>
                </label>
                <label className="flex items-center space-x-1.5 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded border-gray-300 text-[#10b981]" />
                  <span>查看用户</span>
                </label>
                <label className="flex items-center space-x-1.5 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded border-gray-300 text-[#10b981]" />
                  <span>用户详情</span>
                </label>
                <label className="flex items-center space-x-1.5 cursor-pointer">
                  <input type="checkbox" className="rounded border-gray-300 text-[#10b981]" />
                  <span>新增用户</span>
                </label>
                <label className="flex items-center space-x-1.5 cursor-pointer">
                  <input type="checkbox" className="rounded border-gray-300 text-[#10b981]" />
                  <span>删除用户</span>
                </label>
                <label className="flex items-center space-x-1.5 cursor-pointer">
                  <input type="checkbox" className="rounded border-gray-300 text-[#10b981]" />
                  <span>添加标签</span>
                </label>
              </div>
            </div>

            {/* 交易/订单 */}
            <div className="pl-4 space-y-2">
              <label className="flex items-center space-x-2 font-medium text-gray-700 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded border-gray-300 text-[#10b981]" />
                <span>交易/订单</span>
              </label>
              <div className="pl-6 flex flex-wrap gap-4 text-gray-600">
                <label className="flex items-center space-x-1.5 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded border-gray-300 text-[#10b981]" />
                  <span>全部订单</span>
                </label>
                <label className="flex items-center space-x-1.5 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded border-gray-300 text-[#10b981]" />
                  <span>售后管理</span>
                </label>
                <label className="flex items-center space-x-1.5 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded border-gray-300 text-[#10b981]" />
                  <span>评价管理</span>
                </label>
              </div>
            </div>

            {/* 关怀服务 */}
            <div className="pl-4 space-y-2">
              <label className="flex items-center space-x-2 font-medium text-gray-700 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded border-gray-300 text-[#10b981]" />
                <span>关怀服务</span>
              </label>
              <div className="pl-6 flex flex-wrap gap-4 text-gray-600">
                <label className="flex items-center space-x-1.5 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded border-gray-300 text-[#10b981]" />
                  <span>服务工单</span>
                </label>
                <label className="flex items-center space-x-1.5 cursor-pointer">
                  <input type="checkbox" className="rounded border-gray-300 text-[#10b981]" />
                  <span>关怀计划</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3 pt-4 border-t border-gray-100">
          <button
            type="submit"
            className="px-5 py-2 bg-[#10b981] hover:bg-[#059669] text-white rounded-md font-medium transition-colors shadow-xs"
          >
            保存
          </button>
          <button
            type="button"
            onClick={() => onNavigate && onNavigate('sys_roles')}
            className="px-5 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-md font-medium transition-colors"
          >
            返回
          </button>
        </div>
      </form>
    </div>
  );

  // 5. 药品单位管理 (Drug Unit Management List)
  const renderDrugUnitsView = () => (
    <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] min-h-[680px] space-y-5">
      <div className="flex items-center space-x-2.5 pb-4 border-b border-gray-100">
        <span className="w-1.5 h-4 bg-[#10b981] rounded-full"></span>
        <h1 className="text-base font-semibold text-gray-800 tracking-tight">药品单位管理</h1>
      </div>

      {/* Filter Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center space-x-3">
          <div className="relative w-64">
            <input
              type="text"
              placeholder="请输入关键字"
              value={drugKeyword}
              onChange={(e) => setDrugKeyword(e.target.value)}
              className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-md text-gray-700 focus:outline-none focus:border-[#10b981]"
            />
          </div>

          <button
            onClick={() => onNotice('搜索单位列表完成')}
            className="p-1.5 bg-[#10b981] text-white rounded-md hover:bg-[#059669] transition-colors"
          >
            <Search className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDrugKeyword('')}
            className="p-1.5 bg-white border border-gray-200 text-gray-600 rounded-md hover:bg-gray-50 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center space-x-2.5">
          <button
            onClick={handleOpenAddDrugModal}
            className="px-4 py-1.5 bg-[#10b981] hover:bg-[#059669] text-white rounded-md font-medium transition-colors shadow-xs"
          >
            新增
          </button>
          <button
            onClick={() => onNotice('选择需要批量启用的单位')}
            className="px-3.5 py-1.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-md font-medium transition-colors"
          >
            批量操作
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-gray-100 rounded-lg">
        <table className="w-full text-xs text-left">
          <thead>
            <tr className="bg-gray-50 text-gray-500 border-b border-gray-100">
              <th className="py-3 px-4 font-medium w-20">序号</th>
              <th className="py-3 px-4 font-medium">单位名称</th>
              <th className="py-3 px-4 font-medium">关联药品数量</th>
              <th className="py-3 px-4 font-medium">最后更新人</th>
              <th className="py-3 px-4 font-medium">最后更新时间</th>
              <th className="py-3 px-4 font-medium text-center">状态</th>
              <th className="py-3 px-4 font-medium text-center">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-gray-700">
            {filteredDrugUnits.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50/70 transition-colors">
                <td className="py-3 px-4 font-medium text-gray-800">{item.seq}</td>
                <td className="py-3 px-4 font-medium text-gray-800">{item.unitName}</td>
                <td className="py-3 px-4 text-gray-600">{item.relatedCount}</td>
                <td className="py-3 px-4 text-gray-600">{item.updatedBy}</td>
                <td className="py-3 px-4 text-gray-500 font-mono">{item.updatedTime}</td>
                <td className="py-3 px-4 text-center">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#10b981]/10 text-[#10b981]">
                    <span className="w-1.5 h-1.5 rounded-full mr-1.5 bg-[#10b981]"></span>
                    启用
                  </span>
                </td>
                <td className="py-3 px-4 text-center space-x-2">
                  <button
                    onClick={() => handleOpenEditDrugModal(item)}
                    className="text-[#10b981] hover:underline font-medium"
                  >
                    编辑
                  </button>
                  <button
                    onClick={() => handleDeleteDrugUnit(item)}
                    className="text-red-500 hover:underline font-medium"
                  >
                    删除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex items-center justify-end space-x-4 pt-3 text-xs text-gray-500">
        <span>共{filteredDrugUnits.length}条</span>
        <select className="px-2 py-1 border border-gray-200 rounded-md bg-white">
          <option>每页10条</option>
          <option>每页20条</option>
        </select>
        <div className="flex items-center space-x-1">
          <button className="p-1 border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-40">
            <ChevronsLeft className="w-3.5 h-3.5" />
          </button>
          <button className="p-1 border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-40">
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <span className="px-2.5 py-0.5 bg-[#10b981] text-white rounded font-medium">1</span>
          <button className="p-1 border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-40">
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
          <button className="p-1 border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-40">
            <ChevronsRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <span>前往第 <input type="text" defaultValue="1" className="w-8 text-center border border-gray-200 rounded py-0.5 mx-0.5" /> 页</span>
      </div>
    </div>
  );

  // 6. 协议管理 (Protocol Management)
  const renderProtocolsView = () => (
    <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] min-h-[680px] space-y-5">
      <div className="flex items-center space-x-2.5 pb-2 border-b border-gray-100">
        <span className="w-1.5 h-4 bg-[#10b981] rounded-full"></span>
        <h1 className="text-base font-semibold text-gray-800 tracking-tight">协议管理</h1>
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-6 border-b border-gray-100 text-xs">
        <button
          onClick={() => setProtocolTab('user')}
          className={`pb-2.5 font-medium border-b-2 transition-colors ${
            protocolTab === 'user'
              ? 'border-[#10b981] text-[#10b981]'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          用户端隐私政策
        </button>
        <button
          onClick={() => setProtocolTab('server')}
          className={`pb-2.5 font-medium border-b-2 transition-colors ${
            protocolTab === 'server'
              ? 'border-[#10b981] text-[#10b981]'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          服务端隐私政策
        </button>
      </div>

      {/* Content Form */}
      <div className="space-y-3 max-w-4xl">
        <label className="block text-xs font-medium text-gray-700">
          内容<span className="text-red-500 ml-0.5">*</span>
        </label>

        {/* Rich Text Editor Toolbar Header */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-50/80 px-3 py-2 border-b border-gray-200 flex flex-wrap items-center gap-2.5 text-gray-600 text-xs">
            <button className="font-bold hover:text-[#10b981] px-1">H</button>
            <button className="font-bold hover:text-[#10b981] px-1">B</button>
            <span className="text-gray-300">|</span>
            <button className="hover:text-[#10b981] px-1"><Bold className="w-3.5 h-3.5" /></button>
            <button className="hover:text-[#10b981] px-1"><Italic className="w-3.5 h-3.5" /></button>
            <button className="hover:text-[#10b981] px-1"><Underline className="w-3.5 h-3.5" /></button>
            <button className="hover:text-[#10b981] px-1"><Strikethrough className="w-3.5 h-3.5" /></button>
            <span className="text-gray-300">|</span>
            <button className="hover:text-[#10b981] px-1"><List className="w-3.5 h-3.5" /></button>
            <button className="hover:text-[#10b981] px-1"><ListOrdered className="w-3.5 h-3.5" /></button>
            <button className="hover:text-[#10b981] px-1"><Quote className="w-3.5 h-3.5" /></button>
            <span className="text-gray-300">|</span>
            <button className="hover:text-[#10b981] px-1"><LinkIcon className="w-3.5 h-3.5" /></button>
            <button className="hover:text-[#10b981] px-1"><ImageIcon className="w-3.5 h-3.5" /></button>
            <button className="hover:text-[#10b981] px-1"><VideoIcon className="w-3.5 h-3.5" /></button>
            <button className="hover:text-[#10b981] px-1"><TableIcon className="w-3.5 h-3.5" /></button>
            <span className="text-gray-300">|</span>
            <button className="hover:text-[#10b981] px-1"><Undo className="w-3.5 h-3.5" /></button>
            <button className="hover:text-[#10b981] px-1"><Redo className="w-3.5 h-3.5" /></button>
          </div>

          <textarea
            rows={14}
            value={protocolTab === 'user' ? userProtocolContent : serverProtocolContent}
            onChange={(e) =>
              protocolTab === 'user'
                ? setUserProtocolContent(e.target.value)
                : setServerProtocolContent(e.target.value)
            }
            className="w-full p-4 text-xs text-gray-800 leading-relaxed focus:outline-none bg-white resize-y"
          />
        </div>
      </div>
    </div>
  );

  // 7. 操作日志 (Operation Logs)
  const renderLogsView = () => (
    <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] min-h-[680px] space-y-5">
      <div className="flex items-center space-x-2.5 pb-4 border-b border-gray-100">
        <span className="w-1.5 h-4 bg-[#10b981] rounded-full"></span>
        <h1 className="text-base font-semibold text-gray-800 tracking-tight">操作日志</h1>
      </div>

      {/* Filter Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center space-x-2">
            <span className="text-gray-500 font-medium">操作日期</span>
            <div className="flex items-center space-x-1.5 bg-white border border-gray-200 rounded-md px-2 py-1">
              <input
                type="text"
                placeholder="请选择日期"
                value={logDateStart}
                onChange={(e) => setLogDateStart(e.target.value)}
                className="w-24 text-center text-gray-600 focus:outline-none bg-transparent"
              />
              <span className="text-gray-300">~</span>
              <input
                type="text"
                placeholder="请选择日期"
                value={logDateEnd}
                onChange={(e) => setLogDateEnd(e.target.value)}
                className="w-24 text-center text-gray-600 focus:outline-none bg-transparent"
              />
            </div>
          </div>

          <div className="relative w-56">
            <input
              type="text"
              placeholder="请输入关键字"
              value={logKeyword}
              onChange={(e) => setLogKeyword(e.target.value)}
              className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-md text-gray-700 focus:outline-none focus:border-[#10b981]"
            />
          </div>

          <button
            onClick={() => onNotice('日志搜索成功')}
            className="p-1.5 bg-[#10b981] text-white rounded-md hover:bg-[#059669] transition-colors"
          >
            <Search className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              setLogDateStart('');
              setLogDateEnd('');
              setLogKeyword('');
            }}
            className="p-1.5 bg-white border border-gray-200 text-gray-600 rounded-md hover:bg-gray-50 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        <div>
          <button
            onClick={() => onNotice('导出操作日志报告文件')}
            className="px-3.5 py-1.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-md font-medium transition-colors"
          >
            批量操作
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-gray-100 rounded-lg">
        <table className="w-full text-xs text-left">
          <thead>
            <tr className="bg-gray-50 text-gray-500 border-b border-gray-100">
              <th className="py-3 px-4 font-medium">操作时间</th>
              <th className="py-3 px-4 font-medium">操作员工</th>
              <th className="py-3 px-4 font-medium">员工编号</th>
              <th className="py-3 px-4 font-medium">IP地址</th>
              <th className="py-3 px-4 font-medium">操作模块</th>
              <th className="py-3 px-4 font-medium">操作内容</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-gray-700">
            {filteredOpLogs.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50/70 transition-colors">
                <td className="py-3 px-4 font-mono text-gray-800 font-medium">{item.time}</td>
                <td className="py-3 px-4 font-medium text-gray-800">{item.operator}</td>
                <td className="py-3 px-4 font-mono text-gray-600">{item.staffNo}</td>
                <td className="py-3 px-4 font-mono text-gray-500">{item.ip}</td>
                <td className="py-3 px-4 text-gray-600">{item.module}</td>
                <td className="py-3 px-4 text-gray-800">{item.detail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // 8. 个人资料 (Personal Profile)
  const renderProfileView = () => (
    <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] min-h-[680px] space-y-6">
      <div className="flex items-center space-x-2.5 pb-4 border-b border-gray-100">
        <span className="w-1.5 h-4 bg-[#10b981] rounded-full"></span>
        <h1 className="text-base font-semibold text-gray-800 tracking-tight">个人资料</h1>
      </div>

      <form onSubmit={handleSaveProfile} className="space-y-6 text-xs max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-gray-700 font-medium mb-1.5">
              姓名<span className="text-red-500 ml-0.5">*</span>
            </label>
            <input
              type="text"
              value={profileData.name}
              onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-[#10b981]"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1.5">员工编号</label>
            <input
              type="text"
              value={profileData.staffNo}
              disabled
              className="w-full px-3 py-2 bg-gray-100 border border-gray-200 text-gray-500 rounded-md"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1.5">头像</label>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-100 border border-gray-200 rounded-md flex items-center justify-center text-gray-400">
                <UserIcon className="w-5 h-5" />
              </div>
              <button
                type="button"
                onClick={() => onNotice('请选择新的个人头像文件')}
                className="text-[#10b981] hover:underline font-medium"
              >
                +点击上传
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-medium mb-1.5">
              手机号码<span className="text-red-500 ml-0.5">*</span>
            </label>
            <input
              type="text"
              value={profileData.phone}
              onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-[#10b981]"
            />
            <p className="text-[11px] text-gray-400 mt-1">登录账号，请确认填写的信息正确</p>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1.5">角色</label>
            <input
              type="text"
              value={profileData.role}
              disabled
              className="w-full px-3 py-2 bg-gray-100 border border-gray-200 text-gray-500 rounded-md"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1.5">备注</label>
          <textarea
            rows={4}
            placeholder="请输入"
            value={profileData.remark}
            onChange={(e) => setProfileData({ ...profileData, remark: e.target.value })}
            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-[#10b981]"
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="px-6 py-2 bg-[#10b981] hover:bg-[#059669] text-white rounded-md font-medium transition-colors shadow-xs"
          >
            保存
          </button>
        </div>
      </form>
    </div>
  );

  // 9. 重置密码 (Reset Password)
  const renderResetPwdView = () => (
    <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] min-h-[680px] space-y-8">
      <div className="flex items-center space-x-2.5 pb-4 border-b border-gray-100">
        <span className="w-1.5 h-4 bg-[#10b981] rounded-full"></span>
        <h1 className="text-base font-semibold text-gray-800 tracking-tight">重置密码</h1>
      </div>

      <form onSubmit={handleSavePassword} className="space-y-6 text-xs max-w-md mx-auto pt-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <label className="w-20 text-right font-medium text-gray-700 shrink-0">旧密码</label>
            <input
              type="password"
              placeholder="请输入"
              value={pwdData.oldPwd}
              onChange={(e) => setPwdData({ ...pwdData, oldPwd: e.target.value })}
              className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-[#10b981]"
            />
          </div>

          <div className="flex items-center space-x-3">
            <label className="w-20 text-right font-medium text-gray-700 shrink-0">新密码</label>
            <input
              type="password"
              placeholder="请输入"
              value={pwdData.newPwd}
              onChange={(e) => setPwdData({ ...pwdData, newPwd: e.target.value })}
              className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-[#10b981]"
            />
          </div>

          <div className="flex items-center space-x-3">
            <label className="w-20 text-right font-medium text-gray-700 shrink-0">确认密码</label>
            <input
              type="password"
              placeholder="请输入"
              value={pwdData.confirmPwd}
              onChange={(e) => setPwdData({ ...pwdData, confirmPwd: e.target.value })}
              className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-[#10b981]"
            />
          </div>
        </div>

        <div className="pt-4 pl-23">
          <button
            type="submit"
            className="px-6 py-2 bg-[#10b981] hover:bg-[#059669] text-white rounded-md font-medium transition-colors shadow-xs"
          >
            保存
          </button>
        </div>
      </form>
    </div>
  );

  // Main Route Dispatcher
  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      {subPage === 'sys_staff' && renderStaffView()}
      {subPage === 'sys_staff_form' && renderStaffFormView()}
      {subPage === 'sys_roles' && renderRolesView()}
      {subPage === 'sys_role_form' && renderRoleFormView()}
      {subPage === 'sys_drug_units' && renderDrugUnitsView()}
      {subPage === 'sys_protocols' && renderProtocolsView()}
      {subPage === 'sys_logs' && renderLogsView()}
      {subPage === 'sys_profile' && renderProfileView()}
      {subPage === 'sys_reset_pwd' && renderResetPwdView()}

      {/* Legacy Fallback for org_settings or audit_logs */}
      {(subPage === 'org_settings' || subPage === 'audit_logs') && renderStaffView()}

      {/* Drug Unit Edit/Add Modal Dialog (Matching Image 6) */}
      {isDrugModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-xl w-full max-w-md overflow-hidden shadow-2xl border border-gray-100 p-6 space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="text-sm font-semibold text-gray-800">
                {editingDrugUnit ? '编辑药品单位' : '新增药品单位'}
              </h3>
              <button
                onClick={() => setIsDrugModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-700 font-medium mb-1.5">
                  单位名称<span className="text-red-500 ml-0.5">*</span>
                </label>
                <input
                  type="text"
                  value={drugFormData.unitName}
                  onChange={(e) => setDrugFormData({ ...drugFormData, unitName: e.target.value })}
                  placeholder="请输入如：片/盒/瓶"
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-[#10b981]"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1.5">
                  序号<span className="text-red-500 ml-0.5">*</span>
                </label>
                <input
                  type="number"
                  value={drugFormData.seq}
                  onChange={(e) => setDrugFormData({ ...drugFormData, seq: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-[#10b981]"
                />
                <p className="text-[11px] text-gray-400 mt-1">数字越大，排序越靠前</p>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1.5">状态</label>
                <div className="flex items-center space-x-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setDrugFormData({ ...drugFormData, status: !drugFormData.status })}
                    className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      drugFormData.status ? 'bg-[#10b981]' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        drugFormData.status ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                  <span className="text-gray-600 font-medium">
                    {drugFormData.status ? '启用' : '禁用'}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-2.5 pt-3 border-t border-gray-100 text-xs">
              <button
                onClick={() => setIsDrugModalOpen(false)}
                className="px-4 py-1.5 border border-gray-200 hover:bg-gray-50 text-gray-600 rounded-md font-medium transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleSaveDrugModal}
                className="px-4 py-1.5 bg-[#10b981] hover:bg-[#059669] text-white rounded-md font-medium transition-colors"
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
