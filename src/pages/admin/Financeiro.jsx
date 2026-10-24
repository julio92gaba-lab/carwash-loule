import { useEffect, useState } from 'react'
import EntryFormModal from '../../components/admin/finance/EntryFormModal'
import { fetchEntries, fetchPendingPayables, markEntryPaid, deleteEntry } from '../../lib/queries/finance'

function startOfMonth(d) {
  return new Date(d.getFullYear(), d.getMonth(), 1)
}
function endOfMonth(d) {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0)
}
function monthLabel(d) {
  return d.toLocaleDateString('pt-PT', { month: 'long', year: 'numeric' })
}

export default function Financeiro() {
  const [refMonth, setRefMonth] = useState(() => new Date())
  const [entries, setEntries] = useState([])
  const [payables, setPayables] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)

  function load() {
    setLoading(true)
    Promise.all([
      fetchEntries(startOfMonth(refMonth), endOfMonth(refMonth)),
      fetchPendingPayables(),
    ]).then(([e, p]) => {
      setEntries(e)
      setPayables(p)
      setLoading(false)
    })
  }

  useEffect(load, [refMonth])

  function changeMonth(delta) {
    const d = new Date(refMonth)
    d.setMonth(d.getMonth() + delta)
    setRefMonth(d)
  }

  async function handleMarkPaid(id) {
    await markEntryPaid(id)
    load()
  }

  async function handleDelete(id) {
    if (!confirm('Eliminar este registo?')) return
    await deleteEntry(id)
    load()
  }

  if (loading) return <p className="text-gray-400 text-sm">A carregar...</p>

  const recebido = entries.filter((e) => e.type === 'receita' && e.status === 'pago').reduce((s, e) => s + e.amount_cents, 0) / 100
  const aReceber = entries.filter((e) => e.type === 'receita' && e.status === 'pendente').reduce((s, e) => s + e.amount_cents, 0) / 100
  const despesasPagas = entries.filter((e) => e.type === 'despesa' && e.status === 'pago').reduce((s, e) => s + e.amount_cents, 0) / 100
  const saldo = recebido - despesasPagas

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold">Financeiro</h1>
        <button onClick={() => setShowForm(true)} className="bg-gray-900 text-white text-sm px-4 py-2 rounded-md">
          Novo registo
        </button>
      </div>

      <div className="flex items-center justify-center gap-4 mb-6">
        <button onClick={() => changeMonth(-1)} className="text-gray-400 hover:text-gray-700 px-2">‹</button>
        <div className="font-medium capitalize">{monthLabel(refMonth)}</div>
        <button onClick={() => changeMonth(1)} className="text-gray-400 hover:text-gray-700 px-2">›</button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="text-gray-400 text-xs uppercase tracking-wide">Recebido</div>
          <div className="text-2xl font-semibold mt-1 text-green-700">{recebido.toFixed(2)} €</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="text-gray-400 text-xs uppercase tracking-wide">A receber</div>
          <div className="text-2xl font-semibold mt-1 text-amber-600">{aReceber.toFixed(2)} €</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="text-gray-400 text-xs uppercase tracking-wide">Despesas pagas</div>
          <div className="text-2xl font-semibold mt-1 text-red-600">{despesasPagas.toFixed(2)} €</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="text-gray-400 text-xs uppercase tracking-wide">Saldo do mês</div>
          <div className={`text-2xl font-semibold mt-1 ${saldo >= 0 ? 'text-gray-900' : 'text-red-600'}`}>{saldo.toFixed(2)} €</div>
        </div>
      </div>

      {payables.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8">
          <div className="font-medium text-sm text-amber-800 mb-2">Contas a pagar</div>
          <div className="divide-y divide-amber-100">
            {payables.map((p) => (
              <div key={p.id} className="flex items-center justify-between py-2 text-sm">
                <div>
                  <span className="text-amber-900">{p.description}</span>
                  <span className="text-amber-600 text-xs ml-2">vence {p.due_date || '—'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-medium">{(p.amount_cents / 100).toFixed(2)} €</span>
                  <button onClick={() => handleMarkPaid(p.id)} className="text-xs bg-white border border-amber-300 text-amber-800 rounded-md px-2 py-1 hover:bg-amber-100">
                    Marcar pago
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-xl">
        <div className="px-4 py-3 border-b border-gray-100 font-medium text-sm">Histórico de movimentações</div>
        {entries.length === 0 ? (
          <p className="text-gray-400 text-sm p-4">Sem registos neste mês.</p>
        ) : (
          <div className="divide-y divide-gray-100">
            {entries.map((e) => (
              <div key={e.id} className="flex items-center justify-between px-4 py-3 text-sm">
                <div>
                  <div className="font-medium">{e.description}</div>
                  <div className="text-gray-400 text-xs mt-0.5">
                    {e.entry_date} · {e.type === 'receita' ? 'Receita' : 'Despesa'}
                    {e.payment_method ? ` · ${e.payment_method === 'dinheiro' ? 'Dinheiro' : 'MB WAY'}` : ''}
                    {e.status === 'pendente' ? ' · Pendente' : ''}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`font-medium ${e.type === 'receita' ? 'text-green-700' : 'text-red-600'}`}>
                    {e.type === 'receita' ? '+' : '-'}{(e.amount_cents / 100).toFixed(2)} €
                  </span>
                  <button onClick={() => handleDelete(e.id)} className="text-gray-300 hover:text-red-500 text-xs">✕</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showForm && (
        <EntryFormModal onClose={() => setShowForm(false)} onCreated={() => { setShowForm(false); load() }} />
      )}
    </div>
  )
}
