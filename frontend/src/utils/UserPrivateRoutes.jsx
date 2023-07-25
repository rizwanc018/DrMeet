import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const UserPrivateRoutes = () => {
    const { userInfo } = useSelector(state => state.auth)
    return (
        userInfo && userInfo.isUSer ? <Outlet /> : <Navigate to='/login' />
    )
}

export default UserPrivateRoutes