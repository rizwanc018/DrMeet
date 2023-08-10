import { Routes, Route } from 'react-router-dom'
import { AdminPrivateRoutes } from '../utils'
import {
    AdminHome,
    AdminLogin,
    Departments,
    AdminLayout,
    RegisteredDoctors,
    ApprovedDoctors,
    Patients
} from '../pages/adminPages'


const AdminRoutes = () => {
    return (
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
        </Routes>
    )
}

export default AdminRoutes