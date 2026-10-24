const pageInfo = {
  'Visão geral': ['Hoje no Carwash', 'Uma leitura rápida da operação do dia.'],
  Agenda: ['Agenda', 'Organize os próximos atendimentos com clareza.'],
  Clientes: ['Clientes', 'Consulte os clientes e veículos registados.'],
  Financeiro: ['Financeiro', 'Acompanhe receitas e despesas numa só vista.'],
  Stock: ['Stock', 'Veja os produtos que precisam de reposição.'],
  Definições: ['Definições', 'Personalize os dados e regras do negócio.'],
}

const bookings = [
  ['09:00', 'Marta Silva', 'Lavagem Completa', 'Confirmado'],
  ['11:30', 'João Costa', 'Lavagem Express', 'Em curso'],
  ['15:00', 'Ana Duarte', 'Detalhe Premium', 'Confirmado'],
]

export default function AdminPreview({ page }) {
  const [title, subtitle] = pageInfo[page]
  const isDashboard = page === 'Visão geral'

  return (
    <div className="max-w-6xl mx-auto animate-page-in">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <p className="text-brand-green text-xs tracking-[0.22em] uppercase font-semibold">Modo de demonstração</p>
          <h1 className="text-white text-3xl font-semibold mt-2">{title}</h1>
          <p className="text-white/45 text-sm mt-1">{subtitle}</p>
        </div>
        <button className="bg-brand-green text-black rounded-full px-5 py-3 text-sm font-semibold transition-all duration-300 hover:shadow-neon hover:-translate-y-0.5">
          {page === 'Agenda' ? 'Novo agendamento' : 'Ver detalhes'}
        </button>
      </div>

      {isDashboard ? (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[
              ['08', 'Agendamentos hoje'], ['01', 'Em curso'], ['€ 214', 'Previsto para hoje'], ['02', 'Produtos a repor'],
            ].map(([value, label]) => (
              <div key={label} className="admin-card p-5">
                <div className="text-brand-green text-2xl font-semibold">{value}</div>
                <div className="text-white/45 text-xs mt-2 uppercase tracking-wider">{label}</div>
              </div>
            ))}
          </div>
          <div className="grid lg:grid-cols-[1.45fr_.8fr] gap-6">
            <div className="admin-card overflow-hidden">
              <div className="px-5 py-4 border-b border-white/8 flex justify-between"><span className="text-white font-medium">Agenda de hoje</span><span className="text-brand-green text-sm">Ver agenda →</span></div>
              <div className="divide-y divide-white/7">{bookings.map(([time, name, service, status]) => <div key={time} className="px-5 py-4 flex items-center gap-4"><span className="text-brand-green font-semibold text-sm">{time}</span><div className="flex-1"><p className="text-white text-sm font-medium">{name}</p><p className="text-white/40 text-xs mt-0.5">{service}</p></div><span className="text-[11px] bg-brand-green/10 text-brand-green border border-brand-green/20 rounded-full px-2.5 py-1">{status}</span></div>)}</div>
            </div>
            <div className="admin-card p-5"><p className="text-white font-medium">Capacidade</p><div className="relative h-28 mt-6 rounded-2xl overflow-hidden bg-brand-dark"><div className="absolute inset-x-0 bottom-0 h-[68%] bg-brand-green/20 border-t border-brand-green/40" /><div className="absolute bottom-3 left-4 text-brand-green text-3xl font-semibold">68%</div></div><p className="text-white/45 text-sm mt-4">Ainda tem horários livres para hoje.</p></div>
          </div>
        </>
      ) : (
        <div className="admin-card p-6 min-h-[360px] flex flex-col justify-center items-center text-center">
          <div className="w-14 h-14 rounded-2xl bg-brand-green/10 border border-brand-green/25 text-brand-green flex items-center justify-center text-2xl mb-5">✦</div>
          <h2 className="text-white text-xl font-semibold">Pré-visualização de {page.toLowerCase()}</h2>
          <p className="text-white/45 text-sm max-w-md mt-3">Esta área já está navegável para validar o desenho. Os dados reais, registos e ações serão ligados apenas na próxima fase.</p>
        </div>
      )}
    </div>
  )
}
