import React, { Component } from "react";
import Header from "./components/Header";
import Barchart from "./components/Barchart";
import Subpage from "./components/Subpage";
import "./components/components.scss";
import axios from "axios";
import euStaticData from './EUcovidData.json';
import Filter from './components/Filter';

const endpoint =
  'https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=nation;areaName=scotland&structure={"date":"date","name":"areaName","code":"areaCode","cases":{"daily":"newCasesByPublishDate","cumulative":"cumCasesByPublishDate"},"deaths":{"daily":"newDeathsByDeathDate","cumulative":"cumDeathsByDeathDate"}}';
const getData = async (url) => {
  const { data, status, statusText } = await axios.get(url, { timeout: 10000 });
  if (status >= 400) throw new Error(statusText);
  return data;
};
class App extends Component {
  state = {
    data: [],
    chosenFilter: 'APIdata',
  };
  async componentDidMount() {
    const response = await getData(endpoint);
    let APIdata = await response.data;
    this.setState({
      data: APIdata,
    });
    console.log(this.state.data[0].name);
  }
  render() {
    return (
      <div>
        <Header />
        <Subpage />
        <Filter filter= {this.state.chosenFilter + '. '} />
        <div className="container">
          {!this.state.data ? (
            <div>Loading data...</div>
          ) : (
            <div>tss</div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
