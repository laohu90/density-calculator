import React from 'react';
import { ShieldCheck, BookCheck, Info, Scale, Mail, Github } from 'lucide-react';
import { INITIAL_TOOLS } from '../data/tools';
import { FORMULA_ENTRIES } from './FormulaCheatSheet';

interface FooterProps {
  lang: 'en' | 'zh';
  onScrollToSection: (id: string) => void;
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onScrollToSection, onNavigate }) => {
  const isEn = lang === 'en';

  return (
    <footer className="bg-slate-50 border-t border-slate-200 mt-20 text-slate-600 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white font-mono font-bold text-sm">
                ∑
              </div>
              <span className="font-bold text-slate-900 text-base">FormulaCalcKit</span>
              <span className="text-[10px] text-slate-500 font-mono">
                formulacalckit.com
              </span>
            </div>
            <p className="text-slate-500 max-w-md leading-relaxed text-xs">
              {isEn
                ? `FormulaCalcKit is a verified open scientific computing workstation providing ${INITIAL_TOOLS.length} precision solvers with closed-form radical reductions, full algebraic derivations, and ISO/IEC 80000 metrology alignment.`
                : `FormulaCalcKit（高精度科学计算工作台）提供 ${INITIAL_TOOLS.length} 款国际计量与课程大纲对齐的求解器，严守最简二次根式化简与全步骤代数推导，杜绝黑盒近似。`}
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <div className="flex items-center gap-1.5 text-slate-600 bg-white border border-slate-200 px-2.5 py-1 rounded-lg">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span className="font-medium text-[11px]">
                  {isEn ? 'Zero Telemetry · Pure Client-Side' : '纯本地前端计算 · 零隐私追踪'}
                </span>
              </div>
              <button
                onClick={() => onNavigate('/standards')}
                className="flex items-center gap-1.5 text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-1 rounded-lg hover:bg-indigo-100 transition-colors cursor-pointer"
              >
                <BookCheck className="w-3.5 h-3.5 text-indigo-600" />
                <span className="font-medium text-[11px]">
                  {isEn ? 'ISO/IEC 80000 Compliant' : 'ISO 80000 计量规范'}
                </span>
              </button>
            </div>
          </div>

          {/* Quick Solvers Navigation */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
              {isEn ? 'Core Solvers' : '核心求解器'}
            </h4>
            <ul className="space-y-1.5 text-slate-500 text-xs">
              <li>
                <button
                  onClick={() => {
                    onNavigate('/');
                    setTimeout(() => onScrollToSection('workstation'), 100);
                  }}
                  className="hover:text-blue-600 cursor-pointer text-left transition-colors"
                >
                  {isEn ? 'Quadratic Equation Comprehensive Suite' : '一元二次方程全功能套件'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('/');
                    setTimeout(() => onScrollToSection('workstation'), 100);
                  }}
                  className="hover:text-blue-600 cursor-pointer text-left transition-colors"
                >
                  {isEn ? 'Pythagorean Hypotenuse Solver' : '勾股定理与最简根式'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('/');
                    setTimeout(() => onScrollToSection('workstation'), 100);
                  }}
                  className="hover:text-blue-600 cursor-pointer text-left transition-colors"
                >
                  {isEn ? 'Density & Buoyancy Simulation' : '密度计算与阿基米德浮力'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('/');
                    setTimeout(() => onScrollToSection('workstation'), 100);
                  }}
                  className="hover:text-blue-600 cursor-pointer text-left transition-colors"
                >
                  {isEn ? "Ohm's Law & Circuit Power" : '欧姆定律与电功率多参量'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('/');
                    setTimeout(() => onScrollToSection('workstation'), 100);
                  }}
                  className="hover:text-blue-600 cursor-pointer text-left transition-colors"
                >
                  {isEn ? 'MathBridge LaTeX to OMML' : 'MathBridge 学术公式排版'}
                </button>
              </li>
            </ul>
          </div>

          {/* Institutional, Standards & Legal */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
              {isEn ? 'Standards & Legal' : '权威规范与政策'}
            </h4>
            <ul className="space-y-1.5 text-slate-500 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('/about')}
                  className="hover:text-blue-600 transition-colors cursor-pointer text-left flex items-center gap-1.5"
                >
                  <Info className="w-3.5 h-3.5 text-slate-400" />
                  <span>{isEn ? 'About Platform & Editorial Board' : '关于平台与学术编审委员会'}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/standards')}
                  className="hover:text-blue-600 transition-colors cursor-pointer text-left flex items-center gap-1.5"
                >
                  <BookCheck className="w-3.5 h-3.5 text-slate-400" />
                  <span>{isEn ? 'Metrology Standards & Citations' : '国际计量标准与论文引用'}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/privacy')}
                  className="hover:text-blue-600 transition-colors cursor-pointer text-left"
                >
                  {isEn ? 'Privacy Policy' : '隐私权政策 (Privacy Policy)'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/terms')}
                  className="hover:text-blue-600 transition-colors cursor-pointer text-left flex items-center gap-1.5"
                >
                  <Scale className="w-3.5 h-3.5 text-slate-400" />
                  <span>{isEn ? 'Terms of Service & Disclaimer' : '服务条款与工程免责'}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/contact')}
                  className="hover:text-blue-600 transition-colors cursor-pointer text-left flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>{isEn ? 'Contact & Errata Reporting' : '联系我们与学术勘误'}</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-slate-400 text-[11px]">
          <div>
            © {new Date().getFullYear()} FormulaCalcKit (formulacalckit.com). MIT Open Source.
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span>
              {isEn
                ? `${INITIAL_TOOLS.length} Verified Solvers · ${FORMULA_ENTRIES.length} Reference Formulas`
                : `收录 ${INITIAL_TOOLS.length} 款求解器 · ${FORMULA_ENTRIES.length} 条标准公式`}
            </span>
            <span aria-hidden="true">·</span>
            <a
              href="https://github.com/laohu90/formulacalckit"
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline inline-flex items-center gap-1"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
