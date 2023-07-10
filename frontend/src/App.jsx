import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AdminHome, AdminLogin } from './pages/adminPages'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/login" element={<AdminLogin />} />
      </Routes>
    </Router>
  )
}

export default App
