const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    profilePicture: { type: String },
    isAdmin: { type: Boolean, required: true, default: false },
    residentialAddress: { type: String },
    workAddress: { type: String },
    enabled: { type: Boolean, required: true, default: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save", async function (next) {
  const user = this;
  console.log(user);
  const saltRounds = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, saltRounds);
  if (hash) {
    user.password = hash;
    next();
  } else {
    next();
  }
});
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};
const User = mongoose.model("User", userSchema);
module.exports = { User };