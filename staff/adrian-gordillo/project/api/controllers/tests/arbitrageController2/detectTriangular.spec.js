import dotenv from "dotenv";

dotenv.config();

import mongoose from "mongoose";
import { expect } from "chai";
import { detectTriangular } from "../../arbitrageController2.js";
import Opportunity from "../../../models/Opportunity.js";

describe("detectTriangular Tests", function () {
  this.timeout(15000); // Adjusting timeout for asynchronous operations

  before(async () => {
    await mongoose.connect(process.env.MONGO_URI_TEST);
  });

  after(async () => {
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    await Opportunity.deleteMany({}); // Ensure the database is clean before each test
  });

  it("should detect and save triangular arbitrage opportunities", async () => {
    const mockReq = {};
    const mockRes = {
      json(data) {
        this.data = data;
        return this;
      },
      status(code) {
        this.statusCode = code;
        return this;
      },
    };

    await detectTriangular(mockReq, mockRes);
    expect(mockRes.statusCode).to.equal(200);
    // Check if any opportunities were saved if expected
  });

  it("should handle errors during the deletion process", async () => {
    const originalDeleteMany = Opportunity.deleteMany;
    Opportunity.deleteMany = () => Promise.reject(new Error("Deletion error"));

    const mockReq = {};
    const mockRes = {
      json(data) {
        this.data = data;
        return this;
      },
      status(code) {
        this.statusCode = code;
        return this;
      },
    };

    await detectTriangular(mockReq, mockRes);
    expect(mockRes.statusCode).to.equal(500);
    expect(mockRes.data.message).to.include("Deletion error");

    Opportunity.deleteMany = originalDeleteMany; // Restore the original function
  });
});
