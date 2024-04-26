const express = require("express");
const controller = require("../../controllers/admin/products.controller.js");

const route = express.Router();

route.get("/", controller.index);

module.exports = route;