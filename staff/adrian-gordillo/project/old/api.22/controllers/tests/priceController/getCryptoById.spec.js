import dotenv from "dotenv";

dotenv.config();

import mongoose from "mongoose";
import { expect } from "chai";
import { getCryptoById } from "../../priceController.js";
import CryptoPrice from "../../../models/CryptoPrice.js";

describe("PriceController - getCryptoById Integration Test", function () {
  this.timeout(10000); // Extend the timeout for DB operations

  let cryptoId;

  before(async () => {
    await mongoose.connect(process.env.MONGO_URI_TEST);

    // Ensure the collection is empty to avoid duplicate key errors
    await CryptoPrice.deleteMany({});

    // Create a sample cryptocurrency record to use in tests
    const sampleCrypto = await CryptoPrice.create({
      symbol: "BTCUSDT",
      price: 20000,
      price24Hr: 0.5,
      marketCap: "300B",
    });
    cryptoId = sampleCrypto._id;
  });

  after(async () => {
    // Clean up after tests to ensure no data persists
    await CryptoPrice.deleteMany({});
    await mongoose.disconnect();
  });

  it("should retrieve a cryptocurrency by ID", async () => {
    const mockReq = {
      params: { id: cryptoId },
    };
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

    await getCryptoById(mockReq, mockRes);

    // Assertions
    expect(mockRes.statusCode).to.equal(200);
    expect(mockRes.data).to.have.property("symbol", "BTCUSDT");
    expect(mockRes.data).to.have.property("price", 20000);
  });

  it("should return 404 if the cryptocurrency does not exist", async () => {
    const mockReq = {
      params: { id: new mongoose.Types.ObjectId() }, // Non-existing ID
    };
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

    await getCryptoById(mockReq, mockRes);

    // Assertions
    expect(mockRes.statusCode).to.equal(404);
    expect(mockRes.data).to.have.property(
      "message",
      "Cryptocurrency not found"
    );
  });

  it("should handle database errors", async () => {
    const mockReq = { params: { id: "invalidId" } }; // Invalid ID to force a MongoDB CastError
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

    await getCryptoById(mockReq, mockRes);

    // Assertions
    expect(mockRes.statusCode).to.equal(500);
    expect(mockRes.data.message).to.include("Error fetching cryptocurrency");
  });
});
