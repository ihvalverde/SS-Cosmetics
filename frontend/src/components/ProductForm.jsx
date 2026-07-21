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
      setFormData({
        name: '',
        brand: '',
        category: '',
        price: '',
        offer_price: '',
        stock: '0'
      })
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
    if (image) {
      data.append('image', image)
    }

    await onSubmit(data)
    setSubmitting(false)

    if (!initialData) {
      setFormData({
        name: '',
        brand: '',
        category: '',
        price: '',
        offer_price: '',
        stock: '0'
      })
      setImage(null)
      setPreview(null)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Imagen del producto
        </label>
        <div className="flex items-center gap-4">
          {preview && (
            <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
              <img src={preview} alt="Preview" className="w-full h-full object-cover" />
            </div>
          )}
          <label className="flex-1 cursor-pointer">
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:border-mauve transition-colors">
              <svg className="w-8 h-8 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm text-gray-500">
                {image ? image.name : 'Seleccionar imagen'}
              </span>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nombre del producto *
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-mauve focus:border-transparent"
          placeholder="Ej: Base de maquillaje..."
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Marca *
          </label>
          <select
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-mauve focus:border-transparent bg-white"
          >
            <option value="">Seleccionar</option>
            {brands.map(brand => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Categoría *
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-mauve focus:border-transparent bg-white"
          >
            <option value="">Seleccionar</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Precio (S/) *
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-mauve focus:border-transparent"
            placeholder="0.00"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Precio oferta (S/)
          </label>
          <input
            type="number"
            name="offer_price"
            value={formData.offer_price}
            onChange={handleChange}
            min="0"
            step="0.01"
            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-mauve focus:border-transparent"
            placeholder="0.00"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Stock
          </label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            min="0"
            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-mauve focus:border-transparent"
            placeholder="0"
          />
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="flex-1 py-3 bg-mauve text-white font-semibold rounded-xl hover:bg-mauve-light transition-colors disabled:opacity-50"
        >
          {submitting ? 'Guardando...' : initialData ? 'Actualizar' : 'Agregar Producto'}
        </button>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  )
}