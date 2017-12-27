import React, { Component } from 'react'

class Done extends Component {
  render () {
    return (
      <div>
        <h1>{`Done!  Poll  ${this.props.match.params.pollId}`}</h1>
      </div>
    )
  }
}

export default Done
