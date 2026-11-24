import { useEffect, useState } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import {
  Quotes, Star, ShieldCheck, LinkedinLogo, Users, Handshake, X, Plus, CheckCircle,
} from "@phosphor-icons/react"
import { CLIENT_LOGOS, TESTIMONIALS, TEAM, T, type TeamMember } from "@/data/agencyData"

function LogoMarquee() {
  return (
    <div className={`border-y ${T.border} ${T.card} py-8`}>
      <p className={`mb-6 text-center text-xs font-semibold uppercase tracking-widest ${T.muted}`}>
        Powering growth for category leaders
      </p>
      <div className="flex overflow-hidden">
        <div className="flex shrink-0 animate-[marquee_30s_linear_infinite] items-center gap-12 pr-12">
          {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((name, i) => (
            <span key={i} className={`whitespace-nowrap text-xl font-bold tracking-tight ${T.muted} opacity-70 transition hover:opacity-100`}>
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function Testimonials() {
  const [idx, setIdx] = useState(0)
  const reduce = useReducedMotion()
  useEffect(() => {
    if (reduce) return
    const t = setInterval(() => setIdx((v) => (v + 1) % TESTIMONIALS.length), 6000)
    return () => clearInterval(t)
  }, [reduce])
  const item = TESTIMONIALS[idx]

  return (
    <div className="mt-20">
      <div className="mx-auto max-w-2xl text-center">
        <span className={`inline-flex items-center gap-2 rounded-full ${T.border} ${T.card} px-4 py-1.5 text-xs font-semibold uppercase tracking-wide ${T.accent}`}>
          <ShieldCheck weight="fill" className="h-4 w-4" /> What partners say
        </span>
        <h2 className={`mt-4 text-3xl font-bold tracking-tighter sm:text-4xl ${T.text}`}>
          Results our clients brag about.
        </h2>
      </div>

      <div className={`relative mx-auto mt-10 max-w-4xl overflow-hidden rounded-3xl ${T.card} ${T.border} p-8 md:p-12`}>
        <Quotes weight="fill" className="h-10 w-10 text-emerald-500/30" />
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4 }}
          >
            <p className={`mt-4 text-xl font-medium leading-relaxed ${T.text} md:text-2xl`}>
              &ldquo;{item.quote}&rdquo;
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className={`flex items-center gap-1 text-amber-400`}>
                  {Array.from({ length: 5 }).map((_, i) => <Star weight="fill" key={i} className="h-4 w-4" />)}
                </div>
                <div className={`mt-2 font-bold ${T.text}`}>{item.name}</div>
                <div className={`text-sm ${T.muted}`}>{item.role} · {item.company}</div>
              </div>
              <div className={`rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-3 text-center`}>
                <div className="text-2xl font-bold text-emerald-500 dark:text-emerald-400">{item.metric}</div>
                <div className={`text-xs ${T.muted}`}>{item.metricLabel}</div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex gap-2">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`Testimonial ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${i === idx ? "w-8 bg-emerald-500" : "w-4 bg-slate-300 dark:bg-white/15"}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function TeamCard({ m, onOpen, index }: { m: TeamMember; onOpen: () => void; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.06, duration: 0.5 }}
      className={`group relative overflow-hidden rounded-3xl ${T.card} ${T.border} ${T.cardHover} transition-all hover:-translate-y-1`}
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <img src={m.image} alt={m.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-4">
          <div className="text-base font-bold text-white">{m.name}</div>
          <div className="text-xs text-emerald-300">{m.role}</div>
        </div>
        <button
          onClick={onOpen}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-xl bg-white/10 text-white opacity-0 backdrop-blur transition group-hover:opacity-100 hover:bg-emerald-500 hover:text-[#04110C]"
          aria-label={`View ${m.name}`}
        >
          <Plus weight="bold" className="h-5 w-5" />
        </button>
      </div>
      <div className="flex flex-wrap gap-1.5 p-4">
        {m.expertise.map((e) => (
          <span key={e} className={`rounded-full ${T.chip} px-2.5 py-1 text-xs font-medium`}>{e}</span>
        ))}
      </div>
    </motion.div>
  )
}

export default function TrustAndTeam() {
  const [member, setMember] = useState<TeamMember | null>(null)

  return (
    <section id="team" className={`${T.section} ${T.page}`}>
      <div className={T.wrap}>
        <LogoMarquee />
        <Testimonials />

        <div className="mt-20 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className={`inline-flex items-center gap-2 rounded-full ${T.border} ${T.card} px-4 py-1.5 text-xs font-semibold uppercase tracking-wide ${T.accent}`}>
              <Users weight="fill" className="h-4 w-4" /> The operators
            </span>
            <h2 className={`mt-4 text-3xl font-bold tracking-tighter sm:text-4xl ${T.text}`}>
              Senior talent, no juniors on your account.
            </h2>
          </div>
          <p className={`max-w-sm text-sm ${T.muted}`}>
            <Handshake className="mr-1 inline h-4 w-4 text-emerald-500" />
            Every engagement is led by a named strategist with 8+ years at scale.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-4">
          {TEAM.map((m, i) => <TeamCard key={m.name} m={m} index={i} onOpen={() => setMember(m)} />)}
        </div>
      </div>

      <AnimatePresence>
        {member && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setMember(null)} />
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ type: "spring", damping: 26, stiffness: 320 }}
              className="relative z-10 w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-[#0E1422] text-white shadow-2xl"
            >
              <button onClick={() => setMember(null)} className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-black/30 text-slate-300 hover:border-emerald-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
              <div className="flex gap-5 p-6">
                <img src={member.image} alt={member.name} className="h-28 w-28 shrink-0 rounded-2xl object-cover" />
                <div>
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <div className="text-sm text-emerald-400">{member.role}</div>
                  <a href={member.linkedin} className={`mt-2 inline-flex items-center gap-1.5 text-xs ${T.muted} hover:text-emerald-300`}>
                    <LinkedinLogo className="h-4 w-4" /> LinkedIn
                  </a>
                </div>
              </div>
              <div className="px-6 pb-6">
                <p className="text-sm leading-relaxed text-slate-300">{member.bio}</p>
                <div className="mt-5">
                  <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">Expertise</div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {member.expertise.map((e) => (
                      <span key={e} className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-slate-200">{e}</span>
                    ))}
                  </div>
                </div>
                <div className="mt-5">
                  <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">Selected engagements</div>
                  <ul className="mt-2 space-y-1.5">
                    {member.credits.map((c) => (
                      <li key={c} className="flex items-center gap-2 text-sm text-slate-300">
                        <CheckCircle weight="fill" className="h-4 w-4 text-emerald-400" /> {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
