import { useEffect } from "react"
import { useSelector } from "react-redux/es/hooks/useSelector"
import axios from "axios"

const AppointmentsBooked = () => {

  const { userInfo } = useSelector(state => state.auth)

  const getAppointments = async (date) => {
    const response = await axios.post('/api/doc/appointments', {date})
    console.log(response.data);
  }

  useEffect(() => {
    const date = new Date()
    getAppointments(date)
  }, [])
  

  return (
    <div>AppointmentsBookeddddddddddddd</div>
  )
}

export default AppointmentsBooked