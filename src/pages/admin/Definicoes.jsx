import { useEffect, useState } from 'react'
import BusinessInfoForm from '../../components/admin/settings/BusinessInfoForm'
import HoursForm from '../../components/admin/settings/HoursForm'
import VehicleCategoriesManager from '../../components/admin/settings/VehicleCategoriesManager'
import PricingMatrix from '../../components/admin/settings/PricingMatrix'
import {
  fetchSettingsRow,
  updateSettings,
  fetchVehicleCategoriesRaw,
  fetchServicesRaw,
  fetchServicePricesRaw,
} from '../../lib/queries/adminSettings'

const sections = [
  { id: 'geral', label: 'Geral' },
  { id: 'horario', label: 'Horário' },
  { id: 'veiculos', label: 'Categorias de veículos' },
  { id: 'servicos', label: 'Serviços e preços' },
]

export default function Definicoes() {
  const [section, setSection] = useState('geral')
  const [settings, setSettings] = useState(null)
  const [categories, setCategories] = useState([])
  const [services, setServices] = useState([])
  const [prices, setPrices] = useState([])
  const [loading, setLoading] = useState(true)

  function load() {
    setLoading(true)
    Promise.all([fetchSettingsRow(), fetchVehicleCategoriesRaw(), fetchServicesRaw(), fetchServicePricesRaw()]).then(
      ([s, c, sv, p]) => {
        setSettings(s)
        setCategories(c)
        setServices(sv)
        setPrices(p)
        setLoading(false)
      }
    )
  }

  useEffect(load, [])

  async function handleSaveSettings(payload) {
    await updateSettings({
      businessName: settings.business_name,
      businessHours: settings.business_hours,
      slotIntervalMinutes: settings.slot_interval_minutes,
      simultaneousCapacity: settings.simultaneous_capacity,
      ...payload,
    })
    load()
  }

  if (loading) return <p className="text-gray-400 text-sm">A carregar...</p>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold">Definições</h1>
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1 flex-wrap">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => setSection(s.id)}
              className={`text-sm px-3 py-1.5 rounded-md ${section === s.id ? 'bg-white shadow-sm font-medium' : 'text-gray-500'}`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {section === 'geral' && <BusinessInfoForm settings={settings} onSave={handleSaveSettings} />}
      {section === 'horario' && <HoursForm settings={settings} onSave={handleSaveSettings} />}
      {section === 'veiculos' && <VehicleCategoriesManager categories={categories} onChanged={load} />}
      {section === 'servicos' && (
        <PricingMatrix categories={categories} services={services} prices={prices} onChanged={load} />
      )}

      <p className="text-xs text-gray-400 mt-6">
        Dias de encerramento pontuais (feriados, folgas) bloqueiam-se na Agenda, em "Bloquear dia inteiro".
      </p>
    </div>
  )
}
