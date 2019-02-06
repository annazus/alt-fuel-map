import * as types from "../constants/types";

export const requestCurrentLocation = callback => dispatch => {
  dispatch({
    type: types.REQUEST_CURRENT_LOCATION
  });

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      //   console.log("receive");
      dispatch(receiveCurrentLocation(position, callback));
    });
  } else {
    console.log("undefind");
  }
};

export const receiveCurrentLocation = (position, callback) => dispatch => {
  //   console.log(position);

  if (callback) callback(position.coords.latitude, position.coords.longitude);
  return dispatch({
    type: types.RECEIVE_CURRENT_LOCATION,
    payload: {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    }
  });
};

// export const clearWatch = () => {
//   navigator.geolocation.clearWatch(watchId);
// };
