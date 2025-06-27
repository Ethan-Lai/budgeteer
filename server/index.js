import express from 'express'
import cors from 'cors'
import users from './user.js'

const app = express()
const PORT = process.env.PORT || 6767

// Middleware
app.use(cors())

app.get('/', (req, res) => {
    res.send("Server is ready")
})

app.get('/api/user', (req, res) => {
    res.send(users)
})

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})