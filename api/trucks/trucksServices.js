const jwt = require("jsonwebtoken");

const Trucks = require('./trucksModel');

module.exports = {
    isUnique,
    isValidTruck,
    isValidUser,
    isValidMenuItem,
    isValidLocation
};

function isUnique(req, res, next) {
    const query = req.body;
    if (!query.truckName) {
        next();
    } else {
        Trucks.findBy({ truckName: query.truckName })
            .then(truck => {
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
                    message: "User ID does not match Token ID. You may only edit your own data. ",
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
    } else if (menuItem.customerRatingAvg && typeof menuItem.customerRatingAvg !== "number") {
        res.status(400).json({
            message: "Average rating must be a number."
        })
    } else {
        next();
    }
}

function isValidLocation(req, res, next) {
    const location = req.body;

    if (!location.currentLocationDescription || typeof location.currentLocationDescription !== "string") {
        res.status(400).json({
            message: "Location description must be a string."
        })
    } else if (!location.currentStreetAddress || typeof location.currentStreetAddress !== "string") {
        res.status(400).json({
            message: "Street address must be a string."
        })
    } else if (!location.currentCity && typeof location.currentCity !== "string") {
        res.status(400).json({
            message: "Current city must be a string."
        })
    } else if (!location.currentState || typeof location.currentState !== "string") {
        res.status(400).json({
            message: "Current state must be a string."
        })
    } else if (!location.currentZipCode || typeof location.currentZipCode !== "number") {
        res.status(400).json({
            message: "Customer ratings must be an array."
        })
    } else if (!location.currentDepartureTime || typeof location.currentDepartureTime !== "string") {
        res.status(400).json({
            message: "Current departure time must be a string."
        })
    } else if (location.nextLocationDescription && typeof location.nextLocationDescription !== "string") {
        res.status(400).json({
            message: "nextLocationDescription must be a string a string."
        })
    } else if (location.nextStreetAddress && typeof location.nextStreetAddress !== "string") {
        res.status(400).json({
            message: "nextStreetAddress must be a string."
        })
    } else if (location.nextCity && typeof location.nextCity !== "string") {
        res.status(400).json({
            message: "nextCity must be a string."
        })
    } else if (location.nextState && typeof location.nextState !== "string") {
        res.status(400).json({
            message: "nextState must be a string a string."
        })
    } else if (location.nextZipCode && typeof location.nextZipCode !== "number") {
        res.status(400).json({
            message: "nextZipCode must be a string a number."
        })
    } else if (location.nextArrivalTime && typeof location.nextArrivalTime !== "string") {
        res.status(400).json({
            message: "nextArrivalTime must be a string a string."
        })
    } else if (location.nextDepartureTime && typeof location.nextDepartureTime !== "string") {
        res.status(400).json({
            message: "nextDepartureTime must be a string a string."
        })
    } else {
        next();
    }
}







