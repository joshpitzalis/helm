import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

class Create extends Component {
  static propTypes = {
    handleChange: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired
  };

  state = {
    touched: {
      title: false
    }
  };

  validate = inputs => {
    return {
      title: !this.required(inputs.title)
        ? 'Title is required'
        : !this.longerThan(3, inputs.title)
          ? 'Title should be longer than 3 characters'
          : null,
      context: this.props.context.length > 3 ? null : 'Context must be added',
      base:
        this.props.type !== null && this.props.choice !== null
          ? null
          : 'You must select a type and choice of poll.'
    };
  };

  required = value => {
    return value && value.length > 0;
  };
  longerThan = (min, value) => {
    return value.length > min;
  };

  isValidEmail = value => {
    return value.indexOf('@') !== -1;
  };

  handleBlur = field => evt => {
    this.setState({
      touched: { ...this.state.touched, [field]: true }
    });
  };

  render() {
    const errors = this.validate({
      title: this.props.title,
      context: this.props.context,
      type: this.props.type,
      choice: this.props.choice
    });

    return (
      <Fragment>
        <h1>Create a poll</h1>
        <div>
          <input
            data-test="title"
            type="text"
            placeholder="Title"
            onChange={this.props.handleChange('title')}
            value={this.props.title}
            onBlur={this.handleBlur('title')}
            autoFocus
          />
          {errors.title && this.state.touched.title ? (
            <p data-error>{errors.title}</p>
          ) : null}
        </div>
        <div>
          <input
            data-test="context"
            type="text"
            placeholder="Explanation"
            onChange={this.props.handleChange('context')}
            value={this.props.context}
            onBlur={this.handleBlur('context')}
          />
          {errors.context && this.state.touched.context ? (
            <p data-error>{errors.context}</p>
          ) : null}
        </div>
        <hr />
        <div className="dib">
          <label className="container">
            Single Choice
            <input
              data-test="single"
              type="radio"
              name="choice"
              onChange={this.props.handleChange('choice')}
              checked={this.props.choice === 'single'}
              value="single"
            />
            <span className="checkmark" />
          </label>

          <label className="container">
            <input
              data-test="multi"
              type="radio"
              name="choice"
              onChange={this.props.handleChange('choice')}
              checked={this.props.choice === 'multi'}
              value="multi"
            />Multiple Choice
            <span className="checkmark" />
          </label>
        </div>
        <hr />
        <div className="dib">
          <label className="container flex align-center">
            <input
              data-test="text"
              type="radio"
              name="type"
              checked={this.props.type === 'text'}
              onChange={this.props.handleChange('type')}
              value="text"
            />Text Based
            <span className="checkmark" />
          </label>

          <label className="container">
            <input
              data-test="image"
              type="radio"
              name="type"
              value="image"
              onChange={this.props.handleChange('type')}
              checked={this.props.type === 'image'}
            />Image Based
            <span className="checkmark" />
          </label>
        </div>

        {/* <div>
            <input
          type="range"
          min="24"
          max="72"
          ref={input => {
            this.duration = input
          }}
            />Duration
            </div>
            <hr />
            <div>
            <input
          type="checkbox"
          defaultChecked
          ref={input => {
            this.private = input
          }}
            />Keep Private
        </div> */}
        {errors.base ? <p data-error>{errors.base}</p> : null}
      </Fragment>
    );
  }
}

export default Create;
