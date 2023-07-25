import { Header } from "../../_components/userComponents"
import { Outlet } from 'react-router-dom'


const UserLayout = () => {
    return (
        <>
            <Header />
            <div className="mt-20"></div>
            <Outlet />
        </>
    )
}

export default UserLayout