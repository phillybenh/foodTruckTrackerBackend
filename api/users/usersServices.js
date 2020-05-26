const jwt = require("jsonwebtoken");
const configVars = require("../../config/vars");


module.exports = {
    isValidProf
};

function isValidProf(req, res, next) {
    const profile = req.body;
    const user_id = req.params.id;
    const token = req.headers.authorization;
    var decoded = jwt.decode(token);

    if (decoded.sub != user_id) {
        res.status(400).json({
            message: "Please user ID does not match Token ID. You may only edit your own profile. ",
        });
    } else if (!profile.currentStreetAddress || !profile.currentCity || !profile.currentState || !profile.currentZipCode) {
        res.status(400).json({
            message: "Please provide the required location information",
        });
    } else {
        next();
    }


}