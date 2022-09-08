import React from 'react'
import { Navigate, Outlet } from "react-router-dom"

export const PublicRoute = () => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role')
    return !token ? <Outlet /> : <Navigate to={`/${role}/home`} />
}





