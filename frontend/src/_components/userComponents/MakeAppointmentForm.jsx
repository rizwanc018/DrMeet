
import { useEffect, useState } from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './makeAppointmentForm.css'


const MakeAppointmentForm = ({ schedule }) => {
    console.log("🚀 ~ file: MakeAppointmentForm.jsx:9 ~ MakeAppointmentForm ~ schedule:", schedule)
    const [value, onChange] = useState(new Date());
    const [scheduleObj, setScheduleObj] = useState([])
    const scheduledDays = []

    useEffect(() => {
        setScheduleObj(schedule)
    }, [schedule])
    
    const isDateinSchedule = (date) => {
        return scheduledDays.includes(date.getDay())
    }

    return (
        <Calendar
            onChange={onChange}
            value={value}
            tileDisabled={({ date }) => !isDateinSchedule(date)}
            minDate={new Date()}
        />
    )
}

export default MakeAppointmentForm