import { useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "sonner"
import {
  Download, Calendar, CheckCircle, ArrowRight, Sparkle, PenNib, ChartLine,
  Money, Target, Globe, ShieldCheck, Envelope, Phone, MapPin, Rocket, Check,
  CaretDown, Users, Percent, TrendUp, PlayCircle, Handshake, Briefcase,
} from "@phosphor-icons/react"
import { LEAD_MAGNETS, BLOG_POSTS, PACKAGES, T, type ServicePackage } from "@/data/agencyData"

const KEY = "vortex_leads"
function saveLead(payload: Record<string, unknown>) {
  try {
    const prev = JSON.parse(localStorage.getItem(KEY) || "[]")
    prev.push({ ...payload, at: Date.now() })
    localStorage.setItem(KEY, JSON.stringify(prev))
  } catch { /* ignore */ }
}

const INDUSTRY_OPTS = ["E-commerce", "SaaS", "Fintech", "Health & Wellness", "B2B Services", "Other"]
const BUDGET_OPTS = ["< $5k / mo", "$5k – $10k / mo", "$10k – $25k / mo", "$25k+ / mo"]
const GOAL_OPTS = ["More qualified leads", "Lower CAC", "Scale paid revenue", "Organic / SEO growth", "Brand & content"]

// ---------------- Reusable: multi-step Audit Wizard ----------------
export function AuditWizard() {
  const [step, setStep] = useState(0)
  const [done, setDone] = useState(false)
  const [form, setForm] = useState({ website: "", industry: "", budget: "", goal: "", name: "", email: "" })
  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }))

  const steps = [
    {
      title: "Where should we look?", icon: Globe,
      body: (
        <div className="space-y-4">
          <div>
            <label className={`mb-1.5 block text-sm font-medium ${T.soft}`}>Website URL</label>
            <input className={T.input} placeholder="yourbrand.com" value={form.website} onChange={(e) => set("website", e.target.value)} />
          </div>
          <div>
            <label className={`mb-1.5 block text-sm font-medium ${T.soft}`}>Industry</label>
            <div className="flex flex-wrap gap-2">
              {INDUSTRY_OPTS.map((o) => (
                <button key={o} onClick={() => set("industry", o)} className={`rounded-full px-3.5 py-2 text-sm font-medium transition ${form.industry === o ? "bg-emerald-500 text-[#04110C]" : `${T.border} ${T.card} ${T.soft}`}`}>{o}</button>
              ))}
            </div>
          </div>
        </div>
      ),
      valid: !!form.website && !!form.industry,
    },
    {
      title: "Current investment", icon: Money,
      body: (
        <div className="space-y-4">
          <label className={`mb-1.5 block text-sm font-medium ${T.soft}`}>Monthly marketing budget</label>
          <div className="grid grid-cols-2 gap-3">
            {BUDGET_OPTS.map((o) => (
              <button key={o} onClick={() => set("budget", o)} className={`rounded-xl border p-4 text-left text-sm font-semibold transition ${form.budget === o ? "border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-300" : `${T.border} ${T.card} ${T.soft}`}`}>{o}</button>
            ))}
          </div>
        </div>
      ),
      valid: !!form.budget,
    },
    {
      title: "Your goal & contact", icon: Target,
      body: (
        <div className="space-y-4">
          <label className={`mb-1.5 block text-sm font-medium ${T.soft}`}>Primary goal</label>
          <div className="flex flex-wrap gap-2">
            {GOAL_OPTS.map((o) => (
              <button key={o} onClick={() => set("goal", o)} className={`rounded-full px-3.5 py-2 text-sm font-medium transition ${form.goal === o ? "bg-emerald-500 text-[#04110C]" : `${T.border} ${T.card} ${T.soft}`}`}>{o}</button>
            ))}
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <input className={T.input} placeholder="Full name" value={form.name} onChange={(e) => set("name", e.target.value)} />
            <input className={T.input} placeholder="Work email" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} />
          </div>
        </div>
      ),
      valid: !!form.goal && !!form.name && /.+@.+\..+/.test(form.email),
    },
  ]

  const submit = () => {
    saveLead({ type: "audit", ...form })
    setDone(true)
    toast.success("Audit request received — check your inbox within 24h.")
  }

  if (done) {
    return (
      <div className="py-6 text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-500/15 text-emerald-500">
          <CheckCircle weight="fill" className="h-9 w-9" />
        </div>
        <h3 className={`mt-4 text-xl font-bold ${T.text}`}>You're on the list.</h3>
        <p className={`mx-auto mt-2 max-w-sm text-sm ${T.muted}`}>
          A senior strategist will review <b>{form.website}</b> and send a custom 47-point growth audit to <b>{form.email}</b>.
        </p>
      </div>
    )
  }

  const current = steps[step]
  const Icon = current.icon
  return (
    <div>
      <div className="mb-5 flex items-center gap-2">
        {steps.map((_, i) => (
          <div key={i} className={`h-1.5 flex-1 rounded-full transition ${i <= step ? "bg-emerald-500" : "bg-slate-200 dark:bg-white/10"}`} />
        ))}
      </div>
      <div className="mb-4 flex items-center gap-2">
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-500/10 text-emerald-500"><Icon className="h-5 w-5" /></span>
        <h3 className={`text-lg font-bold ${T.text}`}>{current.title}</h3>
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
          {current.body}
        </motion.div>
      </AnimatePresence>
      <div className="mt-6 flex items-center justify-between">
        <button onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0} className={`${T.btnGhost} ${step === 0 ? "pointer-events-none opacity-40" : ""}`}>Back</button>
        {step < steps.length - 1 ? (
          <button onClick={() => current.valid && setStep((s) => s + 1)} className={`${T.btnPrimary} ${!current.valid ? "pointer-events-none opacity-40" : ""}`}>Continue <ArrowRight className="h-4 w-4" /></button>
        ) : (
          <button onClick={submit} className={`${T.btnPrimary} ${!current.valid ? "pointer-events-none opacity-40" : ""}`}><Rocket className="h-4 w-4" /> Get my audit</button>
        )}
      </div>
    </div>
  )
}

// ---------------- Reusable: Quote form ----------------
export function QuoteForm({ pkg }: { pkg?: ServicePackage }) {
  const [done, setDone] = useState(false)
  const [f, setF] = useState({ name: "", email: "", company: "", pkg: pkg?.id || PACKAGES[1].id, budget: BUDGET_OPTS[1], msg: "" })
  const set = (k: string, v: string) => setF((s) => ({ ...s, [k]: v }))

  if (done) {
    return (
      <div className="py-6 text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-500/15 text-emerald-500"><CheckCircle weight="fill" className="h-9 w-9" /></div>
        <h3 className={`mt-4 text-xl font-bold ${T.text}`}>Quote request sent.</h3>
        <p className={`mx-auto mt-2 max-w-sm text-sm ${T.muted}`}>We'll reply with a tailored scope and pricing within one business day.</p>
      </div>
    )
  }
  return (
    <form
      onSubmit={(e) => { e.preventDefault(); saveLead({ type: "quote", ...f }); setDone(true); toast.success("Quote request sent — we'll be in touch.") }}
      className="space-y-4"
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <input required className={T.input} placeholder="Full name" value={f.name} onChange={(e) => set("name", e.target.value)} />
        <input required type="email" className={T.input} placeholder="Work email" value={f.email} onChange={(e) => set("email", e.target.value)} />
      </div>
      <input className={T.input} placeholder="Company" value={f.company} onChange={(e) => set("company", e.target.value)} />
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="relative">
          <select className={`${T.input} appearance-none pr-9`} value={f.pkg} onChange={(e) => set("pkg", e.target.value)}>
            {PACKAGES.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
          <CaretDown className={`pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 ${T.muted}`} />
        </div>
        <div className="relative">
          <select className={`${T.input} appearance-none pr-9`} value={f.budget} onChange={(e) => set("budget", e.target.value)}>
            {BUDGET_OPTS.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
          <CaretDown className={`pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 ${T.muted}`} />
        </div>
      </div>
      <textarea className={`${T.input} min-h-24 resize-none`} placeholder="What are you trying to hit this quarter?" value={f.msg} onChange={(e) => set("msg", e.target.value)} />
      <button type="submit" className={`${T.btnPrimary} w-full`}>Request tailored quote <ArrowRight className="h-4 w-4" /></button>
    </form>
  )
}

// ---------------- Lead magnet hub ----------------
function LeadMagnetCard({ m, index }: { m: (typeof LEAD_MAGNETS)[number]; index: number }) {
  const [email, setEmail] = useState("")
  const [unlocked, setUnlocked] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06, duration: 0.45 }}
      className={`flex flex-col rounded-3xl ${T.card} ${T.border} ${T.cardHover} p-6 transition-all hover:-translate-y-1`}
    >
      <div className="flex items-center justify-between">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-emerald-500/10 text-emerald-500"><PenNib className="h-5 w-5" /></span>
        <span className={`rounded-full ${T.chip} px-3 py-1 text-xs font-semibold`}>{m.format}{m.pages > 1 ? ` · ${m.pages}p` : ""}</span>
      </div>
      <h3 className={`mt-4 text-base font-bold ${T.text}`}>{m.title}</h3>
      <p className={`mt-1.5 flex-1 text-sm ${T.muted}`}>{m.description}</p>
      {unlocked ? (
        <div className="mt-5 inline-flex items-center gap-2 rounded-xl bg-emerald-500/10 px-4 py-3 text-sm font-semibold text-emerald-600 dark:text-emerald-300">
          <Check weight="bold" className="h-4 w-4" /> Sent to your inbox
        </div>
      ) : (
        <form className="mt-5 flex gap-2" onSubmit={(e) => { e.preventDefault(); if (!/.+@.+\..+/.test(email)) return toast.error("Enter a valid email"); saveLead({ type: "lead_magnet", id: m.id, email }); setUnlocked(true); toast.success(`${m.title} is on its way!`) }}>
          <input className={T.input} placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          <button type="submit" className={`${T.btnPrimary} shrink-0 px-4`} aria-label="Download"><Download className="h-4 w-4" /></button>
        </form>
      )}
    </motion.div>
  )
}

// ---------------- Booking scheduler ----------------
function Scheduler() {
  const days = useMemo(() => Array.from({ length: 6 }).map((_, i) => {
    const d = new Date(); d.setDate(d.getDate() + i + 2)
    return { label: d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }) }
  }), [])
  const slots = ["9:00 AM", "11:30 AM", "2:00 PM", "4:30 PM"]
  const [day, setDay] = useState(days[0].label)
  const [slot, setSlot] = useState<string | null>(null)

  return (
    <div className={`rounded-3xl ${T.card} ${T.border} p-6`}>
      <div className="flex items-center gap-2 text-sm font-semibold"><Calendar className={`h-4 w-4 ${T.accent}`} /> <span className={T.text}>Book a strategy call</span></div>
      <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
        {days.map((d) => (
          <button key={d.label} onClick={() => setDay(d.label)} className={`whitespace-nowrap rounded-xl border px-3 py-2 text-xs font-semibold transition ${day === d.label ? "border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-300" : `${T.border} ${T.soft}`}`}>{d.label}</button>
        ))}
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {slots.map((s) => (
          <button key={s} onClick={() => setSlot(s)} className={`rounded-xl border px-3 py-2.5 text-sm font-medium transition ${slot === s ? "border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-300" : `${T.border} ${T.soft}`}`}>{s}</button>
        ))}
      </div>
      <button onClick={() => slot ? (saveLead({ type: "booking", day, slot }), toast.success(`Strategy call held for ${day}, ${slot}`)) : toast.error("Pick a time slot")} className={`${T.btnPrimary} mt-4 w-full`}>
        <PlayCircle className="h-4 w-4" /> Confirm {day}{slot ? ` · ${slot}` : ""}
      </button>
    </div>
  )
}

// ---------------- Section ----------------
export default function ResourcesAndLeads({ onAudit }: { onAudit: () => void }) {
  return (
    <section id="resources" className={`${T.section} ${T.surface}`}>
      <div className={T.wrap}>
        <div className="mx-auto max-w-2xl text-center">
          <span className={`inline-flex items-center gap-2 rounded-full ${T.border} ${T.card} px-4 py-1.5 text-xs font-semibold uppercase tracking-wide ${T.accent}`}>
            <Sparkle weight="fill" className="h-4 w-4" /> Resources & insights
          </span>
          <h2 className={`mt-4 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl ${T.text}`}>Steal our playbooks.</h2>
          <p className={`mt-4 text-base ${T.muted}`}>Free frameworks the Vortex team uses on every engagement — no fluff, just the systems that move revenue.</p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {LEAD_MAGNETS.map((m, i) => <LeadMagnetCard key={m.id} m={m} index={i} />)}
        </div>

        {/* Blog + scheduler */}
        <div className="mt-16 grid gap-8 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <h3 className={`flex items-center gap-2 text-xl font-bold ${T.text}`}><ChartLine className={`h-5 w-5 ${T.accent}`} /> Latest insights</h3>
            <div className="mt-5 divide-y divide-slate-200 dark:divide-white/10">
              {BLOG_POSTS.map((p) => (
                <a key={p.title} href="#resources" className="group flex items-start gap-4 py-4 transition">
                  <span className={`mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-500/10 text-emerald-500`}><Briefcase className="h-5 w-5" /></span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-emerald-500">{p.category}<span className={T.muted}>· {p.readTime}</span></div>
                    <div className={`mt-1 font-bold ${T.text} group-hover:text-emerald-500`}>{p.title}</div>
                    <p className={`mt-1 text-sm ${T.muted}`}>{p.excerpt}</p>
                  </div>
                  <ArrowRight className={`mt-2 h-4 w-4 shrink-0 ${T.muted} transition group-hover:translate-x-1 group-hover:text-emerald-500`} />
                </a>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <Scheduler />
            <div className={`rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 to-cyan-500/5 p-6`}>
              <ShieldCheck className={`h-6 w-6 ${T.accent}`} />
              <h4 className={`mt-3 text-lg font-bold ${T.text}`}>Not sure where to start?</h4>
              <p className={`mt-1.5 text-sm ${T.muted}`}>Get a free 47-point growth audit and a custom roadmap in 24 hours.</p>
              <button onClick={onAudit} className={`${T.btnPrimary} mt-4 w-full`}>Run my free audit <ArrowRight className="h-4 w-4" /></button>
            </div>
          </div>
        </div>

        {/* Trust strip */}
        <div className={`mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 border-t ${T.border} pt-8 text-sm font-semibold ${T.muted}`}>
          <span className="flex items-center gap-2"><Users className={T.accent} /> 68 active brands</span>
          <span className="flex items-center gap-2"><Percent className={T.accent} /> 92% retention</span>
          <span className="flex items-center gap-2"><TrendUp className={T.accent} /> 4.8x avg ROI</span>
          <span className="flex items-center gap-2"><Handshake className={T.accent} /> Month-to-month, no lock-in</span>
        </div>
      </div>
    </section>
  )
}

export const CONTACT = {
  email: "growth@vortex.partners",
  phone: "+1 (415) 555-0192",
  address: "548 Market St, San Francisco, CA",
  icons: { Envelope, Phone, MapPin },
}
