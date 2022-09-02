import React from 'react'
import { Navigate, Outlet } from "react-router-dom"

export const ProtectedAdminRoute = () => {
    const role = localStorage.getItem('role');
    return role === "Admin" ? <Outlet /> : <Navigate to="/Home" />
}