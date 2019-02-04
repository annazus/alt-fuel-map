import { combineReducers } from "redux";

import altFuelReducers from "./altFuelReducers";
import currentLocationReducer from "./currentLocationReducer";

const altFuelMapApp = combineReducers({
  altFuelReducers,
  currentLocationReducer
});

export default altFuelMapApp;
