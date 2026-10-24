import { useState } from 'react'

export default function BusinessInfoForm({ settings, onSave }) {
  const [name, setName] = useState(settings.business_name)
  const [saving, setSaving] = useState(false)

  async function handleSave(e) {
    e.preventDefault()
    setSaving(true)
    await onSave({ businessName: name })
    setSaving(false)
  }

  return (
    <form onSubmit={handleSave} className="bg-white border border-gray-200 rounded-xl p-5">
      <h2 className="font-medium mb-4">Dados do estabelecimento</h2>
      <label className="block text-sm text-gray-600 mb-1">Nome</label>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full max-w-sm border border-gray-300 rounded-md px-3 py-2 text-sm"
      />
      <button type="submit" disabled={saving} className="mt-4 bg-gray-900 text-white text-sm px-4 py-2 rounded-md disabled:opacity-40">
        {saving ? 'A guardar...' : 'Guardar'}
      </button>
    </form>
  )
}
