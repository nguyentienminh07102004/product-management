const express = require("express");
const controller = require("../../controllers/admin/products.controller.js");

const route = express.Router();

route.get("/", controller.index);

route.patch('/change-status/:status/:id', controller.changeStatus); // :id là route động
route.patch("/change-multi", controller.changeMulti);

route.delete("/delete/:id", controller.deleteProduct);

// create products
route.get('/create', controller.create);
route.post('/create', controller.createProduct);

module.exports = route;