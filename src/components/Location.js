import React, { Component } from "react";
import PropTypes from "prop-types";

class Location extends Component {
  constructor(props) {
    super(props);
    this.state = { currentLocation: "" };
  }

  onLocationChange = evt => {
    this.setState({ currentLocation: evt.target.value });
  };
  render() {
    const { placeholder, handleLocationChange } = this.props;
    return (
      <span>
        <input
          type="text"
          placeholder={placeholder}
          onBlur={this.onLocationChange}
        />
        <button
          onClick={() => {
            handleLocationChange(this.state.currentLocation);
          }}
        >
          <i class="material-icons">search</i>
        </button>
      </span>
    );
  }
}

Location.propTypes = {
  placeholder: PropTypes.string.isRequired,
  handleLocationChange: PropTypes.func.isRequired
};
export default Location;
