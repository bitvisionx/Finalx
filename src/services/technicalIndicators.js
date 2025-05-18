// Bereken RSI
export function calculateRSI(prices, period = 14) {
  if (prices.length < period + 1) return 50;

  let gains = 0;
  let losses = 0;
  for (let i = prices.length - period; i < prices.length; i++) {
    const diff = prices[i] - prices[i - 1];
    if (diff > 0) gains += diff;
    else losses -= diff;
  }
  if (gains + losses === 0) return 50;

  const rs = gains / losses || 0;
  const rsi = 100 - 100 / (1 + rs);
  return Math.min(100, Math.max(0, rsi));
}

// Bereken Bollinger Bands
export function calculateBollingerBands(prices, period = 20, stdDevMult = 2) {
  if (prices.length < period) {
    return { upper: 0, middle: 0, lower: 0 };
  }

  const slice = prices.slice(prices.length - period);
  const mean =
    slice.reduce((acc, val) => acc + val, 0) / period;

  const variance =
    slice.reduce((acc, val) => acc + (val - mean) ** 2, 0) / period;

  const stdDev = Math.sqrt(variance);

  return {
    upper: mean + stdDevMult * stdDev,
    middle: mean,
    lower: mean - stdDevMult * stdDev,
  };
}
