import jwt from 'jsonwebtoken'

export function createAcessToken(payload) {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            process.env.TOKEN_SECRET,
            { expiresIn: "1d" },
            (err, token) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(token)
                }
            }
        )
    })
}