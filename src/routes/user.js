const userControllers = require("../controller/user");
const fileUploader = require("../lib/uploader");

const router = require("express").Router();

router.get("/:userId", userControllers.getUserById);

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
