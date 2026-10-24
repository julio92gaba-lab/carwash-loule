import { useState } from 'react'
import Reveal from './Reveal'
const photos = [
  { src: 'https://images.pexels.com/photos/6872172/pexels-photo-6872172.jpeg?auto=compress&cs=tinysrgb&w=1200', alt: 'Carro a ser lavado com espuma' },
  { src: 'https://images.pexels.com/photos/10446284/pexels-photo-10446284.jpeg?auto=compress&cs=tinysrgb&w=900', alt: 'Carro numa lavagem automática' },
  { src: 'https://images.pexels.com/photos/5693653/pexels-photo-5693653.jpeg?auto=compress&cs=tinysrgb&w=900', alt: 'Detalhe de carro com espuma' },
  { src: 'https://images.pexels.com/photos/6526349/pexels-photo-6526349.jpeg?auto=compress&cs=tinysrgb&w=900', alt: 'Carro preto numa lavagem' },
  { src: 'https://images.pexels.com/photos/16505291/pexels-photo-16505291.jpeg?auto=compress&cs=tinysrgb&w=900', alt: 'Carro desportivo a ser lavado' },
  { src: 'https://images.pexels.com/photos/33093191/pexels-photo-33093191.jpeg?auto=compress&cs=tinysrgb&w=1200', alt: 'Lavagem de carro ao ar livre' },
  { src: 'https://images.pexels.com/photos/33529540/pexels-photo-33529540.jpeg?auto=compress&cs=tinysrgb&w=900', alt: 'Carro prateado numa lavagem profissional' },
]

export default function Gallery() {
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  return (
    <section id="galeria" className="bg-brand-dark py-16 md:py-28 px-5 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div><p className="text-brand-green text-xs uppercase tracking-[.25em] font-semibold mb-3">Antes e depois</p><h2 className="text-white text-3xl md:text-5xl font-bold tracking-[-.04em]">Resultados que<br /><span className="text-brand-green text-neon">falam por si.</span></h2></div>
          <p className="text-white/45 text-sm max-w-xs">Veja de perto o cuidado aplicado a cada veículo.</p>
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-4 md:grid-rows-[190px_190px] gap-4">
          {photos.map((photo, i) => (
            <Reveal
              key={photo.src}
              delay={i * 80}
              className={`group relative min-h-[150px] md:min-h-0 rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-brand-dark3 to-brand-dark2 flex items-center justify-center cursor-pointer ${i === 0 ? 'md:row-span-2' : ''}`}
            >
              <button type="button" aria-label={`Ampliar ${photo.alt}`} onClick={() => setSelectedPhoto(photo)} className="absolute inset-0 z-10" />
              <img src={photo.src} alt={photo.alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover grayscale-[.2] group-hover:scale-110 group-hover:grayscale-0 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/5 group-hover:from-black/35 transition-all duration-500" />
              <span className="absolute bottom-4 left-4 text-white/80 text-xs tracking-widest">0{i + 1}</span>
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </Reveal>
          ))}
        </div>
      </div>
      {selectedPhoto && <div className="fixed inset-0 z-[70] bg-black/90 backdrop-blur-md p-5 flex items-center justify-center animate-page-in" role="dialog" aria-modal="true" aria-label={selectedPhoto.alt} onClick={() => setSelectedPhoto(null)}><button type="button" className="absolute top-5 right-5 w-11 h-11 rounded-full border border-white/25 bg-black/50 text-white text-2xl" aria-label="Fechar imagem">×</button><img src={selectedPhoto.src} alt={selectedPhoto.alt} className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl" onClick={(event) => event.stopPropagation()} /></div>}
    </section>
  )
}
