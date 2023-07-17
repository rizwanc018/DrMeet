import React from 'react'
import { Link } from "react-router-dom";
import DropDown from './DropDown'

function Header() {

    return (
        <nav className='flex shadow-md justify-between w-full px-20'>
            <div className='md:flex items-center justify-between bg-white py-2 md:px-10 px-7'>
                <div className='font-bold text=2x1 cursor-pointer flex items-center text-gray-800'>
                    <img src="/assets/logo.png" alt="LifeLine" />

                </div>
            </div>
            {/* <div className='flex items-center'>
                <DropDown />
            </div> */}
            <ul className='md:flex md:items-center'>
                <li className='md:ml-8'><a className='hover:text-primary duration-200' href="">Doctors</a></li>
                <li className='md:ml-8'><a className='hover:text-primary duration-200' href="">Departments</a></li>
                <li className='md:ml-8'><Link className='hover:text-primary duration-200' to="/doctor/profile">Profile</Link></li>
                <DropDown />
            </ul>
        </nav>

    )
}

export default Header