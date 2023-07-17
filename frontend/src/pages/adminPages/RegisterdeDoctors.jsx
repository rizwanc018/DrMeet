import React from 'react'
import { RegisteredDoctorsTable } from '../../_components/adminComponents'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import Spinner from '../../_components/Spinner'
import toast, { Toaster } from 'react-hot-toast';




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

    const handleApprove = async (id) => {
      const response = await axios.get(`${baseUrl}/admin/approve/doctor/${id}`)
      toast.success(response.data.msg)
      getUnapprovedDoctors()
    }

    return (
      <>
        <Toaster />

        {data ? (
          <RegisteredDoctorsTable data={data} handleApprove={handleApprove} />
        ) : (
          <div><Spinner /></div>
        )}
      </>
    )
  }

export default RegisterdeDoctors