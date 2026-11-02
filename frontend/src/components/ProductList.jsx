import { money } from '../format.js'

export default function ProductList({ products, cartQuantities, onAddToCart }) {
  if (products.length === 0) {
    return <p className="empty">No products yet. Add one above.</p>
  }

  return (
    <ul className="product-grid">
      {products.map((p) => {
        const inCart = cartQuantities[p.id] || 0
        return (
          <li key={p.id} className="product-card">
            <div className="product-info">
              <span className="product-name">{p.name}</span>
              <span className="product-price">{money(p.price)}</span>
            </div>
            <button className="btn btn-primary" onClick={() => onAddToCart(p.id)}>
              Add to cart
            </button>
            {inCart > 0 && <span className="in-cart-badge">{inCart} in cart</span>}
          </li>
        )
      })}
    </ul>
  )
}
