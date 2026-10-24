import { supabase } from '../supabaseClient'

export async function fetchCatalog() {
  const { data: vehicleRows, error: vehicleError } = await supabase
    .from('vehicle_categories')
    .select('id,slug,label,sort_order')
    .order('sort_order')

  if (vehicleError) throw vehicleError

  const { data: priceRows, error: priceError } = await supabase
    .from('service_prices')
    .select(
      'price_cents,duration_minutes,service:services(id,slug,label,description,sort_order),vehicle:vehicle_categories(slug)'
    )

  if (priceError) throw priceError

  const vehicleCategories = (vehicleRows || []).map((v) => ({
    id: v.slug,
    uuid: v.id,
    label: v.label,
  }))

  const servicesMap = new Map()
  ;(priceRows || []).forEach((row) => {
    const s = row.service
    if (!servicesMap.has(s.slug)) {
      servicesMap.set(s.slug, {
        id: s.slug,
        uuid: s.id,
        label: s.label,
        description: s.description,
        sortOrder: s.sort_order,
        prices: {},
        duration: {},
      })
    }
    const entry = servicesMap.get(s.slug)
    entry.prices[row.vehicle.slug] = row.price_cents / 100
    entry.duration[row.vehicle.slug] = row.duration_minutes
  })

  const services = Array.from(servicesMap.values()).sort((a, b) => a.sortOrder - b.sortOrder)

  return { vehicleCategories, services }
}
