import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Catalog from './pages/Catalog'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-mauve-bg">
        <Routes>
          <Route path="/" element={<Catalog />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
