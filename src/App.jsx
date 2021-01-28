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
      selectedCountries: [],
      selectedMonth: null,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  getCountries = (array) => {
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
  onSelect(selectedList, selectedItem) {}

  onRemove(selectedList, removedItem) {}

  render() {
    const { selectedCountries, selectedMonth } = this.state;
    const months = [
      { label: 'January', value: 1},
      { label: 'February', value: 2},
      { label: 'March', value: 3},
      { label: 'April', value: 4},
      { label: 'May', value: 5},
      { label: 'June', value: 6},
      { label: 'July', value: 7},
      { label: 'August', value: 8},
      { label: 'September', value: 9},
      { label: 'October', value: 10},
      { label: 'November', value: 11},
      { label: 'December', value: 12},
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
