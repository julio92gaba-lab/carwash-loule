import { useEffect, useMemo, useState } from 'react'
import { useCatalog } from '../../../hooks/useCatalog'
import { fetchSettings } from '../../../lib/queries/settings'
import { fetchBookingsForDate, fetchBlockedPeriods, createManualBooking } from '../../../lib/queries/agenda'
import { getAvailableSlots } from '../../../lib/availability'

export default function NewBookingModal({ date, companies, onClose, onCreated }) {
  const { vehicleCategories, services } = useCatalog()
  const [settings, setSettings] = useState(null)
  const [vehicleId, setVehicleId] = useState('')
  const [serviceId, setServiceId] = useState('')
  const [time, setTime] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [plate, setPlate] = useState('')
  const [companyId, setCompanyId] = useState('')
  const [slots, setSlots] = useState([])
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchSettings().then(setSettings)
  }, [])

  const vehicle = vehicleCategories.find((v) => v.id === vehicleId)
  const service = services.find((s) => s.id === serviceId)
  const durationMinutes = service && vehicleId ? service.duration[vehicleId] : null

  useEffect(() => {
    if (!durationMinutes || !settings) return
    setLoadingSlots(true)
    Promise.all([fetchBookingsForDate(date), fetchBlockedPeriods(date)])
      .then(([bookings, blocks]) => {
        const existingBookings = bookings
          .filter((b) => b.status === 'agendado' || b.status === 'em_curso')
          .map((b) => ({ start: b.start_time.slice(0, 5), durationMinutes: b.duration_minutes }))
        const blockedPeriods = blocks.map((b) => ({
          start: b.start_time ? b.start_time.slice(0, 5) : null,
          end: b.end_time ? b.end_time.slice(0, 5) : null,
        }))
        setSlots(
          getAvailableSlots({
            date,
            durationMinutes,
            existingBookings,
            blockedPeriods,
            businessHours: settings.businessHours,
            slotIntervalMinutes: settings.slotIntervalMinutes,
            simultaneousCapacity: settings.simultaneousCapacity,
          })
        )
      })
      .finally(() => setLoadingSlots(false))
  }, [durationMinutes, settings, date])

  const availableServices = useMemo(
    () => services.filter((s) => s.prices[vehicleId] != null),
    [services, vehicleId]
  )

  const canSave = vehicleId && serviceId && time && name && phone && plate

  async function handleSave() {
    setSaving(true)
    setError('')
    try {
      await createManualBooking({
        vehicleUuid: vehicle.uuid,
        serviceUuid: service.uuid,
        name,
        phone,
        plate,
        date,
        time,
        durationMinutes,
        price: service.prices[vehicleId],
        companyId: companyId || null,
      })
      onCreated()
    } catch (err) {
      setError('Não foi possível criar o agendamento.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-xl w-full max-w-md p-5 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-lg">Novo agendamento</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700">✕</button>
        </div>

        <div className="flex flex-col gap-3 text-sm">
          <div>
            <label className="block text-gray-600 mb-1">Veículo</label>
            <select
              value={vehicleId}
              onChange={(e) => { setVehicleId(e.target.value); setServiceId(''); setTime('') }}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="">Selecionar</option>
              {vehicleCategories.map((v) => <option key={v.id} value={v.id}>{v.label}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Serviço</label>
            <select
              value={serviceId}
              onChange={(e) => { setServiceId(e.target.value); setTime('') }}
              disabled={!vehicleId}
              className="w-full border border-gray-300 rounded-md px-3 py-2 disabled:bg-gray-100"
            >
              <option value="">Selecionar</option>
              {availableServices.map((s) => (
                <option key={s.id} value={s.id}>{s.label} — {s.prices[vehicleId]} €</option>
              ))}
            </select>
          </div>

          {durationMinutes && (
            <div>
              <label className="block text-gray-600 mb-1">Hora</label>
              {loadingSlots ? (
                <p className="text-gray-400 text-xs">A verificar disponibilidade...</p>
              ) : (
                <div className="grid grid-cols-4 gap-2">
                  {slots.map((s) => (
                    <button
                      key={s}
                      onClick={() => setTime(s)}
                      className={`py-1.5 rounded-md border text-xs ${time === s ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-300 text-gray-700'}`}
                    >
                      {s}
                    </button>
                  ))}
                  {slots.length === 0 && <p className="text-gray-400 text-xs col-span-4">Sem horários livres.</p>}
                </div>
              )}
            </div>
          )}

          <div>
            <label className="block text-gray-600 mb-1">Nome</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className="w-full border border-gray-300 rounded-md px-3 py-2" />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Telemóvel</label>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full border border-gray-300 rounded-md px-3 py-2" />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Matrícula</label>
            <input value={plate} onChange={(e) => setPlate(e.target.value.toUpperCase())} className="w-full border border-gray-300 rounded-md px-3 py-2 uppercase" />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Empresa / mensalista (opcional)</label>
            <select value={companyId} onChange={(e) => setCompanyId(e.target.value)} className="w-full border border-gray-300 rounded-md px-3 py-2">
              <option value="">Nenhuma (cliente avulso)</option>
              {companies.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>

          {error && <p className="text-red-600 text-xs">{error}</p>}

          <button
            onClick={handleSave}
            disabled={!canSave || saving}
            className="mt-2 w-full bg-gray-900 text-white rounded-md py-2 font-medium disabled:opacity-40"
          >
            {saving ? 'A guardar...' : 'Criar agendamento'}
          </button>
        </div>
      </div>
    </div>
  )
}
