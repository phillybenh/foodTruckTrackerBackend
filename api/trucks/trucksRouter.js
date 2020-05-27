const router = require('express').Router();

const Trucks = require('./trucksModel');
const { isUnique, isValidTruck, isValidDel, isValidMenuItem } = require("./trucksServices");


// Add truck	POST / api / trucks
router.post("/", isValidTruck, isUnique, (req, res) => {
    Trucks.insert(req.body)
        .then(trucks => {
            res.status(200).json({ data: trucks });
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        });
});

// Get trucks	GET / api / trucks
router.get("/", (req, res) => {
    Trucks.find()
        .then(trucks => {
            res.status(200).json({ data: trucks });
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        });
});

// Query trucks	GET-- TO DO--

// Get truck	GET / api / trucks /: id
router.get("/:id", (req, res) => {
    const { id } = req.params;

    Trucks.findById(id)
        .then(truck => {
            res.status(200).json({ data: truck });
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        });
});
// Edit truck	PUT / api / trucks /: id
router.put('/:id', isValidTruck, (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    Trucks.findById(id)
        .then(truck => {
            if (truck) {
                Trucks.update(changes, id)
                    .then(updatedTruck => {
                        res.status(200).json({ data: updatedTruck });
                    });
            } else {
                res.status(404).json({ message: 'Could not find profile for the given id.' });
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to update profile.' });
        });
});

// Delete trucks	DELETE / api / trucks /: id
router.delete('/:id', isValidDel, (req, res) => {
    const { id } = req.params;

    Trucks.remove(id)
        .then(deleted => {
            if (deleted) {
                res.status(200).json({ removed: deleted });
            } else {
                res.status(404).json({ message: 'Could not find truck with given id.' });
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to delete truck.' });
        });
});

// Add truck menu	POST / api / trucks /: id / menu
router.post("/:id/menu", isValidMenuItem, (req, res) => {
    const { id } = req.params;
    const menuItem = req.body;

    Trucks.findById(id)
        .then(truck => {
            if (truck) {
                Trucks.insertMenu(menuItem, id)
                    .then(updatedMenu => {
                        res.status(200).json({ data: updatedMenu });
                    });
            } else {
                res.status(404).json({ message: 'Could not find the truck id for this menu item.' });
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to update profile.' });
        });
});

// Get truck menu	GET / api / trucks /: id / menu///////START HERE
router.get("/:id/menu", (req, res) => {
    const { id } = req.params;

    Trucks.findMenuById(id)
        .then(menu => {
            res.status(200).json({ data: menu });
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        });
});

/// not done
// Edit truck menu	PUT / api / trucks /: id / menu	
router.put("/:id/menu", isValidMenuItem, (req, res) => {
    const { id } = req.params;
    const menuItem = req.body;

    Trucks.findById(id)
        .then(truck => {
            if (truck) {
                Trucks.insertMenu(menuItem, id)
                    .then(updatedMenu => {
                        res.status(200).json({ data:updatedMenu });
                    });
            } else {
                res.status(404).json({ message: 'Could not find the truck id for this menu item.' });
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to update profile.' });
        });
});

module.exports = router;
