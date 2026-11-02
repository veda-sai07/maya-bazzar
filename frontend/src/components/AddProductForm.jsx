import { useState } from 'react'

export default function AddProductForm({ onAdd }) {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    if (!name.trim()) return setError('Enter a product name')
    const parsed = Number(price)
    if (!price || Number.isNaN(parsed) || parsed <= 0) {
      return setError('Enter a price greater than 0')
    }
    setSaving(true)
    try {
      await onAdd(name.trim(), parsed.toFixed(2))
      setName('')
      setPrice('')
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <form className="add-form" onSubmit={submit}>
      <h3>Add a product</h3>
      <div className="add-form-row">
        <input
          type="text"
          placeholder="Product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-label="Product name"
        />
        <input
          type="number"
          step="0.01"
          min="0.01"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          aria-label="Price"
        />
        <button type="submit" className="btn btn-primary" disabled={saving}>
          {saving ? 'Adding…' : 'Add'}
        </button>
      </div>
      {error && <p className="form-error">{error}</p>}
    </form>
  )
}
