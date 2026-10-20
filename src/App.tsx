import React, { useState } from 'react';
import { Header } from './components/Header';
import { Calculator } from './components/Calculator';
import { MaterialTable } from './components/MaterialTable';
import { BuoyancySim } from './components/BuoyancySim';
import { MixtureCalculator } from './components/MixtureCalculator';
import { ClassicProblems } from './components/ClassicProblems';
import { PhysicsKnowledge } from './components/PhysicsKnowledge';
import { DensityScale } from './components/DensityScale';
import { Substance, CalculationMode } from './types/density';

export default function App() {
  const [activeTab, setActiveTab] = useState<
    CalculationMode | 'materials' | 'problems' | 'spectrum' | 'knowledge'
  >('density');

  const [buoyancyTarget, setBuoyancyTarget] = useState<Substance | null>(null);
  const [calculatorKey, setCalculatorKey] = useState<number>(0);

  const handleSelectMaterialForCalc = (sub: Substance) => {
    // Switch to calculator
    setActiveTab('density');
  };

  const handleSimulateBuoyancy = (sub: Substance) => {
    setBuoyancyTarget(sub);
    setActiveTab('buoyancy');
  };

  const handleReset = () => {
    setCalculatorKey((k) => k + 1);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Top Bar Contract (3 zones) */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onReset={handleReset}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Hero Banner / Functional Headline */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 font-mono mb-1">
              <span>物理量换算</span>
              <span aria-hidden="true">·</span>
              <span>质量 m [kg]</span>
              <span aria-hidden="true">·</span>
              <span>体积 V [m³]</span>
              <span aria-hidden="true">·</span>
              <span>密度 ρ [kg/m³]</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
              密度计算器 (ρ = m/V)
            </h1>
          </div>

          {/* Quick tab switcher for mobile/desktop */}
          <div className="flex items-center gap-1 p-1 bg-slate-200/70 rounded-lg overflow-x-auto">
            <button
              onClick={() => setActiveTab('density')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
                ['density', 'mass', 'volume'].includes(activeTab)
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              三者互求
            </button>
            <button
              onClick={() => setActiveTab('materials')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'materials'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              物质密度表
            </button>
            <button
              onClick={() => setActiveTab('buoyancy')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'buoyancy'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              浮沉水槽仿真
            </button>
            <button
              onClick={() => setActiveTab('mixture')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'mixture'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              合金与混合物
            </button>
            <button
              onClick={() => setActiveTab('problems')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'problems'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              经典题速算
            </button>
            <button
              onClick={() => setActiveTab('knowledge')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'knowledge'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              物理知识全解
            </button>
          </div>
        </div>

        {/* View Switcher based on Active Tab */}
        {['density', 'mass', 'volume'].includes(activeTab) && (
          <div className="space-y-8">
            <Calculator key={calculatorKey} />
            <DensityScale />
          </div>
        )}

        {activeTab === 'materials' && (
          <div className="space-y-8">
            <MaterialTable
              onSelectMaterial={handleSelectMaterialForCalc}
              onSimulateBuoyancy={handleSimulateBuoyancy}
            />
            <DensityScale />
          </div>
        )}

        {activeTab === 'buoyancy' && (
          <div className="space-y-8">
            <BuoyancySim initialObject={buoyancyTarget} />
            <DensityScale />
          </div>
        )}

        {activeTab === 'mixture' && (
          <div className="space-y-8">
            <MixtureCalculator />
          </div>
        )}

        {activeTab === 'problems' && (
          <div className="space-y-8">
            <ClassicProblems />
          </div>
        )}

        {activeTab === 'knowledge' && (
          <div className="space-y-8">
            <PhysicsKnowledge />
            <DensityScale />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">密度计算器 ρ = m/V</span>
            <span aria-hidden="true">·</span>
            <span>严格遵循国际单位制 (SI) 与中学/大学物理计算标准</span>
          </div>

          <div className="flex items-center gap-4 text-slate-600">
            <span>标准公式: ρ = m / V</span>
            <span aria-hidden="true">·</span>
            <span>浮力公式: F浮 = ρ液·g·V排</span>
            <span aria-hidden="true">·</span>
            <span>1 g/cm³ = 1000 kg/m³</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
