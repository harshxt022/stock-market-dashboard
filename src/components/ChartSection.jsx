import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ChartSection({ selectedStock }) {
  const [chartData, setChartData] = useState([]);
  const [activeFilter, setActiveFilter] = useState("1M");
  const [loading, setLoading] = useState(false);
  const API_KEY = "ZNF4S20RSWYWQ8X1";

  const filterConfig = {
    "1D": { func: "TIME_SERIES_INTRADAY", interval: "5min", points: 78 }, 
    "5D": { func: "TIME_SERIES_INTRADAY", interval: "60min", points: 5 * 7 }, 
    "1M": { func: "TIME_SERIES_DAILY", points: 22 },
    "6M": { func: "TIME_SERIES_DAILY", points: 22 * 6 },
    "1Y": { func: "TIME_SERIES_DAILY", points: 252 },
    MAX: { func: "TIME_SERIES_MONTHLY", points: 60 },
  };

  useEffect(() => {
    if (!selectedStock) return;
    const controller = new AbortController();
    const cfg = filterConfig[activeFilter] || filterConfig["1M"];

    const fetchChartData = async () => {
      setLoading(true);
      try {
        let url;
        if (cfg.func === "TIME_SERIES_INTRADAY") {
          url = `https://www.alphavantage.co/query?function=${cfg.func}&symbol=${encodeURIComponent(
            selectedStock
          )}&interval=${cfg.interval}&outputsize=compact&apikey=${API_KEY}`;
        } else {
          // daily or monthly
          url = `https://www.alphavantage.co/query?function=${cfg.func}&symbol=${encodeURIComponent(
            selectedStock
          )}&apikey=${API_KEY}`;
        }

        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        // handle rate limit / API notes
        if (data.Note) {
          console.warn("[Chart] AlphaVantage rate limited:", data.Note);
          setChartData(generateMockData(selectedStock, cfg.points));
          setLoading(false);
          return;
        }
        if (data["Error Message"]) {
          console.warn("[Chart] AlphaVantage error:", data["Error Message"]);
          setChartData(generateMockData(selectedStock, cfg.points));
          setLoading(false);
          return;
        }

        const intradayKey = Object.keys(data).find(k =>
          k.toLowerCase().includes("time series")
        );
        const series = intradayKey ? data[intradayKey] : null;

        if (!series) {
          setChartData(generateMockData(selectedStock, cfg.points));
          setLoading(false);
          return;
        }

        const entries = Object.keys(series)
          .map(k => ({
            date: k,
            price: parseFloat(
              series[k]["4. close"] ?? series[k]["close"] ?? Object.values(series[k])[3]
            ),
          }))
          .filter(item => Number.isFinite(item.price));

        entries.sort((a, b) => new Date(a.date) - new Date(b.date));

        const sliced = cfg.points ? entries.slice(-cfg.points) : entries;

        const formatted = sliced.map(item => {
          const d = new Date(item.date);
          const label =
            cfg.func === "TIME_SERIES_INTRADAY"
              ? `${d.getHours().toString().padStart(2, "0")}:${d
                  .getMinutes()
                  .toString()
                  .padStart(2, "0")}`
              : `${d.getDate().toString().padStart(2, "0")}-${(
                  d.getMonth() + 1
                )
                  .toString()
                  .padStart(2, "0")}`;
          return { date: label, price: Number(item.price.toFixed(2)) };
        });

        if (formatted.length === 0) {
          setChartData(generateMockData(selectedStock, cfg.points));
        } else {
          setChartData(formatted);
        }
      } catch (err) {
        if (err.name === "AbortError") {
          return;
        }
        console.error("[Chart] fetch error:", err);
        setChartData(generateMockData(selectedStock, filterConfig[activeFilter].points));
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();

    return () => controller.abort();
  }, [selectedStock, activeFilter]);

  const generateMockData = (symbol, points = 30) => {
    const data = [];
    let price = Math.random() * 200 + 100;
    for (let i = 0; i < (points || 30); i++) {
      price = price + (Math.random() - 0.5) * 5;
      data.push({
        date: `P${i + 1}`,
        price: parseFloat(price.toFixed(2)),
      });
    }
    return data;
  };

  return (
    <section className="card chart-section">
      <div className="chart-header">
        <h2>Price Chart</h2>
        <div className="chart-filters">
          {["1D", "5D", "1M", "6M", "1Y", "MAX"].map((filter) => (
            <button
              key={filter}
              className={`filter-btn ${activeFilter === filter ? "active" : ""}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div style={{ width: "100%", height: "350px" }}>
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              color: "#7d8590",
            }}
          >
            Loading chart data...
          </div>
        ) : chartData && chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
              <XAxis dataKey="date" stroke="#B1B5C3" style={{ fontSize: "12px" }} />
              <YAxis stroke="#B1B5C3" style={{ fontSize: "12px" }} domain={["auto", "auto"]} />
              <Tooltip
                contentStyle={{ backgroundColor: "#1a1a1c", border: "1px solid #3b82f6" }}
                labelStyle={{ color: "#B1B5C3" }}
              />
              <Line type="monotone" dataKey="price" stroke="#3b82f6" dot={false} isAnimationActive={false} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              color: "#7d8590",
            }}
          >
            No data available
          </div>
        )}
      </div>
    </section>
  );
}
