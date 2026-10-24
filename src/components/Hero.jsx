import { DropletIcon } from './icons'

export default function Hero({ onAgendar, onServices }) {
  return (
    <section id="inicio" className="relative pt-24 pb-10 sm:pb-16 px-5 overflow-hidden bg-[#101211] min-h-[660px] lg:min-h-[760px] flex items-center">
      <div
        className="grid-glow absolute inset-0 opacity-35"
      />
      <div className="noise-overlay absolute inset-0 opacity-[0.07]" />
      <div className="absolute -right-32 top-1/4 w-[34rem] h-[34rem] rounded-full bg-brand-green/15 blur-[120px]" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <DropletIcon
          key={i}
          className="droplet-anim absolute top-0 text-brand-green/30 w-3 h-3"
          style={{ left: `${7 + i * 17}%`, animationDelay: `${i * 0.55}s`, '--drop-distance': '44vh' }}
        />
      ))}
      <div className="relative mx-auto grid w-full max-w-[1380px] grid-cols-1 items-center gap-8 lg:grid-cols-[.85fr_1.15fr]">
        <div className="text-center lg:text-left z-10">
          <span className="inline-flex items-center gap-2 text-brand-green text-xs tracking-[0.25em] uppercase mb-6 border border-brand-green/30 bg-brand-green/5 px-3 py-2 rounded-full"><span className="w-1.5 h-1.5 bg-brand-green rounded-full animate-pulse" />Loulé · Algarve</span>
          <h1 className="text-white text-4xl sm:text-6xl md:text-7xl font-bold tracking-[-0.055em] leading-[.95]">
            O seu carro,<br />
            <span className="text-brand-green">sempre impecável.</span>
          </h1>
          <p className="hidden sm:block text-white/60 mt-7 md:text-lg max-w-lg mx-auto lg:mx-0">
          Sem cadastro, sem complicação. Escolha o serviço, a data e a hora — pronto.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center lg:justify-start">
          <button onClick={onAgendar} className="bg-brand-green text-black font-semibold px-7 py-4 rounded-full shadow-neon hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(46,255,107,.6)] transition-all duration-300">
            Agendar Agora
          </button>
          <button onClick={onServices} className="border border-white/20 text-white px-7 py-4 rounded-full hover:border-brand-green/70 hover:text-brand-green transition-all duration-300">
            Ver Serviços
          </button>
          </div>
          <div className="hidden sm:flex mt-12 items-center justify-center lg:justify-start gap-3 text-white/45 text-sm"><span className="w-9 h-px bg-brand-green" />Escolha a data e o horário que preferir</div>
        </div>
        <div className="relative h-52 sm:h-64 lg:h-[500px]">
          <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden border border-white/10 bg-brand-dark2 shadow-2xl shadow-black/50">
            <img src="https://images.pexels.com/photos/16505291/pexels-photo-16505291.jpeg?auto=compress&cs=tinysrgb&w=1800" alt="Carro preto em perspetiva" className="w-full h-full object-cover object-center opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/25 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/75 via-transparent to-transparent" />
          </div>
          <div className="absolute -bottom-3 left-3 lg:-bottom-5 lg:-left-5 bg-brand-green text-black rounded-2xl px-4 py-3 lg:px-5 lg:py-4 shadow-neon"><span className="block font-bold text-base lg:text-xl">Cuidado ao detalhe</span><span className="text-xs font-medium">Interior · exterior · acabamento</span></div>
        </div>
      </div>
    </section>
  )
}
