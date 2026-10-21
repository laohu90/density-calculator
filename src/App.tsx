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
import { GoogleSEOChecklistModal } from './components/GoogleSEOChecklistModal';
import { Substance, CalculationMode } from './types/density';
import { Language, SupportedLang, TRANSLATIONS, resolveInitialLanguage } from './i18n/translations';
import { Sparkles, ShieldCheck } from 'lucide-react';

export default function App() {
  // Default to English as requested
  const [langState, setLangState] = useState<{ currentLang: SupportedLang; isAuto: boolean }>(() => {
    const init = resolveInitialLanguage();
    return { currentLang: init.lang, isAuto: init.isAuto };
  });
  const lang = langState.currentLang;
  const isAuto = langState.isAuto;
  const setLang = (newLangOrFn: Language | ((prev: Language) => Language)) => {
    setLangState((prev) => {
      const next = typeof newLangOrFn === 'function' ? newLangOrFn(prev.currentLang) : newLangOrFn;
      try {
        localStorage.setItem('density_calc_user_chosen_lang_v3', next);
        localStorage.removeItem('density_calculator_pref_lang');
      } catch {}
      const url = new URL(window.location.href);
      url.searchParams.set('lang', next);
      window.history.pushState({}, '', url.toString());
      return { currentLang: next, isAuto: false };
    });
  };

  const [activeTab, setActiveTab] = useState<
    CalculationMode | 'materials' | 'problems' | 'spectrum' | 'knowledge'
  >('density');

  const [buoyancyTarget, setBuoyancyTarget] = useState<Substance | null>(null);
  const [calculatorKey, setCalculatorKey] = useState<number>(0);
  const [currentDensity, setCurrentDensity] = useState<number>(7.87);
  const [selectedDensityPreset, setSelectedDensityPreset] = useState<number | null>(null);
  const [isSeoModalOpen, setIsSeoModalOpen] = useState<boolean>(false);

  const t = TRANSLATIONS[lang];

  // Dynamic Google SEO metadata & language synchronization
  useEffect(() => {
    try {
      localStorage.setItem('density_calculator_pref_lang', lang);
    } catch {
      // ignore
    }

    document.documentElement.lang = lang === 'en' ? 'en' : 'zh-CN';

    if (lang === 'en') {
      document.title = 'Density Calculator (ρ = m/V) – Instant Mass, Volume & Density Converter';
      const descMeta = document.querySelector('meta[name="description"]');
      if (descMeta) {
        descMeta.setAttribute(
          'content',
          'Free online density calculator. Instantly solve for density, mass, or volume (ρ = m/V) with step-by-step derivations, unit conversions, material database, and Archimedes buoyancy simulation.'
        );
      }
    } else {
      document.title = '密度计算器 (ρ = m/V) - 常用物质密度表与质量体积在线换算';
      const descMeta = document.querySelector('meta[name="description"]');
      if (descMeta) {
        descMeta.setAttribute(
          'content',
          '专业物理密度在线计算器，支持质量、体积、密度三者互求(ρ = m/V)，内置30+种常用物质密度常数表、阿基米德浮力仿真及中高考经典题速算。'
        );
      }
    }

    // Dynamic canonical resolution
    try {
      const canonicalTag = document.getElementById('canonical-tag');
      if (canonicalTag && window.location.origin && !window.location.origin.includes('localhost')) {
        canonicalTag.setAttribute('href', `${window.location.origin}/`);
      }
    } catch {
      // ignore
    }
  }, [lang]);

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'en' ? 'zh' : 'en'));
  };

  const handleSelectMaterialForCalc = (sub: Substance) => {
    setSelectedDensityPreset(sub.density);
    setCurrentDensity(sub.density);
    setActiveTab('density');
  };

  const handleSimulateBuoyancy = (sub: Substance) => {
    setBuoyancyTarget(sub);
    setActiveTab('buoyancy');
  };

  const handleReset = () => {
    setSelectedDensityPreset(null);
    setCurrentDensity(7.87);
    setCalculatorKey((k) => k + 1);
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
        {/* Unified Top Navigation */}
        <Header
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          lang={lang}
          onToggleLang={toggleLanguage}
          onReset={handleReset}
        />

        {/* Main Workspace Container */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
          {/* Hero Section */}
          <section className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2 text-2xs text-blue-600 font-mono font-bold tracking-wider uppercase mb-1">
                <span>{t.heroKicker}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                {t.heroTitle}
              </h1>
              <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
                {t.heroDesc}
              </p>
            </div>

            {/* Quick Physics Formula Badges */}
            <div className="flex items-center gap-2 text-2xs font-mono text-slate-600 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs shrink-0">
              <span className="font-bold text-blue-700">ρ = m / V</span>
              <span className="text-slate-300">|</span>
              <span>m = ρ × V</span>
              <span className="text-slate-300">|</span>
              <span>V = m / ρ</span>
            </div>
          </section>

          {/* Active View / Main Sections with Semantic IDs for Google Sitelinks */}
          {['density', 'mass', 'volume'].includes(activeTab) && (
            <section id="calculator" className="space-y-6 sm:space-y-8">
              <Calculator
                key={calculatorKey}
                lang={lang}
                onSelectSubstanceForBuoyancy={handleSimulateBuoyancy}
                onDensityChange={(d: number) => setCurrentDensity(d)}
                selectedDensityPreset={selectedDensityPreset}
              />

              {/* Natural Cosmic Density Scale Spectrum */}
              <div className="pt-2">
                <DensityScale
                  lang={lang}
                  currentDensity={currentDensity}
                  onSelectDensity={(val) => {
                    setSelectedDensityPreset(val);
                    setCurrentDensity(val);
                  }}
                />
              </div>
            </section>
          )}

          {activeTab === 'materials' && (
            <section id="materials" className="space-y-6 sm:space-y-8">
              <MaterialTable
                lang={lang}
                onSelectMaterial={handleSelectMaterialForCalc}
                onSimulateBuoyancy={handleSimulateBuoyancy}
              />
            </section>
          )}

          {activeTab === 'spectrum' && (
            <section id="spectrum" className="space-y-6 sm:space-y-8">
              <DensityScale
                lang={lang}
                currentDensity={currentDensity}
                onSelectDensity={(val) => {
                  setSelectedDensityPreset(val);
                  setCurrentDensity(val);
                  setActiveTab('density');
                }}
              />
            </section>
          )}

          {activeTab === 'buoyancy' && (
            <section id="buoyancy" className="space-y-6 sm:space-y-8">
              <BuoyancySim lang={lang} initialObject={buoyancyTarget} />
            </section>
          )}

          {activeTab === 'mixture' && (
            <section id="mixture" className="space-y-6 sm:space-y-8">
              <MixtureCalculator lang={lang} />
            </section>
          )}

          {activeTab === 'problems' && (
            <section id="problems" className="space-y-6 sm:space-y-8">
              <ClassicProblems lang={lang} />
            </section>
          )}

          {activeTab === 'knowledge' && (
            <section id="knowledge" className="space-y-6 sm:space-y-8">
              <PhysicsKnowledge lang={lang} />
            </section>
          )}

          {/* Google High-intent SEO FAQ Section */}
          <section id="faq" className="pt-4">
            <SEOFAQ lang={lang} />
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-slate-200 mt-12 py-6 text-xs text-slate-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-bold text-slate-800">{t.brandName}</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-500">{t.footerDesc}</span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Google SEO & Monetization Playbook Modal Trigger */}
              <button
                onClick={() => setIsSeoModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 border border-blue-200 text-blue-700 font-semibold text-2xs transition-all shadow-2xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>{t.seoGuideBtn}</span>
              </button>

              <span aria-hidden="true" className="text-slate-300">·</span>

              <div className="flex items-center gap-2 font-mono text-2xs text-slate-600">
                <span>ρ = m / V</span>
                <span aria-hidden="true">·</span>
                <span>1 g/cm³ = 1,000 kg/m³</span>
              </div>

              <span aria-hidden="true" className="text-slate-300">·</span>

              <a
                href="https://github.com/laohu90/density-calculator"
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline font-semibold text-2xs"
              >
                GitHub Open Source
              </a>
            </div>
          </div>
        </footer>

        {/* Google SEO & Indexing Modal */}
        <GoogleSEOChecklistModal
          isOpen={isSeoModalOpen}
          onClose={() => setIsSeoModalOpen(false)}
          lang={lang}
        />
      </div>
    </ErrorBoundary>
  );
}
