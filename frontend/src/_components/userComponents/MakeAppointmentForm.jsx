import { useEffect, useState } from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './makeAppointmentForm.css'
import axios from 'axios';

const MakeAppointmentForm = ({ schedule, id }) => {
    const [docId, setDocId] = useState(id)
    const [date, setDate] = useState();
    const [days, setDays] = useState([])


    useEffect(() => {
        setDays([...schedule])
    }, [schedule])

    const handleChange = async (date) => {
        const response =await  axios.post('/api/user/schedule/times', { docId, date })
        console.log(response.data.timesArray);
    }

    return (
        <>
            <Calendar
                onChange={(date) => handleChange(date)}
                value={date}
                tileDisabled={({ date }) => !days.includes(date.getDay())}
                minDate={new Date()}
            />
        </>
    )
}

export default MakeAppointmentForm