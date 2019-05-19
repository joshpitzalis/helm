// @title	A component that takes a poll id, displays the poll and lets people click to copy
// @author	Josh

import copy from "copy-to-clipboard";
import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class ClickToCopyPublicPoll extends Component {
  state = {};

  // @param	poll id to display and copy
  // static PropTypes = {
  //   pollId: PropTypes.string.isRequired
  // };

  copyToClipboard = (e, url) => {
    e.preventDefault();
    copy(url);
    this.setState({ copySuccess: "Copied!" });
  };

  render() {
    const { pollId } = this.props;
    const url = `https://peerplus-staging.firebaseapp.com/poll/${
      this.props.pollId
    }`;
    return (
      <div>
        <h2
          data-test="congratulations"
          // @dev  data-test is for testing a poll got create
          className="f3 lh-title"
        >
          Poll is available at
          <Link to={`/poll/${pollId}`}>
            <span data-test="newPollId" className="f3 lh-title">
              {" "}
              {`poll/${pollId}`}
            </span>{" "}
          </Link>
        </h2>

        {/* @notice only displaying the copy-to-clipboard
            button if the browser supports it */
        document.queryCommandSupported("copy") && (
          <div>
            <button
              onClick={e => this.copyToClipboard(e, url)}
              className="seethrough pointer"
            >
              Click here to copy to clipboard.
            </button>
            <div style={{ color: "green" }}>{this.state.copySuccess}</div>
            <br />
            <br />
          </div>
        )}
      </div>
    );
  }
}
