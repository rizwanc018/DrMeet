import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

function DropDown() {
    const [isOpen, setIsOpen] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const logoutHandler = async () => {
        const response = await axios.get('/api/user/logout', { withCredentials: true })
        if (response.data.success)
            dispatch(clearCredentials())
        navigate('/')
    }

    return (
        <div className='relative flex flex-col'>
            <button className='md:ml-8'
                onClick={() => setIsOpen((prev) => !prev)}
            >
                <img src="./assets/dropDown.svg" className={`${isOpen && 'rotate-90'} duration-500`} alt="" />
            </button>
            {
                isOpen && (
                    <div className={`${!isOpen ? 'h-0' : 'h-0'} duration-700 absolute  bg-white top-[50px] `}>
                        <ul>
                            <li><a href="">Login</a></li>
                            <li><a href="">Regiseter</a></li>
                            <li><a href="">Appointments</a></li>
                            <li><a href="">Forgot Password</a></li>
                            <li><span className='cursor-pointer' onClick={logoutHandler}>Logout</span></li>
                        </ul>
                    </div>
                )
            }
        </div>
    )
}

export default DropDown