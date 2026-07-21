const brands = ['Ésika', 'Cyzone', 'L\'Bel', 'Accesorios']
const categories = ['Fragancias', 'Maquillaje', 'Cuidado Personal', 'Tratamiento Facial', 'Bijouterie', 'Moda y Hogar']

export default function FilterBar({ selectedBrand, setSelectedBrand, selectedCategory, setSelectedCategory }) {
  return (
    <div className="mb-6 space-y-4">
      <div>
        <h3 className="text-sm font-semibold text-gray-600 mb-2">Marcas</h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedBrand('')}
            className={`filter-chip px-4 py-2 rounded-full text-sm font-medium border border-mauve-light ${!selectedBrand ? 'active' : 'text-mauve-text hover:bg-mauve-light hover:text-white'
              }`}
          >
            Todas
          </button>
          {brands.map((brand) => (
            <button
              key={brand}
              onClick={() => setSelectedBrand(brand)}
              className={`filter-chip px-4 py-2 rounded-full text-sm font-medium border border-mauve-light ${selectedBrand === brand ? 'active' : 'text-mauve-text hover:bg-mauve-light hover:text-white'
                }`}
            >
              {brand}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-gray-600 mb-2">Categorías</h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('')}
            className={`filter-chip px-4 py-2 rounded-full text-sm font-medium border border-mauve-light ${!selectedCategory ? 'active' : 'text-mauve-text hover:bg-mauve-light hover:text-white'
              }`}
          >
            Todas
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`filter-chip px-4 py-2 rounded-full text-sm font-medium border border-mauve-light ${selectedCategory === category ? 'active' : 'text-mauve-text hover:bg-mauve-light hover:text-white'
                }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}