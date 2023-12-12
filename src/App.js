import React from "react";
import "./App.css";
import SidePanel from "./Components/SidePanel";
import MapView from "./Components/MapView";

function App() {
  return (
    <div className="App">
      <div className="App-left">
        <SidePanel />
      </div>

      <div className="App-right">
        <h2>Map</h2>
        {/*  */}

        <MapView />

        <h2>Chart</h2>
        {/* Chart.js */}
      </div>
    </div>
  );
}

export default App;
