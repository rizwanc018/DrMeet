import { useState } from 'react'
import { Header, Hero, CreateSchedule } from '../../_components/doctorComponents'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const DoctorLayout = () => {

  const [showModal, setShowModal] = useState(false)

  const { userInfo } = useSelector(state => state.auth)
  return (
    <>
      <Header />
      <div className="mt-20"></div>
      {userInfo && userInfo.isDoctor && <Hero userInfo={userInfo} setShowModal={setShowModal} />}
      {showModal && <CreateSchedule setShowModal={setShowModal} />}
      <Outlet />
    </>
  )
}

export default DoctorLayout