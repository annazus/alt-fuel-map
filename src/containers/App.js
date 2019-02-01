import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { fetchStationsNearMe } from "../actions/altFuelStation";
import GoogleMap from "../components/GoogleMap";

import { getCurrentLocation } from "../utils";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentLocation: { lat: -25.344, lng: 131.036 },
      googleMaps: undefined,
      map: undefined
    };
  }
  onGoogleMapsLoaded = (googleMaps, map) => {
    this.setState({ ...{ googleMaps: googleMaps, map: map } });

    googleMaps.event.addListener(map, "click", event => {
      this.addMarker(event.latLng, map);
    });
  };

  setCurrentLocation = position => {
    console.log(position.coords.latitude);
    this.setState({
      ...{
        currentLocation: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      }
    });

    fetchStationsNearMe(
      this.state.currentLocation.lat,
      this.state.currentLocation.lng
      // this.setMarkers
    );

    if (this.state.map) {
      this.state.map.setCenter({
        lat: this.state.currentLocation.lat,
        lng: this.state.currentLocation.lng
      });
    }
  };

  setMarkers = markers => {
    console.log(markers.fuel_stations);

    markers.fuel_stations.map(item => {
      this.addMarker(
        { lat: item.latitude, lng: item.longitude },
        this.state.map
      );
    });
  };

  componentDidMount() {
    getCurrentLocation(this.setCurrentLocation);
  }
  // Adds a marker to the map.
  addMarker = (location, map) => {
    // Add the marker at the clicked location
    const marker = new this.state.googleMaps.Marker({
      position: location,
      map: this.state.map
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Display alternative fuel stations near me.</p>
        </header>
        <div className="App-container">
          <GoogleMap
            yourAPI_Key={process.env.REACT_APP_GOOGLE_MAP_API_KEY}
            initialSetting={{
              zoom: 12,
              center: {
                lat: this.state.currentLocation.lat,
                lng: this.state.currentLocation.lng
              }
            }}
            callback={this.onGoogleMapsLoaded}
          />
        </div>
      </div>
    );
  }
}

export default App;
