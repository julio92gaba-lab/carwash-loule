import { useState } from 'react'
import { createEntry } from '../../../lib/queries/finance'

export default function EntryFormModal({ onClose, onCreated }) {
  const [type, setType] = useState('receita')
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('dinheiro')
  const [status, setStatus] = useState('pago')
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0])
  const [dueDate, setDueDate] = useState('')
  const [saving, setSaving] = useState(false)

  async function handleSave(e) {
    e.preventDefault()
    setSaving(true)
    await createEntry({
      type,
      description,
      amount: parseFloat(amount),
      paymentMethod: status === 'pago' ? paymentMethod : null,
      status,
      date: new Date(date),
      dueDate: dueDate ? new Date(dueDate) : null,
    })
    setSaving(false)
    onCreated()
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <form onSubmit={handleSave} className="bg-white rounded-xl w-full max-w-sm p-5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-lg">Novo registo</h2>
          <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-700">✕</button>
        </div>

        <div className="flex flex-col gap-3 text-sm">
          <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
            <button type="button" onClick={() => setType('receita')} className={`flex-1 py-1.5 rounded-md text-sm ${type === 'receita' ? 'bg-white shadow-sm font-medium' : 'text-gray-500'}`}>Receita</button>
            <button type="button" onClick={() => setType('despesa')} className={`flex-1 py-1.5 rounded-md text-sm ${type === 'despesa' ? 'bg-white shadow-sm font-medium' : 'text-gray-500'}`}>Despesa</button>
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Descrição</label>
            <input value={description} onChange={(e) => setDescription(e.target.value)} required className="w-full border border-gray-300 rounded-md px-3 py-2" />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Valor (€)</label>
            <input type="number" step="0.01" min="0" value={amount} onChange={(e) => setAmount(e.target.value)} required className="w-full border border-gray-300 rounded-md px-3 py-2" />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Data</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required className="w-full border border-gray-300 rounded-md px-3 py-2" />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Estado</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full border border-gray-300 rounded-md px-3 py-2">
              <option value="pago">Pago</option>
              <option value="pendente">Pendente</option>
            </select>
          </div>

          {status === 'pago' && (
            <div>
              <label className="block text-gray-600 mb-1">Forma de pagamento</label>
              <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className="w-full border border-gray-300 rounded-md px-3 py-2">
                <option value="dinheiro">Dinheiro</option>
                <option value="mbway">MB WAY</option>
              </select>
            </div>
          )}

          {status === 'pendente' && type === 'despesa' && (
            <div>
              <label className="block text-gray-600 mb-1">Data de vencimento</label>
              <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="w-full border border-gray-300 rounded-md px-3 py-2" />
            </div>
          )}

          <button type="submit" disabled={saving} className="mt-2 w-full bg-gray-900 text-white rounded-md py-2 font-medium disabled:opacity-40">
            {saving ? 'A guardar...' : 'Guardar'}
          </button>
        </div>
      </form>
    </div>
  )
}
