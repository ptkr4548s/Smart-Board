const express = require("express");
const jwt = require('jsonwebtoken');
const User = require('../../models/user');

const router = express.Router();
function generateToken(user) {
    return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: '1h' // Token expires in 1 hour
    });
}

router.post("/login", (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email: email })
        .then(user => {
            if (user) {
                if (password === user.password) {
                    const token = generateToken(user);
                    res.status(200).json({ message: "Login Successful", user: user, token: token });
                } else {
                    res.status(401).json({ message: "Password didn't match" });
                }
            } else {
                res.status(404).json({ message: "User not registered" });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: "Internal Server Error" });
        });
});

router.post("/signup", (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "Incomplete data. Please provide username, email, and password." });
    }

    User.findOne({ email: email })
        .then(user => {
            if (user) {
                return res.status(409).json({ message: "User already registered" });
            } else {
                const newUser = new User({
                    name,
                    email,
                    password,
                });

                return newUser.save()
                    .then(() => {
                        res.status(201).json({ message: "Successfully Registered, Please login now." });
                    });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: "Internal Server Error" });
        });
});



module.exports = router;
