import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { TextInput, RadioChoice } from './FormFields';

class Create extends Component {
  static propTypes = {
    handleChange: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired
  };

  state = {
    touched: {
      title: false,
      context: false
    },
    showErrors: false
  };

  validate = inputs => {
    return {
      title: !this.required(inputs.title)
        ? 'Title is required'
        : !this.longerThan(3, inputs.title)
          ? 'Title should be longer than 3 characters'
          : null,
      context: this.isValidText(inputs.context)
        ? null
        : 'Only letters and numbers, no funny business.',
      choice:
        this.props.choice !== null
          ? null
          : 'You must select a type and choice of poll.',
      type:
        this.props.type !== null
          ? null
          : 'You must select a type and choice of poll.',
      privacy:
        this.props.privacy !== null
          ? null
          : 'You must make your poll public or private.'
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

  isValidText = value => {
    const regExp = /^[A-Za-z0-9.,!"']+$/;
    return value.match(regExp);
  };

  handleBlur = field => evt => {
    this.setState({
      touched: { ...this.state.touched, [field]: true }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate({
      title: this.props.title,
      context: this.props.context,
      type: this.props.type,
      choice: this.props.choice,
      privacy: this.props.privacy
    });
    const anyError = Object.keys(errors).some(x => errors[x]);
    if (anyError) {
      const touched = {
        title: true,
        context: true
      };
      this.setState({ showErrors: true, touched });
      return;
    }
    this.props.goToNext;
  };

  render() {
    const errors = this.validate({
      title: this.props.title,
      context: this.props.context,
      type: this.props.type,
      choice: this.props.choice,
      privacy: this.props.privacy
    });

    return (
      <Fragment>
        <h1>Create a poll</h1>
        <TextInput
          element="title"
          handleChange={this.props.handleChange}
          handleBlur={this.handleBlur}
          value={this.props.title}
          errors={errors}
          touched={this.state.touched}
          placeholder="Type your poll question here..."
        />
        <TextInput
          element="context"
          handleChange={this.props.handleChange}
          handleBlur={this.handleBlur}
          value={this.props.context}
          errors={errors}
          touched={this.state.touched}
          placeholder="Optional extra information goes here..."
        />
        <RadioChoice
          handleChange={this.props.handleChange}
          value="single"
          group="choice"
          errors={errors}
          touched={this.state.touched}
          choice={this.props.choice}
          title="Single Choice"
          showErrors={false}
        />
        <RadioChoice
          handleChange={this.props.handleChange}
          value="multi"
          group="choice"
          errors={errors}
          touched={this.state.touched}
          choice={this.props.choice}
          title="Multiple Choice"
          showErrors={this.state.showErrors}
        />

        <hr />

        <RadioChoice
          handleChange={this.props.handleChange}
          value="text"
          group="type"
          errors={errors}
          touched={this.state.touched}
          choice={this.props.type}
          title="Text Based"
          showErrors={false}
        />
        <RadioChoice
          handleChange={this.props.handleChange}
          value="image"
          group="type"
          errors={errors}
          touched={this.state.touched}
          choice={this.props.type}
          title="Image Based"
          showErrors={this.state.showErrors}
        />
        <hr />

        <RadioChoice
          handleChange={this.props.handleChange}
          value="private"
          group="privacy"
          errors={errors}
          touched={this.state.touched}
          choice={this.props.privacy}
          title="Private"
          showErrors={false}
        />
        <RadioChoice
          handleChange={this.props.handleChange}
          value="public"
          group="privacy"
          errors={errors}
          touched={this.state.touched}
          choice={this.props.privacy}
          title="Public"
          showErrors={this.state.showErrors}
        />

        {/* <div>
          <input
            type="range"
            min="24"
            max="72"
            ref={input => {
          this.duration = input;
            }}
          />
          <div>End in {this.duration.target.value} hours.</div>
        </div> */}

        {errors.base ? <p data-error>{errors.base}</p> : null}

        <button
          onClick={this.handleSubmit}
          type="submit"
          data-colour="green"
          data-test="submit"
          className=" grow">
          Next
        </button>
      </Fragment>
    );
  }
}

export default Create;
