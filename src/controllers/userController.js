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

const registerAdminController = async (req, res) => {
  try {
    let obj = {};
    let data = await getFormData(req, res);
    obj = {
      profilePicture: data.file
        ? `http://localhost:8000/${data.file.path}`
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

const userListController = async (req, res) => {
  try {
    const users = await userList(req.user);
    return res.send(users);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
const createUserController = async (req, res) => {
  try {
    const users = await createUserFunction(req.user, req.body);
    return res.send(users);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
const changePasswordController = async (req, res) => {
  try {
    const users = await passwordChange(req.body);
    return res.send(users);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const updateUserController = async (req, res) => {
  try {
    let obj = {};
    let data = await getFormData(req, res);
    obj = {
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

const disableUserController = async (req, res) => {
  try {
    const users = await disableUser(req.user, req.params.id);
    return res.send(users);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

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
