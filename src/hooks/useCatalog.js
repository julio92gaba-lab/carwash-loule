import { services, vehicleCategories } from '../lib/demoContent'

export function useCatalog() {
  return { vehicleCategories, services, loading: false, error: null }
}
