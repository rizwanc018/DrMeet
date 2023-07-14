import React from 'react'
import { RegisteredDoctorsTable } from '../../_components/adminComponents'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'



function RegisterdeDoctors() {
  const [data, setData] = useState('')

  const baseUrl = import.meta.env.VITE_BACKEND_URL


  const getUnapprovedDoctors = async () => {
    const response = await axios.get(`${baseUrl}/admin/doctors/unapproved`)
    setData(response.data.unapprovedDoctors)
  }

  useEffect(() => {
    getUnapprovedDoctors()
  }, [])


  return (
    <>
         {data ? (
            <RegisteredDoctorsTable data={data} />
         ) : (
           <h1>Loading...</h1>
         )}
     </>
  )
}

export default RegisterdeDoctors