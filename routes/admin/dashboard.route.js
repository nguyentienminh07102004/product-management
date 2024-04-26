const express = require("express");
const controller = require("../../controllers/admin/dashboard.controller.js");
const route = express.Router();


// Note: Chú ý là mình đang ở thư mục views luôn rồi vì khi khai báo ở index.js
route.get("/", controller.dashboard);

module.exports = route;