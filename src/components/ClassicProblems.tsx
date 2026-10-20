import React, { useState } from 'react';
import { formatNumber } from '../utils/units';
import { Crown, HelpCircle, ArrowRight, ShieldCheck, AlertTriangle } from 'lucide-react';

export const ClassicProblems: React.FC = () => {
  const [activeProblem, setActiveProblem] = useState<
    'crown' | 'hollow' | 'displacement' | 'ice-melting'
  >('crown');

  // Problem 1: Archimedes Crown
  const [crownMass, setCrownMass] = useState<number>(1000); // g
  const [crownDisplacedVol, setCrownDisplacedVol] = useState<number>(65); // cm³
  const goldDensity = 19.32;
  const silverDensity = 10.49;

  // Crown calculation
  // m_total = m_gold + m_silver
  // V_total = m_gold / rho_gold + m_silver / rho_silver
  const crownAvgDensity = crownDisplacedVol > 0 ? crownMass / crownDisplacedVol : 0;
  const isPureGold = Math.abs(crownAvgDensity - goldDensity) < 0.1;
  // m_silver = (crownMass - crownDisplacedVol * goldDensity) / (1 - goldDensity / silverDensity)
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
  const [liquidType, setLiquidType] = useState<'pure-water' | 'salt-water' | 'alcohol'>(
    'pure-water'
  );

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Crown className="w-5 h-5 text-amber-500" />
          中考/高中/工程经典密度与浮力经典题型速算
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          覆盖物理学科常考经典模型：阿基米德王冠测金、空心与实心判断、排水法量筒测密度、冰融化水面升降判定。
        </p>
      </div>

      {/* Problem Tabs */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'crown', label: '1. 阿基米德王冠掺假测算' },
          { id: 'hollow', label: '2. 铸件/铁球空心与实心判定' },
          { id: 'displacement', label: '3. 排水法量筒测不规则物密度' },
          { id: 'ice-melting', label: '4. 冰块在液面融化升降推导' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveProblem(tab.id as any)}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
              activeProblem === tab.id
                ? 'bg-blue-600 text-white shadow-xs'
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
          <div className="lg:col-span-6 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900">阿基米德王冠鉴宝仿真</h3>
            <p className="text-xs text-slate-500">
              公元前245年叙拉古国王让工匠用1000g纯金制作纯金王冠，怀疑工匠偷掺了便宜的纯银。输入测量数值：
            </p>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  王冠称得质量 m (g)
                </label>
                <input
                  type="number"
                  value={crownMass}
                  onChange={(e) => setCrownMass(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-sm font-mono rounded-lg border border-slate-300"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  浸水排开水体积 V (cm³)
                </label>
                <input
                  type="number"
                  value={crownDisplacedVol}
                  onChange={(e) => setCrownDisplacedVol(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-sm font-mono rounded-lg border border-slate-300"
                />
              </div>
            </div>

            <div className="text-xs text-slate-500 space-y-1 bg-slate-50 p-3 rounded-lg border border-slate-200/80">
              <div>已知: 纯金密度 ρ金 = 19.32 g/cm³，纯银密度 ρ银 = 10.49 g/cm³</div>
              <div>若为纯金王冠，其理论体积应为: V纯金 = 1000g / 19.32g/cm³ ≈ <strong>51.76 cm³</strong></div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <h4 className="text-sm font-bold text-slate-900">判定结果与物理推导</h4>

            <div className="p-4 rounded-xl border space-y-2 font-mono">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">王冠测定平均密度:</span>
                <span className="font-bold text-blue-700 text-lg">
                  {formatNumber(crownAvgDensity, 2)} g/cm³
                </span>
              </div>

              <div className="pt-2 border-t border-slate-200 text-xs space-y-1.5">
                {isPureGold ? (
                  <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                    <span>真金品质！为 100% 纯金王冠，未掺杂低密度杂质。</span>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-rose-700 font-bold text-sm">
                      <AlertTriangle className="w-5 h-5 text-rose-600" />
                      <span>检测出掺假！实测密度远低于纯金 19.32 g/cm³。</span>
                    </div>
                    <div className="text-slate-700 font-sans">
                      通过联立二元一次方程组推算:
                      <div className="mt-1 font-mono text-xs text-slate-800">
                        • 掺杂纯银质量: <strong>{formatNumber(silverMass, 1)} g</strong> ({((silverMass / crownMass) * 100).toFixed(1)}%)
                      </div>
                      <div className="font-mono text-xs text-slate-800">
                        • 实际纯金含量: <strong>{formatNumber(realGoldMass, 1)} g</strong> ({((realGoldMass / crownMass) * 100).toFixed(1)}%)
                      </div>
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
          <div className="lg:col-span-6 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900">铸件 / 铁球空心实心速断器</h3>
            <p className="text-xs text-slate-500">
              中考经典物理题：已知一个物体的实际称重质量与排水法测出的外表体积，判定是否中空及空心体积。
            </p>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  实际质量 m (g)
                </label>
                <input
                  type="number"
                  value={ballMass}
                  onChange={(e) => setBallMass(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-sm font-mono rounded-lg border border-slate-300"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  外表体积 V (cm³)
                </label>
                <input
                  type="number"
                  value={ballOuterVol}
                  onChange={(e) => setBallOuterVol(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-sm font-mono rounded-lg border border-slate-300"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  材料密度 (g/cm³)
                </label>
                <input
                  type="number"
                  value={materialDensity}
                  onChange={(e) => setMaterialDensity(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-sm font-mono rounded-lg border border-slate-300"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4 font-mono text-xs">
            <h4 className="text-sm font-bold text-slate-900 font-sans">计算推导与结论</h4>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">该质量对应的纯材料实体体积:</span>
                <span className="font-bold text-slate-900">{formatNumber(solidVol, 2)} cm³</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">实测外部总体积:</span>
                <span className="font-bold text-slate-900">{formatNumber(ballOuterVol, 2)} cm³</span>
              </div>
              <div className="pt-2 border-t border-slate-200">
                {isHollow ? (
                  <div className="text-amber-700 font-bold text-sm">
                    结论: 该物体为【空心】！
                    <div className="text-xs font-normal text-slate-700 mt-1">
                      空心部分体积 V空 = V外 - V实 = {formatNumber(ballOuterVol)} - {formatNumber(solidVol)} = <strong>{formatNumber(hollowVol, 2)} cm³</strong>
                    </div>
                    <div className="text-xs font-normal text-slate-600 mt-1">
                      若在空心处注满水，总质量将增加: {formatNumber(hollowVol * 1.0, 2)} g
                    </div>
                  </div>
                ) : (
                  <div className="text-emerald-700 font-bold text-sm">
                    结论: 该物体为【实心】（或完全符合致密材料标准）。
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Problem 3: Displacement Method */}
      {activeProblem === 'displacement' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-6 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900">排水法测不规则物体密度</h3>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  量筒初读数 V1 (mL)
                </label>
                <input
                  type="number"
                  value={initWaterLevel}
                  onChange={(e) => setInitWaterLevel(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-sm font-mono rounded-lg border border-slate-300"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  放入物体后 V2 (mL)
                </label>
                <input
                  type="number"
                  value={finalWaterLevel}
                  onChange={(e) => setFinalWaterLevel(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-sm font-mono rounded-lg border border-slate-300"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  天平测得质量 m (g)
                </label>
                <input
                  type="number"
                  value={rockMass}
                  onChange={(e) => setRockMass(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-sm font-mono rounded-lg border border-slate-300"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3 font-mono text-xs">
            <h4 className="text-sm font-bold text-slate-900 font-sans">测量数据结果</h4>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
              <div className="flex justify-between">
                <span>物体体积 V = V2 - V1:</span>
                <span className="font-bold text-blue-700">{formatNumber(displacedVol)} cm³ (mL)</span>
              </div>
              <div className="flex justify-between">
                <span>测得密度 ρ = m / V:</span>
                <span className="font-bold text-emerald-700 text-sm">
                  {formatNumber(rockDensity, 3)} g/cm³ ({formatNumber(rockDensity * 1000, 1)} kg/m³)
                </span>
              </div>
              <div className="text-slate-500 font-sans text-xs pt-1 border-t border-slate-200">
                匹配物质: {rockDensity > 2.6 && rockDensity < 2.8 ? '与铝/花岗岩 (2.70 g/cm³) 极为接近' : '可查阅密度表对照成分'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Problem 4: Ice Melting */}
      {activeProblem === 'ice-melting' && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-900">
              冰块融化后液面升降严谨证明 (经典中考压轴题)
            </h3>
            <div className="flex gap-2">
              <button
                onClick={() => setLiquidType('pure-water')}
                className={`px-3 py-1.5 text-xs font-semibold rounded ${
                  liquidType === 'pure-water' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
                }`}
              >
                在清水中漂浮
              </button>
              <button
                onClick={() => setLiquidType('salt-water')}
                className={`px-3 py-1.5 text-xs font-semibold rounded ${
                  liquidType === 'salt-water' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
                }`}
              >
                在浓盐水中漂浮
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-700 leading-relaxed font-sans">
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
              <div className="font-bold text-sm text-slate-900">一、冰块漂浮时排开的液体体积:</div>
              <div>因为冰块处于漂浮平衡状态，所受浮力等于其自身重力：</div>
              <div className="font-mono bg-white p-2 rounded border border-slate-200 text-blue-700 font-semibold">
                F浮 = G冰  ==&gt;  ρ液 · g · V排 = m冰 · g
              </div>
              <div className="font-mono">
                推得排开体积: <strong>V排 = m冰 / ρ液</strong>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
              <div className="font-bold text-sm text-slate-900">二、冰块完全融化后化成的水的体积:</div>
              <div>因为融化属于物理变化，质量保持守恒：m水 = m冰。</div>
              <div className="font-mono bg-white p-2 rounded border border-slate-200 text-blue-700 font-semibold">
                化成水的体积: V水 = m水 / ρ水 = m冰 / ρ水
              </div>
              <div className="font-mono">
                融化前后水面变化关键看：<strong>ΔV = V水 - V排</strong>
              </div>
            </div>
          </div>

          <div className="p-4 bg-blue-50/70 rounded-xl border border-blue-200/60 space-y-2 text-xs">
            <div className="font-bold text-sm text-blue-900">
              {liquidType === 'pure-water' ? '★ 结论 1: 冰在纯水中融化 —— 液面恰好【保持不变】！' : '★ 结论 2: 冰在浓盐水中融化 —— 液面将会【上升】！'}
            </div>
            {liquidType === 'pure-water' ? (
              <div className="text-slate-700">
                因为此时外部液体也是纯水 (ρ液 = ρ水 = 1.0 g/cm³)，所以 V排 = m冰/ρ水 = V水。即融化后化成的水体积刚好填补了原本冰块排开的水的体积，故容器水面高度<strong>保持不变</strong>。
              </div>
            ) : (
              <div className="text-slate-700">
                因为浓盐水密度 ρ盐水 &gt; ρ水 (如 1.15 g/cm³ &gt; 1.0 g/cm³)，所以 V排 = m冰/ρ盐水 &lt; m冰/ρ水 = V水。化成水的体积大于原来排开的盐水体积，故容器液面<strong>上升</strong>。
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
