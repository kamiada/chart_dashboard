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
    };
    this.handleChange = this.handleChange.bind(this);
    this.addSelectedFilters = this.addSelectedFilters.bind(this);
    this.getCountries = this.getCountries.bind(this);
  }
  getCountries() {
    let results = [];
    euStaticData.records.forEach((item) => {
      if (!results.some(entry => entry.value === item.countriesAndTerritories)) {
        results.push({ label: item.countriesAndTerritories, value: item.countriesAndTerritories});
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
  addSelectedFilters(value){
    this.setState({ selectedFilters: [...value] });
    console.log(this.state.selectedFilters);
  }
  submit(){

  }
  render() {
    const { selectedFilters} = this.state;
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
      {label: 'Number of cases', value: "cases_weekly"},
      {label: 'Number of deaths', value: "deaths_weekly"}
    ]
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
          onChange={this.addSelectedFilters}
        />
        {/* country */}
        <Select
          closeMenuOnSelect={false}
          components={animatedComponents}
          isMulti
          options={countries}
          onChange={this.addSelectedFilters}
        />
        {/* month */}
        <Select
          closeMenuOnSelect={false}
          components={animatedComponents}
          isMulti
          options={months}
          onChange={this.addSelectedFilters}
        />
        {/* year */}
        <Select
          closeMenuOnSelect={true}
          components={animatedComponents}
          isMulti
          options={years}
          onChange={this.addSelectedFilters}
        />
        <button className="submit_btn" onClick={this.submit}>
          Search
        </button>
        </div>
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
