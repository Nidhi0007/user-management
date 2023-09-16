const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middleware/auth");
const validate = require("../middleware/validate");
const {
  loginValidation,
  changePasswordValidation,
  createUserValidation
} = require("../validation/validation");

router.post("/register", userController.registerAdminController);
router.post("/login", validate(loginValidation), userController.loginController);
router.get("/getUser", auth, userController.userListController);
router.post("/createUser", auth,validate(createUserValidation), userController.createUserController);
router.post(
  "/changePassword",
  validate(changePasswordValidation),
  userController.changePasswordController
);
router.put(
  "/userUpdate",
  auth,
  userController.updateUserController
);
router.put("/disableUser/:id", auth, userController.disableUserController);
router.delete("/deleteUser/:id", auth, userController.deleteUserController);
module.exports = router;
