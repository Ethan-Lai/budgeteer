import express from "express"
import pool from "../db.js";

const router = express.Router({ mergeParams: true })

// Create an expense for specific plan
router.post('/', async (req, res) => {
    try {
        const { amount, category, description, date } = req.body
        const user_id = req.user.id
        const plan_id = req.params.id

        const expense = await pool.query(
            `INSERT INTO expenses(amount, category, description, date, user_id, plan_id) 
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *`,
            [amount, category, description, date, user_id, plan_id]
        )

        res.status(201).json({ expense: expense.rows[0]})
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// Edit specific expense
router.put('/:expenseId', async (req, res) => {
    try {
        const { amount, category, description, date } = req.body
        const user_id = req.user.id
        const plan_id = req.params.id
        const expense_id = req.params.expenseId

        const expense = await pool.query(
            `SELECT * FROM expenses WHERE id = $1`,
            [expense_id]
        )

        // Expense doesn't exist
        if (expense.rows.length === 0) {
            return res.status(404).json({ error: "Expense not found" })
        }

        // User trying to access another user's expense
        if (expense.rows[0].user_id !== user_id) {
            return res.status(403).json({ error: "Access Denied" })
        }

        // They can edit
        const editedExpense = await pool.query(
            `UPDATE expenses SET amount = $1, category = $2, description = $3, date = $4
            WHERE id = $5 AND user_id = $6 AND plan_id = $7
            RETURNING *`,
            [amount, category, description, date, expense_id, user_id, plan_id]
        )

        res.status(200).json({ editedExpense: editedExpense.rows[0] })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// Get all expenses for specific plan
router.get('/', async (req, res) => {
    try {
        const user_id = req.user.id
        const plan_id = req.params.id

        const expenses = await pool.query(
            `SELECT * FROM expenses WHERE user_id = $1 AND plan_id = $2`,
            [user_id, plan_id]
        )

        res.status(200).json({ expenses: expenses.rows })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// Delete expense 
router.delete('/:expenseId', async (req, res) => {
    try {
        const user_id = req.user.id
        const plan_id = req.params.id
        const expense_id = req.params.expenseId

        const result = await pool.query(
            `DELETE FROM expenses WHERE user_id = $1 AND plan_ID = $2 AND id = $3`,
            [user_id, plan_id, expense_id]
        )

        // rowCount returns number of things deleted
        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Expense not found or you do not have permission to delete it" })
        }

        res.status(204).send()
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

export default router