// api/services/tests/arbitrage/standard/getArbitrageConfig.spec.js

import { expect } from "chai";
import getArbitrageConfig from "../../../arbitrage/standard/getArbitrageConfig.js";
import { validate } from "com";
import sinon from "sinon";

describe("getArbitrageConfig", () => {
  let validateNumberStub;
  let validateTextStub;

  beforeEach(() => {
    validateNumberStub = sinon.stub(validate, "number");
    validateTextStub = sinon.stub(validate, "text");
  });

  afterEach(() => {
    validateNumberStub.restore();
    validateTextStub.restore();
  });

  it("succeeds in returning a valid configuration object", () => {
    const config = getArbitrageConfig();

    expect(config).to.be.an("object");
    expect(config).to.have.property("umbralRentabilidad").that.is.a("number");
    expect(config).to.have.property("comisiones").that.is.an("object");
    expect(config).to.have.property("paresCriptomonedas").that.is.an("array");
    expect(config).to.have.property("includeCommissions").that.is.a("boolean");

    expect(config.umbralRentabilidad).to.equal(0.02);

    const expectedCommissions = {
      Binance: 0.01,
      Kraken: 0.021,
      Coinbase: 0.05,
      Bitfinex: 0.15,
      "Crypto.com": 0.4,
      "Gate.io": 0.2,
      KuCoin: 0.1,
    };

    expect(config.comisiones).to.deep.equal(expectedCommissions);
    expect(config.paresCriptomonedas).to.deep.equal([
      "BTC/USDT",
      "ETH/USDT",
      "LTC/USDT",
      "ADA/USDT",
      "SOL/USDT",
      "DOT/USDT",
      "MATIC/USDT",
      "MKR/USDT",
    ]);
    expect(config.includeCommissions).to.be.true;
  });

  it("validates umbralRentabilidad as a number", () => {
    getArbitrageConfig();
    expect(validateNumberStub.calledWith(0.02, "umbralRentabilidad")).to.be
      .true;
  });

  it("validates commissions as numbers", () => {
    const expectedCommissions = {
      Binance: 0.01,
      Kraken: 0.021,
      Coinbase: 0.05,
      Bitfinex: 0.15,
      "Crypto.com": 0.4,
      "Gate.io": 0.2,
      KuCoin: 0.1,
    };

    getArbitrageConfig();

    for (const [exchange, commission] of Object.entries(expectedCommissions)) {
      expect(
        validateNumberStub.calledWith(commission, `commission for ${exchange}`)
      ).to.be.true;
    }
  });

  it("validates pairs as text", () => {
    const pairs = [
      "BTC/USDT",
      "ETH/USDT",
      "LTC/USDT",
      "ADA/USDT",
      "SOL/USDT",
      "DOT/USDT",
      "MATIC/USDT",
      "MKR/USDT",
    ];

    getArbitrageConfig();

    pairs.forEach((pair) => {
      expect(validateTextStub.calledWith(pair, "pair")).to.be.true;
    });
  });
});
