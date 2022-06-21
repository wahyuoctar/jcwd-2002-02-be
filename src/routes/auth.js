const authController = require("../controller/auth");

const router = require("express").Router();

router.post("/register", authController.registerUser);

// register router untuk admin
router.post("/admin/register", authController.registerAdmin);

// login router untuk admin
router.post("/admin/login", authController.loginAdmin);

// keep login router untuk admin
router.get("/admin/refresh-token", authController.keepLoginAdmin);

module.exports = router;
