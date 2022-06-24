const userControllers = require("../controller/user");
const fileUploader = require("../lib/uploader");
const { authorizedLoginUser } = require("../middleware/authorizeLoginUser");

const router = require("express").Router();

router.get("/:userId", userControllers.getUserById);
router.patch("/edit-profile", authorizedLoginUser, userControllers.editUser);

router.patch(
  "/:id",
  fileUploader({
    destinationFolder: "avatar",
    fileType: "image",
    prefix: "AVATAR",
  }).single("avatar_image_file"),
  userControllers.editAvatarUser
);

module.exports = router;
