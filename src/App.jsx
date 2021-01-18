import React, { Component, Fragment } from "react";
import Header from "./components/Header";
import Doughnut from "./components/Doughnut";
import Barchart from "./components/Barchart";
import RadarChart from "./components/RadarChart";
import BubbleChart from "./components/BubbleChart";
import Subpage from "./components/Subpage";
import "./components/components.scss";
import axios from 'axios';

const endpoint = (
  'https://api.coronavirus.data.gov.uk/v1/data?/v1/data?filters=areaType=nation;areaName=scotland&structure={"date":"date","areaName":"areaName","areaCode":"areaCode","newCasesByPublishDate":"newCasesByPublishDate","cumCasesByPublishDate":"cumCasesByPublishDate","newDeathsByDeathDate":"newDeathsByDeathDate","cumDeathsByDeathDate":"cumDeathsByDeathDate"}'
);
const getData = async ( url ) => {
    const { data, status, statusText } = await axios.get(url, { timeout: 10000 });
    if ( status >= 400 )
        throw new Error(statusText);
    return data
};

class App extends Component {
  state = {
    loading: true,
    data: '',
    deathPerDay: [],
    newCases: [],
  }
  async componentDidMount(){
      const response = await getData(endpoint);
      const APIdata = await response;
      console.log(APIdata.data[0]);
      this.setState({
        data: APIdata.data[0].areaName,
        deathPerDay: APIdata.data[0].cumDeathsByDeathDate,
        newCases: APIdata.data[0].newCasesByPublishDate,
      })
      console.log(this.state.newCases);
  }
  render(){
    return (
      <div>
        <Header />
        <div className="container">
          {!this.state.data ? <div>Loading data...</div> : 
         <Barchart label={this.state.data} data={[this.state.deathPerDay, this.state.newCases]} />
          }
        </div>
      </div>
    );
  }
}

export default App;
