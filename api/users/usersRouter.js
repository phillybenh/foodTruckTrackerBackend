const router = require('express').Router();

const Users = require("./usersModel");
const { isValidProf, isValidDel } = require("./usersServices");


// Get a list of users	GET	/api/users
router.get("/", (req, res) => {
    Users.find()
        .then(users => {
            res.status(200).json({ data: users });
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        });
});

// Get a list of diners	GET	/api/users/diners
router.get("/diners", (req, res) => {
    Users.findDiners()
        .then(users => {
            res.status(200).json({ data: users });
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        });
});

// Get a list of operators	GET	/api/users/operators
router.get("/operators", (req, res) => {
    Users.findOperators()
        .then(users => {
            res.status(200).json({ data: users });
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        });
});

// Get a user profile	GET	/api/users/:id
router.get("/:id", (req, res) => {
    const { id } = req.params;

    Users.findById(id)
        .then(users => {
            res.status(200).json({ data: users });
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        });
});

// Edit a user profile	PUT	/api/users/:id
router.post("/:id", isValidProf, (req, res) => {
    const { id } = req.params;
    const profile = req.body;
    Users.insert(profile, id)
        .then(users => {
            res.status(201).json({ data: users });
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        });
});

// Edit a user profile	PUT	/api/users/:id
router.put('/:id', isValidProf, (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    Users.findById(id)
        .then(profile => {
            if (profile) {
                Users.update(changes, id)
                    .then(updatedProfile => {
                        res.status(200).json({ data: updatedProfile });
                    });
            } else {
                res.status(404).json({ message: 'Could not find profile for the given id.' });
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to update profile.' });
        });
});

// Delete a user	DELETE	/api/users/:id
router.delete('/:id', isValidDel, (req, res) => {
    const { id } = req.params;

    Users.remove(id)
        .then(deleted => {
            if (deleted) {
                res.status(200).json({ removed: deleted });
            } else {
                res.status(404).json({ message: 'Could not find user with given id.' });
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to delete user.' });
        });
});

// // Get a favorite trucks	GET	/api/users/:id/favoriteTrucks
router.get('/:id/favoriteTrucks', (req, res) => {
    const { id } = req.params;
    Users.favTrucks(id)
        .then(trucks => {
            res.status(200).json({ data: trucks });
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        });
})
// router.get('/:id/favoriteTrucks', (req, res) => {
//     const { id } = req.params;
//     const favTrucks = []

//     Users.favNums(id)
//         .then(resp => {
//             return resp.map((num) => {
//                 return Users.favTrucks(num)
//                     .then(trucks => {
//                         console.log(trucks)
//                         favTrucks.push(trucks);
//                     })
//                 res.status(200).json({ data: favTrucks });

//             })
//             res.status(200).json({ data: favTrucks });

//         })
//         .catch(error => {
//             res.status(500).json({ message: error.message });
//         });
// })

router.get('/:id/trucksOwned', (req, res) => {
    const { id } = req.params;
    Users.findTrucks(id)
        .then(trucks => {
            res.status(200).json({ data: trucks });
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        });
})

module.exports = router;
