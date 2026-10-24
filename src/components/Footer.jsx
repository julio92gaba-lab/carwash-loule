import { Link } from 'react-router-dom'
import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="bg-brand-dark border-t border-white/10 py-12 px-5">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <Logo size="sm" />
        <div className="text-white/50 text-sm text-center">
          <p>Av. Manuel Maria Laginha, 8100-231 Loulé</p>
          <p className="mt-1">Seg-Sex 09:00–19:00 · Sáb 09:00–17:00</p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4"><Link to="/sobre" className="text-white/40 hover:text-white text-xs transition-all duration-300">Sobre</Link><Link to="/privacidade" className="text-white/40 hover:text-white text-xs transition-all duration-300">Privacidade</Link><Link to="/admin/login" className="text-white/40 hover:text-white text-xs transition-all duration-300">Área privada</Link><a
          href="https://wa.me/351933551790" target="_blank" rel="noreferrer"
          className="border-2 border-brand-green text-brand-green text-sm font-semibold px-4 py-2 rounded-full hover:bg-brand-green hover:text-black transition"
        >
          WhatsApp
        </a></div>
      </div>
      <p className="text-white/30 text-xs text-center mt-8">© {new Date().getFullYear()} Carwash Loulé</p>
    </footer>
  )
}
