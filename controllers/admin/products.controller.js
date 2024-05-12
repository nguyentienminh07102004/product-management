const Products = require("../../models/product.model.js");
const filterStatus = require("../../helpers/filter-status.js");
const keywordSearch = require("../../helpers/search.js");
const pagination = require("../../helpers/pagination.js");
const systemConfig = require('../../config/system.js');

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
    limitItem: 4,
    currentPage: 1
  };
  const countProducts = await Products.countDocuments(find);

  pagination(objectPagination, req.query, countProducts);
  // Tìm kiếm sản phẩm
  // Limit là giới hạn số sản phẩm tìm được còn skip là bỏ qua n sản phẩm để tìm từ sản phẩm tiếp theo. => Phân trang chia trang bằng limit và chuyển trang bằng skip
  let products = await Products.find(find).limit(objectPagination.limitItem).skip(objectPagination.skip).sort({position: -1, updatedAt: -1});
  
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

  req.flash("success", "Change status successfully");

  res.redirect('back');

}

// [PATCH] /admin/products/chnage-multi
const changeMulti = async (req, res) => {
  let ids = req.body.ids.split(", ");
  let type = req.body.type;

  switch (type) {
    case "inactive":
    case "active":
      await Products.updateMany({ _id: ids }, { status: type });
      req.flash('success', `Change status for ${ids.length} successfully`);
      break;
    case "delete-all":
      await Products.updateMany({ _id: ids }, { deleted: true, deletedAtTime: new Date() });
      req.flash('success', `Delete ${ids.length} ${ids.length > 1 ? "products" : "product"} successfully`);
      break;
    case "change-position":
      for(item of ids){
        let [id, position] = item.split("-");
        await Products.updateOne({ _id: id }, { position: position });
      }
      req.flash('success', 'Change position successfully');
      break;
    default:
      break;
  }

  res.redirect("back");
}

//[DELETE] /admin/products/delete/:id
const deleteProduct = async (req, res) => {
  const id = req.params.id;

  // await Products.deleteOne({ _id: id});
  await Products.updateOne({ _id: id }, { 
    deleted: true,
    deletedAtTime: new Date()
  });
  req.flash('success', 'Delete product successfully');
  res.redirect('back');
}

// [GET] /admin/products/create
const create = (req, res) => {
  res.render("admin/pages/products/create", {
    title: "Create Product"
  });
}

// [POST] /admin/products/createProduct
const createProduct = async (req, res) => {
  // Validate product -> check các thuộc tính của sản phẩm có phù hợp không trước khi gửi
  if(!req.body.title){
    req.flash('error', 'Please enter your title');
    res.redirect('back');
    return; // -> để không chạy các câu lệnh tiếp theo
  }

  // Cập nhật lại giá trị cho price, discount và stock là kiểu number
  req.body.price = parseInt(req.body.price);
  req.body.stock = parseInt(req.body.stock);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);

  // Check xem position có bằng rỗng không để auto tăng
  if(!req.body.position){
    // Lấy ra số lượng sản phẩm trong db
    const countProducts = await Products.countDocuments();

    // cập nhật lại position bằng count + 1
    req.body.position = countProducts + 1;
  }else {
    // ép lại kiểu sang dạng number
    //console.log(req.body.position);
    req.body.position = parseInt(req.body.position);
  }
  
  // Thêm 1 trường là deleted = false vào database
  // -> req.body.deleted = false;
  // Như trong video thì làm trong model

  // Chèn link ảnh vào
  if(req.file){
    req.body.thumbnail = `/admin/uploads/${req.file.filename}`; // Tải code vào thư mục uploads
  }
  // Insert products vào db và tạo ra flash báo thành công
  // Tạo mới sản phẩm
  try{
    
    const product = new Products(req.body); // Tạo ra sản phẩm rồi nhưng chưa lưu
    await product.save(); // Lưu vào products

    // flash thành công
    req.flash('success', "Add product to database successly");

  } catch(error) {
    // flash thất bại
    req.flash('success', "Add product failed");
  } finally{
    res.redirect('back');
  }
}

// [GET] /admin/products/edit/:id
const edit = async (req, res) => {
  try{
    const find = {
      deleted: false,
      _id: req.params.id
    }
  
    const product = await Products.findOne(find);
  
    res.render('admin/pages/products/edit.pug', {
      title: "Edit products",
      product: product
    });
  } catch(error) {
    req.flash('error', "Don't have this product with id = " + `${req.params.id}`)
    res.redirect(`${systemConfig.prefixAdmin}/products`);
  }
}
// [PATCH] /admin/products/edit/:id
const updateProduct = async (req, res) => {
  try{
    req.body.price = parseFloat(req.body.price);
    req.body.discountPercentage = parseFloat(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    req.body.position = parseInt(req.body.position);

    if(req.file){
      req.body.thumbnail = `/admin/uploads/${req.file.filename}`;
    }

    await Products.updateOne({ _id: req.params.id }, req.body);
    req.flash('success', 'Update Successfully');
  }catch(error){
    req.flash('error', 'Update failed');
  }finally{
    res.redirect('back');
  }
}

module.exports = { index, changeStatus, changeMulti, deleteProduct, create, createProduct, edit, updateProduct };