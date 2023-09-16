let Joi = require("joi");

const adminRegister = Joi.object().keys({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  profilePicture: Joi.string().allow(null,''),
  residentialAddress: Joi.string(),
  workAddress: Joi.string(),
  password: Joi.string().min(7).required(),
});

const login = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(7).required(),
});
const createUser = Joi.object().keys({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
});
const changePassword = Joi.object().keys({
  oldPassword: Joi.string().min(7).required(),
  newPassword: Joi.string().min(7).required(),
  email: Joi.string().email().required(),
});
const userUpdate = Joi.object().keys({
  workAddress: Joi.string(),
  residentialAddress: Joi.string(),
  profile: Joi.string(),
  firstName: Joi.string(),
  lastName: Joi.string(),
});
module.exports = {
  adminRegister,
  login,
  createUser,
//   deleteUser,
//   disableUser,
  userUpdate,
  changePassword,
};
