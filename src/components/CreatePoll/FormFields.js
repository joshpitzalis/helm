import React from 'react';
import PropTypes from 'prop-types';

export const TextInput = ({
  handleChange,
  handleBlur,
  element,
  errors,
  touched,
  value,
  placeholder,
  label,
  autoFocus,
}) => (
  <div>
    <label htmlFor="name" className="f6 b db mb2 tl ttc">
      {element}
    </label>
    <input
      data-test={element}
      type="text"
      placeholder={placeholder}
      onChange={handleChange(element)}
      value={value}
      onBlur={handleBlur(element)}
      className="input-reset ba "
      autoFocus={autoFocus}
    />
    <small data-error className="h1 f5">
      {errors[element] && touched[element] ? errors[element] : null}
    </small>
  </div>
);

TextInput.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  element: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};

TextInput.defaultTypes = {
  autoFocus: false,
};

export const RadioChoice = ({
  handleChange,
  errors,
  touched,
  value,
  choice,
  group,
  title,
  showErrors,
}) => (
  <label className="container">
    {title}
    <input
      data-test={value}
      type="radio"
      name={group}
      onChange={handleChange(group)}
      checked={choice === value}
      value={value}
    />
    <span className="checkmark" />
    <small data-error className="h1 f5 pl3">
      {errors[group] && showErrors ? errors[group] : null}
    </small>
  </label>
);

RadioChoice.propTypes = {
  handleChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
  choice: PropTypes.string,
  group: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export const required = value => value && value.length > 0;
export const longerThan = (min, value) => value.length > min;

// const isValidEmail = value => {
//   return value.indexOf('@') !== -1
// }

export const isValidText = (value) => {
  const regExp = /^[A-Za-z0-9 .,!"']+$/;
  return value ? value.match(regExp) : true;
};
