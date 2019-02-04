import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { fetchStationsNearMe } from "../actions/altFuelStation";
import GoogleMap from "../components/GoogleMap";
import { connect } from "react-redux";
import { dispatch, bindActionCreators } from "redux";
// import { getCurrentLocation } from "../utils";
import * as currentLocationActions from "../actions/currentLocation";
import currentLocationReducer from "../reducers/currentLocationReducer";
import altFuelReducers from "../reducers/altFuelReducers";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // currentLocation: { lat: -25.344, lng: 131.036 },
      googleMaps: undefined,
      map: undefined
    };
  }

  onGoogleMapsLoaded = (googleMaps, map) => {
    // this.setState({ ...{ googleMaps: googleMaps, map: map } });
    // googleMaps.event.addListener(map, "click", event => {
    //   this.addMarker(event.latLng, map);
    // });
  };

  // setCurrentLocation = position => {
  //   console.log(position.coords.latitude);
  //   this.setState({
  //     ...{
  //       currentLocation: {
  //         lat: position.coords.latitude,
  //         lng: position.coords.longitude
  //       }
  //     }
  //   });

  //   fetchStationsNearMe(
  //     this.state.currentLocation.lat,
  //     this.state.currentLocation.lng
  //     // this.setMarkers
  //   );

  //   // if (this.state.map) {
  //   //   this.state.map.setCenter({
  //   //     lat: this.state.currentLocation.lat,
  //   //     lng: this.state.currentLocation.lng
  //   //   });
  //   // }
  // };

  setMarkers = markers => {
    console.log(markers.fuel_stations);

    markers.fuel_stations.map(item => {
      this.addMarker(
        { lat: item.latitude, lng: item.longitude },
        this.state.map
      );
    });
  };

  componentWillMount() {
    this.props.locationActions.requestCurrentLocation();
  }

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
            callback={this.onGoogleMapsLoaded}
            initialSetting={{
              zoom: 12,
              center: {
                lat: this.props.currentLocation.latitude,
                lng: this.props.currentLocation.longitude
              }
              // callback:{this.onGoogleMapsLoaded}
            }}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isFetchingCurrentLocation: state.currentLocationReducer.isFetching,
    currentLocation: state.currentLocationReducer.currentLocation,
    isFetchingStations: state.altFuelReducers.longitude,
    stations: state.altFuelReducers.stations
  };
}

function bindDispatch(dispatch) {
  return {
    locationActions: bindActionCreators(currentLocationActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  bindDispatch
)(App);
