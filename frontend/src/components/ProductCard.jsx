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
        <h3 className="font-semibold text-mauve-text mb-1 line-clamp-2">{product.name}</h3>
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
          className={`whatsapp-btn w-full py-2.5 rounded-xl text-xs font-semibold text-white flex items-center justify-center ${
            isOutOfStock
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-[#25D366] hover:bg-[#128C7E]'
          }`}
        >
          <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
            <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            {isOutOfStock ? 'Agotado' : 'Pedir por WhatsApp'}
          </span>
        </button>
      </div>
    </div>
  )
}