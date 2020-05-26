const router = require('express').Router();

const Users = require("./usersModel");
// const { isValidReg, isValidLogin, isUnique, createToken } = require("./authServices");
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

module.exports = router;
