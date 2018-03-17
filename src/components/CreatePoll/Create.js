import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { TextInput, RadioChoice, required, longerThan, isValidText } from './FormFields';

class Create extends Component {
  static propTypes = {
    handleChange: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
  };

  state = {
    touched: {
      title: false,
      context: false,
    },
    showErrors: false,
  };

  validate = inputs => {
    return {
      title: !required(inputs.title)
        ? 'Title is required'
        : !longerThan(3, inputs.title) ? 'Title should be longer than 3 characters' : null,
      context: isValidText(inputs.context) ? null : 'Only letters and numbers, no funny business.',
      choice: inputs.choice !== null ? null : 'You must select a type and choice of poll.',
      type: inputs.type !== null ? null : 'You must select a type and choice of poll.',
      privacy: inputs.privacy !== null ? null : 'You must make your poll public or private.',
    };
  };

  handleBlur = field => evt => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    // validate form data for errors
    const errors = this.validate({
      title: this.props.title,
      context: this.props.context,
      type: this.props.type,
      choice: this.props.choice,
      privacy: this.props.privacy,
    });
    // check if any errors
    const anyError = Object.keys(errors).some(x => errors[x]);
    // if any errors block submit button from working
    if (anyError) {
      // set touched to true on both text inputs to show error on them
      const touched = {
        title: true,
        context: true,
      };
      this.setState({ showErrors: true, touched });
      window.scrollTo(0, 0);
      return null;
    } else {
      // proceed to next step
      this.props.goToNext();
    }
  };

  render() {
    const errors = this.validate({
      title: this.props.title,
      context: this.props.context,
      type: this.props.type,
      choice: this.props.choice,
      privacy: this.props.privacy,
    });

    return (
      <Fragment>
        <h2 className="f1">Create a Poll</h2>
        <div className="br3 pa4 bg-white">
          <TextInput
            element="title"
            handleChange={this.props.handleChange}
            handleBlur={this.handleBlur}
            value={this.props.title}
            errors={errors}
            touched={this.state.touched}
            placeholder="Type your poll question here..."
            autoFocus={true}
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
        </div>
        <br />
        <div className="br3 pa4 bg-white">
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
        </div>
        <div className="br3 pa4 bg-white">
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
        </div>
        <div className="br3 pa4 bg-white">
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
        </div>
        <div className="br3 pa4 bg-white">
          <div>
            <Slider
              handleChange={this.props.handleChange('duration')}
              duration={this.props.duration}
            />
            <div>
              The poll will end in <span data-test="duration">{this.props.duration}</span> hours.
            </div>
          </div>

          {errors.base ? <p data-error>{errors.base}</p> : null}
        </div>
        <br />
        <button
          onClick={this.handleSubmit}
          type="submit"
          data-colour="green"
          data-test="submit"
          className=" grow"
        >
          Next
        </button>
      </Fragment>
    );
  }
}

export default Create;

export const Slider = ({ duration, handleChange }) => {
  return (
    <input
      data-test="slider"
      type="range"
      min="24"
      max="72"
      className="outline-transparent"
      onChange={handleChange}
      value={duration}
    />
  );
};

Slider.propTypes = {
  duration: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
};
