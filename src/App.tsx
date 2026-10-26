import React, { useState, useEffect } from 'react';
import { SupportedLang, resolveInitialLanguage } from './i18n/translations';
import { INITIAL_TOOLS } from './data/tools';
import { QuickSolverId } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Workstation } from './components/Workstation';
import { CloudflareToolGrid } from './components/CloudflareToolGrid';
import { ServerToolGrid } from './components/ServerToolGrid';
import { FormulaCheatSheet, FORMULA_ENTRIES } from './components/FormulaCheatSheet';
import { Footer } from './components/Footer';

// Dedicated Standalone Route Pages
import { AboutPage } from './pages/AboutPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { ContactPage } from './pages/ContactPage';
import { StandardsPage } from './pages/StandardsPage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  // Intelligent bilingual language state
  const [langState, setLangState] = useState<{ currentLang: SupportedLang; isAuto: boolean }>(() => {
    const init = resolveInitialLanguage();
    return { currentLang: init.lang, isAuto: init.isAuto };
  });

  const lang = (langState.currentLang === 'zh' ? 'zh' : 'en') as 'en' | 'zh';

  const setLang = (newLang: 'en' | 'zh') => {
    setLangState({ currentLang: newLang, isAuto: false });
    try {
      localStorage.setItem('fck_user_chosen_lang_v3', newLang);
      localStorage.removeItem('fck_lang');
    } catch {}
    const url = new URL(window.location.href);
    url.searchParams.set('lang', newLang);
    window.history.pushState({}, '', url.toString());
  };

  const handleToggleLang = () => {
    const nextLang = lang === 'en' ? 'zh' : 'en';
    setLang(nextLang);
  };

  // True URL Route State resolving soft 404
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const p = window.location.pathname.toLowerCase().replace(/\/$/, '') || '/';
      return p;
    }
    return '/';
  });

  // Active workstation solver tab
  const [activeSolverId, setActiveSolverId] = useState<QuickSolverId>('quadratic');

  // Search queries for server section
  const [serverSearchQuery, setServerSearchQuery] = useState('');

  // Handle client-side navigation without page reload
  const navigateTo = (path: string, solverId?: QuickSolverId) => {
    const cleanPath = path.toLowerCase().replace(/\/$/, '') || '/';
    window.history.pushState({}, '', path);
    setCurrentPath(cleanPath);

    if (solverId) {
      setActiveSolverId(solverId);
      setTimeout(() => {
        const el = document.getElementById('workstation');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Sync with browser Back/Forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const p = window.location.pathname.toLowerCase().replace(/\/$/, '') || '/';
      setCurrentPath(p);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Synchronize document attributes, titles and SEO metadata per route and language
  useEffect(() => {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';

    // Route-specific metadata
    if (currentPath === '/about') {
      document.title =
        lang === 'zh'
          ? '关于平台与学术编审委员会 | FormulaCalcKit - 科学计算工作台'
          : 'About Platform & Editorial Board | FormulaCalcKit STEM Studio';
    } else if (currentPath === '/standards') {
      document.title =
        lang === 'zh'
          ? '国际计量规范与学术引用溯源 (ISO/NIST) | FormulaCalcKit'
          : 'Authoritative Metrology Standards & Citations | FormulaCalcKit';
    } else if (currentPath === '/privacy') {
      document.title =
        lang === 'zh'
          ? '隐私权保护政策 | FormulaCalcKit - 零数据采集'
          : 'Privacy Policy | FormulaCalcKit - Zero Tracking & Local Computing';
    } else if (currentPath === '/terms') {
      document.title =
        lang === 'zh'
          ? '服务条款与工程计算免责声明 | FormulaCalcKit'
          : 'Terms of Service & Engineering Disclaimer | FormulaCalcKit';
    } else if (currentPath === '/contact') {
      document.title =
        lang === 'zh'
          ? '学术勘误与联系编委 | FormulaCalcKit'
          : 'Contact & Errata Submission | FormulaCalcKit';
    } else if (['/', '', '/workstation', '/directory', '/cheat-sheet'].includes(currentPath)) {
      if (lang === 'zh') {
        document.title = `FormulaCalcKit - 科学公式计算工作台 | 收录${INITIAL_TOOLS.length}款求解器与${FORMULA_ENTRIES.length}条标准推导`;
      } else {
        document.title = `FormulaCalcKit - Precision STEM Solvers (${INITIAL_TOOLS.length} Calculators · ${FORMULA_ENTRIES.length} Formulas)`;
      }
    } else {
      // 404 Page Not Found
      document.title =
        lang === 'zh'
          ? '404 页面未找到 (Page Not Found) | FormulaCalcKit'
          : '404 Page Not Found | FormulaCalcKit';
    }
  }, [lang, currentPath]);

  const scrollToSection = (id: string) => {
    if (currentPath !== '/') {
      navigateTo('/');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Determine current view component
  const isHome = ['/', '', '/workstation', '/directory', '/cheat-sheet'].includes(currentPath);
  const isAbout = currentPath === '/about';
  const isStandards = currentPath === '/standards';
  const isPrivacy = currentPath === '/privacy';
  const isTerms = currentPath === '/terms';
  const isContact = currentPath === '/contact';
  const isNotFound = !isHome && !isAbout && !isStandards && !isPrivacy && !isTerms && !isContact;

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans selection:bg-blue-600 selection:text-white overflow-x-hidden">
      {/* 1-Row 3-Zone Top Navigation Bar */}
      <Header
        lang={lang}
        onToggleLang={handleToggleLang}
        onScrollToSection={scrollToSection}
        onNavigate={navigateTo}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Dedicated Route: About */}
        {isAbout && <AboutPage lang={lang} onNavigate={navigateTo} />}

        {/* Dedicated Route: Standards & Citations */}
        {isStandards && <StandardsPage lang={lang} onNavigate={navigateTo} />}

        {/* Dedicated Route: Privacy */}
        {isPrivacy && <PrivacyPage lang={lang} onNavigate={navigateTo} />}

        {/* Dedicated Route: Terms */}
        {isTerms && <TermsPage lang={lang} onNavigate={navigateTo} />}

        {/* Dedicated Route: Contact */}
        {isContact && <ContactPage lang={lang} onNavigate={navigateTo} />}

        {/* Dedicated Route: 404 Page Not Found */}
        {isNotFound && <NotFoundPage lang={lang} onNavigate={navigateTo} />}

        {/* Main Studio / Workstation (Only rendered on home routes) */}
        {isHome && (
          <div className="space-y-12 sm:space-y-16">
            {/* Clean, authoritative Hero highlighting Formula Problem Solving */}
            <Hero
              lang={lang}
              onSelectSolver={(id) => {
                setActiveSolverId(id);
                const el = document.getElementById('workstation');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onNavigate={navigateTo}
            />

            {/* Flagship Centerpiece: The Interactive Formula Workstation */}
            <Workstation
              lang={lang}
              activeSolverId={activeSolverId}
              onSelectSolver={setActiveSolverId}
            />

            {/* Data Source 1: Cloudflare Edge Verified Subsites (Preserved Data Logic) */}
            <CloudflareToolGrid
              lang={lang}
              onSelectSolver={(id) => {
                setActiveSolverId(id);
                const el = document.getElementById('workstation');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* Data Source 2: Server-Hosted Formula Calculators Directory */}
            <ServerToolGrid
              initialTools={INITIAL_TOOLS}
              lang={lang}
              onSelectSolver={(id) => {
                setActiveSolverId(id);
                const el = document.getElementById('workstation');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              searchQuery={serverSearchQuery}
              onSearchChange={setServerSearchQuery}
            />

            {/* Comprehensive Formula Reference & Mathematical Cheat Sheet */}
            <FormulaCheatSheet
              lang={lang}
              onSelectSolver={(id) => {
                setActiveSolverId(id);
                const el = document.getElementById('workstation');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />
          </div>
        )}
      </main>

      {/* Production-Grade Footer with Legal and Nav Links */}
      <Footer
        lang={lang}
        onScrollToSection={scrollToSection}
        onNavigate={navigateTo}
      />
    </div>
  );
}
