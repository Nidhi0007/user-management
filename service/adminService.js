const { sendMailFunction } = require("../helper/email");
const User = require("../models/userModel");

const register = async (body) => {
  let data = {
    isAdmin: true,
    ...body,
  };
  const user = new User(data);
  await user.save();
  await sendMailFunction({
    to: body.email,
  });
  return user;
};

module.exports = register;
