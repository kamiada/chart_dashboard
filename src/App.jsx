import React, { Component } from "react";
import Header from "./components/Header";
import Barchart from "./components/Barchart";
import Subpage from "./components/Subpage";
import "./components/components.scss";
import axios from 'axios';

const endpoint = (
  'https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=nation;areaName=scotland&structure={"date":"date","name":"areaName","code":"areaCode","cases":{"daily":"newCasesByPublishDate","cumulative":"cumCasesByPublishDate"},"deaths":{"daily":"newDeathsByDeathDate","cumulative":"cumDeathsByDeathDate"}}'
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
    data: []
  }
  async componentDidMount(){
      const response = await getData(EUendpoint);
      let APIdata = await response;
      this.setState({
        data: APIdata,
      })
      console.log(this.state.data);
  }
  render(){
    return (
      <div>
        <Header />
        <Subpage />
        <div className="container">
          {!this.state.data ? <div>Loading data...</div> : 
         <Barchart label='Number of coronavirus cases' labels={[this.state.data.areaCode,'cumDeathsByDeathDate']} data={[this.state.data.deathPerDay, this.state.data.newCases]} />
          }
        </div>
      </div>
    );
  }
}

export default App;
