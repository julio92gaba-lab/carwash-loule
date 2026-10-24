import { supabase } from '../supabaseClient'

export async function fetchCompanies() {
  const { data, error } = await supabase.from('companies').select('*').order('name')
  if (error) throw error
  return data || []
}

export async function createCompany(payload) {
  const { data, error } = await supabase
    .from('companies')
    .insert({ name: payload.name, contact_phone: payload.phone, contact_email: payload.email, notes: payload.notes })
    .select()
    .single()
  if (error) throw error
  return data
}

export async function updateCompany(id, payload) {
  const { error } = await supabase
    .from('companies')
    .update({ name: payload.name, contact_phone: payload.phone, contact_email: payload.email, notes: payload.notes })
    .eq('id', id)
  if (error) throw error
}

export async function deleteCompany(id) {
  const { error } = await supabase.from('companies').delete().eq('id', id)
  if (error) throw error
}

export async function fetchCompanyVehicles(companyId) {
  const { data, error } = await supabase
    .from('company_vehicles')
    .select('*')
    .eq('company_id', companyId)
    .order('plate')
  if (error) throw error
  return data || []
}

export async function addCompanyVehicle(companyId, plate, label) {
  const { error } = await supabase.from('company_vehicles').insert({ company_id: companyId, plate, label })
  if (error) throw error
}

export async function deleteCompanyVehicle(id) {
  const { error } = await supabase.from('company_vehicles').delete().eq('id', id)
  if (error) throw error
}

export async function fetchCompanyBookings(companyId) {
  const { data, error } = await supabase
    .from('bookings')
    .select('id,booking_date,start_time,status,price_cents,paid,plate,service:services(label),vehicle:vehicle_categories(label)')
    .eq('company_id', companyId)
    .order('booking_date', { ascending: false })
  if (error) throw error
  return data || []
}

export async function markBookingPaid(id, paid) {
  const { error } = await supabase.from('bookings').update({ paid }).eq('id', id)
  if (error) throw error
}
