import { useState, useEffect } from 'react'

const brands = ['Ésika', 'Cyzone', 'L\'Bel', 'Accesorios']
const categories = ['Fragancias', 'Maquillaje', 'Cuidado Personal', 'Tratamiento Facial', 'Bijouterie', 'Moda y Hogar']

export default function ProductForm({ onSubmit, initialData, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    category: '',
    price: '',
    offer_price: '',
    stock: '0'
  })
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        brand: initialData.brand || '',
        category: initialData.category || '',
        price: initialData.price || '',
        offer_price: initialData.offer_price || '',
        stock: initialData.stock?.toString() || '0'
      })
      setPreview(initialData.image_url || null)
    } else {
      setFormData({ name: '', brand: '', category: '', price: '', offer_price: '', stock: '0' })
      setPreview(null)
      setImage(null)
    }
  }, [initialData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
      const reader = new FileReader()
      reader.onloadend = () => setPreview(reader.result)
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    const data = new FormData()
    data.append('name', formData.name)
    data.append('brand', formData.brand)
    data.append('category', formData.category)
    data.append('price', formData.price)
    data.append('offer_price', formData.offer_price || '')
    data.append('stock', formData.stock)
    if (image) data.append('image', image)

    await onSubmit(data)
    setSubmitting(false)

    if (!initialData) {
      setFormData({ name: '', brand: '', category: '', price: '', offer_price: '', stock: '0' })
      setImage(null)
      setPreview(null)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1">Imagen</label>
        <div className="flex items-center gap-3">
          {preview && (
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
              <img src={preview} alt="Preview" className="w-full h-full object-cover" />
            </div>
          )}
          <label className="flex-1 cursor-pointer">
            <div className="border-2 border-dashed border-gray-300 rounded-xl py-3 text-center hover:border-mauve transition-colors">
              <span className="text-xs text-gray-500">
                {image ? image.name : 'Seleccionar imagen'}
              </span>
            </div>
            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
          </label>
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1">Nombre *</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-mauve focus:border-transparent"
          placeholder="Nombre del producto"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Marca *</label>
          <select
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-mauve focus:border-transparent bg-white"
          >
            <option value="">Marca</option>
            {brands.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Categoría *</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-mauve focus:border-transparent bg-white"
          >
            <option value="">Categoría</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Precio *</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-mauve focus:border-transparent"
            placeholder="0.00"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Oferta</label>
          <input
            type="number"
            name="offer_price"
            value={formData.offer_price}
            onChange={handleChange}
            min="0"
            step="0.01"
            className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-mauve focus:border-transparent"
            placeholder="0.00"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Stock</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            min="0"
            className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-mauve focus:border-transparent"
            placeholder="0"
          />
        </div>
      </div>

      <div className="flex gap-2 pt-1">
        <button
          type="submit"
          disabled={submitting}
          className="flex-1 py-2.5 bg-mauve text-white text-sm font-semibold rounded-xl hover:bg-mauve-light transition-colors disabled:opacity-50"
        >
          {submitting ? 'Guardando...' : initialData ? 'Actualizar' : 'Agregar'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2.5 border border-gray-300 text-gray-600 text-sm font-medium rounded-xl hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  )
}
