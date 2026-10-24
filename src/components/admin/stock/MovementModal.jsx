import { useState } from 'react'
import { createMovement } from '../../../lib/queries/stock'

export default function MovementModal({ product, onClose, onSaved }) {
  const [type, setType] = useState('entrada')
  const [quantity, setQuantity] = useState('')
  const [note, setNote] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  async function handleSave(e) {
    e.preventDefault()
    setError('')
    if (type === 'saida' && parseFloat(quantity) > product.quantity) {
      setError('Quantidade superior ao stock disponível.')
      return
    }
    setSaving(true)
    await createMovement({ productId: product.id, type, quantity: parseFloat(quantity), note })
    setSaving(false)
    onSaved()
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <form onSubmit={handleSave} className="bg-white rounded-xl w-full max-w-sm p-5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-lg">{product.name}</h2>
          <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-700">✕</button>
        </div>

        <div className="flex flex-col gap-3 text-sm">
          <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
            <button type="button" onClick={() => setType('entrada')} className={`flex-1 py-1.5 rounded-md text-sm ${type === 'entrada' ? 'bg-white shadow-sm font-medium' : 'text-gray-500'}`}>Entrada</button>
            <button type="button" onClick={() => setType('saida')} className={`flex-1 py-1.5 rounded-md text-sm ${type === 'saida' ? 'bg-white shadow-sm font-medium' : 'text-gray-500'}`}>Saída</button>
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Quantidade {product.unit ? `(${product.unit})` : ''}</label>
            <input type="number" step="0.01" min="0" value={quantity} onChange={(e) => setQuantity(e.target.value)} required className="w-full border border-gray-300 rounded-md px-3 py-2" />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Nota (opcional)</label>
            <input value={note} onChange={(e) => setNote(e.target.value)} className="w-full border border-gray-300 rounded-md px-3 py-2" />
          </div>

          {error && <p className="text-red-600 text-xs">{error}</p>}

          <button type="submit" disabled={saving} className="mt-2 w-full bg-gray-900 text-white rounded-md py-2 font-medium disabled:opacity-40">
            {saving ? 'A guardar...' : 'Registar movimento'}
          </button>
        </div>
      </form>
    </div>
  )
}
