import Reveal from './Reveal'

export default function Facilities() {
  return (
    <section className="bg-brand-dark px-5 py-16 md:py-28 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-8 md:mb-12">
          <div>
            <p className="text-brand-green text-xs uppercase tracking-[.25em] font-semibold mb-3">O nosso espaço</p>
            <h2 className="text-white text-3xl md:text-5xl font-bold tracking-[-.04em]">Chegar, cuidar,<br /><span className="text-brand-green text-neon">esperar com conforto.</span></h2>
          </div>
          <p className="text-white/55 text-sm max-w-sm leading-relaxed">Um espaço pensado para receber bem o seu carro — e para que a sua espera seja tão tranquila quanto o resultado final.</p>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          <Reveal className="group rounded-[1.75rem] overflow-hidden border border-white/10 bg-brand-dark2">
            <div className="h-56 md:h-[340px] overflow-hidden"><img src="./images/instalacoes-carwash-loule.jpeg" alt="Área de lavagem da Carwash Loulé" className="w-full h-full object-cover object-left group-hover:scale-105 transition-transform duration-700" /></div>
            <div className="p-5 md:p-6"><p className="text-brand-green text-xs font-semibold tracking-[.2em] uppercase">01 · Lavagem</p><h3 className="mt-2 text-white text-xl font-semibold">Área de cuidado automóvel</h3><p className="mt-2 text-white/50 text-sm">Preparação, lavagem e acabamento num espaço desenhado para cada detalhe.</p></div>
          </Reveal>
          <Reveal delay={120} className="group rounded-[1.75rem] overflow-hidden border border-white/10 bg-brand-dark2">
            <div className="h-56 md:h-[340px] overflow-hidden"><img src="./images/instalacoes-carwash-loule.jpeg" alt="Zona de espera da Carwash Loulé" className="w-full h-full object-cover object-[64%_center] group-hover:scale-105 transition-transform duration-700" /></div>
            <div className="p-5 md:p-6"><p className="text-brand-green text-xs font-semibold tracking-[.2em] uppercase">02 · Espera</p><h3 className="mt-2 text-white text-xl font-semibold">Um momento só seu</h3><p className="mt-2 text-white/50 text-sm">Uma zona acolhedora para esperar enquanto a sua viatura recebe a atenção certa.</p></div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
