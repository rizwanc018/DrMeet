import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserRoutes from './Routes/UserRoutes'
import AdminRoutes from './Routes/AdminRoutes'
import DoctorRoutes from './Routes/DoctorRoutes'


function App() {

  return (
    <Router>
      <AdminRoutes />
      <DoctorRoutes />
      <UserRoutes />
    </Router>
  )
}

export default App
