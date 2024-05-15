const express = require("express");
const route = express.Router();

const controller = require("../../controllers/client/products.controller.js");

route.get('/', controller.index);

route.get('/:slug', controller.detailProduct);

module.exports = route;