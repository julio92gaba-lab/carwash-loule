import { useEffect, useState } from 'react'
import {
  fetchCompanyVehicles,
  addCompanyVehicle,
  deleteCompanyVehicle,
  fetchCompanyBookings,
  markBookingPaid,
  deleteCompany,
} from '../../../lib/queries/companies'
import StatusBadge from '../StatusBadge'

function isCurrentMonth(dateStr) {
  const d = new Date(dateStr)
  const now = new Date()
  return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
}

export default function CompanyDetail({ company, onBack, onEdit, onDeleted }) {
  const [vehicles, setVehicles] = useState([])
  const [bookings, setBookings] = useState([])
  const [plate, setPlate] = useState('')
  const [label, setLabel] = useState('')
  const [loading, setLoading] = useState(true)

  function load() {
    setLoading(true)
    Promise.all([fetchCompanyVehicles(company.id), fetchCompanyBookings(company.id)]).then(([v, b]) => {
      setVehicles(v)
      setBookings(b)
      setLoading(false)
    })
  }

  useEffect(load, [company.id])

  async function handleAddVehicle(e) {
    e.preventDefault()
    if (!plate) return
    await addCompanyVehicle(company.id, plate.toUpperCase(), label)
    setPlate('')
    setLabel('')
    load()
  }

  async function handleTogglePaid(id, current) {
    await markBookingPaid(id, !current)
    load()
  }

  async function handleDelete() {
    if (!confirm(`Eliminar a empresa ${company.name}?`)) return
    await deleteCompany(company.id)
    onDeleted()
  }

  if (loading) return <p className="text-gray-400 text-sm">A carregar...</p>

  const monthBookings = bookings.filter((b) => isCurrentMonth(b.booking_date) && b.status === 'concluido')
  const monthTotal = monthBookings.reduce((sum, b) => sum + (b.price_cents || 0), 0) / 100
  const pendingTotal = bookings
    .filter((b) => b.status === 'concluido' && !b.paid)
    .reduce((sum, b) => sum + (b.price_cents || 0), 0) / 100
  const washCount = bookings.filter((b) => b.status === 'concluido').length

  return (
    <div>
      <button onClick={onBack} className="text-sm text-gray-500 hover:text-gray-900 mb-4">← Voltar</button>

      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold">{company.name}</h2>
          <p className="text-sm text-gray-500 mt-0.5">{company.contact_phone} {company.contact_email ? `· ${company.contact_email}` : ''}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => onEdit(company)} className="text-sm border border-gray-300 rounded-md px-3 py-1.5 hover:bg-gray-50">Editar</button>
          <button onClick={handleDelete} className="text-sm border border-red-200 text-red-600 rounded-md px-3 py-1.5 hover:bg-red-50">Eliminar</button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="text-gray-400 text-xs uppercase tracking-wide">Lavagens realizadas</div>
          <div className="text-2xl font-semibold mt-1">{washCount}</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="text-gray-400 text-xs uppercase tracking-wide">Total este mês</div>
          <div className="text-2xl font-semibold mt-1">{monthTotal.toFixed(2)} €</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="text-gray-400 text-xs uppercase tracking-wide">Pendente de pagamento</div>
          <div className="text-2xl font-semibold mt-1 text-red-600">{pendingTotal.toFixed(2)} €</div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6">
        <div className="font-medium text-sm mb-3">Veículos associados</div>
        <div className="flex flex-wrap gap-2 mb-3">
          {vehicles.map((v) => (
            <span key={v.id} className="text-xs bg-gray-100 rounded-md px-2 py-1 flex items-center gap-2">
              {v.plate}{v.label ? ` · ${v.label}` : ''}
              <button onClick={() => deleteCompanyVehicle(v.id).then(load)} className="text-gray-400 hover:text-red-500">✕</button>
            </span>
          ))}
          {vehicles.length === 0 && <p className="text-gray-400 text-xs">Nenhum veículo associado.</p>}
        </div>
        <form onSubmit={handleAddVehicle} className="flex gap-2">
          <input value={plate} onChange={(e) => setPlate(e.target.value)} placeholder="Matrícula" className="border border-gray-300 rounded-md px-2 py-1.5 text-sm w-32 uppercase" />
          <input value={label} onChange={(e) => setLabel(e.target.value)} placeholder="Descrição (opcional)" className="border border-gray-300 rounded-md px-2 py-1.5 text-sm flex-1" />
          <button type="submit" className="bg-gray-900 text-white text-sm px-3 py-1.5 rounded-md">Adicionar</button>
        </form>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl">
        <div className="px-4 py-3 border-b border-gray-100 font-medium text-sm">Histórico de serviços</div>
        {bookings.length === 0 ? (
          <p className="text-gray-400 text-sm p-4">Sem histórico.</p>
        ) : (
          <div className="divide-y divide-gray-100">
            {bookings.map((b) => (
              <div key={b.id} className="flex items-center justify-between px-4 py-3 text-sm">
                <div>
                  <div className="font-medium">{b.booking_date} · {b.start_time.slice(0, 5)}</div>
                  <div className="text-gray-400 text-xs mt-0.5">{b.vehicle.label} · {b.service.label} · {b.plate}</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium">{(b.price_cents / 100).toFixed(2)} €</span>
                  <StatusBadge status={b.status} />
                  {b.status === 'concluido' && (
                    <button
                      onClick={() => handleTogglePaid(b.id, b.paid)}
                      className={`text-xs px-2 py-1 rounded-md ${b.paid ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                    >
                      {b.paid ? 'Pago' : 'Marcar pago'}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
