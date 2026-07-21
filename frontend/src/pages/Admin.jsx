import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ProductForm from '../components/ProductForm'
import ProductList from '../components/ProductList'

const API_BASE = '/api'

export default function Admin() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingProduct, setEditingProduct] = useState(null)
  const [message, setMessage] = useState({ type: '', text: '' })
  const [copied, setCopied] = useState(false)

  const handleShareLink = async () => {
    const link = window.location.origin
    try {
      await navigator.clipboard.writeText(link)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      const input = document.createElement('input')
      input.value = link
      document.body.appendChild(input)
      input.select()
      document.execCommand('copy')
      document.body.removeChild(input)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${API_BASE}/products`)
      const data = await response.json()
      setProducts(data)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (formData) => {
    try {
      const url = editingProduct
        ? `${API_BASE}/products/${editingProduct.id}`
        : `${API_BASE}/products`

      const method = editingProduct ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        body: formData
      })

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}))
        throw new Error(errData.error || `Error HTTP ${response.status}`)
      }

      setMessage({
        type: 'success',
        text: editingProduct ? 'Producto actualizado correctamente' : 'Producto creado correctamente'
      })
      setEditingProduct(null)
      fetchProducts()
    } catch (error) {
      setMessage({ type: 'error', text: error.message })
    }

    setTimeout(() => setMessage({ type: '', text: '' }), 3000)
  }

  const handleDelete = async (id) => {
    if (!confirm('¿Estás seguro de eliminar este producto?')) return

    try {
      const response = await fetch(`${API_BASE}/products/${id}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Error al eliminar el producto')
      }

      setMessage({ type: 'success', text: 'Producto eliminado correctamente' })
      fetchProducts()
    } catch (error) {
      setMessage({ type: 'error', text: error.message })
    }

    setTimeout(() => setMessage({ type: '', text: '' }), 3000)
  }

  const handleEdit = (product) => {
    setEditingProduct(product)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCancelEdit = () => {
    setEditingProduct(null)
  }

  return (
    <div className="min-h-screen bg-mauve-bg">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6 text-mauve-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </Link>
              <div>
                <h1 className="text-xl font-bold text-mauve-text">Panel de Administración</h1>
                <p className="text-sm text-gray-500">Gestiona tu catálogo de productos</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleShareLink}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-2 ${
                  copied
                    ? 'bg-green-100 text-green-700'
                    : 'bg-[#25D366] text-white hover:bg-[#128C7E]'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                {copied ? '¡Copiado!' : 'Compartir Link'}
              </button>
              <Link
                to="/"
                className="px-4 py-2 text-sm font-medium text-mauve hover:bg-mauve-bg rounded-lg transition-colors"
              >
                Ver Catálogo
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {message.text && (
          <div className={`mb-6 p-4 rounded-xl ${
            message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {message.text}
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-md p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-mauve-text mb-4">
                {editingProduct ? 'Editar Producto' : 'Agregar Producto'}
              </h2>
              <ProductForm
                onSubmit={handleSubmit}
                initialData={editingProduct}
                onCancel={editingProduct ? handleCancelEdit : null}
              />
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-mauve-text">
                  Productos ({products.length})
                </h2>
                <button
                  onClick={fetchProducts}
                  className="px-3 py-1 text-sm text-mauve hover:bg-mauve-bg rounded-lg transition-colors"
                >
                  Actualizar
                </button>
              </div>
              <ProductList
                products={products}
                loading={loading}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}