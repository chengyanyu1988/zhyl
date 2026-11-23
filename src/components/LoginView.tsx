import React, { useState } from 'react';
import { HeartHandshake, Shield, Eye, EyeOff } from 'lucide-react';

interface LoginViewProps {
  onLoginSuccess: (user: { name: string; role: string; email: string }) => void;
  onNotice: (msg: string) => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLoginSuccess, onNotice }) => {
  const [account, setAccount] = useState('admin');
  const [password, setPassword] = useState('123456');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreeTerms) {
      onNotice('请先勾选同意《用户隐私政策》');
      return;
    }

    if (!account.trim()) {
      onNotice('请输入账号');
      return;
    }

    if (!password) {
      onNotice('请输入密码');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const loggedUser = {
        name: account === 'admin' ? '系统超级管理员' : account,
        role: '智慧养老管理员',
        email: `${account}@elderlycare.gov.cn`,
      };

      onNotice(`登录成功！欢迎回来，${loggedUser.name}`);
      onLoginSuccess(loggedUser);
    }, 600);
  };

  return (
    <div className="min-h-screen w-screen relative flex items-center justify-center p-6 font-sans select-none overflow-hidden">
      {/* 智慧养老底图背景 */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 scale-105 filter blur-[1px]"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=2000&q=80')`
        }}
      ></div>

      {/* Dark & Emerald Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/90 via-emerald-950/80 to-teal-900/75 z-10 backdrop-blur-[2px]"></div>

      {/* Centered Login Window */}
      <div className="relative z-20 w-full max-w-md bg-white/95 backdrop-blur-xl rounded-3xl p-8 lg:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.4)] border border-white/30 flex flex-col justify-between">
        <div className="space-y-6">
          
          {/* Logo & Header */}
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#34d399] via-[#10b981] to-[#059669] flex items-center justify-center text-white shadow-lg shadow-emerald-500/25">
              <HeartHandshake className="w-8 h-8 stroke-[2.2]" />
            </div>
            <div>
              <h1 className="text-xl lg:text-2xl font-bold text-gray-900 tracking-tight">
                智慧养老服务云平台
              </h1>
              <p className="text-xs text-gray-500 mt-1">
                Smart Senior Care Comprehensive Management Center
              </p>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs pt-2">
            {/* Account Input */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-gray-700 block">
                登录账号
              </label>
              <input
                type="text"
                value={account}
                onChange={(e) => setAccount(e.target.value)}
                placeholder="请输入登录账号"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder:text-gray-400 focus:bg-white focus:border-[#36d399] focus:ring-2 focus:ring-[#36d399]/20 focus:outline-none transition-all text-xs"
              />
            </div>

            {/* Password Input */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-gray-700 block">
                登录密码
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="请输入密码"
                  className="w-full pl-4 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder:text-gray-400 focus:bg-white focus:border-[#36d399] focus:ring-2 focus:ring-[#36d399]/20 focus:outline-none transition-all text-xs font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
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
                  className="text-[#10b981] hover:underline font-semibold ml-0.5"
                >
                  《用户隐私政策》
                </button>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-gradient-to-r from-[#34d399] to-[#059669] hover:from-[#20c085] hover:to-[#047857] text-white font-bold rounded-xl text-sm shadow-md shadow-emerald-500/25 transition-all active:scale-[0.99] flex items-center justify-center mt-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin"></div>
              ) : (
                '登 录 系 统'
              )}
            </button>
          </form>

          {/* Forgot Password Note */}
          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => onNotice('忘记密码请联系超级管理员重置 (内线电话: 8088)')}
              className="text-[11px] text-gray-400 hover:text-gray-600 transition-colors"
            >
              忘记密码请联系管理员
            </button>
          </div>
        </div>
      </div>

      {/* Privacy Modal */}
      {showPrivacyModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
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
