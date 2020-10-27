import React from "react";
import PropTypes from "prop-types";

function Select({
  name,
  label,
  value,
  error,
  values,
  propretyName,
  propretyId,
  ...rest
}) {
  return (
    <React.Fragment>
      <div className="input-group mb-3">
        {label && (
          <div className="input-group-prepend">
            <label className="input-group-text" htmlFor={name}>
              {label}
            </label>
          </div>
        )}
        <select
          className="custom-select"
          id={name}
          name={name}
          value={value}
          {...rest}
        >
          <option>...</option>
          {values.map((option) => (
            <option key={option[propretyId]} value={option[propretyId]}>
              {option[propretyName]}
            </option>
          ))}
        </select>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
    </React.Fragment>
  );
}

Select.propTypes = {
  name: PropTypes.string.isRequired,
  error: PropTypes.string,
  values: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  propretyName: PropTypes.string,
  propretyId: PropTypes.string,
};

Select.defaultProps = {
  propretyName: "name",
  propretyId: "_id",
};

export default Select;
