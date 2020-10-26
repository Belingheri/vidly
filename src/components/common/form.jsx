import React, { useState } from "react";
import PropTypes from "prop-types";
import Joi from "joi-browser";

import Input from "./input";

function Form({ data, submitButton, schema, onSubmit }) {
  const [errors, setErrors] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (newErrors) return setErrors(newErrors);
    onSubmit(e);
  };

  const validatePropery = (name, value) => {
    const { error } = Joi.validate(value, schema[name]);
    return !error ? null : error.details[0].message;
  };

  const validateForm = () => {
    const dataToValidate = {},
      options = { abortEarly: false };
    data.forEach((element) => {
      dataToValidate[element.name] = element.value;
    });
    const { error } = Joi.validate(dataToValidate, schema, options);
    if (!error) return null;

    const newErrors = {};
    for (let item of error.details) newErrors[item.path[0]] = item.message;

    return newErrors;
  };
  const handleChange = ({ currentTarget }, setValue) => {
    setValue(currentTarget.value);
    const error = validatePropery(currentTarget.name, currentTarget.value);
    const newErrors = { ...errors };
    newErrors[currentTarget.name] = error;
    setErrors(newErrors);
  };

  const renderItem = ({ type, name, value, setValue, attributes }) => {
    switch (type) {
      case "input":
        return (
          <Input
            key={name}
            name={name}
            value={value}
            onChange={(e) => handleChange(e, setValue)}
            {...attributes}
            error={errors[name]}
          />
        );

      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {data.map((item) => renderItem(item))}
      <button className="btn btn-primary" disabled={validateForm()}>
        {submitButton}
      </button>
    </form>
  );
}

Form.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      attributes: PropTypes.object,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      setValue: PropTypes.func.isRequired,
    })
  ).isRequired,
  submitButton: PropTypes.string,
  schema: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  //   schema: PropTypes.objectOf(PropTypes.instanceOf(Joi)).isRequired,
};
Form.defaultProps = {
  submitButton: "Invia",
};
export default Form;
