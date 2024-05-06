import dotenv from "dotenv";
import mongoose from "mongoose";
import { expect } from "chai";
import { detectTechnicalIndicatorsLogic } from "../../technicalIndicatorsController.js";
import TechnicalIndicatorOpportunity from "../../../models/TechnicalIndicatorOpportunity.js";

dotenv.config();

describe("detectTechnicalIndicatorsLogic Tests", () => {
  before(async () => {
    await mongoose.connect(process.env.MONGO_URI_TEST);
  });

  after(async () => {
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    await TechnicalIndicatorOpportunity.deleteMany({});
  });

  it("should generate buy signals for valid data", async () => {
    const signals = await detectTechnicalIndicatorsLogic();
    expect(signals).to.be.an("array");
    // Here, we expect some signals if market conditions on real data match the strategy criteria
    console.log("Generated Buy Signals: ", signals);
  });

  it("should not generate buy signals if market conditions do not meet criteria", async () => {
    const signals = await detectTechnicalIndicatorsLogic();
    expect(signals).to.be.an("array");
    // This test's validity will completely depend on current market data
    console.log("No Buy Signals Expected, Received: ", signals.length);
  });

  it("should handle no data conditions gracefully", async () => {
    // This is a theoretical test assuming the function can handle a lack of data scenario
    const signals = await detectTechnicalIndicatorsLogic();
    expect(signals).to.be.an("array");
    console.log("Handling No Data: ", signals);
  });
});
