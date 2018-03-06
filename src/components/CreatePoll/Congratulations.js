import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { markOnboardingStepComplete } from '../Onboarding/helpers';
import ShareButton from 'react-social-share-buttons';
import Logo from '../../images/peerPlusLogo.png';
import ClickToCopyPublicPoll from '../shared/clickToCopy';

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
    const title = this.props.title;
    return (
      <Fragment>
        <div className="br3 pa4 bg-white">
          <ClickToCopyPublicPoll pollId={this.props.pollId} />
          {/* {this.props.privacy === 'public' && (
          <div>
            <ShareButton compact socialMedia="facebook" url={url} media={Logo} text={title} />
            <br />
            <ShareButton compact socialMedia="twitter" url={url} media={Logo} text={title} />
          </div>
        )} */}
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
