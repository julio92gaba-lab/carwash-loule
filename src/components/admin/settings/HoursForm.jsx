import { useState } from 'react'

const weekdays = [
  ['1', 'Segunda'],
  ['2', 'Terça'],
  ['3', 'Quarta'],
  ['4', 'Quinta'],
  ['5', 'Sexta'],
  ['6', 'Sábado'],
  ['0', 'Domingo'],
]

export default function HoursForm({ settings, onSave }) {
  const [hours, setHours] = useState(settings.business_hours)
  const [slotInterval, setSlotInterval] = useState(settings.slot_interval_minutes)
  const [capacity, setCapacity] = useState(settings.simultaneous_capacity)
  const [saving, setSaving] = useState(false)

  function toggleDay(key) {
    setHours((h) => ({ ...h, [key]: h[key] ? null : { open: '09:00', close: '19:00' } }))
  }

  function updateDay(key, field, value) {
    setHours((h) => ({ ...h, [key]: { ...h[key], [field]: value } }))
  }

  async function handleSave(e) {
    e.preventDefault()
    setSaving(true)
    await onSave({
      businessHours: hours,
      slotIntervalMinutes: parseInt(slotInterval, 10),
      simultaneousCapacity: parseInt(capacity, 10),
    })
    setSaving(false)
  }

  return (
    <form onSubmit={handleSave} className="bg-white border border-gray-200 rounded-xl p-5">
      <h2 className="font-medium mb-4">Horário de funcionamento</h2>

      <div className="flex flex-col gap-2 mb-5">
        {weekdays.map(([key, label]) => {
          const day = hours[key]
          return (
            <div key={key} className="flex items-center gap-3 text-sm">
              <label className="flex items-center gap-2 w-28">
                <input type="checkbox" checked={!!day} onChange={() => toggleDay(key)} />
                {label}
              </label>
              {day ? (
                <>
                  <input
                    type="time"
                    value={day.open}
                    onChange={(e) => updateDay(key, 'open', e.target.value)}
                    className="border border-gray-300 rounded-md px-2 py-1"
                  />
                  <span className="text-gray-400">até</span>
                  <input
                    type="time"
                    value={day.close}
                    onChange={(e) => updateDay(key, 'close', e.target.value)}
                    className="border border-gray-300 rounded-md px-2 py-1"
                  />
                </>
              ) : (
                <span className="text-gray-400">Encerrado</span>
              )}
            </div>
          )
        })}
      </div>

      <div className="flex gap-6 mb-5">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Intervalo entre horários (min)</label>
          <input
            type="number"
            min="5"
            step="5"
            value={slotInterval}
            onChange={(e) => setSlotInterval(e.target.value)}
            className="w-32 border border-gray-300 rounded-md px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Capacidade simultânea</label>
          <input
            type="number"
            min="1"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            className="w-32 border border-gray-300 rounded-md px-3 py-2 text-sm"
          />
        </div>
      </div>

      <button type="submit" disabled={saving} className="bg-gray-900 text-white text-sm px-4 py-2 rounded-md disabled:opacity-40">
        {saving ? 'A guardar...' : 'Guardar'}
      </button>
    </form>
  )
}
