const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const UserSchema = new mongoose.Schema(
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
const User = mongoose.model("User", UserSchema);
UserSchema.pre("save", async function (next) {
  const user = this;
  const saltRounds = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, saltRounds);
  if (hash) {
    user.password = hash;
    next();
  } else {
    next();
  }
});
UserSchema.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};
module.exports = User;
