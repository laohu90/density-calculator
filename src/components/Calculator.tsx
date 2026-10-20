import React, { useState, useMemo } from 'react';
import {
  CalculationMode,
  DensityUnit,
  MassUnit,
  VolumeUnit,
  Substance,
} from '../types/density';
import {
  massToGram,
  gramToMass,
  volumeToCm3,
  cm3ToVolume,
  densityToGcm3,
  gcm3ToDensity,
  formatNumber,
  getSIEquivalents,
} from '../utils/units';
import { DEFAULT_SUBSTANCES } from '../data/materials';
import confetti from 'canvas-confetti';
import { Copy, Check, Sparkles, Scale, Beaker, ArrowRight, BookOpen } from 'lucide-react';

interface CalculatorProps {
  onSelectSubstanceForBuoyancy?: (substance: Substance) => void;
}

export const Calculator: React.FC<CalculatorProps> = ({ onSelectSubstanceForBuoyancy }) => {
  const [mode, setMode] = useState<CalculationMode>('density');

  // Input States
  const [massInput, setMassInput] = useState<string>('78.7');
  const [massUnit, setMassUnit] = useState<MassUnit>('g');

  const [volumeInput, setVolumeInput] = useState<string>('10');
  const [volumeUnit, setVolumeUnit] = useState<VolumeUnit>('cm³');

  const [densityInput, setDensityInput] = useState<string>('7.87');
  const [densityUnit, setDensityUnit] = useState<DensityUnit>('g/cm³');

  const [precision, setPrecision] = useState<number>(4);
  const [copied, setCopied] = useState<boolean>(false);
  const [selectedSubstanceName, setSelectedSubstanceName] = useState<string>('铁 (Iron)');

  // Selected quick material
  const handleSelectMaterial = (sub: Substance) => {
    setSelectedSubstanceName(sub.name);
    // Convert to current densityUnit
    const inCurrentUnit = gcm3ToDensity(sub.density, densityUnit);
    setDensityInput(formatNumber(inCurrentUnit, 4));

    if (mode === 'mass') {
      // recalculates mass
    } else if (mode === 'volume') {
      // recalculates volume
    } else {
      // switch or set values
      setMode('mass'); // natural next step: given density & volume, find mass
    }
  };

  // Perform calculations
  const calculation = useMemo(() => {
    const mNum = parseFloat(massInput);
    const vNum = parseFloat(volumeInput);
    const dNum = parseFloat(densityInput);

    let calculatedGcm3 = 0;
    let calculatedMassG = 0;
    let calculatedVolumeCm3 = 0;

    const massInG = !isNaN(mNum) && mNum > 0 ? massToGram(mNum, massUnit) : 0;
    const volInCm3 = !isNaN(vNum) && vNum > 0 ? volumeToCm3(vNum, volumeUnit) : 0;
    const densInGcm3 = !isNaN(dNum) && dNum > 0 ? densityToGcm3(dNum, densityUnit) : 0;

    let isValid = false;
    let stepRows: { label: string; text: string }[] = [];

    if (mode === 'density') {
      if (massInG > 0 && volInCm3 > 0) {
        calculatedMassG = massInG;
        calculatedVolumeCm3 = volInCm3;
        calculatedGcm3 = massInG / volInCm3;
        isValid = true;

        stepRows = [
          {
            label: '已知物理量',
            text: `质量 m = ${massInput} ${massUnit}，体积 V = ${volumeInput} ${volumeUnit}`,
          },
          {
            label: '统一标准单位',
            text: `m = ${formatNumber(massInG / 1000, 6)} kg, V = ${formatNumber(volInCm3 / 1e6, 8)} m³ (或 m = ${formatNumber(massInG)} g, V = ${formatNumber(volInCm3)} cm³)`,
          },
          {
            label: '密度基本公式',
            text: `ρ = m / V`,
          },
          {
            label: '代入数值推导',
            text: `ρ = ${formatNumber(massInG)} g / ${formatNumber(volInCm3)} cm³ = ${formatNumber(calculatedGcm3, precision)} g/cm³`,
          },
          {
            label: '换算为国际单位 (SI)',
            text: `ρ = ${formatNumber(calculatedGcm3 * 1000, precision)} kg/m³ (1 g/cm³ = 1000 kg/m³)`,
          },
        ];
      }
    } else if (mode === 'mass') {
      if (densInGcm3 > 0 && volInCm3 > 0) {
        calculatedGcm3 = densInGcm3;
        calculatedVolumeCm3 = volInCm3;
        calculatedMassG = densInGcm3 * volInCm3;
        isValid = true;

        stepRows = [
          {
            label: '已知物理量',
            text: `密度 ρ = ${densityInput} ${densityUnit}，体积 V = ${volumeInput} ${volumeUnit}`,
          },
          {
            label: '统一标准单位',
            text: `ρ = ${formatNumber(densInGcm3)} g/cm³, V = ${formatNumber(volInCm3)} cm³`,
          },
          {
            label: '公式变形推导',
            text: `由 ρ = m / V 变形得：m = ρ × V`,
          },
          {
            label: '代入数值计算',
            text: `m = ${formatNumber(densInGcm3)} g/cm³ × ${formatNumber(volInCm3)} cm³ = ${formatNumber(calculatedMassG, precision)} g`,
          },
          {
            label: '换算为所选单位及国际单位',
            text: `m = ${formatNumber(gramToMass(calculatedMassG, massUnit), precision)} ${massUnit} (国际标准单位: ${formatNumber(calculatedMassG / 1000, precision)} kg)`,
          },
        ];
      }
    } else if (mode === 'volume') {
      if (massInG > 0 && densInGcm3 > 0) {
        calculatedMassG = massInG;
        calculatedGcm3 = densInGcm3;
        calculatedVolumeCm3 = massInG / densInGcm3;
        isValid = true;

        stepRows = [
          {
            label: '已知物理量',
            text: `质量 m = ${massInput} ${massUnit}，密度 ρ = ${densityInput} ${densityUnit}`,
          },
          {
            label: '统一标准单位',
            text: `m = ${formatNumber(massInG)} g, ρ = ${formatNumber(densInGcm3)} g/cm³`,
          },
          {
            label: '公式变形推导',
            text: `由 ρ = m / V 变形得：V = m / ρ`,
          },
          {
            label: '代入数值计算',
            text: `V = ${formatNumber(massInG)} g / ${formatNumber(densInGcm3)} g/cm³ = ${formatNumber(calculatedVolumeCm3, precision)} cm³`,
          },
          {
            label: '换算为所选单位及国际单位',
            text: `V = ${formatNumber(cm3ToVolume(calculatedVolumeCm3, volumeUnit), precision)} ${volumeUnit} (国际标准单位: ${formatNumber(calculatedVolumeCm3 / 1e6, precision + 2)} m³)`,
          },
        ];
      }
    }

    const si = getSIEquivalents(calculatedGcm3, calculatedMassG, calculatedVolumeCm3);

    return {
      isValid,
      densityGcm3: calculatedGcm3,
      massG: calculatedMassG,
      volumeCm3: calculatedVolumeCm3,
      si,
      stepRows,
    };
  }, [mode, massInput, massUnit, volumeInput, volumeUnit, densityInput, densityUnit, precision]);

  // Copy derivation text
  const handleCopySteps = () => {
    if (!calculation.isValid) return;
    const text = [
      `【物理密度计算推导步骤】`,
      ...calculation.stepRows.map((s) => `${s.label}: ${s.text}`),
      `最终结论: 密度 ρ = ${formatNumber(calculation.densityGcm3)} g/cm³ = ${formatNumber(calculation.si.densitySI)} kg/m³`,
    ].join('\n');

    navigator.clipboard.writeText(text);
    setCopied(true);
    confetti({ particleCount: 30, spread: 60, origin: { y: 0.8 } });
    setTimeout(() => setCopied(false), 2000);
  };

  // Find closest matching substance
  const closestSubstance = useMemo(() => {
    if (!calculation.isValid || calculation.densityGcm3 <= 0) return null;
    let closest = DEFAULT_SUBSTANCES[0];
    let minDiff = Math.abs(closest.density - calculation.densityGcm3);
    for (const s of DEFAULT_SUBSTANCES) {
      const diff = Math.abs(s.density - calculation.densityGcm3);
      if (diff < minDiff) {
        minDiff = diff;
        closest = s;
      }
    }
    const diffPct = (Math.abs(closest.density - calculation.densityGcm3) / closest.density) * 100;
    return {
      substance: closest,
      diffPct,
      isVeryClose: diffPct < 5,
    };
  }, [calculation.densityGcm3, calculation.isValid]);

  return (
    <div className="space-y-6">
      {/* Mode Selector - Clean Segmented Control */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 font-mono">
            计算目标
          </span>
          <div className="flex items-center p-1 bg-slate-100 rounded-lg">
            <button
              onClick={() => setMode('density')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all whitespace-nowrap shrink-0 ${
                mode === 'density'
                  ? 'bg-white text-blue-700 shadow-sm font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              求密度 (ρ = m/V)
            </button>
            <button
              onClick={() => setMode('mass')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all whitespace-nowrap shrink-0 ${
                mode === 'mass'
                  ? 'bg-white text-blue-700 shadow-sm font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              求质量 (m = ρ·V)
            </button>
            <button
              onClick={() => setMode('volume')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all whitespace-nowrap shrink-0 ${
                mode === 'volume'
                  ? 'bg-white text-blue-700 shadow-sm font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              求体积 (V = m/ρ)
            </button>
          </div>
        </div>

        {/* Precision Setting */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-medium">保留小数</span>
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-md">
            {[2, 3, 4, 6].map((p) => (
              <button
                key={p}
                onClick={() => setPrecision(p)}
                className={`px-2 py-0.5 text-xs font-mono rounded ${
                  precision === p ? 'bg-white text-slate-900 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {p}位
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Calculation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Input Parameters & Presets (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Scale className="w-5 h-5 text-blue-600" />
                输入已知物理参数
              </h2>
              <span className="text-xs text-slate-400 font-mono">
                自动同步国际单位制 (SI)
              </span>
            </div>

            {/* Mass Input (Visible in density & volume mode) */}
            {mode !== 'mass' && (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                    <span>物体的质量 (m)</span>
                    <span className="text-xs font-normal text-slate-400 font-mono">[Mass]</span>
                  </label>
                  <span className="text-xs font-mono text-slate-500">
                    SI基准: {formatNumber(massToGram(parseFloat(massInput) || 0, massUnit) / 1000, 5)} kg
                  </span>
                </div>
                <div className="flex rounded-lg shadow-xs">
                  <input
                    type="number"
                    step="any"
                    value={massInput}
                    onChange={(e) => setMassInput(e.target.value)}
                    placeholder="输入质量数值"
                    className="block w-full rounded-l-lg border-y border-l border-slate-300 px-3.5 py-2.5 text-slate-900 text-lg font-mono focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                  />
                  <select
                    value={massUnit}
                    onChange={(e) => setMassUnit(e.target.value as MassUnit)}
                    className="rounded-r-lg border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm font-semibold text-slate-700 focus:border-blue-500 focus:outline-none cursor-pointer"
                  >
                    <option value="g">克 (g)</option>
                    <option value="kg">千克 (kg - SI)</option>
                    <option value="mg">毫克 (mg)</option>
                    <option value="t">吨 (t)</option>
                    <option value="lb">磅 (lb)</option>
                    <option value="oz">盎司 (oz)</option>
                  </select>
                </div>
              </div>
            )}

            {/* Volume Input (Visible in density & mass mode) */}
            {mode !== 'volume' && (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                    <span>物体的体积 (V)</span>
                    <span className="text-xs font-normal text-slate-400 font-mono">[Volume]</span>
                  </label>
                  <span className="text-xs font-mono text-slate-500">
                    SI基准: {formatNumber(volumeToCm3(parseFloat(volumeInput) || 0, volumeUnit) / 1e6, 7)} m³
                  </span>
                </div>
                <div className="flex rounded-lg shadow-xs">
                  <input
                    type="number"
                    step="any"
                    value={volumeInput}
                    onChange={(e) => setVolumeInput(e.target.value)}
                    placeholder="输入体积数值"
                    className="block w-full rounded-l-lg border-y border-l border-slate-300 px-3.5 py-2.5 text-slate-900 text-lg font-mono focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                  />
                  <select
                    value={volumeUnit}
                    onChange={(e) => setVolumeUnit(e.target.value as VolumeUnit)}
                    className="rounded-r-lg border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm font-semibold text-slate-700 focus:border-blue-500 focus:outline-none cursor-pointer"
                  >
                    <option value="cm³">立方厘米 (cm³)</option>
                    <option value="m³">立方米 (m³ - SI)</option>
                    <option value="dm³">立方分米 (dm³)</option>
                    <option value="L">升 (L)</option>
                    <option value="mL">毫升 (mL)</option>
                    <option value="mm³">立方毫米 (mm³)</option>
                    <option value="ft³">立方英尺 (ft³)</option>
                    <option value="in³">立方英寸 (in³)</option>
                    <option value="gal">美制加仑 (gal)</option>
                  </select>
                </div>
              </div>
            )}

            {/* Density Input (Visible in mass & volume mode) */}
            {mode !== 'density' && (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                    <span>物质的密度 (ρ)</span>
                    <span className="text-xs font-normal text-slate-400 font-mono">[Density]</span>
                  </label>
                  <span className="text-xs font-mono text-slate-500">
                    SI基准: {formatNumber(densityToGcm3(parseFloat(densityInput) || 0, densityUnit) * 1000, 4)} kg/m³
                  </span>
                </div>
                <div className="flex rounded-lg shadow-xs">
                  <input
                    type="number"
                    step="any"
                    value={densityInput}
                    onChange={(e) => {
                      setDensityInput(e.target.value);
                      setSelectedSubstanceName('自定义物质');
                    }}
                    placeholder="输入密度数值"
                    className="block w-full rounded-l-lg border-y border-l border-slate-300 px-3.5 py-2.5 text-slate-900 text-lg font-mono focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                  />
                  <select
                    value={densityUnit}
                    onChange={(e) => setDensityUnit(e.target.value as DensityUnit)}
                    className="rounded-r-lg border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm font-semibold text-slate-700 focus:border-blue-500 focus:outline-none cursor-pointer"
                  >
                    <option value="g/cm³">g/cm³ (克/立方厘米)</option>
                    <option value="kg/m³">kg/m³ (千克/立方米 - SI)</option>
                    <option value="g/mL">g/mL (克/毫升)</option>
                    <option value="kg/L">kg/L (千克/升)</option>
                    <option value="lb/ft³">lb/ft³ (磅/立方英尺)</option>
                    <option value="lb/in³">lb/in³ (磅/立方英寸)</option>
                  </select>
                </div>
              </div>
            )}

            {/* Quick Material Presets */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-600">
                  常用物质密度一键填入:
                </span>
                <span className="text-xs text-blue-600 font-medium">
                  当前设定: {selectedSubstanceName}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { name: '纯水', id: 'water-4c', val: 1.0 },
                  { name: '铁/纯钢', id: 'iron', val: 7.87 },
                  { name: '铝', id: 'aluminum', val: 2.7 },
                  { name: '纯铜', id: 'copper', val: 8.96 },
                  { name: '纯金', id: 'gold', val: 19.32 },
                  { name: '水银', id: 'mercury', val: 13.6 },
                  { name: '酒精', id: 'alcohol', val: 0.789 },
                  { name: '冰(0℃)', id: 'ice', val: 0.917 },
                  { name: '植物油', id: 'vegetable-oil', val: 0.92 },
                  { name: '玻璃', id: 'glass', val: 2.5 },
                  { name: '橡木', id: 'oak-wood', val: 0.75 },
                  { name: '空气(0℃)', id: 'air', val: 0.001293 },
                ].map((item) => {
                  const targetSub = DEFAULT_SUBSTANCES.find((s) => s.id === item.id);
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        if (targetSub) handleSelectMaterial(targetSub);
                      }}
                      className="px-2.5 py-1 text-xs font-medium rounded bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 transition-colors border border-slate-200/80"
                    >
                      {item.name} ({item.val} g/cm³)
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Detailed Physics Derivation Card */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-600" />
                <h3 className="text-base font-bold text-slate-900">
                  完整物理公式与推导步骤详解
                </h3>
              </div>
              <button
                onClick={handleCopySteps}
                disabled={!calculation.isValid}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors disabled:opacity-50"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>已复制</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>复制步骤</span>
                  </>
                )}
              </button>
            </div>

            {calculation.isValid ? (
              <div className="space-y-3">
                {calculation.stepRows.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-slate-50/70 rounded-lg border border-slate-100 flex flex-col sm:flex-row sm:items-baseline gap-2"
                  >
                    <span className="text-xs font-mono font-semibold text-indigo-600 min-w-32 shrink-0">
                      步骤 {idx + 1} · {step.label}
                    </span>
                    <span className="text-sm font-mono text-slate-800 break-all">
                      {step.text}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-sm text-slate-400">
                请输入有效的正数质量与体积数值以生成推导步骤
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Output Card & Visual Comparison (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Main Result Card */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/70 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />

            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                计算求解结果
              </span>
              <span className="text-xs font-mono text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                计算完成
              </span>
            </div>

            <div className="my-5">
              <span className="text-xs font-semibold text-slate-500 uppercase font-mono">
                {mode === 'density'
                  ? '求得密度 (ρ)'
                  : mode === 'mass'
                  ? '求得质量 (m)'
                  : '求得体积 (V)'}
              </span>

              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-4xl font-extrabold font-mono tracking-tight text-blue-600 tabular-nums">
                  {mode === 'density'
                    ? formatNumber(gcm3ToDensity(calculation.densityGcm3, densityUnit), precision)
                    : mode === 'mass'
                    ? formatNumber(gramToMass(calculation.massG, massUnit), precision)
                    : formatNumber(cm3ToVolume(calculation.volumeCm3, volumeUnit), precision)}
                </span>
                <span className="text-base font-bold text-slate-700 font-mono">
                  {mode === 'density' ? densityUnit : mode === 'mass' ? massUnit : volumeUnit}
                </span>
              </div>
            </div>

            {/* International Standard SI Unit Output */}
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">国际标准单位 (SI)</span>
                <span className="text-xs text-slate-400 font-mono">kg, m³, kg/m³</span>
              </div>
              <div className="grid grid-cols-3 gap-2 pt-1 font-mono text-xs">
                <div>
                  <span className="text-slate-400 block">密度 ρ</span>
                  <span className="font-bold text-slate-900 tabular-nums">
                    {formatNumber(calculation.si.densitySI, precision)} kg/m³
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block">质量 m</span>
                  <span className="font-bold text-slate-900 tabular-nums">
                    {formatNumber(calculation.si.massSI, precision)} kg
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block">体积 V</span>
                  <span className="font-bold text-slate-900 tabular-nums">
                    {formatNumber(calculation.si.volumeSI, precision + 2)} m³
                  </span>
                </div>
              </div>
            </div>

            {/* Physical Characteristics & Water Floating Assessment */}
            {calculation.isValid && calculation.densityGcm3 > 0 && (
              <div className="mt-4 pt-4 border-t border-slate-100 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">水中的浮沉状态:</span>
                  <span
                    className={`font-semibold font-mono ${
                      calculation.densityGcm3 < 1.0
                        ? 'text-sky-600'
                        : calculation.densityGcm3 === 1.0
                        ? 'text-teal-600'
                        : 'text-amber-600'
                    }`}
                  >
                    {calculation.densityGcm3 < 1.0
                      ? `漂浮 (露出率 ${formatNumber((1 - calculation.densityGcm3) * 100, 1)}%)`
                      : calculation.densityGcm3 === 1.0
                      ? '悬浮在水中'
                      : `沉底 (密度比水大 ${formatNumber(calculation.densityGcm3, 2)}倍)`}
                  </span>
                </div>

                {closestSubstance && (
                  <div className="text-xs p-2.5 bg-blue-50/50 rounded-lg border border-blue-100/60 flex items-center justify-between">
                    <span className="text-slate-600">最接近的天然常见物质:</span>
                    <span className="font-bold text-blue-700">
                      {closestSubstance.substance.name} ({closestSubstance.substance.density} g/cm³)
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Unit Equivalents Matrix */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
              常用单位换算速查表
            </h4>
            <div className="divide-y divide-slate-100 text-xs font-mono">
              <div className="py-2 flex justify-between items-center">
                <span className="text-slate-600">1 g/cm³</span>
                <span className="font-semibold text-slate-900">= 1,000 kg/m³ = 1 g/mL = 1 kg/L</span>
              </div>
              <div className="py-2 flex justify-between items-center">
                <span className="text-slate-600">1 g/cm³ (英制)</span>
                <span className="font-semibold text-slate-900">= 62.428 lb/ft³ ≈ 0.0361 lb/in³</span>
              </div>
              <div className="py-2 flex justify-between items-center">
                <span className="text-slate-600">1 m³</span>
                <span className="font-semibold text-slate-900">= 1,000 dm³ = 1,000 L = 10⁶ cm³</span>
              </div>
              <div className="py-2 flex justify-between items-center">
                <span className="text-slate-600">1 kg</span>
                <span className="font-semibold text-slate-900">= 1,000 g = 10⁶ mg = 0.001 t</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
