// api/services/tests/technicalIndicators/fetchHistoricalData.spec.js

import { expect } from "chai";
import sinon from "sinon";
import axios from "axios";
import fetchHistoricalData from "../../technicalIndicators/fetchHistoricalData.js";
import { errors } from "com";

const { SystemError } = errors;

describe("fetchHistoricalData", () => {
  let axiosGetStub;

  beforeEach(() => {
    axiosGetStub = sinon.stub(axios, "get");
  });

  afterEach(() => {
    axiosGetStub.restore();
  });

  it("succeeds in fetching historical data", async () => {
    const mockData = [
      [
        1628841600000,
        "0.02000000",
        "0.02100000",
        "0.01900000",
        "0.02050000",
        "1000.00000000",
      ],
      [
        1628841660000,
        "0.02050000",
        "0.02200000",
        "0.02000000",
        "0.02150000",
        "2000.00000000",
      ],
    ];

    axiosGetStub.resolves({ data: mockData });

    const symbol = "BTCUSDT";
    const result = await fetchHistoricalData(symbol);

    expect(result).to.be.an("array");
    expect(result).to.have.lengthOf(2);
    expect(result[0]).to.deep.equal({
      open: 0.02,
      high: 0.021,
      low: 0.019,
      close: 0.0205,
      volume: 1000,
    });
    expect(result[1]).to.deep.equal({
      open: 0.0205,
      high: 0.022,
      low: 0.02,
      close: 0.0215,
      volume: 2000,
    });
  });

  it("fails when there is an error fetching data", async () => {
    axiosGetStub.rejects(new Error("Network error"));

    const symbol = "BTCUSDT";

    try {
      await fetchHistoricalData(symbol);
      throw new Error("Expected fetchHistoricalData to throw an error");
    } catch (error) {
      expect(error).to.be.instanceOf(SystemError);
      expect(error.message).to.equal(
        `Failed to fetch historical data for ${symbol}`
      );
    }
  });
});
