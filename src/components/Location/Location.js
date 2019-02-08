import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Location.css";
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
      <span class="Location">
        <input
          type="text"
          placeholder={placeholder}
          onBlur={this.onLocationChange}
          className="TextInput"
        />
        <button
          onClick={() => {
            handleLocationChange(this.state.currentLocation);
          }}
          className="LocationSearch"
        >
          <i class="material-icons SearchIcon">search</i>
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
