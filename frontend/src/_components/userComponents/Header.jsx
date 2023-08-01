import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi'
import { GrClose } from 'react-icons/gr'
import { AiOutlineLogin } from 'react-icons/ai'
import { useSelector, useDispatch } from "react-redux";
import DropDown from './DropDown';
import socket from '../../config/socket.js'


const Header = () => {
    const [callTo, setCallTo] = useState()
    const navigate = useNavigate()

    const { userInfo } = useSelector(state => state.auth)

    useEffect(() => {
        userInfo ?
            socket.emit('join-room', userInfo?.id, msg => {
            }) : null
    }, [userInfo])

    useEffect(() => {
        socket.emit("get-my-id", id => {
            socket.on('call-id', docId => {
                if (docId) {
                    setCallTo(docId)
                }
            })
        })
    }, [])

    const handleJoin = () => {
        const tmp = callTo
        setCallTo(null)
        navigate(`/meet/${tmp}`)
    }

    let Links = [
        { name: "Home", link: "/" },
        { name: "Doctors", link: "/doctors" },
        { name: "Doctor Reg", link: "/doctor/register" },
    ];
    let [open, setOpen] = useState(false);
    const handleShowNavbar = () => {
        setShowNavbar(!showNavbar);
    }

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
                    {callTo  &&
                        <li><button className='animate-ping text-white bg-primary p-1 rounded ml-6 ' onClick={handleJoin}>Join</button></li>
                    }
                    <li className='md:ml-6 text-md md:my-0 my-7'>
                        {
                            userInfo && userInfo.isUser ?
                                (<DropDown />)
                                : (<Link to='/login' className='flex items-center gap-1 text-primary font-bold'><AiOutlineLogin className='text-primary font-bold' /> <span>Login</span></Link>)
                        }
                    </li>
                </ul>
            </div>
        </div >
    )
}

export default Header
