const Order = require('../models/Order')
const { verifyTokenAndAuth, verifyTokenAndAdmin, verifyToken } = require("./verifyToken")

const router = require("express").Router()

// create order

router.post("/", verifyToken, async (req, res) => {
    const newOrder = new Order(req.body)

    try {
        const savedOrder = await newOrder.save()
        res.status(200).json(savedOrder)
    } catch (err) {
        res.status(500).json(err)
    }
})

// get user orders

router.get("/find/:userid", verifyTokenAndAuth, async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.userId })
        res.status(200).json(orders)
    } catch (err) {
        res.status(500).json(err)
    }
})

// get all orders

router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
        const orders = await Order.find()
        res.status(200).json(orders)
    } catch(err) {
        res.status(500).json(err)
    }
})

// update order

router.put("/:id", verifyTokenAndAuth, async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        res.status(200).json(updatedOrder)
    } catch (err) {
        res.status(500).json(err)
    }
})

// delete order

router.delete("/:id", verifyTokenAndAuth, async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json("Order has been deleted...")
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router