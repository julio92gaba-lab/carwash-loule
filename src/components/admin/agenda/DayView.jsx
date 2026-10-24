import { useEffect, useState } from 'react'
import StatusBadge from '../StatusBadge'
import {
  fetchBookingsForDate,
  updateBookingStatus,
  fetchBlockedPeriods,
  createBlockedPeriod,
  deleteBlockedPeriod,
} from '../../../lib/queries/agenda'

function toISODate(d) {
  return d.toISOString().split('T')[0]
}

export default function DayView({ date, onNewBooking, refreshKey }) {
  const [bookings, setBookings] = useState([])
  const [blocks, setBlocks] = useState([])
  const [loading, setLoading] = useState(true)
  const [showBlockForm, setShowBlockForm] = useState(false)
  const [blockStart, setBlockStart] = useState('')
  const [blockEnd, setBlockEnd] = useState('')
  const [blockReason, setBlockReason] = useState('')

  function load() {
    setLoading(true)
    Promise.all([fetchBookingsForDate(date), fetchBlockedPeriods(date)]).then(([b, bl]) => {
      setBookings(b)
      setBlocks(bl)
      setLoading(false)
    })
  }

  useEffect(load, [date, refreshKey])

  async function changeStatus(id, status) {
    await updateBookingStatus(id, status)
    load()
  }

  async function handleBlockWholeDay() {
    await createBlockedPeriod({ date, startTime: null, endTime: null, reason: 'Dia de encerramento' })
    load()
  }

  async function handleBlockRange(e) {
    e.preventDefault()
    await createBlockedPeriod({ date, startTime: blockStart, endTime: blockEnd, reason: blockReason })
    setShowBlockForm(false)
    setBlockStart('')
    setBlockEnd('')
    setBlockReason('')
    load()
  }

  async function removeBlock(id) {
    await deleteBlockedPeriod(id)
    load()
  }

  const dateLabel = date.toLocaleDateString('pt-PT', { weekday: 'long', day: 'numeric', month: 'long' })

  if (loading) return <p className="text-gray-400 text-sm">A carregar...</p>

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold capitalize">{dateLabel}</h2>
        <button onClick={onNewBooking} className="bg-gray-900 text-white text-sm px-4 py-2 rounded-md">
          Novo agendamento
        </button>
      </div>

      {blocks.length > 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-4 text-sm">
          <div className="font-medium text-gray-600 mb-2">Bloqueios deste dia</div>
          {blocks.map((b) => (
            <div key={b.id} className="flex justify-between items-center py-1">
              <span className="text-gray-700">
                {b.start_time ? `${b.start_time.slice(0, 5)}–${b.end_time.slice(0, 5)}` : 'Dia inteiro'}
                {b.reason ? ` · ${b.reason}` : ''}
              </span>
              <button onClick={() => removeBlock(b.id)} className="text-red-500 text-xs hover:underline">
                Remover
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-2 mb-6">
        <button onClick={handleBlockWholeDay} className="text-xs border border-gray-300 rounded-md px-3 py-1.5 text-gray-600 hover:bg-gray-50">
          Bloquear dia inteiro
        </button>
        <button onClick={() => setShowBlockForm(!showBlockForm)} className="text-xs border border-gray-300 rounded-md px-3 py-1.5 text-gray-600 hover:bg-gray-50">
          Bloquear horário
        </button>
      </div>

      {showBlockForm && (
        <form onSubmit={handleBlockRange} className="flex flex-wrap gap-2 items-end mb-6 bg-gray-50 border border-gray-200 rounded-lg p-3">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Início</label>
            <input type="time" value={blockStart} onChange={(e) => setBlockStart(e.target.value)} required className="border border-gray-300 rounded-md px-2 py-1 text-sm" />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Fim</label>
            <input type="time" value={blockEnd} onChange={(e) => setBlockEnd(e.target.value)} required className="border border-gray-300 rounded-md px-2 py-1 text-sm" />
          </div>
          <div className="flex-1 min-w-[140px]">
            <label className="block text-xs text-gray-500 mb-1">Motivo (opcional)</label>
            <input value={blockReason} onChange={(e) => setBlockReason(e.target.value)} className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm" />
          </div>
          <button type="submit" className="bg-gray-900 text-white text-sm px-3 py-1.5 rounded-md">Bloquear</button>
        </form>
      )}

      {bookings.length === 0 ? (
        <p className="text-gray-400 text-sm">Sem agendamentos para este dia.</p>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl divide-y divide-gray-100">
          {bookings.map((b) => (
            <div key={b.id} className="flex items-center justify-between px-4 py-3 text-sm">
              <div>
                <div className="font-medium">{b.start_time.slice(0, 5)} · {b.customer_name}</div>
                <div className="text-gray-400 text-xs mt-0.5">
                  {b.vehicle.label} · {b.service.label} · {b.plate}
                  {b.company ? ` · ${b.company.name}` : ''}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge status={b.status} />
                {b.status === 'agendado' && (
                  <button onClick={() => changeStatus(b.id, 'em_curso')} className="text-xs text-blue-600 hover:underline">Iniciar</button>
                )}
                {b.status === 'em_curso' && (
                  <button onClick={() => changeStatus(b.id, 'concluido')} className="text-xs text-green-600 hover:underline">Concluir</button>
                )}
                {(b.status === 'agendado' || b.status === 'em_curso') && (
                  <button onClick={() => changeStatus(b.id, 'cancelado')} className="text-xs text-red-500 hover:underline">Cancelar</button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
