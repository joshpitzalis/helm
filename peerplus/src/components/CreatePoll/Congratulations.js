import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

class Congratulations extends Component {
  render() {
    return (
      <Fragment>
        <Link to={`/poll/${this.props.pollId}`}>
          <h1 data-test="poll" congratulations>{`Poll is available at ${this.props.pollId}`}</h1>
        </Link>
      </Fragment>
    );
  }
}

export default Congratulations;
