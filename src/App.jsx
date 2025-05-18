import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import CoinCard from "./components/CoinCard";
import { coins } from "./config/coins";
import { fetchCoinData } from "./services/api";

function App() {
  const [coinData, setCoinData] = useState({});

  useEffect(() => {
    async function loadData() {
      const results = {};
      for (const coin of coins) {
        const data = await fetchCoinData(coin.id);
        results[coin.id] = data;
      }
      setCoinData(results);
    }
    loadData();

    const interval = setInterval(loadData, 60 * 1000); // update elke minuut

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Header />
      <main className="app-main">
        {coins.map((coin) => (
          <CoinCard
            key={coin.id}
            coin={coin}
            data={coinData[coin.id]}
          />
        ))}
      </main>
    </div>
  );
}

export default App;
