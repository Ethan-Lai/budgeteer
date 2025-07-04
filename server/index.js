import express from 'express'
import cors from 'cors'
import users from './user.js'
import pool from './db.js'
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js'
import tripRoutes from './routes/tripRoutes.js'
import authMiddleware from './middleware/authMiddleware.js'

const app = express()
dotenv.config();
const PORT = process.env.PORT || 6767

// Middleware
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send("Server is ready")
})

app.get('/api/user', authMiddleware, (req, res) => {
    res.send(users)
})

app.get('/api/test-db', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()')
        res.json({ 
            message: 'Database connected!', 
            time: result.rows[0].now 
        })
    } catch (error) {
        res.status(500).json({ error: 'Database connection failed' })
    }
})

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/trips', authMiddleware, tripRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})