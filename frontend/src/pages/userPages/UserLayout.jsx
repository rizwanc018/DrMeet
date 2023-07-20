import { Header } from "../../_components/userComponents"
import { Outlet } from 'react-router-dom'


const UserLayout = () => {
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}

export default UserLayout