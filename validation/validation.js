let Joi = require("joi");

const adminRegister = Joi.object().keys({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  profile: Joi.string(),
  residentialAddress: Joi.string(),
  workAddress: Joi.string(),
  password:Joi.string().min(7).required(),
});

const login = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(7).required(),
});
const createUser = Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email:Joi.string().email().required()
  });

module.exports = {
  adminRegister,
  login,
  createUser,
//   deleteUser,
//   disableUser,
//   getUsers,
//   updateUser,
//   changePassword,
};
