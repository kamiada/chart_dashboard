import React, { Component } from "react";
import Header from "./components/Header";
import Barchart from "./components/Barchart";
import Subpage from "./components/Subpage";
import "./components/components.scss";
import euStaticData from "./EUcovidData.json";
import Filter from "./components/Filter";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      chosenFilter: "APIdata",
    };
    this.loadStaticData = this.loadStaticData.bind(this);
  }
  loadStaticData(array) {
    this.setState({
      data: array
    })
  };
  filterPerCountry(array) {
    let initCountriesList = [];
    array.forEach(item => {
      if(!initCountriesList.includes(item.countriesAndTerritories)) {
        initCountriesList.push(item.countriesAndTerritories);
      }
    })
  }
  getNumbOfDeathsPerMonth(){

  }
  getNumbOfCasesPerMonth(){
    
  }
  componentDidMount(){
    this.filterPerCountry(euStaticData.records);
  }

  render() {
    return (
      <div>
        <Header />
        <Subpage />
        <div className="container">
          {this.state.data && this.state.data.length > 0 ? (
            <div>
              <Barchart label="Number of casess" data={this.state.data.cases_weekly} />
            </div>
          ) : (
            <div>Loading data...</div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
