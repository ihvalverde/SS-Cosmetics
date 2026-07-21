import { Link } from 'react-router-dom'

export default function Header({ search, setSearch }) {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3 flex-shrink-0">
            <img src="/logo-ss.png" alt="S&S Cosméticos y Accesorios" className="w-10 h-10 rounded-full object-cover" />
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-mauve-text">S&S Cosméticos y Accesorios</h1>
            </div>
          </Link>

          <div className="flex-1 max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar productos..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-2 pl-10 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-mauve focus:border-transparent bg-gray-50"
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          <Link
            to="/admin"
            className="px-4 py-2 text-sm font-medium text-mauve hover:bg-mauve-bg rounded-lg transition-colors"
          >
            Admin
          </Link>
        </div>
      </div>
    </header>
  )
}