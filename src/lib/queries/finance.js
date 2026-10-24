import { supabase } from '../supabaseClient'

function toISODate(d) {
  return d.toISOString().split('T')[0]
}

export async function fetchEntries(startDate, endDate) {
  const { data, error } = await supabase
    .from('financial_entries')
    .select('*')
    .gte('entry_date', toISODate(startDate))
    .lte('entry_date', toISODate(endDate))
    .order('entry_date', { ascending: false })

  if (error) throw error
  return data || []
}

export async function fetchPendingPayables() {
  const { data, error } = await supabase
    .from('financial_entries')
    .select('*')
    .eq('type', 'despesa')
    .eq('status', 'pendente')
    .order('due_date')

  if (error) throw error
  return data || []
}

export async function createEntry(payload) {
  const { error } = await supabase.from('financial_entries').insert({
    type: payload.type,
    description: payload.description,
    amount_cents: Math.round(payload.amount * 100),
    payment_method: payload.paymentMethod || null,
    status: payload.status,
    entry_date: toISODate(payload.date),
    due_date: payload.dueDate ? toISODate(payload.dueDate) : null,
  })
  if (error) throw error
}

export async function markEntryPaid(id) {
  const { error } = await supabase
    .from('financial_entries')
    .update({ status: 'pago' })
    .eq('id', id)
  if (error) throw error
}

export async function deleteEntry(id) {
  const { error } = await supabase.from('financial_entries').delete().eq('id', id)
  if (error) throw error
}
