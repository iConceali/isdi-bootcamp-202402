// api/models/UserModel.js

import mongoose from "mongoose";
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
    validate: {
      validator: function (v) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
      },
      message: (props) => `${props.value} It is not a valid email!`,
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    validate: {
      validator: function (v) {
        return /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/.test(v);
      },
      message: "The password must contain at least one number and one letter",
    },
  },
  watchlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "CryptoPrice" }],
  deposit: { type: Number, min: 0 },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

export default mongoose.model("User", userSchema);
