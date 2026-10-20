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

  const navItems = [
    { id: 'density', label: t.navCalculator },
    { id: 'materials', label: t.navMaterials },
    { id: 'buoyancy', label: t.navBuoyancy },
    { id: 'mixture', label: t.navMixture },
    { id: 'problems', label: t.navProblems },
    { id: 'knowledge', label: t.navKnowledge },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Wordmark & Brand */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white font-mono font-bold text-lg shadow-xs select-none">
            ρ
          </div>
          <div>
            <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap block">
              {t.brandName}
            </span>
            <span className="text-2xs text-slate-400 font-mono hidden sm:block">
              {t.brandTagline}
            </span>
          </div>
        </div>

        {/* Zone 2: Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-1 text-xs font-semibold text-slate-600">
          {navItems.map((item) => {
            const isActive =
              item.id === 'density'
                ? ['density', 'mass', 'volume'].includes(activeTab)
                : activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'text-blue-700 bg-blue-50 font-bold shadow-2xs'
                    : 'hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Language Toggle & Reset */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Language Switcher */}
          <button
            onClick={onToggleLang}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 transition-colors shadow-2xs cursor-pointer"
            title="Switch Language / 切换语言 (English / 中文)"
          >
            <Globe className="w-3.5 h-3.5 text-blue-600" />
            <span className="font-mono">{lang === 'en' ? '中文' : 'English'}</span>
          </button>

          {/* Reset button */}
          <button
            onClick={onReset}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200 cursor-pointer"
            title={t.resetBtn}
          >
            <RotateCcw className="w-3 h-3 text-slate-400" />
            <span className="hidden sm:inline">{t.resetBtn}</span>
          </button>
        </div>
      </div>

      {/* Mobile / Tablet Horizontal Navigation Strip */}
      <div className="lg:hidden border-t border-slate-100 px-4 py-1.5 overflow-x-auto no-scrollbar flex items-center gap-1.5 bg-slate-50/50">
        {navItems.map((item) => {
          const isActive =
            item.id === 'density'
              ? ['density', 'mass', 'volume'].includes(activeTab)
              : activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-3 py-1 text-xs font-medium rounded-md whitespace-nowrap shrink-0 transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white font-bold shadow-2xs'
                  : 'text-slate-600 hover:bg-white hover:text-slate-900'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </header>
  );
};
