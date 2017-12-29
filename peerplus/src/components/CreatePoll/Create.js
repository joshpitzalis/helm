import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

class Create extends Component {
  static propTypes = {
    handleChange: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired
  }

  render() {
    return (
      <Fragment>
        <h1>Create a poll</h1>
        <div>
          <input
            data-test="title"
            type="text"
            placeholder="name"
            onChange={this.props.handleChange('title')}
            value={this.props.title}
          />
        </div>
        <div>
          <input
            data-test="context"
            type="text"
            placeholder="context"
            onChange={this.props.handleChange('context')}
            value={this.props.context}
          />
        </div>
        <hr />
        <div>
          <div>
            <input
              data-test="single"
              type="radio"
              name="choice"
              onChange={this.props.handleChange('choice')}
              checked={this.props.choice === 'single'}
              value="single"
            />Single Choice
          </div>
          <div>
            <input
              data-test="multi"
              type="radio"
              name="choice"
              onChange={this.props.handleChange('choice')}
              checked={this.props.choice === 'multi'}
              value="multi"
            />Multiple Choice
          </div>
        </div>
        <hr />
        <div>
          <div>
            <input
              data-test="text"
              type="radio"
              name="type"
              checked={this.props.type === 'text'}
              onChange={this.props.handleChange('type')}
              value="text"
            />Text
          </div>
          <div>
            <input
              data-test="image"
              type="radio"
              name="type"
              value="image"
              onChange={this.props.handleChange('type')}
              checked={this.props.type === 'image'}
            />Image
          </div>
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
      </Fragment>
    )
  }
}

export default Create
