const jwt = require("jsonwebtoken");

const Trucks = require('./trucksModel');

module.exports = {
    isUnique,
    isValidTruck,
    isValidUser,
    isValidMenuItem
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

    if (!truck.user_id || typeof truck.user_id !== "number") {
        res.status(400).json({
            message: "Please provide a valid user id.",
        });
    } if (decoded.sub != truck.user_id) {
        res.status(401).json({
            message: "Please user ID does not match Token ID. You may only edit your own profile. ",
        });
    } else if (!truck.truckName || typeof truck.truckName !== "string") {
        res.status(400).json({
            message: "Please provide a valid truck name.",
        });
    } else if (!truck.cuisineType || typeof truck.cuisineType !== "string") {
        res.status(400).json({
            message: "Please provide a valid cuisine type.",
        });
    } else {
        next();
    }
}

function isValidUser(req, res, next) {
    const id = req.params.id;
    const token = req.headers.authorization;
    var decoded = jwt.decode(token);

    Trucks.findById(id)
        .then(truck => {
            if (decoded.sub != truck.operator_id) {
                res.status(401).json({
                    message: "Please user ID does not match Token ID. You may only edit your own data. ",
                });
            } else {
                next();
            }
        })
}
function isValidMenuItem(req, res, next) {
    const menuItem = req.body;

    if (!menuItem.itemName || typeof menuItem.itemName !== "string") {
        console.log(typeof menuItem.customerRatings)
        res.status(400).json({
            message: "Menu items must have an name that is a string."
        })
    } else if (menuItem.itemDescription && typeof menuItem.itemDescription !== "string") {
        res.status(400).json({
            message: "Item description must be a string a string."
        })
    } else if (menuItem.itemPhotos && typeof menuItem.itemPhotos !== "string") {
        res.status(400).json({
            message: "Item photo URL must be a string a string."
        })
    } else if (!menuItem.itemPrice || typeof menuItem.itemPrice !== "number") {
        res.status(400).json({
            message: "Menu items must have an price that is a number."
        })
    } else if (menuItem.customerRatings && Array.isArray(menuItem.customerRatings) === false) {
        res.status(400).json({
            message: "Customer ratings must be an array."
        })
    } else if (menuItem.customerRatingAvg && typeof menuItem.customerRatingAvg !== "string") {
        res.status(400).json({
            message: "Average rating must be a number."
        })
    } else {
        next();
    }
}