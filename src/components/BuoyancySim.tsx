import React, { useState, useMemo } from 'react';
import { Substance } from '../types/density';
import { formatNumber } from '../utils/units';
import { DEFAULT_SUBSTANCES } from '../data/materials';
import { Waves, ArrowDown, ArrowUp, RefreshCw, Info } from 'lucide-react';

interface BuoyancySimProps {
  initialObject?: Substance | null;
}

export const BuoyancySim: React.FC<BuoyancySimProps> = ({ initialObject }) => {
  // Object settings
  const [objectDensity, setObjectDensity] = useState<number>(initialObject ? initialObject.density : 0.917); // default Ice
  const [objectVolume, setObjectVolume] = useState<number>(100); // cm³
  const [objectName, setObjectName] = useState<string>(initialObject ? initialObject.name : '冰块 (Ice)');

  // Liquid settings
  const [liquidDensity, setLiquidDensity] = useState<number>(1.0); // g/cm³ default Pure Water
  const [liquidName, setLiquidName] = useState<string>('纯水 (Pure Water)');
  const [gravityG, setGravityG] = useState<number>(9.8); // N/kg

  // Liquid Presets
  const liquidPresets = [
    { name: '纯水 (4℃)', density: 1.0, color: '#38bdf8' },
    { name: '标准海水', density: 1.025, color: '#0284c7' },
    { name: '医用酒精', density: 0.789, color: '#a5b4fc' },
    { name: '植物油', density: 0.92, color: '#facc15' },
    { name: '水银 / 汞', density: 13.6, color: '#94a3b8' },
    { name: '浓盐水 (选种)', density: 1.15, color: '#67e8f9' },
  ];

  // Common object presets
  const objectPresets = [
    { name: '冰块', density: 0.917 },
    { name: '橡木块', density: 0.75 },
    { name: '铝块', density: 2.7 },
    { name: '纯铁块', density: 7.87 },
    { name: '纯金块', density: 19.32 },
    { name: '软木塞', density: 0.24 },
    { name: 'PE塑料', density: 0.95 },
  ];

  // Physics calculation
  const physics = useMemo(() => {
    // Mass in grams: m = rho * V
    const massG = objectDensity * objectVolume;
    const massKg = massG / 1000;
    // Gravity Force G = m * g (Newtons)
    const forceG = massKg * gravityG;

    // Submersion ratio: rho_obj / rho_liq
    const densityRatio = objectDensity / liquidDensity;

    let state: 'floating' | 'suspended' | 'sunk';
    let submergedRatio = 0;
    let vDisplacedCm3 = 0;
    let buoyancyForceN = 0;
    let normalForceN = 0; // support from bottom

    if (Math.abs(densityRatio - 1.0) < 0.001) {
      state = 'suspended';
      submergedRatio = 1.0;
      vDisplacedCm3 = objectVolume;
      buoyancyForceN = forceG;
      normalForceN = 0;
    } else if (densityRatio < 1.0) {
      state = 'floating';
      submergedRatio = densityRatio;
      vDisplacedCm3 = objectVolume * submergedRatio;
      buoyancyForceN = forceG; // Floating in equilibrium: F_buoyant = G
      normalForceN = 0;
    } else {
      state = 'sunk';
      submergedRatio = 1.0;
      vDisplacedCm3 = objectVolume;
      // F_buoyant = rho_liq * V_displaced * g
      const displacedMassKg = (liquidDensity * vDisplacedCm3) / 1000;
      buoyancyForceN = displacedMassKg * gravityG;
      normalForceN = forceG - buoyancyForceN;
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

  // SVG representation dimensions
  // Container height: 320px
  // Liquid level height: 200px from bottom (top at y = 120)
  // Tank bottom at y = 300
  const tankWidth = 360;
  const tankHeight = 300;
  const liquidLevelY = 130;
  const tankBottomY = 280;

  // Object box size
  const blockSize = Math.min(Math.max(Math.cbrt(objectVolume) * 16, 50), 110);
  const blockX = (tankWidth - blockSize) / 2;

  // Calculate object Y position in tank:
  // If floating: submerged height = blockSize * submergedRatio
  // water line at liquidLevelY, so objectTop = liquidLevelY - (blockSize * exposedRatio)
  let blockY = liquidLevelY - blockSize * physics.exposedRatio;
  if (physics.state === 'suspended') {
    blockY = liquidLevelY + (tankBottomY - liquidLevelY - blockSize) / 2;
  } else if (physics.state === 'sunk') {
    blockY = tankBottomY - blockSize;
  }

  return (
    <div className="space-y-6">
      {/* Introduction Card */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Waves className="w-5 h-5 text-blue-600" />
              阿基米德浮力与浮沉动态仿真水槽
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              基于物理定律：当物态密度 ρ物 &lt; ρ液 时物体漂浮；ρ物 = ρ液 时悬浮；ρ物 &gt; ρ液 时沉底。实时计算排水体积 V排 与受力平衡。
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-mono text-slate-500">重力常数 g:</span>
            <button
              onClick={() => setGravityG(9.8)}
              className={`px-2.5 py-1 text-xs font-mono rounded ${
                gravityG === 9.8 ? 'bg-blue-600 text-white font-bold' : 'bg-slate-100 text-slate-700'
              }`}
            >
              9.8 N/kg (精细)
            </button>
            <button
              onClick={() => setGravityG(10)}
              className={`px-2.5 py-1 text-xs font-mono rounded ${
                gravityG === 10 ? 'bg-blue-600 text-white font-bold' : 'bg-slate-100 text-slate-700'
              }`}
            >
              10 N/kg (教学)
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Parameter Setup (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Object Setup Card */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center justify-between">
              <span>1. 待测试物体参数</span>
              <span className="text-xs text-blue-600 font-mono">{objectName}</span>
            </h3>

            {/* Object presets */}
            <div>
              <span className="text-xs text-slate-500 block mb-1.5">快速选择物体:</span>
              <div className="flex flex-wrap gap-1.5">
                {objectPresets.map((p) => (
                  <button
                    key={p.name}
                    onClick={() => {
                      setObjectDensity(p.density);
                      setObjectName(p.name);
                    }}
                    className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
                      objectDensity === p.density
                        ? 'bg-blue-600 text-white font-semibold'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {p.name} ({p.density})
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  物体密度 (g/cm³)
                </label>
                <input
                  type="number"
                  step="any"
                  value={objectDensity}
                  onChange={(e) => {
                    setObjectDensity(parseFloat(e.target.value) || 0);
                    setObjectName('自定义物体');
                  }}
                  className="w-full px-3 py-2 text-sm font-mono rounded-lg border border-slate-300 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  物体体积 (cm³)
                </label>
                <input
                  type="number"
                  step="any"
                  value={objectVolume}
                  onChange={(e) => setObjectVolume(parseFloat(e.target.value) || 1)}
                  className="w-full px-3 py-2 text-sm font-mono rounded-lg border border-slate-300 outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Liquid Setup Card */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center justify-between">
              <span>2. 浸入液体介质</span>
              <span className="text-xs text-blue-600 font-mono">{liquidName}</span>
            </h3>

            {/* Liquid presets */}
            <div>
              <span className="text-xs text-slate-500 block mb-1.5">常用液体介质:</span>
              <div className="flex flex-wrap gap-1.5">
                {liquidPresets.map((l) => (
                  <button
                    key={l.name}
                    onClick={() => {
                      setLiquidDensity(l.density);
                      setLiquidName(l.name);
                    }}
                    className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
                      liquidDensity === l.density
                        ? 'bg-blue-600 text-white font-semibold'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {l.name} ({l.density} g/cm³)
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-1">
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                液体密度 ρ液 (g/cm³)
              </label>
              <input
                type="number"
                step="any"
                value={liquidDensity}
                onChange={(e) => {
                  setLiquidDensity(parseFloat(e.target.value) || 0);
                  setLiquidName('自定义液体');
                }}
                className="w-full px-3 py-2 text-sm font-mono rounded-lg border border-slate-300 outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Physics Analysis Summary */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3 font-mono text-xs">
            <h4 className="font-bold text-slate-900 font-sans text-sm flex items-center gap-1.5">
              <Info className="w-4 h-4 text-blue-600" />
              物理受力平衡方程
            </h4>
            <div className="space-y-1.5 divide-y divide-slate-100 text-slate-600">
              <div className="flex justify-between pt-1">
                <span>物体总质量 m物:</span>
                <span className="font-bold text-slate-900">
                  {formatNumber(physics.massG)} g ({formatNumber(physics.massG / 1000, 4)} kg)
                </span>
              </div>
              <div className="flex justify-between pt-1">
                <span>物体自身重力 G = m·g:</span>
                <span className="font-bold text-slate-900">
                  {formatNumber(physics.forceG, 3)} N
                </span>
              </div>
              <div className="flex justify-between pt-1">
                <span>排开液体体积 V排:</span>
                <span className="font-bold text-blue-600">
                  {formatNumber(physics.vDisplacedCm3, 2)} cm³ ({formatNumber((physics.submergedRatio) * 100, 1)}%)
                </span>
              </div>
              <div className="flex justify-between pt-1">
                <span>受到液体浮力 F浮:</span>
                <span className="font-bold text-emerald-600">
                  {formatNumber(physics.buoyancyForceN, 3)} N
                </span>
              </div>
              {physics.state === 'sunk' && (
                <div className="flex justify-between pt-1 text-amber-700">
                  <span>水槽底部支持力 F支:</span>
                  <span className="font-bold">
                    {formatNumber(physics.normalForceN, 3)} N (G - F浮)
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Visual Simulation Stage (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center">
            {/* Status Header Badge */}
            <div className="w-full flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-mono tracking-wider text-slate-400">
                  浮沉状态判别
                </span>
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
                    ? '漂浮状态 (ρ物 < ρ液)'
                    : physics.state === 'suspended'
                    ? '悬浮状态 (ρ物 = ρ液)'
                    : '沉底状态 (ρ物 > ρ液)'}
                </span>
              </div>

              {physics.state === 'floating' && (
                <span className="text-xs text-slate-500 font-mono">
                  露出液面: {(physics.exposedRatio * 100).toFixed(1)}% · 浸入: {(physics.submergedRatio * 100).toFixed(1)}%
                </span>
              )}
            </div>

            {/* SVG Interactive Physics Tank */}
            <div className="relative w-full max-w-md bg-slate-900/5 rounded-xl p-4 flex justify-center overflow-hidden border border-slate-200">
              <svg width={tankWidth} height={tankHeight} viewBox={`0 0 ${tankWidth} ${tankHeight}`}>
                <defs>
                  {/* Glass reflections */}
                  <linearGradient id="glassReflect" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
                    <stop offset="15%" stopColor="#ffffff" stopOpacity="0.05" />
                    <stop offset="85%" stopColor="#ffffff" stopOpacity="0.05" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0.3" />
                  </linearGradient>

                  {/* Water liquid gradient */}
                  <linearGradient id="liquidGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.65" />
                    <stop offset="100%" stopColor="#0284c7" stopOpacity="0.85" />
                  </linearGradient>
                </defs>

                {/* Tank Back Wall */}
                <rect
                  x="20"
                  y="40"
                  width={tankWidth - 40}
                  height={tankBottomY - 40}
                  rx="6"
                  fill="#f8fafc"
                  stroke="#cbd5e1"
                  strokeWidth="2"
                />

                {/* Scale Ticks on Tank left */}
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
                  fill="url(#liquidGrad)"
                  opacity="0.8"
                />

                {/* Liquid Surface Line */}
                <line
                  x1="22"
                  y1={liquidLevelY}
                  x2={tankWidth - 22}
                  y2={liquidLevelY}
                  stroke="#0284c7"
                  strokeWidth="2.5"
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
                    fill="#e2e8f0"
                    stroke="#475569"
                    strokeWidth="2"
                    className="transition-all duration-500 ease-out"
                  />
                  <text
                    x={blockX + blockSize / 2}
                    y={blockY + blockSize / 2 + 4}
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight="bold"
                    fontFamily="monospace"
                    fill="#1e293b"
                  >
                    {objectName.slice(0, 4)}
                  </text>
                </g>

                {/* Force Vector Arrows */}
                {/* Gravity Arrow G (pointing down from center) */}
                <g transform={`translate(${blockX + blockSize / 2}, ${blockY + blockSize / 2})`}>
                  {/* Arrow G */}
                  <line
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="38"
                    stroke="#dc2626"
                    strokeWidth="2.5"
                    markerEnd="url(#arrowRed)"
                  />
                  <circle cx="0" cy="0" r="3" fill="#dc2626" />
                  <text x="8" y="32" fontSize="11" fontWeight="bold" fontFamily="monospace" fill="#dc2626">
                    G = {formatNumber(physics.forceG, 2)}N
                  </text>

                  {/* Buoyancy Arrow F_buoyant (pointing up from center) */}
                  <line
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="-38"
                    stroke="#16a34a"
                    strokeWidth="2.5"
                  />
                  <text x="8" y="-24" fontSize="11" fontWeight="bold" fontFamily="monospace" fill="#16a34a">
                    F浮 = {formatNumber(physics.buoyancyForceN, 2)}N
                  </text>
                </g>

                {/* Tank Glass Reflection */}
                <rect
                  x="20"
                  y="40"
                  width={tankWidth - 40}
                  height={tankBottomY - 40}
                  rx="6"
                  fill="url(#glassReflect)"
                  pointerEvents="none"
                />
              </svg>
            </div>

            {/* Explanation Note */}
            <div className="w-full mt-4 p-4 bg-slate-50 rounded-lg border border-slate-200/80 text-xs text-slate-600 space-y-1.5">
              <div className="font-semibold text-slate-800">
                物理浮沉原理解析:
              </div>
              <div>
                • <strong>漂浮条件 (ρ物 &lt; ρ液)</strong>: 物体受平衡力作用，浮力与重力相等 (F浮 = G)。物体露出液面，浸入比例 V排 / V = ρ物 / ρ液。
              </div>
              <div>
                • <strong>悬浮条件 (ρ物 = ρ液)</strong>: 物体完全浸没且可以静止在液体中任意深度，F浮 = G。
              </div>
              <div>
                • <strong>沉底条件 (ρ物 &gt; ρ液)</strong>: 浮力小于重力 (F浮 &lt; G)，物体下沉至容器底部，容器底部对物体施加支持力 F支 = G - F浮。
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
