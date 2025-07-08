import express from "express"
import pool from "../db.js";

const router = express.Router()

// Create a plan 
router.post('/', async (req, res) => {
    try {
        const { title, start_date, end_date } = req.body
        const user_id = req.user.id

        const newPlan = await pool.query(
            `INSERT INTO plans(user_id, title, start_date, end_date) 
            VALUES ($1, $2, $3, $4)
            RETURNING *`,
            [user_id, title, start_date, end_date]
        )

        res.status(201).json({ plan: newPlan.rows[0] })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}) 

// Get all plans 
router.get('/', async (req, res) => {
    try {
        const userId = req.user.id

        const plans = await pool.query(
            `SELECT * FROM plans WHERE user_id = $1`,
            [userId]
        )

        // Otherwise, displays as yyyy-mm-ddT.......
        const formattedPlans = plans.rows.map(plan => ({
            ...plan,
            start_date: plan.start_date.toISOString().split('T')[0],
            end_date: plan.end_date.toISOString().split('T')[0]
        }))

        res.status(200).json({ plans: formattedPlans })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// Get specific plan details
router.get('/:id', async (req, res) => {
    try {
        const planId = req.params.id
        const userId = req.user.id

        const plan = await pool.query(
            `SELECT * FROM plans where id = $1`,
            [planId]
        )

        // User is trying to access plan they didn't create
        if (plan.rows[0].user_id !== userId) {
            return res.status(403).json({ message: "Access Denied" })
        }

        // Later grab expenses for this plan as well

        return res.status(200).json({ plan: plan.rows[0] })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// Delete specific plan
router.delete('/:id', async (req, res) => {
    try {
        const planId = req.params.id
        const userId = req.user.id

        const plan = await pool.query(
            `SELECT * FROM plans WHERE id = $1`,
            [planId]
        )

        // Plan not found
        if (plan.rows.length === 0) {
            return res.status(404).json({ message: "Plan not found" })
        }

        // User is trying to delete a plan they didn't create
        if (plan.rows[0].user_id !== userId) {
            return res.status(403).json({ message: "Access Denied" })
        }

        // Later delete all expense related to the plan

        // If plan exists and associated with user, then delete
        await pool.query(
            `DELETE FROM plans WHERE id = $1`,
            [planId]
        )

        res.status(204).send()
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

export default router