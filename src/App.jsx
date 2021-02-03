import React, { Component } from "react";
import Header from "./components/Header";
import Barchart from "./components/Barchart";
import Subpage from "./components/Subpage";
import "./components/components.scss";
import euStaticData from "./EUcovidData.json";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const months = [
  { type: "month", label: "January", value: "01" },
  { type: "month", label: "February", value: "02" },
  { type: "month", label: "March", value: "03" },
  { type: "month", label: "April", value: "04" },
  { type: "month", label: "May", value: "05" },
  { type: "month", label: "June", value: "06" },
  { type: "month", label: "July", value: "07" },
  { type: "month", label: "August", value: "08" },
  { type: "month", label: "September", value: "09" },
  { type: "month", label: "October", value: "10" },
  { type: "month", label: "November", value: "11" },
  { type: "month", label: "December", value: "12" },
];
const years = [
  { type:"year", label: "2020", value: 2020 },
  { type:"year", label: "2021", value: 2021 },
];
const parameters = [
  { type: "parameter", label: "Number of cases", value: "cases_weekly" },
  { type: "parameter", label: "Number of deaths", value: "deaths_weekly" },
];


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFilters: [],
      clicked: false,
      resultsArray: [],
    };
    this.getCountries = this.getCountries.bind(this);
    this.submit = this.submit.bind(this);
    this.getResults = this.getResults.bind(this);
    this.addFiltersIntoAnArray = this.addFiltersIntoAnArray.bind(this);
  }
  getCountries() {
    let results = [];
    euStaticData.records.forEach((item) => {
      if (
        !results.some((entry) => entry.value === item.countriesAndTerritories)
      ) {
        results.push({
          type: "country",
          label: item.countriesAndTerritories,
          value: item.countriesAndTerritories,
        });
      }
    });
    return results;
  }
  //date format is always DD/MM/YYYY
  changeIntoMonth = (str) => str.substring(3, 5);

  addFiltersIntoAnArray(value) {
    const isSelected = this.state.selectedFilters.includes(value);
    const newSelection = isSelected
    ? this.state.selectedFilters.filter(currentValue => currentValue !== value)
    : [...this.state.selectedFilters, value];
    this.setState({
      selectedFilters: newSelection,
    });
  };

  getResults = (filtersObject) => {
    const results = euStaticData.records.filter(
      (data) =>
        data.countriesAndTerritories === filtersObject[1].value &&
        this.changeIntoMonth(data.dateRep) === filtersObject[2].value
    );
    return results;
  };

  submit = (array) => {
    if (array.length > 0) {
      this.getResults(array.flat());
      this.setState({
        clicked: true,
      });
    }
  };

  reset() {
    this.setState({
      clicked: false,
    });
  }

  render() {
    const countries = this.getCountries();
    const animatedComponents = makeAnimated();
    const { selectedFilters } = this.state;

    return (
      <div>
        <Header />
        <Subpage />
        <div className="container-dropdown">
          {/* parameters: number of cases (monthly), number of deaths (monthly) */}
          <Select
            closeMenuOnSelect={true}
            components={animatedComponents}
            isMulti
            options={parameters}
            onChange={this.addFiltersIntoAnArray}
          />
          {/* country */}
          <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            options={countries}
            onChange={this.addFiltersIntoAnArray}
          />
          {/* month */}
          <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            options={months}
            onChange={this.addFiltersIntoAnArray}
          />
          {/* year */}
          <Select
            closeMenuOnSelect={true}
            components={animatedComponents}
            isMulti
            options={years}
            onChange={this.addFiltersIntoAnArray}
          />
          <button
            className="main_page_btn"
            onClick={()=>console.log('',selectedFilters)}
          >
            Search
          </button>
          {this.state.clicked === true && (
            <button className="main_page_btn" onClick={() => this.reset()}>
              Reset
            </button>
          )}
        </div>
        <div className="container">
          {/* {selectedFiltersArray.length > 0 && this.state.clicked === true ? (
            <Barchart />
          ) : (
            <h2 className="info_titles">
              Pick filters and click submit to see charts
            </h2>
          )} */}
        </div>
      </div>
    );
  }
}

export default App;
