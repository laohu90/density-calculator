import React from 'react';
import { QuickSolverId } from '../types';
import { Triangle, FunctionSquare, Calculator, Zap, Circle, FileCode, BookCheck, ShieldCheck } from 'lucide-react';
import { INITIAL_TOOLS } from '../data/tools';
import { FORMULA_ENTRIES } from './FormulaCheatSheet';

interface HeroProps {
  lang: 'en' | 'zh';
  onSelectSolver: (id: QuickSolverId) => void;
  onNavigate?: (path: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ lang, onSelectSolver, onNavigate }) => {
  const isEn = lang === 'en';

  const quickShortcuts: Array<{ id: QuickSolverId; labelEn: string; labelZh: string; icon: React.ReactNode }> = [
    { id: 'quadratic', labelEn: 'Quadratic Suite', labelZh: '一元二次全功能', icon: <FunctionSquare className="w-3.5 h-3.5" /> },
    { id: 'pythagorean', labelEn: 'Pythagorean', labelZh: '勾股定理', icon: <Triangle className="w-3.5 h-3.5" /> },
    { id: 'gcd_lcm', labelEn: 'GCD & LCM', labelZh: '公约数/倍数', icon: <Calculator className="w-3.5 h-3.5" /> },
    { id: 'ohms_law', labelEn: "Ohm's Law", labelZh: '欧姆定律', icon: <Zap className="w-3.5 h-3.5" /> },
    { id: 'circle', labelEn: 'Circle & Sector', labelZh: '圆与扇形', icon: <Circle className="w-3.5 h-3.5" /> },
    { id: 'mathbridge', labelEn: 'LaTeX Studio', labelZh: 'LaTeX 排版', icon: <FileCode className="w-3.5 h-3.5" /> },
  ];

  const handleLaunch = (id: QuickSolverId) => {
    onSelectSolver(id);
    const el = document.getElementById('workstation');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="text-center max-w-4xl mx-auto pt-6 pb-4 space-y-4">
      {/* Clean unboxed metadata separator with dynamic unified counts */}
      <div className="flex items-center justify-center gap-2 text-xs text-slate-500 font-medium flex-wrap">
        <span className="font-semibold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200/60">
          {isEn ? `${INITIAL_TOOLS.length} Precision Calculators` : `${INITIAL_TOOLS.length} 款标准科学求解器`}
        </span>
        <span aria-hidden="true" className="text-slate-300">·</span>
        <span>
          {isEn ? `${FORMULA_ENTRIES.length} Reference Formulas` : `${FORMULA_ENTRIES.length} 条标准公式`}
        </span>
        <span aria-hidden="true" className="text-slate-300">·</span>
        <button
          onClick={() => onNavigate?.('/standards')}
          className="text-indigo-600 hover:text-indigo-800 hover:underline font-mono inline-flex items-center gap-1 cursor-pointer"
        >
          <BookCheck className="w-3 h-3" />
          <span>ISO/IEC 80000 & NIST SP 811</span>
        </button>
      </div>

      {/* Main Title with balanced typography */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight text-balance">
        {isEn ? (
          <>
            Precision Formula Solvers <br className="hidden sm:inline" />
            <span className="text-blue-600">& Scientific Problem-Solving Studio</span>
          </>
        ) : (
          <>
            科学公式计算工作台 <br className="hidden sm:inline" />
            <span className="text-blue-600">高精度数学推导与工程求解器</span>
          </>
        )}
      </h1>

      {/* Clear Subtitle with explicit anti-slop authority */}
      <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed text-balance">
        {isEn
          ? `Engineered for students, educators, and engineers. Delivers exact radical reductions, step-by-step algebraic proofs, and physical constant calculations across all ${INITIAL_TOOLS.length} verified mathematical and physical domains.`
          : `为广大师生与工程人员设计。提供最简二次根式化简、规范分步代数推导、真实物理常数与计量标准溯源。涵盖全站 ${INITIAL_TOOLS.length} 款已核验的数学、几何与物理参量求解器。`}
      </p>

      {/* Direct Quick Jump Buttons into the interactive solver */}
      <div className="pt-2 flex items-center justify-center gap-2 flex-wrap">
        <span className="text-xs text-slate-400 font-medium mr-1">
          {isEn ? 'Quick Launch:' : '快速直达:'}
        </span>
        {quickShortcuts.map((s) => (
          <button
            key={s.id}
            onClick={() => handleLaunch(s.id)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            {s.icon}
            <span>{isEn ? s.labelEn : s.labelZh}</span>
          </button>
        ))}
      </div>
    </section>
  );
};
