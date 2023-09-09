import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom";

import AuthContext from "../../context/AuthContext"

const PrivateRoute = ({ component: RouteComponent, ...rest}) => {
    const { currentUser } = useContext(AuthContext);

    return(
        currentUser? <Outlet/> : <Navigate to="/"/>
    )
}

export default PrivateRoute;