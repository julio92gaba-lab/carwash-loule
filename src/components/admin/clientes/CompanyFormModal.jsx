import { useState } from 'react'
import { createCompany, updateCompany } from '../../../lib/queries/companies'

export default function CompanyFormModal({ company, onClose, onSaved }) {
  const [name, setName] = useState(company?.name || '')
  const [phone, setPhone] = useState(company?.contact_phone || '')
  const [email, setEmail] = useState(company?.contact_email || '')
  const [notes, setNotes] = useState(company?.notes || '')
  const [saving, setSaving] = useState(false)

  async function handleSave(e) {
    e.preventDefault()
    setSaving(true)
    if (company) {
      await updateCompany(company.id, { name, phone, email, notes })
    } else {
      await createCompany({ name, phone, email, notes })
    }
    setSaving(false)
    onSaved()
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <form onSubmit={handleSave} className="bg-white rounded-xl w-full max-w-sm p-5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-lg">{company ? 'Editar empresa' : 'Nova empresa'}</h2>
          <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-700">✕</button>
        </div>
        <div className="flex flex-col gap-3 text-sm">
          <div>
            <label className="block text-gray-600 mb-1">Nome</label>
            <input value={name} onChange={(e) => setName(e.target.value)} required className="w-full border border-gray-300 rounded-md px-3 py-2" />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Contacto</label>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full border border-gray-300 rounded-md px-3 py-2" />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border border-gray-300 rounded-md px-3 py-2" />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Notas</label>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} className="w-full border border-gray-300 rounded-md px-3 py-2" />
          </div>
          <button type="submit" disabled={saving} className="mt-2 w-full bg-gray-900 text-white rounded-md py-2 font-medium disabled:opacity-40">
            {saving ? 'A guardar...' : 'Guardar'}
          </button>
        </div>
      </form>
    </div>
  )
}
