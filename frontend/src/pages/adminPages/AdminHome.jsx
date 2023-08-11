import { Doctors, Patients, Appointments, Earnings, AppointmetntsChart } from "../../_components/adminComponents"


function AdminHome() {
  return (
    <div className="h-full w-full bg-primary-100 px-6 pt-6">
      <div className="grid grid-cols-4 auto-rows-[minmax(160px,auto)] gap-6 max-h-screen overflow-y-auto">
        <Doctors />
        <Patients />
        <Appointments />
        <Earnings />
        <AppointmetntsChart />
      </div>
    </div>
  )
}

export default AdminHome