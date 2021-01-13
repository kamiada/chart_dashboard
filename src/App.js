import React, { Fragment } from "react";
import Header from "./components/Header";
import Doughnut from "./components/Doughnut";
import Barchart from "./components/Barchart";
import RadarChart from "./components/RadarChart";
import BubbleChart from "./components/BubbleChart";
import Subpage from "./components/Subpage";
import "./components/components.scss";
function App() {
  return (
    <div>
      <Header />
      <div className="container">
        <Doughnut />
        <Barchart />
        <RadarChart />
        <BubbleChart />
      </div>
    </div>
  );
}

export default App;
