const express = require("express");
const router = express.Router();

// authuntication middlware
const authMiddleware = require("../middleware/authmiddleware");

//user containers
const { register, login, checkUser } = require("../controller/userController");

//Registration route
router.post("/register", register);

//login user
router.post("/login", login);

// check user
router.get("/check", authMiddleware, checkUser);

module.exports = router;
