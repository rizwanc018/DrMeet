import jwt from 'jsonwebtoken'

const generateUserJWT = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '30m'
    })

    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 30 * 60 * 1000
    })
}

const generateDoctorJWT = (res, docId) => {
    const token = jwt.sign({ docId }, process.env.JWT_SECRET, {
        expiresIn: '30m'
    })

    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 30 * 60 * 1000
    })
}

const generateAdminJwtToken = (res, adminId) => {
    const token = jwt.sign({ adminId }, process.env.JWT_SECRET, {
        expiresIn: '10m'
    })

    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 10 * 60 * 1000
    })
}

export { generateUserJWT, generateDoctorJWT, generateAdminJwtToken }