import { useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Check, TrendUp, Money, Target, ChartLine, Megaphone, PenNib, ShareNetwork,
  ShieldCheck, ArrowRight, Sparkle,
} from "@phosphor-icons/react"
import { PACKAGES, PACKAGE_CATEGORIES, T, type ServicePackage } from "@/data/agencyData"

const ICONS: Record<string, any> = {
  search: TrendUp, megaphone: Megaphone, pen: PenNib, share: ShareNetwork,
  money: Money, target: Target, chart: ChartLine,
}

interface Props {
  onRequestQuote: (pkg: ServicePackage) => void
}

function PackageCard({ pkg, billing, onQuote, index }: {
  pkg: ServicePackage; billing: "monthly" | "quarterly"; onQuote: () => void; index: number
}) {
  const Icon = ICONS[pkg.icon] ?? Sparkle
  const price = billing === "monthly" ? pkg.monthly : pkg.quarterly
  const period = billing === "monthly" ? "/mo" : "/quarter"

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.06, duration: 0.5 }}
      className={`relative flex flex-col rounded-3xl p-6 transition-all duration-300 ${
        pkg.featured
          ? "border border-emerald-500/50 bg-gradient-to-b from-emerald-500/[0.08] to-transparent shadow-2xl shadow-emerald-500/10"
          : `${T.card} ${T.border} hover:-translate-y-1 hover:border-emerald-400/40`
      }`}
    >
      {pkg.featured && (
        <span className="absolute -top-3 left-6 inline-flex items-center gap-1 rounded-full bg-emerald-500 px-3 py-1 text-xs font-bold text-[#04110C]">
          <Sparkle weight="fill" className="h-3 w-3" /> Most popular
        </span>
      )}

      <div className="flex items-center gap-3">
        <span className={`grid h-11 w-11 place-items-center rounded-2xl bg-emerald-500/10 ${T.accent}`}>
          <Icon className="h-6 w-6" />
        </span>
        <div>
          <h3 className={`text-lg font-bold ${T.text}`}>{pkg.name}</h3>
          <span className={`text-xs font-semibold uppercase tracking-wide ${T.accentCyan}`}>{pkg.category}</span>
        </div>
      </div>

      <p className={`mt-3 text-sm ${T.muted}`}>{pkg.tagline}</p>

      <div className="mt-5 flex items-baseline gap-1">
        <span className={`text-3xl font-bold tracking-tight ${T.text}`}>
          ${price.toLocaleString()}
        </span>
        <span className={`text-sm ${T.muted}`}>{period}</span>
      </div>

      <div className={`mt-2 inline-flex items-center gap-1.5 rounded-lg ${T.chip} px-3 py-1.5 text-xs font-semibold`}>
        <TrendUp className="h-3.5 w-3.5" /> {pkg.kpi}
      </div>

      <ul className="mt-5 flex flex-1 flex-col gap-2.5">
        {pkg.deliverables.map((d) => (
          <li key={d} className="flex items-start gap-2.5 text-sm">
            <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
              <Check weight="bold" className="h-3 w-3" />
            </span>
            <span className={T.soft}>{d}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={onQuote}
        className={`mt-6 w-full ${pkg.featured ? T.btnPrimary : T.btnGhost}`}
      >
        Request a quote <ArrowRight className="h-4 w-4" />
      </button>
    </motion.div>
  )
}

export default function ServicesPricing({ onRequestQuote }: Props) {
  const [billing, setBilling] = useState<"monthly" | "quarterly">("monthly")
  const [cat, setCat] = useState<(typeof PACKAGE_CATEGORIES)[number]>("All")

  const filtered = useMemo(
    () => (cat === "All" ? PACKAGES : PACKAGES.filter((p) => p.category === cat)),
    [cat],
  )

  return (
    <section id="services" className={`${T.section} ${T.page}`}>
      <div className={T.wrap}>
        <div className="mx-auto max-w-2xl text-center">
          <span className={`inline-flex items-center gap-2 rounded-full ${T.border} ${T.surface} px-4 py-1.5 text-xs font-semibold uppercase tracking-wide ${T.accent}`}>
            <ShieldCheck weight="fill" className="h-4 w-4" /> Service packages
          </span>
          <h2 className={`mt-4 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl ${T.text}`}>
            Pick the engine. We run the system.
          </h2>
          <p className={`mt-4 text-base ${T.muted}`}>
            Transparent tiers across SEO, paid media, content and social — every package ships with full revenue attribution.
          </p>
        </div>

        {/* Controls */}
        <div className="mt-10 flex flex-col items-center justify-between gap-5 md:flex-row">
          <div className="flex flex-wrap justify-center gap-2">
            {PACKAGE_CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  cat === c
                    ? "bg-emerald-500 text-[#04110C] shadow-lg shadow-emerald-500/20"
                    : `${T.border} ${T.surface} ${T.soft} hover:border-emerald-400/40`
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className={`inline-flex items-center gap-1 rounded-full ${T.border} ${T.surface} p-1`}>
            {(["monthly", "quarterly"] as const).map((b) => (
              <button
                key={b}
                onClick={() => setBilling(b)}
                className={`relative rounded-full px-4 py-2 text-sm font-semibold capitalize transition ${
                  billing === b ? T.text : T.muted
                }`}
              >
                {billing === b && (
                  <motion.span layoutId="billing" className="absolute inset-0 rounded-full bg-emerald-500/15" />
                )}
                <span className="relative">{b}</span>
                {b === "quarterly" && <span className="relative ml-1 text-xs text-emerald-500">-10%</span>}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="popLayout">
          <motion.div layout className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {filtered.map((p, i) => (
              <PackageCard key={p.id} pkg={p} billing={billing} index={i} onQuote={() => onRequestQuote(p)} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
