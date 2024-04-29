const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    price: Number,
    discountPercentage: Number,
    stock: Number,
    thumbnail: String,
    status: String,
    position: Number,
    deleted: Boolean,
    deletedAtTime: Date
  }
);

const product = mongoose.model("Products", productSchema, "products");

module.exports = product;