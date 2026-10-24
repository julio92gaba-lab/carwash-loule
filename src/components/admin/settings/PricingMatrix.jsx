import { useState } from 'react'
import { slugify } from '../../../lib/slugify'
import {
  createService,
  updateService,
  deleteService,
  upsertServicePrice,
  deleteServicePrice,
} from '../../../lib/queries/adminSettings'

export default function PricingMatrix({ categories, services, prices, onChanged }) {
  const [newService, setNewService] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editingLabel, setEditingLabel] = useState('')
  const [cells, setCells] = useState(() => buildCells(prices))
  const [saving, setSaving] = useState(false)

  function buildCells(priceRows) {
    const map = {}
    priceRows.forEach((p) => {
      map[`${p.service_id}_${p.vehicle_category_id}`] = {
        price: (p.price_cents / 100).toString(),
        duration: p.duration_minutes.toString(),
      }
    })
    return map
  }

  function updateCell(serviceId, vehicleId, field, value) {
    const key = `${serviceId}_${vehicleId}`
    setCells((c) => ({ ...c, [key]: { ...c[key], [field]: value } }))
  }

  async function handleAddService(e) {
    e.preventDefault()
    if (!newService.trim()) return
    await createService({ slug: slugify(newService), label: newService, description: '', sortOrder: services.length + 1 })
    setNewService('')
    onChanged()
  }

  async function handleDeleteService(id) {
    if (!confirm('Eliminar este serviço?')) return
    await deleteService(id)
    onChanged()
  }

  async function handleRenameService(id) {
    const service = services.find((s) => s.id === id)
    await updateService(id, { label: editingLabel, description: service.description, sortOrder: service.sort_order })
    setEditingId(null)
    onChanged()
  }

  async function handleSaveMatrix() {
    setSaving(true)
    const ops = []
    services.forEach((s) => {
      categories.forEach((v) => {
        const key = `${s.id}_${v.id}`
        const cell = cells[key]
        if (cell && cell.price !== '' && cell.duration !== '') {
          ops.push(upsertServicePrice(s.id, v.id, Math.round(parseFloat(cell.price) * 100), parseInt(cell.duration, 10)))
        } else {
          ops.push(deleteServicePrice(s.id, v.id))
        }
      })
    })
    await Promise.all(ops)
    setSaving(false)
    onChanged()
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <h2 className="font-medium mb-4">Serviços e preços</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr>
              <th className="text-left py-2 pr-4">Serviço</th>
              {categories.map((v) => (
                <th key={v.id} className="text-left py-2 px-2 whitespace-nowrap">{v.label}</th>
              ))}
              <th />
            </tr>
          </thead>
          <tbody>
            {services.map((s) => (
              <tr key={s.id} className="border-t border-gray-100">
                <td className="py-2 pr-4 whitespace-nowrap">
                  {editingId === s.id ? (
                    <input
                      value={editingLabel}
                      onChange={(e) => setEditingLabel(e.target.value)}
                      onBlur={() => handleRenameService(s.id)}
                      autoFocus
                      className="border border-gray-300 rounded-md px-2 py-1 text-sm"
                    />
                  ) : (
                    <button onClick={() => { setEditingId(s.id); setEditingLabel(s.label) }} className="font-medium hover:underline">
                      {s.label}
                    </button>
                  )}
                </td>
                {categories.map((v) => {
                  const key = `${s.id}_${v.id}`
                  const cell = cells[key] || { price: '', duration: '' }
                  return (
                    <td key={v.id} className="py-2 px-2">
                      <div className="flex gap-1">
                        <input
                          type="number"
                          step="0.01"
                          placeholder="€"
                          value={cell.price}
                          onChange={(e) => updateCell(s.id, v.id, 'price', e.target.value)}
                          className="w-16 border border-gray-300 rounded-md px-1.5 py-1 text-xs"
                        />
                        <input
                          type="number"
                          placeholder="min"
                          value={cell.duration}
                          onChange={(e) => updateCell(s.id, v.id, 'duration', e.target.value)}
                          className="w-14 border border-gray-300 rounded-md px-1.5 py-1 text-xs"
                        />
                      </div>
                    </td>
                  )
                })}
                <td>
                  <button onClick={() => handleDeleteService(s.id)} className="text-red-400 hover:text-red-600 text-xs">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <form onSubmit={handleAddService} className="flex gap-2 mt-4">
        <input
          value={newService}
          onChange={(e) => setNewService(e.target.value)}
          placeholder="Novo serviço"
          className="flex-1 max-w-xs border border-gray-300 rounded-md px-3 py-2 text-sm"
        />
        <button type="submit" className="bg-gray-100 text-gray-700 text-sm px-4 py-2 rounded-md hover:bg-gray-200">Adicionar serviço</button>
      </form>

      <button onClick={handleSaveMatrix} disabled={saving} className="mt-4 bg-gray-900 text-white text-sm px-4 py-2 rounded-md disabled:opacity-40">
        {saving ? 'A guardar...' : 'Guardar tabela de preços'}
      </button>
      <p className="text-xs text-gray-400 mt-2">Deixar preço e duração em branco remove essa combinação (ex. moto não tem Plus).</p>
    </div>
  )
}
