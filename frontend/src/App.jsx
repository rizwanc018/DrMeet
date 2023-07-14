import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AdminHome, AdminLogin, Departments, AdminLayout, RegisteredDoctors } from './pages/adminPages'
import { DoctorHome, DoctorLogin, DoctorRegister } from './pages/doctorPages';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="" element={<AdminHome />} />
          <Route path="departments" element={<Departments />} />
          <Route path="doctor-requests" element={<RegisteredDoctors />} />
        </Route>

        <Route path="/doctor" >
          <Route path="" element={<DoctorHome />} />
          <Route path="login" element={<DoctorLogin />} />
          <Route path="register" element={<DoctorRegister />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
