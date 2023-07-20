import { useEffect, useState } from "react"
import { DoctorCard } from "../../_components/userComponents"
import axios from "axios"
import Spinner from "../../_components/Spinner"

const DoctorsPage = () => {
  const [doctors, setDoctors] = useState()

  const getAllDoctors = async () => {
    const response = await axios.get('/api/user/doctors')
    setDoctors(response.data.doctors)
  }

  useEffect(() => {
    getAllDoctors()
  }, [])


  return (
    <>
      <div className="w-full mt-4 mb-6 py-4 bg-slate-100">
        <h1 className="px-4 text-xl">Doctors Available</h1>
      </div>
      <div className="flex flex-wrap gap-5 justify-center mx-8">
        {
          doctors ?
            (doctors.map((doctor, i) => (
              <DoctorCard doctor={doctor} key={i} />
            ))) : (
              <>
                <Spinner />
                <Spinner />
                <Spinner />
              </>

            )
        }

      </div>
    </>
  )
}

export default DoctorsPage