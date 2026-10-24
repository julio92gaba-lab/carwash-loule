export const vehicleCategories = [
  { id: 'citadino', label: 'Citadino' },
  { id: 'suv', label: 'SUV / Carrinha' },
  { id: 'moto', label: 'Moto' },
  { id: 'comercial', label: 'Comercial' },
]

export const services = [
  { id: 'express', label: 'Lavagem Express', description: 'Exterior cuidado, jantes e acabamento rápido.', price: 15, duration: '30 min', durationMinutes: 30, prices: { citadino: 15, suv: 20, moto: 10, comercial: 25 } },
  { id: 'completa', label: 'Lavagem Completa', description: 'Interior, exterior e atenção aos detalhes.', price: 28, duration: '1h 15 min', durationMinutes: 75, featured: true, prices: { citadino: 28, suv: 35, moto: 18, comercial: 42 } },
  { id: 'premium', label: 'Detalhe Premium', description: 'Um tratamento aprofundado para devolver o brilho.', price: 55, duration: '2h 30 min', durationMinutes: 150, prices: { citadino: 55, suv: 70, moto: 40, comercial: 85 } },
]
