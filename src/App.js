import React, { Fragment } from "react";
import Header from "./components/Header";
import Doughnut from "./components/Doughnut";
import Barchart from "./components/Barchart";
import RadarChart from "./components/RadarChart";
import BubbleChart from "./components/BubbleChart";
import Subpage from "./components/Subpage";
import "./components/components.scss";
import axios from 'axios';



const endpoint = (
    'https://api.coronavirus.data.gov.uk/v1/data?' +
    'filters=areaType=nation;areaName=england&' +
    'structure={"date":"date","newCases":"newCasesByPublishDate"}'
);


const getData = async ( url ) => {

    const { data, status, statusText } = await axios.get(url, { timeout: 10000 });

    if ( status >= 400 )
        throw new Error(statusText);

    return data

};  // getData


const main = async () => {

    const result = await getData(endpoint);

    console.log(result);

};  // main


main().catch(err => {
    console.error(err);
    process.exitCode = 1;
});

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
