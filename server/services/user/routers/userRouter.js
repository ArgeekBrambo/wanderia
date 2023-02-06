const express = require('express')
const router = express.Router()
const controller = require('../controllers/userController')

router.get("/", controller.findAllUser)
router.post("/", controller.registerUser)
router.post("/login", controller.registerUser)
router.get("/:id", controller.findUserByPk)
router.delete("/:id", controller.deleteUser)

module.exports = router