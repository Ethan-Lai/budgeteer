import axios from "axios"

export const getToken = () => {
    return localStorage.getItem('token')
}

export const loginUser = async (data) => {
    const response = await axios.post('api/auth/login', {
        email: data.email,
        password: data.password
    })
    localStorage.setItem('token', response.data.token)
    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
    console.log('User has been logged in', response.data)
}

export const registerUser = async (data) => {
    const response = await axios.post('/api/auth/register', {
        email: data.email,
        password: data.password
    })
    localStorage.setItem('token', response.data.token)
    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
    console.log('User created', response.data)
}

export const logoutUser = () => {
    localStorage.removeItem('token')
    delete axios.defaults.headers.common['Authorization']
}