"use client";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = () => {
  const geeTileLayerUrl = `https://earthengine.googleapis.com/v1/projects/ee-adityabarunwork/maps/da0816574742b1add6b8d3881425093f-9b4fe709c55d554d2b6cbdef0592a5a2/tiles/{z}/{x}/{y}`;

  return (
    <div className="relative p-2 h-[800px] w-full">
      <MapContainer
        center={[0, 0]}
        zoom={2}
        style={{ height: "100%", width: "100%", zIndex: 1 }} // Set lower z-index for map
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
          attribution="&copy; OpenStreetMap contributors"
        />
        <TileLayer
          url={geeTileLayerUrl}
          maxZoom={13}
          attribution="&copy; Google Earth Engine"
        />
      </MapContainer>
      <Legend />
    </div>
  );
};

// Legend Component
const Legend = () => {
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
  const years = Array.from({ length: 22 }, (_, i) => 2001 + i);

  return (
    <div
      className="absolute top-4 left-4 bg-slate-700 p-4 rounded shadow-lg text-white"
      style={{ zIndex: 9999 }} // High z-index to keep legend above map layers
    >
      <strong className="block mb-2">Year of Forest Loss</strong>
      <div className="grid grid-cols-2 gap-1">
        {years.map((year, index) => (
          <div key={index} className="flex items-center mb-1">
            <span
              style={{
                display: "inline-block",
                width: "20px",
                height: "20px",
                backgroundColor: colors[index],
                marginRight: "8px",
              }}
            ></span>
            {year}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MapComponent;
