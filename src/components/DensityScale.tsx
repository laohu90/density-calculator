import React from 'react';
import { Language } from '../i18n/translations';
import { Compass, MapPin } from 'lucide-react';
import { formatNumber } from '../utils/units';

interface DensityScaleProps {
  lang: Language;
  currentDensity?: number;
  onSelectDensity?: (density: number) => void;
}

export const DensityScale: React.FC<DensityScaleProps> = ({
  lang,
  currentDensity = 7.87,
  onSelectDensity,
}) => {
  const ladder = [
    {
      id: 'h2',
      name: lang === 'en' ? 'Hydrogen' : '氢气',
      val: '0.0000899 g/cm³',
      numVal: 0.0000899,
      tag: lang === 'en' ? 'Lightest Gas' : '已知最轻气体',
    },
    {
      id: 'air',
      name: lang === 'en' ? 'Air (0°C)' : '空气 (0℃)',
      val: '0.001293 g/cm³',
      numVal: 0.001293,
      tag: lang === 'en' ? 'Atmosphere' : '地球大气',
    },
    {
      id: 'aerogel',
      name: lang === 'en' ? 'Aerogel' : '气凝胶',
      val: '0.003 g/cm³',
      numVal: 0.003,
      tag: lang === 'en' ? 'Frozen Smoke' : '超轻固体',
    },
    {
      id: 'cork',
      name: lang === 'en' ? 'Cork' : '软木塞',
      val: '0.24 g/cm³',
      numVal: 0.24,
      tag: lang === 'en' ? 'Floats on water' : '高浮力木料',
    },
    {
      id: 'ice',
      name: lang === 'en' ? 'Ice (0°C)' : '冰 (0℃)',
      val: '0.917 g/cm³',
      numVal: 0.917,
      tag: lang === 'en' ? '1/11 exposed' : '浮于水面',
    },
    {
      id: 'water',
      name: lang === 'en' ? 'Pure Water (4°C)' : '纯水 (4℃)',
      val: '1.000 g/cm³',
      numVal: 1.000,
      tag: lang === 'en' ? 'Physical Standard' : '物理学基准',
      isBaseline: true,
    },
    {
      id: 'al',
      name: lang === 'en' ? 'Aluminum' : '纯铝',
      val: '2.70 g/cm³',
      numVal: 2.70,
      tag: lang === 'en' ? 'Aerospace light' : '航空轻金属',
    },
    {
      id: 'fe',
      name: lang === 'en' ? 'Iron / Steel' : '钢铁 / 纯铁',
      val: '7.87 g/cm³',
      numVal: 7.87,
      tag: lang === 'en' ? 'Industrial base' : '工业基石',
    },
    {
      id: 'cu',
      name: lang === 'en' ? 'Copper' : '纯铜',
      val: '8.96 g/cm³',
      numVal: 8.96,
      tag: lang === 'en' ? 'Conductor' : '优良导体',
    },
    {
      id: 'pb',
      name: lang === 'en' ? 'Lead (Pb)' : '铅 (Pb)',
      val: '11.34 g/cm³',
      numVal: 11.34,
      tag: lang === 'en' ? 'Radiation shield' : '辐射防护',
    },
    {
      id: 'hg',
      name: lang === 'en' ? 'Mercury' : '水银 / 汞',
      val: '13.60 g/cm³',
      numVal: 13.60,
      tag: lang === 'en' ? 'Liquid metal' : '液态金属',
    },
    {
      id: 'au',
      name: lang === 'en' ? 'Pure Gold' : '纯金 (Au)',
      val: '19.32 g/cm³',
      numVal: 19.32,
      tag: lang === 'en' ? 'Precious metal' : '高密度贵金属',
    },
    {
      id: 'os',
      name: lang === 'en' ? 'Osmium' : '锇 (Os)',
      val: '22.59 g/cm³',
      numVal: 22.59,
      tag: lang === 'en' ? 'Densest element' : '地球最高单质',
    },
    {
      id: 'neutron',
      name: lang === 'en' ? 'Neutron Star' : '中子星',
      val: '~10¹⁴ g/cm³',
      numVal: 1e14,
      tag: lang === 'en' ? 'Extreme cosmic' : '每立方厘米亿吨',
    },
  ];

  // Find which item is closest to current calculated density
  let closestIdx = -1;
  let minDiff = Infinity;
  if (currentDensity > 0) {
    ladder.forEach((item, idx) => {
      const diff = Math.abs(Math.log10(item.numVal) - Math.log10(currentDensity));
      if (diff < minDiff) {
        minDiff = diff;
        closestIdx = idx;
      }
    });
  }

  const closestItem = closestIdx >= 0 ? ladder[closestIdx] : null;

  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-blue-600" />
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">
            {lang === 'en' ? 'Cosmic & Natural Density Spectrum' : '自然宇宙物质密度光谱阶梯'}
          </h3>
          <span className="text-2xs text-slate-400 font-mono hidden sm:inline">
            ({lang === 'en' ? 'From Hydrogen to Neutron Star' : '从氢气到中子星'})
          </span>
        </div>

        {/* Current position banner */}
        {closestItem && currentDensity > 0 && (
          <div className="flex items-center gap-1.5 text-2xs font-mono text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100/80">
            <MapPin className="w-3 h-3 text-blue-600" />
            <span>
              {lang === 'en'
                ? `Current Calculation: ${formatNumber(currentDensity, 3)} g/cm³ ≈ #${closestIdx + 1} ${closestItem.name}`
                : `当前计算值: ${formatNumber(currentDensity, 3)} g/cm³ · 匹配 #${closestIdx + 1} ${closestItem.name}`}
            </span>
          </div>
        )}
      </div>

      {/* Grid of 14 items */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
        {ladder.map((item, idx) => {
          const isCurrentCalculated = idx === closestIdx && currentDensity > 0;
          const isWaterStandard = item.isBaseline;

          let cardStyle = 'border-slate-200/80 bg-slate-50/50 hover:bg-slate-100/60';
          if (isCurrentCalculated) {
            cardStyle = 'border-blue-500 bg-blue-50/80 ring-1 ring-blue-400 shadow-xs';
          } else if (isWaterStandard) {
            cardStyle = 'border-slate-300 bg-slate-100/60';
          }

          return (
            <div
              key={item.id}
              onClick={() => onSelectDensity && onSelectDensity(item.numVal)}
              className={`p-2.5 rounded-lg border text-xs flex flex-col justify-between transition-all relative ${cardStyle} ${
                onSelectDensity ? 'cursor-pointer' : ''
              }`}
            >
              {/* Badge for Current Match or Baseline */}
              <div className="flex items-center justify-between mb-1">
                <span className="text-slate-400 font-mono text-3xs font-semibold">
                  #{idx + 1}
                </span>
                {isCurrentCalculated ? (
                  <span className="text-3xs font-bold text-blue-700 bg-blue-100/90 px-1 py-0.2 rounded font-sans">
                    {lang === 'en' ? '📍 You Are Here' : '📍 当前匹配'}
                  </span>
                ) : isWaterStandard ? (
                  <span className="text-3xs font-medium text-slate-500 bg-slate-200/70 px-1 py-0.2 rounded font-sans">
                    {lang === 'en' ? '★ Baseline' : '★ 物理基准'}
                  </span>
                ) : null}
              </div>

              {/* Substance Name */}
              <div>
                <span className="font-bold text-slate-900 block text-2xs truncate">
                  {item.name}
                </span>
                <span className="font-mono text-2xs font-semibold text-slate-700 block mt-0.5">
                  {item.val}
                </span>
              </div>

              {/* Tag note */}
              <div className="mt-1.5 pt-1 border-t border-slate-200/60 text-3xs text-slate-500 truncate">
                {item.tag}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
