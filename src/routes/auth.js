const authController = require("../controller/auth");
const { authorizedLoginUser } = require("../middleware/authorizeLoginUser");

const router = require("express").Router();

router.post("/register", authController.registerUser);

// register router untuk admin
router.post("/admin/register", authController.registerAdmin);

// login router untuk admin
router.post("/admin/login", authController.loginAdmin);

// keep login router untuk admin
router.get("/admin/refresh-token", authController.keepLoginAdmin);
router.get("/verify/:token", authController.verifyUser);
router.post(
  "/resend-verification-email",
  authorizedLoginUser,
  authController.resendVerificationEmail
);

module.exports = router;
