import { supabase } from '../supabaseClient'

function toISODate(date) {
  return date.toISOString().split('T')[0]
}

const bookingSelect =
  'id,customer_name,customer_phone,plate,booking_date,start_time,duration_minutes,status,price_cents,paid,company_id,service:services(id,label),vehicle:vehicle_categories(id,label),company:companies(id,name)'

export async function fetchBookingsForDate(date) {
  const { data, error } = await supabase
    .from('bookings')
    .select(bookingSelect)
    .eq('booking_date', toISODate(date))
    .order('start_time')

  if (error) throw error
  return data || []
}

export async function fetchBookingsForRange(startDate, endDate) {
  const { data, error } = await supabase
    .from('bookings')
    .select('booking_date,status')
    .gte('booking_date', toISODate(startDate))
    .lte('booking_date', toISODate(endDate))

  if (error) throw error
  return data || []
}

export async function updateBookingStatus(id, status) {
  const { error } = await supabase.from('bookings').update({ status }).eq('id', id)
  if (error) throw error
}

export async function createManualBooking(payload) {
  const { data, error } = await supabase
    .from('bookings')
    .insert({
      vehicle_category_id: payload.vehicleUuid,
      service_id: payload.serviceUuid,
      customer_name: payload.name,
      customer_phone: payload.phone,
      plate: payload.plate,
      booking_date: toISODate(payload.date),
      start_time: payload.time,
      duration_minutes: payload.durationMinutes,
      price_cents: Math.round(payload.price * 100),
      company_id: payload.companyId || null,
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function fetchBlockedPeriods(date) {
  const { data, error } = await supabase
    .from('blocked_periods')
    .select('id,start_time,end_time,reason')
    .eq('blocked_date', toISODate(date))
    .order('start_time')

  if (error) throw error
  return data || []
}

export async function createBlockedPeriod({ date, startTime, endTime, reason }) {
  const { error } = await supabase.from('blocked_periods').insert({
    blocked_date: toISODate(date),
    start_time: startTime || null,
    end_time: endTime || null,
    reason: reason || null,
  })
  if (error) throw error
}

export async function deleteBlockedPeriod(id) {
  const { error } = await supabase.from('blocked_periods').delete().eq('id', id)
  if (error) throw error
}
