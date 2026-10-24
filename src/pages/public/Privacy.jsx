import { Link } from 'react-router-dom'
import Logo from '../../components/Logo'
import Footer from '../../components/Footer'

export default function Privacy() {
  return (
    <div className="min-h-screen bg-brand-dark text-white">
      <header className="border-b border-white/10 bg-brand-dark/90 backdrop-blur-xl"><div className="max-w-6xl mx-auto px-5 h-[76px] flex items-center justify-between"><Link to="/"><Logo size="sm" /></Link><Link to="/" className="rounded-full border border-white/15 px-5 py-2.5 text-sm text-white/80 hover:border-brand-green hover:text-brand-green transition-all duration-300">Voltar à página inicial</Link></div></header>
      <main className="relative overflow-hidden"><div className="grid-glow absolute inset-0 opacity-25" /><article className="relative max-w-3xl mx-auto px-5 py-20 md:py-28"><p className="text-brand-green text-xs font-semibold tracking-[.25em] uppercase">Informação legal</p><h1 className="mt-5 text-4xl md:text-6xl font-bold tracking-[-.05em]">Política de <span className="text-brand-green text-neon">privacidade.</span></h1><div className="mt-12 rounded-[2rem] border border-white/10 bg-brand-dark2/90 p-7 md:p-9 space-y-7 text-white/65 leading-relaxed"><p>Esta página apresenta a base da política de privacidade da Carwash Loulé e será revista antes do lançamento do sistema de marcações.</p><section><h2 className="text-white text-lg font-semibold mb-2">Dados recolhidos</h2><p>Quando realizar uma marcação, poderão ser recolhidos dados de contacto e dados necessários para identificar o serviço e a viatura.</p></section><section><h2 className="text-white text-lg font-semibold mb-2">Finalidade</h2><p>Os dados serão utilizados exclusivamente para gerir pedidos de marcação, comunicar consigo e melhorar o atendimento.</p></section><section><h2 className="text-white text-lg font-semibold mb-2">Contacto</h2><p>Para questões relacionadas com privacidade, utilize o contacto apresentado nesta página.</p></section></div></article></main>
      <Footer />
    </div>
  )
}
