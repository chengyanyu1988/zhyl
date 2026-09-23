import React, { useState, useMemo } from 'react';
import {
  Search,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { AppUser } from '../../types';
import { DeviceRecord, INITIAL_DEVICES } from '../../data/healthData';

interface DeviceListTabProps {
  user: AppUser;
  onNotice: (msg: string) => void;
}

export const DeviceListTab: React.FC<DeviceListTabProps> = ({
  user,
  onNotice,
}) => {
  const [devices, setDevices] = useState<DeviceRecord[]>(INITIAL_DEVICES);
  const [searchKeyword, setSearchKeyword] = useState('');

  const filteredDevices = useMemo(() => {
    return devices
      .filter((d) => {
        if (!searchKeyword.trim()) return true;
        const q = searchKeyword.toLowerCase();
        return (
          d.name.toLowerCase().includes(q) ||
          d.code.toLowerCase().includes(q) ||
          d.location.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => new Date(b.boundTime).getTime() - new Date(a.boundTime).getTime());
  }, [devices, searchKeyword]);

  return (
    <div className="space-y-4 text-xs">
      {/* 顶部搜索与操作栏 (Image 19) */}
      <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-2.5 flex-1 max-w-md">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="请输入关键字"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="w-full pl-8 pr-3 py-2 bg-gray-50 border border-gray-200/80 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#10b981] focus:bg-white"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-2.5 top-2.5" />
          </div>
          <button
            type="button"
            onClick={() => onNotice(`已检索长者绑定设备：${searchKeyword || '全部'}`)}
            className="px-4 py-2 bg-[#10b981] hover:bg-[#059669] text-white rounded-lg font-medium transition-colors"
          >
            搜索
          </button>
          <button
            type="button"
            onClick={() => {
              setSearchKeyword('');
              onNotice('已重置设备检索条件');
            }}
            className="px-4 py-2 bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-lg font-medium transition-colors"
          >
            重置
          </button>
        </div>
      </div>

      {/* 设备列表表格 (Image 19) */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#f9fafb] text-gray-500 border-b border-gray-100 font-medium">
              <tr>
                <th className="py-3 px-3 w-12 text-center">序号</th>
                <th className="py-3 px-3">设备名称</th>
                <th className="py-3 px-3 text-center">图片</th>
                <th className="py-3 px-3 font-mono">设备编码</th>
                <th className="py-3 px-3 font-mono">版本</th>
                <th className="py-3 px-3">状态</th>
                <th className="py-3 px-3">安装 / 佩戴地址</th>
                <th className="py-3 px-4 font-mono text-right">绑定时间 (降序)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredDevices.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-10 text-center text-gray-400">
                    暂未找到匹配的智能设备
                  </td>
                </tr>
              ) : (
                filteredDevices.map((dev, idx) => (
                  <tr key={dev.id} className="hover:bg-gray-50/70 transition-colors">
                    <td className="py-3.5 px-3 text-center font-mono text-gray-500">
                      {idx + 1}
                    </td>
                    <td className="py-3.5 px-3 font-semibold text-gray-800">
                      {dev.name}
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      <img
                        src={dev.image}
                        alt={dev.name}
                        className="w-10 h-10 object-cover rounded-lg border border-gray-200 mx-auto shadow-2xs"
                      />
                    </td>
                    <td className="py-3.5 px-3 font-mono text-gray-600 font-medium">
                      {dev.code}
                    </td>
                    <td className="py-3.5 px-3 font-mono text-gray-500">
                      {dev.version}
                    </td>
                    <td className="py-3.5 px-3">
                      <span
                        className={`inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium ${
                          dev.status === '已连接'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-gray-100 text-gray-500 border border-gray-200'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            dev.status === '已连接'
                              ? 'bg-emerald-500 animate-pulse'
                              : 'bg-gray-400'
                          }`}
                        />
                        <span>{dev.status}</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-gray-600 max-w-xs truncate">
                      {dev.location}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-gray-500 text-right">
                      {dev.boundTime}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* 分页栏 */}
        <div className="p-4 border-t border-gray-100 flex items-center justify-between text-gray-500 text-xs">
          <span>共 {filteredDevices.length} 条智能硬件记录</span>
          <div className="flex items-center space-x-2">
            <button
              type="button"
              disabled
              className="p-1 rounded border border-gray-200 text-gray-300 cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-2.5 py-1 bg-[#10b981] text-white rounded font-medium">
              1
            </span>
            <button
              type="button"
              disabled
              className="p-1 rounded border border-gray-200 text-gray-300 cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
