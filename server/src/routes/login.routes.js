const express = require("express");
const userController = require("../controllers/user.controller");

const router = express.Router();

router.post("/login", userController.authenticate);
router.post("/register", userController.create);

module.exports = router;
