const Products = require("../../models/product.model.js");

// [GET] /products
const index = async (req, res) => {
  const products = await Products.find({
    status: "active",
    deleted: false
  }).sort({ position: "desc" }); // Lấy ra tất cả các dữ liệu theo điều kiện nhập vào, nếu không có điều kiện thì nó sẽ lấy tất cả

  let newProducts = products.map(value => {
    value.deletePrice = (value.price / (100 - value.discountPercentage) * 100).toFixed(0);
    return value;
  });

  res.render("client/pages/products/index.pug", {
    title: "Products Page",
    products: newProducts
  });
};

//[GET] /products/:slug
const detailProduct = async (req, res) => {
    try{
      const find = {
        deleted: false,
        status: "active",
        slug: req.params.slug
      }
    
      const product = await Products.findOne(find);
      
      console.log(product);
  
      res.render('client/pages/products/detail.pug', {
        title: product.title,
        product: product
      });
    }catch(error){
      console.log(error);
      req.flash('error', 'Error! Please try again');
      res.redirect('/products');
    }
}
module.exports = { index, detailProduct };