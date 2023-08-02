import { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import Appointments from '../../_components/userComponents/Appointments'

const AppointmentsPage = () => {
    const [date, setDate] = useState(moment().startOf('day').toISOString())
    const [data, setData] = useState()

    const getUpcomingAppointments = async (date) => {
        const response = await axios.get('/api/user/appointments')
        setData(response.data.appointments)
    }

    useEffect(() => {
        getUpcomingAppointments(date)
    }, [date])


    return (
        <>
            <div className=" flex flex-wrap justify-between items-center w-full mt-4 mb-6 p-4 px-12 bg-slate-100">
                <h1 className="text-xl">Upcoming Appointments</h1>
            </div>
            <div className='flex justify-center'>
                {data && <Appointments data={data} />}
            </div>
        </>
    )
}

export default AppointmentsPage