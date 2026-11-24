import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Toaster } from "sonner"
import { X, Lightning, ArrowRight, LinkedinLogo } from "@phosphor-icons/react"
import { T, type ServicePackage } from "@/data/agencyData"
import Navbar from "@/components/Navbar"
import HeroSection from "@/components/HeroSection"
import ServicesPricing from "@/components/ServicesPricing"
import CaseStudiesSection from "@/components/CaseStudiesSection"
import TrustAndTeam from "@/components/TrustAndTeam"
import ResourcesAndLeads, { AuditWizard, QuoteForm, CONTACT } from "@/components/ResourcesAndLeads"

function Modal({
  open, onClose, title, subtitle, children,
}: { open: boolean; onClose: () => void; title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
            className="relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-white/10 bg-[#0E1422] p-6 text-white shadow-2xl sm:p-8"
          >
            <button onClick={onClose} className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-xl border border-white/10 text-slate-300 hover:border-emerald-400 hover:text-white">
              <X className="h-5 w-5" />
            </button>
            <h3 className="text-xl font-bold tracking-tight">{title}</h3>
            <p className="mt-1 text-sm text-slate-400">{subtitle}</p>
            <div className="mt-6">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Footer() {
  return (
    <footer className={`border-t ${T.border} bg-[#0A0D14] text-white`}>
      <div className={`${T.wrap} grid gap-10 py-14 md:grid-cols-4`}>
        <div className="md:col-span-2">
          <a href="#top" className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 text-[#04110C]"><Lightning weight="fill" className="h-5 w-5" /></span>
            <span className="text-lg font-bold tracking-tight">VORTEX<span className="text-emerald-400">.</span></span>
          </a>
          <p className="mt-4 max-w-sm text-sm text-slate-400">
            Performance marketing that compounds. SEO, paid media, content and social engineered into one revenue-attributed growth system.
          </p>
          <div className="mt-5 space-y-1.5 text-sm text-slate-400">
            <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-2 hover:text-emerald-400"><CONTACT.icons.Envelope className="h-4 w-4" /> {CONTACT.email}</a>
            <a href={`tel:${CONTACT.phone}`} className="flex items-center gap-2 hover:text-emerald-400"><CONTACT.icons.Phone className="h-4 w-4" /> {CONTACT.phone}</a>
            <span className="flex items-center gap-2"><CONTACT.icons.MapPin className="h-4 w-4" /> {CONTACT.address}</span>
          </div>
        </div>
        <div>
          <div className="text-sm font-bold">Company</div>
          <ul className="mt-4 space-y-2.5 text-sm text-slate-400">
            {[["Services", "#services"], ["Results", "#results"], ["Team", "#team"], ["Resources", "#resources"]].map(([l, h]) => (
              <li key={l}><a href={h} className="hover:text-emerald-400">{l}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-sm font-bold">Get started</div>
          <p className="mt-4 text-sm text-slate-400">Book a free growth audit and a custom roadmap within 24 hours.</p>
          <a href="#top" className="mt-4 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-[#04110C] hover:bg-emerald-400">
            Free audit <ArrowRight className="h-4 w-4" />
          </a>
          <a href="#" className="mt-4 flex items-center gap-2 text-sm text-slate-400 hover:text-emerald-400"><LinkedinLogo className="h-4 w-4" /> LinkedIn</a>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className={`${T.wrap} flex flex-col items-center justify-between gap-3 py-6 text-xs text-slate-500 sm:flex-row`}>
          <span>© {new Date().getFullYear()} VORTEX Growth Partners. All rights reserved.</span>
          <span>Privacy · Terms · Cookies</span>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  const [theme, setTheme] = useState<"dark" | "light">("dark")
  const [auditOpen, setAuditOpen] = useState(false)
  const [quotePkg, setQuotePkg] = useState<ServicePackage | null>(null)

  useEffect(() => {
    const root = document.documentElement
    if (theme === "dark") root.classList.add("dark")
    else root.classList.remove("dark")
  }, [theme])

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"))

  return (
    <div className={`${T.page} min-h-screen ${T.text}`}>
      <Navbar theme={theme} onToggleTheme={toggleTheme} onAudit={() => setAuditOpen(true)} />
      <main>
        <HeroSection onAudit={() => setAuditOpen(true)} />
        <ServicesPricing onRequestQuote={(p) => setQuotePkg(p)} />
        <CaseStudiesSection />
        <TrustAndTeam />
        <ResourcesAndLeads onAudit={() => setAuditOpen(true)} />
      </main>
      <Footer />

      <Modal open={auditOpen} onClose={() => setAuditOpen(false)} title="Free 47-point growth audit" subtitle="Answer 3 quick questions — we'll send a custom roadmap within 24 hours.">
        <AuditWizard />
      </Modal>

      <Modal open={!!quotePkg} onClose={() => setQuotePkg(null)} title={`Request a quote — ${quotePkg?.name ?? ""}`} subtitle="Tell us your goals and budget; we'll reply with a tailored scope.">
        {quotePkg && <QuoteForm pkg={quotePkg} />}
      </Modal>

      <Toaster theme="dark" position="top-center" richColors closeButton toastOptions={{ style: { background: "#0E1422", border: "1px solid #1E293B" } }} />
    </div>
  )
}
