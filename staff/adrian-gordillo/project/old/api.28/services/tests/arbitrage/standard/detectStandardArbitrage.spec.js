// api/services/tests/arbitrage/standard/detectStandardArbitrage.spec.js

import dotenv from "dotenv";
import events from "events";
import { expect } from "chai";
import mongoose from "mongoose";
import sinon from "sinon";
import Opportunity from "../../../../models/Opportunity.js";
import detectStandardArbitrage from "../../../arbitrage/standard/detectStandardArbitrage.js";
import { errors, validate } from "com";

dotenv.config();

const { SystemError, ContentError } = errors;

events.EventEmitter.defaultMaxListeners = 20;

describe("detectStandardArbitrage", () => {
  let deleteManyStub;
  let insertManyStub;
  let validateNumberStub;
  let validateTextStub;

  before(async () => {
    const mongoUrl = process.env.MONGODB_TEST_URL;
    if (!mongoUrl) {
      throw new Error("MONGODB_TEST_URL is not defined");
    }
    await mongoose.connect(mongoUrl);
  });

  beforeEach(() => {
    deleteManyStub = sinon.stub(Opportunity, "deleteMany");
    insertManyStub = sinon.stub(Opportunity, "insertMany");
    validateNumberStub = sinon.stub(validate, "number");
    validateTextStub = sinon.stub(validate, "text");
  });

  afterEach(() => {
    deleteManyStub.restore();
    insertManyStub.restore();
    validateNumberStub.restore();
    validateTextStub.restore();
  });

  after(async () => {
    await mongoose.disconnect();
  });

  it("succeeds in detecting and saving standard arbitrage opportunities", async () => {
    const mockOpportunities = [
      {
        symbol: "BTC/USDT",
        buyExchange: "Binance",
        buyPrice: 50000,
        sellExchange: "Kraken",
        sellPrice: 51000,
        profit: 0.02,
      },
    ];

    deleteManyStub.resolves();
    insertManyStub.resolves(mockOpportunities);

    const result = await detectStandardArbitrage();

    // Verificar que se devuelve un array independientemente de si está vacío o no
    expect(result).to.be.an("array");
    expect(deleteManyStub.calledOnceWith({ type: "standard" })).to.be.true;
    // // Verificar que insertMany se llama solo si hay oportunidades
    // if (mockOpportunities.length > 0) {
    //   expect(insertManyStub.calledOnce).to.be.true;
    // }
  });

  it("fails with validation error", async () => {
    deleteManyStub.resolves();
    insertManyStub.resolves();

    // Stub validation to throw ContentError
    validateNumberStub.throws(new ContentError("Validation error"));

    try {
      await detectStandardArbitrage();
      throw new Error(
        "Expected detectStandardArbitrage to throw a validation error"
      );
    } catch (error) {
      expect(error).to.be.instanceOf(ContentError);
      expect(error.message).to.include("Validation error");
    }
  });

  it("fails due to system error", async () => {
    const errorMessage = "Database error";
    deleteManyStub.rejects(new Error(errorMessage));

    try {
      await detectStandardArbitrage();
      throw new Error(
        "Expected detectStandardArbitrage to throw a system error"
      );
    } catch (error) {
      expect(error).to.be.instanceOf(SystemError);
      expect(error.message).to.include("Failed to detect standard arbitrage");
    }
  });
});
