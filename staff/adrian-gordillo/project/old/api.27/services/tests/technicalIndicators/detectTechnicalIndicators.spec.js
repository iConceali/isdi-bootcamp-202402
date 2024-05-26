// api/services/tests/technicalIndicators/detectTechnicalIndicators.spec.js

import { expect } from "chai";
import dotenv from "dotenv";
import mongoose from "mongoose";
import TechnicalOpportunity from "../../../models/TechnicalOpportunity.js";
import detectTechnicalIndicators from "../../technicalIndicators/detectTechnicalIndicators.js";

dotenv.config();

describe("detectTechnicalIndicators", () => {
  before(async () => {
    await mongoose.connect(process.env.MONGODB_TEST_URL);
  });

  beforeEach(async () => {
    await TechnicalOpportunity.deleteMany({});
  });

  after(async () => {
    await mongoose.disconnect();
  });

  it("succeeds in detecting technical indicators and saving opportunities", async () => {
    const buySignals = await detectTechnicalIndicators();

    expect(buySignals).to.be.an("array");
    expect(buySignals.length).to.be.above(0);

    const savedOpportunities = await TechnicalOpportunity.find({});
    expect(savedOpportunities.length).to.be.above(0);
  });

  //   it("handles validation errors correctly", async () => {
  //     const originalFetchHistoricalData = fetchHistoricalData;
  //     global.fetchHistoricalData = async () => [
  //       { high: 50, low: 40, close: 45 },
  //       { high: "invalid", low: 41, close: 46 },
  //       { high: 52, low: 42, close: 47 },
  //       { high: 53, low: 43, close: 48 },
  //       { high: 54, low: 44, close: 49 },
  //       { high: 55, low: 45, close: 50 },
  //       { high: 56, low: 46, close: 51 },
  //       { high: 57, low: 47, close: 52 },
  //       { high: 58, low: 48, close: 53 },
  //       { high: 59, low: 49, close: 54 },
  //       { high: 60, low: 50, close: 55 },
  //       { high: 61, low: 51, close: 56 },
  //       { high: 62, low: 52, close: 57 },
  //       { high: 63, low: 53, close: 58 },
  //     ];

  //     try {
  //       await detectTechnicalIndicators();
  //     } catch (error) {
  //       expect(error).to.be.instanceOf(Error);
  //       expect(error.message).to.include("Validation error");
  //     }

  //     global.fetchHistoricalData = originalFetchHistoricalData;

  //     const savedOpportunities = await TechnicalOpportunity.find({});
  //     expect(savedOpportunities.length).to.equal(0);
  //   });

  //   it("handles insufficient data gracefully", async () => {
  //     const originalFetchHistoricalData = fetchHistoricalData;
  //     global.fetchHistoricalData = async () => [];

  //     const buySignals = await detectTechnicalIndicators();

  //     global.fetchHistoricalData = originalFetchHistoricalData;

  //     expect(buySignals).to.be.an("array").that.is.empty;

  //     const savedOpportunities = await TechnicalOpportunity.find({});
  //     expect(savedOpportunities.length).to.equal(0);
  //   });

  //   it("fails on error during the process", async () => {
  //     const originalDeleteOldSignals = deleteOldSignals;
  //     global.deleteOldSignals = async () => {
  //       throw new Error("Deletion error");
  //     };

  //     try {
  //       await detectTechnicalIndicators();
  //       throw new Error("Expected detectTechnicalIndicators to throw an error");
  //     } catch (error) {
  //       expect(error).to.be.instanceOf(Error);
  //       expect(error.message).to.equal("Failed to detect technical indicators");
  //     }

  //     global.deleteOldSignals = originalDeleteOldSignals;
  //   });
});
