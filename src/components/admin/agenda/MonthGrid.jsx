import { useEffect, useState } from 'react'
import { fetchBookingsForRange } from '../../../lib/queries/agenda'

function toISODate(d) {
  return d.toISOString().split('T')[0]
}

const weekdayLabels = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom']

export default function MonthGrid({ date, onSelectDate, onChangeMonth }) {
  const [counts, setCounts] = useState({})
  const year = date.getFullYear()
  const month = date.getMonth()

  const firstOfMonth = new Date(year, month, 1)
  const startOffset = (firstOfMonth.getDay() + 6) % 7
  const gridStart = new Date(firstOfMonth)
  gridStart.setDate(gridStart.getDate() - startOffset)

  const cells = Array.from({ length: 42 }, (_, i) => {
    const d = new Date(gridStart)
    d.setDate(d.getDate() + i)
    return d
  })

  useEffect(() => {
    const end = new Date(gridStart)
    end.setDate(end.getDate() + 41)
    fetchBookingsForRange(gridStart, end).then((rows) => {
      const map = {}
      rows.forEach((r) => {
        if (r.status === 'cancelado') return
        map[r.booking_date] = (map[r.booking_date] || 0) + 1
      })
      setCounts(map)
    })
  }, [toISODate(gridStart)])

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <button onClick={() => onChangeMonth(-1)} className="text-gray-400 hover:text-gray-700 px-2">‹</button>
        <div className="font-medium capitalize">{date.toLocaleDateString('pt-PT', { month: 'long', year: 'numeric' })}</div>
        <button onClick={() => onChangeMonth(1)} className="text-gray-400 hover:text-gray-700 px-2">›</button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-xs text-gray-400 mb-1">
        {weekdayLabels.map((w) => <div key={w} className="text-center">{w}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((d) => {
          const iso = toISODate(d)
          const inMonth = d.getMonth() === month
          const isSelected = toISODate(date) === iso
          return (
            <button
              key={iso}
              onClick={() => onSelectDate(d)}
              className={`aspect-square rounded-lg border text-xs flex flex-col items-center justify-center
                ${isSelected ? 'border-gray-900 bg-gray-900 text-white' : inMonth ? 'border-gray-200 hover:border-gray-400' : 'border-transparent text-gray-300'}`}
            >
              <span>{d.getDate()}</span>
              {counts[iso] > 0 && (
                <span className={`mt-0.5 w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white' : 'bg-gray-900'}`} />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
