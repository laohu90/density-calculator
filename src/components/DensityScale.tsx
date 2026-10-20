import React from 'react';
import { formatNumber } from '../utils/units';
import { Compass, Sparkles } from 'lucide-react';

export const DensityScale: React.FC = () => {
  const ladder = [
    { name: '氢气 (Hydrogen)', val: '0.0000899 g/cm³', tag: '已知最轻气体', color: 'bg-indigo-100 text-indigo-700' },
    { name: '空气 (Air 0℃)', val: '0.001293 g/cm³', tag: '地球大气', color: 'bg-sky-100 text-sky-700' },
    { name: '气凝胶 (Aerogel)', val: '0.003 g/cm³', tag: '固体烟雾/超轻固体', color: 'bg-cyan-100 text-cyan-700' },
    { name: '软木塞 (Cork)', val: '0.24 g/cm³', tag: '浮水植物材料', color: 'bg-amber-100 text-amber-700' },
    { name: '冰 (Ice 0℃)', val: '0.917 g/cm³', tag: '浮在水面 1/11露出', color: 'bg-blue-100 text-blue-700' },
    { name: '常温纯水 (Pure Water)', val: '1.000 g/cm³', tag: '物理基准 = 1000 kg/m³', color: 'bg-blue-600 text-white font-bold' },
    { name: '海水 (Seawater)', val: '1.025 g/cm³', tag: '含盐大浮力', color: 'bg-teal-100 text-teal-700' },
    { name: '纯铝 (Aluminum)', val: '2.70 g/cm³', tag: '航空轻金属', color: 'bg-slate-200 text-slate-800' },
    { name: '钢铁 / 纯铁 (Iron)', val: '7.87 g/cm³', tag: '工业基础标准', color: 'bg-slate-300 text-slate-900 font-bold' },
    { name: '纯铜 (Copper)', val: '8.96 g/cm³', tag: '优良导体', color: 'bg-amber-200 text-amber-900' },
    { name: '铅 (Lead)', val: '11.34 g/cm³', tag: '重金属屏蔽', color: 'bg-slate-400 text-white' },
    { name: '水银 / 汞 (Mercury)', val: '13.60 g/cm³', tag: '常温常压液态金属', color: 'bg-slate-500 text-white font-bold' },
    { name: '纯金 (Gold)', val: '19.32 g/cm³', tag: '高密度贵金属', color: 'bg-amber-500 text-white font-bold' },
    { name: '金属锇 (Osmium)', val: '22.59 g/cm³', tag: '常温地球密度最高单质', color: 'bg-purple-600 text-white font-bold' },
    { name: '太阳核心 (Sun Core)', val: '150 g/cm³', tag: '等离子体致密态', color: 'bg-rose-500 text-white' },
    { name: '中子星 (Neutron Star)', val: '~10¹⁴ g/cm³', tag: '每立方厘米数亿吨', color: 'bg-violet-900 text-white font-bold' },
  ];

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Compass className="w-4 h-4 text-blue-600" />
          自然宇宙物质密度全景光谱阶梯
        </h3>
        <span className="text-xs text-slate-400 font-mono">从氢气到中子星</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-8 gap-2.5">
        {ladder.map((item, idx) => (
          <div
            key={idx}
            className={`p-2.5 rounded-lg border border-slate-200/60 flex flex-col justify-between text-xs transition-transform hover:-translate-y-0.5 ${
              item.name.includes('纯水')
                ? 'ring-2 ring-blue-500 bg-blue-50/50'
                : 'bg-slate-50/60'
            }`}
          >
            <div>
              <span className="text-slate-400 font-mono block text-3xs">#{idx + 1}</span>
              <span className="font-semibold text-slate-800 line-clamp-1 text-2xs mt-0.5">{item.name}</span>
            </div>
            <div className="mt-2">
              <span className="font-mono text-2xs font-bold text-slate-900 block">{item.val}</span>
              <span className="text-3xs text-slate-500 line-clamp-1">{item.tag}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
