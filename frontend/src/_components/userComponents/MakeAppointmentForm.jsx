import { useEffect, useState } from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './makeAppointmentForm.css'
import axios from 'axios';

const MakeAppointmentForm = ({ schedule, id }) => {
    const [docId, setDocId] = useState(id)
    const [date, setDate] = useState(); // date from calender
    const [days, setDays] = useState([]) // scheduled days, passed from parent
    const [times, setTimes] = useState()
    const [showTimeSelector, setShowTimeSelector] = useState(false)


    useEffect(() => {
        setDays([...schedule])
    }, [schedule])

    const handleChange = async (date) => {
        const response = await axios.post('/api/user/schedule/times', { docId, date })
        if (response.data.timesArray) setShowTimeSelector(true)
        setTimes(response.data.timesArray);
    }

    const onChangeValue = (event) => {
        console.log(event.target.value);
    };

    return (
        <div>
            <h1>Choose date</h1>
            <Calendar
                onChange={(date) => handleChange(date)}
                value={date}
                tileDisabled={({ date }) => !days.includes(date.getDay())}
                minDate={new Date()}
            />
            {showTimeSelector &&
                // <>
                //     <h1>Choose Time</h1>
                //     <div>
                //         <div onChange={onChangeValue}>
                //             {times.map((item, i) => (
                //                 <>
                //                     <input key={i} type="radio" value={item._id} name="time" /> {item.startTime} - {item.endTime}
                //                 </>
                //             ))}
                //         </div>
                //     </div>
                // </>
                <div className="flex flex-col mt-3">
                    <h1 cla>Choose Time</h1>

                    {times.map((item, i) => (
                        <label key={i} >
                            <input
                                type="radio"
                                name="time"
                                className="form-radio h-5 w-5"
                                value={item._id}
                            />
                            <span className="ml-2">
                                {item.startTime} - {item.endTime}
                            </span>
                        </label>
                    ))}
                </div>

            }

        </div>
    )
}

export default MakeAppointmentForm