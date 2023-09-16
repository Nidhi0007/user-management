const { User } = require("../models/userModel");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { generateUnique } = require("../helper/passwordGenerator");
const { sendMailFunction } = require("../helper/email");
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
  return new Promise(async (resolve, reject) => {
    try {
      const findUser = await User.findOne({ email: body.email });
      const check = await findUser.comparePassword(body.password);
      if (!check) {
        throw new Error("Password is incorrect");
      }
      let token = jwt.sign(
        {
          username: findUser.username,
          id: findUser._id,
          email: findUser.email,
          password: findUser?.password,
        },
        "secret"
      );
      resolve(token);
    } catch (error) {
      reject(error);
    }
  });
};
const userList = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const getUser = await User.find({
        isAdmin: false,
      });
      resolve(getUser);
    } catch (error) {
      reject(error);
    }
  });
};

const createUser = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const findUser = await User.findOne({
        email: body.email,
      });
      if (findUser) {
        throw new Error("Email address is already registered");
      }
      data.password = generateUnique();
      const user = new User(data);
      await user.save();
      sendMailFunction({
        to: user.email,
        password: user.password,
      });
      resolve(user);
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = { register, loginUser, userList, createUser };
