const userControllers = require("../controller/user")

const router = require("express").Router()

router.get("/:userId", userControllers.getUserById)

module.exports = router