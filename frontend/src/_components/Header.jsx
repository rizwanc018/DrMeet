import React from 'react'
import { Link } from "react-router-dom";
import Joinbutton from './Joinbutton';
import DropDown from './DropDown'

function Header() {

    return (

        <nav className='flex shadow-md justify-between w-full px-20'>
            <div className='md:flex items-center justify-between bg-white py-2 md:px-10 px-7'>
                <div className='font-bold text=2x1 cursor-pointer flex items-center text-gray-800'>
                    <img src="./assets/logo.png" alt="LifeLine" />

                </div>
            </div>
            <ul className='md:flex md:items-center'>
                <li className='md:ml-8'><a className='font-bold text-base hover:text-primary duration-200' href="">Services</a></li>
                <li className='md:ml-8'><a className='font-bold text-base hover:text-primary duration-200' href="">Departments</a></li>
                <li className='md:ml-8'><a className='font-bold text-base hover:text-primary duration-200' href="">Doctors</a></li>
                <Joinbutton />
                <li className='md:ml-8'><button className='bg-white border-primary border-2 text-primary py-2 px-6 rounded hover:bg-primary hover:text-white duration-200' href="">Appointment</button></li>
                <DropDown />
            </ul>
        </nav>

    )
}

export default Header