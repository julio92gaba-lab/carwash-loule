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
      <div className="max-w-6xl mx-auto px-5 flex items-center justify-between h-[76px]">
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
            Área privada
          </Link>
          <button
            onClick={onAgendar}
            className="bg-brand-green text-black text-sm font-semibold px-5 py-2.5 rounded-full hover:shadow-neon hover:-translate-y-0.5 transition-all duration-300"
          >
            Agendar Agora
          </button>
        </nav>
        <button className="md:hidden text-white" onClick={() => setOpen(!open)} aria-label="Abrir menu">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
          </svg>
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-brand-dark2 border-t border-white/10 px-5 py-5 flex flex-col gap-4">
          {links.map(([label, fn]) => (
            <button key={label} onClick={() => { fn(); setOpen(false) }} className="text-white/80 hover:text-brand-green text-sm font-medium text-left">
              {label}
            </button>
          ))}
          <button
            onClick={() => { onAgendar(); setOpen(false) }}
            className="border-2 border-brand-green text-brand-green text-sm font-semibold px-5 py-2 rounded-full"
          >
            Agendar Agora
          </button>
          <Link to="/admin/login" onClick={() => setOpen(false)} className="text-white/60 text-sm">Área privada</Link>
        </div>
      )}
    </header>
  )
}
