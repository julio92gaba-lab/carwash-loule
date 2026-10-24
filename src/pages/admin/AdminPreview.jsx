import { useState } from 'react'
import { Link } from 'react-router-dom'

const pageInfo = {
  'Visão geral': ['Visão geral', 'Acompanhe o essencial da operação num só lugar.'],
  Agenda: ['Agenda', 'Os próximos agendamentos aparecerão aqui por ordem de data e hora.'],
  Clientes: ['Clientes', 'Os clientes e os respetivos veículos ficarão disponíveis nesta área.'],
  Financeiro: ['Financeiro', 'Acompanhe receitas e despesas numa só vista.'],
  Stock: ['Stock', 'Controle os produtos de limpeza e os avisos de reposição.'],
  Galeria: ['Galeria', 'Gira as fotografias que podem aparecer na galeria pública.'],
  Definições: ['Definições', 'Personalize os dados e as regras de funcionamento da loja.'],
}

export default function AdminPreview({ page }) {
  const [showRevenue, setShowRevenue] = useState(false)
  const [title, subtitle] = pageInfo[page]
  const isDashboard = page === 'Visão geral'
  const isSettings = page === 'Definições'

  return <div className="max-w-6xl mx-auto animate-page-in">
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
      <div><p className="text-brand-green text-xs tracking-[0.22em] uppercase font-semibold">Área privada</p><h1 className="text-white text-3xl font-semibold mt-2">{title}</h1><p className="text-white/45 text-sm mt-1">{subtitle}</p></div>
      {isDashboard && <Link to="/admin/agenda" className="bg-brand-green text-black rounded-full px-5 py-3 text-sm font-semibold transition-all duration-300 hover:shadow-neon hover:-translate-y-0.5">Ver agenda</Link>}
    </div>

    {isSettings && <div className="mb-6 overflow-x-auto"><div className="inline-flex min-w-max gap-2 rounded-2xl border border-white/10 bg-white/[.03] p-2">{['Horários', 'Serviços e valores', 'Produtos', 'Contactos', 'Informações da loja'].map((item, index) => <button key={item} type="button" className={`rounded-xl px-4 py-2.5 text-sm font-medium transition ${index === 0 ? 'bg-brand-green text-black' : 'text-white/55 hover:bg-white/5 hover:text-white'}`}>{item}</button>)}</div></div>}
    {isDashboard ? <>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="admin-card p-6"><div className="flex items-start justify-between gap-4"><div><p className="text-white font-medium">Faturação</p><p className="text-white/45 text-sm mt-2">Os valores ficam ocultos por predefinição.</p></div><button type="button" onClick={() => setShowRevenue(!showRevenue)} className="rounded-xl border border-white/10 px-3 py-2 text-white/65 transition hover:border-brand-green hover:text-brand-green" aria-label={showRevenue ? 'Ocultar faturação' : 'Mostrar faturação'}>{showRevenue ? '◉' : '○'}</button></div><p className="mt-7 text-2xl font-semibold text-brand-green">{showRevenue ? 'Sem registos ainda' : '••••••'}</p></div>
        <Link to="/admin/stock" className="admin-card p-6 transition hover:border-brand-green/40"><div className="flex items-start justify-between gap-4"><div><p className="text-white font-medium">Produtos a repor</p><p className="text-white/45 text-sm mt-2">Acompanhe os avisos e consulte o stock.</p></div><span className="text-xl text-brand-green" aria-hidden="true">□</span></div><p className="mt-7 text-sm font-semibold text-brand-green">Gerir stock →</p></Link>
      </div>
      <div className="admin-card mt-6 overflow-hidden"><div className="px-5 py-4 border-b border-white/8 flex items-center justify-between"><span className="text-white font-medium">Próximos agendamentos</span><Link to="/admin/agenda" className="text-brand-green text-sm font-medium hover:text-white transition">Ver agenda →</Link></div><div className="px-6 py-12 text-center"><p className="text-white/70 font-medium">Ainda não existem próximos agendamentos.</p><p className="text-white/40 text-sm mt-2">Quando houver reservas, verá aqui até 10 marcações por ordem de proximidade.</p></div></div>
    </> : <div className="admin-card p-6 min-h-[360px] flex flex-col justify-center items-center text-center"><div className="w-14 h-14 rounded-2xl bg-brand-green/10 border border-brand-green/25 text-brand-green flex items-center justify-center text-2xl mb-5">✦</div><h2 className="text-white text-xl font-semibold">Sem registos ainda</h2><p className="text-white/45 text-sm max-w-md mt-3">Esta área ficará preenchida assim que os primeiros dados forem adicionados ao sistema.</p></div>}
  </div>
}
