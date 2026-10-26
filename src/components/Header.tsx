import React, { useState } from 'react';
import { Languages, Menu, X, BookCheck, Info } from 'lucide-react';

interface HeaderProps {
  lang: 'en' | 'zh';
  onToggleLang: () => void;
  onScrollToSection: (id: string) => void;
  onNavigate?: (path: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  onToggleLang,
  onScrollToSection,
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isEn = lang === 'en';

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    if (typeof window !== 'undefined' && window.location.pathname !== '/') {
      onNavigate?.('/');
      setTimeout(() => onScrollToSection(sectionId), 100);
    } else {
      onScrollToSection(sectionId);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4 sm:gap-8">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => {
            if (onNavigate) {
              onNavigate('/');
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          className="flex items-center gap-2.5 whitespace-nowrap shrink-0 group cursor-pointer text-left"
        >
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-2xs group-hover:bg-blue-700 transition-colors">
            <span className="font-mono font-bold text-base leading-none">∑</span>
          </div>
          <div>
            <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900 block leading-tight">
              FormulaCalcKit
            </span>
            <span className="text-[10px] font-mono text-slate-400 hidden sm:block">
              {isEn ? 'Metrology STEM Studio' : '高精度科学计算工作台'}
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-5 text-xs font-semibold text-slate-600">
          <button
            onClick={() => handleNavClick('workstation')}
            className="hover:text-blue-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            {isEn ? 'Workstation' : '计算工作台'}
          </button>
          <button
            onClick={() => handleNavClick('cloudflare-tools')}
            className="hover:text-blue-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            {isEn ? 'Verified Solvers' : '独立求解器'}
          </button>
          <button
            onClick={() => handleNavClick('cheat-sheet')}
            className="hover:text-blue-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            {isEn ? 'Formula Cheat Sheet' : '公式参考手册'}
          </button>
          <button
            onClick={() => onNavigate?.('/standards')}
            className="hover:text-indigo-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1"
          >
            <BookCheck className="w-3.5 h-3.5 text-indigo-600" />
            <span>{isEn ? 'Standards' : '计量规范'}</span>
          </button>
          <button
            onClick={() => onNavigate?.('/about')}
            className="hover:text-blue-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1"
          >
            <Info className="w-3.5 h-3.5 text-blue-600" />
            <span>{isEn ? 'About' : '关于平台'}</span>
          </button>
        </nav>

        {/* Zone 3: Actions & Language Switcher */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={onToggleLang}
            aria-label={isEn ? 'Switch to Chinese' : 'Switch to English'}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 min-h-[36px]"
            title={isEn ? 'Switch to Chinese (简体中文)' : 'Switch to English'}
          >
            <Languages className="w-3.5 h-3.5 text-slate-500" />
            <span>{isEn ? '中文' : 'EN'}</span>
          </button>

          <button
            onClick={() => handleNavClick('workstation')}
            className="hidden sm:inline-flex items-center px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-2xs transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[36px]"
          >
            {isEn ? 'Instant Solver' : '即时求解'}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown (Optimized for 390x844) */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white px-4 py-3 space-y-2 text-xs font-semibold shadow-md">
          <button
            onClick={() => handleNavClick('workstation')}
            className="block w-full text-left py-2.5 text-slate-700 hover:text-blue-600 cursor-pointer"
          >
            {isEn ? 'Workstation (Interactive Solvers)' : '计算工作台 (交互式推导)'}
          </button>
          <button
            onClick={() => handleNavClick('cloudflare-tools')}
            className="block w-full text-left py-2.5 text-slate-700 hover:text-blue-600 cursor-pointer"
          >
            {isEn ? 'All Verified Calculators' : '全部已核验独立计算器'}
          </button>
          <button
            onClick={() => handleNavClick('cheat-sheet')}
            className="block w-full text-left py-2.5 text-slate-700 hover:text-blue-600 cursor-pointer"
          >
            {isEn ? 'Formula Cheat Sheet' : '常用公式速查参考'}
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onNavigate?.('/standards');
            }}
            className="block w-full text-left py-2.5 text-indigo-700 hover:text-indigo-900 cursor-pointer"
          >
            {isEn ? 'ISO/NIST Standards & Citations' : 'ISO/NIST 计量标准与学术引用'}
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onNavigate?.('/about');
            }}
            className="block w-full text-left py-2.5 text-slate-700 hover:text-blue-600 cursor-pointer"
          >
            {isEn ? 'About & Editorial Board' : '关于平台与学术编审委员会'}
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onNavigate?.('/contact');
            }}
            className="block w-full text-left py-2.5 text-slate-700 hover:text-blue-600 cursor-pointer"
          >
            {isEn ? 'Contact & Errata Submission' : '联系我们与学术勘误反馈'}
          </button>
        </div>
      )}
    </header>
  );
};
