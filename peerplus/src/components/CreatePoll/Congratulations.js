import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { markOnboardingStepComplete } from '../Onboarding/helpers';

class Congratulations extends Component {
  componentDidMount() {
    if (this.props.type === 'image') {
      markOnboardingStepComplete(this.props.userId, 'photo');
    }

    if (this.props.privacy === 'public') {
      markOnboardingStepComplete(this.props.userId, 'public');
    }

    if (this.props.privacy === 'private') {
      markOnboardingStepComplete(this.props.userId, 'private');
    }
  }

  render() {
    return (
      <Fragment>
        <Link to={`/poll/${this.props.pollId}`}>
          <h2 data-test="congratulations" className="f1 lh-title">
            Poll is available at
            <span data-test="newPollId">{`${this.props.pollId}`}</span>
          </h2>
        </Link>
      </Fragment>
    );
  }
}

export default Congratulations;
