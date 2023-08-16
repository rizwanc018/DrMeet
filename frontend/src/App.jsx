import { lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const UserRoutes = lazy(() => import('./Routes/UserRoutes'))
const AdminRoutes = lazy(() => import('./Routes/AdminRoutes'))
const DoctorRoutes = lazy(() => import('./Routes/DoctorRoutes'))
const ErrorPage = lazy(() => import('./pages/ErrorPage'));


function App() {
  return (
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
