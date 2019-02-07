import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import GoogleMap from "../components/GoogleMap";
import { connect } from "react-redux";
import FilterBar from "../components/FilterBar";
import { bindActionCreators } from "redux";
import * as currentLocationActions from "../actions/currentLocation";
import * as altFuelStationActions from "../actions/altFuelStation";
import * as googleMapActions from "../actions/googleMapActions";
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // currentLocation: { lat: -25.344, lng: 131.036 },
      googleMaps: undefined,
      map: undefined
    };
    this.currentInfoWindow = undefined;
  }

  onGoogleMapsLoaded = (googleMaps, map) => {
    console.log("onGoogleMapsLoaded");
    console.log(map);
    this.props.googleMapAction.storeGMapInfo(googleMaps, map);
  };
  // this.setState({ ...{ googleMaps: googleMaps, map: map } });
  // googleMaps.event.addListener(map, "click", event => {
  //   this.addMarker(event.latLng, map);
  // });
  // };

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

  setMarkers = stations => {
    console.log(stations);

    stations.map(item => {
      var marker = new this.props.gMapInfo.gMapApi.Marker({
        position: { lat: item.latitude, lng: item.longitude },
        label: item.station_name,
        map: this.props.gMapInfo.gMapHandle
      });
      marker.addListener("click", () => this.onMarkerClick(item, marker));
    });
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
    if (this.props.gMapInfo && this.props.stations.length > 0) {
      this.setMarkers(this.props.stations);
    }
  }
  currentLocationCallback(lat, lng) {
    console.log("currentLocationCallback");
    this.props.altFuelStationActions.fetchStationsNearMe(lat, lng);
  }

  componentWillUnmount() {}

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Locate alternative fueling stations
            {this.props.stations.length}
          </p>
        </header>
        <FilterBar
          handleLocationChange={val => alert(val)}
          handleFuelChange={val => alert(val)}
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
    stations: state.altFuelReducers.fuelStations,
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
