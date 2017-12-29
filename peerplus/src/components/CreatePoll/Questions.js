import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

class Questions extends Component {
  render () {
    const { questions, type } = this.props
    return (
      <Fragment>
        <h1>Questions</h1>
        {questions.map((question, index) => (
          <span key={index} className="db">
            <input
              data-test={`question${index}`}
              type={type === 'text' ? 'text' : 'file'}
              placeholder="text single choice"
              onChange={this.props.handleInput(index)}
              value={type ? question : undefined}
            />
            <button onClick={this.props.handleDelete(index)}>X</button>
          </span>
        ))}
        <div>
          <button data-test="add" onClick={this.props.addQuestion}>
            Add New Question
          </button>
        </div>
      </Fragment>
    )
  }
}

export default Questions
