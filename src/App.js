import React, { Fragment } from "react";
import Header from "./components/Header";
import Doughnut from "./components/Doughnut";
import Barchart from "./components/Barchart";
import RadarChart from "./components/RadarChart";
import BubbleChart from "./components/BubbleChart";
import Subpage from "./components/Subpage";
import "./components/components.scss";

const API = 'https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=nation;areaName=england&structure=%7B%22name%22:%22areaName%22%7D';

function fetchData(api) {
  return fetch(api)
  .then(message =>
    console.log(message)
  )
  .catch(error => console.error(error));
}

function App() {
  fetchData(API);
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
