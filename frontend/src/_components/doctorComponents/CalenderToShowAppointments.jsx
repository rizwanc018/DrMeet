import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CalenderTiShowAppointments.css'
import moment from 'moment';
import { useEffect, useState } from 'react';
import axios from 'axios';


const CalenderToShowAppointments = ({ date, setDate }) => {
  const [givenDates, setgivenDates] = useState()
  // console.log(givenDates)

  const appointmetDates = async () => {
    const response = await axios.get('/api/doc/appointment/dates')
    setgivenDates(response.data.dates.map(d => moment(d.date)))
  }

  useEffect(() => {
    appointmetDates()
  }, [])


  const dateIsDisabled = (d) => {
    const momentDate = moment(d);
    return !givenDates.some((givenDate) => givenDate.isSame(momentDate, 'day'));
  }

  return (
    <>
      {givenDates &&
        <Calendar
          onChange={(date) => setDate(moment(date).startOf('day'))}
          value={date}
          tileDisabled={({ date }) => dateIsDisabled(date)}
          minDate={new Date()}
        />
      }
    </>
  )
}

export default CalenderToShowAppointments