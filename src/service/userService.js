const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { generateUnique } = require("../helper/passwordGenerator");
const { sendMailFunction } = require("../helper/email");
const checkAdmin = require("../middleware/adminAccess");
const { User } = require("../models/userModel");
const { upload } = require("./multerService");

const getFormData = (req, res) => {
  return new Promise((resolve, reject) => {
    upload(req, res, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(res.req);
      }
    });
  });
};

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
      delete user.password;
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
      if (!findUser) {
        throw new Error("User does not exist");
      }
      if (!findUser.enabled) {
        throw new Error("User is disabled");
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
const userList = async (user) => {
  return new Promise(async (resolve, reject) => {
    try {
      await checkAdmin(user);
      const getUser = await User.find({
        isAdmin: false,
        enabled: true,
      }).select("-password");
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
      resolve("User successfully created");
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
      const saltRounds = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(body.newPassword, saltRounds);
      await User.updateOne(
        { _id: findUser._id },
        {
          password: hash,
        }
      );
      resolve("Password is successfully changed");
    } catch (error) {
      reject(error);
    }
  });
};

const userUpdate = async (user, body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const userExists = await User.find({ _id: user.id });
      if (!userExists.length) {
        throw new Error("User not found");
      }
      console.log(body)
      await User.findByIdAndUpdate(
         user.id,
        {
          ...body,
        }
      );
      resolve(user);
    } catch (error) {
      reject(error);
    }
  });
};

const disableUser = async (user, id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await checkAdmin(user);
      const userExists = await User.find({ _id: id });
      if (!userExists.length) {
        throw new Error("User not found");
      }
      await User.findByIdAndUpdate(id, {
        enabled: false,
      });
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
      if (id === user.id) {
        throw new Error("Logged in user can not be deleted");
      }
      const userExists = await User.find({ _id: id });
      if (!userExists.length) {
        throw new Error("User not found");
      }
      await User.deleteOne({ id });
      resolve("User successfully deleted");
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  getFormData,
  register,
  loginUser,
  userList,
  createUserFunction,
  passwordChange,
  userUpdate,
  disableUser,
  deleteUser,
};
