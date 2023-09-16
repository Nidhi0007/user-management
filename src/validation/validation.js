let Joi = require("joi");

const adminRegisterValidation = Joi.object().keys({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  profilePicture: Joi.string().allow(null,''),
  residentialAddress: Joi.string(),
  workAddress: Joi.string(),
  password: Joi.string().min(7).required(),
});

const loginValidation = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(7).required(),
});
const createUserValidation = Joi.object().keys({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
});
const changePasswordValidation = Joi.object().keys({
  oldPassword: Joi.string().min(7).required(),
  newPassword: Joi.string().min(7).required(),
  email: Joi.string().email().required(),
});
const userUpdateValidation = Joi.object().keys({
  workAddress: Joi.string(),
  residentialAddress: Joi.string(),
  profilePicture: Joi.string().allow(null,''),
  firstName: Joi.string(),
  lastName: Joi.string(),
});

module.exports = {
  adminRegisterValidation,
  loginValidation,
  createUserValidation,
  changePasswordValidation,
  userUpdateValidation
};
