import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';

class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: null,
      submitting: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    if (
      this.props.questions.length < 2 ||
      this.props.questions[0] === '' ||
      this.props.questions[1] === ''
    ) {
      this.setState({
        errors: 'You need to add atleast two options to proceed',
      });
    } else if (this.props.questions[0] === this.props.questions[1]) {
      this.setState({
        errors:
          'Your options cannot be exactly teh same, that would make checking the responses confusing.',
      });
    } else {
      this.props.privacy === 'private'
        ? this.props.goToNext()
        : this.setState({ submitting: true }, () => this.props.handleSubmit());
    }
  }

  render() {
    const {
      questions, type, handleInput, uploadInProcess,
    } = this.props;

    return (
      <Fragment>
        <h2 data-test="questionsPage" className="f1">
          Options
        </h2>
        {questions.map((question, index) => (
          <span key={index} className="flex  align-items justify-center">
            {type === 'text' ? (
              <input
                data-test={`question${index}`}
                type="text"
                placeholder="Type your poll question here..."
                onChange={handleInput(index)}
                value={question}
              />
            ) : (
              //  <TextInput
              //   element={`question${index}`}
              //   handleChange={handleInput(index)}
              //   handleBlur={this.handleBlur}
              //   value={question}
              //   errors={this.validate(question)}
              //   touched={this.state.touched}
              //   placeholder="Type your poll question here..."
              // />
              <Dropzone data-test="dropzone" className="" onDrop={handleInput(index)}>
                {question ? (
                  <img src={question} alt={`question ${index + 1}`} />
                ) : (
                  <p>'Drag image here to upload.'</p>
                )}
              </Dropzone>
            )}
            <button className="seethrough" onClick={this.props.handleDelete(index)}>
              X
            </button>
          </span>
        ))}
        {this.props.transferCurrent !== 0 &&
          this.props.transferCurrent &&
          this.props.transferCurrent !== this.props.transferTotal && (
            <progress value={this.props.transferCurrent} max={this.props.transferTotal} />
          )}
        <div>
          <button data-test="add" className="seethrough" onClick={this.props.addQuestion}>
            Add Another
          </button>
        </div>
        {this.state.errors && <p data-error>{this.state.errors}</p>}
        <button onClick={this.props.goToPrev} className="seethrough">
          Back
        </button>
        <button
          onClick={this.handleSubmit}
          type="submit"
          data-colour="green"
          data-test="submit"
          className={uploadInProcess ? null : 'grow'}
          disabled={this.state.submitting || uploadInProcess}
        >
          {this.state.submitting === true
            ? 'Submitting...'
            : uploadInProcess
              ? 'Uploading...'
              : this.props.privacy === 'public' ? 'Submit' : 'Next'}
        </button>
      </Fragment>
    );
  }
}

Questions.propTypes = {
  addQuestion: PropTypes.func,
  goToNext: PropTypes.func,
  goToPrev: PropTypes.func,
  handleDelete: PropTypes.func,
  handleInput: PropTypes.func,
  handleSubmit: PropTypes.func,
  pollId: PropTypes.string,
  privacy: PropTypes.string,
  questions: PropTypes.arrayOf(PropTypes.string),
  type: PropTypes.string,
  uploadInProcess: PropTypes.bool,
};

export default Questions;
