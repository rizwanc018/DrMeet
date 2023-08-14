import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserRoutes from './Routes/UserRoutes'
import AdminRoutes from './Routes/AdminRoutes'
import DoctorRoutes from './Routes/DoctorRoutes'
import ErrorPage from './pages/ErrorPage';

function App() {
  return (
    // <Router>
    //   <AdminRoutes />
    //   <DoctorRoutes />
    //   <UserRoutes />
    // </Router>
    <Router>
      <Routes>
        <Route path='/*' element={<UserRoutes />}/>
        <Route path='/doctor/*' element={<DoctorRoutes />}/>
        <Route path='/admin/*' element={<AdminRoutes />}/>
        <Route path='*' element={<ErrorPage />}/>
      </Routes>
    </Router>
  )
}

export default App
