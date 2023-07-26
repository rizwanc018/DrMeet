import { useEffect, useState } from "react"
import { DoctorCard, SearchDoctor } from "../../_components/userComponents"
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
      <div className=" flex flex-wrap justify-between items-center w-full mt-4 mb-6 p-4 px-12 bg-slate-100">
        <h1 className="text-xl">Doctors Available</h1>
        <SearchDoctor setDoctors={setDoctors}/>
      </div>
      <div className="flex flex-wrap gap-5 justify-center mx-8">
        {
          doctors ?
            (doctors.map((doctor, i) => (
              <DoctorCard doctor={doctor} key={i} />
            ))) : (
              <div className="flex flex-wrap gap-5 justify-center mx-8 mt-16">
                <Spinner />
                <Spinner />
                <Spinner />
              </div>

            )
        }

      </div>
    </>
  )
}

export default DoctorsPage