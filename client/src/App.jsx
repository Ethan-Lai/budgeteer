import { useState, useEffect } from 'react'
import './App.css'
import User from './User'
import axios from 'axios'

function App() {
    const [users, setUsers] = useState([])

    const getUser = async () => {
        const response = await axios.get("/api/user")
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

export default App
