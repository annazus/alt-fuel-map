import * as types from "../constants/types";

export const requestCurrentLocation = () => dispatch => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position =>
      receiveCurrentLocation(position)
    );
  } else {
    console.log("undefind");
  }
  dispatch({
    type: types.REQUEST_CURRENT_LOCATION
  });
};

export const receiveCurrentLocation = position => dispatch => {
  return dispatch({ type: types.RECEIVE_CURRENT_LOCATION, location: position });
};
