const authController = require("../controller/auth");
const { authorizedLoginUser } = require("../middleware/authorizeLoginUser");
const { authorizedLoginAdmin } = require("../middleware/authorizeLoginAdmin");

const router = require("express").Router();

router.post("/register", authController.registerUser);

// register router untuk admin
router.post("/admin/register", authController.registerAdmin);

// login router untuk admin
router.post("/admin/login", authController.loginAdmin);

// keep login router untuk admin
router.get(
  "/admin/resfresh-token",
  authorizedLoginAdmin,
  authController.keepLoginAdmin
);

router.get("/verify/:token", authController.verifyUser);
router.post(
  "/resend-verification-email",
  authorizedLoginUser,
  authController.resendVerificationEmail
);

router.post("/login", authController.loginUser);

router.get("/refresh-token", authorizedLoginUser, authController.keepLoginUser);

router.post(
  "/change-password",
  authorizedLoginUser,
  authController.changePassword
);

router.post(
  "/send-reset-password-email",
  authController.sendResetPasswordEmail
);

router.post("/reset-password", authController.resetPassword);

module.exports = router;
