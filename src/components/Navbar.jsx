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
    ['Galeria', go('galeria')],
    ['Contacto', go('localizacao')],
  ]
  const iconPaths = {
    Início: 'M3 10.5 12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V10.5Z',
    Serviços: 'M5 4h14v4H5zM5 10h14v4H5zM5 16h14v4H5z',
    Galeria: 'M4 5h16v14H4zM7 15l3-3 2 2 2-2 3 3M8 9h.01',
    Contacto: 'M4 5h16v14H4zM4 7l8 6 8-6',
    Sobre: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 10v6M12 7h.01',
  }

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-brand-dark/90 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/20' : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 flex items-center h-[68px] md:h-[76px]">
        <button onClick={go('inicio')}>
          <Logo size="sm" />
        </button>
        <nav className="hidden md:flex ml-10 items-center gap-6 lg:gap-8">
          {links.map(([label, fn]) => (
            <button key={label} onClick={fn} className="text-white/80 hover:text-brand-green text-sm font-medium transition">
              {label}
            </button>
          ))}
          <Link to="/sobre" className="text-white/80 hover:text-brand-green text-sm font-medium transition">Sobre</Link>
        </nav>
        <div className="hidden md:flex ml-auto items-center gap-4">
          <Link to="/admin/login" className="text-white/55 hover:text-white text-xs transition-all duration-300">Área Privada</Link>
          <button
            onClick={onAgendar}
            className="bg-brand-green text-black text-sm font-semibold px-5 py-2.5 rounded-full hover:shadow-neon hover:-translate-y-0.5 transition-all duration-300"
          >
            Agendar Agora
          </button>
        </div>
        <div className="md:hidden ml-auto flex items-center gap-3">
          <button onClick={onAgendar} className="bg-brand-green text-black text-xs font-bold px-3.5 py-2.5 rounded-full shadow-neon">Agendar</button>
          <button className="w-10 h-10 rounded-full border border-white/15 bg-white/5 text-white flex items-center justify-center" onClick={() => setOpen(!open)} aria-label="Abrir menu">
            <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <>
        <button aria-label="Fechar menu" onClick={() => setOpen(false)} className="md:hidden fixed inset-0 top-[68px] bg-black/45 backdrop-blur-sm" />
        <div className="md:hidden absolute top-full inset-x-3 z-10 rounded-2xl bg-brand-dark2/95 backdrop-blur-xl border border-white/10 p-3 shadow-2xl">
          <p className="px-3 pt-2 pb-3 text-[10px] font-semibold uppercase tracking-[.2em] text-brand-green">Menu principal</p>
          <div className="border-y border-white/10">
          {links.map(([label, fn]) => (
            <button key={label} onClick={() => { fn(); setOpen(false) }} className="w-full flex items-center gap-3 text-white/80 hover:text-brand-green text-sm font-medium text-left px-3 py-3 border-b last:border-b-0 border-white/10 hover:bg-white/5">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-4 h-4 text-brand-green"><path d={iconPaths[label]} strokeLinecap="round" strokeLinejoin="round" /></svg>{label}
            </button>
          ))}
          <Link to="/sobre" onClick={() => setOpen(false)} className="flex items-center gap-3 text-white/80 text-sm font-medium text-left px-3 py-3 hover:bg-white/5"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-4 h-4 text-brand-green"><path d={iconPaths.Sobre} strokeLinecap="round" strokeLinejoin="round" /></svg>Sobre</Link>
          </div>
          <Link to="/admin/login" onClick={() => setOpen(false)} className="mx-auto mt-2 flex w-[62%] flex-col items-center gap-2 rounded-2xl border border-brand-green/35 bg-brand-green/10 px-3 py-4 text-brand-green text-sm font-semibold"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5"><path d="M4 20v-2a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v2" /><circle cx="12" cy="7" r="4" /></svg>Área Privada</Link>
        </div>
        </>
      )}
    </header>
  )
}
