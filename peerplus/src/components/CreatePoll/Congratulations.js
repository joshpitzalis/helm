import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { markOnboardingStepComplete } from '../Onboarding/helpers';
import ShareButton from 'react-social-share-buttons';
import Logo from '../../images/peerPlusLogo.png';

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
    const url = `https://peerplus-staging.firebaseapp.com/poll/${this.props.pollId}`;
    const title = this.props.title;
    return (
      <Fragment>
        <Link to={`/poll/${this.props.pollId}`}>
          <h2 data-test="congratulations" className="f1 lh-title">
            Poll is available at
            <span data-test="newPollId">{` ${this.props.pollId}`}</span>
          </h2>
        </Link>
        <ShareButton compact socialMedia="facebook" url={url} media={Logo} text={title} />
        <br />
        <ShareButton compact socialMedia="twitter" url={url} media={Logo} text={title} />
      </Fragment>
    );
  }
}

export default Congratulations;
