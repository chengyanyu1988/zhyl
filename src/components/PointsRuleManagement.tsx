import React, { useState } from 'react';
import { Check, CheckCircle2, ShoppingBag } from 'lucide-react';

interface PointsRuleManagementProps {
  onNotice: (msg: string) => void;
}

export const PointsRuleManagement: React.FC<PointsRuleManagementProps> = ({ onNotice }) => {
  // Form state (Matches Screenshot 5: 积分规则)
  const [ruleType, setRuleType] = useState<'amount' | 'order'>('amount');
  const [spendAmount, setSpendAmount] = useState('10');
  const [amountPoints, setAmountPoints] = useState('1');
  const [orderPoints, setOrderPoints] = useState('5');

  const [validityType, setValidityType] = useState<'permanent' | 'days'>('permanent');
  const [validityDays, setValidityDays] = useState('365');

  const [deductPoints, setDeductPoints] = useState('100'); // 100分抵扣1元
  const [hasDeductLimit, setHasDeductLimit] = useState(false);
  const [maxDeductPoints, setMaxDeductPoints] = useState('500');

  const [specifyProduct, setSpecifyProduct] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
    onNotice('已成功保存长者敬老健康积分规则并实时同步生效');
  };

  return (
    <div className="p-6 max-w-[1600px] mx-auto text-xs">
      <div className="bg-white rounded-xl p-8 border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-2.5 pb-5 border-b border-gray-100">
          <span className="w-1 h-4 bg-[#10b981] rounded-full"></span>
          <h1 className="text-sm font-semibold text-gray-800">积分规则</h1>
        </div>

        <form onSubmit={handleSave} className="space-y-6 max-w-3xl">
          {/* 获取规则 */}
          <div className="flex items-start">
            <label className="w-24 pt-2 text-gray-600">获取规则</label>
            <div className="flex-1 space-y-3">
              {/* 每消费 N 元 获取 N 分 */}
              <div className="flex items-center space-x-3">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="pointsRule"
                    checked={ruleType === 'amount'}
                    onChange={() => setRuleType('amount')}
                    className="text-[#10b981] accent-[#10b981]"
                  />
                  <span className="text-gray-700">每消费</span>
                </label>
                <input
                  type="number"
                  value={spendAmount}
                  onChange={(e) => setSpendAmount(e.target.value)}
                  disabled={ruleType !== 'amount'}
                  className="w-28 px-3 py-1.5 border border-gray-200 rounded-md text-gray-800 text-xs font-mono disabled:bg-gray-50 focus:outline-none focus:border-[#10b981]"
                />
                <span className="text-gray-600">元 获取</span>
                <input
                  type="number"
                  value={amountPoints}
                  onChange={(e) => setAmountPoints(e.target.value)}
                  disabled={ruleType !== 'amount'}
                  className="w-28 px-3 py-1.5 border border-gray-200 rounded-md text-gray-800 text-xs font-mono disabled:bg-gray-50 focus:outline-none focus:border-[#10b981]"
                />
                <span className="text-gray-600">分</span>
              </div>

              {/* 每消费 1 笔 获取 N 分 */}
              <div className="flex items-center space-x-3">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="pointsRule"
                    checked={ruleType === 'order'}
                    onChange={() => setRuleType('order')}
                    className="text-[#10b981] accent-[#10b981]"
                  />
                  <span className="text-gray-700">每消费</span>
                </label>
                <span className="text-gray-600">笔 获取</span>
                <input
                  type="number"
                  value={orderPoints}
                  onChange={(e) => setOrderPoints(e.target.value)}
                  disabled={ruleType !== 'order'}
                  className="w-28 px-3 py-1.5 border border-gray-200 rounded-md text-gray-800 text-xs font-mono disabled:bg-gray-50 focus:outline-none focus:border-[#10b981]"
                />
                <span className="text-gray-600">分</span>
              </div>
            </div>
          </div>

          {/* 积分有效期 */}
          <div className="flex items-start">
            <label className="w-24 pt-1.5 text-gray-600">积分有效期</label>
            <div className="flex-1 space-y-3">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="pointsValidity"
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
                    name="pointsValidity"
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

          {/* 抵扣比例 */}
          <div className="flex items-center">
            <label className="w-24 text-gray-600">抵扣比例</label>
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">获取</span>
              <input
                type="number"
                value={deductPoints}
                onChange={(e) => setDeductPoints(e.target.value)}
                className="w-28 px-3 py-1.5 border border-gray-200 rounded-md text-gray-800 text-xs font-mono focus:outline-none focus:border-[#10b981]"
              />
              <span className="text-gray-600">分 可抵扣1元</span>
            </div>
          </div>

          {/* 抵扣限制 */}
          <div className="flex items-center">
            <label className="w-24 text-gray-600">抵扣限制</label>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={hasDeductLimit}
                onChange={(e) => setHasDeductLimit(e.target.checked)}
                className="rounded text-[#10b981] accent-[#10b981]"
              />
              <span className="text-gray-600">最多抵扣</span>
              <input
                type="number"
                value={maxDeductPoints}
                onChange={(e) => setMaxDeductPoints(e.target.value)}
                disabled={!hasDeductLimit}
                className="w-28 px-3 py-1.5 border border-gray-200 rounded-md text-gray-800 text-xs font-mono disabled:bg-gray-50 focus:outline-none focus:border-[#10b981]"
              />
              <span className="text-gray-600">分</span>
            </div>
          </div>

          {/* 指定商品可用 */}
          <div className="flex items-center">
            <label className="w-24 text-gray-600">指定商品可用</label>
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={specifyProduct}
                onChange={(e) => setSpecifyProduct(e.target.checked)}
                className="rounded text-[#10b981] accent-[#10b981]"
              />
              <button
                type="button"
                onClick={() => {
                  setSpecifyProduct(true);
                  onNotice('已载入康养生活、适老洗护及慢病体检积分抵扣专区商品');
                }}
                className="text-[#10b981] hover:underline"
              >
                +选择商品
              </button>
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
                <span>规则已成功保存</span>
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
