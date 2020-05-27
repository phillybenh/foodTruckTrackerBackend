const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = require('express').Router();

const Auth = require("./authModel");
const { isValidReg, isValidLogin, isUnique, createToken } = require("./authServices");
const configVars = require("../../config/vars.js");


// Add a user	POST	/api/register	
router.post('/register', isValidReg, isUnique, (req, res) => {
    const credentials = req.body;

    const rounds = configVars.bcryptRounds;

    // hash the password
    const hash = bcryptjs.hashSync(credentials.password, rounds);

    credentials.password = hash;

    // save the user to the database
    Auth.add(credentials)
        .then(user => {
            res.status(201).json({ data: user });
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        });

});

// Login as user	POST	/api/login	
router.post('/login', isValidLogin, (req, res) => {
    const { username, password } = req.body;

    Auth.findBy({ username: username })
        .then(([user]) => {
            // compare the password the hash stored in the database
            if (user && bcryptjs.compareSync(password, user.password)) {
                // produce (sign) and send the token with username and password
                const token = createToken(user);

                res.status(200).json({
                    message: "Access granted.",
                    token
                });
            } else {
                res.status(401).json({ message: "Invalid credentials." });
            }
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        });

});

module.exports = router;
