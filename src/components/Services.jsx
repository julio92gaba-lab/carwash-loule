import Reveal from './Reveal'
import { DropletIcon } from './icons'
import { services } from '../lib/demoContent'

export default function Services() {
  const scrollToBooking = () => document.getElementById('agendar')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="servicos" className="bg-brand-dark2 py-28 px-5 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
          <p className="text-brand-green text-xs uppercase tracking-[.25em] font-semibold mb-3">Escolha o seu cuidado</p>
          <h2 className="text-white text-2xl md:text-4xl font-bold">
            Serviços feitos<br className="hidden md:block" /> para <span className="text-brand-green text-neon">brilhar.</span>
          </h2>
          </div><p className="text-white/50 text-sm max-w-xs">Escolha o nível de cuidado certo para o seu veículo.</p>
        </Reveal>
          <div className="mt-12 grid md:grid-cols-3 gap-5">
            {services.map((s, i) => {
              return (
                <Reveal key={s.id} delay={i * 120}>
                  <button
                    onClick={scrollToBooking}
                    className={`w-full text-left relative bg-brand-dark3 border rounded-[1.75rem] p-7 hover:-translate-y-2 hover:border-brand-green/60 hover:shadow-neon transition-all duration-300 h-full group ${s.featured ? 'border-brand-green/50' : 'border-white/10'}`}
                  >
                    {s.featured && <span className="absolute -top-3 left-7 text-[10px] uppercase tracking-[.15em] bg-brand-green text-black px-3 py-1.5 rounded-full font-bold">Mais procurada</span>}
                    <div className="w-11 h-11 rounded-xl bg-brand-green/10 text-brand-green flex items-center justify-center mb-8 group-hover:bg-brand-green group-hover:text-black transition-all duration-300"><DropletIcon className="w-5 h-5" /></div>
                    <h3 className="text-white font-semibold text-xl flex items-center gap-2">
                      <DropletIcon className="w-4 h-4" />
                      {s.label}
                    </h3>
                    <p className="text-white/50 text-sm mt-3 leading-relaxed">{s.description}</p>
                    <div className="mt-8 pt-5 border-t border-white/10 flex items-end justify-between"><div><div className="text-white/40 text-xs">a partir de</div><div className="text-white text-3xl font-bold mt-1">{s.price} €</div></div><div className="text-brand-green text-sm font-medium">{s.duration}<br /><span className="inline-block mt-2 group-hover:translate-x-1 transition-transform">Agendar →</span></div></div>
                  </button>
                </Reveal>
              )
            })}
          </div>
      </div>
    </section>
  )
}
