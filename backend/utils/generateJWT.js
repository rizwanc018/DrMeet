import jwt from 'jsonwebtoken'

const generateJWT = (res, userId, min) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: min + 'm'
    })

    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: min * 60 * 1000
    })
}




export { generateJWT }