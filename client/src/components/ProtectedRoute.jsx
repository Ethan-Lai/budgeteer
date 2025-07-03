import { getToken } from '@/services/authService'
import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
    const token = getToken()
    console.log(token)

    if (!token) {
        return <Navigate to="/" />
    }

    return children
}

export default ProtectedRoute