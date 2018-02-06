import React, { Component, Fragment } from "react";
// import PropTypes from "prop-types";
import Dropzone from "react-dropzone";
// import { withHandlers } from "recompose";

class Questions extends Component {
  state = {
    errors: null,
    submitting: false
  };

  handleSubmit = e => {
    e.preventDefault();
    if (
      this.props.questions.length < 2 ||
      this.props.questions[0] === "" ||
      this.props.questions[1] === ""
    ) {
      this.setState({
        errors: "You need to add atleast two questions to proceed"
      });
    } else {
      this.props.privacy === "private"
        ? this.props.goToNext()
        : this.setState({ submitting: true }, () => this.props.handleSubmit());
    }
  };

  render() {
    const { questions, type, handleInput, uploadInProcess } = this.props;

    return (
      <Fragment>
        <h1 data-test="questionsPage">Questions</h1>
        {questions.map((question, index) => (
          <span key={index} className="flex  align-items justify-center">
            {type === "text" ? (
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
              <Dropzone
                data-test="dropzone"
                className=""
                onDrop={handleInput(index)}
              >
                {question ? (
                  <img src={question} alt={`question ${index + 1}`} />
                ) : (
                  <p>'Drag image here to upload.'</p>
                )}

                {/* {this.props.transferCurrent !== 0 &&
                  this.props.transferCurrent !== this.props.transferTotal && (
                    <progress
                  value={this.props.transferCurrent}
                  max={this.props.transferTotal}
                    />
                )} */}
              </Dropzone>
            )}
            <button
              className="seethrough"
              onClick={this.props.handleDelete(index)}
            >
              X
            </button>
          </span>
        ))}
        <div>
          <button
            data-test="add"
            className="seethrough"
            onClick={this.props.addQuestion}
          >
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
          className={uploadInProcess ? null : "grow"}
          disabled={this.state.submitting || uploadInProcess}
        >
          {this.state.submitting === true
            ? "Submitting..."
            : uploadInProcess
              ? "Uploading..."
              : this.props.privacy === "public" ? "Submit" : "Next"}
        </button>
      </Fragment>
    );
  }
}

export default Questions;
