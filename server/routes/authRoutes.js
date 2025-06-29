import express from "express";

const router = express.Router()

// Register new user
router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body
        res.json({
            message: 'received user details',
            receivedData: req.body
        })
        console.log(email, password)
    } catch (err) {
        res.status(500).json({ error: err.message})
    }
})

router.get('/test', async (req, res) => {
    res.send('test worked')
})


// Login new user

export default router