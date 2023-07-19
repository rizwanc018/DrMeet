import { useState, useEffect } from 'react'
import { ScheduleTable } from '../../_components/doctorComponents'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import { useDispatch, useSelector } from "react-redux";
import { setSchedules } from '../../slices/scheduleSlice';


function DoctorHome() {

  const dispatch = useDispatch()
  const { schedules } = useSelector(state => state.schedule)

  const getDcotorSchedules = async () => {
    const response = await axios.get(`api/doc/schedule`)
    dispatch(setSchedules(response.data.schedules))
  }

  useEffect(() => {
    getDcotorSchedules()
  }, [])

  const handleDeleteSchedule = async (id) => {
    console.log(id)
    try {
      const response = await axios.delete(`/api/doc/schedule/${id}`)
      toast.success(response.data.msg)
      dispatch(setSchedules(response.data.schedules))
    } catch (error) {
      toast.error(response.data.msg)
    }
  }
  return (
    <div className='mx-5'>
      <Toaster />
      {schedules && <ScheduleTable  schedules={schedules} handleDeleteSchedule={handleDeleteSchedule} />}
    </div>
  )
}

export default DoctorHome