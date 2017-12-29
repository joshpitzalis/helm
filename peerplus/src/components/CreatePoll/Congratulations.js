import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Congratulations extends Component {
  render () {
    return (
      <div>
        <Link to={`/poll/${this.props.pollId}`}>
          <h1 data-test="poll">{`Poll is available at ${
            this.props.pollId
          }`}</h1>
        </Link>
      </div>
    )
  }
}

export default Congratulations
