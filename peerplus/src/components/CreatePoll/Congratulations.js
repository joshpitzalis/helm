import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

class Congratulations extends Component {
  render() {
    return (
      <Fragment>
        <Link to={`/poll/${this.props.pollId}`}>
          <h1 data-test="congratulations">
            Poll is available at
            <span data-test="newPollId">{`${this.props.pollId}`}</span>
          </h1>
        </Link>
      </Fragment>
    );
  }
}

export default Congratulations;
