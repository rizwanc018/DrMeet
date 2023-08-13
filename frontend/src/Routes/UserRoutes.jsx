import { Routes, Route } from 'react-router-dom'
import { UserPrivateRoutes } from '../utils'
import ErrorPage from '../pages/ErrorPage';
import {
    DoctorsPage,
    HomePage,
    UserLayout,
    UserLoginPage,
    UserRgisterPage,
    MakeAppointment,
    AppointmentSuccess,
    MeetDoctorPage,
    AppointmentsPage,
    DietitianPage
} from '../pages/userPages';

const UserRoutes = () => {
    return (
        <Routes>
            <Route element={<ErrorPage />} />
            <Route path='/' element={<UserLayout />}>
                <Route path="" element={<HomePage />} />
                <Route path="login" element={<UserLoginPage />} />
                <Route path="register" element={<UserRgisterPage />} />
                <Route path="doctors" element={<DoctorsPage />} />
                <Route path="dietitian" element={<DietitianPage />} />
                <Route path="appointment/apply/:id" element={<MakeAppointment />} />
                <Route path="appointment-success" element={<AppointmentSuccess />} />
                <Route path="meet/:docSokId" element={<MeetDoctorPage />} />
                <Route path="appointments" element={<AppointmentsPage />} />
            </Route>
        </Routes>
    )
}

export default UserRoutes