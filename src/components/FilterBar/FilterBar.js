import React, { Component } from "react";
import PropTypes from "prop-types";
import FuelTypes from "../FuelTypes";
import Location from "../Location";
import "./FilterBar.css";

class FilterBar extends Component {
  render() {
    const { handleLocationChange, handleFuelChange } = this.props;
    return (
      <div className="FilterBar">
        <Location
          placeHolder="Enter Location"
          currentValue=""
          handleLocationChange={handleLocationChange}
        />
        <FuelTypes selectedFuelType="E85" handleFuelChange={handleFuelChange} />
      </div>
    );
  }
}

FilterBar.propTypes = {
  handleLocationChange: PropTypes.func.isRequired,
  handleFuelChange: PropTypes.func.isRequired
};

export default FilterBar;
