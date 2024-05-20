const router = require("express").Router();
const multer = require("multer");
const controller = require("../../controllers/admin/products-category.controller.js");
const validate = require("../../validates/admin/productsCategory.validate.js");
const Upload = require("../../middlewares/admin/uploadCloud.middleware.js");

const upload = multer();

router.get("/", controller.index);

router.get("/create", controller.createPage);
router.post("/create", upload.single("thumbnail"), Upload.upload, validate.createProductCategory, controller.createProductCategory);
module.exports = router;