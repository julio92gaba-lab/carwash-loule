import { useState } from 'react'
import { Link } from 'react-router-dom'
import Reveal from './Reveal'
import { galleryPhotos as photos } from '../lib/galleryPhotos'

export default function Gallery() {
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  return (
    <section id="galeria" className="bg-brand-dark py-16 md:py-28 px-5 overflow-hidden">
      <div className="mx-auto w-full max-w-[1380px]">
        <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div><p className="text-brand-green text-xs uppercase tracking-[.25em] font-semibold mb-3">Antes e depois</p><h2 className="text-white text-3xl md:text-5xl font-bold tracking-[-.04em]">Resultados que<br /><span className="text-brand-green text-neon">falam por si.</span></h2></div>
          <div><p className="text-white/45 text-sm max-w-xs">Veja de perto o cuidado aplicado a cada veículo.</p><Link to="/galeria" className="inline-flex mt-4 text-sm font-semibold text-brand-green transition hover:text-white">Ver galeria completa →</Link></div>
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-4 md:grid-rows-[190px_190px] gap-4">
          {photos.map((photo, i) => (
            <Reveal
              key={photo.src}
              delay={i * 80}
              className={`group relative min-h-[150px] md:min-h-0 rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-brand-dark3 to-brand-dark2 flex items-center justify-center cursor-pointer ${i === 0 ? 'md:row-span-2' : ''} ${i === photos.length - 1 ? 'col-span-2 md:col-span-1' : ''}`}
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
