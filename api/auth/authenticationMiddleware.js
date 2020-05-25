const jwt = require("jsonwebtoken");
const configVars = require("../../config/vars");

module.exports = (req, res, next) => {

    const token = req.headers.authorization;
    if (token) {
        const secret = configVars.jwtSecret;

        jwt.verify(token, secret, (error, decodedToken) => {
            if (error) {
                // the token is invalid
                res.status(401).json({ message: "You cannot access without valid credentials." });
            } else {
                // the token is good
                req.jwt = decodedToken;
                next();
            }
        });
    } else {
        res.status(400).json({ message: "Please provide the authentication information" });
    }
};