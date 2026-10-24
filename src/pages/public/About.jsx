import { Link } from 'react-router-dom'
import Logo from '../../components/Logo'
import Footer from '../../components/Footer'

export default function About() {
  return (
    <div className="min-h-screen bg-brand-dark text-white">
      <header className="border-b border-white/10 bg-brand-dark/90 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-5 h-[76px] flex items-center justify-between">
          <Link to="/"><Logo size="sm" /></Link>
          <Link to="/" className="rounded-full border border-white/15 px-5 py-2.5 text-sm text-white/80 hover:border-brand-green hover:text-brand-green transition-all duration-300">Voltar à página inicial</Link>
        </div>
      </header>
      <main className="relative overflow-hidden">
        <div className="grid-glow absolute inset-0 opacity-35" />
        <div className="relative max-w-5xl mx-auto px-5 py-20 md:py-28">
          <p className="text-brand-green text-xs font-semibold tracking-[.25em] uppercase">Sobre nós</p>
          <h1 className="mt-5 max-w-3xl text-4xl md:text-6xl font-bold tracking-[-.05em] leading-[.98]">Cuidado automóvel feito com <span className="text-brand-green text-neon">tempo e rigor.</span></h1>
          <div className="mt-14 grid md:grid-cols-[1.2fr_.8fr] gap-6">
            <article className="rounded-[2rem] border border-white/10 bg-brand-dark2/90 p-7 md:p-9 text-white/65 leading-relaxed space-y-5">
              <p>Na Carwash Loulé, cada veículo recebe uma abordagem cuidada — do exterior ao interior, dos pormenores visíveis aos que fazem toda a diferença no dia a dia.</p>
              <p>Trabalhamos para tornar a lavagem automóvel simples, transparente e confortável: escolha o serviço, encontre o horário certo e entregue o seu carro a uma equipa atenta ao acabamento.</p>
              <p>Este texto é provisório e será ajustado com a história, os métodos e a linguagem próprios da loja.</p>
            </article>
            <aside className="rounded-[2rem] border border-brand-green/25 bg-brand-green/10 p-7 md:p-9 flex flex-col justify-between">
              <div><span className="text-brand-green text-sm font-semibold">O nosso foco</span><p className="mt-4 text-2xl font-semibold leading-tight">Mais brilho, mais cuidado, menos complicação.</p></div>
              <Link to="/" className="mt-10 inline-flex w-fit rounded-full bg-brand-green px-5 py-3 text-sm font-semibold text-black transition-all duration-300 hover:shadow-neon">Ver serviços</Link>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
