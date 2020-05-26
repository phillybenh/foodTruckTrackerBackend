const router = require('express').Router();

const Users = require("./usersModel");
const { isValidProf, isValidDel } = require("./usersServices");
const configVars = require("../../config/vars.js");


// /api/users/...
router.get("/", (req, res) => {
    Users.find()
        .then(users => {
            res.status(200).json({ data: users });
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        });
});
router.get("/diners", (req, res) => {
    Users.findDiners()
        .then(users => {
            res.status(200).json({ data: users });
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        });
});
router.get("/operators", (req, res) => {
    Users.findOperators()
        .then(users => {
            res.status(200).json({ data: users });
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        });
});

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

router.put('/:id', isValidProf, (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    Users.findById(id)
        .then(profile => {
            if (profile) {
                Users.update(changes, id)
                    .then(updatedProfile => {
                        res.status(200).json(updatedProfile);
                    });
            } else {
                res.status(404).json({ message: 'Could not find profile for the given id.' });
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to update profile.' });
        });
});

router.delete('/:id', (req, res) => {
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

module.exports = router;
