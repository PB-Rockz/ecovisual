import React, { useState, useEffect, memo } from "react";
import {
  LineChart,
  BarChart,
  PieChart,
  Line,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const COLORS = [
  "#4CAF50",
  "#8BC34A",
  "#CDDC39",
  "#FFEB3B",
  "#FFC107",
  "#FF9800",
];

const ForestDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulated data - replace with an actual API call
    const fetchData = async () => {
      try {
        const mockData = {
          yearlyLoss: Array.from({ length: 22 }, (_, i) => ({
            year: 2001 + i,
            lossHectares: Math.random() * 5000000 + 2000000,
            percentChange: Math.random() * 10 - 5,
          })),
          regions: {
            "South America": 35,
            Africa: 28,
            Asia: 20,
            "North America": 10,
            Europe: 5,
            Oceania: 2,
          },
        };
        setStats(mockData);
        setLoading(false);
      } catch (err) {
        setError("Failed to load data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatHectares = (value) => `${(value / 1_000_000).toFixed(1)}M ha`;
  const calculateTotalLoss = () =>
    stats?.yearlyLoss.reduce((sum, { lossHectares }) => sum + lossHectares, 0);
  const calculateAverageLoss = () =>
    calculateTotalLoss() / stats?.yearlyLoss.length;

  if (loading)
    return (
      <div className="flex justify-center items-center h-48">
        <div className="text-green-400">Loading dashboard data...</div>
      </div>
    );

  if (error)
    return (
      <div className="text-red-400 p-4">Error loading dashboard: {error}</div>
    );

  return (
    <div className="mt-8 space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Forest Loss"
          value={formatHectares(calculateTotalLoss())}
          trend="+2.3%"
          color="text-red-400"
        />
        <StatCard
          title="Average Annual Loss"
          value={formatHectares(calculateAverageLoss())}
          trend="-0.8%"
          color="text-yellow-400"
        />
        <StatCard
          title="Most Affected Region"
          value="South America"
          trend="35%"
          color="text-green-400"
        />
        <StatCard
          title="Current Year Loss"
          value={formatHectares(stats.yearlyLoss.at(-1)?.lossHectares)}
          trend="+1.2%"
          color="text-blue-400"
        />
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Yearly Loss Trend */}
        <ChartCard title="Annual Forest Loss Trend">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={stats.yearlyLoss}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="year" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{ backgroundColor: "#1F2937", border: "none" }}
                labelStyle={{ color: "#9CA3AF" }}
              />
              <Line
                type="monotone"
                dataKey="lossHectares"
                name="Forest Loss (ha)"
                stroke="#4CAF50"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Regional Distribution */}
        <ChartCard title="Regional Distribution">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={Object.entries(stats.regions).map(([name, value]) => ({
                  name,
                  value,
                }))}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} (${(percent * 100).toFixed(0)}%)`
                }
                outerRadius={100}
                dataKey="value"
              >
                {Object.entries(stats.regions).map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: "#1F2937", border: "none" }}
                labelStyle={{ color: "#9CA3AF" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Yearly Comparison Table */}
      <ChartCard title="Yearly Comparison">
        <table className="min-w-full">
          <thead>
            <tr className="text-gray-400">
              <th className="px-4 py-2 text-left">Year</th>
              <th className="px-4 py-2 text-right">Forest Loss (ha)</th>
              <th className="px-4 py-2 text-right">Change (%)</th>
            </tr>
          </thead>
          <tbody>
            {stats.yearlyLoss
              .slice(-5)
              .map(({ year, lossHectares, percentChange }) => (
                <tr
                  key={year}
                  className="border-t border-gray-700 hover:bg-gray-700"
                >
                  <td className="px-4 py-2">{year}</td>
                  <td className="px-4 py-2 text-right">
                    {formatHectares(lossHectares)}
                  </td>
                  <td
                    className={`px-4 py-2 text-right ${
                      percentChange >= 0 ? "text-red-400" : "text-green-400"
                    }`}
                  >
                    {percentChange > 0 ? "+" : ""}
                    {percentChange.toFixed(1)}%
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </ChartCard>
    </div>
  );
};

const StatCard = memo(({ title, value, trend, color }) => (
  <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
    <h3 className="text-sm font-medium text-gray-400">{title}</h3>
    <p className={`text-2xl font-bold ${color} mt-2`}>{value}</p>
    <p
      className={`text-sm ${
        trend.startsWith("+") ? "text-red-400" : "text-green-400"
      } mt-1`}
    >
      {trend}
    </p>
  </div>
));

const ChartCard = ({ title, children }) => (
  <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
    <h3 className="text-xl font-semibold text-green-400 mb-4">{title}</h3>
    <div className="h-80">{children}</div>
  </div>
);

export default ForestDashboard;
