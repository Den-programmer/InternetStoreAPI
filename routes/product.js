const Product = require('../models/Product')
const { verifyTokenAndAuth, verifyTokenAndAdmin, verifyToken } = require("./verifyToken")

const router = require("express").Router()

// create product

router.post("/", verifyToken, async (req, res) => {
    const newProduct = new Product(req.body)

    try {
        const savedProduct = await newProduct.save()
        res.status(200).json(savedProduct)
    } catch (err) {
        res.status(500).json(err)
    }
})

// get product by id

router.get("/find/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        res.status(200).json(product)
    } catch (err) {
        res.status(500).json(err)
    }
})

// get all products

router.get("/", async (req, res) => {
    const category = req.query.category
    try {
        let products
        if (category) {
            products = await Product.find({ 
                categories: {
                    $in: [category]
                } 
            })
        } else {
            products = await Product.find()
        }
        res.status(200).json(products)
    } catch (err) {
        res.status(500).json(err)
    }
})

// update product

router.put("/:id", verifyToken, async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        res.status(200).json(updatedProduct)
    } catch (err) {
        res.status(500).json(err)
    }
})

// delete product

router.delete("/:id", verifyToken, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json("Product has been deleted...")
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router