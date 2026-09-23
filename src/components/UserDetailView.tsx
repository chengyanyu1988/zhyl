import React, { useState } from 'react';
import {
  ArrowLeft,
  Edit3,
  Save,
  CheckCircle2,
  Clock,
  User,
  Heart,
  Pill,
  Activity,
  Cpu,
  FileText,
  ShoppingCart,
  Coins,
  BookOpen,
  CalendarCheck,
} from 'lucide-react';
import { AppUser } from '../types';
import { HealthInfoTab } from './userDetail/HealthInfoTab';
import { MedicationTab } from './userDetail/MedicationTab';
import { HealthMetricsTab } from './userDetail/HealthMetricsTab';
import { DeviceListTab } from './userDetail/DeviceListTab';
import { UserProfileSidebar } from './userDetail/UserProfileSidebar';
import { ReportInfoTab } from './userDetail/ReportInfoTab';
import { OrderInfoTab } from './userDetail/OrderInfoTab';
import { AssetInfoTab } from './userDetail/AssetInfoTab';
import { ContentInfoTab } from './userDetail/ContentInfoTab';
import { ServiceRecordTab } from './userDetail/ServiceRecordTab';

interface UserDetailViewProps {
  user: AppUser;
  onBack: () => void;
  onUpdateUser: (updatedUser: AppUser) => void;
  onNotice: (msg: string) => void;
}

export const UserDetailView: React.FC<UserDetailViewProps> = ({
  user,
  onBack,
  onUpdateUser,
  onNotice,
}) => {
  const [activeTab, setActiveTab] = useState<string>('个人信息');
  const [isEditing, setIsEditing] = useState(false);

  // Editable form state initialized from user profile
  const [formData, setFormData] = useState({
    nickname: user.profile.nickname,
    accountId: user.profile.accountId,
    realName: user.realName,
    gender: user.gender,
    birthDate: user.profile.birthDate,
    phone: user.phone,
    idCard: user.profile.idCard,
    address: user.profile.address,
    bio: user.profile.bio,
    height: user.profile.height,
    weight: user.profile.weight,
    ethnicity: user.profile.ethnicity,
    education: user.profile.education,
    nativePlace: user.profile.nativePlace,
    marriage: user.profile.marriage,
    occupation: user.profile.occupation,
    company: user.profile.company,
    emergencyContact: user.profile.emergencyContact,
    emergencyPhone: user.profile.emergencyPhone,
    status: user.profile.status,
    passwordMasked: user.profile.passwordMasked,
    remarks: user.remarks,
  });

  const detailTabs = [
    '个人信息',
    '健康信息',
    '用药信息',
    '健康数据',
    '设备信息',
    '报告信息',
    '订单信息',
    '资产信息',
    '内容信息',
    '服务记录',
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedUser: AppUser = {
      ...user,
      realName: formData.realName,
      phone: formData.phone,
      phoneMasked: `${formData.phone.slice(0, 3)}****${formData.phone.slice(-4)}`,
      gender: formData.gender,
      remarks: formData.remarks,
      profile: {
        nickname: formData.nickname,
        accountId: formData.accountId,
        birthDate: formData.birthDate,
        idCard: formData.idCard,
        address: formData.address,
        bio: formData.bio,
        height: formData.height,
        weight: formData.weight,
        ethnicity: formData.ethnicity,
        education: formData.education,
        nativePlace: formData.nativePlace,
        marriage: formData.marriage,
        occupation: formData.occupation,
        company: formData.company,
        emergencyContact: formData.emergencyContact,
        emergencyPhone: formData.emergencyPhone,
        status: formData.status,
        passwordMasked: formData.passwordMasked,
      },
      operationLogs: [
        {
          id: `op-${Date.now()}`,
          action: '修改 个人基础资料与健康备注',
          operator: 'admin (系统管理员)',
          time: '2026-09-19 16:30:00',
        },
        ...user.operationLogs,
      ],
    };
    onUpdateUser(updatedUser);
    setIsEditing(false);
    onNotice(`已成功保存长者【${formData.realName}】档案信息`);
  };

  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-5">
      {/* Top Header Tabs Card */}
      <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs font-medium">
          {detailTabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                id={`user-detail-tab-${tab}`}
                onClick={() => {
                  setActiveTab(tab);
                  onNotice(`切换标签至: ${tab}`);
                }}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-150 ${
                  isActive
                    ? 'bg-[#10b981] text-white shadow-xs font-semibold'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/70'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Two-Column Container */}
      {activeTab === '个人信息' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column (4 cols): User Card Summary, Social Metrics, Operation Logs */}
          <div className="lg:col-span-4 space-y-5">
            <UserProfileSidebar user={user} />
          </div>

          {/* Right Column (8 cols): Form Fields for 基础信息 & 其它信息 */}
          <div className="lg:col-span-8">
            <form
              onSubmit={handleSave}
              className="bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-6 text-xs"
            >
              {/* Section 1: 基础信息 */}
              <div>
                <h3 className="text-sm font-semibold text-gray-800 mb-4 tracking-tight">
                  基础信息
                </h3>

                <div className="space-y-4">
                  {/* Row 1: 昵称 & ID */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <span className="w-20 text-gray-500 font-medium shrink-0 text-right">
                        昵称
                      </span>
                      <input
                        type="text"
                        disabled={!isEditing}
                        value={formData.nickname}
                        onChange={(e) =>
                          setFormData({ ...formData, nickname: e.target.value })
                        }
                        className="flex-1 px-3.5 py-2 bg-gray-100/70 border border-gray-200/50 rounded-lg text-gray-800 focus:bg-white focus:outline-none focus:border-[#10b981] disabled:text-gray-700"
                      />
                    </div>

                    <div className="flex items-center space-x-3">
                      <span className="w-16 text-gray-500 font-medium shrink-0 text-right">
                        ID
                      </span>
                      <input
                        type="text"
                        disabled={!isEditing}
                        value={formData.accountId}
                        onChange={(e) =>
                          setFormData({ ...formData, accountId: e.target.value })
                        }
                        className="flex-1 px-3.5 py-2 bg-gray-100/70 border border-gray-200/50 rounded-lg text-gray-800 focus:bg-white focus:outline-none focus:border-[#10b981] disabled:text-gray-700"
                      />
                    </div>
                  </div>

                  {/* Row 2: 头像 & 真实姓名 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <span className="w-20 text-gray-500 font-medium shrink-0 text-right">
                        头像
                      </span>
                      <div className="flex items-center space-x-3">
                        <img
                          src={user.avatar}
                          alt="avatar"
                          className="w-10 h-10 rounded-full object-cover ring-1 ring-gray-200"
                        />
                        {isEditing && (
                          <span className="text-[11px] text-emerald-600 cursor-pointer hover:underline">
                            更换头像
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <span className="w-16 text-gray-500 font-medium shrink-0 text-right">
                        真实姓名
                      </span>
                      <input
                        type="text"
                        disabled={!isEditing}
                        value={formData.realName}
                        onChange={(e) =>
                          setFormData({ ...formData, realName: e.target.value })
                        }
                        className="flex-1 px-3.5 py-2 bg-gray-100/70 border border-gray-200/50 rounded-lg text-gray-800 focus:bg-white focus:outline-none focus:border-[#10b981] disabled:text-gray-700"
                      />
                    </div>
                  </div>

                  {/* Row 3: 性别 & 出生日期 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <span className="w-20 text-gray-500 font-medium shrink-0 text-right">
                        性别
                      </span>
                      <input
                        type="text"
                        disabled={!isEditing}
                        value={formData.gender}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            gender: e.target.value as '男' | '女',
                          })
                        }
                        className="flex-1 px-3.5 py-2 bg-gray-100/70 border border-gray-200/50 rounded-lg text-gray-800 focus:bg-white focus:outline-none focus:border-[#10b981] disabled:text-gray-700"
                      />
                    </div>

                    <div className="flex items-center space-x-3">
                      <span className="w-16 text-gray-500 font-medium shrink-0 text-right">
                        出生日期
                      </span>
                      <input
                        type="text"
                        disabled={!isEditing}
                        value={formData.birthDate}
                        onChange={(e) =>
                          setFormData({ ...formData, birthDate: e.target.value })
                        }
                        className="flex-1 px-3.5 py-2 bg-gray-100/70 border border-gray-200/50 rounded-lg text-gray-800 focus:bg-white focus:outline-none focus:border-[#10b981] disabled:text-gray-700"
                      />
                    </div>
                  </div>

                  {/* Row 4: 手机号码 & 身份证号 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <span className="w-20 text-gray-500 font-medium shrink-0 text-right">
                        手机号码
                      </span>
                      <input
                        type="text"
                        disabled={!isEditing}
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="flex-1 px-3.5 py-2 bg-gray-100/70 border border-gray-200/50 rounded-lg text-gray-800 focus:bg-white focus:outline-none focus:border-[#10b981] disabled:text-gray-700 font-mono"
                      />
                    </div>

                    <div className="flex items-center space-x-3">
                      <span className="w-16 text-gray-500 font-medium shrink-0 text-right">
                        身份证号
                      </span>
                      <input
                        type="text"
                        disabled={!isEditing}
                        value={formData.idCard}
                        onChange={(e) =>
                          setFormData({ ...formData, idCard: e.target.value })
                        }
                        className="flex-1 px-3.5 py-2 bg-gray-100/70 border border-gray-200/50 rounded-lg text-gray-800 focus:bg-white focus:outline-none focus:border-[#10b981] disabled:text-gray-700 font-mono"
                      />
                    </div>
                  </div>

                  {/* Row 5: 家庭住址 */}
                  <div className="flex items-center space-x-3">
                    <span className="w-20 text-gray-500 font-medium shrink-0 text-right">
                      家庭住址
                    </span>
                    <input
                      type="text"
                      disabled={!isEditing}
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                      className="flex-1 px-3.5 py-2 bg-gray-100/70 border border-gray-200/50 rounded-lg text-gray-800 focus:bg-white focus:outline-none focus:border-[#10b981] disabled:text-gray-700"
                    />
                  </div>

                  {/* Row 6: 简介 */}
                  <div className="flex items-start space-x-3">
                    <span className="w-20 text-gray-500 font-medium shrink-0 text-right pt-2">
                      简介
                    </span>
                    <textarea
                      rows={2}
                      disabled={!isEditing}
                      value={formData.bio}
                      onChange={(e) =>
                        setFormData({ ...formData, bio: e.target.value })
                      }
                      className="flex-1 px-3.5 py-2 bg-gray-100/70 border border-gray-200/50 rounded-lg text-gray-800 focus:bg-white focus:outline-none focus:border-[#10b981] disabled:text-gray-700 leading-relaxed resize-none"
                    />
                  </div>

                  {/* Row 7: 身高 & 体重 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <span className="w-20 text-gray-500 font-medium shrink-0 text-right">
                        身高
                      </span>
                      <input
                        type="text"
                        disabled={!isEditing}
                        value={formData.height}
                        onChange={(e) =>
                          setFormData({ ...formData, height: e.target.value })
                        }
                        className="flex-1 px-3.5 py-2 bg-gray-100/70 border border-gray-200/50 rounded-lg text-gray-800 focus:bg-white focus:outline-none focus:border-[#10b981] disabled:text-gray-700"
                      />
                    </div>

                    <div className="flex items-center space-x-3">
                      <span className="w-16 text-gray-500 font-medium shrink-0 text-right">
                        体重
                      </span>
                      <input
                        type="text"
                        disabled={!isEditing}
                        value={formData.weight}
                        onChange={(e) =>
                          setFormData({ ...formData, weight: e.target.value })
                        }
                        className="flex-1 px-3.5 py-2 bg-gray-100/70 border border-gray-200/50 rounded-lg text-gray-800 focus:bg-white focus:outline-none focus:border-[#10b981] disabled:text-gray-700"
                      />
                    </div>
                  </div>

                  {/* Row 8: 民族 & 文化程度 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <span className="w-20 text-gray-500 font-medium shrink-0 text-right">
                        民族
                      </span>
                      <input
                        type="text"
                        disabled={!isEditing}
                        value={formData.ethnicity}
                        onChange={(e) =>
                          setFormData({ ...formData, ethnicity: e.target.value })
                        }
                        className="flex-1 px-3.5 py-2 bg-gray-100/70 border border-gray-200/50 rounded-lg text-gray-800 focus:bg-white focus:outline-none focus:border-[#10b981] disabled:text-gray-700"
                      />
                    </div>

                    <div className="flex items-center space-x-3">
                      <span className="w-16 text-gray-500 font-medium shrink-0 text-right">
                        文化程度
                      </span>
                      <input
                        type="text"
                        disabled={!isEditing}
                        value={formData.education}
                        onChange={(e) =>
                          setFormData({ ...formData, education: e.target.value })
                        }
                        className="flex-1 px-3.5 py-2 bg-gray-100/70 border border-gray-200/50 rounded-lg text-gray-800 focus:bg-white focus:outline-none focus:border-[#10b981] disabled:text-gray-700"
                      />
                    </div>
                  </div>

                  {/* Row 9: 籍贯 & 婚姻情况 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <span className="w-20 text-gray-500 font-medium shrink-0 text-right">
                        籍贯
                      </span>
                      <input
                        type="text"
                        disabled={!isEditing}
                        value={formData.nativePlace}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            nativePlace: e.target.value,
                          })
                        }
                        className="flex-1 px-3.5 py-2 bg-gray-100/70 border border-gray-200/50 rounded-lg text-gray-800 focus:bg-white focus:outline-none focus:border-[#10b981] disabled:text-gray-700"
                      />
                    </div>

                    <div className="flex items-center space-x-3">
                      <span className="w-16 text-gray-500 font-medium shrink-0 text-right">
                        婚姻情况
                      </span>
                      <input
                        type="text"
                        disabled={!isEditing}
                        value={formData.marriage}
                        onChange={(e) =>
                          setFormData({ ...formData, marriage: e.target.value })
                        }
                        className="flex-1 px-3.5 py-2 bg-gray-100/70 border border-gray-200/50 rounded-lg text-gray-800 focus:bg-white focus:outline-none focus:border-[#10b981] disabled:text-gray-700"
                      />
                    </div>
                  </div>

                  {/* Row 10: 职业 */}
                  <div className="flex items-center space-x-3">
                    <span className="w-20 text-gray-500 font-medium shrink-0 text-right">
                      职业
                    </span>
                    <input
                      type="text"
                      disabled={!isEditing}
                      value={formData.occupation}
                      onChange={(e) =>
                        setFormData({ ...formData, occupation: e.target.value })
                      }
                      className="flex-1 px-3.5 py-2 bg-gray-100/70 border border-gray-200/50 rounded-lg text-gray-800 focus:bg-white focus:outline-none focus:border-[#10b981] disabled:text-gray-700"
                    />
                  </div>

                  {/* Row 11: 工作单位 */}
                  <div className="flex items-center space-x-3">
                    <span className="w-20 text-gray-500 font-medium shrink-0 text-right">
                      工作单位
                    </span>
                    <input
                      type="text"
                      disabled={!isEditing}
                      value={formData.company}
                      onChange={(e) =>
                        setFormData({ ...formData, company: e.target.value })
                      }
                      className="flex-1 px-3.5 py-2 bg-gray-100/70 border border-gray-200/50 rounded-lg text-gray-800 focus:bg-white focus:outline-none focus:border-[#10b981] disabled:text-gray-700"
                    />
                  </div>

                  {/* Row 12: 紧急联系人 & 联系人电话 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <span className="w-20 text-gray-500 font-medium shrink-0 text-right">
                        紧急联系人
                      </span>
                      <input
                        type="text"
                        disabled={!isEditing}
                        value={formData.emergencyContact}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            emergencyContact: e.target.value,
                          })
                        }
                        className="flex-1 px-3.5 py-2 bg-gray-100/70 border border-gray-200/50 rounded-lg text-gray-800 focus:bg-white focus:outline-none focus:border-[#10b981] disabled:text-gray-700"
                      />
                    </div>

                    <div className="flex items-center space-x-3">
                      <span className="w-16 text-gray-500 font-medium shrink-0 text-right">
                        联系人电话
                      </span>
                      <input
                        type="text"
                        disabled={!isEditing}
                        value={formData.emergencyPhone}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            emergencyPhone: e.target.value,
                          })
                        }
                        className="flex-1 px-3.5 py-2 bg-gray-100/70 border border-gray-200/50 rounded-lg text-gray-800 focus:bg-white focus:outline-none focus:border-[#10b981] disabled:text-gray-700 font-mono"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2: 其它信息 */}
              <div className="pt-4 border-t border-gray-100">
                <h3 className="text-sm font-semibold text-gray-800 mb-4 tracking-tight">
                  其它信息
                </h3>

                <div className="space-y-4">
                  {/* Row: 状态 & 登录密码 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <span className="w-20 text-gray-500 font-medium shrink-0 text-right">
                        状态
                      </span>
                      <div className="flex items-center space-x-3 flex-1">
                        <span className="px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg font-medium">
                          {formData.status}
                        </span>
                        {isEditing && (
                          <button
                            type="button"
                            onClick={() =>
                              setFormData({
                                ...formData,
                                status:
                                  formData.status === '启用' ? '禁用' : '启用',
                              })
                            }
                            className="text-xs text-gray-500 hover:text-gray-700 underline"
                          >
                            切换状态
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <span className="w-16 text-gray-500 font-medium shrink-0 text-right">
                        登录密码
                      </span>
                      <input
                        type="text"
                        disabled={!isEditing}
                        value={formData.passwordMasked}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            passwordMasked: e.target.value,
                          })
                        }
                        className="flex-1 px-3.5 py-2 bg-gray-100/70 border border-gray-200/50 rounded-lg text-gray-800 focus:bg-white focus:outline-none focus:border-[#10b981] disabled:text-gray-700 font-mono"
                      />
                    </div>
                  </div>

                  {/* Row: 备注 */}
                  <div className="flex items-start space-x-3">
                    <span className="w-20 text-gray-500 font-medium shrink-0 text-right pt-2">
                      备注
                    </span>
                    <textarea
                      rows={2}
                      disabled={!isEditing}
                      value={formData.remarks}
                      onChange={(e) =>
                        setFormData({ ...formData, remarks: e.target.value })
                      }
                      className="flex-1 px-3.5 py-2 bg-gray-100/70 border border-gray-200/50 rounded-lg text-gray-800 focus:bg-white focus:outline-none focus:border-[#10b981] disabled:text-gray-700 leading-relaxed resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Bottom Action Buttons */}
              <div className="pt-4 border-t border-gray-100 flex items-center space-x-3">
                {isEditing ? (
                  <>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-[#10b981] hover:bg-[#059669] text-white rounded-lg font-medium transition-colors shadow-xs flex items-center space-x-1.5"
                    >
                      <Save className="w-4 h-4" />
                      <span>保存修改</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-6 py-2 bg-white hover:bg-gray-50 text-gray-600 border border-gray-200 rounded-lg font-medium transition-colors"
                    >
                      取消编辑
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => setIsEditing(true)}
                      className="px-6 py-2 bg-[#10b981] hover:bg-[#059669] text-white rounded-lg font-medium transition-colors shadow-xs flex items-center space-x-1.5"
                    >
                      <Edit3 className="w-4 h-4" />
                      <span>编辑</span>
                    </button>
                    <button
                      type="button"
                      onClick={onBack}
                      className="px-6 py-2 bg-white hover:bg-gray-50 text-gray-600 border border-gray-200 rounded-lg font-medium transition-colors"
                    >
                      返回
                    </button>
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      ) : (
        /* Secondary Detailed Sub-Tabs (健康信息, 用药信息, 健康数据, 设备信息, 报告信息, 订单信息, 服务记录, etc.) */
        <div className="space-y-4">
          {activeTab === '健康信息' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-4 space-y-5">
                <UserProfileSidebar user={user} />
              </div>
              <div className="lg:col-span-8">
                <HealthInfoTab user={user} onNotice={onNotice} onBack={onBack} />
              </div>
            </div>
          )}

          {activeTab === '用药信息' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-4 space-y-5">
                <UserProfileSidebar user={user} />
              </div>
              <div className="lg:col-span-8">
                <MedicationTab user={user} onNotice={onNotice} />
              </div>
            </div>
          )}

          {activeTab === '健康数据' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-4 space-y-5">
                <UserProfileSidebar user={user} />
              </div>
              <div className="lg:col-span-8">
                <HealthMetricsTab user={user} onNotice={onNotice} />
              </div>
            </div>
          )}

          {activeTab === '设备信息' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-4 space-y-5">
                <UserProfileSidebar user={user} />
              </div>
              <div className="lg:col-span-8">
                <DeviceListTab user={user} onNotice={onNotice} />
              </div>
            </div>
          )}

          {activeTab === '报告信息' && (
            <ReportInfoTab user={user} onNotice={onNotice} />
          )}

          {activeTab === '订单信息' && (
            <OrderInfoTab user={user} onNotice={onNotice} />
          )}

          {activeTab === '资产信息' && (
            <AssetInfoTab user={user} onNotice={onNotice} />
          )}

          {activeTab === '内容信息' && (
            <ContentInfoTab user={user} onNotice={onNotice} />
          )}

          {activeTab === '服务记录' && (
            <ServiceRecordTab user={user} onNotice={onNotice} />
          )}
        </div>
      )}
    </div>
  );
};
