import express from "express";
import pool from "../db.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const router = express.Router()

// Register new user
router.post('/register', async (req, res) => {
    try {
        // Receive data from FE
        const { email, password } = req.body

        // Check if user exists
        const existingUser = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        )
        if (existingUser.rows.length > 0) {
            return res.status(400).json({ message: 'User already exists' })
        }
        
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save user to database
        const newUser = await pool.query(
            'INSERT INTO users(email, password) VALUES ($1, $2) RETURNING id, email',
            [email, hashedPassword]
        )

        // Send back success and token
        const token = jwt.sign({ id: newUser.rows[0].id, email: newUser.rows[0].email }, process.env.JWT_SECRET, { expiresIn: '24h' })
        res.status(201).json({ token })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

router.get('/test', async (req, res) => {
    res.send('test worked')
})


// Login new user

export default router