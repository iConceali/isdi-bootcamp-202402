import dotenv from "dotenv";

dotenv.config();

import mongoose from "mongoose";
import { expect } from "chai";
import { updateCryptoPrices } from "../../priceController.js";
import CryptoPrice from "../../../models/CryptoPrice.js";

describe("PriceController - updateCryptoPrices Integration Test", function () {
  this.timeout(30000); // Extend the timeout for API and DB operations

  before(async () => {
    await mongoose.connect(process.env.MONGO_URI_TEST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  after(async () => {
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    // Optionally clear the collection if you want a fresh start for each test
    await CryptoPrice.deleteMany({});
  });

  it("should fetch market data and update crypto prices in the database", async () => {
    const mockReq = {}; // Simulate request object if needed
    const mockRes = {
      json(data) {
        this.data = data; // Capture response data for assertions
        this.status = 200; // Assume 200 OK if no exceptions are thrown
      },
      status(code) {
        this.statusCode = code;
        return this; // Allow chaining
      },
    };

    // Call the function to be tested
    await updateCryptoPrices(mockReq, mockRes);

    // Assertions to ensure that function behaves as expected
    expect(mockRes.statusCode).to.equal(200);
    expect(mockRes.data).to.be.an("array");

    // Check if data is updated in the database
    const sampleCrypto = await CryptoPrice.findOne(); // Fetch a sample to check updates
    expect(sampleCrypto).to.have.property("price");
    expect(sampleCrypto).to.have.property("price24Hr");
    expect(sampleCrypto).to.have.property("marketCap");

    console.log(`Updated crypto prices:`, mockRes.data.length);
  });
});
