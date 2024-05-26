// api/services/tests/user/authenticateUser.spec.js
import dotenv from "dotenv";
import mongoose from "mongoose";

import User from "../../../models/User.js";
import authenticateUser from "../../user/authenticateUser.js";
import { expect } from "chai";
import { errors } from "com";

dotenv.config();

const { CredentialsError, NotFoundError, ContentError } = errors;

describe("authenticateUser", () => {
  before(() => mongoose.connect(process.env.MONGODB_TEST_URL));

  beforeEach(() => Promise.all([User.deleteMany()]));

  it("succeeds on correct email and password", async () => {
    const email = "john@example.com";
    const password = "password123";
    const user = await User.create({ name: "John Doe", email, password });

    const userId = await authenticateUser(email, password);

    expect(userId).to.be.a("string");
    expect(userId).to.equal(user.id);
  });

  it("fails if user does not exist", async () => {
    const email = "nonexistent@example.com";
    const password = "password123";

    try {
      await authenticateUser(email, password);
    } catch (error) {
      expect(error).to.be.instanceOf(NotFoundError);
      expect(error.message).to.equal("User not found");
    }
  });

  it("fails on incorrect password", async () => {
    const email = "john@example.com";
    const password = "password123";
    await User.create({ name: "John Doe", email, password });

    try {
      await authenticateUser(email, "wrongpassword1"); // A password that is valid but incorrect
    } catch (error) {
      expect(error).to.be.instanceOf(CredentialsError);
      expect(error.message).to.equal("Invalid email or password");
    }
  });

  it("fails on invalid password format", async () => {
    const email = "john@example.com";
    const password = "password123";
    await User.create({ name: "John Doe", email, password });

    try {
      await authenticateUser(email, "short");
    } catch (error) {
      expect(error).to.be.instanceOf(ContentError);
      expect(error.message).to.include("password is not acceptable");
    }
  });

  after(() => mongoose.disconnect());
});
