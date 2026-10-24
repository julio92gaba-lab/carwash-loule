import { supabase } from '../supabaseClient'

export async function fetchProducts() {
  const { data, error } = await supabase.from('products').select('*').order('name')
  if (error) throw error
  return data || []
}

export async function createProduct(payload) {
  const { error } = await supabase.from('products').insert({
    name: payload.name,
    unit: payload.unit || null,
    quantity: payload.quantity || 0,
    min_quantity: payload.minQuantity || 0,
  })
  if (error) throw error
}

export async function updateProduct(id, payload) {
  const { error } = await supabase
    .from('products')
    .update({ name: payload.name, unit: payload.unit || null, min_quantity: payload.minQuantity || 0 })
    .eq('id', id)
  if (error) throw error
}

export async function deleteProduct(id) {
  const { error } = await supabase.from('products').delete().eq('id', id)
  if (error) throw error
}

export async function fetchMovements(productId) {
  const { data, error } = await supabase
    .from('stock_movements')
    .select('*')
    .eq('product_id', productId)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data || []
}

export async function createMovement(payload) {
  const { error } = await supabase.from('stock_movements').insert({
    product_id: payload.productId,
    type: payload.type,
    quantity: payload.quantity,
    note: payload.note || null,
  })
  if (error) throw error
}
