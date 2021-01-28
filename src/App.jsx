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
  handleChange = (selectedMonth) => {
    this.setState({ selectedMonth }, () =>
      console.log(`Option selected:`, this.state.selectedMonth)
    );
  };
  handleInputChange(value){
    let filters = [];
    filters.push(value);
    console.log(filters);
  }

  render() {
    const { selectedMonth, selectedYear, selectedCountries } = this.state;
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
    return (
      <div>
        <Header />
        <Subpage />
        <Select
          closeMenuOnSelect={false}
          label='countries.'
          components={animatedComponents}
          defaultValue={[years[0]]}
          isMulti
          options={years}
          onChange={this.handleInputChange}
        />
        <Select
          closeMenuOnSelect={false}
          components={animatedComponents}
          defaultValue={[months[0]]}
          isMulti
          options={months}
          onChange={this.handleInputChange}
        />
        <Select
          closeMenuOnSelect={false}
          components={animatedComponents}
          defaultValue={[years[0]]}
          isMulti
          options={years}
          onChange={this.handleInputChange}
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
