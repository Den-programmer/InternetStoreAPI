const Cart = require('../models/Cart')
const { verifyTokenAndAuth, verifyTokenAndAdmin, verifyToken } = require("./verifyToken")

const router = require("express").Router()

// create cart

router.post("/", verifyToken, async (req, res) => {
    const newCart = new Cart(req.body)

    try {
        const savedCart = await newCart.save()
        res.status(200).json(savedCart)
    } catch (err) {
        res.status(500).json(err)
    }
})

// get user cart

router.get("/find/:userid", verifyTokenAndAuth, async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.userId })
        res.status(200).json(cart)
    } catch (err) {
        res.status(500).json(err)
    }
})

// get all 

router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
        const carts = await Cart.find()
        res.status(200).json(carts)
    } catch(err) {
        res.status(500).json(err)
    }
})

// update cart

router.put("/:id", verifyTokenAndAuth, async (req, res) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        res.status(200).json(updatedCart)
    } catch (err) {
        res.status(500).json(err)
    }
})

// delete cart

router.delete("/:id", verifyTokenAndAuth, async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json("Product has been deleted...")
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router