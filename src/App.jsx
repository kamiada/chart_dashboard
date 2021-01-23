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
  componentDidMount(){
    var text = {
      "records":[
         {
            "dateRep":"11/01/2021",
            "year_week":"2021-01",
            "cases_weekly":675,
            "deaths_weekly":71,
            "countriesAndTerritories":"Afghanistan",
            "geoId":"AF",
            "countryterritoryCode":"AFG",
            "popData2019":38041757,
            "continentExp":"Asia",
            "notification_rate_per_100000_population_14-days":"4.15"
         },
         {
            "dateRep":"04/01/2021",
            "year_week":"2020-53",
            "cases_weekly":902,
            "deaths_weekly":60,
            "countriesAndTerritories":"Afghanistan",
            "geoId":"AF",
            "countryterritoryCode":"AFG",
            "popData2019":38041757,
            "continentExp":"Asia",
            "notification_rate_per_100000_population_14-days":"7.61"
         }
      ]
   };
    const staticData = JSON.parse(text);
    this.loadStaticData(staticData);
    console.log(staticData);
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
