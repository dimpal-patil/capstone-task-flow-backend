const express = require('express');
const router = express.Router();
const authController = require("../controllers/userController");
const verifyAuthentication = require("../middleware/verifyAuthentication");



router.get("/", verifyAuthentication, authController.getUser);
router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser)


module.exports = router