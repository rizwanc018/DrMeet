import React from 'react'
import AddButton from '../AddButton'

const Hero = ({ userInfo }) => {


    return (
        <div className='flex items-center p-4 bg-primary-100 shadow-md  my-4 mx-14 rounded '>
            <div className='flex-1 flex gap-6 items-center'>
                <img src={userInfo.image} alt="" className='rounded-full w-36 ' />
                <div>
                    <p className='font-semibold text-3xl'>Dr. {userInfo.fname} {userInfo.lname}</p>
                    <p>{userInfo.degree}</p>
                    <p className='text-gray-600'>{userInfo.department}</p>
                    <p className='mt-2'>Experience : <span className=''>{userInfo.experience} yrs</span></p>
                </div>
            </div>
            <div className='flex-1'>
                <p>{userInfo.bio}</p>
                <div className='flex gap-4 mt-2'>
                    <button className='border-2 border-primary p-2 px-6 rounded text-emerald-600 hover:text-white hover:bg-primary active:text-white active:bg-primary'>Schedule
                    </button>
                    <button className='border-2 border-primary p-2 px-6 rounded text-emerald-600 hover:text-white hover:bg-primary active:text-white active:bg-primary'>Appointments
                    </button>
                    <AddButton text={'Add Schedule'} />
                </div>
            </div>
        </div>
    )
}

export default Hero