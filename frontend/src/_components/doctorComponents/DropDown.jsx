import React, { useState } from 'react'
import { clearCredentials } from '../../slices/authSlice'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

function DropDown() {
    const [isOpen, setIsOpen] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const logoutHandler = async () => {
        const response = await axios.get('/api/doc/logout', { withCredentials: true })
        if (response.data.success)
        dispatch(clearCredentials())
        navigate('/')
    }

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
                            <li><span onClick={logoutHandler}>Logout</span></li>
                        </ul>
                    </div>
                )
            }
        </div>
    )
}

export default DropDown