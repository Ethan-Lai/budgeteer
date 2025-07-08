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

// Get all trips 
router.get('/', async (req, res) => {
    try {
        const userId = req.user.id

        const trips = await pool.query(
            `SELECT * FROM trips WHERE user_id = $1`,
            [userId]
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

// Get specific trip details
router.get('/:id', async (req, res) => {
    try {
        const tripId = req.params.id
        const userId = req.user.id

        const trip = await pool.query(
            `SELECT * FROM trips where id = $1`,
            [tripId]
        )

        // User is trying to access trip they didn't create
        if (trip.rows[0].user_id !== userId) {
            return res.status(403).json({ message: "Access Denied" })
        }

        // Later grab expenses for this trip as well

        return res.status(200).json({ trip: trip.rows[0] })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// Delete specific trip
router.delete('/:id', async (req, res) => {
    try {
        const tripId = req.params.id
        const userId = req.user.id

        const trip = await pool.query(
            `SELECT * FROM trips WHERE id = $1`,
            [tripId]
        )

        // Trip not found
        if (trip.rows.length === 0) {
            return res.status(404).json({ message: "Trip not found" })
        }

        // User is trying to delete a trip they didn't create
        if (trip.rows[0].user_id !== userId) {
            return res.status(403).json({ message: "Access Denied" })
        }

        // Later delete all expense related to the trip

        // If trip exists and associated with user, then delete
        await pool.query(
            `DELETE FROM trips WHERE id = $1`,
            [tripId]
        )

        res.status(204).send()
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

export default router