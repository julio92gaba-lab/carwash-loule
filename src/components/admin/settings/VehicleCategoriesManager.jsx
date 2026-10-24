import { useState } from 'react'
import { slugify } from '../../../lib/slugify'
import { createVehicleCategory, updateVehicleCategory, deleteVehicleCategory } from '../../../lib/queries/adminSettings'

export default function VehicleCategoriesManager({ categories, onChanged }) {
  const [label, setLabel] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editingLabel, setEditingLabel] = useState('')

  async function handleAdd(e) {
    e.preventDefault()
    if (!label.trim()) return
    await createVehicleCategory({ slug: slugify(label), label, sortOrder: categories.length + 1 })
    setLabel('')
    onChanged()
  }

  async function handleDelete(id) {
    if (!confirm('Eliminar esta categoria? Os preços associados também serão removidos.')) return
    await deleteVehicleCategory(id)
    onChanged()
  }

  async function handleRename(id) {
    await updateVehicleCategory(id, { label: editingLabel, sortOrder: categories.find((c) => c.id === id).sort_order })
    setEditingId(null)
    onChanged()
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <h2 className="font-medium mb-4">Categorias de veículos</h2>

      <div className="flex flex-col gap-2 mb-4">
        {categories.map((c) => (
          <div key={c.id} className="flex items-center justify-between text-sm border-b border-gray-50 pb-2">
            {editingId === c.id ? (
              <input
                value={editingLabel}
                onChange={(e) => setEditingLabel(e.target.value)}
                onBlur={() => handleRename(c.id)}
                autoFocus
                className="border border-gray-300 rounded-md px-2 py-1"
              />
            ) : (
              <span>{c.label}</span>
            )}
            <div className="flex gap-3">
              <button onClick={() => { setEditingId(c.id); setEditingLabel(c.label) }} className="text-gray-400 hover:text-gray-700 text-xs">Editar</button>
              <button onClick={() => handleDelete(c.id)} className="text-red-400 hover:text-red-600 text-xs">Eliminar</button>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleAdd} className="flex gap-2">
        <input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Nova categoria"
          className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm"
        />
        <button type="submit" className="bg-gray-900 text-white text-sm px-4 py-2 rounded-md">Adicionar</button>
      </form>
    </div>
  )
}
