import { Link, NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../lib/auth'

const menuGroups = [
  { label: 'Operação', items: [{ to: '/admin', label: 'Visão geral', end: true }, { to: '/admin/agenda', label: 'Agenda' }, { to: '/admin/financeiro', label: 'Financeiro' }] },
  { label: 'Gestão', items: [{ to: '/admin/clientes', label: 'Clientes' }, { to: '/admin/stock', label: 'Stock' }] },
  { label: 'Conteúdo do site', items: [{ to: '/admin/galeria', label: 'Galeria' }] },
  { label: 'Sistema', items: [{ to: '/admin/definicoes', label: 'Definições' }] },
]

export default function AdminLayout() {
  const { session, signOut } = useAuth()

  return (
    <div className="min-h-screen bg-brand-dark text-white">
      <div className="md:hidden bg-amber-50 text-amber-800 text-xs text-center py-2 px-4 border-b border-amber-200">
        Este painel foi desenhado para computador. Alguns ecrãs podem não ficar bem num telemóvel.
      </div>

      <div className="flex">
        <aside className="w-64 shrink-0 border-r border-white/10 bg-brand-dark2 p-5 flex flex-col min-h-screen">
          <div className="text-brand-green text-lg font-semibold mb-10">Carwash <span className="text-white font-normal">Loulé</span></div>
          <nav className="flex flex-col gap-6 flex-1">
            {menuGroups.map((group) => <div key={group.label}><p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-[.18em] text-white/30">{group.label}</p><div className="flex flex-col gap-1">{group.items.map((item) => <NavLink key={item.to} to={item.to} end={item.end} className={({ isActive }) => `px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${isActive ? 'bg-brand-green text-black' : 'text-white/55 hover:bg-white/5 hover:text-white'}`}>{item.label}</NavLink>)}</div></div>)}
          </nav>
          <div className="border-t border-white/10 pt-4 mt-3">
            <Link to="/" className="mb-4 flex items-center gap-3 rounded-xl border border-white/10 bg-white/[.03] px-3 py-3 text-sm font-medium text-white/75 transition hover:border-brand-green/50 hover:text-brand-green"><img src="./favicon.svg" alt="" className="h-6 w-6" />Ver página pública <span className="ml-auto text-brand-green">↗</span></Link>
            <div className="text-xs text-white/35 truncate mb-3">{session?.user?.email}</div>
            <button
              onClick={signOut}
              className="text-sm text-white/55 hover:text-brand-green text-left transition-all duration-300"
            >
              Terminar sessão
            </button>
          </div>
        </aside>
        <main className="flex-1 p-6 md:p-10 bg-[radial-gradient(circle_at_top_right,rgba(46,255,107,.06),transparent_26rem)]">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
