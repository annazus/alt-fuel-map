import React from "react";
import PropTypes from "prop-types";
import PropTypes from "prop-types";

const SummaryStationCard = props => {
  const { name, streetAddress, city, zip, state, level, distance } = props;

  return (
    <div>
      <div>
        <span>
          {name}
          {distance}
        </span>
      </div>
      <div>{streetAddress}</div>
      <div>
        <span>
          {city}","
          {state}
        </span>
      </div>

      <div>{zip}</div>
      <div>{level}</div>
    </div>
  );
};

export default SummaryStationCard;
SummaryStationCard.propTypes = {
  stationList: PropTypes.object.isRequired
};
