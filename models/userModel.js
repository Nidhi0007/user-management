const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    profilePicture: { type: String },
    isAdmin: { type: Boolean, required: true, default: false },
    residentialAddress: { type: String },
    workAddress: { type: String },
    enabled: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", UserSchema);
module.exports = User;
