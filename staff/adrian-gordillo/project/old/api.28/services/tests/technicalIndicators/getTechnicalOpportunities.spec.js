// api/services/tests/technicalIndicators/getTechnicalOpportunities.spec.js

import { expect } from "chai";
import sinon from "sinon";
import TechnicalOpportunity from "../../../models/TechnicalOpportunity.js";
import getTechnicalOpportunities from "../../technicalIndicators/getTechnicalOpportunities.js";
import { errors } from "com";

const { SystemError, NotFoundError } = errors;

describe("getTechnicalOpportunities", () => {
  let findStub;

  beforeEach(() => {
    findStub = sinon.stub(TechnicalOpportunity, "find");
  });

  afterEach(() => {
    findStub.restore();
  });

  it("succeeds in fetching technical opportunities", async () => {
    const mockData = [
      {
        _id: "60c72b2f5f1b2c001e6eae5e",
        symbol: "BTCUSDT",
        strategy: "RSI",
        message: "Buy",
        rsi: 30,
        stochastic: 20,
        __v: 0,
      },
      {
        _id: "60c72b2f5f1b2c001e6eae5f",
        symbol: "ETHUSDT",
        strategy: "Stochastic",
        message: "Buy",
        rsi: 40,
        stochastic: 25,
        __v: 0,
      },
    ];

    const expectedData = [
      {
        id: "60c72b2f5f1b2c001e6eae5e",
        symbol: "BTCUSDT",
        strategy: "RSI",
        message: "Buy",
        rsi: 30,
        stochastic: 20,
      },
      {
        id: "60c72b2f5f1b2c001e6eae5f",
        symbol: "ETHUSDT",
        strategy: "Stochastic",
        message: "Buy",
        rsi: 40,
        stochastic: 25,
      },
    ];

    findStub.returns({
      lean: sinon.stub().resolves(mockData),
    });

    const opportunities = await getTechnicalOpportunities();

    expect(opportunities).to.be.an("array");
    expect(opportunities).to.have.lengthOf(2);
    expect(opportunities[0]).to.deep.equal(expectedData[0]);
    expect(opportunities[1]).to.deep.equal(expectedData[1]);
  });

  it("fails when there is an error fetching opportunities", async () => {
    findStub.returns({
      lean: sinon.stub().rejects(new Error("Database error")),
    });

    try {
      await getTechnicalOpportunities();
      throw new Error("Expected getTechnicalOpportunities to throw an error");
    } catch (error) {
      expect(error).to.be.instanceOf(SystemError);
      expect(error.message).to.equal("Failed to fetch technical opportunities");
    }
  });

  it("throws NotFoundError when no opportunities are found", async () => {
    findStub.returns({
      lean: sinon.stub().resolves([]),
    });

    try {
      await getTechnicalOpportunities();
      throw new Error(
        "Expected getTechnicalOpportunities to throw NotFoundError"
      );
    } catch (error) {
      expect(error).to.be.instanceOf(NotFoundError);
      expect(error.message).to.equal("No opportunities found");
    }
  });
});
