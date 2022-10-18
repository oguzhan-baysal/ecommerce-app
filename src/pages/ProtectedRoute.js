import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children, admin }) {
    const { loggedIn, user } = useAuth();

    if(admin && user.email !== 'admin@admin.com'){
        return <Navigate to="/" />
    }

    if (admin && user.role !== "admin") return <Navigate to="/" />
    return loggedIn ? children : <Navigate to="/" />

}

export default ProtectedRoute;