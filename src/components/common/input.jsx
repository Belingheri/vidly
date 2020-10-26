import React from "react";
import PropTypes from "prop-types";

function Input({ name, label, error, ...rest }) {
  return (
    <div className="form-group">
      {label && <label htmlFor={name}>{label}</label>}
      <input id={name} name={name} {...rest} className="form-control" />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  error: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  label: PropTypes.string,
};

Input.defaultProps = {
  type: "text",
};

export default Input;
