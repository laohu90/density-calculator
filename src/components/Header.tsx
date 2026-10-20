import React from 'react';
import { CalculationMode } from '../types/density';

interface HeaderProps {
  activeTab: CalculationMode | 'materials' | 'problems' | 'spectrum';
  setActiveTab: (tab: any) => void;
  onReset: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onReset }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white font-mono font-bold text-lg shadow-sm">
            ρ
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap">
            密度计算器 (ρ = m/V)
          </span>
        </div>

        {/* Zone 2: 4-5 Clean Single-Line Nav Links */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-slate-600">
          <button
            onClick={() => setActiveTab('density')}
            className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap shrink-0 ${
              ['density', 'mass', 'volume'].includes(activeTab)
                ? 'text-blue-600 bg-blue-50 font-semibold'
                : 'hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            三者互求
          </button>
          <button
            onClick={() => setActiveTab('materials')}
            className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'materials'
                ? 'text-blue-600 bg-blue-50 font-semibold'
                : 'hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            物质密度表
          </button>
          <button
            onClick={() => setActiveTab('buoyancy')}
            className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'buoyancy'
                ? 'text-blue-600 bg-blue-50 font-semibold'
                : 'hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            浮力浮沉模拟
          </button>
          <button
            onClick={() => setActiveTab('mixture')}
            className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'mixture'
                ? 'text-blue-600 bg-blue-50 font-semibold'
                : 'hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            混合物密度
          </button>
          <button
            onClick={() => setActiveTab('problems')}
            className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'problems'
                ? 'text-blue-600 bg-blue-50 font-semibold'
                : 'hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            典型题解
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onReset}
            className="px-3.5 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0 border border-slate-200"
          >
            重置参数
          </button>
        </div>
      </div>
    </header>
  );
};
