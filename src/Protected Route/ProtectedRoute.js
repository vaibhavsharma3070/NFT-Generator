import React from 'react'
import { Outlet, useNavigate } from "react-router-dom"

export const ProtectedRoute = () => {
    const token = false;
    let navigate = useNavigate();
    return token ? <Outlet /> : navigate("/Login")
}





