const { cartController } = require("../controller");
const { authorizedLoginUser } = require("../middleware/authorizeLoginUser");

const router = require("express").Router();

router.post("/add-to-cart", authorizedLoginUser, cartController.addToCarts);
router.get("/get-cart", authorizedLoginUser, cartController.getCartData);

module.exports = router;
