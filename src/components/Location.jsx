import Reveal from './Reveal'

export default function Location() {
  const mapQuery = 'Av. Manuel Maria Laginha, 8100-231 Loulé'
  return (
    <section id="localizacao" className="bg-brand-dark2 py-28 px-5">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-start">
        <Reveal>
          <p className="text-brand-green text-xs uppercase tracking-[.25em] font-semibold mb-3">Visite-nos</p>
          <h2 className="text-white text-3xl md:text-5xl font-bold tracking-[-.04em] mb-7">
            Localização & <span className="text-brand-green">Horário</span>
          </h2>
          <div className="space-y-5 text-white/70 border-l border-white/10 pl-5">
            <div>
              <div className="text-brand-green text-sm font-semibold uppercase tracking-wide">Morada</div>
              <p>Av. Manuel Maria Laginha, 8100-231 Loulé<br />(saída para Goldra, junto ao Continente)</p>
            </div>
            <div>
              <div className="text-brand-green text-sm font-semibold uppercase tracking-wide">Horário</div>
              <p>Segunda a sexta: 09:00 – 19:00<br />Sábado: 09:00 – 17:00<br />Domingo: encerrado</p>
            </div>
            <div>
              <div className="text-brand-green text-sm font-semibold uppercase tracking-wide">Contactos</div>
              <p>+351 933 551 790<br />contacto@carwashloule.pt</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 mt-6">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`}
              target="_blank" rel="noreferrer"
              className="border-2 border-white/20 text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:border-white/50 transition"
            >
              Abrir no Google Maps
            </a>
            <a
              href="https://wa.me/351933551790" target="_blank" rel="noreferrer"
              className="bg-brand-green text-black text-sm font-semibold px-5 py-2.5 rounded-full shadow-neon hover:brightness-110 transition"
            >
              Chamar no WhatsApp
            </a>
          </div>
        </Reveal>
        <Reveal delay={150} className="rounded-[1.5rem] overflow-hidden border border-white/10 aspect-[4/3] shadow-2xl shadow-black/25">
          <iframe title="Mapa" className="w-full h-full" src={`https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`} loading="lazy" />
        </Reveal>
      </div>
    </section>
  )
}
