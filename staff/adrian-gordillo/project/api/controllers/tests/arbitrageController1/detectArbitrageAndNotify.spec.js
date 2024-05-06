import EventEmitter from "events";
EventEmitter.defaultMaxListeners = 15;
import dotenv from "dotenv";
dotenv.config();

import { expect } from "chai";
import mongoose from "mongoose";
import sinon from "sinon";
import {
  detectArbitrageAndNotify,
  getDependencies,
} from "../../arbitrageController1.js";
import Opportunity from "../../../models/Opportunity.js";

describe("detectArbitrageAndNotify Tests", () => {
  let detectArbitrageOpportunitiesStub;

  before(async () => {
    await mongoose.connect(process.env.MONGO_URI_TEST);
  });

  after(async () => {
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    await Opportunity.deleteMany({});
    const dependencies = getDependencies();
    detectArbitrageOpportunitiesStub = sinon
      .stub(dependencies, "detectArbitrageOpportunities")
      .resolves([]);
  });

  afterEach(() => {
    detectArbitrageOpportunitiesStub.restore();
  });

  it("should gracefully handle the presence or absence of arbitrage opportunities", async () => {
    const mockReq = {};
    const mockRes = {
      data: null,
      statusCode: null,
      json: function (data) {
        this.data = data;
        return this;
      },
      status: function (code) {
        this.statusCode = code;
        return this;
      },
    };

    await detectArbitrageAndNotify(mockReq, mockRes);

    expect(mockRes.statusCode).to.equal(200);
    expect(mockRes.data).to.be.an("array");

    if (mockRes.data.length > 0) {
      console.log("Opportunities detected:", mockRes.data.length);
      mockRes.data.forEach((opportunity) => {
        expect(opportunity).to.include.all.keys(
          "symbol",
          "profit",
          "buyExchange",
          "sellExchange"
        );
        expect(opportunity.profit).to.be.a("number");
      });
    } else {
      console.log("No arbitrage opportunities detected.");
    }
  });
});
