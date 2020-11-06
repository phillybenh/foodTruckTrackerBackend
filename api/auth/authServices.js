const jwt = require("jsonwebtoken");
const configVars = require("../../config/vars");
const Users = require("./authModel");


module.exports = {
    isValidReg,
    isValidLogin,
    isUnique,
    createToken
};

function isValidReg(req, res, next) {
    const reg = req.body;
    if (!reg.username || typeof reg.username !== "string") {
        res.status(400).json({
            message: "Please provide a valid username.",
        });
    } else if (!reg.password || typeof reg.password !== "string") {
        res.status(400).json({
            message: "Please provide a valid password.",
        });
    } else if (!reg.email || typeof reg.email !== "string") {
        res.status(400).json({
            message: "Please provide a valid email address.",
        });
    } else if (!reg.operator && !reg.diner) {
        res.status(400).json({
            message: "Please provide a valid user role.",
        });
    } else {
        next();
    }
}

function isValidLogin(req, res, next) {
    const loginInfo = req.body;
    if (!loginInfo.username || typeof loginInfo.username !== "string") {
        res.status(400).json({
            message: "Please provide a valid username.",
        });
    } else if (!loginInfo.password || typeof loginInfo.password !== "string") {
        res.status(400).json({
            message: "Please provide a valid password.",
        });
    } else {
        next();
    }
}

function isUnique(req, res, next) {
    const query = req.body;
    if (!query.username) {
        next();
    } else {
        Users.findBy({ username: query.username })
            .then(user => {
                if (user.length === 0) {
                    next();
                } else {
                    res.status(404).json({ message: "That username already exists in the database." })
                }
            })
            .catch(error => {
                res.status(500).json({ message: error.message })
            });
    }
}


function createToken(user) {
    const payload = {
        sub: user.id,
        username: user.username,
        operator: user.operator,
        diner: user.diner
    };

    const secret = configVars.jwtSecret;

    const options = {
        expiresIn: configVars.expiresIn,
    };

    return jwt.sign(payload, secret, options);
}