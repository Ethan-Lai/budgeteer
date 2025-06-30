import jwt from "jsonwebtoken"

function authMiddleware(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader?.startsWith('Bearer ')
        ? authHeader.slice(7)
        : authHeader

    if (!token) {
        return res.status(401).json({ error: 'No token provided' })
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: "Invalid token" })
        }

        req.userId = decoded.id
        next()
    })
}

export default authMiddleware