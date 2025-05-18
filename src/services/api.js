// Hulpfuncties technische indicatoren
import {
  calculateRSI,
  calculateBollingerBands,
} from "./technicalIndicators";

const BASE_URL = "https://api.coingecko.com/api/v3";

export async function fetchCoinData(coinId) {
  try {
    // 1. Huidige prijs in euro
    const priceResp = await fetch(
      `${BASE_URL}/simple/price?ids=${coinId}&vs_currencies=eur`
    );
    const priceJson = await priceResp.json();
    const currentPrice = priceJson[coinId]?.eur ?? null;

    // 2. Historische data voor indicatoren (1 dag, 1 uur candles in minuten)
    const histResp = await fetch(
      `${BASE_URL}/coins/${coinId}/market_chart?vs_currency=eur&days=2&interval=hourly`
    );
    const histJson = await histResp.json();
    // We gebruiken histJson.prices array: [ [timestamp, price], ... ]
    const prices = histJson.prices.map((p) => p[1]);

    if (!currentPrice || prices.length === 0) {
      return null;
    }

    // 3. Bereken indicatoren
    const rsi = calculateRSI(prices, 14);
    const bb = calculateBollingerBands(prices, 20);

    // 4. Voorspelling - dummy logica (kan AI worden)
    const prediction = predictPriceMovement(currentPrice, rsi, bb);

    return {
      currentPrice,
      rsi,
      bollingerBands: bb,
      prediction,
    };
  } catch (e) {
    console.error("Error fetching coin data", coinId, e);
    return null;
  }
}

function predictPriceMovement(currentPrice, rsi, bb) {
  // Dummy logica: simpele regels op basis van RSI en bollinger bands
  // output is percentage voorspelling per 1u, 6u, 24u in format { "1h": x, "6h": y, "24h": z }
  let score = 0;

  // RSI < 30 = oversold = + positief
  if (rsi < 30) score += 1;
  // RSI > 70 = overbought = negatief
  if (rsi > 70) score -= 1;

  // Prijs onder lower band = koopkans
  if (currentPrice < bb.lower) score += 1;
  // Prijs boven upper band = verkoopkans
  if (currentPrice > bb.upper) score -= 1;

  // Basis % beweging gebaseerd op score (-2..2)
  const baseMove = score * 2;

  return {
    "1h": baseMove + randomPercent(),
    "6h": baseMove + randomPercent() * 1.5,
    "24h": baseMove + randomPercent() * 2,
  };
}

function randomPercent() {
  return (Math.random() - 0.5) * 2; // tussen -1% en +1%
}
