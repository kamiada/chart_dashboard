import React, { Component } from "react";
import Header from "./components/Header";
import Barchart from "./components/Barchart";
import Subpage from "./components/Subpage";
import "./components/components.scss";
import euStaticData from "./EUcovidData.json";
import Dropdown from "react-dropdown";
import { Multiselect } from "multiselect-react-dropdown";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFilters: [],
      selectedCountries: null,
      selecteMonth: null,
      selectedValue: [],
      filterCountries: [],
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.setState({
      filterCountries: this.getCountries(euStaticData.records),
    });
  }

  loadStaticData = (array) => {
    this.setState({
      data: array,
    });
  };
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
          options={this.getCountries(euStaticData.records)}
          value={selectedCountries}
          placeholder="countries."
          onChange={this.handleChange}
        />
        <Multiselect
          className="dropdown"
          options={this.state.filterCountries} // Options to display in the dropdown
          selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
          onSelect={this.onSelect} // Function will trigger on select event
          onRemove={this.onRemove} // Function will trigger on remove event
          displayValue="countries." // Property name to display in the dropdown options
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
