import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CalenderTiShowAppointments.css'
import moment from 'moment';
import { useEffect, useState } from 'react';
import AxiosBackend from '../../config/axios'


const CalenderToShowAppointments = ({ date, setDate }) => {
  const [givenDates, setgivenDates] = useState()

  const appointmetDates = async () => {
    const response = await AxiosBackend.get('/api/doc/appointment/dates')
    setgivenDates(response.data.dates.map(d => {
      return moment(d.date).startOf('day').toISOString()
    }))
  }

  useEffect(() => {
    appointmetDates()
  }, [])


  const dateIsDisabled = (d) => {
    let date = moment(d).startOf('day').toISOString()
    return !givenDates.some(givenDate => {
      return date == givenDate
    })
  }

  const handleChange = (d) => {
    setDate(moment(d).startOf('day').toISOString())
  }

  return (
    <div className="w-full md:w-auto md:flex-grow-0">
      {givenDates &&
        <Calendar
          onChange={(date) => handleChange(date)}
          value={date}
          tileDisabled={({ date }) => dateIsDisabled(date)}
        />
      }
    </div>
  )
}

export default CalenderToShowAppointments