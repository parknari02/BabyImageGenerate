import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BabyGeneratorPage from './pages/BabyGeneratorPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BabyGeneratorPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
