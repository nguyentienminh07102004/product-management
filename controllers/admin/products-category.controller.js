const ProductCategory = require("../../models/product-category.model.js");
//[GET] /admin/product-category
const index = async (req, res) => {
  const find = {
    deleted: false
  }

  const categoryTree = (category, parentID) => {
    let tree = new Array();
    category.forEach(item => {
      if(item._parentID == parentID){
        const Tree = categoryTree(category, item._id);
        if(Tree.length > 0){
          item.child = Tree;
        }
        tree.push(item);
      }
    });
    return tree;
  }

  const category = await ProductCategory.find(find);
  
  const Tree = categoryTree(category, "");

  res.render("admin/pages/products-category/index.pug", {
    title: "Product Category",
    category: Tree 
  });
}

//[GET] /admin/product-category/create
const createPage = async (req, res) => {
  let find = { deleted: false };
  const categoryTree = (category, parentID) => {
    let tree = new Array();
    category.forEach(item => {
      if(item._parentID == parentID){
        const Tree = categoryTree(category, item._id);
        if(Tree.length > 0){
          item.child = Tree;
        }
        tree.push(item);
      }
    });
    return tree;
  }
  const category = await ProductCategory.find(find);
  const categoryNew = categoryTree(category, "");
  res.render("admin/pages/products-category/create.pug", {
    title: "Product Category",
    productsCategory: categoryNew
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