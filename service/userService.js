const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const register = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = {
        isAdmin: true,
        ...body,
      };
      const findUser = await User.findOne({
        email: body.email,
      });
      if (findUser) {
        throw new Error("Email address is already registered");
      }
      data.password = bcrypt.hashSync(body.password, 10);

      const user = new User(data);
      await user.save();
      resolve(user);
    } catch (error) {
      reject(error);
    }
  });
};

const login = async (body) => {
  const findUser = await User.findOne({ email: body.email });
  if (!findUser || !findUser.comparePassword(body.password)) {
    throw new Error("Invalid email or password.");
  }
  let token = jwt.sign(
    {
      username: findUser.username,
      id: findUser._id,
      email: findUser.email,
      password: findUser?.password,
    },
    process.env.SECRET
  );
  return res.json({ token: token });
};
const userList = async () => {
  const getUser = await User.find({
    isAdmin: false,
  });
  console.log("getUser", getUser);
};
module.exports = { register, login, userList };
