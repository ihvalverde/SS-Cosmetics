export default function ProductCard({ product }) {
  const isOutOfStock = product.stock === 0
  const hasOffer = product.offer_price && product.offer_price < product.price

  const handleWhatsApp = () => {
    const phone = '51922625609'
    const message = encodeURIComponent(
      `Hola! Me interesa el producto:\n\n` +
      `*${product.name}*\n` +
      `Marca: ${product.brand}\n` +
      `Precio: S/ ${hasOffer ? product.offer_price : product.price}\n\n` +
      `¿Está disponible?`
    )
    window.open(`https://api.whatsapp.com/send?phone=${phone}&text=${message}`, '_blank')
  }

  return (
    <div className={`product-card bg-white rounded-2xl shadow-md overflow-hidden ${isOutOfStock ? 'opacity-75' : ''}`}>
      <div className="relative aspect-square bg-gray-100">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}

        {isOutOfStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-red-500 text-white px-4 py-2 rounded-full font-bold text-sm">
              AGOTADO
            </span>
          </div>
        )}

        {hasOffer && !isOutOfStock && (
          <div className="absolute top-3 right-3">
            <span className="bg-mauve text-white px-3 py-1 rounded-full text-xs font-bold">
              OFERTA
            </span>
          </div>
        )}

        <div className="absolute top-3 left-3">
          <span className="bg-white bg-opacity-90 text-mauve-text px-3 py-1 rounded-full text-xs font-medium shadow-sm">
            {product.brand}
          </span>
        </div>
      </div>

      <div className="p-3 sm:p-4">
        <h3 className="font-semibold text-mauve-text mb-1 line-clamp-5">{product.name}</h3>
        <p className="text-sm text-gray-500 mb-3">{product.category}</p>

        <div className="flex items-baseline gap-2 mb-4">
          {hasOffer ? (
            <>
              <span className="text-lg font-bold text-mauve">
                S/ {product.offer_price}
              </span>
              <span className="text-sm text-gray-400 line-through">
                S/ {product.price}
              </span>
            </>
          ) : (
            <span className="text-lg font-bold text-mauve-text">
              S/ {product.price}
            </span>
          )}
        </div>

        <button
          onClick={handleWhatsApp}
          disabled={isOutOfStock}
          style={{
            width: '100%',
            padding: '10px 0',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: 600,
            color: '#fff',
            backgroundColor: isOutOfStock ? '#9ca3af' : '#25D366',
            cursor: isOutOfStock ? 'not-allowed' : 'pointer',
            textAlign: 'center',
            lineHeight: '1'
          }}
        >
          <span style={{ display: 'inline', fontSize: '14px', marginRight: '6px' }}>&#128172;</span>
          {isOutOfStock ? 'Agotado' : 'Pedir por WhatsApp'}
        </button>
      </div>
    </div>
  )
}