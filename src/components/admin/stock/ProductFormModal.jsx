import { useState } from 'react'
import { createProduct, updateProduct } from '../../../lib/queries/stock'

export default function ProductFormModal({ product, onClose, onSaved }) {
  const [name, setName] = useState(product?.name || '')
  const [unit, setUnit] = useState(product?.unit || '')
  const [quantity, setQuantity] = useState(product ? product.quantity : 0)
  const [minQuantity, setMinQuantity] = useState(product?.min_quantity || 0)
  const [saving, setSaving] = useState(false)

  async function handleSave(e) {
    e.preventDefault()
    setSaving(true)
    if (product) {
      await updateProduct(product.id, { name, unit, minQuantity: parseFloat(minQuantity) })
    } else {
      await createProduct({ name, unit, quantity: parseFloat(quantity), minQuantity: parseFloat(minQuantity) })
    }
    setSaving(false)
    onSaved()
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <form onSubmit={handleSave} className="bg-white rounded-xl w-full max-w-sm p-5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-lg">{product ? 'Editar produto' : 'Novo produto'}</h2>
          <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-700">✕</button>
        </div>

        <div className="flex flex-col gap-3 text-sm">
          <div>
            <label className="block text-gray-600 mb-1">Nome</label>
            <input value={name} onChange={(e) => setName(e.target.value)} required className="w-full border border-gray-300 rounded-md px-3 py-2" />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Unidade (ex. L, un)</label>
            <input value={unit} onChange={(e) => setUnit(e.target.value)} className="w-full border border-gray-300 rounded-md px-3 py-2" />
          </div>
          {!product && (
            <div>
              <label className="block text-gray-600 mb-1">Quantidade inicial</label>
              <input type="number" step="0.01" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="w-full border border-gray-300 rounded-md px-3 py-2" />
            </div>
          )}
          <div>
            <label className="block text-gray-600 mb-1">Stock mínimo</label>
            <input type="number" step="0.01" value={minQuantity} onChange={(e) => setMinQuantity(e.target.value)} className="w-full border border-gray-300 rounded-md px-3 py-2" />
          </div>
          <button type="submit" disabled={saving} className="mt-2 w-full bg-gray-900 text-white rounded-md py-2 font-medium disabled:opacity-40">
            {saving ? 'A guardar...' : 'Guardar'}
          </button>
        </div>
      </form>
    </div>
  )
}
