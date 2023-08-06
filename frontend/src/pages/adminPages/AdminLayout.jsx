import { Outlet } from 'react-router-dom'
import { SideBar, Header } from "../../_components/adminComponents"

function AdminLayout() {
    return (
        <>
            <Header />
            <div className='flex'>
                <SideBar />
                <div className='w-full md:w-3/4'>
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default AdminLayout