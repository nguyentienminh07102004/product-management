const Products = require("../../models/product.model.js");
const filterStatus = require("../../helpers/filter-status.js");
const keywordSearch = require("../../helpers/search.js");
const pagination = require("../../helpers/pagination.js");

// [GET] /admin/products
const index = async (req, res) => {
  let find = {
    deleted: false
  };
  // filter status buttons
  const buttons = filterStatus(req.query);

  // Lọc theo request
  if(req.query.status){
    find.status = req.query.status;
  }

  let keyword = keywordSearch(req.query);

  if(keyword.regex){
    find.title = keyword.regex;
  }

  let objectPagination = {
    limitItem: 2,
    currentPage: 1
  };
  const countProducts = await Products.countDocuments(find);
  pagination(objectPagination, req.query, countProducts);
  // Tìm kiếm sản phẩm
  // Limit là giới hạn số sản phẩm tìm được còn skip là bỏ qua n sản phẩm để tìm từ sản phẩm tiếp theo. => Phân trang chia trang bằng limit và chuyển trang bằng skip
  let products = await Products.find(find).limit(objectPagination.limitItem).skip(objectPagination.skip);

  res.render("admin/pages/products/index.pug", {
    title: "Products Admin Page",
    products: products,
    buttons: buttons,
    keyword: keyword.keyword,
    pagination: objectPagination
  });
}

const changeStatus = async (req, res) => {
  const status = req.params.status;
  const id = req.params.id;

  await Products.updateOne({ _id: id }, { status: status });

  res.redirect('back');

}

const changeMulti = async (req, res) => {
  let ids = req.body.ids.split(", ");
  let type = req.body.type;

  // switch (type) {
  //   case "inactive":
      
  //     break;
  //   case "active":

  //     break;
  //   default:
  //     break;
  // }

  await Products.updateMany({_id: ids}, {status: type});
  res.redirect("back");
}
module.exports = { index, changeStatus, changeMulti };