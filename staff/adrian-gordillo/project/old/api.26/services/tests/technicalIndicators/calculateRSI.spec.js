// api/services/tests/technicalIndicators/calculateRSI.spec.js
import { expect } from "chai";
import calculateRSI from "../../technicalIndicators/calculateRSI.js";
import { errors } from "com";

const { ContentError, SystemError } = errors;

describe("calculateRSI", () => {
  it("succeeds on valid input", () => {
    const closes = [
      44.34, 44.09, 44.15, 43.61, 44.33, 44.83, 45.1, 45.42, 45.84, 46.08,
      45.89, 46.03, 45.61, 46.28, 46.28, 46.0, 46.03, 46.41, 46.22, 45.64,
      46.21,
    ];
    const period = 14;

    const result = calculateRSI(closes, period);

    expect(result).to.be.a("number");
    expect(result).to.be.within(0, 100);
  });

  it("fails if closes array is too short", () => {
    const closes = [44.34, 44.09, 44.15];
    const period = 14;

    try {
      calculateRSI(closes, period);
    } catch (error) {
      expect(error).to.be.instanceOf(ContentError);
      expect(error.message).to.include(
        "The closes array is invalid or too short"
      );
    }
  });

  it("fails if closes array contains non-numeric values", () => {
    const closes = [
      44.34,
      44.09,
      "invalid",
      43.61,
      44.33,
      44.34,
      44.09,
      44.15,
      43.61,
      44.33,
      44.83,
      45.1,
      45.42,
      45.84,
      46.08,
    ];
    const period = 14;

    try {
      calculateRSI(closes, period);
    } catch (error) {
      expect(error).to.be.instanceOf(ContentError);
      expect(error.message).to.include(
        "close price at index 2 is not a number"
      );
    }
  });

  it("fails if period is not a number", () => {
    const closes = [
      44.34, 44.09, 44.15, 43.61, 44.33, 44.83, 45.1, 45.42, 45.84, 46.08,
      45.89, 46.03, 45.61, 46.28, 46.28, 46.0, 46.03, 46.41, 46.22, 45.64,
      46.21,
    ];
    const period = "invalid";

    try {
      calculateRSI(closes, period);
    } catch (error) {
      expect(error).to.be.instanceOf(ContentError);
      expect(error.message).to.include("period is not a number");
    }
  });

  it("fails if period is greater than closes array length", () => {
    const closes = [
      44.34, 44.09, 44.15, 43.61, 44.33, 44.83, 45.1, 45.42, 45.84, 46.08,
      45.89, 46.03, 45.61, 46.28,
    ];
    const period = 15;

    try {
      calculateRSI(closes, period);
    } catch (error) {
      expect(error).to.be.instanceOf(ContentError);
      expect(error.message).to.include(
        "The closes array is invalid or too short"
      );
    }
  });

  it("fails if an error occurs during calculation", () => {
    const closes = [
      44.34, 44.09, 44.15, 43.61, 44.33, 44.83, 45.1, 45.42, 45.84, 46.08,
      45.89, 46.03, 45.61, 46.28, 46.28, 46.0, 46.03, 46.41, 46.22, 45.64,
      46.21,
    ];
    const period = 14;

    // Forzar un error durante el cálculo
    try {
      calculateRSI(closes, period);
    } catch (error) {
      expect(error).to.be.instanceOf(SystemError);
      expect(error.message).to.include("Failed to calculate RSI");
    }
  });
});
