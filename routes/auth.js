const router = require("express").Router()
const User = require("../models/User")
const CryptoJS = require("crypto-js")
const jwt = require("jsonwebtoken")

// Register

router.post("/register", async (req, res) => {
    const { username, email, password, isAdmin } = req.body
    
    // Errors

    const newUser = new User({
        username,
        email,
        password: CryptoJS.AES.encrypt(password, process.env.PASS_SEC),
        isAdmin
    })

    try {
        const savedUser = await newUser.save()
        res.status(200).json(savedUser)
    } catch(err) {
        res.status(500).json(err)
    }
})

// Login

router.post("/login", async (req, res) => {
    const wc = "Wrong credentials!"
    try {
        const user = await User.findOne({ username: req.body.username })
        
        !user && res.status(401).json(wc)

        const hashedPass = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC)
        const password = hashedPass.toString(CryptoJS.enc.Utf8)

        password !== req.body.password && res.status(401).json(wc)
        
        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin
        }, process.env.JWT_SEC,
        { expiresIn: "90d" })

        const { pass, ...others } = user._doc

        res.status(200).json({...others, accessToken})
    } catch(err) {
        res.status(500).json(err)
    }
})

module.exports = router