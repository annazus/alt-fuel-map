import React, { Component } from "react";
import PropTypes from "prop-types";
import loadGoogleMaps from "../actions/googleMap";

class GoogleMap extends Component {
  componentDidMount() {
    loadGoogleMaps(this.props.yourAPI_Key, () => {
      var map = new window.google.maps.Map(
        document.getElementById("map"),
        this.props.initialSetting
      );
      if (this.props.callback) this.props.callback(window.google.maps, map);
    });
  }
  render() {
    return (
      <div id="map" style={{ width: "100%", height: "100%" }}>
        {/* <span>{this.props.initialSetting.center.lat}</span> */}
      </div>
    );
  }
}
GoogleMap.propTypes = {
  initialSetting: PropTypes.object,
  yourAPI_Key: PropTypes.string,
  callback: PropTypes.func
};
export default GoogleMap;
