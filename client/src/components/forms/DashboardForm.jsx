import { useState, useEffect } from 'react'
import User from '@/User'
import axios from 'axios'
import { getToken } from '@/services/authService'

const DashboardForm = () => {
    const [users, setUsers] = useState([])

    const getUser = async () => {
        const token = getToken()
        
        // Set the header so the backend can grab for middleware
        const response = await axios.get("/api/user", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        setUsers(response.data)
    }

    useEffect(() => {
        getUser()
    }, [])

    return (
        <div>
            {users.map((user, index) => 
                <User key={index} name={user.name} username={user.username} email={user.email} />
            )}
        </div>
    )
}

export default DashboardForm
