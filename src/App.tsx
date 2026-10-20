import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Calculator } from './components/Calculator';
import { MaterialTable } from './components/MaterialTable';
import { BuoyancySim } from './components/BuoyancySim';
import { MixtureCalculator } from './components/MixtureCalculator';
import { ClassicProblems } from './components/ClassicProblems';
import { PhysicsKnowledge } from './components/PhysicsKnowledge';
import { DensityScale } from './components/DensityScale';
import { SEOFAQ } from './components/SEOFAQ';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Substance, CalculationMode } from './types/density';
import { Language, TRANSLATIONS } from './i18n/translations';

export default function App() {
  // Default to English as requested
  const [lang, setLang] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('density_calculator_pref_lang');
      if (saved === 'zh' || saved === 'en') return saved;
    } catch {
      // ignore
    }
    return 'en';
  });

  const [activeTab, setActiveTab] = useState<
    CalculationMode | 'materials' | 'problems' | 'spectrum' | 'knowledge'
  >('density');

  const [buoyancyTarget, setBuoyancyTarget] = useState<Substance | null>(null);
  const [calculatorKey, setCalculatorKey] = useState<number>(0);

  const t = TRANSLATIONS[lang];

  // Sync language with document metadata and persistence
  useEffect(() => {
    try {
      localStorage.setItem('density_calculator_pref_lang', lang);
    } catch {
      // ignore
    }
    document.documentElement.lang = lang;
    if (lang === 'en') {
      document.title = 'Density Calculator (ρ = m/V) – Mass, Volume & Density Converter';
    } else {
      document.title = '密度计算器 (ρ = m/V) - 常用物质密度表与单位换算在线计算';
    }
  }, [lang]);

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'en' ? 'zh' : 'en'));
  };

  const handleSelectMaterialForCalc = (sub: Substance) => {
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
    <ErrorBoundary>
      <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
        {/* Top Bar Contract (3 zones) */}
        <Header
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          lang={lang}
          onToggleLang={toggleLanguage}
          onReset={handleReset}
        />

        {/* Main Workspace Container */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
          {/* Hero Section / Quiet Kicker */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2 text-2xs text-slate-400 font-mono tracking-wider uppercase mb-1">
                <span>{t.heroKicker}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                {t.heroTitle}
              </h1>
              <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
                {t.heroDesc}
              </p>
            </div>

            {/* Sub-nav Tab Selector */}
            <div className="flex items-center gap-1 p-1 bg-slate-200/70 rounded-lg overflow-x-auto shrink-0">
              <button
                onClick={() => setActiveTab('density')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  ['density', 'mass', 'volume'].includes(activeTab)
                    ? 'bg-white text-blue-700 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {t.navCalculator}
              </button>
              <button
                onClick={() => setActiveTab('materials')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  activeTab === 'materials'
                    ? 'bg-white text-blue-700 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {t.navMaterials}
              </button>
              <button
                onClick={() => setActiveTab('buoyancy')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  activeTab === 'buoyancy'
                    ? 'bg-white text-blue-700 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {t.navBuoyancy}
              </button>
              <button
                onClick={() => setActiveTab('mixture')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  activeTab === 'mixture'
                    ? 'bg-white text-blue-700 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {t.navMixture}
              </button>
              <button
                onClick={() => setActiveTab('problems')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  activeTab === 'problems'
                    ? 'bg-white text-blue-700 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {t.navProblems}
              </button>
              <button
                onClick={() => setActiveTab('knowledge')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  activeTab === 'knowledge'
                    ? 'bg-white text-blue-700 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {t.navKnowledge}
              </button>
            </div>
          </div>

          {/* Active View */}
          {['density', 'mass', 'volume'].includes(activeTab) && (
            <div className="space-y-6 sm:space-y-8">
              <Calculator key={calculatorKey} lang={lang} onSelectSubstanceForBuoyancy={handleSimulateBuoyancy} />
              <DensityScale lang={lang} />
            </div>
          )}

          {activeTab === 'materials' && (
            <div className="space-y-6 sm:space-y-8">
              <MaterialTable
                lang={lang}
                onSelectMaterial={handleSelectMaterialForCalc}
                onSimulateBuoyancy={handleSimulateBuoyancy}
              />
              <DensityScale lang={lang} />
            </div>
          )}

          {activeTab === 'buoyancy' && (
            <div className="space-y-6 sm:space-y-8">
              <BuoyancySim lang={lang} initialObject={buoyancyTarget} />
              <DensityScale lang={lang} />
            </div>
          )}

          {activeTab === 'mixture' && (
            <div className="space-y-6 sm:space-y-8">
              <MixtureCalculator lang={lang} />
            </div>
          )}

          {activeTab === 'problems' && (
            <div className="space-y-6 sm:space-y-8">
              <ClassicProblems lang={lang} />
            </div>
          )}

          {activeTab === 'knowledge' && (
            <div className="space-y-6 sm:space-y-8">
              <PhysicsKnowledge lang={lang} />
              <DensityScale lang={lang} />
            </div>
          )}

          {/* Google High-intent SEO FAQ Section */}
          <div className="pt-4">
            <SEOFAQ lang={lang} />
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-slate-200 mt-12 py-6 text-xs text-slate-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-800">{t.brandName}</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-500">{t.footerDesc}</span>
            </div>

            <div className="flex items-center gap-3 text-slate-600 font-mono text-2xs">
              <span>ρ = m / V</span>
              <span aria-hidden="true">·</span>
              <span>1 g/cm³ = 1,000 kg/m³</span>
              <span aria-hidden="true">·</span>
              <a
                href="https://github.com/laohu90/density-calculator"
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline"
              >
                GitHub
              </a>
            </div>
          </div>
        </footer>
      </div>
    </ErrorBoundary>
  );
}
