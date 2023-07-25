import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi'
import { GrClose } from 'react-icons/gr'
import { AiOutlineLogin } from 'react-icons/ai'
import { useSelector } from "react-redux";
import DropDown from './DropDown';

const Header = () => {

    const { userInfo } = useSelector(state => state.auth)

    let Links = [
        { name: "Home", link: "/doctor" },
        { name: "Appointments", link: "/doctor/appointments" },
        { name: "Schedules", link: "/doctor/schedules" },
    ];
    let [open, setOpen] = useState(false);
    const handleShowNavbar = () => {
        setShowNavbar(!showNavbar);
    };

    return (
        <div className='z-10 shadow-md w-full fixed top-0 left-0'>
            <div className='md:flex items-center justify-between bg-white py-1 md:px-10 px-7'>
                <div className='font-bold text-md cursor-pointer flex items-center font-[Poppins] 
          text-gray-800'>
                    <span className='text-3xl text-indigo-600 mr-1'>
                        <img src="/assets/logo.png" alt="LifeLine" />

                    </span>
                </div>

                <div onClick={() => setOpen(!open)} className='text-2xl font-bold absolute right-8 top-6 cursor-pointer md:hidden'>
                    {open ? (<GrClose />) : (<GiHamburgerMenu />)}

                </div>

                <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-18 ' : 'top-[-490px]'}`}>
                    {
                        Links.map((link) => (
                            <li key={link.name} className='md:ml-6 text-md md:my-0 my-7'>
                                <Link to={link.link} className='text-gray-800 hover:text-gray-400 duration-500'>{link.name}</Link>
                            </li>
                        ))
                    }
                    <li className='md:ml-6 text-md md:my-0 my-7'>
                        {
                            userInfo && userInfo.isDoctor ?
                                (<DropDown />)
                                : (<Link to='/doctor/login' className='flex items-center gap-1 text-primary font-bold'><AiOutlineLogin className='text-primary font-bold' /> <span>Doctor Login</span></Link>)
                        }
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Header


////////////////////////////////////////////////////////////////////////////////////////////////////
// import React from 'react'
// import { Link } from "react-router-dom";
// import DropDown from './DropDown'
// import { MdNotifications } from 'react-icons/md'

// function Header() {

//         return (
//             <nav className='flex shadow-md justify-between w-full px-20'>
//                 <div className='md:flex items-center justify-between bg-white py-2 md:px-10 px-7'>
//                     <div className='font-bold text=2x1 cursor-pointer flex items-center text-gray-800'>
//                         <img src="/assets/logo.png" alt="LifeLine" />

//                     </div>
//                 </div>
//                 <ul className='md:flex md:items-center'>
//                     <li className='md:ml-8'><a className='hover:text-primary duration-200' href="">Doctors</a></li>
//                     <li className='md:ml-8'><a className='hover:text-primary duration-200' href="">Departments</a></li>
//                     <li><Link to={''}> <MdNotifications className='text-primary text-4xl ml-6'/></Link></li>
//                     {/* <li className='md:ml-8'><Link className='hover:text-primary duration-200' to="/doctor/profile">Profile</Link></li> */}
//                     <DropDown />
//                 </ul>
//             </nav>

//         )
//     }

// export default Header