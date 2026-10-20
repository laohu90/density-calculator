import React from 'react';
import { CalculationMode } from '../types/density';
import { Language, TRANSLATIONS } from '../i18n/translations';
import { Globe, RotateCcw } from 'lucide-react';

interface HeaderProps {
  activeTab: CalculationMode | 'materials' | 'problems' | 'spectrum' | 'knowledge';
  setActiveTab: (tab: any) => void;
  lang: Language;
  onToggleLang: () => void;
  onReset: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  lang,
  onToggleLang,
  onReset,
}) => {
  const t = TRANSLATIONS[lang];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white font-mono font-bold text-lg shadow-xs">
            ρ
          </div>
          <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap">
            {t.brandName}
          </span>
        </div>

        {/* Zone 2: Concise single-line navigation links */}
        <nav className="hidden lg:flex items-center gap-1 text-sm font-medium text-slate-600">
          <button
            onClick={() => setActiveTab('density')}
            className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap shrink-0 ${
              ['density', 'mass', 'volume'].includes(activeTab)
                ? 'text-blue-600 bg-blue-50 font-semibold'
                : 'hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            {t.navCalculator}
          </button>
          <button
            onClick={() => setActiveTab('materials')}
            className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'materials'
                ? 'text-blue-600 bg-blue-50 font-semibold'
                : 'hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            {t.navMaterials}
          </button>
          <button
            onClick={() => setActiveTab('buoyancy')}
            className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'buoyancy'
                ? 'text-blue-600 bg-blue-50 font-semibold'
                : 'hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            {t.navBuoyancy}
          </button>
          <button
            onClick={() => setActiveTab('mixture')}
            className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'mixture'
                ? 'text-blue-600 bg-blue-50 font-semibold'
                : 'hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            {t.navMixture}
          </button>
          <button
            onClick={() => setActiveTab('problems')}
            className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'problems'
                ? 'text-blue-600 bg-blue-50 font-semibold'
                : 'hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            {t.navProblems}
          </button>
          <button
            onClick={() => setActiveTab('knowledge')}
            className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'knowledge'
                ? 'text-blue-600 bg-blue-50 font-semibold'
                : 'hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            {t.navKnowledge}
          </button>
        </nav>

        {/* Zone 3: 1 primary action & language toggle */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Language Switcher */}
          <button
            onClick={onToggleLang}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 transition-colors"
            title="Switch Language / 切换语言"
          >
            <Globe className="w-3.5 h-3.5 text-blue-600" />
            <span className="font-mono">{lang === 'en' ? '中文' : 'English'}</span>
          </button>

          {/* Reset button */}
          <button
            onClick={onReset}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200"
            title={t.resetBtn}
          >
            <RotateCcw className="w-3 h-3 text-slate-400" />
            <span>{t.resetBtn}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
