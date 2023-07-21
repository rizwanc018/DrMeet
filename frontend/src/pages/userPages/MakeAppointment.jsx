import { useParams } from "react-router-dom"
import { DoctorCard, MakeAppointmentForm } from "../../_components/userComponents"
import { useEffect, useState } from "react"
import axios from "axios"

const MakeAppointment = () => {
  const [doctor, setDoctor] = useState('')
  const { id } = useParams()

  const getDoctorById = async (id) => {
    const response = await axios.get(`/api/user/doctor/${id}`)
    setDoctor(response.data.doctor)
  }

  const scheduleDays = doctor.schedule ? doctor.schedule.map(schedule => Number(schedule.day)) : [];


  useEffect(() => {
    getDoctorById(id)
  }, [])

  return (
    <div className="flex">
      {doctor && <DoctorCard doctor={doctor} showBookbutton={false} />}
      <MakeAppointmentForm schedule={scheduleDays} id={id}  />
    </div>
  )
}

export default MakeAppointment