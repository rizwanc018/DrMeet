import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AdminHome, AdminLogin } from './pages/adminPages'
import { DoctorHome, DoctorLogin, DoctorRegister } from './pages/doctorPages';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/doctor" element={<DoctorHome />} />
        <Route path="/doctor/login" element={<DoctorLogin />} />
        <Route path="/doctor/register" element={<DoctorRegister />} />
      </Routes>
    </Router>
  )
}

export default App
