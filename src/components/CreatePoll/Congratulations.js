import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { markOnboardingStepComplete } from '../Onboarding/helpers';
import ShareButton from 'react-social-share-buttons';
import Logo from '../../images/peerPlusLogo.png';
import copy from 'copy-to-clipboard';

class Congratulations extends Component {
  state = { copied: null };

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

  copyToClipboard = (e, url) => {
    e.preventDefault();
    copy(url);
    this.setState({ copySuccess: 'Copied!' });
  };

  render() {
    const url = `https://peerplus-staging.firebaseapp.com/poll/${this.props.pollId}`;
    const title = this.props.title;
    return (
      <Fragment>
        <Link to={`/poll/${this.props.pollId}`}>
          <h2 data-test="congratulations" className="f3 lh-title">
            Poll is available at
            <span data-test="newPollId">{`${this.props.pollId}`}</span>
          </h2>
        </Link>
        {/* only displaying the copy-to-clipboard
            button if the browser supports it */
        document.queryCommandSupported('copy') && (
          <div>
            <button onClick={e => this.copyToClipboard(e, url)} className="seethrough pointer">
              Copy to Clipboard
            </button>
            <div>{this.state.copySuccess}</div>
            <br />
            <br />
          </div>
        )}

        {/* {this.props.privacy === 'public' && (
          <div>
            <ShareButton compact socialMedia="facebook" url={url} media={Logo} text={title} />
            <br />
            <ShareButton compact socialMedia="twitter" url={url} media={Logo} text={title} />
          </div>
        )} */}

        <Link to={`/home`}>
          <button>Done</button>
        </Link>
      </Fragment>
    );
  }
}

export default Congratulations;
