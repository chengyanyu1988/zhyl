import React, { useState } from 'react';
import { HeartHandshake, Shield, User, Lock, Eye, EyeOff, Sparkles } from 'lucide-react';

interface LoginViewProps {
  onLoginSuccess: (user: { name: string; role: string; email: string }) => void;
  onNotice: (msg: string) => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLoginSuccess, onNotice }) => {
  const [account, setAccount] = useState('13800138000');
  const [password, setPassword] = useState('123456');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  // Quick Demo Accounts
  const demoAccounts = [
    { name: '超级管理员', username: '13800138000', role: '系统超级管理员', email: 'admin@elderlycare.gov.cn' },
    { name: '护理调度员', username: '13900139000', role: '护理与工单调度专员', email: 'service@elderlycare.gov.cn' },
    { name: '数据分析师', username: '13700137000', role: '运营与财务主管', email: 'data@elderlycare.gov.cn' },
  ];

  const handleSelectDemoAccount = (acc: (typeof demoAccounts)[0]) => {
    setAccount(acc.username);
    setPassword('123456');
    onNotice(`已自动填入【${acc.name}】登录信息`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreeTerms) {
      onNotice('请先勾选同意《用户隐私政策》');
      return;
    }

    if (!account.trim()) {
      onNotice('请输入手机号码或账号');
      return;
    }

    if (!password) {
      onNotice('请输入密码');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const selectedDemo = demoAccounts.find((a) => a.username === account);
      const loggedUser = selectedDemo || {
        name: account === '13800138000' || account === 'admin' ? '超级管理员' : account,
        role: '智慧养老管理员',
        email: `${account}@elderlycare.gov.cn`,
      };

      onNotice(`登录成功！欢迎回来，${loggedUser.name}`);
      onLoginSuccess(loggedUser);
    }, 600);
  };

  return (
    <div className="min-h-screen w-screen bg-[#eef8f6] flex items-center justify-center p-6 relative select-none font-sans">
      {/* Centered Main Layout Matching Reference Screenshot */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Brand Title & Vector Illustration */}
        <div className="md:col-span-6 flex flex-col items-center text-center space-y-6 py-4">
          <div className="space-y-3">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 tracking-tight">
              智慧养老后台管理系统
            </h1>
            <div className="text-xs lg:text-sm text-gray-500 font-normal leading-relaxed max-w-md mx-auto space-y-1">
              <p>智能健康信息及服务管理；</p>
              <p>实现资源的优化配置和管理，降低运营成本。</p>
            </div>
          </div>

          {/* SVG Doctor & Health Card Vector Graphic Matching Reference */}
          <div className="w-full max-w-xs relative pt-4">
            <svg
              viewBox="0 0 320 220"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto drop-shadow-sm"
            >
              {/* Bottom Green Base Line */}
              <rect x="20" y="200" width="280" height="4" rx="2" fill="#36d399" />

              {/* Floating Pill Left */}
              <g className="animate-pulse">
                <rect x="42" y="100" width="12" height="24" rx="6" fill="#36d399" />
                <rect x="42" y="112" width="12" height="12" rx="0" fill="#a7f3d0" />
                <circle cx="48" cy="142" r="8" fill="#a7f3d0" />
                <path d="M48 138V146M44 142H52" stroke="#059669" strokeWidth="2" strokeLinecap="round" />
              </g>

              {/* Floating Minus Badge Top */}
              <circle cx="160" cy="30" r="8" fill="#a7f3d0" />
              <path d="M155 30H165" stroke="#059669" strokeWidth="2" strokeLinecap="round" />

              {/* Health Card / Record Board */}
              <rect x="120" y="45" width="120" height="150" rx="10" fill="#a7f3d0" />
              <rect x="124" y="49" width="112" height="142" rx="8" fill="#10b981" />
              
              {/* Card Dots Top */}
              <circle cx="218" cy="58" r="2" fill="white" opacity="0.8" />
              <circle cx="225" cy="58" r="2" fill="white" opacity="0.8" />
              <circle cx="232" cy="58" r="2" fill="white" opacity="0.8" />

              {/* Card Profile Section Inner */}
              <rect x="132" y="68" width="100" height="38" rx="6" fill="white" />
              <rect x="138" y="74" width="22" height="26" rx="4" fill="#a7f3d0" />
              <circle cx="149" cy="83" r="5" fill="#059669" />
              <path d="M141 96C141 92 144 90 149 90C154 90 157 92 157 96" fill="#059669" />

              <rect x="168" y="76" width="56" height="4" rx="2" fill="#36d399" />
              <rect x="168" y="85" width="40" height="3" rx="1.5" fill="#a7f3d0" />
              <rect x="168" y="93" width="48" height="3" rx="1.5" fill="#a7f3d0" />

              {/* Checkbox Rows */}
              <rect x="222" y="120" width="8" height="8" rx="1" stroke="white" strokeWidth="1.5" fill="none" />
              <rect x="138" y="122" width="70" height="3" rx="1.5" fill="white" opacity="0.9" />

              <rect x="222" y="138" width="8" height="8" rx="1" stroke="white" strokeWidth="1.5" fill="none" />
              <rect x="138" y="140" width="60" height="3" rx="1.5" fill="white" opacity="0.9" />

              <rect x="222" y="156" width="8" height="8" rx="1" stroke="white" strokeWidth="1.5" fill="none" />
              <rect x="138" y="158" width="75" height="3" rx="1.5" fill="white" opacity="0.9" />

              {/* Doctor / Nurse Figure */}
              <g>
                {/* Body / Doctor Coat */}
                <path d="M100 200V175C100 165 110 155 125 155H145C160 155 170 165 170 175V200H100Z" fill="white" />
                <path d="M125 155L135 175L145 155" stroke="#3b82f6" strokeWidth="3" />
                {/* Hair */}
                <path d="M120 135C120 120 130 115 135 115C140 115 150 120 150 135V145H120V135Z" fill="#78350f" />
                {/* Head */}
                <circle cx="135" cy="138" r="14" fill="#fde047" opacity="0.4" />
                <circle cx="135" cy="138" r="12" fill="#fed7aa" />
                {/* Medical Mask */}
                <rect x="125" y="138" width="20" height="11" rx="3" fill="white" stroke="#93c5fd" strokeWidth="1" />
                
                {/* Stethoscope / Card folder in hand */}
                <rect x="110" y="165" width="24" height="35" rx="3" fill="#3b82f6" transform="rotate(-15 110 165)" />
                <circle cx="118" cy="180" r="5" fill="#fde047" transform="rotate(-15 110 165)" />
              </g>
            </svg>
          </div>
        </div>

        {/* Right Column: Clean White Login Card */}
        <div className="md:col-span-6 flex justify-center">
          <div className="w-full max-w-sm bg-white rounded-3xl p-8 lg:p-10 shadow-xl shadow-emerald-900/5 border border-white flex flex-col justify-between min-h-[460px]">
            <div className="space-y-6">
              
              {/* Logo & Header */}
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#34d399] via-[#10b981] to-[#059669] flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
                  <HeartHandshake className="w-7 h-7 stroke-[2.2]" />
                </div>
                <h2 className="text-xl font-bold text-gray-800 tracking-tight">
                  欢迎登录
                </h2>
              </div>

              {/* Login Form (Strictly Password Only as requested) */}
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                {/* Account / Phone Input */}
                <div className="relative">
                  <input
                    type="text"
                    value={account}
                    onChange={(e) => setAccount(e.target.value)}
                    placeholder="请输入手机号码"
                    className="w-full px-4 py-3 bg-[#f2f9f6] border border-transparent rounded-xl text-gray-800 placeholder:text-gray-400 focus:bg-white focus:border-[#36d399] focus:outline-none transition-all text-xs"
                  />
                </div>

                {/* Password Input */}
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="请输入密码"
                    className="w-full pl-4 pr-10 py-3 bg-[#f2f9f6] border border-transparent rounded-xl text-gray-800 placeholder:text-gray-400 focus:bg-white focus:border-[#36d399] focus:outline-none transition-all text-xs font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {/* Agreement Checkbox */}
                <div className="flex items-center space-x-2 pt-1 text-[11px] text-gray-600">
                  <input
                    type="checkbox"
                    id="privacy-check"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="w-3.5 h-3.5 rounded border-gray-300 text-[#36d399] focus:ring-[#36d399] accent-[#36d399]"
                  />
                  <label htmlFor="privacy-check" className="cursor-pointer select-none">
                    我已阅读并同意
                    <button
                      type="button"
                      onClick={() => setShowPrivacyModal(true)}
                      className="text-[#36d399] hover:underline font-medium ml-0.5"
                    >
                      《用户隐私政策》
                    </button>
                  </label>
                </div>

                {/* Submit Button matching Emerald Green Pill style */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-[#36d399] hover:bg-[#20c085] text-white font-bold rounded-xl text-sm shadow-md shadow-emerald-500/15 transition-all active:scale-[0.99] flex items-center justify-center"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    '登录'
                  )}
                </button>
              </form>

              {/* Forgot Password Note */}
              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={() => onNotice('忘记密码请联系超级管理员重置 (内线电话: 8088)')}
                  className="text-[11px] text-gray-400 hover:text-gray-600 transition-colors"
                >
                  忘记密码请联系管理员
                </button>
              </div>
            </div>

            {/* Demo Accounts Quick Fill Footer */}
            <div className="pt-4 border-t border-gray-100 mt-4">
              <div className="flex items-center justify-between text-[10px] text-gray-400 mb-2">
                <span className="flex items-center space-x-1">
                  <Sparkles className="w-3 h-3 text-[#36d399]" />
                  <span>快捷填入测试账号：</span>
                </span>
              </div>
              <div className="grid grid-cols-3 gap-1.5 text-[10px]">
                {demoAccounts.map((acc) => (
                  <button
                    key={acc.username}
                    type="button"
                    onClick={() => handleSelectDemoAccount(acc)}
                    className="py-1.5 px-2 bg-gray-50 hover:bg-[#eef8f6] hover:text-[#059669] border border-gray-100 rounded-lg text-gray-600 truncate text-center transition-colors font-medium"
                  >
                    {acc.name}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Privacy Modal */}
      {showPrivacyModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100 font-bold text-sm text-gray-800">
              <span className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-[#36d399]" />
                <span>智慧养老后台管理系统 用户隐私政策</span>
              </span>
            </div>
            <div className="max-h-60 overflow-y-auto space-y-2 text-gray-600 leading-relaxed pr-1">
              <p>1. 本系统严格遵循国家关于个人信息与健康档案数据的保护规定。</p>
              <p>2. 所有长者身体体征数据、护理评估记录与家庭地址均进行高强度加密存储。</p>
              <p>3. 账号操作行为将被系统安全审计规范记录，以保障养老服务的合法合规。</p>
            </div>
            <div className="pt-3 border-t border-gray-100 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setAgreeTerms(true);
                  setShowPrivacyModal(false);
                }}
                className="px-5 py-1.5 bg-[#36d399] text-white rounded-lg font-medium hover:bg-[#20c085]"
              >
                我已阅读并同意
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
