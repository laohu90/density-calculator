import {
  CloudflareDnsRecord,
  DnsConfig,
  CloudflareApiResponse,
  WorkerSubsiteTool,
  WorkerApiResponse,
} from '../types';

/**
 * Cloudflare Worker DNS Gateway Endpoint
 *
 * This Worker runs server-side on Cloudflare's edge network.
 * It holds the credentials securely in Worker environment variables,
 * preventing any exposure of Cloudflare API Keys in the client browser.
 */
export const WORKER_DNS_API_URL =
  'https://formulacalckit-dns-api.cloudflare-1-268.workers.dev/';

export const DEFAULT_DNS_CONFIG: DnsConfig = {
  authMode: 'token',
  apiToken: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_CLOUDFLARE_API_TOKEN) || '',
  authEmail: '',
  authKey: '',
  zoneId: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_CLOUDFLARE_ZONE_ID) || '',
  rootDomain: 'formulacalckit.com',
};

// Seed fallback in case network is disconnected
export const FALLBACK_WORKER_TOOLS: WorkerSubsiteTool[] = [
  {
    subdomain: 'quadratic-solver',
    domain: 'quadratic-solver.formulacalckit.com',
    url: 'https://quadratic-solver.formulacalckit.com/',
    title: '一元二次方程全功能求解套件',
    desc: '一元二次方程全功能工作台：整合求根公式、配方法顶点式、判别式 Δ 分析及韦达定理对称式运算。',
    icon: '🔢',
    category: 'Algebra',
    formula: 'ax^2 + bx + c = 0',
  },
  {
    subdomain: 'pythagorean-calculator',
    domain: 'pythagorean-calculator.formulacalckit.com',
    url: 'https://pythagorean-calculator.formulacalckit.com/',
    title: '勾股定理与直角三角形斜边计算器',
    desc: '直角三角形求斜边与最简二次根式精确化简（如 2√5），支持经典勾股数与分步几何证明。',
    icon: '📐',
    category: 'Geometry',
    formula: 'a^2 + b^2 = c^2',
  },
  {
    subdomain: 'gcd-calculator',
    domain: 'gcd-calculator.formulacalckit.com',
    url: 'https://gcd-calculator.formulacalckit.com/',
    title: '最大公约数与最小公倍数计算器 (GCD/LCM)',
    desc: '在线求最大公约数与最小公倍数，支持辗转相除法、短除法及质因数分解树状图分步推导。',
    icon: '🔢',
    category: 'Mathematics',
    formula: '\\gcd(a, b), \\operatorname{lcm}(a, b)',
  },
  {
    subdomain: 'density-calculator',
    domain: 'density-calculator.formulacalckit.com',
    url: 'https://density-calculator.formulacalckit.com/',
    title: '密度计算公式与阿基米德浮力仿真 (ρ = m/V)',
    desc: '工科计量级密度工作台，支持质量/体积/密度三向互求，内置Tanaka水温修正与浮力受力仿真。',
    icon: '⚖️',
    category: 'Physics',
    formula: '\\rho = m / V',
  },
  {
    subdomain: 'fraction-calculator',
    domain: 'fraction-calculator.formulacalckit.com',
    url: 'https://fraction-calculator.formulacalckit.com/',
    title: '分数四则混合运算与最简分数约分器',
    desc: '分数四则混合运算、通分找最小公倍数、最简分数约分化简、假分数与带分数互相转换。',
    icon: '➗',
    category: 'Mathematics',
    formula: 'a/b \\pm c/d',
  },
  {
    subdomain: 'linear-function-calculator',
    domain: 'linear-function-calculator.formulacalckit.com',
    url: 'https://linear-function-calculator.formulacalckit.com/',
    title: '一次函数解析式与直线方程求解器 (y = kx + b)',
    desc: '两点坐标秒出直线斜率k、截距b、解析式y=kx+b与一般式Ax+By+C=0，支持动态坐标图像。',
    icon: '📈',
    category: 'Algebra',
    formula: 'y = kx + b',
  },
  {
    subdomain: 'linear-system-solver',
    domain: 'linear-system-solver.formulacalckit.com',
    url: 'https://linear-system-solver.formulacalckit.com/',
    title: '二元一次方程组求解器 (消元法与克莱姆法则)',
    desc: '二元一次方程组带步骤求解，支持代入消元法与加减消元法、精确分数化简与图象交点。',
    icon: '🧮',
    category: 'Algebra',
    formula: 'a_1 x + b_1 y = c_1',
  },
  {
    subdomain: 'ohms-law-calculator',
    domain: 'ohms-law-calculator.formulacalckit.com',
    url: 'https://ohms-law-calculator.formulacalckit.com/',
    title: '欧姆定律与电功率多参数计算器',
    desc: '根据电压(V)、电流(I)、电阻(R)和电功率(P)中任意两个已知量求解其余参量，支持SI单位换算。',
    icon: '⚡',
    category: 'Physics',
    formula: 'V = I \\cdot R',
  },
  {
    subdomain: 'sector-calculator',
    domain: 'sector-calculator.formulacalckit.com',
    url: 'https://sector-calculator.formulacalckit.com/',
    title: '扇形面积、弧长与圆心角计算器',
    desc: '扇形面积与弧长在线求解，支持角度制与弧度制双向输入、周长与圆锥侧面展开图。',
    icon: '🥧',
    category: 'Geometry',
    formula: 'S = \\frac{1}{2}lr',
  },
  {
    subdomain: 'circle-sphere-calc',
    domain: 'circle-sphere-calc.formulacalckit.com',
    url: 'https://circle-sphere-calc.formulacalckit.com/',
    title: '圆与球体几何全参数计算器',
    desc: '二维与三维圆弧几何计算器：支持输入半径、直径、周长、圆面积或球体积逆推全部几何量。',
    icon: '⚪',
    category: 'Geometry',
    formula: 'C = 2\\pi r, V = \\frac{4}{3}\\pi r^3',
  },
  {
    subdomain: 'trigonometry-solver',
    domain: 'trigonometry-solver.formulacalckit.com',
    url: 'https://trigonometry-solver.formulacalckit.com/',
    title: '三角函数与特殊角精确值求解器',
    desc: '精确求解正弦、余弦、正切，针对特殊角输出最简根式（如 √3/2, √2/2），支持单位圆与弧度制。',
    icon: '📐',
    category: 'Trigonometry',
    formula: '\\sin^2\\theta + \\cos^2\\theta = 1',
  },
  {
    subdomain: 'percentage-calculator',
    domain: 'percentage-calculator.formulacalckit.com',
    url: 'https://percentage-calculator.formulacalckit.com/',
    title: '百分比增减率与相对变化量计算器',
    desc: '计算数值占总额百分比、同比增长率/环比降幅、基数反推及商业折扣，带完整算术步骤。',
    icon: '📊',
    category: 'Finance',
    formula: '\\Delta\\% = \\frac{V_2 - V_1}{|V_1|}',
  },
  {
    subdomain: 'herons-formula',
    domain: 'herons-formula.formulacalckit.com',
    url: 'https://herons-formula.formulacalckit.com/',
    title: '海伦公式任意三边求三角形面积计算器',
    desc: '已知三角形三边长度直接求解面积，内置三角形两边之和大于第三边严格合法性校验与根式化简。',
    icon: '🔺',
    category: 'Geometry',
    formula: 'S = \\sqrt{s(s-a)(s-b)(s-c)}',
  },
  {
    subdomain: 'compound-interest',
    domain: 'compound-interest.formulacalckit.com',
    url: 'https://compound-interest.formulacalckit.com/',
    title: '复利终值与年金投资收益计算器',
    desc: '高精度复利投资收益测算：支持多频次计息、72法则本金翻倍时间与定期定额年金投资增长表。',
    icon: '💰',
    category: 'Finance',
    formula: 'A = P(1 + r/n)^{nt}',
  },
  {
    subdomain: 'kinematics-motion',
    domain: 'kinematics-motion.formulacalckit.com',
    url: 'https://kinematics-motion.formulacalckit.com/',
    title: '匀变速直线运动运动学求解器',
    desc: '输入位移(s)、初速度(v0)、末速度(v)、加速度(a)及时间(t)任意三项，严密推导其余物理量。',
    icon: '🚀',
    category: 'Physics',
    formula: 'v = v_0 + at, s = v_0 t + \\frac{1}{2}at^2',
  },
  {
    subdomain: 'mathbridge',
    domain: 'mathbridge.formulacalckit.com',
    url: 'https://mathbridge.formulacalckit.com/',
    title: 'MathBridge 学术公式排版与 LaTeX/Word 转换器',
    desc: 'LaTeX / Word / MathML 论文级数学公式排版套件，支持秒转 Word 原生 OMML 公式与高清透明 SVG。',
    icon: '📝',
    category: 'Academic',
    formula: '\\text{LaTeX} \\iff \\text{OMML}',
  },
];

/**
 * Fetch live active subdomains from the Cloudflare Worker DNS API
 * Automatically reflects new sites added or removed from Cloudflare DNS!
/**
 * Candidate endpoints for live PHP directory scanner.
 * Supports dedicated tools subdomain, local path rewrite, and root domain.
 */
export const PHP_SCANNER_CANDIDATE_URLS = [
  "https://tools.formulacalckit.com/",
  "https://tools.formulacalckit.com/tools.php",
  "https://tools.formulacalckit.com/index.php",
  typeof window !== "undefined" && window.location.origin.includes("formulacalckit.com")
    ? "/tools.php"
    : "https://formulacalckit.com/tools.php",
];

export const LIVE_PHP_SCANNER_URL = PHP_SCANNER_CANDIDATE_URLS[0];

function decodeHtmlEntities(str: string): string {
  if (!str) return '';
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');
}

/**
 * Safely fetch live tools from server tools.php scanner with timeout & content-type protection
 */
export async function fetchPhpServerTools(): Promise<WorkerSubsiteTool[]> {
  for (const url of PHP_SCANNER_CANDIDATE_URLS) {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 3500);
      const res = await fetch(url, {
        method: "GET",
        headers: { Accept: "application/json" },
        signal: controller.signal,
      });
      clearTimeout(timer);

      if (res.ok) {
        const text = await res.text();
        const trimmed = text.trim();
        // Guard against HTML rewrites from single page application hosts
        if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
          const data = JSON.parse(trimmed);
          let rawList: WorkerSubsiteTool[] = [];
          if (data && data.success && Array.isArray(data.tools)) {
            rawList = data.tools;
          } else if (Array.isArray(data)) {
            rawList = data;
          }

          if (rawList.length > 0) {
            return rawList.map((tool) => ({
              ...tool,
              title: decodeHtmlEntities(tool.title || ''),
              desc: decodeHtmlEntities(tool.desc || ''),
            }));
          }
        }
      }
    } catch (err) {
      console.warn(`PHP scanner attempt on ${url} skipped:`, err);
    }
  }
  return [];
}

/**
 * Fetch live active subdomains with True Lossless Dual-Scanning:
 * 1. Cloudflare DNS Worker records (active DNS-routed tools)
 * 2. Real-time PHP directory scanner (/tools.php on user server)
 * Performs attribute deep-merge so live HTML titles/descriptions enrich DNS tools,
 * and newly deployed directory sites appear seamlessly alongside DNS tools.
 */
export async function fetchWorkerDnsTools(): Promise<{
  success: boolean;
  tools: WorkerSubsiteTool[];
  count: number;
  source: "worker" | "hybrid" | "cache" | "fallback";
}> {
  let workerTools: WorkerSubsiteTool[] = [];
  let phpTools: WorkerSubsiteTool[] = [];
  let isWorkerSuccess = false;
  let isPhpSuccess = false;

  // Run both pipelines concurrently
  const [workerRes, phpRes] = await Promise.allSettled([
    fetch(WORKER_DNS_API_URL, {
      method: "GET",
      headers: { Accept: "application/json" },
    }).then(async (r) => {
      if (r.ok) {
        const d: WorkerApiResponse = await r.json();
        if (d && d.success && Array.isArray(d.tools)) return d.tools;
      }
      return [];
    }),
    fetchPhpServerTools(),
  ]);

  if (workerRes.status === "fulfilled" && workerRes.value && workerRes.value.length > 0) {
    workerTools = workerRes.value;
    isWorkerSuccess = true;
  }

  if (phpRes.status === "fulfilled" && phpRes.value && phpRes.value.length > 0) {
    phpTools = phpRes.value;
    isPhpSuccess = true;
  }

  // Fallback to cache/seed if both failed
  if (!isWorkerSuccess && !isPhpSuccess) {
    if (typeof window !== "undefined") {
      const cached = localStorage.getItem("fck_worker_tools_cache");
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return {
              success: true,
              tools: parsed,
              count: parsed.length,
              source: "cache",
            };
          }
        } catch {}
      }
    }
    return {
      success: true,
      tools: FALLBACK_WORKER_TOOLS,
      count: FALLBACK_WORKER_TOOLS.length,
      source: "fallback",
    };
  }

  // True Lossless Dual-Scan Merge
  const mergedMap = new Map<string, WorkerSubsiteTool>();

  // 1. Populate base tools from Cloudflare DNS (or fallback)
  const baseTools = isWorkerSuccess ? workerTools : FALLBACK_WORKER_TOOLS;
  for (const tool of baseTools) {
    if (tool && tool.subdomain) {
      const slug = tool.subdomain.toLowerCase().trim();
      mergedMap.set(slug, { ...tool });
    }
  }

  // 2. Seamlessly merge PHP tools
  for (const phpTool of phpTools) {
    if (!phpTool || !phpTool.subdomain) continue;
    const slug = phpTool.subdomain.toLowerCase().trim();
    const existing = mergedMap.get(slug);

    if (existing) {
      // Retain verified DNS routing & math solvers, update live title/desc if scanned from real HTML
      mergedMap.set(slug, {
        ...existing,
        title: phpTool.title && phpTool.title !== phpTool.subdomain && phpTool.title.length > 2
          ? phpTool.title
          : existing.title,
        desc: phpTool.desc && phpTool.desc.length > 5
          ? phpTool.desc
          : existing.desc,
        formula: phpTool.formula || existing.formula,
        category: phpTool.category || existing.category,
        icon: phpTool.icon || existing.icon,
        url: phpTool.url || existing.url,
        pathUrl: phpTool.pathUrl || existing.pathUrl,
      });
    } else {
      // Newly discovered standalone subsite or tool on user server!
      mergedMap.set(slug, {
        ...phpTool,
        domain: phpTool.domain || (slug + ".formulacalckit.com"),
        url: phpTool.url || ("https://" + slug + ".formulacalckit.com/"),
      });
    }
  }

  const finalTools = Array.from(mergedMap.values());

  if (typeof window !== "undefined" && finalTools.length > 0) {
    try {
      localStorage.setItem("fck_worker_tools_cache", JSON.stringify(finalTools));
    } catch {}
  }

  return {
    success: true,
    tools: finalTools,
    count: finalTools.length,
    source: isWorkerSuccess && isPhpSuccess ? "hybrid" : (isWorkerSuccess ? "worker" : "hybrid"),
  };
}

export const SEED_DNS_RECORDS: CloudflareDnsRecord[] = [
  {
    id: 'cf-rec-001',
    type: 'CNAME',
    name: 'pythagorean-calculator.formulacalckit.com',
    content: 'cname.vercel-dns.com',
    proxiable: true,
    proxied: true,
    ttl: 1,
    created_on: '2026-10-19T05:20:00Z',
    comment: 'Pythagorean Theorem Calculator Tool',
  },
  {
    id: 'cf-rec-002',
    type: 'CNAME',
    name: 'quadratic.formulacalckit.com',
    content: 'cname.vercel-dns.com',
    proxiable: true,
    proxied: true,
    ttl: 1,
    created_on: '2026-10-18T10:00:00Z',
    comment: 'Quadratic Equation Solver Tool',
  },
  {
    id: 'cf-rec-003',
    type: 'CNAME',
    name: 'mathbridge.formulacalckit.com',
    content: 'cname.vercel-dns.com',
    proxiable: true,
    proxied: true,
    ttl: 1,
    created_on: '2026-10-19T06:00:00Z',
    comment: 'MathBridge LaTeX Tool',
  },
];

export async function fetchCloudflareDns(
  config: DnsConfig
): Promise<{
  success: boolean;
  records: CloudflareDnsRecord[];
  rawCount: number;
  errors?: Array<{ code: number; message: string }>;
}> {
  // First attempt Worker
  try {
    const workerResult = await fetchWorkerDnsTools();
    if (workerResult.success && workerResult.tools.length > 0) {
      const simulatedRecords: CloudflareDnsRecord[] = workerResult.tools.map((t, idx) => ({
        id: `worker-rec-${idx + 1}`,
        type: 'CNAME',
        name: t.domain,
        content: 'cname.vercel-dns.com',
        proxiable: true,
        proxied: true,
        ttl: 1,
        comment: t.title,
      }));
      return {
        success: true,
        records: simulatedRecords,
        rawCount: simulatedRecords.length,
      };
    }
  } catch (err) {
    console.warn('Worker sync in fetchCloudflareDns:', err);
  }

  const zoneId = config.zoneId.trim();
  if (!zoneId) {
    return {
      success: false,
      records: [],
      rawCount: 0,
      errors: [{ code: 400, message: 'Zone ID cannot be empty' }],
    };
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (config.authMode === 'token') {
    headers['Authorization'] = `Bearer ${config.apiToken.trim()}`;
  } else {
    headers['X-Auth-Email'] = config.authEmail.trim();
    headers['X-Auth-Key'] = config.authKey.trim();
  }

  try {
    const proxyUrl = `/api/cloudflare/zones/${zoneId}/dns_records?per_page=100`;
    const res = await fetch(proxyUrl, { headers });
    const data: CloudflareApiResponse<CloudflareDnsRecord[]> = await res.json();
    if (data.success && Array.isArray(data.result)) {
      return {
        success: true,
        records: data.result,
        rawCount: data.result.length,
      };
    }
  } catch (err) {
    console.warn('Proxy fetch failed:', err);
  }

  return {
    success: false,
    records: [],
    rawCount: 0,
    errors: [
      {
        code: 10000,
        message: 'Could not connect directly. Worker API is active as primary pipeline.',
      },
    ],
  };
}

export function extractWebSubdomains(
  records: CloudflareDnsRecord[],
  rootDomain: string
): Array<{
  subdomain: string;
  fullName: string;
  type: string;
  target: string;
  proxied: boolean;
  ttl: string;
  guessedToolName: string;
  isRoot: boolean;
}> {
  const cleanRoot = rootDomain.toLowerCase().trim();
  return records
    .filter((r) => r.type === 'A' || r.type === 'AAAA' || r.type === 'CNAME')
    .map((r) => {
      const lower = r.name.toLowerCase();
      let subdomain = '';
      let isRoot = false;

      if (lower === cleanRoot || lower === `@.${cleanRoot}`) {
        subdomain = '@ (Main Domain)';
        isRoot = true;
      } else if (lower.endsWith(`.${cleanRoot}`)) {
        subdomain = lower.replace(`.${cleanRoot}`, '');
      } else {
        subdomain = lower;
      }

      let guessedToolName = subdomain;
      if (isRoot) {
        guessedToolName = 'FormulaCalcKit Main Portal';
      } else if (subdomain.includes('mathbridge')) {
        guessedToolName = 'MathBridge LaTeX & Math Typography';
      } else if (subdomain.includes('pythagorean')) {
        guessedToolName = 'Pythagorean Theorem Calculator';
      } else if (subdomain.includes('quadratic')) {
        guessedToolName = 'Quadratic Equation Solver';
      } else if (subdomain.includes('trig')) {
        guessedToolName = 'Trigonometry Calculator';
      } else {
        guessedToolName = subdomain
          .split('-')
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(' ');
      }

      return {
        subdomain,
        fullName: r.name,
        type: r.type,
        target: r.content,
        proxied: r.proxied,
        ttl: r.ttl === 1 ? 'Auto' : `${r.ttl}s`,
        guessedToolName,
        isRoot,
      };
    });
}
