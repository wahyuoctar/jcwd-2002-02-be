const productControllers = require("../controller/product")

const router = require("express").Router()

router.get("/:productId", productControllers.getProduct)

module.exports = router