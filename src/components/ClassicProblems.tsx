import React, { useState } from 'react';
import { formatNumber } from '../utils/units';
import { Language, TRANSLATIONS } from '../i18n/translations';
import { Crown, ShieldCheck, AlertTriangle } from 'lucide-react';

interface ClassicProblemsProps {
  lang: Language;
}

export const ClassicProblems: React.FC<ClassicProblemsProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const [activeProblem, setActiveProblem] = useState<
    'crown' | 'hollow' | 'displacement' | 'ice-melting'
  >('crown');

  // Problem 1: Archimedes Crown
  const [crownMass, setCrownMass] = useState<number>(1000); // g
  const [crownDisplacedVol, setCrownDisplacedVol] = useState<number>(65); // cm³
  const goldDensity = 19.32;
  const silverDensity = 10.49;

  const crownAvgDensity = crownDisplacedVol > 0 ? crownMass / crownDisplacedVol : 0;
  const isPureGold = Math.abs(crownAvgDensity - goldDensity) < 0.1;
  const silverMass = Math.max(
    0,
    (crownMass - crownDisplacedVol * goldDensity) / (1 - goldDensity / silverDensity)
  );
  const realGoldMass = Math.max(0, crownMass - silverMass);

  // Problem 2: Hollow Ball
  const [ballMass, setBallMass] = useState<number>(157.4); // g
  const [ballOuterVol, setBallOuterVol] = useState<number>(30); // cm³
  const [materialDensity, setMaterialDensity] = useState<number>(7.87); // Iron
  const solidVol = materialDensity > 0 ? ballMass / materialDensity : 0;
  const isHollow = ballOuterVol > solidVol + 0.01;
  const hollowVol = Math.max(0, ballOuterVol - solidVol);

  // Problem 3: Graduated Cylinder Displacement
  const [initWaterLevel, setInitWaterLevel] = useState<number>(50); // mL
  const [finalWaterLevel, setFinalWaterLevel] = useState<number>(85); // mL
  const [rockMass, setRockMass] = useState<number>(94.5); // g
  const displacedVol = Math.max(0, finalWaterLevel - initWaterLevel);
  const rockDensity = displacedVol > 0 ? rockMass / displacedVol : 0;

  // Problem 4: Ice melting liquid
  const [liquidType, setLiquidType] = useState<'pure-water' | 'salt-water'>('pure-water');

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Crown className="w-4 h-4 text-amber-500" />
          <span>{t.problemsTitle}</span>
        </h2>
        <p className="text-xs text-slate-500 mt-1">{t.problemsDesc}</p>
      </div>

      {/* Problem Tabs */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'crown', label: t.probCrownTitle },
          { id: 'hollow', label: t.probHollowTitle },
          { id: 'displacement', label: t.probDisplacementTitle },
          { id: 'ice-melting', label: t.probIceTitle },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveProblem(tab.id as any)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              activeProblem === tab.id
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Problem 1: Archimedes Crown */}
      {activeProblem === 'crown' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-6 bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900">
              {lang === 'en' ? 'Archimedes Crown Purity Simulator' : '阿基米德王冠鉴宝仿真'}
            </h3>
            <p className="text-xs text-slate-500">
              {lang === 'en'
                ? 'King Hiero II gave 1,000 g of gold to a goldsmith to make a crown. Suspecting silver was added, Archimedes measured displaced water.'
                : '公元前245年叙拉古国王让工匠用1000g纯金制作纯金王冠，怀疑工匠偷掺了便宜的纯银。输入测量数值：'}
            </p>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-2xs font-semibold text-slate-600 mb-1">
                  {lang === 'en' ? 'Crown Mass m (g)' : '王冠称得质量 m (g)'}
                </label>
                <input
                  type="number"
                  value={crownMass}
                  onChange={(e) => setCrownMass(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-1.5 text-xs font-mono rounded-lg border border-slate-300"
                />
              </div>
              <div>
                <label className="block text-2xs font-semibold text-slate-600 mb-1">
                  {lang === 'en' ? 'Displaced Water V (cm³)' : '浸水排开水体积 V (cm³)'}
                </label>
                <input
                  type="number"
                  value={crownDisplacedVol}
                  onChange={(e) => setCrownDisplacedVol(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-1.5 text-xs font-mono rounded-lg border border-slate-300"
                />
              </div>
            </div>

            <div className="text-2xs text-slate-500 space-y-1 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
              <div>{lang === 'en' ? 'Pure Gold: ρ = 19.32 g/cm³; Pure Silver: ρ = 10.49 g/cm³' : '已知: 纯金密度 ρ金 = 19.32 g/cm³，纯银密度 ρ银 = 10.49 g/cm³'}</div>
              <div>
                {lang === 'en'
                  ? `Pure 1000g gold crown theoretical volume: ${formatNumber(1000 / 19.32, 2)} cm³`
                  : '若为纯金王冠，理论体积应为: 1000g / 19.32g/cm³ ≈ 51.76 cm³'}
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">
              {lang === 'en' ? 'Purity Verification Result' : '判定结果与推导'}
            </h4>

            <div className="p-4 rounded-xl border border-slate-200/80 space-y-2 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">{lang === 'en' ? 'Crown Measured Density:' : '王冠测定平均密度:'}</span>
                <span className="font-bold text-blue-700 text-base">
                  {formatNumber(crownAvgDensity, 2)} g/cm³
                </span>
              </div>

              <div className="pt-2 border-t border-slate-100 space-y-2">
                {isPureGold ? (
                  <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>{lang === 'en' ? 'Verified 100% pure gold!' : '真金品质！为 100% 纯金王冠。'}</span>
                  </div>
                ) : (
                  <div className="space-y-1.5 font-sans">
                    <div className="flex items-center gap-2 text-rose-700 font-bold text-xs">
                      <AlertTriangle className="w-4 h-4 text-rose-600" />
                      <span>{lang === 'en' ? 'Impurity detected! Density is below pure gold.' : '检测出掺假！实测密度明显低于纯金。'}</span>
                    </div>
                    <div className="text-slate-700 text-2xs space-y-0.5 font-mono">
                      <div>• {lang === 'en' ? 'Substituted Silver Mass:' : '掺入白银质量:'} <strong>{formatNumber(silverMass, 1)} g</strong> ({((silverMass / crownMass) * 100).toFixed(1)}%)</div>
                      <div>• {lang === 'en' ? 'Genuine Gold Content:' : '实际纯金含量:'} <strong>{formatNumber(realGoldMass, 1)} g</strong> ({((realGoldMass / crownMass) * 100).toFixed(1)}%)</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Problem 2: Hollow Ball */}
      {activeProblem === 'hollow' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-6 bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900">
              {lang === 'en' ? 'Hollow vs Solid Casting Solver' : '铸件 / 铁球空心实心速断器'}
            </h3>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-2xs font-semibold text-slate-600 mb-1">{t.massLabel} (g)</label>
                <input
                  type="number"
                  value={ballMass}
                  onChange={(e) => setBallMass(parseFloat(e.target.value) || 0)}
                  className="w-full px-2.5 py-1.5 text-xs font-mono rounded-lg border border-slate-300"
                />
              </div>
              <div>
                <label className="block text-2xs font-semibold text-slate-600 mb-1">{t.volumeLabel} (cm³)</label>
                <input
                  type="number"
                  value={ballOuterVol}
                  onChange={(e) => setBallOuterVol(parseFloat(e.target.value) || 0)}
                  className="w-full px-2.5 py-1.5 text-xs font-mono rounded-lg border border-slate-300"
                />
              </div>
              <div>
                <label className="block text-2xs font-semibold text-slate-600 mb-1">ρ (g/cm³)</label>
                <input
                  type="number"
                  value={materialDensity}
                  onChange={(e) => setMaterialDensity(parseFloat(e.target.value) || 0.0001)}
                  className="w-full px-2.5 py-1.5 text-xs font-mono rounded-lg border border-slate-300"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-2 font-mono text-xs">
            <h4 className="text-xs font-bold text-slate-900 font-sans">{lang === 'en' ? 'Conclusion' : '推导与结论'}</h4>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-500">{lang === 'en' ? 'Solid material volume:' : '纯材料实体体积:'}</span>
                <span className="font-bold text-slate-900">{formatNumber(solidVol, 2)} cm³</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">{lang === 'en' ? 'Total outer volume:' : '实测外部总体积:'}</span>
                <span className="font-bold text-slate-900">{formatNumber(ballOuterVol, 2)} cm³</span>
              </div>
              <div className="pt-2 border-t border-slate-200">
                {isHollow ? (
                  <div className="text-amber-800 font-bold text-xs font-sans">
                    {lang === 'en' ? 'Status: HOLLOW' : '结论: 该物体为【空心】！'}
                    <div className="font-mono text-2xs font-normal text-slate-700 mt-1">
                      {lang === 'en' ? 'Hollow cavity volume: ' : '空心腔体体积: '}
                      <strong>{formatNumber(hollowVol, 2)} cm³</strong>
                    </div>
                  </div>
                ) : (
                  <div className="text-emerald-700 font-bold text-xs font-sans">
                    {lang === 'en' ? 'Status: SOLID' : '结论: 该物体为【实心】。'}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Problem 3: Displacement */}
      {activeProblem === 'displacement' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-6 bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-900">
              {lang === 'en' ? 'Displacement Method (Graduated Cylinder)' : '排水法量筒测不规则物密度'}
            </h3>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-2xs font-semibold text-slate-600 mb-1">V1 (mL)</label>
                <input
                  type="number"
                  value={initWaterLevel}
                  onChange={(e) => setInitWaterLevel(parseFloat(e.target.value) || 0)}
                  className="w-full px-2.5 py-1.5 text-xs font-mono rounded-lg border border-slate-300"
                />
              </div>
              <div>
                <label className="block text-2xs font-semibold text-slate-600 mb-1">V2 (mL)</label>
                <input
                  type="number"
                  value={finalWaterLevel}
                  onChange={(e) => setFinalWaterLevel(parseFloat(e.target.value) || 0)}
                  className="w-full px-2.5 py-1.5 text-xs font-mono rounded-lg border border-slate-300"
                />
              </div>
              <div>
                <label className="block text-2xs font-semibold text-slate-600 mb-1">m (g)</label>
                <input
                  type="number"
                  value={rockMass}
                  onChange={(e) => setRockMass(parseFloat(e.target.value) || 0)}
                  className="w-full px-2.5 py-1.5 text-xs font-mono rounded-lg border border-slate-300"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-2 font-mono text-xs">
            <h4 className="text-xs font-bold text-slate-900 font-sans">{lang === 'en' ? 'Calculated Values' : '测量结果'}</h4>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5">
              <div className="flex justify-between">
                <span>V = V2 - V1:</span>
                <span className="font-bold text-blue-700">{formatNumber(displacedVol)} cm³ (mL)</span>
              </div>
              <div className="flex justify-between">
                <span>ρ = m / V:</span>
                <span className="font-bold text-emerald-700">
                  {formatNumber(rockDensity, 3)} g/cm³ ({formatNumber(rockDensity * 1000, 1)} kg/m³)
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Problem 4: Ice melting */}
      {activeProblem === 'ice-melting' && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900">
              {lang === 'en' ? 'Ice Melting Water Level Rigorous Proof' : '冰块融化后水面升降严谨证明'}
            </h3>
            <div className="flex gap-1.5">
              <button
                onClick={() => setLiquidType('pure-water')}
                className={`px-2.5 py-1 text-xs font-semibold rounded ${
                  liquidType === 'pure-water' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
                }`}
              >
                {lang === 'en' ? 'Pure Water' : '在清水中'}
              </button>
              <button
                onClick={() => setLiquidType('salt-water')}
                className={`px-2.5 py-1 text-xs font-semibold rounded ${
                  liquidType === 'salt-water' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
                }`}
              >
                {lang === 'en' ? 'Salt Brine' : '在浓盐水中'}
              </button>
            </div>
          </div>

          <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-200/60 text-xs space-y-2">
            <div className="font-bold text-sm text-blue-900">
              {liquidType === 'pure-water'
                ? lang === 'en'
                  ? '★ Theorem 1: Ice melting in pure water — Water level remains UNCHANGED!'
                  : '★ 定理 1: 冰在纯水中融化 —— 液面恰好【保持不变】！'
                : lang === 'en'
                ? '★ Theorem 2: Ice melting in dense salt brine — Liquid level RISES!'
                : '★ 定理 2: 冰在浓盐水中融化 —— 液面将会【上升】！'}
            </div>
            <p className="text-slate-700 text-2xs leading-relaxed">
              {liquidType === 'pure-water'
                ? lang === 'en'
                  ? 'Because the floating ice satisfies F_buoyant = G_ice, we have ρ_water · g · V_disp = m_ice · g => V_disp = m_ice / ρ_water. When ice melts, mass is conserved: V_melt = m_water / ρ_water = m_ice / ρ_water. Since V_disp = V_melt, the melted water exactly fills the displaced volume with no change in surface height.'
                  : '因为冰块漂浮时 F浮 = G冰，即 ρ水·g·V排 = m冰·g => V排 = m冰 / ρ水。冰化水后质量守恒：V化水 = m冰 / ρ水。由于 V排 = V化水，化成的水刚好填满原来的排开体积，因此水面高度绝对不变。'
                : lang === 'en'
                ? 'In salt water, ρ_brine > ρ_water (1.15 > 1.0 g/cm³). Thus V_disp = m_ice / ρ_brine < m_ice / ρ_water = V_melt. The melted volume exceeds the previously displaced volume, causing the liquid level to rise.'
                : '在浓盐水中，ρ盐水 > ρ水 (1.15 > 1.0 g/cm³)。故 V排 = m冰/ρ盐水 < m冰/ρ水 = V化水。化成水的体积大于原本排开的盐水体积，因此液面上升。'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
