import { supabase } from '../supabaseClient'

function toISODate(date) {
  return date.toISOString().split('T')[0]
}

export async function fetchTodayBookings() {
  const today = toISODate(new Date())
  const { data, error } = await supabase
    .from('bookings')
    .select(
      'id,customer_name,customer_phone,plate,start_time,duration_minutes,status,service:services(label),vehicle:vehicle_categories(label)'
    )
    .eq('booking_date', today)
    .order('start_time')

  if (error) throw error
  return data || []
}
