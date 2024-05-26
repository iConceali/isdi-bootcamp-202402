// api/services/user/createUser.js

import { errors, validate } from "com";
import User from "../../models/User.js";

const { DuplicityError } = errors;

const createUser = ({ name, email, password }) => {
  validate.email(email, "email", true);
  validate.text(name, "name", true);
  validate.password(password);

  return (async () => {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new DuplicityError("User with this email already exists");
    }

    const user = new User({
      name,
      email,
      password,
    });
    return await user.save();
  })();
};

export default createUser;
