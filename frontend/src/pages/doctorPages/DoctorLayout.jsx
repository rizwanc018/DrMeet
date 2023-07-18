import React from 'react'
import { Header, Hero } from '../../_components/doctorComponents'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const DoctorLayout = () => {

  const { userInfo } = useSelector(state => state.auth)
  return (
    <>
      <Header />
      {userInfo && userInfo.isDoctor && <Hero userInfo={userInfo}/>}
      <Outlet />
    </>
  )
}

export default DoctorLayout