import { useAuth } from "@/context/AuthContext"
import React from "react"
import { Navigate } from "react-router-dom";

const ProtectRoute = ({children}: {children: React.ReactNode}) =>{
    const {isAuthenticated} = useAuth();

    if(!isAuthenticated){
        return <Navigate to="/signin" replace />
    }
    return <>{children}</>
}

export default ProtectRoute;