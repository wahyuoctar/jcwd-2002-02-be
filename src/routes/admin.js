const adminControllers = require("../controller/admin");
const fileUploader = require("../lib/uploader");
const { authorizedLoginAdmin } = require("../middleware/authorizeLoginAdmin");

const router = require("express").Router();

// Input New Product
router.post(
  "/product",
  fileUploader({
    destinationFolder: "product",
    prefix: "PRODUCT",
    fileType: "image",
  }).array("product_image_file", 5),
  adminControllers.addProduct
);

// Input New Product Category
router.post("/product-category", adminControllers.addProductCategory);

// Get Product Category
router.get("/product-category", adminControllers.getAllProductCategory);

// Get Product
router.get("/product", adminControllers.getProduct);

// Edit Product
router.patch(
  "/product/:productId",
  fileUploader({
    destinationFolder: "product",
    prefix: "PRODUCT",
    fileType: "image",
  }).array("product_image_file", 5),
  adminControllers.editProduct
);

module.exports = router;
