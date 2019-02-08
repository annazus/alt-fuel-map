import fetch from "cross-fetch";
import * as types from "../constants/types";

export const NREL_API_ROOT_URL =
  "https://developer.nrel.gov/api/alt-fuel-stations/v1";
export const NREL_API_GET_STATIONS = ".json?";
export const NREL_API_GET_NEAREST_STATIONS = "/nearest.json?";

export const nearest_parameters = (latitude, longitude) =>
  NREL_API_ROOT_URL +
  NREL_API_GET_NEAREST_STATIONS +
  `api_key=${
    process.env.REACT_APP_NREL_API_KEY
  }&latitude=${latitude}&longitude=${longitude}`;

export const createReqURL = reqParams =>
  NREL_API_ROOT_URL +
  NREL_API_GET_NEAREST_STATIONS +
  `api_key=${process.env.REACT_APP_NREL_API_KEY}&location=${
    reqParams.location
  }&fuel_type=${reqParams.fuelType}`;
// export function get_all_stations(api_key) {
//   const allStationsUrl =
//     NREL_API_ROOT_URL + NREL_API_GET_STATIONS + `api_key=${api_key}`;

//   fetch(allStationsUrl)
//     .then(response => response.json())
//     .then(response => console.log(response));
// }
// export function get_stations_near_me(api_key, lat, lng, callback = null) {
//   const stationsNearMeUrl = nearest_parameters(api_key, lat, lng);
//   console.log(stationsNearMeUrl);
//   fetch(stationsNearMeUrl)
//     .then(response => response.json())
//     .then(response => {
//       console.log(response);
//       callback(response);
//     });
// }

const requestStationsNearMe = (lat, lng) => {
  return {
    type: types.REQUEST_NEARBY_STATIONS,
    currentLocation: { lat: lat, lng: lng }
  };
};

const makeRequest = reqParams => {
  return {
    type: types.REQUEST_NEARBY_STATIONS,
    request: reqParams
  };
};

export const fetchStationsNearMe = (lat, lng) => dispatch => {
  console.log("lng" + lng);
  const stationsNearMeUrl = nearest_parameters(lat, lng);
  console.log(stationsNearMeUrl);
  dispatch(requestStationsNearMe(lat, lng));
  return fetch(stationsNearMeUrl)
    .then(response => response.json())
    .then(response => {
      console.log(response);
      dispatch({
        type: types.RECEIVE_NEARBY_STATIONS,
        payload: response
      });
    });
};

export const fetchStations = requestParams => dispatch => {
  console.log(requestParams);
  const reqURL = createReqURL(requestParams);
  console.log(reqURL);
  dispatch(makeRequest(requestParams));
  return fetch(reqURL)
    .then(response => response.json())
    .then(response => {
      console.log(response);
      dispatch({
        type: types.RECEIVE_NEARBY_STATIONS,
        payload: response
      });
    });
};
