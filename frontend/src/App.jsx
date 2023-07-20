import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AdminHome, AdminLogin, Departments, AdminLayout, RegisteredDoctors } from './pages/adminPages'
import { DoctorHome, DoctorLogin, DoctorRegister, DoctorLayout, Appointments } from './pages/doctorPages';
import { DoctorsPage, HomePage, UserLayout, UserLoginPage, UserRgisterPage } from './pages/userPages';

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

        <Route path="/doctor" element={<DoctorLayout />}>
          <Route path="schedules" element={<DoctorHome />} />
          <Route path="login" element={<DoctorLogin />} />
          <Route path="register" element={<DoctorRegister />} />
          <Route path="appointments" element={<Appointments />} />
        </Route>

        <Route path='/' element={<UserLayout />}>
          <Route path="" element={<HomePage />} />
          <Route path="login" element={<UserLoginPage />} />
          <Route path="register" element={<UserRgisterPage />} />
          <Route path="doctors" element={<DoctorsPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
