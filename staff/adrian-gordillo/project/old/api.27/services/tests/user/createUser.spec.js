// api/services/tests/user/createUser.spec.js
import dotenv from "dotenv";
import mongoose from "mongoose";

import User from "../../../models/User.js";
import createUser from "../../user/createUser.js";
import { expect } from "chai";
import { errors } from "com";

dotenv.config();

const { DuplicityError, ContentError } = errors;

describe("createUser", () => {
  before(() => mongoose.connect(process.env.MONGODB_TEST_URL));

  beforeEach(() => Promise.all([User.deleteMany()]));

  it("succeeds on creating a new user", async () => {
    const userData = {
      name: "JohnDoe",
      email: "john@example.com",
      password: "password123",
    };

    const user = await createUser(userData);

    expect(user).to.exist;
    expect(user).to.have.property("id");
    expect(user.name).to.equal(userData.name);
    expect(user.email).to.equal(userData.email);
  });

  it("fails on creating a user with an existing email", async () => {
    const userData = {
      name: "JohnDoe",
      email: "john@example.com",
      password: "password123",
    };

    await User.create(userData);

    try {
      await createUser(userData);
    } catch (error) {
      expect(error).to.be.instanceOf(DuplicityError);
      expect(error.message).to.equal("User with this email already exists");
    }
  });

  it("fails on invalid email format", async () => {
    const userData = {
      name: "JohnDoe",
      email: "invalid-email",
      password: "password123",
    };

    try {
      await createUser(userData);
    } catch (error) {
      expect(error).to.be.instanceOf(ContentError);
      expect(error.message).to.include("email is not an email");
    }
  });

  it("fails on invalid password format", async () => {
    const userData = {
      name: "JohnDoe",
      email: "john@example.com",
      password: "short",
    };

    try {
      await createUser(userData);
    } catch (error) {
      expect(error).to.be.instanceOf(ContentError);
      expect(error.message).to.include("password is not acceptable");
    }
  });

  it("fails on invalid name format", async () => {
    const userData = {
      name: "John123",
      email: "john@example.com",
      password: "password123",
    };

    try {
      await createUser(userData);
    } catch (error) {
      expect(error).to.be.instanceOf(mongoose.Error.ValidationError); // Mongoose validation error
      expect(error.message).to.include("User validation failed");
    }
  });

  after(() => mongoose.disconnect());
});
