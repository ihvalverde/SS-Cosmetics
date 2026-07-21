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
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <img src="/logo-ss.png" alt="S&S" className="w-9 h-9 rounded-full object-cover" />
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-mauve-text">Panel Admin</h1>
                <p className="text-xs text-gray-400">Gestiona tu catálogo</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleShareLink}
                className={`hidden sm:flex px-3 py-2 text-sm font-medium rounded-xl transition-colors items-center gap-2 ${
                  copied
                    ? 'bg-green-100 text-green-700'
                    : 'bg-[#25D366] text-white hover:bg-[#128C7E]'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                {copied ? '¡Copiado!' : 'Compartir'}
              </button>
              <button
                onClick={() => { setEditingProduct(null); setShowForm(!showForm) }}
                className="hidden lg:flex px-4 py-2 text-sm font-semibold bg-mauve text-white rounded-xl hover:bg-mauve-light transition-colors items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Nuevo Producto
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-4">
        {message.text && (
          <div className={`mb-4 p-3 rounded-xl text-sm font-medium ${
            message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {message.text}
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          <div className="bg-white rounded-xl shadow-sm p-3 sm:p-4 text-center">
            <div className="text-2xl sm:text-3xl font-bold text-mauve-text">{stats.total}</div>
            <div className="text-xs text-gray-400 mt-1">Productos</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-3 sm:p-4 text-center">
            <div className="text-2xl sm:text-3xl font-bold text-mauve">{stats.onOffer}</div>
            <div className="text-xs text-gray-400 mt-1">En oferta</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-3 sm:p-4 text-center">
            <div className="text-2xl sm:text-3xl font-bold text-red-400">{stats.outOfStock}</div>
            <div className="text-xs text-gray-400 mt-1">Sin stock</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-3 sm:p-4 text-center">
            <div className="text-2xl sm:text-3xl font-bold text-mauve-text">{stats.brands}</div>
            <div className="text-xs text-gray-400 mt-1">Marcas</div>
          </div>
        </div>

        <div className="lg:hidden mb-4">
          <button
            onClick={handleShareLink}
            className={`w-full py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 ${
              copied
                ? 'bg-green-100 text-green-700'
                : 'bg-[#25D366] text-white'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            {copied ? '¡Copiado!' : 'Compartir Catálogo'}
          </button>
        </div>

        <div className="grid lg:grid-cols-5 gap-4">
          {showForm && (
            <div className={`${showForm && editingProduct ? 'lg:col-span-2' : 'lg:col-span-2'} order-first lg:order-first`}>
              <div className="bg-white rounded-2xl shadow-md p-4 lg:p-6 lg:sticky lg:top-20">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base font-semibold text-mauve-text">
                    {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
                  </h2>
                  <button
                    onClick={handleCancelEdit}
                    className="lg:hidden p-1 text-gray-400 hover:text-gray-600"
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
          )}

          <div className={`${showForm ? 'lg:col-span-3' : 'lg:col-span-5'} order-last lg:order-last`}>
            <div className="bg-white rounded-2xl shadow-md p-4 lg:p-6">
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <div className="relative flex-1">
                  <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Buscar por nombre, marca o categoría..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-mauve focus:border-transparent bg-gray-50 text-sm"
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
                  className="px-4 py-2.5 text-sm text-mauve hover:bg-mauve-bg rounded-xl transition-colors flex items-center justify-center gap-2 border border-gray-200"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span className="hidden sm:inline">Actualizar</span>
                </button>
              </div>

              <div className="flex gap-2 mb-4 overflow-x-auto pb-1 -mx-1 px-1">
                {['', 'Ésika', 'Cyzone', 'L\'Bel', 'Accesorios'].map(brand => (
                  <button
                    key={brand}
                    onClick={() => setBrandFilter(brand)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                      brandFilter === brand
                        ? 'bg-mauve text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {brand || 'Todos'}
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-gray-400">
                  {search || brandFilter
                    ? `${filteredProducts.length} de ${products.length} productos`
                    : `${products.length} productos`
                  }
                </p>
                {search || brandFilter ? (
                  <button
                    onClick={() => { setSearch(''); setBrandFilter('') }}
                    className="text-xs text-mauve hover:underline"
                  >
                    Limpiar filtros
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
          </div>
        </div>
      </main>

      <button
        onClick={() => { setEditingProduct(null); setShowForm(true); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
        className="lg:hidden fixed bottom-6 right-6 w-14 h-14 bg-mauve text-white rounded-full shadow-lg flex items-center justify-center hover:bg-mauve-light transition-colors z-50"
      >
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  )
}
