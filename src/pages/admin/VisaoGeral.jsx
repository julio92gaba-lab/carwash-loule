import { useEffect, useState } from 'react'
import { fetchTodayBookings } from '../../lib/queries/dashboard'
import { fetchSettings } from '../../lib/queries/settings'
import { getAvailableSlots } from '../../lib/availability'
import StatusBadge from '../../components/admin/StatusBadge'

function nowMinutes() {
  const now = new Date()
  return now.getHours() * 60 + now.getMinutes()
}

function toMinutes(hhmm) {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

export default function VisaoGeral() {
  const [bookings, setBookings] = useState([])
  const [settings, setSettings] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([fetchTodayBookings(), fetchSettings()]).then(([b, s]) => {
      setBookings(b)
      setSettings(s)
      setLoading(false)
    })
  }, [])

  if (loading) return <p className="text-gray-400 text-sm">A carregar...</p>

  const active = bookings.filter((b) => b.status === 'agendado' || b.status === 'em_curso')
  const emCurso = bookings.filter((b) => b.status === 'em_curso')
  const concluidos = bookings.filter((b) => b.status === 'concluido')
  const atrasados = bookings.filter(
    (b) => b.status === 'agendado' && toMinutes(b.start_time.slice(0, 5)) < nowMinutes()
  )

  const proximosSlots = getAvailableSlots({
    date: new Date(),
    durationMinutes: settings.slotIntervalMinutes,
    existingBookings: active.map((b) => ({ start: b.start_time.slice(0, 5), durationMinutes: b.duration_minutes })),
    businessHours: settings.businessHours,
    slotIntervalMinutes: settings.slotIntervalMinutes,
    simultaneousCapacity: settings.simultaneousCapacity,
  }).slice(0, 8)

  return (
    <div>
      <h1 className="text-xl font-semibold mb-6">Visão Geral</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="text-gray-400 text-xs uppercase tracking-wide">Agendamentos hoje</div>
          <div className="text-2xl font-semibold mt-1">{bookings.length}</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="text-gray-400 text-xs uppercase tracking-wide">Em curso</div>
          <div className="text-2xl font-semibold mt-1">{emCurso.length}</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="text-gray-400 text-xs uppercase tracking-wide">Concluídos</div>
          <div className="text-2xl font-semibold mt-1">{concluidos.length}</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="text-gray-400 text-xs uppercase tracking-wide">Capacidade simultânea</div>
          <div className="text-2xl font-semibold mt-1">{settings.simultaneousCapacity}</div>
        </div>
      </div>

      {atrasados.length > 0 && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mb-8 text-sm">
          <div className="font-medium mb-1">Avisos</div>
          {atrasados.map((b) => (
            <div key={b.id}>
              {b.start_time.slice(0, 5)} — {b.customer_name} ainda não foi iniciado.
            </div>
          ))}
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white border border-gray-200 rounded-xl">
          <div className="px-4 py-3 border-b border-gray-100 font-medium text-sm">Agendamentos do dia</div>
          {bookings.length === 0 ? (
            <p className="text-gray-400 text-sm p-4">Sem agendamentos para hoje.</p>
          ) : (
            <div className="divide-y divide-gray-100">
              {bookings.map((b) => (
                <div key={b.id} className="flex items-center justify-between px-4 py-3 text-sm">
                  <div>
                    <div className="font-medium">{b.start_time.slice(0, 5)} · {b.customer_name}</div>
                    <div className="text-gray-400 text-xs mt-0.5">
                      {b.vehicle.label} · {b.service.label} · {b.plate}
                    </div>
                  </div>
                  <StatusBadge status={b.status} />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="font-medium text-sm mb-3">Próximos horários livres</div>
          {proximosSlots.length === 0 ? (
            <p className="text-gray-400 text-sm">Sem vagas livres hoje.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {proximosSlots.map((s) => (
                <span key={s} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md">
                  {s}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
