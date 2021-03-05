import React, { Component, Fragment } from "react";
import Header from "./components/Header";
import { Barchart, Doughnut, BubbleChart } from "./components";
import Subpage from "./components/Subpage";
import "./components/components.scss";
import euStaticData from "./EUcovidData.json";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { months, years, parameters } from "./constants";

const removeDuplicates = (array) => {
  let sorted_arr = array.slice().sort();
  let results = [];
  for (let i = 0; i < sorted_arr.length - 1; i++) {
    if (sorted_arr[i + 1] === sorted_arr[i]) {
      results.push(sorted_arr[i]);
    }
  }
  return sorted_arr;
};
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFilters: {
        parameters: [],
        country: [],
        month: [],
        year: [],
      },
      results: {
        type: [],
        number: [],
        countries: [],
        dates: [],
      },
      clicked: false,
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
  changeIntoYear = (str) => str.substring(6, 10);
  //check duplicates
  checkDuplicates = (arrayToCheck, valueToCheck) =>
    arrayToCheck.includes(valueToCheck);

  addFiltersIntoAnArray(value) {
    const unique_value = removeDuplicates(value.flat());
    unique_value.forEach((element) => {
      if (element.type === "parameters") {
        if (
          !this.checkDuplicates(
            this.state.selectedFilters.parameters,
            element.value
          )
        ) {
          this.state.selectedFilters.parameters.push(element.value);
        }
      }
      if (element.type === "country") {
        if (
          !this.checkDuplicates(
            this.state.selectedFilters.country,
            element.value
          )
        ) {
          this.state.selectedFilters.country.push(element.value);
        }
      }
      if (element.type === "month") {
        if (
          !this.checkDuplicates(this.state.selectedFilters.month, element.value)
        ) {
          this.state.selectedFilters.month.push(element.value);
        }
      }
      if (element.type === "year") {
        if (
          !this.checkDuplicates(this.state.selectedFilters.year, element.value)
        ) {
          this.state.selectedFilters.year.push(element.value);
        }
      }
    });
  }

  getResults = (filtersObject) => {
    const results = euStaticData.records.filter(
      (data) =>
      filtersObject.country.includes(data.countriesAndTerritories) &&
      filtersObject.month.includes(this.changeIntoMonth(data.dateRep))
    );
    results.forEach((value) => {
      if (value.dateRep) {
        this.state.results.dates.push(value.dateRep);
      }
      if (value.countriesAndTerritories) {
        if (
          !this.checkDuplicates(
            this.state.results.countries,
            value.countriesAndTerritories
          )
        ) {
          this.state.results.countries.push(value.countriesAndTerritories);
        }
      }
      if (this.checkDuplicates(filtersObject.parameters, "cases_weekly")) {
        this.state.results.number.push(value.cases_weekly);
        if (
          !this.checkDuplicates(
            this.state.results.type,
            "Number of Cases Weekly"
          )
        ) {
          this.state.results.type.push("Number of Cases Weekly");
        }
      }
      if (this.checkDuplicates(filtersObject.parameters, "deaths_weekly")) {
        this.state.results.number.push(value.deaths_weekly);
        if (
          !this.checkDuplicates(
            this.state.results.type,
            "Number of Deaths Weekly"
          )
        ) {
          this.state.results.type.push("Number of Deaths Weekly");
        }
      }
      if (
        this.checkDuplicates(filtersObject.parameters, "cases_weekly") &&
        this.checkDuplicates(filtersObject.parameters, "deaths_weekly")
      ) {
        this.state.results.number.push(value.cases_weekly);
        this.state.results.number.push(value.deaths_weekly);
        if (
          !this.checkDuplicates(
            this.state.results.type,
            "Number of Deaths Weekly"
          ) &&
          !this.checkDuplicates(
            this.state.results.type,
            "Number of Cases Weekly"
          )
        ) {
          this.state.results.type.push("Number of Deaths and Cases Weekly");
        }
      }
    });
    console.log(this.state.results.number);
    console.log(this.state.results, "state");
  };

  submit = (filters) => {
    if (
      filters.parameters.length > 0 &&
      filters.country.length > 0 &&
      filters.month.length > 0 &&
      filters.year.length > 0
    ) {
      this.getResults(filters);
      this.setState({
        clicked: true,
      });
    }
  };

  reset() {
    this.setState({
      selectedFilters: {
        parameters: [],
        country: [],
        month: [],
        year: [],
      },
      results: {
        type: [],
        number: [],
        countries: [],
        dates: [],
      },
      clicked: false,
    });
  }

  render() {
    const countries = this.getCountries();
    const animatedComponents = makeAnimated();
    const { selectedFilters, results, clicked } = this.state;
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
            onClick={() => this.submit(selectedFilters)}
          >
            Search
          </button>

          {this.state.clicked === true && (
            <button className="main_page_btn" onClick={() => this.reset()}>
              Reset
            </button>
          )}
        </div>
        {/*<Barchart labels={['test', 'test']} label={results.countries} data={[123, 45, 89]} /> */}
        <div className="container">
          {clicked === true ? (
            results ? (
              <Fragment>
              <Barchart
                labels={results.dates}
                label={`${results.countries}, ${results.type}`}
                data={results.number}
              />
              <Doughnut 

              />
              <BubbleChart />
              </Fragment>
            ) : (
              "Please check if you picked all the filters before submitting"
            )
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

export default App;
