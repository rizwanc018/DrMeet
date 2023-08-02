import { AppointmentsBooked, CalenderToShowAppointments } from "../../_components/doctorComponents"
import { useEffect, useState, } from "react"
import axios from "axios"
import moment from "moment"
import Spinner from '../../_components/Spinner'

const Appointments = () => {
  const [date, setDate] = useState(moment().startOf('day').toISOString())
  const [data, setData] = useState()
  // console.log(data);

  const getAppointments = async (date) => {
    const response = await axios.post('/api/doc/appointments', { date })
    setData(response.data.appointments)
  }

  useEffect(() => {
    getAppointments(date)
  }, [date])

  return (
    <div className="w-full flex justify-center">
      <div className="flex justify-between items-start mx-auto">
        <CalenderToShowAppointments date={date} setDate={setDate} />
        {
          data ? (
            <AppointmentsBooked data={data} />
          ) : (
            <div><Spinner /></div>
          )
        }
      </div>
    </div>
  )
}
export default Appointments