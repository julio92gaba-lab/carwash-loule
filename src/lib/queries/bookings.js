import { supabase } from '../supabaseClient'

function toISODate(date) {
  return date.toISOString().split('T')[0]
}

export async function fetchBookingsForDate(date) {
  const { data, error } = await supabase
    .from('available_slots_raw')
    .select('start_time,duration_minutes')
    .eq('booking_date', toISODate(date))

  if (error) throw error

  return (data || []).map((b) => ({
    start: b.start_time.slice(0, 5),
    durationMinutes: b.duration_minutes,
  }))
}

export async function fetchBlockedPeriodsForDate(date) {
  const { data, error } = await supabase
    .from('blocked_periods')
    .select('start_time,end_time')
    .eq('blocked_date', toISODate(date))

  if (error) throw error

  return (data || []).map((p) => ({
    start: p.start_time ? p.start_time.slice(0, 5) : null,
    end: p.end_time ? p.end_time.slice(0, 5) : null,
  }))
}

export async function createBooking(booking) {
  const { data, error } = await supabase
    .from('bookings')
    .insert({
      vehicle_category_id: booking.vehicleUuid,
      service_id: booking.serviceUuid,
      customer_name: booking.name,
      customer_phone: booking.phone,
      plate: booking.plate || null,
      car_model: booking.carModel || null,
      booking_date: toISODate(booking.date),
      start_time: booking.time,
      duration_minutes: booking.durationMinutes,
      price_cents: Math.round(booking.price * 100),
      company_id: booking.companyId || null,
    })
    .select()
    .single()

  if (error) throw error
  return data
}
