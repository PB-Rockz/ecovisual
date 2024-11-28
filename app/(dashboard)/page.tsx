// import MapComponent from "@/components/MapComponent";
// import Image from "next/image";

// export default function Home() {
//   return (
//     <div>
//       <h1>GeoSpacial Data</h1>
//       <MapComponent />
//     </div>
//   );
// }

// File: /pages/index.js
"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import ForestDashboard from "@/components/ForestDashboard";
import Legend from "@/components/Legend";
import Map from "@/components/Map";

export default function Home() {
  const [selectedYear, setSelectedYear] = useState("");

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
    console.log("Selected year:", e.target.value);
  };

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen">
      <Head>
        <title>Global Forest Loss Visualization</title>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet/dist/leaflet.css"
        />
      </Head>
      <div className="container mx-auto px-4 py-6">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-green-400">
            Global Forest Loss Visualization
          </h1>
          <p className="text-gray-400 mt-2">
            Explore forest loss data from 2001 to 2022
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-3 bg-gray-800 shadow-md rounded-lg overflow-hidden">
            <Map selectedYear={selectedYear} />
          </div>

          <div className="bg-gray-800 shadow-md rounded-lg p-4">
            <Legend
              selectedYear={selectedYear}
              onYearChange={handleYearChange}
            />
          </div>
        </div>

        <ForestDashboard />
      </div>
    </div>
  );
}
