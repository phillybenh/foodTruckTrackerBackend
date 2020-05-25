require('dotenv').config()

module.exports = {
    jwtSecret: process.env.JWT_SECRET || "jik3453hwto87687wy45h2345l23kjhs4f23fFgosd897y",
    bcryptRounds: process.env.BCRYPT_ROUNDS || 8,
    expiresIn: process.env.TOKEN_EXPIRATION || '1w'
}