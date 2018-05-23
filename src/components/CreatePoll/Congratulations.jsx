import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import Confetti from 'react-dom-confetti';
import ShareButton from 'react-social-share-buttons';
import { markOnboardingStepComplete } from '../Onboarding/helpers';
import Logo from '../../images/peerPlusLogo.png';
import ClickToCopyPublicPoll from '../shared/clickToCopy';

class Congratulations extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

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
          <button data-test="done">
            <FormattedMessage id="create.complete.done" />
          </button>
        </Link>
      </Fragment>
    );
  }
}

Congratulations.propTypes = {
  user: PropTypes.shape({
    providerData: PropTypes.array.isRequired,
  }).isRequired,
  polls: PropTypes.shape({}).isRequired,
};

export default Congratulations;
