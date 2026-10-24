import { useEffect, useState } from 'react'
import ProductFormModal from '../../components/admin/stock/ProductFormModal'
import MovementModal from '../../components/admin/stock/MovementModal'
import ProductDetail from '../../components/admin/stock/ProductDetail'
import { fetchProducts } from '../../lib/queries/stock'

export default function Stock() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [movementProduct, setMovementProduct] = useState(null)
  const [selectedProduct, setSelectedProduct] = useState(null)

  function load() {
    setLoading(true)
    fetchProducts().then((rows) => {
      setProducts(rows)
      setLoading(false)
      if (selectedProduct) {
        const updated = rows.find((p) => p.id === selectedProduct.id)
        if (updated) setSelectedProduct(updated)
      }
    })
  }

  useEffect(load, [])

  if (selectedProduct) {
    return (
      <>
        <ProductDetail
          product={selectedProduct}
          onBack={() => setSelectedProduct(null)}
          onEdit={(p) => { setEditingProduct(p); setShowForm(true) }}
          onMovement={(p) => setMovementProduct(p)}
          onDeleted={() => { setSelectedProduct(null); load() }}
        />
        {movementProduct && (
          <MovementModal product={movementProduct} onClose={() => setMovementProduct(null)} onSaved={() => { setMovementProduct(null); load() }} />
        )}
        {showForm && (
          <ProductFormModal product={editingProduct} onClose={() => setShowForm(false)} onSaved={() => { setShowForm(false); load() }} />
        )}
      </>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold">Stock</h1>
        <button onClick={() => { setEditingProduct(null); setShowForm(true) }} className="bg-gray-900 text-white text-sm px-4 py-2 rounded-md">
          Novo produto
        </button>
      </div>

      {loading ? (
        <p className="text-gray-400 text-sm">A carregar...</p>
      ) : products.length === 0 ? (
        <p className="text-gray-400 text-sm">Ainda sem produtos registados.</p>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl divide-y divide-gray-100">
          {products.map((p) => {
            const low = p.quantity <= p.min_quantity
            return (
              <button
                key={p.id}
                onClick={() => setSelectedProduct(p)}
                className="w-full flex items-center justify-between px-4 py-3 text-sm text-left hover:bg-gray-50"
              >
                <div>
                  <div className="font-medium">{p.name}</div>
                  <div className="text-gray-400 text-xs mt-0.5">mínimo {p.min_quantity} {p.unit || ''}</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`font-medium ${low ? 'text-red-600' : 'text-gray-900'}`}>{p.quantity} {p.unit || ''}</span>
                  {low && <span className="text-xs bg-red-50 text-red-700 px-2 py-1 rounded-full">Repor</span>}
                  <span className="text-gray-300">→</span>
                </div>
              </button>
            )
          })}
        </div>
      )}

      {movementProduct && (
        <MovementModal product={movementProduct} onClose={() => setMovementProduct(null)} onSaved={() => { setMovementProduct(null); load() }} />
      )}
      {showForm && (
        <ProductFormModal product={editingProduct} onClose={() => setShowForm(false)} onSaved={() => { setShowForm(false); load() }} />
      )}
    </div>
  )
}
