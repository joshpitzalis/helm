import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { markOnboardingStepComplete } from '../Onboarding/helpers';
import ShareButton from 'react-social-share-buttons';
import Logo from '../../images/peerPlusLogo.png';
import ClickToCopyPublicPoll from '../shared/clickToCopy';
import Confetti from 'react-dom-confetti';

class Congratulations extends Component {
  state = {};
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
    this.setState({ explosion: true });
  }

  render() {
    const title = this.props.title;
    const config = {
      angle: 70,
      spread: 87,
      startVelocity: 40,
      elementCount: 250,
      decay: 0.95,
    };
    return (
      <Fragment>
        <div className="br3 pa4 bg-white">
          <ClickToCopyPublicPoll pollId={this.props.pollId} />
          <Confetti active={this.state.explosion} config={config} />
          {this.props.privacy === 'public' && (
            <div>
              <ShareButton
                compact
                socialMedia="facebook"
                url={this.props.pollId}
                media={Logo}
                text={title}
              />
              <br />
              <ShareButton
                compact
                socialMedia="twitter"
                url={this.props.pollId}
                media={Logo}
                text={title}
              />
            </div>
          )}
        </div>
        <br />
        <Link to="/home">
          <button data-test="done">Done</button>
        </Link>
      </Fragment>
    );
  }
}

export default Congratulations;
