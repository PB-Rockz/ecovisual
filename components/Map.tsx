"use client";
import React, { useEffect } from "react";
import { MapContainer, TileLayer, LayersControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const { BaseLayer, Overlay } = LayersControl;

const Map = ({ selectedYear }: { selectedYear: string }) => {
  const forestLossLayerUrl = `https://earthengine.googleapis.com/v1/projects/ee-adityabarunwork/maps/da0816574742b1add6b8d3881425093f-525f4ad368f76eabd80fb2941aa3c04e/tiles/{z}/{x}/{y}`;

  useEffect(() => {
    if (selectedYear) {
      console.log(`Map updated for year: ${selectedYear}`);
      // Handle dynamic updates to the map based on selectedYear
    }
  }, [selectedYear]);

  return (
    <MapContainer
      center={[0, 0]}
      zoom={3}
      minZoom={2}
      maxZoom={13}
      style={{ height: "100%", width: "100%" }}
    >
      <LayersControl position="topright">
        <BaseLayer checked name="OpenStreetMap">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
        </BaseLayer>
        <BaseLayer name="Satellite">
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            attribution="&copy; Esri"
          />
        </BaseLayer>
        <Overlay checked name="Forest Loss">
          <TileLayer
            url={forestLossLayerUrl}
            attribution="&copy; Google Earth Engine, Hansen/UMD/Google/USGS/NASA"
            maxZoom={13}
            opacity={0.7}
          />
        </Overlay>
      </LayersControl>
    </MapContainer>
  );
};

export default Map;
