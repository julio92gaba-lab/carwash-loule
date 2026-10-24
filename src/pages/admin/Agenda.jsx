import { useEffect, useState } from 'react'
import DayView from '../../components/admin/agenda/DayView'
import WeekStrip from '../../components/admin/agenda/WeekStrip'
import MonthGrid from '../../components/admin/agenda/MonthGrid'
import NewBookingModal from '../../components/admin/agenda/NewBookingModal'
import { fetchCompanies } from '../../lib/queries/companies'

const views = [
  { id: 'dia', label: 'Dia' },
  { id: 'semana', label: 'Semana' },
  { id: 'mes', label: 'Mês' },
]

export default function Agenda() {
  const [view, setView] = useState('dia')
  const [date, setDate] = useState(() => {
    const d = new Date()
    d.setHours(0, 0, 0, 0)
    return d
  })
  const [showModal, setShowModal] = useState(false)
  const [companies, setCompanies] = useState([])
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    fetchCompanies().then(setCompanies)
  }, [])

  function selectDate(d) {
    setDate(d)
    setView('dia')
  }

  function changeMonth(delta) {
    const d = new Date(date)
    d.setMonth(d.getMonth() + delta)
    setDate(d)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold">Agenda</h1>
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
          {views.map((v) => (
            <button
              key={v.id}
              onClick={() => setView(v.id)}
              className={`text-sm px-3 py-1.5 rounded-md ${view === v.id ? 'bg-white shadow-sm font-medium' : 'text-gray-500'}`}
            >
              {v.label}
            </button>
          ))}
        </div>
      </div>

      {view === 'semana' && <div className="mb-6"><WeekStrip date={date} onSelectDate={selectDate} /></div>}
      {view === 'mes' && <div className="mb-6"><MonthGrid date={date} onSelectDate={selectDate} onChangeMonth={changeMonth} /></div>}

      <DayView
        date={date}
        onNewBooking={() => setShowModal(true)}
        refreshKey={refreshKey}
      />

      {showModal && (
        <NewBookingModal
          date={date}
          companies={companies}
          onClose={() => setShowModal(false)}
          onCreated={() => {
            setShowModal(false)
            setRefreshKey((k) => k + 1)
          }}
        />
      )}
    </div>
  )
}
