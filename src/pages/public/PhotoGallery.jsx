import { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../components/Logo'
import { galleryPhotos } from '../../lib/galleryPhotos'

export default function PhotoGallery() {
  const [selected, setSelected] = useState(null)
  return <main className="min-h-screen bg-brand-dark px-5 pb-16 pt-8 text-white sm:px-8 lg:px-14">
    <header className="mx-auto flex max-w-6xl items-center justify-between border-b border-white/10 pb-6"><Logo /><Link to="/" className="inline-flex items-center gap-2 text-sm text-white/65 transition hover:text-brand-green"><span aria-hidden="true">←</span>Voltar ao início</Link></header>
    <section className="mx-auto max-w-6xl py-14 lg:py-20"><p className="text-brand-green text-xs font-semibold uppercase tracking-[.22em]">Galeria</p><h1 className="mt-4 max-w-2xl text-4xl font-bold leading-tight tracking-[-.04em] sm:text-5xl">Cuidado que se vê em cada detalhe.</h1><p className="mt-5 max-w-xl leading-7 text-white/60">Veja alguns dos resultados e abra qualquer fotografia para observar com mais detalhe.</p><div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">{galleryPhotos.map((photo, index) => <button key={photo.src} type="button" onClick={() => setSelected(index)} className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-white/5 text-left focus:outline-none focus:ring-2 focus:ring-brand-green" aria-label={`Abrir ${photo.alt}`}><img src={photo.src} alt={photo.alt} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /><span className="absolute inset-0 bg-black/0 transition group-hover:bg-black/20" /></button>)}</div></section>
    {selected !== null && <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4" role="dialog" aria-modal="true" onClick={() => setSelected(null)}><button type="button" className="absolute right-5 top-5 rounded-full bg-white/10 px-4 py-2 text-xl text-white transition hover:bg-white/20" onClick={() => setSelected(null)} aria-label="Fechar fotografia">×</button><img src={galleryPhotos[selected].src} alt={galleryPhotos[selected].alt} className="max-h-[88vh] max-w-full rounded-xl object-contain" onClick={(event) => event.stopPropagation()} /></div>}
  </main>
}
