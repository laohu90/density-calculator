import React, { useState, useMemo } from 'react';
import { formatNumber } from '../utils/units';
import { Plus, Trash2, Layers, BookOpen, Copy, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ComponentItem {
  id: string;
  name: string;
  massG: number;
  densityGcm3: number;
}

export const MixtureCalculator: React.FC = () => {
  const [components, setComponents] = useState<ComponentItem[]>([
    { id: '1', name: '成分 A (如纯金)', massG: 150, densityGcm3: 19.32 },
    { id: '2', name: '成分 B (如纯铜)', massG: 50, densityGcm3: 8.96 },
  ]);

  const [copied, setCopied] = useState(false);

  // Quick preset loader
  const loadPreset = (presetType: 'gold-alloy' | 'alcohol-water' | 'saline') => {
    if (presetType === 'gold-alloy') {
      setComponents([
        { id: '1', name: '纯金 (Gold)', massG: 75, densityGcm3: 19.32 },
        { id: '2', name: '纯铜 (Copper)', massG: 25, densityGcm3: 8.96 },
      ]);
    } else if (presetType === 'alcohol-water') {
      setComponents([
        { id: '1', name: '无水乙醇 (Alcohol)', massG: 78.9, densityGcm3: 0.789 },
        { id: '2', name: '纯水 (Water)', massG: 100, densityGcm3: 1.0 },
      ]);
    } else if (presetType === 'saline') {
      setComponents([
        { id: '1', name: '纯水 (Water)', massG: 500, densityGcm3: 1.0 },
        { id: '2', name: '食盐 (Salt)', massG: 75, densityGcm3: 2.16 },
      ]);
    }
  };

  const handleAddComponent = () => {
    setComponents([
      ...components,
      {
        id: `comp-${Date.now()}`,
        name: `新成分 ${components.length + 1}`,
        massG: 100,
        densityGcm3: 2.7,
      },
    ]);
  };

  const handleRemoveComponent = (id: string) => {
    if (components.length <= 1) return;
    setComponents(components.filter((c) => c.id !== id));
  };

  const handleUpdate = (id: string, field: 'name' | 'massG' | 'densityGcm3', val: any) => {
    setComponents(
      components.map((c) => {
        if (c.id === id) {
          return { ...c, [field]: val };
        }
        return c;
      })
    );
  };

  // Mixture calculations
  const calculation = useMemo(() => {
    let totalMassG = 0;
    let totalVolCm3 = 0;

    const detailedList = components.map((c) => {
      const vol = c.densityGcm3 > 0 ? c.massG / c.densityGcm3 : 0;
      totalMassG += c.massG;
      totalVolCm3 += vol;
      return {
        ...c,
        volumeCm3: vol,
      };
    });

    const mixtureDensityGcm3 = totalVolCm3 > 0 ? totalMassG / totalVolCm3 : 0;
    const mixtureDensitySI = mixtureDensityGcm3 * 1000;

    return {
      totalMassG,
      totalVolCm3,
      mixtureDensityGcm3,
      mixtureDensitySI,
      detailedList,
    };
  }, [components]);

  const handleCopySteps = () => {
    const text = [
      `【混合物/合金密度推导步骤】`,
      `混合物总质量: m总 = ${components.map((c) => `${c.massG}g`).join(' + ')} = ${formatNumber(calculation.totalMassG)} g`,
      `各组分体积: ${calculation.detailedList
        .map((c) => `V(${c.name}) = ${c.massG}g / ${c.densityGcm3}g/cm³ = ${formatNumber(c.volumeCm3)}cm³`)
        .join('; ')}`,
      `混合总体积: V总 = ${formatNumber(calculation.totalVolCm3)} cm³`,
      `混合密度公式: ρ混 = m总 / V总`,
      `代入计算: ρ混 = ${formatNumber(calculation.totalMassG)} g / ${formatNumber(calculation.totalVolCm3)} cm³ = ${formatNumber(calculation.mixtureDensityGcm3)} g/cm³ (${formatNumber(calculation.mixtureDensitySI)} kg/m³)`,
    ].join('\n');

    navigator.clipboard.writeText(text);
    setCopied(true);
    confetti({ particleCount: 25, spread: 50, origin: { y: 0.8 } });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Introduction Card */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-600" />
              混合物与多组分合金密度计算
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              求解合金、溶液、复合材料等混合密度：ρ混 = (m₁ + m₂ + ...) / (V₁ + V₂ + ...)。
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-slate-500">经典配比预设:</span>
            <button
              onClick={() => loadPreset('gold-alloy')}
              className="px-2.5 py-1 text-xs font-semibold rounded bg-amber-50 text-amber-700 hover:bg-amber-100"
            >
              18K金合金 (75%金+铜)
            </button>
            <button
              onClick={() => loadPreset('alcohol-water')}
              className="px-2.5 py-1 text-xs font-semibold rounded bg-blue-50 text-blue-700 hover:bg-blue-100"
            >
              酒精水溶液
            </button>
            <button
              onClick={() => loadPreset('saline')}
              className="px-2.5 py-1 text-xs font-semibold rounded bg-cyan-50 text-cyan-700 hover:bg-cyan-100"
            >
              盐水溶液
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Components Table (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">混合成分明细列表</h3>
              <button
                onClick={handleAddComponent}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>添加新组分</span>
              </button>
            </div>

            <div className="space-y-3">
              {components.map((comp, idx) => {
                const vol = comp.densityGcm3 > 0 ? comp.massG / comp.densityGcm3 : 0;
                const massRatio =
                  calculation.totalMassG > 0
                    ? ((comp.massG / calculation.totalMassG) * 100).toFixed(1)
                    : '0';

                return (
                  <div
                    key={comp.id}
                    className="p-3.5 bg-slate-50 rounded-lg border border-slate-200/80 space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700">组分 {idx + 1}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-slate-500">
                          质量占比: <strong className="text-slate-900">{massRatio}%</strong>
                        </span>
                        {components.length > 1 && (
                          <button
                            onClick={() => handleRemoveComponent(comp.id)}
                            className="text-red-500 hover:text-red-700 p-1"
                            title="删除该组分"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-2xs font-semibold text-slate-500 mb-0.5">
                          物质名称
                        </label>
                        <input
                          type="text"
                          value={comp.name}
                          onChange={(e) => handleUpdate(comp.id, 'name', e.target.value)}
                          className="w-full px-2.5 py-1.5 text-xs rounded border border-slate-300 bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-2xs font-semibold text-slate-500 mb-0.5">
                          质量 m (g)
                        </label>
                        <input
                          type="number"
                          step="any"
                          value={comp.massG}
                          onChange={(e) =>
                            handleUpdate(comp.id, 'massG', parseFloat(e.target.value) || 0)
                          }
                          className="w-full px-2.5 py-1.5 text-xs font-mono rounded border border-slate-300 bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-2xs font-semibold text-slate-500 mb-0.5">
                          密度 ρ (g/cm³)
                        </label>
                        <input
                          type="number"
                          step="any"
                          value={comp.densityGcm3}
                          onChange={(e) =>
                            handleUpdate(comp.id, 'densityGcm3', parseFloat(e.target.value) || 0)
                          }
                          className="w-full px-2.5 py-1.5 text-xs font-mono rounded border border-slate-300 bg-white"
                        />
                      </div>
                    </div>

                    <div className="text-2xs font-mono text-slate-500 flex justify-end">
                      对应自身体积 V = {formatNumber(vol, 3)} cm³
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Calculation Summary & Derivation (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Result Card */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                混合综合密度
              </span>
              <button
                onClick={handleCopySteps}
                className="flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-slate-900"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? '已复制推导' : '复制推导'}</span>
              </button>
            </div>

            <div>
              <span className="text-xs font-semibold text-slate-500 font-mono">ρ混 (平均混合密度)</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-4xl font-extrabold font-mono text-indigo-600 tabular-nums">
                  {formatNumber(calculation.mixtureDensityGcm3, 4)}
                </span>
                <span className="text-sm font-bold text-slate-700 font-mono">g/cm³</span>
              </div>
              <div className="text-xs font-mono text-slate-500 mt-1">
                国际单位 (SI): {formatNumber(calculation.mixtureDensitySI, 2)} kg/m³
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200/80 font-mono text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">混合物总质量 (m总):</span>
                <span className="font-bold text-slate-900">
                  {formatNumber(calculation.totalMassG, 2)} g
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">混合物总体积 (V总):</span>
                <span className="font-bold text-slate-900">
                  {formatNumber(calculation.totalVolCm3, 2)} cm³
                </span>
              </div>
            </div>

            {/* Application note */}
            <div className="p-3 bg-amber-50/60 rounded-lg border border-amber-200/60 text-xs text-amber-900 space-y-1">
              <div className="font-semibold">💡 物理小贴士:</div>
              <div>
                • 混合密度不能直接用两者的密度取算术平均值 (ρ₁ + ρ₂)/2，因为两者的体积并不一定相等！
              </div>
              <div>
                • 只有在两种物质<strong>等体积混合</strong>时，ρ混 才等于 (ρ₁ + ρ₂)/2；而在<strong>等质量混合</strong>时，ρ混 = 2ρ₁ρ₂ / (ρ₁ + ρ₂)。
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
