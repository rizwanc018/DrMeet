import React from 'react'
import { RegisteredDoctorsTable } from '../../_components/adminComponents'
import {useState, useEffect } from 'react'
import axios from 'axios'
import Spinner from '../../_components/Spinner'
import toast, { Toaster } from 'react-hot-toast';

function RegisterdeDoctors() {
    const [data, setData] = useState('')

    const getUnapprovedDoctors = async () => {
      const response = await axios.get(`/api/admin/doctors/unapproved`)
      setData(response.data.unapprovedDoctors)
    }

    useEffect(() => {
      getUnapprovedDoctors()
    }, [])

    const handleApprove = async (id) => {
      const response = await axios.get(`/api/admin/approve/doctor/${id}`)
      toast.success(response.data.msg)
      getUnapprovedDoctors()
    }

    const handleDelete = async (id) => {
      const response = await axios.put(`/api/admin/block/doctor/${id}`)
      toast.success(response.data.msg)
      getUnapprovedDoctors()
    }

    return (
      <>
        <Toaster />

        {data ? (
          <RegisteredDoctorsTable data={data} handleApprove={handleApprove} handleDelete={handleDelete}/>
        ) : (
          <div><Spinner /></div>
        )}
      </>
    )
  }

export default RegisterdeDoctors