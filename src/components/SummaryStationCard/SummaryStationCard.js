import React from "react";
import PropTypes from "prop-types";
import "./SummaryStationCard.css";
const SummaryStationCard = props => {
  const {
    station_name,
    street_address,
    city,
    zip,
    state,
    level,
    distance
  } = props.station;

  return (
    <div class="SummaryStationCard">
      <div>
        <span> {station_name}</span>
        <span> {distance}</span>
      </div>
      <div>{street_address}</div>
      <div>
        <span>
          {city},{state}
        </span>
      </div>

      <div>{zip}</div>
    </div>
  );
};

export default SummaryStationCard;
SummaryStationCard.propTypes = {
  stationList: PropTypes.object.isRequired
};
