import dotenv from "dotenv";

dotenv.config();

import mongoose from "mongoose";
import { expect } from "chai";
import { detectTechnicalIndicators } from "../../technicalIndicatorOpportunitiesController.js";
import TechnicalIndicatorOpportunity from "../../../models/TechnicalIndicatorOpportunity.js";

describe("TechnicalIndicatorOpportunitiesController - detectTechnicalIndicators Integration Test", function () {
  this.timeout(30000); // Increase timeout for network calls

  before(async () => {
    // Connect to a test database
    await mongoose.connect(process.env.MONGO_URI_TEST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  after(async () => {
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    // Clear the collection to ensure no interference
    await TechnicalIndicatorOpportunity.deleteMany({});
  });

  it("should fetch market data, analyze it, and potentially save new trading opportunities", async () => {
    const mockReq = {}; // Simulate request object
    const mockRes = {
      json: function (data) {
        this.data = data;
        this.status = 200; // Assume 200 OK if no errors thrown
      },
      status: function (code) {
        this.status = code;
        return this; // Allow chaining
      },
    };

    // Execute the function to test
    await detectTechnicalIndicators(mockReq, mockRes);

    // Assertions to ensure that function behaves as expected
    expect(mockRes.status).to.equal(200);
    console.log("Detected Buy Signals:", mockRes.data.buySignals.length);
    if (mockRes.data.buySignals.length > 0) {
      expect(mockRes.data.buySignals).to.be.an("array").that.is.not.empty;
      console.log(
        `Buy signals detected: ${mockRes.data.buySignals
          .map((signal) => signal.symbol)
          .join(", ")}`
      );
    } else {
      console.log(
        "No buy signals were detected based on current market conditions."
      );
    }
  });
});
