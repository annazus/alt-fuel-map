import React from "react";
import SummaryStationCard from "../SummaryStationCard";
import PropTypes from "prop-types";
import "./StationList.css";
const StationList = props => {
  const { stationList } = props;
  return (
    <div className="StationList">
      {stationList.map(item => (
        <SummaryStationCard station={item} />
      ))}
    </div>
  );
};

export default StationList;
StationList.propTypes = {
  stationList: PropTypes.array.isRequired
};
