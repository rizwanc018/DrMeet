import React, { useState } from 'react'

function DropDown() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className='relative flex flex-col'>
            <button className='md:ml-8'
                onClick={() => setIsOpen(!isOpen)}
            >
                <img src="/assets/dropDown.svg" className={`${isOpen && 'rotate-90'} duration-500`} alt="" />
            </button>
            {
                isOpen && (
                    <div className='absolute bg-white top-[50px]'>
                        <ul>
                            <li><a href="">Login</a></li>
                            <li><a href="">Regiseter</a></li>
                            <li><a href="">Appointments</a></li>
                            <li><a href="">Forgot Password</a></li>
                        </ul>
                    </div>
                )
            }
        </div>
    )
}

export default DropDown