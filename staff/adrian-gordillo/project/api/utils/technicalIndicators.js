// utils/technicalIndicators.js

export function calculateRSI(closes, period = 14) {
  let gains = 0;
  let losses = 0;
  let rsis = [];

  // Calculamos las ganancias y pérdidas iniciales
  for (let i = 1; i <= period; i++) {
    const diff = closes[i] - closes[i - 1];
    if (diff > 0) gains += diff;
    else losses -= diff;
  }

  let avgGain = gains / period;
  let avgLoss = losses / period;

  // Calculamos el primer RSI
  let rs = avgGain / avgLoss;
  rsis.push(100 - 100 / (1 + rs));

  // Calculamos los siguientes RSI usando SMA para las ganancias y pérdidas
  for (let i = period + 1; i < closes.length; i++) {
    const change = closes[i] - closes[i - 1];

    let gain = change > 0 ? change : 0;
    let loss = change < 0 ? -change : 0;

    // Actualizamos los promedios de ganancias y pérdidas usando el método SMA
    avgGain = (avgGain * (period - 1) + gain) / period;
    avgLoss = (avgLoss * (period - 1) + loss) / period;

    rs = avgGain / avgLoss;
    rsis.push(100 - 100 / (1 + rs));
  }

  const latestRSI = rsis[rsis.length - 1].toFixed(2);
  // console.log("RSI Values:", { RSI: latestRSI }); // Muestra los últimos 5 valores de RSI para depuración
  return latestRSI; // Retorna el último valor de RSI calculado
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

  const dValues = kValues.slice(dPeriod - 1).map((_, index) => {
    return (
      kValues
        .slice(index, index + dPeriod)
        .reduce((acc, curr) => acc + curr, 0) / dPeriod
    );
  });

  const latestK = kValues[kValues.length - 1].toFixed(2);
  const latestD = dValues[dValues.length - 1].toFixed(2);

  // console.log("Stochastic Values:", { k: latestK, d: latestD }); // Display the latest Stochastic values
  return { k: latestK, d: latestD };
};
