// ============================================================================
// VORTEX Growth Partners — data contracts + mock dataset + theme tokens
// ============================================================================

// ---- Theme tokens (centralized to keep components compact & consistent) ----
export const T = {
  page: "bg-[#F5F7FB] dark:bg-[#0A0D14]",
  surface: "bg-white/90 dark:bg-[#0E1422]/80",
  card: "bg-white dark:bg-[#101726]",
  cardHover: "hover:border-emerald-400/40 dark:hover:border-emerald-400/30",
  border: "border border-slate-200/80 dark:border-white/10",
  text: "text-slate-900 dark:text-white",
  muted: "text-slate-500 dark:text-slate-400",
  soft: "text-slate-600 dark:text-slate-300",
  accent: "text-emerald-600 dark:text-emerald-400",
  accentCyan: "text-cyan-600 dark:text-cyan-400",
  chip: "bg-slate-100 text-slate-700 dark:bg-white/5 dark:text-slate-300",
  input:
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-white/10 dark:bg-[#0A0D14] dark:text-white dark:placeholder:text-slate-500",
  btnPrimary:
    "inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-[#04110C] transition hover:bg-emerald-400 active:scale-[0.98] shadow-lg shadow-emerald-500/20",
  btnGhost:
    "inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-transparent px-5 py-3 text-sm font-semibold text-slate-800 transition hover:border-emerald-500 hover:text-emerald-600 active:scale-[0.98] dark:border-white/15 dark:text-white dark:hover:border-emerald-400 dark:hover:text-emerald-300",
  section: "py-20 md:py-28",
  wrap: "mx-auto w-full max-w-7xl px-5 sm:px-8",
}

export type IconKey =
  | "trend" | "money" | "target" | "users" | "gauge" | "rocket"
  | "chart" | "megaphone" | "pen" | "share" | "shield" | "zap" | "globe" | "search"

export interface Stat {
  label: string
  value: number
  prefix?: string
  suffix?: string
  decimals?: number
  icon: IconKey
  note: string
}

export interface ServicePackage {
  id: string
  name: string
  category: "SEO" | "Paid Media" | "Content" | "Social"
  tagline: string
  monthly: number
  quarterly: number
  icon: IconKey
  featured?: boolean
  deliverables: string[]
  kpi: string
}

export interface ChartPoint { month: string; before: number; after: number }
export interface CaseStudy {
  id: string
  client: string
  industry: string
  title: string
  image: string
  summary: string
  metrics: { label: string; before: string; after: string; lift: string }[]
  chart: { key: string; label: string; unit: string; data: ChartPoint[] }[]
  tags: string[]
  breakdown: string[]
  accent: string
}

export interface Testimonial {
  quote: string
  name: string
  role: string
  company: string
  industry: string
  metric: string
  metricLabel: string
}

export interface TeamMember {
  name: string
  role: string
  image: string
  expertise: string[]
  bio: string
  credits: string[]
  linkedin: string
}

export interface BlogPost {
  title: string
  category: string
  excerpt: string
  readTime: string
  date: string
}

export interface LeadMagnet {
  id: string
  title: string
  format: string
  pages: number
  description: string
  value: string
}

// ---- Headline performance stats ----
export const HERO_STATS: Stat[] = [
  { label: "Revenue Generated", value: 142, prefix: "$", suffix: "M+", icon: "money", note: "Attributed client growth, trailing 24mo" },
  { label: "Average ROI", value: 4.8, suffix: "x", decimals: 1, icon: "trend", note: "Blended return across all channels" },
  { label: "Conversion Lift", value: 310, prefix: "+", suffix: "%", icon: "target", note: "Median post-engagement uplift" },
  { label: "Active Brands", value: 68, icon: "globe", note: "Enterprise & high-growth partners" },
]

export const TICKER = [
  "4.8x avg ROI", "$142M+ revenue driven", "310% conversion lift", "92% client retention",
  "-38% blended CAC", "5.2x ROAS on paid", "1.4B impressions / mo", "68 active brands",
]

// ---- Service packages ----
export const PACKAGES: ServicePackage[] = [
  {
    id: "seo", name: "SEO Dominance", category: "SEO", icon: "search",
    tagline: "Own the category on organic search with technical + authority moats.",
    monthly: 6500, quarterly: 17550, kpi: "Avg. +212% organic sessions in 6mo",
    deliverables: [
      "Full technical + on-page audit", "Entity & topical authority map",
      "Programmatic content engine", "Digital PR & link acquisition",
      "Core Web Vitals engineering", "Monthly revenue attribution reports",
    ],
  },
  {
    id: "paid", name: "Paid Media Scaling", category: "Paid Media", icon: "megaphone", featured: true,
    tagline: "Profitable, full-funnel paid acquisition across search & social.",
    monthly: 8900, quarterly: 24030, kpi: "Avg. 5.2x ROAS at scale",
    deliverables: [
      "Google, Meta & TikTok media buying", "Creative testing framework (12+ / mo)",
      "Bid & budget automation", "Incrementality & MMM modeling",
      "Landing page CRO sprints", "Live performance dashboard",
    ],
  },
  {
    id: "content", name: "Full-Funnel Content", category: "Content", icon: "pen",
    tagline: "Editorial systems that convert readers into pipeline.",
    monthly: 5400, quarterly: 14580, kpi: "Avg. 3.1x content-assisted pipeline",
    deliverables: [
      "Content strategy & calendar", "Long-form + thought leadership",
      "Video & motion production", "SEO-optimized distribution",
      "Lead-magnet & nurture assets", "Performance content QA",
    ],
  },
  {
    id: "social", name: "Performance Social", category: "Social", icon: "share",
    tagline: "Always-on social that builds brand and drives demand.",
    monthly: 4800, quarterly: 12960, kpi: "Avg. +148% engaged followers",
    deliverables: [
      "Channel strategy & positioning", "Community management",
      "UGC & influencer programs", "Social commerce enablement",
      "Paid social amplification", "Sentiment & share-of-voice reports",
    ],
  },
]

export const PACKAGE_CATEGORIES = ["All", "SEO", "Paid Media", "Content", "Social"] as const

// ---- Case studies ----
const growth = (base: number, mult: number): ChartPoint[] =>
  ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"].map((m, i) => ({
    month: m,
    before: Math.round(base * (1 + i * 0.04)),
    after: Math.round(base * (1 + i * 0.04) * (1 + (mult - 1) * (i / 7))),
  }))

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "northwind", client: "Northwind Retail", industry: "E-commerce", accent: "emerald",
    title: "Scaling a DTC brand from $2M to $14M ARR",
    image: "https://dala-prod-public-storage.s3.eu-west-1.amazonaws.com/generated-images/5ceacb7c-0f63-4b5b-a8d9-7765814da4f1/case-ecommerce-8f38917c-1792369886245.webp",
    summary: "Full-funnel rebuild across paid social, email and SEO that 7x'd revenue while holding CAC flat.",
    metrics: [
      { label: "Revenue", before: "$2.1M", after: "$14.3M", lift: "+581%" },
      { label: "CAC", before: "$86", after: "$41", lift: "-52%" },
      { label: "ROAS", before: "1.9x", after: "5.4x", lift: "+184%" },
    ],
    chart: [
      { key: "rev", label: "Monthly Revenue", unit: "$k", data: growth(180, 7.1) },
      { key: "roas", label: "Blended ROAS", unit: "x", data: growth(1.9, 2.8) },
    ],
    tags: ["Paid Social", "Email", "CRO"],
    breakdown: [
      "Rebuilt the creative testing engine to 14 concepts / week.",
      "Migrated to server-side tracking for 23% cleaner signal.",
      "Deployed post-purchase flows lifting LTV by 31%.",
    ],
  },
  {
    id: "ledgerly", client: "Ledgerly", industry: "Fintech", accent: "cyan",
    title: "Cutting CAC 38% for a B2B payments platform",
    image: "https://dala-prod-public-storage.s3.eu-west-1.amazonaws.com/generated-images/5ceacb7c-0f63-4b5b-a8d9-7765814da4f1/case-fintech-170c4d38-1792369885277.webp",
    summary: "Search + content engine that replaced expensive outbound with qualified inbound pipeline.",
    metrics: [
      { label: "CAC", before: "$1,240", after: "$768", lift: "-38%" },
      { label: "SQLs / mo", before: "42", after: "131", lift: "+212%" },
      { label: "Win rate", before: "9%", after: "17%", lift: "+89%" },
    ],
    chart: [
      { key: "sql", label: "Qualified SQLs", unit: "", data: growth(42, 3.1) },
      { key: "cac", label: "Cost per SQL", unit: "$", data: growth(1240, 0.62) },
    ],
    tags: ["SEO", "Paid Search", "Content"],
    breakdown: [
      "Built 60-page comparison & integration content hub.",
      "Restructured Google Ads into intent-based tiers.",
      "Launched ABM nurture cutting sales cycle by 11 days.",
    ],
  },
  {
    id: "stackline", client: "Stackline", industry: "SaaS", accent: "emerald",
    title: "3.4x pipeline for a dev-tools SaaS",
    image: "https://dala-prod-public-storage.s3.eu-west-1.amazonaws.com/generated-images/5ceacb7c-0f63-4b5b-a8d9-7765814da4f1/case-saas-4fcb4496-1792369885934.webp",
    summary: "Product-led content + lifecycle paid media that turned trials into expansion revenue.",
    metrics: [
      { label: "Pipeline", before: "$1.8M", after: "$6.1M", lift: "+239%" },
      { label: "Trial CVR", before: "4.1%", after: "8.7%", lift: "+112%" },
      { label: "NRR", before: "104%", after: "128%", lift: "+24pts" },
    ],
    chart: [
      { key: "pipe", label: "Pipeline ($k)", unit: "$k", data: growth(180, 3.4) },
      { key: "trial", label: "Trial signups", unit: "", data: growth(620, 2.9) },
    ],
    tags: ["Content", "Paid Media", "Lifecycle"],
    breakdown: [
      "Docs-to-demand SEO strategy captured long-tail intent.",
      "Retargeting sequences recovered 19% of abandoned trials.",
      "Expansion playbooks drove net revenue retention.",
    ],
  },
  {
    id: "verdant", client: "Verdant Health", industry: "Wellness", accent: "cyan",
    title: "Category-leading organic growth for a wellness brand",
    image: "https://dala-prod-public-storage.s3.eu-west-1.amazonaws.com/generated-images/5ceacb7c-0f63-4b5b-a8d9-7765814da4f1/case-ecommerce-8f38917c-1792369886245.webp",
    summary: "Topical authority + digital PR took them from page 4 to #1 for 180 head terms.",
    metrics: [
      { label: "Organic", before: "38k", after: "412k", lift: "+984%" },
      { label: "Keywords top 3", before: "12", after: "180", lift: "+1400%" },
      { label: "Org. revenue", before: "$210k", after: "$1.9M", lift: "+805%" },
    ],
    chart: [
      { key: "org", label: "Organic sessions (k)", unit: "k", data: growth(38, 10.8) },
      { key: "rev", label: "Organic revenue ($k)", unit: "$k", data: growth(210, 9.0) },
    ],
    tags: ["SEO", "Digital PR"],
    breakdown: [
      "Entity-based content architecture with internal linking.",
      "42 expert-briefed digital PR placements.",
      "Technical cleanup lifted crawl efficiency 3.2x.",
    ],
  },
  {
    id: "apex", client: "Apex Motors", industry: "Automotive", accent: "emerald",
    title: "Lead-gen overhaul for a national dealer network",
    image: "https://dala-prod-public-storage.s3.eu-west-1.amazonaws.com/generated-images/5ceacb7c-0f63-4b5b-a8d9-7765814da4f1/case-fintech-170c4d38-1792369885277.webp",
    summary: "Local SEO + performance social that filled the forecourt with qualified test-drive bookings.",
    metrics: [
      { label: "Test drives", before: "640", after: "2,180", lift: "+241%" },
      { label: "Cost / lead", before: "$58", after: "$27", lift: "-53%" },
      { label: "Attributed sales", before: "112", after: "389", lift: "+247%" },
    ],
    chart: [
      { key: "leads", label: "Qualified leads", unit: "", data: growth(640, 3.4) },
      { key: "sales", label: "Attributed sales", unit: "", data: growth(112, 3.5) },
    ],
    tags: ["Local SEO", "Paid Social", "CRO"],
    breakdown: [
      "Geo-grid paid social across 38 metro markets.",
      "Inventory feed automation cut cost per lead 53%.",
      "Speed-to-lead routing lifted close rates.",
    ],
  },
  {
    id: "lumen", client: "Lumen Studios", industry: "Entertainment", accent: "cyan",
    title: "Audience growth engine for a streaming studio",
    image: "https://dala-prod-public-storage.s3.eu-west-1.amazonaws.com/generated-images/5ceacb7c-0f63-4b5b-a8d9-7765814da4f1/case-saas-4fcb4496-1792369885934.webp",
    summary: "Always-on social + creator program that compounded subscribers and watch-time.",
    metrics: [
      { label: "Subscribers", before: "84k", after: "311k", lift: "+270%" },
      { label: "Churn", before: "6.8%", after: "3.9%", lift: "-43%" },
      { label: "Watch time", before: "1.2M", after: "4.6M", lift: "+283%" },
    ],
    chart: [
      { key: "subs", label: "Active subscribers (k)", unit: "k", data: growth(84, 3.7) },
      { key: "watch", label: "Watch time (M min)", unit: "M", data: growth(1.2, 3.8) },
    ],
    tags: ["Social", "Creators", "Lifecycle"],
    breakdown: [
      "Short-form engine producing 90 assets / month.",
      "Creator revenue-share program scaled reach.",
      "Win-back flows cut churn by 43%.",
    ],
  },
]

export const INDUSTRIES = ["All", "E-commerce", "Fintech", "SaaS", "Wellness", "Automotive", "Entertainment"]

// ---- Testimonials ----
export const TESTIMONIALS: Testimonial[] = [
  { quote: "Vortex rebuilt our entire acquisition model. We went from burning cash on ads to a profitable 5x ROAS in one quarter.", name: "Dana Whitfield", role: "VP Growth", company: "Northwind Retail", industry: "E-commerce", metric: "5.4x", metricLabel: "Blended ROAS" },
  { quote: "The most rigorous attribution team we've worked with. Every dollar is traceable and every experiment ships fast.", name: "Marcus Lee", role: "CMO", company: "Ledgerly", industry: "Fintech", metric: "-38%", metricLabel: "CAC reduction" },
  { quote: "They treat our pipeline like their own P&L. Content that used to be a cost center is now our #1 revenue source.", name: "Priya Nair", role: "Head of Demand", company: "Stackline", industry: "SaaS", metric: "3.4x", metricLabel: "Pipeline growth" },
  { quote: "From page four to owning the category. Organic is now the cheapest, highest-intent channel in our mix.", name: "Elena Fischer", role: "Founder", company: "Verdant Health", industry: "Wellness", metric: "+984%", metricLabel: "Organic traffic" },
]

export const CLIENT_LOGOS = ["Northwind", "Ledgerly", "Stackline", "Verdant", "Apex", "Lumen", "Helio", "Cobalt", "Meridian", "Quanta"]

// ---- Team ----
export const TEAM: TeamMember[] = [
  { name: "Sofia Reyes", role: "Founder & CEO", image: "https://dala-prod-public-storage.s3.eu-west-1.amazonaws.com/generated-images/5ceacb7c-0f63-4b5b-a8d9-7765814da4f1/team-1-37f25dec-1792369885855.webp", expertise: ["Growth Strategy", "Org Design"], bio: "Ex-head of growth at two unicorn marketplaces. Built Vortex on a simple principle: media is a science, not a vibe.", credits: ["Northwind Retail", "Apex Motors"], linkedin: "#" },
  { name: "Julian Okafor", role: "Head of Paid Media", image: "https://dala-prod-public-storage.s3.eu-west-1.amazonaws.com/generated-images/5ceacb7c-0f63-4b5b-a8d9-7765814da4f1/team-2-d356ba19-1792369890580.webp", expertise: ["PPC", "Incrementality", "MMM"], bio: "Managed $180M+ in annual ad spend across search and social. Obsessed with profitable scale over vanity reach.", credits: ["Ledgerly", "Lumen Studios"], linkedin: "#" },
  { name: "Amara Chen", role: "Content Director", image: "https://dala-prod-public-storage.s3.eu-west-1.amazonaws.com/generated-images/5ceacb7c-0f63-4b5b-a8d9-7765814da4f1/team-3-ea570feb-1792369890652.webp", expertise: ["Editorial", "SEO", "Brand"], bio: "Former magazine editor turned performance storyteller. Builds content systems that rank and convert.", credits: ["Verdant Health", "Stackline"], linkedin: "#" },
  { name: "Theo Brandt", role: "Performance Lead", image: "https://dala-prod-public-storage.s3.eu-west-1.amazonaws.com/generated-images/5ceacb7c-0f63-4b5b-a8d9-7765814da4f1/team-4-a362f65c-1792369890436.webp", expertise: ["Analytics", "CRO", "Automation"], bio: "Data engineer by training, marketer by obsession. Owns the attribution stack behind every engagement.", credits: ["Northwind Retail", "Ledgerly"], linkedin: "#" },
]

// ---- Blog / insights ----
export const BLOG_POSTS: BlogPost[] = [
  { title: "The 2025 Playbook for Profitable Paid Social", category: "Paid Media", excerpt: "How to model incrementality and stop over-indexing on last-click ROAS.", readTime: "8 min", date: "Mar 2025" },
  { title: "Entity SEO: Winning Search After the Link Economy Broke", category: "SEO", excerpt: "Topical authority is the new backlink. Here's how we architect it.", readTime: "11 min", date: "Feb 2025" },
  { title: "Content Systems That Produce Pipeline, Not Just Pageviews", category: "Content", excerpt: "A framework for turning editorial into a measurable revenue channel.", readTime: "7 min", date: "Feb 2025" },
  { title: "Server-Side Tracking Without Losing Your Mind", category: "Analytics", excerpt: "Recover 20%+ of lost signal with a clean tagging migration.", readTime: "9 min", date: "Jan 2025" },
]

// ---- Lead magnets ----
export const LEAD_MAGNETS: LeadMagnet[] = [
  { id: "audit", title: "The 47-Point Growth Audit Checklist", format: "PDF", pages: 12, description: "The exact audit our strategists run before touching a single ad account.", value: "Free" },
  { id: "model", title: "CAC Payback & LTV Model (Sheets)", format: "Spreadsheet", pages: 1, description: "Plug-and-play financial model to forecast profitable spend ceilings.", value: "Free" },
  { id: "brief", title: "Creative Testing Brief Pack", format: "PDF", pages: 18, description: "120 proven hooks and a weekly testing cadence for paid social.", value: "Free" },
]

// ---- ROI simulator curve (spend $k -> revenue $k) ----
export const ROI_CURVE = [
  { spend: 5, revenue: 22 }, { spend: 10, revenue: 47 }, { spend: 20, revenue: 96 },
  { spend: 30, revenue: 148 }, { spend: 50, revenue: 244 }, { spend: 75, revenue: 352 },
  { spend: 100, revenue: 448 }, { spend: 150, revenue: 612 }, { spend: 200, revenue: 742 },
]