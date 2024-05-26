// api/services/tests/orders/createOrder.spec.js

import { expect } from "chai";
import mongoose from "mongoose";
import sinon from "sinon";
import Order from "../../../models/OrdersRegister.js";
import createOrder from "../../orders/createOrder.js";
import { errors } from "com";
import dotenv from "dotenv";

dotenv.config();

const { ContentError } = errors;

describe("createOrder", () => {
  let saveStub;

  before(async () => {
    await mongoose.connect(process.env.MONGODB_TEST_URL);
  });

  beforeEach(() => {
    saveStub = sinon.stub(Order.prototype, "save");
  });

  afterEach(() => {
    saveStub.restore();
  });

  after(async () => {
    await mongoose.disconnect();
  });

  it("succeeds in creating a new order", async () => {
    const mockOrder = {
      userId: new mongoose.Types.ObjectId(),
      symbol: "BTCUSDT",
      date: "2024-05-22",
      investment: 1000,
      profitPercent: 10,
      profitDollars: 100,
    };

    saveStub.resolves(mockOrder);

    const result = await createOrder(mockOrder.userId.toString(), {
      symbol: mockOrder.symbol,
      date: mockOrder.date,
      investment: mockOrder.investment,
      profitPercent: mockOrder.profitPercent,
    });

    expect(result).to.deep.equal(mockOrder);
    expect(saveStub.calledOnce).to.be.true;
  });

  it("fails with validation error for invalid userId", async () => {
    try {
      await createOrder("", {
        symbol: "BTCUSDT",
        date: "2024-05-22",
        investment: 1000,
        profitPercent: 10,
      });
      throw new Error("Expected createOrder to throw a validation error");
    } catch (error) {
      expect(error).to.be.instanceOf(errors.ContentError);
      expect(error.message).to.include("User ID >< is empty or blank");
    }
  });

  it("fails with validation error for invalid symbol", async () => {
    try {
      await createOrder(new mongoose.Types.ObjectId().toString(), {
        symbol: "",
        date: "2024-05-22",
        investment: 1000,
        profitPercent: 10,
      });
      throw new Error("Expected createOrder to throw a validation error");
    } catch (error) {
      expect(error).to.be.instanceOf(errors.ContentError);
      expect(error.message).to.include("Symbol >< is empty or blank");
    }
  });

  it("fails with validation error for invalid date", async () => {
    try {
      await createOrder(new mongoose.Types.ObjectId().toString(), {
        symbol: "BTCUSDT",
        date: "invalid-date",
        investment: 1000,
        profitPercent: 10,
      });
      throw new Error("Expected createOrder to throw a validation error");
    } catch (error) {
      expect(error).to.be.instanceOf(errors.ContentError);
      expect(error.message).to.include(
        "Date invalid-date does not have a valid format"
      );
    }
  });

  it("fails with validation error for invalid investment", async () => {
    try {
      await createOrder(new mongoose.Types.ObjectId().toString(), {
        symbol: "BTCUSDT",
        date: "2024-05-22",
        investment: "invalid-investment",
        profitPercent: 10,
      });
      throw new Error("Expected createOrder to throw a validation error");
    } catch (error) {
      expect(error).to.be.instanceOf(TypeError); // Cambiado aquí
      expect(error.message).to.include(
        "Investment invalid-investment is not a valid number"
      );
    }
  });

  it("fails with validation error for invalid profitPercent", async () => {
    try {
      await createOrder(new mongoose.Types.ObjectId().toString(), {
        symbol: "BTCUSDT",
        date: "2024-05-22",
        investment: 1000,
        profitPercent: "invalid-profitPercent",
      });
      throw new Error("Expected createOrder to throw a validation error");
    } catch (error) {
      expect(error).to.be.instanceOf(TypeError); // Cambiado aquí
      expect(error.message).to.include(
        "Profit Percent invalid-profitPercent is not a valid number"
      );
    }
  });

  it("fails to create order due to database error", async () => {
    const mockOrder = {
      userId: new mongoose.Types.ObjectId(),
      symbol: "BTCUSDT",
      date: "2024-05-22",
      investment: 1000,
      profitPercent: 10,
      profitDollars: 100,
    };

    saveStub.rejects(new Error("Database error"));

    try {
      await createOrder(mockOrder.userId.toString(), {
        symbol: mockOrder.symbol,
        date: mockOrder.date,
        investment: mockOrder.investment,
        profitPercent: mockOrder.profitPercent,
      });
      throw new Error("Expected createOrder to throw a ContentError");
    } catch (error) {
      expect(error).to.be.instanceOf(ContentError);
      expect(error.message).to.include("Failed to create order");
    }
  });
});
