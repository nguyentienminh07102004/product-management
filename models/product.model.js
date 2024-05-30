const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');

mongoose.plugin(slug);

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
    deleted: {
      type: Boolean,
      default: false
    },
    deletedAtTime: Date,
    slug : { 
      type: String, 
      slug: "title",
      unique: true
    }
  },
  {
    timestamps: true // thêm timestamps vào để có thêm 2 trường là createdAt và updateAt đây là tính năng của mongoose
  }
);

const product = mongoose.model("Products", productSchema, "products");

module.exports = product;