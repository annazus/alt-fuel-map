import React, { Component } from "react";
import PropTypes from "prop-types";
import FuelTypes from "./FuelTypes";
import Location from "./Location";
export default class FilterBar extends Component {
  render() {
    const { handleLocationChange, handleFuelChange } = this.props;
    return (
      <div>
        <div>
          <div>
            <Location
              placeHolder="Enter Location"
              currentValue=""
              handleLocationChange={handleLocationChange}
            />
            <FuelTypes
              selectedFuelType="E85"
              handleFuelChange={handleFuelChange}
            />
          </div>
          {/* <div>
            <Location
              placeHolder="Enter Location"
              handleLocationChange={handleLocationChange}
            />
          </div>
          <button>Map a route</button> */}
        </div>
      </div>
    );
  }
}

FilterBar.propTypes = {
  handleLocationChange: PropTypes.func.isRequired,
  handleFuelChange: PropTypes.func.isRequired
};
