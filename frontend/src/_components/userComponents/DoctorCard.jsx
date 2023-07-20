import React from 'react'

const DoctorCard = ({ doctor }) => {
    return (
        <div className="w-1/4 rounded overflow-hidden shadow-lg">
            <div className='h-48 overflow-hidden'>
                <img src={doctor.image} className='w-full object-cover ' alt="Sunset in the mountains" />
            </div>
            <div className="px-6 py-4 text-center">
                <h1 className="font-bold text-xl">Dr. {doctor.fname} {doctor.lname}</h1>
                <p>{doctor.department.name}</p>
                <p>Experience: {doctor.experience} yrs</p>
                <p>Fees: ₹ {doctor.fees}</p>
            </div>
            <div className="px-6 pt-1 pb-4 text-center">
                <button className='border-2 border-primary p-1 px-4 rounded text-emerald-600
        hover:text-white hover:bg-primary active:text-white active:bg-primary'
                >Book Appointment</button>
            </div>
        </div>
    )
}

export default DoctorCard