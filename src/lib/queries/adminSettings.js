import { supabase } from '../supabaseClient'

export async function fetchSettingsRow() {
  const { data, error } = await supabase.from('settings').select('*').eq('id', 1).single()
  if (error) throw error
  return data
}

export async function updateSettings(payload) {
  const { error } = await supabase
    .from('settings')
    .update({
      business_name: payload.businessName,
      business_hours: payload.businessHours,
      slot_interval_minutes: payload.slotIntervalMinutes,
      simultaneous_capacity: payload.simultaneousCapacity,
    })
    .eq('id', 1)
  if (error) throw error
}

export async function fetchVehicleCategoriesRaw() {
  const { data, error } = await supabase.from('vehicle_categories').select('*').order('sort_order')
  if (error) throw error
  return data || []
}

export async function createVehicleCategory(payload) {
  const { error } = await supabase.from('vehicle_categories').insert({
    slug: payload.slug,
    label: payload.label,
    sort_order: payload.sortOrder,
  })
  if (error) throw error
}

export async function updateVehicleCategory(id, payload) {
  const { error } = await supabase
    .from('vehicle_categories')
    .update({ label: payload.label, sort_order: payload.sortOrder })
    .eq('id', id)
  if (error) throw error
}

export async function deleteVehicleCategory(id) {
  const { error } = await supabase.from('vehicle_categories').delete().eq('id', id)
  if (error) throw error
}

export async function fetchServicesRaw() {
  const { data, error } = await supabase.from('services').select('*').order('sort_order')
  if (error) throw error
  return data || []
}

export async function createService(payload) {
  const { error } = await supabase.from('services').insert({
    slug: payload.slug,
    label: payload.label,
    description: payload.description,
    sort_order: payload.sortOrder,
  })
  if (error) throw error
}

export async function updateService(id, payload) {
  const { error } = await supabase
    .from('services')
    .update({ label: payload.label, description: payload.description, sort_order: payload.sortOrder })
    .eq('id', id)
  if (error) throw error
}

export async function deleteService(id) {
  const { error } = await supabase.from('services').delete().eq('id', id)
  if (error) throw error
}

export async function fetchServicePricesRaw() {
  const { data, error } = await supabase.from('service_prices').select('*')
  if (error) throw error
  return data || []
}

export async function upsertServicePrice(serviceId, vehicleCategoryId, priceCents, durationMinutes) {
  const { error } = await supabase
    .from('service_prices')
    .upsert(
      { service_id: serviceId, vehicle_category_id: vehicleCategoryId, price_cents: priceCents, duration_minutes: durationMinutes },
      { onConflict: 'service_id,vehicle_category_id' }
    )
  if (error) throw error
}

export async function deleteServicePrice(serviceId, vehicleCategoryId) {
  const { error } = await supabase
    .from('service_prices')
    .delete()
    .eq('service_id', serviceId)
    .eq('vehicle_category_id', vehicleCategoryId)
  if (error) throw error
}
