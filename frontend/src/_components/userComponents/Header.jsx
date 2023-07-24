import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi'
import { GrClose } from 'react-icons/gr'
import { AiOutlineLogin, AiOutlineLogout } from 'react-icons/ai'

const Header = () => {

    let Links = [
        { name: "Home", link: "/" },
        { name: "Doctors", link: "/doctors" },
        { name: "Doctor Reg", link: "/doctor/register" },
        { name: "BLOG'S", link: "/" },
        { name: "CONTACT", link: "/" },
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
                    {/* <ion-icon name={open ? 'close' : 'menu'}></ion-icon> */}
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
                </ul>
            </div>
        </div>
    )
}

export default Header


// ////////////////////////////////////////////////////////////////////////////
// import React from 'react'
// import { Link } from "react-router-dom";
// import Joinbutton from './Joinbutton';
// import DropDown from './DropDown'

// function Header() {

//     return (

//         <nav className='flex shadow-xl justify-between w-full px-20'>
//             <div className='md:flex items-center justify-between bg-white py-2 md:px-10 px-7'>
//                 <div className='font-bold text-2x1 cursor-pointer flex items-center text-gray-800'>
//                     <img src="/assets/logo.png" alt="LifeLine" />

//                 </div>
//             </div>
//             <ul className='md:flex md:items-center'>
//                 <li className='md:ml-8'><Link className='hover:text-primary duration-200' to='/doctors' href="">Doctors</Link></li>
//                 <li className='md:ml-8'><a className='hover:text-primary duration-200' href="">Departments</a></li>
//                 <li className='md:ml-8'><Link className='hover:text-primary duration-200' to="/doctor/register">Doctor Reg</Link></li>
//                 {false && <Joinbutton />}
//                 <li className='md:ml-8'><button className='bg-white border-primary border-2 text-primary py-2 px-6 rounded hover:bg-primary hover:text-white duration-200' href="">Appointment</button></li>
//                 <DropDown />
//             </ul>
//         </nav>

//     )
// }

// export default Header