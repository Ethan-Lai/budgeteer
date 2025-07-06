import { getToken } from '@/services/authService'
import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
    const token = getToken()

    if (!token) {
        console.log('No token found - user needs to login');
        return <Navigate to="/" />
    }

    return children
}

export default ProtectedRoute