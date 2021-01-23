//takes in two props and displays them, in App props are supplied to filter, state checks in App picks which one
// was picked by the user

import React from "react";
import "./components.scss";
import Dropdown from "react-dropdown";

const Filter = () => (
  <Dropdown
    options={this.props.option}
    onChange={this._onSelect}
    value={this.props.defaultOption}
    placeholder="Select an option"
  />
);
export default Filter;
