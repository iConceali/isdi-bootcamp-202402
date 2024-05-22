// api/services/user/authenticateUser.js

import bcrypt from "bcryptjs";
import { errors, validate } from "com";
import User from "../../models/User";

const { CredentialsError, NotFoundError } = errors;

const authenticateUser = (email, password) => {
  validate.email(email, "email", true);
  validate.password(password);

  return (async () => {
    const user = await User.findOne({ email });
    if (!user) {
      throw new NotFoundError("User not found");
    }

    const isMatchUser = await bcrypt.compare(password, user.password);
    if (!isMatchUser) {
      throw new CredentialsError("Invalid email or password");
    }

    return user.id;
  })();
};

export default authenticateUser;
