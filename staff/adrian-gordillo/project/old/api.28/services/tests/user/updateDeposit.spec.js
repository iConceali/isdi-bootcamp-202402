// api/services/tests/user/updateDeposit.spec.js
import dotenv from "dotenv";
import mongoose from "mongoose";

import User from "../../../models/User.js";
import updateDeposit from "../../user/updateDeposit.js";
import { expect } from "chai";
import { errors } from "com";

dotenv.config();

const { NotFoundError, ContentError } = errors;

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);
const isValidNumber = (value) => typeof value === "number" && !isNaN(value);

describe("updateDeposit", () => {
  before(() => mongoose.connect(process.env.MONGODB_TEST_URL));

  beforeEach(() => Promise.all([User.deleteMany()]));

  it("succeeds on updating the user's deposit", async () => {
    const userData = {
      name: "JohnDoe",
      email: "john@example.com",
      password: "password123",
      deposit: 100,
    };
    const user = await User.create(userData);

    const newDeposit = 200;
    const result = await updateDeposit(user.id.toString(), newDeposit);

    expect(result).to.equal(newDeposit); // Esperar solo el valor del depósito actualizado

    const updatedUser = await User.findById(user.id);
    expect(updatedUser.deposit).to.equal(newDeposit);
  });

  it("fails if user does not exist", async () => {
    const fakeUserId = new mongoose.Types.ObjectId().toString();
    const newDeposit = 200;

    try {
      await updateDeposit(fakeUserId, newDeposit);
    } catch (error) {
      expect(error).to.be.instanceOf(NotFoundError);
      expect(error.message).to.equal("User not found");
    }
  });

  it("fails on invalid user ID format", async () => {
    const invalidUserId = "invalid-id";
    const newDeposit = 200;

    try {
      if (!isValidObjectId(invalidUserId)) {
        throw new ContentError(`userId ${invalidUserId} is not a valid ID`);
      }
      await updateDeposit(invalidUserId, newDeposit);
    } catch (error) {
      expect(error).to.be.instanceOf(ContentError);
      expect(error.message).to.include(
        `userId ${invalidUserId} is not a valid ID`
      );
    }
  });

  it("fails on invalid deposit format", async () => {
    const userData = {
      name: "JohnDoe",
      email: "john@example.com",
      password: "password123",
      deposit: 100,
    };
    const user = await User.create(userData);

    const invalidDeposit = "invalid-deposit";

    try {
      if (!isValidNumber(invalidDeposit)) {
        throw new ContentError(
          `deposit ${invalidDeposit} is not a valid number`
        );
      }
      await updateDeposit(user.id.toString(), invalidDeposit);
    } catch (error) {
      expect(error).to.be.instanceOf(ContentError);
      expect(error.message).to.include(
        `deposit ${invalidDeposit} is not a valid number`
      );
    }
  });

  after(() => mongoose.disconnect());
});
