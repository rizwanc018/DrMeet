import React from 'react'
import { Header } from '../../_components/doctorComponents'
import { Outlet } from 'react-router-dom'

const DoctorLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default DoctorLayout