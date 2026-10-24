import { useEffect, useState } from 'react'
import AvulsoList from '../../components/admin/clientes/AvulsoList'
import CompanyFormModal from '../../components/admin/clientes/CompanyFormModal'
import CompanyDetail from '../../components/admin/clientes/CompanyDetail'
import { fetchCompanies } from '../../lib/queries/companies'

export default function Clientes() {
  const [tab, setTab] = useState('avulsos')
  const [companies, setCompanies] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingCompany, setEditingCompany] = useState(null)
  const [selectedCompany, setSelectedCompany] = useState(null)

  function load() {
    setLoading(true)
    fetchCompanies().then((rows) => {
      setCompanies(rows)
      setLoading(false)
    })
  }

  useEffect(load, [])

  if (selectedCompany) {
    return (
      <CompanyDetail
        company={selectedCompany}
        onBack={() => setSelectedCompany(null)}
        onEdit={(c) => { setEditingCompany(c); setShowForm(true) }}
        onDeleted={() => { setSelectedCompany(null); load() }}
      />
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold">Clientes</h1>
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
          <button onClick={() => setTab('avulsos')} className={`text-sm px-3 py-1.5 rounded-md ${tab === 'avulsos' ? 'bg-white shadow-sm font-medium' : 'text-gray-500'}`}>
            Avulsos
          </button>
          <button onClick={() => setTab('empresas')} className={`text-sm px-3 py-1.5 rounded-md ${tab === 'empresas' ? 'bg-white shadow-sm font-medium' : 'text-gray-500'}`}>
            Empresas / Mensalistas
          </button>
        </div>
      </div>

      {tab === 'avulsos' && <AvulsoList />}

      {tab === 'empresas' && (
        <div>
          <div className="flex justify-end mb-4">
            <button
              onClick={() => { setEditingCompany(null); setShowForm(true) }}
              className="bg-gray-900 text-white text-sm px-4 py-2 rounded-md"
            >
              Nova empresa
            </button>
          </div>

          {loading ? (
            <p className="text-gray-400 text-sm">A carregar...</p>
          ) : companies.length === 0 ? (
            <p className="text-gray-400 text-sm">Ainda sem empresas registadas.</p>
          ) : (
            <div className="bg-white border border-gray-200 rounded-xl divide-y divide-gray-100">
              {companies.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCompany(c)}
                  className="w-full flex items-center justify-between px-4 py-3 text-sm text-left hover:bg-gray-50"
                >
                  <div>
                    <div className="font-medium">{c.name}</div>
                    <div className="text-gray-400 text-xs mt-0.5">{c.contact_phone}</div>
                  </div>
                  <span className="text-gray-300">→</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {showForm && (
        <CompanyFormModal
          company={editingCompany}
          onClose={() => setShowForm(false)}
          onSaved={() => { setShowForm(false); load() }}
        />
      )}
    </div>
  )
}
