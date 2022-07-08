const transactionControllers = require("../controller/transaction");
const fileUploader = require("../lib/uploader");
const { authorizedLoginUser } = require("../middleware/authorizeLoginUser");

const router = require("express").Router();

router.get("/", transactionControllers.getAllTransaction);

router.post(
  "/upload-resep",
  fileUploader({
    destinationFolder: "resep",
    fileType: "image",
    prefix: "RESEP",
  }).single("resep_image_file"),
  authorizedLoginUser,
  transactionControllers.uploadResepDokter
);

module.exports = router;
