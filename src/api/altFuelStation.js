import fetch from "cross-fetch";

export const NREL_API_ROOT_URL =
  "https://developer.nrel.gov/api/alt-fuel-stations/v1";
export const NREL_API_GET_STATIONS = ".json?";
export const NREL_API_GET_NEAREST_STATIONS = "/nearest.json?";

export const nearest_parameters = (api_key, latitude, longitude) =>
  `api_key=${api_key}&latitude=${latitude}&longitude=${longitude}`;

export function get_all_stations(api_key) {
  const allStationsUrl =
    NREL_API_ROOT_URL + NREL_API_GET_STATIONS + `api_key=${api_key}`;

  fetch(allStationsUrl)
    .then(response => response.json())
    .then(response => console.log(response));
}
export function get_stations_near_me(api_key, lat, lng, callback = null) {
  const stationsNearMeUrl =
    NREL_API_ROOT_URL +
    NREL_API_GET_NEAREST_STATIONS +
    nearest_parameters(api_key, lat, lng);
  console.log(stationsNearMeUrl);
  fetch(stationsNearMeUrl)
    .then(response => response.json())
    .then(response => {
      console.log(response);
      callback(response);
    });
}
