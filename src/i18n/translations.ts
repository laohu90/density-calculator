export type Language = 'en' | 'es' | 'fr' | 'pt' | 'zh';

export interface Translations {
  // Navigation & Branding
  brandName: string;
  brandTagline: string;
  navCalculator: string;
  navMaterials: string;
  navBuoyancy: string;
  navMixture: string;
  navProblems: string;
  navKnowledge: string;
  resetBtn: string;

  // Subtitle / Hero
  heroKicker: string;
  heroTitle: string;
  heroDesc: string;

  // Calculator
  calcTarget: string;
  targetDensity: string;
  targetMass: string;
  targetVolume: string;
  precision: string;
  precisionDigits: string;
  inputParameters: string;
  siAutoSync: string;
  massLabel: string;
  volumeLabel: string;
  densityLabel: string;
  massPlaceholder: string;
  volumePlaceholder: string;
  densityPlaceholder: string;
  siBase: string;
  quickFill: string;
  currentPreset: string;
  customMaterial: string;

  // Steps
  derivationTitle: string;
  copySteps: string;
  copied: string;
  invalidInputsPrompt: string;
  stepGiven: string;
  stepUnits: string;
  stepFormula: string;
  stepSubstitute: string;
  stepResultSI: string;

  // Result card
  calcResultTitle: string;
  calcCompleted: string;
  densityResult: string;
  massResult: string;
  volumeResult: string;
  siOutputTitle: string;
  waterFloatStatus: string;
  floatsInWater: string;
  suspendedInWater: string;
  sinksInWater: string;
  closestMaterial: string;
  conversionMatrix: string;

  // Material Table
  matDbTitle: string;
  matDbDesc: string;
  addCustomBtn: string;
  searchPlaceholder: string;
  sortByDensity: string;
  sortDesc: string;
  sortAsc: string;
  filterAll: string;
  filterSolid: string;
  filterLiquid: string;
  filterGas: string;
  filterFloat: string;
  filterSink: string;
  filterCustom: string;
  colName: string;
  colState: string;
  colDensityGcm3: string;
  colDensitySI: string;
  colWaterFloat: string;
  colCondition: string;
  colAction: string;
  useInCalc: string;
  buoyancyTest: string;
  deleteCustom: string;
  noMatFound: string;
  addModalTitle: string;
  modalMatName: string;
  modalDensity: string;
  modalState: string;
  modalNote: string;
  modalCancel: string;
  modalSave: string;

  // Buoyancy Sim
  buoyancyTitle: string;
  buoyancyDesc: string;
  gravityConst: string;
  testObjTitle: string;
  quickSelectObj: string;
  objDensity: string;
  objVolume: string;
  liquidMediumTitle: string;
  quickSelectLiq: string;
  liqDensity: string;
  forceBalanceTitle: string;
  objMass: string;
  gravityForce: string;
  displacedVol: string;
  buoyancyForce: string;
  normalForce: string;
  stateFloating: string;
  stateSuspended: string;
  stateSunk: string;
  exposedSubmerged: string;
  physicsExplainTitle: string;
  floatingLaw: string;
  suspendedLaw: string;
  sunkLaw: string;

  // Mixture
  mixtureTitle: string;
  mixtureDesc: string;
  presetRatios: string;
  compListTitle: string;
  addCompBtn: string;
  compMassShare: string;
  mixtureDensityTitle: string;
  mixtureDensityAvg: string;
  totalMass: string;
  totalVol: string;
  mixtureTipTitle: string;
  mixtureTipText: string;

  // Classic Problems
  problemsTitle: string;
  problemsDesc: string;
  probCrownTitle: string;
  probHollowTitle: string;
  probDisplacementTitle: string;
  probIceTitle: string;

  // Physics Knowledge
  knowledgeTitle: string;
  knowledgeDesc: string;

  // FAQs
  faqTitle: string;
  faqDesc: string;

  // Footer & Google SEO Guide
  footerDesc: string;
  seoGuideBtn: string;
}

const enDict: Translations = {
    // Navigation & Branding
    brandName: 'Density Calculator (ρ = m/V)',
    brandTagline: 'Mass, Volume & Density Physics Solver',
    navCalculator: 'Calculator',
    navMaterials: 'Material Density Table',
    navBuoyancy: 'Buoyancy Simulation',
    navMixture: 'Alloy & Mixture',
    navProblems: 'Physics Solvers',
    navKnowledge: 'Physics Guide',
    resetBtn: 'Reset',

    // Hero
    heroKicker: 'PHYSICS TOOLS · SI UNIT COMPLIANT · ρ = m / V',
    heroTitle: 'Density Calculator (ρ = m/V)',
    heroDesc: 'Solve for density, mass, or volume with step-by-step physics derivations, full SI unit conversions, and built-in material standards.',

    // Calculator
    calcTarget: 'Solve Target',
    targetDensity: 'Density (ρ = m/V)',
    targetMass: 'Mass (m = ρ·V)',
    targetVolume: 'Volume (V = m/ρ)',
    precision: 'Decimals',
    precisionDigits: 'digits',
    inputParameters: 'Input Known Variables',
    siAutoSync: 'Auto-converted to SI baseline (kg, m³, kg/m³)',
    massLabel: 'Object Mass (m)',
    volumeLabel: 'Object Volume (V)',
    densityLabel: 'Material Density (ρ)',
    massPlaceholder: 'e.g. 78.7',
    volumePlaceholder: 'e.g. 10',
    densityPlaceholder: 'e.g. 7.87',
    siBase: 'SI Base',
    quickFill: 'Quick Fill from Material Standards:',
    currentPreset: 'Selected Material',
    customMaterial: 'Custom Material',

    // Steps
    derivationTitle: 'Step-by-Step Physics Derivation',
    copySteps: 'Copy Steps',
    copied: 'Copied!',
    invalidInputsPrompt: 'Please enter positive numeric values for mass and volume to see derivation steps.',
    stepGiven: 'Given Variables',
    stepUnits: 'Standard Unit Normalization',
    stepFormula: 'Governing Formula',
    stepSubstitute: 'Numeric Substitution',
    stepResultSI: 'SI Base Conversion',

    // Result card
    calcResultTitle: 'Calculation Result',
    calcCompleted: 'Solved',
    densityResult: 'Calculated Density (ρ)',
    massResult: 'Calculated Mass (m)',
    volumeResult: 'Calculated Volume (V)',
    siOutputTitle: 'International System of Units (SI)',
    waterFloatStatus: 'Water Buoyancy Behavior',
    floatsInWater: 'Floats on Water',
    suspendedInWater: 'Suspended neutrally in water',
    sinksInWater: 'Sinks in Water',
    closestMaterial: 'Closest Natural Substance',
    conversionMatrix: 'Common Unit Conversion Equivalents',

    // Material Table
    matDbTitle: 'Standard Material Density Database',
    matDbDesc: 'Scientifically verified density values for solids, liquids, and standard state gases at 20°C and 101.3 kPa.',
    addCustomBtn: 'Add Custom Substance',
    searchPlaceholder: 'Search by substance, chemical formula, or category (e.g. Iron, Fe, Water, Gold, Al)...',
    sortByDensity: 'Sort by Density',
    sortDesc: 'Highest first ↓',
    sortAsc: 'Lowest first ↑',
    filterAll: 'All Substances',
    filterSolid: 'Solids',
    filterLiquid: 'Liquids',
    filterGas: 'Gases (0°C, 101.3 kPa)',
    filterFloat: 'Floats on Water (ρ < 1.0)',
    filterSink: 'Sinks in Water (ρ > 1.0)',
    filterCustom: 'Custom Data',
    colName: 'Substance & Formula',
    colState: 'State',
    colDensityGcm3: 'Density (g/cm³)',
    colDensitySI: 'SI Density (kg/m³)',
    colWaterFloat: 'Water Behavior',
    colCondition: 'Condition & Specs',
    colAction: 'Actions',
    useInCalc: 'Use in Calc',
    buoyancyTest: 'Buoyancy Test',
    deleteCustom: 'Delete',
    noMatFound: 'No substances matching your search query.',
    addModalTitle: 'Add Custom Measured Substance',
    modalMatName: 'Substance Name',
    modalDensity: 'Density (g/cm³)',
    modalState: 'State of Matter',
    modalNote: 'Experimental Notes',
    modalCancel: 'Cancel',
    modalSave: 'Save Substance',

    // Buoyancy Sim
    buoyancyTitle: 'Archimedes Buoyancy & Equilibrium Simulation',
    buoyancyDesc: 'Visualize forces and submersion depth based on Archimedes principle: buoyant force equals weight of displaced fluid.',
    gravityConst: 'Gravitational Acceleration (g)',
    testObjTitle: '1. Test Object Properties',
    quickSelectObj: 'Quick Object Presets:',
    objDensity: 'Object Density (g/cm³)',
    objVolume: 'Object Volume (cm³)',
    liquidMediumTitle: '2. Immersion Fluid Medium',
    quickSelectLiq: 'Common Fluid Media:',
    liqDensity: 'Fluid Density (g/cm³)',
    forceBalanceTitle: 'Equilibrium Force Readout',
    objMass: 'Total Object Mass (m):',
    gravityForce: 'Gravity Force (G = m·g):',
    displacedVol: 'Displaced Volume (V_disp):',
    buoyancyForce: 'Buoyant Force (F_b):',
    normalForce: 'Bottom Normal Force (F_n):',
    stateFloating: 'Floating in Equilibrium (ρ_obj < ρ_fluid)',
    stateSuspended: 'Neutrally Suspended (ρ_obj = ρ_fluid)',
    stateSunk: 'Sunk to Bottom (ρ_obj > ρ_fluid)',
    exposedSubmerged: 'Exposed / Submerged',
    physicsExplainTitle: 'Equilibrium Conditions:',
    floatingLaw: 'Floating (ρ_obj < ρ_fluid): Upward buoyant force equals gravity (F_b = G). Submersion fraction is V_disp / V = ρ_obj / ρ_fluid.',
    suspendedLaw: 'Suspension (ρ_obj = ρ_fluid): Object is neutrally buoyant and rests at any depth (F_b = G).',
    sunkLaw: 'Sunk (ρ_obj > ρ_fluid): Buoyant force is less than gravity (F_b < G); container bottom supplies normal support force F_n = G - F_b.',

    // Mixture
    mixtureTitle: 'Multi-Component Mixture & Alloy Density Calculator',
    mixtureDesc: 'Calculate composite density for alloys, solutions, and mixtures: ρ_mix = total mass / total volume.',
    presetRatios: 'Classic Pre-Sets:',
    compListTitle: 'Component Breakdown',
    addCompBtn: 'Add Component',
    compMassShare: 'Mass Share',
    mixtureDensityTitle: 'Composite Mixture Density',
    mixtureDensityAvg: 'ρ_mix (Average Density)',
    totalMass: 'Total Mass (m_total):',
    totalVol: 'Total Volume (V_total):',
    mixtureTipTitle: 'Physics Note:',
    mixtureTipText: 'Composite density is NOT the simple arithmetic average (ρ1 + ρ2)/2 unless both components have identical volume. For equal mass mixtures, ρ_mix = 2·ρ1·ρ2 / (ρ1 + ρ2).',

    // Classic Problems
    problemsTitle: 'Classic Physics Problems & Solvers',
    problemsDesc: 'Interactive solvers for classic exam and engineering density problems.',
    probCrownTitle: '1. Archimedes Crown Purity Test',
    probHollowTitle: '2. Hollow vs Solid Casting Check',
    probDisplacementTitle: '3. Graduated Cylinder Displacement',
    probIceTitle: '4. Ice Melting Water Level Proof',

    // Physics Knowledge
    knowledgeTitle: 'Comprehensive Physics Density Guide',
    knowledgeDesc: 'Definitions, SI unit derivation, standard laboratory procedure, error analyses, and real-world engineering applications.',

    // FAQs
    faqTitle: 'Frequently Asked Questions (FAQ)',
    faqDesc: 'Key concepts and search answers on density, mass, volume, and unit conversions.',

    // Footer
    footerDesc: 'Designed for STEM education, physics students, and engineering professionals. Fully compliant with International System of Units (SI).',
    seoGuideBtn: 'Google Indexing & Monetization Playbook',
  },

const zhDict: Translations = {zh: {
    // Navigation & Branding
    brandName: '密度计算器 (ρ = m/V)',
    brandTagline: '质量、体积与密度物理在线换算器',
    navCalculator: '三者互求',
    navMaterials: '物质密度表',
    navBuoyancy: '浮沉水槽仿真',
    navMixture: '合金与混合物',
    navProblems: '经典题速算',
    navKnowledge: '物理知识全解',
    resetBtn: '重置参数',

    // Hero
    heroKicker: '物理工具 · 国际标准 SI 单位 · ρ = m / V',
    heroTitle: '密度计算器 (ρ = m/V)',
    heroDesc: '质量、体积、密度三者自由互求，全自动国际单位换算，完整物理规范推导步骤与内置 30+ 常见科学物质常数表。',

    // Calculator
    calcTarget: '计算求解目标',
    targetDensity: '求密度 (ρ = m/V)',
    targetMass: '求质量 (m = ρ·V)',
    targetVolume: '求体积 (V = m/ρ)',
    precision: '保留小数',
    precisionDigits: '位',
    inputParameters: '输入已知物理参数',
    siAutoSync: '自动同步国际单位制 (SI: kg, m³, kg/m³)',
    massLabel: '物体的质量 (m)',
    volumeLabel: '物体的体积 (V)',
    densityLabel: '物质的密度 (ρ)',
    massPlaceholder: '例如 78.7',
    volumePlaceholder: '例如 10',
    densityPlaceholder: '例如 7.87',
    siBase: 'SI基准',
    quickFill: '常用物质密度一键填入:',
    currentPreset: '当前选定物质',
    customMaterial: '自定义物质',

    // Steps
    derivationTitle: '完整物理公式与推导步骤详解',
    copySteps: '复制推导步骤',
    copied: '已复制！',
    invalidInputsPrompt: '请输入大于零的有效数值以生成物理推导步骤。',
    stepGiven: '已知物理量',
    stepUnits: '统一标准单位',
    stepFormula: '密度基本公式',
    stepSubstitute: '代入数值推导',
    stepResultSI: '换算为国际单位 (SI)',

    // Result card
    calcResultTitle: '计算求解结果',
    calcCompleted: '计算完成',
    densityResult: '求得密度 (ρ)',
    massResult: '求得质量 (m)',
    volumeResult: '求得体积 (V)',
    siOutputTitle: '国际标准单位 (SI)',
    waterFloatStatus: '水中的浮沉状态',
    floatsInWater: '漂浮在水面 (浮水)',
    suspendedInWater: '悬浮在水中',
    sinksInWater: '在水中下沉 (沉底)',
    closestMaterial: '最接近的天然常见物质',
    conversionMatrix: '常用单位换算速查表',

    // Material Table
    matDbTitle: '常用物质密度数据库',
    matDbDesc: '内置科学标准固体、液体、气体密度常数表（含常温20℃、标准状况0℃标定）。支持一键填入计算器与浮沉对比。',
    addCustomBtn: '添加自定义物质',
    searchPlaceholder: '搜索物质名称 / 英文名 / 化学式 (如: 铁, Fe, 水, Al, 酒精, 黄金)...',
    sortByDensity: '密度排序',
    sortDesc: '由大到小 ↓',
    sortAsc: '由小到大 ↑',
    filterAll: '全部物质',
    filterSolid: '固态 (含金属/建材)',
    filterLiquid: '液态 (水/油/水银/酒精)',
    filterGas: '气态 (空气/氧气/氢气)',
    filterFloat: '能浮在水面 (ρ < 1.0)',
    filterSink: '在水中下沉 (ρ > 1.0)',
    filterCustom: '自定义数据',
    colName: '物质名称 / 化学式',
    colState: '物态',
    colDensityGcm3: '密度 (g/cm³)',
    colDensitySI: '国际单位 (kg/m³)',
    colWaterFloat: '水沉浮特性',
    colCondition: '测量条件与描述',
    colAction: '操作',
    useInCalc: '填入计算器',
    buoyancyTest: '浮沉实验',
    deleteCustom: '删除',
    noMatFound: '未找到符合条件的物质。',
    addModalTitle: '添加自定义测量物质',
    modalMatName: '物质名称',
    modalDensity: '密度 (g/cm³)',
    modalState: '物理状态',
    modalNote: '实验备注说明',
    modalCancel: '取消',
    modalSave: '保存物质',

    // Buoyancy Sim
    buoyancyTitle: '阿基米德浮力与浮沉动态仿真水槽',
    buoyancyDesc: '基于阿基米德原理：物体所受浮力等于排开液体的重力。动态计算吃水深度、排开体积与受力平衡。',
    gravityConst: '重力常数 (g)',
    testObjTitle: '1. 待测试物体参数',
    quickSelectObj: '快速选择物体:',
    objDensity: '物体密度 (g/cm³)',
    objVolume: '物体体积 (cm³)',
    liquidMediumTitle: '2. 浸入液体介质',
    quickSelectLiq: '常用液体介质:',
    liqDensity: '液体密度 ρ液 (g/cm³)',
    forceBalanceTitle: '物理受力平衡方程',
    objMass: '物体总质量 m物:',
    gravityForce: '物体自身重力 (G = m·g):',
    displacedVol: '排开液体体积 (V排):',
    buoyancyForce: '受到液体浮力 (F浮):',
    normalForce: '水槽底部支持力 (F支):',
    stateFloating: '漂浮平衡状态 (ρ物 < ρ液)',
    stateSuspended: '悬浮状态 (ρ物 = ρ液)',
    stateSunk: '沉底状态 (ρ物 > ρ液)',
    exposedSubmerged: '露出液面 / 浸入比例',
    physicsExplainTitle: '物理浮沉原理解析:',
    floatingLaw: '漂浮条件 (ρ物 < ρ液): 物体受平衡力作用，浮力与重力相等 (F浮 = G)。物体露出液面，浸入比例 V排 / V = ρ物 / ρ液。',
    suspendedLaw: '悬浮条件 (ρ物 = ρ液): 物体完全浸没且可以静止在液体中任意深度，F浮 = G。',
    sunkLaw: '沉底条件 (ρ物 > ρ液): 浮力小于重力 (F浮 < G)，物体下沉至容器底部，容器底部对物体施加支持力 F支 = G - F浮。',

    // Mixture
    mixtureTitle: '混合物与多组分合金密度计算',
    mixtureDesc: '求解合金、溶液、复合材料等混合密度：ρ混 = (m₁ + m₂ + ...) / (V₁ + V₂ + ...)。',
    presetRatios: '经典配比预设:',
    compListTitle: '混合成分明细列表',
    addCompBtn: '添加新组分',
    compMassShare: '质量占比',
    mixtureDensityTitle: '混合综合密度',
    mixtureDensityAvg: 'ρ混 (平均混合密度)',
    totalMass: '混合物总质量 (m总):',
    totalVol: '混合物总体积 (V总):',
    mixtureTipTitle: '物理小贴士:',
    mixtureTipText: '混合密度不能直接用两者的密度取算术平均值 (ρ1 + ρ2)/2，因为两者的体积并不一定相等！只有在等体积混合时才等于算术平均；而在等质量混合时，ρ混 = 2·ρ1·ρ2 / (ρ1 + ρ2)。',

    // Classic Problems
    problemsTitle: '中考/高中/工程经典密度与浮力经典题型速算',
    problemsDesc: '覆盖物理学科常考经典模型：阿基米德王冠测金、空心与实心判断、排水法量筒测密度、冰融化水面升降判定。',
    probCrownTitle: '1. 阿基米德王冠掺假测算',
    probHollowTitle: '2. 铸件/铁球空心与实心判定',
    probDisplacementTitle: '3. 排水法量筒测不规则物密度',
    probIceTitle: '4. 冰块在液面融化升降推导',

    // Physics Knowledge
    knowledgeTitle: '密度物理知识全景大纲与实验考点速记',
    knowledgeDesc: '涵盖物理定义、固有特性、温度与反常膨胀、天平量筒标准实验法、残液挂壁误差分析、特殊测量法及高频考点陷阱题。',

    // FAQs
    faqTitle: '常见问题解答 (FAQ)',
    faqDesc: 'Google 核心检索高频物理密度问题深度解析。',

    // Footer
    footerDesc: '严格遵循国际单位制 (SI) 与中学/大学物理计算标准。适合学生、教师及工程技术人员。',
    seoGuideBtn: 'Google收录与流量变现指引 (SEO/AdSense)',
  },

};

export const TRANSLATIONS: Record<Language, Translations> = {
  en: enDict,
  es: { ...enDict },
  fr: { ...enDict },
  pt: { ...enDict },
  zh: zhDict,
};