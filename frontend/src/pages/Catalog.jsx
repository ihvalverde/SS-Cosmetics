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

  useEffect(() => {
    fetchProducts()
  }, [selectedBrand, selectedCategory, search])

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (selectedBrand) params.append('brand', selectedBrand)
      if (selectedCategory) params.append('category', selectedCategory)
      if (search) params.append('search', search)

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
      <main className="max-w-7xl mx-auto px-4 py-6">
        <FilterBar
          selectedBrand={selectedBrand}
          setSelectedBrand={setSelectedBrand}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <ProductGrid products={products} loading={loading} />
      </main>
    </div>
  )
}