import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
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
            <button className='md:ml-6'
                onFocus={() => setIsOpen(!isOpen)}
            >
                <img src="/assets/dropDown.svg" className={`${isOpen && 'rotate-90'} duration-500`} alt="" />
            </button>
            {
                isOpen && (
                    <div className='z-10 absolute bg-white top-[50px]'>
                        <ul className='py-1 shadow-md rounded'>
                            <li><Link
                                className='block px-4 py-2'
                                to="/login"
                                onBlur={() => setIsOpen(false)}
                                tabIndex='-1'
                            >Login</Link></li>
                            <li><Link
                                className='block px-4 py-2'
                                href=""
                                onBlur={() => setIsOpen(false)}
                                tabIndex='-1'
                            >Appointments</Link></li>
                            <li><Link
                                className='block px-4 py-2'
                                to="/register"
                                onBlur={() => setIsOpen(false)}
                                tabIndex='-1'
                            >Regiseter</Link></li>
                            <li><button
                                className='block px-4 py-2'
                                onClick={logoutHandler}
                                onBlur={() => setIsOpen(false)}
                                tabIndex='-1'
                            >Logout</button></li>
                        </ul>
                    </div>
                )
            }
        </div>
    )
}

export default DropDown