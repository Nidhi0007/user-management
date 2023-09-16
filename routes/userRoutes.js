const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middleware/auth");
const validate = require("../middleware/validate");
const { adminRegister, login } = require("../validation/validation");

router.post("/register", validate(adminRegister), userController.registerAdmin);
router.post("/login", validate(login), userController.login);

router.get("/getUser", auth, userController.userList);
module.exports = router;
