const jwt = require("jsonwebtoken");
const configVars = require("../../config/vars");


module.exports = {
    isValidProf,
    isValidDel
};

function isValidProf(req, res, next) {
    const profile = req.body;
    const user_id = req.params.id;
    const token = req.headers.authorization;
    var decoded = jwt.decode(token);

    if (decoded.sub != user_id) {
        res.status(401).json({
            message: "Please user ID does not match Token ID. You may only edit your own profile. ",
        });
    } else if (!profile.currentStreetAddress || typeof profile.currentStreetAddress !== "string") {
        res.status(400).json({
            message: "Please provide a valid street address.",
        });
    } else if (!profile.currentCity || typeof profile.currentCity !== "string") {
        res.status(400).json({
            message: "Please provide a valid city.",
        });
    } else if (!profile.currentState || typeof profile.currentState !== "string") {
        res.status(400).json({
            message: "Please provide a valid state.",
        });
    } else if (!profile.currentZipCode || typeof profile.currentZipCode !== "number") {
        res.status(400).json({
            message: "Please provide a valid zip code.",
        });
    } else {
        next();
    }
}

function isValidDel(req, res, next) {
    const profile = req.body;
    const user_id = req.params.id;
    const token = req.headers.authorization;
    var decoded = jwt.decode(token);

    if (decoded.sub != user_id) {
        res.status(401).json({
            message: "Please user ID does not match Token ID. You may only edit your own profile. ",
        });
    } else {
        next();
    }
}