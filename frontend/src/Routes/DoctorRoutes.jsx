import { Routes, Route } from 'react-router-dom'
import { DoctorPirvateRoutes } from '../utils'
import {
    DoctorHome,
    DoctorLogin,
    DoctorRegister,
    DoctorLayout,
    Appointments,
    ConsultationPage
} from '../pages/doctorPages';

const DoctorRoutes = () => {
    return (
        <Routes>
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
        </Routes>
    )
}

export default DoctorRoutes