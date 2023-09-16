const User = require("../models/userModel");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
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

      const user = new User(data);
      await user.save();
      resolve(user);
    } catch (error) {
      reject(error);
    }
  });
};

const loginUser = async (body) => {
  const findUser = await User.findOne({ email: body.email });
  let check=await findUser.comparePassword(body.password)

  let token = jwt.sign(
    {
      username: findUser.username,
      id: findUser._id,
      email: findUser.email,
      password: findUser?.password,
    },
    process.env.SECRET
  );
  return token;
};
const userList = async () => {
  const getUser = await User.find({
    isAdmin: false,
  });
  return getUser;
};
module.exports = { register, loginUser, userList };
