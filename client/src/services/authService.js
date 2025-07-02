import axios from "axios"

export const loginUser = async (data) => {
    try {
        const response = await axios.post('api/auth/login', {
            email: data.email,
            password: data.password
        })
        localStorage.setItem('token', response.data.token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
        console.log('User has been logged in', response.data)
    } catch (err) {
        console.log('Error: ', err)
    }
}

export const registerUser = async (data) => {
    try {
        const response = await axios.post('/api/auth/register', {
            email: data.email,
            password: data.password
        })
        localStorage.setItem('token', response.data.token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
        console.log('User created', response.data)
    } catch (err) {
        console.log('Error: ', err)
    }
}

export const logoutUser = () => {
    try {
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
    } catch (err) {
        console.log('Error', err)
    }
}