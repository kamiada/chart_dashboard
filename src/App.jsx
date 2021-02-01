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
  //date format is always DD/MM/YYYY
  changeIntoMonth = str => str.substring(3, 5);
  
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

  getResults = (filtersObject) => {
    console.log(filtersObject[1].value);
    const results = euStaticData.records.filter(data => 
      data.countriesAndTerritories === filtersObject[1].value 
      &&
      this.changeIntoMonth(data.dateRep) === filtersObject[2].value
      );
    console.log(filtersObject);
    console.log('getResults', results);
    return results;
  }

  submit = (array) => {
    if(array.length > 0){
      this.getResults(array.flat());
      this.setState({
        clicked: true,
      })
    }
  }

  reset(){
    this.setState({
      clicked: false,
    })
  }

  render() {
    const { selectedParameters, selectedCountries, selectedMonths, selectedYears } = this.state;

    const selectedFiltersArray = [
      ...selectedParameters.concat(selectedCountries, selectedMonths, selectedYears)
    ]

    const countries = this.getCountries();
    const animatedComponents = makeAnimated();
    const months = [
      { label: "January", value: '01' },
      { label: "February", value: '02' },
      { label: "March", value: '03' },
      { label: "April", value: '04' },
      { label: "May", value: '05' },
      { label: "June", value: '06' },
      { label: "July", value: '07' },
      { label: "August", value: '08' },
      { label: "September", value: '09' },
      { label: "October", value: '10' },
      { label: "November", value: '11' },
      { label: "December", value: '12' },
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
          <button className="main_page_btn" onClick={() => this.submit(selectedFiltersArray)}>
            Search
          </button>
          {
            this.state.clicked === true && (
              <button className="main_page_btn" onClick={() => this.reset()}>Reset</button>
            )
          }
        </div>
        <div className="container">
          {selectedFiltersArray.length > 0 && this.state.clicked === true ? 
          <h2 className="info_titles">
            charts will appear here
          </h2> :
          <h2 className="info_titles">
            Pick filters and click submit to see charts
          </h2>
          }
        </div>
      </div>
    );
  }
}

export default App;
