// api/models/UserModel.js

import mongoose, { model } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^[a-zA-Z\s]+$/.test(v);
      },
      message: (props) =>
        `${props.value} is not a valid name. It should only contain letters`,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  watchlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "CryptoData" }],
  deposit: { type: Number, min: 0, default: 1000 },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

const User = model("User", userSchema);

export default User;
