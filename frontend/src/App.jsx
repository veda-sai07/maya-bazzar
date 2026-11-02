import { useCallback, useEffect, useMemo, useState } from 'react'
import * as api from './api.js'
import AddProductForm from './components/AddProductForm.jsx'
import ProductList from './components/ProductList.jsx'
import Cart from './components/Cart.jsx'

const EMPTY_CART = { items: [], totalItems: 0, cartTotal: 0 }

export default function App() {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState(EMPTY_CART)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Runs an API call, shows any error, and returns whether it succeeded.
  const run = useCallback(async (fn) => {
    setError('')
    try {
      return await fn()
    } catch (err) {
      setError(err.message || 'Something went wrong')
      return undefined
    }
  }, [])

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const [p, c] = await Promise.all([api.getProducts(), api.getCart()])
        if (!cancelled) {
          setProducts(p)
          setCart(c)
        }
      } catch {
        if (!cancelled) {
          setError('Cannot reach the Maya Bazzar server. Make sure the backend is running on port 8080.')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const cartQuantities = useMemo(() => {
    const map = {}
    cart.items.forEach((i) => {
      map[i.productId] = i.quantity
    })
    return map
  }, [cart])

  const addProduct = async (name, price) => {
    const created = await api.createProduct(name, price)
    setProducts((prev) => [...prev, created])
  }

  const addToCart = async (productId) => {
    const next = await run(() => api.addToCart(productId, 1))
    if (next) setCart(next)
  }

  const changeQuantity = async (itemId, quantity) => {
    if (quantity < 1) return
    const next = await run(() => api.updateQuantity(itemId, quantity))
    if (next) setCart(next)
  }

  const removeItem = async (itemId) => {
    const next = await run(() => api.removeItem(itemId))
    if (next) setCart(next)
  }

  const clearCart = async () => {
    const next = await run(() => api.clearCart())
    if (next) setCart(next)
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Maya Bazzar</h1>
        <p>Pick your products, set quantities, and see your total before you order.</p>
      </header>

      {error && (
        <div className="banner-error" role="alert">
          {error}
        </div>
      )}

      {loading ? (
        <p className="empty">Loading…</p>
      ) : (
        <main className="layout">
          <section className="panel">
            <h2>Products</h2>
            <AddProductForm onAdd={addProduct} />
            <ProductList
              products={products}
              cartQuantities={cartQuantities}
              onAddToCart={addToCart}
            />
          </section>

          <aside className="panel panel-cart">
            <Cart
              cart={cart}
              onChangeQuantity={changeQuantity}
              onRemove={removeItem}
              onClear={clearCart}
            />
          </aside>
        </main>
      )}
    </div>
  )
}
