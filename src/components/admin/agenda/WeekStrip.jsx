import { useEffect, useState } from 'react'
import { fetchBookingsForRange } from '../../../lib/queries/agenda'

function toISODate(d) {
  return d.toISOString().split('T')[0]
}

function startOfWeek(date) {
  const d = new Date(date)
  const day = d.getDay()
  const diff = day === 0 ? -6 : 1 - day
  d.setDate(d.getDate() + diff)
  d.setHours(0, 0, 0, 0)
  return d
}

export default function WeekStrip({ date, onSelectDate }) {
  const [counts, setCounts] = useState({})
  const start = startOfWeek(date)
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start)
    d.setDate(d.getDate() + i)
    return d
  })

  useEffect(() => {
    const end = new Date(start)
    end.setDate(end.getDate() + 6)
    fetchBookingsForRange(start, end).then((rows) => {
      const map = {}
      rows.forEach((r) => {
        if (r.status === 'cancelado') return
        map[r.booking_date] = (map[r.booking_date] || 0) + 1
      })
      setCounts(map)
    })
  }, [toISODate(start)])

  return (
    <div className="grid grid-cols-7 gap-2">
      {days.map((d) => {
        const iso = toISODate(d)
        const isSelected = toISODate(date) === iso
        return (
          <button
            key={iso}
            onClick={() => onSelectDate(d)}
            className={`rounded-xl border p-3 text-center transition ${isSelected ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-200 hover:border-gray-400'}`}
          >
            <div className="text-[10px] uppercase opacity-70">{d.toLocaleDateString('pt-PT', { weekday: 'short' })}</div>
            <div className="text-lg font-semibold">{d.getDate()}</div>
            <div className={`text-xs mt-1 ${isSelected ? 'text-white/80' : 'text-gray-400'}`}>
              {counts[iso] || 0} agend.
            </div>
          </button>
        )
      })}
    </div>
  )
}
