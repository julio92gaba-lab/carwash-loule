import { DropletIcon } from './icons'

export default function Hero({ onAgendar }) {
  return (
    <section id="inicio" className="relative pt-28 pb-16 px-5 overflow-hidden bg-brand-dark min-h-screen flex items-center">
      <div
        className="grid-glow absolute inset-0 opacity-60"
      />
      <div className="noise-overlay absolute inset-0 opacity-[0.07]" />
      <div className="absolute -right-32 top-1/4 w-[34rem] h-[34rem] rounded-full bg-brand-green/10 blur-[120px]" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <DropletIcon
          key={i}
          className="droplet-anim absolute top-0 text-brand-green/30 w-3 h-3"
          style={{ left: `${8 + i * 16}%`, animationDelay: `${i * 0.6}s` }}
        />
      ))}
      <div className="relative max-w-4xl w-full mx-auto text-center">
        <div>
          <span className="inline-flex items-center gap-2 text-brand-green text-xs tracking-[0.25em] uppercase mb-6 border border-brand-green/30 bg-brand-green/5 px-3 py-2 rounded-full"><span className="w-1.5 h-1.5 bg-brand-green rounded-full animate-pulse" />Loulé · Algarve</span>
          <h1 className="text-white text-5xl sm:text-6xl md:text-7xl font-bold tracking-[-0.055em] leading-[.95]">
            O seu carro,<br />
            <span className="text-brand-green text-neon">sempre impecável.</span>
          </h1>
          <p className="text-white/60 mt-7 md:text-lg max-w-lg mx-auto">
          Sem cadastro, sem complicação. Escolha o serviço, a data e a hora — pronto.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
          <button onClick={onAgendar} className="bg-brand-green text-black font-semibold px-7 py-4 rounded-full shadow-neon hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(46,255,107,.6)] transition-all duration-300">
            Agendar Agora
          </button>
          <a href="#servicos" className="border border-white/20 text-white px-7 py-4 rounded-full hover:border-brand-green/70 hover:text-brand-green transition-all duration-300">
            Ver Serviços
          </a>
          </div>
          <div className="mt-12 flex items-center justify-center gap-3 text-white/45 text-sm"><span className="w-9 h-px bg-brand-green" />Escolha a data e o horário que preferir</div>
        </div>
      </div>
    </section>
  )
}
