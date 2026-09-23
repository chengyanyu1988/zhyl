// 详尽且不重复的健康数据，时间严格从 2026-09-19 降序至 2026-09-01

export interface MedicationRecord {
  id: string;
  period: '晨服' | '午餐后' | '晚餐前' | '晚餐后' | '睡前' | '随餐';
  name: string;
  frequency: string;
  time: string; // 如 07:30
  dosage: string; // 如 5mg/片、1片
  unit: string;
  quantity: string;
  reminderEnabled: boolean;
  firstReminderDate: string;
  source: string;
  addedBy: string;
  addTime: string; // 2026-09-xx xx:xx:xx
}

export interface WeightRecord {
  id: string;
  time: string; // 2026-09-xx xx:xx:xx
  weight: number; // kg
  bmi: number;
  source: string;
  addedBy: string;
}

export interface StepsRecord {
  id: string;
  time: string; // 2026-09-xx xx:xx:xx
  date: string; // 2026-09-xx
  steps: number;
  source: string;
  addedBy: string;
}

export interface SleepRecord {
  id: string;
  time: string; // 测量记录时间
  sleepTime: string; // 入睡时间 2026-09-xx 22:30
  wakeTime: string; // 醒来时间 2026-09-xx 06:45
  totalMinutes: number; // 睡眠总时长分钟
  totalDurationText: string; // 8小时15分
  deepMinutes: number; // 深睡
  deepText: string;
  lightMinutes: number; // 浅睡
  lightText: string;
  remMinutes: number; // 快速眼动
  remText: string;
  source: string;
  addedBy: string;
}

export interface GlucoseRecord {
  id: string;
  time: string; // 2026-09-xx xx:xx:xx
  period: '早餐前' | '早餐后' | '午餐前' | '午餐后' | '晚餐前' | '晚餐后' | '睡前';
  value: number; // mmol/L
  status: '正常' | '偏高' | '偏低';
  source: string;
  addedBy: string;
}

export interface BloodPressureRecord {
  id: string;
  time: string; // 2026-09-xx xx:xx:xx
  systolic: number; // 收缩压 mmHg
  diastolic: number; // 舒张压 mmHg
  status: '正常' | '偏高' | '偏低';
  source: string;
  addedBy: string;
}

export interface Spo2Record {
  id: string;
  time: string; // 2026-09-xx xx:xx:xx
  spo2: number; // %
  status: '正常' | '轻度偏低';
  source: string;
  addedBy: string;
}

export interface HeartRateRecord {
  id: string;
  time: string; // 2026-09-xx xx:xx:xx
  heartRate: number; // 次/分
  status: '正常' | '偏快' | '偏缓';
  source: string;
  addedBy: string;
}

export interface DeviceRecord {
  id: string;
  name: string;
  image: string;
  code: string;
  version: string;
  status: '已连接' | '离线';
  location: string;
  boundTime: string; // 2026-09-xx xx:xx:xx
}

export interface HealthInfoData {
  height: string;
  weight: string;
  bloodType: string;
  rhNegative: string;
  chronicDiseases: string[];
  sleepQuality: string;
  smokeFrequency: string;
  drinkFrequency: string;
  sportFrequency: string;
  dietPreference: string;
  pastIllness: string;
  familyHistory: string;
  allergyHistory: string;
  medicalHistory: string;
}

// 基础健康信息（根据 Image 1, 2）
export const INITIAL_HEALTH_INFO: HealthInfoData = {
  height: '172',
  weight: '70',
  bloodType: 'A型',
  rhNegative: '否',
  chronicDiseases: ['高血压', '2型糖尿病', '轻度骨质疏松'],
  sleepQuality: '良好 (偶有入睡困难)',
  smokeFrequency: '从不吸烟',
  drinkFrequency: '偶有小酌 (节庆少量红酒)',
  sportFrequency: '每周4~5次 (清晨太极与饭后散步)',
  dietPreference: '清淡少油少盐，偏好蒸煮时蔬与鱼类',
  pastIllness: '2021年确诊原发性高血压(2级)；2023年发现空腹血糖偏高(2型糖尿病早期)；2024年体检发现L3-L5骨质增生及轻度骨量减少。',
  familyHistory: '母亲患有原发性高血压病史；父亲无心脑血管家族史；无其他重大显性遗传疾病。',
  allergyHistory: '青霉素类抗生素严重过敏(出现荨麻疹与胸闷)；对磺胺类药物可疑过敏；无明显海鲜食物过敏。',
  medicalHistory: '2026-09-15 在上海市徐汇区中心医院心血管内科门诊常规复诊，复查血压132/84mmHg，遵医嘱开具当月降压降糖药物。',
};

// 用药信息列表（根据 Image 3, 4, 5, 6，严格降序 2026-09-18 至 2026-09-01，各不相同）
export const INITIAL_MEDICATIONS: MedicationRecord[] = [
  {
    id: 'med-01',
    period: '晨服',
    name: '苯磺酸氨氯地平片 (络活喜)',
    frequency: '每日一次',
    time: '07:30',
    dosage: '5mg/片',
    unit: '片',
    quantity: '1',
    reminderEnabled: true,
    firstReminderDate: '2026-09-19',
    source: '医生处方',
    addedBy: '王健 医师',
    addTime: '2026-09-19 16:20:00',
  },
  {
    id: 'med-02',
    period: '随餐',
    name: '盐酸二甲双胍缓释片 (格华止)',
    frequency: '每日两次',
    time: '12:00',
    dosage: '0.5g/片',
    unit: '片',
    quantity: '1',
    reminderEnabled: true,
    firstReminderDate: '2026-09-17',
    source: '医生处方',
    addedBy: '王健 医师',
    addTime: '2026-09-17 11:35:10',
  },
  {
    id: 'med-03',
    period: '睡前',
    name: '阿托伐他汀钙片 (立普妥)',
    frequency: '每晚一次',
    time: '21:00',
    dosage: '20mg/片',
    unit: '片',
    quantity: '1',
    reminderEnabled: true,
    firstReminderDate: '2026-09-16',
    source: '医生处方',
    addedBy: '王健 医师',
    addTime: '2026-09-16 19:40:00',
  },
  {
    id: 'med-04',
    period: '晨服',
    name: '碳酸钙D3片 (钙尔奇)',
    frequency: '每日一次',
    time: '08:00',
    dosage: '600mg/片',
    unit: '片',
    quantity: '1',
    reminderEnabled: false,
    firstReminderDate: '2026-09-15',
    source: '家属添加',
    addedBy: '王小华 (长子)',
    addTime: '2026-09-15 09:15:30',
  },
  {
    id: 'med-05',
    period: '午餐后',
    name: '复合维生素B族咀嚼片',
    frequency: '每日一次',
    time: '13:00',
    dosage: '1片/次',
    unit: '片',
    quantity: '1',
    reminderEnabled: false,
    firstReminderDate: '2026-09-12',
    source: '自主申报',
    addedBy: '李明明 护士',
    addTime: '2026-09-12 14:05:00',
  },
  {
    id: 'med-06',
    period: '晚餐后',
    name: '阿司匹林肠溶片 (拜阿司匹灵)',
    frequency: '每日一次',
    time: '18:30',
    dosage: '100mg/片',
    unit: '片',
    quantity: '1',
    reminderEnabled: true,
    firstReminderDate: '2026-09-08',
    source: '社区门诊',
    addedBy: '陈晓红 主管护师',
    addTime: '2026-09-08 17:20:15',
  },
  {
    id: 'med-07',
    period: '随餐',
    name: '阿卡波糖片 (拜唐苹)',
    frequency: '每日三次',
    time: '18:00',
    dosage: '50mg/片',
    unit: '片',
    quantity: '1',
    reminderEnabled: true,
    firstReminderDate: '2026-09-03',
    source: '医生处方',
    addedBy: '王健 医师',
    addTime: '2026-09-03 10:12:00',
  },
  {
    id: 'med-08',
    period: '晨服',
    name: '厄贝沙坦氢氯噻嗪片 (安博诺)',
    frequency: '隔日一次',
    time: '07:30',
    dosage: '150mg/12.5mg',
    unit: '片',
    quantity: '1',
    reminderEnabled: false,
    firstReminderDate: '2026-09-01',
    source: '专科调整',
    addedBy: '周志成 主任医师',
    addTime: '2026-09-01 08:30:00',
  },
];

// 体重记录 (Image 7, 8, 9)
export const INITIAL_WEIGHTS: WeightRecord[] = [
  { id: 'wt-00', time: '2026-09-19 07:15:00', weight: 69.6, bmi: 23.5, source: '智能体脂秤', addedBy: '设备自动上传' },
  { id: 'wt-01', time: '2026-09-18 07:15:00', weight: 69.8, bmi: 23.6, source: '智能体脂秤', addedBy: '设备自动上传' },
  { id: 'wt-02', time: '2026-09-17 07:20:00', weight: 70.0, bmi: 23.7, source: '智能体脂秤', addedBy: '设备自动上传' },
  { id: 'wt-03', time: '2026-09-16 07:10:00', weight: 70.2, bmi: 23.7, source: '智能体脂秤', addedBy: '设备自动上传' },
  { id: 'wt-04', time: '2026-09-15 08:45:00', weight: 70.5, bmi: 23.8, source: '门诊体检秤', addedBy: '张护士' },
  { id: 'wt-05', time: '2026-09-14 07:30:00', weight: 70.8, bmi: 23.9, source: '智能体脂秤', addedBy: '设备自动上传' },
  { id: 'wt-06', time: '2026-09-13 07:15:00', weight: 71.0, bmi: 24.0, source: '智能体脂秤', addedBy: '设备自动上传' },
  { id: 'wt-07', time: '2026-09-12 07:22:00', weight: 71.2, bmi: 24.1, source: '智能体脂秤', addedBy: '设备自动上传' },
  { id: 'wt-08', time: '2026-09-10 07:18:00', weight: 71.4, bmi: 24.1, source: '智能体脂秤', addedBy: '设备自动上传' },
  { id: 'wt-09', time: '2026-09-07 07:25:00', weight: 71.7, bmi: 24.2, source: '护工上门测量', addedBy: '李明明' },
  { id: 'wt-10', time: '2026-09-04 07:10:00', weight: 72.0, bmi: 24.3, source: '智能体脂秤', addedBy: '设备自动上传' },
  { id: 'wt-11', time: '2026-09-01 07:30:00', weight: 72.3, bmi: 24.4, source: '自主录入', addedBy: '王小华' },
];

// 步数记录 (Image 10, 11)
export const INITIAL_STEPS: StepsRecord[] = [
  { id: 'stp-00', time: '2026-09-19 21:30:00', date: '2026-09-19', steps: 7380, source: '智能健康手环', addedBy: '设备自动上传' },
  { id: 'stp-01', time: '2026-09-18 21:30:00', date: '2026-09-18', steps: 6850, source: '智能健康手环', addedBy: '设备自动上传' },
  { id: 'stp-02', time: '2026-09-17 21:30:00', date: '2026-09-17', steps: 7420, source: '智能健康手环', addedBy: '设备自动上传' },
  { id: 'stp-03', time: '2026-09-16 21:30:00', date: '2026-09-16', steps: 5930, source: '智能健康手环', addedBy: '设备自动上传' },
  { id: 'stp-04', time: '2026-09-15 21:30:00', date: '2026-09-15', steps: 8360, source: '智能健康手环', addedBy: '设备自动上传' },
  { id: 'stp-05', time: '2026-09-14 21:30:00', date: '2026-09-14', steps: 6180, source: '智能健康手环', addedBy: '设备自动上传' },
  { id: 'stp-06', time: '2026-09-13 21:30:00', date: '2026-09-13', steps: 7800, source: '智能健康手环', addedBy: '设备自动上传' },
  { id: 'stp-07', time: '2026-09-12 21:30:00', date: '2026-09-12', steps: 6540, source: '智能健康手环', addedBy: '设备自动上传' },
  { id: 'stp-08', time: '2026-09-10 21:30:00', date: '2026-09-10', steps: 7120, source: '智能健康手环', addedBy: '设备自动上传' },
  { id: 'stp-09', time: '2026-09-07 21:30:00', date: '2026-09-07', steps: 5620, source: '智能健康手环', addedBy: '设备自动上传' },
  { id: 'stp-10', time: '2026-09-04 21:30:00', date: '2026-09-04', steps: 6990, source: '智能健康手环', addedBy: '设备自动上传' },
  { id: 'stp-11', time: '2026-09-01 21:30:00', date: '2026-09-01', steps: 7350, source: '智能健康手环', addedBy: '设备自动上传' },
];

// 睡眠记录 (Image 12, 13, 14)
export const INITIAL_SLEEP: SleepRecord[] = [
  {
    id: 'slp-00',
    time: '2026-09-19 07:00:00',
    sleepTime: '2026-09-18 22:45',
    wakeTime: '2026-09-19 06:40',
    totalMinutes: 475,
    totalDurationText: '7小时55分',
    deepMinutes: 130,
    deepText: '2小时10分',
    lightMinutes: 260,
    lightText: '4小时20分',
    remMinutes: 85,
    remText: '1小时25分',
    source: '智能睡眠监测垫',
    addedBy: '设备自动上传',
  },
  {
    id: 'slp-01',
    time: '2026-09-18 07:05:00',
    sleepTime: '2026-09-17 22:40',
    wakeTime: '2026-09-18 06:45',
    totalMinutes: 485,
    totalDurationText: '8小时05分',
    deepMinutes: 135,
    deepText: '2小时15分',
    lightMinutes: 260,
    lightText: '4小时20分',
    remMinutes: 90,
    remText: '1小时30分',
    source: '智能睡眠监测垫',
    addedBy: '设备自动上传',
  },
  {
    id: 'slp-02',
    time: '2026-09-17 07:15:00',
    sleepTime: '2026-09-16 23:05',
    wakeTime: '2026-09-17 06:50',
    totalMinutes: 465,
    totalDurationText: '7小时45分',
    deepMinutes: 120,
    deepText: '2小时00分',
    lightMinutes: 270,
    lightText: '4小时30分',
    remMinutes: 75,
    remText: '1小时15分',
    source: '智能睡眠监测垫',
    addedBy: '设备自动上传',
  },
  {
    id: 'slp-03',
    time: '2026-09-16 07:00:00',
    sleepTime: '2026-09-15 22:30',
    wakeTime: '2026-09-16 06:30',
    totalMinutes: 480,
    totalDurationText: '8小时00分',
    deepMinutes: 140,
    deepText: '2小时20分',
    lightMinutes: 255,
    lightText: '4小时15分',
    remMinutes: 85,
    remText: '1小时25分',
    source: '智能睡眠监测垫',
    addedBy: '设备自动上传',
  },
  {
    id: 'slp-04',
    time: '2026-09-15 07:20:00',
    sleepTime: '2026-09-14 23:20',
    wakeTime: '2026-09-15 07:00',
    totalMinutes: 460,
    totalDurationText: '7小时40分',
    deepMinutes: 110,
    deepText: '1小时50分',
    lightMinutes: 280,
    lightText: '4小时40分',
    remMinutes: 70,
    remText: '1小时10分',
    source: '智能睡眠监测垫',
    addedBy: '设备自动上传',
  },
  {
    id: 'slp-05',
    time: '2026-09-14 06:50:00',
    sleepTime: '2026-09-13 22:15',
    wakeTime: '2026-09-14 06:35',
    totalMinutes: 500,
    totalDurationText: '8小时20分',
    deepMinutes: 150,
    deepText: '2小时30分',
    lightMinutes: 260,
    lightText: '4小时20分',
    remMinutes: 90,
    remText: '1小时30分',
    source: '智能睡眠监测垫',
    addedBy: '设备自动上传',
  },
  {
    id: 'slp-06',
    time: '2026-09-12 07:10:00',
    sleepTime: '2026-09-11 22:50',
    wakeTime: '2026-09-12 06:40',
    totalMinutes: 470,
    totalDurationText: '7小时50分',
    deepMinutes: 125,
    deepText: '2小时05分',
    lightMinutes: 265,
    lightText: '4小时25分',
    remMinutes: 80,
    remText: '1小时20分',
    source: '智能睡眠监测垫',
    addedBy: '设备自动上传',
  },
  {
    id: 'slp-07',
    time: '2026-09-08 07:15:00',
    sleepTime: '2026-09-07 23:00',
    wakeTime: '2026-09-08 06:55',
    totalMinutes: 475,
    totalDurationText: '7小时55分',
    deepMinutes: 130,
    deepText: '2小时10分',
    lightMinutes: 265,
    lightText: '4小时25分',
    remMinutes: 80,
    remText: '1小时20分',
    source: '智能睡眠监测垫',
    addedBy: '设备自动上传',
  },
  {
    id: 'slp-08',
    time: '2026-09-02 07:00:00',
    sleepTime: '2026-09-01 22:45',
    wakeTime: '2026-09-02 06:30',
    totalMinutes: 465,
    totalDurationText: '7小时45分',
    deepMinutes: 120,
    deepText: '2小时00分',
    lightMinutes: 270,
    lightText: '4小时30分',
    remMinutes: 75,
    remText: '1小时15分',
    source: '智能睡眠监测垫',
    addedBy: '设备自动上传',
  },
];

// 血糖记录 (Image 15, 16, 17)
export const INITIAL_GLUCOSE: GlucoseRecord[] = [
  { id: 'glc-00', time: '2026-09-19 19:40:00', period: '晚餐后', value: 7.2, status: '正常', source: '智能血糖仪', addedBy: '设备自动上传' },
  { id: 'glc-01', time: '2026-09-18 19:45:00', period: '晚餐后', value: 7.4, status: '正常', source: '智能血糖仪', addedBy: '设备自动上传' },
  { id: 'glc-02', time: '2026-09-18 12:30:00', period: '午餐后', value: 7.8, status: '正常', source: '智能血糖仪', addedBy: '设备自动上传' },
  { id: 'glc-03', time: '2026-09-18 07:10:00', period: '早餐前', value: 5.9, status: '正常', source: '智能血糖仪', addedBy: '设备自动上传' },
  { id: 'glc-04', time: '2026-09-17 19:30:00', period: '晚餐后', value: 8.6, status: '偏高', source: '智能血糖仪', addedBy: '设备自动上传' },
  { id: 'glc-05', time: '2026-09-17 07:05:00', period: '早餐前', value: 6.2, status: '正常', source: '智能血糖仪', addedBy: '设备自动上传' },
  { id: 'glc-06', time: '2026-09-16 13:10:00', period: '午餐后', value: 7.5, status: '正常', source: '智能血糖仪', addedBy: '设备自动上传' },
  { id: 'glc-07', time: '2026-09-16 07:15:00', period: '早餐前', value: 5.8, status: '正常', source: '智能血糖仪', addedBy: '设备自动上传' },
  { id: 'glc-08', time: '2026-09-15 08:30:00', period: '早餐前', value: 6.4, status: '偏高', source: '医院采血', addedBy: '张护士' },
  { id: 'glc-09', time: '2026-09-14 20:00:00', period: '晚餐后', value: 7.9, status: '正常', source: '智能血糖仪', addedBy: '设备自动上传' },
  { id: 'glc-10', time: '2026-09-13 07:20:00', period: '早餐前', value: 5.7, status: '正常', source: '智能血糖仪', addedBy: '设备自动上传' },
  { id: 'glc-11', time: '2026-09-11 19:15:00', period: '晚餐后', value: 8.2, status: '偏高', source: '智能血糖仪', addedBy: '设备自动上传' },
  { id: 'glc-12', time: '2026-09-08 07:10:00', period: '早餐前', value: 6.0, status: '正常', source: '智能血糖仪', addedBy: '设备自动上传' },
  { id: 'glc-13', time: '2026-09-04 12:40:00', period: '午餐后', value: 7.3, status: '正常', source: '智能血糖仪', addedBy: '设备自动上传' },
  { id: 'glc-14', time: '2026-09-01 07:30:00', period: '早餐前', value: 6.3, status: '偏高', source: '自主测量', addedBy: '李明明' },
];

// 血压记录 (Image 18)
export const INITIAL_BP: BloodPressureRecord[] = [
  { id: 'bp-00', time: '2026-09-19 19:15:00', systolic: 130, diastolic: 80, status: '正常', source: '电子血压计', addedBy: '设备自动上传' },
  { id: 'bp-01', time: '2026-09-18 19:10:00', systolic: 132, diastolic: 82, status: '正常', source: '电子血压计', addedBy: '设备自动上传' },
  { id: 'bp-02', time: '2026-09-18 07:25:00', systolic: 135, diastolic: 85, status: '正常', source: '电子血压计', addedBy: '设备自动上传' },
  { id: 'bp-03', time: '2026-09-17 19:00:00', systolic: 138, diastolic: 86, status: '偏高', source: '电子血压计', addedBy: '设备自动上传' },
  { id: 'bp-04', time: '2026-09-17 07:30:00', systolic: 134, diastolic: 83, status: '正常', source: '电子血压计', addedBy: '设备自动上传' },
  { id: 'bp-05', time: '2026-09-16 07:20:00', systolic: 130, diastolic: 80, status: '正常', source: '电子血压计', addedBy: '设备自动上传' },
  { id: 'bp-06', time: '2026-09-15 09:00:00', systolic: 142, diastolic: 88, status: '偏高', source: '门诊体检', addedBy: '王健 医师' },
  { id: 'bp-07', time: '2026-09-14 19:20:00', systolic: 133, diastolic: 82, status: '正常', source: '电子血压计', addedBy: '设备自动上传' },
  { id: 'bp-08', time: '2026-09-13 07:15:00', systolic: 128, diastolic: 78, status: '正常', source: '电子血压计', addedBy: '设备自动上传' },
  { id: 'bp-09', time: '2026-09-11 07:30:00', systolic: 136, diastolic: 84, status: '正常', source: '电子血压计', addedBy: '设备自动上传' },
  { id: 'bp-10', time: '2026-09-08 19:00:00', systolic: 140, diastolic: 89, status: '偏高', source: '电子血压计', addedBy: '设备自动上传' },
  { id: 'bp-11', time: '2026-09-05 07:10:00', systolic: 131, diastolic: 81, status: '正常', source: '护士上门测量', addedBy: '李明明' },
  { id: 'bp-12', time: '2026-09-01 07:45:00', systolic: 137, diastolic: 85, status: '正常', source: '电子血压计', addedBy: '设备自动上传' },
];

// 血氧记录
export const INITIAL_SPO2: Spo2Record[] = [
  { id: 'spo-00', time: '2026-09-19 20:00:00', spo2: 99, status: '正常', source: '指夹式脉搏血氧仪', addedBy: '设备自动上传' },
  { id: 'spo-01', time: '2026-09-18 20:00:00', spo2: 98, status: '正常', source: '指夹式脉搏血氧仪', addedBy: '设备自动上传' },
  { id: 'spo-02', time: '2026-09-17 20:00:00', spo2: 97, status: '正常', source: '指夹式脉搏血氧仪', addedBy: '设备自动上传' },
  { id: 'spo-03', time: '2026-09-16 20:00:00', spo2: 99, status: '正常', source: '指夹式脉搏血氧仪', addedBy: '设备自动上传' },
  { id: 'spo-04', time: '2026-09-15 09:15:00', spo2: 98, status: '正常', source: '门诊测量', addedBy: '张护士' },
  { id: 'spo-05', time: '2026-09-14 20:00:00', spo2: 96, status: '正常', source: '指夹式脉搏血氧仪', addedBy: '设备自动上传' },
  { id: 'spo-06', time: '2026-09-12 20:00:00', spo2: 98, status: '正常', source: '指夹式脉搏血氧仪', addedBy: '设备自动上传' },
  { id: 'spo-07', time: '2026-09-08 20:00:00', spo2: 97, status: '正常', source: '指夹式脉搏血氧仪', addedBy: '设备自动上传' },
  { id: 'spo-08', time: '2026-09-02 20:00:00', spo2: 98, status: '正常', source: '指夹式脉搏血氧仪', addedBy: '设备自动上传' },
];

// 心率记录
export const INITIAL_HEARTRATE: HeartRateRecord[] = [
  { id: 'hr-00', time: '2026-09-19 18:30:00', heartRate: 74, status: '正常', source: '智能健康手环', addedBy: '设备自动上传' },
  { id: 'hr-01', time: '2026-09-18 18:30:00', heartRate: 72, status: '正常', source: '智能健康手环', addedBy: '设备自动上传' },
  { id: 'hr-02', time: '2026-09-17 18:30:00', heartRate: 76, status: '正常', source: '智能健康手环', addedBy: '设备自动上传' },
  { id: 'hr-03', time: '2026-09-16 18:30:00', heartRate: 70, status: '正常', source: '智能健康手环', addedBy: '设备自动上传' },
  { id: 'hr-04', time: '2026-09-15 09:10:00', heartRate: 78, status: '正常', source: '心电监护仪', addedBy: '张护士' },
  { id: 'hr-05', time: '2026-09-14 18:30:00', heartRate: 68, status: '正常', source: '智能健康手环', addedBy: '设备自动上传' },
  { id: 'hr-06', time: '2026-09-12 18:30:00', heartRate: 74, status: '正常', source: '智能健康手环', addedBy: '设备自动上传' },
  { id: 'hr-07', time: '2026-09-07 18:30:00', heartRate: 82, status: '正常', source: '智能健康手环', addedBy: '设备自动上传' },
  { id: 'hr-08', time: '2026-09-01 18:30:00', heartRate: 71, status: '正常', source: '智能健康手环', addedBy: '设备自动上传' },
];

// 设备信息 (根据 Image 19，严格降序 2026-09-19 至 2026-09-01，各不相同)
export const INITIAL_DEVICES: DeviceRecord[] = [
  {
    id: 'dev-00',
    name: '毫米波跌倒监测雷达 (吸顶式)',
    image: 'https://images.unsplash.com/photo-1558089687-f282ffcbc126?auto=format&fit=crop&w=120&q=80',
    code: 'RAD-2026-091901',
    version: 'v3.2.0-pro',
    status: '已连接',
    location: '上海市徐汇区黎梅花园88栋3单元101室 (主卧天花板居中)',
    boundTime: '2026-09-19 15:30:00',
  },
  {
    id: 'dev-01',
    name: '毫米波跌倒监测雷达 (吸顶式)',
    image: 'https://images.unsplash.com/photo-1558089687-f282ffcbc126?auto=format&fit=crop&w=120&q=80',
    code: 'RAD-2026-091801',
    version: 'v3.2.0-pro',
    status: '已连接',
    location: '上海市徐汇区黎梅花园88栋3单元101室 (主卧天花板居中)',
    boundTime: '2026-09-18 15:30:00',
  },
  {
    id: 'dev-02',
    name: '高灵敏智能睡眠体征监测床垫',
    image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=120&q=80',
    code: 'MAT-2026-091702',
    version: 'v2.1.4',
    status: '已连接',
    location: '主卧双人床右侧床垫下方夹层',
    boundTime: '2026-09-17 11:15:20',
  },
  {
    id: 'dev-03',
    name: '4G智能语音电子臂式血压计',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=120&q=80',
    code: 'BPM-2026-091603',
    version: 'v1.9.0',
    status: '已连接',
    location: '客厅电视柜右侧常备健康箱',
    boundTime: '2026-09-16 09:40:00',
  },
  {
    id: 'dev-04',
    name: '北斗/GPS双模防走失智能定位手环',
    image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&w=120&q=80',
    code: 'BND-2026-091504',
    version: 'v4.0.1',
    status: '已连接',
    location: '长者随身佩戴 (左手手腕)',
    boundTime: '2026-09-15 14:20:10',
  },
  {
    id: 'dev-05',
    name: '浴室IPX7级防滑防水无线拉绳报警器',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=120&q=80',
    code: 'SOS-2026-091405',
    version: 'v1.2.0',
    status: '已连接',
    location: '卫生间沐浴花洒旁离地20cm处',
    boundTime: '2026-09-14 16:50:00',
  },
  {
    id: 'dev-06',
    name: '红外人体微动存在传感器 (广角)',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=120&q=80',
    code: 'PIR-2026-091106',
    version: 'v2.0.8',
    status: '已连接',
    location: '起居室玄关至卫生间走廊转角处',
    boundTime: '2026-09-11 10:10:00',
  },
  {
    id: 'dev-07',
    name: '智能定时分仓提醒药盒',
    image: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&w=120&q=80',
    code: 'BOX-2026-090607',
    version: 'v1.5.2',
    status: '离线',
    location: '餐厅餐桌靠窗托盘内',
    boundTime: '2026-09-06 17:05:00',
  },
  {
    id: 'dev-08',
    name: '无线蓝牙智能微量血糖仪',
    image: 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?auto=format&fit=crop&w=120&q=80',
    code: 'GLU-2026-090108',
    version: 'v2.3.0',
    status: '已连接',
    location: '床头柜首层医疗专用抽屉',
    boundTime: '2026-09-01 09:00:00',
  },
];
