import { useEffect, useMemo, useRef, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from "recharts"
import {
  ArrowRight, TrendUp, Money, Target, Globe, ChartLine, Sparkle, ShieldCheck,
} from "@phosphor-icons/react"
import { HERO_STATS, TICKER, ROI_CURVE, T, type Stat } from "@/data/agencyData"

const ICONS: Record<string, any> = {
  money: Money, trend: TrendUp, target: Target, globe: Globe, chart: ChartLine,
}

function useCountUp(target: number, run: boolean, decimals = 0, duration = 1600) {
  const [val, setVal] = useState(0)
  const reduce = useReducedMotion()
  useEffect(() => {
    if (!run) return
    if (reduce) { setVal(target); return }
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setVal(target * eased)
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, run, duration, reduce])
  return val.toFixed(decimals)
}

function StatCard({ stat, run, index }: { stat: Stat; run: boolean; index: number }) {
  const Icon = ICONS[stat.icon] ?? TrendUp
  const shown = useCountUp(stat.value, run, stat.decimals ?? 0)
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index, duration: 0.5 }}
      className={`${T.card} ${T.border} ${T.cardHover} rounded-2xl p-5 transition-colors`}
    >
      <div className="flex items-center justify-between">
        <span className={`grid h-10 w-10 place-items-center rounded-xl bg-emerald-500/10 ${T.accent}`}>
          <Icon className="h-5 w-5" />
        </span>
      </div>
      <div className={`mt-4 text-3xl font-bold tracking-tight ${T.text}`}>
        {stat.prefix}{shown}{stat.suffix}
      </div>
      <div className={`mt-1 text-sm font-semibold ${T.text}`}>{stat.label}</div>
      <div className={`mt-1 text-xs ${T.muted}`}>{stat.note}</div>
    </motion.div>
  )
}

function Simulator() {
  const [spend, setSpend] = useState(50)
  const point = useMemo(() => {
    const i = ROI_CURVE.findIndex((p) => p.spend >= spend)
    if (i <= 0) return ROI_CURVE[0]
    const a = ROI_CURVE[i - 1], b = ROI_CURVE[i]
    const t = (spend - a.spend) / (b.spend - a.spend)
    return { spend, revenue: Math.round(a.revenue + (b.revenue - a.revenue) * t) }
  }, [spend])
  const roi = (point.revenue / point.spend).toFixed(1)

  return (
    <div className={`${T.card} ${T.border} relative overflow-hidden rounded-3xl p-6 shadow-2xl shadow-emerald-500/5`}>
      <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-emerald-500/20 blur-3xl" />
      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Sparkle weight="fill" className={`h-4 w-4 ${T.accent}`} />
          <span className={T.text}>Live ROI &amp; Growth Simulator</span>
        </div>
        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${T.chip}`}>4.8x avg</span>
      </div>

      <div className="relative mt-5 flex items-end justify-between">
        <div>
          <div className={`text-xs ${T.muted}`}>Monthly ad spend</div>
          <div className={`text-2xl font-bold ${T.text}`}>${spend}k</div>
        </div>
        <div className="text-right">
          <div className={`text-xs ${T.muted}`}>Projected revenue</div>
          <div className="text-2xl font-bold text-emerald-500 dark:text-emerald-400">${point.revenue}k</div>
        </div>
      </div>

      <div className="relative mt-4 h-32">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={ROI_CURVE} margin={{ top: 4, right: 4, left: 4, bottom: 4 }}>
            <defs>
              <linearGradient id="roiFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10B981" stopOpacity={0.5} />
                <stop offset="100%" stopColor="#10B981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="spend" hide />
            <YAxis hide domain={[0, 800]} />
            <Tooltip
              contentStyle={{ background: "#0A0D14", border: "1px solid #1E293B", borderRadius: 12, fontSize: 12, color: "#fff" }}
              formatter={(v: any) => [`$${v}k`, "Revenue"]}
              labelFormatter={(l) => `Spend $${l}k`}
            />
            <Area type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={2} fill="url(#roiFill)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <input
        type="range" min={5} max={200} step={5} value={spend}
        onChange={(e) => setSpend(Number(e.target.value))}
        className="mt-4 w-full accent-emerald-500"
        aria-label="Ad spend"
      />
      <div className={`mt-2 flex justify-between text-xs ${T.muted}`}>
        <span>$5k</span>
        <span className="font-semibold text-emerald-500 dark:text-emerald-400">Projected ROI {roi}x</span>
        <span>$200k</span>
      </div>
    </div>
  )
}

export default function HeroSection({ onAudit }: { onAudit: () => void }) {
  const [run, setRun] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setRun(true) }, { threshold: 0.2 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const headline = "Performance marketing that compounds."

  return (
    <section id="top" ref={ref} className={`relative overflow-hidden pt-28 pb-16 md:pt-36 ${T.page}`}>
      {/* backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <img
          src="https://dala-prod-public-storage.s3.eu-west-1.amazonaws.com/generated-images/5ceacb7c-0f63-4b5b-a8d9-7765814da4f1/hero-backdrop-e1a97b33-1792369885586.webp"
          alt=""
          className="h-full w-full object-cover opacity-[0.12] dark:opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#F5F7FB] dark:to-[#0A0D14]" />
        <div className="absolute left-1/4 top-10 h-72 w-72 rounded-full bg-emerald-500/20 blur-[120px]" />
        <div className="absolute right-1/4 top-32 h-72 w-72 rounded-full bg-cyan-500/20 blur-[120px]" />
      </div>

      <div className={T.wrap}>
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`inline-flex items-center gap-2 rounded-full ${T.border} ${T.surface} px-4 py-1.5 text-xs font-semibold ${T.soft}`}
            >
              <ShieldCheck weight="fill" className={`h-4 w-4 ${T.accent}`} />
              Trusted by 68 enterprise &amp; high-growth brands
            </motion.div>

            <h1 className={`mt-5 text-4xl font-bold leading-[1.04] tracking-tighter sm:text-5xl md:text-6xl ${T.text}`}>
              {headline.split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.5 }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className={`mt-5 max-w-[52ch] text-base leading-relaxed ${T.muted}`}
            >
              SEO, paid media, content and social engineered into one compounding growth system with full revenue attribution.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.5 }}
              className="mt-7 flex flex-wrap items-center gap-3"
            >
              <button onClick={onAudit} className={T.btnPrimary}>
                Get Your Free Audit <ArrowRight className="h-4 w-4" />
              </button>
              <a href="#results" className={T.btnGhost}>See the numbers</a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Simulator />
          </motion.div>
        </div>

        {/* Stat cards */}
        <div className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {HERO_STATS.map((s, i) => (
            <StatCard key={s.label} stat={s} run={run} index={i} />
          ))}
        </div>
      </div>

      {/* Live ticker */}
      <div className={`mt-14 border-y ${T.border} ${T.surface} py-3`}>
        <div className="flex overflow-hidden">
          <div className="flex shrink-0 animate-[marquee_28s_linear_infinite] items-center gap-10 pr-10">
            {[...TICKER, ...TICKER].map((t, i) => (
              <span key={i} className={`flex items-center gap-2 whitespace-nowrap text-sm font-semibold ${T.soft}`}>
                <span className={`h-1.5 w-1.5 rounded-full ${T.accent}`} style={{ background: "currentColor" }} />
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
