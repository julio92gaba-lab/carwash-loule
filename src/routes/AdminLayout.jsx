import { NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../lib/auth'

const menuItems = [
  { to: '/admin', label: 'Visão Geral', end: true },
  { to: '/admin/agenda', label: 'Agenda' },
  { to: '/admin/clientes', label: 'Clientes' },
  { to: '/admin/financeiro', label: 'Financeiro' },
  { to: '/admin/stock', label: 'Stock' },
  { to: '/admin/galeria', label: 'Galeria' },
  { to: '/admin/definicoes', label: 'Definições' },
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
          <nav className="flex flex-col gap-1 flex-1">
            {menuItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                    isActive ? 'bg-brand-green text-black' : 'text-white/55 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="border-t border-white/10 pt-4 mt-3">
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
