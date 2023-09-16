const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middleware/auth");
const validate = require("../middleware/validate");
const {
  adminRegister,
  login,
  changePassword,
  userUpdate,
} = require("../validation/validation");

router.post("/register", userController.registerAdmin);
router.post("/login", validate(login), userController.login);

router.get("/getUser", auth, userController.users);
router.post("/createUser", auth, userController.createUser);
router.post(
  "/changePassword",
  validate(changePassword),
  userController.changePassword
);
router.put(
  "/userUpdate",
  auth,
  validate(userUpdate),
  userController.updateUser
);
router.put(
  "/disableUser/:id",
  auth,
  // validate(userUpdate),
  userController.userDisabled
);
router.delete(
  "/deleteUser/:id",
  auth,
  // validate(userUpdate),
  userController.userDeleted
);
module.exports = router;
