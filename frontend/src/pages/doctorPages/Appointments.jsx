import { AppointmentsBooked } from "../../_components/doctorComponents"
import { useEffect, useState, } from "react"
import axios from "axios"
import moment from "moment"
import Spinner from '../../_components/Spinner'

const Appointments = () => {
  const [data, setData] = useState()
  console.log(data);

  const getAppointments = async (date) => {
    const response = await axios.post('/api/doc/appointments', { date })
    setData(response.data.appointments)
  }

  useEffect(() => {
    const date = moment().startOf('day').toISOString()
    getAppointments(date)
  }, [])

  return (
    <>
      {
        data ? (
          <AppointmentsBooked data={data} />
        ) : (
          <div><Spinner /></div>
        )
      }
    </>
  )
}

export default Appointments