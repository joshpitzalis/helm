import { Link } from 'react-router-dom';
import React, { Fragment } from 'react';
import * as routes from '../../constants/routes';
import Logo from '../../images/peerPlusLogo.png';
import { compose, setDisplayName, setPropTypes, withState } from 'recompose';
import PropTypes from 'prop-types';
import AuthButtons from './AuthButtons';
import Notifications from './Notifications';
import { withPrivatePollData } from '../../hocs/withPollData';
import { withUserData } from '../../hocs/withUserData';
import PollBox from './PollBox';

const Navigation = ({
  showPolls, setPollsVisible, user, polls,
}) => {
  const PollsForMe =
    (polls &&
      polls.filter(poll => !poll.seenBy || !Object.keys(poll.seenBy).includes(user.providerData[0].uid))) ||
    [];

  const ResultsForMe =
    (polls && polls.filter(poll => poll.ended && poll.seenBy[user.providerData[0].uid] === true)) ||
    [];

  const pollsAndResults = [...ResultsForMe, ...PollsForMe];

  return (
    <Fragment>
      <nav className="flex justify-between items-center ph5-ns ph3">
        <Link to={routes.HOME}>
          <img src={Logo} alt="Peer Plus" height="50" width="50" className="grow dib mv2" />
        </Link>
        <div className="flex">
          <button onClick={() => setPollsVisible(x => !x)} className="grow seethrough">
            {pollsAndResults &&
              pollsAndResults.length > 0 && <Notifications pollcount={pollsAndResults.length} />}
          </button>
          {!user && <AuthButtons user={user} />}
        </div>
      </nav>
      {showPolls && (
        <PollBox polls={pollsAndResults} close={() => setPollsVisible(x => !x)} user={user} />
      )}
    </Fragment>
  );
};

export default compose(
  setPropTypes({ user: PropTypes.object, polls: PropTypes.array }),
  setDisplayName('Navigation'),
  withState('showPolls', 'setPollsVisible', false),
  withUserData,
  withPrivatePollData,
)(Navigation);
