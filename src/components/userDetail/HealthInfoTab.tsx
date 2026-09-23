import React, { useState } from 'react';
import { Edit3, Save, RotateCcw, AlertCircle } from 'lucide-react';
import { AppUser } from '../../types';
import { HealthInfoData, INITIAL_HEALTH_INFO } from '../../data/healthData';

interface HealthInfoTabProps {
  user: AppUser;
  onNotice: (msg: string) => void;
  onBack: () => void;
}

export const HealthInfoTab: React.FC<HealthInfoTabProps> = ({
  user,
  onNotice,
  onBack,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<HealthInfoData>(INITIAL_HEALTH_INFO);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    onNotice(`已成功保存【${user.realName || user.name}】的健康档案信息`);
  };

  const handleCancel = () => {
    setFormData(INITIAL_HEALTH_INFO);
    setIsEditing(false);
    onNotice('已取消编辑健康信息');
  };

  return (
    <form onSubmit={handleSave} className="space-y-6 text-xs">
      {/* 身体数据 (Physical Data) */}
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-4">
        <div className="flex items-center space-x-2 border-b border-gray-100 pb-3">
          <span className="w-1.5 h-3.5 bg-[#10b981] rounded-full"></span>
          <h3 className="text-sm font-semibold text-gray-800">身体数据</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="space-y-1.5">
            <span className="text-gray-500 font-medium">身高 (cm)</span>
            <input
              type="text"
              disabled={!isEditing}
              value={formData.height}
              onChange={(e) => setFormData({ ...formData, height: e.target.value })}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200/80 rounded-lg text-gray-800 focus:bg-white focus:outline-none focus:border-[#10b981] disabled:text-gray-700 font-mono"
            />
          </div>

          <div className="space-y-1.5">
            <span className="text-gray-500 font-medium">体重 (kg)</span>
            <input
              type="text"
              disabled={!isEditing}
              value={formData.weight}
              onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200/80 rounded-lg text-gray-800 focus:bg-white focus:outline-none focus:border-[#10b981] disabled:text-gray-700 font-mono"
            />
          </div>

          <div className="space-y-1.5">
            <span className="text-gray-500 font-medium">血型</span>
            <select
              disabled={!isEditing}
              value={formData.bloodType}
              onChange={(e) => setFormData({ ...formData, bloodType: e.target.value })}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200/80 rounded-lg text-gray-800 focus:bg-white focus:outline-none focus:border-[#10b981] disabled:text-gray-700"
            >
              <option value="A型">A型</option>
              <option value="B型">B型</option>
              <option value="AB型">AB型</option>
              <option value="O型">O型</option>
              <option value="未测">未测</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <span className="text-gray-500 font-medium">RH阴性</span>
            <select
              disabled={!isEditing}
              value={formData.rhNegative}
              onChange={(e) => setFormData({ ...formData, rhNegative: e.target.value })}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200/80 rounded-lg text-gray-800 focus:bg-white focus:outline-none focus:border-[#10b981] disabled:text-gray-700"
            >
              <option value="否">否 (RH阳性)</option>
              <option value="是">是 (熊猫血)</option>
              <option value="未知">未知</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <span className="text-gray-500 font-medium">慢性病记录</span>
            <input
              type="text"
              disabled={!isEditing}
              value={formData.chronicDiseases.join('、')}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  chronicDiseases: e.target.value.split(/[,、，]/).map((s) => s.trim()).filter(Boolean),
                })
              }
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200/80 rounded-lg text-gray-800 focus:bg-white focus:outline-none focus:border-[#10b981] disabled:text-gray-700"
            />
          </div>
        </div>
      </div>

      {/* 生活习惯 (Living Habits) */}
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-4">
        <div className="flex items-center space-x-2 border-b border-gray-100 pb-3">
          <span className="w-1.5 h-3.5 bg-[#10b981] rounded-full"></span>
          <h3 className="text-sm font-semibold text-gray-800">生活习惯</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="space-y-1.5">
            <span className="text-gray-500 font-medium">睡眠质量</span>
            <input
              type="text"
              disabled={!isEditing}
              value={formData.sleepQuality}
              onChange={(e) => setFormData({ ...formData, sleepQuality: e.target.value })}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200/80 rounded-lg text-gray-800 focus:bg-white focus:outline-none focus:border-[#10b981] disabled:text-gray-700"
            />
          </div>

          <div className="space-y-1.5">
            <span className="text-gray-500 font-medium">吸烟频率</span>
            <input
              type="text"
              disabled={!isEditing}
              value={formData.smokeFrequency}
              onChange={(e) => setFormData({ ...formData, smokeFrequency: e.target.value })}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200/80 rounded-lg text-gray-800 focus:bg-white focus:outline-none focus:border-[#10b981] disabled:text-gray-700"
            />
          </div>

          <div className="space-y-1.5">
            <span className="text-gray-500 font-medium">饮酒频率</span>
            <input
              type="text"
              disabled={!isEditing}
              value={formData.drinkFrequency}
              onChange={(e) => setFormData({ ...formData, drinkFrequency: e.target.value })}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200/80 rounded-lg text-gray-800 focus:bg-white focus:outline-none focus:border-[#10b981] disabled:text-gray-700"
            />
          </div>

          <div className="space-y-1.5">
            <span className="text-gray-500 font-medium">运动频率</span>
            <input
              type="text"
              disabled={!isEditing}
              value={formData.sportFrequency}
              onChange={(e) => setFormData({ ...formData, sportFrequency: e.target.value })}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200/80 rounded-lg text-gray-800 focus:bg-white focus:outline-none focus:border-[#10b981] disabled:text-gray-700"
            />
          </div>

          <div className="space-y-1.5">
            <span className="text-gray-500 font-medium">饮食偏好</span>
            <input
              type="text"
              disabled={!isEditing}
              value={formData.dietPreference}
              onChange={(e) => setFormData({ ...formData, dietPreference: e.target.value })}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200/80 rounded-lg text-gray-800 focus:bg-white focus:outline-none focus:border-[#10b981] disabled:text-gray-700"
            />
          </div>
        </div>
      </div>

      {/* 健康史 (Medical & Health History) */}
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-4">
        <div className="flex items-center space-x-2 border-b border-gray-100 pb-3">
          <span className="w-1.5 h-3.5 bg-[#10b981] rounded-full"></span>
          <h3 className="text-sm font-semibold text-gray-800">健康史</h3>
        </div>

        <div className="space-y-3.5">
          <div className="flex items-start space-x-3">
            <span className="w-24 text-gray-500 font-medium shrink-0 pt-2 text-right">既往病史</span>
            <textarea
              rows={2}
              disabled={!isEditing}
              value={formData.pastIllness}
              onChange={(e) => setFormData({ ...formData, pastIllness: e.target.value })}
              className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200/80 rounded-lg text-gray-800 focus:bg-white focus:outline-none focus:border-[#10b981] disabled:text-gray-700 leading-relaxed resize-none"
            />
          </div>

          <div className="flex items-start space-x-3">
            <span className="w-24 text-gray-500 font-medium shrink-0 pt-2 text-right">家族遗传史</span>
            <textarea
              rows={2}
              disabled={!isEditing}
              value={formData.familyHistory}
              onChange={(e) => setFormData({ ...formData, familyHistory: e.target.value })}
              className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200/80 rounded-lg text-gray-800 focus:bg-white focus:outline-none focus:border-[#10b981] disabled:text-gray-700 leading-relaxed resize-none"
            />
          </div>

          <div className="flex items-start space-x-3">
            <span className="w-24 text-gray-500 font-medium shrink-0 pt-2 text-right">过敏史</span>
            <textarea
              rows={2}
              disabled={!isEditing}
              value={formData.allergyHistory}
              onChange={(e) => setFormData({ ...formData, allergyHistory: e.target.value })}
              className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200/80 rounded-lg text-gray-800 focus:bg-white focus:outline-none focus:border-[#10b981] disabled:text-gray-700 leading-relaxed resize-none"
            />
          </div>

          <div className="flex items-start space-x-3">
            <span className="w-24 text-gray-500 font-medium shrink-0 pt-2 text-right">就诊史</span>
            <textarea
              rows={2}
              disabled={!isEditing}
              value={formData.medicalHistory}
              onChange={(e) => setFormData({ ...formData, medicalHistory: e.target.value })}
              className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200/80 rounded-lg text-gray-800 focus:bg-white focus:outline-none focus:border-[#10b981] disabled:text-gray-700 leading-relaxed resize-none"
            />
          </div>
        </div>
      </div>

      {/* Bottom Action Buttons */}
      <div className="flex items-center space-x-3 pt-2">
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
              onClick={handleCancel}
              className="px-6 py-2 bg-white hover:bg-gray-50 text-gray-600 border border-gray-200 rounded-lg font-medium transition-colors"
            >
              取消
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
  );
};
