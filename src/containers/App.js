import React, { Component } from "react";
import "./App.css";
import GoogleMap from "../components/GoogleMap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as currentLocationActions from "../actions/currentLocation";
import * as altFuelStationActions from "../actions/altFuelStation";
import * as googleMapActions from "../actions/googleMapActions";
import FilterBar from "../components/FilterBar";
import StationList from "../components/StationList";
import AppHeader from "../components/AppHeader";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // currentLocation: { lat: -25.344, lng: 131.036 },
      googleMaps: undefined,
      map: undefined
    };
    this.currentInfoWindow = undefined;
    this.markers = [];

    this.state = {
      location: "current",
      fuelType: "all"
    };
  }

  onGoogleMapsLoaded = (googleMaps, map) => {
    console.log("onGoogleMapsLoaded");
    console.log(map);
    this.props.googleMapAction.storeGMapInfo(googleMaps, map);
  };

  setMarkers = stations => {
    console.log(stations);
    if (stations.length === 0) return;
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(null);
    }
    this.markers = [];

    let bounds = new this.props.gMapInfo.gMapApi.LatLngBounds();

    stations.map((item, key) => {
      const marker = new this.props.gMapInfo.gMapApi.Marker({
        position: { lat: item.latitude, lng: item.longitude },
        label: key + "",
        map: this.props.gMapInfo.gMapHandle
      });
      marker.addListener("click", () => this.onMarkerClick(item, marker));
      this.markers.push(marker);
      bounds.extend({ lat: item.latitude, lng: item.longitude });
      this.props.gMapInfo.gMapHandle.fitBounds(bounds);
    });
    // this.setState({ ...this.state }, { marker: markerArr });
  };

  onMarkerClick = (station, marker) => {
    console.log(station);
    let contentString = `
      <div>
        <h1>${station.station_name}</h1>
        <p>${station.street_address} ${station.city}</p>
      </div>
    `;
    console.log(contentString);

    if (this.currentInfoWindow) this.currentInfoWindow.close();
    this.currentInfoWindow = new this.props.gMapInfo.gMapApi.InfoWindow({
      content: contentString,
      maxWidth: 200
    });
    this.currentInfoWindow.open(this.props.gMapInfo.gMapHandle, marker);
  };

  componentDidMount() {
    console.log("app componentDidMount");

    this.props.locationActions.requestCurrentLocation((lat, lng) =>
      this.currentLocationCallback(lat, lng)
    );
  }

  componentDidUpdate() {
    console.log("App component did update");
    console.log(this.props);

    if (this.props.gMapInfo && this.props.stationInfo) {
      this.props.gMapInfo.gMapHandle.setCenter({
        lat: this.props.stationInfo.latitude,
        lng: this.props.stationInfo.longitude
      });
      this.setMarkers(this.props.stationInfo.fuel_stations);
      return;
    }
    if (this.props.gMapInfo.gMapHandle && this.props.currentLocation) {
      this.props.gMapInfo.gMapHandle.panTo({
        lat: this.props.currentLocation.latitude,
        lng: this.props.currentLocation.longitude
      });
    }
  }
  currentLocationCallback(lat, lng) {
    console.log("currentLocationCallback");
    this.props.altFuelStationActions.fetchStationsNearMe(lat, lng);
  }

  requestStations(location, fuelType) {
    this.props.altFuelStationActions.fetchStations({
      location: location,
      fuelType: fuelType
    });
  }

  componentWillUnmount() {}

  render() {
    return (
      <div className="App">
        <AppHeader />
        <FilterBar
          handleLocationChange={val => {
            this.setState({
              location: val,
              fuelType: this.state.fuelType
            });
            this.requestStations(val, this.state.fuelType);
          }}
          handleFuelChange={val => {
            this.setState({
              location: this.state.location,
              fuelType: val
            });
            this.requestStations(this.state.location, val);
          }}
        />
        <div className="App-container">
          <GoogleMap
            yourAPI_Key={process.env.REACT_APP_GOOGLE_MAP_API_KEY}
            callback={this.onGoogleMapsLoaded}
            lat={this.props.currentLocation.latitude}
            initialSetting={{
              zoom: 12,
              center: {
                lat: this.props.currentLocation.latitude,
                lng: this.props.currentLocation.longitude
              }
            }}
          />
          <StationList
            stationList={
              this.props.stationInfo ? this.props.stationInfo.fuel_stations : []
            }
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log("state");
  console.log(state);
  return {
    isFetchingCurrentLocation: state.currentLocationReducer.isFetching,
    currentLocation: state.currentLocationReducer.currentLocation,
    isFetchingStations: state.altFuelReducers.isFetching,
    stationInfo: state.altFuelReducers.fuelStationInfo,
    gMapInfo: {
      gMapApi: state.gMapReducer.gMapApi,
      gMapHandle: state.gMapReducer.currentMapHandle
    }
  };
}

function bindDispatch(dispatch) {
  return {
    locationActions: bindActionCreators(currentLocationActions, dispatch),
    altFuelStationActions: bindActionCreators(altFuelStationActions, dispatch),
    googleMapAction: bindActionCreators(googleMapActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  bindDispatch
)(App);
