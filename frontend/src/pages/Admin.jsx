import { useState, useEffect, useMemo } from 'react'
import ProductForm from '../components/ProductForm'
import ProductList from '../components/ProductList'

const API_BASE = '/api'

export default function Admin() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingProduct, setEditingProduct] = useState(null)
  const [message, setMessage] = useState({ type: '', text: '' })
  const [copied, setCopied] = useState(false)
  const [search, setSearch] = useState('')
  const [brandFilter, setBrandFilter] = useState('')
  const [showForm, setShowForm] = useState(false)

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

  const filteredProducts = useMemo(() => {
    let result = products
    if (brandFilter) {
      result = result.filter(p => p.brand === brandFilter)
    }
    if (search) {
      const q = search.toLowerCase()
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      )
    }
    return result
  }, [products, brandFilter, search])

  const stats = useMemo(() => ({
    total: products.length,
    onOffer: products.filter(p => p.offer_price && p.offer_price < p.price).length,
    outOfStock: products.filter(p => p.stock === 0).length,
    brands: [...new Set(products.map(p => p.brand))].length,
  }), [products])

  const handleSubmit = async (formData) => {
    try {
      const url = editingProduct
        ? `${API_BASE}/products/${editingProduct.id}`
        : `${API_BASE}/products`

      const method = editingProduct ? 'PUT' : 'POST'

      const response = await fetch(url, { method, body: formData })

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}))
        throw new Error(errData.error || `Error HTTP ${response.status}`)
      }

      setMessage({
        type: 'success',
        text: editingProduct ? 'Producto actualizado' : 'Producto agregado'
      })
      setEditingProduct(null)
      setShowForm(false)
      fetchProducts()
    } catch (error) {
      setMessage({ type: 'error', text: error.message })
    }
    setTimeout(() => setMessage({ type: '', text: '' }), 3000)
  }

  const handleDelete = async (id) => {
    if (!confirm('¿Eliminar este producto?')) return
    try {
      const response = await fetch(`${API_BASE}/products/${id}`, { method: 'DELETE' })
      if (!response.ok) throw new Error('Error al eliminar')
      setMessage({ type: 'success', text: 'Producto eliminado' })
      fetchProducts()
    } catch (error) {
      setMessage({ type: 'error', text: error.message })
    }
    setTimeout(() => setMessage({ type: '', text: '' }), 3000)
  }

  const handleEdit = (product) => {
    setEditingProduct(product)
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCancelEdit = () => {
    setEditingProduct(null)
    setShowForm(false)
  }

  return (
    <div className="min-h-screen bg-mauve-bg">
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2.5 sm:py-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <img src="/logo-ss.png" alt="S&S" className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover" />
              <div>
                <h1 className="text-base sm:text-lg font-semibold text-mauve-text tracking-wide leading-tight">Admin</h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleShareLink}
                className={`p-2 sm:px-3 sm:py-2 text-xs sm:text-sm font-medium rounded-xl transition-colors flex items-center gap-1.5 ${
                  copied
                    ? 'bg-green-100 text-green-700'
                    : 'bg-[#25D366] text-white hover:bg-[#128C7E]'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                <span className="hidden sm:inline">{copied ? '¡Copiado!' : 'Compartir'}</span>
                <span className="sm:hidden">{copied ? '¡Listo!' : ''}</span>
              </button>
              <button
                onClick={() => { setEditingProduct(null); setShowForm(true) }}
                className="hidden sm:flex px-3 py-2 text-sm font-semibold bg-mauve text-white rounded-xl hover:bg-mauve-light transition-colors items-center gap-1.5"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Nuevo
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
        <div className="text-center mb-4">
          <h2 className="text-2xl sm:text-3xl font-light tracking-wide text-mauve-text">Gestión de Productos</h2>
          <p className="mt-1 text-xs sm:text-sm text-gray-400 font-light tracking-widest uppercase">Administra tu catálogo</p>
        </div>
        {message.text && (
          <div className={`mb-3 p-3 rounded-xl text-sm font-medium ${
            message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {message.text}
          </div>
        )}

        <div className="grid grid-cols-4 gap-2 sm:gap-3 mb-4">
          <div className="bg-white rounded-xl shadow-sm p-2.5 sm:p-4 text-center">
            <div className="text-xl sm:text-3xl font-bold text-mauve-text">{stats.total}</div>
            <div className="text-[10px] sm:text-xs text-gray-400 mt-0.5">Productos</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-2.5 sm:p-4 text-center">
            <div className="text-xl sm:text-3xl font-bold text-mauve">{stats.onOffer}</div>
            <div className="text-[10px] sm:text-xs text-gray-400 mt-0.5">Oferta</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-2.5 sm:p-4 text-center">
            <div className="text-xl sm:text-3xl font-bold text-red-400">{stats.outOfStock}</div>
            <div className="text-[10px] sm:text-xs text-gray-400 mt-0.5">Sin stock</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-2.5 sm:p-4 text-center">
            <div className="text-xl sm:text-3xl font-bold text-mauve-text">{stats.brands}</div>
            <div className="text-[10px] sm:text-xs text-gray-400 mt-0.5">Marcas</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-3 sm:p-4 lg:p-6">
          <div className="flex gap-2 sm:gap-3 mb-3">
            <div className="relative flex-1">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Buscar..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-8 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-mauve focus:border-transparent bg-gray-50 text-sm"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            <button
              onClick={fetchProducts}
              className="px-3 py-2.5 text-mauve hover:bg-mauve-bg rounded-xl transition-colors border border-gray-200 flex-shrink-0"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>

          <div className="flex gap-1.5 sm:gap-2 mb-3 overflow-x-auto pb-1 -mx-1 px-1">
            {['', 'Ésika', 'Cyzone', 'L\'Bel', 'Accesorios'].map(brand => (
              <button
                key={brand}
                onClick={() => setBrandFilter(brand)}
                className={`px-2.5 sm:px-3 py-1 sm:py-1.5 text-[11px] sm:text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                  brandFilter === brand
                    ? 'bg-mauve text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {brand || 'Todos'}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between mb-2">
            <p className="text-xs sm:text-sm text-gray-400">
              {search || brandFilter
                ? `${filteredProducts.length} de ${products.length}`
                : `${products.length} productos`
              }
            </p>
            {search || brandFilter ? (
              <button
                onClick={() => { setSearch(''); setBrandFilter('') }}
                className="text-xs text-mauve hover:underline"
              >
                Limpiar
              </button>
            ) : null}
          </div>

          <ProductList
            products={filteredProducts}
            loading={loading}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </main>

      {showForm && (
        <div className="fixed inset-0 z-50 sm:relative sm:inset-auto">
          <div
            className="absolute inset-0 bg-black bg-opacity-40 sm:hidden"
            onClick={handleCancelEdit}
          />
          <div className="absolute bottom-0 left-0 right-0 sm:relative sm:inset-auto bg-mauve-bg sm:bg-transparent max-h-[85vh] overflow-y-auto rounded-t-2xl sm:rounded-0 sm:max-h-none">
            <div className="bg-white sm:rounded-2xl sm:shadow-md p-4 sm:p-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-base font-semibold text-mauve-text">
                  {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
                </h2>
                <button
                  onClick={handleCancelEdit}
                  className="sm:hidden p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <ProductForm
                onSubmit={handleSubmit}
                initialData={editingProduct}
                onCancel={handleCancelEdit}
              />
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => { setEditingProduct(null); setShowForm(true); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
        className="sm:hidden fixed bottom-5 right-5 w-14 h-14 bg-mauve text-white rounded-full shadow-lg flex items-center justify-center hover:bg-mauve-light transition-colors z-30"
      >
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  )
}
