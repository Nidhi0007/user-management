const register = require("../service/adminService");
const registerAdmin = async (req, res) => {
  try {
    const registerUser = register(req.body);
    return res.send({
      message: `User successfully created`,
      data: registerUser,
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
module.exports = { registerAdmin };
