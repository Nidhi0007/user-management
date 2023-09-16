const { User } = require("../models/userModel");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { generateUnique } = require("../helper/passwordGenerator");
const { sendMailFunction } = require("../helper/email");
const checkAdmin = require("../middleware/adminAccess");
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
      if (!findUser && !findUser.enabled) {
        throw new Error("User has been disabled/deleted");
      }

      const check = await findUser.comparePassword(body.password);
      if (!check) {
        throw new Error("Password is incorrect");
      }
      let token = jwt.sign(
        {
          username: findUser.username,
          id: findUser._id,
          email: findUser.email,
          password: body.password,
          isAdmin: findUser.isAdmin,
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

const createUserFunction = async (userdata, body) => {
  return new Promise(async (resolve, reject) => {
    try {
      await checkAdmin(userdata);
      const findUser = await User.findOne({
        email: body.email,
      });
      if (findUser) {
        throw new Error("Email address is already registered");
      }
      body.password = generateUnique();
      const user = new User(body);
      await user.save();
      await sendMailFunction({
        to: body.email,
        firstName: body.firstName,
        lastName: body.lastName,
        password: body.password,
      });
      resolve(user);
    } catch (error) {
      reject(error);
    }
  });
};

const passwordChange = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const findUser = await User.findOne({
        email: body.email,
      });
      const check = await findUser.comparePassword(body.oldPassword);

      if (!check) {
        throw new Error("Old password is incorrect");
      }
      const updateUser = await User.updateOne(
        { _id: findUser._id },
        {
          password: body.newPassword,
        }
      );
      resolve(updateUser);
    } catch (error) {
      reject(error);
    }
  });
};

const userUpdate = async (user, body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const findUser = await User.findOne({
        email: user.email,
      });

      const updateUser = await User.updateOne(
        { _id: findUser._id },
        {
          ...body,
        }
      );
      resolve(updateUser);
    } catch (error) {
      reject(error);
    }
  });
};

const disableUser = async (user, id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await checkAdmin(user);
      await User.findOneAndUpdate(
        { _id: id },
        {
          enabled: false,
        }
      );
      resolve("User successfully disabled");
    } catch (error) {
      reject(error);
    }
  });
};

const deleteUser = async (user, id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await checkAdmin(user);
      await User.deleteOne(id);
      resolve("User successfully deleted");
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  register,
  loginUser,
  userList,
  createUserFunction,
  passwordChange,
  userUpdate,
  disableUser,
  deleteUser,
};
