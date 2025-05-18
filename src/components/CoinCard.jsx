import React from "react";

function formatPercent(value) {
  if (value == null) return "-";
  return (value > 0 ? "+" : "") + value.toFixed(2) + "%";
}

export default function CoinCard({ coin, data }) {
  if (!data) {
    return (
      <div className="coin-card">
        <h2>{coin.name} ({coin.symbol})</h2>
        <p>Laden...</p>
      </div>
    );
  }

  return (
    <div className="coin-card">
      <h2>{coin.name} ({coin.symbol})</h2>
      <div className="price">€ {data.currentPrice?.toFixed(4)}</div>

      <div className="indicators">
        <p>RSI: {data.rsi?.toFixed(2)}</p>
        <p>Bollinger Bands:</p>
        <ul>
          <li>Upper: €{data.bollingerBands.upper.toFixed(4)}</li>
          <li>Middle: €{data.bollingerBands.middle.toFixed(4)}</li>
          <li>Lower: €{data.bollingerBands.lower.toFixed(4)}</li>
        </ul>
      </div>

      <div className="predictions">
        <p>Voorspelling 1 uur: {formatPercent(data.prediction["1h"])}</p>
        <p>Voorspelling 6 uur: {formatPercent(data.prediction["6h"])}</p>
        <p>Voorspelling 24 uur: {formatPercent(data.prediction["24h"])}</p>
      </div>
    </div>
  );
}
