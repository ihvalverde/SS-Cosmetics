export default function ProductList({ products, loading, onEdit, onDelete }) {
  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl animate-pulse">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gray-200 rounded-lg flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-1/3" />
              <div className="h-3 bg-gray-200 rounded w-1/4" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <svg className="w-12 h-12 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
        <p className="text-gray-500 text-sm">No se encontraron productos</p>
        <p className="text-xs text-gray-400 mt-1">Prueba con otros filtros o agrega uno nuevo</p>
      </div>
    )
  }

  return (
    <div className="space-y-2 max-h-[calc(100vh-340px)] lg:max-h-[calc(100vh-260px)] overflow-y-auto pr-1">
      {products.map((product) => (
        <div
          key={product.id}
          className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
        >
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
            {product.image_url ? (
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-mauve-text text-sm line-clamp-4">{product.name}</h3>
            <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-0.5">
              <span className="font-medium text-mauve">{product.brand}</span>
              <span>·</span>
              <span>{product.category}</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              {product.offer_price && product.offer_price < product.price ? (
                <>
                  <span className="font-semibold text-mauve text-sm">S/ {product.offer_price}</span>
                  <span className="text-xs text-gray-400 line-through">S/ {product.price}</span>
                </>
              ) : (
                <span className="font-semibold text-mauve-text text-sm">S/ {product.price}</span>
              )}
              <span className={`text-xs px-1.5 py-0.5 rounded ${
                product.stock === 0
                  ? 'bg-red-100 text-red-600'
                  : 'bg-gray-200 text-gray-500'
              }`}>
                {product.stock === 0 ? 'Sin stock' : `Stock: ${product.stock}`}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 flex-shrink-0">
            <button
              onClick={() => onEdit(product)}
              className="p-2 text-mauve hover:bg-mauve-bg rounded-lg transition-colors"
              title="Editar"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              onClick={() => onDelete(product.id)}
              className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors"
              title="Eliminar"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
