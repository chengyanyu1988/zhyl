import React, { useState } from 'react';
import { Check, CheckCircle2 } from 'lucide-react';

interface GrowthRuleManagementProps {
  onNotice: (msg: string) => void;
}

export const GrowthRuleManagement: React.FC<GrowthRuleManagementProps> = ({ onNotice }) => {
  // Activity growth points (Matches Screenshot 6)
  const [registerChecked, setRegisterChecked] = useState(true);
  const [registerPoints, setRegisterPoints] = useState('100');

  const [loginChecked, setLoginChecked] = useState(true);
  const [loginPoints, setLoginPoints] = useState('100');

  const [likeChecked, setLikeChecked] = useState(true);
  const [likePoints, setLikePoints] = useState('100');

  const [favChecked, setFavChecked] = useState(true);
  const [favPoints, setFavPoints] = useState('100');

  const [shareChecked, setShareChecked] = useState(true);
  const [sharePoints, setSharePoints] = useState('100');

  const [commentChecked, setCommentChecked] = useState(true);
  const [commentPoints, setCommentPoints] = useState('100');

  const [postChecked, setPostChecked] = useState(true);
  const [postPoints, setPostPoints] = useState('100');

  // Order acquisition rule
  const [orderRuleType, setOrderRuleType] = useState<'spend' | 'count'>('spend');
  const [spendAmount, setSpendAmount] = useState('1000');
  const [spendPoints, setSpendPoints] = useState('100');
  const [orderCount, setOrderCount] = useState('1');
  const [orderPoints, setOrderPoints] = useState('50');

  // Validity
  const [validityType, setValidityType] = useState<'permanent' | 'days'>('permanent');
  const [validityDays, setValidityDays] = useState('365');

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
    onNotice('已成功保存长者成长值规则配置，会员等级将依据新规则实时计算');
  };

  return (
    <div className="p-6 max-w-[1600px] mx-auto text-xs">
      <div className="bg-white rounded-xl p-8 border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-2.5 pb-5 border-b border-gray-100">
          <span className="w-1 h-4 bg-[#10b981] rounded-full"></span>
          <h1 className="text-sm font-semibold text-gray-800">成长值规则</h1>
        </div>

        <form onSubmit={handleSave} className="space-y-5 max-w-2xl">
          {/* 注册 */}
          <div className="flex items-center">
            <label className="w-24 text-gray-600">注册</label>
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={registerChecked}
                onChange={(e) => setRegisterChecked(e.target.checked)}
                className="rounded text-[#10b981] accent-[#10b981]"
              />
              <span className="text-gray-600">获取</span>
              <input
                type="number"
                value={registerPoints}
                onChange={(e) => setRegisterPoints(e.target.value)}
                disabled={!registerChecked}
                className="w-36 px-3 py-1.5 border border-gray-200 rounded-md text-gray-800 text-xs font-mono disabled:bg-gray-50 focus:outline-none focus:border-[#10b981]"
              />
            </div>
          </div>

          {/* 登录 */}
          <div className="flex items-center">
            <label className="w-24 text-gray-600">登录</label>
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={loginChecked}
                onChange={(e) => setLoginChecked(e.target.checked)}
                className="rounded text-[#10b981] accent-[#10b981]"
              />
              <span className="text-gray-600">获取</span>
              <input
                type="number"
                value={loginPoints}
                onChange={(e) => setLoginPoints(e.target.value)}
                disabled={!loginChecked}
                className="w-36 px-3 py-1.5 border border-gray-200 rounded-md text-gray-800 text-xs font-mono disabled:bg-gray-50 focus:outline-none focus:border-[#10b981]"
              />
            </div>
          </div>

          {/* 点赞 */}
          <div className="flex items-center">
            <label className="w-24 text-gray-600">点赞</label>
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={likeChecked}
                onChange={(e) => setLikeChecked(e.target.checked)}
                className="rounded text-[#10b981] accent-[#10b981]"
              />
              <span className="text-gray-600">获取</span>
              <input
                type="number"
                value={likePoints}
                onChange={(e) => setLikePoints(e.target.value)}
                disabled={!likeChecked}
                className="w-36 px-3 py-1.5 border border-gray-200 rounded-md text-gray-800 text-xs font-mono disabled:bg-gray-50 focus:outline-none focus:border-[#10b981]"
              />
            </div>
          </div>

          {/* 收藏 */}
          <div className="flex items-center">
            <label className="w-24 text-gray-600">收藏</label>
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={favChecked}
                onChange={(e) => setFavChecked(e.target.checked)}
                className="rounded text-[#10b981] accent-[#10b981]"
              />
              <span className="text-gray-600">获取</span>
              <input
                type="number"
                value={favPoints}
                onChange={(e) => setFavPoints(e.target.value)}
                disabled={!favChecked}
                className="w-36 px-3 py-1.5 border border-gray-200 rounded-md text-gray-800 text-xs font-mono disabled:bg-gray-50 focus:outline-none focus:border-[#10b981]"
              />
            </div>
          </div>

          {/* 分享 */}
          <div className="flex items-center">
            <label className="w-24 text-gray-600">分享</label>
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={shareChecked}
                onChange={(e) => setShareChecked(e.target.checked)}
                className="rounded text-[#10b981] accent-[#10b981]"
              />
              <span className="text-gray-600">获取</span>
              <input
                type="number"
                value={sharePoints}
                onChange={(e) => setSharePoints(e.target.value)}
                disabled={!shareChecked}
                className="w-36 px-3 py-1.5 border border-gray-200 rounded-md text-gray-800 text-xs font-mono disabled:bg-gray-50 focus:outline-none focus:border-[#10b981]"
              />
            </div>
          </div>

          {/* 评论 */}
          <div className="flex items-center">
            <label className="w-24 text-gray-600">评论</label>
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={commentChecked}
                onChange={(e) => setCommentChecked(e.target.checked)}
                className="rounded text-[#10b981] accent-[#10b981]"
              />
              <span className="text-gray-600">获取</span>
              <input
                type="number"
                value={commentPoints}
                onChange={(e) => setCommentPoints(e.target.value)}
                disabled={!commentChecked}
                className="w-36 px-3 py-1.5 border border-gray-200 rounded-md text-gray-800 text-xs font-mono disabled:bg-gray-50 focus:outline-none focus:border-[#10b981]"
              />
            </div>
          </div>

          {/* 发布动态 */}
          <div className="flex items-center">
            <label className="w-24 text-gray-600">发布动态</label>
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={postChecked}
                onChange={(e) => setPostChecked(e.target.checked)}
                className="rounded text-[#10b981] accent-[#10b981]"
              />
              <span className="text-gray-600">获取</span>
              <input
                type="number"
                value={postPoints}
                onChange={(e) => setPostPoints(e.target.value)}
                disabled={!postChecked}
                className="w-36 px-3 py-1.5 border border-gray-200 rounded-md text-gray-800 text-xs font-mono disabled:bg-gray-50 focus:outline-none focus:border-[#10b981]"
              />
            </div>
          </div>

          {/* 订单获取规则 */}
          <div className="flex items-start pt-2">
            <label className="w-24 pt-2 text-gray-600">订单获取规则</label>
            <div className="flex-1 space-y-3">
              <div className="flex items-center space-x-3">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="orderRule"
                    checked={orderRuleType === 'spend'}
                    onChange={() => setOrderRuleType('spend')}
                    className="text-[#10b981] accent-[#10b981]"
                  />
                  <span className="text-gray-700">每消费</span>
                </label>
                <input
                  type="number"
                  value={spendAmount}
                  onChange={(e) => setSpendAmount(e.target.value)}
                  disabled={orderRuleType !== 'spend'}
                  className="w-28 px-3 py-1.5 border border-gray-200 rounded-md text-gray-800 text-xs font-mono disabled:bg-gray-50 focus:outline-none focus:border-[#10b981]"
                />
                <span className="text-gray-600">元 获取</span>
                <input
                  type="number"
                  value={spendPoints}
                  onChange={(e) => setSpendPoints(e.target.value)}
                  disabled={orderRuleType !== 'spend'}
                  className="w-28 px-3 py-1.5 border border-gray-200 rounded-md text-gray-800 text-xs font-mono disabled:bg-gray-50 focus:outline-none focus:border-[#10b981]"
                />
                <span className="text-gray-600">分</span>
              </div>

              <div className="flex items-center space-x-3">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="orderRule"
                    checked={orderRuleType === 'count'}
                    onChange={() => setOrderRuleType('count')}
                    className="text-[#10b981] accent-[#10b981]"
                  />
                  <span className="text-gray-700">每消费</span>
                </label>
                <span className="text-gray-600">笔 获取</span>
                <input
                  type="number"
                  value={orderPoints}
                  onChange={(e) => setOrderPoints(e.target.value)}
                  disabled={orderRuleType !== 'count'}
                  className="w-28 px-3 py-1.5 border border-gray-200 rounded-md text-gray-800 text-xs font-mono disabled:bg-gray-50 focus:outline-none focus:border-[#10b981]"
                />
                <span className="text-gray-600">分</span>
              </div>
            </div>
          </div>

          {/* 有效期 */}
          <div className="flex items-start pt-2">
            <label className="w-24 pt-1.5 text-gray-600">有效期</label>
            <div className="flex-1 space-y-3">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="growthValidity"
                  checked={validityType === 'permanent'}
                  onChange={() => setValidityType('permanent')}
                  className="text-[#10b981] accent-[#10b981]"
                />
                <span className="text-gray-700">永久有效</span>
              </label>

              <div className="flex items-center space-x-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="growthValidity"
                    checked={validityType === 'days'}
                    onChange={() => setValidityType('days')}
                    className="text-[#10b981] accent-[#10b981]"
                  />
                  <span className="text-gray-700">获取后</span>
                </label>
                <input
                  type="number"
                  value={validityDays}
                  onChange={(e) => setValidityDays(e.target.value)}
                  disabled={validityType !== 'days'}
                  className="w-24 px-3 py-1.5 border border-gray-200 rounded-md text-gray-800 text-xs font-mono disabled:bg-gray-50 focus:outline-none focus:border-[#10b981]"
                />
                <span className="text-gray-600">天 内有效</span>
              </div>
            </div>
          </div>

          {/* Bottom Save Action */}
          <div className="pt-6 border-t border-gray-100 flex items-center space-x-3">
            <button
              type="submit"
              className="px-6 py-2 bg-[#10b981] text-white rounded-md hover:bg-[#059669] font-medium transition-colors"
            >
              保存
            </button>
            {savedSuccess && (
              <span className="flex items-center text-emerald-600 space-x-1 font-medium">
                <CheckCircle2 className="w-4 h-4" />
                <span>成长值规则已更新并重新结算长者等级</span>
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
