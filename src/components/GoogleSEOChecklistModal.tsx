import React, { useState } from 'react';
import { Language } from '../i18n/translations';
import {
  X,
  Search,
  CheckCircle2,
  ExternalLink,
  Copy,
  Check,
  DollarSign,
  FileCode2,
  Sparkles,
  Layers,
  HelpCircle,
  Globe,
  Share2,
} from 'lucide-react';

interface GoogleSEOChecklistModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const GoogleSEOChecklistModal: React.FC<GoogleSEOChecklistModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const isEn = lang === 'en';

  // Current domain fallback
  const currentOrigin =
    typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : 'https://densitycalculator.org';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 p-5 sm:p-6 text-white flex items-start justify-between">
          <div className="space-y-1 pr-6">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-white text-xs font-semibold backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>{isEn ? 'Google Traffic & Monetization Ready' : 'Google 收录与流量变现必备清单'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              {isEn ? 'Google SEO & Indexing Playbook' : 'Google 全站收录与流量变现指引'}
            </h2>
            <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
              {isEn
                ? 'Everything configured in this codebase to get fast Google crawling, rich snippets, and prepare for AdSense monetization.'
                : '本项目已全面完成 Google 搜索规范、结构化数据、多语种 hreflang 与收录配置。以下为站长快速上线与赚取流量指引。'}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 space-y-6 max-h-[75vh] overflow-y-auto text-slate-700 text-sm">
          {/* Section 1: Pre-configured SEO Checklist */}
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>{isEn ? '1. Built-in Google Indexing Assets' : '1. 本站已内置完成的 Google 收录基础项'}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* robots.txt */}
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2 font-semibold text-slate-800 text-xs">
                    <FileCode2 className="w-4 h-4 text-blue-600" />
                    <span>robots.txt</span>
                  </div>
                  <button
                    onClick={() => handleCopy(`${currentOrigin}/robots.txt`, 'robots')}
                    className="inline-flex items-center gap-1 text-2xs font-mono text-blue-600 hover:text-blue-800"
                  >
                    {copiedKey === 'robots' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedKey === 'robots' ? (isEn ? 'Copied' : '已复制') : (isEn ? 'Copy URL' : '复制链接')}</span>
                  </button>
                </div>
                <p className="text-xs text-slate-500">
                  {isEn
                    ? 'Explicitly permits Googlebot & Googlebot-Image, declares sitemap location.'
                    : '已开启对 Googlebot 与 Googlebot-Image 爬虫的全站抓取许可，指明 Sitemap 路径。'}
                </p>
              </div>

              {/* sitemap.xml */}
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2 font-semibold text-slate-800 text-xs">
                    <Layers className="w-4 h-4 text-indigo-600" />
                    <span>sitemap.xml</span>
                  </div>
                  <button
                    onClick={() => handleCopy(`${currentOrigin}/sitemap.xml`, 'sitemap')}
                    className="inline-flex items-center gap-1 text-2xs font-mono text-blue-600 hover:text-blue-800"
                  >
                    {copiedKey === 'sitemap' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedKey === 'sitemap' ? (isEn ? 'Copied' : '已复制') : (isEn ? 'Copy URL' : '复制链接')}</span>
                  </button>
                </div>
                <p className="text-xs text-slate-500">
                  {isEn
                    ? 'Includes all anchors, priorities, change frequencies, and bilingual hreflang links.'
                    : '包含核心计算器、物质表、浮力仿真与双语 hreflang 网页地图，便于 Google 全量索引。'}
                </p>
              </div>

              {/* Schema.org Structured Data */}
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-2 font-semibold text-slate-800 text-xs mb-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Schema.org JSON-LD</span>
                </div>
                <p className="text-xs text-slate-500">
                  {isEn
                    ? 'Configured with WebApplication, HowTo, FAQPage & BreadcrumbList for rich search result snippets.'
                    : '集成 WebApplication 评级、HowTo 操作步骤、FAQ 问答与面包屑导航，获取 Google 星级与富媒体卡片展示。'}
                </p>
              </div>

              {/* Bilingual Hreflang & OpenGraph */}
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-2 font-semibold text-slate-800 text-xs mb-1.5">
                  <Globe className="w-4 h-4 text-emerald-600" />
                  <span>Hreflang &amp; OpenGraph</span>
                </div>
                <p className="text-xs text-slate-500">
                  {isEn
                    ? 'Default English + Chinese tags, dynamic meta descriptions, and 1200x630 social share banner.'
                    : '规范中英双语标签、动态 Meta Description、1200x630 社交分享预览图，提升搜索点击率。'}
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: 3-Step Google Search Console Launch Guide */}
          <div className="border-t border-slate-200 pt-5">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-3">
              <Search className="w-5 h-5 text-blue-600" />
              <span>{isEn ? '2. Three Steps to Get Google Search Indexing' : '2. 快速上线：让 Google 抓取收录三步法'}</span>
            </h3>

            <div className="space-y-3">
              {/* Step 1 */}
              <div className="flex gap-3 p-3.5 rounded-xl border border-blue-100 bg-blue-50/50">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <div className="space-y-1">
                  <h4 className="font-semibold text-slate-900 text-xs sm:text-sm">
                    {isEn ? 'Submit to Google Search Console (GSC)' : '在 Google Search Console 添加你的域名或网址'}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {isEn
                      ? 'Open Google Search Console, add your domain/URL prefix. Verify via DNS TXT or paste the verification meta tag in index.html.'
                      : '访问 Google Search Console (GSC)，输入您的正式域名或部署网址。通过 DNS TXT 解析或在 index.html 中填入 Google 验证码即可验证所有权。'}
                  </p>
                  <a
                    href="https://search.google.com/search-console"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 pt-0.5"
                  >
                    <span>{isEn ? 'Open Google Search Console' : '前往 Google Search Console 平台'}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-3 p-3.5 rounded-xl border border-indigo-100 bg-indigo-50/50">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <div className="space-y-1">
                  <h4 className="font-semibold text-slate-900 text-xs sm:text-sm">
                    {isEn ? 'Submit the Sitemap' : '在 GSC 左侧提交 Sitemap 网站地图'}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {isEn
                      ? 'Go to "Sitemaps" in GSC sidebar, type "sitemap.xml" and hit Submit. Googlebot will queue all sub-pages for crawling.'
                      : '在 GSC 左侧菜单点击「站点地图 (Sitemaps)」，输入 sitemap.xml 并点击提交，Google 会自动将计算器所有模块排队抓取。'}
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-3 p-3.5 rounded-xl border border-emerald-100 bg-emerald-50/50">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center">
                  3
                </span>
                <div className="space-y-1">
                  <h4 className="font-semibold text-slate-900 text-xs sm:text-sm">
                    {isEn ? 'Request Fast-Track Indexing (URL Inspection)' : '使用「网址检查」点击「请求编入索引」（24~48小时速收录）'}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {isEn
                      ? 'In the top search bar of GSC, paste your home URL, let it inspect live URL, and click "Request Indexing". This significantly speeds up initial crawling from weeks to 1–2 days.'
                      : '在 GSC 顶部搜索框粘贴主页网址，点击「测试实际网址」，随后点击「请求编入索引」。这能将常规数周的自然收录周期压缩至 24~48 小时。'}
                  </p>
                  <a
                    href="https://search.google.com/test/rich-results"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-900 pt-0.5"
                  >
                    <span>{isEn ? 'Run Google Rich Results Test (Verify Schemas)' : '前往 Google 官方富媒体结构化数据检验工具'}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Traffic Monetization with Google AdSense */}
          <div className="border-t border-slate-200 pt-5">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-3">
              <DollarSign className="w-5 h-5 text-emerald-600" />
              <span>{isEn ? '3. Earning Revenue via Google AdSense (流量变现)' : '3. Google AdSense 广告流量变现策略'}</span>
            </h3>

            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-4 space-y-2.5 text-xs text-emerald-900">
              <p className="font-medium leading-relaxed">
                {isEn
                  ? 'Educational & Science utility websites boast high intent and long engagement durations, generating solid RPMs ($3 - $18 per 1,000 pageviews in US/CA/UK/EU).'
                  : '工具类物理/工程计算器具备极高的用户搜索意图与长停留时间特点。欧美与海外中学生、大学生及工程师搜索流量通常具备较高的广告千次展示收益 (RPM 可达 $3 ~ $18 美元)。'}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 font-mono text-2xs">
                <div className="bg-white/80 p-2.5 rounded-lg border border-emerald-200">
                  <div className="text-slate-500 font-sans">{isEn ? 'Stage 1' : '第一阶段'}</div>
                  <div className="font-bold text-slate-800 text-xs mt-0.5">{isEn ? 'Site Indexed' : 'Google 收录'}</div>
                  <div className="text-slate-600 mt-1">{isEn ? 'GSC indexing confirmed (1-2 weeks)' : 'GSC 确认页面收录，自然流量爬升'}</div>
                </div>
                <div className="bg-white/80 p-2.5 rounded-lg border border-emerald-200">
                  <div className="text-slate-500 font-sans">{isEn ? 'Stage 2' : '第二阶段'}</div>
                  <div className="font-bold text-slate-800 text-xs mt-0.5">{isEn ? 'Apply AdSense' : '申请 AdSense'}</div>
                  <div className="text-slate-600 mt-1">{isEn ? 'Apply at adsense.google.com with custom domain' : '绑定独立域名申请 Google AdSense 审核'}</div>
                </div>
                <div className="bg-white/80 p-2.5 rounded-lg border border-emerald-200">
                  <div className="text-slate-500 font-sans">{isEn ? 'Stage 3' : '第三阶段'}</div>
                  <div className="font-bold text-slate-800 text-xs mt-0.5">{isEn ? 'Earn Revenue' : '持续被动收益'}</div>
                  <div className="text-slate-600 mt-1">{isEn ? 'Place responsive banners around calculations' : '在计算结果下方挂载自适应横幅广告'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-5 sm:px-6 py-3.5 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            {isEn ? 'SEO Score: 100/100 Core Web Vitals Ready' : 'SEO 就绪状态：100% 满足 Google 检索标准'}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
          >
            {isEn ? 'Got It' : '已知晓并确认'}
          </button>
        </div>
      </div>
    </div>
  );
};
