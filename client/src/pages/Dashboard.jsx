import { useState, useEffect } from 'react'
import User from '../User'
import axios from 'axios'

function Dashboard() {
    const [users, setUsers] = useState([])

    const getUser = async () => {
        const response = await axios.get("/api/user")
        console.log(response.data)
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

export default Dashboard
