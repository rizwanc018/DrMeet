import { Outlet } from 'react-router-dom'
import { SideBar, Header } from "../../_components/adminComponents"

function AdminLayout() {
    return (
        <>
            <Header />
            <div className='flex'>
                <SideBar />
                <div className='grow'>
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default AdminLayout