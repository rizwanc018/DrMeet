import React, { Fragment, useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Menu, Transition } from '@headlessui/react'
import { RiArrowDropDownLine } from 'react-icons/ri'
import { clearCredentials } from '../../slices/authSlice'
import { AiOutlineLogout } from 'react-icons/ai'



function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


function DropDown() {
    const [isOpen, setIsOpen] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { userInfo } = useSelector(state => state.auth)

    const logoutHandler = async () => {
        console.log('clicked')
        const response = await axios.get('/api/user/logout')
        if (response.data.success)
            dispatch(clearCredentials())
        navigate('/')
    }

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="inline-flex w-full capitalize justify-center items-center gap bg-white px-3 py-1 text font-semibold rounded ring-1 ring-inset ring-primary hover:bg-gray-50">
                    {userInfo.fname} {userInfo.lname}
                    <RiArrowDropDownLine className="-mr-1 h-5 w-5 text-xl" aria-hidden="true" />
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute md:right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        <Menu.Item>
                            {({ active }) => (
                                <Link
                                    href="#"
                                    className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'block px-4 py-2 '
                                    )}
                                >
                                    Support
                                </Link>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <Link
                                    href="#"
                                    className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'block px-4 py-2 '
                                    )}
                                >
                                    License
                                </Link>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    onClick={logoutHandler}
                                    className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'w-full px-4 py-2 text-left flex gap-1.5 items-center'
                                    )}
                                >
                                   <AiOutlineLogout className='font-bold'/> Sign out
                                </button>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}

export default DropDown

// import React, { useState } from 'react'
// import axios from 'axios'
// import { useNavigate, Link } from 'react-router-dom'
// import { useDispatch } from 'react-redux'

// function DropDown() {
//     const [isOpen, setIsOpen] = useState(false)

//     const navigate = useNavigate()
//     const dispatch = useDispatch()

//     const logoutHandler = async () => {
//         const response = await axios.get('/api/user/logout', { withCredentials: true })
//         if (response.data.success)
//             dispatch(clearCredentials())
//         navigate('/')
//     }

//     return (
//         <div className='relative flex flex-col'>
//             <button className='md:ml-6'
//                 onFocus={() => setIsOpen(!isOpen)}
//             >
//                 <img src="/assets/dropDown.svg" className={`${isOpen && 'rotate-90'} duration-500`} alt="" />
//             </button>
//             {
//                 isOpen && (
//                     <div className='z-10 absolute bg-white top-[50px]'>
//                         <ul className='py-1 shadow-md rounded'>
//                             <li><Link
//                                 className='block px-4 py-2'
//                                 to="/login"
//                                 onBlur={() => setIsOpen(false)}
//                                 tabIndex='-1'
//                             >Login</Link></li>
//                             <li><Link
//                                 className='block px-4 py-2'
//                                 href=""
//                                 onBlur={() => setIsOpen(false)}
//                                 tabIndex='-1'
//                             >Appointments</Link></li>
//                             <li><Link
//                                 className='block px-4 py-2'
//                                 to="/register"
//                                 onBlur={() => setIsOpen(false)}
//                                 tabIndex='-1'
//                             >Regiseter</Link></li>
//                             <li><button
//                                 className='block px-4 py-2'
//                                 onClick={logoutHandler}
//                                 onBlur={() => setIsOpen(false)}
//                                 tabIndex='-1'
//                             >Logout</button></li>
//                         </ul>
//                     </div>
//                 )
//             }
//         </div>
//     )
// }

// export default DropDown