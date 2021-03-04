import React, { Component } from "react";
import Header from "./components/Header";
import Barchart from "./components/Barchart";
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
      selectedFilters: [
        {
          parameters: [],
          country: [],
          month: [],
          year: [],
        },
      ],
      objectFilters: {
        parameters: [],
        country: [],
        month: [],
        year: [],
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

  addFiltersIntoAnArray(value) {
    //the output is [{type: 'blabla', label:'blabla', value: 'cases_weekly' }] - so I only care about value
    const unique_value = removeDuplicates(value.flat());

    const newSelection = unique_value.forEach((element) => {
      if (element.type === "parameters") {
        if (!this.state.objectFilters.parameters.includes(element.value)) {
          this.state.objectFilters.parameters.push(element.value);
        }
      }
      if (element.type === "country") {
        if (!this.state.objectFilters.country.includes(element.value)) {
          this.state.objectFilters.country.push(element.value);
        }
      }
      if (element.type === "month") {
        if (!this.state.objectFilters.month.includes(element.value)) {
          this.state.objectFilters.month.push(element.value);
        }
      }
      if (element.type === "year") {
        if (!this.state.objectFilters.year.includes(element.value)) {
          this.state.objectFilters.year.push(element.value);
        }
      }
      console.log(this.state.objectFilters);
    });

    // const isSelected = this.state.selectedFilters.includes(unique_value); //gives back true or false, checks if state holds the value in

    // const newSelection = isSelected
    //   ? this.state.selectedFilters.filter(
    //       (currentValue) => currentValue !== unique_value
    //     )
    //   : [...this.state.selectedFilters, unique_value];
    // this.setState({
    //   selectedFilters: newSelection,
    // });
  }

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
    // console.log(selectedFilters);
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
            onClick={() => console.log("", selectedFilters)}
          >
            Search
          </button>
          {this.state.clicked === true && (
            <button className="main_page_btn" onClick={() => this.reset()}>
              Reset
            </button>
          )}
        </div>
        <div className="container"></div>
      </div>
    );
  }
}

export default App;
