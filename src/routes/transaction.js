const transactionControllers = require("../controller/transaction");

const router = require("express").Router();

router.get("/", transactionControllers.getAllTransaction);

module.exports = router;
