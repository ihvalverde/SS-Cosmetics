import { useState, useEffect } from 'react'
import Header from '../components/Header'
import ProductGrid from '../components/ProductGrid'
import FilterBar from '../components/FilterBar'

const API_BASE = '/api'

export default function Catalog() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedBrand, setSelectedBrand] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [sortBy, setSortBy] = useState('alpha-asc')

  useEffect(() => {
    fetchProducts()
  }, [selectedBrand, selectedCategory, search, sortBy])

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (selectedBrand) params.append('brand', selectedBrand)
      if (selectedCategory) params.append('category', selectedCategory)
      if (search) params.append('search', search)
      params.append('sort', sortBy)

      const response = await fetch(`${API_BASE}/products?${params}`)
      const data = await response.json()
      setProducts(data)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-mauve-bg">
      <Header search={search} setSearch={setSearch} />
      <section className="max-w-7xl mx-auto px-4 pt-8 pb-2 text-center">
        <h2 className="text-3xl sm:text-4xl font-light tracking-wide text-mauve-text">
          Belleza y Estilo
        </h2>
        <p className="mt-2 text-sm sm:text-base text-gray-400 font-light tracking-widest uppercase">
          Encuentra tu producto ideal
        </p>
        <div className="mt-4 mx-auto w-16 h-px bg-mauve-light"></div>
      </section>
      <main className="max-w-7xl mx-auto px-4 py-6">
        <FilterBar
          selectedBrand={selectedBrand}
          setSelectedBrand={setSelectedBrand}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
        <ProductGrid products={products} loading={loading} />
      </main>
    </div>
  )
}