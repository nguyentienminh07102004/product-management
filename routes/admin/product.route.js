const express = require("express");
const controller = require("../../controllers/admin/products.controller.js");
const multer = require('multer');
const validate = require('../../validates/admin/products.validate.js');

const route = express.Router();
const upload = multer({ dest: "./public/admin/uploads/" });

route.get("/", controller.index);

route.patch('/change-status/:status/:id', controller.changeStatus); // :id là route động
route.patch("/change-multi", controller.changeMulti);

route.delete("/delete/:id", controller.deleteProduct);

// create products
route.get('/create', controller.create);
route.post('/create', upload.single('thumbnail'), validate.createPost, controller.createProduct);

// edit products
route.get('/edit/:id', controller.edit);
route.patch('/edit/:id', upload.single('thumbnail'), validate.createPost, controller.updateProduct);

module.exports = route;