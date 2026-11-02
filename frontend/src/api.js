// Thin wrapper around the Spring Boot REST API.
// Every cart call returns the complete, recalculated cart.

async function request(path, options = {}) {
  const res = await fetch(path, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  let body = null
  try {
    body = await res.json()
  } catch {
    // empty body
  }
  if (!res.ok) {
    throw new Error(body?.error || `Request failed (${res.status})`)
  }
  return body
}

export const getProducts = () => request('/api/products')

export const createProduct = (name, price) =>
  request('/api/products', {
    method: 'POST',
    body: JSON.stringify({ name, price }),
  })

export const getCart = () => request('/api/cart')

export const addToCart = (productId, quantity = 1) =>
  request('/api/cart/items', {
    method: 'POST',
    body: JSON.stringify({ productId, quantity }),
  })

export const updateQuantity = (itemId, quantity) =>
  request(`/api/cart/items/${itemId}`, {
    method: 'PUT',
    body: JSON.stringify({ quantity }),
  })

export const removeItem = (itemId) =>
  request(`/api/cart/items/${itemId}`, { method: 'DELETE' })

export const clearCart = () => request('/api/cart', { method: 'DELETE' })
