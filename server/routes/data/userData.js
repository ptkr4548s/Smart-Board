const express = require("express");
const User = require('../../models/user');

const router = express.Router();

router.get("/userdata", async (req, res) => {
    try {
        console.log("Fetching user data...");
        const users = await User.find();
        console.log("Users:", users);
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get("/userdata/:email", async (req, res) => {
    try {
        const email = req.params.email;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        console.log(user);

        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
