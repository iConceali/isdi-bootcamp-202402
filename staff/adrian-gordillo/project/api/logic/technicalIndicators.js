// api/logic/technicalIndicators.js

export function calculateRSI(closes, period = 14) {
  let gains = 0;
  let losses = 0;
  let rsis = [];

  for (let i = 1; i <= period; i++) {
    const diff = closes[i] - closes[i - 1];
    if (diff > 0) gains += diff;
    else losses -= diff;
  }

  let avgGain = gains / period;
  let avgLoss = losses / period;
  let rs = avgGain / avgLoss;
  rsis.push(100 - 100 / (1 + rs));

  for (let i = period + 1; i < closes.length; i++) {
    const change = closes[i] - closes[i - 1];
    let gain = change > 0 ? change : 0;
    let loss = change < 0 ? -change : 0;

    avgGain = (avgGain * (period - 1) + gain) / period;
    avgLoss = (avgLoss * (period - 1) + loss) / period;

    rs = avgGain / avgLoss;
    rsis.push(100 - 100 / (1 + rs));
  }

  return rsis[rsis.length - 1].toFixed(2);
}

export const calculateStochastic = (highs, lows, closes) => {
  const kPeriod = 14;
  const dPeriod = 3;
  const kValues = [];

  for (let i = kPeriod; i <= highs.length; i++) {
    const highSlice = highs.slice(i - kPeriod, i);
    const lowSlice = lows.slice(i - kPeriod, i);
    const close = closes[i - 1];

    const highestHigh = Math.max(...highSlice);
    const lowestLow = Math.min(...lowSlice);

    const k = ((close - lowestLow) / (highestHigh - lowestLow)) * 100;
    kValues.push(k);
  }

  const dValues = kValues
    .slice(dPeriod - 1)
    .map(
      (_, index) =>
        kValues
          .slice(index, index + dPeriod)
          .reduce((acc, curr) => acc + curr, 0) / dPeriod
    );

  return {
    k: kValues[kValues.length - 1].toFixed(2),
    d: dValues[dValues.length - 1].toFixed(2),
  };
};
