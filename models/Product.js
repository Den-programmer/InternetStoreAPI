const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    title: { type: String, required: true },
    desc: { type: String, required: true },
    photos: { type: Array, required: true },
    rating: { type: Number, required: true },
    isNewest: { type: Boolean, default: true },
    isSale: { type: Boolean, default: false },
    hovered: { type: Boolean, default: false },
    like: { type: Boolean, default: false },
    isInCart: { type: Boolean, default: false },
    isInStock: { type: Boolean, default: true },
    isCompare: { type: Boolean, default: false },
    tags: { type: Array },
    brand: { type: String },
    type: { type: String },
    weight: { type: String },
    dimensions: { type: String },
    composition: { type: String },
    // date
    categories: { type: Array },
    size: { type: String },
    color: { type: String },
    price: { type: Number, required: true }, 
}, {timestamps: true})

module.exports = mongoose.model("Product", ProductSchema)