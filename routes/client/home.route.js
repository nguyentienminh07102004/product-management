const express = require("express");
const route = express();

const controllers = require("../../controllers/client/home.controller");
route.get("/", controllers.index);

module.exports = route;