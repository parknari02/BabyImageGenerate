import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainPage from './pages/MainPage'
import BabyGeneratorPage from './pages/BabyGeneratorPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/baby-generator" element={<BabyGeneratorPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
