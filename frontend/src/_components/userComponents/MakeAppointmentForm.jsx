import { useEffect, useState } from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './makeAppointmentForm.css'
import axios from 'axios';

const MakeAppointmentForm = ({ schedule, id }) => {
    const [docId, setDocId] = useState(id)
    const [days, setDays] = useState([]) // doc scheduled days, passed from parent component
    const [date, setDate] = useState(new Date()); // booking date
    const [times, setTimes] = useState() // booking time
    const [showTimeSelector, setShowTimeSelector] = useState(false)
    const [timeId, setTimeId] = useState('') // time choosen
    const [showBooking, setShowBooking] = useState(false)
    const [errMsg, setErrMsg] = useState()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setDays([...schedule])
    }, [schedule])

    // Calender
    const handleChange = async (date) => {
        setLoading(true)
        setDate(date)
        try {
            const response = await axios.post('/api/user/schedule/times', { docId, date })
            if (response.data.timesArray) setShowTimeSelector(true)
            setTimes(response.data.timesArray);
        } catch (error) {
            setErrMsg('Somthing wrong')
        }
        setLoading(false)
    }

    const handleRadioButton = (event) => {
        setTimeId(event.target.value)
        setShowBooking(true)
    }

    const handleBooking = async () => {

        try {
            const response = await axios.post(`/api/stripe/create-checkout-session`, { docId, date, timeId })
            if (response.data.url) window.location.href = response.data.url
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='w-full md:w-[40%] lg:w-1/3'>
            <h1>Choose date</h1>
            <Calendar
                onChange={(date) => handleChange(date)}
                value={date}
                tileDisabled={({ date }) => !days.includes(date.getDay())}
                minDate={new Date()}
            />
            {showTimeSelector &&
                <>
                    <h1 className='mt-3'>Choose Time:</h1>
                    <div className="flex flex-wrap gap-3 ">

                        {times.map((item, i) => (
                            <label key={i} >
                                <input
                                    type="radio"
                                    name="time"
                                    className="form-radio h-5 w-5"
                                    value={item._id}
                                    onChange={handleRadioButton}
                                />
                                <span className="ml-2">
                                    {item.startTime} - {item.endTime}
                                </span>
                            </label>
                        ))}
                    </div>
                </>
            }
            <div className='flex flex-col mt-5'>

                {showBooking &&
                    <button
                        onClick={handleBooking}
                        className='bg-primary border-primary border-2 text-white py-2 px-6 rounded hover:bg-primary-600 hover:text-white duration-200'
                    >Book Now
                    </button>
                }
            </div>
        </div>
    )
}

export default MakeAppointmentForm