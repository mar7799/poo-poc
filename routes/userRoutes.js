const express = require("express");
const User = require("../models/User");
const Student = require("../models/Student");

const router = express.Router();

// Create a new user
router.post("/registerUser", async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.post("/registerUsers", async (req, res) => {
    try {
        const students = await User.insertMany(req.body); // Save multiple students
        res.status(201).json(students);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


//Get all users
router.get("/getUsers", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/:name",async (req, res) => {
    console.log("ist here..........")
    try {
        const s = await User.findOne({"name":{$eq:req.params.name}});
        res.json(s);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

// Update user
router.put("/:id", async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete user
router.delete("/:id", async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: "User deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
