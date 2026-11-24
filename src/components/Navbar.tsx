import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { List, X, Sun, Moon, Lightning } from "@phosphor-icons/react"
import { T } from "@/data/agencyData"

const LINKS = [
  { label: "Services", href: "#services" },
  { label: "Results", href: "#results" },
  { label: "Team", href: "#team" },
  { label: "Resources", href: "#resources" },
]

interface Props {
  theme: "dark" | "light"
  onToggleTheme: () => void
  onAudit: () => void
}

export default function Navbar({ theme, onToggleTheme, onAudit }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-[#0A0D14]/70 backdrop-blur-xl dark:bg-[#0A0D14]/70"
          : "bg-transparent"
      }`}
    >
      <div className={`${T.wrap} flex h-[72px] items-center justify-between`}>
        {/* Brand */}
        <a href="#top" className="group flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 text-[#04110C] shadow-lg shadow-emerald-500/30">
            <Lightning weight="fill" className="h-5 w-5" />
          </span>
          <span className={`text-lg font-bold tracking-tight ${T.text}`}>
            VORTEX<span className={T.accent}>.</span>
          </span>
        </a>

        {/* Desktop links */}
        <nav className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`rounded-lg px-4 py-2 text-sm font-medium ${T.soft} transition hover:bg-black/5 hover:text-emerald-500 dark:hover:bg-white/5 dark:hover:text-emerald-300`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            className={`grid h-10 w-10 place-items-center rounded-xl ${T.border} ${T.surface} ${T.text} transition hover:border-emerald-400/50`}
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <button onClick={onAudit} className={`${T.btnPrimary} hidden sm:inline-flex`}>
            Free Growth Audit
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            className={`grid h-10 w-10 place-items-center rounded-xl ${T.border} ${T.surface} ${T.text} md:hidden`}
          >
            {open ? <X className="h-5 w-5" /> : <List className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-white/10 bg-[#0A0D14]/95 backdrop-blur-xl md:hidden"
          >
            <nav className={`${T.wrap} flex flex-col gap-1 py-4`}>
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-4 py-3 text-sm font-medium text-slate-200 transition hover:bg-white/5 hover:text-emerald-300"
                >
                  {l.label}
                </a>
              ))}
              <button
                onClick={() => {
                  setOpen(false)
                  onAudit()
                }}
                className={`${T.btnPrimary} mt-2`}
              >
                Free Growth Audit
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}