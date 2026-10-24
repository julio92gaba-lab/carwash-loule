import { supabase } from '../supabaseClient'

export async function fetchSettings() {
  const { data, error } = await supabase.from('settings').select('*').eq('id', 1).single()
  if (error) throw error
  return {
    businessName: data.business_name,
    businessHours: data.business_hours,
    slotIntervalMinutes: data.slot_interval_minutes,
    simultaneousCapacity: data.simultaneous_capacity,
  }
}
