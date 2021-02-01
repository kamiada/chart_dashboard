import React, { Component } from "react";
import Header from "./components/Header";
import Barchart from "./components/Barchart";
import Subpage from "./components/Subpage";
import "./components/components.scss";
import euStaticData from "./EUcovidData.json";
import Select from "react-select";
import makeAnimated from "react-select/animated";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFilters: [],
      selectedCountries: [],
      selectedMonths: [],
      selectedYears: [],
      selectedParameters: [],
      clicked: false,
    };
    this.getCountries = this.getCountries.bind(this);
    this.submit = this.submit.bind(this);
    this.addSelectedParameters = this.addSelectedParameters.bind(this);
    this.addSelectedCountries = this.addSelectedCountries.bind(this);
    this.addSelectedMonths = this.addSelectedMonths.bind(this);
    this.addSelectedYears = this.addSelectedYears.bind(this);
  }
  getCountries() {
    let results = [];
    euStaticData.records.forEach((item) => {
      if (
        !results.some((entry) => entry.value === item.countriesAndTerritories)
      ) {
        results.push({
          label: item.countriesAndTerritories,
          value: item.countriesAndTerritories,
        });
      }
    });
    return results;
  }
  getNumbOfDeathsPerMonth = (filter_where, array) => {
    let results = [];
    array.forEach((item) => {
      if (item.countriesAndTerritories === filter_where) {
        results.push(item.deaths_weekly);
      }
    });
    return results;
  };
  addSelectedParameters(value) {
    let parameters = [];
    if (!parameters.includes(value)) {
      parameters.push(value);
    }
    this.setState({
      selectedParameters: parameters,
    });
  }
  addSelectedCountries(value) {
    let countries = [];
    if (!countries.includes(value)) {
      countries.push(value);
    }
    this.setState({
      selectedCountries: countries,
    });
  }
  addSelectedMonths(value) {
    let months = [];
    if (!months.includes(value)) {
      months.push(value);
    }
    this.setState({
      selectedMonths: months,
    });
  }
  addSelectedYears(value) {
    let years = [];
    if (!years.includes(value)) {
      years.push(value);
    }
    this.setState({
      selectedYears: years,
    });
  }
  addFiltersIntoAnArray(value) {
    let selectedFilters = [];
    if (!selectedFilters.includes(value)) {
      selectedFilters.push([...value]);
    }
    return selectedFilters;
  }

  getResults = (filtersArray) => {
    const results = euStaticData.filter(data => data === filtersArray);
    return results;
  }

  submit = (array) => {
    //here array of arrays in which each has an object {label, value}, needs to be deconstructed into an array of 
    if(array.length >0){
      console.log('submit', array);
    } else { console.log('mope')}
  }

  render() {
    const { selectedParameters, selectedCountries, selectedMonths, selectedYears } = this.state;
    const selectedFiltersArray = [
      ...selectedParameters.concat(selectedCountries, selectedMonths, selectedYears)
    ]
    const countries = this.getCountries();
    const animatedComponents = makeAnimated();
    const months = [
      { label: "January", value: 1 },
      { label: "February", value: 2 },
      { label: "March", value: 3 },
      { label: "April", value: 4 },
      { label: "May", value: 5 },
      { label: "June", value: 6 },
      { label: "July", value: 7 },
      { label: "August", value: 8 },
      { label: "September", value: 9 },
      { label: "October", value: 10 },
      { label: "November", value: 11 },
      { label: "December", value: 12 },
    ];
    const years = [
      { label: "2020", value: 2020 },
      { label: "2021", value: 2021 },
    ];
    const parameters = [
      { label: "Number of cases", value: "cases_weekly" },
      { label: "Number of deaths", value: "deaths_weekly" },
    ];
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
            onChange={this.addSelectedParameters}
          />
          {/* country */}
          <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            options={countries}
            onChange={this.addSelectedCountries}
          />
          {/* month */}
          <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            options={months}
            onChange={this.addSelectedMonths}
          />
          {/* year */}
          <Select
            closeMenuOnSelect={true}
            components={animatedComponents}
            isMulti
            options={years}
            onChange={this.addSelectedYears}
          />
          <button className="submit_btn" onClick={() => this.submit(selectedFiltersArray)}>
            Search
          </button>
        </div>
        <div className="container">
          {selectedFiltersArray.length > 0 && this.state.clicked === true ? 
          <h2>
            charts will appear here
          </h2> :
          <h2>
            Pick filters and click submit to see charts
          </h2>
          }
        </div>
      </div>
    );
  }
}

export default App;
