const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);

const productsCategory = new mongoose.Schema({
  title: String,
  _parentID: String,
  description: String,
  thumbnail: String,
  status: String,
  position: Number,
  slug: {
    type: String,
    slug: "title",
    unique: true
  },
  deleted: {
    type: Boolean,
    default: false
  },
  deletedAt: Date
}, { timestamps: true });

const ProductCategoryModel = mongoose.model("Product Category", productsCategory, "product-category");

module.exports = ProductCategoryModel;