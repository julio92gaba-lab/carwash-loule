import { supabase } from '../supabaseClient'

export async function fetchAvulsoBookings() {
  const { data, error } = await supabase
    .from('bookings')
    .select('id,customer_name,customer_phone,plate,booking_date,start_time,status,price_cents,service:services(label),vehicle:vehicle_categories(label)')
    .is('company_id', null)
    .order('booking_date', { ascending: false })

  if (error) throw error
  return data || []
}

export function groupByCustomer(bookings) {
  const map = new Map()
  bookings.forEach((b) => {
    const key = b.customer_phone
    if (!map.has(key)) {
      map.set(key, {
        phone: b.customer_phone,
        name: b.customer_name,
        plates: new Set(),
        visits: 0,
        lastVisit: b.booking_date,
        bookings: [],
      })
    }
    const entry = map.get(key)
    entry.visits += 1
    entry.plates.add(b.plate)
    if (b.booking_date > entry.lastVisit) entry.lastVisit = b.booking_date
    entry.bookings.push(b)
  })
  return Array.from(map.values()).map((c) => ({ ...c, plates: Array.from(c.plates) }))
}
