import express from "express";

const router = express.Router()

// Register new user
router.post('/register', async (req, res) => {
    const { email, password } = req.body
})



// Login new user

export default router