const productControllers = require("../controller/product");

const router = require("express").Router();

router.get("/:productId", productControllers.getProduct);

router.get("/", productControllers.getAllProduct);

module.exports = router;
