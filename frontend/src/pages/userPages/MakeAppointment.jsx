import { useParams } from "react-router-dom"
import { DoctorCard, MakeAppointmentForm } from "../../_components/userComponents"
import { useEffect, useState } from "react"
import axios from "axios"

const MakeAppointment = () => {
  const [doctor, setDoctor] = useState('')
  console.log("🚀 ~ file: MakeAppointment.jsx:8 ~ MakeAppointment ~ doctor:", doctor)
  const { id } = useParams()

  const getDoctorById = async (id) => {
    const response = await axios.get(`/api/user/doctor/${id}`)
    setDoctor(response.data.doctor)
  }

  useEffect(() => {
    getDoctorById(id)
  }, [])

  return (
    <div className="flex">
      {doctor && <DoctorCard doctor={doctor} showBookbutton={false} />}
      <MakeAppointmentForm schedule={doctor.schedule}/>
    </div>
  )
}

export default MakeAppointment