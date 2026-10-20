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
import { Language, TRANSLATIONS } from '../i18n/translations';
import confetti from 'canvas-confetti';
import { Copy, Check, Scale, BookOpen, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface CalculatorProps {
  lang: Language;
  onSelectSubstanceForBuoyancy?: (substance: Substance) => void;
  onDensityChange?: (densityGcm3: number) => void;
  selectedDensityPreset?: number | null;
}

export const Calculator: React.FC<CalculatorProps> = ({
  lang,
  onDensityChange,
  selectedDensityPreset,
}) => {
  const t = TRANSLATIONS[lang];
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
  const [showSteps, setShowSteps] = useState<boolean>(true);
  const [selectedSubstanceName, setSelectedSubstanceName] = useState<string>(
    lang === 'en' ? 'Iron / Steel' : '纯铁 / 纯钢'
  );

  // Apply density preset if selected from external scale
  React.useEffect(() => {
    if (selectedDensityPreset && selectedDensityPreset > 0) {
      const inCurrent = gcm3ToDensity(selectedDensityPreset, densityUnit);
      setDensityInput(formatNumber(inCurrent, 4));
      setSelectedSubstanceName(lang === 'en' ? 'Selected Substance' : '已选定物质');
      if (mode === 'density') {
        setMode('mass');
      }
    }
  }, [selectedDensityPreset]);

  // Quick Material Presets
  const quickSubstances = useMemo(() => {
    return [
      { id: 'water-4c', nameEn: 'Water (4°C)', nameZh: '纯水 (4℃)', val: 1.0 },
      { id: 'iron', nameEn: 'Iron / Steel', nameZh: '铁 / 钢', val: 7.87 },
      { id: 'aluminum', nameEn: 'Aluminum', nameZh: '纯铝', val: 2.7 },
      { id: 'copper', nameEn: 'Copper', nameZh: '纯铜', val: 8.96 },
      { id: 'gold', nameEn: 'Gold', nameZh: '黄金', val: 19.32 },
      { id: 'mercury', nameEn: 'Mercury', nameZh: '水银 / 汞', val: 13.6 },
      { id: 'alcohol', nameEn: 'Alcohol (Ethanol)', nameZh: '无水酒精', val: 0.789 },
      { id: 'ice', nameEn: 'Ice (0°C)', nameZh: '冰 (0℃)', val: 0.917 },
      { id: 'vegetable-oil', nameEn: 'Vegetable Oil', nameZh: '植物油', val: 0.92 },
      { id: 'glass', nameEn: 'Glass', nameZh: '平板玻璃', val: 2.5 },
      { id: 'air', nameEn: 'Air (0°C)', nameZh: '空气 (0℃)', val: 0.001293 },
    ];
  }, []);

  const handleSelectMaterial = (sub: Substance) => {
    const displayName = lang === 'en' ? sub.nameEn : sub.name;
    setSelectedSubstanceName(displayName);
    const inCurrentUnit = gcm3ToDensity(sub.density, densityUnit);
    setDensityInput(formatNumber(inCurrentUnit, 4));

    if (mode === 'density') {
      setMode('mass');
    }
  };

  // Perform Calculations
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
    let errorMsg = '';
    let stepRows: { label: string; text: string }[] = [];

    if (mode === 'density') {
      if (isNaN(mNum) || mNum <= 0) {
        errorMsg = lang === 'en' ? 'Mass must be greater than 0' : '质量必须大于0';
      } else if (isNaN(vNum) || vNum <= 0) {
        errorMsg = lang === 'en' ? 'Volume cannot be zero or negative (division by zero)' : '体积不能为0或负数（除数不能为0）';
      } else {
        calculatedMassG = massInG;
        calculatedVolumeCm3 = volInCm3;
        calculatedGcm3 = massInG / volInCm3;
        isValid = true;

        stepRows = [
          {
            label: t.stepGiven,
            text:
              lang === 'en'
                ? `Mass m = ${massInput} ${massUnit}, Volume V = ${volumeInput} ${volumeUnit}`
                : `质量 m = ${massInput} ${massUnit}，体积 V = ${volumeInput} ${volumeUnit}`,
          },
          {
            label: t.stepUnits,
            text: `m = ${formatNumber(massInG)} g (${formatNumber(massInG / 1000, 6)} kg), V = ${formatNumber(volInCm3)} cm³ (${formatNumber(volInCm3 / 1e6, 8)} m³)`,
          },
          {
            label: t.stepFormula,
            text: 'ρ = m / V',
          },
          {
            label: t.stepSubstitute,
            text: `ρ = ${formatNumber(massInG)} g / ${formatNumber(volInCm3)} cm³ = ${formatNumber(calculatedGcm3, precision)} g/cm³`,
          },
          {
            label: t.stepResultSI,
            text: `ρ = ${formatNumber(calculatedGcm3 * 1000, precision)} kg/m³ (1 g/cm³ = 1,000 kg/m³)`,
          },
        ];
      }
    } else if (mode === 'mass') {
      if (isNaN(dNum) || dNum <= 0) {
        errorMsg = lang === 'en' ? 'Density must be greater than 0' : '密度必须大于0';
      } else if (isNaN(vNum) || vNum <= 0) {
        errorMsg = lang === 'en' ? 'Volume must be greater than 0' : '体积必须大于0';
      } else {
        calculatedGcm3 = densInGcm3;
        calculatedVolumeCm3 = volInCm3;
        calculatedMassG = densInGcm3 * volInCm3;
        isValid = true;

        stepRows = [
          {
            label: t.stepGiven,
            text:
              lang === 'en'
                ? `Density ρ = ${densityInput} ${densityUnit}, Volume V = ${volumeInput} ${volumeUnit}`
                : `密度 ρ = ${densityInput} ${densityUnit}，体积 V = ${volumeInput} ${volumeUnit}`,
          },
          {
            label: t.stepUnits,
            text: `ρ = ${formatNumber(densInGcm3)} g/cm³, V = ${formatNumber(volInCm3)} cm³`,
          },
          {
            label: t.stepFormula,
            text: 'm = ρ × V',
          },
          {
            label: t.stepSubstitute,
            text: `m = ${formatNumber(densInGcm3)} g/cm³ × ${formatNumber(volInCm3)} cm³ = ${formatNumber(calculatedMassG, precision)} g`,
          },
          {
            label: t.stepResultSI,
            text: `m = ${formatNumber(gramToMass(calculatedMassG, massUnit), precision)} ${massUnit} (${formatNumber(calculatedMassG / 1000, precision)} kg)`,
          },
        ];
      }
    } else if (mode === 'volume') {
      if (isNaN(mNum) || mNum <= 0) {
        errorMsg = lang === 'en' ? 'Mass must be greater than 0' : '质量必须大于0';
      } else if (isNaN(dNum) || dNum <= 0) {
        errorMsg = lang === 'en' ? 'Density cannot be zero or negative' : '密度不能为0或负数';
      } else {
        calculatedMassG = massInG;
        calculatedGcm3 = densInGcm3;
        calculatedVolumeCm3 = massInG / densInGcm3;
        isValid = true;

        stepRows = [
          {
            label: t.stepGiven,
            text:
              lang === 'en'
                ? `Mass m = ${massInput} ${massUnit}, Density ρ = ${densityInput} ${densityUnit}`
                : `质量 m = ${massInput} ${massUnit}，密度 ρ = ${densityInput} ${densityUnit}`,
          },
          {
            label: t.stepUnits,
            text: `m = ${formatNumber(massInG)} g, ρ = ${formatNumber(densInGcm3)} g/cm³`,
          },
          {
            label: t.stepFormula,
            text: 'V = m / ρ',
          },
          {
            label: t.stepSubstitute,
            text: `V = ${formatNumber(massInG)} g / ${formatNumber(densInGcm3)} g/cm³ = ${formatNumber(calculatedVolumeCm3, precision)} cm³`,
          },
          {
            label: t.stepResultSI,
            text: `V = ${formatNumber(cm3ToVolume(calculatedVolumeCm3, volumeUnit), precision)} ${volumeUnit} (${formatNumber(calculatedVolumeCm3 / 1e6, precision + 2)} m³)`,
          },
        ];
      }
    }

    const si = getSIEquivalents(calculatedGcm3, calculatedMassG, calculatedVolumeCm3);

    return {
      isValid,
      errorMsg,
      densityGcm3: calculatedGcm3,
      massG: calculatedMassG,
      volumeCm3: calculatedVolumeCm3,
      si,
      stepRows,
    };
  }, [mode, massInput, massUnit, volumeInput, volumeUnit, densityInput, densityUnit, precision, lang, t]);

  React.useEffect(() => {
    if (calculation.isValid && calculation.densityGcm3 > 0 && onDensityChange) {
      onDensityChange(calculation.densityGcm3);
    }
  }, [calculation.densityGcm3, calculation.isValid, onDensityChange]);

  const handleCopySteps = async () => {
    if (!calculation.isValid) return;
    const headerLine = lang === 'en' ? '【Physics Density Derivation Steps】' : '【物理密度计算推导步骤】';
    const text = [
      headerLine,
      ...calculation.stepRows.map((s) => `${s.label}: ${s.text}`),
      lang === 'en'
        ? `Result: Density ρ = ${formatNumber(calculation.densityGcm3)} g/cm³ = ${formatNumber(calculation.si.densitySI)} kg/m³`
        : `最终结论: 密度 ρ = ${formatNumber(calculation.densityGcm3)} g/cm³ = ${formatNumber(calculation.si.densitySI)} kg/m³`,
    ].join('\n');

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      confetti({ particleCount: 20, spread: 45, origin: { y: 0.8 } });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.warn('Copy failed:', err);
    }
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
      name: lang === 'en' ? closest.nameEn : closest.name,
    };
  }, [calculation.densityGcm3, calculation.isValid, lang]);

  return (
    <div className="space-y-6">
      {/* Target Selector & Precision Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 font-mono">
            {t.calcTarget}
          </span>
          <div className="flex items-center p-1 bg-slate-100 rounded-lg">
            <button
              onClick={() => setMode('density')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                mode === 'density'
                  ? 'bg-white text-blue-700 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.targetDensity}
            </button>
            <button
              onClick={() => setMode('mass')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                mode === 'mass'
                  ? 'bg-white text-blue-700 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.targetMass}
            </button>
            <button
              onClick={() => setMode('volume')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                mode === 'volume'
                  ? 'bg-white text-blue-700 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.targetVolume}
            </button>
          </div>
        </div>

        {/* Precision Setting */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-medium">{t.precision}</span>
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-md">
            {[2, 3, 4, 6].map((p) => (
              <button
                key={p}
                onClick={() => setPrecision(p)}
                className={`px-2 py-0.5 text-xs font-mono rounded ${
                  precision === p
                    ? 'bg-white text-slate-900 font-bold shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Calculation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Parameter Inputs (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Scale className="w-4 h-4 text-blue-600" />
                <span>{t.inputParameters}</span>
              </h2>
              <span className="text-2xs text-slate-400 font-mono">
                {t.siAutoSync}
              </span>
            </div>

            {/* Error prompt if invalid */}
            {!calculation.isValid && calculation.errorMsg && (
              <div className="p-3 bg-rose-50 rounded-lg border border-rose-100 flex items-center gap-2 text-xs text-rose-700 font-medium">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{calculation.errorMsg}</span>
              </div>
            )}

            {/* Mass Input */}
            {mode !== 'mass' && (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-700">
                    {t.massLabel}
                  </label>
                  <span className="text-2xs font-mono text-slate-400">
                    {t.siBase}: {formatNumber(massToGram(parseFloat(massInput) || 0, massUnit) / 1000, 5)} kg
                  </span>
                </div>
                <div className="flex rounded-lg shadow-2xs">
                  <input
                    type="number"
                    step="any"
                    value={massInput}
                    onChange={(e) => setMassInput(e.target.value)}
                    placeholder={t.massPlaceholder}
                    className="block w-full rounded-l-lg border-y border-l border-slate-300 px-3.5 py-2 text-slate-900 text-base font-mono focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                  />
                  <select
                    value={massUnit}
                    onChange={(e) => setMassUnit(e.target.value as MassUnit)}
                    className="rounded-r-lg border border-slate-300 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 focus:border-blue-500 focus:outline-none cursor-pointer"
                  >
                    <option value="g">g (gram)</option>
                    <option value="kg">kg (SI base)</option>
                    <option value="mg">mg (milligram)</option>
                    <option value="t">t (metric ton)</option>
                    <option value="lb">lb (pound)</option>
                    <option value="oz">oz (ounce)</option>
                  </select>
                </div>
              </div>
            )}

            {/* Volume Input */}
            {mode !== 'volume' && (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-700">
                    {t.volumeLabel}
                  </label>
                  <span className="text-2xs font-mono text-slate-400">
                    {t.siBase}: {formatNumber(volumeToCm3(parseFloat(volumeInput) || 0, volumeUnit) / 1e6, 7)} m³
                  </span>
                </div>
                <div className="flex rounded-lg shadow-2xs">
                  <input
                    type="number"
                    step="any"
                    value={volumeInput}
                    onChange={(e) => setVolumeInput(e.target.value)}
                    placeholder={t.volumePlaceholder}
                    className="block w-full rounded-l-lg border-y border-l border-slate-300 px-3.5 py-2 text-slate-900 text-base font-mono focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                  />
                  <select
                    value={volumeUnit}
                    onChange={(e) => setVolumeUnit(e.target.value as VolumeUnit)}
                    className="rounded-r-lg border border-slate-300 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 focus:border-blue-500 focus:outline-none cursor-pointer"
                  >
                    <option value="cm³">cm³ (cubic centimeter)</option>
                    <option value="m³">m³ (SI base)</option>
                    <option value="dm³">dm³ (cubic decimeter)</option>
                    <option value="L">L (liter)</option>
                    <option value="mL">mL (milliliter)</option>
                    <option value="mm³">mm³</option>
                    <option value="ft³">ft³ (cubic foot)</option>
                    <option value="in³">in³ (cubic inch)</option>
                    <option value="gal">gal (US gallon)</option>
                  </select>
                </div>
              </div>
            )}

            {/* Density Input */}
            {mode !== 'density' && (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-700">
                    {t.densityLabel}
                  </label>
                  <span className="text-2xs font-mono text-slate-400">
                    {t.siBase}: {formatNumber(densityToGcm3(parseFloat(densityInput) || 0, densityUnit) * 1000, 4)} kg/m³
                  </span>
                </div>
                <div className="flex rounded-lg shadow-2xs">
                  <input
                    type="number"
                    step="any"
                    value={densityInput}
                    onChange={(e) => {
                      setDensityInput(e.target.value);
                      setSelectedSubstanceName(t.customMaterial);
                    }}
                    placeholder={t.densityPlaceholder}
                    className="block w-full rounded-l-lg border-y border-l border-slate-300 px-3.5 py-2 text-slate-900 text-base font-mono focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                  />
                  <select
                    value={densityUnit}
                    onChange={(e) => setDensityUnit(e.target.value as DensityUnit)}
                    className="rounded-r-lg border border-slate-300 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 focus:border-blue-500 focus:outline-none cursor-pointer"
                  >
                    <option value="g/cm³">g/cm³</option>
                    <option value="kg/m³">kg/m³ (SI base)</option>
                    <option value="g/mL">g/mL</option>
                    <option value="kg/L">kg/L</option>
                    <option value="lb/ft³">lb/ft³</option>
                    <option value="lb/in³">lb/in³</option>
                  </select>
                </div>
              </div>
            )}

            {/* Quick Material Presets */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xs font-semibold text-slate-500 uppercase tracking-wider font-mono">
                  {t.quickFill}
                </span>
                <span className="text-2xs text-blue-600 font-medium">
                  {t.currentPreset}: {selectedSubstanceName}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {quickSubstances.map((item) => {
                  const targetSub = DEFAULT_SUBSTANCES.find((s) => s.id === item.id);
                  const label = lang === 'en' ? item.nameEn : item.nameZh;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        if (targetSub) handleSelectMaterial(targetSub);
                      }}
                      className="px-2 py-1 text-xs font-medium rounded bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 transition-colors border border-slate-200/60"
                    >
                      {label} ({item.val} g/cm³)
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Derivation Steps Card (Collapsible) */}
          <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <button
                type="button"
                onClick={() => setShowSteps(!showSteps)}
                className="flex items-center gap-2 text-left group cursor-pointer focus:outline-none"
              >
                <BookOpen className="w-4 h-4 text-indigo-600" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono group-hover:text-blue-600 transition-colors">
                  {t.derivationTitle}
                </h3>
                {showSteps ? (
                  <ChevronUp className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600" />
                )}
              </button>

              <button
                onClick={handleCopySteps}
                disabled={!calculation.isValid}
                className="flex items-center gap-1.5 px-2.5 py-1 text-2xs font-semibold rounded bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors disabled:opacity-40 cursor-pointer"
                title={t.copySteps}
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-600" />
                    <span>{t.copied}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>{t.copySteps}</span>
                  </>
                )}
              </button>
            </div>

            {showSteps && (
              calculation.isValid ? (
                <div className="space-y-2 pt-1">
                  {calculation.stepRows.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 bg-slate-50/70 rounded-lg border border-slate-100 flex flex-col sm:flex-row sm:items-baseline gap-2 text-xs"
                    >
                      <span className="text-2xs font-mono font-semibold text-indigo-600 min-w-32 shrink-0">
                        {step.label}
                      </span>
                      <span className="font-mono text-slate-800 break-all">
                        {step.text}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-xs text-slate-400">
                  {t.invalidInputsPrompt}
                </div>
              )
            )}
          </div>
        </div>

        {/* Right Column: Output Card (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs relative overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-2xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                {t.calcResultTitle}
              </span>
              <span className="text-2xs font-mono text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                {t.calcCompleted}
              </span>
            </div>

            <div className="my-5">
              <span className="text-xs font-semibold text-slate-500 font-mono">
                {mode === 'density' ? t.densityResult : mode === 'mass' ? t.massResult : t.volumeResult}
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

            {/* Standard SI Unit Output */}
            <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700">{t.siOutputTitle}</span>
                <span className="text-slate-400 font-mono text-2xs">kg, m³, kg/m³</span>
              </div>
              <div className="grid grid-cols-3 gap-2 pt-1 font-mono text-xs">
                <div>
                  <span className="text-slate-400 block text-2xs">ρ (SI)</span>
                  <span className="font-bold text-slate-900 tabular-nums">
                    {formatNumber(calculation.si.densitySI, precision)} kg/m³
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-2xs">m (SI)</span>
                  <span className="font-bold text-slate-900 tabular-nums">
                    {formatNumber(calculation.si.massSI, precision)} kg
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-2xs">V (SI)</span>
                  <span className="font-bold text-slate-900 tabular-nums">
                    {formatNumber(calculation.si.volumeSI, precision + 2)} m³
                  </span>
                </div>
              </div>
            </div>

            {/* Water Buoyancy Assessment */}
            {calculation.isValid && calculation.densityGcm3 > 0 && (
              <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">{t.waterFloatStatus}:</span>
                  <span
                    className={`font-semibold font-mono ${
                      calculation.densityGcm3 < 1.0
                        ? 'text-sky-600'
                        : Math.abs(calculation.densityGcm3 - 1.0) < 1e-4
                        ? 'text-teal-600'
                        : 'text-amber-600'
                    }`}
                  >
                    {calculation.densityGcm3 < 1.0
                      ? `${t.floatsInWater} (${((1 - calculation.densityGcm3) * 100).toFixed(1)}% exposed)`
                      : Math.abs(calculation.densityGcm3 - 1.0) < 1e-4
                      ? t.suspendedInWater
                      : `${t.sinksInWater} (${(calculation.densityGcm3).toFixed(2)}× water)`}
                  </span>
                </div>

                {closestSubstance && (
                  <div className="text-2xs p-2 bg-blue-50/50 rounded-lg border border-blue-100 flex items-center justify-between">
                    <span className="text-slate-600">{t.closestMaterial}:</span>
                    <span className="font-bold text-blue-700">
                      {closestSubstance.name} ({closestSubstance.substance.density} g/cm³)
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Quick Equivalents Table */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-2">
            <h4 className="text-2xs font-bold uppercase tracking-wider text-slate-400 font-mono">
              {t.conversionMatrix}
            </h4>
            <div className="divide-y divide-slate-100 text-xs font-mono">
              <div className="py-2 flex justify-between items-center">
                <span className="text-slate-500">1 g/cm³</span>
                <span className="font-semibold text-slate-900">= 1,000 kg/m³ = 1 g/mL</span>
              </div>
              <div className="py-2 flex justify-between items-center">
                <span className="text-slate-500">1 g/cm³ (Imperial)</span>
                <span className="font-semibold text-slate-900">= 62.428 lb/ft³ ≈ 0.0361 lb/in³</span>
              </div>
              <div className="py-2 flex justify-between items-center">
                <span className="text-slate-500">1 m³</span>
                <span className="font-semibold text-slate-900">= 1,000 L = 1,000 dm³ = 10⁶ cm³</span>
              </div>
              <div className="py-2 flex justify-between items-center">
                <span className="text-slate-500">1 kg</span>
                <span className="font-semibold text-slate-900">= 1,000 g = 10⁶ mg = 0.001 t</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
