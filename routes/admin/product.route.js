const express = require("express");
const controller = require("../../controllers/admin/products.controller.js");

const route = express.Router();

route.get("/", controller.index);

route.patch('/change-status/:status/:id', controller.changeStatus); // :id là route động
route.patch("/change-multi", controller.changeMulti);

module.exports = route;