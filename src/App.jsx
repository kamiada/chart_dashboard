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
      selectedFilters: [],
      selectedCountries: null,
      selecteMonth: null,
    };
    this.handleChange = this.handleChange.bind(this);
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
  handleChange = (selectedCountries) => {
    this.setState({ selectedCountries }, () =>
      console.log(`Option selected:`, this.state.selectedCountries)
    );
  };

  render() {
    const { selectedCountries, selectedMonth } = this.state;
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return (
      <div>
        <Header />
        <Subpage />
        <Dropdown
          className="dropdown"
          options={months}
          value={selectedMonth}
          placeholder="months."
          onChange={console.log(selectedMonth)}
        />

        <Dropdown
          className="dropdown"
          options={this.filterPerCountry(euStaticData.records)}
          value={selectedCountries}
          placeholder="countries."
          onChange={this.handleChange}
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
            ""
          )}
        </div>
      </div>
    );
  }
}

export default App;
