const express = require("express");
const controller = require("../../controllers/admin/products.controller.js");
const multer = require('multer');
const validate = require('../../validates/admin/products.validate.js');
const Upload = require('../../middlewares/admin/uploadCloud.middleware.js');

const route = express.Router();

const upload = multer();

route.get("/", controller.index);

route.patch('/change-status/:status/:id', controller.changeStatus); // :id là route động
route.patch("/change-multi", controller.changeMulti);

route.delete("/delete/:id", controller.deleteProduct);

// create products
route.get('/create', controller.create);
route.post('/create', upload.single('thumbnail'), Upload.upload, validate.createPost, controller.createProduct);

// edit products
route.get('/edit/:id', controller.edit);
route.patch('/edit/:id', upload.single('thumbnail'), Upload.upload, validate.createPost, controller.updateProduct);

// Detail products
route.get('/detail/:id', controller.detailProduct);

module.exports = route;