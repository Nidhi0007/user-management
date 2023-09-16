const { upload } = require("../service/multerService");
const {
  register,
  loginUser,
  userList,
  createUserFunction,
  passwordChange,
  userUpdate,
  disableUser,
  deleteUser,
} = require("../service/userService");
const { adminRegister } = require("../validation/validation");

const registerAdmin = async (req, res) => {
  try {
    let obj = {};
    upload(req, res, async (err) => {
      obj = {
        profilePicture: res.req.file
          ? `http://localhost:8000/${res.req.file.path}`
          : "",
        ...res.req.body,
      };
      const { error } = adminRegister.validate(obj);
      if (error) {
        return res.status(500).json(error.details[0].message);
      }
      const registerUser = await register(obj);
      return res.send({
        message: `User successfully created`,
        data: registerUser,
      });
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const login = async (req, res) => {
  try {
    const logged = await loginUser(req.body);
    return res.send({
      message: `User successfully logged In`,
      data: logged,
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const users = async (req, res) => {
  try {
    const users = await userList();
    return res.send(users);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
const createUser = async (req, res) => {
  try {
    const users = await createUserFunction(req.user, req.body);
    return res.send(users);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
const changePassword = async (req, res) => {
  try {
    const users = await passwordChange(req.body);
    return res.send(users);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const updateUser = async (req, res) => {
  try {
    const users = await userUpdate(req.user, req.body);
    return res.send(users);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const userDisabled = async (req, res) => {
  try {
    const users = await disableUser(req.user, req.params.id);
    return res.send(users);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const userDeleted = async (req, res) => {
  try {
    const users = await deleteUser(req.user, req.params.id);
    return res.send(users);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
module.exports = {
  registerAdmin,
  login,
  users,
  createUser,
  changePassword,
  updateUser,
  userDisabled,
  userDeleted,
};
