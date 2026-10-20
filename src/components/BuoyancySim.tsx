import React, { useState, useMemo } from 'react';
import { Substance } from '../types/density';
import { formatNumber } from '../utils/units';
import { Language, TRANSLATIONS } from '../i18n/translations';
import { Waves, Info } from 'lucide-react';

interface BuoyancySimProps {
  lang: Language;
  initialObject?: Substance | null;
}

export const BuoyancySim: React.FC<BuoyancySimProps> = ({ lang, initialObject }) => {
  const t = TRANSLATIONS[lang];

  // Object settings
  const [objectDensity, setObjectDensity] = useState<number>(
    initialObject ? initialObject.density : 0.917
  );
  const [objectVolume, setObjectVolume] = useState<number>(100);
  const [objectName, setObjectName] = useState<string>(
    initialObject
      ? lang === 'en'
        ? initialObject.nameEn
        : initialObject.name
      : lang === 'en'
      ? 'Ice Block'
      : '冰块 (Ice)'
  );

  // Liquid settings
  const [liquidDensity, setLiquidDensity] = useState<number>(1.0);
  const [liquidName, setLiquidName] = useState<string>(
    lang === 'en' ? 'Pure Water (4°C)' : '纯水 (4℃)'
  );
  const [gravityG, setGravityG] = useState<number>(9.8);

  // Presets
  const liquidPresets = useMemo(() => [
    { nameEn: 'Pure Water', nameZh: '纯水 (4℃)', density: 1.0 },
    { nameEn: 'Seawater', nameZh: '标准海水', density: 1.025 },
    { nameEn: 'Alcohol', nameZh: '医用酒精', density: 0.789 },
    { nameEn: 'Vegetable Oil', nameZh: '植物油', density: 0.92 },
    { nameEn: 'Mercury', nameZh: '水银 / 汞', density: 13.6 },
    { nameEn: 'Dense Saline', nameZh: '浓盐水 (选种)', density: 1.15 },
  ], []);

  const objectPresets = useMemo(() => [
    { nameEn: 'Ice', nameZh: '冰块', density: 0.917 },
    { nameEn: 'Oak Wood', nameZh: '橡木块', density: 0.75 },
    { nameEn: 'Aluminum', nameZh: '铝块', density: 2.7 },
    { nameEn: 'Iron / Steel', nameZh: '纯铁块', density: 7.87 },
    { nameEn: 'Gold', nameZh: '纯金块', density: 19.32 },
    { nameEn: 'Cork', nameZh: '软木塞', density: 0.24 },
    { nameEn: 'PE Plastic', nameZh: 'PE塑料', density: 0.95 },
  ], []);

  // Safe Physics calculation with zero protection
  const physics = useMemo(() => {
    const safeObjDensity = Math.max(0.0001, objectDensity || 0.0001);
    const safeObjVolume = Math.max(0.0001, objectVolume || 0.0001);
    const safeLiqDensity = Math.max(0.0001, liquidDensity || 0.0001);

    const massG = safeObjDensity * safeObjVolume;
    const massKg = massG / 1000;
    const forceG = massKg * gravityG;

    const densityRatio = safeObjDensity / safeLiqDensity;

    let state: 'floating' | 'suspended' | 'sunk';
    let submergedRatio = 0;
    let vDisplacedCm3 = 0;
    let buoyancyForceN = 0;
    let normalForceN = 0;

    if (Math.abs(densityRatio - 1.0) < 0.001) {
      state = 'suspended';
      submergedRatio = 1.0;
      vDisplacedCm3 = safeObjVolume;
      buoyancyForceN = forceG;
      normalForceN = 0;
    } else if (densityRatio < 1.0) {
      state = 'floating';
      submergedRatio = densityRatio;
      vDisplacedCm3 = safeObjVolume * submergedRatio;
      buoyancyForceN = forceG;
      normalForceN = 0;
    } else {
      state = 'sunk';
      submergedRatio = 1.0;
      vDisplacedCm3 = safeObjVolume;
      const displacedMassKg = (safeLiqDensity * vDisplacedCm3) / 1000;
      buoyancyForceN = displacedMassKg * gravityG;
      normalForceN = Math.max(0, forceG - buoyancyForceN);
    }

    const exposedRatio = 1 - submergedRatio;

    return {
      massG,
      forceG,
      densityRatio,
      state,
      submergedRatio,
      exposedRatio,
      vDisplacedCm3,
      buoyancyForceN,
      normalForceN,
    };
  }, [objectDensity, objectVolume, liquidDensity, gravityG]);

  // SVG representation geometry
  const tankWidth = 360;
  const tankHeight = 300;
  const liquidLevelY = 130;
  const tankBottomY = 280;

  const blockSize = Math.min(Math.max(Math.cbrt(objectVolume || 1) * 16, 45), 100);
  const blockX = (tankWidth - blockSize) / 2;

  let blockY = liquidLevelY - blockSize * physics.exposedRatio;
  if (physics.state === 'suspended') {
    blockY = liquidLevelY + (tankBottomY - liquidLevelY - blockSize) / 2;
  } else if (physics.state === 'sunk') {
    blockY = tankBottomY - blockSize;
  }

  return (
    <div className="space-y-6">
      {/* Introduction Card */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Waves className="w-4 h-4 text-blue-600" />
              <span>{t.buoyancyTitle}</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">{t.buoyancyDesc}</p>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-2xs font-mono text-slate-500">{t.gravityConst}:</span>
            <button
              onClick={() => setGravityG(9.8)}
              className={`px-2.5 py-1 text-xs font-mono rounded ${
                gravityG === 9.8 ? 'bg-blue-600 text-white font-bold' : 'bg-slate-100 text-slate-700'
              }`}
            >
              9.8 N/kg
            </button>
            <button
              onClick={() => setGravityG(10)}
              className={`px-2.5 py-1 text-xs font-mono rounded ${
                gravityG === 10 ? 'bg-blue-600 text-white font-bold' : 'bg-slate-100 text-slate-700'
              }`}
            >
              10 N/kg
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Parameter Setup (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Object Setup Card */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono flex items-center justify-between">
              <span>{t.testObjTitle}</span>
              <span className="text-blue-600 normal-case">{objectName}</span>
            </h3>

            <div>
              <span className="text-2xs text-slate-500 block mb-1.5">{t.quickSelectObj}</span>
              <div className="flex flex-wrap gap-1.5">
                {objectPresets.map((p) => {
                  const label = lang === 'en' ? p.nameEn : p.nameZh;
                  return (
                    <button
                      key={p.nameEn}
                      onClick={() => {
                        setObjectDensity(p.density);
                        setObjectName(label);
                      }}
                      className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
                        objectDensity === p.density
                          ? 'bg-blue-600 text-white font-semibold'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {label} ({p.density})
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-2xs font-semibold text-slate-600 mb-1">
                  {t.objDensity}
                </label>
                <input
                  type="number"
                  step="any"
                  value={objectDensity}
                  onChange={(e) => {
                    setObjectDensity(parseFloat(e.target.value) || 0.0001);
                    setObjectName(t.customMaterial);
                  }}
                  className="w-full px-3 py-1.5 text-xs font-mono rounded-lg border border-slate-300 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-2xs font-semibold text-slate-600 mb-1">
                  {t.objVolume}
                </label>
                <input
                  type="number"
                  step="any"
                  value={objectVolume}
                  onChange={(e) => setObjectVolume(parseFloat(e.target.value) || 1)}
                  className="w-full px-3 py-1.5 text-xs font-mono rounded-lg border border-slate-300 outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Liquid Setup Card */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono flex items-center justify-between">
              <span>{t.liquidMediumTitle}</span>
              <span className="text-blue-600 normal-case">{liquidName}</span>
            </h3>

            <div>
              <span className="text-2xs text-slate-500 block mb-1.5">{t.quickSelectLiq}</span>
              <div className="flex flex-wrap gap-1.5">
                {liquidPresets.map((l) => {
                  const label = lang === 'en' ? l.nameEn : l.nameZh;
                  return (
                    <button
                      key={l.nameEn}
                      onClick={() => {
                        setLiquidDensity(l.density);
                        setLiquidName(label);
                      }}
                      className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
                        liquidDensity === l.density
                          ? 'bg-blue-600 text-white font-semibold'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {label} ({l.density})
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-1">
              <label className="block text-2xs font-semibold text-slate-600 mb-1">
                {t.liqDensity}
              </label>
              <input
                type="number"
                step="any"
                value={liquidDensity}
                onChange={(e) => {
                  setLiquidDensity(parseFloat(e.target.value) || 0.0001);
                  setLiquidName(lang === 'en' ? 'Custom Liquid' : '自定义液体');
                }}
                className="w-full px-3 py-1.5 text-xs font-mono rounded-lg border border-slate-300 outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Physics Analysis Summary */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-2 font-mono text-xs">
            <h4 className="font-bold text-slate-900 font-sans text-xs flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-blue-600" />
              <span>{t.forceBalanceTitle}</span>
            </h4>
            <div className="space-y-1.5 divide-y divide-slate-100 text-slate-600">
              <div className="flex justify-between pt-1">
                <span>{t.objMass}</span>
                <span className="font-bold text-slate-900">
                  {formatNumber(physics.massG)} g
                </span>
              </div>
              <div className="flex justify-between pt-1">
                <span>{t.gravityForce}</span>
                <span className="font-bold text-slate-900">
                  {formatNumber(physics.forceG, 3)} N
                </span>
              </div>
              <div className="flex justify-between pt-1">
                <span>{t.displacedVol}</span>
                <span className="font-bold text-blue-600">
                  {formatNumber(physics.vDisplacedCm3, 2)} cm³ ({(physics.submergedRatio * 100).toFixed(1)}%)
                </span>
              </div>
              <div className="flex justify-between pt-1">
                <span>{t.buoyancyForce}</span>
                <span className="font-bold text-emerald-600">
                  {formatNumber(physics.buoyancyForceN, 3)} N
                </span>
              </div>
              {physics.state === 'sunk' && (
                <div className="flex justify-between pt-1 text-amber-700">
                  <span>{t.normalForce}</span>
                  <span className="font-bold">
                    {formatNumber(physics.normalForceN, 3)} N
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Visual Stage (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col items-center">
            {/* Status Header Badge */}
            <div className="w-full flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs px-2.5 py-1 rounded-md font-bold font-mono ${
                    physics.state === 'floating'
                      ? 'bg-sky-100 text-sky-800'
                      : physics.state === 'suspended'
                      ? 'bg-teal-100 text-teal-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {physics.state === 'floating'
                    ? t.stateFloating
                    : physics.state === 'suspended'
                    ? t.stateSuspended
                    : t.stateSunk}
                </span>
              </div>

              {physics.state === 'floating' && (
                <span className="text-2xs text-slate-500 font-mono">
                  {(physics.exposedRatio * 100).toFixed(1)}% exposed · {(physics.submergedRatio * 100).toFixed(1)}% submerged
                </span>
              )}
            </div>

            {/* SVG Simulation Tank */}
            <div className="relative w-full max-w-md bg-slate-50 rounded-xl p-4 flex justify-center overflow-hidden border border-slate-200">
              <svg width={tankWidth} height={tankHeight} viewBox={`0 0 ${tankWidth} ${tankHeight}`}>
                <defs>
                  <linearGradient id="liquidGradSim" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#0284c7" stopOpacity="0.8" />
                  </linearGradient>
                </defs>

                {/* Back Wall */}
                <rect
                  x="20"
                  y="40"
                  width={tankWidth - 40}
                  height={tankBottomY - 40}
                  rx="6"
                  fill="#ffffff"
                  stroke="#cbd5e1"
                  strokeWidth="2"
                />

                {/* Scale Ticks */}
                {[...Array(6)].map((_, i) => {
                  const tickY = liquidLevelY + i * 25;
                  return (
                    <g key={i}>
                      <line x1="22" y1={tickY} x2="32" y2={tickY} stroke="#94a3b8" strokeWidth="1.5" />
                      <text x="36" y={tickY + 4} fontSize="9" fontFamily="monospace" fill="#64748b">
                        {(6 - i) * 100} mL
                      </text>
                    </g>
                  );
                })}

                {/* Liquid Body */}
                <rect
                  x="22"
                  y={liquidLevelY}
                  width={tankWidth - 44}
                  height={tankBottomY - liquidLevelY}
                  fill="url(#liquidGradSim)"
                />

                {/* Liquid Surface Line */}
                <line
                  x1="22"
                  y1={liquidLevelY}
                  x2={tankWidth - 22}
                  y2={liquidLevelY}
                  stroke="#0284c7"
                  strokeWidth="2"
                  strokeDasharray="4 2"
                />

                {/* Submerged Object */}
                <g>
                  <rect
                    x={blockX}
                    y={blockY}
                    width={blockSize}
                    height={blockSize}
                    rx="4"
                    fill="#f1f5f9"
                    stroke="#334155"
                    strokeWidth="2"
                    className="transition-all duration-300 ease-out"
                  />
                  <text
                    x={blockX + blockSize / 2}
                    y={blockY + blockSize / 2 + 4}
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight="bold"
                    fontFamily="monospace"
                    fill="#0f172a"
                  >
                    {objectName.slice(0, 8)}
                  </text>
                </g>

                {/* Force Vector Arrows */}
                <g transform={`translate(${blockX + blockSize / 2}, ${blockY + blockSize / 2})`}>
                  {/* Gravity G */}
                  <line x1="0" y1="0" x2="0" y2="35" stroke="#dc2626" strokeWidth="2" />
                  <circle cx="0" cy="0" r="3" fill="#dc2626" />
                  <text x="6" y="30" fontSize="10" fontWeight="bold" fontFamily="monospace" fill="#dc2626">
                    G = {formatNumber(physics.forceG, 2)}N
                  </text>

                  {/* Buoyancy F_b */}
                  <line x1="0" y1="0" x2="0" y2="-35" stroke="#16a34a" strokeWidth="2" />
                  <text x="6" y="-22" fontSize="10" fontWeight="bold" fontFamily="monospace" fill="#16a34a">
                    F_b = {formatNumber(physics.buoyancyForceN, 2)}N
                  </text>
                </g>
              </svg>
            </div>

            {/* Principles summary */}
            <div className="w-full mt-4 p-4 bg-slate-50 rounded-lg border border-slate-200/80 text-2xs text-slate-600 space-y-1">
              <div className="font-semibold text-slate-800 text-xs">
                {t.physicsExplainTitle}
              </div>
              <div>• {t.floatingLaw}</div>
              <div>• {t.suspendedLaw}</div>
              <div>• {t.sunkLaw}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
