import { useState, useEffect } from 'react'
import { ScheduleTable } from '../../_components/doctorComponents'
import axios from 'axios'


function DoctorHome() {
  const [data, setData] = useState('')
  const getDcotorSchedules = async () => {
    const response = await axios.get(`api/doc/schedule`)
    setData(response.data.schedules)
  }

  useEffect(() => {
    getDcotorSchedules()
  }, [])

  // const handleApprove = async (id) => {
  //   const response = await axios.get(`${baseUrl}/admin/approve/doctor/${id}`)
  //   toast.success(response.data.msg)
  //   getUnapprovedDoctors()
  // }
  return (
    <div>
      {data && <ScheduleTable data={data} />}
    </div>
  )
}

export default DoctorHome