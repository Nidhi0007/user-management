const { register } = require("../service/userService");

const registerAdmin = async (req, res) => {
  try {
    const registerUser = register(req.body);
    return res.send({
      message: `User successfully created`,
      data: registerUser,
    });
  } catch (error) {
    console.log("error",error)
    return res.status(500).json(error.message);
  }
};

const login = async (req, res) => {
  try {
    const loginUser = register(req.body);
    return res.send({
      message: `User successfully logged In`,
      data: loginUser,
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
module.exports = { registerAdmin , login};
