import { useEffect, useState } from 'react'
import { fetchAvulsoBookings, groupByCustomer } from '../../../lib/queries/customers'
import StatusBadge from '../StatusBadge'

export default function AvulsoList() {
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState(null)

  useEffect(() => {
    fetchAvulsoBookings().then((rows) => {
      setCustomers(groupByCustomer(rows))
      setLoading(false)
    })
  }, [])

  if (loading) return <p className="text-gray-400 text-sm">A carregar...</p>
  if (customers.length === 0) return <p className="text-gray-400 text-sm">Ainda sem clientes avulsos.</p>

  return (
    <div className="bg-white border border-gray-200 rounded-xl divide-y divide-gray-100">
      {customers.map((c) => (
        <div key={c.phone}>
          <button
            onClick={() => setExpanded(expanded === c.phone ? null : c.phone)}
            className="w-full flex items-center justify-between px-4 py-3 text-sm text-left"
          >
            <div>
              <div className="font-medium">{c.name}</div>
              <div className="text-gray-400 text-xs mt-0.5">{c.phone} · {c.plates.join(', ')}</div>
            </div>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span>{c.visits} visita{c.visits > 1 ? 's' : ''}</span>
              <span>Última: {c.lastVisit}</span>
              <span>{expanded === c.phone ? '▲' : '▼'}</span>
            </div>
          </button>
          {expanded === c.phone && (
            <div className="px-4 pb-4">
              <div className="divide-y divide-gray-100 border border-gray-100 rounded-lg">
                {c.bookings.map((b) => (
                  <div key={b.id} className="flex items-center justify-between px-3 py-2 text-xs">
                    <span>{b.booking_date} · {b.start_time.slice(0, 5)} · {b.vehicle.label} · {b.service.label}</span>
                    <StatusBadge status={b.status} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
