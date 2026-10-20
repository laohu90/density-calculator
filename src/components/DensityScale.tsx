import React from 'react';
import { Language } from '../i18n/translations';
import { Compass } from 'lucide-react';

interface DensityScaleProps {
  lang: Language;
}

export const DensityScale: React.FC<DensityScaleProps> = ({ lang }) => {
  const ladder = [
    {
      name: lang === 'en' ? 'Hydrogen' : '氢气',
      val: '0.0000899 g/cm³',
      tag: lang === 'en' ? 'Lightest Gas' : '已知最轻气体',
    },
    {
      name: lang === 'en' ? 'Air (0°C)' : '空气 (0℃)',
      val: '0.001293 g/cm³',
      tag: lang === 'en' ? 'Atmosphere' : '地球大气',
    },
    {
      name: lang === 'en' ? 'Aerogel' : '气凝胶',
      val: '0.003 g/cm³',
      tag: lang === 'en' ? 'Frozen Smoke' : '超轻固体',
    },
    {
      name: lang === 'en' ? 'Cork' : '软木塞',
      val: '0.24 g/cm³',
      tag: lang === 'en' ? 'Floats on water' : '高浮力木料',
    },
    {
      name: lang === 'en' ? 'Ice (0°C)' : '冰 (0℃)',
      val: '0.917 g/cm³',
      tag: lang === 'en' ? '1/11 exposed' : '浮于水面',
    },
    {
      name: lang === 'en' ? 'Pure Water' : '纯水 (4℃)',
      val: '1.000 g/cm³',
      tag: lang === 'en' ? 'SI Standard' : '物理学基准',
    },
    {
      name: lang === 'en' ? 'Aluminum' : '纯铝',
      val: '2.70 g/cm³',
      tag: lang === 'en' ? 'Aerospace light' : '航空轻金属',
    },
    {
      name: lang === 'en' ? 'Iron / Steel' : '钢铁 / 纯铁',
      val: '7.87 g/cm³',
      tag: lang === 'en' ? 'Industrial base' : '工业基石',
    },
    {
      name: lang === 'en' ? 'Copper' : '纯铜',
      val: '8.96 g/cm³',
      tag: lang === 'en' ? 'Conductor' : '优良导体',
    },
    {
      name: lang === 'en' ? 'Lead' : '铅 (Pb)',
      val: '11.34 g/cm³',
      tag: lang === 'en' ? 'Radiation shield' : '辐射防护',
    },
    {
      name: lang === 'en' ? 'Mercury' : '水银 / 汞',
      val: '13.60 g/cm³',
      tag: lang === 'en' ? 'Liquid metal' : '液态金属',
    },
    {
      name: lang === 'en' ? 'Pure Gold' : '纯金 (Au)',
      val: '19.32 g/cm³',
      tag: lang === 'en' ? 'Precious metal' : '高密度贵金属',
    },
    {
      name: lang === 'en' ? 'Osmium' : '锇 (Os)',
      val: '22.59 g/cm³',
      tag: lang === 'en' ? 'Densest element' : '地球最高单质',
    },
    {
      name: lang === 'en' ? 'Neutron Star' : '中子星',
      val: '~10¹⁴ g/cm³',
      tag: lang === 'en' ? 'Extreme cosmic' : '每立方厘米亿吨',
    },
  ];

  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <h3 className="text-xs font-bold text-slate-800 flex items-center gap-2 uppercase tracking-wider font-mono">
          <Compass className="w-3.5 h-3.5 text-blue-600" />
          <span>{lang === 'en' ? 'Cosmic & Natural Density Spectrum' : '自然宇宙物质密度光谱阶梯'}</span>
        </h3>
        <span className="text-2xs text-slate-400 font-mono">
          {lang === 'en' ? 'From Hydrogen to Neutron Star' : '从氢气到中子星'}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
        {ladder.map((item, idx) => (
          <div
            key={idx}
            className={`p-2 rounded-lg border text-xs flex flex-col justify-between ${
              item.name.includes('Water') || item.name.includes('纯水')
                ? 'border-blue-300 bg-blue-50/70'
                : 'border-slate-200/60 bg-slate-50/50'
            }`}
          >
            <div>
              <span className="text-slate-400 font-mono text-3xs">#{idx + 1}</span>
              <span className="font-semibold text-slate-800 block text-2xs truncate">{item.name}</span>
            </div>
            <div className="mt-1">
              <span className="font-mono text-2xs font-bold text-slate-900 block">{item.val}</span>
              <span className="text-3xs text-slate-500">{item.tag}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
