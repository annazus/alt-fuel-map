import React from "react";
import PropTypes from "prop-types";

const FuelTypes = props => {
  const { selectedFuelType, handleFuelChange } = props;
  const fuel_types = [
    { code: "all", description: "Include all fuel types" },
    { code: "BD", description: "Biodiesel (B20 and above)" },
    { code: "CNG", description: "Compressed Natural Gas" },
    { code: "E85", description: "Ethanol (E85)" },
    { code: "HY", description: "Hydrogen" },
    { code: "LNG", description: "Liquified Natural Gas" },
    { code: "LPG", description: "Liquified Petroleum Gas (Propane)" }
  ];

  return (
    <div>
      <select
        value={selectedFuelType}
        onChange={e => handleFuelChange(e.target.value)}
      >
        {fuel_types.map((item, key) => (
          <option value={item.code}>{item.description}</option>
        ))}
      </select>
    </div>
  );
};

FuelTypes.propTypes = {
  selectedFuelType: PropTypes.string.isRequired,
  handleFuelChange: PropTypes.func.isRequired
};
export default FuelTypes;
