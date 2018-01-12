import React from 'react'
import PropTypes from 'prop-types'

export const TextInput = ({
  handleChange,
  handleBlur,
  element,
  errors,
  touched,
  value,
  placeholder
}) => (
  <div>
    <input
      data-test={value}
      type="text"
      placeholder={placeholder}
      onChange={handleChange(element)}
      value={value}
      onBlur={handleBlur(element)}
    />
    {errors[element] && touched[element] ? (
      <p data-error>{errors[element]}</p>
    ) : null}
  </div>
)

TextInput.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  element: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired
}

export const RadioChoice = ({
  handleChange,
  errors,
  touched,
  value,
  choice,
  group,
  title,
  showErrors
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
    {errors[group] && showErrors ? <p data-error>{errors[group]}</p> : null}
  </label>
)

RadioChoice.propTypes = {
  handleChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
  choice: PropTypes.string,
  group: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}
