import { useEffect, useState } from 'react'
import { fetchMovements, deleteProduct } from '../../../lib/queries/stock'

export default function ProductDetail({ product, onBack, onEdit, onMovement, onDeleted }) {
  const [movements, setMovements] = useState([])
  const [loading, setLoading] = useState(true)

  function load() {
    setLoading(true)
    fetchMovements(product.id).then((m) => {
      setMovements(m)
      setLoading(false)
    })
  }

  useEffect(load, [product.id])

  async function handleDelete() {
    if (!confirm(`Eliminar o produto ${product.name}?`)) return
    await deleteProduct(product.id)
    onDeleted()
  }

  const low = product.quantity <= product.min_quantity

  return (
    <div>
      <button onClick={onBack} className="text-sm text-gray-500 hover:text-gray-900 mb-4">← Voltar</button>

      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold">{product.name}</h2>
          <p className="text-sm text-gray-500 mt-0.5">
            {product.quantity} {product.unit || ''} em stock · mínimo {product.min_quantity} {product.unit || ''}
          </p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => onMovement(product)} className="text-sm bg-gray-900 text-white rounded-md px-3 py-1.5">Registar movimento</button>
          <button onClick={() => onEdit(product)} className="text-sm border border-gray-300 rounded-md px-3 py-1.5 hover:bg-gray-50">Editar</button>
          <button onClick={handleDelete} className="text-sm border border-red-200 text-red-600 rounded-md px-3 py-1.5 hover:bg-red-50">Eliminar</button>
        </div>
      </div>

      {low && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 mb-6 text-sm">
          Stock abaixo (ou igual) do mínimo definido — considerar repor.
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-xl">
        <div className="px-4 py-3 border-b border-gray-100 font-medium text-sm">Histórico de movimentações</div>
        {loading ? (
          <p className="text-gray-400 text-sm p-4">A carregar...</p>
        ) : movements.length === 0 ? (
          <p className="text-gray-400 text-sm p-4">Sem movimentações.</p>
        ) : (
          <div className="divide-y divide-gray-100">
            {movements.map((m) => (
              <div key={m.id} className="flex items-center justify-between px-4 py-3 text-sm">
                <div>
                  <div className="font-medium">{new Date(m.created_at).toLocaleDateString('pt-PT')}</div>
                  {m.note && <div className="text-gray-400 text-xs mt-0.5">{m.note}</div>}
                </div>
                <span className={`font-medium ${m.type === 'entrada' ? 'text-green-700' : 'text-red-600'}`}>
                  {m.type === 'entrada' ? '+' : '-'}{m.quantity} {product.unit || ''}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
