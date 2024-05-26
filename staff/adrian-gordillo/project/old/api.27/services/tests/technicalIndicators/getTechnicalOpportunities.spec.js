// api/services/tests/technicalIndicators/getTechnicalOpportunities.spec.js

import { expect } from "chai";
import sinon from "sinon";
import TechnicalOpportunity from "../../../models/TechnicalOpportunity.js";
import getTechnicalOpportunities from "../../technicalIndicators/getTechnicalOpportunities.js";
import { errors } from "com";

const { SystemError } = errors;

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
        symbol: "BTCUSDT",
        strategy: "RSI",
        message: "Buy",
        rsi: 30,
        stochastic: 20,
      },
      {
        symbol: "ETHUSDT",
        strategy: "Stochastic",
        message: "Buy",
        rsi: 40,
        stochastic: 25,
      },
    ];

    findStub.resolves(mockData);

    const opportunities = await getTechnicalOpportunities();

    expect(opportunities).to.be.an("array");
    expect(opportunities).to.have.lengthOf(2);
    expect(opportunities[0]).to.deep.equal(mockData[0]);
    expect(opportunities[1]).to.deep.equal(mockData[1]);
  });

  it("fails when there is an error fetching opportunities", async () => {
    findStub.rejects(new Error("Database error"));

    try {
      await getTechnicalOpportunities();
      throw new Error("Expected getTechnicalOpportunities to throw an error");
    } catch (error) {
      expect(error).to.be.instanceOf(SystemError);
      expect(error.message).to.equal("Failed to fetch technical opportunities");
    }
  });
});
