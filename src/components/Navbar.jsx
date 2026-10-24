import { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo'
import { useScrolled } from '../hooks/useReveal'

export default function Navbar({ onAgendar }) {
  const [open, setOpen] = useState(false)
  const scrolled = useScrolled(40)

  const go = (id) => () => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  const links = [
    ['Início', go('inicio')],
    ['Serviços', go('servicos')],
    ['Resultados', go('galeria')],
    ['Contacto', go('localizacao')],
  ]

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-brand-dark/90 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/20' : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 flex items-center justify-between h-[68px] md:h-[76px]">
        <button onClick={go('inicio')}>
          <Logo size="sm" />
        </button>
        <nav className="hidden md:flex items-center gap-8">
          {links.map(([label, fn]) => (
            <button key={label} onClick={fn} className="text-white/80 hover:text-brand-green text-sm font-medium transition">
              {label}
            </button>
          ))}
          <Link to="/admin/login" className="text-white/55 hover:text-white text-xs transition-all duration-300">
            Área da gerência
          </Link>
          <button
            onClick={onAgendar}
            className="bg-brand-green text-black text-sm font-semibold px-5 py-2.5 rounded-full hover:shadow-neon hover:-translate-y-0.5 transition-all duration-300"
          >
            Agendar Agora
          </button>
        </nav>
        <div className="md:hidden flex items-center gap-3">
          <button onClick={onAgendar} className="bg-brand-green text-black text-xs font-bold px-3.5 py-2.5 rounded-full shadow-neon">Agendar</button>
          <button className="w-10 h-10 rounded-full border border-white/15 bg-white/5 text-white flex items-center justify-center" onClick={() => setOpen(!open)} aria-label="Abrir menu">
            <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden absolute top-full inset-x-3 rounded-2xl bg-brand-dark2/95 backdrop-blur-xl border border-white/10 p-3 shadow-2xl flex flex-col gap-1">
          {links.map(([label, fn]) => (
            <button key={label} onClick={() => { fn(); setOpen(false) }} className="text-white/80 hover:text-brand-green text-sm font-medium text-left rounded-xl px-4 py-3 hover:bg-white/5">
              {label}
            </button>
          ))}
          <Link to="/admin/login" onClick={() => setOpen(false)} className="mt-2 rounded-xl border border-brand-green/30 bg-brand-green/10 px-4 py-3 text-brand-green text-sm font-medium">Área da gerência <span className="text-white/45">· acesso privado</span></Link>
        </div>
      )}
    </header>
  )
}
