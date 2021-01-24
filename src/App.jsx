import React, { Component } from "react";
import Header from "./components/Header";
import Barchart from "./components/Barchart";
import Subpage from "./components/Subpage";
import "./components/components.scss";
import euStaticData from "./EUcovidData.json";
import Dropdown from "react-dropdown";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      chosenFilter: "APIdata",
    };
    this.loadStaticData = this.loadStaticData.bind(this);
  }
  loadStaticData = (array) => {
    this.setState({
      data: array,
    });
  };
  filterPerCountry = (array) => {
    let results = [];
    array.forEach((item) => {
      if (!results.includes(item.countriesAndTerritories)) {
        results.push(item.countriesAndTerritories);
      }
    });
    return results;
  };
  getNumbOfDeathsPerMonth = (filter_where, array) => {
    let results = [];
    array.forEach((item) => {
      if (item.countriesAndTerritories === filter_where) {
        results.push(item.deaths_weekly);
      }
    });
    return results;
  };
  getNumbOfCasesPerMonth = () => {};

  addFilter = (item1) => {
    //when user picks filter, adds it here to the list, list after button apply is clicked runs other functions and sends array of results to charts
    return console.log("clicked" + item1);
  };

  componentDidMount() {
    this.filterPerCountry(euStaticData.records);
    this.getNumbOfDeathsPerMonth("Poland", euStaticData.records);
  }

  render() {
    return (
      <div>
        <Header />
        <Subpage />
        <Dropdown
          className="dropdown"
          options={this.filterPerCountry(euStaticData.records)}
          value="countries."
          placeholder="Select an option"
          onChange={this.addFilter(this.value)}
        />
        <div className="container">
          {this.state.data && this.state.data.length > 0 ? (
            <div>
              <Barchart
                label="Number of casess"
                data={this.state.data.cases_weekly}
              />
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
