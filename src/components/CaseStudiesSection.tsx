import { useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid,
} from "recharts"
import {
  TrendUp, ArrowUpRight, X, ChartLine, Target, Buildings, Percent,
} from "@phosphor-icons/react"
import { CASE_STUDIES, T, type CaseStudy } from "@/data/agencyData"

function MiniChart({ cs }: { cs: CaseStudy }) {
  const series = cs.chart[0]
  return (
    <div className="h-24 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={series.data} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id={`g-${cs.id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10B981" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#10B981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area type="monotone" dataKey="after" stroke="#10B981" strokeWidth={2} fill={`url(#g-${cs.id})`} />
          <Area type="monotone" dataKey="before" stroke="#64748b" strokeWidth={1.5} strokeDasharray="4 4" fill="transparent" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

function BigChart({ cs }: { cs: CaseStudy }) {
  return (
    <div className="h-56 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={cs.chart[0].data} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
          <defs>
            <linearGradient id={`b-${cs.id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10B981" stopOpacity={0.5} />
              <stop offset="100%" stopColor="#10B981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
          <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{ background: "#0A0D14", border: "1px solid #1E293B", borderRadius: 12, fontSize: 12 }}
            labelStyle={{ color: "#e2e8f0" }}
          />
          <Area type="monotone" name="After" dataKey="after" stroke="#10B981" strokeWidth={2.5} fill={`url(#b-${cs.id})`} />
          <Area type="monotone" name="Before" dataKey="before" stroke="#06B6D4" strokeWidth={2} fill="transparent" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

function MetricPill({ m }: { m: CaseStudy["metrics"][number] }) {
  const positive = m.lift.startsWith("+")
  return (
    <div className={`rounded-xl ${T.border} ${T.surface} p-3`}>
      <div className={`text-xs ${T.muted}`}>{m.label}</div>
      <div className="mt-1 flex items-center justify-between">
        <span className={`text-sm ${T.muted}`}>{m.before}</span>
        <ArrowUpRight className={`h-3.5 w-3.5 ${T.muted}`} />
        <span className={`text-sm font-bold ${T.text}`}>{m.after}</span>
      </div>
      <div className={`mt-1 text-xs font-bold ${positive ? "text-emerald-500" : "text-cyan-500"}`}>{m.lift}</div>
    </div>
  )
}

export default function CaseStudiesSection() {
  const industries = useMemo(
    () => ["All", ...Array.from(new Set(CASE_STUDIES.map((c) => c.industry)))],
    [],
  )
  const [active, setActive] = useState<string>("All")
  const [openCs, setOpenCs] = useState<CaseStudy | null>(null)

  const filtered = active === "All" ? CASE_STUDIES : CASE_STUDIES.filter((c) => c.industry === active)

  return (
    <section id="results" className={`${T.section} ${T.surface}`}>
      <div className={T.wrap}>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className={`inline-flex items-center gap-2 rounded-full ${T.border} ${T.card} px-4 py-1.5 text-xs font-semibold uppercase tracking-wide ${T.accent}`}>
              <ChartLine weight="fill" className="h-4 w-4" /> Metrics-driven case studies
            </span>
            <h2 className={`mt-4 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl ${T.text}`}>
              Proof, not promises.
            </h2>
            <p className={`mt-4 text-base ${T.muted}`}>
              Every engagement is measured against revenue. Explore the growth curves behind our partners' results.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {industries.map((ind) => (
              <button
                key={ind}
                onClick={() => setActive(ind)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  active === ind
                    ? "bg-emerald-500 text-[#04110C] shadow-lg shadow-emerald-500/20"
                    : `${T.border} ${T.card} ${T.soft} hover:border-emerald-400/40`
                }`}
              >
                {ind}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((cs, i) => (
              <motion.article
                layout
                key={cs.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ delay: i * 0.05, duration: 0.45 }}
                className={`group flex flex-col overflow-hidden rounded-3xl ${T.card} ${T.border} ${T.cardHover} transition-all hover:-translate-y-1`}
              >
                <div className="relative h-40 overflow-hidden">
                  <img src={cs.image} alt={cs.client} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <span className="absolute bottom-3 left-4 inline-flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                    <Buildings className="h-3.5 w-3.5" /> {cs.industry}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className={`text-xs font-semibold ${T.accent}`}>{cs.client}</div>
                  <h3 className={`mt-1 text-lg font-bold leading-snug ${T.text}`}>{cs.title}</h3>
                  <p className={`mt-2 text-sm ${T.muted}`}>{cs.summary}</p>
                  <div className="mt-4"><MiniChart cs={cs} /></div>
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {cs.metrics.map((m) => (
                      <div key={m.label} className="text-center">
                        <div className={`text-sm font-bold ${T.text}`}>{m.lift}</div>
                        <div className={`text-[10px] uppercase tracking-wide ${T.muted}`}>{m.label}</div>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setOpenCs(cs)}
                    className={`mt-5 inline-flex items-center justify-center gap-2 ${T.btnGhost} w-full`}
                  >
                    View full breakdown <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Drill-down modal */}
      <AnimatePresence>
        {openCs && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setOpenCs(null)} />
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ type: "spring", damping: 26, stiffness: 320 }}
              className="relative z-10 max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-white/10 bg-[#0E1422] p-6 text-white shadow-2xl sm:p-8"
            >
              <button onClick={() => setOpenCs(null)} className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-xl border border-white/10 text-slate-300 hover:border-emerald-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
              <div className="flex items-center gap-2 text-sm font-semibold text-emerald-400">
                <Target className="h-4 w-4" /> {openCs.industry} · {openCs.client}
              </div>
              <h3 className="mt-2 text-2xl font-bold tracking-tight">{openCs.title}</h3>
              <p className="mt-2 text-sm text-slate-400">{openCs.summary}</p>

              <div className="mt-6 grid grid-cols-3 gap-3">
                {openCs.metrics.map((m) => <MetricPill key={m.label} m={m} />)}
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-[#0A0D14] p-4">
                <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
                  <Percent className="h-4 w-4 text-emerald-400" /> {openCs.chart[0].label} — before vs after
                </div>
                <BigChart cs={openCs} />
                <div className="mt-2 flex gap-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-emerald-500" /> After Vortex</span>
                  <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-cyan-500" /> Before</span>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <TrendUp className="h-4 w-4 text-emerald-400" /> Campaign breakdown
                </div>
                <ul className="mt-3 space-y-2">
                  {openCs.breakdown.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-slate-300">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" /> {b}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {openCs.tags.map((t) => (
                  <span key={t} className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-slate-300">{t}</span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}