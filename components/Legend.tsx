const Legend = ({ selectedYear, onYearChange }) => {
  const years = Array.from({ length: 22 }, (_, i) => 2001 + i);
  const colors = [
    "#ffeda0",
    "#feb24c",
    "#fd8d3c",
    "#fc4e2a",
    "#e31a1c",
    "#bd0026",
    "#800026",
    "#08519c",
    "#3182bd",
    "#6baed6",
    "#bdd7e7",
    "#eff3ff",
    "#c6dbef",
    "#9ecae1",
    "#4292c6",
    "#2171b5",
    "#08519c",
    "#08306b",
    "#41ab5d",
    "#238b45",
    "#006d2c",
    "#00441b",
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold text-green-400 mb-2">Legend</h2>
      <div className="legend-scroll max-h-[300px] overflow-y-auto">
        {years.map((year, index) => (
          <div key={year} className="flex items-center mb-1">
            <span
              className="inline-block w-4 h-4 mr-2 rounded"
              style={{ backgroundColor: colors[index] }}
            ></span>
            <span className="text-xs text-gray-300">{year}</span>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-medium text-green-400 mb-2">Time Range</h3>
        <select
          id="yearSelect"
          value={selectedYear}
          onChange={onYearChange}
          className="form-select px-2 py-1 bg-gray-700 border border-gray-600 text-gray-300 rounded"
        >
          <option value="">All Years</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Legend;
