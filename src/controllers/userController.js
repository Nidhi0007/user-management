const {
  register,
  loginUser,
  userList,
  createUserFunction,
  passwordChange,
  userUpdate,
  disableUser,
  deleteUser,
  getFormData,
} = require("../service/userService");
const {
  adminRegisterValidation,
  userUpdateValidation,
} = require("../validation/validation");

// controller function to register admin
const registerAdminController = async (req, res) => {
  try {
    let obj = {};
    let data = await getFormData(req, res);
    obj = {
      profilePicture: data.file
        ? `${process.env.BASE_URL}/${data.file.path}`
        : "",
      ...data.body,
    };
    const { error } = adminRegisterValidation.validate(obj);
    if (error) {
      throw new Error(error.details[0].message);
    }
    const registerUser = await register(obj);
    return res.send({
      message: `User successfully created`,
      data: registerUser,
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

// controller function to login user and admin
const loginController = async (req, res) => {
  try {
    const logged = await loginUser(req.body);
    return res.send({
      message: `User successfully logged In`,
      token: logged,
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

// to get list of users which are not admin
const userListController = async (req, res) => {
  try {
    const users = await userList(req.user);
    return res.send(users);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

// create user by admin
const createUserController = async (req, res) => {
  try {
    const users = await createUserFunction(req.user, req.body);
    return res.send(users);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

// to change password by user and admin
const changePasswordController = async (req, res) => {
  try {
    const users = await passwordChange(req.body);
    return res.send(users);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

// update user details
const updateUserController = async (req, res) => {
  try {
    let obj = {};
    let data = await getFormData(req, res);
    obj = {
      profilePicture: data.file
        ? `${process.env.BASE_URL}/${data.file.path}`
        : "",
      ...data.body,
    };
    const { error } = userUpdateValidation.validate(obj);
    if (error) {
      return res.status(500).json(error.details[0].message);
    }
    await userUpdate(req.user, obj);
    return res.send({
      message: `User successfully updated`,
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

// disable user by admin
const disableUserController = async (req, res) => {
  try {
    const users = await disableUser(req.user, req.params.id);
    return res.send(users);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

// delete user by admin
const deleteUserController = async (req, res) => {
  try {
    const users = await deleteUser(req.user, req.params.id);
    return res.send(users);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {
  registerAdminController,
  loginController,
  userListController,
  createUserController,
  changePasswordController,
  updateUserController,
  disableUserController,
  deleteUserController,
};
