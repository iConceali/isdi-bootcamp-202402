// api/services/tests/user/getDeposit.spec.js
import dotenv from "dotenv";
import mongoose from "mongoose";

import User from "../../../models/User.js";
import getDeposit from "../../user/getDeposit.js";
import { expect } from "chai";
import { errors } from "com";

dotenv.config();

const { NotFoundError, ContentError } = errors;

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

describe("getDeposit", () => {
  before(() => mongoose.connect(process.env.MONGODB_TEST_URL));

  beforeEach(() => Promise.all([User.deleteMany()]));

  it("succeeds on retrieving the user's deposit", async () => {
    const userData = {
      name: "JohnDoe",
      email: "john@example.com",
      password: "password123",
      deposit: 100,
    };
    const user = await User.create(userData);

    const deposit = await getDeposit(user.id.toString());

    expect(deposit).to.equal(user.deposit);
  });

  it("fails if user does not exist", async () => {
    const fakeUserId = new mongoose.Types.ObjectId().toString();

    try {
      await getDeposit(fakeUserId);
    } catch (error) {
      expect(error).to.be.instanceOf(NotFoundError);
      expect(error.message).to.equal("User not found");
    }
  });

  it("fails on invalid user ID format", async () => {
    const invalidUserId = "invalid-id";

    try {
      if (!isValidObjectId(invalidUserId)) {
        throw new ContentError(`userId ${invalidUserId} is not a valid ID`);
      }
      await getDeposit(invalidUserId);
    } catch (error) {
      expect(error).to.be.instanceOf(ContentError);
      expect(error.message).to.include(
        `userId ${invalidUserId} is not a valid ID`
      );
    }
  });

  after(() => mongoose.disconnect());
});
