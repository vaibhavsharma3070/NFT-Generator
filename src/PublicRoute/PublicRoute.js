import React from 'react'
import { Navigate, Outlet } from "react-router-dom"

export const PublicRoute = () => {
    const token = localStorage.getItem('token');
    return !token ? <Outlet /> : <Navigate to="/user/home" />
}





