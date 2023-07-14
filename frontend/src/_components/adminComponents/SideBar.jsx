import { useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs"
import { RiDashboardFill } from "react-icons/ri";
import { AiOutlineLogout, AiOutlineSchedule, AiOutlineDown } from "react-icons/ai";
import { FaUserDoctor, FaHospitalUser, FaUserInjured } from "react-icons/fa6";
import { Link, NavLink } from "react-router-dom";


function SideBar() {
    const [open, setOpen] = useState(true)
    const [submenuOpen, setSubmenuOpen] = useState(false)

    const Menus = [
        { title: 'Dashboard', icon: <RiDashboardFill />, link: '/admin' },
        {
            title: 'Doctors', icon: <FaUserDoctor />, link: '#', submenu: true,
            submenuItems: [
                { title: 'Doctors', link: '#' },
                { title: 'Requests', link: '#' }
            ]
        },
        { title: 'Patients', icon: <FaUserInjured />, link: '#' },
        { title: 'Departments', icon: <FaHospitalUser />, link: '/admin/departments' },
        { title: 'Appointments', icon: <AiOutlineSchedule />, link: '#' },
        { title: 'Logout', icon: <AiOutlineLogout />, link: '#' }
    ]
    return (
        <div className={`bg-primary h-screen p-5 pt-8 relative ${open ? 'w-60' : 'w-20'} duration-500`}>
            <BsArrowLeftShort
                className={`bg-white text-primary text-3xl rounded-full absolute -right-3 top-9 border border-primary-600 cursor-pointer duration-700 ${!open && 'rotate-180'}`}
                onClick={() => setOpen(!open)}
            />
            <ul>
                {Menus.map((menu, index) => (
                    <>
                        <li key={index} className="text-white flex items-center mb-2 p-2 gap-x-4 cursor-pointer rounded hover:bg-primary-600">
                            <span className="text-2xl block float-left" >{menu.icon}</span>
                            <NavLink className={`text-md font-medium ${!open && 'hidden'}`} to={menu.link}>{menu.title}</NavLink>
                            {menu.submenu && open && (
                                <AiOutlineDown className={`ms-auto ${submenuOpen && 'rotate-180'}`} onClick={() => setSubmenuOpen(!submenuOpen)} />
                            )}
                        </li>
                        {menu.submenu && submenuOpen && open && (
                            <ul>
                                {menu.submenuItems.map((item, i) => (
                                    <li key={i} className="text-white flex items-center mb-1 p-2 ps-10 gap-x-4 cursor-pointer rounded hover:bg-primary-600">
                                        <a className={`text-md font-medium`} href={item.link}>{item.title}</a>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </>
                ))}
            </ul>
        </div>

    )
}

export default SideBar