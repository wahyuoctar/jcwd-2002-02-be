const productControllers = require("../controller/product");
const { authorizedLoginUser } = require("../middleware/authorizeLoginUser");

const router = require("express").Router();

router.get("/product-name", productControllers.getAllProductName);
router.get("/:productId", productControllers.getProduct);

router.get("/", productControllers.getAllProduct);

router.post(
  "/record-user-product",
  authorizedLoginUser,
  productControllers.recordUserProduct
);

module.exports = router;
