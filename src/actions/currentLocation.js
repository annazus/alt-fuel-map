import * as types from "../constants/types";

export const requestCurrentLocation = () => dispatch => {
  dispatch({
    type: types.REQUEST_CURRENT_LOCATION
  });

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      //   console.log("receive");
      dispatch(receiveCurrentLocation(position));
    });
  } else {
    console.log("undefind");
  }
};

export const receiveCurrentLocation = position => dispatch => {
  //   console.log(position);

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
