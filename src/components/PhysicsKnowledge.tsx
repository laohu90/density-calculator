import React, { useState } from 'react';
import {
  BookOpen,
  FlaskConical,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Award,
} from 'lucide-react';

export const PhysicsKnowledge: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'concepts' | 'experiments' | 'traps' | 'applications'>('concepts');

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              密度物理知识全景大纲与实验考点速记
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              覆盖人教版/北师大版/苏科版中学物理核心考点：密度物理意义、温度与反常膨胀、天平量筒标准实验法、残液挂壁误差分析与特殊测量法。
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5 p-1 bg-slate-100 rounded-lg shrink-0">
            {[
              { id: 'concepts', label: '1. 概念与本质' },
              { id: 'experiments', label: '2. 实验与误差' },
              { id: 'traps', label: '3. 经典易错辨析' },
              { id: 'applications', label: '4. 生活与工程应用' },
            ].map((sec) => (
              <button
                key={sec.id}
                onClick={() => setActiveSection(sec.id as any)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                  activeSection === sec.id
                    ? 'bg-white text-blue-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {sec.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Section 1: Concepts & Essence */}
      {activeSection === 'concepts' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              密度的定义与物理属性
            </h3>
            <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
              <div className="p-3 bg-blue-50/60 rounded-lg border border-blue-100">
                <strong className="text-blue-900 block mb-1">物理定义:</strong>
                某种物质组成的物体的<strong>质量与它的体积之比</strong>叫做这种物质的密度（符号为 ρ，希腊字母读作 rho）。
                公式：<strong>ρ = m / V</strong>。
              </div>

              <div>
                <strong className="text-slate-900">物理意义 (常考问答):</strong>
                <p className="mt-0.5">
                  例如纯水的密度为 <strong>1.0 × 10³ kg/m³</strong>，其物理意义是：<strong>每 1 立方米纯水的质量为 1000 千克</strong>（或每 1 立方厘米纯水质量为 1 克）。
                </p>
              </div>

              <div>
                <strong className="text-slate-900">固有特性 (非常重要):</strong>
                <p className="mt-0.5">
                  密度是物质自身的一种<strong>固有物理特性</strong>。对于同种物质、同种状态，在温度压强不变时，密度大小与物体的<strong>质量大小无关</strong>、与物体的<strong>体积大小无关</strong>、与<strong>形状位置无关</strong>。
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-600" />
              密度的外在影响因素
            </h3>
            <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <strong className="text-slate-900 block mb-1">1. 温度影响:</strong>
                大多数物质遵循“热胀冷缩”规律。温度升高时，质量 m 不变，体积 V 膨胀变大，由 ρ = m/V 可知，密度 ρ 会<strong>变小</strong>。
              </div>

              <div className="p-3 bg-cyan-50/60 rounded-lg border border-cyan-100">
                <strong className="text-cyan-900 block mb-1">2. 水的反常膨胀 (4℃ 特性):</strong>
                水在 0℃ 到 4℃ 之间遵循“热缩冷胀”，在 <strong>4℃ 时密度最大</strong> (1.000 g/cm³)。
                当水降温到 0℃ 结冰时，体积会膨胀约 <strong>9%</strong>（导致冬天自来水管容易冻裂；同时冰浮在水面，水底始终维持4℃，保护水生生物越冬）。
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <strong className="text-slate-900 block mb-1">3. 压强与状态影响:</strong>
                固体和液体分子间隙小，难压缩，压强影响极微；但<strong>气体极易被压缩</strong>，压强增大或气体被压缩时，体积变小，密度显著增大！
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Section 2: Laboratory Experiments & Errors */}
      {activeSection === 'experiments' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Solid density experiment */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <FlaskConical className="w-4 h-4 text-blue-600" />
                  实验一: 测量固体的密度 (石块/金属块)
                </h3>
                <span className="text-2xs font-mono bg-blue-50 text-blue-700 px-2 py-0.5 rounded">基础必考</span>
              </div>

              <div className="space-y-2.5 text-xs text-slate-700">
                <div>
                  <strong className="text-slate-900">实验原理:</strong> ρ = m / V
                </div>
                <div>
                  <strong className="text-slate-900">实验仪器:</strong> 托盘天平（附砝码）、量筒、细线、水、烧杯。
                </div>
                <div className="p-3 bg-slate-50 rounded-lg space-y-1">
                  <strong className="text-slate-900 block">标准操作顺序 (严格防误差):</strong>
                  <div>1. 用调好的天平称出固体质量 <strong>m</strong>。</div>
                  <div>2. 量筒中注入适量水，读出初始体积 <strong>V₁</strong>（视线与凹液面最低处相平）。</div>
                  <div>3. 用细线系住固体完全浸没在量筒水中，读出总体积 <strong>V₂</strong>。</div>
                  <div>4. 固体体积 <strong>V = V₂ - V₁</strong>，计算密度 <strong>ρ = m / (V₂ - V₁)</strong>。</div>
                </div>

                <div className="p-3 bg-rose-50 rounded-lg border border-rose-100 text-rose-900">
                  <strong>⚠️ 关键误差考点:</strong>
                  若先测体积（将物体浸水）再测质量，物体表面会<strong>沾有水</strong>，导致称出的质量 m 偏大，最终计算出的密度 ρ <strong>偏大</strong>！
                </div>
              </div>
            </div>

            {/* Liquid density experiment */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <FlaskConical className="w-4 h-4 text-emerald-600" />
                  实验二: 测量液体的密度 (盐水/牛奶/酒精)
                </h3>
                <span className="text-2xs font-mono bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded">标准倒出法</span>
              </div>

              <div className="space-y-2.5 text-xs text-slate-700">
                <div>
                  <strong className="text-slate-900">实验难点:</strong> 液体倒入量筒后，烧杯壁不可避免会挂壁残留液体！
                </div>

                <div className="p-3 bg-slate-50 rounded-lg space-y-1">
                  <strong className="text-slate-900 block">无误差的“差量倒出法”:</strong>
                  <div>1. 烧杯装适量液体，用天平测出烧杯和液体总质量 <strong>m₁</strong>。</div>
                  <div>2. 将一部分液体倒入量筒中，读出量筒中液体体积 <strong>V</strong>。</div>
                  <div>3. 称出剩余液体和烧杯的质量 <strong>m₂</strong>。</div>
                  <div>4. 倒出的液体质量 <strong>m = m₁ - m₂</strong>，密度 <strong>ρ = (m₁ - m₂) / V</strong>。</div>
                </div>

                <div className="p-3 bg-amber-50 rounded-lg border border-amber-100 text-amber-900">
                  <strong>⚠️ 经典错误方案辨析:</strong>
                  若先测空烧杯质量 m₀，倒入液体测总质量 m，再全倒入量筒测体积 V。由于烧杯壁沾有液体倒不干净，倒入量筒的体积 V 会<strong>偏小</strong>，计算出的密度 ρ 会<strong>偏大</strong>！
                </div>
              </div>
            </div>
          </div>

          {/* Special density measurement methods */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              特殊方法测密度 (中考实验压轴探究题)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200/80 space-y-1.5">
                <span className="font-bold text-slate-900 block">1. 等体积替代法 (缺量筒)</span>
                <p className="text-slate-600">
                  利用瓶子或溢水杯装满水质量为 m₁，放入物体溢出水后再称，利用水的密度 ρ水 和等体积关系换算出物体的体积：V物 = V溢 = (m溢) / ρ水。
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200/80 space-y-1.5">
                <span className="font-bold text-slate-900 block">2. 浮力称重法 (缺量筒，利用测力计)</span>
                <p className="text-slate-600">
                  弹簧测力计在空气中称重得 G，将物体完全浸没在水中称重得示数 F'。浮力 F浮 = G - F' = ρ水·g·V排。物体密度为 <strong>ρ = G / (G - F') × ρ水</strong>。
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200/80 space-y-1.5">
                <span className="font-bold text-slate-900 block">3. 密度计法 (利用漂浮原理)</span>
                <p className="text-slate-600">
                  密度计在任何液体中都处于漂浮状态，F浮 = G恒定不变。浸入深度越深说明液体密度越小；因此密度计刻度特点为<strong>“上小下大、上疏下密”</strong>。
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Section 3: High-frequency Traps & Quizzes */}
      {activeSection === 'traps' && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            中考物理常考“陷阱题”与易错点深度剖析
          </h3>

          <div className="divide-y divide-slate-100 text-xs">
            <div className="py-3.5 space-y-1">
              <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <span>Q1: 一块砖切去一半，剩余部分的质量、体积与密度如何变化？</span>
              </div>
              <p className="text-slate-600">
                <strong>解析:</strong> 质量 m 减半，体积 V 减半。因为材料没变、物态没变，所以<strong>密度 ρ 保持不变</strong>！
              </p>
            </div>

            <div className="py-3.5 space-y-1">
              <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <span>Q2: 医用氧气钢瓶内装有氧气，抢救病人用去了一半，瓶内氧气的密度如何变化？</span>
              </div>
              <p className="text-slate-600">
                <strong>解析:</strong> 氧气是气体，气体会自动充满整个钢瓶，所以<strong>体积 V 保持不变</strong>！用去一半后质量 m 减半，由 ρ = m/V 可知，钢瓶内氧气<strong>密度变为原来的一半</strong>！
              </p>
            </div>

            <div className="py-3.5 space-y-1">
              <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <span>Q3: 1kg 的铁和 1kg 的棉花，哪个密度大？</span>
              </div>
              <p className="text-slate-600">
                <strong>解析:</strong> 许多人容易混淆质量与密度。两者的质量相同（都是 1kg），但铁的体积远小于棉花体积，铁的密度为 7.87 g/cm³，棉花有效密度仅约 0.1~0.2 g/cm³，<strong>铁的密度远大于棉花</strong>。
              </p>
            </div>

            <div className="py-3.5 space-y-1">
              <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <span>Q4: 为什么 1 g/cm³ 等于 1000 kg/m³，而不是 0.001 kg/m³？</span>
              </div>
              <div className="text-slate-600 font-mono bg-slate-50 p-2.5 rounded border border-slate-200 mt-1">
                推导: 1 g = 10⁻³ kg, 1 cm³ = (10⁻² m)³ = 10⁻⁶ m³
                <br />
                所以: 1 g/cm³ = 10⁻³ kg / 10⁻⁶ m³ = 10³ kg/m³ = 1000 kg/m³。
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Section 4: Real-world Applications */}
      {activeSection === 'applications' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-4 h-4 text-blue-600" />
              农业与生活中的密度知识
            </h3>
            <div className="space-y-2 text-xs text-slate-600">
              <div className="p-2.5 bg-slate-50 rounded-lg">
                <strong className="text-slate-900 block mb-0.5">盐水选种:</strong>
                将待选种子倒入配制好的盐水溶液中。饱满优质种子因密度大于盐水而沉底；干瘪虫蛀种子因密度小于盐水而漂浮，轻松实现分离。
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg">
                <strong className="text-slate-900 block mb-0.5">酒水勾兑与奶品检测:</strong>
                纯酒精密度 0.789 g/cm³，水为 1.0 g/cm³。酒度越高密度越低；牛奶正常密度为 1.028~1.032 g/cm³，若掺水则测得密度会明显降低。
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg">
                <strong className="text-slate-900 block mb-0.5">室内冷暖气安装位置:</strong>
                暖气片一般安装在房间下方（热空气密度小向上对流）；空调制冷出风口朝上或装在高处（冷空气密度大自然下沉）。
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-4 h-4 text-indigo-600" />
              工业与现代前沿工程材料
            </h3>
            <div className="space-y-2 text-xs text-slate-600">
              <div className="p-2.5 bg-slate-50 rounded-lg">
                <strong className="text-slate-900 block mb-0.5">航空航天轻量化 (铝合金/钛合金/碳纤维):</strong>
                飞机每减轻 1 千克重量，全生命周期可节约大量燃油。现代飞机广泛使用高强度、低密度的钛合金 (4.51 g/cm³) 与碳纤维复合材料 (1.6 g/cm³)。
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg">
                <strong className="text-slate-900 block mb-0.5">气凝胶 (超轻固态材料):</strong>
                密度仅为 0.003 g/cm³（约为空气密度的 2.3 倍），号称“凝固的烟”，具有极低导热率，用于宇航服隔热层与火星探测车保温。
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg">
                <strong className="text-slate-900 block mb-0.5">核辐射防护 (铅 Pb 与贫铀):</strong>
                高密度的铅 (11.34 g/cm³) 内部原子核密集，对 X 射线与伽马射线具有出色的屏蔽与衰减能力。
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
