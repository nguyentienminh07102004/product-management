const ProductCategory = require("../../models/product-category.model.js");
//[GET] /admin/product-category
const index = async (req, res) => {
  const find = {
    deleted: false
  }

  const category = await ProductCategory.find(find);
  console.log(category);
  res.render("admin/pages/products-category/index.pug", {
    title: "Product Category",
    category: category 
  });
}

//[GET] /admin/product-category/create
const createPage = (req, res) => {
  res.render("admin/pages/products-category/create.pug", {
    title: "Product Category"
  });
}

// [POST] /admin/product-category/create
const createProductCategory = async (req, res) => {
  if(req.body.position == ""){
    const counts = await ProductCategory.countDocuments();
    req.body.position = counts + 1;
  } else {
    req.body.position = parseInt(req.body.position);
  }
  const newCategory = new ProductCategory(req.body);
  await newCategory.save();
  res.redirect("back");
}

module.exports = { index, createPage, createProductCategory };