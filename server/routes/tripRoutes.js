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

        res.status(201).json({ trip: newTrip.rows[0] })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}) 

// Get trips
router.get('/', async (req, res) => {
    try {
        const user_id = req.user.id

        const trips = await pool.query(
            `SELECT * FROM trips WHERE user_id = $1`,
            [user_id]
        )

        // Otherwise, displays as yyyy-mm-ddT.......
        const formattedTrips = trips.rows.map(trip => ({
            ...trip,
            start_date: trip.start_date.toISOString().split('T')[0],
            end_date: trip.end_date.toISOString().split('T')[0]
        }))

        res.status(200).json({ trips: formattedTrips })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

export default router