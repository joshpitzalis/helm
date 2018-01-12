import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'

class Questions extends Component {
  render () {
    const { questions, type } = this.props
    return (
      <Fragment>
        <h1>Questions</h1>
        {questions.map((question, index) => (
          <span key={index} className="flex  align-items justify-center">
            {type === 'text' ? (
              <input
                data-test={`question${index}`}
                type="text"
                placeholder="text single choice"
                onChange={this.props.handleInput(index)}
                value={question}
              />
            ) : (
              <Dropzone
                data-test="dropzone"
                className=""
                onDrop={this.props.handleInput(index)}
              >
                {question ? (
                  <img src={question} />
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
        <button
          onClick={this.props.goToPrev}
          type="submit"
          className="seethrough"
        >
          Back
        </button>
        {this.props.privacy === 'public' ? (
          <button
            onClick={this.props.handleSubmit}
            type="submit"
            data-colour="green"
            data-test="submit"
            className=" grow"
          >
            Submit
          </button>
        ) : (
          <button
            onClick={this.props.goToNext}
            type="submit"
            data-colour="green"
            data-test="submit"
            className=" grow"
          >
            Next
          </button>
        )}
      </Fragment>
    )
  }
}

export default Questions
