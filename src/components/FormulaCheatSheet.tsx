import React, { useState } from 'react';
import { QuickSolverId, FormulaEntry } from '../types';
import { BookOpen, Copy, Check, ChevronDown, ChevronUp, Zap, Scale } from 'lucide-react';

interface FormulaCheatSheetProps {
  lang: 'en' | 'zh';
  onSelectSolver: (id: QuickSolverId) => void;
}

export const FORMULA_ENTRIES: FormulaEntry[] = [
  // 1. Quadratic Equation Comprehensive
  {
    id: 'f-quadratic',
    titleEn: 'Quadratic Equation & Quadratic Formula',
    titleZh: '一元二次方程求根公式与判别式',
    categoryEn: 'Algebra',
    categoryZh: '代数',
    categoryKey: 'algebra',
    formula: 'ax² + bx + c = 0 ⇒ x = (-b ± √(b² - 4ac)) / (2a)',
    formulaLatex: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}, \\quad \\Delta = b^2 - 4ac',
    quickSolverId: 'quadratic',
    descEn:
      'Fundamental equation of degree two. The discriminant Δ = b² - 4ac determines root nature: two distinct real roots (Δ > 0), one double root (Δ = 0), or complex conjugate roots (Δ < 0).',
    descZh:
      '基础二次多项式方程。判别式 Δ = b² - 4ac 决定根的性质：Δ > 0 有两个不等实根；Δ = 0 有双重实根；Δ < 0 有共轭虚根。',
    variables: [
      { sym: 'a, b, c', nameEn: 'Real coefficients (with a ≠ 0)', nameZh: '二次项、一次项及常数项系数 (a ≠ 0)' },
      { sym: 'Δ', nameEn: 'Discriminant = b² - 4ac', nameZh: '判别式 Δ = b² - 4ac' },
      { sym: 'x₁, x₂', nameEn: 'Equation roots', nameZh: '方程两根 (满足 x₁+x₂=-b/a, x₁x₂=c/a)' },
    ],
    exampleEn: 'For 2x² - 4x - 6 = 0: a=2, b=-4, c=-6 ⇒ Δ = 16 - 4(2)(-6) = 64 ⇒ x = (4 ± 8)/4 ⇒ x₁ = 3, x₂ = -1.',
    exampleZh: '对于 2x² - 4x - 6 = 0：a=2, b=-4, c=-6 ⇒ Δ = 16 - 4(2)(-6) = 64 ⇒ x = (4 ± 8)/4 ⇒ x₁ = 3, x₂ = -1。',
  },

  // 2. Pythagorean Theorem
  {
    id: 'f-pythagorean',
    titleEn: 'Pythagorean Theorem',
    titleZh: '勾股定理（毕达哥拉斯定理）',
    categoryEn: 'Geometry',
    categoryZh: '几何',
    categoryKey: 'geometry',
    formula: 'a² + b² = c² ⇒ c = √(a² + b²)',
    formulaLatex: 'c = \\sqrt{a^2 + b^2}',
    quickSolverId: 'pythagorean',
    descEn:
      'In any right-angled Euclidean triangle, the sum of the squares of the two leg lengths equals the square of the hypotenuse length.',
    descZh:
      '在平面直角三角形中，两条直角边的平方和等于斜边的平方。支持最简二次根式化简与勾股数验证。',
    variables: [
      { sym: 'a, b', nameEn: 'Lengths of the two perpendicular legs', nameZh: '两条直角边长 a 与 b' },
      { sym: 'c', nameEn: 'Hypotenuse length (opposite the 90° angle)', nameZh: '斜边长 c' },
    ],
    exampleEn: 'If a = 3 and b = 4, then c = √(3² + 4²) = √25 = 5 (classic 3-4-5 integer triple).',
    exampleZh: '若直角边 a = 3，b = 4，则斜边 c = √(3² + 4²) = √25 = 5（经典勾三股四弦五）。',
  },

  // 3. Density Definition
  {
    id: 'f-density',
    titleEn: 'Density & Volume Mass Relationship',
    titleZh: '密度定义公式 (ρ = m/V)',
    categoryEn: 'Physics',
    categoryZh: '物理',
    categoryKey: 'physics',
    formula: 'ρ = m / V ⇔ m = ρ · V ⇔ V = m / ρ',
    formulaLatex: '\\rho = \\frac{m}{V}, \\quad m = \\rho \\cdot V, \\quad V = \\frac{m}{\\rho}',
    quickSolverId: 'density',
    descEn:
      'Volumetric mass density measures mass per unit volume. Fundamental state variable in thermodynamics, engineering metrology, and material characterization.',
    descZh:
      '物体的质量与体积之比。国际单位制基准为 kg/m³，常用 g/cm³（1 g/cm³ = 1000 kg/m³）。水在 4°C 标称密度为 1.000 g/cm³。',
    variables: [
      { sym: 'ρ', nameEn: 'Density (kg/m³ or g/cm³)', nameZh: '密度 ρ' },
      { sym: 'm', nameEn: 'Mass (kg or g)', nameZh: '质量 m' },
      { sym: 'V', nameEn: 'Volume (m³ or cm³)', nameZh: '体积 V' },
    ],
    exampleEn: 'An iron block has mass m = 78.7 g and volume V = 10 cm³: ρ = 78.7 / 10 = 7.87 g/cm³.',
    exampleZh: '铁块质量 m = 78.7 g，体积 V = 10 cm³：密度 ρ = 78.7 / 10 = 7.87 g/cm³。',
  },

  // 4. Archimedes Buoyancy
  {
    id: 'f-buoyancy',
    titleEn: "Archimedes' Buoyancy Principle",
    titleZh: '阿基米德浮力定律',
    categoryEn: 'Physics',
    categoryZh: '物理',
    categoryKey: 'physics',
    formula: 'F_b = ρ_fluid · g · V_disp',
    formulaLatex: 'F_b = \\rho_{\\text{fluid}} g V_{\\text{disp}}',
    quickSolverId: 'density',
    descEn:
      'An object submerged in a static fluid experiences an upward buoyant force equal to the weight of the fluid displaced by the object.',
    descZh:
      '浸在静止流体中的物体受到向上的浮力，浮力大小等于物体排开流体的重力。当物体密度小于液体时漂浮；大于时沉底。',
    variables: [
      { sym: 'F_b', nameEn: 'Upward buoyant force (Newtons, N)', nameZh: '浮力 F_b (N)' },
      { sym: 'ρ_fluid', nameEn: 'Fluid density (kg/m³)', nameZh: '流体密度 ρ_液 (kg/m³)' },
      { sym: 'g', nameEn: 'Gravitational acceleration (9.80665 m/s²)', nameZh: '重力加速度 g (9.8 m/s²)' },
      { sym: 'V_disp', nameEn: 'Displaced fluid volume (m³)', nameZh: '排开液体体积 V_排 (m³)' },
    ],
    exampleEn: 'A 0.001 m³ object completely submerged in pure water (1000 kg/m³): Fb = 1000 × 9.8 × 0.001 = 9.8 N.',
    exampleZh: '体积为 0.001 m³ 的物体完全没入水中：Fb = 1000 × 9.8 × 0.001 = 9.8 N。',
  },

  // 5. Ohm's Law & Circuit Power
  {
    id: 'f-ohms',
    titleEn: "Ohm's Law & Joule Electrical Power",
    titleZh: '欧姆定律与电功率公式',
    categoryEn: 'Physics',
    categoryZh: '物理',
    categoryKey: 'physics',
    formula: 'V = I · R, P = V · I = I²R = V²/R',
    formulaLatex: 'V = I \\cdot R, \\quad P = V \\cdot I = I^2 R = \\frac{V^2}{R}',
    quickSolverId: 'ohms_law',
    descEn:
      'Fundamental law of electrical circuits connecting voltage, current, resistance, and dissipated thermal power.',
    descZh:
      '电路中电压、电流与电阻的线性关系定律。结合焦耳定律，电功率 P = UI，常用于电源负载匹配与发热量核算。',
    variables: [
      { sym: 'V', nameEn: 'Voltage (Volts, V)', nameZh: '电压 (V)' },
      { sym: 'I', nameEn: 'Current (Amperes, A)', nameZh: '电流 (A)' },
      { sym: 'R', nameEn: 'Resistance (Ohms, Ω)', nameZh: '电阻 (Ω)' },
      { sym: 'P', nameEn: 'Power (Watts, W)', nameZh: '电功率 (W)' },
    ],
    exampleEn: 'A 12V automotive circuit drawing 2A current has resistance R = 12/2 = 6Ω and power P = 12 × 2 = 24W.',
    exampleZh: '12V 车载电路通过 2A 电流，负载电阻 R = 12/2 = 6Ω，功耗 P = 12 × 2 = 24W。',
  },

  // 6. Euclidean GCD & LCM
  {
    id: 'f-gcd',
    titleEn: 'Euclidean Algorithm for GCD & LCM',
    titleZh: '欧几里得辗转相除法 (GCD 与 LCM)',
    categoryEn: 'Arithmetic',
    categoryZh: '算术',
    categoryKey: 'arithmetic',
    formula: 'gcd(a, b) = gcd(b, a mod b), lcm(a, b) = |a · b| / gcd(a, b)',
    formulaLatex: '\\gcd(a, b) = \\gcd(b, a \\bmod b), \\quad \\operatorname{lcm}(a, b) = \\frac{|a \\cdot b|}{\\gcd(a, b)}',
    quickSolverId: 'gcd_lcm',
    descEn:
      'The Euclidean algorithm efficiently computes the greatest common divisor of two integers via successive modulo divisions.',
    descZh:
      '利用余数迭代递减快速求两整数的最大公约数。两数乘积等于其最大公约数与最小公倍数的乘积。',
    variables: [
      { sym: 'a, b', nameEn: 'Positive integer inputs', nameZh: '待求解的非负整数 a 与 b' },
      { sym: 'gcd', nameEn: 'Greatest Common Divisor', nameZh: '最大公约数' },
      { sym: 'lcm', nameEn: 'Least Common Multiple', nameZh: '最小公倍数' },
    ],
    exampleEn: 'For a = 48, b = 18: gcd = 6, lcm = (48 × 18)/6 = 144.',
    exampleZh: '对于 a = 48, b = 18：gcd = 6，lcm = (48 × 18)/6 = 144。',
  },

  // 7. Fraction Arithmetic
  {
    id: 'f-fraction',
    titleEn: 'Rational Fraction Arithmetic & Common Denominators',
    titleZh: '有理数分数四则运算与通分',
    categoryEn: 'Arithmetic',
    categoryZh: '算术',
    categoryKey: 'arithmetic',
    formula: 'a/b ± c/d = (ad ± bc) / bd, (a/b) · (c/d) = ac / bd',
    formulaLatex: '\\frac{a}{b} \\pm \\frac{c}{d} = \\frac{ad \\pm bc}{bd}, \\quad \\frac{a}{b} \\times \\frac{c}{d} = \\frac{ac}{bd}',
    quickSolverId: 'gcd_lcm',
    descEn:
      'Exact operations on rational numbers. Finds common multiples for denominators and cancels common factors for irreducible fractions.',
    descZh:
      '有理数分数的四则混合运算。异分母通过求分母最小公倍数进行通分，结果提取分子分母最大公约数进行约分。',
    variables: [
      { sym: 'a/b, c/d', nameEn: 'Rational fractions (b, d ≠ 0)', nameZh: '有理数分数 (分母不为 0)' },
    ],
    exampleEn: '1/3 + 1/6 = (2 + 1)/6 = 3/6 = 1/2.',
    exampleZh: '1/3 + 1/6 = (2 + 1)/6 = 3/6 = 1/2。',
  },

  // 8. Linear Function & Slope
  {
    id: 'f-linear',
    titleEn: 'Linear Function & Slope-Intercept Equation',
    titleZh: '一次函数斜截式与两点求斜率',
    categoryEn: 'Algebra',
    categoryZh: '代数',
    categoryKey: 'algebra',
    formula: 'y = kx + b, k = (y₂ - y₁) / (x₂ - x₁)',
    formulaLatex: 'y = kx + b, \\quad k = \\frac{y_2 - y_1}{x_2 - x_1}',
    quickSolverId: 'linear_system',
    descEn:
      'Describes a non-vertical straight line in the Cartesian plane where k represents the rate of change and b represents the y-axis intercept.',
    descZh:
      '笛卡尔坐标系中平面直线的标准形式。k 为斜率（反映倾斜程度），b 为直线在 y 轴上的截距。',
    variables: [
      { sym: 'k', nameEn: 'Slope (tangent of inclination angle)', nameZh: '斜率 k' },
      { sym: 'b', nameEn: 'y-intercept (y value when x = 0)', nameZh: '纵截距 b' },
    ],
    exampleEn: 'Passing (1, 2) and (3, 6): k = (6-2)/(3-1) = 2 ⇒ y - 2 = 2(x - 1) ⇒ y = 2x.',
    exampleZh: '过点 (1, 2) 与 (3, 6)：k = (6-2)/(3-1) = 2 ⇒ y = 2x。',
  },

  // 9. 2x2 Linear System & Cramer's Rule
  {
    id: 'f-linearsystem',
    titleEn: "2x2 Linear System & Cramer's Determinant Rule",
    titleZh: '二元一次方程组与克莱姆行列式法则',
    categoryEn: 'Algebra',
    categoryZh: '代数',
    categoryKey: 'algebra',
    formula: 'x = Dx / D, y = Dy / D (D = a₁b₂ - a₂b₁ ≠ 0)',
    formulaLatex: 'x = \\frac{D_x}{D}, \\quad y = \\frac{D_y}{D}, \\quad D = \\begin{vmatrix} a_1 & b_1 \\\\ a_2 & b_2 \\end{vmatrix}',
    quickSolverId: 'linear_system',
    descEn:
      'Solves simultaneous linear equations using 2x2 determinants. If D ≠ 0, there is a unique intersection point; if D = 0, lines are parallel or coincident.',
    descZh:
      '利用二阶行列式快速求解二元一次方程组。当系数行列式 D ≠ 0 时存在唯一解；D = 0 时为平行无解或重合无穷解。',
    variables: [
      { sym: 'D', nameEn: 'Main coefficient determinant', nameZh: '系数行列式 D' },
      { sym: 'Dx, Dy', nameEn: 'Replaced constant column determinants', nameZh: '常数代换行列式 Dx 与 Dy' },
    ],
    exampleEn: 'x + y = 5, 2x - y = 1 ⇒ D = 1(-1) - 2(1) = -3, Dx = 5(-1) - 1(1) = -6 ⇒ x = 2, y = 3.',
    exampleZh: 'x + y = 5, 2x - y = 1 ⇒ D = -3, Dx = -6 ⇒ x = 2, y = 3。',
  },

  // 10. Circle & Sphere Geometry
  {
    id: 'f-circle',
    titleEn: 'Circle Circumference, Area & Sphere Volume',
    titleZh: '圆周长、圆面积与球体体积',
    categoryEn: 'Geometry',
    categoryZh: '几何',
    categoryKey: 'geometry',
    formula: 'C = 2πr, S = πr², V_sphere = (4/3)πr³',
    formulaLatex: 'C = 2\\pi r, \\quad S = \\pi r^2, \\quad V = \\frac{4}{3}\\pi r^3',
    quickSolverId: 'circle',
    descEn:
      'Fundamental metric formulas for 2D circles and 3D spheres based on the universal mathematical constant π.',
    descZh:
      '以数学常数 π 为基础的圆与球体度量公式。在笛卡尔坐标系与球坐标系中具有完全各向同性。',
    variables: [
      { sym: 'r', nameEn: 'Radius', nameZh: '半径 r' },
      { sym: 'C', nameEn: 'Circumference', nameZh: '圆周长 C' },
      { sym: 'V', nameEn: 'Sphere volume', nameZh: '球体积 V' },
    ],
    exampleEn: 'A circle of radius r = 5 has C = 10π ≈ 31.42 and area S = 25π ≈ 78.54.',
    exampleZh: '半径 r = 5 的圆：周长 C = 10π ≈ 31.42，面积 S = 25π ≈ 78.54。',
  },

  // 11. Sector Area & Arc Length
  {
    id: 'f-sector',
    titleEn: 'Sector Arc Length & Area',
    titleZh: '扇形弧长与面积公式',
    categoryEn: 'Geometry',
    categoryZh: '几何',
    categoryKey: 'geometry',
    formula: 'L = (n/180)πr = αr, S = (n/360)πr² = (1/2)Lr',
    formulaLatex: 'L = \\alpha r = \\frac{n}{180}\\pi r, \\quad S = \\frac{1}{2}Lr = \\frac{n}{360}\\pi r^2',
    quickSolverId: 'circle',
    descEn:
      'Calculates the perimeter and area of a circular slice given either degrees (n°) or radian angle (α).',
    descZh:
      '计算由两条半径和一段圆弧围成的扇形几何量，支持角度制与弧度制双向自由换算。',
    variables: [
      { sym: 'r', nameEn: 'Radius', nameZh: '半径 r' },
      { sym: 'α', nameEn: 'Central angle (radians)', nameZh: '圆心角 α (弧度制)' },
      { sym: 'L', nameEn: 'Arc length', nameZh: '弧长 L' },
    ],
    exampleEn: 'A sector with r = 6 and central angle 60°: L = (60/180)π(6) = 2π ≈ 6.28.',
    exampleZh: '半径 r = 6、圆心角 60° 的扇形：弧长 L = (60/180)π(6) = 2π ≈ 6.28。',
  },

  // 12. Trigonometric Pythagorean Identity
  {
    id: 'f-trig',
    titleEn: 'Fundamental Trigonometric Identity',
    titleZh: '同角三角函数基本恒等式',
    categoryEn: 'Trigonometry',
    categoryZh: '三角学',
    categoryKey: 'trigonometry',
    formula: 'sin²θ + cos²θ = 1, tanθ = sinθ / cosθ',
    formulaLatex: '\\sin^2\\theta + \\cos^2\\theta = 1, \\quad \\tan\\theta = \\frac{\\sin\\theta}{\\cos\\theta}',
    quickSolverId: 'trigonometry',
    descEn:
      'Derived directly from the unit circle (x² + y² = 1), valid for all real and complex angles θ.',
    descZh:
      '单位圆上点坐标 (cosθ, sinθ) 满足 x² + y² = 1，是所有高等微积分与傅里叶变换的基石。',
    variables: [
      { sym: 'θ', nameEn: 'Angle (degrees or radians)', nameZh: '任意角 θ' },
    ],
    exampleEn: 'For θ = 30°: sin(30°) = 1/2, cos(30°) = √3/2 ⇒ (1/2)² + (√3/2)² = 1/4 + 3/4 = 1.',
    exampleZh: '对于 θ = 30°：sin(30°) = 1/2，cos(30°) = √3/2 ⇒ 1/4 + 3/4 = 1。',
  },

  // 13. Percentage Change Rate
  {
    id: 'f-percentage',
    titleEn: 'Percentage Change & Relative Variance',
    titleZh: '百分比相对变化率公式',
    categoryEn: 'Finance',
    categoryZh: '金融与统计',
    categoryKey: 'finance',
    formula: 'Change% = ((V₂ - V₁) / |V₁|) × 100%',
    formulaLatex: '\\text{Change}\\% = \\frac{V_2 - V_1}{|V_1|} \\times 100\\%',
    quickSolverId: 'percentage',
    descEn:
      'Quantifies the degree of change between an initial value V1 and a final value V2 as a dimensionless percentage.',
    descZh:
      '衡量终值相对于初始基数的变化幅度。结果大于0为增长率，小于0为下降率。',
    variables: [
      { sym: 'V₁', nameEn: 'Initial baseline value', nameZh: '初始基数 V₁' },
      { sym: 'V₂', nameEn: 'Final new value', nameZh: '变化后终值 V₂' },
    ],
    exampleEn: 'If price increases from $80 to $100: Change% = ((100 - 80) / 80) × 100% = +25%.',
    exampleZh: '若价格从 80 元涨至 100 元：变化率 = ((100 - 80) / 80) × 100% = +25%。',
  },

  // 14. Heron's Triangle Area
  {
    id: 'f-heron',
    titleEn: "Heron's Formula for Triangle Area",
    titleZh: '海伦公式（任意三边求三角形面积）',
    categoryEn: 'Geometry',
    categoryZh: '几何',
    categoryKey: 'geometry',
    formula: 'S = √(s(s - a)(s - b)(s - c)), s = (a + b + c) / 2',
    formulaLatex: 'S = \\sqrt{s(s - a)(s - b)(s - c)}, \\quad s = \\frac{a + b + c}{2}',
    quickSolverId: 'pythagorean',
    descEn:
      'Gives the area of any triangle from its three side lengths without requiring perpendicular heights or internal angles.',
    descZh:
      '已知三角形三边长度 a、b、c，先求半周长 s，即可直接计算面积，无需测量高或夹角。',
    variables: [
      { sym: 'a, b, c', nameEn: 'Side lengths (must satisfy triangle inequality)', nameZh: '三边边长 a, b, c' },
      { sym: 's', nameEn: 'Semi-perimeter (a + b + c) / 2', nameZh: '半周长 s' },
    ],
    exampleEn: 'Triangle with sides 7, 8, 9: s = 12 ⇒ S = √(12 × 5 × 4 × 3) = √720 = 12√5 ≈ 26.83.',
    exampleZh: '三边为 7, 8, 9：半周长 s = 12 ⇒ S = √(12 × 5 × 4 × 3) = √720 = 12√5 ≈ 26.83。',
  },

  // 15. Compound Interest
  {
    id: 'f-interest',
    titleEn: 'Discrete Compound Interest & Annuity',
    titleZh: '离散复利终值计算公式',
    categoryEn: 'Finance',
    categoryZh: '金融',
    categoryKey: 'finance',
    formula: 'A = P(1 + r/n)^(nt)',
    formulaLatex: 'A = P\\left(1 + \\frac{r}{n}\\right)^{nt}',
    quickSolverId: 'percentage',
    descEn:
      'Calculates exponential interest accumulation where earned interest generates further interest across n compounding periods.',
    descZh:
      '衡量本金在多期计息下的指数级增长。利息计入本金继续生息，常见按月、按季或按年复利。',
    variables: [
      { sym: 'P', nameEn: 'Principal deposit', nameZh: '初始本金 P' },
      { sym: 'r', nameEn: 'Nominal annual interest rate (decimal)', nameZh: '年化名义利率 r' },
      { sym: 'n', nameEn: 'Compounding frequency per year', nameZh: '每年计息期数 n' },
      { sym: 't', nameEn: 'Time elapsed (years)', nameZh: '投资年限 t' },
    ],
    exampleEn: '$1,000 at 5% annual interest compounded monthly for 2 years: A = 1000(1 + 0.05/12)^24 ≈ $1,104.94.',
    exampleZh: '1000元以5%年利率按月复利投资2年：A = 1000(1 + 0.05/12)^24 ≈ 1,104.94元。',
  },

  // 16. Kinematics Accelerated Motion
  {
    id: 'f-kinematics',
    titleEn: 'Uniform Accelerated Linear Motion (Kinematics)',
    titleZh: '匀变速直线运动三大基本规律',
    categoryEn: 'Physics',
    categoryZh: '物理',
    categoryKey: 'physics',
    formula: 'v = v₀ + at, s = v₀t + (1/2)at², v² - v₀² = 2as',
    formulaLatex: 'v = v_0 + at, \\quad s = v_0 t + \\frac{1}{2}at^2, \\quad v^2 - v_0^2 = 2as',
    quickSolverId: 'kinematics',
    descEn:
      'Governs particle motion in a straight line under constant gravitational or mechanical acceleration.',
    descZh:
      '经典力学中物体受恒力作用时的运动学方程，联立初速度、末速度、加速度、位移与时间五个物理量。',
    variables: [
      { sym: 's', nameEn: 'Displacement (meters, m)', nameZh: '位移 s (m)' },
      { sym: 'v₀, v', nameEn: 'Initial and final velocities (m/s)', nameZh: '初速度 v0 与 末速度 v (m/s)' },
      { sym: 'a', nameEn: 'Acceleration (m/s²)', nameZh: '恒定加速度 a (m/s²)' },
      { sym: 't', nameEn: 'Time duration (seconds, s)', nameZh: '运动时间 t (s)' },
    ],
    exampleEn: 'Free fall from rest (v0 = 0, a = 9.8 m/s²) for t = 3s: v = 9.8 × 3 = 29.4 m/s; s = 0.5 × 9.8 × 9 = 44.1 m.',
    exampleZh: '自由落体从静止开始下落 3 秒：末速度 v = 9.8 × 3 = 29.4 m/s；下落位移 s = 0.5 × 9.8 × 9 = 44.1 m。',
  },
];

export const FormulaCheatSheet: React.FC<FormulaCheatSheetProps> = ({
  lang,
  onSelectSolver,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedAll, setExpandedAll] = useState(true);
  const isEn = lang === 'en';

  const handleCopyLatex = (latex: string, id: string) => {
    navigator.clipboard.writeText(latex);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="cheat-sheet" className="space-y-6 scroll-mt-20">
      {/* Section Header with dynamic count */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600">
            <BookOpen className="w-4 h-4" />
            <span>
              {isEn
                ? `Standard Metrology Library · ${FORMULA_ENTRIES.length} Core Formulas`
                : `标准计量公式库 · 共收录 ${FORMULA_ENTRIES.length} 条严谨推导公式`}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 mt-1">
            {isEn ? 'Formula Cheat Sheet & Mathematical Derivations' : '常用公式速查参考与分步推导法则'}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {isEn
              ? 'Complete closed-form mathematical equations, standard SI variable definitions, and LaTeX representations matching our 16 precision solvers.'
              : '涵盖代数、几何、力学、电磁学与金融统计的核心公式。与全站 16 款标准计算器 1:1 严格对齐，支持一键复制 LaTeX。'}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setExpandedAll(!expandedAll)}
            className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
          >
            {expandedAll ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            <span>{expandedAll ? (isEn ? 'Collapse Details' : '折叠变量与案例') : (isEn ? 'Expand All' : '展开全部变量与案例')}</span>
          </button>
        </div>
      </div>

      {/* Formula Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {FORMULA_ENTRIES.map((item, idx) => (
          <div
            key={item.id}
            className="p-5 bg-white border border-slate-200 hover:border-blue-300 rounded-2xl shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              {/* Category & Title */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                    {idx + 1}. {isEn ? item.categoryEn : item.categoryZh}
                  </span>
                  <h3 className="font-bold text-slate-900 text-sm mt-1">
                    {isEn ? item.titleEn : item.titleZh}
                  </h3>
                </div>

                <button
                  onClick={() => handleCopyLatex(item.formulaLatex, item.id)}
                  title="Copy LaTeX formula"
                  className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-500 hover:text-blue-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-md transition-colors cursor-pointer shrink-0"
                >
                  {copiedId === item.id ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedId === item.id ? (isEn ? 'Copied' : '已复制') : 'LaTeX'}</span>
                </button>
              </div>

              {/* Main Formula Display */}
              <div className="p-3 bg-slate-50/80 border border-slate-200 rounded-xl font-mono text-xs text-blue-900 font-bold tracking-tight select-all overflow-x-auto">
                {item.formula}
              </div>

              {/* Description */}
              <p className="text-xs text-slate-600 leading-relaxed">
                {isEn ? item.descEn : item.descZh}
              </p>

              {/* Expanded details: Variables & Example */}
              {expandedAll && (
                <div className="pt-2 border-t border-slate-100 space-y-2.5 text-xs">
                  <div>
                    <span className="font-semibold text-slate-700 block text-[11px] mb-1">
                      {isEn ? 'Variables & SI Dimensions:' : '物理量与符号定义：'}
                    </span>
                    <ul className="space-y-1 text-slate-500 text-[11px]">
                      {item.variables.map((v, vIdx) => (
                        <li key={vIdx} className="flex items-start gap-1.5">
                          <span className="font-mono font-bold text-slate-700 shrink-0">{v.sym}:</span>
                          <span>{isEn ? v.nameEn : v.nameZh}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-2.5 bg-slate-50 rounded-lg text-[11px] text-slate-600 leading-relaxed">
                    <span className="font-semibold text-slate-700">{isEn ? 'Worked Example: ' : '经典推导演示：'}</span>
                    <span>{isEn ? item.exampleEn : item.exampleZh}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Launch Quick Solver Action */}
            {item.quickSolverId && (
              <div className="pt-3 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => onSelectSolver(item.quickSolverId!)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-300" />
                  <span>{isEn ? 'Launch Solver' : '进入对应求解器'}</span>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
