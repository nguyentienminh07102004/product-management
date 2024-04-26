const Products = require("../../models/product.model.js");

// [GET] /products
module.exports.index = async (req, res) => {
  const products = await Products.find({
    status: "active",
    deleted: false
  }); // Lấy ra tất cả các dữ liệu theo điều kiện nhập vào, nếu không có điều kiện thì nó sẽ lấy tất cả
  console.log(products);

  let newProducts = products.map(value => {
    value.deletePrice = (value.price / (100 - value.discountPercentage) * 100).toFixed(0);
    return value;
  });

  res.render("client/pages/products/index.pug", {
    title: "Products Page",
    products: newProducts
  });
};