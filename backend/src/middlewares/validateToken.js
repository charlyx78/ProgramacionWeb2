import jwt from 'jsonwebtoken'

export const authRequired = (req, res, next) => {
    const { token } = req.cookies

    if(!token) return res.status(401).json({
        message: "No token found, request denied"
    })

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if(err) return res.status(401).json({
            message: "Invalid token, request denied"
        })

        req.user = user
        
        next()
    })
}