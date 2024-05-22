// api/services/tests/technicalIndicators/calculateStochastic.spec.js
import { expect } from "chai";
import calculateStochastic from "../../technicalIndicators/calculateStochastic.js";
import { errors } from "com";

const { ContentError, SystemError } = errors;

describe("calculateStochastic", () => {
  it("succeeds on valid input", () => {
    const highs = [
      48.7, 48.72, 48.9, 48.87, 48.82, 48.85, 48.82, 48.81, 48.85, 48.86, 48.87,
      48.82, 48.9, 48.89, 48.83, 48.88, 48.89, 48.9, 48.91, 48.92,
    ];
    const lows = [
      48.36, 48.22, 48.24, 48.37, 48.35, 48.3, 48.26, 48.39, 48.3, 48.36, 48.39,
      48.34, 48.36, 48.39, 48.37, 48.38, 48.4, 48.41, 48.42, 48.43,
    ];
    const closes = [
      48.65, 48.61, 48.75, 48.63, 48.74, 48.79, 48.78, 48.75, 48.82, 48.81,
      48.85, 48.89, 48.87, 48.84, 48.86, 48.88, 48.89, 48.9, 48.91, 48.92,
    ];

    const result = calculateStochastic(highs, lows, closes);

    expect(result).to.be.an("object");
    expect(result).to.have.property("k").that.is.a("number");
    expect(result).to.have.property("d").that.is.a("number");
    expect(result.k).to.be.within(0, 100);
    expect(result.d).to.be.within(0, 100);
  });

  it("fails if any of the price arrays are too short", () => {
    const highs = [48.7, 48.72];
    const lows = [48.36, 48.22];
    const closes = [48.65, 48.61];

    try {
      calculateStochastic(highs, lows, closes);
    } catch (error) {
      expect(error).to.be.instanceOf(ContentError);
      expect(error.message).to.include(
        "The price arrays are invalid or too short"
      );
    }
  });

  it("fails if highs array contains non-numeric values", () => {
    const highs = [
      48.7,
      48.72,
      "invalid",
      48.87,
      48.82,
      48.85,
      48.82,
      48.81,
      48.85,
      48.86,
      48.87,
      48.82,
      48.9,
      48.89,
      48.83,
      48.88,
      48.89,
      48.9,
      48.91,
      48.92,
    ];
    const lows = [
      48.36, 48.22, 48.24, 48.37, 48.35, 48.3, 48.26, 48.39, 48.3, 48.36, 48.39,
      48.34, 48.36, 48.39, 48.37, 48.38, 48.4, 48.41, 48.42, 48.43,
    ];
    const closes = [
      48.65, 48.61, 48.75, 48.63, 48.74, 48.79, 48.78, 48.75, 48.82, 48.81,
      48.85, 48.89, 48.87, 48.84, 48.86, 48.88, 48.89, 48.9, 48.91, 48.92,
    ];

    try {
      calculateStochastic(highs, lows, closes);
    } catch (error) {
      expect(error).to.be.instanceOf(ContentError);
      expect(error.message).to.include("high price at index 2 is not a number");
    }
  });

  it("fails if lows array contains non-numeric values", () => {
    const highs = [
      48.7, 48.72, 48.9, 48.87, 48.82, 48.85, 48.82, 48.81, 48.85, 48.86, 48.87,
      48.82, 48.9, 48.89, 48.83, 48.88, 48.89, 48.9, 48.91, 48.92,
    ];
    const lows = [
      48.36,
      48.22,
      "invalid",
      48.37,
      48.35,
      48.3,
      48.26,
      48.39,
      48.3,
      48.36,
      48.39,
      48.34,
      48.36,
      48.39,
      48.37,
      48.38,
      48.4,
      48.41,
      48.42,
      48.43,
    ];
    const closes = [
      48.65, 48.61, 48.75, 48.63, 48.74, 48.79, 48.78, 48.75, 48.82, 48.81,
      48.85, 48.89, 48.87, 48.84, 48.86, 48.88, 48.89, 48.9, 48.91, 48.92,
    ];

    try {
      calculateStochastic(highs, lows, closes);
    } catch (error) {
      expect(error).to.be.instanceOf(ContentError);
      expect(error.message).to.include("low price at index 2 is not a number");
    }
  });

  it("fails if closes array contains non-numeric values", () => {
    const highs = [
      48.7, 48.72, 48.9, 48.87, 48.82, 48.85, 48.82, 48.81, 48.85, 48.86, 48.87,
      48.82, 48.9, 48.89, 48.83, 48.88, 48.89, 48.9, 48.91, 48.92,
    ];
    const lows = [
      48.36, 48.22, 48.24, 48.37, 48.35, 48.3, 48.26, 48.39, 48.3, 48.36, 48.39,
      48.34, 48.36, 48.39, 48.37, 48.38, 48.4, 48.41, 48.42, 48.43,
    ];
    const closes = [
      48.65,
      48.61,
      "invalid",
      48.63,
      48.74,
      48.79,
      48.78,
      48.75,
      48.82,
      48.81,
      48.85,
      48.89,
      48.87,
      48.84,
      48.86,
      48.88,
      48.89,
      48.9,
      48.91,
      48.92,
    ];

    try {
      calculateStochastic(highs, lows, closes);
    } catch (error) {
      expect(error).to.be.instanceOf(ContentError);
      expect(error.message).to.include(
        "close price at index 2 is not a number"
      );
    }
  });

  it("fails if an error occurs during calculation", () => {
    const highs = [
      48.7, 48.72, 48.9, 48.87, 48.82, 48.85, 48.82, 48.81, 48.85, 48.86, 48.87,
      48.82, 48.9, 48.89, 48.83, 48.88, 48.89, 48.9, 48.91, 48.92,
    ];
    const lows = [
      48.36, 48.22, 48.24, 48.37, 48.35, 48.3, 48.26, 48.39, 48.3, 48.36, 48.39,
      48.34, 48.36, 48.39, 48.37, 48.38, 48.4, 48.41, 48.42, 48.43,
    ];
    const closes = [
      48.65, 48.61, 48.75, 48.63, 48.74, 48.79, 48.78, 48.75, 48.82, 48.81,
      48.85, 48.89, 48.87, 48.84, 48.86, 48.88, 48.89, 48.9, 48.91, 48.92,
    ];

    try {
      calculateStochastic(highs, lows, closes);
    } catch (error) {
      expect(error).to.be.instanceOf(SystemError);
      expect(error.message).to.include(
        "Failed to calculate Stochastic Oscillator"
      );
    }
  });
});
