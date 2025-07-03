import express from "express"
import pool from "../db.js";

const router = express.Router()

// Create a trip
router.post('/', async (req, res) => {
    try {
        const { title, start_date, end_date } = req.body
        const user_id = req.user.id

        const newTrip = await pool.query(
            `INSERT INTO trips(user_id, title, start_date, end_date) 
            VALUES ($1, $2, $3, $4)
            RETURNING *`,
            [user_id, title, start_date, end_date]
        )

        res.status(201).json({ newTrip })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}) 

export default router