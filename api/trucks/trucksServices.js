const jwt = require("jsonwebtoken");

const Trucks = require('./trucksModel');

module.exports = {
    isUnique,
    isValidTruck,
    isValidDel
};

function isUnique(req, res, next) {
    const query = req.body;
    // console.log("query", query)
    if (!query.truckName) {
        next();
    } else {
        // console.log("query.username", query.username)
        Trucks.findBy({ truckName: query.truckName })
            .then(truck => {
                // console.log("user", user)
                if (truck.length === 0) {
                    next();
                } else {
                    res.status(404).json({ message: "That truck name already exists in the database." })
                }
            })
            .catch(error => {
                // console.log(error)
                res.status(500).json({ message: error.message })
            });
    }
}

function isValidTruck(req, res, next) {
    const truck = req.body;
    // const user_id = req.params.id;
    const token = req.headers.authorization;
    var decoded = jwt.decode(token);

    if (decoded.sub != truck.user_id) {
        res.status(401).json({
            message: "Please user ID does not match Token ID. You may only edit your own profile. ",
        });
    } else if (!truck.user_id || !truck.truckName || !truck.cuisineType) {
        res.status(400).json({
            message: "Please provide the required location information",
        });
    } else {
        next();
    }
}

function isValidDel(req, res, next) {
    const id = req.params.id;
    const token = req.headers.authorization;
    var decoded = jwt.decode(token);

    Trucks.findById(id)
        .then(truck => {
            if (decoded.sub != truck.operator_id) {
                res.status(401).json({
                    message: "Please user ID does not match Token ID. You may only edit your own profile. ",
                });
            } else {
                next();
            }
        })
}