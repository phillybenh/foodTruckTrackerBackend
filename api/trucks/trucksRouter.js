const router = require('express').Router();

const Trucks = require('./trucksModel');
const { isUnique, isValidTruck, isValidUser, isValidMenuItem } = require("./trucksServices");


// Add truck	POST / api / trucks
router.post("/", isValidTruck, isUnique, (req, res) => {
    Trucks.add(req.body)
        .then(trucks => {
            res.status(200).json({ data: trucks });
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        });
});

// Get trucks	GET / api / trucks
router.get("/", (req, res) => {
    const query = req.query;
    
    if (Object.keys(query).length === 0) {

    Trucks.find()
        .then(trucks => {
            res.status(200).json({ data: trucks });
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        });
    } else{
        Trucks.findQuery(query)
            .then(trucks => {
                if (trucks) {
                    res.status(200).json({ data: trucks })
                } else {
                    res.status(404).json({ message: "No trucks match your query." })
                }
            })
            .catch(error => {
                console.log(error)
                res.status(500).json({ message: error.message })
            });
    }
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
router.delete('/:id', isValidUser, (req, res) => {
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
router.post("/:id/menu", isValidUser, isValidMenuItem, (req, res) => {
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

// Get truck menu	GET / api / trucks /: id / menu
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

// Edit truck menu	PUT / api / trucks /: id / menu	function updateMenu(changes, menu_id, truck_id) {

router.put("/:id/menu/:item_id", isValidUser, isValidMenuItem, (req, res) => {
    const { id, item_id } = req.params;
    const menuItem = req.body;

    Trucks.findById(id)
        .then(truck => {
            if (truck) {
                Trucks.findMenuItemById(item_id)
                    .then(item => {
                        if (item && item.truck_id == id) {
                            Trucks.updateMenu(menuItem, item_id, id)
                                .then(updatedMenu => {
                                    res.status(200).json({ data: updatedMenu });
                                });
                        } else {
                            res.status(404).json({ message: 'Menu item id must exist and correspond to the given truck id.' });
                        }
                    })

            } else {
                res.status(404).json({ message: 'Could not find the truck id for this menu item.' });
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to update profile.' });
        });
});

// Delete truck menu	DELETE	/api/trucks/:id/menu 
router.delete('/:id/menu/:item_id', isValidUser, (req, res) => {
    const { id, item_id } = req.params;

    Trucks.findById(id)
        .then(truck => {
            if (truck) {
                Trucks.findMenuItemById(item_id)
                    .then(item => {
                        if (item && item.truck_id == id) {
                            Trucks.removeMenuItem(item_id)
                                .then(updatedMenu => {
                                    res.status(200).json({ removed: updatedMenu });
                                });
                        } else {
                            res.status(404).json({ message: 'Menu item id must exist and correspond to the given truck id.' });
                        }
                    })

            } else {
                res.status(404).json({ message: 'Could not find the truck id for this menu item.' });
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to delete menu item.' });
        });
});

module.exports = router;
