import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AdminHome, AdminLogin, Departments, AdminLayout, RegisteredDoctors, ApprovedDoctors, Patients } from './pages/adminPages'
import { DoctorHome, DoctorLogin, DoctorRegister, DoctorLayout, Appointments, ConsultationPage } from './pages/doctorPages';
import { DoctorsPage, HomePage, UserLayout, UserLoginPage, UserRgisterPage, MakeAppointment, AppointmentSuccess, MeetDoctorPage, AppointmentsPage, DietitianPage } from './pages/userPages';
import { DoctorPirvateRoutes, AdminPrivateRoutes, UserPrivateRoutes } from './utils';


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route element={<AdminPrivateRoutes />}>
            <Route path="" element={<AdminHome />} />
            <Route path="departments" element={<Departments />} />
            <Route path="doctors" element={<ApprovedDoctors />} />
            <Route path="doctor-requests" element={<RegisteredDoctors />} />
            <Route path="patients" element={<Patients />} />

          </Route>
        </Route>

        <Route path="/doctor" element={<DoctorLayout />}>
          <Route path="login" element={<DoctorLogin />} />
          <Route path="register" element={<DoctorRegister />} />
          <Route element={<DoctorPirvateRoutes />}>
            <Route path="" element={<DoctorHome />} />
            <Route path="schedules" element={<DoctorHome />} />
            <Route path="appointments" element={<Appointments />} />
            <Route path="consoltation/:patientId" element={<ConsultationPage />} />
          </Route>
        </Route>

        <Route path='/' element={<UserLayout />}>
          <Route path="" element={<HomePage />} />
          <Route path="dietitian" element={<DietitianPage />} />
          <Route path="login" element={<UserLoginPage />} />
          <Route path="register" element={<UserRgisterPage />} />
          <Route path="doctors" element={<DoctorsPage />} />
          <Route path="appointment/apply/:id" element={<MakeAppointment />} />
          <Route path="appointment-success" element={<AppointmentSuccess />} />
          <Route path="meet/:docSokId" element={<MeetDoctorPage />} />
          <Route path="appointments" element={<AppointmentsPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
