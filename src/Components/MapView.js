import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapView = () => {
  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      style={{
        height: "500px",
        width: "1000px",
        boxShadow: "0 0 10px rgba(200, 200, 200, 2",
      }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    </MapContainer>
  );
};

export default MapView;
