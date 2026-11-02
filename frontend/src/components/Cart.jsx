import { money } from '../format.js'

export default function Cart({ cart, onChangeQuantity, onRemove, onClear }) {
  const { items, totalItems, cartTotal } = cart

  if (items.length === 0) {
    return (
      <div className="cart">
        <h2>Your cart</h2>
        <p className="empty">Your cart is empty. Add something from the products.</p>
      </div>
    )
  }

  return (
    <div className="cart">
      <h2>
        Your cart <span className="count">({totalItems} {totalItems === 1 ? 'item' : 'items'})</span>
      </h2>

      <ul className="cart-list">
        {items.map((item) => (
          <li key={item.id} className="cart-row">
            <div className="cart-row-top">
              <span className="cart-name">{item.name}</span>
              <button
                className="link-danger"
                onClick={() => onRemove(item.id)}
                aria-label={`Remove ${item.name}`}
              >
                Remove
              </button>
            </div>
            <div className="cart-row-bottom">
              <div className="qty">
                <button
                  className="qty-btn"
                  onClick={() => onChangeQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                  aria-label={`Decrease quantity of ${item.name}`}
                >
                  −
                </button>
                <span className="qty-value" aria-live="polite">{item.quantity}</span>
                <button
                  className="qty-btn"
                  onClick={() => onChangeQuantity(item.id, item.quantity + 1)}
                  disabled={item.quantity >= 999}
                  aria-label={`Increase quantity of ${item.name}`}
                >
                  +
                </button>
              </div>
              <span className="cart-calc">
                {money(item.price)} × {item.quantity}
              </span>
              <span className="cart-line-total">{money(item.lineTotal)}</span>
            </div>
          </li>
        ))}
      </ul>

      <div className="cart-total">
        <span>Cart total</span>
        <strong>{money(cartTotal)}</strong>
      </div>

      <button className="btn btn-ghost" onClick={onClear}>
        Clear cart
      </button>
    </div>
  )
}
