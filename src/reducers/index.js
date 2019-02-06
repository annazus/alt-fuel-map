import { combineReducers } from "redux";

import altFuelReducers from "./altFuelReducers";
import currentLocationReducer from "./currentLocationReducer";
import gMapReducer from "./gMapReducer";
const altFuelMapApp = combineReducers({
  altFuelReducers,
  currentLocationReducer,
  gMapReducer
});

export default altFuelMapApp;
