import React from "react";
import SummaryStationCard from "./SummaryStationCard";
import PropTypes from "prop-types";

const StationList = props => {
  const { stationList } = props;

  return stationList.map(item => <SummaryStationCard station={item} />);
};

export default StationList;
StationList.propTypes = {
  stationList: PropTypes.array.isRequired
};
