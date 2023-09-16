const { register, loginUser } = require("../service/userService");

const registerAdmin = async (req, res) => {
  try {
    const registerUser = await register(req.body);
    return res.send({
      message: `User successfully created`,
      data: registerUser,
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

const userList = async (req, res) => {
  try {
    const users = register(req.body);
    return res.send(users);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
module.exports = { registerAdmin, login , userList};
