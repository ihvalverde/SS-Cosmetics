import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Catalog from './pages/Catalog'
import Admin from './pages/Admin'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-mauve-bg">
        <Routes>
          <Route path="/" element={<Catalog />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App