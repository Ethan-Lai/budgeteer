import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js'
import planRoutes from './routes/planRoutes.js'
import authMiddleware from './middleware/authMiddleware.js'

const app = express()
dotenv.config();
const PORT = process.env.PORT || 6767

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/plans', authMiddleware, planRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})