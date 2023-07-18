const router = require("express").Router()
const User = require("../models/User")

router.post("/register", async (req, res) => {
    const { username, email, password, isAdmin } = req.body
    
    // Errors

    const newUser = new User({
        username,
        email,
        password
    })

    try {
        const savedUser = await newUser.save()
        res.status(200).json(savedUser)
    } catch(err) {
        res.status(500).json(err)
    }
})

module.exports = router