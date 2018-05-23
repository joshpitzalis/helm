import React, { Fragment } from 'react';
import PollBox from './PollBox';
import Notifications from './Notifications';
import AuthButtons from './AuthButtons';
import Logo from '../../images/peerPlusLogo.png';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as routes from '../../constants/routes';

export const LoggedIn = ({ showPolls, setPollsVisible, user, polls, handleShowDeleteModal }) => {
  const PollsForMe =
    (polls &&
      user &&
      polls.filter(
        poll => !poll.seenBy || !Object.keys(poll.seenBy).includes(user.providerData[0].uid),
      )) ||
    [];

  const ResultsForMe =
    (polls &&
      user &&
      polls.filter(poll => poll.ended && poll.seenBy[user.providerData[0].uid] === true)) ||
    [];

  const pollsAndResults = [...ResultsForMe, ...PollsForMe];

  return (
    <Fragment>
      <nav className="flex justify-between items-center ph5-ns ph3">
        <Link to={routes.HOME}>
          <img src={Logo} alt="Peer Plus" height="50" width="50" className="grow dib mv2" />
        </Link>
        <div className="flex">
          <button
            onClick={() => setPollsVisible(x => !x)}
            className="grow seethrough no-no-underline mt1"
          >
            {pollsAndResults &&
              pollsAndResults.length > 0 && <Notifications pollcount={pollsAndResults.length} />}
          </button>
          {!user && <AuthButtons user={user} />}
          {user && (
            <div className="flex x">
              <img
                src={user.providerData[0].photoURL}
                className="br-100 dib ma0 pointer grow"
                height="50"
                width="50"
                onClick={() => setPollsVisible(x => !x)}
                alt={user.displayName}
              />
            </div>
          )}
        </div>
      </nav>
      {showPolls && (
        <PollBox
          polls={pollsAndResults}
          close={() => setPollsVisible(x => !x)}
          user={user}
          handleShowDeleteModal={handleShowDeleteModal}
        />
      )}
    </Fragment>
  );
};

LoggedIn.propTypes = {
  user: PropTypes.object,
  polls: PropTypes.array,
  showPolls: PropTypes.bool.isRequired,
  setPollsVisible: PropTypes.func.isRequired,
  handleShowDeleteModal: PropTypes.func.isRequired,
};
